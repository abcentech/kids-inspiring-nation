# The Red Letters — Words of Jesus Reader

A standalone, mobile-friendly Scripture reader from KidsInspiring Nation.

**URL:** https://kidsinspiringnation.org/words-of-christ/

## Features

- John, Matthew, Mark and Luke; 1,943 marked speech segments in 1,937 verses across 85 chapters containing red-letter passages.
- Words attributed to Jesus appear **in red**, grouped by Gospel, chapter and verse.
- Two narration modes: **Studio voice**, a single generated British English recording with measured per-word timings, and **Device voice**, an optional browser text-to-speech fallback.
- Studio narration is built automatically at deployment: 85 chapter MP3s with a compact per-word alignment index. Highlighting follows `HTMLAudioElement.currentTime`, not a rough timer.
- Play, pause, resume without losing your place, skip sayings, move between chapters, and adjust reading speed.
- In Device mode, highlighting uses browser word-boundary events when available, or an approximate timer when those events are unavailable.
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
- `scripts/build-red-letters-audio.py` (repository root) — deterministic audio synthesis with libespeak word events
- `audio/` (built at deployment only) — 85 generated MP3 files plus `index.json` word timestamps

## Text and counting policy

Text extracted from the public KJV red-letter data set at https://github.com/nolanbaxter/kjv-bible. The text is presented with the surrounding non-Jesus narration removed. Verse parts that contain multiple separate sayings retain their sequence. Some passages, especially John 3:16–21, have speaker-attribution differences across editorial red-letter editions; this is one specific editorial classification, not a definitive scholarly speaker attribution. Translator-supplied word brackets are removed for smoother oral reading.

Numbers: 39,350 words and 155,428 letters, counting repeated sayings separately in each Gospel.

## Running locally

From the main site: `npm install && npm run dev`. Visit `http://localhost:5173/words-of-christ/`.

Alternatively, serve the folder using a local static HTTP server. Browsers block reading `data.json` from some `file://` pages.

## Narration caveats

**Studio narration** uses a consistent computer-generated English voice, recorded at build time by GPL-licensed eSpeak. Precise word times originate from engine word-boundary events, with interpolation for words where the engine emits no event. Files are encoded to MP3 and hosted on the same site. Studio playback works independently of the user's speech-synthesis engine and uses the recorded media playback clock to keep text synchronized. This is machine narration, **not** a human studio recording or premium neural TTS.

**Device narration** uses the browser's `speechSynthesis` and its installed voices. Pronunciation, support for speech events, and background playback vary by device. Missing word events use an estimated timer. Use the mode selector to switch between Studio and Device voice.

## Deployment

The GitHub Pages workflow installs `espeak`, `libespeak1`, and `ffmpeg`, builds all 85 chapter audio recordings, writes the precise word-event index into `dist/words-of-christ/audio/`, and deploys the complete public site. Generated MP3 files are intentionally **not committed** to the Git repository.

To test locally, generate audio using `python3 scripts/build-red-letters-audio.py --out public/words-of-christ/audio` after installing eSpeak and FFmpeg. To run a small fixture, use `--limit 2`.
