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

## 🛡️ Autonomous Account Pool Maintainer (`pool_maintainer.py`)

FreeAI manages a rotating pool of authenticated accounts in `accounts.json`:
- **Zero-Quota Auditing**: Regularly audits accounts against `GET https://use.ai/v1/auth/get-session` using stored session cookies without consuming free message quotas. Dead/expired accounts are pruned automatically.
- **Auto-Replenishment**: When valid accounts drop below threshold (default: 50), the maintainer automatically spins up fresh authenticated accounts via `account_creator.py`.
- **Response Cache (`chat_cache.json`)**: Identical queries are answered in <10ms directly from disk with **0 network requests** and **0 accounts consumed**.

---

## 📁 Repository File Map

```
g:\FreeAI\
├── api_server.py                        # OpenAI-Compatible REST API Gateway & Web Server
├── chat_streamer.py                     # WebSocket token streamer & CLI interactive REPL
├── pool_maintainer.py                   # Autonomous zero-quota session auditor & pool daemon
├── account_creator.py                   # Automated registration & session extraction
├── attachment_pipeline.py               # File & codebase attachment bundle engine
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
