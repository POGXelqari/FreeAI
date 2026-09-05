/**
 * Source: https://use.ai/_next/static/chunks/raw-history.util-43z6flYk.js
 * Module: raw-history.util
 * Extracted & Beautified
 */

import { U as e, V as t } from "./vinext-CqpRraGS.js";
var n = new Set,
  r = e => (n.add(e), () => { n.delete(e) }),
  i = e => { for (let t of n) t(e) },
  a = (e, n) => { t(e, ``, n), i(n) },
  o = (t, n) => { e(t, ``, n), i(n) };
export { a as n, o as r, r as t };
