/**
 * Source: https://use.ai/_next/static/chunks/mobile-chat-header.component-BZlH-Boh.js
 * Module: mobile-chat-header.component
 * Extracted & Beautified
 */

const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = [
  "_next/static/chunks/mobile-project-menu.component-D4-aybfI.js", "_next/static/chunks/framework-D-uKrMmN.js",
  "_next/static/chunks/rolldown-runtime-C0FnF6B9.js", "_next/static/chunks/vinext-CqpRraGS.js",
  "_next/static/chunks/ellipsis-DHUbA1Fi.js", "_next/static/chunks/createLucideIcon-CVSF7wvO.js",
  "_next/static/chunks/react-client-DI5BViDH.js", "_next/static/chunks/react-CWjhjU4R.js",
  "_next/static/chunks/projects-Cijq-nE0.js", "_next/static/chunks/useQuery-B3vkDNet.js",
  "_next/static/chunks/mutation-DO0ikfMC.js", "_next/static/chunks/thenable-BrrDvP6E.js",
  "_next/static/chunks/rest-api.provider-DFR1ot1R.js", "_next/static/chunks/hydration-BI7_jV4G.js",
  "_next/static/chunks/QueryClientProvider-DGxN9XtP.js", "_next/static/chunks/dynamic.service-BDdZlREf.js",
  "_next/static/chunks/dynamic-preload-chunks-C2tdlbzD.js", "_next/static/chunks/useMutation-DldRSjFA.js",
  "_next/static/chunks/queryOptions-Dfvzj6n2.js", "_next/static/chunks/rest-api-DNPFxXXP.js",
  "_next/static/chunks/env-C6AULCj5.js", "_next/static/chunks/project-key.constant-DL2-hOys.js",
  "_next/static/chunks/better-auth-client-session.service-ercwbZKT.js",
  "_next/static/chunks/better-auth-client.service-Ck6mOMB1.js",
  "_next/static/chunks/recovery-marker.util-BHO296he.js", "_next/static/chunks/api-error-body.util-DJXtb-RF.js",
  "_next/static/chunks/worker-auth.service-BtTnG2J5.js",
  "_next/static/chunks/report-client-error.util-Bq41AYxy.js",
  "_next/static/chunks/analytics.service-BIbiLKmC.js", "_next/static/chunks/freemium-funnel.util-D0KPcbFz.js",
  "_next/static/chunks/safe-session-storage.util-DN4NSHVM.js", "_next/static/chunks/gtm-DkKjcpHp.js",
  "_next/static/chunks/mixpanel-CkBALibP.js", "_next/static/chunks/pencil-edit-CQfkNnBZ.js",
  "_next/static/chunks/trash-Qu5NuJYS.js", "_next/static/chunks/button-B7ERdP8H.js",
  "_next/static/chunks/bundle-mjs-cJTHqqzI.js", "_next/static/chunks/loader-circle-C38mqwuC.js",
  "_next/static/chunks/dist-DKq-7tPa.js", "_next/static/chunks/utils-DBS9-MOh.js",
  "_next/static/chunks/project.store-CVum8aS0.js", "_next/static/chunks/react-D8-vnz5K.js",
  "_next/static/chunks/middleware-BT98JsiD.js", "_next/static/chunks/dropdown-menu-D6_Lrewr.js",
  "_next/static/chunks/check-CWA6FeXs.js", "_next/static/chunks/chevron-right-Dw6SaFc4.js",
  "_next/static/chunks/circle-BS-Vzwf7.js", "_next/static/chunks/dist-Bk3YTB5a.js",
  "_next/static/chunks/dist-DHTrxFRs.js", "_next/static/chunks/dist-wURgM5if.js",
  "_next/static/chunks/dist-DNAaWyma.js", "_next/static/chunks/dist-CEdsmZbM.js",
  "_next/static/chunks/dist-1ej2Hjrt.js", "_next/static/chunks/es2015-fuZyN7gw.js",
  "_next/static/chunks/dist-uRWxuiG0.js", "_next/static/chunks/dist-DbhSOkZC.js",
  "_next/static/chunks/dist-jciTo-QL.js", "_next/static/chunks/floating-ui.react-dom-xN1K-ASj.js",
  "_next/static/chunks/dist-BbbTHrHw.js", "_next/static/chunks/dist-Bwy9E6PB.js",
  "_next/static/chunks/global.store-DsM3x4UJ.js", "_next/static/chunks/shallow-CKWb1b-W.js"
]))) => i.map(i => d[i]);
import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n, r } from "./framework-D-uKrMmN.js";
import { nt as i, rt as a, tt as o } from "./vinext-CqpRraGS.js";
import { r as s } from "./react-CWjhjU4R.js";
import { t as c } from "./dynamic.service-BDdZlREf.js";
import { n as l } from "./react-client-DI5BViDH.js";
import { n as u } from "./better-auth-client-session.service-ercwbZKT.js";
import { F as d, N as ee, T as te, k as ne, x as re } from "./analytics.service-BIbiLKmC.js";
import { i as f } from "./mixpanel-CkBALibP.js";
import { g as ie, t as ae } from "./teams-D-JmxjA5.js";
import { t as p } from "./button-B7ERdP8H.js";
import { t as m } from "./utils-DBS9-MOh.js";
import { n as oe, t as se } from "./intl-5y7Gu4iP.js";
import { t as h } from "./sidebar.store-CMHpt4Zm.js";
import { r as ce } from "./chat.store-CVJElyGt.js";
import { t as g } from "./global.store-DsM3x4UJ.js";
import { i as le } from "./new-chat.service-CIiqAd78.js";
import { t as ue } from "./auth.store-CecpbI3z.js";
import { t as de } from "./logo-icon-C5Mo55YO.js";
import { t as fe } from "./is-locale-arabic.util-B4BIdGa2.js";
import { t as pe } from "./logo-icon-white-QiZ2Ybc-.js";
import { t as me } from "./menu-DmuxtmLj.js";
import { t as he } from "./useai-CiXQTOJ8.js";
import { t as ge } from "./useai-white-BcU4k_RY.js";
import { t as _e } from "./mobile-header-logo-BBTsGGx9.js";
import { t as ve } from "./use-guest-sidebar-menu.hook-D4ZKIqpw.js";
import { n as ye } from "./use-incognito-chat.hook-Dun56_qv.js";
import { n as be } from "./mobile-drawer.provider-D6C04T1C.js";
import { t as _ } from "./guest-sidebar-menu.store-D01MKXdQ.js";
import { t as xe } from "./use-auth-known.hook-C1WWcve_.js";
import { n as Se } from "./initial-auth-state.provider-DUS-CXUE.js";
import { t as v } from "./shallow-CKWb1b-W.js";
import { t as y } from "./blur-keyboard.service-Cw_wHZxR.js";
import { t as b } from "./rename-item-modal-2hixoasb.js";
import { i as Ce, n as we, t as Te } from "./tooltip-WNS8Gl08.js";
import { t as Ee } from "./new-chat-DRFSeAfv.js";
import { a as x } from "./model-selector-CHLHhIlL.js";
import { t as De } from "./use-traffic-detection.hook-CKzLJPTv.js";
import { a as S, r as Oe, t as ke } from "./chat-actions-CIThz8ZM.js";
import { n as Ae, t as C } from "./incognito-chat-enabled-BE8jAbsG.js";
import { n as w } from "./rename-chat-modal-CffMN_RG.js";
a();
var je = c(() => i(() => import(`./mobile-project-menu.component-D4-aybfI.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61
  ])), { loadableGenerated: { modules: [`src/app/features/mobile-project-menu/mobile-project-menu.component.tsx`] } }),
  T = e(n(), 1),
  Me = () => {
    (0, T.useEffect)(() => { let e = window.visualViewport; if (!e) return; let t = document.documentElement,
        n = null,
        r = () => { if (e.scale !== 1) { t.style.setProperty(`--keyboard-inset`, `0px`); return } n?.isConnected || (
            n = document.querySelector(`[data-guest-keyboard-root]`)); let r = n?.getBoundingClientRect().bottom ??
            window.innerHeight,
            i = Math.max(0, r - (e.height + e.offsetTop));
          t.style.setProperty(`--keyboard-inset`, i > 40 ? `${Math.round(i)}px` : `0px`) };
      r(), e.addEventListener(`resize`, r), e.addEventListener(`scroll`, r); let i = 0,
        a = 0,
        o = () => { r(), i = requestAnimationFrame(() => { r(), a = requestAnimationFrame(r) }) }; return document
        .addEventListener(`focusin`, o), () => { cancelAnimationFrame(i), cancelAnimationFrame(a), e
            .removeEventListener(`resize`, r), e.removeEventListener(`scroll`, r), document.removeEventListener(
              `focusin`, o), t.style.removeProperty(`--keyboard-inset`) } }, []) },
  E = () => { let { renameChatId: e, isRenameModalOpen: t, currentChatTitle: n, setRenameChatId: r,
      setIsRenameModalOpen: i, setCurrentChatTitle: a } = g(v(e => ({ renameChatId: e.renameChatId, isRenameModalOpen: e
          .isRenameModalOpen, currentChatTitle: e.currentChatTitle, setRenameChatId: e.setRenameChatId,
        setIsRenameModalOpen: e.setIsRenameModalOpen, setCurrentChatTitle: e
      .setCurrentChatTitle }))), { renameChat: o } = w(), [s, c] = (0, T.useState)(n), [l, u] = (0, T.useState)(n);
    l !== n && (u(n), c(n)); let d = (0, T.useCallback)(async e => { e ? i(!0) : (await y(), i(!1), r(null), a(``), c(
          ``)) }, [i, r, a]),
      ee = async t => { t && e && (r(null), c(``), await o(e, t, { originalTitle: n })) }; return { isOpen: t,
      handleOpenChange: d, newTitle: s, setNewTitle: c, handleSubmit: () => { let e = s.trim();
        e ? (ee(e), c(``), d(!1)) : d(!1) } } },
  D = r(),
  Ne = () => { let e = E(),
      t = l(`Chat`); return (0, D.jsx)(b, { btnCancelCopy: t(`btn_cancel`), btnSubmitCopy: t(`btn_confirm`),
      handleOpenChange: e.handleOpenChange, isOpen: e.isOpen, modalTitle: t(`chat_rename_modal_title`),
      onRenameSubmit: e.handleSubmit, setTitle: e.setNewTitle, title: e.newTitle, titlePlaceholder: t(
        `chat_rename_modal_input_placeholder`) }) },
  O = t({ default: () => k }),
  k = e => { let { user: t, onNewChat: n, isImageHeroVisible: r = !1 } = e, i = h(e => e.setIsOpen), a = h(e => e
        .isOpen), c = _(e => e.setIsOpen), v = _(e => e.isOpen), { isEnabled: y } = ve(), b = be(), w = b === `guest` &&
      v, T = b === `authed` && a, { handleNewChat: E } = le(), { openSignInModal: O } = ue(), { isIncognito: k,
        isOnExistingChat: A, isOnExistingIncognitoChat: j, toggleIncognito: Pe, isOnProject: Fe, isOnImageFunnel: Ie,
        isOnDeepResearch: Le } = ye({ isAuthenticatedHint: !!t && t.type !== `guest` }), Re = ce(e => e
        .isDeepResearchMode), M = l(`Auth`), N = l(`Chat`), P = fe(s()), F = oe();
    Me(); let { isBingTraffic: ze } = De(), I = o(), L = I.get(`embed`), Be = g(e => e.currentChatId), R = g(e => e
        .isImageCreationHeroVisible) || r, z = g(e => e.isBackgroundRemovalHeroVisible), B = !t || t.type === `guest`,
      Ve = Se(), { status: He, isAuthenticated: Ue } = u(), V = B && !Ue, We = xe(Ve, He, !V), H = V && We, Ge = !H,
      Ke = F?.match(/^\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/)?.[1] ?? null, U = Be ?? Ke,
      qe = z && !F?.includes(`background-removal`), W = R || F?.endsWith(`/images`) || !!U && te(U), G = F?.includes(
        `image-enhancer`) || I.get(`image-enhancer`) === `true` || !!U && ne(U), K = z || F?.includes(
        `background-removal`) || !!U && ee(U), Je = B && (R || K || G), q = F.startsWith(`/teams`), J = F.startsWith(
        `/teams`) ? F.split(`/`).filter(Boolean) : [], Ye = q && (J.length <= 1 || J.length === 2 && [`chats`,
        `projects`, `files`
      ].includes(J[1] ?? ``) || J.length === 3 && J[1] === `project`), Xe = q && !Ye, Ze = F.startsWith(
        `/organization/settings`), Qe = F.startsWith(`/organization`), $e = ie(e => e.workspace), { isInTeam: et } =
      ae(), Y = $e === `organization` && et, tt = F === `/`, X = A || j, Z = F.startsWith(`/project/`), nt = Z && F
      .split(`/`).length > 3, rt = Z && !nt, Q = H && Je && W && !K && !G, it = W && !K && !G, at = W || G || K, $ =
      H && !Je; return (0, D.jsxs)(D.Fragment, { children: [(0, D.jsx)(`header`, { className: m(
          `user-select-none bg-paper sticky top-0 z-20 w-full [@media(min-width:650px)_and_(min-height:650px)]:hidden`,
          X && `border-border border-b`, !(!H || Q || $) && `hidden`), children: (0, D.jsxs)(
        `div`, { className: `flex h-[60px] min-h-[60px] w-full items-center px-4`, children: [!H && (0, D
            .jsxs)(D.Fragment, { children: [!qe && (0, D.jsxs)(
            `div`, { className: `flex items-center gap-2`, children: [b === `authed` && (0, D
                .jsx)(
              p, { className: `flex h-9 w-9 [&_svg]:size-5 [@media(min-width:650px)_and_(min-height:650px)]:hidden`, "data-testid": `sidebar-toggle-button`,
                onClick: () => i(!0), size: `icon`, variant: `ghost`, children: (0, D
                  .jsx)(me, { className: m(`text-secondary`, P &&
                    `[transform:scaleX(-1)]`) }) }), !T && !at && (0, D.jsx)(
              _e, { ariaLabel: N(`home_link_label`), onClick: E })] }), it ? (0, D.jsx)(
            `div`, { className: m(`flex items-center`, !X &&
                `absolute left-1/2 -translate-x-1/2`), children: (0, D.jsx)(x, {}) }) : null, (
              0, D.jsxs)(`div`, { className: `ms-auto flex items-center sm:gap-4`, children: [
                Ge && !A && !j && !Fe && !Ie && !q && !Ze && !Qe && !Y && !W && !K && !G &&
                !Le && !Re && (0, D.jsxs)(Te, { children: [(0, D.jsx)(Ce, { asChild: !0,
                    children: (0, D.jsx)(p, { className: m(
                        `relative [&_svg]:size-5`, k && `text-primary`
                        ), "data-testid": `incognito-toggle-button`, onClick: Pe,
                      size: `icon`, variant: `ghost`, children: k ? (0, D.jsx)(
                        C, { className: `h-5 w-5` }) : (0, D.jsx)(
                      Ae, { className: `h-5 w-5` }) }) }), (0, D.jsx)(
                  we, { className: `border-black bg-black text-white`,
                    side: `bottom`, children: (0, D.jsx)(`p`, { children: N(k ?
                        `tooltip_incognito_off` : `tooltip_incognito_on`) }) })] }), Ge && !
                Y && j && (0, D.jsxs)(`div`, { className: `flex items-center gap-1`,
                  children: [(0, D.jsx)(S, {}), (0, D.jsx)(
                  `div`, { className: `text-primary relative cursor-default p-2`, "data-testid": `incognito-toggle-button`,
                    children: (0, D.jsx)(C, { className: `h-4 w-4` }) })] }), (!tt || X) &&
                (!q || Xe) && !Ze && !Qe && (0, D.jsxs)(D.Fragment, { children: [(0, D.jsx)(
                    p, { className: `[&_svg]:size-5`, onClick: E, size: `icon`,
                      variant: `ghost`, children: (0, D.jsx)(
                      Ee, { className: `text-dark dark:text-gray-200` }) }), (0, D
                    .jsx)(S, {}), !qe && !Y && (0, D.jsx)(Oe, {}), rt ? (0, D.jsx)(
                  je, {}) : (0, D.jsx)(ke, {})] })
              ] })] }), H && (Q || y && $) && (0, D.jsxs)(
          `div`, { className: `flex w-full items-center gap-2`, children: [y && b === `guest` && (0,
                D.jsx)(
            p, { className: `flex h-9 w-9 [&_svg]:size-5`, "data-testid": `guest-sidebar-toggle-button`,
                onClick: () => c(!0), size: `icon`, variant: `ghost`, children: (0, D.jsx)(
                me, { className: m(`text-secondary`, P && `[transform:scaleX(-1)]`) }) }), $ && !
              w && (0, D.jsx)(_e, { ariaLabel: N(`home_link_label`), onClick: () => { if (n) { n
                  (); return } E() } }), Q && (0, D.jsx)(
              `div`, { className: `absolute left-1/2 flex -translate-x-1/2 items-center`,
                children: (0, D.jsx)(x, {}) }), $ && !L && (0, D.jsx)(
            p, { className: `ms-auto`, "data-testid": `guest-sidebar-header-signin-button`,
                onClick: () => { re(d.CHAT_PAGE); let e = G ? `/image-enhancer` : K ?
                    `/background-removal` : W ? `/images` : void 0;
                  O(W ? f.IMAGE_FUNNEL : f.MOBILE_SIGNIN_BUTTON, e) }, size: `chip`,
                variant: `cta`, children: M(`auth_signin_button`) })
            ] }), $ && (0, D.jsxs)(D.Fragment, { children: [W && !K && !G ? (0, D.jsx)(
              `div`, { className: `flex min-w-0 flex-1 items-center gap-1.5`, children: (0, D
                  .jsx)(`div`, { className: `w-fit min-w-0`, children: (0, D.jsx)(x, {}) }) }) :
              null, !y && (0, D.jsxs)(se, { "aria-label": N(`home_link_label`),
                className: `flex cursor-pointer items-center justify-center gap-2`, href: `/`,
                onClick: e => { e.preventDefault(), n?.() }, children: [!ze && (0, D.jsxs)(D
                    .Fragment, { children: [(0, D.jsx)(
                      de, { className: `h-5 w-5 shrink-0 dark:hidden` }), (0, D.jsx)(
                      pe, { className: `hidden h-5 w-5 shrink-0 dark:block` })] }), (0, D.jsx)
                  (he, { className: `mb-[3px] h-4 w-auto dark:hidden` }), (0, D.jsx)(
                  ge, { className: `mb-[3px] hidden h-4 w-auto dark:block` })
                ] }), !L && !y && (0, D.jsx)(
              `div`, { className: `ms-auto flex flex-col items-end gap-0.5`, children: (0, D
                  .jsx)(p, { "data-testid": `mobile-header-sign-in-button`,
              onClick: () => { re(d.CHAT_PAGE); let e = G ? `/image-enhancer` : K ?
                      `/background-removal` : W ? `/images` : void 0;
                    O(W ? f.IMAGE_FUNNEL : f.MOBILE_SIGNIN_BUTTON, e) }, size: `chip`,
                  variant: `cta`, children: M(`auth_signin_button`) }) })
            ] })] }) }), (0, D.jsx)(
      `div`, { className: `[@media(min-width:650px)_and_(min-height:650px)]:hidden`, children: (0, D.jsx)(
        Ne, {}) })] }) };
export { O as n, k as t };
