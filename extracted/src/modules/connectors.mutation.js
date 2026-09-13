/**
 * Source: https://use.ai/_next/static/chunks/connectors.mutation-DEHKLDkx.js
 * Module: connectors.mutation
 * Extracted & Beautified
 */

import { r as e } from "./rolldown-runtime-C0FnF6B9.js";
import { t } from "./useMutation-DldRSjFA.js";
import { n } from "./QueryClientProvider-DGxN9XtP.js";
import { i as r } from "./rest-api-BL5a3YVm.js";
var i = function(e) { return e.API_CONNECTORS = `connectors`, e }({}),
  a = function(e) { return e.LIST_CONNECTORS = `list_connectors`, e.CONNECT = `connect_connector`, e
      .CONNECT_CREDENTIALS = `connect_connector_credentials`, e.DISCONNECT = `disconnect_connector`, e }({}),
  o = class extends Error { code;
    constructor(e, t) { super(e), this.code = t, this.name = `ConnectorCredentialsError` } },
  s = async (e, t) => { let n = await e.json().catch(() => ({})); return { code: n.error ?? `unknown`, message: n
        .message ?? n.error ?? t } }, c = async e => { let t = await (await r.get(i.API_CONNECTORS, { signal: e }))
        .json(); if (!(t.success && Array.isArray(t.data))) throw Error(`Failed to fetch connectors`); return t
      .data }, l = async e => { let t = await r.post(`${i.API_CONNECTORS}/${e.toolkit}/connect`, { json: e
        .body }); if (!t.ok) { let { message: e } = await s(t, `Failed to start connector OAuth`); throw Error(
        e) } return await t.json() }, u = async e => { let t = await r.post(
          `${i.API_CONNECTORS}/${e.toolkit}/credentials`, { json: e.body }); if (!t.ok) { let { code: e,
          message: n } = await s(t, `Failed to connect with credentials`); throw new o(n, e) } return await t
      .json() }, d = async e => { let t = await r.delete(`${i.API_CONNECTORS}/${e}`); if (!t
        .ok) { let { message: e } = await s(t, `Failed to disconnect connector`); throw Error(e) } return await t
          .json() }, f = e({ useConnectCredentialsMutation: () => m, useConnectMutation: () => p,
        useDisconnectMutation: () => h }), p = () => t({ mutationKey: [a.CONNECT], mutationFn: l }), m =
    () => { let e = n(); return t({ mutationKey: [a.CONNECT_CREDENTIALS], mutationFn: u,
      onSuccess: async () => { await e.invalidateQueries({ queryKey: [a.LIST_CONNECTORS] }) } }) }, h =
    () => { let e = n(); return t({ mutationKey: [a.DISCONNECT], mutationFn: d, onSuccess: async () => { await e
              .invalidateQueries({ queryKey: [a.LIST_CONNECTORS] }) } }) };
export { o as a, a as c, h as i, m as n, d as o, p as r, c as s, f as t };
