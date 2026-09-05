/**
 * Source: https://use.ai/_next/static/chunks/chat-history-Ck4B7fB_.js
 * Module: chat-history
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { tt as n } from "./vinext-CqpRraGS.js";
import { t as r } from "./useQuery-B3vkDNet.js";
import { t as i } from "./useInfiniteQuery-BZkaaFaW.js";
import { n as a } from "./QueryClientProvider-DGxN9XtP.js";
import { t as o } from "./queryOptions-Dfvzj6n2.js";
import { i as s, o as c } from "./rest-api-DNPFxXXP.js";
import { n as l } from "./better-auth-client-session.service-ercwbZKT.js";
import { n as u } from "./worker-auth.service-BtTnG2J5.js";
import { t as d } from "./chat-key.constant-DXJEa87X.js";
import { t as f } from "./logout-teardown.service-BVsq4fds.js";

function p(e) { return e }

function m(e) { return { id: e.id, title: e.title, description: e.description ?? null, userId: e.userId, visibility: e
      .visibility, projectId: e.projectId ?? null, chatType: e.chatType ?? null, createdAt: e.createdAt, updatedAt: e
      .updatedAt, deletedAt: e.deletedAt, messageCount: 0, lastMessageAt: e.updatedAt } }
var h = async ({ pageParam: e, signal: t, userId: n }) => { if (!n) return { chats: [], hasMore: !1 }; let r =
    new URLSearchParams;
  r.set(`limit`, String(e.limit)), r.set(`offset`, String(e.offset)); let i = await u(),
    a = {}; if (typeof document < `u` && !n.startsWith(`guest:`)) { let e = document.cookie.match(
      /(?:^|;\s*)guest_user_id=([^;]+)/); if (e) { let t = `guest:${decodeURIComponent(e[1])}`;
      t !== n && (a[`X-Guest-User-Id`] = t) } } let o = await c.get(
  `chats?${r.toString()}`, { headers: { "X-User-Id": n, ...a, ...i }, signal: t }); if (!o.ok) throw Error(
    `Failed to fetch chat history: ${o.status} ${o.statusText}`); let s = (await o.json()).chats.map(m),
    l = s.length >= e.limit; return { chats: s, hasMore: l, pagination: { limit: e.limit, offset: e.offset,
      nextOffset: l ? e.offset + e.limit : null } } };

function g(e) { return { id: e.id, originalChatId: e.originalChatId, title: e.title, description: null, userId: ``,
    visibility: `public`, projectId: null, chatType: null, createdAt: e.createdAt, updatedAt: e.createdAt,
    deletedAt: null, messageCount: e.messageCount, lastMessageAt: e.createdAt, linkType: e.linkType } }
var _ = async (e, t) => { if (!t) return { chats: [] }; let n = await s.get(`chats/shared`, { signal: e }); if (!n.ok)
    throw Error(`Failed to fetch shared chats: ${n.status} ${n.statusText}`); return { chats: ((await n.json())
      .chats ?? []).map(g) } }, v = async e => { let t = await u(),
      n = await c.get(`chats/unlock-status?chatId=${encodeURIComponent(e)}`, { headers: t }); if (!n.ok)
    throw Error(`Failed to fetch chat unlock status: ${n.status} ${n.statusText}`); return await n.json() }, y =
  async () => { try { let e = await u();
      await c.patch(`chats/unlock-image-gen`, { headers: e }) } catch {} }, b = async e => { let t = await s
        .delete(`share/${e}`); if (!t.ok) { let e = await t.json().catch(() =>
    ({ error: `Unknown error` })); throw Error(e.error || `Failed to delete shared chat`) } return { success: !
        0 } }, x = e(t(), 1);

function S() { if (typeof document > `u`) return; let e = document.cookie.match(/guest_user_id=([^;]+)/); return e ?
    `guest:${decodeURIComponent(e[1])}` : void 0 }
var C;
f(`chat-history-user-id`, () => { C = void 0 });
var w = e => p({ queryKey: [d.CHAT_HISTORY_QUERY, e], queryFn: ({ pageParam: t, signal: n }) => h({ pageParam: t,
      signal: n, userId: e }), initialPageParam: { offset: 0, limit: 50 }, getNextPageParam: e => { if (e.hasMore && e
        .pagination?.nextOffset) return { offset: e.pagination.nextOffset, limit: e.pagination.limit } },
    staleTime: 3e5, gcTime: 6e5, enabled: !!e }),
  T = () => { let { data: e, isAuthenticated: t } = l(), n = t ? e?.user?.id : void 0; return (0, x.useEffect)(() => { n
        && (C = n) }, [n]), n || C },
  E = () => { let e = T(); return i(w(e)) },
  D = e => o({ queryKey: [d.SHARED_CHATS_QUERY, e], queryFn: ({ signal: t }) => _(t, e), staleTime: 3e5, gcTime: 6e5,
    enabled: !!e }),
  O = () => { let { data: e } = l(), t = e?.user?.id ?? void 0; return r(D(t)) },
  k = (e, t) => o({ queryKey: [d.CHAT_UNLOCK_STATUS_QUERY, e], queryFn: () => v(e), enabled: t, staleTime: 36e5,
    gcTime: 864e5 }),
  A = (e, t) => r(k(e, t)),
  j = () => { let { data: e, error: t, isLoading: r, refetch: i, fetchNextPage: o, hasNextPage: s,
    isFetchingNextPage: c } = E(), { data: u, status: f, isPending: p } = l(), m = a(), h = n(), g = (0, x.useRef)(
      null), _ = (0, x.useRef)(!1);
    (0, x.useEffect)(() => { let e = u?.user?.id || null;
      f !== `loading` && (g.current !== null && g.current !== e && (m.invalidateQueries({ queryKey: [d
          .CHAT_HISTORY_QUERY
        ] }), _.current = !1), g.current = e) }, [u?.user?.id, f, m]), (0, x.useEffect)(() => { if (h.get(
          `oauthSuccess`) === `true` && f === `authenticated` && !_.current) { _.current = !0; let e = setTimeout(
        () => { m.invalidateQueries({ queryKey: [d.CHAT_HISTORY_QUERY] }) }, 1e3); return () => clearTimeout(e) } }, [
      h, f, m
    ]); let v = (0, x.useMemo)(() => { let t = e; return t?.pages ? t.pages.flatMap(e => e.chats?.filter(e => !!e) ||
        []) : [] }, [e]),
      y = v.length === 0; return { chatHistory: (0, x.useMemo)(() => { let t = e; if (!(!t?.pages || t.pages.length ===
            0)) return { chats: v, hasMore: s ?? !1 } }, [e, v, s]), isLoading: r || p, isError: t,
      mutateChatHistory: i, hasEmptyChatHistory: y, chatsFromHistory: v, fetchNextPage: o, hasNextPage: s ?? !1,
      isFetchingNextPage: c } };
export { O as a, p as c, A as i, S as n, b as o, T as r, y as s, j as t };
