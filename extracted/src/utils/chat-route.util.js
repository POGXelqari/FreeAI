/**
 * Source: https://use.ai/_next/static/chunks/chat-route.util-DIaoD1cB.js
 * Module: chat-route.util
 * Extracted & Beautified
 */

import { t as e } from "./site-route.interface-DlOSDxTR.js";
import { t } from "./locale-path.util-nU2-KrUb.js";
var n = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function r(e) { return n.test(e) }

function i(e) { let n = t(e).match(/^\/([^/?#]+)$/); return n ? n[1] : null }

function a(n) { return t(n) === e.BASE }

function o(e) { let t = i(e); return !!(t && r(t)) }

function s(t) { return t === e.PROJECT || t.startsWith(`${e.PROJECT}/`) }

function c(e) { return !!t(e).match(/^\/share\/([^/?#]+)$/)?.[1] }

function l(e) { let t = i(e); return !t || r(t) || t === `cookie-policy` ? !1 : /^[a-zA-Z0-9_-]+$/.test(t) && (/\d/
    .test(t) || t.length > 8) }

function u(e) { return a(e) || s(e) || o(e) || c(e) || l(e) }

function d(e) { let t = i(e); return !t || !r(t) ? null : t }

function f({ chatId: e, locale: t, rawPath: n, workspace: r }) { let i = n && /\/teams(?:\/|$)/.test(n) || r ===
    `organization` ? `/teams/${e}` : `/${e}`; return t && t !== `en` ? `/${t}${i}` : i }

function p({ locale: e }) { return e && e !== `en` ? `/${e}` : `/` }

function m(e, t) { if (a(e)) return !t; if (!o(e)) return !1; let n = d(e); return !t || n === t }

function h(e, t) { return e && !t }
export { h as a, u as i, p as n, m as o, d as r, f as t };
