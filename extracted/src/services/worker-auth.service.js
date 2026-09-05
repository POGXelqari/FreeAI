/**
 * Source: https://use.ai/_next/static/chunks/worker-auth.service-BtTnG2J5.js
 * Module: worker-auth.service
 * Extracted & Beautified
 */

import { i as e, n as t, t as n } from "./better-auth-client.service-Ck6mOMB1.js";
import { t as r } from "./report-client-error.util-Bq41AYxy.js";
var i = `[WorkerAuth]`,
  a = e => e instanceof Error ? { name: e.name, message: e.message, stack: e.stack } : { name: `NonError`,
    message: String(e) };

function o() { try { let e = n.$store?.atoms?.session; if (!e?.get) return null; let t = e.get(); return !t || t
      .isPending || t.error ? null : t } catch { return null } }
var s = null,
  c = null,
  l = !1;
async function u() { let t = Date.now(); return s && s.expiresAt > t + 6e4 ? s.token : c || (c = (
async () => { try { let t, r = o(); if (r?.data?.session) t = r, e(`worker-auth`, { step: `snapshot-hit` });
      else try { t = await n.getSession(), e(`worker-auth`, { step: `getSession`, hasSession: !!t?.data
            ?.session, hasError: !!t?.error }) } catch (t) { let n = t?.status ?? t?.response?.status; if (
          e(`worker-auth`, { step: `getSession-throw`, status: n }), n === 401) return null; throw t }
      if (t?.error || !t?.data?.session) return e(`worker-auth`, { step: `no-session` }), null; let a =
        await n.token(); return e(`worker-auth`, { step: `token`, hasToken: !!a.data?.token, hasError: !!a
          .error }), a.error || !a.data?.token ? (console.error(`${i} Failed to get JWT token:`, a.error),
        null) : (s = { token: a.data.token, expiresAt: Date.now() + 84e4 }, console.log(
        `${i} Successfully obtained JWT token for authenticated user`), a.data.token) } catch (e) { return r(
        e, `handled-exception`, void 0, `workerAuthGetToken`), console.error(
        `${i} Error getting auth token`, a(e)), null } finally { c = null } })(), c) }

function d() { s = null } async function f() { let e = await u(); return e ? { Authorization: `Bearer ${e}` } :
    {} } async function p() { if (l) return console.log(`${i} Migration already attempted this session`), !1;
    l = !0, console.log(`${i} Attempting session migration...`); try { let e = await fetch(t(
        `/api/auth/migrate-session`), { method: `GET`, credentials: `include`, cache: `no-store` }); if (!e.ok)
      return console.warn(`${i} Migration endpoint returned:`, e.status), !1; let n = await e.json(); return n
        .success && n.migrated ? (console.log(`${i} Session migration successful for user:`, n.user?.id), d(), !0) : (
          console.warn(`${i} Migration response:`, n), !1) } catch (e) { return r(e, `handled-exception`, void 0,
        `workerAuthMigrateSession`), console.error(`${i} Migration failed`, a(e)), !1 } }

function m() { l = !1 } async function h() { console.log(`${i} Force refreshing JWT token...`), m(), d(), await p(); let
    e = await u(); return e ? console.log(`${i} JWT token refresh successful`) : console.warn(
    `${i} JWT token refresh failed - no valid session`), e }
export { h as i, f as n, u as r, d as t };
