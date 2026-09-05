/**
 * Source: https://use.ai/_next/static/chunks/billing-CclPhhLo.js
 * Module: billing
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { Et as n, L as r, Wt as i, a, c as o, et as s, f as c, g as l, h as u, i as d, l as f, m as p, n as m, p as h,
  r as g, u as _, x as v, y } from "./env-C6AULCj5.js";
import { t as b } from "./analytics.service-BIbiLKmC.js";
import { a as x } from "./mixpanel-CkBALibP.js";
import "./billing.interface-DgJbHepV.js";

function S(e) { return r(g, e) }
var C = e(t(), 1),
  w = ({ experimentName: e, experimentValue: t, shouldTrack: n, source: r, persona: i, onFirstView: a }) => { let o = (
      0, C.useEffectEvent)(() => { a?.() });
    (0, C.useEffect)(() => { if (!n) return; let a = `experiment_viewed_${e}_${t}`;
      sessionStorage.getItem(a) || (o(), b.track(x.EXPERIMENT_VIEWED, { experimentName: e, experimentValue: t, ...r &&
        { source: r }, ...i && { persona: i } }), sessionStorage.setItem(a, `true`)) }, [e, t, n, r, i]) };
u({ metadata: u({ plan_id: l(y()), plan_name: a([`PRO`, `POWER`]), billing_cycle: a([`biweekly`, `monthly`, `quarterly`,
      `half_yearly`
    ]), is_trial: l(a([`true`, `false`])), trial_days: l(p()), charge_period_days: l(p()), amount: p().check(
    i()), user_id: y(), supabase_user_id: y(), account_id: y(), email: _(), currency: l(y()), currency_code: l(
      y()), country: l(y()), country_code: l(y()), currencySymbol: l(y()), usdExchangeRate: l(S().check(i())),
    eurExchangeRate: l(S().check(i())), flow_type: a([`web_onboarding`, `second_payment`, `upgrade`, `internal`,
      `one_time_payment`, `reactivation`, `downgrade`, `quarterly`, `power_plan_upgrade`
    ]), one_time_payment: l(a([`true`, `false`])), subscriptionType: c(`APP_SUBSCRIPTION`), app_version: y(),
    product_name: y(), application: y(), hostname: y(), symbolAtStart: l(v([c(`TRUE`), c(`FALSE`)])),
    stripe_session_id: l(y()), uk_stripe_session_id: l(y()), ca_stripe_session_id: l(y()),
    au_stripe_session_id: l(y()), eu_stripe_session_id: l(y()), paypal_session_id: l(y()),
    paypal_client_metadata_id: l(y()), braintree_device_data: l(y()), utm_source: l(y()), utm_medium: l(y()),
    utm_campaign: l(y()), utm_campaign_id: l(y()), utm_term: l(y()), utm_content: l(y()), utm_id: l(y()),
    utm_adgroup_id: l(y()), utm_adgroup: l(y()), utm_content_id: l(y()), utm_ad_id: l(y()), utm_ad_name: l(y()),
    utm_ad_term: l(y()), utm_target_id: l(y()), utm_keyword: l(y()), gclid: l(y()), wbraid: l(y()), fbclid: l(
    y()), plan_label: l(y()), is_subscribed: l(o()), next_billing_date: l(v([y(), f()])),
    subscription_status: l(y()), plan_type: l(y()), mixpanel_user_id: l(y()), flowType: l(a([`web_onboarding`,
      `second_payment`, `upgrade`, `internal`, `one_time_payment`, `reactivation`, `downgrade`,
      `quarterly`, `power_plan_upgrade`
    ])), display_currency: l(y()), display_amount: l(p()), payment_currency: l(y()), locale: l(y()),
    ipAddress: l(y()), user_agent: l(y()), sub_order_country: l(y()), primer_workflow_version: l(p()),
    outside_primer_routing_rule: l(y()) }), currencyCode: l(y()) }), u({ clientToken: y(),
  clientTokenExpirationDate: l(y()), amount: l(p().check(i())), country_code: l(y()), metadata: u({ plan_id: l(y()),
    plan_name: l(a([`PRO`, `POWER`])), billing_cycle: l(a([`biweekly`, `monthly`, `quarterly`, `half_yearly`])),
    is_trial: l(o()), amount: l(p().check(i())), user_id: l(y()), supabase_user_id: l(y()), account_id: l(y()),
    email: l(_()), currency: l(y()), country: l(y()), currencySymbol: l(y()), usdExchangeRate: l(p().check(
    i())), eurExchangeRate: l(p().check(i())), flow_type: l(a([`web_onboarding`, `second_payment`, `upgrade`,
      `internal`, `one_time_payment`, `reactivation`, `downgrade`, `quarterly`, `power_plan_upgrade`
    ])), one_time_payment: l(y()), subscriptionType: l(c(`APP_SUBSCRIPTION`)), app_version: l(y()),
    product_name: l(y()), application: l(y()), hostname: l(y()), trial_days: l(p()), charge_period_days: l(p()),
    symbolAtStart: l(v([c(`TRUE`), c(`FALSE`)])), is_subscribed: l(o()), next_billing_date: l(y()),
    subscription_status: l(y()), plan_type: l(y()), mixpanel_user_id: l(y()), flowType: l(a([`web_onboarding`,
      `second_payment`, `upgrade`, `internal`, `one_time_payment`, `reactivation`, `downgrade`,
      `quarterly`, `power_plan_upgrade`
    ])), display_currency: l(y()), payment_currency: l(y()), stripe_session_id: l(y()), uk_stripe_session_id: l(
      y()), ca_stripe_session_id: l(y()), au_stripe_session_id: l(y()), eu_stripe_session_id: l(y()),
    paypal_session_id: l(y()), paypal_client_metadata_id: l(y()), braintree_device_data: l(y()), utm_source: l(
      y()), utm_medium: l(y()), utm_campaign: l(y()), utm_campaign_id: l(y()), utm_term: l(y()), utm_content: l(
      y()), utm_id: l(y()), utm_adgroup_id: l(y()), utm_adgroup: l(y()), utm_content_id: l(y()), utm_ad_id: l(
    y()), utm_ad_name: l(y()), utm_ad_term: l(y()), utm_target_id: l(y()), gclid: l(y()), wbraid: l(y()),
    fbclid: l(y()) }) }), u({ payment: u({ id: y().check(n(1, `Payment ID is required`)), orderId: y().check(n(1,
      `Order ID is required`)) }), first6Digits: l(y()), nationalDocumentId: l(y()), metadata: u({ plan_id: l(y()),
    plan_name: a([`PRO`, `POWER`], { message: `Plan name is required` }), billing_cycle: d(a([`biweekly`,
      `monthly`, `quarterly`, `half_yearly`
    ]), `monthly`), is_trial: l(y()), amount: l(p()), flow_type: l(y()), currencyCode: l(y()), currency: l(y()),
    country: l(y()), currencySymbol: l(y()), usdExchangeRate: l(S().check(i())), eurExchangeRate: l(S().check(
    i())), symbolAtStart: l(v([c(`TRUE`), c(`FALSE`)])), user_id: l(y()), account_id: l(y()), email: l(y()),
    paymentMethodType: l(y()), paymentProcessor: l(y()), stripe_session_id: l(y()), uk_stripe_session_id: l(
    y()), ca_stripe_session_id: l(y()), au_stripe_session_id: l(y()), eu_stripe_session_id: l(y()),
    paypal_session_id: l(y()), paypal_client_metadata_id: l(y()), braintree_device_data: l(y()) }) }),
u({ currencyCode: l(y()), billing: l(a([`biweekly`, `monthly`, `quarterly`,
  `half_yearly`], { message: `Billing cycle is required for renewal/upgrade flows` })), payment: l(u({ orderId: l(
    y()), id: l(y()) })), metadata: l(u({ plan_id: y().check(n(1, `plan_id is required`)), flow_type: l(a([
      `web_onboarding`, `second_payment`, `upgrade`, `internal`, `one_time_payment`, `reactivation`,
      `downgrade`, `quarterly`
    ])), description: l(y()), one_time_payment_type: l(y()), currencySymbol: l(y()), usdExchangeRate: l(S()
      .check(i())), eurExchangeRate: l(S().check(i())), symbolAtStart: l(v([c(`TRUE`), c(`FALSE`)])),
    billing_cycle: l(a([`biweekly`, `monthly`, `quarterly`, `half_yearly`])), billing: l(a([`biweekly`,
      `monthly`, `quarterly`, `half_yearly`
    ])), plan_name: l(y()), amount: l(p()), subscription_id: h(y()), user_id: l(y()), email: l(_()),
    account_id: l(y()), supabase_user_id: l(y()), flowType: l(a([`web_onboarding`, `second_payment`,
      `upgrade`, `internal`, `one_time_payment`, `reactivation`, `downgrade`, `quarterly`
    ])), subscriptionType: l(c(`APP_SUBSCRIPTION`)), app_version: l(y()), product_name: l(y()),
    application: l(y()), hostname: l(y()), is_trial: l(c(`false`)), trial_days: l(c(0)), trial_period_days: l(
      c(0)), trial_price: l(c(0)), upgrade_type: l(c(`upgrade`)), subscription_credits_to_add: l(p().check(s(
      0))), sub_order_country: l(y()), plan_code: l(y()), period: l(y()), charge_period_days: l(p().check(
    i())), country: l(y()), display_currency: l(y()), payment_currency: l(y()), stripe_session_id: l(y()),
    uk_stripe_session_id: l(y()), ca_stripe_session_id: l(y()), au_stripe_session_id: l(y()),
    eu_stripe_session_id: l(y()), paypal_session_id: l(y()), paypal_client_metadata_id: l(y()),
    braintree_device_data: l(y()), mixpanel_user_id: l(y()) })) }), u({ billingCycle: a([`biweekly`, `monthly`,
    `quarterly`, `half_yearly`
  ], { message: `Billing cycle is required for subscription update` }), metadata: u({ plan_id: y().check(n(1,
      `plan_id is required from usePricingConfig() hook`)), billing_cycle: a([`biweekly`, `monthly`,
      `quarterly`, `half_yearly`
    ]), charge_period_days: p().check(i(`Charge period days must be positive`)), display_currency: l(y()),
    payment_currency: l(y()), currencySymbol: l(y()), symbolAtStart: l(v([c(`TRUE`), c(`FALSE`)])),
    plan_name: l(y()), amount: l(p()), flowType: l(y()), currencyCode: l(y()), subscription_id: h(y()),
    user_id: l(y()), email: l(y()) }) });
var T = { AED: 2, AFN: 2, ALL: 2, AMD: 2, ANG: 2, AOA: 2, ARS: 2, AUD: 2, AWG: 2, AZN: 2, BAM: 2, BBD: 2, BDT: 2,
    BGN: 2, BHD: 3, BIF: 0, BMD: 2, BND: 2, BOB: 2, BRL: 2, BSD: 2, BTN: 2, BWP: 2, BYN: 2, BZD: 2, CAD: 2, CDF: 2,
    CHF: 2, CLP: 0, CNY: 2, COP: 2, COU: 2, CRC: 2, CUC: 2, CUP: 2, CVE: 2, CZK: 2, DJF: 0, DKK: 2, DOP: 2, DZD: 2,
    EGP: 2, ERN: 2, ETB: 2, EUR: 2, FJD: 2, FKP: 2, GBP: 2, GEL: 2, GHS: 2, GIP: 2, GMD: 2, GNF: 0, GTQ: 2, GYD: 2,
    HKD: 2, HNL: 2, HRK: 2, HTG: 2, HUF: 2, IDR: 2, ILS: 2, INR: 2, IQD: 3, IRR: 2, ISK: 0, JMD: 2, JOD: 3, JPY: 0,
    KES: 2, KGS: 2, KHR: 2, KMF: 0, KPW: 2, KRW: 0, KWD: 3, KYD: 2, KZT: 2, LAK: 2, LBP: 2, LKR: 2, LRD: 2, LSL: 2,
    LYD: 3, MAD: 2, MDL: 2, MGA: 2, MKD: 2, MMK: 2, MNT: 2, MOP: 2, MUR: 2, MVR: 2, MWK: 2, MXN: 2, MYR: 2, MZN: 2,
    NAD: 2, NGN: 2, NIO: 2, NOK: 2, NPR: 2, NZD: 2, OMR: 3, PAB: 2, PEN: 2, PGK: 2, PHP: 2, PKR: 2, PLN: 2, PYG: 0,
    QAR: 2, RON: 2, RSD: 2, RUB: 2, RWF: 0, SAR: 2, SBD: 2, SCR: 2, SDG: 2, SEK: 2, SGD: 2, SHP: 2, SLE: 2, SOS: 2,
    SRD: 2, STN: 2, SSP: 2, SVC: 2, SYP: 2, SZL: 2, THB: 2, TJS: 2, TMT: 2, TND: 3, TOP: 2, TRY: 2, TTD: 2, TWD: 2,
    TZS: 2, UAH: 2, UGX: 2, USD: 2, UYU: 2, UZS: 2, VES: 2, VND: 0, VUV: 0, WST: 2, XAF: 0, XCD: 2, XOF: 0, XPF: 0,
    YER: 2, ZAR: 2, ZMW: 2 },
  E = e => T[e] === void 0 ? 2 : T[e],
  D = { USD: `$`, EUR: `€`, GBP: `£`, JPY: `¥`, CNY: `¥`, CAD: `C$`, AUD: `A$`, CHF: `CHF`, SEK: `kr`, NOK: `kr`,
    DKK: `kr`, NZD: `NZ$`, HKD: `HK$`, SGD: `S$`, KRW: `₩`, INR: `₹`, BRL: `R$`, RUB: `₽`, ZAR: `R`, TRY: `₺`, MXN: `$`,
    PLN: `zł`, THB: `฿`, IDR: `Rp`, MYR: `RM`, PHP: `₱`, VND: `₫`, EGP: `£`, SAR: `﷼`, AED: `د.إ`, QAR: `﷼`, KWD: `د.ك`,
    BHD: `.د.ب`, OMR: `﷼`, JOD: `د.ا`, LBP: `ل.ل`, ILS: `₪`, CLP: `$`, COP: `$`, PEN: `S/`, UYU: `$`, ARS: `$`,
    BOB: `Bs`, PYG: `₲`, UZS: `so'm`, KZT: `₸`, GEL: `₾`, AMD: `֏`, AZN: `₼`, BYN: `Br`, MDL: `L`, RON: `lei`,
    BGN: `лв`, HRK: `kn`, CZK: `Kč`, HUF: `Ft`, RSD: `дин`, ALL: `L`, MKD: `ден`, BAM: `KM`, UAH: `₴`, AFN: `؋`,
    BDT: `৳`, LKR: `Rs`, NPR: `₨`, PKR: `₨`, SCR: `₨`, MUR: `₨`, KES: `KSh`, TZS: `TSh`, UGX: `USh`, NGN: `₦`,
    GHS: `GH₵`, XOF: `CFA`, XAF: `FCFA`, XPF: `CFP`, XCD: `EC$`, ANG: `ƒ`, BBD: `$`, BMD: `$`, BSD: `$`, BZD: `$`,
    KYD: `$`, TTD: `$`, JMD: `$`, GYD: `$`, SRD: `$`, NAD: `$`, LSL: `L`, SZL: `L`, BWP: `P`, ZMW: `ZK`, MWK: `MK`,
    ZMK: `ZK`, GMD: `D`, GNF: `FG`, DJF: `Fdj`, KMF: `CF`, BIF: `FBu`, RWF: `FRw`, CDF: `FC`, STN: `Db`, AOA: `Kz`,
    MZN: `MT`, ZWD: `$`, ZWL: `$` },
  O = e => D[e] || e,
  k = [`USD`, `EUR`, `GBP`, `CAD`, `AUD`],
  A = { TRIAL_PERIOD_DAYS: 7, TRIAL_PRICE: 100, TRIAL_CHARGE_PERIOD_DAYS: 7, TRIAL_CHARGE_PERIOD_DAYS_BIWEEKLY: 14,
    TRIAL_CHARGE_PERIOD_DAYS_MONTH: 30, TRIAL_CHARGE_PERIOD_DAYS_QUARTERLY: 90,
    TRIAL_CHARGE_PERIOD_DAYS_HALF_YEARLY: 180, TRIAL_CHARGE_PERIOD_DAYS_MONTH_OLD: 28,
    TRIAL_CHARGE_PERIOD_DAYS_QUARTERLY_OLD: 84, TRIAL_CHARGE_PERIOD_DAYS_HALF_YEARLY_OLD: 168,
    SKIP_TRIAL_PERIOD_DAYS: 0, SKIP_TRIAL_CHARGE_PERIOD_DAYS: 28, paymentPlan: { DEFAULT: 0, PRO: { biweekly: 1499,
        monthly: 2499, quarterly: 4999 } } },
  j = e => e === A.TRIAL_CHARGE_PERIOD_DAYS_BIWEEKLY ? `biweekly` : e === A.TRIAL_CHARGE_PERIOD_DAYS_MONTH || e === A
  .TRIAL_CHARGE_PERIOD_DAYS_MONTH_OLD ? `monthly` : e === A.TRIAL_CHARGE_PERIOD_DAYS_QUARTERLY || e === A
  .TRIAL_CHARGE_PERIOD_DAYS_QUARTERLY_OLD ? `quarterly` : e === A.TRIAL_CHARGE_PERIOD_DAYS_HALF_YEARLY || e === A
  .TRIAL_CHARGE_PERIOD_DAYS_HALF_YEARLY_OLD ? `half_yearly` : `monthly`,
  M = e => k.includes(e) ? e : `USD`,
  N = (e, t) => { let n = String(e),
      r = E(t?.currency?.currencyCode || `USD`),
      i = Number.parseFloat(n); return r === 0 ? Math.round(i) : Number.parseFloat(i.toFixed(r)) },
  P = (e, t) => { let n = String(e),
      r = t?.currency?.currencyCode || `USD`,
      i = E(r),
      a = Number.parseFloat(n),
      o = i === 0 ? Math.round(a).toString() : a.toFixed(i),
      s = o.split(`.`);
    s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, `,`), o = s.join(`.`); let c = t?.currency?.currencySymbol || O(r) ||
      `$`; return t ? t?.currency?.symbolAtStart === `TRUE` ? `${c}${o}` : `${o}${c}` : `${c}${o}` },
  F = { MONTHLY_TRIAL: `price_d46dbbd5-fb56-495b-89b8-ccfaea655eb6`,
    MONTHLY_NO_TRIAL: `price_c950fc65-999c-47a5-a894-bf7695796a86`,
    MONTHLY_NO_TRIAL_COUNTRIES: `price_4d9d670e-9c69-4a73-b327-0131761b5986`,
    QUARTERLY: `price_9fb8db91-391d-4b8b-ba20-22112ab80eda`, HALF_YEARLY: `price_2230ecc1-780c-4167-ad54-14a3fd21e564`,
    QUARTERLY_INCREASE: `price_d3a1e920-2016-4a7e-9083-65af3ac09305`,
    QUARTERLY_V2: `price_626a629f-537f-4093-8b21-06bec09abb0d`,
    QUARTERLY_V3: `price_78eabab3-9229-4dea-9db8-dc7a420fa69f`,
    HALF_YEARLY_V2: `price_30dd2d47-34e9-4dba-9dc8-c58dfcb29ffc`,
    SUPERPRO: `price_9ea149e7-5142-4d1a-98ad-2a119e8397fc`, POWER_PLAN: `price_9a7ad7cb-254d-4445-bee5-e2fbfd5d2ed8`,
    MAX_QUARTERLY: `price_4595a349-6482-4dbc-8402-d83b1a9328dd`,
    MAX_HALF_YEARLY: `price_cef6268f-ad91-417f-8a96-f38d625b1598`,
    SUPERPRO_INCREASE: `price_fd9b6301-4629-425b-9d5f-d3724b77af84`,
    MONTHLY_SPLIT_PAYMENT: `price_638d99ff-9b82-485b-a175-60c203a2a401`,
    ONE_TIME_PAYMENT: `price_c2d3a8bf-ae52-4e90-8ed5-46485bd059bf`,
    MONTHLY_SPLIT_PAYMENT_299: `price_dee160fd-78bd-452a-9767-d3cf97825d99`,
    MONTHLY_SPLIT_PAYMENT_399: `price_d617c9c2-1794-4357-91d8-dd8286515a60`,
    MONTHLY_SPLIT_PAYMENT_499: `price_b3302eb3-08d9-414f-ab94-2e8a0cf1d88f`,
    ONE_TIME_PAYMENT_299: `price_2d7166ac-5b71-475a-b6e4-fa7d61ae1ba8`,
    ONE_TIME_PAYMENT_399: `price_7d20b26a-127a-4ad2-a61f-af9b35c4b68d`,
    ONE_TIME_PAYMENT_499: `price_9bdbd3a1-db15-459f-9fba-ca197299cc66` },
  I = () => m.NEXT_PUBLIC_PAYNEXT_ENVIRONMENT ?? `sandbox`,
  L = { MONTHLY_TRIAL: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_MONTHLY_TRIAL ?? F.MONTHLY_TRIAL, MONTHLY_NO_TRIAL: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_MONTHLY_NO_TRIAL ?? F.MONTHLY_NO_TRIAL, MONTHLY_NO_TRIAL_COUNTRIES: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_MONTHLY_NO_TRIAL_COUNTRIES ?? F.MONTHLY_NO_TRIAL_COUNTRIES, QUARTERLY: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_QUARTERLY ?? F.QUARTERLY, HALF_YEARLY: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_HALF_YEARLY ?? F
      .HALF_YEARLY, QUARTERLY_INCREASE: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_QUARTERLY_INCREASE ?? F.QUARTERLY_INCREASE,
    QUARTERLY_V2: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_QUARTERLY_V2 ?? F.QUARTERLY_V2, QUARTERLY_V3: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_QUARTERLY_V3 ?? F.QUARTERLY_V3, HALF_YEARLY_V2: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_HALF_YEARLY_V2 ?? F.HALF_YEARLY_V2, SUPERPRO: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_SUPERPRO ?? F.SUPERPRO, POWER_PLAN: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_POWER_PLAN ?? F
      .POWER_PLAN, MAX_QUARTERLY: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_MAX_QUARTERLY ?? F.MAX_QUARTERLY, MAX_HALF_YEARLY: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_MAX_HALF_YEARLY ?? F.MAX_HALF_YEARLY, SUPERPRO_INCREASE: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_SUPERPRO_INCREASE ?? F.SUPERPRO_INCREASE, MONTHLY_SPLIT_PAYMENT: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_MONTHLY_SPLIT_PAYMENT ?? F.MONTHLY_SPLIT_PAYMENT, ONE_TIME_PAYMENT: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_ONE_TIME_PAYMENT ?? F.ONE_TIME_PAYMENT, MONTHLY_SPLIT_PAYMENT_299: m
      .NEXT_PUBLIC_PAYNEXT_PLAN_ID_MONTHLY_SPLIT_PAYMENT_299 ?? F.MONTHLY_SPLIT_PAYMENT_299,
    MONTHLY_SPLIT_PAYMENT_399: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_MONTHLY_SPLIT_PAYMENT_399 ?? F.MONTHLY_SPLIT_PAYMENT_399,
    MONTHLY_SPLIT_PAYMENT_499: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_MONTHLY_SPLIT_PAYMENT_499 ?? F.MONTHLY_SPLIT_PAYMENT_499,
    ONE_TIME_PAYMENT_299: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_ONE_TIME_PAYMENT_299 ?? F.ONE_TIME_PAYMENT_299,
    ONE_TIME_PAYMENT_399: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_ONE_TIME_PAYMENT_399 ?? F.ONE_TIME_PAYMENT_399,
    ONE_TIME_PAYMENT_499: m.NEXT_PUBLIC_PAYNEXT_PLAN_ID_ONE_TIME_PAYMENT_499 ?? F.ONE_TIME_PAYMENT_499 },
  R = {
    [L.MONTHLY_SPLIT_PAYMENT_299]: 149, [L.MONTHLY_SPLIT_PAYMENT_399]: 199, [L.MONTHLY_SPLIT_PAYMENT_499]: 249, [L
      .MONTHLY_SPLIT_PAYMENT
    ]: 50 },
  z = e => R[e],
  B = e => [L.MONTHLY_SPLIT_PAYMENT, L.MONTHLY_SPLIT_PAYMENT_299, L.MONTHLY_SPLIT_PAYMENT_399, L
    .MONTHLY_SPLIT_PAYMENT_499
  ].includes(e),
  V = new Set([L.SUPERPRO, L.POWER_PLAN, L.MAX_QUARTERLY, L.MAX_HALF_YEARLY]);

function H(e) { return e ? V.has(e) : !1 }
var U = { biweekly: 1, monthly: 2, quarterly: 3, half_yearly: 4 };

function W(e, t) { return !e || !t ? !1 : U[t] < U[e] }

function G(e, t) { if (!e || !t) return !1; let n = H(e),
    r = H(t); return n && !r }

function K(e) { let { currentPlanId: t, newPlanId: n, currentBillingCycle: r, newBillingCycle: i,
    currentChargePeriodDays: a } = e; return G(t, n) ? !0 : !H(t) && H(n) ? !1 : !!W(r ?? (a ? j(a) : null), i) }

function q(e) { return e ? e === L.POWER_PLAN : !1 }

function J(e) { let { userProfile: t, subscription: n } = e; return q(t?.planId) || t?.planType?.toUpperCase() ===
    `POWER` || n?.planType?.toUpperCase() === `POWER` }
var Y = new Set([L.SUPERPRO, L.SUPERPRO_INCREASE, L.POWER_PLAN]);

function X(e) { return e ? Y.has(e) : !1 }
export { L as a, B as c, N as d, M as f, w as h, K as i, j as l, E as m, J as n, I as o, O as p, q as r, z as s, X as t,
  P as u };
