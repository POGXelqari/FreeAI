/**
 * Source: https://use.ai/_next/static/chunks/email.util-D8k5pUXC.js
 * Module: email.util
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t, r as n } from "./framework-D-uKrMmN.js";
import { $ as r } from "./vinext-CqpRraGS.js";
import { t as i } from "./useMutation-DldRSjFA.js";
import { r as a } from "./react-CWjhjU4R.js";
import { Xt as o, y as s } from "./env-C6AULCj5.js";
import { n as c, t as l } from "./better-auth-client.service-Ck6mOMB1.js";
import { n as u } from "./better-auth-client-session.service-ercwbZKT.js";
import { r as d } from "./intl-5y7Gu4iP.js";
import { t as f } from "./auth.store-CecpbI3z.js";
import { t as p } from "./paywall-intent.util-T2BKTtbQ.js";
import { n as m } from "./ssr-session-heal-cooldown.util-2TKQmNmV.js";
var h = function(e) { return e.EMAIL_LOGIN_MUTATION = `email-login-mutation`, e }({}),
  g = async e => { let t = await fetch(c(`/api/auth/email-login`), { method: `POST`,
        headers: { "Content-Type": `application/json` }, body: JSON.stringify(e), credentials: `include` }); if (!t
        .ok && t.status !== 429) throw Error(`HTTP error! status: ${t.status}`); return t.json() }, _ = e =>
  i({ mutationKey: [h.EMAIL_LOGIN_MUTATION], mutationFn: g, onSuccess: e?.onSuccess, onError: e?.onError, onMutate: e
        ?.onMutate }), v = e(t()), y = n(), b = e => (0, y.jsx)(`svg`, { viewBox: `0 0 24 24`, fill: `none`,
      xmlns: `http://www.w3.org/2000/svg`, ...e, children: (0, y.jsx)(
      `path`, { d: `M18.6711 22.7961C17.3782 24.0494 15.9667 23.8515 14.6079 23.2578C13.1699 22.651 11.8507 22.6246 10.3336 23.2578C8.43394 24.0758 7.43133 23.8383 6.2968 22.7961C-0.14099 16.1604 0.808848 6.05522 8.11732 5.68584C9.89827 5.77818 11.1383 6.66206 12.1805 6.74121C13.7372 6.4246 15.2279 5.51434 16.8901 5.63307C18.8822 5.79137 20.3861 6.5829 21.3755 8.00766C17.2595 10.4746 18.2357 15.8966 22.0087 17.4137C21.2567 19.3925 20.2805 21.3582 18.6579 22.8093L18.6711 22.7961ZM12.0486 5.60668C11.8507 2.66482 14.2385 0.237459 16.9825 0C17.3651 3.40359 13.8955 5.93649 12.0486 5.60668Z`,
        fill: `currentColor` }) }), x = e => (0, y.jsxs)(`svg`, { role: `img`, fill: `none`, viewBox: `0 0 24 24`,
      xmlns: `http://www.w3.org/2000/svg`, ...e, children: [(0, y.jsx)(`title`, { children: `Facebook` }), (0, y.jsx)(
        `path`, { d: `M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z`,
          fill: `#0866FF`, fillRule: `evenodd` })] }), S = e => (0, y.jsxs)(
    `svg`, { xmlns: `http://www.w3.org/2000/svg`, viewBox: `0 0 24 24`, "aria-hidden": `true`, ...e, children: [(0, y
        .jsx)(
      `path`, { d: `M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z`,
        fill: `#EA4335` }), (0, y.jsx)(
      `path`, { d: `M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z`,
        fill: `#4285F4` }), (0, y.jsx)(
      `path`, { d: `M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z`,
        fill: `#FBBC05` }), (0, y.jsx)(
      `path`, { d: `M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z`,
        fill: `#34A853` })] }), C = 3e3, w = (e, t) => e === `/${t}` ? `/` : e.startsWith(`/${t}?`) ?
    `/${e.slice(t.length+1)}` : e.startsWith(`/${t}/`) ? e.slice(t.length + 1) : e, T = 8e3, E = 25, D = e => e.split(
      `?`)[0].split(`#`)[0], O = e => new Promise(t => { if (e()) { t(!0); return } let n = Date.now(),
        r = window.setInterval(() => { if (e()) { window.clearInterval(r), t(!0); return } Date.now() - n >= T && (
            window.clearInterval(r), t(!1)) }, E) }), k = e => { let t = D(e); return O(() => window.location
        .pathname === t) }, A = e => O(() => window.location.search !== e);

function j() { let e = d(),
    t = a(),
    n = r(),
    { refetch: i } = u(); return (0, v.useCallback)(async r => { let { setPostAuthTransition: a } = f.getState();
    a(!0), setTimeout(() => a(!1), 1e4), m(); let o = () => { new URL(r, window.location.origin).searchParams.has(
        `paywall`) && p(), window.location.href = r }; try { e.prefetch(w(r, t)) } catch {} let s; try { let a = l
        .getSession({ query: { disableCookieCache: !0 } }).catch(() => null),
        c = (await Promise.race([a, new Promise(e => { s = setTimeout(() => e(null), C) })]))?.data?.user; if (!
        c || c.type === `guest`) { o(); return } i(); let u = new URL(r, window.location.origin); if (w(u
          .pathname, t) === w(n, t)) { let n = window.location.search; if (e.replace(w(r, t)), u.search ===
          n) { await Promise.resolve(), e.refresh(); return } if (!await A(n)) { o(); return } e
      .refresh(); return } let d = window.location.search; if (e.push(w(r, t)), !(window.location.pathname === u
          .pathname && u.search !== d ? await A(d) : await k(r))) { o(); return } e.refresh() } catch { o
    () } finally { clearTimeout(s) } }, [e, i, t, n]) }

function M(e) { return e.trim().toLowerCase() }
var N = [`apple@use.ai`, `google@use.ai`, `google-oauth-testuser@use.ai`, `facebook@use.ai`],
  P = [`testUserCode`, `test_user_code`, `appleTestCode`, `apple_test_code`, `appleCode`, `apple_code`,
    `googleTestCode`, `google_test_code`, `googleCode`, `google_code`, `testCode`, `test_code`
  ],
  F = e => e ? N.includes(M(e)) : !1,
  I = e => { let t = new URLSearchParams(e); for (let e of P) { let n = t.get(e)?.trim(); if (n)
  return n } return null },
  L = () => I(window.location.search),
  R = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  z = e => s().check(o(R, e ?? `Invalid email address`));

function B(e) { return e.trim().toLowerCase() }
export { j as a, b as c, F as i, _ as l, z as n, S as o, L as r, x as s, B as t };
