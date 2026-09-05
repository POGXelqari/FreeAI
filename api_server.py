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

    model_config = ConfigDict(extra="allow")


def resolve_model_and_modes(
    raw_model: str,
    req_body: Optional[ChatCompletionRequest] = None,
    headers: Optional[Dict[str, str]] = None,
) -> Tuple[str, bool, bool, bool]:
    """
    Resolves base model slug and determines execution mode flags (web_search, agentic, deep_research)
    from model name suffix, request body attributes, or HTTP headers.

    Supported model suffixes:
      - '<model>-web' or '<model>-search': Live Web Search
      - '<model>-agent' or '<model>-agentic': Agentic Mode
      - '<model>-deep' or '<model>-research': Deep Research Mode
    """
    clean_model = raw_model.strip().lower()
    web_search = False
    agentic = False
    deep_research = False

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

    # 3. Check HTTP headers overrides
    if headers:
        if headers.get("x-web-search", "").lower() in ("true", "1", "yes"):
            web_search = True
        if headers.get("x-agentic-mode", "").lower() in ("true", "1", "yes"):
            agentic = True
        if headers.get("x-deep-research", "").lower() in ("true", "1", "yes"):
            deep_research = True

    model_slug = ModelCatalog.resolve(clean_model)
    return model_slug, web_search, agentic, deep_research



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

# Mount Web UI static assets
web_assets_dir = os.path.join(current_dir, "web")
if os.path.isdir(web_assets_dir):
    app.mount("/static", StaticFiles(directory=web_assets_dir), name="static")

# Global State
GLOBAL_POOL: Optional[AccountPool] = None
GLOBAL_CACHE: Optional[ResponseCache] = None


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


# ---------------------------------------------------------------------------
# Helper: Format Messages Array into Injected Context
# ---------------------------------------------------------------------------

def extract_prompt_and_context(messages: List[ChatMessage]) -> Tuple[str, Optional[str], List[Dict[str, str]]]:
    """
    Extracts current user prompt, system instructions, and prior dialogue history
    from OpenAI messages array.
    """
    system_prompt = None
    history: List[Dict[str, str]] = []
    current_user_prompt = ""

    for i, msg in enumerate(messages):
        # Extract plain string content
        if isinstance(msg.content, str):
            content_str = msg.content
        elif isinstance(msg.content, list):
            text_parts = [
                part.get("text", "")
                for part in msg.content
                if isinstance(part, dict) and part.get("type") == "text"
            ]
            content_str = "".join(text_parts)
        else:
            content_str = str(msg.content)

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
        # Fallback if last message was not marked as user
        last_msg = messages[-1]
        current_user_prompt = str(last_msg.content).strip()

    return current_user_prompt, system_prompt, history


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

@app.get("/")
async def root(request: Request):
    """Health check, gateway status, or Web UI Dashboard."""
    accept = request.headers.get("accept", "")
    web_index = os.path.join(current_dir, "web", "index.html")
    if "text/html" in accept and os.path.isfile(web_index):
        return FileResponse(web_index)

    pool = get_pool()
    cache = get_cache()
    c_stats = cache.stats()

    return {
        "service": "FreeAI OpenAI-Compatible Local Gateway",
        "status": "online",
        "port": 8000,
        "accounts_in_pool": pool.count(),
        "cache": {
            "enabled": c_stats["enabled"],
            "total_items": c_stats["entries"],
            "total_hits": c_stats["total_hits"],
            "size_kb": c_stats["size_kb"],
        },
        "available_models_count": len(ModelCatalog.MODELS),
        "endpoints": [
            "POST /v1/chat/completions",
            "GET  /v1/models",
            "GET  /health",
            "GET  /chat",
        ],
    }


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
    ]
    for pop_id, target in popular_bases:
        for suffix, mode_owner in [
            ("", "FreeAI"),
            ("-web", "FreeAI WebSearch"),
            ("-agent", "FreeAI Agentic"),
            ("-deep", "FreeAI DeepResearch"),
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


@app.post("/v1/chat/completions")
async def chat_completions(req: ChatCompletionRequest, raw_req: Request):
    """
    OpenAI-compatible chat completions endpoint.
    Supports both real-time Server-Sent Events (SSE) streaming and standard JSON responses.
    Integrates Live Web Search (-web), Agentic Mode (-agent), and Deep Research (-deep).
    """
    header_dict = {k.lower(): v for k, v in raw_req.headers.items()}
    model_slug, web_search, agentic, deep_research = resolve_model_and_modes(
        req.model,
        req_body=req,
        headers=header_dict,
    )
    model_info = ModelCatalog.get_info(model_slug)
    pool = get_pool()
    cache = get_cache()

    current_prompt, system_prompt, history = extract_prompt_and_context(req.messages)
    effective_prompt = format_effective_prompt(current_prompt, system_prompt, history)

    created_timestamp = int(time.time())
    completion_id = f"chatcmpl-{uuid.uuid4().hex[:12]}"

    # 1. Check Read Cache
    cache_query = effective_prompt if history else current_prompt
    cached_response = (
        cache.get(
            model_slug,
            cache_query,
            web_search=web_search,
            agentic=agentic,
            deep_research=deep_research,
        )
        if cache.enabled
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
        }

    # -----------------------------------------------------------------------
    # Case C: Cache Miss (Live Stream over WebSocket)
    # -----------------------------------------------------------------------
    if req.stream:
        async def live_stream_gen():
            max_retries = 3
            accumulated: List[str] = []
            sources: List[Dict[str, str]] = []
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

                got_tokens = False
                async for frame in client.stream_chat_generator(
                    effective_prompt,
                    model_slug,
                    web_search=web_search,
                    agentic=agentic,
                    deep_research=deep_research,
                ):
                    f_type = frame.get("type")
                    if f_type == "source":
                        sources.append(frame.get("source", {}))

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
                            if cache.enabled and full_resp:
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
                            print(f"[Gateway] Account {email} failed ({frame.get('error')}). Retiring and retrying...")
                            break

                if success:
                    break

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
            },
        )

    # -----------------------------------------------------------------------
    # Case D: Cache Miss (Live Non-Streaming JSON)
    # -----------------------------------------------------------------------
    max_retries = 3
    final_text = ""
    result_sources: List[Dict[str, str]] = []
    for _ in range(max_retries):
        account = pool.get_account(auto_create=True)
        if not account:
            raise HTTPException(status_code=503, detail="No accounts available in accounts.json.")

        email = account.get("email")
        client = UseAIChatClient(account)
        result = await client.stream_chat(
            effective_prompt,
            model_slug,
            web_search=web_search,
            agentic=agentic,
            deep_research=deep_research,
        )

        if result.get("exhausted") or not result.get("success"):
            pool.retire_account(email)

        if result.get("success") and result.get("response"):
            final_text = result["response"]
            result_sources = result.get("sources", [])
            if cache.enabled:
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
        "freeai_sources": result_sources,
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

    args = parser.parse_args()

    # Initialize shared singletons
    global GLOBAL_POOL, GLOBAL_CACHE
    GLOBAL_POOL = AccountPool(args.accounts)
    GLOBAL_CACHE = ResponseCache(args.cache_file, enabled=not args.no_cache)

    print("\n" + "=" * 65)
    print("        FreeAI OpenAI-Compatible Local API Gateway")
    print("=" * 65)
    print(f"Base URL         : http://{args.host}:{args.port}/v1")
    print(f"Chat Completions : http://{args.host}:{args.port}/v1/chat/completions")
    print(f"Models Endpoint  : http://{args.host}:{args.port}/v1/models")
    print(f"Active Accounts  : {GLOBAL_POOL.count()}")
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
