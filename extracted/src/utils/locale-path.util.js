/**
 * Source: https://use.ai/_next/static/chunks/locale-path.util-nU2-KrUb.js
 * Module: locale-path.util
 * Extracted & Beautified
 */

import { n as e } from "./intl.constant-DpFKv8U4.js";
var t = t => { let [, n = ``, ...r] = t.split(`/`); return e.some(e => e.toLowerCase() === n.toLowerCase()) ?
    `/${r.join(`/`)}` : t };
export { t };
