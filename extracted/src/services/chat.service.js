/**
 * Source: https://use.ai/_next/static/chunks/chat.service-Czpxrkso.js
 * Module: chat.service
 * Extracted & Beautified
 */

const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = [
  "_next/static/chunks/image-modal.component-ClQTK92Q.js", "_next/static/chunks/rolldown-runtime-C0FnF6B9.js",
  "_next/static/chunks/framework-D-uKrMmN.js", "_next/static/chunks/react-CWjhjU4R.js",
  "_next/static/chunks/copy-DQkd77kV.js", "_next/static/chunks/createLucideIcon-CVSF7wvO.js",
  "_next/static/chunks/download-10KlyRTr.js", "_next/static/chunks/thumbs-down-BB5zC9AZ.js",
  "_next/static/chunks/thumbs-up-DKXjhGls.js", "_next/static/chunks/x-DWv_kCKr.js",
  "_next/static/chunks/react-client-DI5BViDH.js", "_next/static/chunks/analytics.service-BIbiLKmC.js",
  "_next/static/chunks/vinext-CqpRraGS.js", "_next/static/chunks/env-C6AULCj5.js",
  "_next/static/chunks/freemium-funnel.util-D0KPcbFz.js",
  "_next/static/chunks/safe-session-storage.util-DN4NSHVM.js", "_next/static/chunks/gtm-DkKjcpHp.js",
  "_next/static/chunks/mixpanel-CkBALibP.js", "_next/static/chunks/utils-DBS9-MOh.js",
  "_next/static/chunks/bundle-mjs-cJTHqqzI.js", "_next/static/chunks/dialog-7Locadch.js",
  "_next/static/chunks/dist-V17-Ndhz.js", "_next/static/chunks/dist-UOiSWAIU.js",
  "_next/static/chunks/dist-DKq-7tPa.js", "_next/static/chunks/dist-Bk3YTB5a.js",
  "_next/static/chunks/dist-DHTrxFRs.js", "_next/static/chunks/dist-wURgM5if.js",
  "_next/static/chunks/dist-DNAaWyma.js", "_next/static/chunks/dist-1ej2Hjrt.js",
  "_next/static/chunks/dist-CEdsmZbM.js", "_next/static/chunks/es2015-fuZyN7gw.js",
  "_next/static/chunks/dist-uRWxuiG0.js", "_next/static/chunks/show-toast.service-DZQBgdNF.js",
  "_next/static/chunks/dist-C8KK_I18.js", "_next/static/chunks/check-CWA6FeXs.js",
  "_next/static/chunks/circle-alert-CjKwzCDt.js", "_next/static/chunks/chat.store-CVJElyGt.js",
  "_next/static/chunks/react-D8-vnz5K.js", "_next/static/chunks/middleware-BT98JsiD.js",
  "_next/static/chunks/js.cookie-LuQ0sRX_.js", "_next/static/chunks/cookie.interface-BM92z_O9.js",
  "_next/static/chunks/logout-teardown.service-BVsq4fds.js",
  "_next/static/chunks/report-client-error.util-Bq41AYxy.js",
  "_next/static/chunks/retry-chat-bridge.service-UVZ4pRxm.js",
  "_next/static/chunks/post-payment.store-jgy38Ijx.js", "_next/static/chunks/is-locale-arabic.util-B4BIdGa2.js",
  "_next/static/chunks/intl-5y7Gu4iP.js", "_next/static/chunks/BaseLink-DAgr-zci.js",
  "_next/static/chunks/query-DugiHe4Q.js", "_next/static/chunks/intl.constant-DpFKv8U4.js",
  "_next/static/chunks/dist-CQDSGHYK.js", "_next/static/chunks/image-BISkV0j2.js",
  "_next/static/chunks/image-modal.service-b_eGGRq4.js",
  "_next/static/chunks/open-untrusted-url.service-CTLtpQTL.js",
  "_next/static/chunks/first-party-url.util-CX2n5k9d.js",
  "_next/static/chunks/file-upload.constant-B3pVoarn.js",
  "_next/static/chunks/use-swipe-navigation.hook-JWbVnUwd.js", "_next/static/chunks/chevron-left-BXhKvLzg.js",
  "_next/static/chunks/chevron-right-Dw6SaFc4.js", "_next/static/chunks/existing-chat-DX8nfOwY.js",
  "_next/static/chunks/chat-scroller-DC59GpV8.js", "_next/static/chunks/button-B7ERdP8H.js",
  "_next/static/chunks/loader-circle-C38mqwuC.js", "_next/static/chunks/arrow-right-C1xqmvO2.js",
  "_next/static/chunks/chat-message-list.component-CbziQKox.js", "_next/static/chunks/chat-history-Ck4B7fB_.js",
  "_next/static/chunks/useQuery-B3vkDNet.js", "_next/static/chunks/mutation-DO0ikfMC.js",
  "_next/static/chunks/thenable-BrrDvP6E.js", "_next/static/chunks/rest-api.provider-DFR1ot1R.js",
  "_next/static/chunks/hydration-BI7_jV4G.js", "_next/static/chunks/QueryClientProvider-DGxN9XtP.js",
  "_next/static/chunks/dynamic.service-BDdZlREf.js", "_next/static/chunks/dynamic-preload-chunks-C2tdlbzD.js",
  "_next/static/chunks/useInfiniteQuery-BZkaaFaW.js", "_next/static/chunks/queryOptions-Dfvzj6n2.js",
  "_next/static/chunks/rest-api-DNPFxXXP.js",
  "_next/static/chunks/better-auth-client-session.service-ercwbZKT.js",
  "_next/static/chunks/better-auth-client.service-Ck6mOMB1.js",
  "_next/static/chunks/recovery-marker.util-BHO296he.js", "_next/static/chunks/worker-auth.service-BtTnG2J5.js",
  "_next/static/chunks/chat-key.constant-DXJEa87X.js", "_next/static/chunks/book-open-B-FzQLjQ.js",
  "_next/static/chunks/chevron-down-CY8S3ZfR.js", "_next/static/chunks/tool-title-row-V5xywsuK.js",
  "_next/static/chunks/circle-x-D9GHhu8D.js", "_next/static/chunks/hand-70avRRj8.js",
  "_next/static/chunks/proxy-B_99oKrn.js", "_next/static/chunks/AnimatePresence-wBEFtpNn.js",
  "_next/static/chunks/tool-call.constant-BE7zFL0Z.js",
  "_next/static/chunks/base-tool-compact-view-Uz1Y09Jz.js", "_next/static/chunks/circle-check-ByDPLo07.js",
  "_next/static/chunks/tool-call.util-CT0TwyUo.js", "_next/static/chunks/registries-BHxkc4G_.js",
  "_next/static/chunks/paywall-prewarm.service-BUgoToJW.js", "_next/static/chunks/clock-CdQcsVHr.js",
  "_next/static/chunks/database-DOAUv0Jr.js", "_next/static/chunks/eye-PysoHCpr.js",
  "_next/static/chunks/file-search-lQ9PBE5F.js", "_next/static/chunks/globe-D1MVs8b6.js",
  "_next/static/chunks/grid-2x2-Byt2HR1E.js", "_next/static/chunks/plug-2-CsRLclIi.js",
  "_next/static/chunks/search-9wRnUxym.js", "_next/static/chunks/share-DMOjRmYc.js",
  "_next/static/chunks/square-terminal-B3Tb4SCU.js", "_next/static/chunks/zap-D0c7pmdJ.js",
  "_next/static/chunks/user-data.provider-fGhNbbcZ.js", "_next/static/chunks/is-mobile.service-c24xKO50.js",
  "_next/static/chunks/use-has-mounted.hook-BZPIYb5B.js",
  "_next/static/chunks/initial-mobile.provider-DAAXBXtb.js",
  "_next/static/chunks/review-trigger.store-C2KfqDZw.js", "_next/static/chunks/global.store-DsM3x4UJ.js",
  "_next/static/chunks/auth.store-CecpbI3z.js", "_next/static/chunks/site-route.interface-DlOSDxTR.js",
  "_next/static/chunks/locale-path.util-nU2-KrUb.js", "_next/static/chunks/paywall-intent.util-T2BKTtbQ.js",
  "_next/static/chunks/raw-history.util-43z6flYk.js", "_next/static/chunks/payment-modals.store-Ds_qXI-N.js",
  "_next/static/chunks/paywall.service-DJtJHTep.js", "_next/static/chunks/billing-CclPhhLo.js",
  "_next/static/chunks/billing.interface-DgJbHepV.js",
  "_next/static/chunks/use-paywall-variant.experiment.hook-DCrzgpR5.js",
  "_next/static/chunks/experiment-client.service-Dbg--_Jv.js",
  "_next/static/chunks/experiment.provider-CQRJZnpd.js", "_next/static/chunks/client-DWC7O25X.js",
  "_next/static/chunks/growthbook-server-to-client-analytics.component-CMkevCIi.js",
  "_next/static/chunks/use-feature-flag.hook-DJz-hOWd.js",
  "_next/static/chunks/freemium-funnel.store-B7BDrTBQ.js",
  "_next/static/chunks/connector-intl.provider-BHMUftuf.js",
  "_next/static/chunks/NextIntlClientProvider-BP5AYJiO.js", "_next/static/chunks/connectors.store-ta4ejFxC.js",
  "_next/static/chunks/connectors.mutation-DCZIwE-0.js", "_next/static/chunks/useMutation-DldRSjFA.js",
  "_next/static/chunks/connectors-catalog.service-C2W0ZTIl.js",
  "_next/static/chunks/connector-catalog-lazy.service-BSf-5rRs.js", "_next/static/chunks/accordion-CH6W-R4l.js",
  "_next/static/chunks/dist-DwEGnbvV.js", "_next/static/chunks/dist-DbhSOkZC.js",
  "_next/static/chunks/markdown-D4trp08_.js", "_next/static/chunks/lib-BevNV-w5.js",
  "_next/static/chunks/space-separated-tokens-DCTRfXYj.js", "_next/static/chunks/lib-Wn4o-8VE.js",
  "_next/static/chunks/micromark-factory-space-_27fCx5x.js", "_next/static/chunks/chunk-BO2N2NFS-nEkVR65V.js",
  "_next/static/chunks/zwitch-C6wXhqa8.js", "_next/static/chunks/web-namespaces-CdeS6bYV.js",
  "_next/static/chunks/marked.esm-BIum_moM.js", "_next/static/chunks/source-url.util-BdxiftQU.js",
  "_next/static/chunks/tooltip-WNS8Gl08.js", "_next/static/chunks/dist-jciTo-QL.js",
  "_next/static/chunks/floating-ui.react-dom-xN1K-ASj.js", "_next/static/chunks/dist-BbbTHrHw.js",
  "_next/static/chunks/chat.util-JX7uXMb9.js", "_next/static/chunks/connectors-BU3y6DIC.js",
  "_next/static/chunks/connectors.service-BvuH6FUI.js", "_next/static/chunks/teams-D-JmxjA5.js",
  "_next/static/chunks/teams.mutation-C9duAdia.js", "_next/static/chunks/subscription.model-Bs1FyJgo.js",
  "_next/static/chunks/user.model-CISYB7eF.js", "_next/static/chunks/workspace-scope.provider-Cm72CHah.js",
  "_next/static/chunks/settings-cookie.util-C5vl4muy.js", "_next/static/chunks/subscription-C_QA18f9.js",
  "_next/static/chunks/limits.interface-CnG5W0wJ.js",
  "_next/static/chunks/connector-icon.component-CDOi5dKA.js", "_next/static/chunks/skeleton-CQ_ju0jp.js",
  "_next/static/chunks/connector-search-input.component-DgBAGGEg.js", "_next/static/chunks/input-Cn8pMAH2.js",
  "_next/static/chunks/connectors.hook-BS1NEVLs.js", "_next/static/chunks/catalog-locale-C1DasskV.js",
  "_next/static/chunks/_rolldown_dynamic_import_helper-CIAwlR2T.js",
  "_next/static/chunks/logo-spinner-CYcNfjAa.js",
  "_next/static/chunks/ensure-connector-registrations.service-8f4euYJb.js",
  "_next/static/chunks/connectors-page-skeleton.component-Cgf0XRxA.js",
  "_next/static/chunks/connectors-list-skeletons-BzT4K5F7.js",
  "_next/static/chunks/mobile-page-header.component-rYkBNUPE.js",
  "_next/static/chunks/sidebar.store-CMHpt4Zm.js", "_next/static/chunks/menu-DmuxtmLj.js",
  "_next/static/chunks/mobile-header-logo-BBTsGGx9.js", "_next/static/chunks/useai-CiXQTOJ8.js",
  "_next/static/chunks/useai-white-BcU4k_RY.js", "_next/static/chunks/use-user.hook-DIvUDXD9.js",
  "_next/static/chunks/use-guest-sidebar-menu.hook-D4ZKIqpw.js",
  "_next/static/chunks/use-incognito-chat.hook-Dun56_qv.js",
  "_next/static/chunks/mobile-drawer.provider-D6C04T1C.js",
  "_next/static/chunks/guest-sidebar-menu.store-D01MKXdQ.js",
  "_next/static/chunks/mobile-page-header-Bw-GZZb2.js",
  "_next/static/chunks/chat-error-boundary.component-CliwbGm7.js",
  "_next/static/chunks/chat-error-fallback.component-D1w-mCZ5.js",
  "_next/static/chunks/message-circle-BOQPxIlG.js", "_next/static/chunks/refresh-cw-BYxqWMSo.js",
  "_next/static/chunks/triangle-alert-DEiOK3PW.js", "_next/static/chunks/chunk-error.util-8lmmDUxL.js",
  "_next/static/chunks/mixpanel.hook-CmubyvVR.js", "_next/static/chunks/react-error-boundary-svh9Rmtm.js",
  "_next/static/chunks/chat-error-boundary-B2sQAs9v.js",
  "_next/static/chunks/limit-banner.component-BUCLCS78.js", "_next/static/chunks/gem-C2zzRNeU.js",
  "_next/static/chunks/api-error-body.util-DJXtb-RF.js", "_next/static/chunks/chat-auth.util-CHugSHZw.js",
  "_next/static/chunks/copy-formatted.util-CTbr3TnW.js",
  "_next/static/chunks/model-catalog.provider-C5iwWYsc.js",
  "_next/static/chunks/use-is-freemium-funnel.hook-B8Epr2up.js",
  "_next/static/chunks/freemium-funnel.provider-AazaL16l.js", "_next/static/chunks/logout.store-DDMyOgQ2.js",
  "_next/static/chunks/use-freemium-funnel-gate.hook-sv-Z0STl.js", "_next/static/chunks/text.util-C2hCXdg-.js",
  "_next/static/chunks/errors.util-PrA6A1BU.js", "_next/static/chunks/tool-call-DnrtUX_d.js",
  "_next/static/chunks/tool-badge-BgZkxde0.js", "_next/static/chunks/tool-fold-CVCSm03z.js",
  "_next/static/chunks/tool-result-card-_tL3wovH.js", "_next/static/chunks/tool-view-error-DGhE8NvC.js",
  "_next/static/chunks/use-track-connector-tool-result.hook-CDtqC3Wy.js",
  "_next/static/chunks/code-workspace.constant-C6RTxYpf.js", "_next/static/css/limit-banner.CrXLBPRC.css",
  "_next/static/chunks/use-text-attachment.hook-BoWnMC2Z.js", "_next/static/chunks/uuid.util-BB0yd8wz.js",
  "_next/static/chunks/v4-DDdyfk2q.js", "_next/static/chunks/use-r2-uppy-upload.hook-CKKwVYPa.js",
  "_next/static/chunks/chat-uploads.util-DAI5F9yJ.js", "_next/static/chunks/image-compression.util-dcofMV1t.js",
  "_next/static/chunks/shared-chat.util-ibfGSpqv.js", "_next/static/chunks/image-filename.util-xDLyJO99.js",
  "_next/static/chunks/file-braces-BH8FsqEY.js", "_next/static/chunks/file-code-BZ40hobt.js",
  "_next/static/chunks/file-image-CmHcqKSH.js", "_next/static/chunks/file-spreadsheet-BwFAp_jL.js",
  "_next/static/chunks/file-text-B5ZoLW_G.js", "_next/static/chunks/file-CNVVglqj.js",
  "_next/static/chunks/search-files.service-DosvILK6.js", "_next/static/chunks/web-search.service-CDjCFUTy.js",
  "_next/static/chunks/extract-pages.service-DmpLTJv_.js",
  "_next/static/chunks/knowledge-base.service-B_Q1CHt4.js",
  "_next/static/chunks/preview-text-attachment.component-DbCMOX6e.js",
  "_next/static/chunks/clarifying-questions.component-RAZ_vJiV.js",
  "_next/static/chunks/message-annotations.component-Ddui9kJl.js", "_next/static/chunks/progress-C8veGdxq.js",
  "_next/static/chunks/research-sidebar.component-DU1Q8mWe.js", "_next/static/chunks/external-link-WpraYaLc.js",
  "_next/static/chunks/lightbulb-zKN5nd0C.js", "_next/static/chunks/pen-line-3w9tz83Q.js",
  "_next/static/chunks/logo-icon-C5Mo55YO.js", "_next/static/chunks/logo-icon-white-QiZ2Ybc-.js",
  "_next/static/chunks/drawer-CrlfHJuB.js", "_next/static/chunks/cancel-2J3UTq9u.js",
  "_next/static/chunks/tabs-ClZsxHJQ.js", "_next/static/chunks/dist-Bwy9E6PB.js",
  "_next/static/chunks/pencil-MSXy1_D6.js", "_next/static/chunks/use-auth-known.hook-C1WWcve_.js",
  "_next/static/chunks/initial-auth-state.provider-DUS-CXUE.js",
  "_next/static/chunks/web-search-sidebar-CzJJxchz.js", "_next/static/chunks/mobile-bottom-sheet-CB1EX72X.js",
  "_next/static/chunks/spinner-YtFB_xBA.js", "_next/static/chunks/badge-fH5lAmij.js",
  "_next/static/chunks/element-block-size.util-DdtCtvot.js", "_next/static/chunks/rotate-ccw-CYwKaotl.js",
  "_next/static/chunks/use-message-retry.hook-CIuW3J-g.js", "_next/static/chunks/chat-route.util-DIaoD1cB.js",
  "_next/static/chunks/payment-success-token.util-jBMumW46.js",
  "_next/static/chunks/file-preview-sidebar-CnYAU3kA.js",
  "_next/static/chunks/generated-file-preview-JA6nsjI0.js", "_next/static/chunks/code-xml-CEzC-2eb.js",
  "_next/static/chunks/image-I9wsg_Y3.js", "_next/static/chunks/generated-file-preview.util-CVWrw-WK.js",
  "_next/static/chunks/add-to-menu-B3vKdHmj.js", "_next/static/chunks/collections.mutation-DOJTt4ww.js",
  "_next/static/chunks/folder-plus-CyKNEo-_.js", "_next/static/chunks/folder-BsW44kWZ.js",
  "_next/static/chunks/plus-goXwnRLz.js", "_next/static/chunks/projects-Cijq-nE0.js",
  "_next/static/chunks/project-key.constant-DL2-hOys.js", "_next/static/chunks/project.store-CVum8aS0.js",
  "_next/static/chunks/dropdown-menu-D6_Lrewr.js", "_next/static/chunks/circle-BS-Vzwf7.js",
  "_next/static/chunks/collections-FPD17lmm.js", "_next/static/chunks/files-D6piZW1u.js",
  "_next/static/chunks/use-auth-click.hook-BHhXr5wJ.js", "_next/static/chunks/default-item-modal-Cgolk8p6.js",
  "_next/static/chunks/input-DC6eLh0y.js", "_next/static/chunks/mic-Cuoatejj.js",
  "_next/static/chunks/bell-off-BdKAd_Xb.js", "_next/static/chunks/bell-ring-C3Xg6lU_.js",
  "_next/static/chunks/paperclip-D_U7vKBN.js", "_next/static/chunks/square-CaSpHOTs.js",
  "_next/static/chunks/use-stream-active.hook-CJjUFxyg.js", "_next/static/chunks/shallow-CKWb1b-W.js",
  "_next/static/chunks/image-model-cookie.util-QzskssRL.js",
  "_next/static/chunks/open-after-viewport-settle.util-BfKU5lGX.js",
  "_next/static/chunks/composer-modes.provider-C-48A9eP.js",
  "_next/static/chunks/chat-model-cookie.util-BFNaMDUF.js",
  "_next/static/chunks/model-selector.util-s4hzcUFp.js", "_next/static/chunks/model-selector-CHLHhIlL.js",
  "_next/static/chunks/use-image-model-label.hook-Dhr0z0rd.js",
  "_next/static/chunks/chat-landing-variant.provider-CFxvAtmo.js",
  "_next/static/chunks/pending-funnel-query.util-CEUv-foO.js", "_next/static/chunks/app.constant-CQOe5N6O.js",
  "_next/static/chunks/image-C4T3aCpn.js", "_next/static/chunks/use-immediate-signup.hook-6A_wzI3j.js",
  "_next/static/chunks/pending-free-message-query.util-C2HYAyae.js",
  "_next/static/chunks/auth-modal.service-Cqqf3TRB.js",
  "_next/static/chunks/use-history-backed-flag.hook-C0Nr0kvF.js",
  "_next/static/chunks/use-paid-plan-access.hook-BceiKiVZ.js",
  "_next/static/chunks/web-search-button-B4NHDBuA.js", "_next/static/chunks/palette-trEm3e1X.js",
  "_next/static/chunks/telescope-D-_-rZUQ.js", "_next/static/chunks/blur-keyboard.service-Cw_wHZxR.js",
  "_next/static/chunks/image-landing-prefs.provider-CWWXUPpk.js"
]))) => i.map(i => d[i]);
import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { $ as n, Q as r, nt as i, rt as a, tt as o } from "./vinext-CqpRraGS.js";
import { a as s } from "./experiment-client.service-Dbg--_Jv.js";
import { n as c } from "./QueryClientProvider-DGxN9XtP.js";
import { r as l } from "./react-CWjhjU4R.js";
import { n as u, r as d, t as f } from "./chat-history-Ck4B7fB_.js";
import { i as p, n as m, o as h } from "./rest-api-DNPFxXXP.js";
import { t as g } from "./dynamic.service-BDdZlREf.js";
import { h as _, n as v, t as y } from "./billing-CclPhhLo.js";
import { n as b } from "./react-client-DI5BViDH.js";
import { t as x } from "./project-key.constant-DL2-hOys.js";
import { t as ee } from "./better-auth-client.service-Ck6mOMB1.js";
import { n as S } from "./better-auth-client-session.service-ercwbZKT.js";
import { t as C } from "./report-client-error.util-Bq41AYxy.js";
import { i as w, n as T, r as te, t as E } from "./worker-auth.service-BtTnG2J5.js";
import { n as D } from "./projects-Cijq-nE0.js";
import { t as O } from "./team-chat.model-C0Jcmza6.js";
import { A as ne, C as re, D as ie, F as k, M as ae, N as oe, O as se, T as ce, _ as le, g as ue, h as A, j as de,
  k as fe, t as j, v as pe, w as me, x as M, y as he } from "./analytics.service-BIbiLKmC.js";
import { m as N, p as P, r as F } from "./freemium-funnel.util-D0KPcbFz.js";
import { t as I } from "./safe-session-storage.util-DN4NSHVM.js";
import { a as L, i as R, r as z } from "./mixpanel-CkBALibP.js";
import { _ as ge, a as _e, c as ve, d as B, f as V, g as ye, h as H, l as be, m as xe, o as U, p as W, r as Se, s as Ce,
  t as we, u as G } from "./chat-auth.util-CHugSHZw.js";
import { n as Te } from "./user-data.provider-fGhNbbcZ.js";
import { t as Ee } from "./react-D8-vnz5K.js";
import { g as De, t as Oe } from "./teams-D-JmxjA5.js";
import { t as ke } from "./chat-key.constant-DXJEa87X.js";
import { t as Ae } from "./show-toast.service-DZQBgdNF.js";
import { r as je } from "./intl-5y7Gu4iP.js";
import { r as Me } from "./project.store-CVum8aS0.js";
import { n as Ne } from "./experiment.provider-CQRJZnpd.js";
import "./client-DWC7O25X.js";
import { C as Pe, S as Fe, T as Ie, _ as K, d as Le, g as Re, h as ze, m as Be, n as Ve, r as q, u as J, v as He,
  w as Ue, x as We, y as Ge } from "./chat.store-CVJElyGt.js";
import { r as Y } from "./post-payment.store-jgy38Ijx.js";
import { t as X } from "./global.store-DsM3x4UJ.js";
import { t as Ke } from "./uuid.util-BB0yd8wz.js";
import { n as qe, r as Je } from "./new-chat.service-CIiqAd78.js";
import { t as Ye } from "./share-chat-modal.store-x6SY0kzg.js";
import { t as Xe } from "./auth.store-CecpbI3z.js";
import { t as Ze } from "./review-trigger.store-C2KfqDZw.js";
import { i as Z, r as Qe, t as $e } from "./paywall.service-DJtJHTep.js";
import { t as et } from "./freemium-funnel.store-B7BDrTBQ.js";
import { t as tt } from "./connectors.store-ta4ejFxC.js";
import { a as nt } from "./connectors-catalog.service-C2W0ZTIl.js";
import { n as rt, t as it } from "./limits.interface-CnG5W0wJ.js";
import { t as at } from "./use-freemium-funnel-gate.hook-sv-Z0STl.js";
import { a as ot, n as st, r as ct } from "./model-catalog.provider-C5iwWYsc.js";
import { t as lt } from "./use-user.hook-DIvUDXD9.js";
import { t as ut } from "./use-incognito-chat.hook-Dun56_qv.js";
import { t as dt } from "./shallow-CKWb1b-W.js";
import { i as ft, n as pt, r as mt, t as ht } from "./chat-model-cookie.util-BFNaMDUF.js";
import { n as gt } from "./chat-landing-variant.provider-CFxvAtmo.js";
import { t as _t } from "./set-chat-model-DIyq3S5u.js";
import { t as vt } from "./chat-messages-BcFaGJ89.js";
import { a as yt, c as bt, i as xt, l as St, n as Ct, o as wt, r as Tt, s as Et,
  t as Dt } from "./chat.util-JX7uXMb9.js";
import "./connectors-BU3y6DIC.js";
import { t as Ot } from "./use-drag-drop.hook-CZDUpSwy.js";
import { t as kt } from "./shared-chat.util-ibfGSpqv.js";
import "./image-modal.service-b_eGGRq4.js";
import { r as At } from "./chat-route.util-DIaoD1cB.js";
import { i as jt, r as Mt, t as Nt } from "./payment-success-token.util-jBMumW46.js";
import { _ as Pt, b as Ft, d as It, f as Lt, g as Rt, h as zt, l as Bt, m as Vt, p as Ht, u as Ut, v as Wt, x as Gt,
  y as Kt } from "./limit-banner.component-BUCLCS78.js";
import { r as qt } from "./use-display-user.hook-sY0IkKdE.js";
import { i as Jt, r as Yt, t as Xt } from "./guest-limit-retry.util-B5MoFEDH.js";
import { t as Zt } from "./use-chat-input.hook-BgXo6Yt2.js";
import { i as Qt } from "./model-selector-CHLHhIlL.js";
import { r as $t, t as en } from "./formbricks.provider-DQWvTNkK.js";
import { r as tn, t as nn } from "./pending-free-message-query.util-C2HYAyae.js";
import { n as rn, o as an, r as on, t as sn } from "./pending-funnel-query.util-CEUv-foO.js";
import { t as cn } from "./geo.service-BPKKTJpo.js";
import { t as ln } from "./use-file-upload.hook-BC4f261h.js";
import { r as un } from "./use-text-attachment.hook-BoWnMC2Z.js";
a();
var dn = g(() => i(() => import(`./image-modal.component-ClQTK92Q.js`), __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
      37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58
    ])), { ssr: !1, loadableGenerated: { modules: [
        `src/app/shared/components/image-modal/image-modal.component.tsx`] } }),
  fn = `vercel.ai.error`,
  pn = Symbol.for(fn),
  mn, hn, gn = class e extends(hn = Error, mn = pn, hn) { constructor({ name: e, message: t, cause: n }) { super(t),
          this[mn] = !0, this.name = e, this.cause = n } static isInstance(t) { return e.hasMarker(t,
        fn) } static hasMarker(e, t) { let n = Symbol.for(t); return typeof e == `object` && !!e && n in e && typeof e[
          n] == `boolean` && e[n] === !0 } },
  _n = `AI_InvalidArgumentError`,
  vn = `vercel.ai.error.${_n}`,
  yn = Symbol.for(vn),
  bn, xn, Sn = class extends(xn = gn, bn = yn, xn) { constructor({ message: e, cause: t, argument: n }) { super
    ({ name: _n, message: e, cause: t }), this[bn] = !0, this.argument = n } static isInstance(e) { return gn
        .hasMarker(e, vn) } };
new TextDecoder;
var { btoa: Cn, atob: wn } = globalThis, Tn = (({ prefix: e, size: t = 16, alphabet: n =
    `0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`, separator: r = `-` } = {}) => { let i =
() => { let e = n.length,
      r = Array(t); for (let i = 0; i < t; i++) r[i] = n[Math.random() * e | 0]; return r.join(``) }; if (e == null)
    return i; if (n.includes(r)) throw new Sn({ argument: `separator`,
    message: `The separator "${r}" must not be part of the alphabet "${n}".` }); return () => `${e}${r}${i()}` })();
new TextDecoder;
var Q = e(t(), 1),
  En = `OFF`;

function Dn() { return En }

function On(e) { let t = Ne(s.CF_MODELS, `OFF`);
  (0, Q.useEffect)(() => { En = t }, [t]); let n = (t === `A` || t === `B`) && !e?.skipTracking;
  _({ experimentName: s.CF_MODELS, experimentValue: t, shouldTrack: n }) }

function kn({ chatId: e, initialVisibilityType: t }) { let n = c(),
    { data: r } = S(),
    i = r?.user?.id; return { visibilityType: (0, Q.useMemo)(() => { let r = n.getQueryData([ke.CHAT_HISTORY_QUERY,
      i]); if (!r?.pages) return t; for (let t of r.pages) { let n = t.chats?.find(t => t.id === e); if (n) return n
          .visibility } return t }, [n, e, t, i]) } }
var An = `OFF`;

function jn() { return An === `B` }

function Mn() { let e = Ne(s.CLARIFYING_QUESTIONS, `OFF`);
  (0, Q.useEffect)(() => { An = e }, [e]) }
var Nn = `OFF`;

function Pn() { return Nn }

function Fn(e) { let t = Ne(s.MICROSOFT_CONNECTORS, `OFF`);
  (0, Q.useEffect)(() => { Nn = t }, [t]); let n = t === `A` || t === `B`;
  _({ experimentName: s.MICROSOFT_CONNECTORS, experimentValue: t, shouldTrack: n && !e?.skipTracking }) }
var In = [`A`, `B`, `C`, `D`],
  Ln = `OFF`;

function Rn(e) { return In.includes(e) ? e : `OFF` }

function zn() { return Ln }

function Bn() { let e = Rn(Ne(s.PROMPT_SCREENING_MODEL, `OFF`));
  (0, Q.useEffect)(() => { Ln = e }, [e]), _({ experimentName: s.PROMPT_SCREENING_MODEL, experimentValue: e,
    shouldTrack: e !== `OFF` }) }
var Vn = [`A`, `B`],
  Hn = `OFF`;

function Un(e) { return Vn.includes(e) ? e : `OFF` }

function Wn() { return Hn === `B` }

function Gn() { let e = Un(Ne(s.THINKING_GENERATION, `OFF`));
  (0, Q.useEffect)(() => { Hn = e }, [e]), _({ experimentName: s.THINKING_GENERATION, experimentValue: e,
    shouldTrack: e !== `OFF` }) }
var Kn = `generation`,
  qn = `thinking`,
  Jn = `thinking-generation-chat-ids`,
  Yn = () => { try { let e = N.getItem(Jn); if (!e) return []; let t = JSON.parse(e); return Array.isArray(t) ? t
        .filter(e => typeof e == `string`) : [] } catch { return [] } },
  Xn = e => { let t = Yn(); if (t.includes(e)) return; let n = [...t, e].slice(-20);
    N.setItem(Jn, JSON.stringify(n)) },
  Zn = e => { let { chatId: t, chatExists: n, isThinkingArm: r } = e; return !t || n ? !1 : r },
  Qn = e => e ? Yn().includes(e) : !1,
  $n = new Set([`image_funnel`, `background_removal`, `image_enhancer`]),
  er = e => { let { chatType: t, isImageLandingOrigin: n, isBackgroundFunnelOrigin: r, isEnhancerFunnelOrigin: i,
      hasDeepResearchTurn: a } = e; return t && $n.has(t) ? !0 : !!(n || r || i || a) },
  tr = e => { let { chatId: t, chatType: n, isThinkingArm: r, chatExists: i = !0, isFunnelOrigin: a } = e; return a ?
    { isThinking: !1, source: null } : n === `thinking` ? { isThinking: !0, source: `server` } : Qn(t) || r && !i ?
    { isThinking: !0, source: `client` } : { isThinking: !1, source: null } },
  nr = e => tr(e).isThinking;

function rr(e) { return typeof e == `object` && !!e && `index` in e && `streamId` in e && `chunk` in e && typeof e
    .index == `number` }

function ir(e) { return typeof e == `object` && !!e && `type` in e && e.type === `sync-response` }

function ar(e) { return typeof e == `object` && !!e && `type` in e && e.type === `prewarm-status` }

function or(e) { return typeof e == `object` && !!e && `type` in e && e.type === `history-recovery` }

function sr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `review-prompt` }

function cr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `data-chat-metadata` && `data` in e }

function lr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `research-progress` && `data` in e }

function ur(e) { return typeof e == `object` && !!e && `type` in e && e.type === `data-research-complete` && `data` in
  e }

function dr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `data-chat-title-update` && `data` in
  e }

function fr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `data-participant-joined` && `data` in
    e }

function pr(e) { if (typeof e != `object` || !e || !(`type` in e)) return !1; let t = e.type; return [`stream-start`,
    `stream-complete`
  ].includes(t) }

function mr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `stream-aborted` }

function hr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `rate-limit-error` &&
    `messageMetadata` in e }

function gr(e) { return !(typeof e != `object` || !e || !(`type` in e) || e.type !== `error` || `index` in e &&
    `chunk` in e) }

function _r(e) { return typeof e == `object` && !!e && `type` in e && e.type === `resume-start` }

function vr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `resume-error` }

function yr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `resume-complete` }

function br(e) { return typeof e == `object` && !!e && `chunk` in e && typeof e.chunk == `object` && e.chunk?.type ===
    `heartbeat` }

function xr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `team-user-message` && `chatId` in e &&
    `messageId` in e && `userId` in e && `parts` in e }

function Sr(e) { return typeof e == `object` && !!e && `type` in e && e.type === `team-stream-start` && `chatId` in e &&
    `streamId` in e }
var Cr = { 1e3: `Normal closure`, 1001: `Going away (page navigated or server shutting down)`, 1002: `Protocol error`,
  1003: `Unsupported data`, 1005: `No status received (abnormal)`,
  1006: `Abnormal closure (no close frame received - network issue, server crash, or deployment)`,
  1007: `Invalid frame payload data`, 1008: `Policy violation`, 1009: `Message too big`, 1010: `Missing extension`,
  1011: `Internal server error`, 1012: `Service restart`, 1013: `Try again later`, 1014: `Bad gateway`,
  1015: `TLS handshake failure`, 4e3: `Rate limit exceeded`,
  4001: `Auth failure: JWT expired or invalid - will attempt token refresh`,
  4002: `Cloudflare: WebSocket origin not allowed`, 4003: `Cloudflare: WebSocket request too large`,
  4004: `Cloudflare: WebSocket protocol mismatch` };

function wr(e) { return Cr[e] || `Unknown close code (${e})` }

function Tr(e, t) { return or(e) ? (t.onHistoryRecovery(e), !0) : sr(e) ? (t.onReviewPrompt(e), !0) : hr(e) ? (t
      .onRateLimitError(e), !0) : cr(e) ? (t.onChatMetadata(e.data), !0) : dr(e) ? (t.onChatTitleUpdate(e.data), !0) :
    fr(e) ? (t.onParticipantJoined(e.data), !0) : lr(e) ? (t.onResearchProgress(e.data, e.messageId), !0) : ur(e) ? (t
      .onResearchComplete(e.data?.messageId, e.data?.outcome), !0) : yr(e) ? (t.onResumeComplete(e), !0) : rr(e) ? (t
      .onIndexedChunk(e), !0) : pr(e) ? (t.onStreamControl(e), !0) : mr(e) ? (t.onStreamAborted(e), !0) : gr(e) ? (t
      .onStreamError(e), !0) : xr(e) ? (t.onTeamUserMessage(e), !0) : Sr(e) ? (t.onTeamStreamStart(e), !0) : !1 }
var Er = function(e) { return e.Clean = `clean`, e.Bot = `bot`, e.Error = `error`, e }({});
a();
var Dr = null,
  Or = null;

function kr() { return Dr }

function Ar() { return Dr ? Promise.resolve() : Or || (Or = (async () => { try { let { load: e } = await i(
  async () => { let { load: e } = await import(`./botd.esm-BI7Bz_Ix.js`); return { load: e } }, []), t = (
        await e({ monitoring: !1 })).detect();
      Dr = t.bot ? { verdict: Er.Bot, kind: t.botKind } : { verdict: Er.Clean } } catch { Dr = { verdict: Er
          .Error } } finally { Or = null } })(), Or) }
var jr = new Set([1e3, 4e3, 4001]),
  Mr = class { config;
    callbacks;
    attempts = 0;
    timeout = null;
    _isActive = !1;
    _shouldReconnect = !0;
    lastConnectedChatId = null;
    authRefreshAttempted = !1;
    constructor(e, t) { this.config = e, this.callbacks = t } get isActive() { return this
        ._isActive } get shouldReconnect() { return this._shouldReconnect } updateCallbacks(e) { Object.assign(this
          .callbacks, e) } shouldAttemptReconnect(e) { return this._shouldReconnect && !jr.has(e) && !this._isActive &&
          !!this.lastConnectedChatId } isAuthFailure(e) { return e === 4001 } calculateDelay(e) { let t = this.config
          .reconnectBaseDelay ?? 1e3,
          n = this.config.reconnectMaxDelay ?? 3e4,
          r = this.config.reconnectJitter ?? .2,
          i = t * 2 ** e,
          a = Math.min(i, n),
          o = a * r,
          s = Math.random() * o - o / 2; return Math.max(0, Math.round(a + s)) } async attemptReconnect() { if (
          typeof document < `u` && document.visibilityState === `hidden`) return K(
          `reconnect.abandonedHidden`, { chatId: this.lastConnectedChatId, attempts: this.attempts }), this
          ._isActive = !1, !1; let e = this.config.maxReconnectAttempts ?? 5; if (this.attempts >= e) return K(
            `reconnect.gaveUp`, { chatId: this.lastConnectedChatId, attempts: this.attempts, maxAttempts: e }), this
          ._isActive = !1, this.callbacks.onReconnectFailed?.(Error(`Max reconnection attempts exceeded`)), !1; let
          t = this.attempts === 0 ? Math.round(Math.random() * 1e3) : this.calculateDelay(this.attempts); if (this
          .attempts++, K(`reconnect.attempt`, { chatId: this.lastConnectedChatId, attempt: this.attempts,
            maxAttempts: e, delayMs: t }), this.callbacks.onReconnecting?.(this.attempts, e, t), await new Promise(
            e => { this.timeout = setTimeout(e, t) }), !this._shouldReconnect) return this._isActive = !1, !
        1; try { if (this.lastConnectedChatId) { await this.callbacks.connect(this.lastConnectedChatId), this
              .attempts = 0, this._isActive = !1, this.callbacks.onReconnected?.(); try { K(
                `reconnect.recovered`, { chatId: this.lastConnectedChatId, via: this.callbacks.hasActiveStream(this
                    .lastConnectedChatId) ? `resume` : `sync` }), this.callbacks.hasActiveStream(this
                  .lastConnectedChatId) ? await this.callbacks.resume(this.lastConnectedChatId) : await this.callbacks
                .sync(this.lastConnectedChatId) } catch (e) { console.warn(
                `ReconnectionManager: recovery after reconnect failed`, { error: e }) } return !0 } return this
            ._isActive = !1, !1 } catch (e) { return console.error(
          `ReconnectionManager: reconnection failed`, { error: e }), this
        .attemptReconnect() } } async handleAuthFailure() { if (this.authRefreshAttempted) return this._isActive = !1,
            this.callbacks.onReconnectFailed?.(Error(`Authentication failed after token refresh`)), !1;
          this.authRefreshAttempted = !0; try { return await w() ? (this.attempts = 0, this.attemptReconnect()) : (
              this._isActive = !1, this.callbacks.onReconnectFailed?.(Error(
                `Failed to refresh authentication token`)), !1) } catch (e) { return console.error(
                `ReconnectionManager: failed to refresh auth token`, { error: e }), this._isActive = !1, this
              .callbacks.onReconnectFailed?.(e instanceof Error ? e : Error(String(e))), !1 } } start() { this
            ._isActive = !0 } cancel() { this._shouldReconnect = !1, this._isActive = !1, this.timeout &&= (
            clearTimeout(this.timeout), null), this.attempts = 0 } resetForVisibility() { this.attempts = 0, this
            ._shouldReconnect = !0, this._isActive = !1, this.timeout &&= (clearTimeout(this.timeout),
          null) } reset() { this.cancel(), this.authRefreshAttempted = !1, this.lastConnectedChatId =
          null } resetAttempts() { this.attempts = 0, this._shouldReconnect = !0 } },
  Nr = 2e4,
  Pr = 1e4,
  Fr = 3e3,
  Ir = 45e3,
  Lr = class { chatId;
    options;
    hooks;
    ws = null;
    reconnection;
    connectingPromise = null;
    appTokenRefreshNeeded = !1;
    lastActivityAt = 0;
    stallWatchdog = null;
    onlineProbeTimer = null;
    sendAckTimer = null;
    constructor(e, t, n) { this.chatId = e, this.options = t, this.hooks = n, this.reconnection =
      new Mr({ maxReconnectAttempts: this.options.maxReconnectAttempts, reconnectBaseDelay: this.options
            .reconnectBaseDelay, reconnectMaxDelay: this.options.reconnectMaxDelay, reconnectJitter: this.options
            .reconnectJitter }, { onReconnecting: (e, t, n) => { this.hooks.isStreaming() && this.hooks
              .onReconnecting(e, t, n) }, onReconnected: () => this.hooks.onReconnected(),
        onReconnectFailed: e => { this.hooks.isStreaming() && this.hooks.onReconnectFailed(e) }, connect: () => this
            .connect(), sync: () => this.hooks.sync(), resume: () => this.hooks.resume(), hasActiveStream: () =>
            this.hooks.hasPendingWork() }), this.reconnection.lastConnectedChatId = this
      .chatId } isConnected() { return this.ws?.readyState === WebSocket
        .OPEN } getConnectionState() { return { connected: this.isConnected(), readyState: this.ws?.readyState ?? null,
          connectedChatId: this.isConnected() ? this.chatId : null, isReconnecting: this.reconnection
          .isActive } } resetReconnectionForVisibility() { this.reconnection
    .resetForVisibility() } cancelReconnection() { this.reconnection.cancel() } noteActivity() { this.lastActivityAt =
          Date.now(), this.clearSendAck() } noteAuthenticatedFrame() { this.reconnection.authRefreshAttempted && (this
          .reconnection.authRefreshAttempted = !1) } async ensureConnected() { if (this.isConnected()) return !0; if (
          this.ws && this.ws.readyState !== WebSocket.OPEN) { this.ws.onclose = null; try { this.ws
          .close() } catch {} this.ws = null } try { return await this.connect(), !0 } catch (e) { return console
            .error(`ChatConnection: failed to reconnect`, { chatId: this.chatId, error: e }), !1 } } sendIfOpen(
      e) { return this.ws?.readyState === WebSocket.OPEN && (this.ws.send(e), !0) } async connect() { if (this.hooks
          .isDestroyed()) throw Error(`[ChatConnection:${this.chatId}] Connection has been destroyed`); return this
          .ws?.readyState === WebSocket.OPEN ? this.ws : (this.connectingPromise ||= (async () => { this
                .reconnection.lastConnectedChatId = this.chatId, Ar(); let e = await this.options.getAuthToken?.
                () ?? null; return await this.options.ensureAppToken?.(this.appTokenRefreshNeeded), this
                .appTokenRefreshNeeded = !1, new Promise((t, n) => { let r = new WebSocket(this.buildSocketUrl(
                    e));
                  r.onopen = () => { this.ws = r, this.lastActivityAt = Date.now(), this.reconnection
                        .resetAttempts(), K(`socket.open`, { chatId: this.chatId }), t(r) }, r.onerror =
                    e => { this.appTokenRefreshNeeded = !0, K(`socket.error`, { chatId: this.chatId,
                        readyState: r.readyState }), console.error(
                        `ChatConnection: WebSocket connection failed`, { chatId: this.chatId, type: e.type,
                          readyState: r.readyState }), n(Error(
                        `WebSocket connection failed: readyState=${r.readyState}, chatId=${this.chatId}`)) },
                    r.onmessage = e => this.hooks.onFrame(e), r.onclose = e => this.handleWebSocketClose(e) }) })()
            .finally(() => { this.connectingPromise = null }), this.connectingPromise) } buildSocketUrl(e) { let t =
          `${this.options.baseUrl}/${this.chatId}`,
          n = this.options.getAppToken?.(),
          r = this.options.getUserId?.(),
          i = this.options.getUserType?.(),
          a = this.options.getUserEmail?.(),
          o = this.options.getPlanType?.(),
          s = this.options.getTeamId?.(),
          c = this.options.getUserTeamId?.(),
          l = new URLSearchParams;
        e && l.set(`token`, e), n && l.set(`app_token`, n), r && l.set(`userId`, r), i && l.set(`userType`, i), a &&
          l.set(`userEmail`, a), o && l.set(`planType`, o), s && l.set(`teamId`, s), c && l.set(`userTeamId`,
          c); let u = this.options.getIsTestUser?.() ?? !1;
        l.set(`isTestUser`, String(u)); let d = this.options.getChatGeneration?.(this.chatId);
        d && l.set(Kn, d); let f = this.options.getFreemiumFunnel?.() ?? !1;
        l.set(`freemiumFunnel`, String(f)); let p = Nt();
        p && l.set(`payment_token`, p); let m = kr(); if (m && (l.set(`botd_verdict`, m.verdict), m.kind && l.set(
            `botd_kind`, m.kind)), l.toString()) { let e = t.includes(`?`) ? `&` : `?`;
          t = `${t}${e}${l.toString()}` } return t } async connectWithRetry(e) { this.armSendAck(); let t; for (let
              n = 0; n < 3; n++) { if (this.hooks.isDestroyed()) throw Error(
              `[ChatConnection:${this.chatId}] Connection has been destroyed`); try { return await this
            .connect() } catch (r) { if (t = r, this.hooks.isDestroyed() || e?.aborted) throw r;
              n < 2 && await new Promise(e => setTimeout(e, this.connectRetryDelay(
            n))) } } throw t } connectRetryDelay(e) { let t = Math.min(300 * 2 ** e, 2e3),
            n = t * .3; return Math.max(0, Math.round(t + (Math.random() * n - n / 2))) } handleWebSocketClose(
        e) { let t = { code: e.code, reason: e.reason || `(no reason provided)`, wasClean: e.wasClean,
            timestamp: new Date().toISOString(), chatId: this.chatId, codeDescription: wr(e.code) }; if (this.ws =
            null, K(`socket.close`, { ...t, isStreaming: this.hooks.isStreaming(), hasPendingWork: this.hooks
                .hasPendingWork(), reconnectAlreadyActive: this.reconnection.isActive, willReconnect: this
                .reconnection.shouldAttemptReconnect(e.code) }), this.reconnection.isAuthFailure(e.code)) { this
              .reconnection.start(), this.reconnection.handleAuthFailure().then(e => { e || this.hooks
                  .onStreamsFailed() }); return } this.reconnection.isActive || (this.reconnection
            .shouldAttemptReconnect(e.code) ? (this.reconnection.start(), this.reconnection.attemptReconnect()) :
            (console.warn(`ChatConnection: socket closed without reconnect`, t), this.hooks.onStreamsFailed())
            ) } livenessSnapshot() { return { isStreaming: this.hooks.isStreaming(), pausedForApproval: this.hooks
              .isPausedForApproval(), silentForMs: Date.now() - this.lastActivityAt } } armSendAck() { this
            .clearSendAck(); let e = this.lastActivityAt;
          this.sendAckTimer = setTimeout(() => { this.sendAckTimer = null, this.hooks.hasPendingWork() && this
              .lastActivityAt === e && (this.reconnection.isActive || this.connectingPromise || (K(
                `send.unacknowledged`, { chatId: this.chatId, afterMs: Ir }), this.forceReconnect(
                `no server frame within ${Ir}ms of a send`))) }, Ir) } clearSendAck() { this.sendAckTimer &&= (
            clearTimeout(this.sendAckTimer), null) } startWatchdog() { this.hooks.isDestroyed() || this
            .stallWatchdog || (this.lastActivityAt = Date.now(), K(`watchdog.arm`, { chatId: this.chatId, via: He(),
                ...this.livenessSnapshot() }), this.stallWatchdog = setInterval(() => this.checkForStall(), Pr),
              window.addEventListener(`online`, this.handleBrowserOnline)) } stopWatchdog() { this
            .onlineProbeTimer &&= (clearTimeout(this.onlineProbeTimer), null), this.stallWatchdog && (K(
                `watchdog.disarm`, { chatId: this.chatId, via: He() }), clearInterval(this.stallWatchdog), this
              .stallWatchdog = null, window.removeEventListener(`online`, this.handleBrowserOnline)
              ) } handleBrowserOnline = () => { if (K(`online.event`, { chatId: this.chatId, isStreaming: this.hooks
                .isStreaming(), readyState: this.ws?.readyState ?? null, silentForMs: Date.now() - this
                .lastActivityAt, willForceReconnect: this.hooks.isStreaming() && !this.hooks
              .isPausedForApproval() && !this.reconnection.isActive && !this.connectingPromise }), !this.hooks
            .isStreaming() || this.hooks.isPausedForApproval() || this.reconnection.isActive || this
            .connectingPromise) return; let e = this.lastActivityAt;
          this.onlineProbeTimer = setTimeout(() => { if (this.onlineProbeTimer = null, !(!this.hooks
              .isStreaming() || this.hooks.isPausedForApproval()) && !(this.reconnection.isActive || this
                .connectingPromise)) { if (this.lastActivityAt !== e) { K(`online.selfHealed`, { chatId: this
                    .chatId }); return } this.forceReconnect(
              `network restored mid-stream, socket still silent`) } }, Fr) };
    checkForStall() { if (!this.hooks.isStreaming()) { this.stopWatchdog(); return } if (this.hooks
          .isPausedForApproval() || this.reconnection.isActive || this.connectingPromise) return; let e = Date.now() -
          this.lastActivityAt;
        K(`watchdog.tick`, { chatId: this.chatId, silentForMs: e, willFire: e >= Nr, readyState: this.ws?.readyState ??
            null, ...this.livenessSnapshot() }), !(e < Nr) && this.forceReconnect(
        `silent socket for ${e}ms`) } forceReconnect(e) { if (console.warn(
            `ChatConnection: forcing reconnect of a stalled stream`, { chatId: this.chatId, reason: e }), K(
            `socket.forceClose`, { chatId: this.chatId, reason: e, readyState: this.ws?.readyState ?? null, ...this
              .livenessSnapshot() }), this.ws) { this.ws.onclose = null; try { this.ws.close() } catch {} this.ws =
          null } this.reconnection.shouldReconnect && !this.reconnection.isActive ? (this.reconnection
            .resetForVisibility(), this.reconnection.start(), this.reconnection.attemptReconnect()) : this.hooks
          .onStreamsFailed() } destroy() { if (this.clearSendAck(), this.reconnection.reset(), this.ws) { this.ws
            .onclose = null; try { this.ws.close(1e3, `Client closed`) } catch {} this.ws = null } } };

function Rr(e, t, n, r) { for (let i of e) try { t(i) } catch (e) { console.error(`${n} threw`, { chatId: r,
      error: e }) } }
var zr = class { label;
    chatId;
    handlers = new Set;
    constructor(e, t) { this.label = e, this.chatId = t } add(e) { return this.handlers.add(e), () => { this.handlers
          .delete(e) } } emit(...e) { Rr(this.handlers, t => t(...e), `ChatConnection: ${this.label} subscriber`, this
        .chatId) } clear() { this.handlers.clear() } },
  Br = class { syncResponse;
    historyRecovery;
    reviewPrompt;
    constructor(e) { this.syncResponse = new zr(`sync-response`, e), this.historyRecovery = new zr(`history-recovery`,
          e), this.reviewPrompt = new zr(`review-prompt`, e) } onSyncResponse(e) { return this.syncResponse.add(
        e) } emitSyncResponse(e) { this.syncResponse.emit(e) } onHistoryRecovery(e) { return this.historyRecovery.add(
        e) } emitHistoryRecovery(e) { this.historyRecovery.emit(e) } onReviewPrompt(e) { return this.reviewPrompt.add(
        e) } emitReviewPrompt(e) { this.reviewPrompt.emit(e) } clear() { this.syncResponse.clear(), this.historyRecovery
          .clear(), this.reviewPrompt.clear() } };

function Vr(e) { let t = e.getProjectId?.(); return t ? { projectId: t } : {} }
var Hr = class { chatId;
    options;
    statusSubscribers = new Set;
    constructor(e, t) { this.chatId = e, this.options = t } onStatus(e) { return this.statusSubscribers.add(e),
      () => { this.statusSubscribers.delete(e) } } tryHandle(e) { return ar(e) ? (this.emitStatus(e), !0) : !
        1 } emitStatus(e) { Rr(this.statusSubscribers, t => t(e), `PrewarmCoordinator: prewarm-status subscriber`, this
          .chatId) } buildFrame(e) { let t = Vr(this.options); return { type: `prewarm`, chatId: this.chatId, ...e
          ?.requestId && { requestId: e.requestId }, ...t } } destroy() { this.statusSubscribers.clear() } },
  Ur = 5e3,
  Wr = class { hooks;
    timer = null;
    generation = 0;
    constructor(e) { this.hooks = e } clear() { this.generation++, this.timer &&= (clearTimeout(this.timer),
        null) } schedule() { this.clear(); let e = Date.now(),
          t = this.generation;
        this.timer = setTimeout(async () => { if (this.timer = null, !(this.hooks.isDestroyed() || !this.hooks
              .isStreaming()) && t === this.generation && !(this.hooks.getLastChunkAt() > e)) try { let n =
              await this.hooks.sync(); if (n.transportFailure || n.status === `streaming` || n.status ===
              `paused` || this.hooks.isDestroyed() || !this.hooks.isStreaming() || t !== this.generation || this
              .hooks.getLastChunkAt() > e) return;
            this.hooks.onStreamEvicted() } catch (e) { console.warn(
              `ChatConnection: resume verification failed`, { chatId: this.hooks.chatId, error: e }) } }, Ur) } },
  Gr = class { chatId;
    hooks;
    lastEmitted = !1;
    subscribers = new Set;
    constructor(e, t) { this.chatId = e, this.hooks = t } subscribe(e) { return this.subscribers.add(e), () => this
        .subscribers.delete(e) } clearSubscribers() { this.subscribers.clear() } notify(e = !1) { this
    .syncWatchdog(); let t = this.hooks.isStreaming(); if (!(!e && t === this.lastEmitted)) { this.lastEmitted = t, K(
            `notifier.emit`, { chatId: this.chatId, isStreaming: t, force: e, via: He() }), this.hooks
          .onStreamStateChange(this.chatId, t); for (let e of this.subscribers) try { e(this.chatId, t) } catch (
        e) { console.error(`[ChatConnection:${this.chatId}] stream-state subscriber threw:`,
        e) } } } syncWatchdog() { let e = this.hooks.hasActiveStream();
      e !== this.watchdogArmed && (this.watchdogArmed = e, K(`watchdog.decision`, { chatId: this.chatId, arm: e,
        via: He() }), e ? this.hooks.startWatchdog() : this.hooks.stopWatchdog()) } watchdogArmed = !1 };

function Kr(e, t, n, r) { Rr(e, e => e(t, n, r), `ChatConnection: onResearchProgress listener`, t) }

function qr(e, t, n, r) { Rr(e, e => e(t, n, r), `ChatConnection: onResearchComplete listener`, t) }

function Jr(e, t, n) { Rr(e, e => e(t, n), `ChatConnection: onDeepResearch listener`, t) }

function Yr(e, t) { return { type: `sync-response`, chatId: e, status: t, transportFailure: !0 } }

function Xr(e, t) { return e.status !== `streaming` && e.status !== `paused` ? !1 : !t }

function Zr(e) { return e.status !== `streaming` && e.status !== `paused` }

function Qr(e, t = Date.now()) { return e !== 0 && t - e >= 4e5 }

function $r(e) { return !e }
var ei = class { chatId;
    options;
    callbacks;
    store;
    subscribers;
    streamState;
    activeStreamIds = new Set;
    abortedStreamIds = new Set;
    pendingSyncs = new Map;
    activeSyncPromises = new Map;
    socket;
    resumeVerifier;
    prewarmCoordinator;
    sendInProgress = !1;
    pausedForApproval = !1;
    destroyed = !1;
    lastChunkAt = 0;
    unproductiveStreamingSince = 0;
    frameHandlers = { onHistoryRecovery: e => this.subscribers.emitHistoryRecovery(e), onReviewPrompt: e => this
        .subscribers.emitReviewPrompt(e), onRateLimitError: e => this.handleRateLimitError(e), onChatMetadata: e =>
        this.callbacks.onChatMetadata?.(e), onChatTitleUpdate: e => this.callbacks.onChatTitleUpdate?.(e),
      onParticipantJoined: e => this.callbacks.onParticipantJoined?.(e), onResearchProgress: (e, t) => Kr(this
        .callbacks.onResearchProgress, this.chatId, e, t), onResearchComplete: (e, t) => qr(this.callbacks
        .onResearchComplete, this.chatId, e, t), onResumeComplete: e => this.handleResumeComplete(e),
      onIndexedChunk: e => this.handleIndexedChunk(e), onStreamControl: e => this.handleStreamControlMessage(e),
      onStreamAborted: e => this.handleStreamAbortedMessage(e), onStreamError: e => this.handleStreamErrorMessage(e),
      onTeamUserMessage: e => this.options.onTeamUserMessage?.(e), onTeamStreamStart: e => this.options
        .onTeamStreamStart?.(e) };
    sendCompletionResolvers = new Set;
    constructor(e) { this.chatId = e.chatId, this.options = e.options, this.callbacks = e.callbacks, this.store = e
          .store, this.subscribers = new Br(this.chatId), this.prewarmCoordinator = new Hr(this.chatId, this.options),
          this.socket = new Lr(this.chatId, this.options, { isDestroyed: () => this.destroyed, isStreaming: () => this
              .isStreaming(), isPausedForApproval: () => this.pausedForApproval, hasPendingWork: () => this
              .hasActiveStream() || this.sendInProgress, onFrame: e => this.handleWebSocketMessage(e),
            onStreamsFailed: () => this.failAllStreams(), onReconnecting: (e, t, n) => this.callbacks.onReconnecting?.
              (this.chatId, e, t, n), onReconnected: () => this.callbacks.onReconnected?.(this.chatId),
            onReconnectFailed: e => this.callbacks.onReconnectFailed?.(this.chatId, e), sync: () => this.syncStream(),
            resume: () => this.resumeStream() }), this.streamState = new Gr(this.chatId, { isStreaming: () => this
              .isStreaming(), hasActiveStream: () => this.hasActiveStream(), startWatchdog: () => this.socket
              .startWatchdog(), stopWatchdog: () => this.socket.stopWatchdog(), onStreamStateChange: (e, t) => this
              .callbacks.onStreamStateChange?.(e, t) }), this.resumeVerifier = new Wr({ chatId: this.chatId,
            isDestroyed: () => this.destroyed, isStreaming: () => this.isStreaming(), getLastChunkAt: () => this
              .lastChunkAt, sync: () => this.syncStream(), onStreamEvicted: () => { this.finishStreamLocally(), this
                .callbacks.onStreamFinishedWhileDisconnected?.(this.chatId, this.options.getTeamId?.() ??
                null) } }) } onSyncResponse(e) { return this.subscribers.onSyncResponse(e) } onHistoryRecovery(
      e) { return this.subscribers.onHistoryRecovery(e) } onReviewPrompt(e) { return this.subscribers.onReviewPrompt(
        e) } isConnected() { return this.socket.isConnected() } isConnectionHealthy() { return this
      .isConnected() } getConnectionState() { return this.socket.getConnectionState() } isSyncing() { return this
          .activeSyncPromises.size > 0 } resetReconnectionForVisibility() { this.socket
      .resetReconnectionForVisibility() } cancelReconnection() { this.socket
      .cancelReconnection() } async ensureConnected() { return this.socket
      .ensureConnected() } isStreaming() { return this.sendInProgress || this.activeStreamIds.size >
            0 } notifyStreamStateIfChanged(e = !1) { this.streamState.notify(e) } subscribeToStreamState(
        e) { return this.streamState.subscribe(e) } clearSendInProgress() { this.sendInProgress = !1 } synthesizeFinish(
          e = `stop`, t, n) { this.store.appendChunkForChat(this.chatId, { type: `finish`, finishReason: e, ...t ?
            { messageMetadata: t } : {} }, n !== void 0 && n !== this.chatId ? n : void 0) } pruneStreamRouting(e) { e
            !== void 0 && e !== this.chatId && We(this.chatId)?.streamMessageIds.delete(e) } failAllStreams() { this
            .pausedForApproval = !1, this.activeStreamIds.clear(), this.abortedStreamIds.clear(), this
            .clearSendInProgress(), this.resolveAllSendCompletions(), this
          .notifyStreamStateIfChanged() } handleWebSocketMessage(e) { this.socket.noteActivity(); try { let t = JSON
              .parse(e.data); if (this.socket.noteAuthenticatedFrame(), br(t)) return; if (ir(t)) { this
                .handleSyncResponse(t); return } if (this.prewarmCoordinator.tryHandle(t) || Tr(t, this.frameHandlers))
              return; if (_r(t)) { if (t.status === `completed` || t.status === `error`) { this.finishStreamLocally(),
                  this.callbacks.onStreamFinishedWhileDisconnected?.(this.chatId, this.options.getTeamId?.() ??
                  null); return } t.status === `paused` && (this.pausedForApproval = !0), this.setSoleActiveStream(t
                .broadcastStreamId || this.chatId), this.notifyStreamStateIfChanged(); return } if (vr(t)) { this
                .finishStreamLocally(), this.callbacks.onStreamFinishedWhileDisconnected?.(this.chatId, this.options
                  .getTeamId?.() ?? null); return } } catch (e) { console.error(
              `ChatConnection: error handling message`, { chatId: this.chatId, error: e }), this
          .failAllStreams() } } handleSyncResponse(e) { e.status === `paused` && (this.pausedForApproval = !0), this
            .subscribers.emitSyncResponse(e); let t = this.pendingSyncs.get(e.chatId);
          t && (t(e), this.pendingSyncs.delete(e.chatId)) } handleStreamErrorMessage(e) { let t = e.error ?? e
            .errorText ?? `Stream ended unexpectedly`,
            n = e.errorType === `ip_rate_limit`,
            r = e.streamId !== void 0 && e.streamId !== this.chatId ? e.streamId : void 0,
            i = Kt(e.errorType);
          i && this.socket.cancelReconnection(), this.synthesizeFinish(`error`, { errorType: e.errorType,
              errorMessage: t }, r), r === void 0 ? (this.activeStreamIds.clear(), this.abortedStreamIds.clear()) : (
              this.activeStreamIds.delete(r), this.abortedStreamIds.delete(r)), r !== void 0 && this.activeStreamIds
            .size > 0 || (i || this.store.setStreamError(this.chatId, { message: t, errorType: e.errorType,
              isIpRateLimit: n }), this.resolveAllSendCompletions()), this.clearSendInProgress(), this
            .notifyStreamStateIfChanged() } handleRateLimitError(e) { this.synthesizeFinish(), this.store
            .enqueueRateLimitEvent(this.chatId, { messageMetadata: e.messageMetadata, presentation: e.presentation }),
            this.activeStreamIds.clear(), this.clearSendInProgress(), this.resolveAllSendCompletions(), this
            .notifyStreamStateIfChanged() } handleStreamAbortedMessage(e) { let { streamId: t } = e, n = this
            .abortedStreamIds.delete(t), r = this.activeStreamIds.delete(t);!n && r && this.synthesizeFinish(), this
            .pruneStreamRouting(t), this.clearSendInProgress(), this.resolveAllSendCompletions(), this
            .notifyStreamStateIfChanged() } handleIndexedChunk(e) { let { streamId: t, chunk: n } = e, r = n.type; if (
            r === `heartbeat` || (this.lastChunkAt = Date.now(), this.pausedForApproval = r === `tool-approval-request`,
              this.abortedStreamIds.has(t))) return; let i = t === this.chatId; if (i || (this.activeStreamIds.add(t),
              this.clearSendInProgress()), Fe(n)) { if (r === `data-deepResearch`) { let e = n.data;
              Jr(this.callbacks.onDeepResearch, t, e) } return } this.store.appendChunkForChat(this.chatId, n, i ?
              void 0 : t), r === `tool-output-available` && this.callbacks.toolCallCallback(n.output), Pe(n) && (this
              .activeStreamIds.delete(t), this.resolveAllSendCompletions(), this.notifyStreamStateIfChanged()), this
            .notifyStreamStateIfChanged() } handleStreamControlMessage(e) { switch (e.type) {
            case `stream-start`:
              this.activeStreamIds.add(e.streamId), this.clearSendInProgress(), this
          .notifyStreamStateIfChanged(); break;
            case `stream-complete`: { let t = this.abortedStreamIds.delete(e.streamId),
                n = this.activeStreamIds.has(e.streamId);
              this.activeStreamIds.delete(e.streamId), n && !t && this.synthesizeFinish(), this.pruneStreamRouting(e
                  .streamId), this.clearSendInProgress(), this.resolveAllSendCompletions(), this
                .notifyStreamStateIfChanged(); break } } } handleResumeComplete(e) { let t = e.broadcastStreamId || e
            .streamId; if (e.status === `completed` || e.status === `error`) { let e = this.abortedStreamIds.delete(t),
              n = this.activeStreamIds.has(t);
            this.activeStreamIds.delete(t), n && !e && this.synthesizeFinish(), this.clearSendInProgress(), this
              .resolveAllSendCompletions(), this.notifyStreamStateIfChanged() } } async prewarm(e) { try {
            (await this.socket.connect()).send(JSON.stringify(this.prewarmCoordinator.buildFrame(e))) } catch (
          e) { console.error(`ChatConnection: prewarm failed`, { chatId: this.chatId,
            error: e }) } } async syncStream() { let e = this.activeSyncPromises.get(this.chatId); if (e)
          return e; let t = this._doSyncStream();
            this.activeSyncPromises.set(this.chatId, t); try { return await t } finally { this.activeSyncPromises
                .delete(this.chatId) } } async _doSyncStream() { try { if (!this.isConnected() && !await this
                .ensureConnected()) return Yr(this.chatId, `error`); let e = await this.socket.connect(),
                t = new Promise(e => { this.pendingSyncs.set(this.chatId, e) });
              e.send(JSON.stringify({ type: `sync`, chatId: this.chatId })); let n = new Promise((e,
              t) => { setTimeout(() => t(Error(`Sync timeout`)), 1e4) }); return await Promise.race([t,
              n]) } catch (e) { return console.error(`ChatConnection: sync failed`, { chatId: this.chatId,
                error: e }), this.pendingSyncs.delete(this.chatId), Yr(this.chatId,
              `not-found`) } } async resumeStream() { $r(this.options.getIsTurnStoppedByUser?.(this.chatId) ?? !1) &&
                (!this.isConnected() && !await this.ensureConnected() || ((await this.socket.connect()).send(JSON
                    .stringify({ type: `resume`, chatId: this.chatId, lastIndex: 0 })), this.resumeVerifier
                  .schedule())) } setSoleActiveStream(e) { this.activeStreamIds.clear(), this.activeStreamIds.add(
              e) } hasActiveStream() { return this.activeStreamIds.size > 0 } async reconnectToStream() { try { this
                  .sendInProgress = !0; let e = await this.syncStream(); if (e.transportFailure && this
                  .subscribers.emitSyncResponse(e), e.imageParts?.length)
                  for (let t of e.imageParts) { let e = t.output?.images?.length;
                    (t.state === `output-available` || e) && this.store.appendChunkForChat(this.chatId, t) }
                if (!Xr(e, this.options.getIsTurnStoppedByUser?.(this.chatId) ?? !1)) { if (Zr(e)) return this
                    .finishStreamLocally();
                  this.sendInProgress = !1, this.notifyStreamStateIfChanged(); return } let t = e
                  .broadcastStreamId; if (this.lastChunkAt > this.unproductiveStreamingSince && (this
                    .unproductiveStreamingSince = 0), Qr(this.unproductiveStreamingSince)) { this
                  .failAllStreams(), this.store.setStreamError(this
                    .chatId, { message: `Stream ended unexpectedly` }); return } this
                  .unproductiveStreamingSince === 0 && (this.unproductiveStreamingSince = Date.now()), t && this
                  .setSoleActiveStream(t), (await this.socket.connect()).send(JSON.stringify({ type: `resume`,
                    chatId: this.chatId, lastIndex: 0 })), this.resumeVerifier.schedule(), this.sendInProgress = !
                  1, this.notifyStreamStateIfChanged() } catch (e) { console.error(
                    `ChatConnection: reconnectToStream failed`, { chatId: this.chatId, error: e }), this
                  .sendInProgress = !1, this
            .notifyStreamStateIfChanged() } } async sendPreparedRequest({ abortSignal: e, request: t,
              onAbort: n, ensureSession: r }) { this.resumeVerifier.clear(), this.sendInProgress = !0, this
                .notifyStreamStateIfChanged(); let i, a = new Promise(e => { i = e });
              this.sendCompletionResolvers.add(i), e && e.addEventListener(`abort`, () => { this
                  .clearSendInProgress(), this.activeStreamIds.clear(), i(), this.sendCompletionResolvers
                  .delete(i), n?.(), this.notifyStreamStateIfChanged() }); try { r && await r(), (await this
                  .socket.connectWithRetry(e)).send(JSON.stringify(t)) } catch (e) { throw this
                  .clearSendInProgress(), i(), this.sendCompletionResolvers.delete(i), this
                  .notifyStreamStateIfChanged(), e } return a } resolveAllSendCompletions() { if (this
                .sendCompletionResolvers.size !== 0) { for (let e of this.sendCompletionResolvers) e();
                this.sendCompletionResolvers.clear() } } sendApprovalResponse(e) { let
              t = { type: `approval-response`, approvalId: e.approvalId, approved: e.approved }; return e
                .reason !== void 0 && (t.reason = e.reason), e.modifiedArgs !== void 0 && (t.modifiedArgs = e
                  .modifiedArgs), this.socket.sendIfOpen(JSON.stringify(t)) ? (this.pausedForApproval = !1, !
                0) : !1 } finishStreamLocally() { this.pausedForApproval = !1, this.resumeVerifier.clear(), this
                .activeStreamIds.clear(), this.synthesizeFinish(), this.clearSendInProgress(), this
                .resolveAllSendCompletions(), this.notifyStreamStateIfChanged(!0) } async abortStream() { for (
                let e of this.activeStreamIds) this.abortedStreamIds.add(e);
              this.socket.sendIfOpen(JSON.stringify({ type: `abort`, streamId: this.chatId })), this
                .synthesizeFinish(`abort`), this.activeStreamIds.clear(), this.clearSendInProgress(), this
                .resolveAllSendCompletions(), this.notifyStreamStateIfChanged() } recycleSocket() { let e =
                this.isStreaming(); return this.socket.destroy(), this.clearSendInProgress(), this
                .resolveAllSendCompletions(), this.notifyStreamStateIfChanged(), e } destroy() { this
                .destroyed || (this.destroyed = !0, this.socket.stopWatchdog(), this.resumeVerifier.clear(),
                  this.socket.destroy(), this.activeStreamIds.clear(), this.abortedStreamIds.clear(), this
                  .pendingSyncs.clear(), this.activeSyncPromises.clear(), this.resolveAllSendCompletions(),
                  this.sendInProgress = !1, this.subscribers.clear(), this.prewarmCoordinator.destroy(), this
                  .notifyStreamStateIfChanged()) } },
  ti = class { options;
    callbacks;
    store;
    connections = new Map;
    constructor(e, t, n) { this.options = e, this.callbacks = t, this.store = n } getOrCreate(e) { let t = this
        .connections.get(e); return t || (t = new ei({ chatId: e, options: this.options, callbacks: this.callbacks,
        store: this.store }), this.connections.set(e, t), t) } get(e) { return this.connections.get(
    e) } all() { return Array.from(this.connections.values()) } destroy(e) { let t = this.connections.get(e);
      t && (t.destroy(), this.connections.delete(e), Ge(e)) } recycleAll() { return this.all().filter(e => e
        .recycleSocket()) } };

function ni(e, t) { return { userId: e.getUserId?.() ?? void 0, email: e.getUserEmail?.() ?? void 0, userType: e
      .getUserType?.() ?? void 0, userEmail: e.getUserEmail?.() ?? void 0, planType: e.getPlanType?.() ?? void 0,
    subscriptionStatus: e.getSubscriptionStatus?.() ?? void 0, isFreemium: e.getIsFreemium?.() ?? !1, isTestUser: e
      .getIsTestUser?.() ?? !1, cfModelsVariant: e.getCfModelsVariant?.() ?? void 0, microsoftConnectorsVariant: e
      .getMicrosoftConnectorsVariant?.() ?? void 0, promptScreeningVariant: e.getPromptScreeningVariant?.() ?? void 0,
    mixpanelUserId: e.getMixpanelUserId?.() ?? void 0, deviceId: e.getDeviceId?.() ?? void 0, isMobile: e.getIsMobile?.
    () ?? !1, isWebSearchMode: e.getIsWebSearchMode?.() ?? !1, isDeepResearchMode: e.getIsDeepResearchMode?.() ?? !1,
    isImageGenerationMode: e.getIsImageGenerationMode?.() ?? !1, isAgenticMode: e.getIsAgenticMode?.() ?? !1,
    isClarifyingQuestionsEnabled: e.getIsClarifyingQuestionsEnabled?.() ?? !1, disabledToolkits: e.getDisabledToolkits?.
      (t) ?? [], enabledToolkits: e.getEnabledToolkits?.(t), isIncognitoMode: e.getIsIncognitoMode?.() ?? !1,
    deepResearchProcessor: e.getDeepResearchProcessor?.() ?? void 0, selectedModel: e.getSelectedModel?.() ?? void 0,
    projectId: e.getProjectId?.() || null, projectName: e.getProjectName?.() || null, locale: e.getLocale?.() ?? void 0,
    userTimezone: e.getUserTimezone?.() ?? void 0, userCountry: e.getUserCountry?.() ?? void 0, chatType: e.getChatType
      ?.() ?? null, teamId: e.getTeamId?.() ?? null, userTeamId: e.getUserTeamId?.() ?? null } } a();
var ri = class { options;
    toolCallCallback;
    callbacks;
    store;
    manager;
    constructor(e) { this.options = e, this.toolCallCallback = e.toolCallCallback.bind(this), this.store = e.store, this
          .callbacks = { toolCallCallback: this.toolCallCallback, onChatMetadata: e.onChatMetadata, onChatTitleUpdate: e
              .onChatTitleUpdate, onDeepResearch: new Set(e.onDeepResearch ? [e.onDeepResearch] : []),
            onResearchProgress: new Set, onResearchComplete: new Set, onReconnecting: e.onReconnecting, onReconnected: e
              .onReconnected, onReconnectFailed: e.onReconnectFailed, onStreamFinishedWhileDisconnected: e
              .onStreamFinishedWhileDisconnected }, this.manager = new ti(this.options, this.callbacks, this
          .store) } getOrCreateConnection(e) { return this.manager.getOrCreate(e) } setOnChatMetadata(e) { this
          .callbacks.onChatMetadata = e } setOnChatTitleUpdate(e) { this.callbacks.onChatTitleUpdate =
        e } setOnParticipantJoined(e) { this.callbacks.onParticipantJoined = e } setOnDeepResearch(e) { return this
          .callbacks.onDeepResearch.add(e), () => this.callbacks.onDeepResearch.delete(e) } setOnResearchProgress(
      e) { return this.callbacks.onResearchProgress.add(e), () => this.callbacks.onResearchProgress.delete(
        e) } setOnResearchComplete(e) { return this.callbacks.onResearchComplete.add(e), () => this.callbacks
          .onResearchComplete.delete(e) } setOnStreamStateChange(e) { this.callbacks.onStreamStateChange =
        e } setOnTeamUserMessage(e) { this.options.onTeamUserMessage = e } setOnTeamStreamStart(e) { this.options
          .onTeamStreamStart = e } setGetAuthToken(e) { this.options.getAuthToken = e } setGetAppToken(e) { this.options
          .getAppToken = e } setEnsureAppToken(e) { this.options.ensureAppToken = e } setGetUserId(e) { this.options
          .getUserId = e } setGetUserType(e) { this.options.getUserType = e } setGetUserEmail(e) { this.options
          .getUserEmail = e } setGetPlanType(e) { this.options.getPlanType = e } setGetSubscriptionStatus(e) { this
          .options.getSubscriptionStatus = e } setGetIsTestUser(e) { this.options.getIsTestUser = e } setGetIsFreemium(
        e) { this.options.getIsFreemium = e } setGetFreemiumFunnel(e) { this.options.getFreemiumFunnel =
        e } setGetIsWebSearchMode(e) { this.options.getIsWebSearchMode = e } setGetIsDeepResearchMode(e) { this.options
          .getIsDeepResearchMode = e } setGetIsImageGenerationMode(e) { this.options.getIsImageGenerationMode =
        e } setGetIsAgenticMode(e) { this.options.getIsAgenticMode = e } setGetIsClarifyingQuestionsEnabled(e) { this
          .options.getIsClarifyingQuestionsEnabled = e } setGetDisabledToolkits(e) { this.options.getDisabledToolkits =
          e } setGetEnabledToolkits(e) { this.options.getEnabledToolkits = e } setGetIsIncognitoMode(e) { this.options
          .getIsIncognitoMode = e } setGetDeepResearchProcessor(e) { this.options.getDeepResearchProcessor =
        e } setGetSelectedModel(e) { this.options.getSelectedModel = e } setGetIsAutoModelSelected(e) { this.options
          .getIsAutoModelSelected = e } setGetModelSelectionSource(e) { this.options.getModelSelectionSource =
        e } setGetImageGenerationModel(e) { this.options.getImageGenerationModel = e } setGetDisabledConnectorIds(
      e) { this.options.getDisabledConnectorIds = e } setGetCfModelsVariant(e) { this.options.getCfModelsVariant =
        e } setGetMicrosoftConnectorsVariant(e) { this.options.getMicrosoftConnectorsVariant =
        e } setGetPromptScreeningVariant(e) { this.options.getPromptScreeningVariant = e } setGetMixpanelUserId(
      e) { this.options.getMixpanelUserId = e } setGetDeviceId(e) { this.options.getDeviceId = e } setGetIsMobile(
      e) { this.options.getIsMobile = e } setGetProjectId(e) { this.options.getProjectId = e } setGetProjectName(
      e) { this.options.getProjectName = e } setGetLocale(e) { this.options.getLocale = e } setGetUserTimezone(e) { this
          .options.getUserTimezone = e } setGetUserCountry(e) { this.options.getUserCountry = e } setGetChatType(
      e) { this.options.getChatType = e } setGetChatGeneration(e) { this.options.getChatGeneration = e } setGetTeamId(
      e) { this.options.getTeamId = e } setGetIsTurnStoppedByUser(e) { this.options.getIsTurnStoppedByUser =
        e } setGetUserTeamId(e) { this.options.getUserTeamId = e } setEnsureSession(e) { this.options.ensureSession =
        e } setOnReconnecting(e) { this.options.onReconnecting = e, this.callbacks.onReconnecting =
        e } setOnReconnected(e) { this.options.onReconnected = e, this.callbacks.onReconnected =
        e } setOnReconnectFailed(e) { this.options.onReconnectFailed = e, this.callbacks.onReconnectFailed =
        e } setOnStreamFinishedWhileDisconnected(e) { this.options.onStreamFinishedWhileDisconnected = e, this.callbacks
          .onStreamFinishedWhileDisconnected = e } isConnectionHealthy() { return this.manager.all().some(e => e
          .isConnectionHealthy()) } isConnected() { return this.manager.all().some(e => e
    .isConnected()) } isSyncing() { return this.manager.all().some(e => e
    .isSyncing()) } getStreamingChatIds() { return this.manager.all().filter(e => e.isStreaming()).map(e => e
          .chatId) } getConnectionState(e) { if (e) return this.manager.get(e)?.getConnectionState() ?? { connected: !1,
          readyState: null, connectedChatId: null, isReconnecting: !1 }; for (let e of this.manager.all())
          if (e.isConnected()) return e.getConnectionState(); return { connected: !1, readyState: null,
          connectedChatId: null, isReconnecting: !1 } } async ensureConnected(e) { return this.manager.getOrCreate(e)
          .ensureConnected() } resetReconnectionForVisibility() { for (let e of this.manager.all()) e
          .resetReconnectionForVisibility() } async recoverAfterVisibilityChange() { await Promise.all(this.manager
          .all().map(async e => { if (!(!e.isStreaming() && e.isConnected()) && (e
              .resetReconnectionForVisibility(), await e.ensureConnected())) try { e.hasActiveStream() ?
                await e.resumeStream() : await e.syncStream() } catch {} })) } cancelReconnection() { for (let e of
            this.manager.all()) e.cancelReconnection() } async recycleConnections() { await Promise.all(this.manager
          .recycleAll().map(async e => { if (await e.ensureConnected()) try { await e
              .reconnectToStream() } catch {} })) } async prewarm(e, t) { return this.manager.getOrCreate(e)
          .prewarm(t) } onPrewarmStatus(e, t) { return this.manager.getOrCreate(e).prewarmCoordinator.onStatus(
          t) } async syncStream(e) { return this.manager.getOrCreate(e).syncStream() } async resumeStream(
      e) { return this.manager.getOrCreate(e).resumeStream() } hasActiveStream(e) { return this.manager.get(
          e)?.hasActiveStream() ?? !1 } async reconnectToStream({ chatId: e }) { return this.manager
          .getOrCreate(e).reconnectToStream() } finishStreamLocally(e) { this.manager.get(e)
          ?.finishStreamLocally() } async abortStream(e) { await this.manager.get(e)
        ?.abortStream() } sendApprovalResponse(e, t) { return this.manager.getOrCreate(e)
            .sendApprovalResponse(t) } async sendMessages({ abortSignal: e, chatId: t, messageId: n,
          messages: r, trigger: a, ...o }) { let s = ni(this.options, t),
            c = r.at(-1),
            l = c?.metadata,
            u = l?.retryLastMessage === !0,
            d = l?.isRetryFlow === !0,
            f = typeof l?.isWebSearchMode == `boolean` ? l.isWebSearchMode : void 0,
            p = typeof l?.isDeepResearchMode == `boolean` ? l.isDeepResearchMode : void 0,
            m = typeof l?.isImageGenerationMode == `boolean` ? l.isImageGenerationMode : void 0,
            h = u ? l?.isWebSearchMode ?? !1 : f ?? s.isWebSearchMode,
            g = u ? l?.isDeepResearchMode ?? !1 : p ?? s.isDeepResearchMode,
            _ = u ? l?.isImageGenerationMode ?? !1 : m ?? s.isImageGenerationMode,
            v = s.isAgenticMode,
            y = oe(t),
            b = fe(t),
            x = _ || g || y || b ? !1 : v,
            ee = l?.isStandaloneImageMode ?? !1,
            S = l?.needsBlurPreview ?? !1,
            C = !u && l?.expectNewChat === !0,
            w = u ? l?.deepResearchProcessor : s.deepResearchProcessor,
            T = u && l?.optimisticPlanType ? l.optimisticPlanType : s.planType,
            te = u && l?.optimisticSubscriptionStatus ? l.optimisticSubscriptionStatus : s
            .subscriptionStatus,
            E = r.find(e => e.role === `user`)?.metadata,
            D = { ...[...r].reverse().find(e => e.role === `user`)?.metadata || {}, ...l || {} },
            O = o || {},
            ne = O.source,
            { source: re, ...ie } = O,
            le = A(t),
            ue = typeof E?.source == `string` ? E.source : void 0,
            de = ce(t),
            pe = me(t),
            M = le === k.IMAGE_FUNNEL || ue === k.IMAGE_FUNNEL || pe === k.IMAGE_FUNNEL,
            he = _ && (de || M),
            N = se(t),
            P = le === k.IMAGE_ENHANCER_FUNNEL || ue === k.IMAGE_ENHANCER_FUNNEL || N === k
            .IMAGE_ENHANCER_FUNNEL,
            F = b || P,
            R = ae(t),
            z = le === k.BACKGROUND_REMOVAL_FUNNEL || ue === k.BACKGROUND_REMOVAL_FUNNEL || R === k
            .BACKGROUND_REMOVAL_FUNNEL,
            ge = ne ?? (F ? k.IMAGE_ENHANCER_FUNNEL : he ? k.IMAGE_FUNNEL : y || z ? k
              .BACKGROUND_REMOVAL_FUNNEL : le),
            _e = typeof D?.imageGenerationStyle == `string` ? D.imageGenerationStyle : void 0,
            ve = typeof D?.imageGenerationRatio == `string` ? D.imageGenerationRatio : void 0,
            B = this.options.getImageGenerationModel?.() ?? null,
            V = typeof D?.imageCount == `number` ? D.imageCount : void 0,
            ye = Array.isArray(l?.collectionIds) ? l.collectionIds : void 0,
            H = Array.isArray(l?.fileIds) ? l.fileIds : void 0,
            be = s.isIncognitoMode ? `incognito` : g ? `deepsearch` : h ? `websearch` : ge ?? null; if (
            !u && c?.role === `user`) { let e = Array.isArray(c?.parts) ? c.parts : [],
              n = e.filter(e => e?.type === `text` && typeof e?.text == `string`).reduce((e, t) => e + t
                .text.length, 0),
              r = e.some(e => e?.type === `file` && e?.mediaType?.startsWith(`image/`)),
              i = this.options.getSelectedModel?.() ?? null,
              a = this.options.getIsAutoModelSelected?.() ?? !1,
              o = this.options.getModelSelectionSource?.() ?? `default`;
            j.track(L.USER_CLIENT_MESSAGE_SENT, { chat_id: t, message_id: c?.id || ``,
              current_model: i || ``, is_auto_selected: a, model_selection_source: o,
              message_length: n, has_image: r, user_id: s.userId || ``, is_freemium: s.isFreemium,
              plan_type: T ?? `free`, subscription_status: te ?? null, is_websearch: h, source: be,
              ..._ && { style: _e || void 0, ratio: ve || void 0, image_model: B || void 0,
                requested_image_count: V }, project_id: s.projectId, project_name: s.projectName,
              shared: kt(t), chat_type: s.chatType, team_id: s.teamId ?? null }), I.setItem(
              `session_message_sent`, `true`) } let xe = x ? await (
        async () => { let { MICROSOFT_CONNECTORS_EXPERIMENT_IDS: e } = await i(
            async () => { let { MICROSOFT_CONNECTORS_EXPERIMENT_IDS: e } = await import(
                    `./connector-experiment-id.constant-CilRpUK6.js`
                    ); return { MICROSOFT_CONNECTORS_EXPERIMENT_IDS: e } }, []), t = s
                .microsoftConnectorsVariant === `B` ? [] : e; return Array.from(new Set([...
                await this.options.getDisabledConnectorIds?.() ?? [], ...t, ...s
                .disabledToolkits
              ])) })() : [],
            U = { abortSignal: e, chatId: t, userId: s.userId, email: s.email, userType: s.userType,
              userEmail: s.userEmail, planType: T, subscriptionStatus: te, isFreemium: s.isFreemium,
              isTestUser: s.isTestUser, cfModelsVariant: s.cfModelsVariant, promptScreeningVariant: s
                .promptScreeningVariant, mixpanelUserId: s.mixpanelUserId, deviceId: s.deviceId,
              isMobile: s.isMobile || void 0, isWebSearchMode: h, isDeepResearchMode: g,
              isImageGenerationMode: _, agenticMode: x, clarifyingQuestionsEnabled: x && s
                .isClarifyingQuestionsEnabled ? !0 : void 0, disabledToolkits: xe.length > 0 ? xe :
                void 0, enabledToolkits: x ? s.enabledToolkits : void 0, isIncognito: s
                .isIncognitoMode || void 0, isStandaloneImageMode: ee, needsBlurPreview: S,
              deepResearchProcessor: w, selectedModel: s.selectedModel, retryLastMessage: u || void 0,
              isRetryFlow: d || void 0, expectNewChat: C || void 0, projectId: s.projectId || void 0,
              projectName: s.projectName || void 0, teamId: s.teamId || void 0, userTeamId: s
                .userTeamId || void 0, locale: s.locale, userTimezone: s.userTimezone, userCountry: s
                .userCountry, imageGenerationStyle: _ ? _e : void 0, imageGenerationRatio: _ ? ve :
                void 0, imageGenerationModel: _ && B || void 0, imageGenerationProvider: _ ?
                `openrouter` : void 0, imageCount: _ ? V : void 0, collectionIds: ye?.length ? ye :
                void 0, fileIds: H?.length ? H : void 0, messageId: n, messages: r, trigger: a, ...ie,
              source: be }; return this.manager.getOrCreate(t).sendPreparedRequest({ chatId: t,
            abortSignal: e, request: U, ensureSession: this.options.ensureSession }) } },
  ii = Ee()(e => ({ byChat: {}, setReconnecting: (t, n) => e(e => ({ byChat: { ...e.byChat, [
        t]: { status: `reconnecting`, startedAt: e.byChat[t]?.startedAt ?? Date.now(), nextAttemptAt: n &&
            n >= 1500 ? Date.now() + n : null } } })), setReconnected: t => e(e => { let n = e.byChat[t]; return n ?
      { byChat: { ...e.byChat, [t]: { ...n, status: `reconnected`, reconnectedAt: Date.now() } } } : e }),
    setFailed: t => e(e => ({ byChat: { ...e.byChat, [t]: { status: `failed`, startedAt: e.byChat[t]?.startedAt ??
            Date.now(), nextAttemptAt: null } } })), clear: t => e(e => { if (!e.byChat[t]) return e; let {
        [t]: n, ...r } = e.byChat; return { byChat: r } }) })),
  ai = new Map,
  oi = 2500;

function si(e) { ai.set(e, Date.now() + oi) }

function ci(e) { let t = ai.get(e); return t ? Date.now() > t ? (ai.delete(e), !1) : !0 : !1 }
var $ = null,
  li = 10,
  ui = 500,
  di = 1e4,
  fi = .2,
  pi = 5e3,
  mi = e => { Re() && window.setInterval(() => { let t = q.getState(),
        n = ii.getState().byChat,
        r = new Set([...t.streamingChatIds, ...Object.keys(n)]); for (let i of r) K(`liveness.sample`, { chatId: i,
        storeSaysStreaming: t.streamingChatIds.has(i), transportHasActiveStream: e.hasActiveStream(i),
        connected: e.isConnected(), banner: n[i]?.status ?? null, bannerShownForMs: n[i] ? Date.now() - n[i]
          .startedAt : null, isActiveChat: t.activeChatId === i }) }, pi) },
  hi = e => { if (typeof document > `u`) return; let t = () => { document.visibilityState === `visible` && (K(
        `visibility.recover`, { streamingChatIds: e.getStreamingChatIds() }), e.recoverAfterVisibilityChange()) };
    document.addEventListener(`visibilitychange`, t), window.addEventListener(`pageshow`, t) },
  gi = `Your message was not delivered. Please try again.`,
  _i = `The response was interrupted before completing. Please try again.`;
async function vi(e, t, n, r) { let i = () => { let t = q.getState(); return !t.streamingChatIds.has(e) && (t
        .messagesByChat[e] ?? []).at(-1)?.role === `user` },
    a = () => { i() && q.getState().setStreamError(e, { message: t }) },
    o = async () => !r || q.getState().activeChatId !== e || !i() || Ve(q.getState(), e) || q.getState()
      .streamErrorByChatId[e] || q.getState().researchingChatIds.has(e) || ki(e) > Ei ? !1 : (q.getState()
        .setChatStreamingState(e, !0), jt({ chatId: e, source: `interrupted-turn`, skipLimitGate: !0 }) ? (K(
          `autoResend.dispatched`, { chatId: e }), await ji(e, r.transport, a), !0) : (Oi(e), r.transport
          .hasActiveStream(e) || q.getState().setChatStreamingState(e, !1), !1)); try { let t = {};
    n && (t.teamId = n); let r = await (await p.get(it.API_LIMITS, { searchParams: Object.keys(t).length > 0 ? t :
        void 0 })).json(); if (!r || r.hasCreditsLeft !== !1) { if (await o()) return;
      a(); return } let s = r.scope === `team` || !!n,
      c = !!u(); if (!i()) return;
    q.getState().enqueueRateLimitEvent(e, { messageMetadata: { errorType: c ? `guest_limit` : r.isTrialUser ?
          `trial_limit` : `usage_limit`, errorText: c ? `guest_limit_message` : r.isTrialUser ?
          `usage_limit_trial_message` : `usage_limit_message`, userType: c ? `guest` : `signed-in`, scope: s ?
          `team` : `personal`, limits: r } }) } catch { a() } }
var yi = [1500, 3e3],
  bi = 3,
  xi = new Map,
  Si = e => { let t = q.getState().messagesByChat[e] ?? []; for (let e = t.length - 1; e >= 0; e--)
      if (t[e]?.role === `user`) return t[e].id; return `` },
  Ci = e => { let t = Si(e),
      n = xi.get(e),
      r = (n?.turnId === t ? n.rounds : 0) + 1; return xi.set(e, { turnId: t, rounds: r }), r },
  wi = e => new Promise(t => setTimeout(t, e)),
  Ti = 250,
  Ei = 1,
  Di = new Map,
  Oi = e => { let t = Di.get(e);!t || t.turnId !== Si(e) || Di.set(e, { turnId: t.turnId, rounds: Math.max(0, t.rounds -
        1) }) },
  ki = e => { let t = Si(e),
      n = Di.get(e),
      r = (n?.turnId === t ? n.rounds : 0) + 1; return Di.set(e, { turnId: t, rounds: r }), r },
  Ai = 1e4,
  ji = async (e, t, n) => { let r = () => (t.getStreamingChatIds?.().includes(e) ?? !1) || t.hasActiveStream(e),
      i = () => (q.getState().messagesByChat[e] ?? []).at(-1)?.role !== `user` || t.hasActiveStream(e),
      a = !1,
      o = q.subscribe(t => { t.rateLimitEventQueue[e] !== void 0 && (a = !0) }),
      s = q.getState().limitBannerByChatId[e] !== void 0,
      c = () => { let t = q.getState(); return a || !!t.streamErrorByChatId[e] || !s && t.limitBannerByChatId[e] !==
          void 0 },
      l = () => { r() || q.getState().setChatStreamingState(e, !1) },
      u = 0,
      d = () => q.getState().streamingChatIds.has(e) || r() ? (u = 0, !1) : (u += 1, u >= 2); try { for (let t =
        0; t < Ai; t += Ti) { if (await wi(Ti), i() || c()) { l(); return } if (d()) { K(
          `autoResend.diedEarly`, { chatId: e }), l(), n(); return } } if (K(
        `autoResend.watchdogExpired`, { chatId: e }), r()) return;
      l(), n() } finally { o() } }, Mi = new Set;
async function Ni(e) { let { chatId: t } = e; if (!Mi.has(t)) { Mi.add(t); try { await Pi(e) } finally { Mi.delete(
      t) } } } async function Pi(e) { let { chatId: t, transport: n, teamId: r } = e, i = () => (q.getState()
    .messagesByChat[t] ?? []).at(-1)?.role !== `user` || n.hasActiveStream(t); if (i()) return; if (Ve(q.getState(),
      t)) { xi.delete(t), n.hasActiveStream(t) || q.getState().setChatStreamingState(t, !1); return } if (q
    .getState().streamErrorByChatId[t]) return;
  q.getState().setChatStreamingState(t, !0); let a = () => { n.hasActiveStream(t) || q.getState()
        .setChatStreamingState(t, !1) },
    o = async e => { for (let t = 0; t < e; t += Ti)
        if (await wi(Math.min(Ti, e - t)), i()) return !0; return !1 }; for (let e of yi) { if (await o(e)) { a
    (); return } let r = await n.syncStream(t).catch(() => null); if (!r || r.transportFailure) { a(); return } if (
      r.status === `streaming` || r.status === `paused`) { if (Ci(t) <= bi) { n.resumeStream(t).catch(
      () => {}); return } break } } a(), await vi(t, _i, r, { transport: n }) }

function Fi(e) { let t = q.getState();
  t.setChatStreamingState(e, !1), e !== t.activeChatId && t.markChatUnread(e); let n = ii.getState();
  n.byChat[e]?.status === `reconnecting` && (K(`banner.cleared`, { chatId: e, shownForMs: Date.now() - (n.byChat[e]
      ?.startedAt ?? 0) }), n.clear(e)) }

function Ii() { if (!$) { let e = m(),
      t = q.getState();
    $ = new ri({ agent: `budget-agent`, toolCallCallback: () => {}, store: { appendChunkForChat: t.appendChunkForChat,
        setMessagesForChat: t.setMessagesForChat, resetMessagesForChat: t.resetMessagesForChat,
        enqueueRateLimitEvent: t.enqueueRateLimitEvent, setStreamError: t.setStreamError },
      baseUrl: `${e}/agents/budget-agent`, maxReconnectAttempts: li, reconnectBaseDelay: ui, reconnectMaxDelay: di,
      reconnectJitter: fi }), $.setOnStreamStateChange((e, t) => { let n = q.getState(); if (!t && ci(e)) { let t = $
          ?.getOrCreateConnection(e);
        setTimeout(() => { t && !t.hasActiveStream() && !t.isStreaming() && Fi(e) }, oi); return } if (!t) { Fi(
        e); return } n.setChatStreamingState(e, !0), n.clearStreamError(e) }), mi($), hi($), $.setOnReconnecting((e,
      t, n, r) => { K(`banner.reconnecting`, { chatId: e, attempt: t, maxAttempts: n, delayMs: r }), ii.getState()
        .setReconnecting(e, r) }), $.setOnReconnected(e => { K(`banner.reconnected`, { chatId: e }), ii.getState()
        .setReconnected(e) }), $.setOnReconnectFailed((e, t) => { K(`banner.failed`, { chatId: e, error: t.message }),
        ii.getState().setFailed(e) }), $.setOnStreamFinishedWhileDisconnected(async (e, t) => { try { let n =
          await T(),
          r = await h.get(`chat?id=${e}`, { headers: n }); if (!r.ok) return; let i = await r.json(),
          a = i.messages?.length ? Dt(i.messages) : [],
          o = q.getState(),
          s = o.messagesByChat[e]?.at(-1),
          c = s?.role === `user` && !a.some(e => e.id === s.id); if ((a.length > 0 || c) && o.setMessagesForChat(
            e, c ? [...a, s] : a), c) { await vi(e, gi, t); return }(q.getState().messagesByChat[e] ?? []).at(-1)
          ?.role === `user` && $ && await Ni({ chatId: e, transport: $, teamId: t }) } catch (t) { console.warn(
          `[websocket-transport] failed to fetch messages finished while offline`, { chatId: e, error: t }
          ) } }) } return $ }

function Li() { let { user: e } = lt(), { userProfileWithSubscription: t, session: n } = Te(), { isInTeam: r,
    isLoading: i } = Oe(), a = !e || e.type === `guest`; if (!n.isPending && a) return { isAgenticEnabled: !1,
    isResolved: !0 }; if (n.isPending || t.isPending || i) return { isAgenticEnabled: !1, isResolved: !1 }; let o = t
    .data?.data?.subscription,
    s = o?.isSubscribed === !0,
    c = o?.status,
    l = t.data?.data?.userProfile?.isTestUser === !0; return { isAgenticEnabled: s || c === `past_due` || l || r,
    isResolved: !0 } }

function Ri(e) { let { chatId: t, messages: n, chatExists: r = !1 } = e, i = (0, Q.useRef)(!1), a = !r && n.length > 0;
  (0, Q.useEffect)(() => {!a || i.current || (i.current = !0, Le(Be(), t)) }, [a, t]), (0, Q.useEffect)(() => { i
      .current = !1 }, [t]) }

function zi({ chatId: e, messages: t }) { let n = je(),
    { showToast: r } = Ae(),
    i = b(`Chat`),
    a = (0, Q.useRef)(!1),
    o = q(t => t.streamErrorByChatId[e] ?? null);
  (0, Q.useEffect)(() => { if (a.current || !Wt(o?.errorType)) return;
    a.current = !0; let s = ([...t].reverse().find(e => e.role === `user`)?.parts ?? []).filter(e => e.type ===
      `text` && typeof e.text == `string`).map(e => e.text).join(``);
    q.getState().clearStreamError(e), Je(), q.getState().setActiveChatId(null), q.getState().bumpNewChatModuleNonce(),
      qe(), r({ title: i(`chat_already_started_title`), description: i(`chat_already_started_description`),
        variant: `simple` }); let c = s ? `/?prompt=${encodeURIComponent(s)}&send=true` : `/`;
    n.replace(c), n.refresh() }, [o, e, t, n, r, i]) }

function Bi(e, t) { return e.chatScope === `team` ? e.teamId ?? t ?? null : e.chatScope === `personal` ? null : t ??
    null }

function Vi(e) { let { transport: t, chatId: n, chatIdRef: r, chatExists: i, userId: a, queryClient: o,
    addExpandedProject: s, setCurrentChatId: c, teamId: l } = e, u = (0, Q.useRef)(l ?? null);
  (0, Q.useEffect)(() => { u.current = l ?? null }, [l]); let d = (0, Q.useRef)(!1),
    f = (0, Q.useRef)(!1);
  (0, Q.useEffect)(() => { d.current = !1, f.current = !1 }, [n]), (0, Q.useEffect)(() => { t.setOnChatMetadata(
    e => { let t = e.chatId === r.current,
        n = Bi(e, u.current); if (n) { t && !i && c(e.chatId), o.invalidateQueries({ queryKey: [O
            .TEAM_CHATS_QUERY, n
          ] }); return } let l = o.getQueryData([ke.CHAT_HISTORY_QUERY, a])?.pages?.some(t => t.chats?.some(t => t
        .id === e.chatId)) ?? !1; if (e.projectId || t && !d.current || l) { if (!e.projectId && t && (d
            .current = !0), t && !i && c(e.chatId), e.projectId) { let t = o.getQueryData([x.PROJECTS_QUERY, a])
            ?.projects?.find(t => t.id === e.projectId),
            n = t?.chats?.some(t => t.id === e.chatId) ?? !1,
            r = !n && (t === void 0 || (t.chats?.length ?? 0) === 0);
          o.setQueryData([x.PROJECTS_QUERY, a], t => t?.projects ? { ...t, projects: t.projects.map(t => { if (t
                  .id === e.projectId) { if (t.chats?.some(t => t.id === e.chatId)) return { ...t, chats: t
                      .chats?.map(t => t.id === e.chatId ? { ...t, title: t.isTitlePending ? t.title : e
                          .title, updatedAt: new Date().toISOString() } : t) }; let n = { id: e.chatId,
                    title: e.title, updatedAt: new Date().toISOString() }; return { ...t, chats: [n, ...t
                      .chats || []
                    ] } } return t }) } : t), n || (s(e.projectId), j.track(L
            .USER_PROJECT_CHAT_CREATED, { project_id: e.projectId, project_name: t?.title, chat_id: e.chatId,
              chat_title: e.title }), r && Ze.getState().scheduleReviewModalTrigger(7e3, `first-project-chat`)), o
            .invalidateQueries({ queryKey: [x.PROJECTS_QUERY, a] }) } if (!e.projectId) { let t = { id: e.chatId,
            userId: a || ``, title: e.title, description: null, visibility: `private`, createdAt: e.createdAt ||
              new Date().toISOString(), updatedAt: new Date().toISOString(), deletedAt: null, projectId: null,
            messageCount: 1, lastMessageAt: new Date().toISOString(), chatType: e.chatType ?? null,
            isTitlePending: !1 };
          o.setQueryData([ke.CHAT_HISTORY_QUERY, a], n => { if (!n?.pages || n.pages.length === 0)
            return { pages: [{ chats: [t], hasMore: !1 }], pageParams: [{ offset: 0, limit: 50 }] }; if (n
              .pages.some(t => t.chats?.some(t => t.id === e.chatId))) { let t = null,
                r = n.pages.map(n => ({ ...n, chats: n.chats?.filter(n => n.id !== e.chatId || (t = { ...n,
                      title: n.isTitlePending ? n.title : e.title, updatedAt: new Date()
                    .toISOString() }, !1)) || [] })); return t && r.length > 0 && (r[0] = { ...r[0], chats: [
                  t, ...r[0].chats || []
                ] }), { ...n, pages: r } } let r = [...n.pages]; return r[0] = { ...r[0], chats: [t, ...r[0]
                .chats || []
              ] }, { ...n, pages: r } }) } } }) }, [o, a, s, i, c]) }

function Hi(e) { let { transport: t, userId: n, queryClient: r, addExpandedProject: i, teamId: a } = e, o = (0, Q
    .useRef)(a ?? null);
  (0, Q.useEffect)(() => { o.current = a ?? null }, [a]), (0, Q.useEffect)(() => { t.setOnChatTitleUpdate(e => { q
        .getState().activeChatId === e.chatId && (document.title = `${e.title} | Use AI`); let t = Bi(e, o
        .current); if (t) { r.invalidateQueries({ queryKey: [O.TEAM_CHATS_QUERY, t] }), r
      .invalidateQueries({ queryKey: [O.TEAM_CHAT_QUERY, t, e.chatId] }); return } r.setQueryData([ke
        .CHAT_HISTORY_QUERY, n
      ], t => t?.pages ? { ...t, pages: t.pages.map(t => ({ ...t, chats: t.chats?.map(t => t.id === e.chatId ?
          { ...t, title: e.title, isTitlePending: !1 } : t) || [] })) } : t), r.setQueryData([x.PROJECTS_QUERY,
        n
      ], t => { if (!t?.projects) return t; let n = null; for (let r of t.projects)
          if (r.chats?.some(t => t.id === e.chatId)) { n = r.id; break } return n ? (i(n), { ...t, projects: t
            .projects.map(t => t.id === n ? { ...t, chats: t.chats?.map(t => t.id === e.chatId ? { ...t,
                  title: e.title, updatedAt: new Date().toISOString(), isTitlePending: !1 } : t) || [] } :
              t) }) : t }) }) }, [r, n, t, i]) }

function Ui(e) { let { transport: t, queryClient: n, teamId: r } = e, i = (0, Q.useRef)(r ?? null);
  (0, Q.useEffect)(() => { i.current = r ?? null }, [r]), (0, Q.useEffect)(() => { t.setOnParticipantJoined(e => { let
        t = new Set,
        r = n.getQueriesData({ predicate: t => { let n = t.queryKey; return Array.isArray(n) && n[0] === O
              .TEAM_CHAT_QUERY && n[2] === e.chatId } }); for (let [i, a] of r) { if (!a) continue; let r = i[1];
        typeof r == `string` && t.add(r); let o = a.chat.participants ?? [];
        o.some(t => t.userId === e.userId) || n.setQueryData(i, { ...a, chat: { ...a.chat, participants: [...o,
            { userId: e.userId, joinedAt: e.joinedAt, name: e.name ?? null, email: e.email ?? null,
              imageUrl: e.imageUrl ?? null }] } }) } let a = e.teamId ?? i.current;
      a && t.add(a); for (let e of t) n.invalidateQueries({ queryKey: [O.TEAM_CHATS_QUERY, e] }) }) }, [n, t]) }
var Wi = [`guest_limit_message`, `usage_limit_message`, `usage_limit_daily_message`, `usage_limit_power_plan_message`,
  `usage_limit_trial_message`, `usage_limit_trial_message_1`
];

function Gi(e) { let { chatId: t, userId: n, setUserLimits: r, openPaywallModal: i, isSubscribedRef: a,
    isCancelledRef: o, isScheduledToCancelRef: s, hasPowerPlanRef: c, isSuperProRef: u, isTrialUserRef: d,
    isTestUserRef: f, isAuthenticatedRef: p, teamId: m } = e, { showToast: h } = Ae(), g = b(`Limits`), _ = b(`Errors`),
    v = l(), y = q(e => e.rateLimitEventQueue[t]), x = q(e => e.consumeRateLimitEvent);
  (0, Q.useEffect)(() => { if (!y) return;
    x(t); let e = y; { let l = e.messageMetadata,
        v = l?.limits,
        y = l?.errorType,
        b = Rt(y); if (e.presentation === `toast`) { v && typeof v == `object` && r(v); let e = l?.errorText,
          t; if (e) { let n = e.startsWith(`Limits.`) ? e.replace(`Limits.`, ``) : e; if (n ===
            `usage_limit_daily_message`) { let e = l?.resetTime ? Vt(l.resetTime) : `soon`;
            t = g(`usage_limit_daily_team_chat_message`, { resetTime: e }) } else t = Wi.includes(n) ? g(n ===
            `usage_limit_trial_message` ? `usage_limit_trial_message_1` : n) : e } else t = _(
          `error_message_usage_limit`);
        h({ variant: `error`, description: t, timeout: 1 / 0 }); return } let x = l?.scope === `team` || l?.limits
        ?.scope === `team` || !!m; if (v && typeof v == `object` && r(v), b.isRateLimitError || b
        .isUsageLimitError) { let e = Bt(l, Se({ isSubscribed: a.current, isTrialUser: d.current, hasPowerPlan: c
            .current, isSuperPro: u.current }), p.current);
        q.getState().setLimitBanner(t, e), ye(t, e) } v && typeof v == `object` && r(v), q.getState()
        .setHasRateLimitError(b.isRateLimitError), q.getState().setHasUsageLimitError(b.isUsageLimitError), (b
          .isRateLimitError || b.isUsageLimitError) && q.getState().setRateLimitErrorChatId(t), Gt(y) ? x ||
        setTimeout(() => { let e = a.current === !0 || d.current === !0;
          f.current || e || (M(k.CHAT_PAGE), i({ modalType: Z.SELECT_PLAN_TRIAL })) }, 2e3) : !x && (y ===
          `usage_limit` || y === `trial_limit`) ? (y === `usage_limit` && a.current === !0 && !c.current && !u
          .current && d.current !== !0 && Qe(n), y === `usage_limit` && c.current || setTimeout(() => { if (f.current)
              return; let e = v?.isTrialUser === !0,
              t = d.current === !0;
            s.current || o.current ? (M(k.CHAT_PAGE), i({ modalType: Z.RENEWAL, paywallSource: z
                .REACTIVATE_SUBS })) : y === `trial_limit` || e || t ? (M(k.CHAT_PAGE), i({ modalType: Z
                  .TRIAL_LIMIT, paywallSource: z.TRIAL_LIMIT_REACHED })) : a.current ? (M(k.CHAT_PAGE),
            i({ modalType: Z.POWER_PLAN_UPGRADE, paywallSource: z.SUPERPRO })) : (M(k.CHAT_PAGE), i({ modalType: Z
                  .SELECT_PLAN_TRIAL, paywallSource: z.GUEST_LIMIT })) }, 2e3)) : b.isRateLimitError && (y ===
          `guest_limit` ? (p.current || Yt(t), setTimeout(() => { p.current || (M(k.CHAT_PAGE), Xe.getState()
              .openSignInModal(R.GUEST_LIMIT)) }, 2e3)) : p.current || (M(k.CHAT_PAGE), Xe.getState().openSignInModal(
            R.RATE_LIMIT))) } }, [y, t, n, x, r, i, a, o, s, c, u, d, f, m, h, g, _, v]) }

function Ki(e) { try { if (!e) return `Unknown error`; if (typeof e == `string`) return e; if (e.message && typeof e
      .message == `string`) return e.message; if (typeof e.toString == `function`) { let t = e.toString(); if (t !==
        `[object Object]`) return t } return `Unknown error` } catch { return `Unknown error` } }

function qi(e) { let t = typeof e?.errorType == `string` ? e.errorType : void 0; if (e?.message && typeof e.message ==
    `string`) try { let n = JSON.parse(e.message),
      r = n.messageMetadata,
      i = r?.errorType ?? n.errorType ?? t; return { message: n.message || n.error || e.message, code: n.code,
      messageMetadata: r ? { errorType: i, errorText: r.errorText, resetTime: r.resetTime, limits: r.limits, scope: r
          .scope } : i ? { errorType: i, errorText: n.error || n.message } : void 0 } } catch {}
  return { message: Ki(e), messageMetadata: t ? { errorType: t, errorText: Ki(e) } : void 0 } }

function Ji(e, t) { let n = qi(e); return Error(n.message || t) }

function Yi(e) { let t = We(e); return new Set(t ? t.streamMessageIds.values() : []) }

function Xi(e) { let { parts: t, mutated: n } = Ie(e.parts, Ue); return n ? { ...e, parts: t } : e }

function Zi(e, t, n) { let r = new Set(t.map(e => e.id)),
    i = new Set(n);
  t = t.map(e => n.has(e.id) ? e : Xi(e)); let a = -1; for (let t = e.length - 1; t >= 0; --t)
    if (r.has(e[t].id)) { a = t; break } for (let t = a + 1; t < e.length; t += 1) { let n = e[t];
    n.role === `user` && !r.has(n.id) && i.add(n.id) } let o = e.filter(e => !r.has(e.id) && i.has(e.id)); return [...t,
    ...o
  ] }

function Qi(e) { let { chatId: t, transport: n, queryClient: r } = e, i = (0, Q.useRef)({ chatId: t, queryClient: r });
  (0, Q.useEffect)(() => { i.current = { chatId: t, queryClient: r } }), (0, Q.useEffect)(() => n.getOrCreateConnection(
    t).onHistoryRecovery(e => { e.chatId === i.current.chatId && i.current.queryClient.fetchQuery({ ...vt(i.current
        .chatId), staleTime: 0 }).then(t => { if (!t?.messages?.length && e.storeLength > 0) { console.warn(
          `[useChatHistoryRecovery] empty refetch with non-empty store — treating as failed, no-op`, { chatId: i
              .current.chatId, storeLength: e.storeLength }); return } let n = t?.messages?.length ? Dt(t
          .messages) : [],
        r = Yi(i.current.chatId);
      q.getState().setMessagesForChat(i.current.chatId, e => Zi(e, n, r)) }).catch(e => { console.warn(
        `[useChatHistoryRecovery] history refetch failed`, { chatId: i.current.chatId, error: e }) }) }), [t, n]) }

function $i(e) { let { chatId: t, chatIdRef: n, messagesRef: r, isSubscribedRef: i, isCancelledRef: a,
    isScheduledToCancelRef: o, hasPowerPlanRef: s, isSuperProRef: c, isTrialUserRef: l, isTestUserRef: u,
    isAuthenticatedRef: d, userId: f, isSubscribed: p, queryClient: m, setUserLimits: h, openPaywallModal: g,
    stopTracking: _, getCurrentWaitTime: v, teamId: y } = e, b = (0, Q.useRef)(null); return { onError: (0, Q
      .useCallback)(async e => { let x = b.current; if (!x) { console.error(
          `[ChatErrorHandler] setMessages ref not yet bound`); return } if (_(), Pt(e)) return; let
      ee = { isDeepResearchTaskInProgress: q.getState().isDeepResearchTaskInProgress,
        currentResearchMessageId: q.getState().currentResearchMessageId, deepResearchUpdatesCount: q.getState()
          .deepResearchUpdates.length, isDeepResearchMode: q.getState().isDeepResearchMode };
      q.getState().setIsDeepResearchTaskInProgress(!1), ee.isDeepResearchTaskInProgress && j.track(L
        .DEEP_RESEARCH_FAILED, { source: y ? `team_chat_page` : q.getState().deepResearchSource, team_id: y ??
            null }); let S = qi(e);
      C(e, `render`); let w = S.messageMetadata,
        T = w?.limits,
        te = w?.scope === `team` || w?.limits?.scope === `team` || !!y;
      T && typeof T == `object` && h(T); let E = w?.errorType,
        D = Rt(E); if (!(D.isLimitError || D.isClientError)) try { let e = (await m.fetchQuery({ ...vt(n.current),
            staleTime: 0 }))?.messages ?? [],
          t = e.at(-1),
          i = r.current.at(-1); if (e.length > 0 && t?.role === `assistant` && (!i || t.id !== i.id || e
            .length > r.current.length)) { window.dispatchEvent(new CustomEvent(
          `refreshChatMessages`, { detail: { chatId: n.current, messages: e } })); return } } catch (e) { C(e,
          `render`) }
      if (E) { if (D.isRateLimitError || D.isUsageLimitError) { let e = Bt(w, Se({ isSubscribed: i.current,
              isTrialUser: l.current, hasPowerPlan: s.current, isSuperPro: c.current }), d.current),
            n = Yi(t);
          x(e => { let t = e.filter((t, r) => r !== e.length - 1 || t.role !== `assistant` || n.has(t.id) ? !0 : t
                .parts.length > 0); return t.length === e.length ? e : t }), q.getState().setLimitBanner(t, e),
            ye(t, e) } q.getState().setHasRateLimitError(D.isRateLimitError), q.getState().setHasUsageLimitError(D
            .isUsageLimitError), (D.isRateLimitError || D.isUsageLimitError) && q.getState()
          .setRateLimitErrorChatId(t), Gt(E) ? te || setTimeout(() => { let e = i.current === !0 || l.current ===
              !0;
            u.current || e || g({ modalType: Z.SELECT_PLAN_TRIAL }) }, 2e3) : !te && (E === `usage_limit` || E ===
            `trial_limit`) ? (E === `usage_limit` && i.current === !0 && !s.current && !c.current && l.current !==
            !0 && Qe(f), E === `usage_limit` && s.current || setTimeout(() => { if (u.current) return; let e = T
                ?.isTrialUser === !0,
                t = l.current === !0;
              o.current || a.current ? g({ modalType: Z.RENEWAL }) : E === `trial_limit` || e || t ?
            g({ modalType: Z.TRIAL_LIMIT }) : i.current ? g({ modalType: Z.POWER_PLAN_UPGRADE }) :
            g({ modalType: Z.SELECT_PLAN_TRIAL }) }, 2e3)) : E === `rate_limit` && Xe.getState().openSignInModal(R
            .RATE_LIMIT) } if (m.invalidateQueries({ queryKey: [ke.CHAT_HISTORY_QUERY] }), !D.isLimitError) { let
          n = r.current,
          i = n.at(-1),
          a = Ki(e),
          o = q.getState(),
          s = (i ? wt(i) : !1) || o.isDeepResearchTaskInProgress || o.isDeepResearchMode,
          c = Et(n),
          l = v(),
          u = !!me(t),
          d = u && o.imageLandingStyle || void 0,
          m = u && o.imageLandingAspect || void 0,
          h = ut(),
          g = null;
        h ? g = `incognito` : o.isDeepResearchTaskInProgress || o.isDeepResearchMode ? g = `deepsearch` : s && (
          g = `websearch`), j.track(L.USER_CLIENT_MESSAGE_FAILED, { chat_id: t, message_id: i?.id || ``,
          current_model: o.selectedModel, summary_estimate_cost: 0, message_length: 0,
          text_message_cost_estimate: 0, text_message_cost_actual: 0, has_image: !1, current_spend: 0,
          current_spend_group: `Green`, user_id: f || ``, error_code: S.code || ``, error_message: a,
          is_freemium: !p, free_message_number: 0, image_generation: !1, is_websearch: s, source: g, ...u &&
          { style: d, ratio: m }, web_sources_count: c.webSourcesCount, actual_wait_time_ms: l,
          search_count: c.searchCount, project_id: X.getState().currentProjectId, project_name: Me.getState()
            .currentProject.name || null, shared: kt(t), team_id: y ?? null }) } D.isLimitError || D
        .isClientError || C(e, `render`), D.isRateLimitError && (E === `guest_limit` ? (Yt(t), Xe.getState()
          .openSignUpModal(R.GUEST_LIMIT)) : Xe.getState().openSignInModal(R.RATE_LIMIT)) }, [t, f, p, m, h, g, _,
      v, y
    ]), setMessagesRef: b } }
var ea = [];

function ta(e) { let { chatId: t, onError: n, onFinish: r } = e, i = q.getState(), a = i.streamErrorByChatId[t], o = i
    .messagesByChat[t] ?? [], s = o[o.length - 1]; if (a) { let e = Error(a.message);
    a.errorType && (e.errorType = a.errorType), n?.(e); return } if (s?.role === `assistant`) { r?.({ message: s,
      messages: o }); return } r?.({ message: { id: Tn(), role: `assistant`, parts: [] }, messages: o }) }

function na(e) { let { chatId: t, transport: n, onError: r, onFinish: i } = e, a = q(e => e.messagesByChat[t] ?? ea),
    o = q(e => e.streamingChatIds.has(t)) ? `streaming` : `ready`, [s, c] = (0, Q.useState)(!1), [l, u] = (0, Q
      .useState)(t);
  t !== l && (u(t), c(!1)); let d = (0, Q.useCallback)(e => { q.getState().setMessagesForChat(t, e) }, [t]),
    f = (0, Q.useCallback)(async ({ text: e, files: a, metadata: o }) => { let s = { id: Tn(), role: `user`, parts: [...
              a?.map(e => ({ type: `file`, mediaType: e.mediaType, url: e.url, filename: e.filename })) ?? [],
              { type: `text`, text: e }
            ], metadata: { ...o ?? {}, createdAt: new Date().toISOString() } },
          l = q.getState();
        l.clearStreamError(t), l.clearLimitBanner(t), we(t), c(!0), l.setMessagesForChat(t, e => [...e, s]); let u = q
          .getState().messagesByChat[t] ?? []; try { await n.sendMessages({ chatId: t, messages: u, messageId: void 0,
            trigger: `submit-message` }), ta({ chatId: t, onError: r, onFinish: i }) } catch (e) { throw r?.(e),
          e } }, [t, n, r, i]),
    p = (0, Q.useCallback)(async e => { let a = q.getState(),
        o = a.messagesByChat[t] ?? [],
        s; if (e?.messageId) { let t = o.findIndex(t => t.id === e.messageId);
        s = t === -1 ? o : o.slice(0, t) } else s = o[o.length - 1]?.role === `assistant` ? o.slice(0, -1) : o;
      s !== o && a.setMessagesForChat(t, s), a.clearStreamError(t), a.clearLimitBanner(t), we(t); try { await n
          .sendMessages({ chatId: t, messages: s, messageId: e?.messageId, trigger: `regenerate-message` }),
        ta({ chatId: t, onError: r, onFinish: i }) } catch (e) { throw r?.(e), e } }, [t, n, r, i]),
    m = (0, Q.useCallback)(async () => { await n.abortStream(t) }, [t, n]),
    h = (0, Q.useCallback)(async () => { await n.reconnectToStream({ chatId: t }) }, [t, n]); return (0, Q.useMemo)(
  () => ({ messages: a, status: o, setMessages: d, sendMessage: f, regenerate: p, stop: m, resumeStream: h,
      hasSentLocally: s }), [a, o, d, f, p, m, h, s]) }
var ra = [];

function ia(e) { return q(dt(t => t.messagesByChat[e]?.map(e => e.id) ?? ra)) }

function aa(e, t) { return q(n => n.messagesByChat[e]?.find(e => e.id === t)) }

function oa(e) { return q(t => t.messagesByChat[e]?.at(-1)) }

function sa(e) { return q(t => t.streamingChatIds.has(e) ? `streaming` : `ready`) }

function ca(e) { return q(t => t.messagesByChat[e]?.find(e => e.role === `assistant`)?.id) }

function la(e) { let { chatId: t, autoResume: n, transport: r, queryClient: i, resumeStream: a,
    processResearchSyncResponse: o } = e, [s, c] = (0, Q.useState)(!1), l = (0, Q.useRef)(!1), [u, d] = (0, Q.useState)(
    t); return t !== u && (d(t), c(!1)), !n && !s && c(!0), (0, Q.useEffect)(() => { l.current = !1 }, [t]), (0, Q
    .useEffect)(() => { if (!n || l.current) return;
    l.current = !0, q.getState().streamingChatIds.has(t) && si(t); let e = r.getOrCreateConnection(t),
      s = !1,
      u = !!q.getState().inFlightUserTurns[t]?.length && !Ve(q.getState(), t) && !It(q.getState(), t, Ht(B(t))),
      d = e.onSyncResponse(n => { let { hasActiveResearch: a, isPendingDeepResearch: c } = o(n); if (n.status ===
          `completed` || n.status === `not-found` || n.status === `error`) { let o = !n.transportFailure; if (o &&
            !e.hasActiveStream()) { let n = q.getState().streamingChatIds.has(t) && !s;
            ci(t) || n ? (si(t), setTimeout(() => {!e.hasActiveStream() && !e.isStreaming() && q.getState()
                .setChatStreamingState(t, !1) }, oi)) : q.getState().setChatStreamingState(t, !1) } i.fetchQuery({
            ...vt(t), staleTime: 0 }).then(e => { if (e?.messages?.length) { let n = Dt(e.messages);
              q.getState().setMessagesForChat(t, e => Zi(e, n, Yi(t))) } }).catch(() => {}), u && o && !a &&
        Ni({ chatId: t, transport: r }) } if (oe(t) && (n.pendingToolCalls?.some(e => e.toolName ===
            `image-google`) || (n.imageParts?.length ?? 0) > 0)) { let e = ue();
          e && M(e) } a && q.getState().setIsDeepResearchTaskInProgress(!0), c && q.getState()
          .setCurrentResearchMessageId(`sync-${t}`) });
    r.ensureConnected(t); let f = !!q.getState().streamErrorByChatId[t];
    u && !f && (s = !0, q.getState().setChatStreamingState(t, !0)); try { a() } catch (e) { console.error(
        `[useChatInitialSync] resumeStream failed:`, e) } let p = setTimeout(() => c(!0),
0); return () => { clearTimeout(p), d() } }, [t, n, r, i, a, o]), { hasSyncCompleted: s } }

function ua(e) { let { chatId: t, initialChatModel: n } = e, r = q.getState().setSelectedModel, i = q.getState()
    .setModelHydrated;
  (0, Q.useState)(() => { let e = q.getState(); if (e.isModelHydrated || e.selectedModel) return null; let r = (e
      .pendingNewChatId === t ? void 0 : e.selectedModelByChat[t]) ?? n; return r && q.setState({ selectedModel: r,
      initialModel: n }), null }); let a = ct(),
    { autoModelSlug: o } = ot(),
    { staleCohortModelHeal: s } = Qt(),
    c = o,
    l = gt();
  (0, Q.useEffect)(() => { l === `auto-unlocked` && (document.cookie =
      `bing_auto_model_target=${n}; path=/; max-age=2592000`) }, [l, n]); let u = X(e => e.setChatDisabled),
    { mutateAsync: d } = _t(),
    { isFunnelRestricted: f } = at(),
    p = (0, Q.useRef)(!1);
  (0, Q.useEffect)(() => { p.current = !1 }, [t]), (0, Q.useEffect)(() => { if (!p.current) { let e = q.getState()
        .pendingNewChatId === t,
        s = q.getState().selectedModelByChat[t],
        m = e ? void 0 : s,
        h = q.getState().selectedModel,
        g = e && h && h === mt() ? h : void 0,
        _ = m ?? g ?? n; if (e && s !== void 0) { let {
          [t]: e, ...n } = q.getState().selectedModelByChat;
        q.setState({ selectedModelByChat: n }) } { let e = f ? void 0 : ft();
        e && l !== `auto-locked` && l !== `auto-unlocked` ? localStorage.setItem(`chat-model`, n) : e && ht(); let
          t = !!document.cookie.match(/bing_auto_model_target=([^;]+)/),
          r = localStorage.getItem(`pending-chat-model`); if (r && (t || f)) localStorage.removeItem(
          `pending-chat-model`);
        else if (r && a.some(e => e.id === r)) _ = r, localStorage.setItem(`chat-model`, _), pt(_), localStorage
          .removeItem(`pending-chat-model`), d({ model: _ }).catch(() => {}), q.getState().setModelManuallySelected(!
            0);
        else if (!m && _ === c && !ft() && !f) { let e = localStorage.getItem(`chat-model`);
          e && a.some(t => t.id === e) && (_ = e) } } _ === `auto` && (_ = o), r(_), m && (localStorage.setItem(
        `chat-model`, m), pt(m)), i(!0), u(!1), p.current = !0 } }, [t, n, c, l, a, u, d, i, r]), (0, Q.useEffect)(
() => { s && (r(s), q.getState().setModelManuallySelected(!1), d({ model: s }).catch(() => {})) }, [d, r, s]) }
var da = `response_notifications_opt_in`,
  fa = () => `Notification` in window,
  pa = `use-ai-tab-visibility`,
  ma = 2e3,
  ha = 4e3,
  ga = new Map;
if (`BroadcastChannel` in window) { let e = `randomUUID` in crypto ? crypto.randomUUID() :
    `tab-${Math.random().toString(36).slice(2)}-${Date.now()}`,
    t = new BroadcastChannel(pa);
  t.addEventListener(`message`, e => { let t = e.data;
    t?.type === `visible-ping` && typeof t.tabId == `string` && ga.set(t.tabId, Date.now()) }); let n = () => { document
      .visibilityState === `visible` && t.postMessage({ type: `visible-ping`, tabId: e }) };
  n(), setInterval(n, ma) }
var _a = () => { let e = Date.now(); for (let t of ga.values())
      if (e - t < ha) return !0; return !1 },
  va = () => N.getItem(da) === `1`,
  ya = e => { e ? N.setItem(da, `1`) : N.removeItem(da) };

function ba(e) { return !(!e.isSupported || !e.isTabHidden || e.isAnyOtherTabVisible || !e.isOptedIn || e.permission !==
    `granted`) }

function xa({ chatId: e, chatUrl: t, mode: n, title: r, body: i }) { if (ba({ isSupported: fa(),
      isTabHidden: typeof document < `u` && document.visibilityState === `hidden`, isAnyOtherTabVisible: _a(),
      isOptedIn: va(), permission: typeof Notification < `u` ? Notification.permission : `default` })) try { let a =
      new Notification(r, { body: i, tag: `response-ready-${e}`, icon: `/favicon.ico` });
    j.track(L.NOTIFICATION_SENT, { chat_id: e, mode: n }), a.onclick = () => { j.track(L
      .NOTIFICATION_CLICKED, { chat_id: e, mode: n }), window.focus(), window.location.href !== t && (window
        .location.href = t), a.close() } } catch {} }
var Sa = () => () => {},
  Ca = () => `default`,
  wa = () => fa() ? Notification.permission : `unsupported`,
  Ta = () => !1,
  Ea = () => fa() && va();

function Da({ chatId: e, isConnectorToolInFlight: t }) { let n = q(e => e.isDeepResearchTaskInProgress) ?
    `deep_research` : t ? `connector` : null,
    [r, i] = (0, Q.useState)(!1),
    [a, o] = (0, Q.useState)(!1),
    s = (0, Q.useSyncExternalStore)(Sa, wa, Ca),
    c = (0, Q.useSyncExternalStore)(Sa, Ea, Ta),
    [l, u] = (0, Q.useState)(null),
    [d, f] = (0, Q.useState)(!1),
    p = l ?? s,
    m = d || c,
    h = (0, Q.useCallback)(async () => { if (fa()) { if (Notification.permission === `denied`) { o(!
          0); return } try { let t = await Notification.requestPermission();
          u(t), t === `granted` ? (ya(!0), f(!0), n && j.track(L.NOTIFICATION_PERMISSION_GRANTED, { chat_id: e,
            mode: n })) : (t === `denied` && o(!0), n && j.track(L.NOTIFICATION_PERMISSION_DENIED, { chat_id: e,
            mode: n })) } catch {} } }, [e, n]),
    g = (0, Q.useCallback)(() => { i(!0), n && j.track(L.NOTIFICATION_BANNER_CLOSED, { chat_id: e, mode: n }) }, [e,
    n]),
    _ = (0, Q.useCallback)(() => o(!1), []),
    v = n !== null && p === "default" && !m && !r,
    y = (0, Q.useRef)(!1); return (0, Q.useEffect)(() => { v && !y.current && n && j.track(L
    .NOTIFICATION_BANNER_VIEWED, { chat_id: e, mode: n }), y.current = v }, [v, e, n]), { mode: n,
    shouldShowPrompt: v, requestPermission: h, dismiss: g, isPermissionDeniedModalOpen: a,
    closePermissionDeniedModal: _ } }

function Oa(e) { let { chatId: t, initialMessages: n, userId: r, messagesRef: i, queryClient: a, stopTracking: o,
    teamId: s } = e, c = (0, Q.useRef)(null); return { onFinish: (0, Q.useCallback)(({ message: e }) => { o(); let l = n
        .at(-1),
        u = n.length === 0 || l?.id !== e.id,
        d = yt(e),
        f = wt(e),
        p = Tt(e),
        m = xt(e);
      u && m && c.current?.(e), u && e.parts.length > 0 && r && setTimeout(() => { X.getState()
          .incrementSuccessfulResponseCount() }, 500); let h = u && e.parts.length > 0; if (h) { let n = p ?
          `deep_research` : Ct(e) ? `connector` : null;
        n && xa({ chatId: t, chatUrl: `${window.location.origin}${window.location.pathname}#message-${e.id}`,
          mode: n, title: `Use AI`, body: `Your response is ready — click to return to your chat` }); let r = ut(),
          i = me(t) || A(t),
          a = null;
        a = r ? `incognito` : p ? `deepsearch` : f ? `websearch` : i, j.track(L.LLM_RESPONSE_VIEWED, { chat_id: t,
          message_id: e?.id, image_generation: d, is_websearch: f, source: a, search_type: p ? `deepsearch` :
            f ? `websearch` : null, team_id: s ?? null }); try { typeof localStorage < `u` && localStorage.setItem(
            `shareCloneNotificationSeen_${t}`, `1`), typeof sessionStorage < `u` && sessionStorage.removeItem(
            `shareCloneNotification_${t}`) } catch {} } i.current.length <= 2 && setTimeout(() => { a
            .invalidateQueries({ queryKey: [ke.CHAT_HISTORY_QUERY] }), a.invalidateQueries({ queryKey: [x
                .PROJECTS_QUERY
              ] }) }, 2e3), a.invalidateQueries({ queryKey: [ke.CHAT_MESSAGES_QUERY, t] }), h && a
        .invalidateQueries({ queryKey: [rt.LIMITS_QUERY] }) }, [t, n, r, i, a, o]), onData: (0, Q.useCallback)(e => { q
        .getState().appendStreamDataPart(e) }, []), deepsearchHandleOnFinishResearchRef: c } }
var ka = 3e4,
  Aa = 500,
  ja = 2;

function Ma({ chatId: e, transport: t, enabled: n, chatExists: r }) { let i = q(t => t.focusedComposerChatId === e),
    a = X(e => e.currentProjectId),
    o = (0, Q.useRef)(null),
    s = (0, Q.useRef)(!1),
    c = (0, Q.useRef)(!1),
    l = (0, Q.useRef)(!1),
    u = (0, Q.useRef)(0),
    d = (0, Q.useRef)(ka),
    f = (0, Q.useRef)(null),
    p = (0, Q.useRef)(n),
    m = (0, Q.useRef)(null),
    h = (0, Q.useRef)(null),
    g = (0, Q.useRef)(null),
    _ = (0, Q.useRef)(() => {});
  (0, Q.useEffect)(() => { p.current = n }, [n]), (0, Q.useEffect)(() => { o.current = null, s.current = !1, c
      .current = !1, l.current = !1, u.current = 0, f.current = null, d.current = ka, m.current && clearTimeout(m
        .current), h.current && clearTimeout(h.current), g.current && clearTimeout(g.current) }, [e]); let v = (0, Q
    .useCallback)(() => { h.current && clearTimeout(h.current), h.current = setTimeout(() => { q.getState()
        .focusedComposerChatId === e && (u.current >= ja || (u.current += 1, _.current())) }, d.current) }, [e]);
  (0, Q.useEffect)(() => { if (n) return t.onPrewarmStatus(e, e => { if (e.requestId !== f.current) return; let t =
        Number(e.ttlMs);
      d.current = Number.isFinite(t) && t > 0 ? t : ka, v() }) }, [t, e, n, v]); let y = (0, Q.useCallback)(() => { if (
      !p.current) return; let n = Ke();
    f.current = n, t.prewarm(e, { requestId: n }), v() }, [t, e, v]);
  (0, Q.useEffect)(() => { _.current = y }, [y]); let b = (0, Q.useCallback)(() => { u.current = 0, m.current &&
      clearTimeout(m.current), m.current = setTimeout(y, Aa) }, [y]);
  (0, Q.useEffect)(() => { if (n) { if (!s.current) { r ? (s.current = !0, o.current = a) : (g.current && clearTimeout(g
          .current), g.current = setTimeout(() => { s.current = !0, o.current = X.getState().currentProjectId,
          y() }, 0)); return } a !== o.current && (o.current = a, b()) } }, [n, r, a, b, y]), (0, Q.useEffect)(
() => { let e = n && i; if (!l.current) { l.current = !0, c.current = e; return } e && !c.current && b(), c.current =
      e }, [n, i, b]), (0, Q.useEffect)(() => () => { m.current && clearTimeout(m.current), h.current && clearTimeout(h
      .current), g.current && clearTimeout(g.current) }, []) }
var Na = () => { let e = (0, Q.useRef)(null); return { textareaRef: e, focusTextarea: (0, Q.useCallback)(() => { e
        .current?.focus() }, []) } };

function Pa(e) { return q.getState().messagesByChat[e] ?? [] }

function Fa(e) { let { chatId: t, setMessages: n, reload: r, isSubscribed: i, hasCreditsLeft: a } = e, o = (0, Q.useRef)
    (!1), s = (0, Q.useCallback)(() => { q.getState().clearLimitBanner(t), we(t) }, [t]);
  (0, Q.useEffect)(() => { if (!i || !a) return; let e = q.getState().limitBannerByChatId[t];
    Ut(e) || s() }, [i, a, s, t]); let c = (0, Q.useCallback)(async (e, i) => { if (!o.current) { o.current = !
      0; try { e || await new Promise(e => setTimeout(e, 500)); let a = Pa(t); if (a.length > 0) { let e = a[a
              .length - 1],
            n = i?.source === void 0 || i.source === `error-card`,
            r = q.getState().limitBannerByChatId[t] !== void 0,
            o = H(e, r, n); if (!i?.force && e?.role === `assistant` && !o) { q.getState().setHasRateLimitError(!
              1), q.getState().setHasUsageLimitError(!1), q.getState().setRateLimitErrorChatId(null); return } } q
          .getState().setHasRateLimitError(!1), q.getState().setHasUsageLimitError(!1), q.getState()
          .setRateLimitErrorChatId(null); let o = !1,
          c = !1,
          l, u = `lastRequest:${t}`,
          d = N.getItem(u); if (d) try { let e = JSON.parse(d);
            o = e.isWebSearchMode, c = e.isDeepResearchMode, l = e.deepResearchProcessor, e.projectId && X
              .getState().setCurrentProjectId(e.projectId) } catch {} s(), i?.source !== `interrupted-turn` && N
          .removeItem(u); let f = { retryLastMessage: !0, isRetryFlow: !0, isWebSearchMode: o,
          isDeepResearchMode: c, deepResearchProcessor: l, ...e && { optimisticPlanType: e.planType,
            optimisticSubscriptionStatus: e.subscriptionStatus } };
        n(e => { let t = !1,
            n = e.map((n, r) => { if (n.role === `user` && !e.slice(r + 1).some(e => e.role === `user`)) { let
                  e = { ...n, metadata: { ...n.metadata, ...f } }; return t = !0, e } return n }); return t ?
            n : e }), await r() } catch {} finally { o.current = !1, Mt(t) } } }, [t, s, n, r]); return (0, Q.useEffect)
    (() => { let e = e => { e.detail?.chatId === t && c(e.detail?.optimisticSubscription, { force: e.detail?.force,
          source: e.detail?.source }) }; return window.addEventListener(`retryLastMessage`, e), () => { window
          .removeEventListener(`retryLastMessage`, e) } }, [t, c]), (0, Q.useEffect)(() => { let e = e => { if (e.detail
          ?.chatId !== t) return; let r = Array.isArray(e.detail?.messages) ? e.detail.messages : [],
          i = Dt(r);
        n(e => Zi(e, i, Yi(t))), s() }; return window.addEventListener(`refreshChatMessages`, e), () => window
        .removeEventListener(`refreshChatMessages`, e) }, [t, n, s]), { retryLastMessage: c,
    removeRateLimitMessages: s } }

function Ia(e) { let { chatId: t, messagesLength: n, enabled: r = !0 } = e, i = q(e => e._hasHydrated), a = (0, Q
    .useRef)(!1);
  (0, Q.useEffect)(() => { a.current = !1 }, [t]), (0, Q.useEffect)(() => { r && i && (a.current || n === 0 && (a
      .current = !0, q.getState().resetChatState())) }, [n, i, t]) }
var La = 6e3;

function Ra(e) { let { chatId: t, transport: n, setMessages: r, stopTracking: i } = e; return { handleStop: (0, Q
      .useCallback)(() => { let e = q.getState(); if (e.stoppingChatIds.has(t)) return;
      e.setChatStopping(t, !0); let a = (e.messagesByChat[t] ?? []).findLast(e => e.role === `user`)?.id; if (a && e
        .markTurnStoppedByUser(t, a), setTimeout(() => { q.getState().setChatStopping(t, !1) }, La), i(), n
        .abortStream(t).catch(e => { console.error(`[ChatService] Failed to send abort to server:`, e) }), e
        .researchingChatIds.has(t) && e.isDeepResearchTaskInProgress) { q.getState()
          .setIsDeepResearchTaskInProgress(!1), q.getState().setChatResearching(t, !1); let e = { type: `cancelled`,
          timestamp: Date.now() };
        q.getState().appendResearchUpdate(e), r(t => { let n = t[t.length - 1]; return !n || n.role !==
            `assistant` ? t : t.map((n, r) => r === t.length - 1 ? { ...n, parts: [...n.parts || [],
              { type: `data-researchUpdate`, data: e }] } : n) }) } }, [r, i, n, t]) } }
var za = e => { let t = e.trim(); if (!t) return `New conversation`; let n = t.slice(0, 50); return n.length < t
    .length ? `${n}...` : n };

function Ba(e) { let { experiment: t } = st(), { chatId: i, chatIdRef: a, chatExists: s, userId: c, userName: l,
      userImage: u, isSubscribed: d, input: f, sendMessage: p, transport: m, queryClient: h, startTracking: g,
      hasTrackedProjectChatCreationRef: _, hasSyncCompleted: v, teamId: y, isCurrentlyAuthenticated: ee,
      isSessionPending: S, isFunnelLandingSurface: C = !1, isServerAuthed: w = !1 } = e, T = b(`ImageLanding`), te = b(
      `Chat`), { showToast: E } = Ae(), D = Xe(e => e.isAuthModalOpen), O = Xe(e => e.isPostAuthTransition), ae = r(),
    se = q(e => e.uploadQueue.length), A = o(), P = n(), F = A?.get(`query`), R = A?.get(`prompt`), z = !!R && A?.get(
      `send`) === `true`, ge = A?.get(`image-landing`) === `true` || (P ?? ``).endsWith(`/images`), _e = A?.get(
      `background-removal`) === `true` || (P ?? ``).endsWith(`/background-removal`), ve = A?.get(`image-enhancer`) ===
    `true` || (P ?? ``).endsWith(`/image-enhancer`), B = ge || _e || ve, V = sn({ isFunnelLandingSurface: C,
      isOnFunnelLandingRoute: B }), ye = (0, Q.useRef)(new Set), H = (0, Q.useCallback)(async (e, n) => { e
        ?.preventDefault && e.preventDefault(); let r = q.getState().isWebSearchMode;
      r && q.getState().isWebSearchSidebarOpen && q.getState().setWebSearchSidebarOpen(!1); let o = q.getState()
        .uploadQueue.filter(e => { if (e.isUploading || !e.url) return !1; try { return new URL(e.url), !
            0 } catch { return !1 } }).map(e => ({ type: `file`, filename: e.filename, mediaType: e.mediaType,
          url: e.url, ...e.isPastedText && { isPastedText: !0 } })),
        v = n?.text ?? f,
        b = q.getState().filesAttached.length > 0 || q.getState().collectionsAttached.length > 0; if (!v.trim() && o
        .length === 0 && !b) return; let ee = m.getStreamingChatIds(); if (ee.length >= 3 && !ee.includes(i)) { E
      ({ description: te(`too_many_streams_toast`), variant: `error` }); return } let S = ut();
      S && X.getState().setHasIncognitoChatStarted(!0), g(i, c || `anonymous`, !d, y ?? null); let C = q.getState()
        .isImageGenerationMode || ce(i),
        w, D = oe(i),
        O = fe(i); if (C) { let e = q.getState().imageLandingAspect || `1:1`,
          t = n?.source,
          r = he(),
          a = me(i) || (t === k.IMAGE_FUNNEL ? k.IMAGE_FUNNEL : void 0);
        w = a, a && M(a, { style: r?.metadata?.style, ratio: e }) } let ne = D ? ue() : void 0,
        re = O ? le() : void 0,
        ie = w ?? n?.source ?? ne ?? re,
        ae = n?.mode ?? (D ? `background_removal` : void 0) ?? (O ? `image_enhancer` : void 0),
        se = ce(i),
        A = C && se ? q.getState().imageVariationsCount : 1,
        de = O ? T(`enhancer_prompt_prefix`) : v.trim(),
        pe = C && se ? q.getState().imageLandingStyle || `none` : void 0,
        P = C && se ? q.getState().imageLandingAspect || `1:1` : void 0,
        F = C && se && q.getState().imageGenerationModel || void 0,
        I = C && se ? A : void 0;
      F && q.getState().rememberChatImageModel(i, F); let R = q.getState().isDeepResearchMode,
        z = q.getState().isAgenticMode,
        ge = q.getState().collectionsAttached,
        _e = q.getState().filesAttached,
        ve = ge.map(e => e.id),
        B = _e.map(e => e.id),
        V = Object.fromEntries([...ge.map(e => [e.id, e.title]), ..._e.map(e => [e.id, e.fileName])]);
      q.getState().setCurrentInput(``), q.getState().setUploadQueue([]), q.getState().setFilesAttached([]), q
        .getState().clearCurrentChatDraft(), q.getState().clearStreamDataParts(), R && q.getState()
        .clearResearchUpdates(); let H = a.current,
        be = q.getState().deepResearchProcessor,
        xe = { isWebSearchMode: r, isDeepResearchMode: R, isAgenticMode: z, isImageGenerationMode: C,
          deepResearchProcessor: be, projectId: X.getState().currentProjectId, timestamp: Date.now(), source: ie,
          mode: ae };
      N.setItem(`lastRequest:${H}`, JSON.stringify(xe)); let U = X.getState().currentProjectId; if (!s) { let e = Me
          .getState().currentProject.name,
          t = `default`; if (S ? t = `incognito` : y && U ? t = `team_project` : y && n?.chatVisibility === `team` ?
          t = `team` : U && (t = `project`), n?.chatVisibility !== `team` && j.track(L.CHAT_CREATED, { chat_id: H,
            user_id: c || null, source: t, project_id: U || null, project_name: e || null, team_id: y ?? null }),
          U && !_.current) { _.current = !0, j.track(L.USER_PROJECT_CHAT_CREATED, { project_id: U,
            project_name: e || void 0, chat_id: H }), j.track(L.CHAT_ADDED_TO_PROJECT, { project_id: U,
            project_name: e || void 0, chat_id: H, source: `projects-page` }); let t = h.getQueryData([x
            .PROJECTS_QUERY, c
          ])?.projects?.find(e => e.id === U);
          (t === void 0 || (t.chats?.length ?? 0) === 0) && Ze.getState().scheduleReviewModalTrigger(7e3,
            `first-project-chat`) } } if (!S && !y) { let e = za(de || v);
        h.setQueryData([ke.CHAT_HISTORY_QUERY, c], t => { if (t?.pages?.some(e => e.chats?.some(e => e.id === i)) ??
            !1) { if (!t?.pages || t.pages.length === 0) return t; let e = null,
              n = t.pages.map(t => { if (!t.chats) return t; let n = t.chats.filter(t => t.id !== i || (e = {
                  ...t, updatedAt: new Date().toISOString() }, !1)); return { ...t, chats: n } }); return e && n
              .length > 0 ? (n[0] = { ...n[0], chats: [e, ...n[0].chats || []] }, { ...t, pages: n }) : t } if (
            U) return t; let n = new Date().toISOString(),
            r = { id: i, userId: c ?? ``, title: e, description: null, visibility: `private`, createdAt: n,
              updatedAt: n, deletedAt: null, projectId: null, messageCount: 1, lastMessageAt: n, chatType: null,
              isTitlePending: !0 }; if (!t?.pages || t.pages.length === 0) return { pages: [{ chats: [r],
              hasMore: !1 }], pageParams: [{ offset: 0, limit: 50 }] }; let a = [...t.pages]; return a[0] = {
            ...a[0], chats: [r, ...a[0].chats || []] }, { ...t, pages: a } }), !s && U && (h.setQueryData([x
            .PROJECTS_QUERY, c
          ], t => t?.projects ? { ...t, projects: t.projects.map(t => { if (t.id !== U || t.chats?.some(e => e
                  .id === i)) return t; let n = { id: i, title: e, updatedAt: new Date().toISOString(),
                isTitlePending: !0 }; return { ...t, chats: [n, ...t.chats || []] } }) } : t), Me.getState()
          .addExpandedProject(U)) } let W = ce(i),
        Se = oe(i),
        Ce = fe(i),
        we = (W || Se || Ce) && !d;
      s || (ze.getState().rekeyDraft(J(), i), q.getState().setPendingNewChatId(null)); let G = !s && !ye.current
        .has(H); if (ye.current.add(H), await p({ text: de, files: o.length > 0 ? o : void 0,
          metadata: { expectNewChat: G, isDeepResearchMode: R, isWebSearchMode: r, isAgenticMode: z,
            isImageGenerationMode: C, needsBlurPreview: we, deepResearchProcessor: be, source: ie, mode: ae,
            projectId: U || void 0, promptLabel: n?.promptLabel, ...c && { userId: c }, ...l && { senderName: l },
            ...u && { senderImage: u }, ...pe && { imageGenerationStyle: pe }, ...P &&
          { imageGenerationRatio: P }, ...F && { imageGenerationModel: F }, ...I !== void 0 && { imageCount: I },
            ...F && t && { imageExperimentName: t.name, imageExperimentVariant: t.variant }, ...ve.length > 0 &&
            { collectionIds: ve }, ...B.length > 0 && { fileIds: B }, ...Object.keys(V).length > 0 &&
            { attachmentNames: V } } }), c) { let e = $t(c),
          t = Number(N.getItem(e) ?? `0`);
        N.setItem(e, String(t + 1)) } window.dispatchEvent(new Event(en)), Ye.getState().clearShareId(i) }, [f, p,
      m, h, i, c, d, g, t
    ]), be = (0, Q.useCallback)(async (e, t) => H(e, t), [H]), xe = (0, Q.useRef)(!1);
  (0, Q.useEffect)(() => {!R || xe.current || (xe.current = !0, j.track(L.PROMPT_LANDING_VIEWED, { user_id: c || null,
      prompt: R, auto_send: z, model: A?.get(`model`) || null })) }, [R]); let U = (0, Q.useRef)(!1);
  (0, Q.useEffect)(() => {!R || z || U.current || v && (U.current = !0, q.getState().currentInput.trim() || q.getState()
      .setCurrentInput(R)) }, [R, z, v]); let W = (0, Q.useRef)(!1); return (0, Q.useEffect)(() => { W.current = !1 }, [
    i
  ]), (0, Q.useEffect)(() => { let e = I.getItem(`pending_image_query`),
      t = I.getItem(`pending_background_query`),
      n = I.getItem(`pending_enhancer_query`),
      r = !!e || !!t || !!n,
      a = tn(); if (A?.get(`error`) && r) { on(); return } if (an({ hasPendingFunnel: r, isSessionPending: S,
        isCurrentlyAuthenticated: ee, isAuthModalOpen: D, isPostAuthTransition: O, isOnFunnelLanding: C || B,
        hasSyncCompleted: v })) { on(), I.removeItem(`signupReturnPreserveDraft`); return } let o = !At(P ??
    ``); if (a && an({ hasPendingFunnel: !0, isSessionPending: S, isCurrentlyAuthenticated: ee, isAuthModalOpen: D,
        isPostAuthTransition: O, isOnFunnelLanding: o, hasSyncCompleted: v })) { nn(); return } let s = !!(f
    .trim() || se); if ((e || t || n || a) && !s && V && !W.current && v && q.getState().hydrateDraftFromStorage(i))
      return; let c = rn({ hasPendingFunnel: r, hasDraft: s, isCurrentlyAuthenticated: ee, isServerAuthed: w }),
      l = rn({ hasPendingFunnel: a, hasDraft: s, isCurrentlyAuthenticated: ee, isServerAuthed: w }); if ((F || z ||
        c || l) && V && !W.current && v && (W.current = !0, e && (I.removeItem(`pending_image_query`), q.getState()
          .setIsImageGenerationMode(!0), re(i, pe())), t && (I.removeItem(`pending_background_query`), de(i)), a &&
        nn(), n && (I.removeItem(`pending_enhancer_query`), q.getState().setIsImageGenerationMode(!0), ie(i)), H(
          void 0, { ...F ? { text: F } : z && R ? { text: R } : {}, source: e ? pe() : t ? ue() : n ? le() : void 0,
            mode: t ? ne : void 0 }), document.activeElement instanceof HTMLElement && (document.activeElement
          .tagName === `TEXTAREA` || document.activeElement.tagName === `INPUT`) && document.activeElement.blur(),
        F || z)) { if (ut()) { let e = new URL(globalThis.location.href);
        e.searchParams.delete(`query`), e.searchParams.delete(`prompt`), e.searchParams.delete(`send`), globalThis
          .history.replaceState({}, ``, e.toString()) } else { let e = ae.locale,
          t = e && e !== `en` ? `/${e}/${i}` : `/${i}`;
        window.history.replaceState({}, ``, t) } } }, [F, R, z, V, C, w, B, v, f, se, ee, S, D,
  O]), { handleSubmitWithAuth: be, originalHandleSubmit: H } }
var Va = [`parallel_search`, `image_generation`];

function Ha(e) { if (e) return [...Va] }

function Ua(e) { let { transport: t, userId: n, userType: i, userEmail: a, planType: o, subscriptionStatusValue: s,
    isTestUserValue: c, chatType: l, chatId: u, chatExists: d, sessionMixpanelUserId: f, teamId: p,
    allowThinkingGeneration: m = !0 } = e, h = r(), g = (0, Q.useRef)(l), _ = (0, Q.useRef)(u), v = (0, Q.useRef)(m),
    y = (0, Q.useRef)(d), b = (0, Q.useRef)(n), x = (0, Q.useRef)(i ?? `guest`), S = (0, Q.useRef)(o), C = (0, Q.useRef)
    (s), w = (0, Q.useRef)(p ?? null), { data: T } = Oe(), E = (0, Q.useRef)(T?.id ?? null), { reportsAuto: D } = Qt(),
    O = (0, Q.useRef)(D);
  (0, Q.useEffect)(() => { n && (b.current = n, i && i !== `guest` && ge({ id: n, type: i, email: a })), i && (x
      .current = i) }, [n, i, a]), (0, Q.useEffect)(() => { S.current = o }, [o]), (0, Q.useEffect)(() => { C.current =
      s }, [s]), (0, Q.useEffect)(() => { g.current = l }, [l]), (0, Q.useEffect)(() => { _.current = u }, [u]), (0, Q
    .useEffect)(() => { v.current = m }, [m]), (0, Q.useEffect)(() => { y.current = d }, [d]), (0, Q.useEffect)(
() => { w.current = p ?? null }, [p]), (0, Q.useEffect)(() => { E.current = T?.id ?? null }, [T?.id]), (0, Q.useEffect)(
    () => { O.current = D }, [D]), (0, Q.useEffect)(() => { t.setGetAuthToken(() => te()), t.setGetAppToken(() => U()),
      t.setEnsureAppToken(e => _e(e)), t.setGetUserId(() => b.current ?? V()?.id ?? be()); let e = () => { let e = x
        .current; if (e && e !== `guest`) return e; let t = V(); return t?.type ? t.type : e || `guest` };
    t.setGetUserType(e), t.setGetUserEmail(() => { if (a) return a; let e = V(); return e?.email ? e.email : null }),
      t.setGetTeamId(() => w.current), t.setGetUserTeamId(() => De.getState().workspace === `personal` ? null : E
        .current), t.setEnsureSession(async () => { let e = !!xe(),
          t = V(); if (!e && t) try { await ee.getSession({ query: { disableCookieCache: !0 } }) } catch (
        e) { console.error(`[AuthGuard] ensureSession: refresh failed`, e) } }), t.setGetPlanType(() => S.current ||
        `free`), t.setGetSubscriptionStatus(() => C.current), t.setGetIsTestUser(() => c), t.setGetIsWebSearchMode(
      () => q.getState().isWebSearchMode), t.setGetIsImageGenerationMode(() => q.getState().isImageGenerationMode), t
      .setGetIsAgenticMode(() => q.getState().isAgenticMode), t.setGetIsClarifyingQuestionsEnabled(() => jn()), t
      .setGetDisabledToolkits(e => { let t = typeof h?.id == `string` ? h.id : null,
          n = e ?? t ?? q.getState().pendingNewChatId; return tt.getState().getDisabledToolkitsForChat(n) }), t
      .setGetEnabledToolkits(() => Ha(e() === `guest`)), t.setGetIsIncognitoMode(() => ut()), t.setGetSelectedModel(
      () => q.getState().selectedModel), t.setGetIsAutoModelSelected(() => O.current), t.setGetModelSelectionSource(
      () => { let e = q.getState(); return e.modelManuallySelected ? `manual` : e.autoModelExplicitlyPicked ? `auto` :
            `default` }), t.setGetIsTurnStoppedByUser(e => Ve(q.getState(), e)), t.setGetImageGenerationModel(() => q
        .getState().imageGenerationModel), t.setGetDisabledConnectorIds(() => nt()), t.setGetCfModelsVariant(() =>
      Dn()), t.setGetMicrosoftConnectorsVariant(() => Pn()), t.setGetPromptScreeningVariant(() => zn()), t
      .setGetMixpanelUserId(() => x.current === `regular` && f ? f : W() || n || null), t.setGetDeviceId(() => Ce()),
      t.setGetIsMobile(() => window.matchMedia(`(max-width: 649px)`).matches || window.matchMedia(
        `(max-height: 649px)`).matches), t.setGetIsFreemium(() => G()), t.setGetFreemiumFunnel(() => ve() && !
    F({ subscriptionStatus: C.current, isInTeam: !!E.current })), t.setGetProjectId(() => X.getState()
        .currentProjectId), t.setGetProjectName(() => Me.getState().currentProject.name || null), t.setGetLocale(
    () => { let e = h?.locale; return typeof e == `string` ? e : null }), t.setGetUserTimezone(() => { try { let e =
            Intl.DateTimeFormat().resolvedOptions().timeZone; return typeof e == `string` && e.length > 0 ? e :
          null } catch { return null } }), t.setGetUserCountry(() => { let e = cn(); return !e?.countryName || !e
          ?.country ? null : `${e.countryName} (${e.country})` }), t.setGetChatType(() => g.current), t
      .setGetChatGeneration(e => { let t = e === _.current; return t && !v.current || er({ chatType: t ? g.current :
              null, isImageLandingOrigin: ce(e), isBackgroundFunnelOrigin: oe(e), isEnhancerFunnelOrigin: fe(e),
            hasDeepResearchTurn: (q.getState().messagesByChat[e] ?? []).some(Tt) }) ? null : nr({ chatId: e,
            chatType: t ? g.current : null, isThinkingArm: Wn(), chatExists: t ? y.current ?? !0 : !0 }) ? qn :
          null }) }, [t, n, a, c, h?.locale, h?.id, f]) }
var Wa = ({ imageOnly: e = !1, isGuestUploadGated: t = !1 } = {}) => { let n = ln(),
      r = un(),
      { openSignInModal: i } = Xe(),
      a = (0, Q.useCallback)(e => { if (t) { i(R.IMAGE_FUNNEL); return } n.uploadImageFiles(e) }, [t, i, n
        .uploadImageFiles
      ]),
      o = Ot({ imageOnly: e, uploadImageFiles: a, consumeShellFiles: !0 }); return { ...n, ...o, ...r } },
  Ga = `/v1/debug/research-trace`,
  Ka = typeof process < `u` && {}.NEXT_PUBLIC_DEBUG_RESEARCH_TRACE === `true`;

function qa(e, t, n = {}) { let r = Date.now();
  console.log(`[ResearchTrace:${e}] ${t}`, n), Ka && Ja(e, t, r, n) }

function Ja(e, t, n, r) { try { let i = JSON.stringify({ traceId: e, event: t, timestamp: n, payload: r }); if (
      navigator.sendBeacon) { let e = new Blob([i], { type: `application/json` });
      navigator.sendBeacon(Ga, e) || fetch(Ga, { method: `POST`, headers: { "Content-Type": `application/json` },
        body: i, keepalive: !0 }).catch(() => {}) } else fetch(Ga, { method: `POST`,
      headers: { "Content-Type": `application/json` }, body: i, keepalive: !0 }).catch(() => {}) } catch {} }

function Ya(e) { return e.some(e => Array.isArray(e.parts) && e.parts.some(e => e.type === `tool-deepResearch` && (e
    .state === `output-available` || e.state === `output-error`))) } async function Xa(e, t, n = 6, r = 3e3) { for (let
      i = 0; i <= n; i++) { i > 0 && await new Promise(e => setTimeout(e, r * i)); try { let r = (await t.fetchQuery({
        ...vt(e), staleTime: 0 }))?.messages ?? []; if (Ya(r) || i === n) { window.dispatchEvent(new CustomEvent(
          `refreshChatMessages`, { detail: { chatId: e, messages: r } })); return } } catch (e) { if (console.error(
          `[useDeepsearch] Failed to refresh messages from BudgetAgent:`, e), i === n) return } } }
var Za = e => e ? `team_chat_page` : q.getState().deepResearchSource;

function Qa({ chatId: e, transport: t, messages: n, chatIdRef: r, queryClient: i, teamId: a }) { let o = (0, Q.useRef)(
    n);
  (0, Q.useEffect)(() => { o.current = n }, [n]); let s = (0, Q.useRef)(a ?? null);
  (0, Q.useEffect)(() => { s.current = a ?? null }, [a]); let c = De(e => e.workspace),
    { isInTeam: l } = Oe(),
    u = a ? c === `organization` : !(c === `organization` && l),
    d = (0, Q.useRef)(u);
  (0, Q.useEffect)(() => { d.current = u }, [u]); let f = (0, Q.useRef)([]),
    p = (0, Q.useRef)(null); return (0, Q.useEffect)(() => { let n = () => { p.current &&= (clearTimeout(p.current),
        null); let e = f.current; if (e.length === 0 || (f.current = [], !d.current)) return; let t = q
    .getState();
      e.length === 1 ? t.appendResearchUpdate(e[0]) : t.applyResearchUpdates(e) };
    t.setGetIsDeepResearchMode(() => q.getState().isDeepResearchMode), t.setGetDeepResearchProcessor(() => q
      .getState().deepResearchProcessor); let a = t.setOnDeepResearch((t, n) => { t === r.current && n.enabled && (d
          .current && (q.getState().clearResearchUpdates(), q.getState().clearSidebarOverride(), q.getState()
            .setIsDeepResearchTaskInProgress(!0)), q.getState().setChatResearching(t, !0), qa(e,
            `research_started`, { chatId: t }), j.track(L.DEEP_RESEARCH_STARTED, { source: Za(s.current),
            team_id: s.current })) }),
      o = t.setOnResearchProgress((e, t, i) => { if (e !== r.current) return; let a = q.getState(),
          o = t.type,
          s = o === `completed` || o === `cancelled` || o === `error`; if (s || a.setChatResearching(e, !0), d
          .current) { if (!s && !a.isDeepResearchTaskInProgress && a.setIsDeepResearchTaskInProgress(!0), i && a
            .currentResearchMessageId !== i && a.setCurrentResearchMessageId(i), f.current.push(t), s) { n
          (); return } p.current && clearTimeout(p.current), p.current = setTimeout(n, 60) } }),
      c = t.setOnResearchComplete((n, a, o) => { n === r.current && (qa(e, `research_finished`, { chatId: n,
            outcome: o }), Xa(r.current, i).catch(() => {}), f.current = [], p.current &&= (clearTimeout(p
            .current), null), t.finishStreamLocally(r.current), q.getState().setIsDeepResearchTaskInProgress(!
          1), q.getState().setChatResearching(n, !1), q.getState().clearResearchUpdates(), j.track(o ===
            `completed` ? L.DEEP_RESEARCH_SUCCESS : L.DEEP_RESEARCH_FAILED, { source: Za(s.current), team_id: s
                .current })) }); return () => { a(), o(), c(), p.current &&= (clearTimeout(p.current), null), f
        .current = [] } }, [t, r, e, i]), { handleOnFinishResearch: (0, Q.useCallback)(t => { xt(t) && (qa(e,
        `research_finished`, { messageId: t.id }), j.track(L.DEEP_RESEARCH_SUCCESS, { source: Za(s.current),
        team_id: s.current }), q.getState().setIsDeepResearchTaskInProgress(!1)) }, [e]),
    processResearchSyncResponse: (0, Q.useCallback)(t => { let n = t.researchRun,
          r = n?.status === `running`; if (r) { let t = n.messageId; if (t) { let n = o.current.find(e => e.id ===
              t); if (n && bt(n)) return q.getState().setIsDeepResearchTaskInProgress(!1), q.getState()
              .setChatResearching(e, !1), j.track(L.DEEP_RESEARCH_SUCCESS, { source: Za(a), team_id: a ??
                null }), { hasActiveResearch: !1, isPendingDeepResearch: !1, researchToolParts: [],
                isStaleStreamingResponse: !0 } } q.getState().setIsDeepResearchTaskInProgress(!0), q.getState()
            .setChatResearching(e, !0), n.messageId && q.getState().setCurrentResearchMessageId(n.messageId) } else
          q.getState().setIsDeepResearchTaskInProgress(!1), q.getState().setChatResearching(e, !1); let i = t
          .isDeepResearchMode === !0 || t.pendingDeepResearch === !0 || q.getState().isDeepResearchMode === !0,
          c = [];
        t.status === `streaming` && r ? c.push({ type: `tool-deepResearch`, state: `input-available`,
            toolCallId: `research-${t.messageId}`, toolName: `deepResearch` }) : t.status === `streaming` && i && c
          .length === 0 && (c.push({ type: `tool-deepResearch`, state: `input-available`,
              toolCallId: `research-pending-${t.messageId||e}`, toolName: `deepResearch` }), q.getState()
            .setIsDeepResearchTaskInProgress(!0)); let l = o.current.at(-1),
          u = t.status === `streaming` && !r && !!l && bt(l); return u && j.track(L
        .DEEP_RESEARCH_SUCCESS, { source: Za(s.current), team_id: s.current }), { hasActiveResearch: r,
          isPendingDeepResearch: i, researchToolParts: c, isStaleStreamingResponse: u } }, [e]) } }

function $a(e) { let { error: t, messages: n, chatId: r } = e, i = (0, Q.useMemo)(() => { if (t && !q.getState()
      .isDeepResearchTaskInProgress) try { let e = qi(t),
        r = t.errorType ?? e.messageMetadata?.errorType,
        i = Rt(r); return n.at(-1)?.parts?.some(e => e.type === `tool-deepResearch` && e.state ===
          `output-available` && e.output?.format === `report`) || i.isLimitError || r === `empty_response` ?
        void 0 : Ji(t, `An error occurred`) } catch { return Ji(t, `An error occurred`) } }, [t, n, r]), a = (0, Q
    .useRef)(null); return (0, Q.useEffect)(() => { if (!i || !t) { a.current = null; return } if (Ft(t.errorType))
      return; let e = `${r}:${t.message}`;
    a.current !== e && (a.current = e, C(t, `render`, void 0, `chatErrorCard`)) }, [i, t, r]), i }
var eo = new Set([`access_denied`, `please_restart_the_process`, `state_mismatch`, `invalid_state`, `invalid_code`,
    `server_error`
  ]),
  to = (e, t) => { let n = o(),
      { isAuthenticated: r, isPending: i } = S(),
      a = n?.get(`error`),
      s = n?.get(`errorMessage`),
      c = n?.get(`authMethod`),
      l = n?.get(`email`),
      u = (0, Q.useRef)(!1);
    (0, Q.useEffect)(() => { if (a && !u.current && !r && !i) { let t = s || `Authentication failed`;
        eo.has(a) || (j.track(L.USER_AUTH_FAILED, { auth_method: c || `email`, error_type: `auth_callback_error`,
          error_message: t, user_id: e?.id || ``, email: l || `` }), C(Error(`Auth callback error: ${t}`),
          `render`)), I.removeItem(`pending_image_query`), I.removeItem(`pending_background_query`), I.removeItem(
          `pending_enhancer_query`), I.removeItem(`signupReturnPreserveDraft`); let n = new URL(globalThis.location
          .href);
        n.searchParams.delete(`error`), n.searchParams.delete(`errorMessage`), n.searchParams.delete(`authMethod`), n
          .searchParams.delete(`email`), globalThis.history.replaceState({}, ``, n.toString()), u.current = !0 } }, [
      a, s, t, e?.id, r, c, l, i
    ]) },
  no = 3e3;

function ro(e) { let { chatId: t, transport: n } = e;
  (0, Q.useEffect)(() => n.getOrCreateConnection(t).onReviewPrompt(e => { e.chatId === t && (et.getState()
      .hasSeenPaywall() || Ze.getState().scheduleReviewModalTrigger(no, `freemium-funnel`)) }), [t, n]) }

function io(e) { let { chatId: t, initialMessages: n, messages: r, setMessages: i } = e, a = (0, Q.useRef)(!1);
  (0, Q.useEffect)(() => { a.current = !1 }, [t]), (0, Q.useEffect)(() => { if (a.current || !n || n.length === 0)
      return;
    a.current = !0; let e = n.slice(),
      t = new Set(e.map(e => e.id)),
      o = r.filter(e => !t.has(e.id)),
      s = [...e, ...o];
    i(s) }, [n, i, r, t]) }
var ao = () => { let { limits: e, session: t } = Te();
  (0, Q.useEffect)(() => { t.status === `authenticated` && t.data?.user?.type !== `guest` && !e.isLoading && e.data &&
      (e.data.hasHitLimitBefore ? N.setItem(`hasSentFirstMessage`, `true`) : N.setItem(`hasSentFirstMessage`,
        `false`)) }, [t.status, t.data?.user?.type, e.isLoading, e.data]) };
a();
var oo = () => { i(() => import(`./existing-chat-DX8nfOwY.js`).then(e => e.t), __vite__mapDeps([59, 1, 2, 5, 60, 61, 19,
      62, 23, 18, 63, 34, 57, 58, 64, 12, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 13, 77, 78, 79, 80, 42,
      81, 41, 82, 83, 84, 85, 86, 10, 3, 87, 88, 89, 90, 35, 91, 92, 93, 94, 95, 4, 96, 6, 97, 98, 99, 100, 101,
      102, 103, 104, 7, 8, 9, 105, 11, 14, 15, 16, 17, 106, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
      107, 108, 109, 36, 37, 38, 39, 40, 43, 44, 110, 111, 112, 113, 114, 49, 115, 116, 117, 54, 55, 118, 119,
      120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 46, 47, 48, 130, 131, 132, 133, 134, 135, 136, 137, 51,
      138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158,
      159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 45, 176, 177, 178, 179,
      180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200,
      201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221,
      222, 223, 224, 225, 226, 227, 228, 52, 53, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241,
      242, 243, 50, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262,
      263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283,
      284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304,
      305, 306
    ])).catch(() => {}) },
  so = new Set([R.ATTACHMENTS_BUTTON, R.CREATE_IMAGE_BUTTON, R.DEEP_RESEARCH_BUTTON, R.MODEL_SELECTOR, R
    .NEW_PROJECT_BUTTON, R.NEW_COLLECTION_BUTTON
  ]),
  co = 500;

function lo(e) { let { chatId: t, messages: n, setMessages: r, isCurrentlyAuthenticated: i, isSessionPending: a,
    tierRank: o } = e, s = (0, Q.useRef)(!1), { guardFeature: c, isFunnelRestricted: l } = at(), u = Xe(e => e
    .isAuthModalOpen);
  (0, Q.useEffect)(() => { if (!i) return; let e = N.getItem(`signupModalSource`); if (!e) return; if (l && e !== R
      .WEB_SEARCH_BUTTON) { if (!so.has(e)) { N.removeItem(`signupModalSource`); return } if (u) return; let t =
        setTimeout(() => { N.removeItem(`signupModalSource`), c() }, co); return () => clearTimeout(t) } let t =
      setTimeout(() => { e === R.CREATE_IMAGE_BUTTON ? q.getState().setIsImageGenerationMode(!0) : e === R
          .DEEP_RESEARCH_BUTTON ? (q.getState().setDeepResearchMode(!0), Y.getState().setPreserveModesFromPayment(!
            0)) : e === R.WEB_SEARCH_BUTTON && q.getState().setIsWebSearchMode(!0), setTimeout(() => { N.removeItem(
              `signupModalSource`) }, 2e3) }, co); return () => clearTimeout(t) }, [i, l, c, u]), (0, Q.useEffect)(
() => { if (!i) return; let e = Jt(); if (!e || e !== t) return; let a = new URL(window.location.href);
    a.searchParams.has(`paywall`) && (a.searchParams.delete(`paywall`), window.history.replaceState({}, ``, a
      .toString())); let o = n.some(e => { let t = e.metadata; return [`guest_limit`, `usage_limit`].includes(t
          ?.errorType) }),
      c = n.some(e => { let t = e.metadata; return t?.isPlaceholderUserMessage || t?.isThinkingPlaceholder });
    (o || c) && r(e => e.filter(e => { let t = e.metadata; return !([`guest_limit`, `usage_limit`].includes(t
          ?.errorType) || t?.isPlaceholderUserMessage || t?.isThinkingPlaceholder) })), !s.current && n.length > 0 &&
      (s.current = !0, Xt(), oo(), setTimeout(() => { jt({ chatId: t, source: `post-auth`, skipLimitGate: !0 }) },
        100)) }, [i, t, r, n]); let d = q(e => e.limitBannerByChatId[t]),
    f = Lt(d);
  (0, Q.useEffect)(() => {!f || a || i && (r(e => { let t = e.filter(e => { let t = e.metadata; return !(t
            ?.isPlaceholderUserMessage || t?.isThinkingPlaceholder) }); return t.length === e.length ? e : t }), q
      .getState().clearLimitBanner(t), we(t), s.current || (s.current = !0, oo(), setTimeout(() => { jt({ chatId: t,
          source: `post-auth`, skipLimitGate: !0 }) }, 500))) }, [f, i, r, a, t]); let p = (0, Q.useRef)(o),
    m = (0, Q.useRef)(null);
  (0, Q.useEffect)(() => { let e = Ht(B(t));
    m.current !== t && (m.current = t, p.current = typeof e?.tierRankAtBlock == `number` ? e.tierRankAtBlock : o); let
      n = p.current;
    p.current = o, !(o <= n) && It(q.getState(), t, e) && jt({ chatId: t, source: `payment-modals`, resetsCredits: !0,
      skipLimitGate: !0 }) }, [o, t]) }
var uo = { "30s": 3e4, "60s": 6e4, "90s": 9e4, "120s": 12e4 },
  fo = () => { let { data: e } = Oe(), t = (0, Q.useRef)(null);
    (0, Q.useEffect)(() => { t.current = e?.id ?? null }, [e?.id]); let n = (0, Q.useRef)({ chatId: ``, userId: ``,
        isFreemium: !1, teamId: null, startTime: null, thresholdsTriggered: new Set, timeoutIds: new Map }),
      r = (0, Q.useCallback)(() => { n.current.timeoutIds.forEach(e => { clearTimeout(e) }), n.current.timeoutIds
        .clear() }, []); return (0, Q.useEffect)(() => () => { r() }, [r]), { startTracking: (0, Q.useCallback)((e, i,
        a, o = null) => { r(), n.current = { chatId: e, userId: i, isFreemium: a, teamId: o, startTime: Date
          .now(), thresholdsTriggered: new Set, timeoutIds: new Map }, Object.entries(uo).forEach(([r,
        i]) => { let a = setTimeout(() => { let a = n.current; if (a.chatId === e && !a.thresholdsTriggered
              .has(r)) { a.thresholdsTriggered.add(r); let e = q.getState(),
                n = e.selectedModel,
                o = e.isDeepResearchMode || e.isDeepResearchTaskInProgress,
                s = !!me(a.chatId),
                c = s && e.imageLandingStyle || void 0,
                l = s && e.imageLandingAspect || void 0,
                u = Date.now() - (a.startTime || Date.now()); if (o) { let t = Et(e.messagesByChat[a
                  .chatId] ?? []);
                j.track(L.SEARCH_RESPONSE_WAIT_EXCEEDED, { source: `deepsearch`, web_sources_count: t
                    .webSourcesCount, actual_wait_time_ms: u, search_count: t.searchCount,
                  wait_threshold: i / 6e4, team_id: a.teamId }); return } j.track(L
                .USER_MESSAGE_RESPONSE_WAIT_EXCEEDED, { chat_id: a.chatId, current_model: n, user_id: a
                    .userId, wait_threshold: r, actual_wait_time_ms: u, is_freemium: a.isFreemium,
                  is_websearch: e.isWebSearchMode, is_image_request: e.isImageGenerationMode || s,
                  is_agentic: e.isAgenticMode, source: A(a.chatId), ...s && { style: c, ratio: l },
                  project_id: X.getState().currentProjectId, project_name: Me.getState().currentProject
                    .name || null, shared: kt(a.chatId), team_id: t.current }) } }, i);
          n.current.timeoutIds.set(r, a) }) }, [r]), stopTracking: (0, Q.useCallback)(() => { r(), n
        .current = { chatId: ``, userId: ``, isFreemium: !1, teamId: null, startTime: null,
          thresholdsTriggered: new Set, timeoutIds: new Map } }, [r]), isTracking: (0, Q.useCallback)(() => n.current
        .startTime !== null, []), getCurrentWaitTime: (0, Q.useCallback)(() => n.current.startTime === null ? 0 : Date
        .now() - n.current.startTime, []) } };

function po({ chatId: e, messages: t, status: n, setMessages: r, enabled: i = !0, transport: a }) { let o = (0, Q
      .useRef)(!1),
    s = (0, Q.useRef)(0),
    c = (0, Q.useRef)(!1),
    l = (0, Q.useRef)(!1),
    u = (0, Q.useRef)(t);
  (0, Q.useEffect)(() => { u.current = t }), (0, Q.useEffect)(() => { s.current = Date.now() }, []), (0, Q.useEffect)(
  () => { o.current = n === `streaming` || n === `submitted` }, [n]); let d = (0, Q.useCallback)(async () => { try { let
          t = await T(),
          n = await h.get(`chat?id=${e}`, { headers: t }); if (!n.ok) return null; let r = await n.json(); return !r
          .messages || r.messages.length === 0 ? null : Dt(r.messages) } catch { return null } }, [e]),
    f = (0, Q.useCallback)(async () => { let e = u.current,
        t = await d(); if (t && t.length > 0) { if (t.length < e.length) return !0; let n = e.at(-1),
          i = t.at(-1); if (i && (!n || i.id !== n.id)) { let e = n,
            a = i;
          r(e?.role === `user` && (!a || a.role !== `user`) ? [...t, e] : t) } return !0 } return !1 }, [e, d,
    r]); return (0, Q.useEffect)(() => { if (!i) return; let t = async () => { let t = document.visibilityState ===
        `visible`,
        n = Date.now() - s.current; if (s.current = Date.now(), t) { if ((o.current || n > 5e3) && !c
          .current) { if (c.current = !0, a && o.current && a.hasActiveStream(e)) { try { await a.resumeStream(
                e) } catch (e) { console.warn(
                `[useStreamRecovery] Resume failed, falling back to HTTP recovery:`, e), await f() } c
              .current = !1; return } await new Promise(e => setTimeout(e, 1500)), o.current && await f(),
            setTimeout(() => { c.current = !1 }, 2e3) } } else c.current = !1 }; return document.addEventListener(
      `visibilitychange`, t), () => { document.removeEventListener(`visibilitychange`, t) } }, [i, n, f, e, a]), (0, Q
    .useEffect)(() => { if (!i) return; let e = async () => { o.current && (await new Promise(e => setTimeout(e,
          1e3)), await f()) }, t = () => {}; return window.addEventListener(`online`, e), window.addEventListener(
        `offline`, t), () => { window.removeEventListener(`online`, e), window.removeEventListener(`offline`, t) } },
    [i, f]), (0, Q.useEffect)(() => { if (!i) return; let e = async () => { if (n === `error`) { let e =
      await d(); if (e && e.length > t.length) { let n = t.at(-1),
            i = e.at(-1);
          r(n?.role === `user` && (!i || i.role !== `user`) ? [...e, n] : e) } } }; return window.addEventListener(
      `focus`, e), () => { window.removeEventListener(`focus`, e) } }, [i, n, t.length, d, r]), (0, Q.useEffect)(
() => { if (!i) return; let e = async e => {
      (e.persisted || o.current || l.current) && (await new Promise(e => setTimeout(e, 300)), await f(), l
        .current = !1) }; return window.addEventListener(`pageshow`, e), () => { window.removeEventListener(
        `pageshow`, e) } }, [i, f, e]), (0, Q.useEffect)(() => { if (!i) return; let e = () => { l.current = o
        .current },
      t = async () => { l.current &&= (await new Promise(e => setTimeout(e, 300)), await f(), !1) }; return document
      .addEventListener(`freeze`, e), document.addEventListener(`resume`, t), () => { document.removeEventListener(
          `freeze`, e), document.removeEventListener(`resume`, t) } }, [i, n, f]), (0, Q.useEffect)(() => { if (!i)
      return; let e = e => { e.persisted && o.current && (l.current = !0) }; return window.addEventListener(
      `pagehide`, e), () => { window.removeEventListener(`pagehide`, e) } }, [i]), { attemptRecovery: f } }

function mo(e) { let { chatId: t, chatIdRef: n, currentUserId: r, transport: i, setMessages: a, setIsStreaming: o,
    enabled: s } = e, c = (0, Q.useRef)(``), l = (0, Q.useRef)(null), u = (0, Q.useRef)(null), [d, f] = (0, Q.useState)(
    !1), p = (0, Q.useRef)(!1);
  (0, Q.useEffect)(() => { p.current = d }, [d]); let [m, h] = (0, Q.useState)(t); return t !== m && (h(t), f(!1)), (0,
    Q.useEffect)(() => { c.current = ``, l.current = null, u.current = null, p.current = !1 }, [t]), (0, Q.useEffect)(
    () => { if (!s) return;
      i.setOnTeamUserMessage(e => { e.userId !== r && e.chatId === n.current && a(t => { if (t.some(t => t.id === e
              .messageId)) return t; let n = { id: e.messageId, role: `user`, parts: e.parts,
            metadata: { userId: e.userId, senderName: e.userName, senderImage: e.userImage, createdAt: e
                .createdAt } }; return [...t, n] }) }), i.setOnTeamStreamStart(e => { e.triggeredByUserId !== r && e
          .chatId === n.current && (c.current = ``, l.current = e.messageId, u.current = e.streamId, f(!0), o(!0),
            a(t => t.some(t => t.id === e.messageId) ? t : [...t, { id: e.messageId, role: `assistant`, parts: [
              { type: `text`, text: `` }] }])) }); let e = i.getOrCreateConnection(t).subscribeToStreamState((e,
      t) => { e === n.current && !t && p.current && (c.current = ``, l.current = null, u.current = null, p
          .current = !1, f(!1), o(!1)) }); return () => { e() } }, [s, t, n, r, i, a, o]), { isTeamStreaming: d } }

function ho({ chatId: e, chatIdRef: t, transport: n, setMessages: r, enabled: i }) { let a = (0, Q.useRef)(!1);
  (0, Q.useEffect)(() => { if (!i) return; let o = async () => { if (!a.current) { a.current = !0; try { n
            .resetReconnectionForVisibility(), await n.ensureConnected(e); let i = await T(),
            a = await h.get(`chat?id=${e}`, { headers: i }); if (!a.ok) return; let o = await a.json(); if (!o
            .messages || o.messages.length === 0 || t.current !== e) return; let s = Dt(o.messages);
          r(e => { let t = new Set(e.map(e => e.id)),
              n = s.filter(e => !t.has(e.id)); return n.length === 0 ? e : [...e, ...n] }) } catch (e) { C(e,
            `render`) } finally { a.current = !1 } } }, s = () => { document.visibilityState === `visible` && o()
        .catch(() => {}) }; return document.addEventListener(`visibilitychange`, s), () => { document
        .removeEventListener(`visibilitychange`, s) } }, [i, e, t, n, r]) }
var go = [],
  _o = [],
  vo = (e, t, n, r, i, a, o, s, l, u, p = !0) => { ua({ chatId: e, initialChatModel: n }); let m = X(e => e
        .setIsStreaming),
      h = X(e => e.setCurrentChatId),
      g = c(),
      { limits: _, subscriptionStatus: b, setUserLimits: x, userProfileWithSubscription: ee, session: S } = Te(),
      C = qt(),
      { data: w } = _,
      { data: T } = b,
      { data: te } = ee,
      O = S.isAuthenticated,
      ne = S.isPending,
      k = O || !!o && o.type !== `guest`,
      ae = S.data?.user,
      oe = ae?.id,
      se = d(),
      { openPaywallModal: ce } = $e(),
      { chatsFromHistory: le } = f(),
      { data: ue } = D(),
      A = (0, Q.useMemo)(() => { let t = le.find(t => t.id === e)?.chatType; if (t) return t; if (ue?.projects)
          for (let t of ue.projects) { let n = t.chats?.find(t => t.id === e); if (n?.chatType) return n.chatType }
        return null }, [le, ue, e]);
    (0, Q.useEffect)(() => {!A || !e || (A === `image_funnel` ? re(e) : A === `background_removal` ? de(e) : A ===
        `image_enhancer` && ie(e)) }, [A, e]), (0, Q.useEffect)(() => { p && Zn({ chatId: e, chatExists: !!a,
        isThinkingArm: Wn() }) && Xn(e) }, [e, a, p]); let { isAgenticEnabled: fe, isResolved: j } = Li(), pe = Me(e =>
      e.addExpandedProject), { startTracking: me, stopTracking: M, getCurrentWaitTime: he } = fo();
    to(o, e); let N = T?.data?.subscription?.status === P.CANCELED,
      F = T?.data?.subscription?.status === P.SCHEDULED_FOR_CANCELLATION || T?.data?.subscription?.status === P
      .TRIAL_SCHEDULED_FOR_CANCELLATION;
    ao(); let I = T?.data?.subscription?.isSubscribed,
      L = T?.data?.subscription?.status === P.TRIAL || T?.data?.subscription?.status === P
      .TRIAL_SCHEDULED_FOR_CANCELLATION || w?.isTrialUser,
      R = ee.data?.data,
      z = v({ userProfile: R?.userProfile, subscription: R?.subscription }),
      ge = y(R?.userProfile?.planId),
      _e = (0, Q.useRef)(I),
      ve = (0, Q.useRef)(L),
      B = (0, Q.useRef)(N),
      V = (0, Q.useRef)(F),
      ye = (0, Q.useRef)(z),
      H = (0, Q.useRef)(ge),
      be = (0, Q.useRef)(O);
    (0, Q.useEffect)(() => { _e.current = I, ve.current = L, B.current = N, V.current = F, ye.current = z, H.current =
        ge, be.current = O }, [I, L, N, F, z, ge, O]); let { visibilityType: xe } = kn({ chatId: e,
      initialVisibilityType: r }), U = (0, Q.useRef)(xe), W = (0, Q.useRef)(e);
    (0, Q.useEffect)(() => { U.current = xe }, [xe]), (0, Q.useEffect)(() => { W.current = e }, [e]); let Se = (0, Q
        .useRef)([]),
      Ce = (0, Q.useRef)(null),
      we = (0, Q.useRef)(!1),
      G = Ii(),
      Ee = (T?.data?.subscription?.planType)?.toLowerCase() ?? `free`,
      De = T?.data?.subscription?.status ?? null,
      Oe = O === !0 && b.isPending,
      ke = (0, Q.useRef)(null),
      Ae = (0, Q.useRef)(null),
      je = (0, Q.useRef)(null);
    (0, Q.useEffect)(() => { if (ne || Oe) return; let e = O === !0,
        t = I === !0,
        n = `${Ee}:${De??``}`; if (ke.current === null) { ke.current = e, Ae.current = t, je.current = n; return } let
        r = ke.current !== e || Ae.current !== t || je.current !== n;
      ke.current = e, Ae.current = t, je.current = n, r && (E(), G.recycleConnections()) }, [O, I, Ee, De, ne, Oe,
    G]); let Ne = te?.data?.userProfile?.isTestUser ?? !1,
      Pe = (0, Q.useRef)(Ne);
    (0, Q.useEffect)(() => { Pe.current = Ne ?? !1 }, [Ne]), On(), Mn(), Fn(), Bn(), Gn(); let Fe = q(e => e
        .imageOutputAvailableSeq),
      Ie = (0, Q.useRef)(0);
    (0, Q.useEffect)(() => { Fe <= Ie.current || (Ie.current = Fe, g.invalidateQueries({ queryKey: [
            `user-image-gallery`] }), g.refetchQueries({ queryKey: [`user-image-gallery`], type: `active` })) }, [Fe,
      g]), Ua({ transport: G, userId: oe ?? o?.id, userType: ae?.type ?? o?.type, userEmail: ae?.email ?? o?.email,
      planType: Ee, subscriptionStatusValue: De, isTestUserValue: Ne, chatType: A, chatId: e, chatExists: a,
      sessionMixpanelUserId: ae?.mixpanelUserId ?? o?.mixpanelUserId, teamId: u, allowThinkingGeneration: p }),
  Ma({ chatId: e, transport: G, enabled: u !== null && k, chatExists: !!a }); let K = (0, Q.useRef)(!1);
    (0, Q.useEffect)(() => { K.current = !1 }, [e]), Vi({ transport: G, chatId: e, chatIdRef: W, chatExists: a,
      userId: se, queryClient: g, addExpandedProject: pe, setCurrentChatId: h, teamId: u }), Hi({ transport: G,
      userId: se, queryClient: g, addExpandedProject: pe, teamId: u }), Ui({ transport: G, queryClient: g,
      teamId: u }); let { onFinish: Le, deepsearchHandleOnFinishResearchRef: Re } = Oa({ chatId: e, initialMessages: t,
        userId: oe ?? o?.id, messagesRef: Se, queryClient: g, stopTracking: M, teamId: u }), { onError: ze,
        setMessagesRef: Be } = $i({ chatId: e, chatIdRef: W, messagesRef: Se, wasActivelyStreamingRef: we,
        isSubscribedRef: _e, isCancelledRef: B, isScheduledToCancelRef: V, hasPowerPlanRef: ye, isSuperProRef: H,
        isTrialUserRef: ve, isTestUserRef: Pe, isAuthenticatedRef: be, userId: oe ?? o?.id, isSubscribed: I,
        queryClient: g, setUserLimits: x, openPaywallModal: ce, stopTracking: M, getCurrentWaitTime: he,
      teamId: u }), { messages: Ve, setMessages: J, sendMessage: He, status: Ue, regenerate: We, hasSentLocally: Ge } =
      na({ chatId: e, transport: G, onError: ze, onFinish: e => Le({ message: e.message, messages: e.messages }) }), Y =
      a || Ge ? Ve : _o, Ke = (0, Q.useRef)(Ue);
    (0, Q.useEffect)(() => { Ke.current === `streaming` && Ue === `ready` && (q.getState().isDeepResearchMode || M()),
        Ke.current = Ue }, [Ue, M]); let qe = q(e => e.isDeepResearchMode),
      Je = (0, Q.useRef)(!1);
    (0, Q.useEffect)(() => { let e = Je.current;
      Je.current = qe, e && !qe && M() }, [qe, M]); let Ye = (0, Q.useMemo)(() => Y.some(Tt), [Y]),
      Xe = q(e => e.activeChatId);
    (0, Q.useEffect)(() => { a && Xe === e && Ye && !q.getState().isDeepResearchMode && q.getState()
        .setDeepResearchMode(!0) }, [a, Ye, e, Xe]); let Ze = (0, Q.useCallback)(() => { G
    .reconnectToStream({ chatId: e }).catch(() => {}) }, [G, e]);
    zi({ chatId: e, messages: Y }); let Z = q(t => t.streamErrorByChatId[e] ?? null),
      Qe = (0, Q.useMemo)(() => { if (!Z) return; let e = Error(Z.message); return Z.errorType && (e.errorType = Z
          .errorType), e }, [Z]),
      et = (0, Q.useRef)(null);
    (0, Q.useEffect)(() => { if (et.current === e) return;
      et.current = e; let n = q.getState().messagesByChat[e]; if (!n || n.length === 0) { let n = t?.length ? t : q
          .getState().inFlightUserTurns[e] ?? [];
        q.getState().setMessagesForChat(e, n) } }, [e, t]), (0, Q.useEffect)(() => { Be.current = J }, [J, Be]), (0, Q
      .useEffect)(() => { Se.current = Y }, [Y]); let tt = (0, Q.useRef)(null);
    (0, Q.useEffect)(() => { for (let e = Y.length - 1; e >= 0; --e) { let t = Y[e]; if (t.role === `assistant` && St(
          t)) { if (tt.current === t.id) return;
          tt.current = t.id, g.invalidateQueries({ queryKey: [`user-image-gallery`] }), g.refetchQueries({ queryKey: [
              `user-image-gallery`
            ], type: `active` }); return } } }, [Y, g]), (0, Q.useEffect)(() => { j && q.getState().isAgenticMode !==
        fe && q.getState().setIsAgenticMode(fe) }, [e, fe, j]), Gi({ chatId: e, userId: oe ?? o?.id, setUserLimits: x,
      openPaywallModal: ce, isSubscribedRef: _e, isCancelledRef: B, isScheduledToCancelRef: V, hasPowerPlanRef: ye,
      isSuperProRef: H, isTrialUserRef: ve, isTestUserRef: Pe, isAuthenticatedRef: be,
    teamId: u }); let { isTeamStreaming: nt } = mo({ chatId: e, chatIdRef: W, currentUserId: o?.id, transport: G,
      setMessages: J, setIsStreaming: m, enabled: !!u });
    ho({ chatId: e, chatIdRef: W, transport: G, setMessages: J, enabled: !!u }); let { handleOnFinishResearch: rt,
      processResearchSyncResponse: it } = Qa({ chatId: e, transport: G, messages: Y, chatIdRef: W, queryClient: g,
      teamId: u });
    (0, Q.useEffect)(() => { Re.current = rt }, [rt, Re]), (0, Q.useEffect)(() => { Ce.current = Ze }, [Ze]), (0, Q
      .useEffect)(() => { we.current = Ue === `streaming` }, [Ue]), Ri({ chatId: e, chatExists: a, messages: Y }), (0, Q
      .useEffect)(() => { m(Ue === `streaming`) }, [Ue, m]); let { hasSyncCompleted: at } = la({ chatId: e,
      autoResume: i && k, transport: G, queryClient: g, resumeStream: Ze, processResearchSyncResponse: it });
    Qi({ chatId: e, transport: G, queryClient: g }), ro({ chatId: e, transport: G }); let { textareaRef: ot,
      focusTextarea: st } = Na();
    io({ chatId: e, initialMessages: t, messages: Y, setMessages: J }), Ia({ chatId: e, messagesLength: Y.length,
      enabled: !s }), lo({ chatId: e, messages: Y, setMessages: J, isCurrentlyAuthenticated: O, isSessionPending: ne,
      tierRank: z || ge ? 3 : I && !L ? 2 : +!!L }); let { input: ct, setInput: lt } = Zt(), ut = (0, Q.useCallback)(
      e => { if (e.role === `user`) { let t = e.parts.filter(e => e.type === `text`).map(e => e.text).join(``);
          He({ text: t }); return } J(t => [...t, { id: Tn(), role: `assistant`, parts: e.parts }]) }, [He, J]
      ), { handleSubmitWithAuth: dt } = Ba({ chatId: e, chatIdRef: W, chatExists: a, userId: se, userName: C.name ?? o
        ?.name ?? null, userImage: C.image ?? o?.image ?? null, isSubscribed: I, input: ct, sendMessage: He,
      transport: G, queryClient: g, startTracking: me, hasTrackedProjectChatCreationRef: K, hasSyncCompleted: at,
      teamId: u, isCurrentlyAuthenticated: O, isSessionPending: ne, isFunnelLandingSurface: l, isServerAuthed: !!
        o && o.type !== `guest` }), { data: ft } = zt(e, { enabled: a }), pt = (0, Q.useMemo)(() => Array.isArray(ft
      ?.data) ? ft.data : go, [ft?.data]), { handleStop: mt } = Ra({ chatId: e, transport: G, setMessages: J,
      stopTracking: M }), { retryLastMessage: ht, removeRateLimitMessages: gt } = Fa({ chatId: e, setMessages: J,
      reload: We, isSubscribed: I, hasCreditsLeft: w?.hasCreditsLeft }), { attemptRecovery: _t } = po({ chatId: e,
      messages: Y, status: Ue, setMessages: J, enabled: i && !ne && k, transport: G }), vt = $a({ error: Qe,
      messages: Y, chatId: e }), yt = nt ? `streaming` : Ue, bt = yt === `streaming`, xt = [...Y].reverse().find(e =>
      e.role === `user`), Ct = xt?.author?.id ?? (typeof xt?.metadata?.userId == `string` ? xt.metadata.userId :
      void 0); return { messages: Y, input: ct, status: yt, isTeamStreaming: !!u && bt && !!Ct && !!o?.id && Ct !== o
        .id, error: vt, votes: pt, handleSubmitWithAuth: dt, setMessages: J, setInput: lt, append: ut, stop: mt,
      reload: We, experimental_resume: Ze, textareaRef: ot, focusTextarea: st, hasCreditsLeft: w?.hasCreditsLeft ?? !1,
      isSubscribed: I ?? !1, removeRateLimitMessages: gt, retryLastMessage: ht, attemptRecovery: _t, chatId: e,
      transport: G, hasSentLocally: Ge } },
  yo = e => Wa(e);
export { sa as a, aa as c, Tn as d, dn as f, ia as i, Ii as l, yo as n, ca as o, Da as r, oa as s, vo as t, ii as u };
