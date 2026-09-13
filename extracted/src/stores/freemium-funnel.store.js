/**
 * Source: https://use.ai/_next/static/chunks/freemium-funnel.store-CpLcwrVv.js
 * Module: freemium-funnel.store
 * Extracted & Beautified
 */

import { n as e } from "./env-C6AULCj5.js";
import { m as t } from "./freemium-funnel.util-BsrrWeXM.js";
import { t as n } from "./react-D8-vnz5K.js";
import { t as r } from "./middleware-Df3VXbEU.js";
var i = `freemium-funnel-paywall-seen`,
  a = e => `${i}:${e??`guest`}`,
  o = n()(r((e, n) => ({ currentUserId: null, setFreemiumFunnelUserContext: n => { n && t.getItem(a(null)) === `1` && (t
        .setItem(a(n), `1`), t.removeItem(a(null))), e({ currentUserId: n }) },
markPaywallSeen: () => { let { currentUserId: e } = n();
      t.setItem(a(e), `1`) }, hasSeenPaywall: () => { let { currentUserId: e } = n(); return t.getItem(a(e)) ===
        `1` } }), { name: `FreemiumFunnelStore`, enabled: e.NEXT_PUBLIC_ENV !== `production` && !0 }));
export { o as t };
