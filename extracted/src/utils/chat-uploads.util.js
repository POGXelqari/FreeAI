/**
 * Source: https://use.ai/_next/static/chunks/chat-uploads.util-DAI5F9yJ.js
 * Module: chat-uploads.util
 * Extracted & Beautified
 */

var e = [`image/jpeg`, `image/png`, `application/pdf`, `text/csv`, `application/msword`,
    `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.ms-excel`,
    `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `application/vnd.ms-powerpoint`,
    `application/vnd.openxmlformats-officedocument.presentationml.presentation`, `text/html`, `application/json`,
    `text/yaml`, `text/toml`, `text/plain`, `text/markdown`, `image/heic`, `image/x-adobe-dng`
  ],
  t = 10485760,
  n = 8e3,
  r = 2e3,
  i = e => !!e?.startsWith(`image/`) && e !== `image/x-adobe-dng`;

function a(t) { return t.type && e.includes(t.type) ? t.type : { png: `image/png`, jpg: `image/jpeg`,
    jpeg: `image/jpeg`, gif: `image/gif`, webp: `image/webp`, heic: `image/heic`, heif: `image/heic`,
    dng: `image/x-adobe-dng`, pdf: `application/pdf`, csv: `text/csv`, doc: `application/msword`,
    docx: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, xls: `application/vnd.ms-excel`,
    xlsx: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, ppt: `application/vnd.ms-powerpoint`,
    pptx: `application/vnd.openxmlformats-officedocument.presentationml.presentation`,
    pptxt: `application/vnd.openxmlformats-officedocument.presentationml.presentation`, html: `text/html`,
    htm: `text/html`, json: `application/json`, yaml: `text/yaml`, yml: `text/yaml`, toml: `text/toml`,
    txt: `text/plain`, md: `text/markdown`, markdown: `text/markdown`, conf: `text/plain`, log: `text/plain` } [t.name
    .toLowerCase().split(`.`).pop() || ``
  ] || t.type || `application/octet-stream` }
var o = [`toast_description_filename_too_long`, `toast_description_filename_required`,
    `toast_description_invalid_filesize`, `toast_description_file_too_big`,
    `toast_description_only_file_types_supported`, `toast_description_image_dimensions_required`,
    `toast_description_file_upload_image_resolution_limit`, `toast_description_file_upload_image_dimension_limit`,
    `toast_description_s3_upload_failed`, `toast_description_upload_file_error`,
    `toast_description_title_must_be_non_empty_string`, `toast_description_generic_file_upload_failed`
  ],
  s = e => o.includes(e),
  c =
  `.png,.jpg,.jpeg,.gif,.webp,.heic,.heif,.dng,.pdf,.csv,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.pptxt,.html,.htm,.json,.yaml,.yml,.toml,.txt,.md,.markdown,.conf,.log`
  .split(`,`),
  l = c.filter(e => e !== `.dng`).join(`,`),
  u = e => e ? e.length <= 26 ? e : `${e.slice(0,26)}...` : ``;
export { c as a, i as c, r as i, s as l, t as n, e as o, n as r, a as s, l as t, u };
