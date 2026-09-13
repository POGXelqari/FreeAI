/**
 * Source: https://use.ai/_next/static/chunks/provider-shell.component-CPOWB-nq.js
 * Module: provider-shell.component
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { n as r, r as i } from "./experiment-client.service-CXqfLU-5.js";
import { t as a } from "./rest-api.provider-cvDCweR_.js";
import { n as o } from "./QueryClientProvider-DGxN9XtP.js";
import { t as s } from "./HydrationBoundary-Diq6F1j_.js";
import { t as c } from "./v4-DDdyfk2q.js";
import { t as l } from "./dist-C8KK_I18.js";
import "./rest-api-BL5a3YVm.js";
import { n as u } from "./env-C6AULCj5.js";
import { n as d } from "./better-auth-client-session.service-1Lowatea.js";
import { t as f } from "./report-client-error.util-Bq41AYxy.js";
import { t as p } from "./analytics.service-9oUGcSKY.js";
import { r as m } from "./freemium-funnel.util-BsrrWeXM.js";
import { n as h } from "./intl-CED8MIZm.js";
import { t as g } from "./site-route.interface-CnbxJHY2.js";
import { t as _ } from "./user-data.provider-D1zgVZeU.js";
import "./client-BL58m4Hx.js";
import { r as v } from "./billing.interface-DgJbHepV.js";
import { n as y } from "./limits.interface-CnG5W0wJ.js";
import { t as b } from "./dist-CQDSGHYK.js";
import { r as x } from "./tooltip-WNS8Gl08.js";
import { n as S } from "./use-session-recovery.hook-DJxYUW5N.js";
import { i as C } from "./chat-route.util-CxSmRzCy.js";
import { i as w, n as T } from "./limits-BXIc-Ice.js";
import { t as E } from "./help-route.util-BnHl9c--.js";
import { t as D } from "./safe-session-storage.util-D62mLdZm.js";
import { t as O } from "./user-CU5C7S8a.js";
var k = e(t(), 1),
  A = (e, t) => { if (document.getElementById(e)) return; let n = document.createElement(`script`);
    n.id = e, n.src = t, document.body.appendChild(n) },
  j = () => { try { let e = c(),
        t = u.NEXT_PUBLIC_ENV === `development`,
        n = u.NEXT_PUBLIC_PAYPAL_MERCHANT_ID;
      A(`paypal-script`, `https://c.paypal.com/da/r/fb.js?f=${e}&s=${n}_checkout-page&sandbox=${t}`), D.setItem(v, e),
        A(`paypal-fraudnet-script`, `https://c.paypal.com/da/r/fb.js`) } catch (e) { f(e, `payment-session`, void 0,
        `paypalFraudSession:create`), console.error(`[PaypalFraudSession] create failed`, e) } };

function M(e) { let { enableIdleFallback: t = !1 } = e; return (0, k.useEffect)(() => { let e = !1,
      n = () => { e || (e = !0, j()) },
      r = [`pointerdown`, `keydown`, `touchstart`, `scroll`, `pointermove`]; for (let e of r) window
      .addEventListener(e, n, { once: !0, passive: !0 }); let i, a; return t && (typeof window
      .requestIdleCallback == `function` ? i = window.requestIdleCallback(n, { timeout: 4e3 }) : a = window
      .setTimeout(n, 3e3)), () => { for (let e of r) window.removeEventListener(e, n);
      i !== void 0 && window.cancelIdleCallback(i), a !== void 0 && window.clearTimeout(a) } }, [t]), null }
var N = k.createContext({}),
  P = ({ children: e, growthbook: t }) => { let [n, r] = k.useState(0); return k.useEffect(() => { if (!(!t || !t
            .setRenderer)) return t.setRenderer(() => { r(e => e + 1) }), () => { t.setRenderer(() => {}) } }, [t]), k
      .createElement(N.Provider, { value: { growthbook: t } }, e) },
  F = n(),
  I = e => { let { children: t } = e, n = r(); return (0, k.useEffect)(() => { let e = () => { i() }; if (typeof window
        .requestIdleCallback == `function`) { let t = window.requestIdleCallback(e, { timeout: 3e3 }); return () =>
          window.cancelIdleCallback(t) } let t = window.setTimeout(e, 300); return () => window.clearTimeout(t) },
    []), (0, F.jsx)(P, { growthbook: n, children: t }) },
  L = e => { let { children: t } = e; return (0, F.jsx)(a, { children: t }) },
  R = () => (0, F.jsx)(l, { position: `top-center`, toastOptions: { unstyled: !0 }, expand: !1, visibleToasts: 4,
    gap: 8 }),
  z = e => { let { children: t, forcedTheme: n } = e; return (0, F.jsx)(`div`, { style: { height: `100%` }, children: (
        0, F.jsxs)(b, { attribute: `class`, defaultTheme: `system`, disableTransitionOnChange: !0, enableSystem: !
          0, forcedTheme: n, children: [(0, F.jsx)(x, { delayDuration: 200, skipDelayDuration: 0,
          children: t }), (0, F.jsx)(R, {})
        ] }) }) },
  B = e => { let { children: t } = e, n = h() || `/`, r = n === `/images` || n.endsWith(`/images`), i = n ===
      `/files` || n.includes(`/files`), a = n === g.PROJECTS || n.endsWith(g.PROJECTS), o = n ===
      `/background-removal` || n.endsWith(`/background-removal`), s = n === g.TERMS || n.endsWith(g.TERMS), c = n === g
      .PRIVACY || n.endsWith(g.PRIVACY), l = n === g.PRICING || n.endsWith(g.PRICING), u = n === g.APPS || n.endsWith(g
        .APPS), d = n.endsWith(`${g.APPS}/callback`), f = n === g.COOKIE_POLICY || n.endsWith(g.COOKIE_POLICY), p = E(
      n), m = [`/chat`].some(e => n === e || n.endsWith(e)), _ = C(n) || m || n.startsWith(g.SUBSCRIPTION_CANCEL) || n
      .startsWith(g.ACCOUNT_DELETE) || r || i || a || o || s || c || l || u || f || p || d || n.includes(
      `check-email`); return (0, F.jsx)(z, { forcedTheme: _ ? void 0 : `light`, children: t }) },
  V = e => { let { children: t } = e, n = d();
    S(n); let r = o(),
      i = (0, k.useMemo)(() => n.isAuthenticated, [n.isAuthenticated]),
      a = O(n.data, { enabled: i }),
      s = T({ enabled: i }),
      c = (0, k.useCallback)(e => { r.setQueryData([y.LIMITS_QUERY, null], e) }, [r]),
      l = a.data?.data?.subscription?.status;
    (0, k.useEffect)(() => { p.setGetHasPaidPlan(() => m({ subscriptionStatus: l })) }, [l]), (0, k.useEffect)(
  () => { let e = a.data?.data?.subscription; if (!e?.subscriptionId) return; let t = { subscription_id: e
          .subscriptionId };
      p.setDefaultProperties(t) }, [a.data]); let u = a,
      f = (0, k.useMemo)(() => ({ session: n, userProfileWithSubscription: a, subscriptionStatus: u, limits: s,
        setUserLimits: c }), [n, a, u, s, c]); return (0, F.jsx)(_, { value: f, children: t }) },
  H = e => { let { children: t, locale: n, dehydratedState: r, isAuthedUser: i = !1 } = e; return (0, F.jsx)(
    I, { children: (0, F.jsx)(B, { locale: n, children: (0, F.jsx)(L, { children: (0, F.jsx)(s, { state: r,
            children: (0, F.jsxs)(V, { children: [(0, F.jsx)(w, {}), (0, F.jsx)(
              M, { enableIdleFallback: i }), t] }) }) }) }) }) };
export { H as default };
