/**
 * Source: https://use.ai/_next/static/chunks/provider-shell.component-BT2mCKt8.js
 * Module: provider-shell.component
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { n as r, r as i } from "./experiment-client.service-Dbg--_Jv.js";
import { t as a } from "./rest-api.provider-DFR1ot1R.js";
import { t as o } from "./useQuery-B3vkDNet.js";
import { n as s } from "./QueryClientProvider-DGxN9XtP.js";
import { t as c } from "./HydrationBoundary-Diq6F1j_.js";
import { t as l } from "./v4-DDdyfk2q.js";
import { t as u } from "./dist-C8KK_I18.js";
import { t as d } from "./queryOptions-Dfvzj6n2.js";
import { i as f } from "./rest-api-DNPFxXXP.js";
import { n as p } from "./env-C6AULCj5.js";
import { n as m } from "./better-auth-client-session.service-ercwbZKT.js";
import { t as h } from "./report-client-error.util-Bq41AYxy.js";
import { t as g } from "./analytics.service-BIbiLKmC.js";
import { r as _ } from "./freemium-funnel.util-D0KPcbFz.js";
import { t as v } from "./user-data.provider-fGhNbbcZ.js";
import { g as y, t as b, u as x } from "./teams-D-JmxjA5.js";
import { n as S } from "./intl-5y7Gu4iP.js";
import "./client-DWC7O25X.js";
import { t as C } from "./site-route.interface-DlOSDxTR.js";
import { r as w } from "./billing.interface-DgJbHepV.js";
import { n as T, t as E } from "./limits.interface-CnG5W0wJ.js";
import { t as D } from "./dist-CQDSGHYK.js";
import { r as O } from "./tooltip-WNS8Gl08.js";
import { n as k } from "./use-session-recovery.hook-Cfs6gO86.js";
import { i as A } from "./chat-route.util-DIaoD1cB.js";
import { n as j } from "./formbricks.provider-DQWvTNkK.js";
import { t as M } from "./help-route.util-DOvwIYGh.js";
import { t as N } from "./safe-session-storage.util-D62mLdZm.js";
import "./user-SAxAP6bK.js";
var P = e(t(), 1),
  F = (e, t) => { if (document.getElementById(e)) return; let n = document.createElement(`script`);
    n.id = e, n.src = t, document.body.appendChild(n) },
  I = () => { try { let e = l(),
        t = p.NEXT_PUBLIC_ENV === `development`,
        n = p.NEXT_PUBLIC_PAYPAL_MERCHANT_ID;
      F(`paypal-script`, `https://c.paypal.com/da/r/fb.js?f=${e}&s=${n}_checkout-page&sandbox=${t}`), N.setItem(w, e),
        F(`paypal-fraudnet-script`, `https://c.paypal.com/da/r/fb.js`) } catch (e) { h(e, `payment-session`, void 0,
        `paypalFraudSession:create`), console.error(`[PaypalFraudSession] create failed`, e) } };

function L(e) { let { enableIdleFallback: t = !1 } = e; return (0, P.useEffect)(() => { let e = !1,
      n = () => { e || (e = !0, I()) },
      r = [`pointerdown`, `keydown`, `touchstart`, `scroll`, `pointermove`]; for (let e of r) window
      .addEventListener(e, n, { once: !0, passive: !0 }); let i, a; return t && (typeof window
      .requestIdleCallback == `function` ? i = window.requestIdleCallback(n, { timeout: 4e3 }) : a = window
      .setTimeout(n, 3e3)), () => { for (let e of r) window.removeEventListener(e, n);
      i !== void 0 && window.cancelIdleCallback(i), a !== void 0 && window.clearTimeout(a) } }, [t]), null }
var R = P.createContext({}),
  z = ({ children: e, growthbook: t }) => { let [n, r] = P.useState(0); return P.useEffect(() => { if (!(!t || !t
            .setRenderer)) return t.setRenderer(() => { r(e => e + 1) }), () => { t.setRenderer(() => {}) } }, [t]), P
      .createElement(R.Provider, { value: { growthbook: t } }, e) },
  B = n(),
  V = e => { let { children: t } = e, n = r(); return (0, P.useEffect)(() => { let e = () => { i() }; if (typeof window
        .requestIdleCallback == `function`) { let t = window.requestIdleCallback(e, { timeout: 3e3 }); return () =>
          window.cancelIdleCallback(t) } let t = window.setTimeout(e, 300); return () => window.clearTimeout(t) },
    []), (0, B.jsx)(z, { growthbook: n, children: t }) },
  H = e => { let { children: t } = e; return (0, B.jsx)(a, { children: t }) },
  U = () => (0, B.jsx)(u, { position: `top-center`, toastOptions: { unstyled: !0 }, expand: !1, visibleToasts: 4,
    gap: 8 }),
  W = e => { let { children: t, forcedTheme: n } = e; return (0, B.jsx)(`div`, { style: { height: `100%` }, children: (
        0, B.jsxs)(D, { attribute: `class`, defaultTheme: `system`, disableTransitionOnChange: !0, enableSystem: !
          0, forcedTheme: n, children: [(0, B.jsx)(O, { delayDuration: 200, skipDelayDuration: 0,
          children: t }), (0, B.jsx)(U, {})
        ] }) }) },
  G = e => { let { children: t } = e, n = S() || `/`, r = n === `/images` || n.endsWith(`/images`), i = n ===
      `/files` || n.includes(`/files`), a = n === C.PROJECTS || n.endsWith(C.PROJECTS), o = n ===
      `/background-removal` || n.endsWith(`/background-removal`), s = n === `/teams` || n.includes(`/teams`), c = n
      .startsWith(`/organization`), l = n === C.TERMS || n.endsWith(C.TERMS), u = n === C.PRIVACY || n.endsWith(C
        .PRIVACY), d = n === C.PRICING || n.endsWith(C.PRICING), f = n === C.APPS || n.endsWith(C.APPS), p = n.endsWith(
        `${C.APPS}/callback`), m = n === C.COOKIE_POLICY || n.endsWith(C.COOKIE_POLICY), h = M(n), g = [`/chat`].some(
        e => n === e || n.endsWith(e)), _ = A(n) || g || n.startsWith(C.SUBSCRIPTION_CANCEL) || n.startsWith(C
        .ACCOUNT_DELETE) || r || i || a || o || s || c || l || u || d || f || m || h || p || n.includes(
      `check-email`); return (0, B.jsx)(W, { forcedTheme: _ ? void 0 : `light`, children: t }) },
  K = async (e, t) => { let n = {};
    t && (n.teamId = t); let r = await (await f.get(E.API_LIMITS, { signal: e.signal, searchParams: Object.keys(n)
        .length > 0 ? n : void 0 })).json(); if (!r || typeof r.isTrialUser != `boolean` || typeof r.hasCreditsLeft !=
      `boolean`) throw Error(`Failed to fetch user limits`); return r };
new Date().toISOString();
var q = e => { let t = e?.teamId ?? null; return d({ queryKey: [T.LIMITS_QUERY, t], queryFn: e => K(e, t),
      refetchInterval: () => 6e4 + Math.floor(Math.random() * 15e3), staleTime: 6e4, retry: 1, refetchOnWindowFocus:
        !1, enabled: e?.enabled }) },
  J = e => o(q(e)),
  Y = e => { let { children: t } = e, n = m();
    k(n); let r = s(),
      i = (0, P.useMemo)(() => n.isAuthenticated, [n.isAuthenticated]),
      a = x(n.data, { enabled: i }),
      { data: o, isInTeam: c } = b(),
      l = y(e => e.workspace) === `organization` && c ? o?.id ?? null : null,
      u = J({ enabled: i, teamId: l }),
      d = (0, P.useCallback)(e => { r.setQueryData([T.LIMITS_QUERY, l], e) }, [r, l]),
      f = a.data?.data?.subscription?.status;
    (0, P.useEffect)(() => { g.setGetHasPaidPlan(() => _({ subscriptionStatus: f, isInTeam: c })) }, [f, c]), (0, P
      .useEffect)(() => { let e = a.data?.data?.subscription; if (!e?.subscriptionId) return; let
      t = { subscription_id: e.subscriptionId };
      g.setDefaultProperties(t) }, [a.data]); let p = a,
      h = (0, P.useMemo)(() => ({ session: n, userProfileWithSubscription: a, subscriptionStatus: p, limits: u,
        setUserLimits: d }), [n, a, p, u, d]); return (0, B.jsx)(v, { value: h, children: t }) },
  X = e => { let { children: t, locale: n, dehydratedState: r, isAuthedUser: i = !1 } = e; return (0, B.jsx)(
    V, { children: (0, B.jsx)(G, { locale: n, children: (0, B.jsx)(H, { children: (0, B.jsx)(c, { state: r,
            children: (0, B.jsxs)(Y, { children: [(0, B.jsx)(j, {}), (0, B.jsx)(
              L, { enableIdleFallback: i }), t] }) }) }) }) }) };
export { X as default };
