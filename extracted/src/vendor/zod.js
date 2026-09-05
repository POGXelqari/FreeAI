/**
 * Source: https://use.ai/_next/static/chunks/zod-C6oPiT8X.js
 * Module: zod
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { Xi as n, Yi as r, ra as i } from "./env-C6AULCj5.js";
var a = e(t(), 1),
  o = e => e.type === `checkbox`,
  s = e => e.type === `file`,
  c = e => e instanceof Date,
  l = e => e == null,
  u = e => typeof e == `object`,
  d = e => !l(e) && !Array.isArray(e) && u(e) && !c(e),
  f = e => d(e) && e.target ? o(e.target) ? e.target.checked : s(e.target) ? e.target.files : e.target.value : e,
  p = (e, t) => t.split(`.`).some((t, n, r) => !isNaN(Number(t)) && e.has(r.slice(0, n).join(`.`))),
  m = e => { let t = e.constructor && e.constructor.prototype; return d(t) && t.hasOwnProperty(`isPrototypeOf`) },
  h = window.HTMLElement !== void 0 && typeof document < `u`;

function g(e) { if (e instanceof Date) return new Date(e); let t = typeof FileList < `u` && e instanceof FileList; if (
    h && (e instanceof Blob || t)) return e; let n = Array.isArray(e); if (!n && !(d(e) && m(e))) return e; let r = n ?
    [] : Object.create(Object.getPrototypeOf(e)); for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (r[t] =
    g(e[t])); return r }
var _ = { BLUR: `blur`, FOCUS_OUT: `focusout`, CHANGE: `change`, SUBMIT: `submit`, TRIGGER: `trigger`, VALID: `valid` },
  v = { onBlur: `onBlur`, onChange: `onChange`, onSubmit: `onSubmit`, onTouched: `onTouched`, all: `all` },
  y = { max: `max`, min: `min`, maxLength: `maxLength`, minLength: `minLength`, pattern: `pattern`,
    required: `required`, validate: `validate` },
  b = `root`,
  x = [`__proto__`, `constructor`, `prototype`],
  S = /^\w*$/,
  C = e => S.test(e),
  w = e => e === void 0,
  T = /[.[\]'"]/,
  E = e => e.split(T).filter(Boolean),
  D = (e, t, n) => { if (!t || !d(e)) return n; let r = C(t) ? [t] : E(t); if (r.some(e => x.includes(e))) return n; let
      i = r.reduce((e, t) => l(e) ? void 0 : e[t], e); return w(i) || i === e ? w(e[t]) ? n : e[t] : i },
  O = e => typeof e == `boolean`,
  k = e => typeof e == `function`,
  A = (e, t, n) => { let r = -1,
      i = C(t) ? [t] : E(t),
      a = i.length,
      o = a - 1; for (; ++r < a;) { let t = i[r],
        a = n; if (r !== o) { let n = e[t];
        a = d(n) || Array.isArray(n) ? n : isNaN(+i[r + 1]) ? {} : [] } if (x.includes(t)) return;
      e[t] = a, e = e[t] } },
  j = a.createContext(null);
j.displayName = `HookFormControlContext`;
var M = (e, t, n, r = !0) => { let i = {}; for (let a in e) Object.defineProperty(i, a, { get: () => { let i =
          a; return t._proxyFormState[i] !== v.all && (t._proxyFormState[i] = !r || v.all), n && (n[i] = !0), e[
            i] } }); return i },
  ee = h ? a.useLayoutEffect : a.useEffect,
  N = e => typeof e == `string`,
  P = (e, t, n, r, i) => N(e) ? (r && t.watch.add(e), D(n, e, i)) : Array.isArray(e) ? e.map(e => (r && t.watch.add(e),
    D(n, e))) : (r && (t.watchAll = !0), n),
  F = e => l(e) || !u(e),
  I = (e, t) => t.length === 0 && !Array.isArray(e) && !m(e);

function L(e, t, n = new WeakMap) { if (e === t) return !0; if (F(e) || F(t)) return Object.is(e, t); if (c(e) && c(t))
    return Object.is(e.getTime(), t.getTime()); let r = Object.keys(e),
    i = Object.keys(t); if (r.length !== i.length) return !1; if (I(e, r) || I(t, i)) return Object.is(e, t); if (!r
    .length && Array.isArray(e) !== Array.isArray(t)) return !1; let a = n.get(e); if (a && a.has(t)) return !0; if (a)
    a.add(t);
  else { let r = new WeakSet;
    r.add(t), n.set(e, r) } for (let i of r) { let r = e[i]; if (!(i in t)) return !1; if (i !== `ref`) { let e = t[
      i]; if (c(r) && c(e) || (d(r) || Array.isArray(r)) && (d(e) || Array.isArray(e)) ? !L(r, e, n) : !Object.is(r, e))
        return !1 } } return !0 }
var te = e => ({ isOnSubmit: !e || e === v.onSubmit, isOnBlur: e === v.onBlur, isOnChange: e === v.onChange,
    isOnAll: e === v.all, isOnTouch: e === v.onTouched }),
  ne = (e, t, n) => { if (n) return !1; if (t.watchAll || t.watch.has(e)) return !0; for (let n of t.watch)
      if (e.startsWith(n) && e.charAt(n.length) === `.`) return !0; return !1 },
  R = (e, t, n, r) => { for (let i of n || Object.keys(e)) { let n = D(e, i); if (n) { let { _f: e, ...a } = n; if (
          e) { if (e.refs && e.refs[0] && t(e.refs[0], i) && !r || e.ref && t(e.ref, e.name) && !r) return !0; if (R(a,
              t)) break } else if (d(a) && R(a, t)) break } } },
  re = (e, t, n) => { let r = D(e, n),
      i = Array.isArray(r) ? r : []; return A(i, b, t[n]), A(e, n, i), e },
  z = e => d(e) && !Object.keys(e).length,
  ie = e => { if (!h) return !1; let t = e ? e.ownerDocument : 0; return e instanceof(t && t.defaultView ? t.defaultView
      .HTMLElement : HTMLElement) },
  B = e => e.type === `radio`,
  V = e => e instanceof RegExp,
  H = (e, t, n, r, i) => t ? { ...n[e], types: { ...n[e] && n[e].types ? n[e].types : {}, [r]: i || !0 } } : {},
  ae = { value: !1, isValid: !1 },
  U = { value: !0, isValid: !0 },
  W = e => { if (Array.isArray(e)) { if (e.length > 1) { let t = e.filter(e => e && e.checked && !e.disabled).map(e => e
          .value); return { value: t, isValid: !!t.length } } return e[0].checked && !e[0].disabled ? e[0].attributes &&
        !w(e[0].attributes.value) ? w(e[0].value) || e[0].value === `` ? U : { value: e[0].value, isValid: !0 } : U :
        ae } return ae },
  oe = { isValid: !1, value: null },
  se = e => Array.isArray(e) ? e.reduce((e, t) => t && t.checked && !t.disabled ? { isValid: !0, value: t.value } : e,
    oe) : oe;

function ce(e, t, n = `validate`) { if (N(e) || Array.isArray(e) && e.every(N) || O(e) && !e) return { type: n,
    message: N(e) ? e : ``, ref: t } }
var G = e => d(e) && !V(e) ? e : { value: e, message: `` },
  le = async (e, t, n, r, i, a) => { let { ref: c, refs: u, required: f, maxLength: p, minLength: m, min: h, max: g,
      pattern: _, validate: v, name: b, valueAsNumber: x, mount: S } = e._f, C = D(n, b); if (!S || t.has(b))
      return {}; let T = u ? u[0] : c,
      E = e => { if (i && T.reportValidity) { let t = O(e) ? `` : e || ``;
          u ? u.forEach(e => e.setCustomValidity(t)) : T.setCustomValidity(t), T.reportValidity() } },
      A = {},
      j = B(c),
      M = o(c),
      ee = j || M,
      P = (x || s(c)) && w(c.value) && w(C) || ie(c) && c.value === `` || C === `` || Array.isArray(C) && !C.length,
      F = H.bind(null, b, r, A),
      I = (e, t, n, r = y.maxLength, i = y.minLength) => { let a = e ? t : n;
        A[b] = { type: e ? r : i, message: a, ref: c, ...F(e ? r : i, a) } }; if (a ? !Array.isArray(C) || !C.length :
      f && (!ee && (P || l(C)) || O(C) && !C || M && !W(u).isValid || j && !se(u).isValid)) { let { value: e,
        message: t } = N(f) ? { value: !!f, message: f } : G(f); if (e && (A[b] = { type: y.required, message: t,
          ref: T, ...F(y.required, t) }, !r)) return E(t), A } if (!P && (!l(h) || !l(g))) { let e, t, n = G(g),
        i = G(h); if (!l(C) && !isNaN(C)) { let r = c.valueAsNumber || C && +C;
        l(n.value) || (e = r > n.value), l(i.value) || (t = r < i.value) } else { let r = c.valueAsDate || new Date(
          C),
          a = e => new Date(new Date().toDateString() + ` ` + e),
          o = c.type == `time`,
          s = c.type == `week`;
        N(n.value) && C && (e = o ? a(C) > a(n.value) : s ? C > n.value : r > new Date(n.value)), N(i.value) && C && (
          t = o ? a(C) < a(i.value) : s ? C < i.value : r < new Date(i.value)) } if ((e || t) && (I(!!e, n.message, i
          .message, y.max, y.min), !r)) return E(A[b].message), A } if ((p || m) && !P && (N(C) || a && Array.isArray(
        C))) { let e = G(p),
        t = G(m),
        n = !l(e.value) && C.length > +e.value,
        i = !l(t.value) && C.length < +t.value; if ((n || i) && (I(n, e.message, t.message), !r)) return E(A[b]
        .message), A } if (_ && !P && N(C)) { let { value: e, message: t } = G(_); if (V(e) && !C.match(e) && (A[
        b] = { type: y.pattern, message: t, ref: c, ...F(y.pattern, t) }, !r)) return E(t), A } if (v) { if (k(
        v)) { let e = ce(await v(C, n), T); if (e && (A[b] = { ...e, ...F(y.validate, e.message) }, !r)) return E(e
          .message), A } else if (d(v)) { let e = {}; for (let t in v) { if (!z(e) && !r) break; let i = ce(await v[t]
            (C, n), T, t);
          i && (e = { ...i, ...F(t, i.message) }, E(i.message), r && (A[b] = e)) } if (!z(e) && (A[b] = { ref: T, ...
              e }, !r)) return A } } return E(!0), A }, ue = e => Array.isArray(e) ? e : [e], de = e => Array.isArray(
    e) ? e.filter(Boolean) : [];

function fe(e, t) { let n = t.slice(0, -1).length,
    r = 0; for (; r < n;) { if (l(e)) { e = void 0; break } e = e[t[r]], r++ } return e }

function pe(e) { for (let t in e)
    if (e.hasOwnProperty(t) && !w(e[t])) return !1; return !0 }

function K(e, t) { if (N(t) && Object.prototype.hasOwnProperty.call(e, t)) return delete e[t], e; let n = Array.isArray(
    t) ? t : C(t) ? [t] : E(t); if (n.some(e => x.includes(String(e)))) return e; let r = n.length === 1 ? e : fe(e, n),
    i = n.length - 1,
    a = n[i]; return r && delete r[a], i !== 0 && (d(r) && z(r) || Array.isArray(r) && pe(r)) && K(e, n.slice(0, -1)),
  e }
var me = e => { let t = {}; for (let n of Object.keys(e))
      if (u(e[n]) && e[n] !== null && !c(e[n])) { let r = me(e[n]); for (let e of Object.keys(r)) t[`${n}.${e}`] = r[
        e] } else t[n] = e[n]; return t },
  he = a.createContext(null);
he.displayName = `HookFormContext`;
var ge = () => { let e = []; return { get observers() { return e }, next: t => { for (let n of e) n.next && n.next(t) },
    subscribe: t => (e.push(t), { unsubscribe: () => { e = e.filter(e => e !== t) } }), unsubscribe: () => { e
    = [] } } };

function _e(e, t) { let n = {}; for (let r in e)
    if (e.hasOwnProperty(r)) { let i = e[r],
        a = t[r]; if (i && d(i) && a) { let e = _e(i, a);
        d(e) && (n[r] = e) } else e[r] && (n[r] = a) } return n }
var ve = e => e.type === `select-multiple`,
  ye = e => B(e) || o(e),
  be = e => ie(e) && e.isConnected,
  xe = e => { for (let t in e)
      if (k(e[t])) return !0; return !1 };

function q(e) { return Array.isArray(e) || d(e) && !xe(e) }

function Se(e) { return !!(e && `_f` in e) }

function Ce(e) { return Array.isArray(e) ? !e.some(e => !w(e)) : !Object.keys(e).length }

function J(e, t) { Array.isArray(e) ? e[t] = void 0 : delete e[t] }

function we(e, t = {}, n) { for (let r in e) { let i = e[r],
      a = n && n[r];
    q(i) && (!Array.isArray(i) || !Se(a)) ? (t[r] = Array.isArray(i) ? [] : {}, we(i, t[r], a), Ce(t[r]) && J(t, r)) :
      w(i) || (t[r] = !0) } return t }

function Y(e, t, n, r) { n ||= we(t, {}, r); for (let i in e) { let a = e[i],
      o = r && r[i];
    q(a) && (!Array.isArray(a) || !Se(o)) ? (w(t) || F(n[i]) ? n[i] = we(a, Array.isArray(a) ? [] : {}, o) : Y(a, l(t) ?
    {} : t[i], n[i], o), Ce(n[i]) && J(n, i)) : L(a, t[i]) ? J(n, i) : n[i] = !0 } return n }
var Te = (e, { valueAsNumber: t, valueAsDate: n, setValueAs: r }) => w(e) ? e : t ? e === `` ? NaN : e && +e : n && N(
  e) ? new Date(e) : r ? r(e) : e;

function Ee(e) { let t = e.ref; return s(t) ? t.files : B(t) ? se(e.refs).value : ve(t) ? [...t.selectedOptions].map(
({ value: e }) => e) : o(t) ? W(e.refs).value : Te(w(t.value) ? e.ref.value : t.value, e) }
var De = (e, t, n, r) => { let i = {}; for (let n of e) { let e = D(t, n);
      e && A(i, n, e._f) } return { criteriaMode: n, names: [...e], fields: i, shouldUseNativeValidation: r } },
  X = e => w(e) ? e : V(e) ? e.source : d(e) ? V(e.value) ? e.value.source : e.value : e,
  Z = `AsyncFunction`,
  Oe = e => { if (!e || !e.validate) return !1; if (k(e.validate)) return e.validate.constructor.name === Z; if (d(e
        .validate)) { for (let t in e.validate)
        if (e.validate[t].constructor.name === Z) return !0 } return !1 },
  ke = e => e.mount && (e.required || e.min || e.max || e.maxLength || e.minLength || e.pattern || e.validate);

function Ae(e, t, n) { let r = D(e, n); if (r || C(n)) return { error: r, name: n }; let i = n.split(`.`); for (; i
    .length;) { let r = i.join(`.`),
      a = D(t, r),
      o = D(e, r); if (a && !Array.isArray(a) && n !== r) return { name: n }; if (o && o.type) return { name: r,
      error: o }; if (o && o.root && o.root.type) return { name: `${r}.root`, error: o.root };
    i.pop() } return { name: n } }
var je = (e, t, n, r) => { n(e); let { name: i, ...a } = e, o = Object.keys(a); return !o.length || r && o.length >=
      Object.keys(t).length || o.find(e => t[e] === (!r || v.all)) },
  Me = (e, t, n) => !e || !t || e === t || ue(e).some(e => e && (n ? e === t || e.startsWith(t + `.`) : e.startsWith(
    t) || t.startsWith(e))),
  Ne = (e, t, n, r, i) => i.isOnAll ? !1 : !n && i.isOnTouch ? !(t || e) : (n ? r.isOnBlur : i.isOnBlur) ? !e : !(n ? r
    .isOnChange : i.isOnChange) || e,
  Pe = (e, t) => !de(D(e, t)).length && K(e, t),
  Fe = { mode: v.onSubmit, reValidateMode: v.onChange, shouldFocusError: !0 },
  Ie = `form`,
  Le = (e, t) => { for (let n in e) n in t || delete e[n];
    Object.assign(e, t) },
  Re = { submitCount: 0, isDirty: !1, isReady: !1, isValidating: !1, isSubmitted: !1, isSubmitting: !1,
    isSubmitSuccessful: !1, isValid: !1, touchedFields: {}, dirtyFields: {}, validatingFields: {} };

function ze(e = {}) { let t = { ...Fe, ...e },
    n = { ...g(Re), isLoading: k(t.defaultValues), errors: t.errors || {}, disabled: t.disabled || !1 },
    r = {},
    i = (d(t.defaultValues) || d(t.values)) && g(t.defaultValues || t.values) || {},
    a = t.shouldUnregister ? {} : g(i),
    u = { action: !1, mount: !1, watch: !1, keepIsValid: !1 },
    m = { mount: new Set, disabled: new Set, unMount: new Set, array: new Set, watch: new Set, registerName: new Set },
    x = {},
    S = {},
    T = 0,
    j = te(t.mode),
    M = te(t.reValidateMode),
    ee = { isDirty: !1, dirtyFields: !1, validatingFields: !1, touchedFields: !1, isValidating: !1, isValid: !1, errors:
        !1 },
    F = { ...ee },
    I = { ...F },
    B = { array: ge(), state: ge() },
    V = 0,
    H = t.criteriaMode === v.all,
    ae = (e, t) => n => { clearTimeout(S[e]), S[e] = setTimeout(t, n) },
    U = async e => { if (!u.keepIsValid && !t.disabled && (F.isValid || I.isValid || e)) { let e = ++V,
          i;
        t.resolver ? (i = z((await q()).errors), e === V && W()) : i = await J({ fields: r, onlyCheckValid: !0,
          eventType: _.VALID }), e === V && i !== n.isValid && B.state.next({ isValid: i }) } }, W = (e, r) => {!t
        .disabled && (F.isValidating || F.validatingFields || I.isValidating || I.validatingFields) && ((e || Array
            .from(m.mount)).forEach(e => { e && (r ? A(n.validatingFields, e, r) : K(n.validatingFields, e)) }), B
          .state.next({ validatingFields: n.validatingFields, isValidating: !z(n.validatingFields) })) }, oe =
  () => { n.dirtyFields = Y(i, a, void 0, r) }, se = (e, i = [], o, s, c = !0, l = !0) => { if (s && o && !t
        .disabled) { if (u.action = !0, l && Array.isArray(D(r, e))) { let t = o(D(r, e), s.argA, s.argB);
          c && A(r, e, t) } if (l && Array.isArray(D(n.errors, e))) { let t = o(D(n.errors, e), s.argA, s.argB);
          c && A(n.errors, e, t), Pe(n.errors, e) } if ((F.touchedFields || I.touchedFields) && l && Array.isArray(D(n
            .touchedFields, e))) { let t = o(D(n.touchedFields, e), s.argA, s.argB);
          c && A(n.touchedFields, e, t) }(F.dirtyFields || I.dirtyFields) && oe(), B.state.next({ name: e, isDirty: Z(
            e, i), dirtyFields: n.dirtyFields, errors: n.errors, isValid: n.isValid }) } else A(a, e, i) }, ce = (e,
      t) => { A(n.errors, e, t), n.errors = { ...n.errors }, B.state.next({ errors: n.errors }) }, G = e => { n
        .errors = e, B.state.next({ errors: n.errors, isValid: !1 }) }, fe = e => { let t = C(e) ? [e] : E(e),
        n = a,
        r = i; for (let e = 0; e < t.length - 1; e++) { let i = t[e]; if (n = l(n) ? n : n[i], r = l(r) ? r : r[i],
          n === null && r !== null) return !0 } return !1 }, pe = (t, o, s, c) => { let l = D(r, t); if (l) { if (fe(
            t)) return; let r = w(D(a, t)),
          d = D(a, t, w(s) ? D(i, t) : s);
        w(d) || c && c.defaultChecked || o ? A(a, t, o ? d : Ee(l._f)) : Q(t, d), u.mount && !u.action && (U(), r && n
          .isDirty && (F.isDirty || I.isDirty) && (Z() || (n.isDirty = !1, B.state.next({ ...n }))), e
          .shouldUnregister && r && !w(D(a, t)) && ne(t, m) && (u.watch = !0)) } }, he = (e, o, s, c, l) => { let
        u = !1,
        d = !1,
        f = { name: e }; if (!t.disabled || c === !0) { if (!s || c) { let t = L(D(i, e), o);
          (F.isDirty || I.isDirty) && (d = n.isDirty, n.isDirty = f.isDirty = !t || Z(), u = d !== f.isDirty), d = !!
            D(n.dirtyFields, e), t === n.isDirty ? t ? K(n.dirtyFields, e) : A(n.dirtyFields, e, !0) : Le(n
              .dirtyFields, Y(i, a, void 0, r)), f.dirtyFields = n.dirtyFields, u ||= (F.dirtyFields || I
            .dirtyFields) && d !== !t } if (s) { let t = D(n.touchedFields, e);
          t || (A(n.touchedFields, e, s), f.touchedFields = n.touchedFields, u ||= (F.touchedFields || I
            .touchedFields) && t !== s) } u && l && B.state.next(f) } return u ? f : {} }, xe = (e, r, i, a) => { let
        o = D(n.errors, e),
        s = (F.isValid || I.isValid) && O(r) && n.isValid !== r; if (t.delayError && i ? (x[e] = ae(e, () => ce(e,
          i)), x[e](t.delayError)) : (clearTimeout(S[e]), delete x[e], i ? A(n.errors, e, i) : K(n.errors, e), n
          .errors = { ...n.errors }), (i ? !L(o, i) : o) || !z(a) || s) { let t = { ...a, ...s && O(r) ?
        { isValid: r } : {}, errors: n.errors, name: e };
        n = { ...n, ...t }, B.state.next(t) } }, q = async e => (W(e, !0), await t.resolver(a, t.context, De(e || m
      .mount, r, t.criteriaMode, t.shouldUseNativeValidation))), Se = async e => { let { errors: t } = await q(
      e); if (W(e), e) { for (let r of e) { let e = D(t, r);
          e ? m.array.has(r) && d(e) && !Object.keys(e).some(e => !Number.isNaN(Number(e))) ? re(n.errors, {
            [r]: e }, r) : A(n.errors, r, e) : K(n.errors, r) } n.errors = { ...n.errors } } else n.errors =
      t; return t }, Ce = async ({ name: t, eventType: r }) => { if (e.validate) { let i = await e
        .validate({ formValues: a, formState: n, name: t, eventType: r }); if (d(i))
            for (let e in i) { let t = i[e];
              t && Xe(`${Ie}.${e}`, { message: N(t.message) ? t.message : ``, type: t.type || y.validate }) } else
              N(i) || !i ? Xe(Ie, { message: i || ``, type: y.validate }) : Ye(Ie); return i } return !0 }, J =
      async ({ fields: r, onlyCheckValid: i, name: o, eventType: s, context: c = { valid: !0, runRootValidation: !
              1 } }) => { if (e.validate && (c.runRootValidation = !0, !await Ce({ name: o, eventType: s }) && (c
              .valid = !1, i))) return c.valid; for (let o in r) { let l = r[o]; if (l) { let { _f: r, ...u } = l
              ; if (r) { let o = m.array.has(r.name),
                  s = l._f && Oe(l._f),
                  u = F.validatingFields || F.isValidating || I.validatingFields || I.isValidating;
                s && u && W([r.name], !0); let d = await le(l, m.disabled, a, H, t.shouldUseNativeValidation && !
                  i, o); if (s && u && W([r.name]), d[r.name] && (c.valid = !1, i) || (!i && (D(d, r.name) ? o ?
                      re(n.errors, d, r.name) : A(n.errors, r.name, d[r.name]) : K(n.errors, r.name)), e
                    .shouldUseNativeValidation && d[r.name])) break }!z(u) && await J({ context: c,
                onlyCheckValid: i, fields: u, name: o, eventType: s }) } } return c.valid }, we = () => { for (let
              e of m.unMount) { let t = D(r, e);
            t && (t._f.refs ? t._f.refs.every(e => !be(e)) : !be(t._f.ref)) && et(e) } m.unMount = new Set }, Z =
        (e, t) => (e && t && A(a, e, t), !L(u.mount ? a : i, i)), ze = (e, t, n) => P(e, m, { ...u.mount ? a : w(
            t) ? i : N(e) ? {
            [e]: t } : t }, n, t), Be = e => de(D(u.mount ? a : i, e, t.shouldUnregister ? D(i, e, []) : [])), Q =
        (e, t, n = {}, i = !1, c = !1) => { let u = D(r, e),
            d = t; if (u) { let n = u._f;
            n && (!n.disabled && A(a, e, Te(t, n)), d = ie(n.ref) && l(t) ? `` : t, ve(n.ref) ? [...n.ref.options]
              .forEach(e => e.selected = d.includes(e.value)) : n.refs ? o(n.ref) ? n.refs.forEach(e => {
                (!e.defaultChecked || !e.disabled) && (e.checked = Array.isArray(d) ? !!d.find(t => t === e
                  .value) : d === e.value || !!d) }) : n.refs.forEach(e => e.checked = e.value === d) : s(n
              .ref) ? n.ref.value = `` : (n.ref.value = d, !n.ref.type && !c && B.state.next({ name: e,
                values: i ? a : g(a) }))) }(n.shouldDirty || n.shouldTouch) && he(e, d, n.shouldTouch, n
            .shouldDirty, !c), n.shouldValidate && Ke(e, { delayError: n.delayError }) }, Ve = (e, t, n, i = !1,
          a = !1) => { for (let o in t) { if (!t.hasOwnProperty(o)) return; let s = t[o],
              l = e + `.` + o,
              u = D(r, l);
            (m.array.has(e) || d(s) || u && !u._f) && !c(s) ? Ve(l, s, n, i, a) : Q(l, s, n, i, a) } }, He = (e,
          t, i, o, s = !1) => { let c = D(r, e),
            d = m.array.has(e),
            f = o ? t : g(t),
            p = L(D(a, e), f); if (p || A(a, e, f), d) B.array.next({ name: e, values: o ? a : g(a) }), (F
            .isDirty || F.dirtyFields || I.isDirty || I.dirtyFields) && i.shouldDirty && (oe(), s || B.state
            .next({ name: e, dirtyFields: n.dirtyFields, isDirty: Z(e, f) }));
          else { let t = Array.isArray(f) && !f.length || z(f);!c || c._f || l(f) || t ? Q(e, f, i, o, s) : Ve(e,
              f, i, o, s) } if (!p && !s) { let t = ne(e, m),
              r = o ? a : g(a);
            B.state.next({ ...t && n, name: u.mount || t ? e : void 0, values: r }) } }, $ = (e, t, n = {}) => He(
          e, t, n, !1), Ue = (e, t = {}) => { let r = k(e) ? e(a) : e; if (!L(a, r)) { a = { ...a, ...r }; let e =
              me(r); for (let n of m.mount) n in e && He(n, e[n], t, !0, !0);
            B.state.next({ ...n, name: void 0, type: void 0, ...T ? { values: a } : {} }), t.shouldValidate &&
          U() } }, We = async i => { u.mount = !0; let o = i.target,
            s = o.name,
            l = !0,
            d = D(r, s),
            p = e => { l = Number.isNaN(e) || c(e) && isNaN(e.getTime()) || L(e, D(a, s, e)) }; if (d) { let c,
              u, h = o.type ? Ee(d._f) : f(i),
              v = i.type === _.BLUR || i.type === _.FOCUS_OUT,
              y = !ke(d._f) && !e.validate && !t.resolver && !D(n.errors, s) && !d._f.deps,
              b = y || Ne(v, D(n.touchedFields, s), n.isSubmitted, M, j),
              S = ne(s, m, v); if (A(a, s, h), v) { if (!o || !o.readOnly) { d._f.onBlur && d._f.onBlur(i); let
                  e = x[s];
                e && e(0) } } else d._f.onChange && d._f.onChange(i); let C = he(s, h, v),
              w = !z(C) || S; if (!v && B.state.next({ name: s, type: i.type, ...T ? { values: g(a) } : {} }),
              b) return (!y || !n.isValid) && (F.isValid || I.isValid) && (t.mode === `onBlur` ? v && U() : v ||
              U()), w && B.state.next({ name: s, ...S ? {} : C }); if (!t.resolver && e.validate &&
            await Ce({ name: s, eventType: i.type }), !v && S && B.state.next({ ...n }), t
              .resolver) { let { errors: e } = await q([s]); if (W([s]), p(h), !l) {!z(C) && B.state.next(
                C); return } let t = Ae(n.errors, r, s),
                i = Ae(e, r, t.name || s);
              c = i.error, s = i.name, u = z(e) } else W([s], !0), c = (await le(d, m.disabled, a, H, t
              .shouldUseNativeValidation))[s], W([s]), p(h), l && (c ? u = !1 : (F.isValid || I.isValid) && (
              u = await J({ fields: r, onlyCheckValid: !0, name: s, eventType: i.type })));
            l && (d._f.deps && (!Array.isArray(d._f.deps) || d._f.deps.length > 0) && Ke(d._f.deps), xe(s, u, c,
              C)) } }, Ge = (e, t) => { if (D(n.errors, t) && e.focus) return e.focus(), 1 }, Ke = async (e,
        i = {}) => { let a, o, s = ue(e); if (t.resolver) { let t = await Se(w(e) ? e : s);
            a = z(t), o = e ? !s.some(e => D(t, e)) : a } else e ? (o = (await Promise.all(s.map(
          async e => { let t = D(r, e); return await J({ fields: t && t._f ? {
                  [e]: t } : t, eventType: _.TRIGGER }) }))).every(Boolean), !(!o && !n.isValid) && U()) : o =
            a = await J({ fields: r, name: e, eventType: _.TRIGGER }); if (i.delayError && t.delayError && N(
              e)) { let r = D(n.errors, e);
            r ? (K(n.errors, e), x[e] = ae(e, () => ce(e, r)), x[e](t.delayError)) : (clearTimeout(S[e]),
              delete x[e]) } return B.state.next({ ...!N(e) || (F.isValid || I.isValid) && a !== n.isValid ?
              {} : { name: e }, ...t.resolver || !e ? { isValid: a } : {}, errors: n.errors }), i
            .shouldFocus && !o && R(r, Ge, e ? s : m.mount), o }, qe = (e, t) => { let r = { ...u.mount ? a :
            i }; return t && (r = _e(t.dirtyFields ? n.dirtyFields : n.touchedFields, r)), w(e) ? r : N(e) ?
            D(r, e) : e.map(e => D(r, e)) }, Je = (e, t) => ({ invalid: !!D((t || n).errors, e), isDirty: !!D(
            (t || n).dirtyFields, e), error: D((t || n).errors, e), isValidating: !!D(n.validatingFields,
            e), isTouched: !!D((t || n).touchedFields, e) }), Ye = e => { let t = e ? ue(e) : void 0;
          t?.forEach(e => K(n.errors, e)), t ? t.forEach(e => { B.state.next({ name: e, errors: n
                .errors }) }) : (n.errors = {}, B.state.next({ errors: n.errors })) }, Xe = (e, t, i) => { let
            a = (D(r, e, { _f: {} })._f || {}).ref,
            { ref: o, message: s, type: c, ...l } = D(n.errors, e) || {};
          A(n.errors, e, { ...l, ...t, ref: a }), B.state.next({ name: e, errors: n.errors, isValid: !1 }),
            i && i.shouldFocus && a && a.focus && a.focus() }, Ze = (e, t) => { if (k(
            e)) { T++; let { unsubscribe: n } = B.state.subscribe({ next: n => `values` in n && e(n.values ||
                ze(void 0, t), n) }), r = !1; return { unsubscribe: () => { r || (r = !0, T--,
              n()) } } } return ze(e, t, !0) }, Qe = e => { let t = !!e.formState?.values;
          t && T++; let { unsubscribe: r } = B.state.subscribe({ next: t => { if (Me(e.name, t.name, e
                .exact) && je(t, e.formState || F, ut, e.reRenderRoot)) { let r = { ...a };
                e.callback({ values: r, ...n, ...t, defaultValues: i }) } } }); if (!t) return r; let o = !
          1; return () => { o || (o = !0, T--, r()) } }, $e = e => (u.mount = !0, I = { ...I, ...e
            .formState }, Qe({ ...e, formState: { ...ee, ...e.formState } })), et = (e, o = {}) => { for (let
              s of e ? ue(e) : m.mount) m.mount.delete(s), m.array.delete(s), o.keepValue || (K(r, s), K(a,
              s)), !o.keepError && K(n.errors, s), !o.keepDirty && K(n.dirtyFields, s), !o.keepTouched && K(n
              .touchedFields, s), !o.keepIsValidating && K(n.validatingFields, s), !t.shouldUnregister && !o
            .keepDefaultValue && K(i, s);
          B.state.next({ values: g(a) }), B.state.next({ ...n, ...o.keepDirty ? { isDirty: Z() } : {} }), !o
            .keepIsValid && U() }, tt = ({ disabled: e, name: t }) => { if (O(e) && u.mount || e || m.disabled
            .has(t)) { let n = m.disabled.has(t) !== !!e;
            e ? m.disabled.add(t) : m.disabled.delete(t), n && u.mount && !u.action && U() } }, nt = (e,
          n = {}) => { let a = D(r, e),
            o = O(n.disabled) || O(t.disabled),
            s = !m.registerName.has(e) && a && a._f && !a._f.mount; return A(r, e, { ...a || {}, _f: { ...a &&
                a._f ? a._f : { ref: { name: e } }, name: e, mount: !0, ...n } }), m.mount.add(e), a && !s ?
            tt({ disabled: O(n.disabled) ? n.disabled : t.disabled, name: e }) : pe(e, !0, n.value), { ...o ?
              { disabled: n.disabled || t.disabled } : {}, ...t.progressive ? { required: !!n.required,
                min: X(n.min), max: X(n.max), minLength: X(n.minLength), maxLength: X(n.maxLength),
                pattern: X(n.pattern) } : {}, name: e, onChange: We, onBlur: We, ref: o => { if (o) { m
                    .registerName.add(e), nt(e, n), m.registerName.delete(e), a = D(r, e); let t = w(o
                      .value) && o.querySelectorAll && o.querySelectorAll(`input,select,textarea`)[0] || o,
                    s = ye(t),
                    c = a._f.refs || []; if (s ? c.find(e => e === t) : t === a._f.ref) return; let l = {
                    ...a._f };
                  s ? (l.refs = [...c.filter(be), t, ...Array.isArray(D(i, e)) ? [{}] : []], l
                  .ref = { type: t.type, name: e }) : (l.ref = t, delete l.refs), A(r, e, { _f: l }), pe(
                    e, !1, void 0, t) } else a = D(r, e, {}), a._f && (a._f.mount = !1), (t
                    .shouldUnregister || n.shouldUnregister) && !(p(m.array, e) && u.action) && m.unMount
                  .add(e) } } }, rt = () => t.shouldFocusError && !t.shouldUseNativeValidation && R(r, Ge, m
          .mount), it = e => { O(e) && (B.state.next({ disabled: e }), R(r, (t, n) => { let i = D(r, n);
            i && (t.disabled = i._f.disabled || e, Array.isArray(i._f.refs) && i._f.refs.forEach(
            t => { t.disabled = i._f.disabled || e })) }, 0, !1)) }, at = (e, i) => async o => { let s;
            o && (o.preventDefault && o.preventDefault(), o.persist && o.persist()); let c = g(a); if (B.state
              .next({ isSubmitting: !0 }), t.resolver) { let { errors: e, values: t } = await q();
              W(), n.errors = e, c = g(t) } else await J({ fields: r, eventType: _.SUBMIT }); if (m.disabled
              .size)
              for (let e of m.disabled) K(c, e); if (K(n.errors, b), z(n.errors)) { B.state
              .next({ errors: {} }); try { await e(c, o) } catch (e) { s = e } } else i && await i({ ...n
              .errors }, o), rt(), setTimeout(rt); if (B.state.next({ isSubmitted: !0, isSubmitting: !1,
                isSubmitSuccessful: z(n.errors) && !s, submitCount: n.submitCount + 1, errors: n.errors }), s)
              throw s }, ot = (e, t = {}) => { D(r, e) && (w(t.defaultValue) ? $(e, g(D(i, e))) : ($(e, t
                .defaultValue), A(i, e, g(t.defaultValue))), t.keepTouched || K(n.touchedFields, e), t
              .keepDirty || (K(n.dirtyFields, e), n.isDirty = t.defaultValue ? Z(e, g(D(i, e))) : Z()), t
              .keepError || (K(n.errors, e), F.isValid && U()), B.state.next({ ...n })) }, st = (e,
          o = {}) => { let s = e ? g(e) : i,
              c = g(s),
              l = z(e),
              d = c,
              f = r; if (o.keepDefaultValues || (i = s), !o.keepValues) { if (o.keepDirtyValues) { let e =
                  new Set([...m.mount, ...Object.keys(Y(i, a, void 0, f))]); for (let t of Array.from(
                  e)) { let e = D(n.dirtyFields, t),
                    r = D(a, t),
                    i = D(d, t);
                  e && !w(r) ? A(d, t, r) : !e && !w(i) && $(t, i) } } else { if (h && w(e))
                  for (let e of m.mount) { let t = D(r, e); if (t && t._f) { let e = Array.isArray(t._f
                        .refs) ? t._f.refs[0] : t._f.ref; if (ie(e)) { let t = e.closest(`form`); if (t) { t
                            .reset(); break } } } }
                if (o.keepFieldsRef)
                  for (let e of m.mount) $(e, D(d, e));
                else r = {} } if (t.shouldUnregister) { if (a = o.keepDefaultValues ? g(i) : {}, o
                  .keepFieldsRef)
                  for (let e of m.mount) A(a, e, D(d, e)) } else a = g(d);
              B.array.next({ values: { ...d } }), B.state.next({ name: void 0, type: void 0, values: { ...
                    d } }) } m = { mount: o.keepDirtyValues ? m.mount : new Set, unMount: new Set,
                array: new Set, registerName: new Set, disabled: new Set, watch: new Set, watchAll: !1,
                focus: `` }, u.mount = !F.isValid || !!o.keepIsValid || !!o.keepDirtyValues || !t
              .shouldUnregister && !z(d), u.watch = !!t.shouldUnregister, u.keepIsValid = !!o.keepIsValid, u
              .action = !1, o.keepErrors || (n.errors = {}), B.state.next({ submitCount: o.keepSubmitCount ? n
                  .submitCount : 0, isDirty: l ? !1 : o.keepDirty ? n.isDirty : o.keepValues ? Z() : !!(o
                  .keepDefaultValues && !L(e, i)), isSubmitted: o.keepIsSubmitted ? n.isSubmitted : !1,
                dirtyFields: l ? {} : o.keepDirtyValues ? o.keepDefaultValues && a ? Y(i, a, void 0, f) : n
                  .dirtyFields : o.keepDefaultValues && e ? Y(i, e, void 0, f) : o.keepDirty ? n
                  .dirtyFields : {}, touchedFields: o.keepTouched ? n.touchedFields : {}, errors: o
                  .keepErrors ? n.errors : {}, isSubmitSuccessful: o.keepIsSubmitSuccessful ? n
                  .isSubmitSuccessful : !1, isSubmitting: !1, defaultValues: i }) }, ct = (e, n) => st(k(e) ?
            e(a) : e, { ...t.resetOptions, ...n }), lt = (e, t = {}) => { let n = D(r, e),
              i = n && n._f; if (i) { let e = i.refs ? i.refs[0] : i.ref;
              e.focus && setTimeout(() => { e.focus(), t.shouldSelect && k(e.select) && e.select() }) } },
          ut = e => { let { name: t, type: r, values: i, ...a } = e;
            n = { ...n, ...a } }, dt = { control: { register: nt, unregister: et, getFieldState: Je,
              handleSubmit: at, setError: Xe, _subscribe: Qe, _runSchema: q, _updateIsValidating: W,
              _focusError: rt, _getWatch: ze, _getDirty: Z, _setValid: U, _setFieldArray: se,
              _setDisabledField: tt, _setErrors: G, _getFieldArray: Be, _reset: st, _resetDefaultValues: () =>
                k(t.defaultValues) && t.defaultValues().then(e => { ct(e, t.resetOptions), B.state
                .next({ isLoading: !1 }) }), _removeUnmounted: we, _disableForm: it, _subjects: B,
              _proxyFormState: F, get _fields() { return r }, get _formValues() { return a },
          get _state() { return u }, set _state(e) { u = e }, get _defaultValues() { return i },
          get _names() { return m }, set _names(e) { m = e }, get _formState() { return n },
          get _options() { return t }, set _options(e) { t = { ...t, ...e }, j = te(t.mode), M = te(t
                  .reValidateMode) } }, subscribe: $e, trigger: Ke, register: nt, handleSubmit: at, watch: Ze,
            setValue: $, setValues: Ue, getValues: qe, reset: ct, resetField: ot, resetDefaultValues: (e,
            t = {}) => { if (i = g(e), !t.keepDirty) { let e = Y(i, a, void 0, r);
                n.dirtyFields = e, n.isDirty = !z(e) } t.keepIsValid || U(), B.state.next({ ...n,
                defaultValues: i }) }, clearErrors: Ye, unregister: et, setError: Xe, setFocus: lt,
            getFieldState: Je }; return { ...dt, formControl: dt } }

function Be(e = {}) { let t = a.useRef(void 0),
    n = a.useRef(void 0),
    r = a.useRef(e.formControl),
    [i, o] = a.useState(() => ({ ...g(Re), isLoading: k(e.defaultValues), errors: e.errors || {}, disabled: e
        .disabled || !1, defaultValues: k(e.defaultValues) ? void 0 : e.defaultValues })); if (!t.current || e
    .formControl && r.current !== e.formControl) { if (r.current = e.formControl, e.formControl) t.current = { ...e
      .formControl, formState: i }, e.defaultValues && !k(e.defaultValues) && e.formControl.reset(e.defaultValues, e
      .resetOptions);
    else { let { formControl: n, ...r } = ze(e);
      t.current = { ...r, formState: i } } } let s = t.current.control; return s._options = e, ee(() => { let e = s
        ._subscribe({ formState: s._proxyFormState, callback: () => o({ ...s._formState, defaultValues: s
              ._defaultValues }), reRenderRoot: !0 }); return o(e => ({ ...e, isReady: !0 })), s._formState
        .isReady = !0, e }, [s]), a.useEffect(() => s._disableForm(e.disabled), [s, e.disabled]), a.useEffect(() => { e
        .mode && (s._options.mode = e.mode), e.reValidateMode && (s._options.reValidateMode = e.reValidateMode) }, [s,
      e.mode, e.reValidateMode
    ]), a.useEffect(() => { e.errors && (s._setErrors(e.errors), s._focusError()) }, [s, e.errors]), a.useEffect(
  () => { e.shouldUnregister && s._subjects.state.next({ values: s._getWatch() }) }, [s, e.shouldUnregister]), a
    .useEffect(() => { if (s._proxyFormState.isDirty) { let e = s._getDirty();
        e !== i.isDirty && s._subjects.state.next({ isDirty: e }) } }, [s, i.isDirty]), a.useEffect(() => { e.values &&
        !L(e.values, n.current) ? (s._reset(e.values, { keepFieldsRef: !0, ...s._options.resetOptions }), s._options
          .resetOptions?.keepIsValid || s._setValid(), n.current = e.values, o(e => ({ ...e }))) : s
        ._resetDefaultValues() }, [s, e.values]), a.useEffect(() => { s._state.mount || (s._setValid(), s._state
          .mount = !0), s._state.watch && (s._state.watch = !1, s._subjects.state.next({ ...s._formState })), s
        ._removeUnmounted() }), t.current.formState = a.useMemo(() => M(i, s), [s, i]), t.current }
var Q = (e, t, n) => { if (e && `reportValidity` in e) { let r = D(n, t);
      e.setCustomValidity(r && r.message || ``), e.reportValidity() } },
  Ve = (e, t) => { for (let n in t.fields) { let r = t.fields[n];
      r && r.ref && `reportValidity` in r.ref ? Q(r.ref, n, e) : r && r.refs && r.refs.forEach(t => Q(t, n, e)) } },
  He = (e, t) => { t.shouldUseNativeValidation && Ve(e, t); let n = {}; for (let r in e) { let i = D(t.fields, r),
        a = Object.assign(e[r] || {}, { ref: i && i.ref }); if ($(t.names || Object.keys(e), r)) { let e = Object
          .assign({}, D(n, r));
        A(e, `root`, a), A(n, r, e) } else A(n, r, a) } return n },
  $ = (e, t) => { let n = Ue(t).replace(/[.*+?^${}()|\\]/g, `\\$&`); return e.some(e => Ue(e).match(`^${n}\\.\\d+`)) };

function Ue(e) { return e.replace(/[\[\]]/g, ``) }

function We() { return We = Object.assign ? Object.assign.bind() : function(e) { for (var t = 1; t < arguments
        .length; t++) { var n = arguments[t]; for (var r in n)({}).hasOwnProperty.call(n, r) && (e[r] = n[
      r]) } return e }, We.apply(null, arguments) }

function Ge(e, t) { try { var n = e() } catch (e) { return t(e) } return n && n.then ? n.then(void 0, t) : n }

function Ke(e, t) { for (var n = {}; e.length;) { var r = e[0],
      i = r.code,
      a = r.message,
      o = r.path.join(`.`); if (!n[o]) { if (`unionErrors` in r) { var s = r.unionErrors.reduce(function(e,
        t) { return t.errors.length < e.errors.length ? t : e }).errors[0];
        n[o] = { message: s?.message ?? a, type: s?.code ?? i } } else n[o] = { message: a, type: i } } if (
      `unionErrors` in r && r.unionErrors.forEach(function(t) { return t.errors.forEach(function(t) { return e.push(
            t) }) }), t) { var c = n[o].types,
        l = c && c[r.code];
      n[o] = H(o, t, n, i, l ? [].concat(l, r.message) : r.message) } e.shift() } return n }

function qe(e, t) { for (var n = {}, r = function() { var r = e[0],
        i = r.code,
        a = r.message,
        o = r.path.join(`.`); if (!n[o]) { if (r.code === `invalid_union` && r.errors.length > 0) { var s = r.errors
            .reduce(function(e, t) { return t.length < e.length ? t : e })[0];
          n[o] = { message: s?.message ?? a, type: s?.code ?? i } } else n[o] = { message: a, type: i } } if (r
        .code === `invalid_union` && r.errors.forEach(function(t) { return t.forEach(function(t) { return e.push(
            We({}, t, { path: [].concat(r.path, t.path) })) }) }), t) { var c = n[o].types,
          l = c && c[r.code];
        n[o] = H(o, t, n, i, l ? [].concat(l, r.message) : r.message) } e.shift() }; e.length;) r(); return n }

function Je(e, t, a) { if (a === void 0 && (a = {}), function(e) { return `_def` in e && typeof e._def == `object` &&
        `typeName` in e._def }(e)) return function(n, r, i) { try { return Promise.resolve(Ge(
    function() { return Promise.resolve(e[a.mode === `sync` ? `parse` : `parseAsync`](n, t)).then(function(
          e) { return i.shouldUseNativeValidation && Ve({}, i), { errors: {}, values: a.raw ? Object
            .assign({}, n) : e } }) }, function(e) { if (function(e) { return Array.isArray(e?.issues) }(e))
          return { values: {}, errors: He(Ke(e.errors, !i.shouldUseNativeValidation && i.criteriaMode ===
              `all`), i) }; throw e })) } catch (e) { return Promise.reject(e) } }; if (function(e) { return `_zod` in
        e && typeof e._zod == `object` }(e)) return function(o, s, c) { try { return Promise.resolve(Ge(
    function() { return Promise.resolve((a.mode === `sync` ? r : n)(e, o, t)).then(function(e) { return c
            .shouldUseNativeValidation && Ve({}, c), { errors: {}, values: a.raw ? Object.assign({}, o) :
                e } }) }, function(e) { if (function(e) { return e instanceof i }(e)) return { values: {},
          errors: He(qe(e.issues, !c.shouldUseNativeValidation && c.criteriaMode === `all`),
        c) }; throw e })) } catch (e) { return Promise.reject(e) } }; throw Error(`Invalid input: not a Zod schema`) }
export { Be as n, Je as t };
