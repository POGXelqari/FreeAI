/**
 * Source: https://use.ai/_next/static/chunks/connectors.hook-yn2Q-Dup.js
 * Module: connectors.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { r as n } from "./react-CWjhjU4R.js";
import { n as r } from "./react-client-DI5BViDH.js";
import { n as i } from "./catalog-locale-B-OI0E7H.js";
var a = e(t(), 1),
  o = {},
  s = {},
  c = new Set,
  l = () => { for (let e of c) e() },
  u = async e => { try { return (await i(e)).default?.Connectors ?? null } catch { return null } }, d = e => (c.add(e),
    () => { c.delete(e) }), f = e => o[e], p = e => { e in o || e in s || (s[e] = (async () => { let t = await u(
        `en`),
        n = e === `en` ? null : await u(e);
      o[e] = { ...t ?? {}, ...n ?? {} }, delete s[e], l() })()) }, m = (e, t) => { if (!e) return; let n = e; for (let
        e of t.split(`.`)) { if (typeof n != `object` || !n) return;
      n = n[e] } return typeof n == `string` ? n : void 0 }, h = () => { let e = r(`Connectors`); return (0, a
      .useCallback)(t => e(t), [e]) }, g = () => { let e = r(`Connectors`),
      t = n();
    (0, a.useEffect)(() => { p(t) }, [t]); let i = (0, a.useSyncExternalStore)(d, () => f(t), () => void 0); return (
      0, a.useCallback)(t => { if (e.has(t)) return { has: !0, value: e(t) }; let n = m(i, t); return n === void 0 ?
      { has: !1, value: `` } : { has: !0, value: n } }, [e, i]) }, _ = () => { let e = g(); return (0, a.useCallback)(
      (t, n) => { let r = n.trim().toLowerCase(); if (!r || t.name.toLowerCase().includes(r) || t.category
          .toLowerCase().includes(r)) return !0; let i = e(t.description); return i.has && i.value.toLowerCase()
          .includes(r) }, [e]) };
export { g as n, h as r, _ as t };
