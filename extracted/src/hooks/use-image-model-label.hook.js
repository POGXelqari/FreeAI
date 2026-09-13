/**
 * Source: https://use.ai/_next/static/chunks/use-image-model-label.hook-yOBUVvtu.js
 * Module: use-image-model-label.hook
 * Extracted & Beautified
 */

import { o as e } from "./rolldown-runtime-C0FnF6B9.js";
import { i as t } from "./framework-D-uKrMmN.js";
import { r as n } from "./chat.store-CCLMl5kX.js";
import { n as r } from "./model-catalog.provider-Cwkj1DM4.js";
var i = e(t(), 1),
  a = () => { let { models: e, initialModelId: t } = r(), a = n(e => e.imageGenerationModel); return (0, i.useMemo)(
    () => { let n = a ?? t; return (n ? e.find(e => e.id === n) : void 0)?.label ?? e[0]?.label ?? `Model` }, [a, e,
        t]) };
export { a as t };
