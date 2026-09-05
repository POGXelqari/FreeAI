/**
 * Source: https://use.ai/_next/static/chunks/workspace-scope.provider-Cm72CHah.js
 * Module: workspace-scope.provider
 * Extracted & Beautified
 */

import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n, r } from "./framework-D-uKrMmN.js";
var i = t({ WorkspaceScopeProvider: () => c, useServerWorkspaceScope: () => l }),
  a = e(n(), 1),
  o = r(),
  s = (0, a.createContext)(null);

function c(e) { let { workspace: t, isInTeam: n, team: r, children: i } = e, c = (0, a.useMemo)(() => ({ workspace: t,
    isInTeam: n, team: r }), [t, n, r]); return (0, o.jsx)(s.Provider, { value: c, children: i }) }

function l() { return (0, a.useContext)(s) }
export { i as n, l as t };
