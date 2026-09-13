/**
 * Source: https://use.ai/_next/static/chunks/subscription-YCtyUATX.js
 * Module: subscription
 * Extracted & Beautified
 */

import { t as e } from "./useQuery-BgSNoQ7j.js";
import { t } from "./useMutation-DldRSjFA.js";
import { n } from "./QueryClientProvider-DGxN9XtP.js";
import { t as r } from "./queryOptions-Dfvzj6n2.js";
import { i } from "./rest-api-BL5a3YVm.js";
import { n as a, t as o } from "./subscription.model-Bs1FyJgo.js";
import { n as s } from "./user.model-CISYB7eF.js";
import { n as c } from "./limits.interface-CnG5W0wJ.js";
var l = async () => await (await i.get(o.API_SUBSCRIPTION_DETAILS_BY_EMAIL)).json(), u = async e => await (await i.post(
  o.API_SUBSCRIPTION_CANCEL, { json: e })).json(), d = async e => await (await i.post(o
  .API_SUBSCRIPTION_REACTIVATE, { json: e })).json(), f = e => Promise.all([e.refetchQueries({ queryKey: [s
    .USER_PROFILE_WITH_SUBSCRIPTION_QUERY
  ] }), e.refetchQueries({ queryKey: [c.LIMITS_QUERY] }), e.refetchQueries({ queryKey: [a
    .SUBSCRIPTION_DETAILS_BY_EMAIL_QUERY
  ] })]), p = e => { let r = n(); return t({ mutationKey: [a.SUBSCRIPTION_CANCEL_MUTATION], mutationFn: u,
    onSuccess: async t => { await f(r), e?.onSuccess && t.success && t.data && e.onSuccess(t.data) },
    onError: e?.onError }) }, m = e => { let r = n(); return t({ mutationKey: [a
      .SUBSCRIPTION_REACTIVATE_MUTATION
    ], mutationFn: async e => { let t = await d(e); if (!t.success) { let e = Error(t.error ||
          `Failed to reactivate subscription`); throw e.code = t.code, e.error = t.error, e } return t },
    onSuccess: async t => { await f(r), e?.onSuccess && t.success && t.data && e.onSuccess(t.data) },
    onError: e?.onError }) }, h = e => r({ queryKey: [a.SUBSCRIPTION_DETAILS_BY_EMAIL_QUERY], queryFn: () =>
  l(), enabled: e?.enabled }), g = t => e(h(t));
export { p as n, m as r, g as t };
