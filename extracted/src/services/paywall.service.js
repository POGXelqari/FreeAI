/**
 * Source: https://use.ai/_next/static/chunks/paywall.service-DJtJHTep.js
 * Module: paywall.service
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { r as n, t as ee } from "./billing-CclPhhLo.js";
import { m as r, n as te, p as i } from "./freemium-funnel.util-D0KPcbFz.js";
import { r as a } from "./mixpanel-CkBALibP.js";
import { n as o } from "./user-data.provider-fGhNbbcZ.js";
import { t as s } from "./global.store-DsM3x4UJ.js";
import { r as c } from "./raw-history.util-43z6flYk.js";
import { n as l } from "./payment-modals.store-Ds_qXI-N.js";
import { n as u } from "./use-paywall-variant.experiment.hook-DCrzgpR5.js";
import { t as ne } from "./freemium-funnel.store-B7BDrTBQ.js";
var d = e(t(), 1),
  f = `paywallmodal`,
  p = `freemium_funnel_gate`,
  m = `freemium_funnel_capability`;
`${p}`;
var h = { UPGRADE: `upgrade`, SELECT_PLAN_TRIAL: `select_plan_trial`, RENEWAL: `renewal`, TRIAL_LIMIT: `trial_limit`,
  SUPERPRO_UPGRADE: `superpro_upgrade`, POWER_PLAN_UPGRADE: `power_plan_upgrade` };

function g(e) { let { variant: t, entry: n, accountState: ee } = e; return t === `legacy` ? `legacy` : n === `manage` &&
    ee === `paid` ? `manage` : `unified` }
var _ = `pro_hit_paid_limit:`,
  v = e => e ? `${_}${e}` : null;

function y(e) { let t = v(e);
  t && r.setItem(t, `1`) }

function re(e) { let t = v(e); return t ? r.getItem(t) === `1` : !1 }

function b(e) { let t = v(e);
  t && r.removeItem(t) }

function x() { let { setIsUpgradeModalOpen: e, setIsSelectPlanTrialModalOpen: t, setIsRenewalModalOpen: r,
    setIsTrialLimitModalOpen: f, setIsSuperProUpgradeModalOpen: p, setIsPowerPlanModalOpen: m,
    setPowerPlanModalScenario: _, isPaymentInProgress: v, setIsPaymentInProgress: y, setIsUnifiedPaywallOpen: b,
    setUnifiedPaywallTrigger: x } = l(), S = l(e => e.setIsMobileManagedModalOpen), { limits: C,
      userProfileWithSubscription: w } = o(), T = l(e => e.isUpgradeModalOpen || e.isSelectPlanTrialModalOpen || e
      .isRenewalModalOpen || e.isTrialLimitModalOpen || e.isSuperProUpgradeModalOpen || e.isPowerPlanModalOpen || e
      .isUnifiedPaywallOpen), { ui: E } = u(T), D = E === `unified`, ie = C?.data, O = w.data?.data?.subscription, k = w
    .data?.data?.userProfile?.planId, A = w.data?.data?.user?.id, j = O?.status === i.ACTIVE || O?.status === i.TRIAL,
    M = O?.subscriptionPlatform === `revenuecat` && j, N = O?.status === i.CANCELED || O?.subscriptionId && O
    ?.status === i.INACTIVE, P = O?.status === i.SCHEDULED_FOR_CANCELLATION || O?.status === i
    .TRIAL_SCHEDULED_FOR_CANCELLATION, F = O?.status === i.DUNNED || O?.status === i.PAST_DUE, I = ie?.hasCreditsLeft ??
    !1, L = O?.status === i.TRIAL || O?.status === i.TRIAL_SCHEDULED_FOR_CANCELLATION || (ie?.isTrialUser ?? !1), R = w
    .data?.data?.userProfile?.isTestUser ?? !1, z = s(e => e.isReviewModalOpen), B = s(e => e.handleGlobalStore), V = (
      0, d.useRef)(L), ae = (0, d.useRef)(I), H = (0, d.useRef)(j), U = (0, d.useRef)(P), W = (0, d.useRef)(N), G = (0,
      d.useRef)(F), K = (0, d.useRef)(k), q = (0, d.useRef)(z), J = (0, d.useRef)(v), Y = (0, d.useRef)(R), oe = (0, d
      .useRef)(A), X = (0, d.useRef)(D), Z = (0, d.useRef)(M);
  (0, d.useEffect)(() => { V.current = L, ae.current = I, H.current = j, U.current = P, W.current = N, G.current = F, K
      .current = k, q.current = z, J.current = v, Y.current = R, oe.current = A, X.current = D, Z.current = M }, [L,
    I, j, P, N, F, k, z, v, R, A, M, D
  ]); let se = (0, d.useCallback)(() => { let e = new URL(window.location.href);
        e.searchParams.has(`paywall`) && (e.searchParams.delete(`paywall`), c(window.history.state, e.toString())) },
    []),
    ce = () => W.current || U.current || G.current ? `reactivation` : V.current ? `trial` : H.current ? `paid` : `free`,
    Q = (0, d.useCallback)(e => { x(e), b(!0) }, [x, b]),
    $ = (0, d.useCallback)(i => { if (Z.current) { S(!0); return } let o = i?.powerPlanScenario || `default`,
          s = o === `deep_research_feature`; if (q.current || !i?.skipPaymentCheck && J.current) return; let c = i
          ?.paywallSource || a.TRIAL;
        B({ paywallViewSource: c }); let l = V.current,
          u = ae.current,
          d = H.current,
          p = U.current,
          v = W.current,
          y = G.current,
          b = K.current; if (Y.current) return; if (te() && ne.getState().markPaywallSeen(), g({ variant: X.current ?
              `unified` : `legacy`, entry: `auto`, accountState: ce() }) === `unified`) { if (p) { r(!0); return } let
            e = i?.trigger ?? (u ? `upgrade_click` : l ? `trial_limit_reached` : `daily_limit_reached`);
          Q(e); return } let x = i?.modalType || (p || v || y ? h.RENEWAL : l && !u ? h.TRIAL_LIMIT : d || d ? h
            .UPGRADE : h.SELECT_PLAN_TRIAL),
          C = ee(b),
          w = n(b),
          T = p && !l && !u && !w && !C;
        _(T ? `scheduled_cancel_pro_limit` : o), T && (x = h.POWER_PLAN_UPGRADE); let E = re(oe.current) && d && !w && !
          C && !l && !y && !v && !p; switch (x) {
          case h.TRIAL_LIMIT:
            f(!0); break;
          case h.RENEWAL:
            r(!0); break;
          case h.SELECT_PLAN_TRIAL:
            y || v || p ? r(!0) : t(!0); break;
          case h.UPGRADE:
            E ? m(!0) : w || C || u || l ? e(!0) : m(!0); break;
          case h.POWER_PLAN_UPGRADE:
          case h.SUPERPRO_UPGRADE:
            T ? m(!0) : y || v || p ? r(!0) : E || (!(C || u || l) || s) && d ? m(!0) : d ? l ? f(!0) : e(!0) : t(!
            0) } }, [f, r, t, e, p, m, _, Q, B]); return { openPaywallModal: $, openManagePlanModal: (0, d.useCallback)(
      () => { if (Z.current) { S(!0); return } if (U.current) { B({ paywallViewSource: a.UPGRADE }), r(!
          0); return } let e = g({ variant: X.current ? `unified` : `legacy`, entry: `manage`,
      accountState: ce() }); if (e === `manage`) { B({ paywallViewSource: a.UPGRADE }), Q(
          `upgrade_click`); return } if (e === `unified`) { B({ paywallViewSource: a.UPGRADE }), Q(
          `upgrade_click`); return } $({ paywallSource: a.UPGRADE }) }, [$, Q, B, S]), isMobileManagedSubscription: M,
    closePaywallModals: (0, d.useCallback)(() => { e(!1), t(!1), r(!1), f(!1), b(!1) }, [e, t, r, f, b]),
    clearPaywallSearchParams: se, setIsPaymentInProgress: y, isDunned: F, isCancelled: N, trialData: { isTrialActive: L,
      hasCreditsLeft: I } } }
export { m as a, h as i, b as n, p as o, y as r, f as s, x as t };
