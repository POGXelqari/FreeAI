/**
 * Source: https://use.ai/_next/static/chunks/use-stripe-radar-on-open.hook-DxaYWwfs.js
 * Module: use-stripe-radar-on-open.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { n } from "./env-C6AULCj5.js";
import "./billing-CclPhhLo.js";
import { a as r, t as i } from "./billing.interface-DgJbHepV.js";
import { t as a } from "./safe-session-storage.util-D62mLdZm.js";
import { c as o, l as s, o as c } from "./checkout-universal-form.service-CxHch_si.js";
var l = e(t(), 1),
  u = `3.136.0`,
  d = `https://js.braintreegateway.com/web/${u}/js/client.min.js`,
  f = `https://js.braintreegateway.com/web/${u}/js/data-collector.min.js`,
  p = (e, t) => new Promise((n, r) => { let i = document.getElementById(e); if (i) { if (i.dataset.loaded ===
        `true`) { n(); return } let e = () => { i.removeEventListener(`load`, e), i.removeEventListener(`error`, a), i
            .dataset.loaded = `true`, n() },
        a = () => { i.removeEventListener(`load`, e), i.removeEventListener(`error`, a), i.remove(), r(Error(
            `Failed to load script: ${t}`)) };
      i.addEventListener(`load`, e), i.addEventListener(`error`, a); return } let a = document.createElement(
    `script`);
    a.id = e, a.src = t, a.async = !0, a.onload = () => { a.dataset.loaded = `true`, n() }, a.onerror = () => { a
        .remove(), r(Error(`Failed to load script: ${t}`)) }, document.head.appendChild(a) }),
  m = async () => { try { await s(async () => { if (await p(`braintree-client-sdk`, d), await p(
            `braintree-data-collector-sdk`, f), !window.braintree?.client || !window.braintree?.dataCollector)
          throw Error(`Braintree SDK failed to initialize`) }, { retries: 3 }) } catch (e) { throw typeof console <
        `u` && console.warn && console.warn(`Failed to load Braintree scripts after retries:`, e), e } }, h =
async () => { let e = n.NEXT_PUBLIC_BRAINTREE_TOKENIZATION_KEY; if (e) try { if (await m(), !window.braintree
          ?.client || !window.braintree?.dataCollector) return; let t = await s(() => window.braintree.client
            .create({ authorization: e }), { retries: 3 }),
          n = await s(() => window.braintree.dataCollector.create({ client: t }), { retries: 3 });
        n?.deviceData && a.setItem(i, n.deviceData) } catch (e) { typeof console < `u` && console.warn && console
          .warn(`Braintree fraud session skipped:`, e) } }, g = () => { let e = a.getItem(i); return e ? {
        [i]: e } : {} }, _ = null, v = () => _ || (_ = (async () => { try { await h() } catch (e) { typeof console <
          `u` && console.warn && console.warn(`Braintree session initialization skipped:`, e), _ = null } })(), _),
    y = e => {
      (0, l.useEffect)(() => { e && v() }, [e]) }, b = null, x = () => b || (b = (async () => { try { await o(); for (
          let e of r) await c(e) } catch (e) { typeof console < `u` && console.warn && console.warn(
          `Stripe sessions initialization skipped:`, e), b = null } })(), b), S = e => {
      (0, l.useEffect)(() => { e && x() }, [e]) };
export { y as n, g as r, S as t };
