/**
 * Source: https://use.ai/_next/static/chunks/input-Cn8pMAH2.js
 * Module: input
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { t as r } from "./utils-DBS9-MOh.js";
var i = e(t(), 1),
  a = n(),
  o = { fontSize: `16px`, zoom: .875 },
  s = i.forwardRef(({ className: e, type: t, startContent: n, isInvalid: i, errorMessage: s, dir: c, classNames: l,
    style: u, ...d }, f) => { let p = r(
        `flex h-[45.7143px] w-full rounded-[14px] border-[1.5px] bg-transparent text-ink-primary shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-ink-tertiary focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 outline-none ring-0 disabled:cursor-not-allowed disabled:opacity-50`,
        n ? c === `rtl` ? `pr-10 pl-3` : `pl-10 pr-3` : `px-3`, i ? `border-destructive` : `border-border`, l
        ?.inputWrapper, l?.input, e),
      m = (0, a.jsx)(`input`, { type: t, className: p, dir: c, ref: f, style: { ...o, ...u }, ...d }); return n ||
      s || l ? (0, a.jsxs)(`div`, { className: r(`w-full`, l?.base), children: [(0, a.jsxs)(`div`, { className: r(
            `relative flex w-full items-center`, l?.mainWrapper), children: [n && (0, a.jsx)(
          `div`, { className: r(`text-muted-foreground absolute flex items-center`, c === `rtl` ?
              `right-3` : `left-3`), children: n }), m] }), s && (0, a.jsx)(
        `p`, { className: `text-destructive mt-1 text-xs`, children: s })] }) : m });
s.displayName = `Input`;
export { s as t };
