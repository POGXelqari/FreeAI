/**
 * Source: https://use.ai/_next/static/chunks/use-root-chat-url-sync.hook-CepHUWpO.js
 * Module: use-root-chat-url-sync.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { Q as n } from "./vinext-DaPQ-kLo.js";
import { n as r } from "./better-auth-client-session.service-1Lowatea.js";
import { r as i } from "./analytics.service-9oUGcSKY.js";
import { m as a } from "./freemium-funnel.util-BsrrWeXM.js";
import { t as o } from "./safe-session-storage.util-DN4NSHVM.js";
import { n as s, t as c } from "./raw-history.util-BleUn4RV.js";
import { t as l } from "./use-incognito-chat.hook-D4pEi9zH.js";
var u = e(t(), 1),
  d = e => { let t = o.getItem(e); if (!t) return null; try { return JSON.parse(t) } catch { return null } };

function f(e) { let t = { pathname: window.location.pathname, stage: `armed` };
  o.setItem(e, JSON.stringify(t)) }

function p(e, t = !0) {
  (0, u.useEffect)(() => { if (!t) return; let n = window.location.pathname,
      r = c(e => { n = new URL(e, `http://x`).pathname }),
      i = () => { let t = n,
          r = window.location.pathname; if (n = r, t === r) return; let i = d(e);
        i && r !== i.pathname && (i.stage === `crossed` ? o.removeItem(e) : o.setItem(e, JSON.stringify({ pathname: r,
          stage: `crossed` })), window.location.reload()) }; return window.addEventListener(`popstate`, i),
  () => { window.removeEventListener(`popstate`, i), r() } }, [e, t]) }
var m = `hasSentFirstMessage`;

function h({ chatExists: e, messageCount: t }) { let { isAuthenticated: n, isPending: i } = r(), o = (0, u.useRef)(!1);
  (0, u.useEffect)(() => { o.current || i || n || e || t === 0 || (o.current = !0, a.setItem(m, `true`)) }, [n, i, e,
    t]) }
var g = `guest_funnel_boundary`;

function _({ chatId: e, chatExists: t, messageCount: r, hasSentLocally: a }) { let o = n(),
    c = (0, u.useRef)(!1);
  (0, u.useEffect)(() => { c.current = !1 }, [e]), (0, u.useEffect)(() => { if (c.current || t || r === 0 || !a || l())
      return; let n = window.location.pathname; if (/\/project\//.test(n) || n.includes(e)) return;
    c.current = !0; let u = o?.locale,
      d = typeof u == `string` && u !== `en` ? `/${u}/${e}` : `/${e}`,
      p = new URLSearchParams,
      m = new URLSearchParams(window.location.search); for (let e of i) { let t = m.get(e);
      t !== null && p.set(e, t) } let h = p.toString();
    s({}, h ? `${d}?${h}` : d), f(g) }, [e, t, r, a, o?.locale]) }
export { f as a, h as i, _ as n, p as o, m as r, g as t };
