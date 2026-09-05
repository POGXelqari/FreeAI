/**
 * Source: https://use.ai/_next/static/chunks/composer-modes.provider-C-48A9eP.js
 * Module: composer-modes.provider-C
 * Extracted & Beautified
 */

import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n, r } from "./framework-D-uKrMmN.js";
var i = t({ ComposerModesProvider: () => c, useServerComposerState: () => l }),
  a = e(n(), 1),
  o = r(),
  s = (0, a.createContext)(null);

function c(e) { let { modes: t, chatModel: n, pinnedChatModel: r, children: i } = e, c = (0, a.useMemo)(() =>
({ modes: t, chatModel: n, pinnedChatModel: r }), [t, n, r]); return (0, o.jsx)(s.Provider, { value: c, children: i }) }

function l() { return (0, a.useContext)(s) }
export { l as n, i as t };
