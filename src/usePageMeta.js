import { useEffect } from "react";
import { ROUTE_META, SITE } from "./siteConfig.js";

function setOrCreateMeta(selector, attributes) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
}

export function usePageMeta(meta = ROUTE_META.home) {
  useEffect(() => {
    const resolvedTitle = meta.title || ROUTE_META.home.title;
    const resolvedDescription = meta.description || ROUTE_META.home.description;
    const image = meta.image || ROUTE_META.home.image;
    const canonicalPath = meta.canonicalPath || "/";
    const canonicalUrl = new URL(canonicalPath, SITE.siteUrl).toString();
    const imageUrl = new URL(image, SITE.siteUrl).toString();

    document.title = resolvedTitle;

    setOrCreateMeta('meta[name="description"]', { name: "description", content: resolvedDescription });
    const robotsSelector = 'meta[name="robots"]';
    if (meta.robots) {
      setOrCreateMeta(robotsSelector, { name: "robots", content: meta.robots });
    } else {
      const robots = document.head.querySelector(robotsSelector);
      if (robots) robots.remove();
    }
    setOrCreateMeta('meta[property="og:title"]', { property: "og:title", content: resolvedTitle });
    setOrCreateMeta('meta[property="og:description"]', { property: "og:description", content: resolvedDescription });
    setOrCreateMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setOrCreateMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    setOrCreateMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setOrCreateMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE.name });
    setOrCreateMeta('meta[name="twitter:title"]', { name: "twitter:title", content: resolvedTitle });
    setOrCreateMeta('meta[name="twitter:description"]', { name: "twitter:description", content: resolvedDescription });
    setOrCreateMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // Optional route-level JSON-LD (SEO). Keep a single tag updated per route.
    const jsonLd = meta.jsonLd;
    const jsonString = jsonLd ? JSON.stringify(jsonLd) : "";
    let script = document.head.querySelector('script[data-kin="jsonld"]');
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-kin", "jsonld");
      document.head.appendChild(script);
    }
    script.textContent = jsonString;
  }, [meta]);
}
