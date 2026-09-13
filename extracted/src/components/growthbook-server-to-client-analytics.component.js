/**
 * Source: https://use.ai/_next/static/chunks/growthbook-server-to-client-analytics.component-Cu96U1ei.js
 * Module: growthbook-server-to-client-analytics.component
 * Extracted & Beautified
 */

import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n, r } from "./framework-D-uKrMmN.js";
import { n as i } from "./experiment-client.service-CXqfLU-5.js";
import { t as a } from "./analytics.service-9oUGcSKY.js";
var o = t({ GrowthBookServerToClientAnalyticsAll: () => f }),
  s = e(n(), 1),
  c = r(),
  l = new Set;

function u(e) { if (l.has(e)) return !0; let t = localStorage.getItem(`ab-${e}`); return t !== null && t !== `` }

function d(e, t) { return !!(e && t != null && !u(e)) }
var f = e => { let { experimentKeys: t, variationKeys: n } = e, r = (0, s.useRef)(!1); return (0, s.useEffect)(() => { r
      .current || t.length === 0 || Object.keys(n).length === 0 || (r.current = !0, (async () => { await a
          .waitForInitialization(); let e = i();
        t.forEach(t => { let r = n[t],
            i = e.isOn(t);
          d(t, r) && i && (localStorage.setItem(`ab-${t}`, r?.toString() || ``), l.add(t), window
            .dispatchEvent(new CustomEvent(`ab-${t}-change`))) }) })()) }, [t, n]), (0, c.jsx)(c.Fragment, {}) };
export { o as t };
