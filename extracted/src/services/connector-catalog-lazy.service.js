/**
 * Source: https://use.ai/_next/static/chunks/connector-catalog-lazy.service-BSf-5rRs.js
 * Module: connector-catalog-lazy.service
 * Extracted & Beautified
 */

import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n } from "./framework-D-uKrMmN.js";
import { nt as r, rt as i } from "./vinext-CqpRraGS.js";
import { a } from "./connectors-catalog.service-C2W0ZTIl.js";
var o = t({ getConnectorCatalog: () => l, getConnectorFull: () => u, useConnectorCatalog: () => d }),
  s = e(n(), 1);
i();
var c = null,
  l = () => (c ??= Promise.all([r(() => import(`./catalog-Cf5YZoR-.js`).then(e => e.CONNECTORS), []), a()]).then(([e,
    t]) => { let n = new Set(t); return e.filter(e => !n.has(e.id)) }), c),
  u = async e => (await l()).find(t => t.id === e) ?? null, d = (e = !0) => { let [t, n] = (0, s.useState)([]); return (
      0, s.useEffect)(() => { if (!e) return; let t = !1; return l().then(e => { t || n(e) }), () => { t = !0 } }, [
      e
    ]), e ? t : [] };
export { u as n, d as r, o as t };
