/**
 * Source: https://use.ai/_next/static/chunks/no-trial-initializer.component-Vwmae8A0.js
 * Module: no-trial-initializer.component
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
var n = e(t(), 1),
  r = `no_trial_flow`;

function i() { return (0, n.useEffect)(() => { if (globalThis.window) try { let e = new URL(globalThis.window.location
          .href),
        t = (e.searchParams.get(`no-trial`) || ``).toLowerCase(); if (t === `yes`) { sessionStorage.setItem(r,
          `yes`); return } sessionStorage.getItem(r) === `yes` && t !== `yes` && (e.searchParams.set(`no-trial`,
        `yes`), globalThis.history.replaceState({}, ``, e.toString())) } catch {} }, []), null }
export { i as NoTrialInitializerComponent };
