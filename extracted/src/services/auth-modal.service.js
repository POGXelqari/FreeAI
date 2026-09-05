/**
 * Source: https://use.ai/_next/static/chunks/auth-modal.service-Cqqf3TRB.js
 * Module: auth-modal.service
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { tt as n } from "./vinext-CqpRraGS.js";
import { I as r } from "./analytics.service-BIbiLKmC.js";
import { m as i } from "./freemium-funnel.util-D0KPcbFz.js";
import { i as a } from "./mixpanel-CkBALibP.js";
import { n as o } from "./user-data.provider-fGhNbbcZ.js";
import { t as s } from "./auth.store-CecpbI3z.js";
import { r as c } from "./raw-history.util-43z6flYk.js";
import { t as l } from "./use-history-backed-flag.hook-C0Nr0kvF.js";
var u = e(t(), 1),
  d = `authmodal`,
  f = 6e5,
  p = () => { let { isAuthModalOpen: e, authModalVariant: t, openSignInModal: p, openSignUpModal: m, closeAuthModal: h,
      switchToSignIn: g, switchToSignUp: _, signupModalSource: v, setSignupModalSource: y } = s(), { session: b } = o(),
      x = b.isAuthenticated, S = b.isPending, C = s(e => e.isPostAuthTransition), w = n()?.get(d), { requestClose: T,
        closeForNavigation: E } = l({ isOpen: e, onClose: h, paramKey: d }); return (0, u.useEffect)(() => { if (S ||
        new URLSearchParams(window.location.search).get(d) !== `true` || e || C) return; if (!x) { let e = Number(i
            .getItem(r.CustomAuthRedirectUrlStashedAt)),
          t = Number.isFinite(e) && Date.now() - e < f,
          n = t ? i.getItem(r.CustomAuthRedirectUrl) : null;
        t || (i.removeItem(r.CustomAuthRedirectUrl), i.removeItem(r.CustomAuthRedirectUrlStashedAt)), p(a.URL, n ??
          void 0); return } let t = new URL(window.location.href);
      t.searchParams.delete(d), c(window.history.state, t.toString()) }, [x, S, e, p, w, C]), (0, u.useEffect)(
    () => { if (!e && v) { let e = setTimeout(() => { y(null) }, 3e3); return () => { clearTimeout(e) } } }, [e, v,
      y]), { isOpen: e, currentVariant: t, onOpenChange: e => { e || T() }, openSignInModal: (e, t) => { p(e, t) },
      openSignUpModal: (e, t) => { m(e, t) }, closeModal: E, switchToSignIn: g, switchToSignUp: _,
      signupModalSource: v } };
export { p as t };
