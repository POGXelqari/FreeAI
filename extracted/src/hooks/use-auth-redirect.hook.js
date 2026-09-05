/**
 * Source: https://use.ai/_next/static/chunks/use-auth-redirect.hook-DywLfOjS.js
 * Module: use-auth-redirect.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { $ as n } from "./vinext-CqpRraGS.js";
import { n as r } from "./better-auth-client-session.service-ercwbZKT.js";
import { t as i } from "./report-client-error.util-Bq41AYxy.js";
import { n as a, r as o, t as s } from "./auth-redirect-context.util-DZvFX7LK.js";
import { o as c, r as l } from "./chat-route.util-DIaoD1cB.js";
var u = e(t(), 1),
  d = () => { let e = n(),
      { data: t, status: o } = r();
    (0, u.useEffect)(() => { if (o !== `authenticated` || !t?.user) return; let n = a(); if (!n?.authStarted)
    return; let r = l(e);
      n.originalChatId && r === n.originalChatId || (n.originalChatId && c(e) && r !== n.originalChatId ? i(Error(
        `Auth redirect failure: Redirected to different chat`), `render`) : n.originalChatId && !c(e, n
        .originalChatId) && i(Error(`Auth redirect failure: Not redirected to chat page`), `render`)), s() }, [e, t,
      o]) },
  f = (e, t) => {
    (0, u.useEffect)(() => { e && t && o(t) }, [e, t]) };
export { d as n, f as t };
