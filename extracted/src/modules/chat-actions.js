/**
 * Source: https://use.ai/_next/static/chunks/chat-actions-CIThz8ZM.js
 * Module: chat-actions
 * Extracted & Beautified
 */

const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = [
  "_next/static/chunks/mobile-chat-menu.component-BjqaEeIl.js",
  "_next/static/chunks/rolldown-runtime-C0FnF6B9.js", "_next/static/chunks/framework-D-uKrMmN.js",
  "_next/static/chunks/vinext-CqpRraGS.js", "_next/static/chunks/experiment-client.service-Dbg--_Jv.js",
  "_next/static/chunks/env-C6AULCj5.js", "_next/static/chunks/QueryClientProvider-DGxN9XtP.js",
  "_next/static/chunks/chat-history-Ck4B7fB_.js", "_next/static/chunks/useQuery-B3vkDNet.js",
  "_next/static/chunks/mutation-DO0ikfMC.js", "_next/static/chunks/thenable-BrrDvP6E.js",
  "_next/static/chunks/rest-api.provider-DFR1ot1R.js", "_next/static/chunks/hydration-BI7_jV4G.js",
  "_next/static/chunks/dynamic.service-BDdZlREf.js", "_next/static/chunks/dynamic-preload-chunks-C2tdlbzD.js",
  "_next/static/chunks/useInfiniteQuery-BZkaaFaW.js", "_next/static/chunks/queryOptions-Dfvzj6n2.js",
  "_next/static/chunks/rest-api-DNPFxXXP.js",
  "_next/static/chunks/better-auth-client-session.service-ercwbZKT.js",
  "_next/static/chunks/better-auth-client.service-Ck6mOMB1.js",
  "_next/static/chunks/recovery-marker.util-BHO296he.js", "_next/static/chunks/worker-auth.service-BtTnG2J5.js",
  "_next/static/chunks/report-client-error.util-Bq41AYxy.js",
  "_next/static/chunks/chat-key.constant-DXJEa87X.js",
  "_next/static/chunks/logout-teardown.service-BVsq4fds.js", "_next/static/chunks/download-10KlyRTr.js",
  "_next/static/chunks/createLucideIcon-CVSF7wvO.js", "_next/static/chunks/ellipsis-DHUbA1Fi.js",
  "_next/static/chunks/loader-circle-C38mqwuC.js", "_next/static/chunks/user-plus-CD87yn5D.js",
  "_next/static/chunks/users-B11nS6Gb.js", "_next/static/chunks/react-client-DI5BViDH.js",
  "_next/static/chunks/react-CWjhjU4R.js", "_next/static/chunks/projects-Cijq-nE0.js",
  "_next/static/chunks/useMutation-DldRSjFA.js", "_next/static/chunks/project-key.constant-DL2-hOys.js",
  "_next/static/chunks/api-error-body.util-DJXtb-RF.js", "_next/static/chunks/analytics.service-BIbiLKmC.js",
  "_next/static/chunks/freemium-funnel.util-D0KPcbFz.js",
  "_next/static/chunks/safe-session-storage.util-DN4NSHVM.js", "_next/static/chunks/gtm-DkKjcpHp.js",
  "_next/static/chunks/mixpanel-CkBALibP.js", "_next/static/chunks/team-chats-BbJk-q5m.js",
  "_next/static/chunks/team-chat.model-C0Jcmza6.js", "_next/static/chunks/chat-auth.util-CHugSHZw.js",
  "_next/static/chunks/teams-D-JmxjA5.js", "_next/static/chunks/teams.mutation-C9duAdia.js",
  "_next/static/chunks/subscription.model-Bs1FyJgo.js", "_next/static/chunks/user.model-CISYB7eF.js",
  "_next/static/chunks/use-has-mounted.hook-BZPIYb5B.js", "_next/static/chunks/user-data.provider-fGhNbbcZ.js",
  "_next/static/chunks/workspace-scope.provider-Cm72CHah.js", "_next/static/chunks/react-D8-vnz5K.js",
  "_next/static/chunks/middleware-BT98JsiD.js", "_next/static/chunks/settings-cookie.util-C5vl4muy.js",
  "_next/static/chunks/js.cookie-LuQ0sRX_.js", "_next/static/chunks/cookie.interface-BM92z_O9.js",
  "_next/static/chunks/pencil-edit-CQfkNnBZ.js", "_next/static/chunks/trash-Qu5NuJYS.js",
  "_next/static/chunks/button-B7ERdP8H.js", "_next/static/chunks/bundle-mjs-cJTHqqzI.js",
  "_next/static/chunks/dist-DKq-7tPa.js", "_next/static/chunks/utils-DBS9-MOh.js",
  "_next/static/chunks/dialog-7Locadch.js", "_next/static/chunks/x-DWv_kCKr.js",
  "_next/static/chunks/dist-V17-Ndhz.js", "_next/static/chunks/dist-UOiSWAIU.js",
  "_next/static/chunks/dist-Bk3YTB5a.js", "_next/static/chunks/dist-DHTrxFRs.js",
  "_next/static/chunks/dist-wURgM5if.js", "_next/static/chunks/dist-DNAaWyma.js",
  "_next/static/chunks/dist-1ej2Hjrt.js", "_next/static/chunks/dist-CEdsmZbM.js",
  "_next/static/chunks/es2015-fuZyN7gw.js", "_next/static/chunks/dist-uRWxuiG0.js",
  "_next/static/chunks/delete-item-modal-CQb5L1cI.js",
  "_next/static/chunks/project-selector-submenu-BwYuQeQd.js", "_next/static/chunks/folder-BsW44kWZ.js",
  "_next/static/chunks/submenu-trigger-placeholder-B5opOeFo.js",
  "_next/static/chunks/chevron-right-Dw6SaFc4.js",
  "_next/static/chunks/project-selector-submenu.service-BRookX3a.js",
  "_next/static/chunks/show-toast.service-DZQBgdNF.js", "_next/static/chunks/dist-C8KK_I18.js",
  "_next/static/chunks/check-CWA6FeXs.js", "_next/static/chunks/circle-alert-CjKwzCDt.js",
  "_next/static/chunks/intl-5y7Gu4iP.js", "_next/static/chunks/BaseLink-DAgr-zci.js",
  "_next/static/chunks/query-DugiHe4Q.js", "_next/static/chunks/intl.constant-DpFKv8U4.js",
  "_next/static/chunks/create-project-modal.service-B5xWE3T1.js",
  "_next/static/chunks/is-mobile.service-c24xKO50.js",
  "_next/static/chunks/initial-mobile.provider-DAAXBXtb.js", "_next/static/chunks/project.store-CVum8aS0.js",
  "_next/static/chunks/sidebar.store-CMHpt4Zm.js", "_next/static/chunks/use-feature-flag.hook-DJz-hOWd.js",
  "_next/static/chunks/client-DWC7O25X.js", "_next/static/chunks/experiment.provider-CQRJZnpd.js",
  "_next/static/chunks/growthbook-server-to-client-analytics.component-CMkevCIi.js",
  "_next/static/chunks/dropdown-menu-D6_Lrewr.js", "_next/static/chunks/circle-BS-Vzwf7.js",
  "_next/static/chunks/dist-DbhSOkZC.js", "_next/static/chunks/dist-jciTo-QL.js",
  "_next/static/chunks/floating-ui.react-dom-xN1K-ASj.js", "_next/static/chunks/dist-BbbTHrHw.js",
  "_next/static/chunks/dist-Bwy9E6PB.js", "_next/static/chunks/avatar-color.util-D1hBLjj9.js",
  "_next/static/chunks/initials.util-CSKLyOD0.js", "_next/static/chunks/chat.store-CVJElyGt.js",
  "_next/static/chunks/retry-chat-bridge.service-UVZ4pRxm.js",
  "_next/static/chunks/post-payment.store-jgy38Ijx.js", "_next/static/chunks/global.store-DsM3x4UJ.js",
  "_next/static/chunks/new-chat.service-CIiqAd78.js", "_next/static/chunks/teams.store-BUwcijNI.js",
  "_next/static/chunks/uuid.util-BB0yd8wz.js", "_next/static/chunks/v4-DDdyfk2q.js",
  "_next/static/chunks/share-chat-modal.store-x6SY0kzg.js",
  "_next/static/chunks/download-chat-button.service-CctxGjXF.js",
  "_next/static/chunks/share-chat-invite.api-kdUDCneo.js",
  "_next/static/chunks/deep-research-chats.model-Bm4CwR0q.js",
  "_next/static/chunks/use-stream-active.hook-CJjUFxyg.js",
  "_next/static/chunks/review-trigger.store-C2KfqDZw.js", "_next/static/chunks/auth.store-CecpbI3z.js",
  "_next/static/chunks/site-route.interface-DlOSDxTR.js", "_next/static/chunks/locale-path.util-nU2-KrUb.js",
  "_next/static/chunks/paywall-intent.util-T2BKTtbQ.js", "_next/static/chunks/raw-history.util-43z6flYk.js",
  "_next/static/chunks/payment-modals.store-Ds_qXI-N.js", "_next/static/chunks/copy-formatted.util-CTbr3TnW.js",
  "_next/static/chunks/first-party-url.util-CX2n5k9d.js",
  "_next/static/chunks/file-upload.constant-B3pVoarn.js",
  "_next/static/chunks/image-compression.util-dcofMV1t.js", "_next/static/chunks/chat-uploads.util-DAI5F9yJ.js",
  "_next/static/chunks/logo-icon-C5Mo55YO.js"
]))) => i.map(i => d[i]);
import { r as e } from "./framework-D-uKrMmN.js";
import { Q as t, nt as n, rt as r, tt as i } from "./vinext-CqpRraGS.js";
import { n as a } from "./QueryClientProvider-DGxN9XtP.js";
import { o } from "./chat-history-Ck4B7fB_.js";
import { t as s } from "./dynamic.service-BDdZlREf.js";
import { t as c } from "./copy-DQkd77kV.js";
import { t as l } from "./download-10KlyRTr.js";
import { t as u } from "./loader-circle-C38mqwuC.js";
import { t as d } from "./share-DMOjRmYc.js";
import { n as f } from "./react-client-DI5BViDH.js";
import { n as p } from "./better-auth-client-session.service-ercwbZKT.js";
import { t as m } from "./analytics.service-BIbiLKmC.js";
import { a as h } from "./mixpanel-CkBALibP.js";
import { t as g } from "./button-B7ERdP8H.js";
import { t as _ } from "./utils-DBS9-MOh.js";
import { t as v } from "./chat-key.constant-DXJEa87X.js";
import { r as y } from "./is-mobile.service-c24xKO50.js";
import { t as b } from "./global.store-DsM3x4UJ.js";
import { t as x } from "./share-chat-modal.store-x6SY0kzg.js";
import { n as S, t as C } from "./download-chat-button.service-CctxGjXF.js";
import { i as w, n as T, t as E } from "./tooltip-WNS8Gl08.js";
var D = e(),
  O = e => { let { variant: t = `ghost`, size: n, className: r } = e, { shouldShow: i, isDisabled: a,
    handleCopyChat: o } = S(`header_button`), s = f(`Chat`), l = y(); if (!i) return null; let u = n || (l ? `icon` :
      `md`); return (0, D.jsxs)(E, { children: [(0, D.jsx)(w, { asChild: !0, children: (0, D.jsx)(g, { "aria-label": s(
            `btn_copy_chat`), className: _(`w-9 [&_svg]:size-5`, l && `text-dark dark:text-gray-200`,
          r), "data-testid": `copy-chat-button`, disabled: a, onClick: o, size: u, tightWidth: !0,
          variant: t, children: (0, D.jsx)(c, { strokeWidth: 1.5 }) }) }), (0, D.jsx)(
      T, { className: `border-black bg-black text-white`, side: `bottom`, children: (0, D.jsx)(
        `p`, { children: s(`btn_copy_chat`) }) })] }) },
  k = e => { let { variant: t = `ghost`, size: n, className: r } = e, { shouldShow: i, isDisabled: a,
      handleDownloadPdf: o, isDownloading: s } = C(), c = f(`Chat`), d = y(); if (!i) return null; let p = n || (d ?
      `icon` : `md`); return (0, D.jsxs)(E, { children: [(0, D.jsx)(w, { asChild: !0, children: (0, D.jsx)(
        g, { "aria-label": c(`btn_download_chat`), className: _(`w-9 [&_svg]:size-5`, s &&
            `bg-default-100`, r), "data-testid": `copy-chat-button`, disabled: s || a, onClick: o,
          size: p, tightWidth: !0, variant: t, children: s ? (0, D.jsx)(u, { className: `animate-spin`,
            strokeWidth: 1.5 }) : (0, D.jsx)(l, { strokeWidth: 1.5 }) }) }), (0, D.jsx)(
      T, { className: `border-black bg-black text-white`, side: `bottom`, children: (0, D.jsx)(
        `p`, { children: c(`btn_download_chat`) }) })] }) },
  A = () => { let e = b(e => e.currentChatId),
      { data: n } = p(),
      r = t(),
      a = i(),
      o = x(e => e.open),
      s = a?.get(`incognito-chat`) === `true`,
      c = r.chatId || r.id,
      l = c || e,
      u = !!(n?.user?.id && n?.user?.type !== `guest`); return { chatId: l, shouldShow: !!(c || e) && u && !s,
      isDisabled: !1, handleClick: () => { l && (m.track(h.SHARE_CHAT_CLICK, { chat_id: l, user_id: n?.user?.id || ``,
          is_authenticated: !!u, shared: !1 }), o(l)) } } },
  j = e => { let { variant: t = `ghost`, size: n, className: r } = e, i = A(), a = f(`Chat`), o = y(); if (!i
      .shouldShow) return null; let s = n || (o ? `icon` : `md`); return (0, D.jsxs)(E, { children: [(0, D.jsx)(
      w, { asChild: !0, children: (0, D.jsx)(g, { "aria-label": a(`share_chat_button`), className: _(
            `w-9 [&_svg]:size-5`, o && `text-dark dark:text-gray-200`, r
            ), "data-testid": `share-chat-button`, disabled: i.isDisabled, onClick: i.handleClick, size: s,
          tightWidth: !0, variant: t, children: (0, D.jsx)(d, { strokeWidth: 1.5 }) }) }), (0, D.jsx)(
      T, { className: `border-black bg-black text-white`, side: `bottom`, children: (0, D.jsx)(
        `p`, { children: a(`share_chat_button`) }) })] }) },
  M = () => { let e = a(),
      { data: t } = p(),
      n = t?.user?.id; return { deleteSharedChat: async (t, r) => { if (!t) return; let { onDeleteNavigateTo: i } = r ||
        {}, a = e.getQueryData([v.SHARED_CHATS_QUERY, n]);
        e.setQueryData([v.SHARED_CHATS_QUERY, n], e => e?.chats ? { ...e, chats: e.chats.filter(e => e.id !== t) } :
          e), i?.(); try { await o(t), m.track(h.CHAT_DELETED, { chat_id: t, chat_type: `shared` }) } catch { e
            .setQueryData([v.SHARED_CHATS_QUERY, n], a) } } } };
r();
var N = s(() => n(() => import(`./mobile-chat-menu.component-BjqaEeIl.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8,
  9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
  64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
  91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
  115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132
])), { loadableGenerated: { modules: [
      `src/app/features/chat-actions/elements/mobile-chat-menu/mobile-chat-menu.component.tsx`
    ] } });
export { O as a, k as i, M as n, j as r, N as t };
