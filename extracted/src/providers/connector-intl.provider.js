/**
 * Source: https://use.ai/_next/static/chunks/connector-intl.provider-vUpVkkDZ.js
 * Module: connector-intl.provider
 * Extracted & Beautified
 */

const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = ["_next/static/chunks/locale-loaders-BTRDNOPW.js",
  "_next/static/chunks/vinext-DaPQ-kLo.js", "_next/static/chunks/rolldown-runtime-C0FnF6B9.js",
  "_next/static/chunks/framework-D-uKrMmN.js",
  "_next/static/chunks/_rolldown_dynamic_import_helper-CIAwlR2T.js",
  "_next/static/chunks/catalog-locale-B-OI0E7H.js"
]))) => i.map(i => d[i]);
import { o as e, r as t, t as n } from "./rolldown-runtime-C0FnF6B9.js";
import { i as r, r as i } from "./framework-D-uKrMmN.js";
import { nt as a, rt as o } from "./vinext-DaPQ-kLo.js";
import { r as s, t as c } from "./react-CWjhjU4R.js";
import { n as l } from "./NextIntlClientProvider-BP5AYJiO.js";
import { o as u } from "./intl-CED8MIZm.js";
import { t as d } from "./connectors.store-NL-qi5yD.js";
var f = n(((e, t) => { var n = function(e) { return r(e) && !i(e) };

    function r(e) { return !!e && typeof e == `object` }

    function i(e) { var t = Object.prototype.toString.call(e); return t === `[object RegExp]` || t ===
        `[object Date]` || o(e) } var a = typeof Symbol == `function` && Symbol.for ? Symbol.for(`react.element`) :
      60103;

    function o(e) { return e.$$typeof === a }

    function s(e) { return Array.isArray(e) ? [] : {} }

    function c(e, t) { return t.clone !== !1 && t.isMergeableObject(e) ? g(s(e), e, t) : e }

    function l(e, t, n) { return e.concat(t).map(function(e) { return c(e, n) }) }

    function u(e, t) { if (!t.customMerge) return g; var n = t.customMerge(e); return typeof n == `function` ? n :
      g }

    function d(e) { return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(
      t) { return Object.propertyIsEnumerable.call(e, t) }) : [] }

    function f(e) { return Object.keys(e).concat(d(e)) }

    function p(e, t) { try { return t in e } catch { return !1 } }

    function m(e, t) { return p(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e,
        t)) }

    function h(e, t, n) { var r = {}; return n.isMergeableObject(e) && f(e).forEach(function(t) { r[t] = c(e[t],
          n) }), f(t).forEach(function(i) { m(e, i) || (r[i] = p(e, i) && n.isMergeableObject(t[i]) ? u(i, n)(e[
          i], t[i], n) : c(t[i], n)) }), r }

    function g(e, t, r) { r ||= {}, r.arrayMerge = r.arrayMerge || l, r.isMergeableObject = r.isMergeableObject ||
        n, r.cloneUnlessOtherwiseSpecified = c; var i = Array.isArray(t); return i === Array.isArray(e) ? i ? r
        .arrayMerge(e, t, r) : h(e, t, r) : c(t, r) } g.all = function(e, t) { if (!Array.isArray(e)) throw Error(
          `first argument should be an array`); return e.reduce(function(e, n) { return g(e, n, t) }, {}) }, t
      .exports = g })),
  p = t({ ConnectorIntlProvider: () => E, useConnectorCatalogMessages: () => O, useConnectorMessages: () => D,
    useEnsureConnectorCatalog: () => k }),
  m = e(f(), 1),
  h = e(r(), 1),
  g = i();
o();
var _ = null,
  v = () => (_ ??= a(() => import(`./locale-loaders-BTRDNOPW.js`).then(e => e.CONNECTOR_LOCALE_LOADERS),
    __vite__mapDeps([0, 1, 2, 3, 4])), _),
  y = null,
  b = () => (y ??= a(() => import(`./catalog-locale-B-OI0E7H.js`).then(e => e.t).then(e => e.loadCatalogLocale),
    __vite__mapDeps([5, 2, 1, 3, 4])), y),
  x = (0, h.createContext)(() => {}),
  S = (0, h.createContext)(() => {});
async function C(e, t) { try { return (await e(t)).default } catch { return null } } async function w(e, t) { let n = (
    await v())[e]; if (!n) return null; let r = await C(n, `en`); if (t === `en`) return r; let i = await C(n,
  t); return i ? r ? (0, m.default)(r, i, u) : i : r } async function T(e) { let t = await b(),
    n = await C(t, `en`); if (e === `en`) return n; let r = await C(t, e); return r ? n ? (0, m.default)(n, r,
    u) : r : n }

function E(e) { let { children: t } = e, n = c(), r = s(), i = d(e => e.connectedIds), [a, o] = (0, h.useState)([]), [f,
    p
  ] = (0, h.useState)({}), [_, y] = (0, h.useState)(!1), [b, C] = (0, h.useState)({}), E = (0, h.useCallback)(() => y(
    !0), []), D = (0, h.useCallback)(e => { e.length !== 0 && v().then(t => { o(n => { let r = new Set(n),
          i = !1; for (let n of e) t[n] && !r.has(n) && (r.add(n), i = !0); return i ? [...r] : n }) }) }, []);
  (0, h.useEffect)(() => { D(i) }, [D, i]), (0, h.useEffect)(() => { let e = !1,
      t = a.filter(e => !(`${r}:${e}` in f)); if (t.length !== 0) return Promise.all(t.map(async e => [`${r}:${e}`,
        await w(e, r)
      ])).then(t => { e || p(e => { let n = { ...e },
            r = !1; for (let [e, i] of t) e in n || (n[e] = i ?? {}, r = !0); return r ? n : e }) }), () => { e = !
        0 } }, [a, r, f]), (0, h.useEffect)(() => { if (!_ || r in b) return; let e = !1; return T(r).then(t => { e ||
        C(e => r in e ? e : { ...e, [r]: t ?? {} }) }), () => { e = !0 } }, [_, r, b]); let O = (0, h.useMemo)(
() => { let e = b[r],
      t = [...a.map(e => f[`${r}:${e}`]), e].filter(e => !!e && Object.keys(e).length > 0); if (t.length === 0)
      return n; let i = n,
      o = { ...i },
      s = new Set(t.flatMap(e => Object.keys(e))); for (let e of s) { let n = t.map(t => t[e]).filter(e => !!e &&
        typeof e == `object`);
      n.length !== 0 && (o[e] = m.default.all([i[e] ?? {}, ...n], u)) } return o }, [n, a, f, b, r]); return (0, g.jsx)(
    x.Provider, { value: D, children: (0, g.jsx)(S.Provider, { value: E, children: (0, g.jsx)(l, { locale: r,
          messages: O, children: t }) }) }) }

function D(e) { let t = (0, h.useContext)(x),
    n = e.join(`,`);
  (0, h.useEffect)(() => { e.length > 0 && t(e) }, [t, n]) }

function O() { let e = (0, h.useContext)(S);
  (0, h.useEffect)(() => { e() }, [e]) }

function k() { return (0, h.useContext)(S) }
export { f as a, k as i, O as n, D as r, p as t };
