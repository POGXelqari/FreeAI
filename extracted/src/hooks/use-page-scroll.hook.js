/**
 * Source: https://use.ai/_next/static/chunks/use-page-scroll.hook-DpmNgPID.js
 * Module: use-page-scroll.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
var n = e(t(), 1),
  r = `[data-landing-scroll-container]`,
  i = () => typeof document > `u` ? null : document.querySelector(r),
  a = () => i()?.scrollTop ?? window.scrollY,
  o = () => { let e = i(); if (e) { e.scrollTop = 0; return } window.scrollTo(0, 0) },
  s = e => {
    (0, n.useEffect)(() => (document.addEventListener(`scroll`, e, { capture: !0, passive: !0 }), () => document
      .removeEventListener(`scroll`, e, { capture: !0 })), [e]) };
export { o as n, s as r, a as t };
