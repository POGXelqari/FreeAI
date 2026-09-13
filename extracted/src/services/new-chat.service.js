/**
 * Source: https://use.ai/_next/static/chunks/new-chat.service-D_uV9h89.js
 * Module: new-chat.service
 * Extracted & Beautified
 */

import { n as e } from "./intl.constant-DpFKv8U4.js";
import { r as t } from "./intl-CED8MIZm.js";
import { r as n } from "./is-mobile.service-BZEOpDHM.js";
import { t as r } from "./sidebar.store-3O6FZkMw.js";
import { S as i, r as a, t as o } from "./chat.store-CCLMl5kX.js";
import { t as s } from "./global.store-DXaW4jb5.js";
import { t as c } from "./uuid.util-BB0yd8wz.js";
var l = (e = !1, t = !1) => { a.getState().resetChatState(), e || o(), a.getState().bumpChatSurfaceResetNonce(), t || s
      .getState().setCurrentChatId(null), s.getState().setHasIncognitoChatStarted(!1) },
  u = () => { let e = a.getState(),
      t = e.pendingNewChatId,
      n = c(); return t && (i.getState().rekeyDraft(t, n), e.rekeyChatModel(t, n)), e.setPendingNewChatId(n), n },
  d = null,
  f = () => { if (!d) return; let { activeChatId: e } = a.getState(), t = d;
    d = null, e === null && (l(t.skipModeClear, !0), a.setState({ currentInput: ``, uploadQueue: [],
      totalPdfPages: 0 })) },
  p = (t, n) => { let r = t.split(`/`)[1] ?? ``,
      i = t === (e.includes(r) ? `/${r}` : `/`) || t === `/`; return { atRoot: i, atRootWithParams: i && n.length > 0,
      leavingDeepResearch: t.endsWith(`/deep-research`) } },
  m = () => p(window.location.pathname, window.location.search),
  h = () => { let e = t(),
      i = n(),
      o = r(e => e.setIsOpen),
      s = e => { let t = a.getState();
        u(), t.setActiveChatId(null, { isPreNavigation: !0 }), t.bumpNewChatModuleNonce(),
      d = { skipModeClear: e } }; return { handleNewChat: () => { let { atRoot: t, atRootWithParams: n,
          leavingDeepResearch: r } = m(); if (i && o(!1), !t) { s(r), e.replace(`/`), e.refresh(); return } if (n) { e
            .replace(`/`), e.refresh(), l(r); return } e.refresh(), l(r) },
    handleNewChatLinkClick: t => { let { atRoot: n, atRootWithParams: r, leavingDeepResearch: a } = m(); if (i && o(!
            1), !n) { s(a); return } if (r) { l(a); return } t.preventDefault(), e.refresh(), l(a) } } };
export { h as i, l as n, u as r, f as t };
