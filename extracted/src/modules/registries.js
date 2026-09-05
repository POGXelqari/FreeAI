/**
 * Source: https://use.ai/_next/static/chunks/registries-BHxkc4G_.js
 * Module: registries
 * Extracted & Beautified
 */

import "./paywall-prewarm.service-BUgoToJW.js";
var e = new Map;

function t(t, n) { e.set(t, n) }

function n(t) { return e.get(t) ?? null }
var r = new Set([`DESCRIBE_TOOLS`, `ASK_CLARIFICATION`]),
  i = e => { for (let t of e) r.add(t.toUpperCase()) },
  a = e => r.has(e),
  o = new Map;

function s(e, t, n = {}) { o.set(e, { Component: t, ...n }) }

function c(e) { return o.get(e) ?? null }
var l = [];

function u(e) { l.some(t => t.connectorId === e.connectorId) || l.push(e) }

function d() { return l }
export { a, t as c, s as i, u as n, i as o, c as r, n as s, d as t };
