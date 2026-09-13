/**
 * Source: https://use.ai/_next/static/chunks/connectors-page-skeleton.component-JxQ-9y1C.js
 * Module: connectors-page-skeleton.component
 * Extracted & Beautified
 */

import { r as e } from "./rolldown-runtime-C0FnF6B9.js";
import { r as t } from "./framework-D-uKrMmN.js";
import { t as n } from "./search-9wRnUxym.js";
import { n as r } from "./react-client-DI5BViDH.js";
import { n as i } from "./user-data.provider-D1zgVZeU.js";
import { t as a } from "./connectors-list-skeletons-BzT4K5F7.js";
import { t as o } from "./mobile-page-header.component-DQQwDZPR.js";
import "./mobile-page-header-DIZSnpWv.js";
var s = e({ default: () => l }),
  c = t(),
  l = () => { let e = r(`Connectors`),
      { userProfileWithSubscription: t } = i(),
      s = t.data !== void 0; return (0, c.jsxs)(c.Fragment, { children: [(0, c.jsx)(
        `div`, { className: `mobile:block hidden shrink-0`, children: (0, c.jsx)(o, {}) }), !s && (0, c.jsx)(
          `div`, { "aria-hidden": !0,
            className: `hidden h-[60px] w-full shrink-0 [@media(min-width:650px)_and_(min-height:650px)]:block` }
          ), (0, c.jsx)(`div`, { className: `min-h-0 flex-1 [scrollbar-gutter:stable] overflow-y-auto`,
          children: (0, c.jsxs)(
            `div`, { className: `desktop:pt-16 desktop:pb-[calc(2.5rem+var(--cookie-banner-offset,0px))] mx-auto w-full max-w-4xl px-4 pt-8 pb-[calc(1.25rem+var(--cookie-banner-offset,0px))]`,
              children: [(0, c.jsx)(
              `div`, { className: `desktop:hidden mb-3 flex w-full flex-col items-center text-center`,
                children: (0, c.jsx)(
                `h1`, { className: `text-h1 text-ink-primary font-semibold tracking-tight`,
                  children: e(`page_title_apps`) }) }), (0, c.jsxs)(
              `div`, { className: `flex flex-col gap-3`, children: [(0, c.jsxs)(
                `div`, { className: `desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-4 flex flex-col pb-8`,
                  children: [(0, c.jsx)(`div`, { className: `desktop:block hidden min-w-0 flex-1`,
                    children: (0, c.jsx)(
                    `h1`, { className: `text-h1 text-ink-primary font-semibold tracking-tight`,
                      children: e(`page_title_apps`) }) }), (0, c.jsx)(
                  `div`, { className: `desktop:max-w-xs desktop:shrink-0 w-full`,
                    children: (0, c.jsxs)(
                      `div`, { className: `border-border flex h-10 w-full items-center gap-2 rounded-xl border-[0.5714px] px-3 dark:border-zinc-600`,
                        children: [(0, c.jsx)(
                        n, { className: `h-4 w-4 shrink-0 text-gray-400` }), (0, c
                          .jsx)(`span`, { className: `text-ink-tertiary text-b1`,
                          children: e(`search_placeholder`) })] }) })] }), (0, c.jsx)(a, {})] })] }) })
      ] }) };
export { s as n, l as t };
