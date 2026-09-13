#!/usr/bin/env python3
"""
FreeAI OpenAI-Compatible Local API Gateway (api_server.py)
---------------------------------------------------------
Exposes standard OpenAI REST endpoints:
  - POST /v1/chat/completions (Real-time SSE streaming & standard JSON responses)
  - GET /v1/models (Catalog of all 14 models, aliases, and providers)
  - GET / (Health check, account pool metrics, and cache statistics)

Compatible with Cursor, Continue.dev, Cline, Aider, LibreChat, Open WebUI,
LangChain, and the official `openai` Python/JS SDKs.
"""

import os
import sys
import json
import time
import uuid
import asyncio
import argparse
from typing import Optional, Dict, Any, List, Union, Tuple

import logging
from logging.handlers import RotatingFileHandler

try:
    from fastapi import FastAPI, HTTPException, Request
    from fastapi.responses import JSONResponse, StreamingResponse, FileResponse
    from fastapi.staticfiles import StaticFiles
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel, Field, ConfigDict
    import uvicorn
except ImportError:
    print("Error: FastAPI, Uvicorn, and Pydantic are required.")
    print("Install with: pip install fastapi uvicorn pydantic sse-starlette")
    sys.exit(1)

# Configure comprehensive persistent server logging to server.log & stdout
def setup_server_logging(log_file: str = "server.log") -> logging.Logger:
    """Configures centralized logging to file and console with automatic rotation."""
    srv_logger = logging.getLogger("freeai_server")
    srv_logger.setLevel(logging.INFO)

    # Avoid duplicate handlers on reload
    if not srv_logger.handlers:
        formatter = logging.Formatter(
            "[%(asctime)s] [%(levelname)s] [%(name)s:%(lineno)d] %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )

        try:
            file_handler = RotatingFileHandler(
                log_file,
                maxBytes=10 * 1024 * 1024,  # 10MB per log file
                backupCount=5,
                encoding="utf-8",
            )
            file_handler.setLevel(logging.INFO)
            file_handler.setFormatter(formatter)
            srv_logger.addHandler(file_handler)

            # Route uvicorn and root logs to server.log as well
            for u_name in ("uvicorn", "uvicorn.access", "uvicorn.error"):
                u_log = logging.getLogger(u_name)
                u_log.setLevel(logging.INFO)
                if not any(isinstance(h, RotatingFileHandler) for h in u_log.handlers):
                    u_log.addHandler(file_handler)

        except Exception as e:
            print(f"[!] Warning: Could not initialize log file handler: {e}")

        console_handler = logging.StreamHandler(sys.stdout)
        console_handler.setLevel(logging.INFO)
        console_handler.setFormatter(formatter)
        srv_logger.addHandler(console_handler)

    return srv_logger

logger = setup_server_logging("server.log")

# Ensure local imports work
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

# Ensure UTF-8 console output for Windows
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

from chat_streamer import (
    ModelCatalog,
    AccountPool,
    UseAIChatClient,
    ResponseCache,
    ConversationMemory,
)
from attachment_pipeline import AttachmentIngestor
from pool_maintainer import AccountAuditor, PoolMaintainer
from account_creator import load_env_file

load_env_file()
try:
    from image_inspector import ImageInspector
except ImportError:
    ImageInspector = None

# ---------------------------------------------------------------------------
# Pydantic Request Models (OpenAI Standard Schema)
# ---------------------------------------------------------------------------

class ChatMessage(BaseModel):
    role: str
    content: Union[str, List[Dict[str, Any]]]
    name: Optional[str] = None


class ChatCompletionRequest(BaseModel):
    model: str = "claude"
    messages: List[ChatMessage]
    stream: Optional[bool] = False
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = None
    presence_penalty: Optional[float] = 0.0
    frequency_penalty: Optional[float] = 0.0
    # FreeAI Execution Modes
    web_search: Optional[bool] = None
    search: Optional[bool] = None
    agentic: Optional[bool] = None
    deep_research: Optional[bool] = None
    # Attachments
    attachments: Optional[List[str]] = None
    files: Optional[List[str]] = None
    dirs: Optional[List[str]] = None
    # Image Generation
    image_gen: Optional[bool] = None
    image_style: Optional[str] = "realistic"
    image_ratio: Optional[str] = "1:1"

    model_config = ConfigDict(extra="allow")


class ImageGenerationRequest(BaseModel):
    prompt: str
    model: Optional[str] = "imagen-3"
    n: Optional[int] = 1
    size: Optional[str] = "1024x1024"
    style: Optional[str] = "realistic"
    response_format: Optional[str] = "url"

    model_config = ConfigDict(extra="allow")


class ImageInspectRequest(BaseModel):
    file: Optional[str] = None
    url: Optional[str] = None
    b64_json: Optional[str] = None

    model_config = ConfigDict(extra="allow")


def resolve_model_and_modes(
    raw_model: str,
    req_body: Optional[ChatCompletionRequest] = None,
    headers: Optional[Dict[str, str]] = None,
) -> Tuple[str, bool, bool, bool, bool, str, str]:
    """
    Resolves base model slug and determines execution mode flags (web_search, agentic, deep_research, image_gen)
    from model name suffix, request body attributes, or HTTP headers.

    Supported model suffixes:
      - '<model>-web' or '<model>-search': Live Web Search
      - '<model>-agent' or '<model>-agentic': Agentic Mode
      - '<model>-deep' or '<model>-research': Deep Research Mode
      - '<model>-image' or '<model>-img': AI Image Generation Mode
    """
    clean_model = raw_model.strip().lower()
    web_search = False
    agentic = False
    deep_research = False
    image_gen = False
    image_style = "realistic"
    image_ratio = "1:1"

    # Direct image model detection
    if clean_model in ("imagen-3", "imagen", "dall-e-3", "dalle", "flux-1-schnell", "flux") or clean_model.endswith(("-image", "-img")):
        image_gen = True
        if clean_model.endswith(("-image", "-img")):
            clean_model = clean_model.rsplit("-", 1)[0]

    # 1. Parse suffixes from model name
    changed = True
    while changed:
        changed = False
        if clean_model.endswith(("-web", "-search")):
            web_search = True
            clean_model = clean_model.rsplit("-", 1)[0]
            changed = True
        elif clean_model.endswith(("-agent", "-agentic")):
            agentic = True
            clean_model = clean_model.rsplit("-", 1)[0]
            changed = True
        elif clean_model.endswith(("-deep", "-research")):
            deep_research = True
            clean_model = clean_model.rsplit("-", 1)[0]
            changed = True

    # 2. Check request body overrides
    if req_body:
        if req_body.web_search is not None:
            web_search = bool(req_body.web_search)
        elif req_body.search is not None:
            web_search = bool(req_body.search)
        if req_body.agentic is not None:
            agentic = bool(req_body.agentic)
        if req_body.deep_research is not None:
            deep_research = bool(req_body.deep_research)
        if getattr(req_body, "image_gen", None) is not None:
            image_gen = bool(req_body.image_gen)
        if getattr(req_body, "image_style", None):
            image_style = str(req_body.image_style)
        if getattr(req_body, "image_ratio", None):
            image_ratio = str(req_body.image_ratio)

    # 3. Check HTTP headers overrides
    if headers:
        if headers.get("x-web-search", "").lower() in ("true", "1", "yes"):
            web_search = True
        if headers.get("x-agentic-mode", "").lower() in ("true", "1", "yes"):
            agentic = True
        if headers.get("x-deep-research", "").lower() in ("true", "1", "yes"):
            deep_research = True
        if headers.get("x-image-generation", "").lower() in ("true", "1", "yes"):
            image_gen = True
        if headers.get("x-image-style"):
            image_style = headers.get("x-image-style")
        if headers.get("x-image-ratio"):
            image_ratio = headers.get("x-image-ratio")

    model_slug = ModelCatalog.resolve(clean_model)
    return model_slug, web_search, agentic, deep_research, image_gen, image_style, image_ratio



# ---------------------------------------------------------------------------
# FastAPI App Initialization
# ---------------------------------------------------------------------------

app = FastAPI(
    title="FreeAI OpenAI-Compatible API Gateway",
    description="Local OpenAI/Anthropic REST gateway bridging top-tier models with account rotation & caching.",
    version="1.0.0",
)

# Enable CORS for browser-based AI frontends (LibreChat, Open WebUI, Web extensions)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests_middleware(request: Request, call_next):
    start_time = time.time()
    method = request.method
    path = request.url.path
    client_ip = request.client.host if request.client else "unknown"

    if path != "/favicon.ico":
        logger.info(f"[HTTP] -> {method} {path} from {client_ip}")

    try:
        response = await call_next(request)
        duration_ms = (time.time() - start_time) * 1000
        if path != "/favicon.ico":
            logger.info(f"[HTTP] <- {method} {path} status={response.status_code} ({duration_ms:.1f}ms)")
        return response
    except Exception as exc:
        duration_ms = (time.time() - start_time) * 1000
        logger.exception(f"[HTTP] !! {method} {path} crashed after {duration_ms:.1f}ms: {exc}")
        raise exc

# Mount Web UI static assets
web_assets_dir = os.path.join(current_dir, "web")
if os.path.isdir(web_assets_dir):
    app.mount("/static", StaticFiles(directory=web_assets_dir), name="static")

# Global State
GLOBAL_POOL: Optional[AccountPool] = None
GLOBAL_CACHE: Optional[ResponseCache] = None
GLOBAL_MAINTAINER: Optional[PoolMaintainer] = None


def get_pool() -> AccountPool:
    global GLOBAL_POOL
    if GLOBAL_POOL is None:
        GLOBAL_POOL = AccountPool("accounts.json")
    return GLOBAL_POOL


def get_cache() -> ResponseCache:
    global GLOBAL_CACHE
    if GLOBAL_CACHE is None:
        GLOBAL_CACHE = ResponseCache("chat_cache.json", enabled=True)
    return GLOBAL_CACHE


def get_maintainer() -> PoolMaintainer:
    global GLOBAL_MAINTAINER
    if GLOBAL_MAINTAINER is None:
        GLOBAL_MAINTAINER = PoolMaintainer("accounts.json", min_reserve=50, target_reserve=60)
    return GLOBAL_MAINTAINER


# ---------------------------------------------------------------------------
# Helper: Format Messages Array into Injected Context
# ---------------------------------------------------------------------------

def extract_raw_image_data(url_or_path: str, fname: str = "image.png") -> Optional[Dict[str, Any]]:
    """Extracts binary image payload, filename, and mime type from data URIs, file paths, or remote URLs."""
    import base64
    import mimetypes

    if not url_or_path:
        return None

    raw_bytes = None
    mime_type = "image/png"

    try:
        if url_or_path.startswith("data:image/"):
            header, b64_str = url_or_path.split(",", 1)
            if ";" in header:
                mime_type = header.split(";")[0].replace("data:", "").strip()
            raw_bytes = base64.b64decode(b64_str)
        elif os.path.isfile(url_or_path):
            with open(url_or_path, "rb") as f:
                raw_bytes = f.read()
            guessed, _ = mimetypes.guess_type(url_or_path)
            if guessed:
                mime_type = guessed
            fname = os.path.basename(url_or_path)
        elif url_or_path.startswith("http://") or url_or_path.startswith("https://"):
            import requests
            r = requests.get(url_or_path, timeout=12)
            if r.status_code == 200:
                raw_bytes = r.content
                ctype = r.headers.get("content-type")
                if ctype and "image/" in ctype:
                    mime_type = ctype.split(";")[0].strip()
        else:
            try:
                raw_bytes = base64.b64decode(url_or_path)
            except Exception:
                pass

        if raw_bytes and len(raw_bytes) > 0:
            ext = mime_type.split("/")[-1] if "/" in mime_type else "png"
            if ext == "jpeg":
                ext = "jpg"
            if not fname or fname == "attached_image.png":
                fname = f"attached_image.{ext}"
            return {
                "bytes": raw_bytes,
                "filename": fname,
                "mime_type": mime_type,
            }
    except Exception as exc:
        logger.warning(f"[Vision] Could not extract raw image bytes: {exc}")
    return None


def extract_prompt_and_context(
    messages: List[ChatMessage]
) -> Tuple[str, Optional[str], List[Dict[str, str]], List[Dict[str, Any]]]:
    """
    Extracts current user prompt, system instructions, prior dialogue history,
    and any attached image payloads (bytes, filename, mime_type) for true multimodal streaming.
    """
    import re
    system_prompt = None
    history: List[Dict[str, str]] = []
    current_user_prompt = ""
    extracted_images: List[Dict[str, Any]] = []

    for i, msg in enumerate(messages):
        content_str = ""
        # Extract string or multimodal list parts
        if isinstance(msg.content, str):
            content_str = msg.content
        elif isinstance(msg.content, list):
            text_parts: List[str] = []
            for part in msg.content:
                if not isinstance(part, dict):
                    continue
                ptype = part.get("type", "")
                if ptype == "text":
                    text_parts.append(part.get("text", ""))
                elif ptype in ("image_url", "image", "file"):
                    img_data = part.get("image_url") or part.get("image") or part
                    url = img_data.get("url") if isinstance(img_data, dict) else str(img_data)
                    fname = (
                        (img_data.get("filename") if isinstance(img_data, dict) else None)
                        or part.get("name")
                        or "attached_image.png"
                    )
                    if url:
                        img_item = extract_raw_image_data(url, fname=fname)
                        if img_item:
                            extracted_images.append(img_item)

            content_str = "".join(text_parts)
        else:
            content_str = str(msg.content)

        # Also extract raw base64 data URIs embedded inside a string
        if "data:image/" in content_str:
            uris = re.findall(r"data:image/(?:png|jpe?g|webp|gif|bmp);base64,[A-Za-z0-9+/=]+", content_str)
            for idx, uri in enumerate(uris[:3]):
                img_item = extract_raw_image_data(uri, fname=f"image_{idx+1}.png")
                if img_item:
                    extracted_images.append(img_item)

        content_str = content_str.strip()

        if msg.role == "system":
            if system_prompt:
                system_prompt += "\n" + content_str
            else:
                system_prompt = content_str
        elif i == len(messages) - 1 and msg.role == "user":
            current_user_prompt = content_str
        elif msg.role in ("user", "assistant"):
            history.append({"role": msg.role, "content": content_str})

    if not current_user_prompt and messages:
        last_msg = messages[-1]
        current_user_prompt = str(last_msg.content).strip()

    return current_user_prompt, system_prompt, history, extracted_images


def format_effective_prompt(current_prompt: str, system_prompt: Optional[str], history: List[Dict[str, str]]) -> str:
    """Format full prompt with system instructions and dialogue context."""
    if not system_prompt and not history:
        return current_prompt

    parts: List[str] = []
    if system_prompt and system_prompt.strip():
        parts.append(f"[System Instructions]\n{system_prompt.strip()}")

    if history:
        dialogue_lines: List[str] = []
        for msg in history:
            label = "User" if msg["role"] == "user" else "Assistant"
            dialogue_lines.append(f"{label}: {msg['content']}")
        parts.append("[Conversation Context]\n" + "\n".join(dialogue_lines))

    parts.append(f"[Current User Message]\n{current_prompt.strip()}")
    parts.append("Please respond directly to the current user message above while maintaining continuity with the context.")
    return "\n\n".join(parts)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.get("/v1/status")
@app.get("/api/status")
async def get_gateway_status():
    """Returns JSON telemetry regarding pool accounts, cache, and service status."""
    pool = get_pool()
    cache = get_cache()
    c_stats = cache.stats() if cache else {}
    return {
        "service": "FreeAI OpenAI-Compatible Local Gateway",
        "status": "online",
        "port": 8000,
        "accounts_in_pool": pool.count(),
        "cache": {
            "enabled": c_stats.get("enabled", False),
            "total_items": c_stats.get("entries", 0),
            "total_hits": c_stats.get("total_hits", 0),
            "size_kb": c_stats.get("size_kb", 0),
        },
        "available_models_count": len(ModelCatalog.MODELS),
        "endpoints": [
            "POST /v1/chat/completions",
            "POST /v1/images/generations",
            "POST /v1/images/inspect",
            "GET  /v1/models",
            "GET  /v1/models/{model}",
            "GET  /v1/status",
            "GET  /v1/logs",
            "GET  /health",
        ],
    }


@app.get("/")
async def root(request: Request):
    """Health check, gateway status, or Web UI Dashboard."""
    accept = request.headers.get("accept", "")
    web_index = os.path.join(current_dir, "web", "index.html")
    # Only return HTML if explicitly requested and JSON is not preferred
    if "text/html" in accept and "application/json" not in accept and os.path.isfile(web_index):
        return FileResponse(web_index)
    return await get_gateway_status()


@app.get("/favicon.ico")
async def favicon():
    """Prevents 404 spam in browser console."""
    from fastapi import Response
    return Response(status_code=204)


@app.get("/v1/logs")
async def get_server_logs(lines: int = 100):
    """Inspect recent log entries from server.log."""
    log_file = "server.log"
    if not os.path.isfile(log_file):
        return {"path": log_file, "total_lines": 0, "lines_returned": 0, "logs": []}
    try:
        with open(log_file, "r", encoding="utf-8", errors="replace") as f:
            all_lines = f.readlines()
        count = max(1, min(lines, 1000))
        recent = [l.rstrip("\r\n") for l in all_lines[-count:]]
        return {
            "path": os.path.abspath(log_file),
            "total_lines": len(all_lines),
            "lines_returned": len(recent),
            "logs": recent,
        }
    except Exception as e:
        return {"error": str(e)}


@app.get("/chat")
async def chat_ui():
    """Serves the FreeAI Local Web UI Dashboard."""
    web_index = os.path.join(current_dir, "web", "index.html")
    if os.path.isfile(web_index):
        return FileResponse(web_index)
    raise HTTPException(status_code=404, detail="Web UI not found")


@app.get("/health")
async def health():
    return {"status": "healthy", "timestamp": time.time()}


@app.get("/v1/pool/status")
async def pool_status():
    """Returns real-time account pool health and audit telemetry."""
    pool = get_pool()
    maintainer = get_maintainer()
    return {
        "status": "healthy",
        "accounts_count": pool.count(),
        "min_reserve": maintainer.min_reserve,
        "target_reserve": maintainer.target_reserve,
        "last_audit": maintainer.last_audit_report,
        "last_replenish": maintainer.last_replenish_time,
    }


@app.post("/v1/pool/audit")
async def trigger_pool_audit(prune: bool = True):
    """Runs a non-destructive session validity audit across all pool accounts."""
    maintainer = get_maintainer()
    report = maintainer.auditor.audit_pool(prune_dead=prune, verbose=False)
    maintainer.last_audit_report = report
    return report


class ReplenishBody(BaseModel):
    target: Optional[int] = None
    count: Optional[int] = None


@app.post("/v1/pool/replenish")
async def trigger_pool_replenish(body: Optional[ReplenishBody] = None):
    """Triggers account replenishment to the target reserve."""
    maintainer = get_maintainer()
    target = body.target if body and body.target else maintainer.target_reserve
    if body and body.count:
        target = get_pool().count() + body.count
    res = maintainer.replenish(target_count=target, verbose=False)
    return res


class AttachInspectBody(BaseModel):
    paths: List[str]


@app.post("/v1/attachments/inspect")
async def inspect_attachments(body: AttachInspectBody):
    """Inspects files or directories and returns syntax metadata or directory trees."""
    ingestor = AttachmentIngestor()
    results = []
    for p in body.paths:
        if os.path.isfile(p):
            results.append(ingestor.read_file(p))
        elif os.path.isdir(p):
            files, tree, warns = ingestor.crawl_directory(p)
            results.append({
                "success": True,
                "type": "directory",
                "path": p,
                "files_count": len(files),
                "tree": tree,
                "warnings": warns,
            })
        else:
            results.append({"success": False, "path": p, "error": f"Path not found: {p}"})
    return {"results": results}


@app.get("/v1/models")
async def list_models():
    """OpenAI standard GET /v1/models endpoint."""
    model_entries = []
    created_ts = int(time.time()) - 86400

    # Provide entries for official IDs and common friendly aliases
    seen_ids = set()
    for mid, info in ModelCatalog.MODELS.items():
        if mid not in seen_ids:
            seen_ids.add(mid)
            model_entries.append({
                "id": mid,
                "object": "model",
                "created": created_ts,
                "owned_by": info.get("provider", "FreeAI").lower(),
                "permission": [],
                "root": mid,
                "parent": None,
            })

        for alias in info.get("aliases", []):
            if alias not in seen_ids:
                seen_ids.add(alias)
                model_entries.append({
                    "id": alias,
                    "object": "model",
                    "created": created_ts,
                    "owned_by": info.get("provider", "FreeAI").lower(),
                    "permission": [],
                    "root": mid,
                    "parent": None,
                })

    # Also add standard industry identifiers and -web / -agent / -deep variants
    popular_bases = [
        ("claude-3-5-sonnet", "gateway-sonnet-5"),
        ("claude-3-7-sonnet", "gateway-sonnet-5"),
        ("claude", "gateway-sonnet-5"),
        ("gpt-4o", "gateway-gpt-5-4"),
        ("gpt-5", "gateway-gpt-5-4"),
        ("deepseek-chat", "gateway-deepseek-v4-pro"),
        ("gemini-flash", "gateway-gemini-3-6-flash"),
        ("imagen-3", "instant"),
        ("dall-e-3", "instant"),
        ("flux-1-schnell", "instant"),
    ]
    for pop_id, target in popular_bases:
        for suffix, mode_owner in [
            ("", "FreeAI"),
            ("-web", "FreeAI WebSearch"),
            ("-agent", "FreeAI Agentic"),
            ("-deep", "FreeAI DeepResearch"),
            ("-image", "FreeAI ImageGen"),
        ]:
            full_id = f"{pop_id}{suffix}"
            if full_id not in seen_ids:
                seen_ids.add(full_id)
                model_entries.append({
                    "id": full_id,
                    "object": "model",
                    "created": created_ts,
                    "owned_by": mode_owner.lower(),
                    "permission": [],
                    "root": target,
                    "parent": None,
                })

    return {"object": "list", "data": model_entries}


@app.get("/v1/models/{model_id:path}")
async def retrieve_model(model_id: str):
    """OpenAI standard GET /v1/models/{model} endpoint."""
    slug = ModelCatalog.resolve(model_id)
    info = ModelCatalog.get_info(slug)
    return {
        "id": model_id,
        "object": "model",
        "created": int(time.time()) - 86400,
        "owned_by": info.get("provider", "FreeAI").lower(),
        "permission": [],
        "root": slug,
        "parent": None,
    }


@app.post("/v1/chat/completions")
async def chat_completions(req: ChatCompletionRequest, raw_req: Request):
    """
    OpenAI-compatible chat completions endpoint.
    Supports both real-time Server-Sent Events (SSE) streaming and standard JSON responses.
    Integrates Live Web Search (-web), Agentic Mode (-agent), and Deep Research (-deep).
    """
    header_dict = {k.lower(): v for k, v in raw_req.headers.items()}
    model_slug, web_search, agentic, deep_research, image_gen, image_style, image_ratio = resolve_model_and_modes(
        req.model,
        req_body=req,
        headers=header_dict,
    )
    model_info = ModelCatalog.get_info(model_slug)
    pool = get_pool()
    cache = get_cache()

    current_prompt, system_prompt, history, extracted_images = extract_prompt_and_context(req.messages)

    # Ingest file attachments / directories and expand in-prompt @path mentions
    raw_files = (req.attachments or []) + (req.files or [])
    raw_dirs = req.dirs or []

    # Check if raw_files contains images
    if raw_files:
        for rf in raw_files:
            if isinstance(rf, dict) and (rf.get("dataUrl") or rf.get("url")):
                img_item = extract_raw_image_data(rf.get("dataUrl") or rf.get("url"), fname=rf.get("name") or "image.png")
                if img_item:
                    extracted_images.append(img_item)
            elif isinstance(rf, str) and (rf.startswith("data:image/") or rf.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"))):
                img_item = extract_raw_image_data(rf)
                if img_item:
                    extracted_images.append(img_item)

    # Ingest text code/files into prompt context (excluding image attachments)
    non_image_files = [
        f for f in raw_files
        if not (isinstance(f, str) and (f.startswith("data:image/") or f.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"))))
        and not (isinstance(f, dict) and (f.get("isImage") or str(f.get("dataUrl", "")).startswith("data:image/")))
    ]
    if AttachmentIngestor is not None and (non_image_files or raw_dirs or "@" in current_prompt):
        ingestor = AttachmentIngestor()
        bundled_prompt, _, _ = ingestor.bundle_context(
            current_prompt,
            files=non_image_files if non_image_files else None,
            dirs=raw_dirs if raw_dirs else None,
        )
        current_prompt = bundled_prompt

    effective_prompt = format_effective_prompt(current_prompt, system_prompt, history)

    created_timestamp = int(time.time())
    completion_id = f"chatcmpl-{uuid.uuid4().hex[:12]}"

    # 1. Check Read Cache (Bypassed if image generation is requested or images are attached)
    cache_query = effective_prompt if history else current_prompt
    cached_response = (
        cache.get(
            model_slug,
            cache_query,
            web_search=web_search,
            agentic=agentic,
            deep_research=deep_research,
        )
        if (cache.enabled and not image_gen and not extracted_images)
        else None
    )

    # -----------------------------------------------------------------------
    # Case A: Cache Hit (Streaming SSE)
    # -----------------------------------------------------------------------
    if cached_response and req.stream:
        async def cached_stream_gen():
            first_chunk = {
                "id": completion_id,
                "object": "chat.completion.chunk",
                "created": created_timestamp,
                "model": req.model,
                "choices": [{
                    "index": 0,
                    "delta": {"role": "assistant", "content": ""},
                    "finish_reason": None,
                }],
            }
            yield f"data: {json.dumps(first_chunk)}\n\n"

            words = cached_response.split(" ")
            for i, word in enumerate(words):
                chunk_text = word if i == 0 else " " + word
                chunk_data = {
                    "id": completion_id,
                    "object": "chat.completion.chunk",
                    "created": created_timestamp,
                    "model": req.model,
                    "choices": [{
                        "index": 0,
                        "delta": {"content": chunk_text},
                        "finish_reason": None,
                    }],
                }
                yield f"data: {json.dumps(chunk_data)}\n\n"
                await asyncio.sleep(0.01)

            final_chunk = {
                "id": completion_id,
                "object": "chat.completion.chunk",
                "created": created_timestamp,
                "model": req.model,
                "choices": [{
                    "index": 0,
                    "delta": {},
                    "finish_reason": "stop",
                }],
            }
            yield f"data: {json.dumps(final_chunk)}\n\n"
            yield "data: [DONE]\n\n"

        return StreamingResponse(
            cached_stream_gen(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-FreeAI-Cache": "HIT",
                "X-FreeAI-WebSearch": "true" if web_search else "false",
                "X-FreeAI-Agentic": "true" if agentic else "false",
                "X-FreeAI-DeepResearch": "true" if deep_research else "false",
                "X-FreeAI-ImageGen": "true" if image_gen else "false",
            },
        )

    # -----------------------------------------------------------------------
    # Case B: Cache Hit (Non-Streaming JSON)
    # -----------------------------------------------------------------------
    if cached_response and not req.stream:
        return {
            "id": completion_id,
            "object": "chat.completion",
            "created": created_timestamp,
            "model": req.model,
            "choices": [{
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": cached_response,
                },
                "finish_reason": "stop",
            }],
            "usage": {
                "prompt_tokens": len(effective_prompt.split()),
                "completion_tokens": len(cached_response.split()),
                "total_tokens": len(effective_prompt.split()) + len(cached_response.split()),
            },
            "freeai_cache": "HIT",
            "freeai_web_search": web_search,
            "freeai_agentic": agentic,
            "freeai_image_gen": False,
        }

    # -----------------------------------------------------------------------
    # Case C: Cache Miss (Live Stream over WebSocket)
    # -----------------------------------------------------------------------
    if req.stream:
        async def live_stream_gen():
            max_retries = 3
            accumulated: List[str] = []
            sources: List[Dict[str, str]] = []
            uploaded_file_parts: List[Dict[str, Any]] = []
            success = False

            for attempt in range(max_retries):
                account = pool.get_account(auto_create=True)
                if not account:
                    err_chunk = {
                        "id": completion_id,
                        "object": "chat.completion.chunk",
                        "created": created_timestamp,
                        "model": req.model,
                        "choices": [{
                            "index": 0,
                            "delta": {"content": "\n[FreeAI Error: No accounts available in accounts.json and auto-create failed.]"},
                            "finish_reason": "stop",
                        }],
                    }
                    yield f"data: {json.dumps(err_chunk)}\n\n"
                    yield "data: [DONE]\n\n"
                    return

                email = account.get("email")
                client = UseAIChatClient(account)
                has_sent_role_chunk = False

                # Upload multimodal images to Use.ai R2 storage for native visual perception
                if extracted_images and not uploaded_file_parts:
                    for img in extracted_images:
                        try:
                            up_res = client.upload_file(
                                img["bytes"],
                                filename=img["filename"],
                                mime_type=img["mime_type"],
                            )
                            if up_res and up_res.get("key"):
                                uploaded_file_parts.append({
                                    "type": "file",
                                    "filename": up_res.get("filename", img["filename"]),
                                    "mediaType": up_res.get("mediaType", img["mime_type"]),
                                    "url": up_res.get("url"),
                                    "r2Key": up_res.get("key"),
                                })
                                logger.info(f"[Vision] Successfully uploaded {img['filename']} to R2: {up_res.get('url')}")
                        except Exception as up_err:
                            logger.warning(f"[Vision] R2 upload error for {img.get('filename')}: {up_err}")

                multimodal_parts = list(uploaded_file_parts) + [{"type": "text", "text": effective_prompt}] if uploaded_file_parts else None

                got_tokens = False
                try:
                    async for frame in client.stream_chat_generator(
                        effective_prompt,
                        model_slug,
                        web_search=web_search,
                        agentic=agentic,
                        deep_research=deep_research,
                        image_gen=image_gen,
                        image_style=image_style,
                        image_ratio=image_ratio,
                        parts=multimodal_parts,
                    ):
                        f_type = frame.get("type")
                        if f_type == "source":
                            sources.append(frame.get("source", {}))

                        elif f_type == "image":
                            img_obj = frame.get("image", {})
                            img_url = img_obj.get("url", "")
                            img_md = f"\n\n![Generated Image]({img_url})\n\n"
                            accumulated.append(img_md)
                            got_tokens = True
                            chunk_data = {
                                "id": completion_id,
                                "object": "chat.completion.chunk",
                                "created": created_timestamp,
                                "model": req.model,
                                "choices": [{
                                    "index": 0,
                                    "delta": {"content": img_md},
                                    "finish_reason": None,
                                }],
                            }
                            yield f"data: {json.dumps(chunk_data)}\n\n"

                        elif f_type == "delta":
                            if not has_sent_role_chunk:
                                first_chunk = {
                                    "id": completion_id,
                                    "object": "chat.completion.chunk",
                                    "created": created_timestamp,
                                    "model": req.model,
                                    "choices": [{
                                        "index": 0,
                                        "delta": {"role": "assistant", "content": ""},
                                        "finish_reason": None,
                                    }],
                                }
                                yield f"data: {json.dumps(first_chunk)}\n\n"
                                has_sent_role_chunk = True

                            got_tokens = True
                            token_text = frame.get("delta", "")
                            accumulated.append(token_text)
                            chunk_data = {
                                "id": completion_id,
                                "object": "chat.completion.chunk",
                                "created": created_timestamp,
                                "model": req.model,
                                "choices": [{
                                    "index": 0,
                                    "delta": {"content": token_text},
                                    "finish_reason": None,
                                }],
                            }
                            yield f"data: {json.dumps(chunk_data)}\n\n"

                        elif f_type == "done":
                            if frame.get("exhausted"):
                                pool.retire_account(email)

                            if got_tokens or (frame.get("response") and not frame.get("error")):
                                success = True
                                full_resp = "".join(accumulated).strip() or frame.get("response", "").strip()
                                if cache.enabled and full_resp and not image_gen and not extracted_images:
                                    cache.set(
                                        model_slug,
                                        cache_query,
                                        full_resp,
                                        web_search=web_search,
                                        agentic=agentic,
                                        deep_research=deep_research,
                                        sources=sources or frame.get("sources", []),
                                    )
                                break
                            else:
                                pool.retire_account(email)
                                logger.warning(f"[Gateway] Account {email} failed ({frame.get('error')}). Retiring and retrying...")
                                break

                except Exception as e:
                    logger.exception(f"[Gateway] Stream generation error with account {email}: {e}")
                    pool.retire_account(email)
                    if got_tokens:
                        err_chunk = {
                            "id": completion_id,
                            "object": "chat.completion.chunk",
                            "created": created_timestamp,
                            "model": req.model,
                            "choices": [{
                                "index": 0,
                                "delta": {"content": f"\n\n[FreeAI Stream Interrupted: {e}]"},
                                "finish_reason": "error",
                            }],
                        }
                        yield f"data: {json.dumps(err_chunk)}\n\n"
                        yield "data: [DONE]\n\n"
                        return
                    else:
                        logger.warning(f"[Gateway] Account {email} failed before tokens. Retrying with next account...")
                        continue

                if success:
                    break

            if not success and not got_tokens:
                err_chunk = {
                    "id": completion_id,
                    "object": "chat.completion.chunk",
                    "created": created_timestamp,
                    "model": req.model,
                    "choices": [{
                        "index": 0,
                        "delta": {"content": "\n\n[FreeAI Error: All account attempts exhausted. Please replenish accounts or retry.]"},
                        "finish_reason": "stop",
                    }],
                }
                yield f"data: {json.dumps(err_chunk)}\n\n"

            final_chunk = {
                "id": completion_id,
                "object": "chat.completion.chunk",
                "created": created_timestamp,
                "model": req.model,
                "choices": [{
                    "index": 0,
                    "delta": {},
                    "finish_reason": "stop",
                }],
            }
            yield f"data: {json.dumps(final_chunk)}\n\n"
            yield "data: [DONE]\n\n"

        return StreamingResponse(
            live_stream_gen(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-FreeAI-Cache": "MISS",
                "X-FreeAI-WebSearch": "true" if web_search else "false",
                "X-FreeAI-Agentic": "true" if agentic else "false",
                "X-FreeAI-DeepResearch": "true" if deep_research else "false",
                "X-FreeAI-ImageGen": "true" if image_gen else "false",
            },
        )

    # -----------------------------------------------------------------------
    # Case D: Cache Miss (Live Non-Streaming JSON)
    # -----------------------------------------------------------------------
    max_retries = 3
    final_text = ""
    result_sources: List[Dict[str, str]] = []
    uploaded_file_parts: List[Dict[str, Any]] = []
    for _ in range(max_retries):
        account = pool.get_account(auto_create=True)
        if not account:
            raise HTTPException(status_code=503, detail="No accounts available in accounts.json.")

        email = account.get("email")
        client = UseAIChatClient(account)

        # Upload multimodal images to Use.ai R2 storage for native visual perception
        if extracted_images and not uploaded_file_parts:
            for img in extracted_images:
                try:
                    up_res = client.upload_file(
                        img["bytes"],
                        filename=img["filename"],
                        mime_type=img["mime_type"],
                    )
                    if up_res and up_res.get("key"):
                        uploaded_file_parts.append({
                            "type": "file",
                            "filename": up_res.get("filename", img["filename"]),
                            "mediaType": up_res.get("mediaType", img["mime_type"]),
                            "url": up_res.get("url"),
                            "r2Key": up_res.get("key"),
                        })
                        logger.info(f"[Vision] Successfully uploaded {img['filename']} to R2: {up_res.get('url')}")
                except Exception as up_err:
                    logger.warning(f"[Vision] R2 upload error for {img.get('filename')}: {up_err}")

        multimodal_parts = list(uploaded_file_parts) + [{"type": "text", "text": effective_prompt}] if uploaded_file_parts else None
        try:
            result = await client.stream_chat(
                effective_prompt,
                model_slug,
                web_search=web_search,
                agentic=agentic,
                deep_research=deep_research,
                image_gen=image_gen,
                image_style=image_style,
                image_ratio=image_ratio,
                parts=multimodal_parts,
            )
        except Exception as e:
            logger.exception(f"[Gateway] Non-streaming chat error with account {email}: {e}")
            pool.retire_account(email)
            continue

        if result.get("exhausted") or not result.get("success"):
            pool.retire_account(email)

        if result.get("success") and (result.get("response") or result.get("images")):
            final_text = result.get("response", "")
            if not final_text and result.get("images"):
                img_urls = [im.get("url") for im in result["images"] if im.get("url")]
                final_text = "\n\n".join([f"![Generated Image]({u})" for u in img_urls])
            result_sources = result.get("sources", [])
            if cache.enabled and not image_gen and not extracted_images:
                cache.set(
                    model_slug,
                    cache_query,
                    final_text,
                    web_search=web_search,
                    agentic=agentic,
                    deep_research=deep_research,
                    sources=result_sources,
                )
            break
        else:
            print(f"[Gateway] Account {email} failed ({result.get('error')}). Retiring and retrying with next account...")

    if not final_text:
        raise HTTPException(status_code=502, detail="Failed to retrieve AI model response.")

    return {
        "id": completion_id,
        "object": "chat.completion",
        "created": created_timestamp,
        "model": req.model,
        "choices": [{
            "index": 0,
            "message": {
                "role": "assistant",
                "content": final_text,
            },
            "finish_reason": "stop",
        }],
        "usage": {
            "prompt_tokens": len(effective_prompt.split()),
            "completion_tokens": len(final_text.split()),
            "total_tokens": len(effective_prompt.split()) + len(final_text.split()),
        },
        "freeai_cache": "MISS",
        "freeai_web_search": web_search,
        "freeai_agentic": agentic,
        "freeai_image_gen": image_gen,
        "freeai_sources": result_sources,
    }


# ---------------------------------------------------------------------------
# Image Generation Endpoint (/v1/images/generations)
# ---------------------------------------------------------------------------

@app.post("/v1/images/generations")
async def generate_images(req: ImageGenerationRequest):
    """
    OpenAI-compatible Image Generation Endpoint (/v1/images/generations).
    Dispatches generation requests through Use.ai's native isImageGenerationMode pipeline.
    """
    pool = get_pool()

    size_map = {
        "1024x1024": "1:1",
        "512x512": "1:1",
        "1:1": "1:1",
        "1792x1024": "16:9",
        "1024x576": "16:9",
        "16:9": "16:9",
        "1024x1792": "9:16",
        "576x1024": "9:16",
        "9:16": "9:16",
        "1024x768": "4:3",
        "4:3": "4:3",
        "768x1024": "3:4",
        "3:4": "3:4",
    }
    ratio = size_map.get(req.size or "1024x1024", "1:1")
    style = req.style or "realistic"

    max_retries = 3
    data_list = []
    created_ts = int(time.time())

    last_error = "Unknown error"
    for attempt in range(max_retries):
        account = pool.get_account(auto_create=True)
        if not account:
            logger.error("[Images] No accounts available in accounts.json and auto-create failed.")
            raise HTTPException(status_code=503, detail="No accounts available in accounts.json and auto-create failed.")

        email = account.get("email")
        client = UseAIChatClient(account)
        try:
            logger.info(f"[Images] Attempt {attempt+1}/{max_retries}: Generating image prompt='{req.prompt[:60]}...' style={style} ratio={ratio} with {email}")
            result = await client.generate_image(
                prompt=req.prompt,
                style=style,
                ratio=ratio,
                timeout=90,
            )
        except Exception as e:
            logger.exception(f"[Images] Error generating image with account {email}: {e}")
            last_error = str(e)
            pool.retire_account(email)
            continue

        if result.get("exhausted") or not result.get("success"):
            err_msg = result.get("error") or "Unknown upstream failure"
            last_error = err_msg
            logger.warning(f"[Images] Account {email} unsuccessful: {err_msg}. Retiring account...")
            pool.retire_account(email)

        if result.get("success"):
            imgs = result.get("images", [])
            for im in imgs:
                url = im.get("url")
                if url:
                    data_list.append({"url": url})

            # Fallback markdown image url extraction
            if not data_list and result.get("response"):
                import re
                urls = re.findall(r'https?://[^\s\)\"\']+', result["response"])
                for u in urls:
                    if any(ext in u.lower() for ext in [".png", ".jpg", ".jpeg", ".webp", "image", "googleusercontent"]):
                        data_list.append({"url": u})

            if data_list:
                logger.info(f"[Images] Successfully generated {len(data_list)} image(s) for prompt '{req.prompt[:50]}'")
                return {
                    "created": created_ts,
                    "data": data_list,
                }

    if not data_list:
        logger.error(f"[Images] All {max_retries} attempts failed: {last_error}")
        raise HTTPException(
            status_code=502,
            detail=f"Failed to generate image from upstream provider: {last_error}",
        )


# ---------------------------------------------------------------------------
# Forensic Image Inspection Endpoint (/v1/images/inspect)
# ---------------------------------------------------------------------------

@app.post("/v1/images/inspect")
async def inspect_image_endpoint(req: ImageInspectRequest):
    """
    Forensic Deep Inspection Endpoint (/v1/images/inspect).
    Extracts container structure, IDAT zlib payload decompression, scanline filter histograms,
    Shannon entropy, EXIF/XMP metadata, and steganography/anomaly signatures.
    """
    if ImageInspector is None:
        raise HTTPException(status_code=500, detail="ImageInspector engine is not available.")

    if req.file:
        report = ImageInspector.inspect_file(req.file)
    elif req.url:
        report = ImageInspector.inspect_url(req.url)
    elif req.b64_json:
        report = ImageInspector.inspect_base64(req.b64_json)
    else:
        raise HTTPException(status_code=400, detail="Must provide 'file' path, 'url', or 'b64_json' string.")

    markdown_summary = ImageInspector.format_markdown_summary(report)
    return {
        "success": bool(report.get("valid", False) or report.get("status") == "success"),
        "report": report,
        "markdown": markdown_summary,
    }


# ---------------------------------------------------------------------------
# CLI Entrypoint
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="FreeAI OpenAI-Compatible Local API Gateway"
    )
    parser.add_argument(
        "--host",
        type=str,
        default="127.0.0.1",
        help="Host address to bind (default: 127.0.0.1)",
    )
    parser.add_argument(
        "--port",
        type=int,
        default=8000,
        help="Port to listen on (default: 8000)",
    )
    parser.add_argument(
        "--accounts",
        type=str,
        default="accounts.json",
        help="Path to accounts JSON file (default: accounts.json)",
    )
    parser.add_argument(
        "--cache-file",
        type=str,
        default="chat_cache.json",
        help="Path to response cache JSON file (default: chat_cache.json)",
    )
    parser.add_argument(
        "--no-cache",
        action="store_true",
        help="Disable response read/write cache",
    )
    parser.add_argument(
        "--auto-maintain",
        action="store_true",
        help="Start autonomous background maintainer thread to monitor and replenish account pool",
    )
    parser.add_argument(
        "--min-reserve",
        type=int,
        default=15,
        help="Minimum account reserve threshold for auto-maintenance (default: 15)",
    )
    parser.add_argument(
        "--log-file",
        type=str,
        default="server.log",
        help="Path to persistent server log output file (default: server.log)",
    )
    parser.add_argument(
        "--proxy",
        type=str,
        default=None,
        help="Optional single proxy URL (e.g. http://user:pass@host:port)",
    )
    parser.add_argument(
        "--proxy-file",
        type=str,
        default=None,
        help="Optional path to proxy list file (e.g. 'Webshare 10 proxies.txt')",
    )
    parser.add_argument(
        "--gmail",
        type=str,
        default=os.environ.get("GMAIL_ADDRESS", "your_email@gmail.com"),
        help="Base Gmail address for autonomous replenishment (default: env GMAIL_ADDRESS or your_email@gmail.com)",
    )
    parser.add_argument(
        "--gmail-password",
        type=str,
        default=os.environ.get("GMAIL_APP_PASSWORD", ""),
        help="16-character Google App Password for IMAP access (default: env GMAIL_APP_PASSWORD)",
    )

    args = parser.parse_args()

    # Re-initialize logging with configured log-file
    global logger
    logger = setup_server_logging(args.log_file)

    # Proxy source: CLI flag -> FREEAI_PROXIES env var (Direct host connection is default)
    proxy_source = args.proxy_file or (args.proxy if args.proxy else None) or os.environ.get("FREEAI_PROXIES")

    # Initialize shared singletons
    global GLOBAL_POOL, GLOBAL_CACHE, GLOBAL_MAINTAINER
    GLOBAL_POOL = AccountPool(args.accounts)
    GLOBAL_CACHE = ResponseCache(args.cache_file, enabled=not args.no_cache)
    GLOBAL_MAINTAINER = PoolMaintainer(
        accounts_file=args.accounts,
        min_reserve=args.min_reserve,
        target_reserve=max(args.min_reserve + 5, 20),
        proxy_source=proxy_source,
        gmail_address=args.gmail,
        gmail_password=args.gmail_password,
    )

    if args.auto_maintain:
        GLOBAL_MAINTAINER.start_background_thread(check_interval=60)
        print("[+] Autonomous account pool maintainer started in background thread.")

    proxy_info = f"{GLOBAL_MAINTAINER.proxy_pool.available_count()} active proxies ({proxy_source})" if GLOBAL_MAINTAINER.proxy_pool else "Direct (no proxy pool)"

    print("\n" + "=" * 65)
    print("        FreeAI OpenAI-Compatible Local API Gateway")
    print("=" * 65)
    print(f"Base URL         : http://{args.host}:{args.port}/v1")
    print(f"Chat Completions : http://{args.host}:{args.port}/v1/chat/completions")
    print(f"Models Endpoint  : http://{args.host}:{args.port}/v1/models")
    print(f"Server Logs      : {os.path.abspath(args.log_file)}")
    print(f"Active Accounts  : {GLOBAL_POOL.count()}")
    print(f"Proxy Pool       : {proxy_info}")
    print(f"Response Cache   : {'Enabled' if GLOBAL_CACHE.enabled else 'Disabled'} ({len(GLOBAL_CACHE.entries)} items)")
    print("=" * 65)
    print("\n[+] Gateway is ready to accept client connections.")
    print("[+] Point Cursor, Continue.dev, Cline, or OpenAI SDK to the Base URL.\n")

    uvicorn.run(
        app,
        host=args.host,
        port=args.port,
        log_level="info",
    )


if __name__ == "__main__":
    main()
