/**
 * Source: https://use.ai/_next/static/chunks/ensure-connector-registrations.service-DEA3kqyH.js
 * Module: ensure-connector-registrations.service
 * Extracted & Beautified
 */

const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["_next/static/chunks/register-loaders-DvDriqS9.js",
  "_next/static/chunks/vinext-DaPQ-kLo.js", "_next/static/chunks/rolldown-runtime-C0FnF6B9.js",
  "_next/static/chunks/framework-D-uKrMmN.js"
]))) => i.map(i => d[i]);
import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n } from "./framework-D-uKrMmN.js";
import { nt as r, rt as i } from "./vinext-DaPQ-kLo.js";
var a = t({ useEnsureConnectorRegistrations: () => _ }),
  o = e(n(), 1);
i();
var s = null,
  c = () => (s ??= r(() => import(`./register-loaders-DvDriqS9.js`).then(e => e.CONNECTOR_REGISTER_LOADERS),
    __vite__mapDeps([0, 1, 2, 3])), s),
  l = new Set,
  u = new Map,
  d = new Set,
  f = 0,
  p = () => { f += 1; for (let e of d) e() },
  m = e => (d.add(e), () => { d.delete(e) }),
  h = () => f,
  g = e => { let t = u.get(e); if (t) return t; let n = c().then(t => { let n = t[e]; if (!n) { l.add(
        e); return } return n().then(() => { l.add(e), p() }) }).catch(() => { u.delete(e) }); return u.set(e, n), n };

function _(e) { let t = (0, o.useSyncExternalStore)(m, h, h),
    n = [...e].sort().join(`,`); return (0, o.useEffect)(() => { for (let t of e) l.has(t) || g(t) }, [n]), t }
export { _ as n, a as t };
