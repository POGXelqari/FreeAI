/**
 * Source: https://use.ai/_next/static/chunks/analytics-hooks.service-fJFOoVJi.js
 * Module: analytics-hooks.service
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { h as n, t as r } from "./analytics.service-BIbiLKmC.js";
import { a as i, r as a } from "./mixpanel-CkBALibP.js";
import { r as o } from "./is-mobile.service-c24xKO50.js";
var s = e(t(), 1),
  c = (e, t, n) => { let a = (0, s.useRef)(!1);
    (0, s.useEffect)(() => { n && t && e && !a.current && (r.track(i.CHAT_PAGE_VIEWED, { user_id: t.id || null,
        current_model: e }), a.current = !0) }, [e, t, n]) },
  l = e => { let t = o(); return { trackPaywallViewed: (0, s.useCallback)((o, s) => { let c = n(),
          l = s || a.TRIAL;
        r.track(i.PAYWALL_VIEWED, { user_id: r.getAnalyticsProperty().user_id || null, paywall_variant: o,
          source: c, paywall_source: l, screenWidth: window.innerWidth, isMobile: t, team_id: e }) }, [t, e]) } },
  u = e => { let t = o(); return { trackPaywallClosed: (0, s.useCallback)((o, s) => { let c = n(),
          l = s || a.TRIAL;
        r.track(i.PAYWALL_CLOSED, { user_id: r.getAnalyticsProperty().user_id || null, paywall_variant: o,
          source: c, paywall_source: l, screenWidth: window.innerWidth, isMobile: t, team_id: e }) }, [t, e]) } },
  d = () => { let e = o(); return { trackUpgradeModalViewed: (0, s.useCallback)((t, n, a) => { r.track(i
          .UPGRADE_MODAL_VIEWED, { user_id: r.getAnalyticsProperty().user_id || null, source: t, current_plan: n,
            target_plan: a, screenWidth: window.innerWidth, isMobile: e }) }, [e]) } },
  f = () => ({ trackUpgradeModalClosed: (0, s.useCallback)(() => { r.track(i.UPGRADE_MODAL_CLOSED, {}) }, []) }),
  p = () => { let e = o(); return { trackReactivationModalViewed: (0, s.useCallback)((t, n) => { r.track(i
          .REACTIVATION_MODAL_VIEWED, { user_id: r.getAnalyticsProperty().user_id || null, subscription_status: t,
            requires_payment: n, screenWidth: window.innerWidth, isMobile: e }) }, [e]) } },
  m = () => ({ trackReactivationModalClosed: (0, s.useCallback)(() => { r.track(i.REACTIVATION_MODAL_CLOSED, {}) },
    []) }),
  h = () => ({ trackPaywallElementClicked: (0, s.useCallback)((e, t) => { r.track(i
      .PAYWALL_ELEMENT_CLICKED, { user_id: r.getAnalyticsProperty().user_id || null, element_name: e,
        location: t }) }, []) }),
  g = () => ({ trackCancellationFormLoaded: (0, s.useCallback)(({ loaded: e }) => { r.track(i
      .CANCELLATION_FORM_LOADED, { loaded: e }) }, []) }),
  _ = () => ({ trackCancellationCompleteFormLoaded: (0, s.useCallback)(() => { r.track(i
        .CANCELLATION_COMPLETE_FORM_LOADED, {}) }, []) }),
  v = () => ({ trackCancellationFlowStarted: (0, s.useCallback)(() => { r.track(i
      .CANCELLATION_FLOW_STARTED, { user_id: r.getAnalyticsProperty().user_id || null }) }, []) }),
  y = () => ({ trackCancellationFlowAbandoned: (0, s.useCallback)(() => { r.track(i
      .CANCELLATION_FLOW_ABANDONED, { user_id: r.getAnalyticsProperty().user_id || null }) }, []) }),
  b = () => ({ trackCancellationSubCancelledButtonClicked: (0, s.useCallback)(() => { r.track(i
        .CANCEL_SUBS_BUTTON_CLICKED, { user_id: r.getAnalyticsProperty().user_id || null }) }, []) }),
  x = e => ({ trackPurchaseError: (0, s.useCallback)(t => { r.track(i.PURCHASE_ERROR, { team_id: e, ...t }) }, [e]) }),
  S = () => ({ trackRatingModalViewed: (0, s.useCallback)((e, t) => { r.track(i.RATING_MODAL_VIEWED, { user_id: r
          .getAnalyticsProperty().user_id || null, source: e, version: t }) }, []) }),
  C = () => ({ trackRatingModalElementClicked: (0, s.useCallback)(e => { r.track(i.ELEMENT_CLICKED, { user_id: r
          .getAnalyticsProperty().user_id || null, element_name: e, element_type: `rating_modal` }) }, []) }),
  w = () => ({ trackThemeSwitched: (0, s.useCallback)(e => { r.track(i.THEME_SWITCHED, { user_id: r
          .getAnalyticsProperty().user_id || null, theme: e }) }, []) });
export { d as _, b as a, h as c, C as d, S as f, f as g, w as h, g as i, l, p as m, y as n, c as o, m as p, v as r,
  u as s, _ as t, x as u };
