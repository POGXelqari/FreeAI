/**
 * Source: https://use.ai/_next/static/chunks/use-immediate-signup.hook-ipxMOBWM.js
 * Module: use-immediate-signup.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { a as n } from "./experiment-client.service-CXqfLU-5.js";
import { r } from "./react-CWjhjU4R.js";
import { n as i } from "./better-auth-client-session.service-1Lowatea.js";
import { m as a } from "./freemium-funnel.util-BsrrWeXM.js";
import { i as o } from "./mixpanel-B_WP0jc-.js";
import { r as s } from "./chat.store-CCLMl5kX.js";
import { n as c } from "./user-data.provider-D1zgVZeU.js";
import { n as l } from "./experiment.provider-BEhampe0.js";
import "./client-BL58m4Hx.js";
import { t as u } from "./use-track-experiment-view.hook-D5ID5Wj0.js";
import { n as d } from "./use-guest-sidebar-menu.hook-YCGK8tSI.js";
import { n as f, t as p } from "./chat-route.util-CxSmRzCy.js";
import { i as m } from "./pending-free-message-query.util-C2HYAyae.js";
import { t as h } from "./auth-modal.service-Cuedadps.js";
var g = () => { let e = l(n.FREE_MESSAGE_AFTER_SIGNUP, `OFF`),
      { isMainPage: t, isGuest: r } = d(),
      { session: i } = c(),
      a = !i.isPending && r,
      o = t && a,
      s = o && (e === `A` || e === `B`); return u({ experimentName: n.FREE_MESSAGE_AFTER_SIGNUP, experimentValue: e,
      shouldTrack: s }), { variant: e, isInExperiment: s, isFreeFirstMessageEnabled: o && e === `B` } },
  _ = e(t(), 1),
  v = `pendingFeatureInput`,
  y = `pendingActivatedFeatureMode`,
  b = 1,
  x = ({ messages: e, isWebSearchMode: t, input: n, isFreeFirstMessageEnabled: c }) => { let { isPending: l,
      isAuthenticated: u } = i(), d = h(), g = r(), x = (0, _.useMemo)(() => e.length, [
    e]); return { handleMessageSubmit: (0, _.useCallback)(() => { if (l) return !0; let e = !u; if (e && t) return d
          .isOpen || (n && a.setItem(v, n), a.setItem(y, `web-search`), d.openSignUpModal(o.WEB_SEARCH_BUTTON)), !
          1; let r = a.getItem(`hasSentFirstMessage`) === `true`; if (e && (c || x >= b || r)) { if (!d
            .isOpen) { if (n?.trim() && (a.setItem(v, n), c)) { let e = s.getState().pendingNewChatId; return m(e),
                d.openSignUpModal(o.IMMEDIATE_MESSAGE_SEND, e ? p({ chatId: e, locale: g }) : f({ locale: g })), !
                1 } d.openSignUpModal(o.IMMEDIATE_MESSAGE_SEND) } return !1 } return e && x === 0 && !r && a
          .setItem(`hasSentFirstMessage`, `true`), !0 }, [l, u, d, x, t, n, c, g]) } };
export { x as n, g as r, v as t };
