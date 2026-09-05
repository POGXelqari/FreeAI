/**
 * Source: https://use.ai/_next/static/chunks/experiment.provider-CQRJZnpd.js
 * Module: experiment.provider
 * Extracted & Beautified
 */

import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n, r } from "./framework-D-uKrMmN.js";
import { i } from "./experiment-client.service-Dbg--_Jv.js";
var a = t({ ExperimentProvider: () => l, useExperimentValue: () => u, useExperimentValueSafe: () => d }),
  o = e(n(), 1),
  s = r(),
  c = (0, o.createContext)(void 0);

function l(e) { let { values: t, userId: n, signupDate: r, children: a } = e; return (0, o.useEffect)(() => { n && i(n,
      r) }, [n, r]), (0, s.jsx)(c.Provider, { value: { values: t, userId: n }, children: a }) }

function u(e, t = null) { let n = (0, o.useContext)(c); if (n === void 0) throw Error(
    `useExperimentValue must be used within an ExperimentProvider`); let r = n.values[e]; return r == null || r ===
    "default" ? t : r }

function d(e, t = null) { let n = (0, o.useContext)(c); if (n === void 0) return t; let r = n.values[e]; return r ==
    null || r === "default" ? t : r }
export { u as n, d as r, a as t };
