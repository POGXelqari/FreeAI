/**
 * Source: https://use.ai/_next/static/chunks/geo.service-Dx27YAEH.js
 * Module: geo.service
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { d as n } from "./freemium-funnel.util-BsrrWeXM.js";
import { t as r } from "./use-has-mounted.hook-DsU-SnKZ.js";
import { t as i } from "./cookie.interface-BM92z_O9.js";
var a = e(t(), 1);

function o() { let e = n(i.USER_GEO); if (!e) return null; try { return JSON.parse(decodeURIComponent(
    e)) } catch { return null } }

function s() { let e = n(i.USER_GEO),
    t = r(); return (0, a.useMemo)(() => !t || !e ? null : o(), [t, e]) }
export { s as n, o as t };
