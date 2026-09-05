/**
 * Source: https://use.ai/_next/static/chunks/use-paywall-variant.experiment.hook-DCrzgpR5.js
 * Module: use-paywall-variant.experiment.hook
 * Extracted & Beautified
 */

import { a as e } from "./experiment-client.service-Dbg--_Jv.js";
import { h as t } from "./billing-CclPhhLo.js";
import { n, r } from "./experiment.provider-CQRJZnpd.js";
import "./client-DWC7O25X.js";
var i = `OFF`,
  a = r => { n(e.PAYWALL_VARIANT_V1, `OFF`); let a = i; return t({ experimentName: e.PAYWALL_VARIANT_V1,
      experimentValue: a, shouldTrack: !1 }), { variant: a, ui: `legacy`, pricing: `current`, isInExperiment: !1 } },
  o = () => (r(e.PAYWALL_VARIANT_V1, `OFF`), !1);
export { a as n, o as t };
