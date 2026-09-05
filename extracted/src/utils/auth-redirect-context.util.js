/**
 * Source: https://use.ai/_next/static/chunks/auth-redirect-context.util-DZvFX7LK.js
 * Module: auth-redirect-context.util
 * Extracted & Beautified
 */

var e = `auth_redirect_tracking`,
  t = t => { let n = { originalChatId: t, timestamp: Date.now(), authStarted: !0 };
    sessionStorage.setItem(e, JSON.stringify(n)) },
  n = () => { try { let t = sessionStorage.getItem(e); if (!t) return null; let n = JSON.parse(t),
        r = Date.now() - 6e5; return n.timestamp < r ? (sessionStorage.removeItem(e), null) :
    n } catch { return null } },
  r = () => { sessionStorage.removeItem(e) };
export { n, t as r, r as t };
