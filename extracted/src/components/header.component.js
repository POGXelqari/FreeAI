/**
 * Source: https://use.ai/_next/static/chunks/header.component-Bs0dJD0g.js
 * Module: header.component
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { tt as r } from "./vinext-DaPQ-kLo.js";
import { t as i } from "./useQuery-BgSNoQ7j.js";
import { t as a } from "./useMutation-DldRSjFA.js";
import { t as o } from "./queryOptions-Dfvzj6n2.js";
import { i as s } from "./rest-api-BL5a3YVm.js";
import { n as c } from "./react-client-DI5BViDH.js";
import { n as l } from "./better-auth-client-session.service-1Lowatea.js";
import { t as u } from "./button-B7ERdP8H.js";
import { t as d } from "./utils-DBS9-MOh.js";
import { i as f } from "./mixpanel-B_WP0jc-.js";
import { n as p, t as m } from "./intl-CED8MIZm.js";
import { r as h } from "./is-mobile.service-BZEOpDHM.js";
import { t as g } from "./global.store-DXaW4jb5.js";
import { t as _ } from "./auth.store-DeUNDeDH.js";
import { t as v } from "./site-route.interface-CnbxJHY2.js";
import { t as y } from "./logo-icon-C5Mo55YO.js";
import { t as ee } from "./proxy-B_99oKrn.js";
import { t as te } from "./logo-icon-white-QiZ2Ybc-.js";
import { t as ne } from "./useai-CiXQTOJ8.js";
import { t as b } from "./useai-white-BcU4k_RY.js";
import { t as x } from "./use-guest-sidebar-menu.hook-YCGK8tSI.js";
import { r as S, t as C } from "./use-page-scroll.hook-DpmNgPID.js";
import { i as w } from "./chat-route.util-CxSmRzCy.js";
import { t as T } from "./app.constant-CQOe5N6O.js";
import { t as E } from "./help-route.util-BnHl9c--.js";
import { n as D, t as O } from "./config.model-C-TFE2oV.js";
var k = e(t(), 1),
  A = n(),
  j = k.forwardRef(({ className: e, position: t = `static`, ...n }, r) => (0, A.jsx)(`nav`, { ref: r, className: d(
      `flex w-full items-center justify-between`, t === `sticky` && `sticky top-0 z-50`, t === `fixed` &&
      `fixed top-0 right-0 left-0 z-50`, e), ...n }));
j.displayName = `Navbar`;
var M = k.forwardRef(({ className: e, ...t }, n) => (0, A.jsx)(`div`, { ref: n, className: d(`flex items-center`, e),
  ...t }));
M.displayName = `NavbarBrand`;
var N = k.forwardRef(({ className: e, justify: t = `start`, ...n }, r) => (0, A.jsx)(`div`, { ref: r, className: d(
    `flex items-center`, t === `start` && `justify-start`, t === `center` && `justify-center`, t === `end` &&
    `justify-end`, e), ...n }));
N.displayName = `NavbarContent`;
var P = k.forwardRef(({ className: e, ...t }, n) => (0, A.jsx)(`div`, { ref: n, className: d(`flex items-center`, e),
  ...t }));
P.displayName = `NavbarItem`;
var F = async (e, t) => await (await s.get(O.API_CONFIG, { signal: e.signal, headers: { settings: t } })).json(), I =
  async e => await (await s.post(O.API_CONFIG, { json: e })).json(), L = e => a({ mutationKey: [D.CONFIG_MUTATION],
      mutationFn: I, onSuccess: e?.onSuccess }), R = e => o({ queryKey: [D.CONFIG_QUERY], queryFn: t => F(t, e) }),
    z = () => i(R()), B = e => (window.addEventListener(`scroll`, e, { passive: !0 }), () => window
      .removeEventListener(`scroll`, e)), V = () => !1, H = (e = 0) => { let t = (0, k.useCallback)(() => window
        .scrollY > e, [e]); return (0, k.useSyncExternalStore)(B, t, V) }, U = e => { let t = p(),
        { data: n, status: r } = l(),
        i = H(),
        a = g(e => e.menu),
        o = g(e => e.handleGlobalStore),
        { data: s, refetch: c } = z(),
        { mutate: u } = L({ onSuccess: c }),
        d = () => { u({ isSideBarOpen: !s?.data?.isSideBarOpen }) },
        f = w(t ?? ``),
        m = r === `loading` ? e === `authed` : !!n?.user && n.user.type !== `guest`,
        [h, _] = (0, k.useState)(!1); return r !== `loading` && !h && _(!0), { pathname: t, isScroll: i,
        isAuthKnown: r !== `loading` || h || e !== `unknown`, sideBar: s?.data?.isSideBarOpen, menu: a,
        handleGlobalStore: o, toggleSideBar: d, isAuthedUser: m, hideHeader: f } }, W = ({ ref: e, ...
      t }) => { let { initialAuthState: n } = t, i = U(n), { openSignInModal: a } = _(), o = p(), s = r(), l = s.get(
          `embed`), g = c(`Header`), [D, O] = (0, k.useState)(!1), F = o || `/`, I = F === v.BASE || F === v.PRICING,
        L = F.startsWith(v.HELP), R = F.startsWith(v.SUBSCRIPTION_CANCEL), z = F.startsWith(v.HELP) || F.startsWith(v
          .SUBSCRIPTION_CANCEL) || F.startsWith(v.BILL), B = w(F), V = I || L, H = `bg-paper/99`, W = F === v.TERMS ||
        F.endsWith(v.TERMS), G = F === v.PRIVACY || F.endsWith(v.PRIVACY), K = F === v.PRICING || F.endsWith(v
          .PRICING), q = h(), { isEnabled: J } = x(), Y = F === v.COOKIE_POLICY || F.endsWith(v.COOKIE_POLICY), re =
        F === v.REFUND || F.endsWith(v.REFUND), X = W || G || Y || re, ie = K && J && !i.isAuthedUser && q, ae = F
        .startsWith(v.ACCOUNT_DELETE), Z = K || X || L || R || ae, oe = l === `app` && (F.startsWith(v.HELP) || X),
        Q = B || F.startsWith(v.SUBSCRIPTION_CANCEL) || F.startsWith(v.ACCOUNT_DELETE) || W || G || Y || K || E(F),
        se = (0, k.useCallback)(() => { let e = C() > 20;
          O(t => t === e ? t : e) }, []);
      S(se); let $ = () => { let e = T.some(e => s.get(e) === `true`),
          t = e ? window.location.pathname + window.location.search : void 0;
        a(e ? f.IMAGE_FUNNEL : f.URL, t) }; return i.hideHeader || oe || ie ? null : (0, A.jsx)(`div`, { className: d(
          `fixed right-0 left-0 z-50`, `top-0`, I || L ? `fixed` : X ? `sticky` : `relative`, X &&
          `backdrop-blur-xl`, Z && H), children: (0, A.jsxs)(j, { className: d(
            `w-full transition-all duration-200 ease-in-out`, Z ? `bg-transparent` : I ? D ? H :
            `bg-transparent` : null, V && !I && !Z ? H : null, !V && `bg-transparent`,
            `z-50 grid max-h-[60px] min-h-[60px] w-full py-0`, Z ? `px-4` :
            `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`, I || Z ? `grid-cols-[auto_1fr]` :
            `grid-cols-[auto_auto]`, I && !K && D && `backdrop-blur-xl`, D ? `py-2` : `py-1`),
          position: `sticky`, ref: e, children: [(0, A.jsx)(m, { "aria-label": g(`home_link_label`), href: i
              .isAuthedUser ? v.CHAT : v.BASE, children: (0, A.jsx)(M, { children: (0, A.jsxs)(ee
              .div, { className: d(`flex items-center`, Z && `gap-2`),
                transition: { type: `spring`, stiffness: 400, damping: 10 },
                whileHover: { scale: 1.05 }, children: [Z && (0, A.jsxs)(A
                  .Fragment, { children: [(0, A.jsx)(y, { className: d(`h-5 w-5 shrink-0`,
                          Q && `dark:hidden`) }), Q && (0, A.jsx)(
                      te, { className: `hidden h-5 w-5 shrink-0 dark:block` })] }), (0, A.jsx)
                  (ne, { className: d(Z || z ? `h-4 w-auto` : `h-4 w-auto sm:h-6 md:h-8`, Z &&
                      `mb-[3px]`, Q && `dark:hidden`) }), Q && (0, A.jsx)(b, { className: d(
                      Z || z ? `h-4 w-auto` : `h-4 w-auto sm:h-6 md:h-8`, Z && `mb-[3px]`,
                      `hidden dark:block`) })
                ] }) }) }), (0, A.jsx)(N, { justify: `end`, children: (I || z && !R || X) && !l && (0, A
              .jsx)(P, { children: (0, A.jsx)(`div`, { className: `flex flex-col items-end gap-0.5`,
                children: i.isAuthKnown ? i.isAuthedUser ? (0, A.jsx)(m, { href: `/`,
                  children: (0, A.jsx)(u, { size: Z ? `chip` : void 0, variant: `cta`,
                      children: g(`btn_go_to_chat`) }) }) : Z ? (0, A.jsx)(u, { onClick: $,
                  size: `chip`, variant: `cta`, children: g(`btn_sign_in`) }) : (0, A.jsx)(
                u, { onClick: $, size: Z ? `chip` : void 0, variant: `cta`, children: g(
                    `btn_sign_in`) }) : (0, A.jsx)(`div`, { "aria-hidden": !0,
                  className: `bg-muted h-9 w-24 animate-pulse rounded-full`, "data-testid": `auth-slot-placeholder` }) }) }) })] }) }) };
W.displayName = `HeaderComponent`;
export { W as default };
