# The Red Letters — Words of Jesus Reader

A standalone, mobile-friendly Scripture reader from KidsInspiring Nation.

**URL:** https://kidsinspiringnation.org/words-of-christ/

## Features

- John, Matthew, Mark and Luke; 1,943 marked speech segments in 1,937 verses across 85 chapters containing red-letter passages.
- Words attributed to Jesus appear **in red**, grouped by Gospel, chapter and verse.
- Play, pause, skip sayings, move between chapters, and choose an English device voice and reading speed.
- The current spoken word is highlighted **when the browser speech engine supplies word boundary events**; otherwise an approximate timed highlight is used.
- Search all sayings, link to a chapter, adjust text size, switch to night mode.
- Chapter completion and reading preferences saved locally in the browser (not synced across devices).
- No API keys, accounts, or paid audio services required.

## Implementation

This is a zero-build static page in `public/words-of-christ/`. Vite copies its files into the deployed site as-is. It does **not** change the main website's React routes or dependencies.

Files:

- `index.html` — accessible reader interface
- `styles.css` — responsive reading layout
- `app.js` — navigation, search, progress, and Web Speech API narration
- `data.json` — bundled red-letter KJV sayings

## Text and counting policy

Text extracted from the public KJV red-letter data set at https://github.com/nolanbaxter/kjv-bible. The text is presented with the surrounding non-Jesus narration removed. Verse parts that contain multiple separate sayings retain their sequence. Some passages, especially John 3:16–21, have speaker-attribution differences across editorial red-letter editions; this is one specific editorial classification, not a definitive scholarly speaker attribution. Translator-supplied word brackets are removed for smoother oral reading.

Numbers: 39,350 words and 155,428 letters, counting repeated sayings separately in each Gospel.

## Running locally

From the main site: `npm install && npm run dev`. Visit `http://localhost:5173/words-of-christ/`.

Alternatively, serve the folder using a local static HTTP server. Browsers block reading `data.json` from some `file://` pages.

## Narration caveats

Text-to-speech uses the browser's `speechSynthesis` and the device's installed voices, so pronunciation, supported languages, automatic starting, background playback and word-level timestamp support vary by browser/platform. Without word-boundary events, the app highlights an estimated word rather than claiming guaranteed precise sync. It is **not** a prerecorded human narration.

## Deployment

Existing GitHub Pages deployment workflow on the repository's `master` branch builds and deploys the public folder.
