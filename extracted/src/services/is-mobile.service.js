/**
 * Source: https://use.ai/_next/static/chunks/is-mobile.service-c24xKO50.js
 * Module: is-mobile.service
 * Extracted & Beautified
 */

import { t as e } from "./use-has-mounted.hook-BZPIYb5B.js";
import { t } from "./dist-V17-Ndhz.js";
import { n } from "./initial-mobile.provider-DAAXBXtb.js";
var r = () => { let e = n(),
      r = t(`(max-width: 649px)`, { defaultValue: e, initializeWithValue: !1 }),
      i = t(`(max-height: 649px)`, { initializeWithValue: !1 }); return r || i },
  i = () => { let t = e(),
      n = r(); return t ? n : null },
  a = e => { let n = t(`(max-width: 649px)`, { defaultValue: e, initializeWithValue: !1 }),
      r = t(`(max-height: 649px)`, { defaultValue: !1, initializeWithValue: !1 }); return n || r };
export { i as n, r, a as t };
