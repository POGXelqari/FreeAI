/**
 * Source: https://use.ai/_next/static/chunks/image-compression.util-dcofMV1t.js
 * Module: image-compression.util
 * Extracted & Beautified
 */

import { i as e, n as t, r as n } from "./chat-uploads.util-DAI5F9yJ.js";
var r = { maxFileSize: t, maxDimension: n, initialQuality: .92, minQuality: .5, qualityStep: .05 },
  i = e => [`image/jpeg`, `image/png`, `image/webp`].includes(e.type),
  a = [`image/jpeg`, `image/png`, `image/webp`, `image/gif`],
  o = e => a.includes(e.type) ? new Promise(t => { let n = new Image,
      r = URL.createObjectURL(e);
    n.onload = () => { let e = { width: n.naturalWidth, height: n.naturalHeight };
      URL.revokeObjectURL(r), t(e) }, n.onerror = () => { URL.revokeObjectURL(r), t(null) }, n.src = r }) : Promise
  .resolve(null),
  s = (t, n = e) => !!t && (t.width > n || t.height > n),
  c = e => new Promise((t, n) => { let r = new Image;
    r.onload = () => t(r), r.onerror = () => n(Error(`Failed to load image`)), r.src = URL.createObjectURL(e) }),
  l = (e, t, n) => { if (e <= n && t <= n) return { width: e, height: t }; let r = e / t; return e > t ? { width: n,
      height: Math.round(n / r) } : { width: Math.round(n * r), height: n } },
  u = (e, t, n) => { let r = document.createElement(`canvas`);
    r.width = t, r.height = n; let i = r.getContext(`2d`); if (!i) throw Error(`Failed to get canvas context`); return i
      .imageSmoothingEnabled = !0, i.imageSmoothingQuality = `high`, i.drawImage(e, 0, 0, t, n), r },
  d = (e, t, n) => new Promise((r, i) => { e.toBlob(e => { e ? r(e) : i(Error(`Failed to create blob from canvas`)) },
      t, n) }),
  f = async (e, t = {}) => { let n = { ...r, ...t },
      a = e.size; if (!i(e)) return { file: e, wasCompressed: !1, originalSize: a, compressedSize: a }; let o =
      await c(e),
      s = o.naturalWidth,
      f = o.naturalHeight,
      { width: p, height: m } = l(s, f, n.maxDimension),
      h = e.type === `image/png` ? `image/png` : `image/jpeg`,
      g = u(o, p, m),
      _ = n.initialQuality,
      v = null; for (; _ >= n.minQuality && (v = await d(g, h, _), !(v.size <= n.maxFileSize));) _ -= n
    .qualityStep; if (URL.revokeObjectURL(o.src), !v) throw Error(`Failed to compress image`); if (v.size > n
      .maxFileSize && e.type === `image/png`)
      for (_ = n.initialQuality; _ >= n.minQuality && (v = await d(g, `image/jpeg`, _), !(v.size <= n.maxFileSize));)
        _ -= n.qualityStep; let y = h === `image/jpeg` ? `.jpg` : `.png`,
      b = e.name.replace(/\.[^/.]+$/, y),
      x = new File([v], b, { type: h, lastModified: Date.now() }); return { file: x, wasCompressed: !0,
      originalSize: a, compressedSize: x.size } };
export { i, s as n, o as r, f as t };
