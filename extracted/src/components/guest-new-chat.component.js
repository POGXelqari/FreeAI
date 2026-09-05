/**
 * Source: https://use.ai/_next/static/chunks/guest-new-chat.component-DnE9bgPv.js
 * Module: guest-new-chat.component
 * Extracted & Beautified
 */

const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = [
  "_next/static/chunks/chat-surface.component-DOG9BiNn.js", "_next/static/chunks/rolldown-runtime-C0FnF6B9.js",
  "_next/static/chunks/framework-D-uKrMmN.js", "_next/static/chunks/vinext-CqpRraGS.js",
  "_next/static/chunks/useQuery-B3vkDNet.js", "_next/static/chunks/mutation-DO0ikfMC.js",
  "_next/static/chunks/thenable-BrrDvP6E.js", "_next/static/chunks/rest-api.provider-DFR1ot1R.js",
  "_next/static/chunks/hydration-BI7_jV4G.js", "_next/static/chunks/QueryClientProvider-DGxN9XtP.js",
  "_next/static/chunks/dynamic.service-BDdZlREf.js", "_next/static/chunks/dynamic-preload-chunks-C2tdlbzD.js",
  "_next/static/chunks/react-CWjhjU4R.js", "_next/static/chunks/NextIntlClientProvider-BP5AYJiO.js",
  "_next/static/chunks/queryOptions-Dfvzj6n2.js",
  "_next/static/chunks/better-auth-client-session.service-ercwbZKT.js",
  "_next/static/chunks/better-auth-client.service-Ck6mOMB1.js", "_next/static/chunks/env-C6AULCj5.js",
  "_next/static/chunks/recovery-marker.util-BHO296he.js", "_next/static/chunks/analytics.service-BIbiLKmC.js",
  "_next/static/chunks/freemium-funnel.util-D0KPcbFz.js",
  "_next/static/chunks/safe-session-storage.util-DN4NSHVM.js", "_next/static/chunks/gtm-DkKjcpHp.js",
  "_next/static/chunks/mixpanel-CkBALibP.js", "_next/static/chunks/user-data.provider-fGhNbbcZ.js",
  "_next/static/chunks/teams-D-JmxjA5.js", "_next/static/chunks/rest-api-DNPFxXXP.js",
  "_next/static/chunks/teams.mutation-C9duAdia.js", "_next/static/chunks/useMutation-DldRSjFA.js",
  "_next/static/chunks/subscription.model-Bs1FyJgo.js", "_next/static/chunks/user.model-CISYB7eF.js",
  "_next/static/chunks/use-has-mounted.hook-BZPIYb5B.js",
  "_next/static/chunks/workspace-scope.provider-Cm72CHah.js", "_next/static/chunks/react-D8-vnz5K.js",
  "_next/static/chunks/middleware-BT98JsiD.js", "_next/static/chunks/settings-cookie.util-C5vl4muy.js",
  "_next/static/chunks/js.cookie-LuQ0sRX_.js", "_next/static/chunks/cookie.interface-BM92z_O9.js",
  "_next/static/chunks/intl-5y7Gu4iP.js", "_next/static/chunks/BaseLink-DAgr-zci.js",
  "_next/static/chunks/query-DugiHe4Q.js", "_next/static/chunks/intl.constant-DpFKv8U4.js",
  "_next/static/chunks/chat.store-CVJElyGt.js", "_next/static/chunks/logout-teardown.service-BVsq4fds.js",
  "_next/static/chunks/report-client-error.util-Bq41AYxy.js",
  "_next/static/chunks/retry-chat-bridge.service-UVZ4pRxm.js",
  "_next/static/chunks/post-payment.store-jgy38Ijx.js", "_next/static/chunks/global.store-DsM3x4UJ.js",
  "_next/static/chunks/uuid.util-BB0yd8wz.js", "_next/static/chunks/v4-DDdyfk2q.js",
  "_next/static/chunks/new-chat.service-CIiqAd78.js", "_next/static/chunks/is-mobile.service-c24xKO50.js",
  "_next/static/chunks/dist-V17-Ndhz.js", "_next/static/chunks/initial-mobile.provider-DAAXBXtb.js",
  "_next/static/chunks/sidebar.store-CMHpt4Zm.js", "_next/static/chunks/teams.store-BUwcijNI.js",
  "_next/static/chunks/raw-history.util-43z6flYk.js", "_next/static/chunks/payment-modals.store-Ds_qXI-N.js",
  "_next/static/chunks/paywall.service-DJtJHTep.js", "_next/static/chunks/billing-CclPhhLo.js",
  "_next/static/chunks/billing.interface-DgJbHepV.js",
  "_next/static/chunks/use-paywall-variant.experiment.hook-DCrzgpR5.js",
  "_next/static/chunks/experiment-client.service-Dbg--_Jv.js",
  "_next/static/chunks/experiment.provider-CQRJZnpd.js", "_next/static/chunks/client-DWC7O25X.js",
  "_next/static/chunks/growthbook-server-to-client-analytics.component-CMkevCIi.js",
  "_next/static/chunks/use-feature-flag.hook-DJz-hOWd.js",
  "_next/static/chunks/freemium-funnel.store-B7BDrTBQ.js",
  "_next/static/chunks/connector-intl.provider-BHMUftuf.js", "_next/static/chunks/connectors.store-ta4ejFxC.js",
  "_next/static/chunks/connectors.mutation-DCZIwE-0.js",
  "_next/static/chunks/connectors-catalog.service-C2W0ZTIl.js",
  "_next/static/chunks/use-guest-sidebar-menu.hook-D4ZKIqpw.js", "_next/static/chunks/auth.store-CecpbI3z.js",
  "_next/static/chunks/site-route.interface-DlOSDxTR.js", "_next/static/chunks/locale-path.util-nU2-KrUb.js",
  "_next/static/chunks/paywall-intent.util-T2BKTtbQ.js", "_next/static/chunks/use-user.hook-DIvUDXD9.js",
  "_next/static/chunks/use-incognito-chat.hook-Dun56_qv.js", "_next/static/chunks/set-chat-model-DIyq3S5u.js",
  "_next/static/chunks/chat-key.constant-DXJEa87X.js", "_next/static/chunks/chat.model-oMaun5dH.js",
  "_next/static/chunks/unsupported-extensions-modal-Z1lQIqGw.js",
  "_next/static/chunks/unsupported-extensions-modal.component-Bhh2qHm9.js",
  "_next/static/chunks/react-client-DI5BViDH.js", "_next/static/chunks/button-B7ERdP8H.js",
  "_next/static/chunks/bundle-mjs-cJTHqqzI.js", "_next/static/chunks/loader-circle-C38mqwuC.js",
  "_next/static/chunks/createLucideIcon-CVSF7wvO.js", "_next/static/chunks/dist-DKq-7tPa.js",
  "_next/static/chunks/utils-DBS9-MOh.js", "_next/static/chunks/dialog-7Locadch.js",
  "_next/static/chunks/x-DWv_kCKr.js", "_next/static/chunks/dist-UOiSWAIU.js",
  "_next/static/chunks/dist-Bk3YTB5a.js", "_next/static/chunks/dist-DHTrxFRs.js",
  "_next/static/chunks/dist-wURgM5if.js", "_next/static/chunks/dist-DNAaWyma.js",
  "_next/static/chunks/dist-1ej2Hjrt.js", "_next/static/chunks/dist-CEdsmZbM.js",
  "_next/static/chunks/es2015-fuZyN7gw.js", "_next/static/chunks/dist-uRWxuiG0.js",
  "_next/static/chunks/model-catalog.provider-C5iwWYsc.js",
  "_next/static/chunks/use-is-freemium-funnel.hook-B8Epr2up.js",
  "_next/static/chunks/freemium-funnel.provider-AazaL16l.js", "_next/static/chunks/logout.store-DDMyOgQ2.js",
  "_next/static/chunks/use-freemium-funnel-gate.hook-sv-Z0STl.js",
  "_next/static/chunks/chat-error-boundary.component-CliwbGm7.js",
  "_next/static/chunks/chat-error-fallback.component-D1w-mCZ5.js",
  "_next/static/chunks/message-circle-BOQPxIlG.js", "_next/static/chunks/refresh-cw-BYxqWMSo.js",
  "_next/static/chunks/triangle-alert-DEiOK3PW.js", "_next/static/chunks/chunk-error.util-8lmmDUxL.js",
  "_next/static/chunks/mixpanel.hook-CmubyvVR.js", "_next/static/chunks/react-error-boundary-svh9Rmtm.js",
  "_next/static/chunks/chat-error-boundary-B2sQAs9v.js", "_next/static/chunks/chat.service-Czpxrkso.js",
  "_next/static/chunks/chat-history-Ck4B7fB_.js", "_next/static/chunks/useInfiniteQuery-BZkaaFaW.js",
  "_next/static/chunks/worker-auth.service-BtTnG2J5.js", "_next/static/chunks/project-key.constant-DL2-hOys.js",
  "_next/static/chunks/projects-Cijq-nE0.js", "_next/static/chunks/api-error-body.util-DJXtb-RF.js",
  "_next/static/chunks/team-chat.model-C0Jcmza6.js", "_next/static/chunks/chat-auth.util-CHugSHZw.js",
  "_next/static/chunks/show-toast.service-DZQBgdNF.js", "_next/static/chunks/dist-C8KK_I18.js",
  "_next/static/chunks/check-CWA6FeXs.js", "_next/static/chunks/circle-alert-CjKwzCDt.js",
  "_next/static/chunks/project.store-CVum8aS0.js", "_next/static/chunks/share-chat-modal.store-x6SY0kzg.js",
  "_next/static/chunks/review-trigger.store-C2KfqDZw.js", "_next/static/chunks/limits.interface-CnG5W0wJ.js",
  "_next/static/chunks/shallow-CKWb1b-W.js", "_next/static/chunks/chat-model-cookie.util-BFNaMDUF.js",
  "_next/static/chunks/chat-landing-variant.provider-CFxvAtmo.js",
  "_next/static/chunks/chat-messages-BcFaGJ89.js", "_next/static/chunks/chat.util-JX7uXMb9.js",
  "_next/static/chunks/connectors-BU3y6DIC.js",
  "_next/static/chunks/connector-catalog-lazy.service-BSf-5rRs.js",
  "_next/static/chunks/connectors.service-BvuH6FUI.js", "_next/static/chunks/subscription-C_QA18f9.js",
  "_next/static/chunks/connector-icon.component-CDOi5dKA.js", "_next/static/chunks/registries-BHxkc4G_.js",
  "_next/static/chunks/paywall-prewarm.service-BUgoToJW.js", "_next/static/chunks/skeleton-CQ_ju0jp.js",
  "_next/static/chunks/connector-search-input.component-DgBAGGEg.js", "_next/static/chunks/search-9wRnUxym.js",
  "_next/static/chunks/input-Cn8pMAH2.js", "_next/static/chunks/connectors.hook-BS1NEVLs.js",
  "_next/static/chunks/catalog-locale-C1DasskV.js",
  "_next/static/chunks/_rolldown_dynamic_import_helper-CIAwlR2T.js",
  "_next/static/chunks/logo-spinner-CYcNfjAa.js",
  "_next/static/chunks/ensure-connector-registrations.service-8f4euYJb.js",
  "_next/static/chunks/connectors-page-skeleton.component-Cgf0XRxA.js",
  "_next/static/chunks/connectors-list-skeletons-BzT4K5F7.js",
  "_next/static/chunks/mobile-page-header.component-rYkBNUPE.js",
  "_next/static/chunks/is-locale-arabic.util-B4BIdGa2.js", "_next/static/chunks/menu-DmuxtmLj.js",
  "_next/static/chunks/mobile-header-logo-BBTsGGx9.js", "_next/static/chunks/useai-CiXQTOJ8.js",
  "_next/static/chunks/useai-white-BcU4k_RY.js", "_next/static/chunks/mobile-drawer.provider-D6C04T1C.js",
  "_next/static/chunks/guest-sidebar-menu.store-D01MKXdQ.js",
  "_next/static/chunks/mobile-page-header-Bw-GZZb2.js", "_next/static/chunks/use-drag-drop.hook-CZDUpSwy.js",
  "_next/static/chunks/chat-uploads.util-DAI5F9yJ.js", "_next/static/chunks/shared-chat.util-ibfGSpqv.js",
  "_next/static/chunks/image-modal.service-b_eGGRq4.js", "_next/static/chunks/chat-route.util-DIaoD1cB.js",
  "_next/static/chunks/payment-success-token.util-jBMumW46.js",
  "_next/static/chunks/limit-banner.component-BUCLCS78.js", "_next/static/chunks/copy-DQkd77kV.js",
  "_next/static/chunks/download-10KlyRTr.js", "_next/static/chunks/gem-C2zzRNeU.js",
  "_next/static/chunks/thumbs-down-BB5zC9AZ.js", "_next/static/chunks/thumbs-up-DKXjhGls.js",
  "_next/static/chunks/copy-formatted.util-CTbr3TnW.js", "_next/static/chunks/first-party-url.util-CX2n5k9d.js",
  "_next/static/chunks/file-upload.constant-B3pVoarn.js", "_next/static/chunks/markdown-D4trp08_.js",
  "_next/static/chunks/lib-BevNV-w5.js", "_next/static/chunks/space-separated-tokens-DCTRfXYj.js",
  "_next/static/chunks/lib-Wn4o-8VE.js", "_next/static/chunks/micromark-factory-space-_27fCx5x.js",
  "_next/static/chunks/chunk-BO2N2NFS-nEkVR65V.js", "_next/static/chunks/zwitch-C6wXhqa8.js",
  "_next/static/chunks/web-namespaces-CdeS6bYV.js", "_next/static/chunks/marked.esm-BIum_moM.js",
  "_next/static/chunks/image-BISkV0j2.js", "_next/static/chunks/source-url.util-BdxiftQU.js",
  "_next/static/chunks/tooltip-WNS8Gl08.js", "_next/static/chunks/dist-jciTo-QL.js",
  "_next/static/chunks/floating-ui.react-dom-xN1K-ASj.js", "_next/static/chunks/dist-BbbTHrHw.js",
  "_next/static/chunks/text.util-C2hCXdg-.js", "_next/static/chunks/errors.util-PrA6A1BU.js",
  "_next/static/chunks/tool-call.util-CT0TwyUo.js", "_next/static/chunks/tool-call-DnrtUX_d.js",
  "_next/static/chunks/tool-title-row-V5xywsuK.js", "_next/static/chunks/circle-x-D9GHhu8D.js",
  "_next/static/chunks/hand-70avRRj8.js", "_next/static/chunks/proxy-B_99oKrn.js",
  "_next/static/chunks/AnimatePresence-wBEFtpNn.js", "_next/static/chunks/tool-call.constant-BE7zFL0Z.js",
  "_next/static/chunks/base-tool-compact-view-Uz1Y09Jz.js", "_next/static/chunks/chevron-down-CY8S3ZfR.js",
  "_next/static/chunks/circle-check-ByDPLo07.js", "_next/static/chunks/tool-badge-BgZkxde0.js",
  "_next/static/chunks/tool-fold-CVCSm03z.js", "_next/static/chunks/dist-DwEGnbvV.js",
  "_next/static/chunks/dist-DbhSOkZC.js", "_next/static/chunks/tool-result-card-_tL3wovH.js",
  "_next/static/chunks/tool-view-error-DGhE8NvC.js",
  "_next/static/chunks/use-track-connector-tool-result.hook-CDtqC3Wy.js",
  "_next/static/chunks/code-workspace.constant-C6RTxYpf.js", "_next/static/css/limit-banner.CrXLBPRC.css",
  "_next/static/chunks/use-display-user.hook-sY0IkKdE.js",
  "_next/static/chunks/guest-limit-retry.util-B5MoFEDH.js",
  "_next/static/chunks/use-chat-input.hook-BgXo6Yt2.js", "_next/static/chunks/model-selector-CHLHhIlL.js",
  "_next/static/chunks/use-image-model-label.hook-Dhr0z0rd.js",
  "_next/static/chunks/open-after-viewport-settle.util-BfKU5lGX.js",
  "_next/static/chunks/composer-modes.provider-C-48A9eP.js",
  "_next/static/chunks/model-selector.util-s4hzcUFp.js", "_next/static/chunks/formbricks.provider-DQWvTNkK.js",
  "_next/static/chunks/pending-free-message-query.util-C2HYAyae.js",
  "_next/static/chunks/pending-funnel-query.util-CEUv-foO.js", "_next/static/chunks/geo.service-BPKKTJpo.js",
  "_next/static/chunks/use-file-upload.hook-BC4f261h.js",
  "_next/static/chunks/image-compression.util-dcofMV1t.js",
  "_next/static/chunks/use-r2-uppy-upload.hook-CKKwVYPa.js", "_next/static/chunks/file-upload-BQohwt_Z.js",
  "_next/static/chunks/app.constant-CQOe5N6O.js", "_next/static/chunks/use-text-attachment.hook-BoWnMC2Z.js",
  "_next/static/chunks/use-root-chat-url-sync.hook-BLskOQaA.js",
  "_next/static/chunks/analytics-hooks.service-fJFOoVJi.js",
  "_next/static/chunks/use-stable-chat-id.hook-CMipc6wW.js", "_next/static/chunks/existing-chat-DX8nfOwY.js",
  "_next/static/chunks/chat-scroller-DC59GpV8.js", "_next/static/chunks/arrow-right-C1xqmvO2.js",
  "_next/static/chunks/chevron-left-BXhKvLzg.js", "_next/static/chunks/chevron-right-Dw6SaFc4.js",
  "_next/static/chunks/chat-message-list.component-CbziQKox.js", "_next/static/chunks/book-open-B-FzQLjQ.js",
  "_next/static/chunks/clock-CdQcsVHr.js", "_next/static/chunks/database-DOAUv0Jr.js",
  "_next/static/chunks/eye-PysoHCpr.js", "_next/static/chunks/file-search-lQ9PBE5F.js",
  "_next/static/chunks/globe-D1MVs8b6.js", "_next/static/chunks/grid-2x2-Byt2HR1E.js",
  "_next/static/chunks/plug-2-CsRLclIi.js", "_next/static/chunks/share-DMOjRmYc.js",
  "_next/static/chunks/square-terminal-B3Tb4SCU.js", "_next/static/chunks/zap-D0c7pmdJ.js",
  "_next/static/chunks/accordion-CH6W-R4l.js", "_next/static/chunks/image-filename.util-xDLyJO99.js",
  "_next/static/chunks/file-braces-BH8FsqEY.js", "_next/static/chunks/file-code-BZ40hobt.js",
  "_next/static/chunks/file-image-CmHcqKSH.js", "_next/static/chunks/file-spreadsheet-BwFAp_jL.js",
  "_next/static/chunks/file-text-B5ZoLW_G.js", "_next/static/chunks/file-CNVVglqj.js",
  "_next/static/chunks/open-untrusted-url.service-CTLtpQTL.js",
  "_next/static/chunks/search-files.service-DosvILK6.js", "_next/static/chunks/web-search.service-CDjCFUTy.js",
  "_next/static/chunks/extract-pages.service-DmpLTJv_.js",
  "_next/static/chunks/knowledge-base.service-B_Q1CHt4.js",
  "_next/static/chunks/preview-text-attachment.component-DbCMOX6e.js",
  "_next/static/chunks/clarifying-questions.component-RAZ_vJiV.js",
  "_next/static/chunks/message-annotations.component-Ddui9kJl.js", "_next/static/chunks/progress-C8veGdxq.js",
  "_next/static/chunks/research-sidebar.component-DU1Q8mWe.js", "_next/static/chunks/external-link-WpraYaLc.js",
  "_next/static/chunks/lightbulb-zKN5nd0C.js", "_next/static/chunks/pen-line-3w9tz83Q.js",
  "_next/static/chunks/logo-icon-C5Mo55YO.js", "_next/static/chunks/logo-icon-white-QiZ2Ybc-.js",
  "_next/static/chunks/drawer-CrlfHJuB.js", "_next/static/chunks/dist-CQDSGHYK.js",
  "_next/static/chunks/cancel-2J3UTq9u.js", "_next/static/chunks/tabs-ClZsxHJQ.js",
  "_next/static/chunks/dist-Bwy9E6PB.js", "_next/static/chunks/pencil-MSXy1_D6.js",
  "_next/static/chunks/use-auth-known.hook-C1WWcve_.js",
  "_next/static/chunks/initial-auth-state.provider-DUS-CXUE.js",
  "_next/static/chunks/web-search-sidebar-CzJJxchz.js", "_next/static/chunks/mobile-bottom-sheet-CB1EX72X.js",
  "_next/static/chunks/spinner-YtFB_xBA.js", "_next/static/chunks/badge-fH5lAmij.js",
  "_next/static/chunks/element-block-size.util-DdtCtvot.js", "_next/static/chunks/rotate-ccw-CYwKaotl.js",
  "_next/static/chunks/use-message-retry.hook-CIuW3J-g.js",
  "_next/static/chunks/file-preview-sidebar-CnYAU3kA.js",
  "_next/static/chunks/generated-file-preview-JA6nsjI0.js", "_next/static/chunks/code-xml-CEzC-2eb.js",
  "_next/static/chunks/image-I9wsg_Y3.js", "_next/static/chunks/generated-file-preview.util-CVWrw-WK.js",
  "_next/static/chunks/add-to-menu-B3vKdHmj.js", "_next/static/chunks/collections.mutation-DOJTt4ww.js",
  "_next/static/chunks/folder-plus-CyKNEo-_.js", "_next/static/chunks/folder-BsW44kWZ.js",
  "_next/static/chunks/plus-goXwnRLz.js", "_next/static/chunks/dropdown-menu-D6_Lrewr.js",
  "_next/static/chunks/circle-BS-Vzwf7.js", "_next/static/chunks/collections-FPD17lmm.js",
  "_next/static/chunks/files-D6piZW1u.js", "_next/static/chunks/use-auth-click.hook-BHhXr5wJ.js",
  "_next/static/chunks/default-item-modal-Cgolk8p6.js", "_next/static/chunks/input-DC6eLh0y.js",
  "_next/static/chunks/mic-Cuoatejj.js", "_next/static/chunks/bell-off-BdKAd_Xb.js",
  "_next/static/chunks/bell-ring-C3Xg6lU_.js", "_next/static/chunks/paperclip-D_U7vKBN.js",
  "_next/static/chunks/square-CaSpHOTs.js", "_next/static/chunks/use-stream-active.hook-CJjUFxyg.js",
  "_next/static/chunks/image-model-cookie.util-QzskssRL.js", "_next/static/chunks/image-C4T3aCpn.js",
  "_next/static/chunks/use-immediate-signup.hook-6A_wzI3j.js",
  "_next/static/chunks/auth-modal.service-Cqqf3TRB.js",
  "_next/static/chunks/use-history-backed-flag.hook-C0Nr0kvF.js",
  "_next/static/chunks/use-paid-plan-access.hook-BceiKiVZ.js",
  "_next/static/chunks/web-search-button-B4NHDBuA.js", "_next/static/chunks/palette-trEm3e1X.js",
  "_next/static/chunks/telescope-D-_-rZUQ.js", "_next/static/chunks/blur-keyboard.service-Cw_wHZxR.js",
  "_next/static/chunks/image-landing-prefs.provider-CWWXUPpk.js",
  "_next/static/chunks/fullscreen-drag-drop-C2INKCCY.js", "_next/static/chunks/new-chat-8eYq6laz.js",
  "_next/static/chunks/building-2-Boel4UC0.js", "_next/static/chunks/footer.component-CiKJBwzY.js",
  "_next/static/chunks/select-language.service-K5m-X5CX.js",
  "_next/static/chunks/use-help-href.hook-CLIRRwj-.js",
  "_next/static/chunks/use-post-auth-guest-hold.hook-DKAjN6Dj.js",
  "_next/static/chunks/is-landscape.service-DbVHFBVO.js", "_next/static/chunks/footer-CjOVPpm1.js",
  "_next/static/chunks/greeting-BMnEPWM2.js", "_next/static/chunks/arrow-up-right-u72iYOnW.js",
  "_next/static/chunks/use-traffic-detection.hook-CKzLJPTv.js",
  "_next/static/chunks/deep-research-chats-yakl6sS1.js",
  "_next/static/chunks/deep-research-chats.model-Bm4CwR0q.js",
  "_next/static/chunks/prompt-suggestions.component-BiXd4H0L.js",
  "_next/static/chunks/use-visibility-calculator.hook-DIRo381x.js", "_next/static/chunks/magnifier-CHjDndnj.js",
  "_next/static/chunks/mobile-chat-header.component-BZlH-Boh.js",
  "_next/static/chunks/rename-item-modal-2hixoasb.js", "_next/static/chunks/new-chat-DRFSeAfv.js",
  "_next/static/chunks/chat-actions-CIThz8ZM.js",
  "_next/static/chunks/download-chat-button.service-CctxGjXF.js",
  "_next/static/chunks/share-chat-invite.api-kdUDCneo.js",
  "_next/static/chunks/incognito-chat-enabled-BE8jAbsG.js", "_next/static/chunks/rename-chat-modal-CffMN_RG.js",
  "_next/static/chunks/team-chats-BbJk-q5m.js", "_next/static/chunks/header-CVRMnOaC.js",
  "_next/static/chunks/collection-selector-dropdown-C7EVQF2L.js",
  "_next/static/chunks/submenu-trigger-placeholder-B5opOeFo.js",
  "_next/static/chunks/create-collection-row-p1YRKBiw.js", "_next/static/chunks/file-type-badge-BDE7nXJe.js",
  "_next/static/chunks/use-upload-ring-animation.hook-DGzto3vF.js", "_next/static/chunks/checkbox-ByRkpRmx.js",
  "_next/static/chunks/minus-CaOaHXwL.js", "_next/static/chunks/file.util-Cw1PWQrJ.js",
  "_next/static/chunks/chat-surface-Ss7pWzJr.js"
]))) => i.map(i => d[i]);
import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { nt as r, rt as i, tt as a } from "./vinext-CqpRraGS.js";
import { r as o } from "./react-CWjhjU4R.js";
import { t as s } from "./dynamic.service-BDdZlREf.js";
import { n as c, t as l } from "./mic-Cuoatejj.js";
import { t as u } from "./camera-C34auD4V.js";
import { t as d } from "./chevron-down-CY8S3ZfR.js";
import { t as f } from "./globe-D1MVs8b6.js";
import { t as p } from "./image-I9wsg_Y3.js";
import { t as m } from "./loader-circle-C38mqwuC.js";
import { t as ee } from "./footer.component-CiKJBwzY.js";
import { t as h } from "./palette-trEm3e1X.js";
import { t as g } from "./plus-goXwnRLz.js";
import { n as _ } from "./react-client-DI5BViDH.js";
import { n as te } from "./better-auth-client-session.service-ercwbZKT.js";
import { m as ne } from "./freemium-funnel.util-D0KPcbFz.js";
import { t as re } from "./safe-session-storage.util-DN4NSHVM.js";
import { i as v } from "./mixpanel-CkBALibP.js";
import { t as y } from "./button-B7ERdP8H.js";
import { t as b } from "./utils-DBS9-MOh.js";
import { n as ie } from "./initial-mobile.provider-DAAXBXtb.js";
import { r as x, t as ae } from "./is-mobile.service-c24xKO50.js";
import { a as S, c as C, i as w, l as T, n as E, o as D, s as oe, t as se } from "./dropdown-menu-D6_Lrewr.js";
import { r as O } from "./chat.store-CVJElyGt.js";
import { n as k } from "./post-payment.store-jgy38Ijx.js";
import { t as ce } from "./auth.store-CecpbI3z.js";
import { t as A } from "./files-D6piZW1u.js";
import { t as le } from "./use-auth-click.hook-BHhXr5wJ.js";
import { a as ue, i as j, r as M, t as N } from "./drawer-CrlfHJuB.js";
import { a as de } from "./model-catalog.provider-C5iwWYsc.js";
import { t as fe } from "./use-guest-sidebar-menu.hook-D4ZKIqpw.js";
import { t as pe } from "./use-auth-known.hook-C1WWcve_.js";
import { t as me } from "./use-post-auth-guest-hold.hook-DKAjN6Dj.js";
import { n as he } from "./initial-auth-state.provider-DUS-CXUE.js";
import { n as ge, r as _e } from "./chat-landing-variant.provider-CFxvAtmo.js";
import { n as ve, t as ye } from "./blur-keyboard.service-Cw_wHZxR.js";
import { t as be } from "./is-landscape.service-DbVHFBVO.js";
import { i as xe, t as Se } from "./model-selector.util-s4hzcUFp.js";
import "./footer-CjOVPpm1.js";
import { t as P } from "./attachment-CeJdpRrU.js";
import { o as Ce, r as we, t as Te } from "./use-root-chat-url-sync.hook-BLskOQaA.js";
import { n as Ee, t as De } from "./chat-route.util-DIaoD1cB.js";
import { t as Oe } from "./use-chat-input.hook-BgXo6Yt2.js";
import { n as ke, r as Ae } from "./model-selector-CHLHhIlL.js";
import { i as je } from "./pending-free-message-query.util-C2HYAyae.js";
import { r as Me, t as Ne } from "./use-immediate-signup.hook-6A_wzI3j.js";
import { t as Pe } from "./auth-modal.service-Cqqf3TRB.js";
import { a as Fe, i as F, n as Ie, r as Le, t as Re } from "./greeting-BMnEPWM2.js";
import { t as ze } from "./use-traffic-detection.hook-CKzLJPTv.js";
import { n as I, t as L } from "./use-visibility-calculator.hook-DIRo381x.js";
import { t as Be } from "./mobile-chat-header.component-BZlH-Boh.js";
import "./header-CVRMnOaC.js";
import { t as R } from "./chat-actions-dropdown.service-CGv07yp5.js";
var z = e(t(), 1),
  B = (e, t) => { e === v.CREATE_IMAGE_BUTTON && k(), ce.getState().openSignInModal(e, t) },
  V = n(),
  H = `h-5 w-5 text-foreground`,
  U =
  `hover:bg-muted/50 active:bg-muted flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left transition-colors`,
  Ve = () => { let e = _(`Chat`),
      t = _(`FilesManagement`),
      n = B,
      r = [{ key: `web-search`, icon: (0, V.jsx)(f, { className: H, strokeWidth: 1.5 }), label: e(`web_search_button`),
        description: e(`drawer_web_search_description`), onSelect: () => { R(`web_search_button`, `web_search_button`,
            null), n(v.WEB_SEARCH_BUTTON) } }, { key: `photos`, icon: (0, V.jsx)(p, { className: H,
          strokeWidth: 1.5 }), label: e(`drawer_gallery_button`), description: e(`drawer_gallery_description`),
        onSelect: () => n(v.ATTACHMENTS_BUTTON) }, { key: `camera`, icon: (0, V.jsx)(u, { className: H,
          strokeWidth: 1.5 }), label: e(`drawer_camera_button`), description: e(`drawer_camera_description`),
        onSelect: () => n(v.ATTACHMENTS_BUTTON) }, { key: `files`, icon: (0, V.jsx)(P, { className: H }), label: e(
          `drawer_files_button`), description: e(`drawer_files_description`), onSelect: () => { R(`attach_button`,
            `attach_button`, null), n(v.ATTACHMENTS_BUTTON) } }, { key: `collection`, icon: (0, V.jsx)(
        A, { className: H, strokeWidth: 1.5 }), label: t(`collections`), description: e(
          `drawer_collection_description`), onSelect: () => n(v.NEW_COLLECTION_BUTTON, `/files?create=true`) },
      { key: `create-image`, icon: (0, V.jsx)(h, { className: H, strokeWidth: 1.5 }), label: e(`create_image_button`),
        description: e(`drawer_create_image_description`), onSelect: () => { R(`create_image_button`,
            `create_image_button`, null), n(v.CREATE_IMAGE_BUTTON) } }]; return (0, V.jsxs)(N, { onOpenChange: e => e &&
        void ye(), children: [(0, V.jsx)(ue, { asChild: !0, children: (0, V.jsx)(y, { "aria-label": e(
            `chat_input_more_actions_label`),
          className: `relative h-9 min-h-0 w-9 min-w-0 border border-transparent transition-all duration-300`, "data-testid": `guest-actions-menu`,
          onPointerDown: e => e.preventDefault(), size: `icon`, type: `button`, variant: `ghost`,
          children: (0, V.jsx)(g, { className: `dark:text-foreground h-5! w-5!`, strokeWidth: 1.5 }) }) }), (0,
        V.jsxs)(
      M, { className: `bg-paper h-[420px] max-h-[calc(100dvh-50px)] rounded-t-[20px] border-0 px-4 pb-[15px] dark:border-0`,
        children: [(0, V.jsx)(j, { className: `sr-only`, children: e(`drawer_title`) }), (0, V.jsx)(
        `div`, { className: `flex flex-col gap-0.5 py-2`, children: r.map(e => (0, V.jsxs)(
          `button`, { className: U, onClick: e.onSelect, type: `button`, children: [(0, V.jsx)(
              `div`, { className: `bg-muted flex h-9 w-9 shrink-0 items-center justify-center rounded-full`,
                children: e.icon }), (0, V.jsxs)(
            `div`, { className: `flex flex-1 flex-col gap-0.5`, children: [(0, V.jsx)(
                `span`, { className: `text-foreground text-sm font-semibold`,
                  children: e.label }), (0, V.jsx)(
                `span`, { className: `text-xs text-[#A4A4A4]`, children: e
                  .description })] })] }, e.key)) })] })] }) },
  He = () => { let e = _(`Chat`),
      t = _(`AttachmentsButton`),
      n = _(`FilesManagement`),
      r = x(),
      i = `h-[1.08rem] w-[1.08rem] shrink-0 text-[#0d0d0d] dark:text-foreground`,
      a =
      `text-dark dark:text-foreground cursor-pointer gap-2 rounded-xl border-0 border-transparent px-2 py-1.5 text-[0.88rem] font-normal antialiased`,
      o = B; return r ? (0, V.jsx)(Ve, {}) : (0, V.jsxs)(se, { children: [(0, V.jsx)(T, { asChild: !0, children: (0, V
          .jsx)(y, { "aria-label": e(`chat_input_more_actions_label`),
          className: `relative h-9 min-h-0 w-9 min-w-0 border border-transparent transition-all duration-300`, "data-testid": `guest-actions-menu`,
          size: `icon`, type: `button`, variant: `ghost`, children: (0, V.jsx)(
          g, { className: `dark:text-foreground h-5! w-5!`, strokeWidth: 1.5 }) }) }), (0, V.jsxs)(
      E, { align: `start`,
        className: `border-border bg-paper flex w-auto min-w-fit flex-col gap-1 border p-1`, side: `bottom`,
        children: [(0, V.jsxs)(w, { className: a, onSelect: e => { e.preventDefault(), R(`attach_button`,
                `attach_button`, null), o(v.ATTACHMENTS_BUTTON) }, children: [(0, V.jsx)(
            P, { className: i }), (0, V.jsx)(
            `span`, { className: `text-[0.88rem] font-normal antialiased`, children: t(
                `tooltip_attach_file`) })] }), (0, V.jsxs)(D, { children: [(0, V.jsxs)(
            C, { className: `${a} dark:data-[state=open]:bg-default-100 data-[state=open]:bg-gray-50`,
              children: [(0, V.jsx)(A, { className: i, strokeWidth: 1.5 }), (0, V.jsx)(
              `span`, { className: `text-[0.88rem] font-normal antialiased`, children: n(
                  `add_files`) })] }), (0, V.jsx)(
            oe, { className: `border-border bg-paper border p-1`, sideOffset: 5, children: (0, V
                .jsxs)(w, { className: a, onSelect: e => { e.preventDefault(), o(v
                    .NEW_COLLECTION_BUTTON, `/files?create=true`) }, children: [(0, V.jsx)(
                g, { className: i }), (0, V.jsx)(
                `span`, { className: `text-[0.88rem] font-normal antialiased`,
                  children: n(`create_new_collection`) })] }) })] }), (0, V.jsx)(S, { className: `my-1` }),
          (0, V.jsxs)(w, { className: a, onSelect: e => { e.preventDefault(), R(`create_image_button`,
                `create_image_button`, null), o(v.CREATE_IMAGE_BUTTON) }, children: [(0, V.jsx)(
            h, { className: i, strokeWidth: 1.6 }), (0, V.jsx)(
            `span`, { className: `text-[0.88rem] font-normal antialiased`, children: e(
                `create_image_button`) })] }), (0, V.jsxs)(w, { className: a, onSelect: e => { e
                .preventDefault(), R(`web_search_button`, `web_search_button`, null), o(v
                  .WEB_SEARCH_BUTTON) }, children: [(0, V.jsx)(f, { className: i, strokeWidth: 1.6 }), (0,
              V.jsx)(`span`, { className: `text-[0.88rem] font-normal antialiased`, children: e(
                `web_search_button`) })] })
        ] })] }) },
  W = 1e3,
  G = 400,
  K = 250,
  q = () => { if (ve(K)) return !1; let e = document.activeElement; return !e || e === document.body },
  Ue = e => { let { findComposer: t, isAbandoned: n, budgetMs: r = W, settleMs: i = G } = e, a = performance.now() + r,
      o = 0, s = null, c = () => { if (n?.()) return; let e = t(),
          r = performance.now(); if (e && document.activeElement === e) { if (s ??= r, r - s >= i) return;
          o = requestAnimationFrame(c); return } if (q()) { if (e) { e.focus(); let t = e.value.length;
            e.setSelectionRange(t, t), s ??= performance.now() } r >= a || (o = requestAnimationFrame(
        c)) } }; return c(), () => cancelAnimationFrame(o) },
  We = e => { let { isMobile: t, onSelect: n, onSeeMore: r } = e, i = _(`PromptSuggestions`), a = I(), o = (0, z.useRef)
      (null), { visibleCategories: s, hasMore: c, measureRef: l } = L({ categories: a, containerRef: o, isMobile: t }),
      u = t ? a : s; return (0, V.jsxs)(`div`, { className: `relative hidden min-h-[48px] w-full px-0`, ref: o,
      children: [!t && (0, V.jsxs)(
      `div`, { className: `pointer-events-none invisible absolute top-0 left-[-9999px] flex flex-nowrap gap-2`,
        ref: l, children: [a.map(e => (0, V.jsx)(`div`, { className: `shrink-0`, children: (0, V.jsxs)(
          y, { size: `chip`, tightWidth: !0, variant: `chip`, children: [(0, V.jsx)(e
            .icon, { className: `h-4 w-4 shrink-0` }), (0, V.jsx)(
            `span`, { className: `whitespace-nowrap`, children: e.label })] }) }, `measure-${e.key}`)), (
          0, V.jsx)(`div`, { className: `shrink-0`, children: (0, V.jsx)(y, { size: `chip`, tightWidth: !
              0, variant: `chip`, children: (0, V.jsx)(`span`, { className: `whitespace-nowrap`,
              children: `+ ${i(`ps_see_more`)}` }) }) })] }), (0, V.jsxs)(
      `div`, { className: `hide-scrollbar mobile:justify-start mobile:max-h-none mobile:flex-nowrap mobile:gap-1 mobile:overflow-x-auto flex max-h-11 flex-wrap justify-center gap-2 overflow-hidden px-1 pt-0 pb-2`,
        children: [u.map(e => (0, V.jsx)(`div`, { className: `shrink-0`, children: (0, V.jsxs)(
        y, { onClick: () => n(e.key, e.textAutofill?.trim() || e.label), size: `chip`, tightWidth:
              !0, variant: `chip`, children: [(0, V.jsx)(e
            .icon, { className: `h-4 w-4 shrink-0` }), (0, V.jsx)(
            `span`, { className: `whitespace-nowrap`, children: e.label })] }) }, e.key)), !t && c && (0,
          V.jsx)(`div`, { className: `shrink-0`, children: (0, V.jsx)(y, { onClick: r, size: `chip`,
            tightWidth: !0, variant: `chip`, children: (0, V.jsx)(
            `span`, { className: `whitespace-nowrap`, children: `+ ${i(`ps_see_more`)}` }) }) })] })] }) };
i();
var Ge = [],
  J = null,
  Ke = () => (J ??= r(() => import(`./chat-surface.component-DOG9BiNn.js`).then(e => e.n), __vite__mapDeps([0, 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
    33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
    60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86,
    87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
    111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132,
    133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154,
    155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176,
    177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198,
    199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220,
    221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242,
    243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264,
    265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286,
    287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308,
    309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330,
    331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352,
    353
  ])), J),
  Y = null,
  qe = () => (Y ??= r(() => import(`./existing-chat-DX8nfOwY.js`).then(e => e.t), __vite__mapDeps([238, 1, 2, 88, 239,
    85, 86, 87, 89, 90, 240, 127, 241, 242, 243, 3, 117, 4, 5, 6, 7, 8, 9, 10, 11, 118, 14, 26, 17, 15, 16, 18,
    119, 44, 80, 43, 244, 206, 199, 200, 201, 84, 12, 202, 203, 204, 205, 128, 207, 197, 143, 144, 245, 172, 246,
    173, 247, 248, 249, 250, 251, 147, 252, 253, 175, 176, 92, 254, 19, 20, 21, 22, 23, 24, 91, 52, 93, 94, 95,
    96, 97, 98, 99, 100, 101, 125, 126, 51, 31, 53, 42, 33, 34, 36, 37, 45, 46, 131, 47, 73, 74, 75, 41, 76, 56,
    57, 178, 179, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 13, 38, 39, 40, 69, 70, 28, 71, 139, 255, 210, 211,
    189, 180, 181, 182, 183, 184, 185, 186, 187, 188, 190, 191, 192, 193, 194, 137, 138, 140, 25, 27, 29, 30, 32,
    35, 141, 132, 142, 145, 146, 148, 149, 150, 151, 152, 153, 154, 155, 156, 54, 157, 158, 159, 160, 161, 77, 72,
    78, 162, 163, 164, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 120, 121, 122, 123, 124, 129, 48, 49, 50,
    55, 130, 106, 103, 104, 105, 102, 133, 134, 135, 79, 81, 136, 165, 166, 167, 168, 169, 170, 171, 174, 177,
    195, 196, 198, 208, 209, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228,
    229, 230, 231, 232, 233, 234, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271,
    272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293,
    294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315,
    316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326
  ])), Y),
  X = null,
  Je = () => (X ??= r(() => import(`./prompt-suggestions.component-BiXd4H0L.js`).then(e => e.n), __vite__mapDeps([341,
    1, 2, 84, 12, 19, 3, 17, 20, 21, 22, 23, 25, 4, 5, 6, 7, 8, 9, 10, 11, 26, 27, 28, 29, 30, 15, 16, 18, 31, 24,
    32, 33, 34, 35, 36, 37, 85, 86, 87, 88, 89, 90, 51, 52, 53, 42, 43, 44, 45, 46, 202, 342, 306, 71, 143, 144,
    153, 138, 68, 13, 38, 39, 40, 41, 69, 14, 70, 139, 140, 125, 126, 127, 128, 92, 141, 132, 142, 145, 146, 147,
    148, 149, 150, 151, 152, 154, 155, 156, 54, 47, 73, 74, 75, 76, 56, 157, 158, 159, 160, 161, 77, 72, 57, 78,
    162, 163, 164, 317, 343
  ])), X),
  Z = null,
  Ye = () => (Z ??= Ae(), Z),
  Q = null,
  Xe = () => (Q ??= r(() => import(`./collection-selector-dropdown-C7EVQF2L.js`).then(e => e.t), __vite__mapDeps([354,
    1, 2, 3, 301, 88, 84, 12, 355, 242, 90, 86, 306, 356, 299, 4, 5, 6, 7, 8, 9, 10, 11, 28, 26, 17, 302, 15, 16,
    18, 19, 20, 21, 22, 23, 24, 25, 27, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
    73, 74, 75, 76, 56, 305, 58, 59, 60, 47, 57, 61, 62, 63, 64, 65, 66, 67, 357, 358, 359, 127, 360, 89, 94, 95,
    97, 101, 194, 361, 257, 258, 259, 260, 261, 262
  ])), Q),
  Ze = () => { if (typeof navigator > `u`) return !1; let e = (navigator.maxTouchPoints ?? 0) > 0,
      t = window.screen.width <= 649 || window.screen.height <= 649; return e || t },
  Qe = () => { if (typeof navigator > `u`) return !1; let e = navigator.connection; return e ? e.saveData ? !0 : e
      .effectiveType === `slow-2g` || e.effectiveType === `2g` : !1 },
  $ = e => { let { chatId: t, initialChatModel: n, initialVisibilityType: r, user: i, initialModelDisplayName: a } = e,
    s = ae(ie()), u = be(), { input: f, setInput: p } = Oe(), m = _(`Chat`), h = o(), { isFreeFirstMessageEnabled: g } =
      Me(), x = ge(), { autoModelSlug: S, isAutoModelParticipant: C } = de(), { handleClick: w, isAuthenticated: T } =
      le({ source: v.MODEL_SELECTOR }), E = Se({ isAuthenticated: T, landingVariant: x }), D = Pe(), oe =
    he(), { status: se } = te(), k = pe(oe, se, T), ce = (0, z.useRef)(null), [A, ue] = (0, z.useState)(!1), [j, M] = (
        0, z.useState)(!1), [N, ve] = (0, z.useState)(null), [ye, P] = (0, z.useState)(void 0), [Ae, I] = (0, z
        .useState)(!1);
    Ce(Te, !(A && N)); let L = _e(),
      { isGoogleTraffic: R } = ze();
    Fe(!L && R); let { isEnabled: B } = fe(), H = me(T || !k), [U, Ve] = (0, z.useState)(B);
    B && !U && Ve(!0); let W = B || U && H;
    (0, z.useState)(() => { let e = O.getState(); return e.isModelHydrated || e.selectedModel || O
    .setState({ selectedModel: n, initialModel: n }), null }), (0, z.useEffect)(() => { xe({ landingVariant: x,
        isAutoActive: C && n === S }) || localStorage.setItem(`pending-chat-model`, n) }, [x, n, S, C]), (0, z
      .useEffect)(() => { x === `auto-unlocked` && (document.cookie =
        `bing_auto_model_target=${n}; path=/; max-age=2592000`) }, [x, n]); let G = (0, z.useCallback)(() => { Ye()
        .then(() => I(!0)), Ke().then(e => { ve(() => e.default) }), qe(), Je(), Xe() }, []);
    (0, z.useEffect)(() => { if (Qe()) return; let e = () => {},
          t = () => { if (typeof window.requestIdleCallback == `function`) { let t = window.requestIdleCallback(
              G, { timeout: 2500 });
              e = () => window.cancelIdleCallback(t) } else { let t = window.setTimeout(G, 1500);
              e = () => window.clearTimeout(t) } }; return document.readyState === `complete` ? (t(), () => e()) : (
          window.addEventListener(`load`, t, { once: !0 }), () => { window.removeEventListener(`load`, t), e() }) }, [
      G]), (0, z.useEffect)(() => { let e = [`pointerdown`, `touchstart`, `keydown`, `scroll`, `pointermove`]; for (let
          t of e) window.addEventListener(t, G, { once: !0, passive: !0 }); return () => { for (let t of e) window
          .removeEventListener(t, G) } }, [G]); let K = (0, z.useCallback)(() => { G(), ue(!0) }, [G]),
      q = (0, z.useRef)(!1);
    (0, z.useEffect)(() => { if (A && N) return; let e = e => { e.dataTransfer?.types.includes(`Files`) && (e
            .preventDefault(), !q.current && (q.current = !0, K())) },
        t = e => { if (!e.dataTransfer?.types.includes(`Files`)) return;
          e.preventDefault(); let t = Array.from(e.dataTransfer.files);
          t.length > 0 && O.getState().setPendingShellFiles(t), K() }; return document.addEventListener(`dragover`,
        e), document.addEventListener(`drop`, t), () => { document.removeEventListener(`dragover`, e), document
            .removeEventListener(`drop`, t) } }, [A, N, K]); let J = (0, z.useCallback)(() => { let e = ne.getItem(
        we) === `true`; if (!T && (g || e)) { if (!D.isOpen) { if (f.trim() && ne.setItem(Ne, f), g && f
          .trim()) { re.setItem(`signupReturnPreserveDraft`, `1`); let e = O.getState().pendingNewChatId ?? t;
            je(e), D.openSignUpModal(v.IMMEDIATE_MESSAGE_SEND, e ? De({ chatId: e, locale: h }) :
        Ee({ locale: h })); return } D.openSignUpModal(v.IMMEDIATE_MESSAGE_SEND) } return } P(f), K() }, [T, D, f,
      K, g, t, h
    ]); if ((0, z.useLayoutEffect)(() => { if (A && N && !O.getState().pendingShellAction)
  return Ue({ findComposer: () => document.querySelector(`[data-testid="chat-input-textarea"]`),
        isAbandoned: () => !!O.getState().pendingShellAction }) }, [A, N]), A && N) return (0, V.jsx)(N, { autoResume: !
        1, autoSubmitText: ye, chatExists: !1, id: t, initialChatModel: n, initialMessages: Ge,
      initialVisibilityType: r, isReadonly: !1, user: i }); let Y = (0, V.jsx)(He, {}),
      X = Ae && E ? (0, V.jsx)(ke, { canConsumeShellAction: !0 }) : (0, V.jsxs)(y, { className: b(
          `h-8 gap-1 rounded-full text-sm font-normal`, s ? `px-1` : `gap-1.5 px-2`,
          `text-[#292929] dark:text-gray-200`), "data-testid": `model-selector-popover-trigger`, onClick: () => { if (
            !E) { w(); return } O.getState().setPendingShellAction({ kind: `open-model-selector` }), Ye(), I(!0) },
        onPointerDown: e => e.preventDefault(), size: `sm`, tightWidth: !0, type: `button`, variant: `ghost`,
        children: [(0, V.jsx)(`span`, { className: `max-w-[160px] truncate`, children: a }), (0, V.jsx)(
        d, { className: `h-3.5 w-3.5 flex-shrink-0 text-gray-400 transition-transform duration-200` })] }),
      Z = (0, V.jsx)(y, { "aria-label": m(`chat_input_voice_label`), className: b(
          `h-9 min-h-0 w-9 min-w-0 rounded-full border-none bg-transparent outline-none`, !s &&
          `hover:bg-gray-200 dark:hover:bg-gray-100/10`), onClick: () => { O.getState()
        .setPendingShellAction({ kind: `start-dictation` }), K() }, size: `icon`, type: `button`, variant: `ghost`,
        children: (0, V.jsx)(l, { className: b(s ? `h-5 w-5` : `h-4.5 w-4.5`, `dark:text-foreground text-[#0d0d0d]`),
          strokeWidth: 1.8 }) }),
      Q = f.trim().length === 0,
      $ = (0, V.jsx)(y, { "aria-label": m(`chat_input_send_label`), className: b(`h-9 min-h-0 w-9`, Q ? `bg-gray-500` :
          `bg-dark dark:bg-foreground`), disabled: Q, onClick: () => { J() }, size: `icon`, type: `button`,
        variant: `cta`, children: (0, V.jsx)(c, { className: b(s ? `h-5 w-5` : `h-4.5 w-4.5`, Q ? `text-paper` :
            `dark:text-background text-white`) }) }),
      $e = (0, V.jsxs)(`div`, { className: b(
          `user-select-none relative rounded-[24px] shadow-[0_2px_20px_rgba(0,0,0,0.1)] ring-1 transition-all duration-200 sm:rounded-[28px]`,
          `dark:bg-gray-tertiary bg-paper dark:ring-border ring-[#d9d9d9]`), children: [(0, V.jsx)(
          `div`, { "aria-hidden": !0,
            className: `absolute -inset-1 -z-10 rounded-[28px] bg-black/[0.05] blur-[8px] dark:bg-white/[0.06]` }),
          (0, V.jsx)(`div`, { className: `relative p-2.5`, children: (0, V.jsx)(`div`, { className: `flex flex-col`,
              children: (0, V.jsxs)(`div`, { className: `flex flex-col`, children: [(0, V.jsxs)(
                `div`, { className: `flex items-center`, children: [(0, V.jsx)(
                  `div`, { className: b(`flex-shrink-0 transition-all duration-200`, s ?
                        `pointer-events-none h-0 w-0 overflow-hidden opacity-0` :
                        `opacity-100`), children: (0, V.jsx)(
                    `div`, { className: `flex min-w-0 flex-1 items-center gap-2`,
                      children: Y }) }), (0, V.jsx)(
                  `div`, { className: `relative min-w-0 flex-1 [scrollbar-width:thin] overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 hover:[&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-track]:bg-transparent`,
                    style: { maxHeight: `392px` }, children: (0, V.jsxs)(
                    `div`, { className: `chat-input-selection-zone relative grid w-full px-1.5`,
                      children: [(0, V.jsx)(`div`, { "aria-hidden": `true`,
                        className: `pointer-events-none invisible col-start-1 col-end-2 row-start-1 row-end-2 w-full overflow-hidden text-start text-base leading-6 break-all whitespace-pre-wrap [unicode-bidi:plaintext]`,
                        dir: `auto`, style: { minHeight: `25px`,
                          wordBreak: `break-word` }, children: `${f} ` }), (0, V.jsx)(
                        `textarea`, { autoFocus: !s && !Ze(), className: b(
                            `col-start-1 col-end-2 row-start-1 row-end-2 w-full resize-none overflow-hidden border-0 bg-transparent text-base leading-6 [overflow-wrap:break-word] outline-none select-text placeholder:font-normal placeholder:whitespace-nowrap`,
                            `dark:text-foreground placeholder:text-ink-tertiary text-[#0d0d0d]`
                            ), "data-testid": `guest-shell-textarea`, dir: `auto`,
                          onChange: e => p(e.target.value), onBlur: () => M(!1),
                          onFocus: () => { M(!0), K() }, onKeyDown: e => { if (e
                              .key === `Enter` && !e.shiftKey && !e.nativeEvent
                              .isComposing) { if (e.preventDefault(), f.trim()
                                .length === 0) return;
                              J() } }, onPointerDown: K, placeholder: m(
                            `chat_input_placeholder_experiment`), ref: ce, rows: 1,
                          style: { minHeight: `25px`, textAlign: `start`,
                            unicodeBidi: `plaintext`, wordBreak: `break-word` },
                          value: f })] }) }), !s && (0, V.jsxs)(
                  `div`, { className: `flex shrink-0 items-center gap-1 transition-all duration-200`,
                    children: [X, (0, V.jsxs)(
                    `div`, { className: `flex min-w-0 items-center gap-1.5 sm:gap-2`,
                      children: [(0, V.jsx)(`div`, { className: `shrink-0`,
                        children: Z }), $] })] })] }), s && (0, V.jsxs)(
                `div`, { className: `mt-0 flex h-9 items-center opacity-100 transition-all duration-200`,
                  children: [(0, V.jsx)(`div`, { className: `min-w-0 flex-1 overflow-hidden`,
                    children: Y }), (0, V.jsxs)(
                  `div`, { className: `flex min-w-0 items-center gap-1 pl-2`, children: [X, (
                      0, V.jsxs)(
                    `div`, { className: `flex min-w-0 items-center gap-1.5 sm:gap-2`,
                      children: [(0, V.jsx)(`div`, { className: `shrink-0`,
                        children: Z }), $] })] })] })] }) }) })
        ] }),
      et = (0, V.jsxs)(V.Fragment, { children: [(0, V.jsx)(Ie, {}), (0, V.jsx)(We, { isMobile: s, onSeeMore: () => { O
              .getState().setPendingShellAction({ kind: `open-see-more` }), K() }, onSelect: (e, t) => { p(t), O
              .getState().setPendingShellAction({ kind: `open-category`, categoryKey: e }), K() } })] }),
      tt = (0, V.jsx)(Re, { initialChatModel: n, user: i }),
      nt = W ? null : (0, V.jsx)(`div`, { className: `relative z-10 w-full`, children: (0, V.jsx)(ee, {}) }); return (0,
      V.jsxs)(`div`, { className: b(`bg-paper flex min-h-0 flex-col`, `h-[100dvh] sm:h-full`,
        `sm:relative sm:overflow-hidden lg:min-h-0 lg:min-w-0 lg:flex-1 lg:items-center lg:justify-start`
        ), "data-guest-keyboard-root": ``, children: [(0, V.jsx)(
      `div`, { className: `user-select-none w-full flex-shrink-0 [@media(min-width:650px)_and_(min-height:650px)]:hidden`,
        children: (0, V.jsx)(Be, { user: i }) }), (0, V.jsx)(
      `div`, { className: `flex min-h-0 flex-1 flex-col lg:h-full lg:w-full`, children: (0, V.jsx)(
        `div`, { className: `flex h-full min-h-0 w-full flex-1`, children: (0, V.jsxs)(
          `div`, { className: `flex h-full min-h-0 min-w-0 flex-1 flex-col`, children: [!s && (0, V
              .jsxs)(`div`, { className: b(`flex min-h-0 flex-1 flex-col`, W ? `overflow-hidden` :
                `overflow-y-auto`), children: [W && (0, V.jsx)(
                `div`, { className: `flex w-full shrink-0 items-center justify-end px-4 py-3`,
                  children: !T && k && (0, V.jsx)(
                  y, { "data-testid": `guest-shell-signin-button`, onClick: () => D
                      .openSignInModal(v.URL), size: `chip`, variant: `cta`,
                    children: m(`auth_signin_button`) }) }), (0, V.jsxs)(
                `main`, { className: b(
                      `flex flex-1 flex-col items-center justify-center gap-5 px-2 sm:px-4`,
                      W ? `` : `min-h-full`, u && `py-4`),
                  style: { justifyContent: `safe center`, paddingBottom: W ? 60 : 118 },
                  children: [(0, V.jsxs)(`div`, { className: `mx-auto w-full max-w-[816px]`,
                    children: [tt, (0, V.jsx)(
                    `div`, { className: `relative isolate w-full px-4 sm:px-9`,
                      children: $e })] }), !L && (0, V.jsx)(
                  `div`, { className: `mx-auto w-full max-w-[816px] px-9`,
                    children: k && (0, V.jsx)(F, { centered: !0, sticky: !1 }) })] }), L &&
                k && (0, V.jsx)(F, {}), nt
              ] }), s && (0, V.jsxs)(`div`, { className: b(`flex min-h-0 flex-1 flex-col`, W ?
                `overflow-hidden` : `overflow-y-auto`), children: [(0, V.jsx)(
              `main`, { className: b(`flex flex-1 flex-col justify-end`, !W &&
                  `min-h-full`), "data-guest-keyboard-column": ``,
                style: { justifyContent: j ? `safe end` : `safe center`,
                  paddingBottom: j ? void 0 : 56 }, children: (0, V.jsxs)(
                `div`, { className: `mx-auto flex w-full max-w-[800px] flex-col`, "data-guest-keyboard-content": ``,
                  children: [(0, V.jsxs)(
                    `div`, { className: `user-select-none relative isolate p-4 py-2`,
                      children: [(0, V.jsx)(`div`, { className: `mb-4`,
                        children: tt }), $e, !L && k && (0, V.jsx)(
                      Le, { collapsed: j }), (0, V.jsx)(
                      `div`, { className: `mt-2 rounded-xl`, children: et })] }),
                    L && !j && (0, V.jsx)(`div`, { "aria-hidden": `true`,
                      className: `invisible`, "data-hide-on-keyboard": ``,
                      children: k && (0, V.jsx)(F, { sticky: !1 }) })
                  ] }) }), L && k && !j && (0, V.jsx)(F, {}), nt] })] }) }) })] }) };
i();
var $e = s(() => r(() => import(`./chat-surface-Ss7pWzJr.js`).then(e => e.t).then(e => e.ChatSurfaceComponent),
    __vite__mapDeps([362, 1, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
      25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
      52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
      79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
      105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126,
      127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148,
      149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
      171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192,
      193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214,
      215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236,
      237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258,
      259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280,
      281, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302,
      303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324,
      325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346,
      347, 348, 349, 350, 351, 352, 353
    ])), { loading: () => (0, V.jsx)(
    `div`, { className: `bg-paper flex h-[100dvh] w-full items-center justify-center`, children: (0, V.jsx)(
      m, { className: `text-accent h-6 w-6 animate-spin` }) }), loadableGenerated: { modules: [
        `src/app/widgets/chat/elements/chat-surface/index.ts`
      ] } }),
  et = e => { let { chatId: t, initialChatModel: n, initialVisibilityType: r, initialModelDisplayName: i, user: o,
      isImageLanding: s, isBackgroundLanding: c, isEnhancerLanding: l, isDeepResearchLanding: u } = e, d = O(e => e
      .newChatModuleNonce), f = O(e => e.pendingPrompt), p = a(), [m] = (0, z.useState)(() => !!p.get(
    `authmodal`)); return !s && !c && !l && !u && !f && !m && !p.get(`image-landing`) && !p.get(`background-removal`) && !
      p.get(`image-enhancer`) ? (0, V.jsx)($, { chatId: t, initialChatModel: n, initialModelDisplayName: i ?? n,
        initialVisibilityType: r, user: o }, d) : (0, V.jsx)($e, { autoResume: !1, chatExists: !1, id: t,
        initialChatModel: n, initialMessages: [], initialVisibilityType: r, isBackgroundLanding: c,
        isDeepResearchLanding: u, isEnhancerLanding: l, isImageLanding: s, isReadonly: !1, user: o }, d) };
export { et as default };
