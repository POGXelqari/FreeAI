/**
 * Source: https://use.ai/_next/static/chunks/chat-actions-dropdown.service-CGv07yp5.js
 * Module: chat-actions-dropdown.service
 * Extracted & Beautified
 */

import { t as e } from "./analytics.service-BIbiLKmC.js";
import { a as t } from "./mixpanel-CkBALibP.js";
var n = (n, r, i) => { e.track(t.ELEMENT_CLICKED, { user_id: e.getAnalyticsProperty().user_id || null, element_name: n,
    element_type: r, team_id: i ?? null }) };
export { n as t };
