/**
 * Source: https://use.ai/_next/static/chunks/use-traffic-detection.hook-DS84CRee.js
 * Module: use-traffic-detection.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { tt as n } from "./vinext-DaPQ-kLo.js";
import { c as r, d as i, p as a, u as o } from "./analytics.service-9oUGcSKY.js";
var s = e(t(), 1),
  c = () => { let e = n().toString(),
      t = o(e),
      c = Object.keys(t).length > 0;
    (0, s.useEffect)(() => { r(e) }, [e]); let l = c ? t : i(),
      u = a(l); return { trafficSource: u, isBingTraffic: u === `bing`, isGoogleTraffic: u === `google` } };
export { c as t };
