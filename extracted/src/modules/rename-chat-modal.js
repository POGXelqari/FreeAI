/**
 * Source: https://use.ai/_next/static/chunks/rename-chat-modal-CXNm7mct.js
 * Module: rename-chat-modal
 * Extracted & Beautified
 */

const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = [
  "_next/static/chunks/mobile-chat-menu.component-BSVPAXrF.js",
  "_next/static/chunks/rolldown-runtime-C0FnF6B9.js", "_next/static/chunks/framework-D-uKrMmN.js",
  "_next/static/chunks/vinext-DaPQ-kLo.js", "_next/static/chunks/chat-history-De2sMMgt.js",
  "_next/static/chunks/rest-api.provider-cvDCweR_.js", "_next/static/chunks/mutation-DO0ikfMC.js",
  "_next/static/chunks/thenable-BrrDvP6E.js", "_next/static/chunks/hydration-BI7_jV4G.js",
  "_next/static/chunks/QueryClientProvider-DGxN9XtP.js", "_next/static/chunks/dynamic.service-D2nUn8U-.js",
  "_next/static/chunks/dynamic-preload-chunks-BkpXLrkh.js", "_next/static/chunks/useQuery-BgSNoQ7j.js",
  "_next/static/chunks/queryOptions-Dfvzj6n2.js", "_next/static/chunks/rest-api-BL5a3YVm.js",
  "_next/static/chunks/env-C6AULCj5.js", "_next/static/chunks/better-auth-client-session.service-1Lowatea.js",
  "_next/static/chunks/recovery-marker.util-CkI39M8u.js", "_next/static/chunks/worker-auth.service-oGq_wKdT.js",
  "_next/static/chunks/report-client-error.util-Bq41AYxy.js",
  "_next/static/chunks/chat-key.constant-DXJEa87X.js",
  "_next/static/chunks/logout-teardown.service-BVsq4fds.js", "_next/static/chunks/download-10KlyRTr.js",
  "_next/static/chunks/createLucideIcon-CVSF7wvO.js", "_next/static/chunks/ellipsis-DHUbA1Fi.js",
  "_next/static/chunks/react-client-DI5BViDH.js", "_next/static/chunks/react-CWjhjU4R.js",
  "_next/static/chunks/projects-BdKj6Hhz.js", "_next/static/chunks/useMutation-DldRSjFA.js",
  "_next/static/chunks/project-key.constant-DL2-hOys.js", "_next/static/chunks/api-error-body.util-DJXtb-RF.js",
  "_next/static/chunks/pencil-edit-CQfkNnBZ.js", "_next/static/chunks/trash-Qu5NuJYS.js",
  "_next/static/chunks/button-B7ERdP8H.js", "_next/static/chunks/bundle-mjs-cJTHqqzI.js",
  "_next/static/chunks/loader-circle-C38mqwuC.js", "_next/static/chunks/dist-DKq-7tPa.js",
  "_next/static/chunks/utils-DBS9-MOh.js", "_next/static/chunks/delete-item-modal-CQb5L1cI.js",
  "_next/static/chunks/dialog-7Locadch.js", "_next/static/chunks/x-DWv_kCKr.js",
  "_next/static/chunks/dist-V17-Ndhz.js", "_next/static/chunks/dist-UOiSWAIU.js",
  "_next/static/chunks/dist-Bk3YTB5a.js", "_next/static/chunks/dist-DHTrxFRs.js",
  "_next/static/chunks/dist-wURgM5if.js", "_next/static/chunks/dist-DNAaWyma.js",
  "_next/static/chunks/dist-1ej2Hjrt.js", "_next/static/chunks/dist-CEdsmZbM.js",
  "_next/static/chunks/es2015-fuZyN7gw.js", "_next/static/chunks/dist-uRWxuiG0.js",
  "_next/static/chunks/project-selector-submenu-BqaKm4EP.js", "_next/static/chunks/folder-BsW44kWZ.js",
  "_next/static/chunks/submenu-trigger-placeholder-B5opOeFo.js",
  "_next/static/chunks/chevron-right-Dw6SaFc4.js",
  "_next/static/chunks/project-selector-submenu.service-VtKi7ypB.js",
  "_next/static/chunks/analytics.service-9oUGcSKY.js", "_next/static/chunks/freemium-funnel.util-BsrrWeXM.js",
  "_next/static/chunks/safe-session-storage.util-DN4NSHVM.js", "_next/static/chunks/gtm-CzTak35f.js",
  "_next/static/chunks/mixpanel-B_WP0jc-.js", "_next/static/chunks/show-toast.service-DZQBgdNF.js",
  "_next/static/chunks/dist-C8KK_I18.js", "_next/static/chunks/check-CWA6FeXs.js",
  "_next/static/chunks/circle-alert-CjKwzCDt.js", "_next/static/chunks/intl-CED8MIZm.js",
  "_next/static/chunks/BaseLink-CDxnuSW2.js", "_next/static/chunks/query-DugiHe4Q.js",
  "_next/static/chunks/intl.constant-DpFKv8U4.js",
  "_next/static/chunks/create-project-modal.service-CC-_y-W4.js",
  "_next/static/chunks/is-mobile.service-BZEOpDHM.js", "_next/static/chunks/use-has-mounted.hook-DsU-SnKZ.js",
  "_next/static/chunks/initial-mobile.provider-DAAXBXtb.js", "_next/static/chunks/project.store-BF8RoGfi.js",
  "_next/static/chunks/react-D8-vnz5K.js", "_next/static/chunks/middleware-Df3VXbEU.js",
  "_next/static/chunks/sidebar.store-3O6FZkMw.js", "_next/static/chunks/dropdown-menu-CoJMIpYs.js",
  "_next/static/chunks/circle-BS-Vzwf7.js", "_next/static/chunks/dist-DbhSOkZC2.js",
  "_next/static/chunks/dist-jciTo-QL.js", "_next/static/chunks/floating-ui.react-dom-xN1K-ASj.js",
  "_next/static/chunks/dist-BbbTHrHw.js", "_next/static/chunks/dist-CQK36Nza.js",
  "_next/static/chunks/chat.store-CCLMl5kX.js", "_next/static/chunks/retry-chat-bridge.service-UVZ4pRxm.js",
  "_next/static/chunks/message-reducer.service-BcIDAcUg.js", "_next/static/chunks/js.cookie-CuZGWQGl.js",
  "_next/static/chunks/cookie.interface-BM92z_O9.js", "_next/static/chunks/global.store-DXaW4jb5.js",
  "_next/static/chunks/new-chat.service-D_uV9h89.js", "_next/static/chunks/uuid.util-BB0yd8wz.js",
  "_next/static/chunks/v4-DDdyfk2q.js", "_next/static/chunks/share-chat-modal.store-x6SY0kzg.js",
  "_next/static/chunks/download-chat-button.service-CYTvg0Ok.js",
  "_next/static/chunks/share-chat-invite.api-DKLG9zAF.js",
  "_next/static/chunks/deep-research-chats.model-Bm4CwR0q.js",
  "_next/static/chunks/review-trigger.store-CzZ64ny6.js", "_next/static/chunks/auth.store-DeUNDeDH.js",
  "_next/static/chunks/site-route.interface-CnbxJHY2.js", "_next/static/chunks/locale-path.util-nU2-KrUb.js",
  "_next/static/chunks/paywall-intent.util-CFXBPX-N.js", "_next/static/chunks/raw-history.util-BleUn4RV.js",
  "_next/static/chunks/payment-modals.store-Bak_UFLs.js", "_next/static/chunks/copy-formatted.util-SR1wwy9I.js",
  "_next/static/chunks/first-party-url.util-CX2n5k9d.js",
  "_next/static/chunks/file-upload.constant-B3pVoarn.js",
  "_next/static/chunks/image-compression.util-dcofMV1t.js", "_next/static/chunks/chat-uploads.util-DAI5F9yJ.js",
  "_next/static/chunks/logo-icon-C5Mo55YO.js"
]))) => i.map(i => d[i]);
import { r as e } from "./framework-D-uKrMmN.js";
import { Q as t, nt as n, rt as r, tt as i } from "./vinext-DaPQ-kLo.js";
import { o as a } from "./chat-history-De2sMMgt.js";
import { n as o } from "./QueryClientProvider-DGxN9XtP.js";
import { o as s } from "./rest-api-BL5a3YVm.js";
import { t as c } from "./dynamic.service-D2nUn8U-.js";
import { t as l } from "./copy-DQkd77kV.js";
import { t as u } from "./download-10KlyRTr.js";
import { t as d } from "./loader-circle-C38mqwuC.js";
import { t as f } from "./share-DMOjRmYc.js";
import { n as p } from "./react-client-DI5BViDH.js";
import { t as m } from "./project-key.constant-DL2-hOys.js";
import { n as h } from "./better-auth-client-session.service-1Lowatea.js";
import { n as g } from "./worker-auth.service-oGq_wKdT.js";
import { t as _ } from "./button-B7ERdP8H.js";
import { t as v } from "./utils-DBS9-MOh.js";
import { t as y } from "./chat-key.constant-DXJEa87X.js";
import { t as b } from "./analytics.service-9oUGcSKY.js";
import { a as x } from "./mixpanel-B_WP0jc-.js";
import { t as S } from "./show-toast.service-DZQBgdNF.js";
import { r as C } from "./is-mobile.service-BZEOpDHM.js";
import { t as w } from "./global.store-DXaW4jb5.js";
import { t as T } from "./share-chat-modal.store-x6SY0kzg.js";
import { t as E } from "./deep-research-chats.model-Bm4CwR0q.js";
import { n as D, t as O } from "./download-chat-button.service-CYTvg0Ok.js";
import { i as k, n as A, t as j } from "./tooltip-WNS8Gl08.js";
var M = e(),
  N = e => { let { variant: t = `ghost`, size: n, className: r } = e, { shouldShow: i, isDisabled: a,
    handleCopyChat: o } = D(`header_button`), s = p(`Chat`), c = C(); if (!i) return null; let u = n || (c ? `icon` :
      `md`); return (0, M.jsxs)(j, { children: [(0, M.jsx)(k, { asChild: !0, children: (0, M.jsx)(_, { "aria-label": s(
            `btn_copy_chat`), className: v(`w-9 [&_svg]:size-5`, c && `text-dark dark:text-gray-200`,
          r), "data-testid": `copy-chat-button`, disabled: a, onClick: o, size: u, tightWidth: !0,
          variant: t, children: (0, M.jsx)(l, { strokeWidth: 1.5 }) }) }), (0, M.jsx)(
      A, { className: `border-black bg-black text-white`, side: `bottom`, children: (0, M.jsx)(
        `p`, { children: s(`btn_copy_chat`) }) })] }) },
  P = e => { let { variant: t = `ghost`, size: n, className: r } = e, { shouldShow: i, isDisabled: a,
      handleDownloadPdf: o, isDownloading: s } = O(), c = p(`Chat`), l = C(); if (!i) return null; let f = n || (l ?
      `icon` : `md`); return (0, M.jsxs)(j, { children: [(0, M.jsx)(k, { asChild: !0, children: (0, M.jsx)(
        _, { "aria-label": c(`btn_download_chat`), className: v(`w-9 [&_svg]:size-5`, s &&
            `bg-default-100`, r), "data-testid": `copy-chat-button`, disabled: s || a, onClick: o,
          size: f, tightWidth: !0, variant: t, children: s ? (0, M.jsx)(d, { className: `animate-spin`,
            strokeWidth: 1.5 }) : (0, M.jsx)(u, { strokeWidth: 1.5 }) }) }), (0, M.jsx)(
      A, { className: `border-black bg-black text-white`, side: `bottom`, children: (0, M.jsx)(
        `p`, { children: c(`btn_download_chat`) }) })] }) },
  F = () => { let e = w(e => e.currentChatId),
      { data: n } = h(),
      r = t(),
      a = i(),
      o = T(e => e.open),
      s = a?.get(`incognito-chat`) === `true`,
      c = r.chatId || r.id,
      l = c || e,
      u = !!(n?.user?.id && n?.user?.type !== `guest`); return { chatId: l, shouldShow: !!(c || e) && u && !s,
      isDisabled: !1, handleClick: () => { l && (b.track(x.SHARE_CHAT_CLICK, { chat_id: l, user_id: n?.user?.id || ``,
          is_authenticated: !!u, shared: !1 }), o(l)) } } },
  I = e => { let { variant: t = `ghost`, size: n, className: r } = e, i = F(), a = p(`Chat`), o = C(); if (!i
      .shouldShow) return null; let s = n || (o ? `icon` : `md`); return (0, M.jsxs)(j, { children: [(0, M.jsx)(
      k, { asChild: !0, children: (0, M.jsx)(_, { "aria-label": a(`share_chat_button`), className: v(
            `w-9 [&_svg]:size-5`, o && `text-dark dark:text-gray-200`, r
            ), "data-testid": `share-chat-button`, disabled: i.isDisabled, onClick: i.handleClick, size: s,
          tightWidth: !0, variant: t, children: (0, M.jsx)(f, { strokeWidth: 1.5 }) }) }), (0, M.jsx)(
      A, { className: `border-black bg-black text-white`, side: `bottom`, children: (0, M.jsx)(
        `p`, { children: a(`share_chat_button`) }) })] }) },
  L = () => { let e = o(),
      { data: t } = h(),
      n = t?.user?.id; return { deleteSharedChat: async (t, r) => { if (!t) return; let { onDeleteNavigateTo: i } = r ||
        {}, o = e.getQueryData([y.SHARED_CHATS_QUERY, n]);
        e.setQueryData([y.SHARED_CHATS_QUERY, n], e => e?.chats ? { ...e, chats: e.chats.filter(e => e.id !== t) } :
          e), i?.(); try { await a(t), b.track(x.CHAT_DELETED, { chat_id: t, chat_type: `shared` }) } catch { e
            .setQueryData([y.SHARED_CHATS_QUERY, n], o) } } } };
r();
var R = c(() => n(() => import(`./mobile-chat-menu.component-BSVPAXrF.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8,
    9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63,
    64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109
  ])), { loadableGenerated: { modules: [
        `src/app/features/chat-actions/elements/mobile-chat-menu/mobile-chat-menu.component.tsx`
      ] } }),
  z = () => { let e = o(),
      t = p(`Errors`),
      { showToast: n } = S(),
      { data: r } = h(),
      i = r?.user?.id; return { renameChat: async (r, a, o) => { if (!(a.trim() && r)) return; let c = a.trim(); if (!(o
            ?.originalTitle && c === o.originalTitle)) { e.setQueryData([y.CHAT_HISTORY_QUERY, i], e => { if (!e
              ?.pages || e.pages.length === 0) return e; let t = null,
              n = e.pages.map((e, n) => { if (!e.chats) return e; let i = e.chats.map(e => e.id === r ? (t = { ...
                  e, title: c, updatedAt: new Date().toISOString() }, t) : e); return { ...e, chats: i } }); if (
              t) { let i = n.map(e => ({ ...e, chats: e.chats?.filter(e => e.id !== r) || [] })); return i
                .length > 0 && i[0].chats && (i[0] = { ...i[0], chats: [t, ...i[0].chats] }), { ...e,
                pages: i } } return { ...e, pages: n } }), e.setQueryData([m.PROJECTS_QUERY, i], e => e?.projects ?
          { ...e, projects: e.projects.map(e => ({ ...e, chats: e.chats?.map(e => e.id === r ? { ...e,
                title: a } : e) || [] })) } : e), e.setQueryData([y.SHARED_CHATS_QUERY, i], e => e?.chats ? { ...e,
            chats: e.chats.map(e => e.id === r ? { ...e, title: c } : e) } : e), e.setQueriesData({ queryKey: [E
              .DEEP_RESEARCH_CHATS_QUERY
            ] }, e => e?.pages ? { ...e, pages: e.pages.map(e => ({ ...e, chats: e.chats?.map(e => e.id === r ? {
                ...e, title: c } : e) || [] })) } : e); try { let t = await g(),
              n = new URLSearchParams({ id: r }),
              a = await s.patch(`chat?${n.toString()}`, { json: { title: c }, headers: { ...t } }); if (!a.ok) { let
                e = await a.text(); throw Error(`Failed to rename chat: ${a.status} ${e}`) } b.track(x
            .CHAT_RENAMED, { chat_id: r, old_title: o?.originalTitle, new_title: c }), e
          .invalidateQueries({ queryKey: [y.CHAT_HISTORY_QUERY] }), e.invalidateQueries({ queryKey: [m
                .PROJECTS_QUERY, i
              ] }), o?.onSuccess?.() } catch (r) { e.invalidateQueries({ queryKey: [y.CHAT_HISTORY_QUERY] }), e
              .invalidateQueries({ queryKey: [m.PROJECTS_QUERY, i] }), e.invalidateQueries({ queryKey: [E
                  .DEEP_RESEARCH_CHATS_QUERY
                ] }), n({ description: t(`toast_description_chat_rename_failed`), variant: `error` }), o?.onError?.(
              r) } } } } };
export { P as a, I as i, R as n, N as o, L as r, z as t };
