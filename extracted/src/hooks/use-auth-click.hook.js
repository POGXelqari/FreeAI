/**
 * Source: https://use.ai/_next/static/chunks/use-auth-click.hook-BHhXr5wJ.js
 * Module: use-auth-click.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { n } from "./better-auth-client-session.service-ercwbZKT.js";
import { t as r } from "./auth.store-CecpbI3z.js";
var i = e(t(), 1);

function a(e) { let { source: t, requireAuth: a = !0 } = e, { data: o, isPending: s } = n(), c = !!o?.user && o?.user
    ?.type !== `guest`; return { handleClick: (0, i.useCallback)(e => {!a || c ? e?.() : r.getState().openSignInModal(
        t) }, [c, a, t]), isAuthenticated: c, isPending: s } }
export { a as t };
