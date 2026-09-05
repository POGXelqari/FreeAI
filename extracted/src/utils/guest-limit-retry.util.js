/**
 * Source: https://use.ai/_next/static/chunks/guest-limit-retry.util-B5MoFEDH.js
 * Module: guest-limit-retry.util
 * Extracted & Beautified
 */

import { m as e } from "./freemium-funnel.util-D0KPcbFz.js";
var t = `pending_guest_limit_retry`,
  n = 6e5,
  r = n => { let r = { chatId: n, createdAt: Date.now() };
    e.setItem(t, JSON.stringify(r)) },
  i = () => { e.removeItem(t) },
  a = (r = Date.now()) => { let a = e.getItem(t); if (!a) return null; let o = null; try { let e = JSON.parse(a); if (
        e && typeof e == `object`) { let t = e;
        typeof t.chatId == `string` && typeof t.createdAt == `number` && (o = { chatId: t.chatId, createdAt: t
            .createdAt }) } } catch {} return !o || r - o.createdAt > n ? (i(), null) : o.chatId },
  o = () => a() !== null;
export { a as i, o as n, r, i as t };
