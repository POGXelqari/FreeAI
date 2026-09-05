/**
 * Source: https://use.ai/_next/static/chunks/connector-search-input.component-DgBAGGEg.js
 * Module: connector-search-input.component
 * Extracted & Beautified
 */

import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n, r } from "./framework-D-uKrMmN.js";
import { t as i } from "./search-9wRnUxym.js";
import { t as a } from "./x-DWv_kCKr.js";
import { n as o } from "./react-client-DI5BViDH.js";
import { t as s } from "./analytics.service-BIbiLKmC.js";
import { a as c } from "./mixpanel-CkBALibP.js";
import { t as l } from "./utils-DBS9-MOh.js";
import { t as u } from "./input-Cn8pMAH2.js";
var d = t({ ConnectorSearchInput: () => m }),
  f = e(n(), 1),
  p = r(),
  m = (0, f.memo)(e => { let { value: t, onChange: n, hasResults: r, className: d } = e, m = o(`Connectors`), h = (0, f
      .useRef)(r), g = (0, f.useRef)(null);
    (0, f.useEffect)(() => { h.current = r }, [r]), (0, f.useEffect)(() => () => { g.current !== null && window
        .clearTimeout(g.current) }, []); let _ = (0, f.useCallback)(e => { n(e), g.current !== null && window
          .clearTimeout(g.current); let t = e.trim();
        t.length !== 0 && (g.current = window.setTimeout(() => { s.track(c.CONNECTOR_SEARCH, { search: t,
            has_results: h.current }), g.current = null }, 1e3)) }, [n]),
      v = (0, f.useCallback)(() => { g.current !== null && (window.clearTimeout(g.current), g.current = null), n(
          ``) }, [n]); return (0, p.jsxs)(`div`, { className: l(`relative`, d), children: [(0, p.jsx)(
      u, { "aria-label": m(`search_placeholder`),
        className: `border-border rounded-xl border-[0.5714px] py-3 pr-6 dark:border-zinc-600`,
        onChange: e => _(e.target.value), placeholder: m(`search_placeholder`), startContent: (0, p.jsx)(
        i, { className: `h-4 w-4 text-gray-400` }), type: `text`, value: t }), t.length > 0 && (0, p.jsx)(
        `button`, { "aria-label": m(`search_clear`),
          className: `text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 transition-colors`,
          onClick: v, type: `button`, children: (0, p.jsx)(a, { className: `h-4 w-4` }) })] }) });
m.displayName = `ConnectorSearchInput`;
export { d as n, m as t };
