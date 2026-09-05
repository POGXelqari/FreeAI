/**
 * Source: https://use.ai/_next/static/chunks/checkout-universal-form.service-CxHch_si.js
 * Module: checkout-universal-form.service
 * Extracted & Beautified
 */

import { a as e } from "./experiment-client.service-Dbg--_Jv.js";
import { i as t } from "./rest-api-DNPFxXXP.js";
import { n } from "./env-C6AULCj5.js";
import { h as r } from "./billing-CclPhhLo.js";
import { t as i } from "./report-client-error.util-Bq41AYxy.js";
import { d as a, f as o } from "./analytics.service-BIbiLKmC.js";
import { t as s } from "./react-D8-vnz5K.js";
import { n as c } from "./middleware-BT98JsiD.js";
import { n as l } from "./experiment.provider-CQRJZnpd.js";
import "./client-DWC7O25X.js";
import { a as u, i as d, n as f, r as p } from "./billing.interface-DgJbHepV.js";
import { t as m } from "./safe-session-storage.util-D62mLdZm.js";
import { t as h } from "./pure-BxuLq9I9.js";
var g = Object.prototype.toString,
  _ = e => g.call(e) === `[object Error]`,
  v = new Set([`network error`, `NetworkError when attempting to fetch resource.`,
    `The Internet connection appears to be offline.`, `Network request failed`, `fetch failed`, `terminated`,
    ` A network error occurred.`, `Network connection lost`
  ]);

function y(e) { if (!(e && _(e) && e.name === `TypeError` && typeof e.message == `string`)) return !1; let { message: t,
    stack: n } = e; return t === `Load failed` || t.startsWith(`Load failed (`) && t.endsWith(`)`) ? n === void 0 ||
    `__sentry_captured__` in e : t.startsWith(`error sending request for url`) || t === `Failed to fetch` || t
    .startsWith(`Failed to fetch (`) && t.endsWith(`)`) ? !0 : v.has(t) }

function b(e) { if (typeof e == `number`) { if (e < 0) throw TypeError(
      "Expected `retries` to be a non-negative number."); if (Number.isNaN(e)) throw TypeError(
      "Expected `retries` to be a valid number or Infinity, got NaN.") } else if (e !== void 0) throw TypeError(
    "Expected `retries` to be a number or Infinity.") }

function x(e, t, { min: n = 0, allowInfinity: r = !1 } = {}) { if (t !== void 0) { if (typeof t != `number` || Number
      .isNaN(t)) throw TypeError(`Expected \`${e}\` to be a number${r?` or Infinity`:``}.`); if (!r && !Number.isFinite(
        t)) throw TypeError(`Expected \`${e}\` to be a finite number.`); if (t < n) throw TypeError(
      `Expected \`${e}\` to be \u2265 ${n}.`) } }

function S(e, t) { if (t !== void 0 && typeof t != `function`) throw TypeError(`Expected \`${e}\` to be a function.`) }
var C = class extends Error { constructor(e) { super(), e instanceof Error ? (this.originalError = e, { message: e } =
        e) : (this.originalError = Error(e), this.originalError.stack = this.stack), this.name = `AbortError`, this
      .message = e } };

function w(e, t) { let n = Math.max(1, e + 1),
    r = t.randomize ? Math.random() + 1 : 1,
    i = Math.round(r * t.minTimeout * t.factor ** (n - 1)); return i = Math.min(i, t.maxTimeout), i }

function T(e, t) { return Number.isFinite(t) ? t - (performance.now() - e) : t } async function E(e, t) { e <= 0 ||
    await new Promise((n, r) => { let i = () => { clearTimeout(a), t.signal?.removeEventListener(`abort`, i), r(t
            .signal.reason) },
        a = setTimeout(() => { t.signal?.removeEventListener(`abort`, i), n() }, e);
      t.unref && a.unref?.(), t.signal?.addEventListener(`abort`, i, { once: !0 }) }) } async function D({ error: e,
  attemptNumber: t, retriesConsumed: n, startTime: r, options: i }) { let a = e instanceof Error ? e : TypeError(
    `Non-error was thrown: "${e}". You should only throw errors.`); if (a instanceof C) throw a.originalError; let
    o = Number.isFinite(i.retries) ? Math.max(0, i.retries - n) : i.retries,
    s = i.maxRetryTime ?? 1 / 0,
    c = w(n, i); if (T(r, s) <= 0) { let e = Object.freeze({ error: a, attemptNumber: t, retriesLeft: o,
      retriesConsumed: n, retryDelay: 0 }); throw await i.onFailedAttempt(e), a } let l = Object.freeze({ error: a,
      attemptNumber: t, retriesLeft: o, retriesConsumed: n, retryDelay: o > 0 ? c : 0 }),
    u = await i.shouldConsumeRetry(l),
    d = u && o > 0 ? c : 0,
    f = Object.freeze({ error: a, attemptNumber: t, retriesLeft: o, retriesConsumed: n, retryDelay: d }); if (
    await i.onFailedAttempt(f), T(r, s) <= 0 || T(r, s) <= 0 || o <= 0 || a instanceof TypeError && !y(a) || !
    await i.shouldRetry(f)) throw a; let p = T(r, s); if (p <= 0) throw a; if (!u) return i.signal
  ?.throwIfAborted(), !1; let m = Math.min(d, p); return i.signal?.throwIfAborted(), await E(m, i), i.signal
    ?.throwIfAborted(), !0 } async function O(e, t = {}) { if (t = { ...t }, b(t.retries), Object.hasOwn(t,
      `forever`)) throw Error(
    "The `forever` option is no longer supported. For many use-cases, you can set `retries: Infinity` instead."
    );
  t.retries ??= 10, t.factor ??= 2, t.minTimeout ??= 1e3, t.maxTimeout ??= 1 / 0, t.maxRetryTime ??= 1 / 0, t
    .randomize ??= !1, t.onFailedAttempt ??= () => {}, t.shouldRetry ??= () => !0, t.shouldConsumeRetry ??= () =>
    !0, S(`onFailedAttempt`, t.onFailedAttempt), S(`shouldRetry`, t.shouldRetry), S(`shouldConsumeRetry`, t
      .shouldConsumeRetry), x(`factor`, t.factor, { min: 0, allowInfinity: !1 }), x(`minTimeout`, t
    .minTimeout, { min: 0, allowInfinity: !1 }), x(`maxTimeout`, t.maxTimeout, { min: 0, allowInfinity: !0 }), x(
      `maxRetryTime`, t.maxRetryTime, { min: 0, allowInfinity: !0 }), t.factor > 0 || (t.factor = 1), t.signal
    ?.throwIfAborted(); let n = 0,
    r = 0,
    i = performance.now(); for (; !Number.isFinite(t.retries) || r <= t.retries;) { n++; try { t.signal
        ?.throwIfAborted(); let r = await e(n); return t.signal?.throwIfAborted(), r } catch (e) { await D
    ({ error: e, attemptNumber: n, retriesConsumed: r, startTime: i, options: t }) && r++ } } throw Error(
    `Retry attempts exhausted without throwing an error.`) }
var k = h(),
  A = async e => { try { return await O(async () => await (0, k.loadStripe)(e), { retries: 3 }) } catch (
    e) { return typeof console < `u` && console.warn && console.warn(`Failed to load Stripe after retries:`, e),
        null } }, j = async e => { let t = d[e]; if (t) try { let n = await A(t); if (!n)
      return; let { radarSession: r, error: i } = await n.createRadarSession();!i && r && m.setItem(e, r
        .id) } catch (t) { typeof console < `u` && console.warn && console.warn(
          `Stripe Radar session skipped for ${e}:`, t) } }, M = () => u.reduce((e, t) => { let n = m.getItem(t) ||
      ``; return n && (e[t] = n), e }, {
    [p]: m.getItem(`paypal_session_id`) || ``, [f]: m.getItem(`paypal_session_id`) || `` }), N =
async () => { try { await O(() => new Promise((e, t) => { if (window.Stripe) e();
          else { let n = `stripe-js-script`,
              r = document.getElementById(n); if (r) { let n = () => { window.Stripe ? e() : t(Error(
                    `Stripe.js failed to load.`)) },
                i = () => { r.removeEventListener(`load`, n), r.removeEventListener(`error`, i), r.remove(),
                    t(Error(`Stripe.js failed to load.`)) };
              r.addEventListener(`load`, n), r.addEventListener(`error`, i) } else { let r = document
                .createElement(`script`);
              r.id = n, r.src = `https://js.stripe.com/dahlia/stripe.js`, r.async = !0, r.onload =
            () => { window.Stripe ? e() : t(Error(`Stripe.js failed to load.`)) }, r.onerror = () => t(
                Error(`Stripe.js failed to load.`)), document.head.appendChild(r) } } }), { retries: 3 }) } catch (
        e) { typeof console < `u` && console.warn && console.warn(`Stripe.js failed to load after retries:`, e) } },
    P = t => { let n = l(e.REQUIRE_TURNSTILE_CAPTCHA, `OFF`),
        i = n === `A` || n === `B`,
        a = n !== `B`; return r({ experimentName: e.REQUIRE_TURNSTILE_CAPTCHA, experimentValue: n, shouldTrack: i &&
          t }), { variant: n, isEnabled: n === `B`, isInExperiment: i, shouldBypassTurnstile: a,
        trackExperimentView: () => {} } }, F = 6e4, I = e => e ? [e.plan_id, e.billing_cycle, e.is_trial, e
      .payment_currency ?? e.currency, e.amount
    ].map(e => String(e ?? ``)).join(`|`) : ``, L = s()(c((e, t) => ({ clientToken: ``, preloadedSession: null,
      preloadInflight: null, setClientToken: t => e({ clientToken: t }), setPreloadedSession: t =>
    e({ preloadedSession: t }), setPreloadInflight: t => e({ preloadInflight: t }),
      consumePreloadedSession: n => { let r = t().preloadedSession; return !r || r.signature !== n || r
            .expiresAt - Date.now() < F ? null : (e({ preloadedSession: null }), r.clientToken) },
      handleModuleStore: t => e(e => ({ ...e, ...t })) }), { name: `CheckoutClientTokenModuleStore`, enabled: n
        .NEXT_PUBLIC_ENV !== `production` && !0 })), R = async e => { if (!(e && typeof e == `object` &&
          `response` in e)) return !1; let t = e.response; if (t?.status !== 403) return !1; try { return (await t
          .clone().json())?.code === `TURNSTILE_REQUIRED` } catch { return !1 } }, z = e => { if (e)
      try { return JSON.stringify(e) } catch (e) { console.error(`Failed to stringify checkout metadata`, e), i(
          e, `render`); return } }, B = e => { if (!e) return `no-metadata`; let t = 0; for (let n = 0; n < e
        .length; n += 1) t = (t << 5) - t + e.charCodeAt(n), t |= 0; return Math.abs(t).toString(36) }, V =
  () => { let { setClientToken: e, clientToken: n } = L(); return { getClientToken: async (r, s = ``, c = !
        1) => { let l = B(z(r)),
            u = a(); try { let n = await t.post(`billing/checkout/session`, { priority: `high`,
              json: { metadata: { ...r || {}, ...o(u) }, turnstileToken: s, ...c ? { turnstileBypass: !0 } :
                {} }, timeout: 1e5, retry: { limit: 3, statusCodes: [408, 429, 500, 502, 503, 504],
                backoffLimit: 1e4 } }).json(); return e(n.clientToken), { clientToken: n.clientToken,
                clientTokenExpirationDate: n.clientTokenExpirationDate, response: n, sessionData: n
                .sessionData } } catch (e) { let t = null,
              r = `Unknown error`; if (e && typeof e == `object` && `response` in e) try { let n = e.response;
              n && typeof n.json == `function` && (t = await n.clone().json(), r = t.error || r) } catch { r =
                e instanceof Error ? e.message : `Unknown error` } else r = e instanceof Error ? e.message :
              `Unknown error`; let a = e && typeof e == `object` && `response` in e && e.response?.status ===
              401; throw console.error(
            `Checkout client token request failed`, { request_url: `/v1/billing/checkout/session`,
              metadata_signature: l, error_message: r, error_details: t, is_auth_error: a,
              existing_client_token_set: !!n }), i(e, `render`), e } }, clientToken: n } };
export { P as a, N as c, L as i, O as l, V as n, j as o, I as r, M as s, R as t };
