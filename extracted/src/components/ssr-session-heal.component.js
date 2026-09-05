/**
 * Source: https://use.ai/_next/static/chunks/ssr-session-heal.component-DPW9j3td.js
 * Module: ssr-session-heal.component
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { et as n } from "./vinext-CqpRraGS.js";
import { t as r } from "./recovery-marker.util-BHO296he.js";
import { n as i } from "./better-auth-client-session.service-ercwbZKT.js";
import { n as a, t as o } from "./ssr-session-heal-cooldown.util-2TKQmNmV.js";
var s = e(t(), 1),
  c = e => { let { serverRenderedAuthed: t } = e, c = n(), l = i(), u = (0, s.useRef)(!1); return (0, s.useEffect)(
  () => { if (l.status !== `loading` && !u.current) { if (!l.isAuthenticated) { r() || (u.current = !
          0); return } if (t) { u.current = !0; return } o() || (u.current = !0, a(), c.refresh()) } }, [l.status, l
      .isAuthenticated, t, c
    ]), null };
export { c as default };
