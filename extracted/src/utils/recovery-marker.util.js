/**
 * Source: https://use.ai/_next/static/chunks/recovery-marker.util-BHO296he.js
 * Module: recovery-marker.util
 * Extracted & Beautified
 */

var e = `auth.recovery.had-session`;

function t() { try { return window.localStorage.getItem(e) === `1` } catch { return !1 } }

function n(t) { try { t ? window.localStorage.setItem(e, `1`) : window.localStorage.removeItem(e) } catch {} }
export { n, t };
