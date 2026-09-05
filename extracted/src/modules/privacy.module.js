/**
 * Source: https://use.ai/_next/static/chunks/privacy.module-TZjAaQ17.js
 * Module: privacy.module
 * Extracted & Beautified
 */

import { r as e } from "./framework-D-uKrMmN.js";
import { t } from "./useQuery-B3vkDNet.js";
import { t as n } from "./queryOptions-Dfvzj6n2.js";
import { t as r } from "./rest-api-DNPFxXXP.js";
import { n as i } from "./react-client-DI5BViDH.js";
import { t as a } from "./skeleton-CQ_ju0jp.js";
import { t as o } from "./rich-text-renderer-BOt8oZqo.js";
import { n as s, t as c } from "./page.model-BtgmfPnr.js";
import { t as l } from "./react-client-CTfy1ioc.js";
var u = async e => { let t = await l(),
    n = await r.get(`${c.API_PAGES}/privacy?locale=${t}`, { signal: e.signal, next: { revalidate: 300 } })
  .json(); return n && typeof n == `object` && `error` in n ? null : n }, d = () => n({ queryKey: [s.PAGES_QUERY,
    `privacy`
  ], queryFn: e => u(e) }), f = () => t(d()), p = () => { let { data: e, isLoading: t } = f(); return { data: e,
    isLoading: t } }, m = e(), h = () => { let e = p(),
    t = i(`Privacy`); return (0, m.jsxs)(`div`, { className: `px-6 lg:px-8`, children: [(0, m.jsx)(
    `div`, { className: `container mx-auto max-w-5xl gap-4 px-0 pt-5 text-left sm:py-10`, children: (0, m
        .jsx)(`h1`, { className: `text-foreground text-left text-2xl font-semibold sm:text-5xl`,
        children: e.data?.title || t(`privacy_policy_title`) }) }), (0, m.jsx)(
    `div`, { className: `mx-auto max-w-5xl`, children: e.isLoading ? (0, m.jsx)(
      a, { className: `rounded-3xl`, children: (0, m.jsx)(
        `div`, { className: `flex flex-col gap-6 pb-16 sm:pt-8 lg:gap-10` }) }) : (0, m.jsx)(
      `div`, { className: `flex flex-col gap-6 pb-16 sm:pt-8 lg:gap-10`, children: (0, m.jsx)(
        o, { content: e.data?.content }) }) })] }) };
export { h as default };
