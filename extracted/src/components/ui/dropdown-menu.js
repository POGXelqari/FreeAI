/**
 * Source: https://use.ai/_next/static/chunks/dropdown-menu-D6_Lrewr.js
 * Module: dropdown-menu
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { t as r } from "./check-CWA6FeXs.js";
import { t as i } from "./chevron-right-Dw6SaFc4.js";
import { t as a } from "./circle-BS-Vzwf7.js";
import { a as o, n as s } from "./dist-DKq-7tPa.js";
import { t as c } from "./utils-DBS9-MOh.js";
import { r as l, t as u } from "./dist-Bk3YTB5a.js";
import { t as d } from "./dist-DHTrxFRs.js";
import { t as f } from "./dist-wURgM5if.js";
import { n as p, t as m } from "./dist-DNAaWyma.js";
import { t as h } from "./dist-CEdsmZbM.js";
import { n as ee, t as g } from "./dist-1ej2Hjrt.js";
import { i as te, n as ne, r as re, t as _ } from "./es2015-fuZyN7gw.js";
import { t as v } from "./dist-uRWxuiG0.js";
import { n as y, t as ie } from "./dist-DbhSOkZC.js";
import { i as b, n as ae, r as x, t as oe } from "./dist-jciTo-QL.js";
import { n as se, r as S, t as C } from "./dist-Bwy9E6PB.js";
var w = e(t(), 1),
  T = n(),
  ce = Object.defineProperty,
  E = (e, t) => ce(e, `name`, { value: t, configurable: !0 }),
  D = [`Enter`, ` `],
  O = [`ArrowDown`, `PageUp`, `Home`],
  le = [`ArrowUp`, `PageDown`, `End`],
  ue = [...O, ...le],
  de = { ltr: [...D, `ArrowRight`], rtl: [...D, `ArrowLeft`] },
  k = { ltr: [`ArrowLeft`], rtl: [`ArrowRight`] },
  A = `Menu`,
  [j, fe, pe] = y(A),
  [M, N] = d(A, [pe, b, S]),
  P = b(),
  me = S(),
  [F, I] = M(A),
  [he, L] = M(A),
  ge = E(e => { let { __scopeMenu: t, open: n = !1, children: r, dir: i, onOpenChange: a, modal: o = !0 } = e, s = P(t),
      [c, l] = w.useState(null), u = w.useRef(!1), d = h(a), f = ie(i); return w.useEffect(() => { let e = E(() => { u
            .current = !0, document.addEventListener(`pointerdown`, t, { capture: !0, once: !0 }), document
            .addEventListener(`pointermove`, t, { capture: !0, once: !0 }) }, `handleKeyDown`),
        t = E(() => u.current = !1, `handlePointer`); return document.addEventListener(`keydown`, e, { capture: !
          0 }), () => { document.removeEventListener(`keydown`, e, { capture: !0 }), document
          .removeEventListener(`pointerdown`, t, { capture: !0 }), document.removeEventListener(`pointermove`,
            t, { capture: !0 }) } }, []), w.useEffect(() => { if (!n) return; let e = E(() => d(!1),
      `handleBlur`); return window.addEventListener(`blur`, e), () => window.removeEventListener(`blur`, e) }, [n,
      d
    ]), (0, T.jsx)(x, { ...s, children: (0, T.jsx)(F, { scope: t, open: n, onOpenChange: d, content: c,
        onContentChange: l, children: (0, T.jsx)(he, { scope: t, onClose: w.useCallback(() => d(!1), [d]),
          isUsingKeyboardRef: u, dir: f, modal: o, children: r }) }) }) }, `Menu`),
  R = w.forwardRef(E(function(e, t) { let { __scopeMenu: n, ...r } = e, i = P(n); return (0, T.jsx)(oe, { ...i, ...r,
      ref: t }) }, `MenuAnchor`)),
  z = `MenuPortal`,
  [_e, ve] = M(z, { forceMount: void 0 }),
  ye = E(e => { let { __scopeMenu: t, forceMount: n, children: r, container: i } = e, a = I(z, t); return (0, T.jsx)(
    _e, { scope: t, forceMount: n, children: (0, T.jsx)(v, { present: n || a.open, children: (0, T.jsx)(
        g, { asChild: !0, container: i, children: r }) }) }) }, `MenuPortal`),
  B = `MenuContent`,
  [be, V] = M(B),
  xe = w.forwardRef(E(function(e, t) { let n = ve(B, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...i } = e,
      a = I(B, e.__scopeMenu),
      o = L(B, e.__scopeMenu); return (0, T.jsx)(j.Provider, { scope: e.__scopeMenu, children: (0, T.jsx)(
      v, { present: r || a.open, children: (0, T.jsx)(j.Slot, { scope: e.__scopeMenu, children: o.modal ? (
            0, T.jsx)(Se, { ...i, ref: t }) : (0, T.jsx)(Ce, { ...i, ref: t }) }) }) }) }, `MenuContent`)),
  Se = w.forwardRef(E(function(e, t) { let n = I(B, e.__scopeMenu),
      r = w.useRef(null),
      i = o(t, r); return w.useEffect(() => { let e = r.current; if (e) return _(e) }, []), (0, T.jsx)(H, { ...e,
      ref: i, trapFocus: n.open, disableOutsidePointerEvents: n.open, disableOutsideScroll: !0,
      onFocusOutside: l(e.onFocusOutside, e => e.preventDefault(), { checkForDefaultPrevented: !1 }),
      onDismiss: () => n.onOpenChange(!1) }) }, `MenuRootContentModal`)),
  Ce = w.forwardRef(E(function(e, t) { let n = I(B, e.__scopeMenu); return (0, T.jsx)(H, { ...e, ref: t, trapFocus: !1,
        disableOutsidePointerEvents: !1, disableOutsideScroll: !1, onDismiss: () => n.onOpenChange(!1) }) },
    `MenuRootContentNonModal`)),
  we = s(`MenuContent.ScrollLock`),
  H = w.forwardRef(E(function(e, t) { let { __scopeMenu: n, loop: r = !1, trapFocus: i, onOpenAutoFocus: a,
      onCloseAutoFocus: s, disableOutsidePointerEvents: c, onEntryFocus: u, onEscapeKeyDown: d,
      onPointerDownOutside: f, onFocusOutside: p, onInteractOutside: m, onDismiss: h, disableOutsideScroll: g, ...
      _ } = e, v = I(B, n), y = L(B, n), ie = P(n), b = me(n), x = fe(n), [oe, S] = w.useState(null), C = w.useRef(
      null), ce = o(t, C, v.onContentChange), D = w.useRef(0), O = w.useRef(``), de = w.useRef(0), k = w.useRef(
      null), A = w.useRef(`right`), j = w.useRef(0), pe = g ? ne : w.Fragment, M = g ? { as: we, allowPinchZoom: !
        0 } : void 0, N = E(e => { let t = O.current + e,
          n = x().filter(e => !e.disabled),
          r = document.activeElement,
          i = n.find(e => e.ref.current === r)?.textValue,
          a = Je(n.map(e => e.textValue), t, i),
          o = n.find(e => e.textValue === a)?.ref.current;
        E((function e(t) { O.current = t, window.clearTimeout(D.current), t !== `` && (D.current = window
            .setTimeout(() => e(``), 1e3)) }), `updateSearch`)(t), o && setTimeout(() => o.focus()) },
      `handleTypeaheadSearch`);
    w.useEffect(() => () => window.clearTimeout(D.current), []), re(); let F = w.useCallback(e => A.current === k
      .current?.side && Xe(e, k.current?.area), []); return (0, T.jsx)(be, { scope: n, searchRef: O, onItemEnter: w
        .useCallback(e => { F(e) && e.preventDefault() }, [F]), onItemLeave: w.useCallback(e => { F(e) || (C
          .current?.focus(), S(null)) }, [F]), onTriggerLeave: w.useCallback(e => { F(e) && e
        .preventDefault() }, [F]), pointerGraceTimerRef: de, onPointerGraceIntentChange: w.useCallback(e => { k
          .current = e }, []), children: (0, T.jsx)(pe, { ...M, children: (0, T.jsx)(te, { asChild: !0,
          trapped: i, onMountAutoFocus: l(a, e => { e.preventDefault(), C.current
          ?.focus({ preventScroll: !0 }) }), onUnmountAutoFocus: s, children: (0, T.jsx)(ee, { asChild:
              !0, disableOutsidePointerEvents: c, onEscapeKeyDown: d, onPointerDownOutside: f,
            onFocusOutside: p, onInteractOutside: m, onDismiss: h, children: (0, T.jsx)(
            se, { asChild: !0, ...b, dir: y.dir, orientation: `vertical`, loop: r,
              currentTabStopId: oe, onCurrentTabStopIdChange: S, onEntryFocus: l(u, e => { y
                  .isUsingKeyboardRef.current || e.preventDefault() }),
              preventScrollOnEntryFocus: !0, children: (0, T.jsx)(
            ae, { role: `menu`, "aria-orientation": `vertical`, "data-state": K(v
                .open), "data-radix-menu-content": ``, dir: y.dir, ...ie, ..._, ref: ce,
                style: { outline: `none`, ..._.style }, onKeyDown: l(_.onKeyDown, e => { let
                    t = e.target.closest(`[data-radix-menu-content]`) === e
                    .currentTarget,
                    n = e.ctrlKey || e.altKey || e.metaKey,
                    r = e.key.length === 1;
                  t && (e.key === `Tab` && e.preventDefault(), !n && r && N(e.key)); let
                    i = C.current; if (e.target !== i || !ue.includes(e.key)) return;
                  e.preventDefault(); let a = x().filter(e => !e.disabled).map(e => e
                    .ref.current);
                  le.includes(e.key) && a.reverse(), Ke(a) }), onBlur: l(e.onBlur, e => { e
                    .currentTarget.contains(e.target) || (window.clearTimeout(D
                      .current), O.current = ``) }), onPointerMove: l(e.onPointerMove, Y(
                  e => { let t = e.target,
                      n = j.current !== e.clientX; if (e.currentTarget.contains(t) &&
                      n) { let t = e.clientX > j.current ? `right` : `left`;
                      A.current = t, j.current = e.clientX } })) }) }) }) }) }) }) }, `MenuContentImpl`)),
  Te = w.forwardRef(E(function(e, t) { let { __scopeMenu: n, ...r } = e; return (0, T.jsx)(m.div, { role: `group`, ...r,
      ref: t }) }, `MenuGroup`)),
  Ee = w.forwardRef(E(function(e, t) { let { __scopeMenu: n, ...r } = e; return (0, T.jsx)(m.div, { ...r, ref: t }) },
    `MenuLabel`)),
  U = `MenuItem`,
  De = `menu.itemSelect`,
  W = w.forwardRef(E(function(e, t) { let { disabled: n = !1, onSelect: r, ...i } = e, a = w.useRef(null), s = L(U, e
      .__scopeMenu), c = V(U, e.__scopeMenu), u = o(t, a), d = w.useRef(!1), f = E(() => { let e = a.current; if (
        !n && e) { let t = new CustomEvent(De, { bubbles: !0, cancelable: !0 });
        e.addEventListener(De, e => r?.(e), { once: !0 }), p(e, t), t.defaultPrevented ? d.current = !1 : s
          .onClose() } }, `handleSelect`); return (0, T.jsx)(Oe, { ...i, ref: u, disabled: n, onClick: l(e.onClick,
        f), onPointerDown: t => { e.onPointerDown?.(t), d.current = !0 }, onPointerUp: l(e.onPointerUp, e => { d
          .current || e.currentTarget?.click() }), onKeyDown: l(e.onKeyDown, e => { n || e.target !== e
          .currentTarget || (c.searchRef.current === `` || e.key !== ` `) && D.includes(e.key) && (e
            .currentTarget.click(), e.preventDefault()) }) }) }, `MenuItem`)),
  Oe = w.forwardRef(E(function(e, t) { let { __scopeMenu: n, disabled: r = !1, textValue: i, ...a } = e, s = V(U, n),
        c = me(n), u = w.useRef(null), d = o(t, u), [f, p] = w.useState(!1), [h, ee] = w.useState(``); return w
        .useEffect(() => { let e = u.current;
          e && ee((e.textContent ?? ``).trim()) }, [a.children]), (0, T.jsx)(j.ItemSlot, { scope: n, disabled: r,
          textValue: i ?? h, children: (0, T.jsx)(C, { asChild: !0, ...c, focusable: !r, children: (0, T.jsx)(m
            .div, { role: `menuitem`, "data-highlighted": f ? `` : void 0, "aria-disabled": r ||
              void 0, "data-disabled": r ? `` : void 0, ...a, ref: d, onPointerMove: l(e.onPointerMove, Y(
                e => { r ? s.onItemLeave(e) : (s.onItemEnter(e), e.defaultPrevented || e.currentTarget
                    .focus({ preventScroll: !0 })) })), onPointerLeave: l(e.onPointerLeave, Y(e => s
                .onItemLeave(e))), onFocus: l(e.onFocus, () => p(!0)), onBlur: l(e.onBlur, () => p(!1)) }) }) }) },
    `MenuItemImpl`)),
  ke = w.forwardRef(E(function(e, t) { let { checked: n = !1, onCheckedChange: r, ...i } = e; return (0, T.jsx)(
      Fe, { scope: e.__scopeMenu, checked: n, children: (0, T.jsx)(
      W, { role: `menuitemcheckbox`, "aria-checked": q(n) ? `mixed` : n, ...i, ref: t, "data-state": J(n),
          onSelect: l(i.onSelect, () => r?.(q(n) ? !0 : !n), { checkForDefaultPrevented: !1 }) }) }) },
    `MenuCheckboxItem`)),
  [Ae, je] = M(`MenuRadioGroup`, { value: void 0, onValueChange: E(() => {}, `onValueChange`) }),
  Me = `MenuRadioItem`,
  Ne = w.forwardRef(E(function(e, t) { let { value: n, ...r } = e, i = je(Me, e.__scopeMenu), a = n === i
    .value; return (0, T.jsx)(Fe, { scope: e.__scopeMenu, checked: a, children: (0, T.jsx)(
        W, { role: `menuitemradio`, "aria-checked": a, ...r, ref: t, "data-state": J(a), onSelect: l(r
            .onSelect, () => i.onValueChange?.(n), { checkForDefaultPrevented: !1 }) }) }) }, `MenuRadioItem`)),
  Pe = `MenuItemIndicator`,
  [Fe, Ie] = M(Pe, { checked: !1 }),
  Le = w.forwardRef(E(function(e, t) { let { __scopeMenu: n, forceMount: r, ...i } = e, a = Ie(Pe, n); return (0, T.jsx)
      (v, { present: r || q(a.checked) || a.checked === !0, children: (0, T.jsx)(m.span, { ...i,
        ref: t, "data-state": J(a.checked) }) }) }, `MenuItemIndicator`)),
  Re = w.forwardRef(E(function(e, t) { let { __scopeMenu: n, ...r } = e; return (0, T.jsx)(m
  .div, { role: `separator`, "aria-orientation": `horizontal`, ...r, ref: t }) }, `MenuSeparator`)),
  ze = `MenuSub`,
  [Be, Ve] = M(ze),
  He = E(e => { let { __scopeMenu: t, children: n, open: r = !1, onOpenChange: i } = e, a = I(ze, t), o = P(t), [s, c] =
      w.useState(null), [l, u] = w.useState(null), d = h(i); return w.useEffect(() => (a.open === !1 && d(!1), () =>
      d(!1)), [a.open, d]), (0, T.jsx)(x, { ...o, children: (0, T.jsx)(F, { scope: t, open: r, onOpenChange: d,
        content: l, onContentChange: u, children: (0, T.jsx)(Be, { scope: t, contentId: f(), triggerId: f(),
          trigger: s, onTriggerChange: c, children: n }) }) }) }, `MenuSub`),
  G = `MenuSubTrigger`,
  Ue = w.forwardRef(E(function(e, t) { let n = I(G, e.__scopeMenu),
        r = L(G, e.__scopeMenu),
        i = Ve(G, e.__scopeMenu),
        a = V(G, e.__scopeMenu),
        s = w.useRef(null),
        { pointerGraceTimerRef: c, onPointerGraceIntentChange: u } = a,
        d = { __scopeMenu: e.__scopeMenu },
        f = w.useCallback(() => { s.current && window.clearTimeout(s.current), s.current = null }, []);
      w.useEffect(() => f, [f]), w.useEffect(() => { let e = c.current; return () => { window.clearTimeout(e), u(
            null) } }, [c, u]); let p = o(t, i.onTriggerChange); return (0, T.jsx)(R, { asChild: !0, ...d, children: (
          0, T.jsx)(Oe, { id: i.triggerId, "aria-haspopup": `menu`, "aria-expanded": n.open, "aria-controls": n
            .open ? i.contentId : void 0, "data-state": K(n.open), ...e, ref: p, onClick: t => { e.onClick?.(
              t), !(e.disabled || t.defaultPrevented) && (t.currentTarget.focus(), n.open || n
              .onOpenChange(!0)) }, onPointerMove: l(e.onPointerMove, Y(t => { a.onItemEnter(t), !t
              .defaultPrevented && !e.disabled && !n.open && !s.current && (a
                .onPointerGraceIntentChange(null), s.current = window.setTimeout(() => { n.onOpenChange(
                    !0), f() }, 100)) })), onPointerLeave: l(e.onPointerLeave, Y(e => { f(); let t = n.content
              ?.getBoundingClientRect(); if (t) { let r = n.content?.dataset.side,
                i = r === `right`,
                o = i ? -5 : 5,
                s = t[i ? `left` : `right`],
                l = t[i ? `right` : `left`];
              a.onPointerGraceIntentChange({ area: [{ x: e.clientX + o, y: e.clientY }, { x: s, y: t
                    .top }, { x: l, y: t.top }, { x: l, y: t.bottom }, { x: s, y: t.bottom }
                ], side: r }), window.clearTimeout(c.current), c.current = window.setTimeout(() => a
                .onPointerGraceIntentChange(null), 300) } else { if (a.onTriggerLeave(e), e
                .defaultPrevented) return;
              a.onPointerGraceIntentChange(null) } })), onKeyDown: l(e.onKeyDown, t => { e.disabled || t
              .target !== t.currentTarget || (a.searchRef.current === `` || t.key !== ` `) && de[r.dir]
              .includes(t.key) && (n.onOpenChange(!0), n.content?.focus(), t.preventDefault()) }) }) }) },
    `MenuSubTrigger`)),
  We = `MenuSubContent`,
  Ge = w.forwardRef(E(function(e, t) { let n = ve(B, e.__scopeMenu),
        { forceMount: r = n.forceMount, align: i = `start`, ...a } = e,
        s = I(B, e.__scopeMenu),
        c = L(B, e.__scopeMenu),
        u = Ve(We, e.__scopeMenu),
        d = w.useRef(null),
        f = o(t, d); return (0, T.jsx)(j.Provider, { scope: e.__scopeMenu, children: (0, T.jsx)(v, { present: r || s
            .open, children: (0, T.jsx)(j.Slot, { scope: e.__scopeMenu, children: (0, T.jsx)(H, { id: u
                .contentId, "aria-labelledby": u.triggerId, ...a, ref: f, align: i, side: c.dir ===
                `rtl` ? `left` : `right`, disableOutsidePointerEvents: !1, disableOutsideScroll: !1,
              trapFocus: !1, onOpenAutoFocus: e => { c.isUsingKeyboardRef.current && d.current
                ?.focus(), e.preventDefault() }, onCloseAutoFocus: e => e.preventDefault(),
              onFocusOutside: l(e.onFocusOutside, e => { e.target !== u.trigger && s.onOpenChange(!
                  1) }), onEscapeKeyDown: l(e.onEscapeKeyDown, e => { c.onClose(), e
                .preventDefault() }), onKeyDown: l(e.onKeyDown, e => { let t = e.currentTarget
                  .contains(e.target),
                  n = k[c.dir].includes(e.key);
                t && n && (s.onOpenChange(!1), u.trigger?.focus(), e.preventDefault()) }) }) }) }) }) },
    `MenuSubContent`));

function K(e) { return e ? `open` : `closed` } E(K, `getOpenState`);

function q(e) { return e === `indeterminate` } E(q, `isIndeterminate`);

function J(e) { return q(e) ? `indeterminate` : e ? `checked` : `unchecked` } E(J, `getCheckedState`);

function Ke(e) { let t = document.activeElement; for (let n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return } E(Ke, `focusFirst`);

function qe(e, t) { return e.map((n, r) => e[(t + r) % e.length]) } E(qe, `wrapArray`);

function Je(e, t, n) { let r = t.length > 1 && Array.from(t).every(e => e === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1,
    a = qe(e, Math.max(i, 0));
  r.length === 1 && (a = a.filter(e => e !== n)); let o = a.find(e => e.toLowerCase().startsWith(r
.toLowerCase())); return o === n ? void 0 : o } E(Je, `getNextMatch`);

function Ye(e, t) { let { x: n, y: r } = e, i = !1; for (let e = 0, a = t.length - 1; e < t.length; a = e++) { let o =
      t[e],
      s = t[a],
      c = o.x,
      l = o.y,
      u = s.x,
      d = s.y;
    l > r != d > r && n < (u - c) * (r - l) / (d - l) + c && (i = !i) } return i } E(Ye, `isPointInPolygon`);

function Xe(e, t) { return t ? Ye({ x: e.clientX, y: e.clientY }, t) : !1 } E(Xe, `isPointerInGraceArea`);

function Y(e) { return t => t.pointerType === `mouse` ? e(t) : void 0 } E(Y, `whenMouse`);
var Ze = ge,
  Qe = R,
  $e = ye,
  et = xe,
  tt = Te,
  nt = Ee,
  rt = W,
  it = ke,
  at = Ne,
  ot = Le,
  st = Re,
  ct = He,
  lt = Ue,
  ut = Ge,
  dt = Object.defineProperty,
  X = (e, t) => dt(e, `name`, { value: t, configurable: !0 }),
  Z = `DropdownMenu`,
  [ft, pt] = d(Z, [N]),
  Q = N(),
  [mt, ht] = ft(Z),
  gt = X(e => { let { __scopeDropdownMenu: t, children: n, dir: r, open: i, defaultOpen: a, onOpenChange: o,
      modal: s = !0 } = e, c = Q(t), l = w.useRef(null), [d, p] = u({ prop: i, defaultProp: a ?? !1, onChange: o,
      caller: Z }); return (0, T.jsx)(mt, { scope: t, triggerId: f(), triggerRef: l, contentId: f(), open: d,
      onOpenChange: p, onOpenToggle: w.useCallback(() => p(e => !e), [p]), modal: s, children: (0, T.jsx)(Ze, {
        ...c, open: d, onOpenChange: p, dir: r, modal: s, children: n }) }) }, `DropdownMenu`),
  _t = `DropdownMenuTrigger`,
  vt = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, disabled: r = !1, ...i } = e, a = ht(_t, n), s = Q(
      n), c = o(t, a.triggerRef); return (0, T.jsx)(Qe, { asChild: !0, ...s, children: (0, T.jsx)(m
      .button, { type: `button`, id: a.triggerId, "aria-haspopup": `menu`, "aria-expanded": a
        .open, "aria-controls": a.open ? a.contentId : void 0, "data-state": a.open ? `open` :
        `closed`, "data-disabled": r ? `` : void 0, disabled: r, ...i, ref: c, onPointerDown: l(e
          .onPointerDown, e => {!r && e.button === 0 && e.ctrlKey === !1 && (a.onOpenToggle(), a.open || e
              .preventDefault()) }), onKeyDown: l(e.onKeyDown, e => { r || ([`Enter`, ` `].includes(e
            .key) && a.onOpenToggle(), e.key === `ArrowDown` && a.onOpenChange(!0), [`Enter`, ` `,
              `ArrowDown`
            ].includes(e.key) && e.preventDefault()) }) }) }) }, `DropdownMenuTrigger`)),
  yt = X(e => { let { __scopeDropdownMenu: t, ...n } = e, r = Q(t); return (0, T.jsx)($e, { ...r, ...n }) },
    `DropdownMenuPortal`),
  bt = `DropdownMenuContent`,
  xt = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = ht(bt, n), a = Q(n), o = w.useRef(!
        1); return (0, T.jsx)(et, { id: i.contentId, "aria-labelledby": i.triggerId, ...a, ...r, ref: t,
        onCloseAutoFocus: l(e.onCloseAutoFocus, e => { o.current || i.triggerRef.current?.focus(), o.current = !1,
            e.preventDefault() }), onInteractOutside: l(e.onInteractOutside, e => { let t = e.detail
            .originalEvent,
            n = t.button === 0 && t.ctrlKey === !0,
            r = t.button === 2 || n;
          (!i.modal || r) && (o.current = !0) }), style: { ...e
          .style, "--radix-dropdown-menu-content-transform-origin": `var(--radix-popper-transform-origin)`, "--radix-dropdown-menu-content-available-width": `var(--radix-popper-available-width)`, "--radix-dropdown-menu-content-available-height": `var(--radix-popper-available-height)`, "--radix-dropdown-menu-trigger-width": `var(--radix-popper-anchor-width)`, "--radix-dropdown-menu-trigger-height": `var(--radix-popper-anchor-height)` } }) },
    `DropdownMenuContent`)),
  St = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = Q(n); return (0, T.jsx)(tt, { ...i,
      ...r, ref: t }) }, `DropdownMenuGroup`)),
  Ct = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = Q(n); return (0, T.jsx)(nt, { ...i,
      ...r, ref: t }) }, `DropdownMenuLabel`)),
  wt = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = Q(n); return (0, T.jsx)(rt, { ...i,
      ...r, ref: t }) }, `DropdownMenuItem`)),
  Tt = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = Q(n); return (0, T.jsx)(it, { ...i,
      ...r, ref: t }) }, `DropdownMenuCheckboxItem`)),
  Et = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = Q(n); return (0, T.jsx)(at, { ...i,
      ...r, ref: t }) }, `DropdownMenuRadioItem`)),
  Dt = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = Q(n); return (0, T.jsx)(ot, { ...i,
      ...r, ref: t }) }, `DropdownMenuItemIndicator`)),
  Ot = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = Q(n); return (0, T.jsx)(st, { ...i,
      ...r, ref: t }) }, `DropdownMenuSeparator`)),
  kt = X(e => { let { __scopeDropdownMenu: t, children: n, open: r, onOpenChange: i, defaultOpen: a } = e, o = Q(t), [s,
      c
    ] = u({ prop: r, defaultProp: a ?? !1, onChange: i, caller: `DropdownMenuSub` }); return (0, T.jsx)(ct, { ...o,
      open: s, onOpenChange: c, children: n }) }, `DropdownMenuSub`),
  At = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = Q(n); return (0, T.jsx)(lt, { ...i,
      ...r, ref: t }) }, `DropdownMenuSubTrigger`)),
  jt = w.forwardRef(X(function(e, t) { let { __scopeDropdownMenu: n, ...r } = e, i = Q(n); return (0, T.jsx)(ut, { ...i,
        ...r, ref: t, style: { ...e
          .style, "--radix-dropdown-menu-content-transform-origin": `var(--radix-popper-transform-origin)`, "--radix-dropdown-menu-content-available-width": `var(--radix-popper-available-width)`, "--radix-dropdown-menu-content-available-height": `var(--radix-popper-available-height)`, "--radix-dropdown-menu-trigger-width": `var(--radix-popper-anchor-width)`, "--radix-dropdown-menu-trigger-height": `var(--radix-popper-anchor-height)` } }) },
    `DropdownMenuSubContent`)),
  Mt = gt,
  Nt = vt,
  Pt = yt,
  Ft = xt,
  It = St,
  Lt = Ct,
  Rt = wt,
  $ = Tt,
  zt = Et,
  Bt = Dt,
  Vt = Ot,
  Ht = kt,
  Ut = At,
  Wt = jt,
  Gt = ({ modal: e = !1, ...t }) => (0, T.jsx)(Mt, { modal: e, ...t }),
  Kt = Nt,
  qt = It,
  Jt = Ht,
  Yt = w.forwardRef(({ className: e, inset: t, children: n, ...r }, a) => (0, T.jsxs)(Ut, { ref: a, className: c(
      `flex cursor-default items-center gap-2 rounded-[8px] px-2 py-1.5 text-sm outline-none select-none focus:bg-gray-100 data-[state=open]:bg-gray-100 dark:focus:bg-gray-100/10 dark:data-[state=open]:bg-gray-100/10 [&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0`,
      t && `pl-8`, e), ...r, children: [n, (0, T.jsx)(i, { className: `ml-auto` })] }));
Yt.displayName = Ut.displayName;
var Xt = w.forwardRef(({ className: e, ...t }, n) => (0, T.jsx)(Wt, { ref: n, className: c(
    `border-border bg-paper text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[2rem] origin-[--radix-dropdown-menu-content-transform-origin] overflow-hidden rounded-[12px] border p-1 dark:border-[#242424]`,
    e), ...t }));
Xt.displayName = Wt.displayName;
var Zt = w.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => (0, T.jsx)(Pt, { children: (0, T.jsx)(
  Ft, { ref: r, sideOffset: t, className: c(
      `border-border bg-paper text-popover-foreground z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[2rem] overflow-x-hidden overflow-y-auto rounded-[14px] border p-1 ![box-shadow:0_0_8px_0_rgb(0_0_0_/_0.1)] dark:border-[#242424]`,
      `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]`,
      e), ...n }) }));
Zt.displayName = Ft.displayName;
var Qt = w.forwardRef(({ className: e, inset: t, ...n }, r) => (0, T.jsx)(Rt, { ref: r, className: c(
    `text-foreground focus:text-foreground relative flex cursor-pointer items-center gap-2 rounded-[8px] px-2 py-1.5 text-sm transition-colors outline-none select-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-100/10 [&>svg]:size-[18px] [&>svg]:shrink-0`,
    t && `pl-8`, e), ...n }));
Qt.displayName = Rt.displayName;
var $t = w.forwardRef(({ className: e, children: t, checked: n, ...i }, a) => (0, T.jsxs)($, { ref: a, className: c(
    `focus:text-foreground relative flex cursor-default items-center rounded-[8px] py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-100/10`,
    e), checked: n, ...i, children: [(0, T.jsx)(
  `span`, { className: `absolute left-2 flex h-3.5 w-3.5 items-center justify-center`, children: (0, T.jsx)(
      Bt, { children: (0, T.jsx)(r, { className: `h-4 w-4` }) }) }), t] }));
$t.displayName = $.displayName;
var en = w.forwardRef(({ className: e, children: t, ...n }, r) => (0, T.jsxs)(zt, { ref: r, className: c(
    `focus:text-foreground relative flex cursor-default items-center rounded-[8px] py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-100/10`,
    e), ...n, children: [(0, T.jsx)(
  `span`, { className: `absolute left-2 flex h-3.5 w-3.5 items-center justify-center`, children: (0, T.jsx)(
      Bt, { children: (0, T.jsx)(a, { className: `h-2 w-2 fill-current` }) }) }), t] }));
en.displayName = zt.displayName;
var tn = w.forwardRef(({ className: e, inset: t, ...n }, r) => (0, T.jsx)(Lt, { ref: r, className: c(
    `px-2 py-1.5 text-sm font-semibold`, t && `pl-8`, e), ...n }));
tn.displayName = Lt.displayName;
var nn = w.forwardRef(({ className: e, ...t }, n) => (0, T.jsx)(Vt, { ref: n, className: c(`bg-border mx-2 my-0 h-px`,
    e), ...t }));
nn.displayName = Vt.displayName;
export { nn as a, Yt as c, Qt as i, Kt as l, Zt as n, Jt as o, qt as r, Xt as s, Gt as t };
