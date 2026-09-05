/**
 * Source: https://use.ai/_next/static/chunks/download-chat-button.service-CctxGjXF.js
 * Module: download-chat-button.service
 * Extracted & Beautified
 */

const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["_next/static/chunks/marked.esm-BIum_moM.js",
  "_next/static/chunks/rolldown-runtime-C0FnF6B9.js", "_next/static/chunks/react-dom-server-woWt0y2j.js",
  "_next/static/chunks/framework-D-uKrMmN.js", "_next/static/chunks/sanitize-html.util-BCWuoeSx.js",
  "_next/static/chunks/purify.es-DTy1PD66.js", "_next/static/chunks/html2pdf-64f5Xxph.js"
]))) => i.map(i => d[i]);
import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { $ as n, Q as r, nt as i, rt as a } from "./vinext-CqpRraGS.js";
import { n as o } from "./QueryClientProvider-DGxN9XtP.js";
import { o as s } from "./rest-api-DNPFxXXP.js";
import { n as c } from "./react-client-DI5BViDH.js";
import { t as l } from "./project-key.constant-DL2-hOys.js";
import { n as u } from "./better-auth-client-session.service-ercwbZKT.js";
import { n as d } from "./worker-auth.service-BtTnG2J5.js";
import { N as f, T as p, k as m, t as h } from "./analytics.service-BIbiLKmC.js";
import { a as g } from "./mixpanel-CkBALibP.js";
import { t as _ } from "./teams-D-JmxjA5.js";
import { t as v } from "./chat-key.constant-DXJEa87X.js";
import { t as y } from "./show-toast.service-DZQBgdNF.js";
import { b } from "./chat.store-CVJElyGt.js";
import { t as x } from "./global.store-DsM3x4UJ.js";
import { t as S } from "./share-chat-invite.api-kdUDCneo.js";
import { t as C } from "./deep-research-chats.model-Bm4CwR0q.js";
import { t as w } from "./use-stream-active.hook-CJjUFxyg.js";
import { t as T } from "./review-trigger.store-C2KfqDZw.js";
import { t as E } from "./copy-formatted.util-CTbr3TnW.js";
import { r as D, t as O } from "./first-party-url.util-CX2n5k9d.js";
import { t as k } from "./image-compression.util-dcofMV1t.js";
import { t as A } from "./logo-icon-C5Mo55YO.js";

function j() { if (typeof document > `u`) return null; let e = document.cookie.match(
  /guest_user_id=([^;]+)/); return e ? `guest:${decodeURIComponent(e[1])}` : null }
var M = () => { let e = o(),
    t = c(`Chat`),
    { showToast: n } = y(),
    { data: r } = u(),
    i = r?.user?.id; return { deleteChat: async (r, a) => { if (!r) return; let { onDeleteNavigateTo: o } = a || {};
      e.setQueryData([v.CHAT_HISTORY_QUERY, i], e => e?.pages ? { ...e, pages: e.pages.map(e => ({ ...e, chats: e
            .chats?.filter(e => e.id !== r) || [] })) } : e), e.setQueryData([l.PROJECTS_QUERY, i], e => e
        ?.projects ? { ...e, projects: e.projects.map(e => ({ ...e, chats: e.chats?.filter(e => e.id !== r) ||
            [] })) } : e), e.setQueryData([v.SHARED_CHATS_QUERY, i], e => e?.chats ? { ...e, chats: e.chats
          .filter(e => e.id !== r) } : e), e.setQueriesData({ queryKey: [C.DEEP_RESEARCH_CHATS_QUERY] }, e => e
        ?.pages ? { ...e, pages: e.pages.map(e => ({ ...e, chats: e.chats?.filter(e => e.id !== r) || [] })) } : e
        ), o?.(); try { let e = await d(),
          t = new URLSearchParams({ id: r }); if (!e.Authorization) { let e = j();
          e && t.set(`userId`, e) } if (!(await s.delete(`chat?${t.toString()}`, { headers: { ...e } })).ok)
        throw Error(`Failed to delete chat`); try { await S(r) } catch {} h.track(g.CHAT_DELETED, { chat_id: r,
          chat_type: `private` }) } catch { e.invalidateQueries({ queryKey: [v.CHAT_HISTORY_QUERY] }), e
          .invalidateQueries({ queryKey: [v.SHARED_CHATS_QUERY] }), e.invalidateQueries({ queryKey: [l
              .PROJECTS_QUERY, i
            ] }), e.invalidateQueries({ queryKey: [C.DEEP_RESEARCH_CHATS_QUERY] }), n({ description: t(
              `chat_delete_error`), variant: `error` }) } } } };

function N(e) { return e.some(e => e.author !== void 0) }

function P(e, t) { let { embedImages: n, userLabel: r, assistantLabel: i, teamMembers: a, getImageBytes: o } = t, s = N(
    e); return e.filter(e => e.role === `user` || e.role === `assistant`).map(e => { let t = e.parts ?? [],
      c = t.filter(e => e.type === `text`).map(e => e.text); for (let e of t)
      if (e.type === `tool-deepResearch` && e.state === `output-available`) { let t = e.output;
        (t?.format === `report` || t?.format === `parallel-report`) && t.content ? (t.title && c.push(
          `# ${t.title}`), c.push(t.content)) : t?.format === `clarifying_questions` && t.answer && c.push(t
          .answer) } let l = c.join(`

`).trim(),
      u = []; if (e.role === `user`)
      for (let e of t) { if (e.type !== `file`) continue; let t = e.filename || ``; if (e.isPastedText) u.push(
          `[Pasted text${t?`: ${t}`:``}]`);
        else if (e.mediaType?.startsWith(`image/`)) { let r = e.url;
          u.push(n && s && r ? `![${t||`Image`}](${r})` : `[Image${t?`: ${t}`:``}]`) } else u.push(
          `[File${t?`: ${t}`:``}]`) } else
        for (let e of t)
          if (e.type === `tool-image-google` || e.type === `tool-image-upscale`) { if (n)(e.output?.images ?? [])
              .forEach((t, n) => { let r = t.mimeType || `image/png`,
                  i = t.base64 ?? o?.(e.toolCallId, n);
                t.url ? u.push(`![Generated image](${t.url})`) : i ? u.push(
                  `![Generated image](data:${r};base64,${i})`) : u.push(`[Generated image]`) });
            else { let t = e.output?.images?.length ?? 0;
              u.push(t > 1 ? `[${t} generated images]` : `[Generated image]`) } } else if (e.type ===
      `tool-CREATE_IMAGE`) { let t = typeof e.output == `string` && e.output.startsWith(`http`) ? e.output : void 0;
      u.push(n && t ? `![Generated image](${t})` : `[Generated image]`) } else !n && e.type ===
      `tool-background-removal` && u.push(`[Background removal result]`); let d; if (e.role === `user`) { let t =
        null; if (s) { let n = e.author?.id ?? e.metadata?.userId,
          r = n ? a.find(e => e.userId === n) : void 0;
        t = e.author?.name || e.metadata?.senderName || r?.name || r?.email?.split(`@`)[0] || null } d = s && t ?
        `**${t}:**` : `**${r}:**` } else d = `**${i}:**`; let f = [];
    e.role === `user` ? (u.length > 0 && f.push(u.join(` `)), l && f.push(l)) : (l && f.push(l), u.length > 0 && f
      .push(u.join(` `))); let p = f.join(`

`); return p ? `${d} ${p}` : null }).filter(Boolean).join(`

`) }
var F = e => { let t = x(e => e.currentChatId),
      i = x(e => e.currentMessages),
      a = x(e => e.isImageCreationHeroVisible),
      o = x(e => e.isBackgroundRemovalHeroVisible),
      { isActiveStable: s } = w(),
      { data: l } = _(),
      d = l?.members ?? [],
      v = r(),
      b = n(),
      { data: S } = u(),
      { showToast: C } = y(),
      D = c(`Chat`),
      O = !!(S?.user?.id && S?.user?.type !== `guest`),
      k = v.chatId || v.id || t,
      A = !!b?.includes(`/image-enhancer`),
      j = a || o || A || !!k && f(k) || !!k && p(k) || !!k && m(k),
      M = N(i); return { chatId: k, shouldShow: O && !!k && i.length > 0 && !j, isDisabled: !1,
    handleCopyChat: async () => { if (s && M) { C({ description: D(`toast_streaming_wait`),
            variant: `error` }); return } if (i.length === 0) { C({ title: D(`toast_title_no_text_to_copy`),
              description: D(`toast_description_no_text_to_copy`), variant: `error` }); return } if (!M && !i.filter(
              e => e.role === `assistant`).some(e => { let t = e.parts ?? []; return t.some(e => e.type === `text` && !!
                e.text?.trim()) ? !0 : t.some(e => e.type === `tool-deepResearch` && e.state ===
                `output-available` && (e.output?.content || e.output?.answer)) })) { C({ title: D(
                `toast_title_no_text_to_copy`), description: D(`toast_description_no_text_to_copy`),
              variant: `error` }); return } let t = P(i, { embedImages: !1, userLabel: D(`chat_export_user_label`),
            assistantLabel: D(`chat_export_assistant_label`), teamMembers: d }); if (!t.trim()) { C({ title: D(
                `toast_title_no_text_to_copy`), description: D(`toast_description_no_text_to_copy`),
              variant: `error` }); return } await E(t) && (h.track(g.COPY_CHAT_CLICKED, { chat_id: k ?? ``,
            message_count: i.length, source: e }), T.getState().scheduleReviewModalTrigger(7e3, `copy-chat`),
        C({ description: D(`toast_chat_copied_to_clipboard`), variant: `simple` })) } } },
  I = { maxDimension: 1024, maxFileSize: 1048576, initialQuality: .85 },
  L = e => new Promise((t, n) => { let r = new FileReader;
    r.onloadend = () => t(r.result), r.onerror = n, r.readAsDataURL(e) }),
  R = async e => { let t = /!\[([^\]]*)\]\(([^)]+)\)/g,
      n = Array.from(new Set(Array.from(e.matchAll(t), e => e[2]))); if (n.length === 0) return e; let r =
    new Map; return await Promise.all(n.map(async e => { try { if (e.startsWith(`data:`)) { r.set(e, e); return } if (
          !O(e)) return; let t = await fetch(D(e)); if (!t.ok) return; let n = await t.blob(); if (!n.type
          .startsWith(`image/`)) return; let i = new File([n], `chat-image`, { type: n.type }),
          { file: a } = await k(i, I),
          o = await L(a);
        r.set(e, o) } catch {} })), e.replace(t, (e, t, n) => { let i = r.get(n); return i ? `![${t}](${i})` :
        `[Image${t?`: ${t}`:``}]` }) }, z = e(t(), 1);
a();
var B = e => e.replace(/&/g, `&amp;`).replace(/</g, `&lt;`).replace(/>/g, `&gt;`),
  V = (e, t, n, r, i) => { let a = r(n.parse(e, { async: !1 })); return `<div id="chat-pdf-root" style="
    font-family: Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif;
    max-width: 760px;
    margin: 0 auto;
    padding: 0 4px;
    line-height: 1.6;
    direction: ltr;
    color: #333;
    background: #fff;
  ">
    <style>
      #chat-pdf-root h1, #chat-pdf-root h2, #chat-pdf-root h3, #chat-pdf-root h4,
      #chat-pdf-root p, #chat-pdf-root li, #chat-pdf-root blockquote,
      #chat-pdf-root th, #chat-pdf-root td {
        unicode-bidi: plaintext;
        text-align: start;
      }
      #chat-pdf-root h1, #chat-pdf-root h2, #chat-pdf-root h3, #chat-pdf-root h4 {
        color: #2c3e50;
        margin-top: 24px;
      }
      #chat-pdf-root h1 { border-bottom: 3px solid #3498db; padding-bottom: 12px; font-size: 1.8em; }
      #chat-pdf-root h2 { border-bottom: 1px solid #bdc3c7; padding-bottom: 8px; font-size: 1.5em; }
      #chat-pdf-root h3 { font-size: 1.25em; }
      #chat-pdf-root p { margin-bottom: 12px; }
      #chat-pdf-root ul, #chat-pdf-root ol { margin-left: 20px; margin-bottom: 12px; }
      #chat-pdf-root li { margin-bottom: 6px; }
      #chat-pdf-root blockquote {
        border-left: 4px solid #3498db;
        margin: 16px 0;
        background-color: #f8f9fa;
        padding: 12px 16px;
        font-style: italic;
      }
      #chat-pdf-root strong, #chat-pdf-root b { font-weight: 700; color: #2c3e50; }
      #chat-pdf-root em { color: #7f8c8d; }
      #chat-pdf-root a { color: #3498db; text-decoration: none; word-break: break-word; }
      #chat-pdf-root table {
        border-collapse: collapse;
        width: 100%;
        margin: 16px 0;
        border: 1px solid #bdc3c7;
      }
      #chat-pdf-root th, #chat-pdf-root td {
        border: 1px solid #bdc3c7;
        padding: 8px 10px;
        text-align: left;
        font-size: 0.95em;
      }
      #chat-pdf-root th { background-color: #ecf0f1; font-weight: bold; color: #2c3e50; }
      #chat-pdf-root code {
        background-color: #f4f4f4;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
      }
      #chat-pdf-root pre {
        background-color: #f4f4f4;
        padding: 12px;
        border-radius: 5px;
        overflow-x: auto;
        font-family: 'Courier New', monospace;
        white-space: pre-wrap;
        word-break: break-word;
      }
      #chat-pdf-root img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 12px 0;
        border-radius: 8px;
      }
      #chat-pdf-root hr { border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0; }
    </style>
    <div style="position:relative;height:44px;margin-bottom:20px;padding-bottom:16p;">
      <span style="position:absolute;top:8px;left:0;line-height:0;">${i}</span>
      <span style="position:absolute;top:-4px;left:36px;font-size:26px;font-weight:500;color:#333;line-height:1;">use.ai</span>
    </div>
    ${t?`<h1 style="margin-top:0">${B(t)}</h1>`:``}
    ${a}
    <div style="margin-top:40px;padding-top:12px;padding-bottom:24px;border-top:1px solid #e0e0e0;text-align:center;color:#aaa;font-size:10px;letter-spacing:0.02em;">Generated by use.ai</div>
  </div>` },
  H = e => new Promise(t => { let n = Array.from(e.querySelectorAll(`img`)); if (n.length === 0) { t(); return } let r =
      n.length,
      i = () => {--r, r <= 0 && t() }; for (let e of n) e.complete ? i() : (e.addEventListener(`load`, i, { once: !
        0 }), e.addEventListener(`error`, i, { once: !0 }));
    setTimeout(t, 1e4) }),
  U = () => { let [t, n] = (0, z.useState)(!1), { showToast: r } = y(), a = c(`Chat`); return { isDownloading: t,
      downloadChatAsPdf: (0, z.useCallback)(async (o, s, c, l, u) => { if (t) return;
        n(!0), h.track(g.FILE_DOWNLOAD_STARTED, { file_type: `pdf`, source: `chat_export`, message_id: u,
          chat_id: l, report_title: s, user_id: h.getAnalyticsProperty().user_id || null }); let d, f =
        `prepare`; try { let [{ marked: t }, { renderToStaticMarkup: n }, { sanitizeUntrustedHtml: r }] =
          await Promise.all([i(() => import(`./marked.esm-BIum_moM.js`).then(e => e.n), __vite__mapDeps([0, 1])),
            i(() => import(`./react-dom-server-woWt0y2j.js`).then(t => e(t.t(), 1)), __vite__mapDeps([2, 1,
              3])), i(() => import(`./sanitize-html.util-BCWuoeSx.js`).then(e => e.n), __vite__mapDeps([4, 1,
              5
            ]))
          ]), a = n((0, z.createElement)(A, { width: 28, height: 28 }));
          d = document.createElement(`div`), d.style.position = `fixed`, d.style.left = `-10000px`, d.style.top =
            `0`, d.style.width = `800px`, d.innerHTML = V(o, s, t, r, a), document.body.appendChild(d), await H(
            d); let p = (await i(() => import(`./html2pdf-64f5Xxph.js`).then(t => e(t.default, 1)),
            __vite__mapDeps([6, 1]))).default;
          f = `render`, await p().from(d.firstElementChild).set({ margin: [12, 10, 12, 10], filename: c,
            image: { type: `jpeg`, quality: .95 }, html2canvas: { scale: 2, useCORS: !0, logging: !1,
              backgroundColor: `#ffffff` }, jsPDF: { unit: `mm`, format: `a4`, orientation: `portrait` },
            pagebreak: { mode: [`avoid-all`, `css`, `legacy`] } }).save(), h.track(g
          .FILE_DOWNLOAD_SUCCESS, { file_type: `pdf`, source: `chat_export`, message_id: u, chat_id: l,
            report_title: s, user_id: h.getAnalyticsProperty().user_id || null }) } catch (e) { console.error(
            `[chat-download] PDF export failed during ${f}:`, e), h.track(g
          .FILE_DOWNLOAD_FAILED, { file_type: `pdf`, source: `chat_export`, message_id: u, chat_id: l,
            report_title: s, user_id: h.getAnalyticsProperty().user_id || null, error_phase: f,
            error_message: e instanceof Error ? e.message : `Unknown error` }), r({ title: a(
              `pdf_export_failed`), description: a(f === `prepare` ? `pdf_export_failed_start` :
              `pdf_export_failed_description`), variant: `error` }) } finally { d?.parentNode && d.parentNode
            .removeChild(d), n(!1) } }, [t, r, a]) } },
  W = () => { let e = x(e => e.currentChatId),
      t = x(e => e.currentMessages),
      i = r(),
      a = i.chatId || i.id || e,
      s = t[t.length - 1]?.id,
      d = s ? `chat-export-${s}` : a ? `chat-export-${a}` : void 0,
      { downloadChatAsPdf: S, isDownloading: C } = U(),
      { data: T } = _(),
      E = T?.members ?? [],
      D = x(e => e.isImageCreationHeroVisible),
      O = x(e => e.isBackgroundRemovalHeroVisible),
      { isActive: k } = w(),
      A = n(),
      { data: j } = u(),
      { showToast: M } = y(),
      F = c(`Chat`),
      I = o(),
      L = j?.user?.id,
      z = !!(L && j?.user?.type !== `guest`),
      B = !!A?.includes(`/image-enhancer`),
      V = D || O || B || !!a && f(a) || !!a && p(a) || !!a && m(a),
      H = N(t); return { chatId: a, shouldShow: z && !!a && t.length > 0 && !V, isDisabled: !1,
      handleDownloadPdf: async () => { if (!a || !d) return; if (k && H) { M({ description: F(`toast_streaming_wait`),
              variant: `error` }); return } if (t.length === 0) { M({ title: F(`toast_title_no_content_to_download`),
              description: F(`toast_description_no_content_to_download`), variant: `error` }); return } if (!H && !t
            .filter(e => e.role === `assistant`).some(e => { let t = e.parts ?? []; return t.some(e => e.type ===
                `text` && !!e.text?.trim()) ? !0 : t.some(e => e.type === `tool-deepResearch` && e.state ===
                `output-available` && (e.output?.content || e.output?.answer) || e.type === `tool-image-google` || e
                .type === `tool-background-removal`) })) { M({ title: F(`toast_title_no_content_to_download`),
              description: F(`toast_description_no_content_to_download`), variant: `error` }); return } let e = P(
          t, { embedImages: !0, userLabel: F(`chat_export_user_label`), assistantLabel: F(
              `chat_export_assistant_label`), teamMembers: E, getImageBytes: (e, t) => a ? b(a, e, t) : void 0 }); if (!
            e.trim()) { M({ title: F(`toast_title_no_content_to_download`), description: F(
                `toast_description_no_content_to_download`), variant: `error` }); return } let n = await R(e),
            r = t[t.length - 1]?.id,
            i = r ? `chat-export-${r}` : `chat-export-${a}`;
          h.track(g.PDF_DOWNLOAD_CLICKED, { message_id: i, chat_id: a, user_id: h.getAnalyticsProperty().user_id ||
              null, source: `chat_export` }); let o = I.getQueryData([v.CHAT_HISTORY_QUERY, L])?.pages?.flatMap(e => e
            .chats || []).find(e => e.id === a)?.title?.trim() ?? ``;
          o ||= I.getQueryData([l.PROJECTS_QUERY, L])?.projects?.flatMap(e => e.chats || []).find(e => e.id === a)
            ?.title?.trim() ?? ``; let s = o || F(`pdf_default_title`),
            c = `${(e=>e.replace(/[/\\:*?"<>|]+/g,`_`).replace(/\s+/g,` `).trim().slice(0,100))(s)||`chat`}.pdf`;
          await S(n, s, c, a, i) }, isDownloading: C } };
export { F as n, M as r, W as t };
