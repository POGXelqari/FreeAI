/**
 * Source: https://use.ai/_next/static/chunks/use-paywall-variant.experiment.hook-Dj0GQmjq.js
 * Module: use-paywall-variant.experiment.hook
 * Extracted & Beautified
 */

import { a as e } from "./experiment-client.service-CXqfLU-5.js";
import { n as t, r as n } from "./experiment.provider-BEhampe0.js";
import "./client-BL58m4Hx.js";
import { t as r } from "./use-track-experiment-view.hook-D5ID5Wj0.js";
var i = `OFF`,
  a = n => { t(e.PAYWALL_VARIANT_V1, `OFF`); let a = i; return r({ experimentName: e.PAYWALL_VARIANT_V1,
      experimentValue: a, shouldTrack: !1 }), { variant: a, ui: `legacy`, pricing: `current`, isInExperiment: !1 } },
  o = () => (n(e.PAYWALL_VARIANT_V1, `OFF`), !1);
export { a as n, o as t };
