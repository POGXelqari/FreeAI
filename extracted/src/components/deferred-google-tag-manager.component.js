/**
 * Source: https://use.ai/_next/static/chunks/deferred-google-tag-manager.component-COj0PWA3.js
 * Module: deferred-google-tag-manager.component
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { n as r } from "./gtm-DkKjcpHp.js";
var i = e(t(), 1),
  a = n();

function o(e) { let { gtmId: t, enableIdleFallback: n = !1 } = e, [o, s] = (0, i.useState)(!1); return (0, i.useEffect)(
      () => { let e = !1,
          t = () => { e || (e = !0, s(!0)) },
          r = [`pointerdown`, `keydown`, `touchstart`, `scroll`, `pointermove`]; for (let e of r) window
          .addEventListener(e, t, { once: !0, passive: !0 }); let i, a; return n && (typeof window
          .requestIdleCallback == `function` ? i = window.requestIdleCallback(t, { timeout: 4e3 }) : a = window
          .setTimeout(t, 3e3)), () => { for (let e of r) window.removeEventListener(e, t);
          i !== void 0 && window.cancelIdleCallback(i), a !== void 0 && window.clearTimeout(a) } }, [n]), o ? (0, a.jsx)
    (r, { gtmId: t }) : null }
export { o as DeferredGoogleTagManagerComponent };
