# Use.ai Extracted Codebase & Assets

This repository contains the complete frontend assets and decompiled/extracted code from [https://use.ai](https://use.ai).

## 📁 Repository Structure

```
g:\FreeAI\
├── raw/                                 # Raw scraped assets directly from https://use.ai
│   ├── _next/static/
│   │   ├── chunks/                      # 297 original minified JS chunks
│   │   ├── css/                         # Original stylesheet(s)
│   │   └── _vinext_fonts/               # Inter woff2 web fonts
│   ├── index.html                       # Main landing page HTML
│   ├── terms.html                       # Terms of Service page HTML
│   ├── privacy.html                     # Privacy Policy page HTML
│   └── help_category_*.html             # Help Center category pages
│
├── extracted/                           # Categorized & beautified source code
│   ├── config/
│   │   └── runtime-env.json             # 46 extracted environment keys & service configs
│   ├── pages/                           # Formatted HTML pages
│   │   ├── index.html
│   │   ├── terms.html
│   │   ├── privacy.html
│   │   └── help_category_*.html
│   ├── src/
│   │   ├── components/                  # React application components
│   │   │   ├── auth-modal.component.js
│   │   │   ├── footer.component.js
│   │   │   ├── guest-new-chat.component.js
│   │   │   ├── guest-sidebar-menu.component.js
│   │   │   ├── mobile-chat-header.component.js
│   │   │   └── ui/                      # Design system UI primitives
│   │   │       ├── button.js
│   │   │       ├── input.js
│   │   │       ├── dialog.js
│   │   │       ├── drawer.js
│   │   │       ├── dropdown-menu.js
│   │   │       ├── popover.js
│   │   │       ├── tooltip.js
│   │   │       └── ...
│   │   ├── services/                    # Business logic & API clients
│   │   │   ├── analytics.service.js
│   │   │   ├── better-auth-client.service.js
│   │   │   ├── connectors.service.js
│   │   │   ├── paywall.service.js
│   │   │   └── ...
│   │   ├── stores/                      # Zustand state stores
│   │   │   ├── chat.store.js
│   │   │   ├── auth.store.js
│   │   │   ├── teams.store.js
│   │   │   ├── connectors.store.js
│   │   │   └── ...
│   │   ├── hooks/                       # Custom React hooks
│   │   │   ├── use-pricing-config.hook.js
│   │   │   ├── use-incognito-chat.hook.js
│   │   │   ├── use-chat-input.hook.js
│   │   │   ├── useQuery.js
│   │   │   └── ...
│   │   ├── providers/                   # Context & State Providers
│   │   │   ├── model-catalog.provider.js
│   │   │   ├── user-data.provider.js
│   │   │   ├── workspace-scope.provider.js
│   │   │   └── ...
│   │   ├── models/                      # Domain data contracts
│   │   │   ├── chat.model.js
│   │   │   ├── user.model.js
│   │   │   ├── subscription.model.js
│   │   │   └── ...
│   │   ├── utils/                       # Helper functions
│   │   │   ├── chat-uploads.util.js
│   │   │   ├── image-compression.util.js
│   │   │   ├── report-client-error.util.js
│   │   │   └── ...
│   │   ├── constants/                   # Application constants
│   │   ├── icons/                       # Lucide and custom vector icons
│   │   ├── styles/                      # Formatted CSS stylesheet (layout.css)
│   │   └── vendor/                      # Frameworks (React, Vinext, Rolldown, Zod, etc.)
│   └── manifest.json                    # Detailed mapping of chunks to extracted files
│
├── extract.js                           # Node.js extraction & beautification script
└── package.json                         # Tooling configuration
```

## 🔍 Key Extracted Components & Architecture

### 1. Technology Stack
- **Framework**: Next.js running on Vite / Rolldown / Vinext runtime.
- **Client State**: Zustand stores (`chat.store`, `auth.store`, `teams.store`, etc.) + TanStack React Query.
- **Authentication**: `better-auth` client with OAuth providers (Google, Microsoft).
- **Styling**: Tailwind CSS + Radix/Floating-UI primitives.

### 2. Extracted Configuration (`extracted/config/runtime-env.json`)
- **Base URL**: `https://use.ai`
- **Client API**: `https://use.ai/v1`
- **CMS API**: `https://cms.use.ai/api/v1`
- **Agent URL**: `https://agent.use.ai`
- **File Storage (Cloudflare R2)**: `https://files.use.ai`
- **Payment Gateways**:
  - Stripe (US, UK, EU, CA, AU live publishable keys)
  - PayPal (`NEXT_PUBLIC_PAYPAL_MERCHANT_ID`)
  - Braintree (`production_nfb7wm5h_9v6q2tqqyqdqvzyc`)
  - PayNext subscription plan IDs (monthly, quarterly, half-yearly, superpro, power plan, split payments)
- **Analytics & Tracking**: Mixpanel, GrowthBook, Google Tag Manager.
- **Bot Protection**: Cloudflare Turnstile.
- **Feedback & Surveys**: Formbricks.

### 3. Account Creation Automation Script (`account_creator.py`)

Automates instant account registration and session extraction on `use.ai`:
- **Endpoint**: `POST https://use.ai/v1/auth/sign-in/credentials`
- **Session Verification**: `GET https://use.ai/v1/auth/get-session`
- **Output**: Saves full profile, JWT access token, session token, and cookies to `accounts.json`.

#### Usage:
```bash
# Create a single account with auto-generated email pattern
python account_creator.py

# Create an account with a specific email
python account_creator.py --email gjhfujtyujgfjh@hykjghjytr.thtrrugfhgfj

# Create multiple accounts in batch with custom delay
python account_creator.py --count 5 --delay 2.0 --output accounts.json
```

### 4. AI Chat Streaming & Quota Pruner Script (`chat_streamer.py`)

Prompts and streams real-time AI responses using the 1-free-message quota from accounts in `accounts.json`, with automated account quota rotation and retirement.

- **WebSocket Endpoint**: `wss://use.ai/agent/agents/budget-agent/{chatId}`
- **Authentication Handshake**: `GET /v1/auth/token` + `POST /v1/auth/app-attestation`
- **WAF Handshake Bypass**: Emulates Chrome WebSocket fetch metadata (`Sec-Fetch-Dest: websocket`, `botd_verdict: clean`)
- **Quota Lifecycle**: Automatically detects completion (`stream-complete`) or rate limit (`usage_limit`), retires the exhausted account from `accounts.json`, and auto-replenishes if pool is empty.

#### Supported Models & Aliases:
| Model Name | Provider | Model Slug | Friendly Aliases |
| :--- | :--- | :--- | :--- |
| **Claude Sonnet 5** | Anthropic | `gateway-sonnet-5` | `claude`, `sonnet`, `sonnet-5` |
| **Claude Fable 5** | Anthropic | `gateway-fable-5` | `fable`, `fable-5` |
| **Claude Opus 5** | Anthropic | `gateway-opus-5` | `opus`, `opus-5` |
| **Claude Opus 4.8** | Anthropic | `gateway-opus-4-8` | `opus-4.8` |
| **Gemini 3.6 Flash** | Google | `gateway-gemini-3-6-flash` | `gemini`, `flash`, `gemini-3.6` |
| **GPT-5.4** | OpenAI | `gateway-gpt-5-4` | `gpt`, `gpt-5`, `gpt-5.4` |
| **GPT-5.5** | OpenAI | `gateway-gpt-5-5` | `gpt-5.5` |
| **GPT-5.6 Sol** | OpenAI | `gateway-gpt-5-6` | `gpt-5.6`, `sol` |
| **DeepSeek V4 Pro** | DeepSeek | `gateway-deepseek-v4-pro` | `deepseek`, `deepseek-v4` |
| **Grok 4.6** | xAI | `gateway-grok-4-6` | `grok`, `grok-4.6` |
| **Kimi K3 / K2.6** | Moonshot AI | `gateway-kimi-k3` | `kimi`, `kimi-k3` |
| **GLM 5.2** | Z.AI | `gateway-glm-5-2` | `glm`, `glm-5.2` |
| **Instant** | Use.ai | `instant` | `auto`, `instant`, `default` |

#### Usage Examples:
```bash
# 1. List all available models and aliases
python chat_streamer.py --list-models

# 2. Single-shot prompt with Claude Sonnet 5
python chat_streamer.py --model claude --prompt "Explain quantum entanglement in 2 sentences."

# 3. Single-shot prompt with Gemini 3.6 Flash
python chat_streamer.py --model gemini --prompt "Write a Python quicksort function."

# 4. Multi-turn CLI Chat (Defaults to 'default' session automatically)
python chat_streamer.py --model claude --prompt "Explain quantum computing in 2 sentences."
python chat_streamer.py --model claude --prompt "Do you remember anything before this prompt?"
python chat_streamer.py --model claude --prompt "What was that 2-sentence explanation?"

# 5. Inspect or Reset Session History
python chat_streamer.py --show-history
python chat_streamer.py --clear-session

# 6. One-off prompt without saving/loading memory
python chat_streamer.py --no-memory --prompt "What is 2+2?"

# 7. Interactive REPL Chat Session with Cache & Memory
python chat_streamer.py

# 8. Named Session with Custom Persona
python chat_streamer.py --model claude --session security_audit --system "You are an elite offensive security researcher."

# 9. Check / Clear Response Cache
python chat_streamer.py --cache-stats
python chat_streamer.py --clear-cache
```

### 5. Response Caching & Multi-Turn Memory Architecture

#### Read/Write Response Cache (`ResponseCache`)
- **Zero-Quota Replay**: Caches AI responses locally to `chat_cache.json` indexed by `sha256(model_slug + normalized_prompt)`.
- **Quota Preservation**: Identical or repeated queries are served instantly from disk cache, consuming **0 network requests** and **0 accounts** from `accounts.json`.
- **Atomic Operations**: Cache writes use atomic `.tmp` file replacement to prevent file corruption during sudden termination.
- **Cache Hit Tracking**: Tracks hit counts, initial creation timestamps, and last accessed timestamps per entry.

#### Multi-Turn Conversation Memory (`ConversationMemory`)
- **Rotating-Account Continuity**: Because `use.ai` allocates 1 free message per registered account, multi-turn conversation context is injected via structured prompt injection:
  ```text
  [System Instructions]
  <custom persona or instructions>

  [Conversation Context]
  User: <previous question>
  Assistant: <previous answer>

  [Current User Message]
  <new user input>
  ```
- **Sliding Context Window**: Configurable history window (`--max-history 10`) retains the most relevant recent turns without overflowing token context.
- **Clean Single-Shot Bypass**: When no history or system prompt is configured, prompts are sent unadorned for zero overhead.

#### Session Persistence
- Conversations can be saved and restored across runs using named session files in `sessions/<name>.json`.
- Sessions preserve system instructions, sliding turn limits, and full dialogue histories.

#### Interactive REPL Commands:
| Command | Action |
| :--- | :--- |
| `/web [on\|off]` | Toggle or configure live real-time web search |
| `/agent [on\|off]` | Toggle or configure agentic multi-step reasoning mode |
| `/deep [on\|off]` | Toggle or configure autonomous deep research mode |
| `/status` | Display active model, session name, pool size, and execution modes |
| `/history` | Show formatted history of dialogue turns in current session |
| `/clear` | Clear conversation history turns |
| `/system <text>` | Set, update, or view system instructions/persona |
| `/cache` | Display response cache statistics (items, hits, file size) |
| `/clearcache` | Purge all response cache entries from disk |
| `/save <name>` | Save current conversation session to `sessions/<name>.json` |
| `/load <name>` | Load existing conversation session from `sessions/<name>.json` |
| `/sessions` | List all saved conversation sessions |
| `/model <name>` | Switch active model (e.g. `/model claude`, `/model gpt`, `/model gemini`) |
| `/models` | Display catalog of available AI models, providers, and aliases |
| `/accounts` | Display remaining active accounts in `accounts.json` pool |
| `/new <count>` | Generate fresh accounts on demand |
| `/help` | List all available interactive commands |
| `/quit` or `/exit` | Auto-save active session and exit |

### 6. Live Web Search & Agentic Mode Integration

Both the CLI Streamer and OpenAI API Gateway natively support real-time web browsing, citation retrieval, and agentic multi-step reasoning.

#### CLI Usage:
```bash
# Live web search with Gemini 3.6 Flash
python chat_streamer.py --model gemini --web --prompt "What is today's top tech news?"

# Live web search with Claude Sonnet 5
python chat_streamer.py --model claude --web --prompt "Who won the game last night?"

# Agentic multi-step reasoning with GPT-5.4
python chat_streamer.py --model gpt --agentic --prompt "Solve step by step: (25 * 12) + (144 / 12) - 50."

# Autonomous deep research mode
python chat_streamer.py --model claude --deep --prompt "Analyze emerging trends in post-quantum cryptography."
```

#### API Gateway Model Suffixes:
Connect from any standard client (Cursor, Continue, Aider, Open WebUI) and simply select the corresponding model variant:
- **Web Search**: `claude-web`, `claude-3-5-sonnet-web`, `gpt-4o-web`, `gpt-5-web`, `gemini-flash-web`, `deepseek-chat-web`
- **Agentic Mode**: `claude-agent`, `gpt-agent`, `deepseek-chat-agent`, `gemini-flash-agent`
- **Deep Research**: `claude-deep`, `gpt-deep`, `gemini-flash-deep`

Citations are automatically extracted from the backend and appended as formatted markdown footnotes (`### Sources:\n1. [Title](url)\n...`), providing clickable links directly inside your editor or web client.

### 7. OpenAI-Compatible Local API Gateway (`api_server.py`)

A local FastAPI & Uvicorn server providing drop-in compatibility with the OpenAI REST API specification. Connect any third-party AI client, IDE extension, or agent framework to top-tier models with real-time SSE streaming, zero-quota response caching, and automated account rotation.

#### Launching the Gateway:
```bash
# Start server on http://127.0.0.1:8000
python api_server.py

# Custom host/port, accounts file, or cache file
python api_server.py --host 0.0.0.0 --port 8000 --accounts accounts.json
```

#### Endpoints:
- `POST /v1/chat/completions` - Standard OpenAI chat completions endpoint (supports `stream: true` SSE & `stream: false` JSON, with `-web`, `-agent`, `-deep` model routing).
- `GET /v1/models` - Lists all 14 models and their `-web`, `-agent`, and `-deep` variants with friendly aliases (`claude`, `claude-3-5-sonnet-web`, `gpt-4o-web`, `deepseek-chat-web`).
- `GET /` - Real-time health metrics, active account pool count, and cache statistics.

#### Client Configuration Examples:

##### 1. Python OpenAI SDK (Live Web Search Streaming)
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://127.0.0.1:8000/v1",
    api_key="not-required",  # Any string
)

# Real-time web search streaming with Claude Sonnet 5
stream = client.chat.completions.create(
    model="claude-web",
    messages=[
        {"role": "user", "content": "What are the latest headlines today?"}
    ],
    stream=True,
)

for chunk in stream:
    if chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

##### 2. Cursor / Continue.dev / Cline / Aider
- **Base URL / API Base**: `http://127.0.0.1:8000/v1`
- **API Key**: `sk-freeai` (or any non-empty string)
- **Model Options**:
  - Standard: `claude-3-5-sonnet`, `gpt-4o`, `deepseek-chat`, `gemini-flash`
  - Live Web Search: `claude-web`, `gpt-web`, `gemini-web`, `deepseek-web`
  - Agentic Reasoning: `claude-agent`, `gpt-agent`

##### 3. cURL (Streaming SSE with Web Search)
```bash
curl -N http://127.0.0.1:8000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-web",
    "messages": [{"role": "user", "content": "What happened today?"}],
    "stream": true
  }'
```

### 8. FreeAI Studio (Local Web UI Dashboard)

A modern, dark-themed browser interface inspired by Claude and ChatGPT with glassmorphism aesthetics, served directly by the API Gateway at `http://127.0.0.1:8000/chat` (or `http://127.0.0.1:8000/` from any web browser).

#### Key Features:
- **Live SSE Token Streaming**: Smooth real-time token rendering with animated streaming cursor.
- **Provider & Model Selector**: Switch seamlessly between 14 models (Claude Sonnet 5, Opus 5, GPT-5.4, GPT-5.5, Gemini 3.6 Flash, DeepSeek V4, Grok 4.6, Kimi K3, etc.) grouped by provider.
- **One-Click Execution Toggles**:
  - 🌐 **Web Search**: Real-time web queries with clickable citation cards and favicon previews.
  - ⚡ **Agentic Mode**: Multi-step reasoning and problem-solving.
  - 🔬 **Deep Research**: Comprehensive autonomous investigations.
- **Rich Markdown & Code Studio**: Syntax-highlighted code blocks with language indicators and one-click "Copy Code" buttons.
- **Persistent Local History**: Multi-conversation sidebar with search, delete, and rename saved in `localStorage`.
- **Live Account Pool & Cache Status**: Real-time health badge tracking available accounts in `accounts.json` and cache hits.
- **Keyboard Shortcuts**:
  - `Enter` : Send prompt
  - `Shift + Enter` : Multiline input
  - `Ctrl + K` / `Cmd + K` : Start new chat session
  - `Esc` : Stop active response stream

### 9. Re-running the Asset Extraction
To re-run the extraction script and re-format the files:
```bash
node extract.js
```
