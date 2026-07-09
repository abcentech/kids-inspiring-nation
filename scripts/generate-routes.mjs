// GitHub Pages returns HTTP 404 for any path without a real file — the SPA
// still renders (via 404.html) but Google refuses to index pages served with
// a 404 status. This script gives every sitemap route a real index.html so
// each URL returns 200. Runs after `vite build` (see package.json).
//
// Source of truth: public/sitemap.xml — add a URL there and it gets a file.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const html = readFileSync(join(dist, "index.html"), "utf8");
const sitemap = readFileSync(join(root, "public", "sitemap.xml"), "utf8");

const paths = [...sitemap.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)]
  .map((m) => m[1])
  .filter((p) => p !== "/");

let count = 0;
for (const p of paths) {
  const dir = join(dist, p);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  count++;
}
console.log(`[routes] wrote ${count} route index.html files (200s for every sitemap URL)`);
