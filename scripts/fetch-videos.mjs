// Fetches the latest uploads for the KIN and NBC YouTube channels via their
// RSS feeds (server-side — no CORS issue) and writes public/videos.json.
// Run by .github/workflows/refresh-videos.yml on a 6-hour schedule, and safe
// to run locally: `node scripts/fetch-videos.mjs`.

import { writeFileSync, readFileSync } from "node:fs";

const CHANNELS = {
  // KidsInspiring Nation — channel id is known.
  kin: { channelId: "UCnQYGxz4gBIJWHR159IT0lg", handle: "@KidsInspiringNation" },
  // Nation Builders Corp — resolved from the handle page at runtime (below).
  nbc: { channelId: null, handle: "@NationBuildersCorp" },
};

const MAX_VIDEOS = 6;
const OUT = new URL("../public/videos.json", import.meta.url);

async function resolveChannelId(handle) {
  try {
    const res = await fetch(`https://www.youtube.com/${handle}`, {
      headers: { "user-agent": "Mozilla/5.0 (compatible; kin-video-bot)" },
    });
    const html = await res.text();
    const m = html.match(/"channelId":"(UC[\w-]{22})"/);
    return m?.[1] ?? null;
  } catch {
    return null;
  }
}

function parseFeed(xml) {
  const entries = [];
  const blocks = xml.split("<entry>").slice(1);
  for (const block of blocks.slice(0, MAX_VIDEOS)) {
    const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = block.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    const published = block.match(/<published>([^<]+)<\/published>/)?.[1] ?? "";
    if (id) entries.push({ id, title: decodeEntities(title), published });
  }
  return entries;
}

function decodeEntities(s) {
  return s
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

async function fetchChannel(channelId) {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);
  if (!res.ok) throw new Error(`RSS ${res.status} for ${channelId}`);
  return parseFeed(await res.text());
}

// Keep the previous file as a safety net — never write an emptier result.
function previous() {
  try {
    return JSON.parse(readFileSync(OUT, "utf8"));
  } catch {
    return {};
  }
}

const prev = previous();
const out = { updatedAt: new Date().toISOString(), channels: {} };

for (const [key, cfg] of Object.entries(CHANNELS)) {
  let videos = [];
  try {
    const channelId = cfg.channelId ?? (await resolveChannelId(cfg.handle));
    if (channelId) videos = await fetchChannel(channelId);
  } catch (err) {
    console.error(`[videos] ${key}: ${err.message}`);
  }
  if (!videos.length && prev.channels?.[key]?.videos?.length) {
    videos = prev.channels[key].videos; // keep last known good
    console.log(`[videos] ${key}: fetch failed, keeping previous list`);
  }
  out.channels[key] = { handle: cfg.handle, videos };
  console.log(`[videos] ${key}: ${videos.length} videos${videos[0] ? ` (latest: ${videos[0].title})` : ""}`);
}

writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n");
console.log(`[videos] wrote ${OUT.pathname}`);
