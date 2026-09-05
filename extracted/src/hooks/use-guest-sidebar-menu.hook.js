/**
 * Source: https://use.ai/_next/static/chunks/use-guest-sidebar-menu.hook-D4ZKIqpw.js
 * Module: use-guest-sidebar-menu.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { P as n, _ as r, b as i, g as a, v as o } from "./analytics.service-BIbiLKmC.js";
import { p as s } from "./freemium-funnel.util-D0KPcbFz.js";
import { n as c } from "./user-data.provider-fGhNbbcZ.js";
import { n as l } from "./intl-5y7Gu4iP.js";
import { t as u } from "./auth.store-CecpbI3z.js";
import { t as d } from "./locale-path.util-nU2-KrUb.js";
import { n as f } from "./payment-modals.store-Ds_qXI-N.js";
import { t as p } from "./use-user.hook-DIvUDXD9.js";
import { n as m } from "./use-incognito-chat.hook-Dun56_qv.js";
var h = e(t(), 1),
  g = () => { let e = l(),
      t = e === `/`,
      d = new URLSearchParams(window.location.search),
      m = i() === n.IMAGE_GENERATION || !!o() || d.get(`image-landing`) === `true`,
      h = e.endsWith(`/images`),
      g = m || h,
      _ = i() === n.IMAGE_BG_REMOVAL || !!a() || d.get(`background-removal`) === `true`,
      v = e.endsWith(`/background-removal`),
      y = _ || v,
      b = i() === n.IMAGE_ENHANCER || !!r() || d.get(`image-enhancer`) === `true`,
      x = e.endsWith(`/image-enhancer`),
      S = b || x,
      { isAuthModalOpen: C } = u(),
      { isSelectPlanTrialModalOpen: w } = f(),
      { user: T } = p(),
      { userProfileWithSubscription: E } = c(),
      D = E.data?.data?.subscription,
      O = !T || T.type === `guest`,
      k = !O,
      A = D?.planType ?? null,
      j = D?.status ?? null,
      M = D?.isSubscribed ?? !1,
      N = k && (j === s.TRIAL || j === s.TRIAL_SCHEDULED_FOR_CANCELLATION),
      P = k && !M,
      F = k && M; return { isMainPage: t, isImageFunnelParam: m, isImageFunnelPage: h, isImageFunnel: g,
      isBgFunnelParam: _, isBgFunnelPage: v, isBgFunnel: y, isEnhancerFunnelParam: b, isEnhancerFunnelPage: x,
      isEnhancerFunnel: S, isAuthModalOpen: C, isPaywallModalOpen: w, isGuest: O, isFreeUser: P, isPaidUser: F,
      isTrialUser: N, isProUser: F && !N && A === `PRO`, isPowerUser: F && !N && A === `POWER` } },
  _ = () => { let { isGuest: e, isImageFunnel: t, isBgFunnel: n, isEnhancerFunnel: r } = g(), { isOnExistingChat: i,
      isOnMainPage: a } = m();
    l(); let o = d(window.location.pathname) || `/`,
      s = o?.startsWith(`/apps`),
      c = o?.startsWith(`/files`),
      f = o?.startsWith(`/pricing`),
      p = o === `/chat` || o?.startsWith(`/chat/`),
      _ = u(e => e.isPostAuthTransition),
      v = u(e => e.guestRailSnapshot),
      y = e,
      b = _ ? v ?? y : y; return (0, h.useEffect)(() => { _ || u.getState().setGuestRailSnapshot(y) }, [y,
    _]), { isEnabled: b && !!(a || i || t || n || r || p || s || c || f) } };
export { g as n, _ as t };
