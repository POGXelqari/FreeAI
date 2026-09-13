# FreeAI: Local Multi-Model Intelligence & OpenAI-Compatible Gateway

FreeAI is a high-performance local AI gateway and multi-model intelligence suite. It provides a **100% drop-in replacement for the OpenAI REST API**, allowing you to connect **Cursor, Continue.dev, Cline, Roo-Code, Aider, Open WebUI, and the official OpenAI SDKs** directly to top-tier models (Claude Sonnet 5, Gemini 3.6 Flash, GPT-5.4, DeepSeek V4 Pro, Grok 4.6, FLUX, and DALL-E 3) with zero subscription fees, native multimodal vision, automated Cloudflare R2 uploads, and autonomous account pool maintenance.

---

## ⚡ Quickstart: OpenAI-Compatible API Gateway

### 1. Launch the Server
Start the local gateway with autonomous account pool maintenance:
```bash
python api_server.py --auto-maintain
```

The gateway immediately starts serving on:
- **API Base URL**: `http://localhost:8000/v1` (or `http://127.0.0.1:8000/v1`)
- **API Key**: `sk-freeai` *(or any dummy string; no payment or proprietary key needed)*
- **FreeAI Studio Web UI**: `http://localhost:8000/` or `http://localhost:8000/chat`
- **Health & Telemetry**: `http://localhost:8000/v1/status`
- **Live Logs**: `http://localhost:8000/v1/logs`

---

### 2. Available Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/v1/chat/completions` | `POST` | OpenAI-compatible chat completions (supports SSE streaming, multimodal vision, live web search, agentic mode, and deep research). |
| `/v1/images/generations` | `POST` | OpenAI-compatible image synthesis (`dall-e-3`, `imagen-3`, `flux-1-schnell`). |
| `/v1/images/inspect` | `POST` | Forensic byte-level structural, hex, and pixel analysis of image files/URLs. |
| `/v1/models` | `GET` | List of all available models, providers, and mode variants (`-web`, `-agent`, `-deep`). |
| `/v1/models/{model}` | `GET` | Retrieve individual model details and provider metadata. |
| `/v1/status` | `GET` | Real-time gateway health, active accounts in pool, and response cache telemetry. |
| `/v1/logs` | `GET` | Real-time rotating server logs (`?lines=100`). |
| `/v1/pool/audit` | `POST` | Trigger instant non-intrusive session health audit across all accounts. |
| `/v1/pool/replenish` | `POST` | Trigger automated batch creation of authenticated accounts. |

---

## 🔌 IDE & Client Integration Guides

### 1. Cursor IDE
1. Open Cursor Settings (`Ctrl + Shift + J` or `Cmd + Shift + J`).
2. Navigate to **Models** > **OpenAI API Key**.
3. Toggle **Override OpenAI Base URL**:
   - **Base URL**: `http://127.0.0.1:8000/v1`
   - **API Key**: `sk-freeai`
4. Add your preferred models:
   - `claude-3-5-sonnet` (or `claude-3-5-sonnet-web` for live web search)
   - `gpt-4o` (or `gpt-5`)
   - `deepseek-chat`
   - `gemini-flash`

---

### 2. Continue.dev (`config.json`)
Add FreeAI to your `~/.continue/config.json`:
```json
{
  "models": [
    {
      "title": "FreeAI - Claude Sonnet 5",
      "provider": "openai",
      "model": "claude-3-5-sonnet",
      "apiBase": "http://127.0.0.1:8000/v1",
      "apiKey": "sk-freeai"
    },
    {
      "title": "FreeAI - Claude (Live Web Search)",
      "provider": "openai",
      "model": "claude-web",
      "apiBase": "http://127.0.0.1:8000/v1",
      "apiKey": "sk-freeai"
    },
    {
      "title": "FreeAI - GPT-5.4",
      "provider": "openai",
      "model": "gpt-4o",
      "apiBase": "http://127.0.0.1:8000/v1",
      "apiKey": "sk-freeai"
    },
    {
      "title": "FreeAI - DeepSeek V4 Pro",
      "provider": "openai",
      "model": "deepseek-chat",
      "apiBase": "http://127.0.0.1:8000/v1",
      "apiKey": "sk-freeai"
    }
  ]
}
```

---

### 3. Cline / Roo-Code (VS Code Extensions)
1. Open Cline/Roo-Code Settings.
2. Select API Provider: **OpenAI Compatible**.
3. Configure:
   - **Base URL**: `http://127.0.0.1:8000/v1`
   - **API Key**: `sk-freeai`
   - **Model ID**: `claude-3-5-sonnet` or `claude-agent`

---

### 4. Aider CLI
Launch Aider paired with FreeAI:
```bash
# Using Claude Sonnet 5
aider --openai-api-base http://127.0.0.1:8000/v1 --openai-api-key sk-freeai --model openai/claude-3-5-sonnet

# Using DeepSeek V4 Pro
aider --openai-api-base http://127.0.0.1:8000/v1 --openai-api-key sk-freeai --model openai/deepseek-chat
```

---

### 5. OpenAI Python SDK

#### Standard & Web Search Streaming:
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://127.0.0.1:8000/v1",
    api_key="sk-freeai",  # Any string works
)

# Stream live web search response with Claude Sonnet 5
response = client.chat.completions.create(
    model="claude-web",
    messages=[
        {"role": "user", "content": "What are the latest tech breakthroughs today?"}
    ],
    stream=True,
)

for chunk in response:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

#### Multimodal Vision (Image Inspection):
FreeAI automatically uploads images to Cloudflare R2 and pipes native visual parts to upstream vision models (Claude, Gemini, GPT):
```python
import base64
from openai import OpenAI

client = OpenAI(base_url="http://127.0.0.1:8000/v1", api_key="sk-freeai")

# Load local image as base64 data URI
with open("screenshot.png", "rb") as f:
    b64_data = base64.b64encode(f.read()).decode("utf-8")

response = client.chat.completions.create(
    model="gemini-flash",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "Describe the layout and text visible in this screenshot:"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/png;base64,{b64_data}",
                        "filename": "screenshot.png"
                    }
                }
            ]
        }
    ],
)

print(response.choices[0].message.content)
```

#### Image Generation (`POST /v1/images/generations`):
```python
from openai import OpenAI

client = OpenAI(base_url="http://127.0.0.1:8000/v1", api_key="sk-freeai")

image = client.images.generate(
    model="dall-e-3",  # Or 'imagen-3', 'flux-1-schnell'
    prompt="A neon cybernetic cat sitting on a futuristic Tokyo rooftop at night",
    n=1,
    size="1024x1024",
)

print("Generated Image URL:", image.data[0].url)
```

---

### 6. OpenAI Node.js / TypeScript SDK
```typescript
import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "http://127.0.0.1:8000/v1",
  apiKey: "sk-freeai",
});

async function main() {
  const stream = await client.chat.completions.create({
    model: "claude-3-5-sonnet",
    messages: [{ role: "user", content: "Write a high-performance LRU cache in TypeScript." }],
    stream: true,
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
  }
}

main();
```

---

### 7. cURL Examples

#### Standard Text Completion (Streaming):
```bash
curl -N http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-freeai" \
  -d '{
    "model": "claude-3-5-sonnet",
    "messages": [{"role": "user", "content": "Explain quantum computing in 2 sentences."}],
    "stream": true
  }'
```

#### Live Web Search with Clickable Sources:
```bash
curl -N http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-freeai" \
  -d '{
    "model": "claude-web",
    "messages": [{"role": "user", "content": "What happened in financial markets today?"}],
    "stream": true
  }'
```

#### Image Generation (`dall-e-3` / `flux-1-schnell`):
```bash
curl http://127.0.0.1:8000/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer sk-freeai" \
  -d '{
    "model": "flux-1-schnell",
    "prompt": "Cyberpunk cityscape in rain, octane render 8k",
    "n": 1,
    "size": "1024x1024"
  }'
```

---

## 🌐 Model Catalog & Suffix Routing

The gateway dynamically maps OpenAI model identifiers to upstream models. You can append suffixes or pass HTTP headers to activate specialized modes:

### Core Models & Friendly Aliases
| Model | Provider | Primary ID | Friendly Aliases | Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Sonnet 5** | Anthropic | `gateway-sonnet-5` | `claude`, `sonnet`, `claude-3-5-sonnet`, `claude-3-7-sonnet` | Code, Writing, Vision, Reasoning |
| **Claude Fable 5** | Anthropic | `gateway-fable-5` | `fable`, `fable-5` | Creative, Long Context |
| **Claude Opus 5** | Anthropic | `gateway-opus-5` | `opus`, `opus-5` | Deep Reasoning, Complex Math |
| **Claude Opus 4.8** | Anthropic | `gateway-opus-4-8` | `opus-4.8` | Architecture & Systems |
| **Gemini 3.6 Flash** | Google | `gateway-gemini-3-6-flash` | `gemini`, `flash`, `gemini-flash` | Ultra-Fast, Vision, Generalist |
| **GPT-5.4** | OpenAI | `gateway-gpt-5-4` | `gpt`, `gpt-4o`, `gpt-5`, `gpt-5.4` | Flagship OpenAI Intelligence |
| **GPT-5.5** | OpenAI | `gateway-gpt-5-5` | `gpt-5.5` | Advanced Agentic Coding |
| **GPT-5.6 Sol** | OpenAI | `gateway-gpt-5-6` | `gpt-5.6`, `sol` | High-Context Reasoning |
| **DeepSeek V4 Pro** | DeepSeek | `gateway-deepseek-v4-pro` | `deepseek`, `deepseek-chat`, `deepseek-v4` | Coding, Math, Open-Weight King |
| **Grok 4.6** | xAI | `gateway-grok-4-6` | `grok`, `grok-4.6` | Uncensored, Real-Time |
| **Kimi K3 / K2.6** | Moonshot AI | `gateway-kimi-k3` | `kimi`, `kimi-k3`, `kimi-k2.6` | 200k+ Long Context |
| **GLM 5.2** | Z.AI | `gateway-glm-5-2` | `glm`, `glm-5.2` | Multilingual, Chinese/English |
| **DALL-E 3** | OpenAI | `instant` / `dall-e-3` | `dalle`, `dall-e-3` | Image Generation |
| **Imagen 3** | Google | `instant` / `imagen-3` | `imagen`, `imagen-3` | Photorealistic Image Generation |
| **FLUX.1 Schnell** | Black Forest | `instant` / `flux-1-schnell` | `flux`, `flux-schnell` | High-Speed Diffusion |

### Execution Mode Suffixes & Headers
Append any of the following suffixes to your model name:
- **`-web`** : Activates real-time web search and citation retrieval (e.g. `claude-web`, `gpt-4o-web`, `gemini-flash-web`).
- **`-agent`** : Activates agentic multi-step reasoning (e.g. `claude-agent`, `gpt-agent`).
- **`-deep`** : Activates autonomous deep research (e.g. `claude-deep`, `gemini-deep`).
- **`-image`** : Activates image synthesis mode (e.g. `gpt-image`, `claude-image`).

*Alternatively, pass custom HTTP request headers:*
- `X-Web-Search: true`
- `X-Agentic-Mode: true`
- `X-Deep-Research: true`
- `X-Image-Gen: true` (with `X-Image-Style: realistic|artistic|anime` and `X-Image-Ratio: 1:1|16:9|9:16`)

---

## 🖥️ FreeAI Studio Web Dashboard

In addition to serving the OpenAI REST API, `api_server.py` serves a full-featured browser interface at `http://localhost:8000/`:
- **Glassmorphism Dark Theme**: Obsidian/indigo aesthetic with responsive mobile/desktop layouts.
- **Provider & Model Dropdown**: Switch between 14 models on the fly.
- **Live Search & Citation Cards**: Clickable web sources with favicon previews.
- **Multimodal Visual Inspector**: Drag-and-drop or paste images to inspect byte metrics, chunk hierarchies, and prompt the AI visually.
- **Image Generation Studio**: Generate images with style presets and aspect ratio controls.
- **Full History & Session Memory**: Automatically stored in local browser storage.

---

## 🛡️ Autonomous Account Pool & Multi-Tier Fallback (`pool_maintainer.py` & `proxy_manager.py`)

FreeAI manages a rotating pool of authenticated accounts in `accounts.json` with multi-tier egress routing:
- **Direct Chrome Impersonation (Default, No Proxies Required)**: Uses `curl_cffi` with authentic browser TLS/HTTP2 fingerprints (`chrome124`). Verifies account sessions directly against Cloudflare with zero challenges, zero read timeouts, and sub-second latency.
- **Multi-Proxy Pool & Automatic Failover (`proxy_manager.py`)**: Supports standard `IP:PORT:USER:PASS`, `USER:PASS@IP:PORT`, `http://`, and `socks5://` proxy lists when passed via `--proxy-file` or `FREEAI_PROXIES`.
- **3-Tier Automatic Fallback**: If an egress proxy fails (network timeout, connection reset, or HTTP 403 challenge), the system cascades automatically:
  1. *Tier 1*: Preferred Healthy Proxy
  2. *Tier 2*: Alternative Proxy from Pool
  3. *Tier 3*: Direct Host Egress (Bypasses proxy failure completely)
- **Autonomous Replenishment via Gmail Plus-Aliasing & IMAP (ZeroBounce Bypass)**:
  - `use.ai` recently deployed ZeroBounce email filtering, which blacklists disposable domains (`mail.tm`, `uberip.com`).
  - FreeAI circumvents this by utilizing **Gmail Sub-Address Aliasing (`username+ai12345@gmail.com`)** paired with an autonomous **IMAP Verification Listener (`imap.gmail.com:993`)**.
  - ZeroBounce fully verifies Google MX records as authentic. `use.ai` treats each alias as a separate, distinct account with fresh free message quotas.
  - The built-in `GmailImapClient` polls your Gmail inbox via SSL, automatically parses incoming magic link tokens, confirms the session, and writes authenticated credentials directly to `accounts.json`.
- **Manual Prompt Fallback**: If an App Password is not yet configured, `account_creator.py --manual` dispatches the magic link and prompts you in the terminal to paste the verification link directly.
- **Response Cache (`chat_cache.json`)**: Identical queries are answered in <10ms directly from disk with **0 network requests** and **0 accounts consumed**.

### Setting Up Autonomous Gmail IMAP Replenishment
1. **Create a 16-Character Google App Password**:
   - Enable 2-Step Verification on your Google Account: https://myaccount.google.com/security
   - Generate an App Password: https://myaccount.google.com/apppasswords
   - Select App name: `FreeAI`
   - Copy the generated 16-character password.
2. **Configure `.env`**:
   - Copy `.env.example` to `.env`:
     ```env
     GMAIL_ADDRESS=your_email@gmail.com
     GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
     ```
3. **Verify Connection**:
   ```bash
   python account_creator.py --test-imap
   ```

### Running Account Management & Audits
> [!TIP]
> **Windows PowerShell Syntax**: Use `;` to chain commands in Windows PowerShell (e.g. `cd 'G:\FreeAI' ; python api_server.py --auto-maintain`). In PowerShell 5.1, `&&` is not supported.

```bash
# Verify IMAP connection and credentials
python account_creator.py --test-imap

# Non-destructive session audit (Checks validity of existing accounts without consuming quota)
python pool_maintainer.py --audit

# Create fresh authenticated account using autonomous Gmail IMAP verification
python account_creator.py --count 1

# Create account with manual link paste prompt (if App Password not yet configured)
python account_creator.py --count 1 --manual

# Run autonomous maintenance daemon in the background with Gmail replenishment
python pool_maintainer.py --daemon --interval 60
```

---

## 🤖 Autonomous Agentic AI CLI (`chat_streamer.py`)

FreeAI transforms the CLI streamer into an **Autonomous Agentic Coding & Terminal Execution Engine**. Powered by **GPT-5.6 Sol** (`gateway-gpt-5-6`) by default, the agent has full local access to execute PowerShell commands, manage long-running background tasks, perform filesystem CRUD, run live web searches, and analyze media with forensic vision tools.

### 1. Interactive Model Picker & Defaults
- **Default Flagship Model**: **GPT-5.6 Sol** (`gateway-gpt-5-6`).
- **Interactive Model Selection**: Launch with `--select-model` to pick any of the 17 supported models via an interactive numbered menu:
  ```bash
  python chat_streamer.py --select-model
  ```
- **In-Chat Model Switching**: Type `/model` inside the REPL to open the interactive picker on the fly, or `/model sonnet` to switch immediately.

---

### 2. Autonomous Agentic Execution Modes

#### Supervised Mode (Interactive Tool Approval):
The agent plans steps, formulates commands, and prompts for your approval before executing any tool on your system:
```bash
python chat_streamer.py --auto -p "Inspect the repository and list all modified git files"
```

#### YOLO Mode (Hands-Free Full Local Execution):
Permits the agent to autonomously run commands, read/write files, and chain multi-step workflows without pausing for interactive confirmation:
```bash
python chat_streamer.py --auto --yolo -p "Count how many .py files exist in the current directory"
```

---

### 3. Agent Tool Suite

The autonomous engine is equipped with an extensible suite of local tools:

| Tool Category | Tool Name | Description |
| :--- | :--- | :--- |
| **Terminal / Root** | `run_command` | Execute PowerShell, pwsh, cmd, or bash commands directly on the host system with output truncation safeguards. |
| **Task Daemon** | `manage_task` | Launch and supervise background processes (`start`, `list`, `status`, `logs`, `send_input`, `kill`). |
| **Filesystem CRUD** | `read_file` | Read files with line numbering, byte offsets, and range slicing (`start_line`, `end_line`). |
| | `write_file` | Create or overwrite files atomically with directory creation. |
| | `replace_file_content` | Perform targeted, verified surgical block replacements. |
| | `list_dir` | List files and folders with size metrics, file counts, and optional recursive walking. |
| | `grep_search` | Search files for exact regex or string patterns with line numbers. |
| | `delete_file` | Safely remove files from disk. |
| **Web Intelligence** | `web_search` | Execute real-time search queries and return top web links and snippets. |
| | `read_url` | Fetch any webpage and extract readable markdown text content. |
| **Vision & Media** | `generate_image` | Synthesize images via DALL-E 3, Imagen 3, or FLUX.1. |
| | `inspect_image` | Run forensic structural byte analysis (PNG chunks, entropy, dimensions, color channels). |

---

### 4. Interactive REPL Slash Commands

When running the interactive chat streamer (`python chat_streamer.py`), you can use slash commands to control the session:

| Slash Command | Description |
| :--- | :--- |
| `/auto [on\|off]` | Toggle Autonomous Agentic AI execution mode on/off. |
| `/yolo [on\|off]` | Toggle hands-free tool execution without confirmation prompts. |
| `/tools` | Display the list and schemas of all registered local agent tools. |
| `/tasks` | List all running background tasks, PIDs, uptimes, and commands. |
| `/task <id> [status\|logs\|kill]` | Inspect status, tail output logs, or terminate a background task. |
| `/run <command>` | Instantly run a local PowerShell command directly from the REPL. |
| `/shell` | Launch an interactive direct shell session within the chat streamer. |
| `/model [name]` | Open the interactive numbered model selector or switch models. |
| `/models` | Display the complete table of supported AI models and aliases. |
| `/web [on\|off]` | Toggle live web search mode. |
| `/image [prompt]` | Synthesize an AI image on demand or toggle image generation mode. |
| `/inspect <path>` | Run forensic image inspection on a local file or image URL. |
| `/attach <path>` | Stage a file or directory to be injected into the next prompt context. |
| `/status` | View active model, token quotas, memory turns, and mode flags. |
| `/clear` | Clear the current session conversation history. |
| `/help` | List all available slash commands. |

---

## 📁 Repository File Map

```
g:\FreeAI\
├── api_server.py                        # OpenAI-Compatible REST API Gateway & Web Server
├── chat_streamer.py                     # WebSocket token streamer, CLI REPL & Model Selector
├── agent_engine.py                      # ReAct Autonomous Agent Loop, Parser & Account Rotator
├── agent_tools.py                       # Root PowerShell, Task Manager, Filesystem & Vision Tools
├── pool_maintainer.py                   # Autonomous zero-quota session auditor & pool daemon
├── proxy_manager.py                     # Multi-proxy pool, round-robin rotation & cooldown tracker
├── account_creator.py                   # Automated registration & session extraction
├── attachment_pipeline.py               # File & codebase attachment bundle engine
├── image_inspector.py                   # Forensic byte-level structural image analyzer
├── accounts.json                        # Active authenticated account pool
├── chat_cache.json                      # Disk response cache (atomic SHA-256)
├── server.log                           # Rotating server log file (10MB x 5 backups)
├── web/                                 # FreeAI Studio Web UI Dashboard
│   ├── index.html                       # HTML5 glassmorphism interface
│   ├── style.css                        # CSS3 design system & animations
│   └── app.js                           # SSE token streaming & multimodal state engine
└── raw/                                 # Scraped assets from https://use.ai
```

---

## 📜 License & Research Notice
This project is an independent cybersecurity reverse-engineering and dual-use interoperability research project for defensive evaluation, security auditing, and local AI gateway engineering.
