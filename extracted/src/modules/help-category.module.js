/**
 * Source: https://use.ai/_next/static/chunks/help-category.module-D2gGNSYn.js
 * Module: help-category.module
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { Q as r } from "./vinext-DaPQ-kLo.js";
import { t as i } from "./useQuery-BgSNoQ7j.js";
import { t as a } from "./queryOptions-Dfvzj6n2.js";
import { t as o } from "./rest-api-BL5a3YVm.js";
import { t as s } from "./circle-question-mark-C060llBg.js";
import { t as c } from "./search-9wRnUxym.js";
import { n as l } from "./react-client-DI5BViDH.js";
import { t as u } from "./intl-CED8MIZm.js";
import { t as d } from "./input-Cn8pMAH2.js";
import { t as f } from "./use-help-href.hook-vPkLpzXv.js";
import { t as p } from "./react-client-CTfy1ioc.js";
import { n as m, r as h, t as g } from "./help.model-AUjRNMGX.js";
import { n as _, t as v } from "./card-DTfbhj7q.js";
var y = e(t(), 1),
  b = async (e, t) => { let n = await p(); return (await o.get(
      `${g.API_HELP_ARTICLES_BY_CATEGORY}/${t}?locale=${n}`, { signal: e.signal, next: { revalidate: 300 } })
    .json())?.docs ?? [] }, x = e => a({ queryKey: [m.HELP_ARTICLES_BY_CATEGORY_QUERY, e], queryFn: t => b(t, e),
    enabled: !!e }), S = e => i(x(e)), C = async (e, t) => { let n = await p(); return (await o.get(
        `${g.API_HELP_CATEGORY_LIST}?locale=${n}`, { signal: e.signal, next: { revalidate: 300 } }).json())?.docs
      ?.find(e => e.slug === t) ?? null }, w = e => a({ queryKey: [m.HELP_CATEGORY_BY_SLUG_QUERY, e], queryFn: t =>
      C(t, e), enabled: !!e }), T = e => i(w(e)), E = () => { let e = r()?.slug,
      [t, n] = (0, y.useState)(``),
      { data: i, isLoading: a } = T(e),
      { data: o, isLoading: s } = S(i?.slug || ``); return { category: i, articles: (0, y.useMemo)(() => { if (!o)
          return []; if (!t.trim()) return o; let e = t.toLowerCase(); return o.filter(t => t.title
        .toLowerCase().includes(e) || t.excerpt?.toLowerCase().includes(e)) }, [o, t]), searchQuery: t,
      setSearchQuery: n, isLoading: a || s } }, D = n(), O = () => { let e = E(),
      t = l(`Help`),
      n = f(); return e.category ? (0, D.jsxs)(D.Fragment, { children: [(0, D.jsx)(h, { title: e.category.name }), e
        .category.description && (0, D.jsx)(`p`, { className: `text-default-600 mb-6 text-lg`, children: e
            .category.description }), (0, D.jsx)(`div`, { className: `mb-8`, children: (0, D.jsx)(
          d, { className: `max-w-md text-sm placeholder:text-sm`, onChange: t => e.setSearchQuery(t
              .target.value), placeholder: t(`help_search_placeholder`, { category: e.category.name }),
            startContent: (0, D.jsx)(c, { className: `text-default-400 h-4 w-4` }), type: `text`,
            value: e.searchQuery }) }), (0, D.jsx)(`div`, { children: e.articles.length > 0 ? (0, D.jsx)(
            `div`, { className: `grid grid-cols-1 gap-4 md:grid-cols-2`, children: e.articles.map(e => (0,
                D.jsx)(v, { className: `dark:border-border w-full`, children: (0, D.jsxs)(
                _, { className: `p-6`, children: [(0, D.jsx)(u, { href: n(
                      `/help/article/${e.slug}`), children: (0, D.jsx)(
                    `h3`, { className: `text-foreground mb-2 text-lg font-medium hover:underline`,
                      children: e.title }) }), e.excerpt && (0, D.jsx)(
                  `p`, { className: `text-default-600 mb-3`, children: e.excerpt }), (0, D
                    .jsx)(`div`, { className: `flex items-center justify-between`,
                    children: (0, D.jsx)(u, { className: `text-sm font-medium`, href: n(
                            `/help/article/${e.slug}`), children: t(
                          `help_read_article`) }) })] }) }, e.id)) }) : (0, D.jsxs)(
          `div`, { className: `py-12 text-center`, children: [(0, D.jsx)(
            `div`, { className: `text-default-400 mx-auto mb-4 h-16 w-16`, children: (0, D.jsx)(
              s, { className: `h-full w-full` }) }), (0, D.jsx)(
            `h3`, { className: `text-foreground mb-2 text-lg font-medium`, children: t(
                `help_no_articles_found`) }), (0, D.jsx)(`p`, { className: `text-default-600`,
              children: t(`help_no_articles_yet`) })] }) })
      ] }) : null };
export { O as default };
