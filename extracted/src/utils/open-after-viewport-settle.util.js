/**
 * Source: https://use.ai/_next/static/chunks/open-after-viewport-settle.util-LlI9f_aE.js
 * Module: open-after-viewport-settle.util
 * Extracted & Beautified
 */

import { Q as e } from "./vinext-DaPQ-kLo.js";
import { r as t } from "./freemium-funnel.util-BsrrWeXM.js";
import { b as n, g as r, y as i } from "./chat.store-CCLMl5kX.js";
import { n as a } from "./user-data.provider-D1zgVZeU.js";
import { t as o } from "./use-is-freemium-funnel.hook-CjGJwE5O.js";
import { n as s } from "./composer-modes.provider-C-48A9eP.js";
import { i as c, r as l } from "./chat-model-cookie.util-woL9U4Ul.js";
var u = () => { s(); let u = e(),
      { isFreemiumFunnel: d } = o(),
      { userProfileWithSubscription: f } = a(),
      p = f.data?.data?.subscription?.status,
      m = d && !t({ subscriptionStatus: p }),
      h = u?.projectId ? `project` : `simple`; return { chatModel: m ? void 0 : l() ?? void 0, pinnedChatModel: m ?
        void 0 : c() ?? void 0, modes: i(h, r() ? null : n()), scope: h } },
  d = { firstMoveMs: 120, settleMs: 90, maxWaitMs: 600 },
  f = (e, t, n = d) => { let r = !1,
      i = {},
      a = () => { r || (r = !0, s(), t()) },
      o = () => { clearTimeout(i.settle), i.settle = setTimeout(a, n.settleMs) },
      s = () => { clearTimeout(i.settle), clearTimeout(i.max), e?.removeEventListener(`resize`, o), e
          ?.removeEventListener(`scroll`, o) }; if (!e) { let e = setTimeout(a, 0); return () => { r = !0, clearTimeout(
          e) } } return e.addEventListener(`resize`, o), e.addEventListener(`scroll`, o), i.settle = setTimeout(a, n
      .firstMoveMs), i.max = setTimeout(a, n.maxWaitMs), () => { r = !0, s() } };
export { u as n, f as t };
