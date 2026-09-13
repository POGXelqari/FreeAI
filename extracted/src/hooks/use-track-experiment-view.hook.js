/**
 * Source: https://use.ai/_next/static/chunks/use-track-experiment-view.hook-D5ID5Wj0.js
 * Module: use-track-experiment-view.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { t as n } from "./analytics.service-9oUGcSKY.js";
import { a as r } from "./mixpanel-B_WP0jc-.js";
var i = e(t(), 1),
  a = ({ experimentName: e, experimentValue: t, shouldTrack: a, source: o, persona: s, onFirstView: c }) => { let l = (
      0, i.useEffectEvent)(() => { c?.() });
    (0, i.useEffect)(() => { if (!a) return; let i = `experiment_viewed_${e}_${t}`;
      sessionStorage.getItem(i) || (l(), n.track(r.EXPERIMENT_VIEWED, { experimentName: e, experimentValue: t, ...o &&
        { source: o }, ...s && { persona: s } }), sessionStorage.setItem(i, `true`)) }, [e, t, a, o, s]) };
export { a as t };
