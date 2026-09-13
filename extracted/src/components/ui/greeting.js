/**
 * Source: https://use.ai/_next/static/chunks/greeting-DWuLTDrZ.js
 * Module: greeting
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { a as r } from "./experiment-client.service-CXqfLU-5.js";
import { t as i } from "./arrow-up-right-u72iYOnW.js";
import { n as a } from "./react-client-DI5BViDH.js";
import { n as o } from "./better-auth-client-session.service-1Lowatea.js";
import { t as s } from "./report-client-error.util-Bq41AYxy.js";
import { t as c } from "./utils-DBS9-MOh.js";
import { i as l } from "./mixpanel-B_WP0jc-.js";
import { t as u } from "./intl-CED8MIZm.js";
import { r as d } from "./is-mobile.service-BZEOpDHM.js";
import { r as f } from "./chat.store-CCLMl5kX.js";
import { t as p } from "./auth.store-DeUNDeDH.js";
import { t as m } from "./site-route.interface-CnbxJHY2.js";
import { t as h } from "./logo-icon-C5Mo55YO.js";
import { n as g } from "./experiment.provider-BEhampe0.js";
import "./client-BL58m4Hx.js";
import { t as _ } from "./use-track-experiment-view.hook-D5ID5Wj0.js";
import { t as v } from "./logo-icon-white-QiZ2Ybc-.js";
import { a as y } from "./model-catalog.provider-Cwkj1DM4.js";
import { t as b } from "./use-user.hook-C0ENPFwj.js";
import { n as x, t as S } from "./use-guest-sidebar-menu.hook-YCGK8tSI.js";
import { n as C } from "./use-incognito-chat.hook-D4pEi9zH.js";
import { t as w } from "./use-auth-known.hook-C1WWcve_.js";
import { n as T } from "./initial-auth-state.provider-DUS-CXUE.js";
import { n as E } from "./open-after-viewport-settle.util-LlI9f_aE.js";
import { n as D } from "./chat-landing-variant.provider-CFxvAtmo.js";
import { t as O } from "./set-chat-model-CcUeiTyz.js";
import { t as k } from "./model-selector-B-4SXsDe.js";
import { t as A } from "./use-traffic-detection.hook-DS84CRee.js";
import { r as j } from "./use-display-user.hook-YphSqSE-.js";
var M = e => ({ variant: `OFF`, isEnabled: !1, isInExperiment: !1, trackExperimentView: () => {} }),
  N = e(t(), 1),
  P = n(),
  F = e => { let { onHeightChange: t, sticky: n = !0, centered: r } = e, i = a(`Sidebar`), { isEnabled: o } = S(), s = (
        0, N.useRef)(null), l = f(e => e.promptSuggestionsExpanded), p = !n && l, h = d(), { isBingTraffic: g } = A(),
      _ = r == null ? g : !r, v = (0, N.useCallback)(e => { if (s.current?.disconnect(), s.current = null, !e) { t?.(
            0); return } t && (s.current = new ResizeObserver(() => { t(e.offsetHeight) }), s.current.observe(e)) }, [
        t]); return (0, P.jsx)(`div`, { className: c(`flex items-center justify-center pt-2`, n &&
        `bg-paper sticky bottom-0`, p && `invisible`, h && !_ ? `px-2` : `px-4`), "data-hide-on-keyboard": n ? `` :
        void 0, ref: v, style: { paddingBottom: `calc(0.5rem + var(--cookie-banner-offset, 0px))` }, children: (0, P
        .jsx)(`p`, { className: c(`mx-auto max-w-[750px] text-center font-normal`, _ ?
          `desktop:text-[14px] text-[12px] text-gray-500 dark:text-gray-400` :
          `text-[14px] text-gray-700 dark:text-gray-300`), children: i.rich(o ? `guest_menu_disclaimer` :
          `sidebar_disclaimer`, { terms: e => (0, P.jsx)(u, { className: `underline`, href: m.TERMS,
              children: e }), privacy: e => (0, P.jsx)(u, { className: `underline`, href: m.PRIVACY,
              children: e }) }) }) }) },
  I = e => { let { collapsed: t } = e; return (0, P.jsx)(`div`, { className: c(
        `grid motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out`, t ?
        `invisible mt-0 grid-rows-[0fr] opacity-0` : `mt-2 grid-rows-[1fr] opacity-100`
        ), "data-guest-disclaimer-collapse": ``, children: (0, P.jsx)(`div`, { className: `min-h-0 overflow-hidden`,
        children: (0, P.jsx)(F, { centered: !0, sticky: !1 }) }) }) },
  L = () => { let e = g(r.MAIN_PAGE_NEW_FEATURE_BADGE, `OFF`),
      { isMainPage: t } = x(),
      n = e === `B`,
      i = t && (e === `A` || e === `B`); return _({ experimentName: r.MAIN_PAGE_NEW_FEATURE_BADGE, experimentValue: e,
      shouldTrack: i }), { variant: e, isEnabled: n, isInExperiment: i, trackExperimentView: () => {} } },
  R = `new-feature-badge-dismissed`,
  z = `new-feature-badge-try-now-clicked`,
  B = `new-feature-badge-target-model`,
  V = () => { let e = a(`Sidebar`),
      { isEnabled: t } = L(),
      n = f(e => e.selectedModel),
      r = f(e => e.isModelHydrated),
      { data: s } = o(),
      c = !!s?.user && s.user.type !== `guest`,
      { mutateAsync: u } = O(),
      { newFeatureBadge: d } = y(),
      [m, h] = (0, N.useState)(() => localStorage.getItem(R) === `true` || sessionStorage.getItem(z) === `true`),
      g = { targetModel: d.byCurrentModel[n] ?? d.defaultTargetSlug },
      _ = (0, N.useCallback)(e => { f.getState().setSelectedModel(e), u({ model: e }).catch(() => {}) }, [u]);
    (0, N.useEffect)(() => { if (!c || !r || sessionStorage.getItem(z) !== `true`) return; let e = sessionStorage
        .getItem(B);
      sessionStorage.removeItem(z), sessionStorage.removeItem(B), localStorage.setItem(R, `true`), e && _(e) }, [c, r,
      _
    ]); let v = (0, N.useCallback)(() => { localStorage.setItem(R, `true`), h(!0) }, []),
      b = (0, N.useRef)(null);
    (0, N.useEffect)(() => { if (!r) return; let e = b.current; if (b.current = n, e === null || e === n) return; let
        t = d.byCurrentModel[e] ?? d.defaultTargetSlug;
      n === t && v() }, [n, r, v, d]); let x = (0, N.useCallback)(() => { c ? (_(g.targetModel), v()) : (sessionStorage
        .setItem(z, `true`), sessionStorage.setItem(B, g.targetModel), p.getState().openSignInModal(l
          .NEW_FEATURE_BADGE)) }, [c, g.targetModel, _, v]); return !t || m ? null : (0, P.jsxs)(
    `div`, { className: `mt-3 mb-5 flex items-center gap-2 px-3 sm:mt-0`, children: [(0, P.jsx)(
        `span`, { className: `text-accent shrink-0 text-xs font-medium`, children: e(`new_feature_badge_new`) }),
        (0, P.jsxs)(`button`, { className: `text-accent flex shrink-0 items-center gap-1 text-xs font-medium`,
          onClick: x, type: `button`, children: [e(`new_feature_badge_try_now`), (0, P.jsx)(
          i, { className: `h-3.5 w-3.5`, strokeWidth: 2.5 })] }), (0, P.jsx)(`button`, { "aria-label": e(
            `new_feature_badge_dismiss`),
          className: `text-default-400 hover:text-default-600 ml-2 shrink-0 text-base leading-none`, onClick: v,
          type: `button`, children: `×` })
      ] }) },
  H = (e = !1) => { try { let t = new Date().getHours(); return t >= 5 && t < 12 ? e ?
        `chat_greeting_good_morning_name` : `chat_greeting_good_morning` : t >= 12 && t < 18 ? e ?
        `chat_greeting_good_afternoon_name` : `chat_greeting_good_afternoon` : t >= 18 || t < 5 ? e ?
        `chat_greeting_good_evening_name` : `chat_greeting_good_evening` : e ? `chat_greeting_good_afternoon_name` :
        `chat_greeting_good_afternoon` } catch { return e ? `chat_greeting_hello_name` : `chat_greeting_hello` } },
  U = e => { let { user: t } = b(), { name: n } = j(), r = (0, N.useMemo)(() => { let e = n ?? t?.name; return e ? e
          .split(` `)[0] : null }, [n, t?.name]), i = (0, N.useMemo)(() => e ?? (!!t && t.type !== `guest`), [e, t]),
      a = D(), o = (0, N.useMemo)(() => i && !!r, [i, r]); return { greetingKey: (0, N.useMemo)(() => H(o), [o]),
      userName: (0, N.useMemo)(() => o ? r : null, [o, r]), isAuthenticated: i, hasUserName: o, chatGreetingText: (0, N
        .useMemo)(() => i || a === `model-unlocked` || a === `auto-unlocked` ? `chat_greeting_help_short_bing` :
        `chat_greeting_personal_assistant`, [i, a]) } },
  W = class extends N.Component { constructor(e) { super(e), this.state = { hasError: !
          1 } } static getDerivedStateFromError() { return { hasError: !0 } } componentDidCatch(e) { console.error(
          `Greeting component error boundary caught error:`, e), s(e, `render`) } render() { return this.state
          .hasError ? this.props.fallback || (0, P.jsxs)(
          `div`, { className: `mx-auto flex max-w-3xl flex-col items-center px-8 text-center`, "data-testid": `greeting-error-fallback`,
            children: [(0, P.jsx)(h, { className: `dark:hidden`, height: 36, style: { marginBottom: `20px` },
              width: 36 }), (0, P.jsx)(v, { className: `hidden dark:block`, height: 36,
              style: { marginBottom: `20px` }, width: 36 }), (0, P.jsx)(
            `div`, { className: `text-2xl font-medium`, children: `Hello there!` }), (0, P.jsx)(
            `div`, { className: `text-2xl text-[#888888]`, children: `How can I help you today?` })] }) : this.props
          .children } },
  G = (0, N.memo)(({ user: e, initialChatModel: t }) => { let n = a(`Chat`),
      r = !!e && e.type !== `guest`,
      { chatGreetingText: i } = U(r),
      s = T(),
      { status: l } = o(),
      u = w(s, l, r),
      p = d(),
      { isIncognito: m } = C({ isAuthenticatedHint: r }),
      h = k(t),
      g = f(e => e.isTextareaTooltipVisible),
      _ = f(e => e.textareaTooltipHeight),
      v = f(e => e.isDeepResearchMode),
      { modes: y } = E(),
      b = y ? !!y.isDeepResearchMode : v,
      x = g && p ? _ + 8 : 0,
      S = m ? `chat_greeting_incognito` : b ? `chat_greeting_deep_research` : !r && u ?
      `chat_greeting_personal_assistant` : i; return (0, P.jsxs)(`div`, { className: c(
        `dark:text-foreground mx-auto mb-2 flex max-w-3xl flex-col items-center gap-2 text-center text-[#3D3D3D]`,
        p ? `px-0` : `px-8`), "data-testid": `greeting-component`, style: { transform: `translateY(-${x}px)`,
        transition: `transform 0.2s ease-out` }, children: [(0, P.jsx)(`div`, { className: `text-2xl font-medium`,
        style: { paddingBottom: p || !r && h ? `0px` : `28px` }, children: n(S) }), !r && h && (0, P.jsx)(
        `div`, { className: c(`text-base text-gray-500`, p ? `pb-0` :
          `pb-3`), "data-testid": `greeting-model-subheadline`, children: h })] }) });
G.displayName = `Greeting`;
var K = (0, N.memo)(({ user: e, initialChatModel: t }) => (0, P.jsx)(W, { children: (0, P.jsx)(G, { initialChatModel: t,
    user: e }) }));
K.displayName = `WrappedGreeting`;
export { M as a, F as i, V as n, I as r, K as t };
