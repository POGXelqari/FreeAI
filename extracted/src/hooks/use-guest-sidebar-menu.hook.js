/**
 * Source: https://use.ai/_next/static/chunks/use-guest-sidebar-menu.hook-YCGK8tSI.js
 * Module: use-guest-sidebar-menu.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { P as n, _ as r, b as i, g as a, v as o } from "./analytics.service-9oUGcSKY.js";
import { p as s } from "./freemium-funnel.util-BsrrWeXM.js";
import { n as c } from "./intl-CED8MIZm.js";
import { t as l } from "./auth.store-DeUNDeDH.js";
import { t as u } from "./locale-path.util-nU2-KrUb.js";
import { n as d } from "./payment-modals.store-Bak_UFLs.js";
import { n as f } from "./user-data.provider-D1zgVZeU.js";
import { t as p } from "./use-user.hook-C0ENPFwj.js";
import { n as m } from "./use-incognito-chat.hook-D4pEi9zH.js";
var h = e(t(), 1),
  g = () => { let e = c(),
      t = e === `/`,
      u = new URLSearchParams(window.location.search),
      m = i() === n.IMAGE_GENERATION || !!o() || u.get(`image-landing`) === `true`,
      h = e.endsWith(`/images`),
      g = m || h,
      _ = i() === n.IMAGE_BG_REMOVAL || !!a() || u.get(`background-removal`) === `true`,
      v = e.endsWith(`/background-removal`),
      y = _ || v,
      b = i() === n.IMAGE_ENHANCER || !!r() || u.get(`image-enhancer`) === `true`,
      x = e.endsWith(`/image-enhancer`),
      S = b || x,
      { isAuthModalOpen: C } = l(),
      { isSelectPlanTrialModalOpen: w } = d(),
      { user: T } = p(),
      { userProfileWithSubscription: E } = f(),
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
    c(); let o = u(window.location.pathname) || `/`,
      s = o?.startsWith(`/apps`),
      d = o?.startsWith(`/files`),
      f = o?.startsWith(`/pricing`),
      p = o === `/chat` || o?.startsWith(`/chat/`),
      _ = l(e => e.isPostAuthTransition),
      v = l(e => e.guestRailSnapshot),
      y = e,
      b = _ ? v ?? y : y; return (0, h.useEffect)(() => { _ || l.getState().setGuestRailSnapshot(y) }, [y,
    _]), { isEnabled: b && !!(a || i || t || n || r || p || s || d || f) } };
export { g as n, _ as t };
