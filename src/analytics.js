// Minimal analytics shim. Works with GA4 (gtag) or GTM (dataLayer) if present.
export function trackEvent(name, params = {}) {
  try {
    if (typeof window !== "undefined") {
      if (typeof window.gtag === "function") {
        window.gtag("event", name, params);
        return;
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: name, ...params });
      }
    }
  } catch {
    // no-op (analytics must never break UX)
  }
}

let _initialized = false;

function loadScript(src, attrs = {}) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return resolve();
    const s = document.createElement("script");
    s.async = true;
    s.src = src;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

// Optional: initialize GA4/GTM without touching index.html.
// Set either `VITE_GA_MEASUREMENT_ID` (G-XXXX) or `VITE_GTM_ID` (GTM-XXXX).
export async function initAnalytics() {
  if (_initialized) return;
  _initialized = true;

  try {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    const gtmId = import.meta.env.VITE_GTM_ID;

    if (gtmId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "gtm.js", "gtm.start": Date.now() });
      await loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`);
      return;
    }

    if (gaId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", gaId, { send_page_view: true });
      await loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`);
    }
  } catch {
    // no-op
  }
}
