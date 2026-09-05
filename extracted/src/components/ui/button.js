/**
 * Source: https://use.ai/_next/static/chunks/button-B7ERdP8H.js
 * Module: button
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { r } from "./bundle-mjs-cJTHqqzI.js";
import { t as i } from "./loader-circle-C38mqwuC.js";
import { t as a } from "./dist-DKq-7tPa.js";
import { t as o } from "./utils-DBS9-MOh.js";
var s = e => typeof e == `boolean` ? `${e}` : e === 0 ? `0` : e,
  c = r,
  l = (e, t) => n => { if (t?.variants == null) return c(e, n?.class, n?.className); let { variants: r,
      defaultVariants: i } = t, a = Object.keys(r).map(e => { let t = n?.[e],
          a = i?.[e]; if (t === null) return null; let o = s(t) || s(a); return r[e][o] }), o = n && Object.entries(n)
      .reduce((e, t) => { let [n, r] = t; return r === void 0 || (e[n] = r), e }, {}); return c(e, a, t
      ?.compoundVariants?.reduce((e, t) => { let { class: n, className: r, ...a } = t; return Object.entries(a).every(
          e => { let [t, n] = e; return Array.isArray(n) ? n.includes({ ...i, ...o } [t]) : { ...i, ...o } [t] ===
              n }) ? [...e, n, r] : e }, []), n?.class, n?.className) },
  u = e(t(), 1),
  d = n(),
  f = l(
    `inline-flex items-center justify-center gap-2 whitespace-nowrap text-ink-primary rounded-md text-sm font-medium cursor-pointer select-none appearance-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [-webkit-tap-highlight-color:transparent]`, { variants: { variant: { accent: `bg-accent text-ink-white font-semibold hover:bg-accent-active disabled:opacity-60`, "accent-opacity": `bg-accent-container text-accent rounded-full hover:opacity-80 disabled:opacity-60`,
          cta: `bg-surface-primary text-ink-cta hover:opacity-90 disabled:opacity-60`,
          outline: `border border-border bg-transparent hover:border-border-active hover:bg-surface-tertiary dark:border-zinc-600 dark:hover:bg-zinc-800 disabled:opacity-60`,
          ghost: `rounded-full hover:bg-surface-tertiary dark:hover:bg-gray-100/10 disabled:opacity-60`,
          chip: `border border-border bg-transparent text-foreground hover:bg-gray-100 dark:border-zinc-600 dark:hover:bg-zinc-800 disabled:opacity-60`,
          destructive: `border border-error bg-transparent text-error hover:bg-error-container disabled:opacity-60`,
          destructiveFilled: `bg-error text-ink-white hover:bg-error-active disabled:opacity-60` },
        size: { default: `h-10 rounded-[14px] px-4`, md: `h-9 rounded-[12px] px-4`,
          sm: `h-8 rounded-[10px] px-3 text-xs`, row: `h-8 rounded-[10px] px-2 font-normal`,
          icon: `h-9 w-9 rounded-full`, chip: `h-9 rounded-full px-4 text-sm` } }, defaultVariants: { size: `default`,
        variant: `cta` } }),
  p = e => e ? (0, d.jsx)(
  `span`, { className: `inline-flex shrink-0 items-center justify-center [&_svg]:shrink-0 [&_svg:not([class*='h-'])]:h-4 [&_svg:not([class*='w-'])]:w-4`,
    children: e }) : null,
  m = u.forwardRef(({ className: e, variant: t, size: n, asChild: r = !1, startIcon: s, endIcon: c, children: l,
    loading: u, disabled: m, tightWidth: h, ...g }, _) => { let v = r ? a : `button`; return r ? (0, d.jsx)(
      v, { className: o(f({ variant: t, size: n, className: e })), ref: _, ...g, children: l }) : !h && n !== `icon` ?
      (0, d.jsxs)(v, { className: o(f({ variant: t, size: n, className: e }), !u && !s && `px-7`), ref: _,
        disabled: m || u, ...g, children: [u ? (0, d.jsx)(i, { className: `h-4 w-4 shrink-0 animate-spin` }) : p(s),
          l, p(c)
        ] }) : (0, d.jsxs)(v, { className: o(f({ variant: t, size: n, className: e })), ref: _, disabled: m, ...g,
        children: [p(s), l, p(c)] }) });
m.displayName = `Button`;
export { f as n, l as r, m as t };
