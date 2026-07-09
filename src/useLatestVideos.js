import { useEffect, useState } from "react";

// Single source of truth for "what's the latest YouTube upload".
//
// Order of trust:
//   1. Same-origin /videos.json — refreshed every 6h by a GitHub Action
//      (.github/workflows/refresh-videos.yml → scripts/fetch-videos.mjs).
//      No CORS, no third-party proxy, always current within 6 hours.
//   2. allorigins proxy on the live RSS feed — a live fallback if the JSON
//      is missing/stale for some reason.
//   3. A hardcoded ID baked in at build time — last-resort so the embed is
//      never empty.
//
// channel: "kin" | "nbc".

const CHANNEL_IDS = {
  kin: "UCnQYGxz4gBIJWHR159IT0lg",
  nbc: null, // resolved server-side from the @handle; may be empty until created
};

const FALLBACK_ID = "z-9j6-4OOBs";

function parseRssFromProxy(xml) {
  const videos = [];
  const blocks = xml.split("<entry>").slice(1);
  for (const block of blocks) {
    const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = block.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    if (id) videos.push({ id, title });
  }
  return videos;
}

// Returns { videos: [{id,title,published}], loading }.
export function useLatestVideos(channel = "kin", fallbackId = FALLBACK_ID) {
  const [videos, setVideos] = useState(
    fallbackId ? [{ id: fallbackId, title: null }] : []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const done = (list) => {
      if (alive && list?.length) setVideos(list);
      if (alive) setLoading(false);
    };

    // 1. same-origin snapshot
    fetch("/videos.json", { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        const list = data?.channels?.[channel]?.videos;
        if (list?.length) return done(list);
        return Promise.reject();
      })
      .catch(() => {
        // 2. live proxy fallback
        const cid = CHANNEL_IDS[channel];
        if (!cid) return done(null);
        const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`;
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rss)}`)
          .then((r) => r.json())
          .then((d) => done(parseRssFromProxy(d?.contents || "")))
          .catch(() => done(null)); // 3. keep the build-time fallback
      });

    return () => {
      alive = false;
    };
  }, [channel, fallbackId]);

  return { videos, loading };
}

// Convenience: just the latest video's id + title.
export function useLatestVideo(channel = "kin", fallbackId = FALLBACK_ID) {
  const { videos, loading } = useLatestVideos(channel, fallbackId);
  const latest = videos[0] || {};
  return { videoId: latest.id || fallbackId, videoTitle: latest.title || null, loading };
}
