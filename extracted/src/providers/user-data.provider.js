/**
 * Source: https://use.ai/_next/static/chunks/user-data.provider-fGhNbbcZ.js
 * Module: user-data.provider
 * Extracted & Beautified
 */

import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n, r } from "./framework-D-uKrMmN.js";
var i = t({ default: () => l, useUserData: () => c }),
  a = e(n(), 1),
  o = r(),
  s = (0, a.createContext)(null),
  c = () => { let e = (0, a.useContext)(s); if (!e) throw Error(
    `useUserData must be used within a UserDataProvider`); return e },
  l = e => { let { value: t, children: n } = e; return (0, o.jsx)(s.Provider, { value: t, children: n }) };
export { c as n, i as r, l as t };
