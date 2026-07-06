// Lightweight, dependency-free SEO helper.
// Updates document.title, meta description, canonical link, and Open Graph /
// Twitter tags client-side per route. No library (e.g. react-helmet) needed —
// matches this codebase's existing pattern of direct DOM updates (see the
// document.title handling that used to live solely in BlogPost.jsx).

export const SITE_URL = "https://www.littleroutes.co";
export const DEFAULT_TITLE = "LittleRoutes — Family Travel Playbooks";
export const DEFAULT_DESCRIPTION =
  "Personalised family travel playbooks with age-specific talking points, scavenger hunts, and personal letters for every child. From $17. Delivered instantly.";
export const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

function upsertMetaByAttr(attrName, attrValue, content) {
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets title, meta description, canonical URL, and OG/Twitter tags for the
 * current route. Call this once per page/route on mount (and whenever the
 * underlying content, e.g. a blog post, changes).
 */
export function setSEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime = null,
} = {}) {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  document.title = title;

  upsertMetaByAttr("name", "description", description);
  upsertCanonical(url);

  upsertMetaByAttr("property", "og:type", type);
  upsertMetaByAttr("property", "og:title", title);
  upsertMetaByAttr("property", "og:description", description);
  upsertMetaByAttr("property", "og:url", url);
  upsertMetaByAttr("property", "og:image", image);

  upsertMetaByAttr("name", "twitter:title", title);
  upsertMetaByAttr("name", "twitter:description", description);
  upsertMetaByAttr("name", "twitter:image", image);

  if (publishedTime) {
    upsertMetaByAttr("property", "article:published_time", publishedTime);
  }
}
