/**
 * Source: https://use.ai/_next/static/chunks/QueryClientProvider-DGxN9XtP.js
 * Module: QueryClientProvider
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
var r = e(t(), 1),
  i = n(),
  a = r.createContext(void 0),
  o = e => { let t = r.useContext(a); if (e) return e; if (!t) throw Error(
      `No QueryClient set, use QueryClientProvider to set one`); return t },
  s = ({ client: e, children: t }) => (r.useEffect(() => (e.mount(), () => { e.unmount() }), [e]), (0, i.jsx)(a
    .Provider, { value: e, children: t }));
export { o as n, s as t };
