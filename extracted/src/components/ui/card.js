/**
 * Source: https://use.ai/_next/static/chunks/card-DTfbhj7q.js
 * Module: card
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { t as r } from "./utils-DBS9-MOh.js";
var i = e(t(), 1),
  a = n(),
  o = i.forwardRef(({ className: e, ...t }, n) => (0, a.jsx)(`div`, { ref: n, className: r(
      `bg-card text-card-foreground relative rounded-xl border shadow`, e), ...t }));
o.displayName = `Card`;
var s = i.forwardRef(({ className: e, ...t }, n) => (0, a.jsx)(`div`, { ref: n, className: r(
    `flex flex-col space-y-1.5 p-6`, e), ...t }));
s.displayName = `CardHeader`;
var c = i.forwardRef(({ className: e, ...t }, n) => (0, a.jsx)(`div`, { ref: n, className: r(
    `leading-none font-semibold tracking-tight`, e), ...t }));
c.displayName = `CardTitle`;
var l = i.forwardRef(({ className: e, ...t }, n) => (0, a.jsx)(`div`, { ref: n, className: r(
    `text-muted-foreground text-sm`, e), ...t }));
l.displayName = `CardDescription`;
var u = i.forwardRef(({ className: e, ...t }, n) => (0, a.jsx)(`div`, { ref: n, className: r(`p-6 pt-0`, e), ...t }));
u.displayName = `CardContent`;
var d = i.forwardRef(({ className: e, ...t }, n) => (0, a.jsx)(`div`, { ref: n, className: r(
    `flex items-center p-6 pt-0`, e), ...t }));
d.displayName = `CardFooter`;
export { u as n, s as r, o as t };
