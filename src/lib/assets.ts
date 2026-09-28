/**
 * Resolve a base-relative asset path against the Vite `base` setting.
 *
 * On GitHub Pages the app is served from `/Interactive-Geometry-Grade8/`, so a
 * diagram authored as `diagrams/u1/fig-3.svg` must resolve to
 * `/Interactive-Geometry-Grade8/diagrams/u1/fig-3.svg`.
 *
 * Absolute URLs and data URIs are passed through untouched.
 */
export function assetUrl(path: string): string {
  if (/^([a-z]+:)?\/\//i.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
