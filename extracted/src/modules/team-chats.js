/**
 * Source: https://use.ai/_next/static/chunks/team-chats-BbJk-q5m.js
 * Module: team-chats
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { t as n } from "./useQuery-B3vkDNet.js";
import { t as r } from "./useInfiniteQuery-BZkaaFaW.js";
import { t as i } from "./useMutation-DldRSjFA.js";
import { n as a } from "./QueryClientProvider-DGxN9XtP.js";
import { o } from "./rest-api-DNPFxXXP.js";
import { n as s } from "./worker-auth.service-BtTnG2J5.js";
import { t as c } from "./team-chat.model-C0Jcmza6.js";
import { t as l } from "./analytics.service-BIbiLKmC.js";
import { a as u } from "./mixpanel-CkBALibP.js";
import { l as d } from "./chat-auth.util-CHugSHZw.js";
var f = e => ({ "X-Team-Id": e }),
  p = async (e, t) => { if (!e.ok) { let n = t; try { let r = await e.json();
        n = r?.error || r?.message || t } catch {} throw Error(n) } return await e.json() }, m = async ({ teamId: e,
    filter: t, projectId: n, limit: r, cursor: i, signal: a }) => { let c = await s(),
      l = new URLSearchParams;
    t && l.set(`filter`, t), n && l.set(`projectId`, n), r && l.set(`limit`, String(r)), i && l.set(`cursor`,
    i); let u = l.toString() ? `?${l.toString()}` : ``; return p(await o.get(`teams/${e}/chats${u}`, { headers: {
        ...c, ...f(e) }, signal: a }), `Failed to fetch team chats`) }, h = async ({ teamId: e, chatId: t,
    signal: n }) => { let r = await s(); return p(await o.get(`teams/${e}/chats/${t}`, { headers: { ...r, ...f(
        e) }, signal: n }), `Failed to fetch team chat`) }, g = async ({ teamId: e, ...t }) => { if (globalThis
      .window !== void 0) { console.trace(`[createTeamChatMutationApi] invoked`, { teamId: e, body: t }); let
        n = d(),
        r = await s(),
        i = !!r.Authorization; if (n && !i) { let e = Error(
          "[createTeamChatMutationApi] blocked: guest session cannot create team chats. The orchestrator `ensureChat` path will lazy-create the row on first message under the real userId."
          ); throw console.warn(e), e } return p(await o.post(`teams/${e}/chats`, { headers: { ...r, ...f(e) },
        json: t }), `Failed to create team chat`) } let n = await s(); return p(await o.post(
    `teams/${e}/chats`, { headers: { ...n, ...f(e) }, json: t }), `Failed to create team chat`) }, _ =
async ({ teamId: e, chatId: t, ...n }) => { let r = await s(); return p(await o.patch(
      `teams/${e}/chats/${t}`, { headers: { ...r, ...f(e) }, json: n }), `Failed to update team chat`) }, v =
    async ({ teamId: e, chatId: t }) => { let n = await s(); return p(await o.delete(
      `teams/${e}/chats/${t}`, { headers: { ...n, ...f(e) } }), `Failed to delete team chat`) }, y =
  async ({ teamId: e, chatId: t, kind: n, recipientUserId: r }) => { let i = await s(); return p(await o.post(
          `teams/${e}/chats/${t}/clone`, { headers: { ...i, ...f(e) }, json: { kind: n, ...r ?
              { recipientUserId: r } : {} } }), `Failed to clone team chat`) }, b = e(t(), 1), x = e => { if (
          !e) return []; let t = new Set,
          n = []; for (let r of e)
          for (let e of r.chats ?? []) e && !t.has(e.id) && (t.add(e.id), n.push(e)); return n }, S = (e,
      t) => { let n = r({ queryKey: [c.TEAM_CHATS_QUERY, e, t ?? `all`], queryFn: ({ pageParam: n,
              signal: r }) => m({ teamId: e, filter: t, cursor: n, signal: r }), initialPageParam: void 0,
            getNextPageParam: e => e.nextCursor ?? void 0, enabled: !!e, staleTime: 3e4 }),
          i = (0, b.useMemo)(() => x(n.data?.pages), [n.data]); return { ...n, chats: i } }, C = (e,
      t) => { let n = r({ queryKey: [c.TEAM_CHATS_QUERY, e, `project`, t], queryFn: ({ pageParam: n,
            signal: r }) => m({ teamId: e, projectId: t, cursor: n, signal: r }),
          initialPageParam: void 0, getNextPageParam: e => e.nextCursor ?? void 0, enabled: !!e && !!t,
          staleTime: 3e4 });
        (0, b.useEffect)(() => { n.hasNextPage && !n.isFetchingNextPage && n.fetchNextPage() }, [n
          .hasNextPage, n.isFetchingNextPage, n.fetchNextPage
        ]); let i = (0, b.useMemo)(() => x(n.data?.pages).filter(e => e.projectId === t), [n.data,
        t]); return { ...n, chats: i } }, w = (e, t) => n({ queryKey: [c.TEAM_CHAT_QUERY, e, t],
    queryFn: ({ signal: n }) => h({ teamId: e, chatId: t, signal: n }), enabled: !!e && !!t }), T = (e,
      t) => { e.invalidateQueries({ queryKey: [c.TEAM_CHATS_QUERY, t] }) }, E = e => { let t =
  a(); return i({ mutationKey: [c.CREATE_TEAM_CHAT_MUTATION], mutationFn: g, onSuccess: (n, r) => { T(t, r
                .teamId), n?.chat?.id && t.setQueryData([c.TEAM_CHAT_QUERY, r.teamId, n.chat
              .id], { success: !0, chat: n.chat, messages: [] }), (r.visibility === `team` || n?.chat
                ?.visibility === `team`) && l.track(u.TEAM_CHAT_CREATED, { team_id: r.teamId, chat_id: n
                  ?.chat?.id ?? r.id ?? ``, project_id: r.projectId ?? null }), n?.chat && e?.onSuccess
              ?.(n.chat) }, onError: e?.onError }) }, D = e => { let t = a(); return i({ mutationKey: [c
            .UPDATE_TEAM_CHAT_MUTATION
          ], mutationFn: _, onMutate: async e => { await t.cancelQueries({ queryKey: [c.TEAM_CHATS_QUERY,
                e.teamId
              ] }); let n = []; return t.getQueriesData({ queryKey: [c.TEAM_CHATS_QUERY, e.teamId] })
              .forEach(([r, i]) => { i?.pages && (n.push([r, i]), t.setQueryData(r, { ...i, pages: i
                    .pages.map(t => ({ ...t, chats: t.chats.map(t => t.id === e.chatId ? { ...t,
                        ...e.title !== void 0 && { title: e.title }, ...e
                        .description !== void 0 && { description: e.description }, ...e
                        .visibility !== void 0 && { visibility: e.visibility }, ...e
                        .projectId !== void 0 && { projectId: e.projectId } } :
                      t) })) })) }), { snapshots: n } }, onError: (n, r, i) => { i?.snapshots?.forEach(([e, n]) => { t
                .setQueryData(e, n) }), e?.onError?.(n) }, onSuccess: (n, r) => { T(t, r.teamId), t
              .invalidateQueries({ queryKey: [c.TEAM_CHAT_QUERY, r.teamId, r.chatId] }), e?.onSuccess?.(
                n.chat) } }) }, O = e => { let t = a(); return i({ mutationKey: [c.DELETE_TEAM_CHAT_MUTATION],
          mutationFn: v, onMutate: async e => { await t.cancelQueries({ queryKey: [c.TEAM_CHATS_QUERY, e
                .teamId
              ] }); let n = []; return t.getQueriesData({ queryKey: [c.TEAM_CHATS_QUERY, e.teamId] })
              .forEach(([r, i]) => { i?.pages && (n.push([r, i]), t.setQueryData(r, { ...i, pages: i
                      .pages.map(t => ({ ...t, chats: t.chats.filter(t => t.id !== e
                        .chatId) })) })) }), { snapshots: n } }, onError: (n, r, i) => { i?.snapshots
              ?.forEach(([e, n]) => { t.setQueryData(e, n) }), e?.onError?.(n) }, onSuccess: (n, r) => { T
              (t, r.teamId), t.removeQueries({ queryKey: [c.TEAM_CHAT_QUERY, r.teamId, r.chatId] }), e
              ?.onSuccess?.(r) } }) }, k = e => { let t = a(); return i({ mutationKey: [c
            .CLONE_TEAM_CHAT_MUTATION
          ], mutationFn: y, onSuccess: (n, r) => { T(t, r.teamId), e?.onSuccess?.(n.chat) }, onError: e
            ?.onError }) }, A = () => { let e = D(); return { renameChat: ({ teamId: t, chatId: n,
            oldTitle: r, newTitle: i }, a) => { e.mutate({ teamId: t, chatId: n,
            title: i }, { onSuccess: () => { l.track(u.CHAT_RENAMED, { chat_id: n, old_title: r,
                      new_title: i, team_id: t }), a?.onSuccess?.() }, onError: e => { a?.onError?.(
                  e) } }) }, isRenaming: e.isPending } }, j = () => { let e =
  O(); return { deleteChat: ({ teamId: t, chatId: n, chatType: r }, i) => { e.mutate({ teamId: t,
              chatId: n }, { onSuccess: () => { l.track(u.TEAM_CHAT_DELETED, { team_id: t, chat_id: n,
                    chat_type: r }), i?.onSuccess?.({ teamId: t, chatId: n }) } }) }, isDeleting: e
          .isPending } };
export { C as a, A as i, E as n, w as o, j as r, S as s, k as t };
