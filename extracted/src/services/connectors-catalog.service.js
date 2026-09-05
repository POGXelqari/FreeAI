/**
 * Source: https://use.ai/_next/static/chunks/connectors-catalog.service-C2W0ZTIl.js
 * Module: connectors-catalog.service
 * Extracted & Beautified
 */

import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n } from "./framework-D-uKrMmN.js";
import { nt as r, rt as i } from "./vinext-CqpRraGS.js";
var a = t({ getConnectorIndex: () => u, getConnectorIndexEntry: () => f, getDefaultsForConnector: () => m,
    getDisabledConnectorIds: () => p, getLoadedConnectorIndex: () => d, useConnectorIndex: () => h }),
  o = e(n(), 1);
i();
var s = null,
  c = null,
  l = null,
  u = () => (l ??= r(() => import(`./catalog-index-DIbCSLxk.js`).then(e => (s = e.CONNECTOR_INDEX, c = s.filter(e => e
    .disabled !== !0), c)), []), l),
  d = () => c,
  f = e => c?.find(t => t.id === e) ?? null,
  p = async () => (await u(), (s ?? []).filter(e => e.disabled === !0).map(e => e.id)), m = async e => { let t = (
      await u()).find(t => t.id === e); if (!t) return {}; let n = {}; for (let e of t.tools) n[e.slug] = e
      .category === `write` ? `ask` : `allow`; return n }, h = (e = !0) => { let [t, n] = (0, o.useState)(e ? c :
      null); return (0, o.useEffect)(() => { if (!e || t) return; let r = !1; return u().then(e => { r || n(e) }),
      () => { r = !0 } }, [e, t]), e ? t : null };
export { p as a, m as i, u as n, d as o, f as r, h as s, a as t };
