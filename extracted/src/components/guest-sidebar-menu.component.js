/**
 * Source: https://use.ai/_next/static/chunks/guest-sidebar-menu.component-WviJnH5Q.js
 * Module: guest-sidebar-menu.component
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { r } from "./react-CWjhjU4R.js";
import { t as i } from "./createLucideIcon-CVSF7wvO.js";
import { t as a } from "./arrow-up-right-u72iYOnW.js";
import { t as o } from "./chevron-down-CY8S3ZfR.js";
import { t as s } from "./chevron-left-BXhKvLzg.js";
import { t as c } from "./chevron-right-Dw6SaFc4.js";
import { t as l } from "./folder-BsW44kWZ.js";
import { t as u } from "./globe-D1MVs8b6.js";
import { n as d, r as f, t as p } from "./select-language.service-K5m-X5CX.js";
import { t as m } from "./plug-2-CsRLclIi.js";
import { t as h } from "./settings-CbTfeM3V.js";
import { t as g } from "./tag-D5oYp8ZF.js";
import { n as _ } from "./react-client-DI5BViDH.js";
import { n as v } from "./better-auth-client-session.service-ercwbZKT.js";
import { t as y } from "./analytics.service-BIbiLKmC.js";
import { n as b } from "./freemium-funnel.util-D0KPcbFz.js";
import { a as x, i as S } from "./mixpanel-CkBALibP.js";
import { n as C } from "./settings-cookie.util-C5vl4muy.js";
import { n as w, t as T } from "./button-B7ERdP8H.js";
import { t as E } from "./utils-DBS9-MOh.js";
import { c as D, r as O, t as k } from "./dialog-7Locadch.js";
import { n as ee, r as te, t as A } from "./intl-5y7Gu4iP.js";
import { r as ne } from "./is-mobile.service-c24xKO50.js";
import { i as j, l as M, n as N, t as P } from "./dropdown-menu-D6_Lrewr.js";
import { t as re } from "./global.store-DsM3x4UJ.js";
import { i as ie } from "./new-chat.service-CIiqAd78.js";
import { t as ae } from "./auth.store-CecpbI3z.js";
import { t as F } from "./site-route.interface-DlOSDxTR.js";
import { t as I } from "./logo-icon-C5Mo55YO.js";
import { t as oe } from "./proxy-B_99oKrn.js";
import { t as se } from "./AnimatePresence-wBEFtpNn.js";
import { t as ce } from "./files-D6piZW1u.js";
import { t as le } from "./is-locale-arabic.util-B4BIdGa2.js";
import { t as L } from "./logo-icon-white-QiZ2Ybc-.js";
import { i as R, r as z, t as B } from "./drawer-CrlfHJuB.js";
import { t as V } from "./useai-CiXQTOJ8.js";
import { t as H } from "./useai-white-BcU4k_RY.js";
import { t as ue } from "./use-guest-sidebar-menu.hook-D4ZKIqpw.js";
import { t as U } from "./mobile-drawer.provider-D6C04T1C.js";
import { t as W } from "./guest-sidebar-menu.store-D01MKXdQ.js";
import { t as de } from "./use-auth-known.hook-C1WWcve_.js";
import { t as fe } from "./use-post-auth-guest-hold.hook-DKAjN6Dj.js";
import { n as pe } from "./initial-auth-state.provider-DUS-CXUE.js";
import { n as me, r as he, t as ge } from "./popover-C7eaNV3m.js";
import { i as G, n as K, t as q } from "./tooltip-WNS8Gl08.js";
import { t as _e } from "./cancel-2J3UTq9u.js";
import { t as J } from "./separator-DOP1Rf65.js";
import { t as ve } from "./new-chat-DRFSeAfv.js";
import { a as ye } from "./chat-route.util-DIaoD1cB.js";
import { t as be } from "./image-C4T3aCpn.js";
import { n as xe, r as Se, t as Ce } from "./select-theme.service-DWChOL78.js";
import { a as we, n as Y, o as Te, s as Ee, t as De } from "./layout-sidebar-icon.component-Chawdw6U.js";
var Oe = i(`life-buoy`, [
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
    [`path`, { d: `m4.93 4.93 4.24 4.24`, key: `1ymg45` }],
    [`path`, { d: `m14.83 9.17 4.24-4.24`, key: `1cb5xl` }],
    [`path`, { d: `m14.83 14.83 4.24 4.24`, key: `q42g0n` }],
    [`path`, { d: `m9.17 14.83-4.24 4.24`, key: `bqpfvv` }],
    [`circle`, { cx: `12`, cy: `12`, r: `4`, key: `4exip2` }]
  ]),
  ke = i(`log-in`, [
    [`path`, { d: `m10 17 5-5-5-5`, key: `1bsop3` }],
    [`path`, { d: `M15 12H3`, key: `6jk70r` }],
    [`path`, { d: `M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4`, key: `u53s6r` }]
  ]),
  X = e(t(), 1),
  Z = n(),
  Q =
  `text-foreground group hover:bg-surface-tertiary-active dark:hover:bg-surface-secondary-active flex min-h-9 items-center justify-between gap-2 rounded-xl px-3 py-1.5 text-sm transition-colors`,
  Ae = e => { let { isMobile: t, isArabic: n, onNavigate: r, triggerClassName: i, endIcon: o, startIcon: s,
      labelClassName: l } = e, u = _(`Sidebar`), [d, f] = (0, X.useState)(!1), p = () => { f(!1), r() }, m = (0, Z.jsx)(
      a, { className: E(`text-ink-tertiary !h-4 !w-4 shrink-0 transition-opacity`, t ? `opacity-100` :
          `opacity-0 group-hover:opacity-100`, n && `[transform:scaleX(-1)]`) }); return (0, Z.jsxs)(
    ge, { onOpenChange: f, open: d, children: [(0, Z.jsxs)(he, { className: E(w({ size: `row`, variant: `ghost` }),
          `group hover:bg-surface-secondary-active !min-h-9 w-full shrink-0 justify-start gap-1.5 !rounded-xl`,
          i), "data-testid": `guest-menu-help`, children: [s || (0, Z.jsx)(
        Oe, { className: `text-ink-primary !h-5 !w-5`, strokeWidth: 1.5 }), (0, Z.jsx)(
        `span`, { className: E(`min-w-0 flex-1 text-start`, l), children: u(`label_help`) }), o || (0, Z
          .jsx)(c, { className: E(`text-ink-tertiary !h-4 !w-4 shrink-0 transition-opacity`, t ?
            `opacity-100` : `opacity-0 group-hover:opacity-100`, n && `[transform:scaleX(-1)]`) })] }), (0, Z
        .jsxs)(me, { align: `start`,
        className: `bg-paper dark:bg-gray-secondary w-[var(--radix-popover-trigger-width)] p-1 !shadow-sm`,
        side: `top`, children: [(0, Z.jsxs)(A, { className: Q, "data-testid": `guest-menu-help-center`,
          href: F.HELP, onClick: p, rel: `noopener noreferrer`, target: `_blank`, children: [u(
            `label_help_center`), m] }), (0, Z.jsx)(J, { className: `dark:bg-default-200 my-1` }), (0, Z
          .jsxs)(`div`, { className: `flex flex-col gap-1`, children: [(0, Z.jsxs)(
        A, { className: Q, "data-testid": `guest-menu-terms`, href: F.TERMS, onClick: p,
            rel: `noopener noreferrer`, target: `_blank`, children: [u(
              `sidebar_terms_and_conditions`), m] }), (0, Z.jsxs)(
        A, { className: Q, "data-testid": `guest-menu-privacy`, href: F.PRIVACY, onClick: p,
            rel: `noopener noreferrer`, target: `_blank`, children: [u(`sidebar_privacy_policy`),
              m
            ] })] })] })] }) },
  je = [{ value: `light`, icon: xe }, { value: `dark`, icon: Se }, { value: `system`, icon: f }],
  Me = e => { let { theme: t, onChangeTheme: n, className: r } = e, i = _(`Profile`), [a, s] = (0, X.useState)(!1), c =
      je.find(e => e.value === t)?.icon ?? f; return (0, Z.jsxs)(P, { modal: !1, onOpenChange: s, open: a, children: [(
        0, Z.jsx)(M, { asChild: !0, children: (0, Z.jsxs)(`button`, { className: E(
            `dark:bg-default-100 dark:hover:bg-default-200 flex h-14 w-full items-center gap-3 rounded-2xl bg-[#F5F5F6] px-4 text-left transition-colors hover:bg-[#efefef]`,
            r), "data-testid": `theme-switcher`, onClick: () => s(e => !e), onPointerDown: e => e
            .preventDefault(), type: `button`, children: [(0, Z.jsx)(
          c, { className: `text-ink-primary h-5 w-5 shrink-0`, strokeWidth: 1.5 }), (0, Z.jsxs)(
          `div`, { className: `flex min-w-0 flex-1 flex-col`, children: [(0, Z.jsx)(
              `span`, { className: `text-b1 text-ink-primary`, children: i(
                `appearance_title`) }), (0, Z.jsxs)(
            `span`, { className: `text-b2 text-ink-tertiary`, "data-testid": `current-theme`,
              children: [t === `light` && i(`theme_light`), t === `dark` && i(`theme_dark`),
                t === `system` && i(`theme_system`)
              ] })] }), (0, Z.jsx)(o, { className: `text-ink-tertiary h-4 w-4 shrink-0` })] }) }), (0, Z.jsx)(
      N, { align: `start`,
        className: `dark:bg-paper flex w-[var(--radix-dropdown-menu-trigger-width)] flex-col gap-0.5 p-2`, "data-testid": `theme-menu`,
        side: `bottom`, children: je.map(e => { let r = e.icon,
            a = e.value === t; return (0, Z.jsx)(j, { className: E(
              `font-default text-foreground w-full py-[6px] text-sm dark:data-[highlighted]:bg-gray-800`,
              a ? `dark:bg-background bg-[#efefef]` : ``), "data-testid": `theme-option-${e.value}`,
            onClick: () => { s(!1), n(e.value) }, children: (0, Z.jsxs)(`div`, { className: E(
                `flex w-full items-center justify-between`, a ? `text-foreground opacity-50` :
                ``), children: [(0, Z.jsxs)(`div`, { className: `flex items-center gap-2`,
                children: [(0, Z.jsx)(r, { className: E(`h-4 w-4`, a ? `text-foreground` :
                    `dark:text-white`) }), (0, Z.jsxs)(`span`, { className: `text-sm`,
                  children: [e.value === `light` && i(`theme_light`), e.value ===
                    `dark` && i(`theme_dark`), e.value === `system` && i(
                      `theme_system`)
                  ] })] }), a && (0, Z.jsx)(
              `span`, { "data-testid": `theme-checkmark-${e.value}`, children: `✓` })] }) }, e.value) }) })] }) },
  Ne = e => { let { currentLanguage: t, onChangeLanguage: n, className: r } = e, i = _(`UserDropdown`), [a, s] = (0, X
      .useState)(!1), c = d.find(e => e.value === t)?.label; return (0, Z.jsxs)(P, { modal: !1, onOpenChange: s,
      open: a, children: [(0, Z.jsx)(M, { asChild: !0, children: (0, Z.jsxs)(`button`, { className: E(
            `dark:bg-default-100 dark:hover:bg-default-200 flex h-14 w-full items-center gap-3 rounded-2xl bg-[#F5F5F6] px-4 text-left transition-colors hover:bg-[#efefef]`,
            r), "data-testid": `language-switcher`, onClick: () => s(e => !e), onPointerDown: e => e
            .preventDefault(), type: `button`, children: [(0, Z.jsx)(
          u, { className: `text-ink-primary h-5 w-5 shrink-0`, strokeWidth: 1.5 }), (0, Z.jsxs)(
          `div`, { className: `flex min-w-0 flex-1 flex-col`, children: [(0, Z.jsx)(
            `span`, { className: `text-b1 text-ink-primary`, children: i(
                `page_settings_language_title`) }), (0, Z.jsx)(
            `span`, { className: `text-b2 text-ink-tertiary truncate`, "data-testid": `current-language`,
              children: c })] }), (0, Z.jsx)(o, { className: `text-ink-tertiary h-4 w-4 shrink-0` })] }) }), (0,
        Z.jsx)(N, { align: `start`,
        className: `dark:bg-paper flex max-h-[min(310px,var(--radix-dropdown-menu-content-available-height))] w-[var(--radix-dropdown-menu-trigger-width)] flex-col gap-0.5 overflow-y-auto p-2 pr-0.5`, "data-testid": `language-menu`,
        onTouchMove: e => e.stopPropagation(), onWheel: e => e.stopPropagation(), side: `bottom`, children: d
          .map(e => { let r = t === e.value; return (0, Z.jsx)(j, { className: E(
                  `font-default text-foreground max-h-[250px] w-full py-[6px] dark:data-[highlighted]:bg-gray-800`,
                  r ? `dark:bg-background bg-[#efefef]` : ``
                  ), "data-testid": `language-option-${e.value}`, onClick: () => { s(!1), n(e.value) },
                children: (0, Z.jsxs)(`div`, { className: E(`flex w-full items-center justify-between`,
                    r ? `text-foreground opacity-50` : ``), children: [(0, Z.jsx)(
                  `span`, { className: `text-sm`, children: e.label }), r && (0, Z.jsx)(
                  `span`, { "data-testid": `language-checkmark-${e.value}`, children: `✓` })] }) }, e
              .value) }) })] }) },
  Pe = e => { let { isOpen: t, isMobile: n, currentLanguage: r, theme: i, onOpenChange: a, onChangeLanguage: o,
      onChangeTheme: c } = e, l = _(`Profile`), u = (0, Z.jsx)(
    `div`, { className: `flex min-h-0 flex-1 flex-col overflow-y-auto px-6 pt-3 pb-6`, children: (0, Z.jsxs)(
      `div`, { className: `flex flex-col gap-0.5`, children: [(0, Z.jsx)(Me, { className: `rounded-b-none`,
          onChangeTheme: c, theme: i }), (0, Z.jsx)(Ne, { className: `rounded-t-none`, currentLanguage: r,
          onChangeLanguage: o })] }) }); return n ? (0, Z.jsx)(B, { onOpenChange: a, open: t, children: (0, Z.jsxs)(
      z, { className: `dark:bg-background dark:text-ink-primary mt-0 flex h-[100dvh] flex-col gap-0 rounded-t-none border-0 bg-white [&>div:first-child]:hidden`, "data-testid": `guest-settings-modal`,
        children: [(0, Z.jsxs)(`div`, { className: `relative flex items-center justify-center px-4 py-4`,
          children: [(0, Z.jsx)(`button`, { "aria-label": l(`back`),
            className: `dark:hover:bg-default-100 absolute top-1/2 left-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-[#efefef]`,
            onClick: () => a(!1), type: `button`, children: (0, Z.jsx)(
            s, { className: `text-ink-primary h-5 w-5`, strokeWidth: 1.5 }) }), (0, Z.jsx)(
          R, { className: `text-ink-primary text-t1 font-semibold`, children: l(`settings`) })] }), (0, Z
          .jsx)(`span`, { className: `text-ink-tertiary px-6 pb-2 text-sm`, children: l(`general`) }), u] }) }) : (0,
      Z.jsx)(k, { onOpenChange: a, open: t, children: (0, Z.jsx)(
      O, { className: `h-[500px] max-w-[calc(100%-2rem)] overflow-hidden p-0 sm:max-w-[720px]`, "data-testid": `guest-settings-modal`,
        disableEnterAnimation: t, children: (0, Z.jsxs)(`div`, { className: `flex h-full min-h-0 w-full`,
          children: [(0, Z.jsxs)(
          `div`, { className: `flex w-[220px] shrink-0 flex-col gap-4 border-r border-[#EFEFEF] p-6 dark:border-[#242424]`,
            children: [(0, Z.jsx)(`h1`, { className: `text-ink-primary text-t1 font-semibold`,
              children: l(`settings`) }), (0, Z.jsx)(J, { className: `dark:bg-default-200` }), (0,
              Z.jsx)(`nav`, { className: `flex flex-col gap-1`, children: (0, Z.jsxs)(
              `div`, { className: `text-ink-primary dark:bg-default-100 flex h-9 w-full items-center gap-2 rounded-[10px] bg-[#efefef] px-2.5 text-sm font-medium`,
                children: [(0, Z.jsx)(h, { className: `!h-4 !w-4`, strokeWidth: 1.5 }), l(
                  `general`)] }) })] }), (0, Z.jsxs)(
          `div`, { className: `flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6`, children: [(0,
              Z.jsx)(D, { className: `text-sm font-light text-[#888888]`, children: l(
                `general`) }), (0, Z.jsx)(J, { className: `dark:bg-default-200` }), (0, Z.jsxs)(
              `div`, { className: `flex flex-col gap-0.5`, children: [(0, Z.jsx)(
                Me, { className: `rounded-b-none`, onChangeTheme: c, theme: i }), (0, Z.jsx)(
                  Ne, { className: `rounded-t-none`, currentLanguage: r, onChangeLanguage: o }
                  )] })] })] }) }) }) },
  Fe = e => { let { isMobile: t, variant: n = `row`, triggerClassName: r, startIcon: i, endIcon: a,
    labelClassName: o } = e, s = _(`Sidebar`), c = W(e => e.isSettingsOpen), l = W(e => e.settingsPathname), u = W(e =>
      e.openSettings), d = W(e => e.closeSettings), { currentLanguage: f, handleChangeLanguage: m } = p(), { theme: g,
      setTheme: v } = Ce(), y = ee(), b = c && l === y;
    (0, X.useEffect)(() => {!c || l === y || d() }, [c, l, y, d]); let x = () => { u(y) }; return (0, Z.jsxs)(Z
      .Fragment, { children: [n === `icon` ? (0, Z.jsx)(T, { "aria-label": s(`label_settings`),
          className: `!h-11 !w-11 rounded-full shadow-md`, "data-testid": `guest-menu-settings`, onClick: x,
          size: `icon`, variant: `outline`, children: (0, Z.jsx)(h, { className: `text-ink-primary !h-4 !w-4`,
            strokeWidth: 1.5 }) }) : (0, Z.jsx)(T, { className: E(
            `group hover:bg-surface-secondary-active !min-h-9 w-full justify-start gap-1.5 !rounded-xl`, r
            ), "data-testid": `guest-menu-settings`, endIcon: a, onClick: x, size: `row`, startIcon: i || (0, Z
            .jsx)(h, { className: `text-ink-primary !h-5 !w-5`, strokeWidth: 1.5 }), tightWidth: !0,
          variant: `ghost`, children: (0, Z.jsx)(`span`, { className: E(`min-w-0 flex-1 text-start`, o),
            children: s(`label_settings`) }) }), (0, Z.jsx)(Pe, { currentLanguage: f, isMobile: t, isOpen: b,
          onChangeLanguage: m, onChangeTheme: v, onOpenChange: e => { if (e) { u(y); return } d() }, theme: g })] }) },
  Ie = e => { let { title: t, description: n, titleClassName: r, descriptionClassName: i } = e; return (0, Z.jsxs)(
      `div`, { className: `flex flex-col gap-2 px-2 py-2`, "data-testid": `guest-menu-banner`, children: [(0, Z.jsx)(
          `span`, { className: E(`text-ink-primary text-t1 font-semibold select-text`, r), children: t }), (0, Z
          .jsx)(`p`, { className: E(`text-b2 text-ink-tertiary select-text`, i), children: n })] }) },
  Le = e => { let { isExpanded: t, isMobile: n, isArabic: r, onLogoClick: i, onToggleTheme: a, onToggleSidebar: o,
      onCloseMobile: s, extraActionSlot: c, hideThemeToggle: l, hideCloseButton: u, logoClassName: d } = e, f = _(
      `Sidebar`); return t ? (0, Z.jsxs)(
    `div`, { className: `flex h-12 min-h-12 flex-shrink-0 items-center justify-between ps-1.5`, children: [(0, Z
        .jsx)(`div`, { className: `flex items-center gap-2`, children: (0, Z.jsxs)(
        `button`, { className: `ms-1.5 flex cursor-pointer items-center gap-1.5`, onClick: i,
          type: `button`, children: [(0, Z.jsx)(V, { className: E(`block h-4 w-auto shrink-0 dark:hidden`,
              d) }), (0, Z.jsx)(H, { className: E(`hidden h-4 w-auto shrink-0 dark:block`, d) })] }) }), (0, Z
        .jsxs)(`div`, { className: `flex w-full items-center justify-end`, children: [c, !l && (0, Z.jsxs)(
        q, { children: [(0, Z.jsx)(G, { asChild: !0, children: (0, Z.jsxs)(
            T, { className: `dark:hover:bg-default-100 h-[36px] w-[36px] rounded-full border-0 bg-transparent px-0 !text-[#8f8f8f] hover:bg-[#efefef] [&_svg]:size-5`, "data-testid": `theme-toggle-button`,
              onClick: a, size: `icon`, variant: `ghost`, children: [(0, Z.jsx)(
                Se, { className: `!h-4 !w-4 shrink-0 text-[#8f8f8f] md:!h-5 md:!w-5 dark:hidden`, "data-testid": `theme-toggle-moon-icon` },
                `theme-light`), (0, Z.jsx)(
                xe, { className: `hidden !h-4 !w-4 shrink-0 text-[#8f8f8f] md:!h-5 md:!w-5 dark:block`, "data-testid": `theme-toggle-sun-icon` },
                `theme-dark`)] }) }), (0, Z.jsx)(
          K, { className: `border-none bg-[#0d0d0d] text-white dark:bg-white dark:text-[#0d0d0d]`,
            side: `bottom`, children: (0, Z.jsx)(`p`, { children: f(`toggle_theme`) }) })] }), n ? !u && (
          0, Z.jsxs)(q, { children: [(0, Z.jsx)(G, { asChild: !0, children: (0, Z.jsx)(
            T, { className: `!text-foreground dark:text-foreground dark:hover:bg-default-100 mr-0.5 h-[40px] rounded-lg border-0 bg-transparent px-2.5 hover:bg-[#efefef] [&_svg]:size-5`, "data-testid": `sidebar-close-button`,
              onClick: s, tightWidth: !0, variant: `ghost`, children: (0, Z.jsx)(
              _e, { className: `h-5 w-5 text-[#8f8f8f]` }) }) }), (0, Z.jsx)(
          K, { className: `border-none bg-[#0d0d0d] text-white dark:bg-white dark:text-[#0d0d0d]`,
            side: `bottom`, children: (0, Z.jsx)(`p`, { children: f(`close_sidebar`) }) })] }) : (0, Z
          .jsxs)(q, { children: [(0, Z.jsx)(G, { asChild: !0, children: (0, Z.jsx)(
            T, { className: `!text-foreground dark:text-foreground dark:hover:bg-default-100 mr-0.5 h-[40px] w-[40px] cursor-ew-resize rounded-full border-0 bg-transparent px-0 hover:bg-[#efefef] [&_svg]:size-5`, "data-testid": `sidebar-toggle-button`,
              onClick: o, size: `icon`, variant: `ghost`, children: (0, Z.jsx)(
              `span`, { className: E(`ml-0.5 inline-flex`, r && `[transform:scaleX(-1)]`),
                children: (0, Z.jsx)(De, { color: `#8f8f8f` }) }) }) }), (0, Z.jsx)(
          K, { className: `border-none bg-[#0d0d0d] text-white dark:bg-white dark:text-[#0d0d0d]`,
            side: `bottom`, children: (0, Z.jsx)(`p`, { children: f(`close_sidebar`) }) })] })] })] }) : (0, Z.jsxs)(
      q, { children: [(0, Z.jsx)(G, { asChild: !0, children: (0, Z.jsxs)(
          `div`, { className: `group relative flex h-12 w-full cursor-ew-resize items-center justify-center`,
            onClick: o, onKeyDown: e => {
              (e.key === `Enter` || e.key === ` `) && (e.preventDefault(), o()) }, role: `button`,
            tabIndex: 0, children: [!n && (0, Z.jsx)(
            `div`, { className: `absolute inset-0 top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center opacity-0 transition-opacity group-hover:opacity-100`,
              children: (0, Z.jsx)(`p`, { className: E(
                  `group dark:text-foreground dark:hover:bg-default-100 flex h-9 w-9 shrink-0 rotate-180 items-center justify-center rounded-lg hover:bg-[#efefef]`,
                  r && `[transform:scaleX(-1)_rotate(180deg)]`), children: (0, Z.jsx)(
                De, { className: `pointer-events-none -mr-0.5`, color: `#8f8f8f` }) }) }), (0, Z.jsxs)(
              `div`, { className: `pointer-events-none transition-opacity group-hover:pointer-events-none group-hover:opacity-0`,
                children: [(0, Z.jsx)(I, { className: `h-5 w-5 dark:hidden` }), (0, Z.jsx)(
                L, { className: `hidden h-5 w-5 dark:block` })] })] }) }), (0, Z.jsx)(
        K, { className: `border-none bg-[#0d0d0d] text-white dark:bg-white dark:text-[#0d0d0d]`, side: `right`,
          sideOffset: 12, children: (0, Z.jsx)(`p`, { children: f(`open_sidebar`) }) })] }) },
  Re = e => { let { isExpanded: t, isMobile: n, isArabic: r, navItems: i, bannerTitle: o, bannerDescription: s,
      signInLabel: l, pricingLinkLabel: u, onItemClick: d, onLogoClick: f, onSignIn: p, onPricingClick: m,
      onToggleTheme: _, onToggleSidebar: v, onCloseMobile: y, helpSlot: b, settingsSlot: x } = e, S = (0, X
      .isValidElement)(b) ? (0, X.cloneElement)(b, { triggerClassName: `gap-1.5`, startIcon: (0, Z.jsx)(
      Oe, { className: `text-ink-primary me-3.5 !h-[18px] !w-[18px]`, strokeWidth: 1.65 }), endIcon: (0, Z.jsx)(
      c, { className: E(`text-ink-tertiary !h-4 !w-4 shrink-0`, r && `[transform:scaleX(-1)]`) }),
      labelClassName: `truncate` }) : b, C = (0, X.isValidElement)(x) ? (0, X.cloneElement)(
    x, { triggerClassName: `gap-1.5`, startIcon: (0, Z.jsx)(
      h, { className: `text-ink-primary me-3.5 !h-[18px] !w-[18px]`, strokeWidth: 1.65 }),
      labelClassName: `truncate` }) : x; return (0, Z.jsxs)(
    `div`, { className: `flex h-full min-h-0 w-full flex-col gap-2 px-2`, children: [(0, Z.jsx)(
      `div`, { className: `shrink-0`, children: (0, Z.jsx)(Le, { isArabic: r, isExpanded: t, isMobile: n,
          logoClassName: `h-4`, onCloseMobile: y, onLogoClick: f, onToggleSidebar: v, onToggleTheme: _ }) }), (
        0, Z.jsxs)(`div`, { className: `flex min-h-[80px] flex-1 flex-col overflow-x-hidden overflow-y-auto`,
        children: [(0, Z.jsx)(`div`, { className: `flex flex-col gap-0.5 pb-[20px]`, children: i.map(e => (0,
            Z.jsx)(Y, { icon: e.icon, isActive: e.isActive, isExpanded: !0, label: e.label,
            onClick: () => d(e.itemName), testId: e.testId }, e.itemName)) }), (0, Z.jsxs)(
        `div`, { className: `mt-auto flex flex-col gap-0.5`, children: [(0, Z.jsx)(
          T, { className: `hover:bg-surface-secondary-active !min-h-9 w-full justify-start gap-1.5 !rounded-lg`, "data-testid": `guest-menu-pricing-link`,
            endIcon: (0, Z.jsx)(a, { className: E(`text-ink-tertiary !h-4 !w-4 shrink-0`, r &&
                `[transform:scaleX(-1)]`) }), onClick: m, size: `row`, startIcon: (0, Z.jsx)(
              g, { className: `text-ink-primary me-3.5 !h-[18px] !w-[18px]`,
              strokeWidth: 1.65 }), tightWidth: !0, variant: `ghost`, children: (0, Z.jsx)(
            `span`, { className: `min-w-0 flex-1 truncate text-start`, children: u }) }), C, S] })] }), (0, Z
        .jsxs)(`div`, { className: `flex shrink-0 flex-col gap-2 py-4`, children: [(0, Z.jsx)(
        `div`, { className: `border-border border-t` }), (0, Z.jsx)(Ie, { description: s, title: o,
          titleClassName: `text-t2` }), (0, Z.jsx)(
        T, { className: `!h-11 !rounded-[16px] !text-base !font-medium`, "data-testid": `guest-menu-signin-button`,
          onClick: p, variant: `outline`, children: l })] })] }) },
  ze = e => { let { isExpanded: t, isMobile: n, isArabic: r, navItems: i, bannerTitle: o, bannerDescription: s,
      signInLabel: c, pricingLinkLabel: l, onItemClick: u, onLogoClick: d, onSignIn: f, onPricingClick: p,
      onToggleTheme: m, onToggleSidebar: h, onCloseMobile: _, settingsSlot: v, helpSlot: y } = e; return (0, Z.jsxs)(
      `div`, { className: E(`flex h-full min-h-0 w-full flex-col gap-2`, t ? `px-2` : `items-center`), children: [(0,
          Z.jsx)(`div`, { className: `shrink-0`, "data-collapse-fade": !0, children: (0, Z.jsx)(Le, { isArabic: r,
            isExpanded: t, isMobile: n, onCloseMobile: _, onLogoClick: d, onToggleSidebar: h,
            onToggleTheme: m }) }), (0, Z.jsxs)(`div`, { className: E(
            `min-h-[80px] flex-1 overflow-x-hidden overflow-y-auto`, `flex flex-col`, !t && `items-center`),
          children: [(0, Z.jsx)(`div`, { className: E(`flex flex-col gap-0.5`, t ? `pb-[20px]` :
              `items-center`), "data-collapse-rows": !0, children: i.map(e => (0, Z.jsx)(
            Y, { className: `shrink-0`, icon: e.icon, isActive: e.isActive, isExpanded: t, label: e
                .label, onClick: () => u(e.itemName), testId: e.testId }, e.itemName)) }), t && (0, Z.jsxs)(
            `div`, { className: `mt-auto flex flex-col gap-0.5`, "data-collapse-fade": !0, children: [(0, Z
                .jsx)(
              T, { className: `group hover:bg-surface-secondary-active !min-h-9 w-full justify-start gap-1.5 !rounded-xl`, "data-testid": `guest-menu-pricing-link`,
                endIcon: (0, Z.jsx)(a, { className: E(
                    `text-ink-primary !h-4 !w-4 opacity-0 transition-opacity group-hover:opacity-100`,
                    r && `[transform:scaleX(-1)]`) }), onClick: p, size: `row`, startIcon: (0, Z.jsx)(
                  g, { className: `text-ink-primary !h-5 !w-5`, strokeWidth: 1.5 }), tightWidth: !0,
                variant: `ghost`, children: (0, Z.jsx)(`span`, { className: `flex-1 text-start`,
                  children: l }) }), v, y] })] }), t ? (0, Z.jsxs)(
        `div`, { className: `border-border mt-2 flex shrink-0 flex-col gap-2 border-t pt-5`, "data-collapse-fade":
            !0, children: [(0, Z.jsx)(Ie, { description: s, title: o, titleClassName: `text-b1` }), (0, Z.jsx)(
            T, { "data-testid": `guest-menu-signin-button`, onClick: f, variant: `outline`, children: c })] }) : (
          0, Z.jsx)(`div`, { className: `shrink-0 pt-5`, children: (0, Z.jsx)(Y, { icon: (0, Z.jsx)(
            ke, { className: `text-ink-primary !h-5 !w-5`, strokeWidth: 1.5 }), isActive: !1, isExpanded: !
              1, label: c, onClick: f, testId: `guest-menu-signin-button` }) })] }) },
  Be = { search_chats: S.BURGER_SEARCH_CHATS, projects: S.BURGER_PROJECTS, files: S.BURGER_FILES },
  Ve = { apps: F.APPS, images: `/images` },
  He = { images: S.BURGER_IMAGES, apps: S.BURGER_APPS },
  Ue = { images: `/images`, files: F.FILES, apps: F.APPS },
  We = e => { let t = e.target?.closest(`button, a, [role="button"], [role="menuitem"]`); return !!t && t !== e
      .currentTarget },
  $ = e => { let { children: t, desktopRailDisabled: n = !1, experimentExempt: i = !1, initialIsExpanded: a = !0 } =
    e, { isEnabled: o } = ue(), s = ne(), { isAuthenticated: c, status: u } = v(), d = pe(), f = de(d, u, c), p = fe(
      c || !f), [h, g] = (0, X.useState)(o);
    o && !h && g(!0); let w = h && p,
      { isOpen: T, setIsOpen: D, isExpanded: O, setIsExpanded: k } = W(),
      A = O ?? a,
      j = we(A),
      { openSignInModal: M } = ae(),
      { handleNewChat: N } = ie(),
      { handleChangeTheme: P } = Ce(),
      I = le(r()),
      L = _(`Sidebar`),
      R = te(),
      z = ee(),
      B = re(e => e.currentChatId),
      V = () => { let e = !A;
        k(e), !s && C({ isSideBarOpen: e }) },
      H = e => { e.preventDefault(), P() },
      me = () => { s && D(!1), N() },
      he = e => { s && D(!1), y.track(x.BURGER_MENU_ITEM_CLICKED, { user_id: y.getAnalyticsProperty().user_id || null,
          item_name: e }); let t = Ve[e]; if (t) { let n = He[e]; if (n && b()) { M(n, Ue[e] ?? t); return } R.push(
          t); return } if (e === `new_chat`) { N(); return } let n = Be[e];
        n && M(n, Ue[e]) },
      ge = () => { w || (s && D(!1), M(S.BURGER_SIGNIN_BUTTON)) },
      G = () => { s && D(!1), R.push(F.PRICING) }; if (!o && !i && !w || !s && n) return (0, Z.jsx)(U, { value: null,
      children: t }); let K = [{ icon: (0, Z.jsx)(ve, { className: `text-ink-primary !h-5 !w-5` }), label: L(
          `label_start_new`), itemName: `new_chat`, isActive: ye(z === `/`, B), testId: `guest-menu-new-chat` },
      { icon: (0, Z.jsx)(ce, { className: `text-ink-primary !h-5 !w-5` }), label: L(`label_files`), itemName: `files`,
        isActive: !!z?.startsWith(F.FILES), testId: `guest-menu-files` }, { icon: (0, Z.jsx)(
        be, { className: `text-ink-primary !h-5 !w-5` }), label: L(`label_images`), itemName: `images`, isActive: ye(!
          !z?.startsWith(`/images`), B), testId: `guest-menu-images` }, { icon: (0, Z.jsx)(
        l, { className: `text-ink-primary !h-5 !w-5`, strokeWidth: 1.5 }), label: L(`label_projects`),
        itemName: `projects`, isActive: !!z?.startsWith(`/projects`), testId: `guest-menu-projects` }, { icon: (0, Z
          .jsx)(m, { className: `text-ink-primary !h-5 !w-5`, strokeWidth: 1.5 }), label: L(`label_apps`),
        itemName: `apps`, isActive: !!z?.startsWith(F.APPS), testId: `guest-menu-apps` }],
      q = { bannerDescription: L(`guest_menu_banner_description`), bannerTitle: L(`guest_menu_banner_title`),
        helpSlot: (0, Z.jsx)(Ae, { isArabic: I, isMobile: s, onNavigate: () => D(!1) }), isArabic: I, isExpanded: s ||
          j, isMobile: s, navItems: K, onCloseMobile: () => D(!1), onItemClick: he, onLogoClick: me, onSignIn: ge,
        onPricingClick: G, onToggleSidebar: V, onToggleTheme: H, settingsSlot: (0, Z.jsx)(Fe, { isMobile: s }),
        signInLabel: L(`auth_signin_button`), pricingLinkLabel: L(`label_features_pricing`) },
      _e = (0, Z.jsx)(ze, { ...q }),
      J = (0, Z.jsx)(Re, { ...q }); return (0, Z.jsx)(U, { value: `guest`, children: (0, Z.jsxs)(
      `div`, { className: `flex min-h-0 w-full flex-1 overflow-hidden`, children: [!s && (0, Z.jsx)(
        Ee, { dataAttribute: `data-guest-sidebar`, isPanelExpanded: j, isSidebarOpen: A,
          panelClassName: `bg-background dark:bg-paper overflow-hidden border-r border-[#EFEFEF] bg-gradient-to-b from-[hsla(223,61%,90%,0.09)] to-transparent dark:border-[#242424] dark:from-[hsla(223,20%,45%,0.04)]`,
          children: (0, Z.jsx)(`div`, { className: E(`flex h-full w-full flex-col`, !A &&
              `cursor-ew-resize`), onClick: e => { A || We(e) || V() }, onKeyDown: e => { A || (e
                .key === `Enter` || e.key === ` `) && (We(e) || (e.preventDefault(), V())) },
            role: A ? void 0 : `button`, tabIndex: A ? void 0 : 0, children: _e }) }), s && (0, Z.jsx)(
        Te, { isOpen: T, sidebarSlot: (0, Z.jsx)(`div`, { className: E(
              `bg-background dark:bg-paper relative flex h-full w-[280px] shrink-0 flex-col border-[#EFEFEF] bg-gradient-to-b from-[hsla(223,61%,90%,0.09)] to-transparent transition-all duration-300 dark:border-[#242424] dark:from-[hsla(223,20%,45%,0.04)]`,
              I ? `border-l` : `border-r`), children: J }), side: I ? `right` : `left`, sidebarWidth: 280,
          children: (0, Z.jsxs)(
          `div`, { className: `bg-paper dark:bg-background relative flex h-full min-w-0 flex-1 flex-col overflow-hidden`,
            children: [t, (0, Z.jsx)(se, { children: T && (0, Z.jsx)(oe
              .button, { animate: { opacity: 1 }, "aria-label": `Close sidebar`,
                className: `absolute inset-0 z-40 cursor-default touch-none bg-black/30`,
                exit: { opacity: 0 }, initial: { opacity: 0 }, onClick: () => D(!1),
                transition: { duration: .2, ease: [.4, 0, .2, 1] }, type: `button` }) })] }) }), !s && (0, Z
          .jsx)(
        `div`, { className: `bg-paper dark:bg-background relative flex min-w-0 flex-1 flex-col overflow-hidden`,
          children: t })] }) }) };
export { $ as GuestSidebarMenuComponent, $ as default };
