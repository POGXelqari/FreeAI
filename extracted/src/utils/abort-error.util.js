/**
 * Source: https://use.ai/_next/static/chunks/abort-error.util-BDjcGeGf.js
 * Module: abort-error.util
 * Extracted & Beautified
 */

var e = [`bodystreambuffer was aborted`, `fetch is aborted`, `the operation was aborted`, `the user aborted a request`,
    `signal is aborted without reason`
  ],
  t = t => { if (!t) return !1; let n = t.toLowerCase(); return e.some(e => n.includes(e)) },
  n = e => { if (typeof e == `string`) return t(e); if (typeof e != `object` || !e) return !1; let { name: n,
    message: r } = e; return typeof n == `string` && n.toLowerCase() === `aborterror` || typeof r == `string` && t(r) };
export { t as n, n as t };
