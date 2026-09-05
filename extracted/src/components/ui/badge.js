/**
 * Source: https://use.ai/_next/static/chunks/badge-fH5lAmij.js
 * Module: badge
 * Extracted & Beautified
 */

import "./rolldown-runtime-C0FnF6B9.js";
import { i as e, r as t } from "./framework-D-uKrMmN.js";
import { r as n } from "./button-B7ERdP8H.js";
import { t as r } from "./utils-DBS9-MOh.js";
e();
var i = t(),
  a = n(
  `inline-flex items-center rounded-full px-2 py-0 font-normal text-xs leading-normal transition-colors`, { variants: { variant: { default: `border border-border bg-transparent text-gray-600 dark:border-zinc-600 dark:text-gray-300`,
        ghost: `border-transparent bg-background text-gray-600 dark:text-gray-300`,
        success: `border-transparent bg-success-bg text-success`,
        warning: `border-transparent bg-warning-bg text-warning`,
        primary: `border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80`,
        secondary: `border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80`,
        destructive: `border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80`,
        outline: `border-transparent text-foreground`,
        accent: `border-transparent bg-blue-50 text-accent dark:bg-blue-950/30`, "accent-bordered": `border border-accent bg-blue-50 text-accent dark:bg-blue-950/30` } },
    defaultVariants: { variant: `default` } }),
  o = e => { let { className: t, variant: n, ...o } = e; return (0, i.jsx)(`div`, { className: r(a({ variant: n }), t),
      ...o }) };
export { o as t };
