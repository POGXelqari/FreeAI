/**
 * Source: https://use.ai/_next/static/chunks/chat-history-De2sMMgt.js
 * Module: chat-history
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { tt as n } from "./vinext-DaPQ-kLo.js";
import { a as r, i } from "./rest-api.provider-cvDCweR_.js";
import { n as a, r as o, t as s } from "./useQuery-BgSNoQ7j.js";
import { n as c } from "./QueryClientProvider-DGxN9XtP.js";
import { t as l } from "./queryOptions-Dfvzj6n2.js";
import { i as u, o as d } from "./rest-api-BL5a3YVm.js";
import { n as f } from "./better-auth-client-session.service-1Lowatea.js";
import { n as p } from "./worker-auth.service-oGq_wKdT.js";
import { t as m } from "./chat-key.constant-DXJEa87X.js";
import { t as h } from "./logout-teardown.service-BVsq4fds.js";
var g = class extends o { constructor(e, t) { super(e, t) } bindMethods() { super.bindMethods(), this.fetchNextPage =
      this.fetchNextPage.bind(this), this.fetchPreviousPage = this.fetchPreviousPage.bind(this) } setOptions(e) { e
      ._type = `infinite`, super.setOptions(e) } getOptimisticResult(e) { return e._type = `infinite`, super
      .getOptimisticResult(e) } fetchNextPage(e) { return this.fetch({ ...e,
      meta: { fetchMore: { direction: `forward` } } }) } fetchPreviousPage(e) { return this.fetch({ ...e,
      meta: { fetchMore: { direction: `backward` } } }) } createResult(e, t) { let { state: n } = e, a = super
      .createResult(e, t), { isFetching: o, isRefetching: s, isError: c, isRefetchError: l } = a, u = n.fetchMeta
      ?.fetchMore?.direction, d = c && u === `forward`, f = o && u === `forward`, p = c && u === `backward`, m =
      o && u === `backward`; return { ...a, fetchNextPage: this.fetchNextPage, fetchPreviousPage: this
        .fetchPreviousPage, hasNextPage: i(t, n.data), hasPreviousPage: r(t, n.data), isFetchNextPageError: d,
      isFetchingNextPage: f, isFetchPreviousPageError: p, isFetchingPreviousPage: m, isRefetchError: l && !d && !p,
      isRefetching: s && !f && !m } } };

function _(e) { return e }

function v(e, t) { return a(e, g, t) }

function y(e) { return { id: e.id, title: e.title, description: e.description ?? null, userId: e.userId, visibility: e
      .visibility, projectId: e.projectId ?? null, chatType: e.chatType ?? null, createdAt: e.createdAt, updatedAt: e
      .updatedAt, deletedAt: e.deletedAt, messageCount: 0, lastMessageAt: e.updatedAt } }
var b = async ({ pageParam: e, signal: t, userId: n }) => { if (!n) return { chats: [], hasMore: !1 }; let r =
    new URLSearchParams;
  r.set(`limit`, String(e.limit)), r.set(`offset`, String(e.offset)); let i = await p(),
    a = {}; if (typeof document < `u` && !n.startsWith(`guest:`)) { let e = document.cookie.match(
      /(?:^|;\s*)guest_user_id=([^;]+)/); if (e) { let t = `guest:${decodeURIComponent(e[1])}`;
      t !== n && (a[`X-Guest-User-Id`] = t) } } let o = await d.get(
  `chats?${r.toString()}`, { headers: { "X-User-Id": n, ...a, ...i }, signal: t }); if (!o.ok) throw Error(
    `Failed to fetch chat history: ${o.status} ${o.statusText}`); let s = (await o.json()).chats.map(y),
    c = s.length >= e.limit; return { chats: s, hasMore: c, pagination: { limit: e.limit, offset: e.offset,
      nextOffset: c ? e.offset + e.limit : null } } };

function x(e) { return { id: e.id, originalChatId: e.originalChatId, title: e.title, description: null, userId: ``,
    visibility: `public`, projectId: null, chatType: null, createdAt: e.createdAt, updatedAt: e.createdAt,
    deletedAt: null, messageCount: e.messageCount, lastMessageAt: e.createdAt, linkType: e.linkType } }
var S = async (e, t) => { if (!t) return { chats: [] }; let n = await u.get(`chats/shared`, { signal: e }); if (!n.ok)
    throw Error(`Failed to fetch shared chats: ${n.status} ${n.statusText}`); return { chats: ((await n.json())
      .chats ?? []).map(x) } }, C = async e => { let t = await p(),
      n = await d.get(`chats/unlock-status?chatId=${encodeURIComponent(e)}`, { headers: t }); if (!n.ok)
    throw Error(`Failed to fetch chat unlock status: ${n.status} ${n.statusText}`); return await n.json() }, w =
  async () => { try { let e = await p();
      await d.patch(`chats/unlock-image-gen`, { headers: e }) } catch {} }, T = async e => { let t = await u
        .delete(`share/${e}`); if (!t.ok) { let e = await t.json().catch(() =>
    ({ error: `Unknown error` })); throw Error(e.error || `Failed to delete shared chat`) } return { success: !
        0 } }, E = e(t(), 1);

function D() { if (typeof document > `u`) return; let e = document.cookie.match(/guest_user_id=([^;]+)/); return e ?
    `guest:${decodeURIComponent(e[1])}` : void 0 }
var O;
h(`chat-history-user-id`, () => { O = void 0 });
var k = e => _({ queryKey: [m.CHAT_HISTORY_QUERY, e], queryFn: ({ pageParam: t, signal: n }) => b({ pageParam: t,
      signal: n, userId: e }), initialPageParam: { offset: 0, limit: 50 }, getNextPageParam: e => { if (e.hasMore && e
        .pagination?.nextOffset) return { offset: e.pagination.nextOffset, limit: e.pagination.limit } },
    staleTime: 3e5, gcTime: 6e5, enabled: !!e }),
  A = () => { let { data: e, isAuthenticated: t } = f(), n = t ? e?.user?.id : void 0; return (0, E.useEffect)(() => { n
        && (O = n) }, [n]), n || O },
  j = () => v(k(A())),
  M = e => l({ queryKey: [m.SHARED_CHATS_QUERY, e], queryFn: ({ signal: t }) => S(t, e), staleTime: 3e5, gcTime: 6e5,
    enabled: !!e }),
  N = () => { let { data: e } = f(), t = e?.user?.id ?? void 0; return s(M(t)) },
  P = (e, t) => l({ queryKey: [m.CHAT_UNLOCK_STATUS_QUERY, e], queryFn: () => C(e), enabled: t, staleTime: 36e5,
    gcTime: 864e5 }),
  F = (e, t) => s(P(e, t)),
  I = () => { let { data: e, error: t, isLoading: r, refetch: i, fetchNextPage: a, hasNextPage: o,
    isFetchingNextPage: s } = j(), { data: l, status: u, isPending: d } = f(), p = c(), h = n(), g = (0, E.useRef)(
      null), _ = (0, E.useRef)(!1);
    (0, E.useEffect)(() => { let e = l?.user?.id || null;
      u !== `loading` && (g.current !== null && g.current !== e && (p.invalidateQueries({ queryKey: [m
          .CHAT_HISTORY_QUERY
        ] }), _.current = !1), g.current = e) }, [l?.user?.id, u, p]), (0, E.useEffect)(() => { if (h.get(
          `oauthSuccess`) === `true` && u === `authenticated` && !_.current) { _.current = !0; let e = setTimeout(
        () => { p.invalidateQueries({ queryKey: [m.CHAT_HISTORY_QUERY] }) }, 1e3); return () => clearTimeout(e) } }, [
      h, u, p
    ]); let v = (0, E.useMemo)(() => { let t = e; return t?.pages ? t.pages.flatMap(e => e.chats?.filter(e => !!e) ||
        []) : [] }, [e]),
      y = v.length === 0; return { chatHistory: (0, E.useMemo)(() => { let t = e; if (!(!t?.pages || t.pages.length ===
            0)) return { chats: v, hasMore: o ?? !1 } }, [e, v, o]), isLoading: r || d, isError: t,
      mutateChatHistory: i, hasEmptyChatHistory: y, chatsFromHistory: v, fetchNextPage: a, hasNextPage: o ?? !1,
      isFetchingNextPage: s } };
export { N as a, v as c, F as i, _ as l, D as n, T as o, A as r, w as s, I as t };
