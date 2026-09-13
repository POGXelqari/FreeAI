#!/usr/bin/env python3
"""
Use.ai AI Chat Streamer, Response Cache & Multi-Turn Memory Manager
------------------------------------------------------------------
Prompts and streams real-time AI responses using the 1-free-message quota
from registered accounts in accounts.json. Features:
- Read/Write Response Cache: Saves account quota on repeated/similar queries.
- Multi-Turn Conversation Memory: Injects dialogue history across rotated accounts.
- Session Persistence: Save, load, and manage persistent named conversation sessions.
- Automatic Quota Management: Prunes exhausted accounts from accounts.json.

Supported Models:
- Claude Sonnet 5, Fable 5, Opus 5, Opus 4.8
- GPT-5.4, GPT-5.5, GPT-5.6 Sol
- Gemini 3.6 Flash
- DeepSeek V4 Pro
- Grok 4.6
- Kimi K3, K2.6
- GLM 5.2
"""

import os
import sys
import json
import uuid
import time
import hashlib
import asyncio
import argparse
from typing import Optional, Dict, Any, List, Tuple

try:
    import requests
except ImportError:
    print("Error: 'requests' package is required. Install with: pip install requests")
    sys.exit(1)

try:
    import websockets
    try:
        import websockets.exceptions as ws_exceptions
    except ImportError:
        ws_exceptions = None
except ImportError:
    print("Error: 'websockets' package is required. Install with: pip install websockets")
    sys.exit(1)

# Ensure clean UTF-8 console output across Windows and Unix
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

# Import account creator from local directory
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

try:
    from account_creator import UseAIAuthClient
except ImportError:
    UseAIAuthClient = None

try:
    from attachment_pipeline import AttachmentIngestor
except ImportError:
    AttachmentIngestor = None

try:
    from image_inspector import ImageInspector
except ImportError:
    ImageInspector = None

try:
    from agent_tools import AgentToolRegistry, run_command, manage_task
except ImportError:
    AgentToolRegistry = None
    run_command = None
    manage_task = None

try:
    from agent_engine import AgentEngine
except ImportError:
    AgentEngine = None


class ModelCatalog:
    """Catalog of available AI models and friendly aliases."""

    MODELS: Dict[str, Dict[str, Any]] = {
        # Anthropic
        "gateway-sonnet-5": {
            "name": "Claude Sonnet 5",
            "provider": "Anthropic",
            "aliases": ["claude", "sonnet", "sonnet-5", "claude-sonnet", "claude-3-5-sonnet", "claude-3-7-sonnet", "claude-3.5-sonnet", "claude-3.7-sonnet"],
        },
        "gateway-fable-5": {
            "name": "Claude Fable 5",
            "provider": "Anthropic",
            "aliases": ["fable", "fable-5", "claude-fable"],
        },
        "gateway-opus-5": {
            "name": "Claude Opus 5",
            "provider": "Anthropic",
            "aliases": ["opus", "opus-5", "claude-opus", "claude-3-opus"],
        },
        "gateway-opus-4-8": {
            "name": "Claude Opus 4.8",
            "provider": "Anthropic",
            "aliases": ["opus-4.8", "opus-48"],
        },
        # Google
        "gateway-gemini-3-6-flash": {
            "name": "Gemini 3.6 Flash",
            "provider": "Google",
            "aliases": ["gemini", "flash", "gemini-3.6", "gemini-flash", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash"],
        },
        # OpenAI
        "gateway-gpt-5-4": {
            "name": "GPT-5.4",
            "provider": "OpenAI",
            "aliases": ["gpt", "gpt-4o", "gpt-4", "gpt-5", "gpt-5.4", "gpt5", "gpt-4-turbo", "gpt-4o-mini"],
        },
        "gateway-gpt-5-5": {
            "name": "GPT-5.5",
            "provider": "OpenAI",
            "aliases": ["gpt-5.5", "gpt55"],
        },
        "gateway-gpt-5-6": {
            "name": "GPT-5.6 Sol",
            "provider": "OpenAI",
            "aliases": ["gpt-5.6", "gpt56", "sol", "gpt-5-sol"],
        },
        # DeepSeek
        "gateway-deepseek-v4-pro": {
            "name": "DeepSeek V4 Pro",
            "provider": "DeepSeek",
            "aliases": ["deepseek", "deepseek-v4", "deepseek-pro", "deepseek-chat", "deepseek-coder", "deepseek-r1"],
        },
        # xAI
        "gateway-grok-4-6": {
            "name": "Grok 4.6",
            "provider": "xAI",
            "aliases": ["grok", "grok-4.6", "grok4"],
        },
        # Moonshot
        "gateway-kimi-k3": {
            "name": "Kimi K3",
            "provider": "Moonshot AI",
            "aliases": ["kimi", "kimi-k3"],
        },
        "gateway-kimi-k2-6": {
            "name": "Kimi K2.6",
            "provider": "Moonshot AI",
            "aliases": ["kimi-k2.6", "kimi-k26"],
        },
        # Z.AI
        "gateway-glm-5-2": {
            "name": "GLM 5.2",
            "provider": "Z.AI",
            "aliases": ["glm", "glm-5.2", "glm5"],
        },
        # Auto / Instant
        "instant": {
            "name": "Instant (Auto Routing)",
            "provider": "Use.ai",
            "aliases": ["instant", "auto", "default"],
        },
        # Image Generation Models
        "imagen-3": {
            "name": "Imagen 3",
            "provider": "Google",
            "aliases": ["imagen", "imagen-3", "image-google"],
        },
        "dall-e-3": {
            "name": "DALL-E 3",
            "provider": "OpenAI",
            "aliases": ["dalle", "dall-e", "dalle-3", "dall-e-3"],
        },
        "flux-1-schnell": {
            "name": "FLUX.1 Schnell",
            "provider": "Black Forest Labs",
            "aliases": ["flux", "flux-1", "flux-schnell"],
        },
    }

    @classmethod
    def resolve(cls, model_input: Optional[str]) -> str:
        """Resolve alias or slug to exact backend model ID (defaults to GPT-5.6 Sol)."""
        if not model_input:
            return "gateway-gpt-5-6"

        clean = model_input.strip().lower()

        # Check exact ID match
        for model_id in cls.MODELS:
            if model_id.lower() == clean:
                return model_id

        # Check aliases
        for model_id, data in cls.MODELS.items():
            if clean in data.get("aliases", []):
                return model_id

        # Partial matching
        for model_id, data in cls.MODELS.items():
            if clean in model_id.lower() or clean in data["name"].lower():
                return model_id

        # Return as-is if user specified a custom slug
        return model_input.strip()

    @classmethod
    def get_info(cls, model_id: str) -> Dict[str, Any]:
        """Get model information dict."""
        return cls.MODELS.get(
            model_id,
            {"name": model_id, "provider": "Unknown", "aliases": []}
        )

    @classmethod
    def get_ordered_models(cls) -> List[Tuple[str, Dict[str, Any]]]:
        """Return ordered list of text chat & image models with GPT-5.6 Sol first."""
        order = [
            "gateway-gpt-5-6",
            "gateway-gpt-5-5",
            "gateway-gpt-5-4",
            "gateway-sonnet-5",
            "gateway-opus-5",
            "gateway-fable-5",
            "gateway-opus-4-8",
            "gateway-gemini-3-6-flash",
            "gateway-deepseek-v4-pro",
            "gateway-grok-4-6",
            "gateway-kimi-k3",
            "gateway-kimi-k2-6",
            "gateway-glm-5-2",
            "instant",
            "imagen-3",
            "dall-e-3",
            "flux-1-schnell",
        ]
        res = []
        for mid in order:
            if mid in cls.MODELS:
                res.append((mid, cls.MODELS[mid]))
        return res

    @classmethod
    def prompt_model_selection(cls, current_model: Optional[str] = None) -> str:
        """Interactive numbered model selection picker."""
        ordered = cls.get_ordered_models()
        print("\n" + "=" * 60)
        print("                FreeAI Model Selection")
        print("=" * 60)
        curr_slug = cls.resolve(current_model) if current_model else "gateway-gpt-5-6"
        for idx, (mid, data) in enumerate(ordered, 1):
            is_default = " [DEFAULT]" if mid == "gateway-gpt-5-6" else ""
            is_active = " (active)" if mid == curr_slug else ""
            print(f" [{idx:2d}] {data['name']:<20} ({data['provider']:<14}){is_default}{is_active}")
        print("=" * 60)

        try:
            choice = input(f"\nSelect model [1-{len(ordered)}] or enter name/alias [default: 1]: ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n")
            return curr_slug

        if not choice:
            return "gateway-gpt-5-6"

        if choice.isdigit():
            num = int(choice)
            if 1 <= num <= len(ordered):
                selected_slug = ordered[num - 1][0]
                print(f"[*] Selected: {ordered[num - 1][1]['name']} ({selected_slug})")
                return selected_slug

        resolved = cls.resolve(choice)
        info = cls.get_info(resolved)
        print(f"[*] Selected: {info['name']} ({resolved})")
        return resolved

    @classmethod
    def list_models_text(cls) -> str:
        """Format models catalog as a readable table."""
        lines = [
            f"{'Model Name':<22} | {'Provider':<14} | {'Model Slug':<25} | {'Aliases'}",
            "-" * 90,
        ]
        for mid, data in cls.MODELS.items():
            alias_str = ", ".join(data.get("aliases", []))
            lines.append(
                f"{data['name']:<22} | {data['provider']:<14} | {mid:<25} | {alias_str}"
            )
        return "\n".join(lines)


class ResponseCache:
    """
    Read/Write response caching engine.
    Caches model responses to disk (chat_cache.json) keyed by sha256(model_slug + normalized_prompt).
    When a cached query is detected, answers instantly with 0 accounts consumed.
    """

    def __init__(self, cache_file: str = "chat_cache.json", enabled: bool = True):
        self.cache_file = os.path.abspath(cache_file)
        self.enabled = enabled
        self.entries: Dict[str, Dict[str, Any]] = {}
        self.load()

    @staticmethod
    def normalize(prompt: str) -> str:
        """Normalize prompt string for uniform lookup (strip, lowercase, collapse whitespace)."""
        return " ".join(prompt.strip().lower().split())

    def _hash_key(
        self,
        model_slug: str,
        prompt: str,
        web_search: bool = False,
        agentic: bool = False,
        deep_research: bool = False,
    ) -> str:
        """Generate deterministic cache key incorporating model, prompt, and execution mode."""
        norm = self.normalize(prompt)
        mode_tags = []
        if web_search:
            mode_tags.append("web")
        if agentic:
            mode_tags.append("agent")
        if deep_research:
            mode_tags.append("deep")
        tag_str = f"[{':'.join(mode_tags)}]" if mode_tags else ""
        raw = f"{model_slug.strip().lower()}::{tag_str}::{norm}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()

    def load(self) -> None:
        """Load cache entries from JSON file."""
        if not self.enabled:
            return
        if os.path.exists(self.cache_file):
            try:
                with open(self.cache_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, dict):
                        self.entries = data.get("entries", {})
                    else:
                        self.entries = {}
            except Exception as e:
                print(f"[Cache] Warning: Failed to load {self.cache_file}: {e}")
                self.entries = {}
        else:
            self.entries = {}

    def save(self) -> None:
        """Atomically persist cache entries to disk."""
        if not self.enabled:
            return
        temp_file = f"{self.cache_file}.tmp"
        try:
            payload = {
                "version": "1.0",
                "updatedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
                "totalEntries": len(self.entries),
                "entries": self.entries,
            }
            with open(temp_file, "w", encoding="utf-8") as f:
                json.dump(payload, f, indent=2, ensure_ascii=False)
            os.replace(temp_file, self.cache_file)
        except Exception as e:
            print(f"[Cache] Error saving cache to {self.cache_file}: {e}")

    def get(
        self,
        model_slug: str,
        prompt: str,
        web_search: bool = False,
        agentic: bool = False,
        deep_research: bool = False,
    ) -> Optional[str]:
        """Retrieve cached response if available. Updates hit count and access timestamp."""
        if not self.enabled:
            return None
        key = self._hash_key(
            model_slug,
            prompt,
            web_search=web_search,
            agentic=agentic,
            deep_research=deep_research,
        )
        entry = self.entries.get(key)
        if entry:
            entry["hits"] = entry.get("hits", 0) + 1
            entry["lastAccessed"] = time.strftime("%Y-%m-%d %H:%M:%S")
            self.save()
            return entry.get("response")
        return None

    def set(
        self,
        model_slug: str,
        prompt: str,
        response: str,
        web_search: bool = False,
        agentic: bool = False,
        deep_research: bool = False,
        sources: Optional[List[Dict[str, str]]] = None,
    ) -> None:
        """Store a model response in the cache with mode and source metadata."""
        if not self.enabled or not response or not response.strip():
            return
        key = self._hash_key(
            model_slug,
            prompt,
            web_search=web_search,
            agentic=agentic,
            deep_research=deep_research,
        )
        self.entries[key] = {
            "model": model_slug,
            "prompt": prompt.strip(),
            "response": response.strip(),
            "web_search": web_search,
            "agentic": agentic,
            "deep_research": deep_research,
            "sources": sources or [],
            "createdAt": time.strftime("%Y-%m-%d %H:%M:%S"),
            "lastAccessed": time.strftime("%Y-%m-%d %H:%M:%S"),
            "hits": 1,
        }
        self.save()

    def clear(self) -> int:
        """Wipe all entries from cache. Returns number of purged entries."""
        count = len(self.entries)
        self.entries = {}
        self.save()
        return count

    def stats(self) -> Dict[str, Any]:
        """Return cache health, item count, total hits, and file size."""
        total_hits = sum(e.get("hits", 0) for e in self.entries.values())
        size_bytes = os.path.getsize(self.cache_file) if os.path.exists(self.cache_file) else 0
        return {
            "enabled": self.enabled,
            "file": self.cache_file,
            "entries": len(self.entries),
            "total_hits": total_hits,
            "size_kb": round(size_bytes / 1024, 2),
        }


class ConversationMemory:
    """
    Multi-turn conversation memory with sliding context window and session persistence.
    Formats conversation history into structured prompt injection so that single-quota
    accounts can seamlessly maintain multi-turn dialogue without backend session state.
    """

    def __init__(
        self,
        system_prompt: Optional[str] = None,
        max_turns: int = 10,
        sessions_dir: str = "sessions",
    ):
        self.system_prompt = system_prompt
        self.max_turns = max_turns  # Max pairs of (user, assistant) turns
        self.sessions_dir = os.path.abspath(sessions_dir)
        self.history: List[Dict[str, str]] = []
        os.makedirs(self.sessions_dir, exist_ok=True)

    def add_user_message(self, text: str) -> None:
        """Add user turn to conversation history."""
        self.history.append({
            "role": "user",
            "content": text.strip(),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        })
        self._trim()

    def add_assistant_message(self, text: str) -> None:
        """Add assistant response to conversation history."""
        self.history.append({
            "role": "assistant",
            "content": text.strip(),
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        })
        self._trim()

    def add_turn(self, user_text: str, assistant_text: str) -> None:
        """Add complete user-assistant turn."""
        self.add_user_message(user_text)
        self.add_assistant_message(assistant_text)

    def _trim(self) -> None:
        """Maintain sliding window of maximum turns."""
        max_messages = self.max_turns * 2
        if len(self.history) > max_messages:
            self.history = self.history[-max_messages:]

    def build_prompt(self, current_message: str) -> str:
        """
        Build the prompt to send to the AI model.
        If no history and no system prompt, returns the raw message unadorned.
        Otherwise, injects system instructions and prior turns as clear context.
        """
        if not self.system_prompt and not self.history:
            return current_message

        parts: List[str] = []
        if self.system_prompt and self.system_prompt.strip():
            parts.append(f"[System Instructions]\n{self.system_prompt.strip()}")

        if self.history:
            dialogue_lines: List[str] = []
            for msg in self.history:
                role_label = "User" if msg["role"] == "user" else "Assistant"
                dialogue_lines.append(f"{role_label}: {msg['content']}")
            parts.append("[Conversation Context]\n" + "\n".join(dialogue_lines))

        parts.append(f"[Current User Message]\n{current_message.strip()}")
        parts.append("Please respond directly to the current user message above while maintaining continuity with the context.")
        return "\n\n".join(parts)

    def clear(self) -> None:
        """Clear conversation history (retains system prompt)."""
        self.history = []

    def get_history_summary(self) -> str:
        """Return formatted summary of stored dialogue turns."""
        if not self.history:
            return "No conversation history recorded in this session."
        lines = []
        for idx, msg in enumerate(self.history, 1):
            role = "User" if msg["role"] == "user" else "Assistant"
            preview = msg["content"][:75] + ("..." if len(msg["content"]) > 75 else "")
            lines.append(f"  {idx:2d}. [{role}] {preview}")
        return "\n".join(lines)

    def save_session(self, session_name: str) -> str:
        """Save current memory session to JSON file."""
        if not session_name.endswith(".json"):
            session_name = f"{session_name}.json"
        filepath = os.path.join(self.sessions_dir, session_name)
        data = {
            "savedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
            "systemPrompt": self.system_prompt,
            "maxTurns": self.max_turns,
            "turnsCount": len(self.history) // 2,
            "messagesCount": len(self.history),
            "history": self.history,
        }
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return filepath

    def load_session(self, session_name: str) -> bool:
        """Load session state from JSON file."""
        if not session_name.endswith(".json"):
            session_name = f"{session_name}.json"
        filepath = os.path.join(self.sessions_dir, session_name)
        if not os.path.exists(filepath):
            return False
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.system_prompt = data.get("systemPrompt", self.system_prompt)
                self.max_turns = data.get("maxTurns", self.max_turns)
                self.history = data.get("history", [])
                return True
        except Exception as e:
            print(f"[Memory] Error loading session from {filepath}: {e}")
            return False

    def list_sessions(self) -> List[str]:
        """List all saved session names."""
        if not os.path.exists(self.sessions_dir):
            return []
        return [f[:-5] for f in os.listdir(self.sessions_dir) if f.endswith(".json")]


class AccountPool:
    """Manages reading, rotating, creating, and retiring accounts."""

    def __init__(self, file_path: str = "accounts.json"):
        self.file_path = os.path.abspath(file_path)
        self.accounts: List[Dict[str, Any]] = []
        self.load()

    def load(self) -> List[Dict[str, Any]]:
        """Load accounts from JSON file."""
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, list):
                        self.accounts = data
                    else:
                        self.accounts = []
            except Exception as e:
                print(f"[AccountPool] Warning: Failed to parse {self.file_path}: {e}")
                self.accounts = []
        else:
            self.accounts = []
        return self.accounts

    def save(self) -> None:
        """Atomically persist accounts list to JSON file."""
        temp_file = f"{self.file_path}.tmp"
        try:
            with open(temp_file, "w", encoding="utf-8") as f:
                json.dump(self.accounts, f, indent=2)
            os.replace(temp_file, self.file_path)
        except Exception as e:
            print(f"[AccountPool] Error saving accounts to {self.file_path}: {e}")

    def count(self) -> int:
        """Return number of accounts remaining in pool."""
        return len(self.accounts)

    def get_account(self, auto_create: bool = True) -> Optional[Dict[str, Any]]:
        """
        Get the next available account from pool.
        If empty and auto_create is True, generates a new account.
        """
        if self.accounts:
            return self.accounts[0]

        if not auto_create:
            return None

        if UseAIAuthClient is None:
            print("[AccountPool] 'account_creator.py' not found. Cannot auto-create account.")
            return None

        print("[AccountPool] Account pool empty. Generating a fresh account on-the-fly...")
        creator = UseAIAuthClient()
        res = creator.create_account()

        if res.get("success"):
            new_acc = {
                "email": res["email"],
                "userId": res["userId"],
                "sessionToken": res["sessionToken"],
                "accessToken": res["accessToken"],
                "expiresAt": res["expiresAt"],
                "planType": res["planType"],
                "cookies": res["cookies"],
                "cookieHeader": res["cookieHeader"],
                "createdAt": time.strftime("%Y-%m-%d %H:%M:%S"),
            }
            self.accounts.append(new_acc)
            self.save()
            print(f"[AccountPool] Successfully created account: {new_acc['email']}")
            return new_acc
        else:
            print(f"[AccountPool] Failed to auto-create account: {res.get('error') or res.get('response')}")
            return None

    def retire_account(self, identifier: str) -> bool:
        """
        Remove an exhausted account by email or userId and save.
        """
        initial_len = len(self.accounts)
        self.accounts = [
            acc for acc in self.accounts
            if acc.get("email") != identifier and acc.get("userId") != identifier
        ]
        if len(self.accounts) < initial_len:
            self.save()
            print(f"\n[AccountPool] Retired exhausted account: {identifier} (Remaining accounts: {len(self.accounts)})")
            return True
        return False


class UseAIChatClient:
    """Handles session handshake, token acquisition, and WebSocket streaming."""

    BASE_URL = "https://use.ai"
    WS_BASE = "wss://use.ai/agent/agents/budget-agent"
    USER_AGENT = (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/130.0.0.0 Safari/537.36"
    )

    DEFAULT_HEADERS = {
        "User-Agent": USER_AGENT,
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Content-Type": "application/json",
        "Origin": BASE_URL,
        "Referer": f"{BASE_URL}/",
        "Sec-CH-UA": '"Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
    }

    def __init__(self, account: Dict[str, Any]):
        self.account = account
        self.email = account.get("email")
        self.user_id = account.get("userId")
        self.cookies = account.get("cookies", {})

        self.session = requests.Session()
        self.session.headers.update(self.DEFAULT_HEADERS)

        # Inject session cookies (omit stale __cf_bm)
        for k in ["__Secure-better-auth.session_token", "__Secure-better-auth.session_data"]:
            if k in self.cookies:
                self.session.cookies.set(k, self.cookies[k])

    def fetch_auth_tokens(self) -> Tuple[Optional[str], Optional[str]]:
        """
        Refreshes session, acquires fresh Cloudflare clearance (__cf_bm), and retrieves auth tokens.
        """
        try:
            # 1. Warm session to establish Cloudflare Bot Management (__cf_bm)
            self.session.get(self.BASE_URL, timeout=10)

            # 2. Validate authenticated session
            r_sess = self.session.get(f"{self.BASE_URL}/v1/auth/get-session", timeout=12)
            if r_sess.status_code != 200:
                print(f"[ChatClient] Warning: Session check returned {r_sess.status_code}")
                return None, None

            # 3. Fetch Worker JWT Token
            r_tok = self.session.get(f"{self.BASE_URL}/v1/auth/token", timeout=12)
            auth_token = r_tok.json().get("token") if r_tok.status_code == 200 else None

            # 4. Fetch App Attestation Token
            r_attest = self.session.post(f"{self.BASE_URL}/v1/auth/app-attestation", json={}, timeout=12)
            app_token = r_attest.json().get("token") if r_attest.status_code == 200 else None

            return auth_token, app_token
        except Exception as e:
            print(f"[ChatClient] Error retrieving auth tokens: {e}")
            return None, None

    def upload_file(
        self,
        file_bytes: bytes,
        filename: str = "image.png",
        mime_type: str = "image/png",
        timeout: int = 25,
    ) -> Optional[Dict[str, Any]]:
        """
        Uploads a binary file or image to Use.ai's Cloudflare R2 storage endpoint (https://files.use.ai/upload).
        Returns a dict containing:
          - 'key': R2 storage key (e.g., 'chat/files/<uuid>-<filename>')
          - 'url': Public CDN URL (e.g., 'https://files.use.ai/files/<key>')
          - 'filename': Clean filename
          - 'mediaType': MIME type
        Returns None if upload fails.
        """
        try:
            upload_url = "https://files.use.ai/upload"
            s = requests.Session()
            s.cookies = self.session.cookies
            headers = {
                "User-Agent": self.USER_AGENT,
                "Origin": self.BASE_URL,
                "Referer": f"{self.BASE_URL}/",
                "X-User-Id": self.user_id,
            }
            files = {
                "file": (filename, file_bytes, mime_type)
            }
            resp = s.post(upload_url, files=files, headers=headers, timeout=timeout)
            if resp.status_code in (200, 201):
                data = resp.json()
                key = data.get("key")
                if key:
                    public_url = f"https://files.use.ai/files/{key}"
                    return {
                        "success": True,
                        "key": key,
                        "url": public_url,
                        "filename": filename,
                        "mediaType": mime_type,
                    }
            print(f"[ChatClient] Upload failed ({resp.status_code}): {resp.text[:200]}")
            return None
        except Exception as e:
            print(f"[ChatClient] Error uploading file to R2: {e}")
            return None

    async def stream_chat(
        self,
        prompt: str,
        model_slug: str,
        web_search: bool = False,
        agentic: bool = False,
        deep_research: bool = False,
        image_gen: bool = False,
        image_style: str = "realistic",
        image_ratio: str = "1:1",
        timeout: int = 50,
        parts: Optional[List[Dict[str, Any]]] = None,
    ) -> Dict[str, Any]:
        """
        Sends the prompt over WebSocket and streams incoming tokens in real-time.
        Supports web search mode (source citations), agentic mode, deep research, and image generation.
        Returns result dict with completion status, full response text, sources list, images, and quota status.
        """
        auth_token, app_token = self.fetch_auth_tokens()
        if not auth_token or not app_token:
            return {
                "success": False,
                "error": "Failed to obtain required auth tokens.",
                "exhausted": True,
            }

        chat_id = str(uuid.uuid4())
        msg_id = str(uuid.uuid4())

        # Construct WebSocket URL matching client architecture
        ws_url = (
            f"{self.WS_BASE}/{chat_id}?"
            f"token={auth_token}&"
            f"app_token={app_token}&"
            f"userId={self.user_id}&"
            f"userType=regular&"
            f"userEmail={self.email}&"
            f"planType=free&"
            f"isTestUser=false&"
            f"freemiumFunnel=false&"
            f"botd_verdict=clean"
        )

        # Chrome-matching headers required for Cloudflare WAF bypass
        cookie_header = "; ".join(f"{k}={v}" for k, v in self.session.cookies.get_dict().items())
        ws_headers = {
            "Cookie": cookie_header,
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Sec-Fetch-Dest": "websocket",
            "Sec-Fetch-Mode": "websocket",
            "Sec-Fetch-Site": "same-origin",
            "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
        }

        # Construct message parts (multimodal attachments + text prompt)
        if parts:
            msg_parts = list(parts)
            has_text = any(p.get("type") == "text" for p in msg_parts)
            if not has_text and prompt:
                msg_parts.append({"type": "text", "text": prompt})
        else:
            msg_parts = [{"type": "text", "text": prompt}]

        # Chat prompt payload with live modes
        payload = {
            "chatId": chat_id,
            "userId": self.user_id,
            "userEmail": self.email,
            "planType": "free",
            "selectedModel": model_slug,
            "messages": [
                {
                    "id": msg_id,
                    "role": "user",
                    "parts": msg_parts,
                }
            ],
            "messageId": msg_id,
            "isWebSearchMode": web_search,
            "isDeepResearchMode": deep_research,
            "isImageGenerationMode": image_gen,
            "agenticMode": agentic,
        }
        if deep_research:
            payload["deepResearchProcessor"] = "pro-fast"
        if image_gen:
            payload["imageGenerationStyle"] = image_style
            payload["imageGenerationRatio"] = image_ratio
            payload["imageGenerationProvider"] = "openrouter"

        accumulated_text: List[str] = []
        sources: List[Dict[str, str]] = []
        generated_images: List[Dict[str, Any]] = []
        is_exhausted = False
        error_msg = None

        try:
            async with websockets.connect(
                ws_url,
                origin=self.BASE_URL,
                user_agent_header=self.USER_AGENT,
                additional_headers=ws_headers,
                open_timeout=15,
            ) as ws:
                await ws.send(json.dumps(payload))

                while True:
                    try:
                        raw = await asyncio.wait_for(ws.recv(), timeout=timeout)
                    except asyncio.TimeoutError:
                        print("\n[ChatClient] Timed out waiting for response tokens.")
                        break

                    frame = json.loads(raw)
                    f_type = frame.get("type")
                    chunk = frame.get("chunk", {})
                    chunk_type = chunk.get("type")

                    # Live web search query and status notifications
                    if chunk_type == "data-webSearchStatus":
                        st_data = chunk.get("data", {})
                        st_title = st_data.get("title")
                        if st_title:
                            print(f"\n[WebSearch] {st_title}", flush=True)

                    # Tool start notification (Image synthesis, etc.)
                    elif chunk_type == "tool-input-start":
                        t_name = chunk.get("toolName")
                        if t_name == "image-google":
                            print("\n[ImageGen] Synthesizing image via native engine...", flush=True)

                    # Web search source citations
                    elif chunk_type == "source-url":
                        s_url = chunk.get("url")
                        s_title = chunk.get("title")
                        if s_url and not any(s.get("url") == s_url for s in sources):
                            sources.append({"url": s_url, "title": s_title or s_url})

                    # AI Generated Image Output
                    elif chunk_type == "tool-image-google":
                        img_output = chunk.get("output", {})
                        imgs = img_output.get("images", [])
                        for img in imgs:
                            generated_images.append(img)
                            u = img.get("url")
                            w = img.get("width", 1024)
                            h = img.get("height", 1024)
                            img_md = f"\n\n![Generated Image]({u})\n*Generated Image ({w}x{h})*\n"
                            accumulated_text.append(img_md)
                            print(f"\n[ImageGen] Synthesized Image: {u} ({w}x{h})", flush=True)

                    # Streaming text chunk
                    elif chunk_type == "text-delta":
                        delta = chunk.get("delta", "") or chunk.get("textDelta", "")
                        accumulated_text.append(delta)
                        print(delta, end="", flush=True)

                    # Completion of message stream
                    elif f_type == "stream-complete":
                        is_exhausted = True
                        break

                    # Rate limit / Quota limit reached
                    elif (
                        f_type == "rate-limit-error"
                        or frame.get("messageMetadata", {}).get("errorType") in ("usage_limit", "trial_limit", "guest_limit")
                    ):
                        is_exhausted = True
                        meta = frame.get("messageMetadata", {})
                        error_msg = meta.get("errorType", "usage_limit")
                        break

                    # General error frame
                    elif f_type == "error" or "error" in frame:
                        error_msg = frame.get("error") or "Server returned error frame"
                        break

        except Exception as e:
            err_str = str(e)
            resp = getattr(e, "response", None)
            status_code = getattr(resp, "status_code", None)
            if status_code in (401, 403) or "403" in err_str or "401" in err_str:
                is_exhausted = True
                error_msg = f"WebSocket handshake rejected (HTTP {status_code or '403/401'}): {e}"
            elif "handshake" in err_str.lower() or "status code" in err_str.lower():
                error_msg = f"WebSocket handshake rejected: {e}"
            else:
                error_msg = f"WebSocket error: {e}"

        # Append formatted markdown sources if web search yielded citations
        if sources:
            sources_md = "\n\n### Sources:\n" + "\n".join(
                f"{i+1}. [{s.get('title') or s['url']}]({s['url']})"
                for i, s in enumerate(sources)
            )
            print(sources_md, flush=True)
            accumulated_text.append(sources_md)

        full_response = "".join(accumulated_text).strip()
        success = (len(full_response) > 0 or len(generated_images) > 0) and error_msg is None

        return {
            "success": success,
            "response": full_response,
            "sources": sources,
            "images": generated_images,
            "error": error_msg,
            "exhausted": is_exhausted or (len(full_response) > 0),
        }

    async def stream_chat_generator(
        self,
        prompt: str,
        model_slug: str,
        web_search: bool = False,
        agentic: bool = False,
        deep_research: bool = False,
        image_gen: bool = False,
        image_style: str = "realistic",
        image_ratio: str = "1:1",
        timeout: int = 50,
        parts: Optional[List[Dict[str, Any]]] = None,
    ):
        """
        Async generator yielding chunks over WebSocket for API server integration.
        Yields dict frames:
            {"type": "delta", "delta": "word"}
            {"type": "source", "source": {"url": "...", "title": "..."}}
            {"type": "image", "image": {"url": "...", "width": 1024, "height": 1024}}
            {"type": "done", "response": "full text", "sources": [...], "images": [...], "exhausted": bool, "error": Optional[str]}
        """
        auth_token, app_token = self.fetch_auth_tokens()
        if not auth_token or not app_token:
            yield {
                "type": "done",
                "response": "",
                "sources": [],
                "images": [],
                "error": "Failed to obtain required auth tokens.",
                "exhausted": True,
            }
            return

        chat_id = str(uuid.uuid4())
        msg_id = str(uuid.uuid4())

        ws_url = (
            f"{self.WS_BASE}/{chat_id}?"
            f"token={auth_token}&"
            f"app_token={app_token}&"
            f"userId={self.user_id}&"
            f"userType=regular&"
            f"userEmail={self.email}&"
            f"planType=free&"
            f"isTestUser=false&"
            f"freemiumFunnel=false&"
            f"botd_verdict=clean"
        )

        cookie_header = "; ".join(f"{k}={v}" for k, v in self.session.cookies.get_dict().items())
        ws_headers = {
            "Cookie": cookie_header,
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Sec-Fetch-Dest": "websocket",
            "Sec-Fetch-Mode": "websocket",
            "Sec-Fetch-Site": "same-origin",
            "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits",
        }

        # Construct message parts (multimodal attachments + text prompt)
        if parts:
            msg_parts = list(parts)
            has_text = any(p.get("type") == "text" for p in msg_parts)
            if not has_text and prompt:
                msg_parts.append({"type": "text", "text": prompt})
        else:
            msg_parts = [{"type": "text", "text": prompt}]

        payload = {
            "chatId": chat_id,
            "userId": self.user_id,
            "userEmail": self.email,
            "planType": "free",
            "selectedModel": model_slug,
            "messages": [
                {
                    "id": msg_id,
                    "role": "user",
                    "parts": msg_parts,
                }
            ],
            "messageId": msg_id,
            "isWebSearchMode": web_search,
            "isDeepResearchMode": deep_research,
            "isImageGenerationMode": image_gen,
            "agenticMode": agentic,
        }
        if deep_research:
            payload["deepResearchProcessor"] = "pro-fast"
        if image_gen:
            payload["imageGenerationStyle"] = image_style
            payload["imageGenerationRatio"] = image_ratio
            payload["imageGenerationProvider"] = "openrouter"

        accumulated_text: List[str] = []
        sources: List[Dict[str, str]] = []
        generated_images: List[Dict[str, Any]] = []
        is_exhausted = False
        error_msg = None

        try:
            async with websockets.connect(
                ws_url,
                origin=self.BASE_URL,
                user_agent_header=self.USER_AGENT,
                additional_headers=ws_headers,
                open_timeout=15,
            ) as ws:
                await ws.send(json.dumps(payload))

                while True:
                    try:
                        raw = await asyncio.wait_for(ws.recv(), timeout=timeout)
                    except asyncio.TimeoutError:
                        break

                    frame = json.loads(raw)
                    f_type = frame.get("type")
                    chunk = frame.get("chunk", {})
                    chunk_type = chunk.get("type")

                    if chunk_type == "source-url":
                        s_url = chunk.get("url")
                        s_title = chunk.get("title")
                        if s_url and not any(s.get("url") == s_url for s in sources):
                            source_item = {"url": s_url, "title": s_title or s_url}
                            sources.append(source_item)
                            yield {"type": "source", "source": source_item}

                    elif chunk_type == "tool-image-google":
                        img_output = chunk.get("output", {})
                        imgs = img_output.get("images", [])
                        for img in imgs:
                            generated_images.append(img)
                            yield {"type": "image", "image": img}
                            u = img.get("url")
                            w = img.get("width", 1024)
                            h = img.get("height", 1024)
                            img_md = f"\n\n![Generated Image]({u})\n*Generated Image ({w}x{h})*\n"
                            accumulated_text.append(img_md)
                            yield {"type": "delta", "delta": img_md}

                    elif chunk_type == "text-delta":
                        delta = chunk.get("delta", "") or chunk.get("textDelta", "")
                        if delta:
                            accumulated_text.append(delta)
                            yield {"type": "delta", "delta": delta}

                    elif f_type == "stream-complete":
                        is_exhausted = True
                        break

                    elif (
                        f_type == "rate-limit-error"
                        or frame.get("messageMetadata", {}).get("errorType") in ("usage_limit", "trial_limit", "guest_limit")
                    ):
                        is_exhausted = True
                        meta = frame.get("messageMetadata", {})
                        error_msg = meta.get("errorType", "usage_limit")
                        break

                    elif f_type == "error" or "error" in frame:
                        error_msg = frame.get("error") or "Server returned error frame"
                        break

        except Exception as e:
            err_str = str(e)
            resp = getattr(e, "response", None)
            status_code = getattr(resp, "status_code", None)
            if status_code in (401, 403) or "403" in err_str or "401" in err_str:
                is_exhausted = True
                error_msg = f"WebSocket handshake rejected (HTTP {status_code or '403/401'}): {e}"
            elif "handshake" in err_str.lower() or "status code" in err_str.lower():
                error_msg = f"WebSocket handshake rejected: {e}"
            else:
                error_msg = f"WebSocket error: {e}"

        # If sources collected, stream sources markdown to client
        if sources:
            sources_md = "\n\n### Sources:\n" + "\n".join(
                f"{i+1}. [{s.get('title') or s['url']}]({s['url']})"
                for i, s in enumerate(sources)
            )
            accumulated_text.append(sources_md)
            yield {"type": "delta", "delta": sources_md}

        full_response = "".join(accumulated_text).strip()
        yield {
            "type": "done",
            "response": full_response,
            "sources": sources,
            "images": generated_images,
            "error": error_msg,
            "exhausted": is_exhausted or (len(full_response) > 0),
        }

    async def generate_image(
        self,
        prompt: str,
        style: str = "realistic",
        ratio: str = "1:1",
        timeout: int = 60,
    ) -> Dict[str, Any]:
        """Synthesize image via native image-google tool pipeline."""
        return await self.stream_chat(
            prompt,
            model_slug="instant",
            image_gen=True,
            image_style=style,
            image_ratio=ratio,
            timeout=timeout,
        )



def run_prompt_workflow(
    prompt: str,
    model_name: str,
    accounts_file: str = "accounts.json",
    auto_create: bool = True,
    cache: Optional[ResponseCache] = None,
    memory: Optional[ConversationMemory] = None,
    session_name: Optional[str] = None,
    web_search: bool = False,
    agentic: bool = False,
    deep_research: bool = False,
    image_gen: bool = False,
    image_style: str = "realistic",
    image_ratio: str = "1:1",
    files: Optional[List[str]] = None,
    dirs: Optional[List[str]] = None,
    yolo: bool = False,
    max_steps: int = 25,
) -> Tuple[bool, Optional[str]]:
    """
    Executes a prompt workflow:
    1. Ingests and bundles attached files / directories and expands in-prompt @path mentions.
    2. If agentic mode active, hands off to Autonomous AgentEngine with local root/PowerShell tools.
    3. Checks response cache. If hit, outputs instantly with 0 accounts consumed.
    4. Injects conversation memory context (if active).
    5. Pops account from pool.
    6. Streams response from backend AI model with optional web search, agentic reasoning, or image generation.
    7. Saves output & sources to cache & conversation memory.
    8. Automatically deletes exhausted account from accounts.json.
    """
    model_slug = ModelCatalog.resolve(model_name)
    model_info = ModelCatalog.get_info(model_slug)

    # 0. Bundle file attachments and expand in-prompt @path mentions
    actual_prompt = prompt
    if AttachmentIngestor is not None:
        ingestor = AttachmentIngestor()
        bundled_prompt, attached_files, warns = ingestor.bundle_context(
            prompt, files=files, dirs=dirs
        )
        for w in warns:
            print(f"[Attachment Warning] {w}")
        if attached_files:
            print(f"[Attachment] Injected {len(attached_files)} file(s) into context ({', '.join(f['path'] for f in attached_files)})")
        actual_prompt = bundled_prompt

    # 0.5. Autonomous Agentic Engine Handoff (Full Root Access, PowerShell, Files, Coding, Web, Image tools)
    if agentic and AgentEngine is not None:
        engine = AgentEngine(
            accounts_file=accounts_file,
            default_model=model_slug,
            max_steps=max_steps,
            yolo=yolo,
        )
        return engine.run_autonomous_task(
            goal=actual_prompt,
            model_name=model_slug,
            auto_create=auto_create,
            max_steps=max_steps,
            yolo=yolo,
            memory=memory,
            session_name=session_name,
        )

    # 1. Build contextual prompt with conversation history (if active)
    if memory:
        effective_prompt = memory.build_prompt(actual_prompt)
    else:
        effective_prompt = actual_prompt

    # 2. Check Read Cache (skip for image generation)
    if not image_gen and cache and cache.enabled:
        cache_query = effective_prompt if (memory and memory.history) else prompt
        cached_ans = cache.get(
            model_slug,
            cache_query,
            web_search=web_search,
            agentic=agentic,
            deep_research=deep_research,
        )
        if cached_ans:
            print(f"\n[CACHE HIT: {model_info['name']}] (0 accounts consumed)")
            print("-" * 60)
            print(cached_ans)
            print("\n" + "-" * 60)
            if memory:
                memory.add_turn(prompt, cached_ans)
                if session_name:
                    memory.save_session(session_name)
            return True, cached_ans

    # 3. Account selection
    pool = AccountPool(accounts_file)
    account = pool.get_account(auto_create=auto_create)

    if not account:
        print("\n[!] No accounts available in accounts.json and auto-create is disabled/failed.")
        print("Run 'python account_creator.py --count 5' to generate accounts first.")
        return False, None

    email = account.get("email")
    print(f"\n[AI Model] : {model_info['name']} ({model_slug})")
    if web_search:
        print("[Mode]     : Live Web Search Enabled")
    if agentic:
        print("[Mode]     : Agentic Multi-Step Reasoning Enabled")
    if deep_research:
        print("[Mode]     : Deep Research Enabled")
    if image_gen:
        print(f"[Mode]     : AI Image Generation Enabled (Style: {image_style}, Ratio: {image_ratio})")
    print(f"[Account]  : {email} (Pool size: {pool.count()})")
    if memory and memory.history:
        turns_count = len(memory.history) // 2
        sess_label = f" (session: '{session_name}')" if session_name else ""
        print(f"[Memory]   : Injected {turns_count} prior turn(s) ({len(memory.history)} messages){sess_label}")
    print(f"[Prompt]   : {prompt}\n" + "-" * 60)

    client = UseAIChatClient(account)
    result = asyncio.run(
        client.stream_chat(
            effective_prompt,
            model_slug,
            web_search=web_search,
            agentic=agentic,
            deep_research=deep_research,
            image_gen=image_gen,
            image_style=image_style,
            image_ratio=image_ratio,
        )
    )
    print("\n" + "-" * 60)

    # 4. Quota management
    if result.get("exhausted"):
        pool.retire_account(email)

    # 5. Handle response & cache write
    if result.get("success") and result.get("response"):
        response_text = result["response"]
        if not image_gen and cache and cache.enabled:
            cache_query = effective_prompt if (memory and memory.history) else prompt
            cache.set(
                model_slug,
                cache_query,
                response_text,
                web_search=web_search,
                agentic=agentic,
                deep_research=deep_research,
                sources=result.get("sources", []),
            )
        if memory:
            memory.add_turn(prompt, response_text)
            if session_name:
                memory.save_session(session_name)
        return True, response_text

    if not result.get("success") and result.get("error"):
        if result.get("error") in ("usage_limit", "Failed to obtain required auth tokens."):
            reason = "exhausted" if result.get("error") == "usage_limit" else "expired/invalid"
            print(f"[!] Account was {reason}. Retired {email}.")
            print("Retrying with next account in pool...")
            return run_prompt_workflow(
                prompt,
                model_name,
                accounts_file,
                auto_create,
                cache=cache,
                memory=memory,
                session_name=session_name,
                web_search=web_search,
                agentic=agentic,
                deep_research=deep_research,
                image_gen=image_gen,
                image_style=image_style,
                image_ratio=image_ratio,
                files=files,
                dirs=dirs,
                yolo=yolo,
                max_steps=max_steps,
            )
        else:
            print(f"[!] Stream ended with error: {result.get('error')}")
            return False, None

    return False, None


def interactive_repl(
    model_name: str = "gateway-gpt-5-6",
    accounts_file: str = "accounts.json",
    auto_create: bool = True,
    cache: Optional[ResponseCache] = None,
    memory: Optional[ConversationMemory] = None,
    session_name: Optional[str] = None,
    web_search: bool = False,
    agentic: bool = False,
    deep_research: bool = False,
    image_gen: bool = False,
    image_style: str = "realistic",
    image_ratio: str = "1:1",
    yolo: bool = False,
    max_steps: int = 25,
):
    """
    Interactive command-line chat session with multi-turn memory, response caching,
    live web search, autonomous agentic reasoning, local root tools, and image generation. Automatically rotates through accounts.
    """
    model_slug = ModelCatalog.resolve(model_name)
    model_info = ModelCatalog.get_info(model_slug)
    pool = AccountPool(accounts_file)

    web_search_active = web_search
    agentic_active = agentic
    yolo_active = yolo
    deep_research_active = deep_research
    image_gen_active = image_gen
    current_image_style = image_style
    current_image_ratio = image_ratio

    if cache is None:
        cache = ResponseCache()
    if memory is None:
        memory = ConversationMemory()

    # Load session if specified
    if session_name:
        loaded = memory.load_session(session_name)
        if loaded:
            print(f"[*] Loaded active session '{session_name}' ({len(memory.history)} messages)")
        else:
            print(f"[*] Started new named session '{session_name}'")

    print("\n" + "=" * 68)
    print("       FreeAI Agentic Autonomous Multi-Model Chat & REPL")
    print("=" * 68)
    print(f"Active Model    : {model_info['name']} ({model_slug})")
    print(f"Accounts in Pool: {pool.count()}")
    print(f"Response Cache  : {'Enabled' if cache.enabled else 'Disabled'} ({len(cache.entries)} entries)")
    print(f"Session Memory  : {len(memory.history)} messages (Max turns: {memory.max_turns})")
    print(f"Autonomous Mode : {'ON' if agentic_active else 'OFF'}")
    print(f"YOLO Mode       : {'ON (Hands-Free Full Access)' if yolo_active else 'OFF (Interactive Approval)'}")
    print(f"Web Search      : {'ON' if web_search_active else 'OFF'}")
    print(f"Deep Research   : {'ON' if deep_research_active else 'OFF'}")
    print(f"Image Gen Mode  : {'ON' if image_gen_active else 'OFF'} (Style: {current_image_style}, Ratio: {current_image_ratio})")
    if memory.system_prompt:
        print(f"System Prompt   : {memory.system_prompt}")
    print("\nCommands:")
    print("  /auto [on|off]  - Toggle Autonomous Agentic AI execution mode")
    print("  /yolo [on|off]  - Toggle hands-free tool execution without confirmation")
    print("  /tools          - List available local Agent tools (PowerShell, file, web)")
    print("  /tasks          - List running background tasks and daemons")
    print("  /task <id> [act]- Manage background task: status, logs, kill")
    print("  /run <command>  - Instantly run a local PowerShell command directly")
    print("  /shell          - Open interactive direct shell session")
    print("  /model [name]   - Select/change model (opens picker if name omitted)")
    print("  /models         - List all available models table")
    print("  /web [on|off]   - Toggle or set live web search")
    print("  /image [prompt] - Synthesize an AI image on demand or toggle mode")
    print("  /style <style>  - Set image style (realistic, anime, digital-art, cinematic)")
    print("  /ratio <ratio>  - Set image aspect ratio (1:1, 16:9, 9:16, 4:3, 3:4)")
    print("  /inspect <path> - Forensically inspect image (chunks, zlib IDAT, entropy)")
    print("  /attach <path>  - Attach local file or directory to context")
    print("  /detach <path>  - Detach a staged file or directory")
    print("  /files          - List all currently staged attachments")
    print("  /clear-files    - Clear all staged attachments")
    print("  /status         - Show current model, memory, and modes status")
    print("  /history        - Show conversation history turns")
    print("  /clear          - Clear conversation memory for current session")
    print("  /system <text>  - Set or view system instructions/persona")
    print("  /cache          - Show response cache statistics")
    print("  /clearcache     - Purge response cache")
    print("  /save <name>    - Save current conversation session")
    print("  /load <name>    - Load an existing session")
    print("  /sessions       - List all saved conversation sessions")
    print("  /accounts       - Show account pool status")
    print("  /new <count>    - Create new accounts on demand")
    print("  /help           - Display available commands")
    print("  /quit or /exit  - Exit chat")
    print("=" * 68 + "\n")

    staged_files: List[str] = []
    staged_dirs: List[str] = []

    while True:
        try:
            modes_str = []
            if web_search_active:
                modes_str.append("web")
            if agentic_active:
                modes_str.append("auto")
            if yolo_active:
                modes_str.append("yolo")
            if deep_research_active:
                modes_str.append("deep")
            if image_gen_active:
                modes_str.append(f"img:{current_image_ratio}")
            mode_tag = f" | {':'.join(modes_str)}" if modes_str else ""

            prompt_label = f"[{model_info['name']}"
            if session_name:
                prompt_label += f" | {session_name}"
            prompt_label += f"{mode_tag}] > "
            user_input = input(f"\n{prompt_label}").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nExiting. Goodbye!")
            break

        if not user_input:
            continue

        # Exit command
        if user_input.lower() in ("/quit", "/exit", "exit", "quit"):
            if session_name:
                memory.save_session(session_name)
                print(f"[*] Session '{session_name}' saved.")
            print("Goodbye!")
            break

        # Help
        if user_input.lower() in ("/help", "?"):
            print("\nAvailable Commands:")
            print("  /auto [on|off]  - Toggle Autonomous Agentic AI execution mode")
            print("  /yolo [on|off]  - Toggle hands-free tool execution")
            print("  /tools          - List available local Agent tools")
            print("  /tasks          - List running background tasks and daemons")
            print("  /task <id> [act]- Manage background task: status, logs, kill")
            print("  /run <command>  - Instantly run a local PowerShell command directly")
            print("  /shell          - Open interactive direct shell session")
            print("  /model [name]   - Switch model (interactive menu if omitted)")
            print("  /models         - List models catalog")
            print("  /web [on|off]   - Toggle live web search")
            print("  /image [prompt] - Synthesize AI image")
            print("  /status         - Show current model, memory, and modes status")
            print("  /history        - Show conversation history turns")
            print("  /clear          - Clear conversation memory")
            print("  /system <text>  - Set/view system instructions")
            print("  /cache          - Show response cache statistics")
            print("  /clearcache     - Purge response cache")
            print("  /save <name>    - Save session")
            print("  /load <name>    - Load session")
            print("  /sessions       - List saved sessions")
            print("  /accounts       - Show accounts pool")
            print("  /new <count>    - Generate fresh accounts")
            print("  /quit or /exit  - Exit REPL")
            continue

        # Autonomous Agentic mode toggle (/auto or /agent)
        if user_input.startswith("/auto") or user_input.startswith("/agent"):
            parts = user_input.split()
            if len(parts) > 1:
                agentic_active = parts[1].lower() in ("on", "true", "1", "yes")
            else:
                agentic_active = not agentic_active
            status = "ENABLED" if agentic_active else "DISABLED"
            print(f"[*] Autonomous Agentic Mode is now {status}.")
            continue

        # YOLO hands-free mode toggle (/yolo)
        if user_input.startswith("/yolo"):
            parts = user_input.split()
            if len(parts) > 1:
                yolo_active = parts[1].lower() in ("on", "true", "1", "yes")
            else:
                yolo_active = not yolo_active
            status = "ENABLED" if yolo_active else "DISABLED"
            print(f"[*] YOLO Mode (Hands-Free Full Root Execution) is now {status}.")
            continue

        # List available agent tools (/tools)
        if user_input.lower() == "/tools":
            print("\n" + "=" * 68)
            print("                FreeAI Agent Tools Suite")
            print("=" * 68)
            if AgentToolRegistry is not None:
                for t_name, t_meta in AgentToolRegistry.TOOLS.items():
                    print(f"  • {t_name:<22} - {t_meta['description']}")
            else:
                print("  Agent tools registry not available.")
            print("=" * 68)
            continue

        # List background tasks (/tasks)
        if user_input.lower() == "/tasks":
            if manage_task is not None:
                res = manage_task(action="list")
                print("\n=== Active Background Tasks ===")
                print(res.to_str())
            else:
                print("[!] Task manager not available.")
            continue

        # Manage background task (/task <id> [status|logs|kill])
        if user_input.startswith("/task"):
            parts = user_input.split()
            if len(parts) >= 3:
                tid = parts[1]
                act = parts[2]
                if manage_task is not None:
                    res = manage_task(action=act, task_id=tid)
                    print(f"\n[Task {tid} - {act}]\n{res.to_str()}")
            elif len(parts) == 2:
                tid = parts[1]
                if manage_task is not None:
                    res = manage_task(action="status", task_id=tid)
                    print(f"\n[Task {tid} Status]\n{res.to_str()}")
            else:
                print("Usage: /task <task_id> [status|logs|kill]")
            continue

        # Execute immediate local PowerShell command (/run <cmd>)
        if user_input.startswith("/run "):
            cmd = user_input.split(" ", 1)[1].strip()
            print(f"[*] Executing via PowerShell: {cmd}")
            if run_command is not None:
                res = run_command(cmd)
                print(res.to_str())
            else:
                os.system(cmd)
            continue

        # Interactive sub-shell (/shell)
        if user_input.lower() in ("/shell", "/sh"):
            print("\n[*] Entering local PowerShell shell (type 'exit' to return to FreeAI REPL)...")
            shell_bin = "pwsh" if shutil.which("pwsh") else "powershell"
            try:
                subprocess.run([shell_bin, "-NoExit"])
            except Exception as e:
                print(f"[!] Shell error: {e}")
            print("[*] Returned to FreeAI REPL.")
            continue

        # Web Search toggle
        if user_input.startswith("/web"):
            parts = user_input.split()
            if len(parts) > 1:
                web_search_active = parts[1].lower() in ("on", "true", "1", "yes")
            else:
                web_search_active = not web_search_active
            status = "ENABLED" if web_search_active else "DISABLED"
            print(f"[*] Live Web Search is now {status}.")
            continue

        # Deep Research toggle
        if user_input.startswith("/deep"):
            parts = user_input.split()
            if len(parts) > 1:
                deep_research_active = parts[1].lower() in ("on", "true", "1", "yes")
            else:
                deep_research_active = not deep_research_active
            status = "ENABLED" if deep_research_active else "DISABLED"
            print(f"[*] Deep Research Mode is now {status}.")
            continue

        # Image Generation toggle or on-demand generation (/image)
        if user_input.startswith("/image"):
            parts = user_input.split(" ", 1)
            if len(parts) > 1 and parts[1].strip():
                # Direct generation request with prompt
                img_prompt = parts[1].strip()
                run_prompt_workflow(
                    prompt=img_prompt,
                    model_name=model_slug,
                    accounts_file=accounts_file,
                    auto_create=auto_create,
                    cache=cache,
                    memory=memory,
                    session_name=session_name,
                    web_search=web_search_active,
                    agentic=agentic_active,
                    deep_research=deep_research_active,
                    image_gen=True,
                    image_style=current_image_style,
                    image_ratio=current_image_ratio,
                    files=staged_files if staged_files else None,
                    dirs=staged_dirs if staged_dirs else None,
                )
                continue
            else:
                image_gen_active = not image_gen_active
                status = "ENABLED" if image_gen_active else "DISABLED"
                print(f"[*] AI Image Generation Mode is now {status} (Style: {current_image_style}, Ratio: {current_image_ratio}).")
                continue

        # Image Style configuration (/style)
        if user_input.startswith("/style"):
            parts = user_input.split(" ", 1)
            if len(parts) > 1 and parts[1].strip():
                current_image_style = parts[1].strip().lower()
                print(f"[*] Image style updated to: '{current_image_style}'")
            else:
                print(f"[*] Current image style: '{current_image_style}' (Options: realistic, anime, digital-art, cinematic)")
            continue

        # Image Aspect Ratio configuration (/ratio)
        if user_input.startswith("/ratio"):
            parts = user_input.split(" ", 1)
            if len(parts) > 1 and parts[1].strip():
                current_image_ratio = parts[1].strip()
                print(f"[*] Image aspect ratio updated to: '{current_image_ratio}'")
            else:
                print(f"[*] Current image ratio: '{current_image_ratio}' (Options: 1:1, 16:9, 9:16, 4:3, 3:4)")
            continue

        # Forensic Image Inspection (/inspect)
        if user_input.startswith("/inspect"):
            parts = user_input.split(" ", 1)
            if len(parts) > 1 and parts[1].strip():
                img_target = parts[1].strip()
                if ImageInspector is None:
                    print("[!] ImageInspector module not available.")
                else:
                    print(f"[*] Running forensic image inspection on '{img_target}'...")
                    if img_target.startswith("http://") or img_target.startswith("https://"):
                        rep = ImageInspector.inspect_url(img_target)
                    else:
                        rep = ImageInspector.inspect_file(img_target)
                    print("\n" + ImageInspector.format_markdown_summary(rep))
            else:
                print("Usage: /inspect <path_to_image_or_url>")
            continue

        # Status command
        if user_input.lower() == "/status":
            print("\n=== Session & Mode Status ===")
            print(f"  Active Model : {model_info['name']} ({model_slug})")
            print(f"  Session Name : {session_name or 'stateless'}")
            print(f"  Web Search   : {'ON' if web_search_active else 'OFF'}")
            print(f"  Agentic Mode : {'ON' if agentic_active else 'OFF'}")
            print(f"  Deep Research: {'ON' if deep_research_active else 'OFF'}")
            print(f"  Image Gen    : {'ON' if image_gen_active else 'OFF'} (Style: {current_image_style}, Ratio: {current_image_ratio})")
            print(f"  Memory Turns : {len(memory.history) // 2} ({len(memory.history)} messages)")
            print(f"  Pool Size    : {pool.count()} accounts")
            continue

        # Memory history
        if user_input.lower() == "/history":
            print("\n=== Conversation Memory History ===")
            print(memory.get_history_summary())
            continue

        # Clear memory
        if user_input.lower() == "/clear":
            memory.clear()
            print("[*] Conversation memory cleared.")
            if session_name:
                memory.save_session(session_name)
            continue

        # System prompt management
        if user_input.startswith("/system"):
            parts = user_input.split(" ", 1)
            if len(parts) > 1 and parts[1].strip():
                memory.system_prompt = parts[1].strip()
                print(f"[*] Updated system prompt: \"{memory.system_prompt}\"")
                if session_name:
                    memory.save_session(session_name)
            else:
                current_sys = memory.system_prompt or "(None configured)"
                print(f"[*] Current system prompt: {current_sys}")
                print("Tip: Use '/system <instructions>' to configure a persona or prompt.")
            continue

        # Cache statistics
        if user_input.lower() == "/cache":
            st = cache.stats()
            print("\n=== Response Cache Statistics ===")
            print(f"  Status      : {'Enabled' if st['enabled'] else 'Disabled'}")
            print(f"  File Path   : {st['file']}")
            print(f"  Total Items : {st['entries']}")
            print(f"  Total Hits  : {st['total_hits']}")
            print(f"  Disk Size   : {st['size_kb']} KB")
            continue

        # Clear cache
        if user_input.lower() == "/clearcache":
            purged = cache.clear()
            print(f"[*] Response cache purged ({purged} entries removed).")
            continue

        # Save session
        if user_input.startswith("/save"):
            parts = user_input.split(" ", 1)
            target_name = parts[1].strip() if len(parts) > 1 and parts[1].strip() else session_name
            if not target_name:
                print("[!] Please provide a session name: /save <name>")
                continue
            session_name = target_name
            saved_path = memory.save_session(target_name)
            print(f"[+] Saved session '{target_name}' to {saved_path}")
            continue

        # Load session
        if user_input.startswith("/load"):
            parts = user_input.split(" ", 1)
            if len(parts) < 2 or not parts[1].strip():
                print("[!] Please specify session to load: /load <name>")
                continue
            target_name = parts[1].strip()
            if memory.load_session(target_name):
                session_name = target_name
                print(f"[+] Loaded session '{target_name}' ({len(memory.history)} messages restored).")
            else:
                print(f"[!] Could not find session '{target_name}'. Use /sessions to list.")
            continue

        # List sessions
        if user_input.lower() == "/sessions":
            sess_list = memory.list_sessions()
            print("\n=== Saved Conversation Sessions ===")
            if sess_list:
                for s in sess_list:
                    marker = " (active)" if s == session_name else ""
                    print(f"  - {s}{marker}")
            else:
                print("  No saved sessions found in sessions/ directory.")
            continue

        # Model switch
        if user_input.startswith("/model"):
            parts = user_input.split(" ", 1)
            if len(parts) > 1 and parts[1].strip():
                new_target = parts[1].strip()
                model_slug = ModelCatalog.resolve(new_target)
            else:
                model_slug = ModelCatalog.prompt_model_selection(model_slug)
            model_info = ModelCatalog.get_info(model_slug)
            print(f"[*] Switched active model to: {model_info['name']} ({model_slug})")
            continue

        # List models
        if user_input.lower() == "/models":
            print("\n" + ModelCatalog.list_models_text())
            continue

        # Accounts pool status
        if user_input.lower() == "/accounts":
            pool.load()
            print(f"[*] Remaining accounts in pool: {pool.count()}")
            continue

        # Create new accounts
        if user_input.startswith("/new"):
            parts = user_input.split()
            count = int(parts[1]) if len(parts) > 1 and parts[1].isdigit() else 1
            if UseAIAuthClient:
                print(f"[*] Generating {count} account(s)...")
                creator = UseAIAuthClient()
                created = 0
                for _ in range(count):
                    res = creator.create_account()
                    if res.get("success"):
                        pool.accounts.append({
                            "email": res["email"],
                            "userId": res["userId"],
                            "sessionToken": res["sessionToken"],
                            "accessToken": res["accessToken"],
                            "expiresAt": res["expiresAt"],
                            "planType": res["planType"],
                            "cookies": res["cookies"],
                            "cookieHeader": res["cookieHeader"],
                            "createdAt": time.strftime("%Y-%m-%d %H:%M:%S"),
                        })
                        created += 1
                pool.save()
                print(f"[+] Generated {created}/{count} account(s). Total pool size now: {pool.count()}")
            else:
                print("[!] 'account_creator.py' not available.")
            continue

        # Attachment commands
        if user_input.startswith("/attach"):
            parts = user_input.split(" ", 1)
            if len(parts) > 1 and parts[1].strip():
                target = parts[1].strip()
                if os.path.isfile(target):
                    if target not in staged_files:
                        staged_files.append(target)
                        print(f"[*] Attached file: {target} (Total: {len(staged_files)} file(s))")
                    else:
                        print(f"[*] File already attached: {target}")
                elif os.path.isdir(target):
                    if target not in staged_dirs:
                        staged_dirs.append(target)
                        print(f"[*] Attached directory: {target} (Total: {len(staged_dirs)} dir(s))")
                    else:
                        print(f"[*] Directory already attached: {target}")
                else:
                    print(f"[!] Path not found: {target}")
            else:
                print("Usage: /attach <path/to/file_or_dir>")
            continue

        if user_input.startswith("/detach"):
            parts = user_input.split(" ", 1)
            if len(parts) > 1 and parts[1].strip():
                target = parts[1].strip()
                if target in staged_files:
                    staged_files.remove(target)
                    print(f"[*] Detached file: {target}")
                elif target in staged_dirs:
                    staged_dirs.remove(target)
                    print(f"[*] Detached directory: {target}")
                else:
                    print(f"[!] '{target}' is not in staged attachments.")
            else:
                print("Usage: /detach <path>")
            continue

        if user_input.lower() in ("/files", "/attachments"):
            print("\n=== Staged Attachments ===")
            if not staged_files and not staged_dirs:
                print("  No files or directories currently attached.")
                print("  Tip: Use '/attach <path>' or type '@filename' directly in your prompt.")
            else:
                for f in staged_files:
                    print(f"  📄 File: {f}")
                for d in staged_dirs:
                    print(f"  📂 Dir : {d}")
            continue

        if user_input.lower() in ("/clear-files", "/clearfiles"):
            staged_files.clear()
            staged_dirs.clear()
            print("[*] Cleared all staged file attachments.")
            continue

        # Execute prompt workflow
        run_prompt_workflow(
            prompt=user_input,
            model_name=model_slug,
            accounts_file=accounts_file,
            auto_create=auto_create,
            cache=cache,
            memory=memory,
            session_name=session_name,
            web_search=web_search_active,
            agentic=agentic_active,
            deep_research=deep_research_active,
            image_gen=image_gen_active,
            image_style=current_image_style,
            image_ratio=current_image_ratio,
            files=staged_files if staged_files else None,
            dirs=staged_dirs if staged_dirs else None,
            yolo=yolo_active,
            max_steps=max_steps,
        )


def main():
    parser = argparse.ArgumentParser(
        description="Use.ai AI Chat Streamer, Cache & Multi-Turn Memory Manager"
    )
    parser.add_argument(
        "--prompt", "-p",
        type=str,
        default=None,
        help="Prompt text to send to the AI model (if omitted, starts interactive chat)",
    )
    parser.add_argument(
        "--model", "-m",
        type=str,
        default="gateway-gpt-5-6",
        help="Model alias or ID (default: gateway-gpt-5-6 / GPT-5.6 Sol)",
    )
    parser.add_argument(
        "--select-model",
        action="store_true",
        help="Prompt interactive numbered model selection picker at startup",
    )
    parser.add_argument(
        "--accounts", "-a",
        type=str,
        default="accounts.json",
        help="Path to accounts JSON file (default: accounts.json)",
    )
    parser.add_argument(
        "--no-auto-create",
        action="store_true",
        help="Do not auto-generate new accounts when pool is empty",
    )
    parser.add_argument(
        "--list-models", "-l",
        action="store_true",
        help="List all supported models, aliases, and providers",
    )
    # Execution modes: Autonomous Agentic, YOLO, Web search, Deep research
    parser.add_argument(
        "--auto", "--autonomous", "--agentic", "--agent",
        dest="agentic",
        action="store_true",
        help="Enable autonomous Agentic AI mode with local root PowerShell and coding tools",
    )
    parser.add_argument(
        "--yolo", "--full-access",
        dest="yolo",
        action="store_true",
        help="Execute agent tools hands-free without interactive confirmation",
    )
    parser.add_argument(
        "--max-steps",
        type=int,
        default=25,
        help="Maximum autonomous agent loop steps per task (default: 25)",
    )
    parser.add_argument(
        "--web", "--search",
        dest="web_search",
        action="store_true",
        help="Enable live real-time web search and citation synthesis",
    )
    parser.add_argument(
        "--deep", "--deep-research",
        dest="deep_research",
        action="store_true",
        help="Enable autonomous deep research mode",
    )
    # Image generation & forensic inspection
    parser.add_argument(
        "--image", "-img",
        action="store_true",
        help="Enable AI Image Generation mode",
    )
    parser.add_argument(
        "--style",
        type=str,
        default="realistic",
        help="Image generation style: realistic, anime, digital-art, cinematic (default: realistic)",
    )
    parser.add_argument(
        "--ratio",
        type=str,
        default="1:1",
        help="Image aspect ratio: 1:1, 16:9, 9:16, 4:3, 3:4 (default: 1:1)",
    )
    parser.add_argument(
        "--inspect",
        type=str,
        default=None,
        help="Execute forensic inspection (PNG chunks, IDAT zlib decompression, entropy, scanline filters) on an image",
    )
    # File & Codebase attachments
    parser.add_argument(
        "--file", "-f",
        dest="files",
        action="append",
        default=[],
        help="Attach local file(s) to the conversation context (repeatable)",
    )
    parser.add_argument(
        "--dir", "-d",
        dest="dirs",
        action="append",
        default=[],
        help="Attach directory tree and source files to the conversation context (repeatable)",
    )
    # Cache arguments
    parser.add_argument(
        "--no-cache",
        action="store_true",
        help="Disable response read/write caching",
    )
    parser.add_argument(
        "--clear-cache",
        action="store_true",
        help="Purge all entries from the response cache before running",
    )
    parser.add_argument(
        "--cache-file",
        type=str,
        default="chat_cache.json",
        help="Path to response cache JSON file (default: chat_cache.json)",
    )
    parser.add_argument(
        "--cache-stats",
        action="store_true",
        help="Display cache statistics and exit",
    )
    # Memory & session arguments
    parser.add_argument(
        "--session", "-s",
        type=str,
        default=None,
        help="Named conversation session to load or persist (default: 'default')",
    )
    parser.add_argument(
        "--no-memory",
        action="store_true",
        help="Run statelessly without loading or saving conversation memory",
    )
    parser.add_argument(
        "--clear-session", "--new-session",
        dest="clear_session",
        action="store_true",
        help="Reset active conversation memory before running prompt",
    )
    parser.add_argument(
        "--show-history",
        action="store_true",
        help="Display stored conversation history turns for the session and exit",
    )
    parser.add_argument(
        "--system",
        type=str,
        default=None,
        help="System instructions or persona prompt for the conversation",
    )
    parser.add_argument(
        "--max-history",
        type=int,
        default=10,
        help="Maximum dialogue turn pairs to retain in sliding memory window (default: 10)",
    )

    args = parser.parse_args()

    # List models
    if args.list_models:
        print("\n=== Supported AI Models ===")
        print(ModelCatalog.list_models_text())
        return

    # Direct Forensic Image Inspection CLI
    if args.inspect:
        if ImageInspector is None:
            print("[!] ImageInspector module not available.")
            return
        print(f"[*] Running forensic image inspection on '{args.inspect}'...")
        if args.inspect.startswith("http://") or args.inspect.startswith("https://"):
            rep = ImageInspector.inspect_url(args.inspect)
        else:
            rep = ImageInspector.inspect_file(args.inspect)
        print("\n" + ImageInspector.format_markdown_summary(rep))
        return

    # Response Cache initialization
    cache = ResponseCache(cache_file=args.cache_file, enabled=not args.no_cache)

    if args.clear_cache:
        purged = cache.clear()
        print(f"[*] Response cache purged ({purged} entries removed).")

    if args.cache_stats:
        st = cache.stats()
        print("\n=== Response Cache Statistics ===")
        print(f"  Status      : {'Enabled' if st['enabled'] else 'Disabled'}")
        print(f"  File Path   : {st['file']}")
        print(f"  Total Items : {st['entries']}")
        print(f"  Total Hits  : {st['total_hits']}")
        print(f"  Disk Size   : {st['size_kb']} KB")
        return

    # Session resolution: Default to "default" so sequential CLI prompts retain memory
    if args.no_memory:
        session_name = None
    else:
        session_name = args.session if args.session else "default"

    # Memory initialization
    memory = ConversationMemory(
        system_prompt=args.system,
        max_turns=args.max_history,
        sessions_dir="sessions",
    )

    if session_name:
        if args.clear_session:
            memory.clear()
            memory.save_session(session_name)
            print(f"[*] Cleared conversation history for session '{session_name}'.")
        else:
            loaded = memory.load_session(session_name)
            if loaded and memory.history:
                turns_count = len(memory.history) // 2
                print(f"[*] Loaded active session '{session_name}' ({turns_count} prior turn(s), {len(memory.history)} messages)")

    if args.show_history:
        print(f"\n=== Session History ({session_name or 'stateless'}) ===")
        print(memory.get_history_summary())
        return

    auto_create = not args.no_auto_create

    chosen_model = args.model
    if getattr(args, "select_model", False):
        chosen_model = ModelCatalog.prompt_model_selection(args.model)

    if args.prompt:
        run_prompt_workflow(
            prompt=args.prompt,
            model_name=chosen_model,
            accounts_file=args.accounts,
            auto_create=auto_create,
            cache=cache,
            memory=memory,
            session_name=session_name,
            web_search=args.web_search,
            agentic=args.agentic,
            deep_research=args.deep_research,
            image_gen=args.image,
            image_style=args.style,
            image_ratio=args.ratio,
            files=args.files,
            dirs=args.dirs,
            yolo=getattr(args, "yolo", False),
            max_steps=getattr(args, "max_steps", 25),
        )
    else:
        interactive_repl(
            model_name=chosen_model,
            accounts_file=args.accounts,
            auto_create=auto_create,
            cache=cache,
            memory=memory,
            session_name=session_name,
            web_search=args.web_search,
            agentic=args.agentic,
            deep_research=args.deep_research,
            image_gen=args.image,
            image_style=args.style,
            image_ratio=args.ratio,
            yolo=getattr(args, "yolo", False),
            max_steps=getattr(args, "max_steps", 25),
        )


if __name__ == "__main__":
    main()
