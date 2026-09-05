/**
 * Source: https://use.ai/_next/static/chunks/blur-keyboard.service-Cw_wHZxR.js
 * Module: blur-keyboard.service
 * Extracted & Beautified
 */

var e = -1 / 0,
  t = t => performance.now() - e < t,
  n = (t = 100) => { let n = document.activeElement; return n ? (e = performance.now(), n.blur(), new Promise(e =>
      setTimeout(e, t))) : Promise.resolve() };
export { t as n, n as t };
