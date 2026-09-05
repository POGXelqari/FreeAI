/**
 * FreeAI Web UI Controller (app.js)
 * Real-time SSE token streaming, multi-model selection, live web search & agentic modes,
 * markdown parsing with code block copy, and local conversation persistence.
 */

(() => {
  'use strict';

  // --------------------------------------------------------------------------
  // Configuration & State
  // --------------------------------------------------------------------------
  const API_BASE = window.location.origin;
  
  const MODEL_METADATA = {
    'claude': { name: 'Claude Sonnet 5', provider: 'Anthropic', class: 'provider-anthropic' },
    'opus': { name: 'Claude Opus 5', provider: 'Anthropic', class: 'provider-anthropic' },
    'fable': { name: 'Claude Fable 5', provider: 'Anthropic', class: 'provider-anthropic' },
    'gpt': { name: 'GPT-5.4 Thinking', provider: 'OpenAI', class: 'provider-openai' },
    'gpt-5.5': { name: 'GPT-5.5 Mini', provider: 'OpenAI', class: 'provider-openai' },
    'sol': { name: 'GPT-5.6 Sol', provider: 'OpenAI', class: 'provider-openai' },
    'gemini': { name: 'Gemini 3.6 Flash', provider: 'Google', class: 'provider-google' },
    'deepseek': { name: 'DeepSeek V4 Pro', provider: 'DeepSeek', class: 'provider-deepseek' },
    'grok': { name: 'Grok 4.6 Fast', provider: 'xAI', class: 'provider-xai' },
    'kimi': { name: 'Kimi K3 Dynamic', provider: 'Moonshot', class: 'provider-moonshot' },
    'glm': { name: 'GLM 5.2 Enterprise', provider: 'Z.AI', class: 'provider-other' },
    'auto': { name: 'Auto Fast Route', provider: 'FreeAI', class: 'provider-other' },
  };

  const state = {
    activeModel: 'claude',
    modes: {
      web: false,
      agent: false,
      deep: false,
    },
    currentSessionId: null,
    sessions: {},
    isStreaming: false,
    abortController: null,
    stagedAttachments: [],
  };

  // DOM Elements
  const elements = {
    sidebar: document.getElementById('sidebar'),
    sidebarToggleBtn: document.getElementById('sidebar-toggle-btn'),
    sidebarCloseBtn: document.getElementById('sidebar-close-btn'),
    btnNewChat: document.getElementById('btn-new-chat'),
    searchConvInput: document.getElementById('search-conv-input'),
    conversationList: document.getElementById('conversation-list'),
    poolAccountsCount: document.getElementById('pool-accounts-count'),
    cacheStatsText: document.getElementById('cache-stats-text'),
    btnRefreshPool: document.getElementById('btn-refresh-pool'),
    
    modelPickerBtn: document.getElementById('model-picker-btn'),
    dropdownModels: document.getElementById('dropdown-models'),
    currentModelProvider: document.getElementById('current-model-provider'),
    currentModelName: document.getElementById('current-model-name'),
    
    pillWeb: document.getElementById('pill-web'),
    pillAgent: document.getElementById('pill-agent'),
    pillDeep: document.getElementById('pill-deep'),
    btnClearChat: document.getElementById('btn-clear-chat'),
    
    chatViewport: document.getElementById('chat-viewport'),
    chatThread: document.getElementById('chat-thread'),
    heroWelcome: document.getElementById('hero-welcome'),
    
    promptInput: document.getElementById('prompt-input'),
    promptBox: document.getElementById('prompt-box'),
    btnSend: document.getElementById('btn-send'),
    btnStop: document.getElementById('btn-stop'),
    typingIndicator: document.getElementById('typing-indicator'),
    btnAttachFile: document.getElementById('btn-attach-file'),
    fileUploadInput: document.getElementById('file-upload-input'),
    attachedFilesContainer: document.getElementById('attached-files-container'),
    btnAuditPool: document.getElementById('btn-audit-pool'),
  };

  // --------------------------------------------------------------------------
  // Attachment Helper Functions
  // --------------------------------------------------------------------------
  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    return (bytes / 1024).toFixed(1) + ' KB';
  }

  function renderAttachedChips() {
    if (!elements.attachedFilesContainer) return;
    if (state.stagedAttachments.length === 0) {
      elements.attachedFilesContainer.style.display = 'none';
      elements.attachedFilesContainer.innerHTML = '';
      return;
    }
    elements.attachedFilesContainer.style.display = 'flex';
    elements.attachedFilesContainer.innerHTML = state.stagedAttachments.map((att, idx) => `
      <div class="attached-file-chip">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
        </svg>
        <span class="chip-name" title="${att.name}">${att.name}</span>
        <span class="chip-size">(${formatBytes(att.size)})</span>
        <button class="btn-remove-chip" data-idx="${idx}" title="Remove attachment" aria-label="Remove">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');

    elements.attachedFilesContainer.querySelectorAll('.btn-remove-chip').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        state.stagedAttachments.splice(idx, 1);
        renderAttachedChips();
      };
    });
  }

  function handleFileSelection(files) {
    if (!files || files.length === 0) return;
    Array.from(files).forEach(file => {
      if (file.size > 1_000_000) {
        alert(`File '${file.name}' exceeds 1 MB limit.`);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        state.stagedAttachments.push({
          name: file.name,
          size: file.size,
          content: content,
        });
        renderAttachedChips();
      };
      reader.readAsText(file);
    });
  }

  // --------------------------------------------------------------------------
  // Markdown & Highlight.js Setup
  // --------------------------------------------------------------------------
  if (window.marked) {
    marked.setOptions({
      breaks: true,
      gfm: true,
      highlight: (code, lang) => {
        if (window.hljs && lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(code, { language: lang }).value;
          } catch (_) {}
        }
        if (window.hljs) {
          try {
            return hljs.highlightAuto(code).value;
          } catch (_) {}
        }
        return code;
      },
    });
  }

  function renderMarkdown(rawText) {
    if (!rawText) return '';
    if (window.marked) {
      try {
        let html = marked.parse(rawText);
        // Process code blocks for Copy Code button
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        const preBlocks = tempDiv.querySelectorAll('pre');
        preBlocks.forEach((pre) => {
          const codeEl = pre.querySelector('code');
          const langClass = codeEl ? codeEl.className.match(/language-(\w+)/) : null;
          const lang = langClass ? langClass[1] : 'code';
          
          const container = document.createElement('div');
          container.className = 'code-block-container';
          
          const header = document.createElement('div');
          header.className = 'code-block-header';
          header.innerHTML = `
            <span class="code-block-lang">${lang}</span>
            <button class="btn-copy-code" data-code="${encodeURIComponent(codeEl ? codeEl.textContent : '')}">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            </button>
          `;
          
          const content = document.createElement('div');
          content.className = 'code-block-content';
          content.appendChild(pre.cloneNode(true));
          
          container.appendChild(header);
          container.appendChild(content);
          pre.parentNode.replaceChild(container, pre);
        });
        
        return tempDiv.innerHTML;
      } catch (e) {
        console.error('Markdown parse error:', e);
      }
    }
    // Simple fallback
    return rawText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
  }

  // --------------------------------------------------------------------------
  // Storage & Session Management
  // --------------------------------------------------------------------------
  function loadSessions() {
    try {
      const data = localStorage.getItem('freeai_sessions');
      if (data) {
        state.sessions = JSON.parse(data);
      }
    } catch (e) {
      console.warn('Failed to load sessions from localStorage:', e);
      state.sessions = {};
    }
  }

  function saveSessions() {
    try {
      localStorage.setItem('freeai_sessions', JSON.stringify(state.sessions));
    } catch (e) {
      console.warn('Failed to save sessions to localStorage:', e);
    }
  }

  function createNewSession() {
    const id = 'sess_' + Date.now();
    state.currentSessionId = id;
    state.sessions[id] = {
      id: id,
      title: 'New Conversation',
      createdAt: Date.now(),
      model: state.activeModel,
      messages: [],
    };
    saveSessions();
    renderConversationList();
    renderChatThread();
    elements.promptInput.focus();
    return id;
  }

  function switchSession(id) {
    if (!state.sessions[id]) return;
    state.currentSessionId = id;
    const sess = state.sessions[id];
    if (sess.model && MODEL_METADATA[sess.model]) {
      setModel(sess.model);
    }
    renderConversationList();
    renderChatThread();
  }

  function deleteSession(id, e) {
    if (e) e.stopPropagation();
    delete state.sessions[id];
    saveSessions();
    if (state.currentSessionId === id) {
      const remainingIds = Object.keys(state.sessions);
      if (remainingIds.length > 0) {
        switchSession(remainingIds[remainingIds.length - 1]);
      } else {
        createNewSession();
      }
    } else {
      renderConversationList();
    }
  }

  function renderConversationList(filterText = '') {
    elements.conversationList.innerHTML = '';
    const sortedSessions = Object.values(state.sessions).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

    sortedSessions.forEach((sess) => {
      if (filterText && !sess.title.toLowerCase().includes(filterText.toLowerCase())) {
        return;
      }
      const item = document.createElement('div');
      item.className = `conversation-item ${sess.id === state.currentSessionId ? 'active' : ''}`;
      item.onclick = () => switchSession(sess.id);

      item.innerHTML = `
        <span class="conversation-title" title="${sess.title}">${sess.title}</span>
        <div class="conversation-actions">
          <button class="btn-item-action btn-delete-sess" title="Delete conversation" aria-label="Delete">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      `;

      const deleteBtn = item.querySelector('.btn-delete-sess');
      deleteBtn.onclick = (e) => deleteSession(sess.id, e);

      elements.conversationList.appendChild(item);
    });
  }

  // --------------------------------------------------------------------------
  // Model Selector
  // --------------------------------------------------------------------------
  function setModel(slug) {
    state.activeModel = slug;
    const meta = MODEL_METADATA[slug] || { name: slug, provider: 'FreeAI', class: 'provider-other' };
    elements.currentModelName.textContent = meta.name;
    elements.currentModelProvider.textContent = meta.provider;
    elements.currentModelProvider.className = `model-provider-badge ${meta.class}`;
    
    // Update active in dropdown
    const items = elements.dropdownModels.querySelectorAll('.dropdown-item');
    items.forEach((it) => {
      if (it.dataset.slug === slug) {
        it.classList.add('active');
      } else {
        it.classList.remove('active');
      }
    });

    if (state.currentSessionId && state.sessions[state.currentSessionId]) {
      state.sessions[state.currentSessionId].model = slug;
      saveSessions();
    }
  }

  function populateModelDropdown() {
    elements.dropdownModels.innerHTML = '';
    const providers = {};

    Object.entries(MODEL_METADATA).forEach(([slug, meta]) => {
      if (!providers[meta.provider]) {
        providers[meta.provider] = [];
      }
      providers[meta.provider].push({ slug, ...meta });
    });

    Object.entries(providers).forEach(([provider, models]) => {
      const groupTitle = document.createElement('div');
      groupTitle.className = 'dropdown-group-title';
      groupTitle.textContent = provider;
      elements.dropdownModels.appendChild(groupTitle);

      models.forEach((m) => {
        const item = document.createElement('div');
        item.className = `dropdown-item ${m.slug === state.activeModel ? 'active' : ''}`;
        item.dataset.slug = m.slug;
        item.innerHTML = `
          <span>${m.name}</span>
          <span class="model-provider-badge ${m.class}">${m.provider}</span>
        `;
        item.onclick = () => {
          setModel(m.slug);
          elements.dropdownModels.classList.remove('show');
          elements.modelPickerBtn.setAttribute('aria-expanded', 'false');
        };
        elements.dropdownModels.appendChild(item);
      });
    });
  }

  // --------------------------------------------------------------------------
  // UI Rendering & Message View
  // --------------------------------------------------------------------------
  function renderChatThread() {
    const sess = state.sessions[state.currentSessionId];
    if (!sess || !sess.messages || sess.messages.length === 0) {
      elements.chatThread.innerHTML = '';
      elements.chatThread.appendChild(elements.heroWelcome);
      elements.heroWelcome.style.display = 'flex';
      return;
    }

    elements.heroWelcome.style.display = 'none';
    elements.chatThread.innerHTML = '';

    sess.messages.forEach((msg) => {
      appendMessageToDOM(msg.role, msg.content, msg.sources, false);
    });

    scrollToBottom();
  }

  function appendMessageToDOM(role, content, sources = [], isStreaming = false) {
    elements.heroWelcome.style.display = 'none';

    const row = document.createElement('div');
    row.className = `message-row ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'user' ? 'U' : 'AI';

    const wrapper = document.createElement('div');
    wrapper.className = 'message-content-wrapper';

    const header = document.createElement('div');
    header.className = 'message-header';

    const sender = document.createElement('div');
    sender.className = 'message-sender';
    
    if (role === 'user') {
      sender.textContent = 'You';
    } else {
      const meta = MODEL_METADATA[state.activeModel] || { name: 'Assistant' };
      sender.innerHTML = `
        <span>${meta.name}</span>
        ${state.modes.web ? '<span class="model-provider-badge" style="background:rgba(6,182,212,0.2); color:#38bdf8;">Web</span>' : ''}
        ${state.modes.agent ? '<span class="model-provider-badge" style="background:rgba(245,158,11,0.2); color:#fbbf24;">Agent</span>' : ''}
      `;
    }

    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    header.appendChild(sender);
    header.appendChild(time);

    const body = document.createElement('div');
    body.className = `message-body ${role === 'assistant' ? 'markdown-body' : ''}`;
    
    if (role === 'assistant') {
      body.innerHTML = renderMarkdown(content) + (isStreaming ? '<span class="streaming-cursor"></span>' : '');
    } else {
      body.textContent = content;
    }

    wrapper.appendChild(header);
    wrapper.appendChild(body);

    // Render Source Citations if present
    if (sources && sources.length > 0) {
      const sourcesCard = document.createElement('div');
      sourcesCard.className = 'sources-card';
      sourcesCard.innerHTML = `
        <div class="sources-header">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line></svg>
          Sources (${sources.length})
        </div>
        <div class="sources-list">
          ${sources.map((s, idx) => `
            <div class="source-item">
              <span class="source-number">${idx + 1}.</span>
              <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="source-link" title="${s.title || s.url}">
                ${s.title || s.url}
              </a>
            </div>
          `).join('')}
        </div>
      `;
      wrapper.appendChild(sourcesCard);
    }

    // Assistant Action Footer
    if (role === 'assistant' && !isStreaming) {
      const actions = document.createElement('div');
      actions.className = 'message-actions';
      actions.innerHTML = `
        <button class="btn-msg-action btn-copy-msg" title="Copy response text">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copy
        </button>
      `;
      actions.querySelector('.btn-copy-msg').onclick = () => {
        navigator.clipboard.writeText(content).then(() => {
          actions.querySelector('.btn-copy-msg').innerHTML = '<span>✓ Copied</span>';
          setTimeout(() => {
            actions.querySelector('.btn-copy-msg').innerHTML = `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            `;
          }, 2000);
        });
      };
      wrapper.appendChild(actions);
    }

    row.appendChild(avatar);
    row.appendChild(wrapper);
    elements.chatThread.appendChild(row);

    return { row, body, wrapper };
  }

  function scrollToBottom() {
    elements.chatViewport.scrollTop = elements.chatViewport.scrollHeight;
  }

  // --------------------------------------------------------------------------
  // Real-Time Chat Completion (SSE Streaming)
  // --------------------------------------------------------------------------
  async function sendMessage(promptText) {
    if (!promptText || !promptText.trim()) return;
    if (state.isStreaming) return;

    const trimmedPrompt = promptText.trim();
    elements.promptInput.value = '';
    elements.promptInput.style.height = 'auto';

    // Ensure active session
    if (!state.currentSessionId || !state.sessions[state.currentSessionId]) {
      createNewSession();
    }
    const currentSession = state.sessions[state.currentSessionId];

    // Check if attachments are staged
    let effectiveUserPrompt = trimmedPrompt;
    if (state.stagedAttachments && state.stagedAttachments.length > 0) {
      const fileBlocks = state.stagedAttachments.map(att => {
        const ext = att.name.split('.').pop() || 'text';
        return `### File: ${att.name} (${formatBytes(att.size)})\n\`\`\`${ext}\n${att.content}\n\`\`\``;
      });
      effectiveUserPrompt = `## Codebase / File Attachments (${state.stagedAttachments.length} files):\n\n` +
        fileBlocks.join('\n\n') +
        `\n\n---\n\n## User Instruction:\n${trimmedPrompt}`;

      // Reset staged attachments
      state.stagedAttachments = [];
      renderAttachedChips();
    }

    // Auto-title conversation on first message
    if (currentSession.messages.length === 0) {
      currentSession.title = trimmedPrompt.length > 30 ? trimmedPrompt.slice(0, 30) + '...' : trimmedPrompt;
      renderConversationList();
    }

    // Add user message to state & DOM
    currentSession.messages.push({ role: 'user', content: effectiveUserPrompt, displayContent: trimmedPrompt });
    appendMessageToDOM('user', trimmedPrompt);
    saveSessions();
    scrollToBottom();

    // Prepare assistant streaming DOM shell
    state.isStreaming = true;
    elements.btnSend.style.display = 'none';
    elements.btnStop.style.display = 'flex';
    elements.typingIndicator.style.display = 'inline-flex';

    const { body: assistantBody, wrapper: assistantWrapper, row: assistantRow } = 
      appendMessageToDOM('assistant', '', [], true);
    scrollToBottom();

    // Prepare API request payload
    let targetModel = state.activeModel;
    if (state.modes.web) targetModel += '-web';
    else if (state.modes.agent) targetModel += '-agent';
    else if (state.modes.deep) targetModel += '-deep';

    // Map conversation messages
    const apiMessages = currentSession.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    state.abortController = new AbortController();
    let accumulatedContent = '';
    let extractedSources = [];

    try {
      const response = await fetch(`${API_BASE}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Web-Search': state.modes.web ? 'true' : 'false',
          'X-Agentic-Mode': state.modes.agent ? 'true' : 'false',
          'X-Deep-Research': state.modes.deep ? 'true' : 'false',
        },
        body: JSON.stringify({
          model: targetModel,
          messages: apiMessages,
          stream: true,
          web_search: state.modes.web,
          agentic: state.modes.agent,
          deep_research: state.modes.deep,
        }),
        signal: state.abortController.signal,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gateway Error (${response.status}): ${errorText}`);
      }

      elements.typingIndicator.style.display = 'none';

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop(); // Keep uncompleted line in buffer

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine.startsWith(':')) continue; // Skip keep-alives

          if (trimmedLine === 'data: [DONE]') {
            break;
          }

          if (trimmedLine.startsWith('data: ')) {
            const jsonStr = trimmedLine.slice(6);
            try {
              const parsed = JSON.parse(jsonStr);
              const delta = parsed.choices?.[0]?.delta;
              if (delta && delta.content) {
                accumulatedContent += delta.content;
                assistantBody.innerHTML = renderMarkdown(accumulatedContent) + '<span class="streaming-cursor"></span>';
                scrollToBottom();
              }
            } catch (err) {
              console.warn('Could not parse SSE chunk:', jsonStr, err);
            }
          }
        }
      }

      // Check if sources block exists in content
      const sourcesMatch = accumulatedContent.match(/### Sources:\s*\n([\s\S]*?)$/);
      if (sourcesMatch) {
        const sourceLines = sourcesMatch[1].split('\n');
        sourceLines.forEach((sLine) => {
          const linkMatch = sLine.match(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/);
          if (linkMatch) {
            extractedSources.push({ title: linkMatch[1], url: linkMatch[2] });
          }
        });
      }

      // Final render without streaming cursor
      assistantBody.innerHTML = renderMarkdown(accumulatedContent);

      // Render parsed sources if found
      if (extractedSources.length > 0) {
        const existingSources = assistantWrapper.querySelector('.sources-card');
        if (!existingSources) {
          const sourcesCard = document.createElement('div');
          sourcesCard.className = 'sources-card';
          sourcesCard.innerHTML = `
            <div class="sources-header">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line></svg>
              Sources (${extractedSources.length})
            </div>
            <div class="sources-list">
              ${extractedSources.map((s, idx) => `
                <div class="source-item">
                  <span class="source-number">${idx + 1}.</span>
                  <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="source-link" title="${s.title}">
                    ${s.title}
                  </a>
                </div>
              `).join('')}
            </div>
          `;
          assistantWrapper.appendChild(sourcesCard);
        }
      }

      // Add copy action button
      const actions = document.createElement('div');
      actions.className = 'message-actions';
      actions.innerHTML = `
        <button class="btn-msg-action btn-copy-msg" title="Copy response text">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          Copy
        </button>
      `;
      actions.querySelector('.btn-copy-msg').onclick = () => {
        navigator.clipboard.writeText(accumulatedContent).then(() => {
          actions.querySelector('.btn-copy-msg').innerHTML = '<span>✓ Copied</span>';
          setTimeout(() => {
            actions.querySelector('.btn-copy-msg').innerHTML = `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy
            `;
          }, 2000);
        });
      };
      assistantWrapper.appendChild(actions);

      // Save to conversation history
      currentSession.messages.push({
        role: 'assistant',
        content: accumulatedContent,
        sources: extractedSources,
      });
      saveSessions();

    } catch (err) {
      if (err.name === 'AbortError') {
        assistantBody.innerHTML = renderMarkdown(accumulatedContent) + ' <em>(Stream stopped by user)</em>';
      } else {
        console.error('Streaming request failed:', err);
        assistantBody.innerHTML = `<span style="color:var(--status-error);">⚠ Error: ${err.message}</span>`;
      }
    } finally {
      state.isStreaming = false;
      state.abortController = null;
      elements.btnSend.style.display = 'flex';
      elements.btnStop.style.display = 'none';
      elements.typingIndicator.style.display = 'none';
      refreshPoolStatus();
    }
  }

  function stopStreaming() {
    if (state.abortController) {
      state.abortController.abort();
    }
  }

  // --------------------------------------------------------------------------
  // Gateway Health & Account Pool Poller
  // --------------------------------------------------------------------------
  async function refreshPoolStatus() {
    try {
      const response = await fetch(`${API_BASE}/`);
      if (response.ok) {
        const data = await response.json();
        if (data.accounts_in_pool !== undefined) {
          elements.poolAccountsCount.textContent = `${data.accounts_in_pool} Accounts Ready`;
        }
        if (data.cache) {
          elements.cacheStatsText.textContent = `Cache: ${data.cache.total_hits} Hits (${data.cache.size_kb} KB)`;
        }
      }
    } catch (err) {
      console.warn('Could not refresh pool status:', err);
    }
  }

  // --------------------------------------------------------------------------
  // Event Listeners & Initialization
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // Prompt Input Auto-Resize & Submit
    elements.promptInput.addEventListener('input', () => {
      elements.promptInput.style.height = 'auto';
      elements.promptInput.style.height = Math.min(elements.promptInput.scrollHeight, 200) + 'px';
    });

    elements.promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(elements.promptInput.value);
      }
    });

    elements.btnSend.addEventListener('click', () => {
      sendMessage(elements.promptInput.value);
    });

    elements.btnStop.addEventListener('click', stopStreaming);

    // Mode Toggles
    elements.pillWeb.addEventListener('click', () => {
      state.modes.web = !state.modes.web;
      elements.pillWeb.classList.toggle('active', state.modes.web);
    });

    elements.pillAgent.addEventListener('click', () => {
      state.modes.agent = !state.modes.agent;
      elements.pillAgent.classList.toggle('active', state.modes.agent);
    });

    elements.pillDeep.addEventListener('click', () => {
      state.modes.deep = !state.modes.deep;
      elements.pillDeep.classList.toggle('active', state.modes.deep);
    });

    // Model Picker Dropdown
    elements.modelPickerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = elements.dropdownModels.classList.toggle('show');
      elements.modelPickerBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (!elements.modelPickerBtn.contains(e.target) && !elements.dropdownModels.contains(e.target)) {
        elements.dropdownModels.classList.remove('show');
        elements.modelPickerBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Sidebar Toggles
    elements.sidebarToggleBtn.addEventListener('click', () => {
      elements.sidebar.classList.toggle('collapsed');
      elements.sidebar.classList.toggle('open');
    });

    elements.sidebarCloseBtn.addEventListener('click', () => {
      elements.sidebar.classList.add('collapsed');
      elements.sidebar.classList.remove('open');
    });

    // New Chat & Clear
    elements.btnNewChat.addEventListener('click', () => createNewSession());
    elements.btnClearChat.addEventListener('click', () => {
      if (confirm('Clear messages in current conversation?')) {
        if (state.currentSessionId && state.sessions[state.currentSessionId]) {
          state.sessions[state.currentSessionId].messages = [];
          saveSessions();
          renderChatThread();
        }
      }
    });

    // Conversation Search
    elements.searchConvInput.addEventListener('input', (e) => {
      renderConversationList(e.target.value);
    });

    // Attachment Paperclip & File Input
    if (elements.btnAttachFile && elements.fileUploadInput) {
      elements.btnAttachFile.addEventListener('click', () => {
        elements.fileUploadInput.click();
      });

      elements.fileUploadInput.addEventListener('change', (e) => {
        handleFileSelection(e.target.files);
        elements.fileUploadInput.value = '';
      });
    }

    // Drag and Drop Zone on Prompt Box
    if (elements.promptBox) {
      ['dragenter', 'dragover'].forEach(eventName => {
        elements.promptBox.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          elements.promptBox.classList.add('drag-over');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        elements.promptBox.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          elements.promptBox.classList.remove('drag-over');
        });
      });

      elements.promptBox.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          handleFileSelection(dt.files);
        }
      });
    }

    // Audit Pool Button
    if (elements.btnAuditPool) {
      elements.btnAuditPool.addEventListener('click', async () => {
        elements.poolAccountsCount.textContent = 'Auditing pool...';
        try {
          const res = await fetch(`${API_BASE}/v1/pool/audit`, { method: 'POST' });
          if (res.ok) {
            const rep = await res.json();
            elements.poolAccountsCount.textContent = `${rep.valid_count} Valid (${rep.pruned_count} pruned)`;
            setTimeout(refreshPoolStatus, 3500);
          } else {
            elements.poolAccountsCount.textContent = 'Audit error';
            setTimeout(refreshPoolStatus, 2000);
          }
        } catch (e) {
          console.warn('Audit request failed:', e);
          refreshPoolStatus();
        }
      });
    }

    // Refresh Pool Button
    elements.btnRefreshPool.addEventListener('click', refreshPoolStatus);

    // Hero Prompt Suggestion Cards
    document.querySelectorAll('.hero-card').forEach((card) => {
      card.addEventListener('click', () => {
        const prompt = card.dataset.prompt;
        if (card.dataset.web) {
          state.modes.web = true;
          elements.pillWeb.classList.add('active');
        }
        if (card.dataset.agent) {
          state.modes.agent = true;
          elements.pillAgent.classList.add('active');
        }
        sendMessage(prompt);
      });
    });

    // Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        createNewSession();
      }
      if (e.key === 'Escape' && state.isStreaming) {
        stopStreaming();
      }
    });

    // Copy Code Delegation
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.btn-copy-code');
      if (copyBtn) {
        const codeText = decodeURIComponent(copyBtn.dataset.code || '');
        navigator.clipboard.writeText(codeText).then(() => {
          const originalHTML = copyBtn.innerHTML;
          copyBtn.innerHTML = '<span>✓ Copied</span>';
          setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
          }, 2000);
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // Application Bootstrap
  // --------------------------------------------------------------------------
  function init() {
    loadSessions();
    populateModelDropdown();
    setModel('claude');

    // Restore last session or create new
    const sessionIds = Object.keys(state.sessions);
    if (sessionIds.length > 0) {
      const lastId = sessionIds[sessionIds.length - 1];
      switchSession(lastId);
    } else {
      createNewSession();
    }

    setupEventListeners();
    refreshPoolStatus();
    setInterval(refreshPoolStatus, 20000); // Periodic status refresh
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
