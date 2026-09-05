/**
 * Source: https://use.ai/_next/static/chunks/chat.store-CVJElyGt.js
 * Module: chat.store
 * Extracted & Beautified
 */

import { n as e } from "./env-C6AULCj5.js";
import { m as t } from "./freemium-funnel.util-D0KPcbFz.js";
import { t as n } from "./safe-session-storage.util-DN4NSHVM.js";
import { t as r } from "./react-D8-vnz5K.js";
import { n as i, r as a } from "./middleware-BT98JsiD.js";
import { t as o } from "./js.cookie-LuQ0sRX_.js";
import { t as s } from "./cookie.interface-BM92z_O9.js";
import { t as c } from "./logout-teardown.service-BVsq4fds.js";
import { a as l } from "./retry-chat-bridge.service-UVZ4pRxm.js";
import { r as u } from "./post-payment.store-jgy38Ijx.js";

function d(e) { let t = e; return t[t.length - 1]?.role === `assistant` ? t : [...t,
  { id: `assistant-${Date.now()}-${Math.random().toString(36).slice(2,8)}`, role: `assistant`, parts: [] }] }

function f(e, t) { if (!t) return -1; for (let n = e.length - 1; n >= 0; --n) { let r = e[n]; if (r.role ===
      `assistant` && r.id === t) return n } return -1 }

function p(e, t, n) { let r = f(e, n); if (r !== -1) { let n = e,
      i = n[r],
      a = t(i); if (a === i) return e; let o = n.slice(); return o[r] = a, o } let i = d(e),
    a = i.length - 1,
    o = i[a],
    s = t(o); if (s === o) return i === e ? e : i; let c = i.slice(); return c[a] = s, c }

function m(e, t, n) { return p(e, e => t.id && e.parts.some(e => e.type === t.type && e.id === t.id) ? e : { ...e,
    parts: [...e.parts, t] }, n) }

function h(e, t, n) { for (let [r, i] of e.streamMessageIds)
    if (i === n && r !== t) return !0; return !1 }

function g(e, t, n) { return p(e, e => e.parts.some(e => e.type === `error`) ? e : { ...e, parts: [...e.parts,
    { type: `error`, errorText: t.errorText }] }, n) }

function _(e, t, n) { return v(e, t, `text`, (e, t) => ({ ...e, text: (e.text ?? ``) + t }), n) }

function v(e, t, n, r, i) { let a = typeof t.offset == `number` ? t.offset : void 0,
    o = f(e, i),
    s = o === -1 ? e[e.length - 1] : e[o],
    c = s?.role === `assistant` ? s.parts : [],
    l = -1,
    u = !1; for (let e = c.length - 1; e >= 0; --e) { let r = c[e]; if ((typeof r?.type == `string` ? r.type : ``)
      .startsWith(`tool-`)) { u = !0; break } if (r?.type === n && r?.id === t.id) { l = e; break } } if (l === -
    1) { if (!u && a !== void 0 && a > 0) return e; if (u && a !== void 0) { let n = c.find(e => e?.type === `text` && e
        ?.id === t.id); if (n && a < (n.text?.length ?? 0) + (n._offsetBase ?? 0)) return e } let n = { type: `text`,
      id: t.id, text: t.delta }; return u && a !== void 0 && a > 0 && (n._offsetBase = a), p(e, e => ({ ...e, parts: [
        ...e.parts, n
      ] }), i) } if (a !== void 0) { let t = c[l],
      n = t.text ?? ``,
      r = a - (t._offsetBase ?? 0); if (r < n.length || r > n.length) return e } return p(e, e => { let n = e.parts
      .slice(); return n[l] = r(n[l], t.delta), { ...e, parts: n } }, i) }

function y(e, t, n) { return p(e, e => e.parts.some(e => e.type === `source-url` && e.url === t.url) ? e : { ...e,
    parts: [...e.parts, { type: `source-url`, sourceId: t.sourceId, url: t.url, title: t.title }] }, n) }

function b(e, t, n) { return p(e, e => e.parts.some(e => e.type === `source-document` && e.sourceId === t.sourceId) ?
    e : { ...e, parts: [...e.parts, { type: `source-document`, sourceId: t.sourceId, mediaType: t.mediaType, title: t
          .title, filename: t.filename }] }, n) }

function x(e, t, n) { return p(e, e => e.parts.some(e => e.type === `file` && e.url === t.url) ? e : { ...e, parts: [...
      e.parts, { type: `file`, url: t.url, mediaType: t.mediaType }
    ] }, n) }

function ee(e, t, n) { let r = t.messageMetadata; return !r || typeof r != `object` ? e : p(e, e => { let t = e
    .metadata; if (t) { let n = !0; for (let e of Object.keys(r))
        if (t[e] !== r[e]) { n = !1; break } if (n) return e } return { ...e, metadata: { ...e.metadata ?? {}, ...
        r } } }, n) }

function te(e, t, n) { return p(e, e => { let n = e.parts.slice(); if (t.id) { let r = n.findIndex(e => e.id === t.id &&
        e.type === t.type); if (r !== -1) return n[r] = { ...n[r], data: t.data }, { ...e, parts: n } } return n
      .push({ type: t.type, id: t.id, data: t.data }), { ...e, parts: n } }, n) }
var S = new Set([`tool-image-google`, `tool-background-removal`, `tool-image-upscale`]),
  ne = new Set([`image-google`, `background-removal`, `image-upscale`]);

function C(e) { return typeof e == `string` && ne.has(e) }

function re(e) { return e === `background-removal` ? `tool-background-removal` : e === `image-upscale` ?
    `tool-image-upscale` : `tool-image-google` }

function ie(e, t) { let n = e?.output?.images; if (!Array.isArray(n) || n.length === 0) return e; let r = t.imageBytes
    .get(e.toolCallId),
    i = !1,
    a = n.map((n, a) => { if (!n || typeof n.base64 != `string` || n.base64.length === 0) return n;
        r || (r = [], t.imageBytes.set(e.toolCallId, r)), r[a] = n.base64, i = !0; let { base64: o, ...s } = n
      ; return s }); return i ? { ...e, output: { ...e.output, images: a } } : e }

function ae(e) { let t = oe(e.output); if (!t || typeof t != `object`) return !1; let n = t.images; return Array
    .isArray(n) && n.filter(Boolean).length === 0 || !n && !!t.error }

function oe(e) { if (e && typeof e == `object`) return e; if (typeof e == `string`) { let t = e.trim(); if (t
      .startsWith(`{`)) try { return JSON.parse(t) } catch { return } } }
var se = `Tool execution stopped by user before completion.`,
  ce = `Stream ended before tool completed`,
  le = new Set([`tool-deepResearch`]);

function ue(e, t) { let n = !1; return { parts: e.flatMap(e => { if (!(typeof e?.type == `string` && e.type.startsWith(
          `tool-`) && e.toolCallId) || le.has(e.type)) return [e]; let r = e.state === `input-streaming` || e
        .state === `input-available`,
        i = e.state === `approval-requested`,
        a = e.state === `approval-responded` && e.approval?.approved === !0 && e.output === void 0; if (!r && !i &&
        !a) return [e]; if (n = !0, i || a) return []; let o = S.has(e.type) || e.toolName ===
      `CREATE_IMAGE`; return e.state === `input-streaming` && !o ? [] : [{ ...e, state: `output-error`, errorText: e
          .errorText ?? t }] }), mutated: n } }
var de = /^r\d+\.[0-9a-f]{8}:/;

function fe(e) { return e.some(e => typeof e?.id == `string` && de.test(e.id)) }

function pe(e, t = {}) { let { turnWasRecovered: n = !1 } = t, r = !1; return { parts: e.filter(e => !(typeof e?.type ==
      `string` && e.type.startsWith(`tool-`) && e.toolCallId) || !(e.state === `input-streaming` || n && e.state ===
      `input-available`) || le.has(e.type) || S.has(e.type) || e.toolName === `CREATE_IMAGE` ? !0 : (r = !0, !1)),
    mutated: r } }

function me(e, t, n, r) { let { toolCallId: i, toolName: a } = t; if (C(a)) { n.imageToolCallIds.add(i); let t = re(
    a); return w(e, i, e => e && !T(e.state) ? e : { type: t, toolCallId: i, toolName: a, state: `input-streaming`,
      input: e?.input }, r) } a === `CREATE_IMAGE` && n.imageToolCallIds.add(i); let o = `tool-${a}`; return w(e, i,
    e => e && !T(e.state) ? e : { ...e ?? {}, type: o, toolCallId: i, toolName: a, state: `input-streaming` }, r) }

function he(e, t, n) { let { toolCallId: r, inputTextDelta: i } = t; return typeof i != `string` || i.length === 0 ? e :
    w(e, r, e => { if (e === void 0) return; if (e.state !== `input-streaming`) return e; let t = e.rawInput ??
      ``; return { ...e, rawInput: t + i } }, n) }

function ge(e, t, n, r) { let { toolCallId: i, toolName: a, input: o } = t; if (C(a)) { n.imageToolCallIds.add(i); let
      t = re(a); return w(e, i, e => e && E(e.state) ? e : { type: t, toolCallId: i, toolName: a,
      state: `input-available`, input: o }, r) } return a === `CREATE_IMAGE` && n.imageToolCallIds.add(i), w(e, i, e =>
    e?.state === `approval-requested` ? { ...e, type: `tool-${a}`, toolName: a, input: o } : e && E(e.state) ? e : {
      ...e ?? {}, type: `tool-${a}`, toolCallId: i, toolName: a, state: `input-available`, input: o }, r) }

function _e(e, t, n) { let { toolCallId: r, toolName: i, input: a, errorText: o } = t; return w(e, r, e => ({ ...e ??
    {}, type: `tool-${i}`, toolCallId: r, toolName: i, state: `output-error`, input: a, errorText: o }), n) }

function ve(e, t, n, r) { let { toolCallId: i, output: a } = t; return n.imageToolCallIds.has(i) ? w(e, i, e => { if (
      e !== void 0) { if (e.state === `output-available` && e.output === a && !ae({ output: a })) return e; if (
      ae({ output: a })) { let t = oe(a),
          n = typeof t?.error == `string` && t.error || typeof a?.error == `string` && a.error ||
          `Image generation failed`; return e.state === `output-error` && e.errorText === n ? e : { ...e,
          toolCallId: i, state: `output-error`, errorText: n } } return ie({ ...e, toolCallId: i,
        state: `output-available`, output: a }, n) } }, r) : w(e, i, e => { if (e !== void 0) return e.state ===
      `output-available` && e.output === a ? e : { ...e, toolCallId: i, state: `output-available`, output: a } }, r) }

function ye(e, t, n, r) { let { toolCallId: i, errorText: a } = t, o = n.imageToolCallIds.has(i) ? a ??
    `Image generation failed` : a; return w(e, i, e => { if (e !== void 0) return e.state === `output-error` && e
      .errorText === o ? e : { ...e, toolCallId: i, state: `output-error`, errorText: o } }, r) }

function be(e, t, n) { let { toolCallId: r } = t; return w(e, r, e => { if (e !== void 0) return e.state ===
      `output-denied` ? e : { ...e, toolCallId: r, state: `output-denied` } }, n) }

function xe(e, t, n) { let { approvalId: r, toolCallId: i } = t; return !r || !i ? e : w(e, i, e => { if (e !== void 0)
      return e.state === `approval-requested` && e.approval?.id === r ? e : { ...e, state: `approval-requested`,
        approval: { id: r } } }, n) }

function Se(e, t) { let { approvalId: n, approved: r, reason: i } = t; if (!n) return e; for (let t = e.length - 1; t >=
    0; --t) { let a = e[t],
      o = a.parts ?? []; for (let s = 0; s < o.length; s += 1) { let c = o[s]; if (c?.approval?.id !== n) continue; if (
        c.state === `approval-responded` && c.approval?.approved === (r === !0) && c.approval?.reason === i)
    return e; let l = { id: n, approved: r === !0 };
      i !== void 0 && (l.reason = i); let u = { ...c, state: `approval-responded`, approval: l },
        d = o.slice();
      d[s] = u; let f = e.slice(); return f[t] = { ...a, parts: d }, f } } return e }

function Ce(e, t, n, r) { let i = t.toolCallId; return i ? (n.imageToolCallIds.add(i), w(e, i, e => e && E(e.state) && (
    t.state === `input-streaming` || t.state === `input-available`) ? e : ie({ ...e ?? {}, ...t }, n), r)) : e }

function w(e, t, n, r) { for (let r = e.length - 1; r >= 0; --r) { let i = e[r],
      a = i.parts ?? []; for (let o = 0; o < a.length; o += 1) { let s = a[o]; if (s?.toolCallId === t) { let t = n(
        s); if (t === void 0 || t === s) return e; let c = a.slice();
        c[o] = t; let l = e.slice(); return l[r] = { ...i, parts: c }, l } } } let i = n(void 0); return i === void 0 ?
    e : p(e, e => ({ ...e, parts: [...e.parts, i] }), r) }

function T(e) { return e === `input-streaming` || e === void 0 }

function E(e) { return e === `output-available` || e === `output-error` || e === `output-denied` || e ===
    `approval-requested` || e === `approval-responded` }
var D = new Map;

function we(e) { return { chatId: e, imageToolCallIds: new Set, imageBytes: new Map, streamMessageIds: new Map } }

function O(e) { let t = D.get(e); return t || (t = we(e), D.set(e, t)), t }

function Te(e) { return D.get(e) }

function k(e) { D.delete(e) }

function Ee(e, t, n) { return D.get(e)?.imageBytes.get(t)?.[n] }

function A(e, t, n, r) { let i = t?.type; if (typeof i != `string` || i.length === 0) return e; let a = r === void 0 ?
    void 0 : n.streamMessageIds.get(r); switch (i) {
    case `start`:
      return De(e, t, n, r);
    case `start-step`:
    case `finish-step`:
      return e;
    case `finish`:
      return Oe(e, t, a);
    case `error`:
      return g(e, t, a);
    case `text-start`:
      return m(e, { type: `text`, id: t.id, text: `` }, a);
    case `text-delta`:
      return _(e, t, a);
    case `text-end`:
      return e;
    case `source-url`:
      return y(e, t, a);
    case `source-document`:
      return b(e, t, a);
    case `file`:
      return x(e, t, a);
    case `message-metadata`:
      return ee(e, t, a);
    case `tool-input-start`:
      return me(e, t, n, a);
    case `tool-input-delta`:
      return he(e, t, a);
    case `tool-input-available`:
      return ge(e, t, n, a);
    case `tool-input-error`:
      return _e(e, t, a);
    case `tool-output-available`:
      return ve(e, t, n, a);
    case `tool-output-error`:
      return ye(e, t, n, a);
    case `tool-output-denied`:
      return be(e, t, a);
    case `tool-approval-request`:
      return xe(e, t, a);
    case `tool-approval-response`:
      return Se(e, t);
    case `abort`:
      return e } return i.startsWith(`data-`) ? te(e, t, a) : S.has(i) ? Ce(e, t, n, a) : e }

function De(e, t, n, r) { let i = t.messageId,
    a = t.messageMetadata;
  r !== void 0 && i && n.streamMessageIds.set(r, i); let o = e; if (i) { let t = f(e, i); if (t !== -1) { if (a ===
        void 0) return e; let n = o.slice(); return n[t] = { ...o[t], metadata: a }, n } } let s = o[o.length - 1],
    c = s?.role === `assistant` && h(n, r, s.id); if (s?.role === `assistant` && !c) { if (i && s.id !== i) { let e = o
        .slice(); return e[e.length - 1] = { ...s, id: i, metadata: a ?? s.metadata }, e } if (a !== void 0) { let e = o
        .slice(); return e[e.length - 1] = { ...s, metadata: a }, e } return e } return [...o, { id: i ??
      `assistant-${Date.now()}`, role: `assistant`, parts: [], metadata: a }] }

function Oe(e, t, n) { let r = t.finishReason === `error` || t.finishReason === `abort`,
    i = t.messageMetadata !== void 0; return p(e, e => { let n = e; if (i) { let e = { ...n.metadata ?? {}, ...t
        .messageMetadata };!r && t.messageMetadata.errorType === void 0 && (e.errorType = void 0, e.errorMessage =
        void 0), n = { ...n, metadata: e } } if (r) { let e = t.finishReason === `abort` ? se : ce,
        { parts: r, mutated: i } = ue(n.parts, e);
      i && (n = { ...n, parts: r }) } else { let { parts: e, mutated: t } = pe(n.parts, { turnWasRecovered: fe(n
          .parts) });
      t && (n = { ...n, parts: e }) } return n }, n) }

function ke(e) { return e?.type === `data-deepResearch` }

function j(e) { let t = e?.type; return t === `finish` || t === `error` || t === `abort` }

function Ae(e) { let t = e?.type; return t === `text-delta` || t === `tool-input-delta` }
var M = `streamDiag`,
  je = 2e3,
  N = null;

function Me() { try { let e = new URL(window.location.href).searchParams.get(M); return e === `1` ? window.localStorage
      .setItem(M, `1`) : e === `0` && window.localStorage.removeItem(M), window.localStorage.getItem(M) ===
      `1` } catch { return !1 } }

function P() { return N === null && (N = Me()), N }

function Ne(e, t = {}) { if (P()) try { let n = window,
      r = n.__streamDiag ?? [];
    n.__streamDiag = r; let i = { t: Date.now(), iso: new Date().toISOString(), src: e, ...t };
    r.push(i), r.length > je && r.splice(0, r.length - je), console.log(`[STREAMDIAG]`, e, i) } catch {} }

function Pe() { if (P()) try { return (Error().stack ?? ``).split(`
`).slice(2, 6).map(e => e.trim().replace(/^at\s+/, ``)).filter(e => !e.includes(`stream-diag`)).join(
    ` < `) } catch { return } }
var Fe = { draftByChatId: {} },
  Ie = `chat-draft:`,
  F = `chat-mode:`,
  Le = e => !!e.input || e.uploadQueue.length > 0 || e.collectionsAttached.length > 0 || e.filesAttached.length > 0,
  Re = (e, t) => { if (!(t in e)) return e; let {
      [t]: n, ...r } = e; return r },
  ze = () => { let e = {},
      t = []; for (let n of Object.keys(localStorage)) { let r = n.startsWith(Ie),
        i = !r && n.startsWith(F); if (!r && !i) continue; let a = n.slice((r ? Ie : F).length); if (a) { try { let t =
            r ? JSON.parse(localStorage.getItem(n) ?? `null`) : null;
          t && (e[a] = t) } catch {} t.push(n) } } return { drafts: e, consumed: t } },
  I = r()(i(a((e, t) => ({ ...Fe, saveDraft: (n, r) => { if (!n) return; let i = { input: r.currentInput, uploadQueue: r
          .uploadQueue, totalPdfPages: r.totalPdfPages, collectionsAttached: r.collectionsAttached,
        filesAttached: r.filesAttached };
      Le(i) && e({ draftByChatId: { ...t().draftByChatId, [n]: i } }) }, loadDraft: e => { if (!e)
    return null; let n = t().draftByChatId[e]; return n ? { ...n } : null }, clearDraft: n => { if (!n)
    return; let r = Re(t().draftByChatId, n);
      r !== t().draftByChatId && e({ draftByChatId: r }) }, rekeyDraft: (n, r) => { if (!n || !r || n === r)
        return; let i = t().draftByChatId,
        a = i[n];!a || i[r] || e({ draftByChatId: { ...Re(i, n), [r]: a } }) }, syncActiveDraft: (e,
    n) => { if (!e) return; let r = n.uploadQueue.filter(e => !e.isUploading);
      n.currentInput || r.length > 0 || n.collectionsAttached.length > 0 || n.filesAttached.length > 0 ? t()
        .saveDraft(e, { ...n, uploadQueue: r }) : t().clearDraft(e) }, clearAll: () => e({ ...Fe }),
    migrateLegacyKeys: () => { let { drafts: n, consumed: r } = ze(); if (r.length !== 0) { e({ draftByChatId: {
            ...n, ...t().draftByChatId } }); for (let e of r) try { localStorage.removeItem(
          e) } catch {} } } }), { name: `chat-draft-store`, partialize: e => ({ draftByChatId: e.draftByChatId }),
    onRehydrateStorage: () => e => { e?.migrateLegacyKeys() } }), { name: `ChatDraftStore`, enabled: e
      .NEXT_PUBLIC_ENV !== `production` && !0 }));
c(`chat-drafts`, () => I.getState().clearAll());
var Be = { path: `/`, expires: 365, sameSite: `lax` },
  Ve = { simple: s.COMPOSER_MODES, project: s.COMPOSER_MODES_PROJECT },
  L = () => /(^|\/)project\//.test(window.location.pathname) ? `project` : `simple`,
  He = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  R = () => { let e = window.location.pathname.split(`/`).filter(Boolean),
      t = e[0]?.length === 2 ? e.slice(1) : e,
      n = t.indexOf(`project`),
      r = n === -1 ? t.at(-1) : t[n + 2]; return r && He.test(r) ? r : null },
  z = e => !!(e.isWebSearchMode || e.isDeepResearchMode || e.isImageGenerationMode),
  Ue = e => ({ ...e.isWebSearchMode && { isWebSearchMode: !0 }, ...e.isDeepResearchMode && { isDeepResearchMode: !0 },
    ...e.isImageGenerationMode && { isImageGenerationMode: !0 }, ...e.isDeepResearchMode && e.deepResearchProcessor &&
    { deepResearchProcessor: e.deepResearchProcessor } }),
  We = e => { if (!e) return {}; try { let t = JSON.parse(e); return t && typeof t == `object` ? t :
      {} } catch { return {} } },
  B = e => We(o.get(Ve[e])),
  Ge = e => { let t = Object.keys(e); if (t.length <= 20) return e; let n = t.slice(t.length - 20); return Object
      .fromEntries(n.map(t => [t, e[t]])) },
  V = (e, t) => { let n = Ve[e],
      r = t.new && z(t.new),
      i = t.byChat && Object.keys(t.byChat).length > 0; if (!r && !i) { o.remove(n, { path: `/` }); return } o.set(n,
      JSON.stringify({ ...r && { new: t.new }, ...i && { byChat: t.byChat } }), { ...Be, secure: globalThis.location
          ?.protocol === `https:` }) },
  Ke = (e, t, n) => { let r = B(e),
      i = Ue(n),
      a = z(i); if (!t) { V(e, { ...r, new: a ? i : void 0 }); return } let o = { ...r.byChat };
    delete o[t], a && (o[t] = i), V(e, { ...r, byChat: Ge(o) }) },
  qe = (e, t) => { let n = B(e); if (!t || !n.new || !z(n.new)) return; let r = { ...n.byChat };
    delete r[t], r[t] = n.new, V(e, { byChat: Ge(r), new: void 0 }) },
  H = (e, t) => Je(B(e), t),
  Je = (e, t) => e ? (t ? e.byChat?.[t] : e.new) ?? null : null,
  U = () => `new:${L()}`,
  W = (e, t) => e ? e === t ? U() : e : null,
  G = !1,
  Ye = () => { G = !0 },
  Xe = () => { G = !1 },
  Ze = () => G,
  K = !1,
  Qe = () => { K = !0 },
  $e = () => { K = !1 },
  et = () => K,
  q = null,
  tt = (e, t) => { let n = H(L(), e),
      r = I.getState().loadDraft(W(e, t.pendingNewChatId) ?? e); return { currentInput: r?.input ?? ``, uploadQueue: r ?
        r.uploadQueue.filter(e => e.url).map(e => ({ ...e, isUploading: !1 })) : [], totalPdfPages: r?.totalPdfPages ??
        0, collectionsAttached: r?.collectionsAttached ?? [], filesAttached: r?.filesAttached ?? [], isWebSearchMode: !!
        n?.isWebSearchMode, isDeepResearchMode: !!n?.isDeepResearchMode, isImageGenerationMode: !!n
        ?.isImageGenerationMode, deepResearchProcessor: n?.deepResearchProcessor ?? t.deepResearchProcessor ??
        `pro-fast` } },
  nt = (e, r, i, a) => { let o = r.activeChatId,
      { preserveModesFromPayment: s } = u.getState(); if (o === e) { e !== null && q === e && !a?.isPreNavigation && (
        q = null, $e(), i(tt(e, r))); return } if (e && r.unreadCompletedChatIds.has(e)) { let t = new Set(r
        .unreadCompletedChatIds);
      t.delete(e), i({ unreadCompletedChatIds: t }) } let c = o === null,
      l = a?.isDeepResearchLanding && !Ze() ? { isDeepResearchMode: !0, isWebSearchMode: !1, isImageGenerationMode: !
        1 } : null,
      d = e !== null && e === r.pendingNewChatId,
      f = e !== null && e === r.pendingNewChatId,
      p = !!a?.isPreNavigation && !f;
    q = p && e !== null ? e : null, !p && !f && $e(); let m = H(L(), f ? null : e),
      h = m ? { isWebSearchMode: !!m.isWebSearchMode, isDeepResearchMode: !!m.isDeepResearchMode, isImageGenerationMode:
          !!m.isImageGenerationMode } : null,
      g = !!m,
      _ = c || d || g,
      v = g && m ? { isImageGenerationMode: !!m.isImageGenerationMode, isDeepResearchMode: !!m.isDeepResearchMode,
        isWebSearchMode: !!m.isWebSearchMode, deepResearchProcessor: m.deepResearchProcessor,
      deepResearchSource: void 0 } : null,
      y = t.getItem(`signupModalSource`) !== null,
      b = y || n.getItem(`signupReturnPreserveDraft`) !== null; if (n.getItem(`signupReturnPreserveDraft`) !== null && n
      .removeItem(`signupReturnPreserveDraft`), o !== null && o !== e) { let t = r;
      (t.isDeepResearchTaskInProgress || t.deepResearchUpdates.length > 0) && console.warn(
        `[ChatStore] ⚠️ setActiveChatId clearing research state on chat switch`, { from: o, to: e, wasInProgress: t
            .isDeepResearchTaskInProgress, prevUpdatesCount: t.deepResearchUpdates.length, prevMessageId: t
            .currentResearchMessageId }), i({ isFilePreviewSidebarOpen: !1, filePreviewData: null,
        isGeneratedFilePreviewOpen: !1, generatedFilePreviewData: null, isDeepResearchTaskInProgress: !1,
        currentResearchMessageId: null, deepResearchUpdates: [], sidebarOverride: null, isDeepResearchSidebarOpen: !
          1 }) } if (o === null && e !== null && (r.currentInput || r.uploadQueue.length > 0 || r.collectionsAttached
        .length > 0 || r.filesAttached.length > 0)) { let t = y ? null : v,
        n = y ? null : I.getState().loadDraft(W(e, r.pendingNewChatId) ?? e),
        a = !y && !f && r.pendingNewChatId ? r.pendingNewChatId : null;
      a && I.getState().saveDraft(U(), { currentInput: r.currentInput, uploadQueue: r.uploadQueue.filter(e => !e
          .isUploading), totalPdfPages: r.totalPdfPages, collectionsAttached: r.collectionsAttached,
        filesAttached: r.filesAttached }), i({ activeChatId: e, ...a && { currentInput: ``, uploadQueue: [],
          totalPdfPages: 0 }, ...!y && { ...!p && { collectionsAttached: n?.collectionsAttached ?? [],
            filesAttached: n?.filesAttached ?? [], isImageGenerationMode: t?.isImageGenerationMode ?? !1,
            isDeepResearchMode: s && t == null ? r.isDeepResearchMode : t?.isDeepResearchMode ?? r
              .isDeepResearchMode, isWebSearchMode: t?.isWebSearchMode ?? r.isWebSearchMode,
            deepResearchProcessor: t?.deepResearchProcessor ?? r.deepResearchProcessor ?? `pro-fast`,
            deepResearchSource: t?.deepResearchSource ?? r.deepResearchSource } }, ...l ?? {} }); return } o && I
      .getState().syncActiveDraft(W(o, r.pendingNewChatId) ?? o, r); let x = e && !y ? v : null; if (e) { let t = I
        .getState().loadDraft(W(e, r.pendingNewChatId) ?? e); if (t) { i({ activeChatId: e, ...!p && { currentInput: t
              .input, uploadQueue: t.uploadQueue.filter(e => e.url).map(e => ({ ...e, isUploading: !1 })),
            totalPdfPages: t.totalPdfPages, collectionsAttached: t.collectionsAttached ?? [], filesAttached: t
              .filesAttached ?? [] }, ...!y && !p && { isImageGenerationMode: h?.isImageGenerationMode ?? x
              ?.isImageGenerationMode ?? !1, isDeepResearchMode: h?.isDeepResearchMode ?? (s && x == null ? r
              .isDeepResearchMode : x?.isDeepResearchMode ?? (_ ? r.isDeepResearchMode : !1)), isWebSearchMode: h
              ?.isWebSearchMode ?? x?.isWebSearchMode ?? (_ ? r.isWebSearchMode : !1), deepResearchProcessor: x
              ?.deepResearchProcessor ?? r.deepResearchProcessor ?? `pro-fast`, deepResearchSource: x
              ?.deepResearchSource ?? r.deepResearchSource }, ...l ?? {} }); return } } i({ activeChatId: e, ...!p &&
      { currentInput: b ? r.currentInput : ``, uploadQueue: b ? r.uploadQueue : [], totalPdfPages: b ? r
          .totalPdfPages : 0, collectionsAttached: b ? r.collectionsAttached : [], filesAttached: b ? r
          .filesAttached : [] }, ...!y && !p && { isImageGenerationMode: h?.isImageGenerationMode ?? (b ? r
          .isImageGenerationMode : x?.isImageGenerationMode ?? !1), isDeepResearchMode: h?.isDeepResearchMode ?? (
          b || s && x == null ? r.isDeepResearchMode : x?.isDeepResearchMode ?? (_ ? r.isDeepResearchMode : !1)),
        isWebSearchMode: h?.isWebSearchMode ?? (b ? r.isWebSearchMode : x?.isWebSearchMode ?? (_ ? r
          .isWebSearchMode : !1)), deepResearchProcessor: b ? r.deepResearchProcessor ?? `pro-fast` : x
          ?.deepResearchProcessor ?? r.deepResearchProcessor ?? `pro-fast`, deepResearchSource: b ? r
          .deepResearchSource : x?.deepResearchSource ?? r.deepResearchSource }, ...l ?? {} }) },
  rt = e => e.some(e => e.role === `assistant` && (e.parts?.length ?? 0) > 0),
  it = (e, t, n) => { let r = e.inFlightUserTurns,
      i = n.filter(e => e.role === `user`); if (rt(n) || i.length === 0) { if (!r[t]) return r; let {
        [t]: e, ...n } = r; return n } let a = Object.entries({ ...r, [t]: i }); return Object.fromEntries(a.slice(-
    3)) },
  J = [],
  Y = new Map,
  X = e => { e?.rafHandle !== null && e?.rafHandle !== void 0 && (typeof globalThis.cancelAnimationFrame ==
      `function` && globalThis.cancelAnimationFrame(e.rafHandle), e.rafHandle = null) },
  at = (e, t, n) => { if (!e.inFlightUserTurns[t]) return {}; let r = it(e, t, n); return r === e.inFlightUserTurns ?
      {} : { inFlightUserTurns: r } };

function ot(e, t, n) { let r = Y.get(e); if (!r || r.chunks.length === 0) { X(r); return } X(r); let i = O(e),
    a = n(),
    o = a.messagesByChat[e] ?? J,
    s = o; for (let { chunk: e, streamId: t } of r.chunks) s = A(s, e, i, t);
  r.chunks.length = 0, s !== o && t({ messagesByChat: { ...a.messagesByChat, [e]: s } }) }
var st = e => { X(Y.get(e)), Y.delete(e) },
  ct = (e, t, n, r, i) => { let a = t?.type,
      o = O(e); if (Ae(t)) { let a = Y.get(e); if (a || (a = { chunks: [], rafHandle: null }, Y.set(e, a)), a.chunks
        .push({ chunk: t, streamId: n }), a.rafHandle === null) { let t = typeof globalThis.requestAnimationFrame ==
          `function` ? globalThis.requestAnimationFrame : e => setTimeout(() => e(performance.now()), 16);
        a.rafHandle = t(() => { ot(e, r, i) }) } return } if (ot(e, r, i), a === `start`) { let e = t,
        n = e.messageMetadata ?? {}; if (!n.modelId) { let r = i().selectedModel;
        r && (t = { ...e, messageMetadata: { ...n, modelId: r } }) } } let s = i(),
      c = s.messagesByChat[e] ?? J,
      l = A(c, t, o, n),
      u = typeof a == `string` && a.startsWith(`data-`),
      d = t?.toolCallId,
      f = a === `tool-output-available` && d !== void 0 && o.imageToolCallIds.has(d),
      p = {}; if (l !== c && (p.messagesByChat = { ...s.messagesByChat, [e]: l }), j(t) && Object.assign(p, at(s, e,
      l)), f && (p.imageOutputAvailableSeq = s.imageOutputAvailableSeq + 1), u) { let e = [...s.streamDataParts, t];
      p.streamDataParts = e.length > 1e3 ? e.slice(-1e3) : e } Object.keys(p).length > 0 && r(p), j(t) && X(Y.get(e)) },
  Z = (e, t) => { Ke(L(), R(), t) },
  lt = (e, t, n) => { let r = t.activeChatId,
      i = { isImageGenerationMode: e, isDeepResearchMode: !e && t.isDeepResearchMode, isWebSearchMode: !e && t
          .isWebSearchMode };
    n(i), u.getState().setPreserveModesFromPayment(!1), Z(r, i) },
  ut = (e, t, n) => { let r = t.activeChatId,
      i = { isDeepResearchMode: e, isImageGenerationMode: !1, isWebSearchMode: !1, deepResearchProcessor: t
          .deepResearchProcessor, deepResearchSource: e ? window.location.pathname.endsWith(`/deep-research`) ?
          `deep_research_page` : `chat_page` : t.deepResearchSource };
    n(i), u.getState().setPreserveModesFromPayment(!1), Z(r, i) },
  dt = (e, t, n) => { t.activeChatId, n({ deepResearchProcessor: e }), Ke(L(), R(), { isDeepResearchMode: t
        .isDeepResearchMode, isImageGenerationMode: t.isImageGenerationMode, isWebSearchMode: t.isWebSearchMode,
      deepResearchProcessor: e }) },
  ft = (e, t, n) => { let r = t.activeChatId,
      i = { isWebSearchMode: e, isImageGenerationMode: !1, isDeepResearchMode: !1 };
    n(i), u.getState().setPreserveModesFromPayment(!1), Z(r, i) },
  Q = e => [...e].sort((e, t) => (typeof e.updateIndex == `number` ? e.updateIndex : 1 / 0) - (typeof t.updateIndex ==
    `number` ? t.updateIndex : 1 / 0)),
  pt = (e, t) => { if (t.type === `heartbeat`) return e; if (typeof t.updateIndex == `number`) { for (let n of e)
        if (n.updateIndex === t.updateIndex) return e } if (t.type === `web` && t.messageKey !==
      `reading_sources`) { let n = t.queries?.[0],
        r = typeof n == `string` ? n.toLowerCase().trim() : typeof n == `object` && n?.messageKey ? n.messageKey
        .toLowerCase().trim() : void 0; if (r) { let n = e.findIndex(e => { if (e.type !== `web`) return !1; let t = e
            .queries?.[0]; return (typeof t == `string` ? t.toLowerCase().trim() : typeof t == `object` && t
            ?.messageKey ? t.messageKey.toLowerCase().trim() : void 0) === r }); if (n !== -1) { let r = t.updateIndex,
            i = e[n].updateIndex; if (typeof r == `number` && typeof i == `number` && r < i) return e; let a = [...
          e]; return a[n] = t, Q(a) } } } if (t.type === `completed` && e.some(e => e.type === `completed`))
  return e; if (t.type === `generating_summary`) { let n = t,
        r = e.findIndex(e => { if (e.type !== `generating_summary`) return !1; let t = e; return t.summaryId && t
            .summaryId === n.summaryId }); if (r !== -1) { let n = [...e]; return n[r] = t, Q(n) } } if (t.type ===
      `thoughts`) { let n = t; if (e.some(e => { if (e.type !== `thoughts`) return !1; let t = e; return t.title === n
            .title && t.message === n.message })) return e } if (t.type === `started` && e.some(e => e.type ===
        `started`) || t.type === `title` && e.some(e => e.type === `title`)) return e; if (t.type === `writing`) { let
        n = t; if (e.some(e => e.type === `writing` && e.message === n.message)) return e } return Q([...e, t]) },
  mt = { path: `/`, expires: 365, sameSite: `lax` },
  ht = () => o.get(s.IMAGE_LANDING_PREFS) !== void 0,
  gt = () => { let e = o.get(s.IMAGE_LANDING_PREFS); if (!e) return null; try { let t = JSON.parse(e); return t &&
        typeof t == `object` ? t : null } catch { return null } },
  _t = e => { let t = { ...gt(), ...e };
    o.set(s.IMAGE_LANDING_PREFS, JSON.stringify(t), { ...mt, secure: globalThis.location?.protocol === `https:` }) },
  vt = { name: `chat-upload-queue-storage`, version: 2, migrate: (e, t) => { let n = e; return t < 2 ? { ...n,
        modelManuallySelected: !1 } : n }, partialize: e => ({ selectedModelByChat: e.selectedModelByChat,
      modelManuallySelected: e.modelManuallySelected, autoModelExplicitlyPicked: e.autoModelExplicitlyPicked,
      uploadQueue: e.uploadQueue, collectionsAttached: e.collectionsAttached, filesAttached: e.filesAttached,
      totalPdfPages: e.totalPdfPages, currentInput: e.currentInput, imageLandingStyle: e.imageLandingStyle,
      imageLandingAspect: e.imageLandingAspect, imageGenerationModel: e.imageGenerationModel,
      imageGenerationModelByChat: e.imageGenerationModelByChat, imageVariationsCount: e.imageVariationsCount,
      pendingNewChatId: e.pendingNewChatId, unreadCompletedChatIds: e.unreadCompletedChatIds, inFlightUserTurns: e
        .inFlightUserTurns, userStoppedTurnByChat: e.userStoppedTurnByChat }), onRehydrateStorage: () => e => { e && (e
        .uploadQueue && e.setUploadQueue(e.uploadQueue.filter(e => !e.isUploading && e.url).map(e => ({ ...e,
          isUploading: !1 }))), e.setHasHydrated(!0)) }, storage: { getItem: e => { let t = localStorage.getItem(e),
          n = t ? JSON.parse(t) : { state: {}, version: 0 };
        Array.isArray(n?.state?.unreadCompletedChatIds) && (n.state.unreadCompletedChatIds = new Set(n.state
          .unreadCompletedChatIds)); let r = H(L(), R());
        n.state = { ...n.state, isWebSearchMode: !!r?.isWebSearchMode, isDeepResearchMode: !!r?.isDeepResearchMode,
          isImageGenerationMode: !!r?.isImageGenerationMode }; let i = gt(); return n.state = { ...n.state, ...
          typeof i?.style == `string` && { imageLandingStyle: i.style }, ...typeof i?.aspect == `string` &&
          { imageLandingAspect: i.aspect } }, n }, setItem: (e, t) => { let n = t;
        t?.state?.unreadCompletedChatIds instanceof Set && (n = { ...t, state: { ...t.state,
            unreadCompletedChatIds: Array.from(t.state.unreadCompletedChatIds) } }), localStorage.setItem(e, JSON
          .stringify(n)) }, removeItem: e => { localStorage.removeItem(e) } } },
  yt = (e, t) => { let n = e.userStoppedTurnByChat[t]; if (!n) return !1; let r = (e.messagesByChat[t] ?? []).findLast(
      e => e.role === `user`)?.id; return r ? r === n : (e.inFlightUserTurns[t] ?? []).some(e => e.id === n) },
  $ = r()(i(a((e, t) => ({ initialModel: ``, selectedModel: ``, selectedModelByChat: {}, isModelHydrated: !1,
    modelManuallySelected: !1, autoModelExplicitlyPicked: !1, isRecording: !1, isProcessing: !1,
    activeChatId: null, currentInput: ``, pendingPrompt: null, pendingShellAction: null,
    pendingShellFiles: null, pendingCollectionAttachment: [], pendingFileAttachment: [], isAtBottom: !0,
    shouldStopRecording: !1, shouldCancelRecording: !1, totalPdfPages: 0, hasRateLimitError: !1,
    hasUsageLimitError: !1, rateLimitErrorChatId: null, limitBannerByChatId: {}, showAttachmentTooltip: !1,
    promptSuggestionsExpanded: !1, triggerFilePicker: !1, inputHighlightRanges: null, isImageGenerationMode: !1,
    imageLandingStyle: ``, imageLandingAspect: ``, imageGenerationModel: null, imageGenerationModelByChat: {},
    imageVariationsCount: 1, isDeepResearchMode: !1, deepResearchProcessor: `pro-fast`,
    deepResearchSource: `chat_page`, isDeepResearchTaskInProgress: !1, isWebSearchMode: !1, isAgenticMode: !1,
    focusedComposerChatId: null, isChatThreadLoading: !1, isTextareaTooltipVisible: !1,
    textareaTooltipHeight: 0, isDeepResearchSidebarOpen: !1, deepResearchUpdates: [],
    deepResearchUpdatesVersion: 0, sidebarOverride: null, selectedResearchTab: `activity`,
    currentResearchMessageId: null, researchInitFetchingMessageId: null, webSearchSources: [],
    isWebSearchSidebarOpen: !1, isFilePreviewSidebarOpen: !1, filePreviewData: null, isGeneratedFilePreviewOpen:
      !1, generatedFilePreviewData: null, streamDataParts: [], _hasHydrated: !1, pendingNewChatId: null,
    chatSurfaceResetNonce: 0, newChatModuleNonce: 0, streamingChatIds: new Set, researchingChatIds: new Set,
    drainingChatIds: new Set, stoppingChatIds: new Set, unreadCompletedChatIds: new Set, messagesByChat: {},
    inFlightUserTurns: {}, userStoppedTurnByChat: {}, imageOutputAvailableSeq: 0, rateLimitEventQueue: {},
    streamErrorByChatId: {}, handleModuleStore: t => e(e => ({ ...e, ...t })), setSelectedModel: t => { e
    ({ selectedModel: t, showAttachmentTooltip: !1 }) }, rememberChatModel: (t, n) => { t && e(e =>
    ({ selectedModelByChat: { ...e.selectedModelByChat, [t]: n } })) }, rekeyChatModel: (t, n) => {!t || !n ||
        t === n || e(e => { let r = e.selectedModelByChat[t]; if (!r || e.selectedModelByChat[n])
        return e; let {
            [t]: i, ...a } = e.selectedModelByChat; return { selectedModelByChat: { ...a, [n]: r } } }) },
    setModelHydrated: t => e({ isModelHydrated: t }), setModelManuallySelected: t =>
  e({ modelManuallySelected: t }), setAutoModelExplicitlyPicked: t => e({ autoModelExplicitlyPicked: t }),
    setIsRecording: t => e({ isRecording: t }), setIsProcessing: t => e({ isProcessing: t }),
    setCurrentInput: n => { let r = t().currentInput; if (e({ currentInput: n }), n || !r) return; let i = t();
        I.getState().syncActiveDraft(W(i.activeChatId, i.pendingNewChatId), i) }, setPendingPrompt: t =>
  e({ pendingPrompt: t }), setPendingShellAction: t => e({ pendingShellAction: t }), setPendingShellFiles: t =>
      e({ pendingShellFiles: t }), setPendingCollectionAttachment: t => e({ pendingCollectionAttachment: t }),
    clearPendingCollectionAttachment: () => e({ pendingCollectionAttachment: [] }),
    setPendingFileAttachment: t => e({ pendingFileAttachment: t }), clearPendingFileAttachment: () =>
  e({ pendingFileAttachment: [] }), setIsAtBottom: t => e({ isAtBottom: t }), setActiveChatId: (n, r) => { nt(n,
        t(), e, r) }, hydrateDraftFromStorage: n => { let r = I.getState().loadDraft(W(n, t()
        .pendingNewChatId) ?? n); return r ? (e({ currentInput: r.input, uploadQueue: r.uploadQueue.filter(
          e => e.url).map(e => ({ ...e, isUploading: !1 })), totalPdfPages: r.totalPdfPages,
        collectionsAttached: r.collectionsAttached ?? [], filesAttached: r.filesAttached ?? [] }), !0) : !1 },
    clearCurrentChatDraft: () => { let e = t();
      I.getState().syncActiveDraft(W(e.activeChatId, e.pendingNewChatId), e) }, resetChatState: () => e(e =>
  ({ isRecording: !1, isFullscreenDragActive: !1, isAtBottom: !0, shouldStopRecording: !1,
      hasRateLimitError: !1, hasUsageLimitError: !1, rateLimitErrorChatId: null, showAttachmentTooltip: !
        1, promptSuggestionsExpanded: !1, isTextareaTooltipVisible: !1, textareaTooltipHeight: 0,
      isDeepResearchSidebarOpen: !1, sidebarOverride: null, deepResearchUpdates: e
        .isDeepResearchTaskInProgress ? e.deepResearchUpdates : [], currentResearchMessageId: e
        .isDeepResearchTaskInProgress ? e.currentResearchMessageId : null, webSearchSources: [],
      isWebSearchSidebarOpen: !1, streamDataParts: [] })), resetChatModesForLogout: () =>
  e({ isImageGenerationMode: !1, isDeepResearchMode: !1, isWebSearchMode: !1, isAgenticMode: !1,
      deepResearchProcessor: `pro-fast`, deepResearchSource: `chat_page`, isDeepResearchTaskInProgress: !1,
      isDeepResearchSidebarOpen: !1, deepResearchUpdates: [], currentResearchMessageId: null,
      sidebarOverride: null, webSearchSources: [], isWebSearchSidebarOpen: !1, collectionsAttached: [],
      filesAttached: [], modelManuallySelected: !1 }), triggerStopRecording: () => { e({ shouldStopRecording: !
          0 }), setTimeout(() => { e({ shouldStopRecording: !1 }) }, 100) }, triggerCancelRecording: () => { e
    ({ shouldCancelRecording: !0 }), setTimeout(() => { e({ shouldCancelRecording: !1 }) }, 100) },
    isFullscreenDragActive: !1, setIsFullscreenDragActive: t => e({ isFullscreenDragActive: t }),
  uploadQueue: [], collectionsAttached: [], filesAttached: [], setUploadQueue: n => { let r = t(),
        i = typeof n == `function` ? n(r.uploadQueue) : n;
      e({ uploadQueue: i }), I.getState().syncActiveDraft(W(r.activeChatId, r.pendingNewChatId), { ...r,
        uploadQueue: i }) }, addCollectionAttached: e => { let { collectionsAttached: n,
        setCollectionsAttached: r } = t();
      n.some(t => t.id === e.id) || r([e, ...n]) },
  removeCollectionAttached: e => { let { collectionsAttached: n, setCollectionsAttached: r } = t();
      r(n.filter(t => t.id !== e)) }, setCollectionsAttached: n => { e({ collectionsAttached: n }), I.getState()
        .syncActiveDraft(W(t().activeChatId, t().pendingNewChatId), t()) },
  addFileAttached: e => { let { filesAttached: n, setFilesAttached: r } = t();
      n.some(t => t.id === e.id) || r([e, ...n]) }, removeFileAttached: e => { let { filesAttached: n,
        setFilesAttached: r } = t();
      r(n.filter(t => t.id !== e)) }, setFilesAttached: n => { e({ filesAttached: n }), I.getState()
        .syncActiveDraft(W(t().activeChatId, t().pendingNewChatId), t()) }, addPdfPages: t => e(e =>
  ({ totalPdfPages: e.totalPdfPages + t })), removePdfPages: t => e(e => ({ totalPdfPages: e.totalPdfPages -
        t })), setHasRateLimitError: t => e({ hasRateLimitError: t }), setHasUsageLimitError: t =>
  e({ hasUsageLimitError: t }), setRateLimitErrorChatId: t => e({ rateLimitErrorChatId: t }), setLimitBanner: (
      t, n) => e(e => ({ limitBannerByChatId: { ...e.limitBannerByChatId, [t]: n } })), clearLimitBanner: t =>
      e(e => { if (!(t in e.limitBannerByChatId)) return e; let {
          [t]: n, ...r } = e.limitBannerByChatId; return { limitBannerByChatId: r } }),
    setShowAttachmentTooltip: t => e({ showAttachmentTooltip: t }), setPromptSuggestionsExpanded: t =>
  e({ promptSuggestionsExpanded: t }), setInputHighlightRanges: t => e({ inputHighlightRanges: t }),
    setTriggerFilePicker: t => e({ triggerFilePicker: t }), setIsImageGenerationMode: n => { lt(n, t(), e) },
    setImageLandingStyle: t => e({ imageLandingStyle: t }), setImageLandingAspect: t =>
  e({ imageLandingAspect: t }), setImageGenerationModel: t => e({ imageGenerationModel: t }),
    rememberChatImageModel: (t, n) => {!t || !n || e(e => ({ imageGenerationModelByChat: { ...e
          .imageGenerationModelByChat, [t]: n } })) }, setImageVariationsCount: t =>
  e({ imageVariationsCount: t }), setDeepResearchMode: n => { ut(n, t(), e) },
  setDeepResearchProcessor: n => { dt(n, t(), e) }, setIsDeepResearchTaskInProgress: n => { t()
        .isDeepResearchTaskInProgress === !0 && n === !1 && console.warn(
          `[ChatStore] ⚠️ setIsDeepResearchTaskInProgress(false) called`, { stack: Error(
              `setIsDeepResearchTaskInProgress(false) called`).stack?.split(`
`).slice(2, 6).join(`
`), currentResearchMessageId: t().currentResearchMessageId, updatesCount: t().deepResearchUpdates.length }),
      e({ isDeepResearchTaskInProgress: n }) }, setIsWebSearchMode: n => { ft(n, t(), e) },
    setIsAgenticMode: t => { e({ isAgenticMode: t }), u.getState().setPreserveModesFromPayment(!1) },
    setFocusedComposerChatId: t => { e({ focusedComposerChatId: t }) }, setIsChatThreadLoading: t => { e
    ({ isChatThreadLoading: t }) }, setTextareaTooltipVisible: t => e({ isTextareaTooltipVisible: t }),
    setTextareaTooltipHeight: t => e({ textareaTooltipHeight: t }), setDeepResearchSidebarOpen: t =>
  e({ isDeepResearchSidebarOpen: t }), setDeepResearchUpdates: (t, n) => e(e => ({ deepResearchUpdates: t,
      deepResearchUpdatesVersion: e.deepResearchUpdatesVersion + 1, ...n !== void 0 &&
      { currentResearchMessageId: n } })), setSidebarOverride: (t, n) => { e({ sidebarOverride: { updates: t,
          messageId: n } }) }, clearSidebarOverride: () => { e({ sidebarOverride: null }) },
    setSelectedResearchTab: t => e({ selectedResearchTab: t }), setCurrentResearchMessageId: t => { e
    ({ currentResearchMessageId: t }) }, setResearchInitFetchingMessageId: t =>
  e({ researchInitFetchingMessageId: t }), setWebSearchSources: t => e({ webSearchSources: t }),
    setWebSearchSidebarOpen: t => e({ isWebSearchSidebarOpen: t }), setFilePreviewSidebarOpen: t =>
  e({ isFilePreviewSidebarOpen: t }), setFilePreviewData: t => e({ filePreviewData: t }),
    setGeneratedFilePreviewOpen: t => e({ isGeneratedFilePreviewOpen: t }), setGeneratedFilePreviewData: t =>
  e({ generatedFilePreviewData: t }), appendResearchUpdate: t => e(e => { let n = pt(e.deepResearchUpdates,
      t); return n === e.deepResearchUpdates ? e : { deepResearchUpdates: n, deepResearchUpdatesVersion: e
          .deepResearchUpdatesVersion + 1 } }), applyResearchUpdates: t => e(e => { let n = e
        .deepResearchUpdates; for (let e of t) n = pt(n, e); return n === e.deepResearchUpdates ? e :
      { deepResearchUpdates: n, deepResearchUpdatesVersion: e.deepResearchUpdatesVersion + 1 } }),
    clearResearchUpdates: () => { e({ deepResearchUpdates: [], currentResearchMessageId: null }) },
    appendStreamDataPart: t => e(e => { let n = [...e.streamDataParts, t]; return n.length > 1e3 ?
      { streamDataParts: n.slice(-1e3) } : { streamDataParts: n } }), clearStreamDataParts: () =>
  e({ streamDataParts: [] }), setHasHydrated: t => e({ _hasHydrated: t }), setPendingNewChatId: t =>
  e({ pendingNewChatId: t }), bumpChatSurfaceResetNonce: () => e(e => ({ chatSurfaceResetNonce: e
        .chatSurfaceResetNonce + 1 })), bumpNewChatModuleNonce: () => e(e => ({ newChatModuleNonce: e
        .newChatModuleNonce + 1 })), setChatStreamingState: (n, r) => { let i = t(),
        a = i.streamingChatIds; if (a.has(n) === r) return;
      Ne(`store.streamingFlip`, { chatId: n, isStreaming: r, via: Pe() }); let o = new Set(a);
      r ? o.add(n) : o.delete(n); let s = { streamingChatIds: o }; if (!r && !i.drainingChatIds.has(n) && i
        .stoppingChatIds.has(n)) { let e = new Set(i.stoppingChatIds);
        e.delete(n), s.stoppingChatIds = e } e(s) }, setChatResearching: (n, r) => { let i = t()
        .researchingChatIds; if (i.has(n) === r) return; let a = new Set(i);
      r ? a.add(n) : a.delete(n), e({ researchingChatIds: a }) }, setChatDrainingState: (n, r) => { let i = t(),
        a = i.drainingChatIds; if (a.has(n) === r) return; let o = new Set(a);
      r ? o.add(n) : o.delete(n); let s = { drainingChatIds: o }; if (!r && !i.streamingChatIds.has(n) && i
        .stoppingChatIds.has(n)) { let e = new Set(i.stoppingChatIds);
        e.delete(n), s.stoppingChatIds = e } e(s) }, setChatStopping: (n, r) => { let i = t()
      .stoppingChatIds; if (i.has(n) === r) return; let a = new Set(i);
      r ? a.add(n) : a.delete(n), e({ stoppingChatIds: a }) }, markTurnStoppedByUser: (n, r) => { let i = t()
        .userStoppedTurnByChat; if (i[n] === r) return; let a = Object.entries({ ...i, [n]: r });
      e({ userStoppedTurnByChat: Object.fromEntries(a.slice(-3)) }) }, markChatUnread: n => { let r = t()
        .unreadCompletedChatIds; if (r.has(n)) return; let i = new Set(r);
      i.add(n), e({ unreadCompletedChatIds: i }) }, clearChatUnread: n => { let r = t()
      .unreadCompletedChatIds; if (!r.has(n)) return; let i = new Set(r);
      i.delete(n), e({ unreadCompletedChatIds: i }) }, appendChunkForChat: (n, r, i) => { ct(n, r, i, e, t) },
    setMessagesForChat: (n, r) => { let i = t(),
        a = i.messagesByChat[n] ?? J,
        o = typeof r == `function` ? r(a) : r;
      o !== a && e({ messagesByChat: { ...i.messagesByChat, [n]: o }, inFlightUserTurns: it(i, n, o) }) },
    resetMessagesForChat: n => { let r = t();
      st(n); let i;
      r.drainingChatIds.has(n) && (i = new Set(r.drainingChatIds), i.delete(n)); let a; if (n in r
        .limitBannerByChatId) { let {
          [n]: e, ...t } = r.limitBannerByChatId;
        a = t } if (!(n in r.messagesByChat)) { k(n); let t = {};
        i && (t.drainingChatIds = i), a && (t.limitBannerByChatId = a), Object.keys(t).length > 0 && e(
        t); return } let {
        [n]: o, ...s } = r.messagesByChat;
      k(n); let c = { messagesByChat: s };
      i && (c.drainingChatIds = i), a && (c.limitBannerByChatId = a), e(c) }, enqueueRateLimitEvent: (n,
    r) => { let i = t().rateLimitEventQueue;
      e({ rateLimitEventQueue: { ...i, [n]: r } }) }, consumeRateLimitEvent: n => { let r = t()
        .rateLimitEventQueue; if (r[n] == null && !(n in r)) return; let {
        [n]: i, ...a } = r;
      e({ rateLimitEventQueue: a }) }, setStreamError: (n, r) => { let i = t().streamErrorByChatId; if (r ==
        null) { if (i[n] == null && !(n in i)) return; let {
          [n]: t, ...r } = i;
        e({ streamErrorByChatId: r }); return } let a = i[n];
      (a == null || a.message !== r.message || a.errorType !== r.errorType || a.isIpRateLimit !== r
        .isIpRateLimit) && e({ streamErrorByChatId: { ...i, [n]: r } }) }, clearStreamError: n => { let r = t()
        .streamErrorByChatId; if (r[n] == null && !(n in r)) return; let {
        [n]: i, ...a } = r;
      e({ streamErrorByChatId: a }) } }), vt), { name: `ChatModuleStore`, enabled: e.NEXT_PUBLIC_ENV !==
      `production` && !0 })),
  bt = () => { Qe(), $.setState({ isDeepResearchMode: !1, isWebSearchMode: !1, isImageGenerationMode: !1 }) };
l({ getState: () => { let e = $.getState(); return { hasRateLimitError: e.hasRateLimitError, hasUsageLimitError: e
        .hasUsageLimitError, rateLimitErrorChatId: e.rateLimitErrorChatId, isWebSearchMode: e.isWebSearchMode,
      isWebSearchSidebarOpen: e.isWebSearchSidebarOpen } }, getMessages: e => $.getState().messagesByChat[e] ?? [],
  hasLimitBanner: e => $.getState().limitBannerByChatId[e] !== void 0, closeWebSearchSidebar: () => $.getState()
    .setWebSearchSidebarOpen(!1), subscribe: e => $.subscribe(e) }), c(`chat-modes`, () => $.getState()
  .resetChatModesForLogout());
export { j as C, ke as S, ue as T, Ne as _, _t as a, Ee as b, Xe as c, qe as d, H as f, P as g, I as h, ht as i,
  Ye as l, L as m, yt as n, et as o, R as p, $ as r, Ze as s, bt as t, U as u, Pe as v, ce as w, Te as x, k as y };
