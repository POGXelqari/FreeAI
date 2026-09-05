/**
 * Source: https://use.ai/_next/static/chunks/chat-model-cookie.util-BFNaMDUF.js
 * Module: chat-model-cookie.util
 * Extracted & Beautified
 */

import { t as e } from "./js.cookie-LuQ0sRX_.js";
import { t } from "./cookie.interface-BM92z_O9.js";
var n = { path: `/`, expires: 365, sameSite: `lax` },
  r = () => { e.remove(t.PINNED_CHAT_MODEL, { path: `/` }) },
  i = i => { if (r(), !i) { e.remove(t.CHAT_MODEL, { path: `/` }); return } e.set(t.CHAT_MODEL, i, { ...n,
      secure: globalThis.location?.protocol === `https:` }) },
  a = () => e.get(t.CHAT_MODEL),
  o = () => e.get(t.PINNED_CHAT_MODEL);
export { o as i, i as n, a as r, r as t };
