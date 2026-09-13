/**
 * Source: https://use.ai/_next/static/chunks/mobile-chat-header.component-oOGK-Div.js
 * Module: mobile-chat-header.component
 * Extracted & Beautified
 */

const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = [
  "_next/static/chunks/mobile-project-menu.component-BzdKmbfK.js", "_next/static/chunks/framework-D-uKrMmN.js",
  "_next/static/chunks/rolldown-runtime-C0FnF6B9.js", "_next/static/chunks/vinext-DaPQ-kLo.js",
  "_next/static/chunks/ellipsis-DHUbA1Fi.js", "_next/static/chunks/createLucideIcon-CVSF7wvO.js",
  "_next/static/chunks/react-client-DI5BViDH.js", "_next/static/chunks/react-CWjhjU4R.js",
  "_next/static/chunks/projects-BdKj6Hhz.js", "_next/static/chunks/useQuery-BgSNoQ7j.js",
  "_next/static/chunks/mutation-DO0ikfMC.js", "_next/static/chunks/thenable-BrrDvP6E.js",
  "_next/static/chunks/rest-api.provider-cvDCweR_.js", "_next/static/chunks/hydration-BI7_jV4G.js",
  "_next/static/chunks/QueryClientProvider-DGxN9XtP.js", "_next/static/chunks/dynamic.service-D2nUn8U-.js",
  "_next/static/chunks/dynamic-preload-chunks-BkpXLrkh.js", "_next/static/chunks/useMutation-DldRSjFA.js",
  "_next/static/chunks/queryOptions-Dfvzj6n2.js", "_next/static/chunks/rest-api-BL5a3YVm.js",
  "_next/static/chunks/env-C6AULCj5.js", "_next/static/chunks/project-key.constant-DL2-hOys.js",
  "_next/static/chunks/better-auth-client-session.service-1Lowatea.js",
  "_next/static/chunks/recovery-marker.util-CkI39M8u.js", "_next/static/chunks/api-error-body.util-DJXtb-RF.js",
  "_next/static/chunks/worker-auth.service-oGq_wKdT.js",
  "_next/static/chunks/report-client-error.util-Bq41AYxy.js", "_next/static/chunks/pencil-edit-CQfkNnBZ.js",
  "_next/static/chunks/trash-Qu5NuJYS.js", "_next/static/chunks/button-B7ERdP8H.js",
  "_next/static/chunks/bundle-mjs-cJTHqqzI.js", "_next/static/chunks/loader-circle-C38mqwuC.js",
  "_next/static/chunks/dist-DKq-7tPa.js", "_next/static/chunks/utils-DBS9-MOh.js",
  "_next/static/chunks/analytics.service-9oUGcSKY.js", "_next/static/chunks/freemium-funnel.util-BsrrWeXM.js",
  "_next/static/chunks/safe-session-storage.util-DN4NSHVM.js", "_next/static/chunks/gtm-CzTak35f.js",
  "_next/static/chunks/mixpanel-B_WP0jc-.js", "_next/static/chunks/project.store-BF8RoGfi.js",
  "_next/static/chunks/react-D8-vnz5K.js", "_next/static/chunks/middleware-Df3VXbEU.js",
  "_next/static/chunks/dropdown-menu-CoJMIpYs.js", "_next/static/chunks/check-CWA6FeXs.js",
  "_next/static/chunks/chevron-right-Dw6SaFc4.js", "_next/static/chunks/circle-BS-Vzwf7.js",
  "_next/static/chunks/dist-Bk3YTB5a.js", "_next/static/chunks/dist-DHTrxFRs.js",
  "_next/static/chunks/dist-wURgM5if.js", "_next/static/chunks/dist-DNAaWyma.js",
  "_next/static/chunks/dist-CEdsmZbM.js", "_next/static/chunks/dist-1ej2Hjrt.js",
  "_next/static/chunks/es2015-fuZyN7gw.js", "_next/static/chunks/dist-uRWxuiG0.js",
  "_next/static/chunks/dist-DbhSOkZC2.js", "_next/static/chunks/dist-jciTo-QL.js",
  "_next/static/chunks/floating-ui.react-dom-xN1K-ASj.js", "_next/static/chunks/dist-BbbTHrHw.js",
  "_next/static/chunks/dist-CQK36Nza.js", "_next/static/chunks/global.store-DXaW4jb5.js",
  "_next/static/chunks/shallow-CKWb1b-W.js"
]))) => i.map(i => d[i]);
import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n, r } from "./framework-D-uKrMmN.js";
import { nt as i, rt as a, tt as o } from "./vinext-DaPQ-kLo.js";
import { r as s } from "./react-CWjhjU4R.js";
import { t as c } from "./dynamic.service-D2nUn8U-.js";
import { n as l } from "./react-client-DI5BViDH.js";
import { n as ee } from "./better-auth-client-session.service-1Lowatea.js";
import { t as u } from "./button-B7ERdP8H.js";
import { t as d } from "./utils-DBS9-MOh.js";
import { F as f, N as te, T as ne, k as re, x as p } from "./analytics.service-9oUGcSKY.js";
import { i as m } from "./mixpanel-B_WP0jc-.js";
import { n as ie, t as ae } from "./intl-CED8MIZm.js";
import { t as h } from "./sidebar.store-3O6FZkMw.js";
import { r as oe } from "./chat.store-CCLMl5kX.js";
import { t as g } from "./global.store-DXaW4jb5.js";
import { i as se } from "./new-chat.service-D_uV9h89.js";
import { t as ce } from "./auth.store-DeUNDeDH.js";
import { t as le } from "./logo-icon-C5Mo55YO.js";
import { t as ue } from "./is-locale-arabic.util-BT0uO3uA.js";
import { t as de } from "./logo-icon-white-QiZ2Ybc-.js";
import { t as _ } from "./menu-DmuxtmLj.js";
import { t as fe } from "./useai-CiXQTOJ8.js";
import { t as pe } from "./useai-white-BcU4k_RY.js";
import { t as me } from "./mobile-header-logo-CpKg0dh8.js";
import { t as he } from "./use-guest-sidebar-menu.hook-YCGK8tSI.js";
import { n as ge } from "./use-incognito-chat.hook-D4pEi9zH.js";
import { n as _e } from "./mobile-drawer.provider-D6C04T1C.js";
import { t as v } from "./guest-sidebar-menu.store-D01MKXdQ.js";
import { t as ve } from "./use-auth-known.hook-C1WWcve_.js";
import { n as ye } from "./initial-auth-state.provider-DUS-CXUE.js";
import { t as y } from "./shallow-CKWb1b-W.js";
import { t as b } from "./blur-keyboard.service-Cw_wHZxR.js";
import { i as be, n as xe, t as Se } from "./tooltip-WNS8Gl08.js";
import { t as x } from "./rename-item-modal-2hixoasb.js";
import { t as Ce } from "./new-chat-DRFSeAfv.js";
import { a as S } from "./model-selector-B-4SXsDe.js";
import { t as we } from "./use-traffic-detection.hook-DS84CRee.js";
import { i as Te, n as Ee, o as C, t as w } from "./rename-chat-modal-CXNm7mct.js";
import { n as De, t as T } from "./incognito-chat-enabled-BE8jAbsG.js";
a();
var Oe = c(() => i(() => import(`./mobile-project-menu.component-BzdKmbfK.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60
  ])), { loadableGenerated: { modules: [`src/app/features/mobile-project-menu/mobile-project-menu.component.tsx`] } }),
  E = e(n(), 1),
  ke = () => {
    (0, E.useEffect)(() => { let e = window.visualViewport; if (!e) return; let t = document.documentElement,
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
  D = () => { let { renameChatId: e, isRenameModalOpen: t, currentChatTitle: n, setRenameChatId: r,
      setIsRenameModalOpen: i, setCurrentChatTitle: a } = g(y(e => ({ renameChatId: e.renameChatId, isRenameModalOpen: e
          .isRenameModalOpen, currentChatTitle: e.currentChatTitle, setRenameChatId: e.setRenameChatId,
        setIsRenameModalOpen: e.setIsRenameModalOpen, setCurrentChatTitle: e
      .setCurrentChatTitle }))), { renameChat: o } = w(), [s, c] = (0, E.useState)(n), [l, ee] = (0, E.useState)(n);
    l !== n && (ee(n), c(n)); let u = (0, E.useCallback)(async e => { e ? i(!0) : (await b(), i(!1), r(null), a(``), c(
          ``)) }, [i, r, a]),
      d = async t => { t && e && (r(null), c(``), await o(e, t, { originalTitle: n })) }; return { isOpen: t,
      handleOpenChange: u, newTitle: s, setNewTitle: c, handleSubmit: () => { let e = s.trim();
        e ? (d(e), c(``), u(!1)) : u(!1) } } },
  O = r(),
  Ae = () => { let e = D(),
      t = l(`Chat`); return (0, O.jsx)(x, { btnCancelCopy: t(`btn_cancel`), btnSubmitCopy: t(`btn_confirm`),
      handleOpenChange: e.handleOpenChange, isOpen: e.isOpen, modalTitle: t(`chat_rename_modal_title`),
      onRenameSubmit: e.handleSubmit, setTitle: e.setNewTitle, title: e.newTitle, titlePlaceholder: t(
        `chat_rename_modal_input_placeholder`) }) },
  k = t({ default: () => A }),
  A = e => { let { user: t, onNewChat: n, isImageHeroVisible: r = !1 } = e, i = h(e => e.setIsOpen), a = h(e => e
        .isOpen), c = v(e => e.setIsOpen), y = v(e => e.isOpen), { isEnabled: b } = he(), x = _e(), w = x === `guest` &&
      y, E = x === `authed` && a, { handleNewChat: D } = se(), { openSignInModal: k } = ce(), { isIncognito: A,
        isOnExistingChat: j, isOnExistingIncognitoChat: M, toggleIncognito: je, isOnProject: Me, isOnImageFunnel: Ne,
        isOnDeepResearch: Pe } = ge({ isAuthenticatedHint: !!t && t.type !== `guest` }), Fe = oe(e => e
        .isDeepResearchMode), N = l(`Auth`), P = l(`Chat`), F = ue(s()), I = ie();
    ke(); let { isBingTraffic: Ie } = we(), L = o(), R = L.get(`embed`), Le = g(e => e.currentChatId), z = g(e => e
        .isImageCreationHeroVisible) || r, B = g(e => e.isBackgroundRemovalHeroVisible), V = !t || t.type === `guest`,
      Re = ye(), { status: ze, isAuthenticated: Be } = ee(), H = V && !Be, Ve = ve(Re, ze, !H), U = H && Ve, W = !U,
      He = I?.match(/^\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/)?.[1] ?? null, G = Le ?? He, K =
      B && !I?.includes(`background-removal`), q = z || I?.endsWith(`/images`) || !!G && ne(G), J = I?.includes(
        `image-enhancer`) || L.get(`image-enhancer`) === `true` || !!G && re(G), Y = B || I?.includes(
        `background-removal`) || !!G && te(G), Ue = V && (z || Y || J), We = I === `/`, X = j || M, Z = I.startsWith(
        `/project/`), Ge = Z && I.split(`/`).length > 3, Ke = Z && !Ge, Q = U && Ue && q && !Y && !J, qe = q && !Y && !
      J, Je = q || J || Y, $ = U && !Ue; return (0, O.jsxs)(O.Fragment, { children: [(0, O.jsx)(
      `header`, { className: d(
            `user-select-none bg-paper sticky top-0 z-20 w-full [@media(min-width:650px)_and_(min-height:650px)]:hidden`,
            X && `border-border border-b`, !(!U || Q || $) && `hidden`), children: (0, O.jsxs)(
        `div`, { className: `flex h-[60px] min-h-[60px] w-full items-center px-4`, children: [!U && (0, O
            .jsxs)(O.Fragment, { children: [!K && (0, O.jsxs)(
            `div`, { className: `flex items-center gap-2`, children: [x === `authed` && (0, O
                .jsx)(
              u, { className: `flex h-9 w-9 [&_svg]:size-5 [@media(min-width:650px)_and_(min-height:650px)]:hidden`, "data-testid": `sidebar-toggle-button`,
                onClick: () => i(!0), size: `icon`, variant: `ghost`, children: (0, O
                  .jsx)(_, { className: d(`text-secondary`, F &&
                    `[transform:scaleX(-1)]`) }) }), !E && !Je && (0, O.jsx)(
              me, { ariaLabel: P(`home_link_label`), onClick: D })] }), qe ? (0, O.jsx)(
            `div`, { className: d(`flex items-center`, !X &&
                `absolute left-1/2 -translate-x-1/2`), children: (0, O.jsx)(S, {}) }) : null, (
              0, O.jsxs)(`div`, { className: `ms-auto flex items-center sm:gap-4`, children: [
                W && !j && !M && !Me && !Ne && !q && !Y && !J && !Pe && !Fe && (0, O.jsxs)(
                  Se, { children: [(0, O.jsx)(be, { asChild: !0, children: (0, O.jsx)(
                      u, { className: d(`relative [&_svg]:size-5`, A &&
                          `text-primary`
                          ), "data-testid": `incognito-toggle-button`, onClick: je,
                        size: `icon`, variant: `ghost`, children: A ? (0, O.jsx)(
                          T, { className: `h-5 w-5` }) : (0, O.jsx)(
                        De, { className: `h-5 w-5` }) }) }), (0, O.jsx)(
                    xe, { className: `border-black bg-black text-white`,
                      side: `bottom`, children: (0, O.jsx)(`p`, { children: P(A ?
                          `tooltip_incognito_off` : `tooltip_incognito_on`) }) })] }), W &&
                M && (0, O.jsxs)(`div`, { className: `flex items-center gap-1`, children: [(
                    0, O.jsx)(C, {}), (0, O.jsx)(
                  `div`, { className: `text-primary relative cursor-default p-2`, "data-testid": `incognito-toggle-button`,
                    children: (0, O.jsx)(T, { className: `h-4 w-4` }) })] }), (!We || X) &&
                (0, O.jsxs)(O.Fragment, { children: [(0, O.jsx)(
                  u, { className: `[&_svg]:size-5`, onClick: D, size: `icon`,
                    variant: `ghost`, children: (0, O.jsx)(
                    Ce, { className: `text-dark dark:text-gray-200` }) }), (0, O.jsx)(
                    C, {}), !K && (0, O.jsx)(Te, {}), Ke ? (0, O.jsx)(Oe, {}) : (0, O
                    .jsx)(Ee, {})] })
              ] })] }), U && (Q || b && $) && (0, O.jsxs)(
          `div`, { className: `flex w-full items-center gap-2`, children: [b && x === `guest` && (0,
                O.jsx)(
            u, { className: `flex h-9 w-9 [&_svg]:size-5`, "data-testid": `guest-sidebar-toggle-button`,
                onClick: () => c(!0), size: `icon`, variant: `ghost`, children: (0, O.jsx)(
                _, { className: d(`text-secondary`, F && `[transform:scaleX(-1)]`) }) }), $ && !
              w && (0, O.jsx)(me, { ariaLabel: P(`home_link_label`), onClick: () => { if (n) { n
                  (); return } D() } }), Q && (0, O.jsx)(
              `div`, { className: `absolute left-1/2 flex -translate-x-1/2 items-center`,
                children: (0, O.jsx)(S, {}) }), $ && !R && (0, O.jsx)(
            u, { className: `ms-auto`, "data-testid": `guest-sidebar-header-signin-button`,
                onClick: () => { p(f.CHAT_PAGE); let e = J ? `/image-enhancer` : Y ?
                    `/background-removal` : q ? `/images` : void 0;
                  k(q ? m.IMAGE_FUNNEL : m.MOBILE_SIGNIN_BUTTON, e) }, size: `chip`,
                variant: `cta`, children: N(`auth_signin_button`) })
            ] }), $ && (0, O.jsxs)(O.Fragment, { children: [q && !Y && !J ? (0, O.jsx)(
              `div`, { className: `flex min-w-0 flex-1 items-center gap-1.5`, children: (0, O
                  .jsx)(`div`, { className: `w-fit min-w-0`, children: (0, O.jsx)(S, {}) }) }) :
              null, !b && (0, O.jsxs)(ae, { "aria-label": P(`home_link_label`),
                className: `flex cursor-pointer items-center justify-center gap-2`, href: `/`,
                onClick: e => { e.preventDefault(), n?.() }, children: [!Ie && (0, O.jsxs)(O
                    .Fragment, { children: [(0, O.jsx)(
                      le, { className: `h-5 w-5 shrink-0 dark:hidden` }), (0, O.jsx)(
                      de, { className: `hidden h-5 w-5 shrink-0 dark:block` })] }), (0, O.jsx)
                  (fe, { className: `mb-[3px] h-4 w-auto dark:hidden` }), (0, O.jsx)(
                  pe, { className: `mb-[3px] hidden h-4 w-auto dark:block` })
                ] }), !R && !b && (0, O.jsx)(
              `div`, { className: `ms-auto flex flex-col items-end gap-0.5`, children: (0, O
                  .jsx)(u, { "data-testid": `mobile-header-sign-in-button`, onClick: () => { p
                      (f.CHAT_PAGE); let e = J ? `/image-enhancer` : Y ?
                      `/background-removal` : q ? `/images` : void 0;
                    k(q ? m.IMAGE_FUNNEL : m.MOBILE_SIGNIN_BUTTON, e) }, size: `chip`,
                  variant: `cta`, children: N(`auth_signin_button`) }) })
            ] })] }) }), (0, O.jsx)(
      `div`, { className: `[@media(min-width:650px)_and_(min-height:650px)]:hidden`, children: (0, O.jsx)(
        Ae, {}) })] }) };
export { k as n, A as t };
