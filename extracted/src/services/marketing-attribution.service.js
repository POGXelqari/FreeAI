/**
 * Source: https://use.ai/_next/static/chunks/marketing-attribution.service-CG12a6fw.js
 * Module: marketing-attribution.service
 * Extracted & Beautified
 */

import { d as e } from "./freemium-funnel.util-D0KPcbFz.js";
var t = `marketing_traffic`,
  n = `id`,
  r = 2592e3;

function i(e) { return !!(typeof e == `string` ? new URLSearchParams(e) : e).get(n) }

function a() { typeof document > `u` || (document.cookie = `${t}=1; path=/; max-age=${r}; samesite=lax`) }

function o() { return !!e(t) }

function s() { typeof document > `u` || (document.cookie = `${t}=; path=/; max-age=0`) }

function c() { try { let e = new URL(window.location.href); if (!e.searchParams.has(n)) return;
    e.searchParams.delete(n), window.history.replaceState({}, ``, e.toString()) } catch (e) { console.warn(
      `Failed to strip the id param from the URL:`, e) } }
export { c as a, a as i, i as n, o as r, s as t };
