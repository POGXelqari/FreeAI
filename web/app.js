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
    'imagen-3': { name: 'Imagen 3 Studio', provider: 'Google', class: 'provider-google' },
    'dall-e-3': { name: 'DALL-E 3 Ultra', provider: 'OpenAI', class: 'provider-openai' },
    'flux-1-schnell': { name: 'FLUX.1 Schnell', provider: 'Black Forest', class: 'provider-other' },
  };

  const state = {
    activeModel: 'claude',
    modes: {
      web: false,
      agent: false,
      deep: false,
      image: false,
    },
    imageConfig: {
      style: 'realistic',
      ratio: '1:1',
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
    pillImage: document.getElementById('pill-image'),
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

    // Image Generation & Inspector Elements
    imageControlsBar: document.getElementById('image-controls-bar'),
    imageStyleSelect: document.getElementById('image-style-select'),
    imageRatioSelect: document.getElementById('image-ratio-select'),
    btnOpenInspector: document.getElementById('btn-open-inspector'),
    lightboxModal: document.getElementById('lightbox-modal'),
    lightboxCloseBtn: document.getElementById('lightbox-close-btn'),
    lightboxImg: document.getElementById('lightbox-img'),
    lightboxInspectBtn: document.getElementById('lightbox-inspect-btn'),
    lightboxDownloadBtn: document.getElementById('lightbox-download-btn'),
    inspectorModal: document.getElementById('inspector-modal'),
    inspectorCloseBtn: document.getElementById('inspector-close-btn'),
    inspectorDropzone: document.getElementById('inspector-dropzone'),
    inspectorFileInput: document.getElementById('inspector-file-input'),
    inspectorLoading: document.getElementById('inspector-loading'),
    inspectorResults: document.getElementById('inspector-results'),
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
      <div class="attached-file-chip ${att.isImage ? 'image-chip' : ''}">
        ${att.isImage && att.dataUrl ? `
          <img src="${att.dataUrl}" alt="${att.name}" class="chip-thumb" style="width:20px; height:20px; object-fit:cover; border-radius:4px;">
        ` : `
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
        `}
        <span class="chip-name" title="${att.name}">${att.name}</span>
        <span class="chip-size">(${formatBytes(att.size)})</span>
        ${att.isImage ? `
          <button class="btn-inspect-chip" data-idx="${idx}" title="Inspect PNG/Image Forensics" aria-label="Inspect">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        ` : ''}
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

    elements.attachedFilesContainer.querySelectorAll('.btn-inspect-chip').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.dataset.idx, 10);
        const att = state.stagedAttachments[idx];
        if (att && att.dataUrl) {
          openInspector();
          runForensicInspection({ b64_json: att.dataUrl.split(',')[1] || att.dataUrl, filename: att.name });
        }
      };
    });
  }

  function handleFileSelection(files) {
    if (!files || files.length === 0) return;
    Array.from(files).forEach(file => {
      if (file.size > 5_000_000) {
        alert(`File '${file.name}' exceeds 5 MB limit.`);
        return;
      }
      const isImg = file.type.startsWith('image/') || /\.(png|jpe?g|webp|gif|bmp)$/i.test(file.name);
      const reader = new FileReader();

      if (isImg) {
        reader.onload = (e) => {
          const att = {
            name: file.name,
            size: file.size,
            isImage: true,
            dataUrl: e.target.result,
            content: `[Attached Image: ${file.name} (${formatBytes(file.size)})]`,
            analysis: null,
            analysisMarkdown: null,
          };
          state.stagedAttachments.push(att);
          renderAttachedChips();

          // Pre-fetch forensic visual analysis in the background
          const b64Data = e.target.result.split(',')[1] || e.target.result;
          fetch(`${API_BASE}/v1/images/inspect`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ b64_json: b64Data, filename: file.name }),
          })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
              if (data && data.report) {
                att.analysis = data.report;
                att.analysisMarkdown = data.markdown;
                renderAttachedChips();
              }
            })
            .catch(err => console.debug('Pre-inspection background notice:', err));
        };
        reader.readAsDataURL(file);
      } else {
        reader.onload = (e) => {
          state.stagedAttachments.push({
            name: file.name,
            size: file.size,
            isImage: false,
            content: e.target.result,
          });
          renderAttachedChips();
        };
        reader.readAsText(file);
      }
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

        // Wrap markdown images with interactive card controls
        const imgTags = tempDiv.querySelectorAll('img');
        imgTags.forEach((img) => {
          const wrapper = document.createElement('div');
          wrapper.className = 'generated-image-container';
          wrapper.dataset.imgUrl = img.src;
          wrapper.innerHTML = `
            <img src="${img.src}" alt="${img.alt || 'Generated Image'}" class="generated-image-img" loading="lazy">
            <div class="generated-image-overlay">
              <div class="generated-image-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                AI Synthesis
              </div>
              <div class="generated-image-actions">
                <button class="btn-image-action btn-inspect-image" data-img-url="${img.src}" title="Forensic IDAT & PNG Inspection">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  Inspect
                </button>
                <a class="btn-image-action" href="${img.src}" download="freeai-image.png" target="_blank" rel="noopener" title="Download">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  Save
                </a>
              </div>
            </div>
          `;
          img.parentNode.replaceChild(wrapper, img);
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
  function getColorHexForName(name) {
    const n = (name || '').toLowerCase();
    if (n.includes('dark') || n.includes('black') || n.includes('navy')) return '#1e293b';
    if (n.includes('light') || n.includes('white')) return '#f8fafc';
    if (n.includes('gray') || n.includes('slate') || n.includes('neutral')) return '#64748b';
    if (n.includes('red') || n.includes('crimson')) return '#ef4444';
    if (n.includes('orange') || n.includes('amber')) return '#f97316';
    if (n.includes('yellow') || n.includes('gold')) return '#eab308';
    if (n.includes('green') || n.includes('emerald') || n.includes('lime')) return '#10b981';
    if (n.includes('cyan') || n.includes('teal')) return '#06b6d4';
    if (n.includes('blue') || n.includes('indigo')) return '#3b82f6';
    if (n.includes('purple') || n.includes('magenta')) return '#a855f7';
    return '#6366f1';
  }

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
      appendMessageToDOM(msg.role, msg.displayContent || msg.content, msg.sources, false, msg.attachments || []);
    });

    scrollToBottom();
  }

  function appendMessageToDOM(role, content, sources = [], isStreaming = false, attachments = []) {
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
      body.innerHTML = '';

      // Render image attachments and files directly in chat bubble
      if (attachments && attachments.length > 0) {
        const attachWrapper = document.createElement('div');
        attachWrapper.className = 'chat-message-attachments';

        attachments.forEach((att) => {
          if (att.isImage && att.dataUrl) {
            const card = document.createElement('div');
            card.className = 'chat-attached-image-card';

            const dims = att.analysis?.dimensions || '';
            const tone = att.analysis?.pixel_stats?.dominant_tone || '';

            card.innerHTML = `
              <div class="chat-attached-image-preview-wrapper">
                <img src="${att.dataUrl}" alt="${att.name}" class="chat-attached-image-thumb" loading="lazy" />
                <div class="chat-attached-image-actions-overlay">
                  <button class="btn-chat-img-action btn-chat-zoom" title="Zoom image in lightbox">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                    Zoom
                  </button>
                  <button class="btn-chat-img-action btn-chat-full-inspect" title="Open Forensic Inspector Modal">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    Forensic Modal
                  </button>
                </div>
              </div>
              <div class="chat-attached-image-info-bar">
                <div class="chat-attached-image-title">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <span class="chat-attached-image-name" title="${att.name}">${att.name}</span>
                </div>
                <div class="chat-attached-image-badges">
                  <span class="chat-img-badge size">${formatBytes(att.size)}</span>
                  ${dims ? `<span class="chat-img-badge res">${dims}</span>` : ''}
                  ${tone ? `<span class="chat-img-badge tone">${tone}</span>` : ''}
                </div>
              </div>
              <div class="chat-attached-image-drawer">
                <button class="btn-toggle-chat-analysis">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="drawer-chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    <span>Visual Content & Forensic Analysis</span>
                  </div>
                  <span class="chat-analyzable-tag">Analyzable</span>
                </button>
                <div class="chat-analysis-panel" style="display:none;">
                  <div class="chat-analysis-loading"><div class="spinner"></div> Extracting visual & pixel metrics...</div>
                  <div class="chat-analysis-body"></div>
                </div>
              </div>
            `;

            // Bind Zoom / Lightbox
            card.querySelector('.btn-chat-zoom').onclick = () => {
              openLightbox({ url: att.dataUrl, alt: att.name });
            };
            card.querySelector('.chat-attached-image-thumb').onclick = () => {
              openLightbox({ url: att.dataUrl, alt: att.name });
            };

            // Bind Forensic Modal
            card.querySelector('.btn-chat-full-inspect').onclick = () => {
              openInspector();
              runForensicInspection({ b64_json: att.dataUrl.split(',')[1] || att.dataUrl, filename: att.name });
            };

            // Bind Visual Analysis Drawer Toggle
            const toggleBtn = card.querySelector('.btn-toggle-chat-analysis');
            const drawerPanel = card.querySelector('.chat-analysis-panel');
            const loadingEl = card.querySelector('.chat-analysis-loading');
            const bodyEl = card.querySelector('.chat-analysis-body');
            const chevron = card.querySelector('.drawer-chevron');

            function renderAnalysisInDrawer(report) {
              loadingEl.style.display = 'none';
              const pix = report.pixel_stats || {};
              const idat = report.idat_analysis || {};
              const topColors = pix.dominant_colors || [];

              bodyEl.innerHTML = `
                <div class="chat-metrics-grid">
                  <div class="chat-metric-item">
                    <span class="metric-lbl">Resolution & Aspect</span>
                    <span class="metric-val">${report.dimensions || 'Unknown'} (${report.aspect_ratio || 'N/A'}${report.megapixels ? `, ${report.megapixels} MP` : ''})</span>
                  </div>
                  <div class="chat-metric-item">
                    <span class="metric-lbl">Visual Tone</span>
                    <span class="metric-val">${pix.dominant_tone || 'Standard'} Tone (Mean Lum: ${pix.mean_luminance || 'N/A'}/255)</span>
                  </div>
                  <div class="chat-metric-item">
                    <span class="metric-lbl">Temperature / Vibrancy</span>
                    <span class="metric-val">${pix.color_temperature || 'Neutral'} • ${pix.saturation_desc || 'Standard'}</span>
                  </div>
                  <div class="chat-metric-item">
                    <span class="metric-lbl">Contrast Range</span>
                    <span class="metric-val">${pix.contrast_desc || 'Standard'}</span>
                  </div>
                  ${pix.visual_type ? `
                    <div class="chat-metric-item full-width">
                      <span class="metric-lbl">Visual Classification</span>
                      <span class="metric-val">${pix.visual_type}</span>
                    </div>
                  ` : ''}
                  ${topColors.length > 0 ? `
                    <div class="chat-metric-item full-width">
                      <span class="metric-lbl">Dominant Palette</span>
                      <div class="chat-palette-swatches">
                        ${topColors.map(c => `
                          <span class="chat-swatch-tag">
                            <span class="chat-swatch-chip" style="background:${getColorHexForName(c.name)};"></span>
                            <span>${c.name} (${c.percent}%)</span>
                          </span>
                        `).join('')}
                      </div>
                    </div>
                  ` : ''}
                  <div class="chat-metric-item">
                    <span class="metric-lbl">Compression / Payload</span>
                    <span class="metric-val">${idat.compression_ratio ? `${idat.compression_ratio}x` : 'N/A'} (zlib compressed binary)</span>
                  </div>
                  <div class="chat-metric-item">
                    <span class="metric-lbl">Entropy & Integrity</span>
                    <span class="metric-val">${idat.compressed_entropy || 'N/A'} b/B • ${report.anomalies?.length ? `${report.anomalies.length} anomaly` : 'Clean (CRC Valid)'}</span>
                  </div>
                </div>
              `;
            }

            toggleBtn.onclick = () => {
              const isOpen = drawerPanel.style.display !== 'none';
              if (isOpen) {
                drawerPanel.style.display = 'none';
                chevron.style.transform = 'rotate(0deg)';
              } else {
                drawerPanel.style.display = 'block';
                chevron.style.transform = 'rotate(180deg)';

                if (att.analysis) {
                  renderAnalysisInDrawer(att.analysis);
                } else {
                  loadingEl.style.display = 'flex';
                  const b64Data = att.dataUrl.split(',')[1] || att.dataUrl;
                  fetch(`${API_BASE}/v1/images/inspect`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ b64_json: b64Data, filename: att.name }),
                  })
                    .then(r => r.json())
                    .then(d => {
                      if (d && d.report) {
                        att.analysis = d.report;
                        att.analysisMarkdown = d.markdown;
                        renderAnalysisInDrawer(d.report);
                      } else {
                        loadingEl.textContent = 'Analysis could not be extracted.';
                      }
                    })
                    .catch(e => {
                      loadingEl.textContent = `Analysis error: ${e.message}`;
                    });
                }
              }
            };

            attachWrapper.appendChild(card);
          } else {
            // Text or code attachment
            const chip = document.createElement('div');
            chip.className = 'chat-attached-file-badge';
            chip.innerHTML = `
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              <span>${att.name} (${formatBytes(att.size)})</span>
            `;
            attachWrapper.appendChild(chip);
          }
        });

        body.appendChild(attachWrapper);
      }

      if (content && content.trim()) {
        const textNode = document.createElement('div');
        textNode.className = 'chat-user-text';
        textNode.textContent = content;
        body.appendChild(textNode);
      }
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
  // Image Generation & Lightbox Helpers
  // --------------------------------------------------------------------------
  function mapRatioToSize(ratio) {
    const map = {
      '1:1': '1024x1024',
      '16:9': '1024x576',
      '9:16': '576x1024',
      '4:3': '1024x768',
      '3:4': '768x1024',
    };
    return map[ratio] || '1024x1024';
  }

  function renderGeneratedImageCard(imgUrl, promptText) {
    return `
      <div class="generated-image-container" data-img-url="${imgUrl}">
        <img src="${imgUrl}" alt="${promptText}" class="generated-image-img" loading="lazy">
        <div class="generated-image-overlay">
          <div class="generated-image-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
            AI Synthesis
          </div>
          <div class="generated-image-actions">
            <button class="btn-image-action btn-inspect-image" data-img-url="${imgUrl}" title="Forensic IDAT & PNG Inspection">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              Inspect
            </button>
            <a class="btn-image-action" href="${imgUrl}" download="freeai-image.png" target="_blank" rel="noopener" title="Download">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Save
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // Lightbox Modal Controls
  // --------------------------------------------------------------------------
  function openLightbox(src) {
    if (!elements.lightboxModal) return;
    elements.lightboxImg.src = src;
    elements.lightboxDownloadBtn.href = src;
    elements.lightboxInspectBtn.dataset.imgUrl = src;
    elements.lightboxModal.style.display = 'flex';
  }

  function closeLightbox() {
    if (!elements.lightboxModal) return;
    elements.lightboxModal.style.display = 'none';
    elements.lightboxImg.src = '';
  }

  // --------------------------------------------------------------------------
  // Forensic Image Inspector Engine
  // --------------------------------------------------------------------------
  function openInspector(options = {}) {
    if (!elements.inspectorModal) return;
    elements.inspectorModal.style.display = 'flex';
    elements.inspectorResults.style.display = 'none';
    elements.inspectorLoading.style.display = 'none';
    elements.inspectorDropzone.style.display = 'flex';

    if (options.url) {
      runForensicInspection({ url: options.url });
    } else if (options.b64_json) {
      runForensicInspection({ b64_json: options.b64_json, filename: options.filename || 'image.png' });
    }
  }

  function closeInspector() {
    if (!elements.inspectorModal) return;
    elements.inspectorModal.style.display = 'none';
  }

  async function runForensicInspection(payload) {
    if (!elements.inspectorResults || !elements.inspectorLoading) return;
    elements.inspectorLoading.style.display = 'flex';
    elements.inspectorResults.style.display = 'none';

    try {
      const response = await fetch(`${API_BASE}/v1/images/inspect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Inspection failed (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const rep = data.report || {};
      const fmt = rep.format || 'PNG';
      const idat = rep.idat_analysis || {};
      const hdr = rep.header || {};
      const anomalies = rep.anomalies || [];
      const isPNG = fmt === 'PNG';

      // Build Interactive Inspection View
      let html = `
        <!-- Top Metrics Grid -->
        <div class="forensic-grid">
          <div class="forensic-card">
            <span class="forensic-label">Format</span>
            <span class="forensic-val" style="color:#60a5fa;">${fmt}</span>
            <span class="forensic-sub">${hdr.color_space || 'Image Container'}</span>
          </div>
          <div class="forensic-card">
            <span class="forensic-label">Resolution</span>
            <span class="forensic-val" style="color:#34d399;">${rep.dimensions || 'Unknown'}</span>
            <span class="forensic-sub">${hdr.bit_depth ? hdr.bit_depth + '-bit per channel' : ''}</span>
          </div>
          <div class="forensic-card">
            <span class="forensic-label">File Size</span>
            <span class="forensic-val" style="color:#f59e0b;">${formatBytes(rep.file_size || 0)}</span>
            <span class="forensic-sub">${(rep.file_size || 0).toLocaleString()} bytes</span>
          </div>
          <div class="forensic-card">
            <span class="forensic-label">Integrity Check</span>
            <span class="forensic-val" style="color:${anomalies.length > 0 ? '#ef4444' : '#10b981'};">
              ${anomalies.length > 0 ? '⚠️ ' + anomalies.length + ' Anomaly' : '✓ Verified'}
            </span>
            <span class="forensic-sub">${rep.total_chunks || 0} chunks checked</span>
          </div>
        </div>
      `;

      // PNG IDAT zlib Decompressor & Scanline Reversal Card
      if (isPNG) {
        const compRatio = idat.compression_ratio ? (idat.compression_ratio).toFixed(2) + 'x' : 'N/A';
        const compPct = idat.compression_percentage ? idat.compression_percentage + '%' : '';
        const compEntropy = idat.compressed_entropy !== undefined ? idat.compressed_entropy : 0;
        const decompEntropy = idat.decompressed_entropy !== undefined ? idat.decompressed_entropy : 0;
        const filtDist = idat.filter_distribution || {};

        html += `
          <div class="idat-highlight-box">
            <div class="idat-title-row">
              <div class="idat-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                PNG IDAT Stream & zlib Decompressor Analysis
              </div>
              <span class="inspector-badge">RFC 1950 / RFC 1951</span>
            </div>

            <div class="idat-metrics-row">
              <div class="idat-metric-item">
                <div class="idat-metric-num">${idat.idat_chunks_count || 0}</div>
                <div class="idat-metric-lbl">IDAT Blocks</div>
              </div>
              <div class="idat-metric-item">
                <div class="idat-metric-num">${formatBytes(idat.total_compressed_bytes || 0)}</div>
                <div class="idat-metric-lbl">Compressed Stream</div>
              </div>
              <div class="idat-metric-item">
                <div class="idat-metric-num">${formatBytes(idat.total_uncompressed_bytes || 0)}</div>
                <div class="idat-metric-lbl">Decompressed Raw</div>
              </div>
              <div class="idat-metric-item">
                <div class="idat-metric-num">${compRatio} <small style="font-size:11px; color:#94a3b8;">(${compPct})</small></div>
                <div class="idat-metric-lbl">zlib Compression</div>
              </div>
            </div>

            <!-- Shannon Entropy Gauge -->
            <div style="display:flex; flex-direction:column; gap:8px;">
              <div style="display:flex; justify-content:space-between; font-size:12px;">
                <span style="color:var(--text-secondary);">Shannon Entropy (0.0 - 8.0 bits/B):</span>
                <span style="font-family:var(--font-mono); color:#c7d2fe;">
                  Compressed: <strong>${compEntropy}</strong> | Decompressed: <strong>${decompEntropy}</strong>
                </span>
              </div>
              <div class="entropy-meter-bar">
                <div class="entropy-meter-fill" style="width: ${(compEntropy / 8) * 100}%;"></div>
              </div>
            </div>

            <!-- Scanline Filter Breakdown Table -->
            <div style="margin-top:4px;">
              <div style="font-size:12px; font-weight:600; color:#c7d2fe; margin-bottom:8px;">
                Scanline Filter Reversal Distribution (Row Filtering):
              </div>
              <div class="inspector-table-container">
                <table class="inspector-table">
                  <thead>
                    <tr>
                      <th>Filter Type</th>
                      <th>Algorithm</th>
                      <th>Scanline Rows</th>
                      <th>Usage %</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${Object.entries(filtDist).map(([fname, fstats]) => `
                      <tr>
                        <td><strong>${fname}</strong></td>
                        <td style="font-family:var(--font-mono); font-size:11px;">${fstats.description || 'Standard Filter'}</td>
                        <td style="font-family:var(--font-mono);">${fstats.count || 0}</td>
                        <td>
                          <div style="display:flex; align-items:center; gap:8px;">
                            <div style="width:60px; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                              <div style="height:100%; width:${fstats.percent || 0}%; background:#6366f1;"></div>
                            </div>
                            <span style="font-family:var(--font-mono);">${fstats.percent || 0}%</span>
                          </div>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `;
      }

      // Security / Anomaly Alerts
      if (anomalies.length > 0) {
        html += `
          <div class="anomaly-banner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <div>
              <strong>Security & Forensic Warnings (${anomalies.length}):</strong>
              <ul style="margin-top:4px; padding-left:16px;">
                ${anomalies.map(a => `<li>${a.description || a.type}</li>`).join('')}
              </ul>
            </div>
          </div>
        `;
      }

      // Chunk Map
      if (rep.chunks && rep.chunks.length > 0) {
        html += `
          <div>
            <div style="font-size:13px; font-weight:600; margin-bottom:8px;">Structural Chunk Hierarchy (First ${rep.chunks.length}):</div>
            <div class="inspector-table-container">
              <table class="inspector-table">
                <thead>
                  <tr>
                    <th>Chunk</th>
                    <th>Offset</th>
                    <th>Length</th>
                    <th>CRC32 Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${rep.chunks.map(c => {
                    const badgeClass = c.type === 'IDAT' ? 'idat' : (c.type === 'IHDR' ? 'ihdr' : (c.type === 'IEND' ? 'iend' : 'other'));
                    return `
                      <tr>
                        <td><span class="chunk-badge ${badgeClass}">${c.type}</span></td>
                        <td style="font-family:var(--font-mono);">0x${(c.offset || 0).toString(16).toUpperCase()}</td>
                        <td style="font-family:var(--font-mono);">${(c.length || 0).toLocaleString()} B</td>
                        <td style="color:${c.crc_valid ? '#10b981' : '#ef4444'};">
                          ${c.crc_valid ? '✓ Valid' : '✗ Invalid CRC'}
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
      }

      // Markdown Summary Box
      if (data.markdown) {
        html += `
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
              <span style="font-size:13px; font-weight:600;">Markdown Forensic Summary:</span>
              <button class="btn-image-action btn-copy-summary" data-summary="${encodeURIComponent(data.markdown)}">
                Copy Summary
              </button>
            </div>
            <div class="summary-codebox">${data.markdown}</div>
          </div>
        `;
      }

      elements.inspectorResults.innerHTML = html;
      elements.inspectorResults.style.display = 'flex';
      elements.inspectorResults.style.flexDirection = 'column';
      elements.inspectorResults.style.gap = '16px';

      // Attach copy summary event
      const copySumBtn = elements.inspectorResults.querySelector('.btn-copy-summary');
      if (copySumBtn) {
        copySumBtn.onclick = () => {
          const text = decodeURIComponent(copySumBtn.dataset.summary);
          navigator.clipboard.writeText(text).then(() => {
            copySumBtn.textContent = '✓ Copied';
            setTimeout(() => { copySumBtn.textContent = 'Copy Summary'; }, 2000);
          });
        };
      }

    } catch (err) {
      console.error('Forensic inspection error:', err);
      elements.inspectorResults.innerHTML = `
        <div class="anomaly-banner">
          <div>Error analyzing image: ${err.message}</div>
        </div>
      `;
      elements.inspectorResults.style.display = 'block';
    } finally {
      elements.inspectorLoading.style.display = 'none';
    }
  }

  // --------------------------------------------------------------------------
  // AI Image Generation Dispatcher
  // --------------------------------------------------------------------------
  async function sendImageGeneration(promptText) {
    if (!promptText || !promptText.trim()) return;
    if (state.isStreaming) return;

    const trimmedPrompt = promptText.trim();
    elements.promptInput.value = '';
    elements.promptInput.style.height = 'auto';

    if (!state.currentSessionId || !state.sessions[state.currentSessionId]) {
      createNewSession();
    }
    const currentSession = state.sessions[state.currentSessionId];

    if (currentSession.messages.length === 0) {
      currentSession.title = '🎨 ' + (trimmedPrompt.length > 28 ? trimmedPrompt.slice(0, 28) + '...' : trimmedPrompt);
      renderConversationList();
    }

    currentSession.messages.push({ role: 'user', content: trimmedPrompt, displayContent: trimmedPrompt });
    appendMessageToDOM('user', trimmedPrompt);
    saveSessions();
    scrollToBottom();

    // Show state & skeleton
    state.isStreaming = true;
    elements.btnSend.style.display = 'none';
    elements.btnStop.style.display = 'flex';
    elements.typingIndicator.style.display = 'inline-flex';

    const { body: assistantBody } = appendMessageToDOM('assistant', '', [], true);

    const activeModelName = MODEL_METADATA[state.activeModel]?.name || 'Imagen 3';
    assistantBody.innerHTML = `
      <div class="generating-image-skeleton">
        <div class="spinner"></div>
        <div>Synthesizing high-resolution imagery via ${activeModelName}...</div>
        <div style="font-size:11px; color:var(--text-muted);">Aspect Ratio: ${state.imageConfig.ratio} &bull; Style: ${state.imageConfig.style}</div>
      </div>
    `;
    scrollToBottom();

    try {
      const response = await fetch(`${API_BASE}/v1/images/generations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: trimmedPrompt,
          model: state.activeModel,
          style: state.imageConfig.style,
          size: mapRatioToSize(state.imageConfig.ratio),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Generation failed (${response.status}): ${errorText}`);
      }

      const resData = await response.json();
      const imgDataList = resData.data || [];
      if (imgDataList.length === 0 || !imgDataList[0].url) {
        throw new Error('No image URL returned by upstream generator.');
      }

      const imageUrl = imgDataList[0].url;
      assistantBody.innerHTML = renderGeneratedImageCard(imageUrl, trimmedPrompt);

      currentSession.messages.push({
        role: 'assistant',
        content: `![Generated Image](${imageUrl})`,
      });
      saveSessions();

    } catch (err) {
      console.error('Image generation error:', err);
      assistantBody.innerHTML = `<span style="color:var(--status-error);">⚠ Image Generation Error: ${err.message}</span>`;
    } finally {
      state.isStreaming = false;
      elements.btnSend.style.display = 'flex';
      elements.btnStop.style.display = 'none';
      elements.typingIndicator.style.display = 'none';
      refreshPoolStatus();
      scrollToBottom();
    }
  }

  // --------------------------------------------------------------------------
  // Real-Time Chat Completion (SSE Streaming)
  // --------------------------------------------------------------------------
  async function sendMessage(promptText) {
    if (!promptText || !promptText.trim()) return;
    if (state.isStreaming) return;

    const trimmedPrompt = promptText.trim();

    // Check if Image Generation Mode is active
    if (state.modes.image || ['imagen-3', 'dall-e-3', 'flux-1-schnell'].includes(state.activeModel)) {
      sendImageGeneration(trimmedPrompt);
      return;
    }

    elements.promptInput.value = '';
    elements.promptInput.style.height = 'auto';

    // Ensure active session
    if (!state.currentSessionId || !state.sessions[state.currentSessionId]) {
      createNewSession();
    }
    const currentSession = state.sessions[state.currentSessionId];

    // Check if attachments are staged
    let effectiveUserPrompt = trimmedPrompt;
    const currentAttachments = [...state.stagedAttachments];
    if (currentAttachments && currentAttachments.length > 0) {
      const fileBlocks = currentAttachments.map(att => {
        if (att.isImage) {
          const analysisSnippet = att.analysisMarkdown ? att.analysisMarkdown : `[Attached Image: ${att.name} (${formatBytes(att.size)})]`;
          return `### Attached Image: ${att.name} (${formatBytes(att.size)})\n${analysisSnippet}`;
        }
        const ext = att.name.split('.').pop() || 'text';
        return `### File: ${att.name} (${formatBytes(att.size)})\n\`\`\`${ext}\n${att.content}\n\`\`\``;
      });
      effectiveUserPrompt = `## Codebase & File Attachments (${currentAttachments.length} items):\n\n` +
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
    currentSession.messages.push({
      role: 'user',
      content: effectiveUserPrompt,
      displayContent: trimmedPrompt,
      attachments: currentAttachments,
    });
    appendMessageToDOM('user', trimmedPrompt, [], false, currentAttachments);
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

    // Map conversation messages into API payload (supporting OpenAI Vision schema)
    const apiMessages = currentSession.messages.map((m) => {
      if (m.role === 'user' && m.attachments && m.attachments.some(a => a.isImage && a.dataUrl)) {
        const parts = [{ type: 'text', text: m.content }];
        m.attachments.filter(a => a.isImage && a.dataUrl).forEach(a => {
          parts.push({
            type: 'image_url',
            image_url: {
              url: a.dataUrl,
              filename: a.name,
            },
          });
        });
        return { role: m.role, content: parts };
      }
      return { role: m.role, content: m.content };
    });

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
      const response = await fetch(`${API_BASE}/v1/status`, {
        headers: { 'Accept': 'application/json' },
      });
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

    // Image Gen Mode Toggle
    if (elements.pillImage) {
      elements.pillImage.addEventListener('click', () => {
        state.modes.image = !state.modes.image;
        elements.pillImage.classList.toggle('active', state.modes.image);
        if (elements.imageControlsBar) {
          elements.imageControlsBar.style.display = state.modes.image ? 'flex' : 'none';
        }
        if (state.modes.image) {
          elements.promptInput.placeholder = 'Describe the image you want to synthesize (e.g. Cyberpunk neon skyline, 8k octane render)...';
        } else {
          elements.promptInput.placeholder = 'Message FreeAI (Attach files, Shift+Enter for newline, Enter to send)...';
        }
      });
    }

    if (elements.imageStyleSelect) {
      elements.imageStyleSelect.addEventListener('change', (e) => {
        state.imageConfig.style = e.target.value;
      });
    }

    if (elements.imageRatioSelect) {
      elements.imageRatioSelect.addEventListener('change', (e) => {
        state.imageConfig.ratio = e.target.value;
      });
    }

    // Clipboard Paste Listener for Images (Screenshots, Copied Pixels)
    elements.promptInput.addEventListener('paste', (e) => {
      const items = (e.clipboardData || e.originalEvent.clipboardData).items;
      const filesToHandle = [];
      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            const ext = item.type.split('/')[1] || 'png';
            const file = new File([blob], `screenshot_${Date.now()}.${ext}`, { type: item.type });
            filesToHandle.push(file);
          }
        }
      }
      if (filesToHandle.length > 0) {
        handleFileSelection(filesToHandle);
      }
    });

    // Lightbox Modal Bindings
    if (elements.lightboxCloseBtn) {
      elements.lightboxCloseBtn.addEventListener('click', closeLightbox);
    }
    if (elements.lightboxModal) {
      elements.lightboxModal.addEventListener('click', (e) => {
        if (e.target === elements.lightboxModal) closeLightbox();
      });
    }
    if (elements.lightboxInspectBtn) {
      elements.lightboxInspectBtn.addEventListener('click', () => {
        const url = elements.lightboxInspectBtn.dataset.imgUrl;
        closeLightbox();
        openInspector({ url });
      });
    }

    // Forensic Inspector Modal Bindings
    if (elements.btnOpenInspector) {
      elements.btnOpenInspector.addEventListener('click', () => openInspector());
    }
    if (elements.inspectorCloseBtn) {
      elements.inspectorCloseBtn.addEventListener('click', closeInspector);
    }
    if (elements.inspectorModal) {
      elements.inspectorModal.addEventListener('click', (e) => {
        if (e.target === elements.inspectorModal) closeInspector();
      });
    }

    // Inspector Dropzone & File Browse
    if (elements.inspectorDropzone && elements.inspectorFileInput) {
      elements.inspectorDropzone.addEventListener('click', (e) => {
        if (!e.target.classList.contains('file-link')) {
          elements.inspectorFileInput.click();
        }
      });

      const fileLink = elements.inspectorDropzone.querySelector('.file-link');
      if (fileLink) {
        fileLink.addEventListener('click', (e) => {
          e.stopPropagation();
          elements.inspectorFileInput.click();
        });
      }

      ['dragenter', 'dragover'].forEach(eventName => {
        elements.inspectorDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          elements.inspectorDropzone.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        elements.inspectorDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          elements.inspectorDropzone.classList.remove('dragover');
        });
      });

      elements.inspectorDropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          const file = dt.files[0];
          const reader = new FileReader();
          reader.onload = (ev) => {
            const b64 = ev.target.result.split(',')[1] || ev.target.result;
            runForensicInspection({ b64_json: b64, filename: file.name });
          };
          reader.readAsDataURL(file);
        }
      });

      elements.inspectorFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = (ev) => {
            const b64 = ev.target.result.split(',')[1] || ev.target.result;
            runForensicInspection({ b64_json: b64, filename: file.name });
          };
          reader.readAsDataURL(file);
          elements.inspectorFileInput.value = '';
        }
      });
    }

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
        if (card.dataset.image) {
          state.modes.image = true;
          if (elements.pillImage) elements.pillImage.classList.add('active');
          if (elements.imageControlsBar) elements.imageControlsBar.style.display = 'flex';
          elements.promptInput.placeholder = 'Describe the image you want to synthesize (e.g. Cyberpunk neon skyline, 8k octane render)...';
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
      if (e.key === 'Escape') {
        if (elements.lightboxModal && elements.lightboxModal.style.display === 'flex') {
          closeLightbox();
        } else if (elements.inspectorModal && elements.inspectorModal.style.display === 'flex') {
          closeInspector();
        } else if (state.isStreaming) {
          stopStreaming();
        }
      }
    });

    // Global Click Delegation for Images, Lightbox, and Inspector
    document.addEventListener('click', (e) => {
      // Lightbox click on image
      const imgEl = e.target.closest('.generated-image-img');
      if (imgEl) {
        openLightbox(imgEl.src);
        return;
      }

      // Inspect image button
      const inspectBtn = e.target.closest('.btn-inspect-image');
      if (inspectBtn) {
        const url = inspectBtn.dataset.imgUrl;
        if (url) {
          openInspector({ url });
        }
        return;
      }

      // Copy Code Delegation
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
