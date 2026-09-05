/**
 * Source: https://use.ai/_next/static/chunks/turnstile-RC_1-eVf.js
 * Module: turnstile
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { n as r } from "./env-C6AULCj5.js";
var i = `cf-turnstile-script`,
  a = `https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit`,
  o = null,
  s = () => window.location.hostname.endsWith(`.vercel.app`),
  c = () => !!r.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY && !s(),
  l = () => r.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ?? ``,
  u = () => window.turnstile ? Promise.resolve() : o || (o = new Promise((e, t) => { let n = document.getElementById(
    i); if (n) { n.addEventListener(`load`, () => e()), n.addEventListener(`error`, () => t(Error(
        `Failed to load Turnstile`))); return } let r = document.createElement(`script`);
    r.id = i, r.src = a, r.async = !0, r.defer = !0, r.onload = () => e(), r.onerror = () => t(Error(
      `Failed to load Turnstile`)), document.head.appendChild(r) }), o),
  d = e(t(), 1),
  f = n();

function p(e) { let { onVerify: t, onExpire: n, onError: r, onBeforeInteractive: i, action: a, theme: o = `auto`,
    size: s = `flexible`, appearance: p = `interaction-only`, className: m } = e, h = (0, d.useRef)(null), g = (0, d
    .useRef)(null), _ = (0, d.useEffectEvent)(e => t(e)), v = (0, d.useEffectEvent)(() => n?.()), y = (0, d
    .useEffectEvent)(() => r?.()), b = (0, d.useEffectEvent)(() => i?.()), x = c(); return (0, d.useEffect)(() => { if (
      !x) { _(``); return } let e = !1; return u().then(() => { e || !h.current || !window.turnstile || (g.current =
        window.turnstile.render(h.current, { sitekey: l(), action: a, theme: o, size: s, appearance: p,
          callback: e => _(e), "expired-callback": () => v(), "error-callback": () =>
        y(), "before-interactive-callback": () => b() })) }).catch(() => y()), () => { e = !0; let t = g.current;
      t && window.turnstile && window.turnstile.remove(t), g.current = null } }, [x, a, o, s, p]), x ? (0, f.jsx)(
    `div`, { className: m, ref: h }) : null }
export { c as n, u as r, p as t };
