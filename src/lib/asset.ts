/**
 * Resolves a path under /public against the site's base URL.
 *
 * The site is served from a sub-path on GitHub Pages (/myportfolio/), where a
 * bare "/websites/x.webp" would point at the domain root and 404. Data files
 * keep writing "/websites/x.webp"; this adds the base when the <img> renders.
 */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '')
