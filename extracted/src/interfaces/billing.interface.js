/**
 * Source: https://use.ai/_next/static/chunks/billing.interface-DgJbHepV.js
 * Module: billing.interface
 * Extracted & Beautified
 */

import { n as e } from "./env-C6AULCj5.js";
var t = [`stripe_session_id`, `uk_stripe_session_id`, `ca_stripe_session_id`, `au_stripe_session_id`,
    `eu_stripe_session_id`
  ],
  n = `paypal_session_id`,
  r = `paypal_client_metadata_id`,
  i = `braintree_device_data`,
  a = { stripe_session_id: e.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_US || ``, uk_stripe_session_id: e
      .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_UK || ``, ca_stripe_session_id: e.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_CA || ``,
    au_stripe_session_id: e.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_AU || ``, eu_stripe_session_id: e
      .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_EU || `` };
export { t as a, a as i, r as n, n as r, i as t };
