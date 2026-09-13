/**
 * Source: https://use.ai/_next/static/chunks/connectors.service-Gsyl5hDa.js
 * Module: connectors.service
 * Extracted & Beautified
 */

import { o as e, r as t } from "./rolldown-runtime-C0FnF6B9.js";
import { i as n } from "./framework-D-uKrMmN.js";
import { r } from "./react-CWjhjU4R.js";
import { r as i } from "./rest-api-BL5a3YVm.js";
import { a, i as o, n as s, r as c } from "./connectors.mutation-DEHKLDkx.js";
import { n as l } from "./react-client-DI5BViDH.js";
import { n as u } from "./better-auth-client-session.service-1Lowatea.js";
import { t as d } from "./analytics.service-9oUGcSKY.js";
import { a as f } from "./mixpanel-B_WP0jc-.js";
import { t as p } from "./show-toast.service-DZQBgdNF.js";
import "./intl-CED8MIZm.js";
import { n as m } from "./user-data.provider-D1zgVZeU.js";
import { n as h, t as g } from "./connectors.store-NL-qi5yD.js";
import { n as _ } from "./connector-catalog-lazy.service-B48j1ZN6.js";
import { t as v } from "./subscription-YCtyUATX.js";
var y = t({ useConnectorsService: () => E }),
  b = e(n(), 1),
  x = `connectors:returnUrl`,
  S = `connectors:pendingId`,
  C = `connectors:startedAt`,
  w = `connectors:entrySource`,
  T = `connectors:locale`,
  E = () => { let e = r(),
      t = l(`Connectors`),
      { showToast: n } = p(),
      y = g(e => e.setConnectedIds),
      E = g(e => e.setLoading),
      D = g(e => e.hydrateToolPermissionsFromServer),
      O = g(e => e.markToolPermissionsUnavailable),
      k = g(e => e.seedDefaultPermissionsForConnectors),
      { data: A, isPending: j } = u(),
      M = A?.user?.id,
      N = v({ enabled: !!M }),
      P = N.data,
      { userProfileWithSubscription: F } = m(),
      I = F.data?.data?.userProfile?.isTestUser === !0,
      L = (P?.data?.isSubscribed ?? !1) || I,
      R = !!M && L,
      z = !j && (!M || !N.isLoading && !F.isLoading),
      B = h({ enabled: R }),
      V = c(),
      H = s(),
      U = o();
    (0, b.useEffect)(() => { if (!B.data) return; let e = B.data.filter(e => e.connected).map(e => e.toolkit);
      y(e) }, [B.data, y]), (0, b.useEffect)(() => { j || M || y([]) }, [j, M, y]); let [W, G] = (0, b.useState)(!1), [
      K, q
    ] = (0, b.useState)(R);
    K !== R && (q(R), R || G(!1)), (0, b.useEffect)(() => { if (!R) { z && O(); return } let e = !1; return D().then(
        t => {!e && t && G(!0) }), () => { e = !0 } }, [R, z, D, O]), (0, b.useEffect)(() => { if (!W || !B.data)
        return; let e = B.data.filter(e => e.connected).map(e => e.toolkit);
      e.length !== 0 && k(e).catch(() => {}) }, [W, B.data, k]); let J = (0, b.useMemo)(() =>
        `${i()}/v1/connectors/callback`, []),
      Y = (0, b.useCallback)(async (r, i, a) => { E(r, !0); let o = Date.now(),
          s =
          `${J}?pending_toolkit=${encodeURIComponent(r)}&started_at=${o}&entry_source=${encodeURIComponent(i)}&client_web_origin=${encodeURIComponent(window.location.origin)}`; try { let
            n = await V.mutateAsync({ toolkit: r, body: { callbackUrl: s, ...a && Object.keys(a).length > 0 ?
                { fields: a } : {} } }); if (!n.redirectUrl) throw Error(t(`connect_oauth_failed`)); try { let t =
              window.location.pathname + window.location.search,
              n = e !== `en` && t.startsWith(`/${e}/`) ? t.slice(`/${e}`.length) : e !== `en` && t === `/${e}` ?
              `/` : t;
            sessionStorage.setItem(x, n), sessionStorage.setItem(S, r), sessionStorage.setItem(C, String(o)),
              sessionStorage.setItem(w, i), sessionStorage.setItem(T, e) } catch {} return window.location.href = n
            .redirectUrl, !0 } catch (e) { let a = (await _(r))?.name ?? r; return d.track(f
            .CONNECTOR_CONNECT_INIT_FAILED, { connector_id: r, connector_name: a,
              error_reason: e instanceof Error ? e.message : `unknown`, error_message: e instanceof Error ? e
                .message : void 0, entry_source: i }), n({ description: t(
            `toast_connect_failed_named`, { name: a }), variant: `error` }), E(r, !1), !1 } }, [J, V, e, E, n, t]),
      X = (0, b.useCallback)(async (e, r, i) => { let o = (await _(e))?.name ?? e;
        E(e, !0); let s = Date.now();
        d.track(f.CONNECTOR_AUTH_STARTED, { connector_id: e, connector_name: o,
        entry_source: i }); try { return await H.mutateAsync({ toolkit: e, body: { credentials: r } }), k([e])
            .catch(() => {}), d.track(f.CONNECTOR_AUTH_SUCCESS, { connector_id: e, connector_name: o,
              latency_ms: Date.now() - s, entry_source: i }), n({ description: t(`connected_success`),
              variant: `success`, onShown: () => { d.track(f.CONNECTOR_CONNECTED_TOAST_VIEWED, { connector_id: e,
                  connector_name: o }) } }), !0 } catch (t) { return d.track(f
          .CONNECTOR_AUTH_FAILED, { connector_id: e, connector_name: o, error_reason: t instanceof Error ? t
              .message : `unknown`, error_code: t instanceof a ? t.code : `network_error`, entry_source: i }), !
          1 } finally { E(e, !1) } }, [H, k, E, n, t]),
      Z = (0, b.useCallback)(async (e, r) => { let i = await _(e),
          a = B.data?.find(t => t.toolkit === e),
          o = a?.connectedAt && a.connected ? Math.max(0, Math.floor((Date.now() - Date.parse(a.connectedAt)) /
            864e5)) : void 0;
        E(e, !0); try { return await U.mutateAsync(e), await B.refetch(), d.track(f
            .CONNECTOR_DISCONNECTED, { connector_id: e, connector_name: i?.name ?? e, source: r,
            days_connected: o }), n({ description: t(`toast_disconnect_success_named`, { name: i?.name ?? e }),
            variant: `success` }), !0 } catch { return n({ description: t(`toast_disconnect_failed_named`, { name: i
                ?.name ?? e }), variant: `error` }), !1 } finally { E(e, !1) } }, [B, U, E, n, t]),
      Q = (0, b.useCallback)(async (e, t) => { let n = await _(e);
          d.track(f.CONNECTOR_DISCONNECT_MODAL_VIEWED, { connector_id: e, connector_name: n?.name ?? e,
          source: t }) }, []); return { canUseConnectors: R, connectorsQuery: B, handleConnect: Y,
      handleConnectWithCredentials: X, handleDisconnect: Z, isConnectPending: V.isPending, isDisconnectPending: U
        .isPending, trackDisconnectModalViewed: Q } };
export { E as n, y as t };
