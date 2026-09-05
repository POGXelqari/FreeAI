/**
 * Source: https://use.ai/_next/static/chunks/global.store-DsM3x4UJ.js
 * Module: global.store
 * Extracted & Beautified
 */

import { n as e } from "./env-C6AULCj5.js";
import { t } from "./safe-session-storage.util-DN4NSHVM.js";
import { r as n, s as r } from "./mixpanel-CkBALibP.js";
import { t as i } from "./react-D8-vnz5K.js";
import { n as a } from "./middleware-BT98JsiD.js";
var o = `review_response_count`,
  s = i()(a(e => ({ handleGlobalStore: t => e(e => ({ ...e, ...t })), menu: !1, isSettingsOpen: !1,
    setIsSettingsOpen: t => e({ isSettingsOpen: t }), openSelectPlan: !1, paymentSource: r.OTHER,
    paywallViewSource: n.TRIAL, currentChatId: null, setOpenSelectPlan: (t, n) => { e({ openSelectPlan: t,
        paymentSource: n || r.OTHER }) }, subscription: void 0, setSubscription: t => e({ subscription: t }),
    renameChatId: null, isRenameModalOpen: !1, currentChatTitle: ``, setRenameChatId: t => e({ renameChatId: t }),
    setIsRenameModalOpen: t => e({ isRenameModalOpen: t }), setCurrentChatTitle: t => e({ currentChatTitle: t }),
    setCurrentChatId: t => e({ currentChatId: t }), chatDisabled: !1, setChatDisabled: t =>
  e({ chatDisabled: t }), isStreaming: !1, setIsStreaming: t => e({ isStreaming: t }),
    successfulResponseCount: Number.parseInt(t.getItem(o) ?? `0`, 10) || 0,
  incrementSuccessfulResponseCount: () => e(e => { let n = e.successfulResponseCount + 1; return t.setItem(o,
          String(n)), { successfulResponseCount: n } }), isReviewModalOpen: !1, setIsReviewModalOpen: t =>
  e({ isReviewModalOpen: t }), renameProjectId: null, isProjectRenameModalOpen: !1, currentProjectTitle: ``,
    currentProjectId: null, setRenameProjectId: t => e({ renameProjectId: t }), setIsProjectRenameModalOpen: t =>
      e({ isProjectRenameModalOpen: t }), setCurrentProjectTitle: t => e({ currentProjectTitle: t }),
    setCurrentProjectId: t => e({ currentProjectId: t }), isImageCreationHeroVisible: !1,
    setIsImageCreationHeroVisible: t => e({ isImageCreationHeroVisible: t }), isBackgroundRemovalHeroVisible: !1,
    setIsBackgroundRemovalHeroVisible: t => e({ isBackgroundRemovalHeroVisible: t }), hasIncognitoChatStarted: !1,
    setHasIncognitoChatStarted: t => e({ hasIncognitoChatStarted: t }), currentMessages: [],
    setCurrentMessages: t => e({ currentMessages: t }), isReportBugModalOpen: !1, setIsReportBugModalOpen: t =>
  e({ isReportBugModalOpen: t }) }), { enabled: e.NEXT_PUBLIC_ENV !== `production` && !0 }));
export { s as t };
