import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Flame, Heart, CheckCircle2, ChevronRight, Youtube, Crown, Star } from "lucide-react";
import { T } from "./siteConfig.js";
import { submitJsonForm } from "./formSubmit.js";
import {
  computeNextStreak,
  getLagosDateKey,
  getOrCreateUserId,
  readDailyState,
  writeDailyState,
} from "./dailyStorage.js";
import { normalisePrompt, promptForDateKey } from "./dailyPrompts.js";
import { parseCsv, rowsToObjects } from "./csv.js";

const DAILY_ENDPOINT = import.meta.env.VITE_DAILY_CHECKIN_URL || "";
const PROMPTS_CSV_URL =
  import.meta.env.VITE_DAILY_PROMPTS_CSV_URL ||
  (import.meta.env.DEV ? "/daily-prompts.sample.csv" : "");

// ─── HELPERS ──────────────────────────────────────────────────────────────────
async function syncBestEffort(payload) {
  if (!DAILY_ENDPOINT) return { ok: false, skipped: true };
  try {
    const r = await submitJsonForm(DAILY_ENDPOINT, payload, "Daily check-in");
    return { ok: true, mode: "cors", response: r };
  } catch (e) {
    try {
      await fetch(DAILY_ENDPOINT, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      return { ok: true, mode: "no-cors" };
    } catch (e2) {
      return { ok: false, error: String(e2 || e) };
    }
  }
}

async function loadPromptsFromCsv() {
  if (!PROMPTS_CSV_URL) return null;
  const resp = await fetch(PROMPTS_CSV_URL, { method: "GET" });
  if (!resp.ok) return null;
  const txt = await resp.text();
  const rows = parseCsv(txt);
  const objs = rowsToObjects(rows);
  const prompts = objs
    .map(normalisePrompt)
    .filter(Boolean)
    .filter((p) => p.id && p.question && p.options?.length >= 2);
  return prompts.length ? prompts : null;
}

function pickPromptForToday(prompts, todayKey) {
  const direct = prompts.find((p) => p.dateKey === todayKey);
  if (direct) return direct;
  const firstWithVideo = prompts.find((p) => p.videoUrl);
  if (firstWithVideo) return firstWithVideo;
  let h = 0;
  for (let i = 0; i < todayKey.length; i++) h = (h * 31 + todayKey.charCodeAt(i)) >>> 0;
  return prompts[h % prompts.length];
}

function parseYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.replace("/", "") || null;
    const v = u.searchParams.get("v");
    if (v) return v;
    const m = u.pathname.match(/\/embed\/([^/]+)/);
    return m ? m[1] : null;
  } catch {
    return null;
  }
}

function loadYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (window.__kinYtPromise) return window.__kinYtPromise;
  window.__kinYtPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[data-kin-yt="1"]');
    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      s.dataset.kinYt = "1";
      document.head.appendChild(s);
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prev === "function") prev();
      resolve(window.YT);
    };
  });
  return window.__kinYtPromise;
}

function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

// Full day name formatted as "Wednesday, 15 April 2026"
function formatDevotionalDate(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-NG", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

// ─── FAITHFULNESS BADGE ───────────────────────────────────────────────────────
const FAITH_TIERS = [
  { min: 30, label: "Anointed",    emoji: "👑", color: T.gold    },
  { min: 14, label: "Steadfast",   emoji: "🔥", color: T.coral   },
  { min:  7, label: "Devoted",     emoji: "🕊️", color: T.greenM  },
  { min:  3, label: "Faithful",    emoji: "📖", color: T.goldD   },
];

function FaithBadge({ streak }) {
  const tier = FAITH_TIERS.find((t) => streak >= t.min);
  if (!tier) return null;
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 340, damping: 22, delay: 0.4 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: ".45rem",
        background: `${tier.color}18`, border: `1px solid ${tier.color}45`,
        borderRadius: 999, padding: ".35em 1em",
      }}
    >
      <span style={{ fontSize: "1.1rem" }}>{tier.emoji}</span>
      <span style={{ fontSize: ".72rem", fontWeight: 800, color: tier.color, letterSpacing: ".08em", textTransform: "uppercase" }}>
        {tier.label}
      </span>
    </motion.div>
  );
}

// ─── TEACHING VIDEO ───────────────────────────────────────────────────────────
function TeachingVideo({
  dark, brd, videoId, videoUrl, videoTitle,
  requiredSeconds, startSeconds, todayKey, promptId,
  initialWatchedSeconds, initialUnlocked, onProgress,
}) {
  const hostRef = useRef(null);
  const playerRef = useRef(null);
  const tickRef = useRef(null);
  const lastTimeRef = useRef(null);
  const requiredRef = useRef(requiredSeconds);
  const onProgressRef = useRef(onProgress);
  const unlockedRef = useRef(Boolean(initialUnlocked));

  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(Boolean(initialUnlocked));
  const [watched, setWatched] = useState(Number(initialWatchedSeconds || 0));

  useEffect(() => { requiredRef.current = requiredSeconds; }, [requiredSeconds]);
  useEffect(() => { onProgressRef.current = onProgress; }, [onProgress]);
  useEffect(() => {
    setUnlocked(Boolean(initialUnlocked));
    unlockedRef.current = Boolean(initialUnlocked);
    setWatched(Number(initialWatchedSeconds || 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayKey, promptId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const YT = await loadYouTubeApi();
        if (cancelled || !hostRef.current) return;
        try {
          if (playerRef.current?.destroy) playerRef.current.destroy();
        } catch { /* ignore */ }
        playerRef.current = null;
        playerRef.current = new YT.Player(hostRef.current, {
          width: "100%", height: "100%", videoId,
          playerVars: {
            autoplay: 0, controls: 1, rel: 0, modestbranding: 1, playsinline: 1,
            start: Number.isFinite(startSeconds) ? Math.max(0, Math.floor(startSeconds)) : undefined,
          },
          events: {
            onReady: () => { if (!cancelled) setReady(true); },
            onStateChange: (e) => {
              if (cancelled) return;
              if (e.data === YT.PlayerState.PLAYING) {
                if (tickRef.current) return;
                lastTimeRef.current = null;
                tickRef.current = window.setInterval(() => {
                  try {
                    const p = playerRef.current;
                    if (!p?.getCurrentTime) return;
                    const t = p.getCurrentTime();
                    const last = lastTimeRef.current;
                    lastTimeRef.current = t;
                    if (last === null) return;
                    const delta = t - last;
                    if (delta > 0 && delta < 1.6) {
                      setWatched((w) => {
                        const req = requiredRef.current || requiredSeconds;
                        const next = w + delta;
                        const done = next >= req;
                        if (done && !unlockedRef.current) {
                          unlockedRef.current = true;
                          setUnlocked(true);
                        }
                        const snapped = Math.round(next * 10) / 10;
                        if (onProgressRef.current) onProgressRef.current(snapped, done);
                        return snapped;
                      });
                    }
                  } catch { /* ignore */ }
                }, 500);
              } else {
                if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; }
              }
            },
          },
        });
      } catch { /* ignore */ }
    })();
    return () => {
      cancelled = true;
      if (tickRef.current) { window.clearInterval(tickRef.current); tickRef.current = null; }
      try { if (playerRef.current?.destroy) playerRef.current.destroy(); } catch { /* ignore */ }
      playerRef.current = null;
    };
  }, [videoId, startSeconds]);

  const pct = clamp((watched / requiredSeconds) * 100, 0, 100);
  const remaining = Math.max(0, Math.ceil(requiredSeconds - watched));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      style={{
        borderRadius: 24,
        overflow: "hidden",
        border: `1px solid ${unlocked ? T.ok + "50" : brd}`,
        boxShadow: dark ? "0 12px 40px rgba(0,0,0,.35)" : "0 8px 32px rgba(11,42,27,.07)",
        transition: "border-color .4s",
      }}
    >
      {/* Label row */}
      <div style={{
        background: dark ? "rgba(255,255,255,.03)" : "#fff",
        padding: "1rem 1.25rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "1rem", flexWrap: "wrap",
        borderBottom: `1px solid ${brd}`,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".65rem" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 12,
            background: unlocked ? `${T.ok}15` : `${T.gold}15`,
            display: "grid", placeItems: "center",
            color: unlocked ? T.ok : T.gold,
          }}>
            {unlocked ? <CheckCircle2 size={18} strokeWidth={2} /> : <Youtube size={18} strokeWidth={1.5} />}
          </div>
          <div>
            <div style={{ fontSize: ".7rem", fontFamily: "'DM Mono',monospace", letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.5)" : T.p3, marginBottom: ".15rem" }}>
              Today's Teaching
            </div>
            <div style={{ fontWeight: 700, fontSize: ".92rem", color: unlocked ? T.ok : (dark ? T.cream : T.greenD) }}>
              {videoTitle || "KidsInspiring Nation · YouTube"}
            </div>
          </div>
        </div>
        <a href={videoUrl} target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", fontSize: ".8rem", fontWeight: 700, color: dark ? T.goldL : T.green, textDecoration: "none" }}>
          <Youtube size={13} strokeWidth={1.5} /> Open on YouTube
        </a>
      </div>

      {/* Embed */}
      <div style={{ background: "#000", position: "relative" }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
          <div ref={hostRef} style={{ position: "absolute", inset: 0 }} />
          {!ready && (
            <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", background: "rgba(0,0,0,.75)", gap: ".5rem" }}>
              <div style={{ fontSize: "2rem" }}>📖</div>
              <div style={{ fontSize: ".82rem", color: "rgba(255,255,255,.5)", fontFamily: "'DM Mono',monospace" }}>Loading teaching…</div>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: dark ? "rgba(255,255,255,.03)" : "#fff", padding: ".9rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <div style={{ flex: 1, height: 6, borderRadius: 999, background: dark ? "rgba(255,255,255,.08)" : "rgba(11,42,27,.08)", overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", borderRadius: 999, background: unlocked ? `linear-gradient(90deg,${T.ok},#5DD35A)` : `linear-gradient(90deg,${T.gold},#E6C98F)` }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <span style={{ fontSize: ".75rem", fontFamily: "'DM Mono',monospace", fontWeight: 700, color: unlocked ? T.ok : (dark ? T.goldL : T.gold), whiteSpace: "nowrap" }}>
          {unlocked ? "✓ Teaching watched" : `${remaining}s remaining`}
        </span>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Daily({ dark }) {
  const todayKey  = useMemo(() => getLagosDateKey(new Date()), []);
  const [remotePrompt, setRemotePrompt] = useState(null);
  const prompt = useMemo(() => remotePrompt || promptForDateKey(todayKey), [remotePrompt, todayKey]);

  const [state, setState]         = useState(() => readDailyState());
  const [choice, setChoice]       = useState(null);
  const [checkedIn, setCheckedIn] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [busy, setBusy]           = useState(false);
  const [unlockReady, setUnlockReady] = useState(false);
  const [watchedSeconds, setWatchedSeconds] = useState(0);

  const videoId       = useMemo(() => parseYouTubeId(prompt.videoUrl), [prompt.videoUrl]);
  const requiredWatch = useMemo(() => clamp(Number(prompt.requiredWatchSeconds || 90), 60, 120), [prompt.requiredWatchSeconds]);
  const needsWatchGate = Boolean(videoId);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const prompts = await loadPromptsFromCsv();
        if (!prompts || cancelled) return;
        const picked = pickPromptForToday(prompts, todayKey);
        if (!cancelled) setRemotePrompt(picked);
      } catch { /* fall back to local */ }
    })();
    if (state.lastCheckinDateKey === todayKey) setCheckedIn(true);
    if (state.lastCheckinDateKey === todayKey && state.lastPromptId === prompt.id) {
      setChoice(state.lastChoice ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const s = readDailyState();
    if (s.watch?.dateKey === todayKey && s.watch?.promptId === prompt.id) {
      setWatchedSeconds(Number(s.watch?.watchedSeconds || 0));
      setUnlockReady(Boolean(s.watch?.unlocked));
    } else {
      setWatchedSeconds(0);
      setUnlockReady(!needsWatchGate);
      const next = { ...s, watch: { dateKey: todayKey, promptId: prompt.id, watchedSeconds: 0, unlocked: !needsWatchGate } };
      writeDailyState(next);
      setState(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayKey, prompt.id, needsWatchGate]);

  // Design tokens
  const bg   = dark ? "#050806" : "#FAFAF5";
  const surf = dark ? "rgba(255,255,255,.03)" : "#fff";
  const brd  = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.10)";
  const p1   = dark ? T.cream : T.greenD;
  const p2   = dark ? "rgba(253,247,236,.65)" : T.p2;

  const canCheckin = choice !== null && !busy && (unlockReady || !needsWatchGate);
  const correct    = choice !== null ? choice === prompt.correctIndex : null;

  async function onCheckIn() {
    if (choice === null) return;
    setBusy(true);
    try {
      const prev = readDailyState();
      const nextSt = computeNextStreak(prev, todayKey);
      if (nextSt.alreadyCheckedIn) {
        setCheckedIn(true); setSyncStatus("saved"); setBusy(false); return;
      }
      const next = {
        lastCheckinDateKey: todayKey,
        streak: nextSt.streak,
        bestStreak: nextSt.bestStreak,
        totalCheckins: (prev.totalCheckins || 0) + 1,
        lastPromptId: prompt.id,
        lastChoice: choice,
        watch: prev.watch,
      };
      writeDailyState(next);
      setState(next);
      setCheckedIn(true);
      setSyncStatus("saved");

      const payload = {
        type: "KIN_DAILY_CHECKIN",
        userId: getOrCreateUserId(),
        dateKey: todayKey, promptId: prompt.id, promptTitle: prompt.title,
        choiceIndex: choice, correct: choice === prompt.correctIndex,
        streak: next.streak, bestStreak: next.bestStreak, totalCheckins: next.totalCheckins,
        ts: new Date().toISOString(), tz: "Africa/Lagos",
        userAgent: navigator.userAgent, path: "/daily",
      };
      const synced = await syncBestEffort(payload);
      setSyncStatus(
        synced.ok ? (synced.mode === "cors" ? "synced" : "sent")
        : synced.skipped ? "saved" : "failed"
      );
    } finally { setBusy(false); }
  }

  const ABCD = ["A", "B", "C", "D"];
  const devotionalDate = formatDevotionalDate(todayKey);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: p1, minHeight: "100vh" }}>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{
        background: T.greenD,
        padding: "clamp(5rem,12vw,9rem) 0 clamp(3rem,7vw,5rem)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Warm gold glow — sanctuary feel */}
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 65% 70% at 15% 55%, ${T.gold}22 0%, transparent 55%),
            radial-gradient(ellipse 50% 65% at 88% 25%, ${T.green}30, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 100%, ${T.gold}10, transparent 55%)
          `,
        }} />

        {/* Devotional watermark */}
        <div aria-hidden style={{
          position: "absolute", right: "-0.05em", top: "50%", transform: "translateY(-50%)",
          fontSize: "clamp(10rem,28vw,26rem)", lineHeight: 1,
          color: "transparent", WebkitTextStroke: `1px ${T.gold}07`,
          fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900,
          userSelect: "none", pointerEvents: "none",
        }}>KIND</div>

        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1.1rem" }}>
              <span style={{ width: "2rem", height: "1.5px", background: T.gold, display: "block" }} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", letterSpacing: ".18em", textTransform: "uppercase", color: T.goldL, fontWeight: 700 }}>
                KIND · KidsInspiring Nation Devotional
              </span>
            </div>

            {/* Date — devotional journal style */}
            <div style={{
              display: "inline-block",
              fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".1em",
              textTransform: "uppercase", color: "rgba(253,247,236,.5)",
              background: "rgba(253,247,236,.06)", border: "1px solid rgba(253,247,236,.1)",
              borderRadius: 999, padding: ".4em 1em", marginBottom: "1.2rem",
            }}>
              {devotionalDate}
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(2.8rem,7.5vw,5.5rem)",
              fontWeight: 900, color: T.cream,
              letterSpacing: "-0.04em", lineHeight: 0.95,
              marginBottom: "1rem",
            }}>
              Seek God.<br />
              <em style={{ fontStyle: "italic", color: T.goldL }}>Every day.</em>
            </h1>

            <p style={{
              fontSize: "clamp(.95rem,2.2vw,1.1rem)",
              color: "rgba(253,247,236,.68)",
              lineHeight: 1.8, maxWidth: "52ch",
              marginBottom: "1.75rem",
            }}>
              The KIN Devotional shapes the character of every goD — one day, one teaching, one reflection at a time. It is the heartbeat of KidsInspiring Nation.
            </p>

            {/* Faithfulness streak pill */}
            {state.streak >= 1 && (
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem", flexWrap: "wrap" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: ".5rem",
                  background: "rgba(253,247,236,.07)", border: "1px solid rgba(253,247,236,.13)",
                  borderRadius: 999, padding: ".45rem 1.1rem",
                }}>
                  <Flame size={15} color={T.goldL} />
                  <span style={{ fontWeight: 800, color: T.cream, fontSize: ".9rem" }}>
                    {state.streak} day{state.streak === 1 ? "" : "s"} faithful
                  </span>
                </div>
                <FaithBadge streak={state.streak} />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══ FAITHFULNESS STATS ══════════════════════════════════════════════ */}
      <section style={{ background: bg, padding: "clamp(1.5rem,4vw,2.5rem) 0 0" }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,10rem), 1fr))", gap: "1rem" }}>
            {[
              { label: "Today",               icon: <BookOpen size={15} color={T.gold} />,       value: new Date().toLocaleDateString("en-NG", { weekday: "short", day: "numeric", month: "short" }) },
              { label: "Days Faithful",        icon: <Flame size={15} color={T.coral} />,         value: state.streak ? `${state.streak} day${state.streak === 1 ? "" : "s"}` : "—", glow: state.streak >= 3 },
              { label: "Best Run",             icon: <Star size={15} color={dark ? T.goldL : T.greenM} />, value: state.bestStreak ? `${state.bestStreak} day${state.bestStreak === 1 ? "" : "s"}` : "—" },
              { label: "Devotionals Complete", icon: <Heart size={15} color={dark ? T.goldL : T.green} />, value: state.totalCheckins ? `${state.totalCheckins}×` : "0" },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: surf,
                  border: `1px solid ${c.glow ? T.coral + "55" : brd}`,
                  borderRadius: 20, padding: "1.1rem 1.25rem",
                  boxShadow: c.glow ? `0 0 0 3px ${T.coral}14` : "none",
                  transition: "box-shadow .3s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: ".4rem", marginBottom: ".5rem" }}>
                  {c.icon}
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", letterSpacing: ".12em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.45)" : T.p3 }}>
                    {c.label}
                  </span>
                </div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.35rem", fontWeight: 900, letterSpacing: "-0.02em", color: p1 }}>
                  {c.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAIN DEVOTIONAL CARD ════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(1.5rem,4vw,2.5rem) 0 clamp(3rem,7vw,5rem)" }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: surf,
              border: `1px solid ${checkedIn ? (correct ? T.ok + "55" : T.warn + "55") : brd}`,
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: dark ? "0 12px 56px rgba(0,0,0,.4)" : "0 12px 56px rgba(11,42,27,.08)",
              transition: "border-color .6s",
            }}
          >
            {/* Gold accent bar */}
            <div style={{ height: 4, background: `linear-gradient(90deg, ${T.green} 0%, ${T.gold} 60%, ${T.goldL} 100%)` }} />

            {/* Card header — value tag + title */}
            <div style={{ padding: "1.5rem 1.75rem", borderBottom: `1px solid ${brd}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: ".85rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                  <div style={{
                    background: `${T.gold}18`, color: T.gold,
                    borderRadius: 8, padding: ".28em .75em",
                    fontSize: ".7rem", fontWeight: 800,
                    letterSpacing: ".08em", textTransform: "uppercase",
                    fontFamily: "'DM Mono',monospace",
                  }}>
                    📖 {prompt.title}
                  </div>
                  {checkedIn && (
                    <motion.div
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 350, damping: 18 }}
                      style={{
                        display: "flex", alignItems: "center", gap: ".3rem",
                        background: correct ? `${T.ok}15` : `${T.warn}15`,
                        color: correct ? T.ok : T.warn,
                        borderRadius: 8, padding: ".28em .65em",
                        fontSize: ".7rem", fontWeight: 800,
                      }}
                    >
                      {correct ? "✓ Correct" : "→ See reflection"}
                    </motion.div>
                  )}
                </div>
                <Link to="/NBC" style={{ textDecoration: "none", fontSize: ".82rem", fontWeight: 700, color: dark ? T.goldL : T.green, display: "flex", alignItems: "center", gap: ".3rem" }}>
                  NBC <ChevronRight size={14} />
                </Link>
              </div>

              {/* Today's question header */}
              <div style={{ fontSize: ".72rem", fontFamily: "'DM Mono',monospace", letterSpacing: ".1em", textTransform: "uppercase", color: p2, marginBottom: ".5rem" }}>
                Today's Reflection
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(1.3rem,3vw,1.75rem)",
                fontWeight: 900, color: p1,
                letterSpacing: "-0.025em", lineHeight: 1.25,
              }}>
                {prompt.question}
              </h2>
            </div>

            {/* Teaching video */}
            {needsWatchGate && (
              <div style={{ padding: "1.5rem 1.75rem", borderBottom: `1px solid ${brd}` }}>
                <TeachingVideo
                  dark={dark} brd={brd}
                  videoId={videoId} videoUrl={prompt.videoUrl} videoTitle={prompt.videoTitle}
                  requiredSeconds={requiredWatch}
                  startSeconds={Number.isFinite(Number(prompt.startSeconds)) ? Number(prompt.startSeconds) : null}
                  todayKey={todayKey} promptId={prompt.id}
                  initialWatchedSeconds={watchedSeconds} initialUnlocked={unlockReady}
                  onProgress={(sec, isDone) => {
                    setWatchedSeconds(sec);
                    setUnlockReady(isDone);
                    const prev = readDailyState();
                    const next = { ...prev, watch: { dateKey: todayKey, promptId: prompt.id, watchedSeconds: sec, unlocked: isDone } };
                    writeDailyState(next);
                    setState(next);
                  }}
                />
              </div>
            )}

            {/* Answer options */}
            <div style={{
              padding: "1.5rem 1.75rem",
              display: "grid", gap: ".75rem",
              opacity: (unlockReady || !needsWatchGate) ? 1 : 0.4,
              pointerEvents: (unlockReady || !needsWatchGate) ? "auto" : "none",
              transition: "opacity .5s",
            }}>
              {!unlockReady && needsWatchGate && (
                <div style={{ fontSize: ".82rem", color: p2, fontStyle: "italic", marginBottom: ".25rem" }}>
                  Watch today's teaching above to unlock the reflection question.
                </div>
              )}
              {prompt.options.map((opt, idx) => {
                const selected   = choice === idx;
                const showState  = checkedIn && choice !== null;
                const good       = showState && idx === prompt.correctIndex;
                const bad        = showState && selected && idx !== prompt.correctIndex;

                const borderCol = good ? `${T.ok}70` : bad ? `${T.err}60` : selected ? `${T.gold}55` : brd;
                const bgCol     = good ? `${T.ok}10` : bad ? `${T.err}09` : selected ? `${T.gold}10` : (dark ? "rgba(255,255,255,.025)" : "rgba(11,42,27,.025)");
                const labelBg   = good ? T.ok : bad ? T.err : selected ? T.gold : (dark ? "rgba(255,255,255,.07)" : "rgba(11,42,27,.07)");
                const labelClr  = (good || bad || selected) ? "#fff" : (dark ? "rgba(253,247,236,.7)" : T.greenD);

                return (
                  <motion.button
                    key={opt}
                    type="button"
                    disabled={checkedIn || busy}
                    onClick={() => setChoice(idx)}
                    whileHover={!checkedIn && !busy ? { y: -2, boxShadow: dark ? "0 6px 22px rgba(0,0,0,.2)" : "0 6px 22px rgba(11,42,27,.08)" } : {}}
                    whileTap={!checkedIn ? { scale: 0.985 } : {}}
                    style={{
                      textAlign: "left", width: "100%",
                      padding: "1rem 1.1rem", borderRadius: 16,
                      border: `1.5px solid ${borderCol}`,
                      background: bgCol, color: p1,
                      cursor: checkedIn ? "default" : "pointer",
                      transition: "background .2s, border-color .2s",
                      display: "flex", alignItems: "center", gap: ".85rem",
                    }}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: 10, flexShrink: 0,
                      display: "grid", placeItems: "center",
                      background: labelBg, color: labelClr,
                      fontWeight: 900, fontSize: ".82rem",
                      fontFamily: "'DM Mono',monospace",
                      transition: "background .2s, color .2s",
                    }}>
                      {ABCD[idx]}
                    </div>
                    <span style={{ lineHeight: 1.5, fontWeight: 600, flex: 1 }}>{opt}</span>
                    <AnimatePresence>
                      {good && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <CheckCircle2 size={17} color={T.ok} strokeWidth={2.5} />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>

            {/* Reflection explanation */}
            <AnimatePresence>
              {checkedIn && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.04, 0.62, 0.23, 0.98] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ padding: "0 1.75rem 1.75rem" }}>
                    <div style={{
                      padding: "1.1rem 1.4rem",
                      borderRadius: 18,
                      background: correct ? `${T.ok}0E` : `${T.gold}0D`,
                      border: `1px solid ${correct ? T.ok + "35" : T.gold + "35"}`,
                    }}>
                      <div style={{
                        fontFamily: "'Playfair Display',serif",
                        fontWeight: 900, fontSize: "1rem",
                        color: correct ? T.ok : T.warn,
                        fontStyle: "italic",
                        marginBottom: ".4rem",
                      }}>
                        {correct ? "✓ Well said." : "Keep growing — here's the heart of it:"}
                      </div>
                      <div style={{ color: p2, lineHeight: 1.8, fontSize: ".95rem" }}>
                        {prompt.explain}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action row */}
            <div style={{ padding: "0 1.75rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              {!checkedIn ? (
                <motion.button
                  type="button"
                  onClick={onCheckIn}
                  disabled={!canCheckin}
                  whileHover={canCheckin ? { y: -2, filter: "brightness(1.08)" } : {}}
                  whileTap={canCheckin ? { scale: 0.97 } : {}}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: ".6rem",
                    padding: "1rem 2.2rem", borderRadius: 999,
                    background: canCheckin
                      ? `linear-gradient(135deg, ${T.green}, ${T.greenM})`
                      : (dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.07)"),
                    color: canCheckin ? "#fff" : (dark ? "rgba(253,247,236,.4)" : "rgba(0,0,0,.4)"),
                    fontWeight: 800, fontSize: ".95rem", border: "none",
                    cursor: canCheckin ? "pointer" : "not-allowed",
                    boxShadow: canCheckin ? `0 8px 28px ${T.green}45` : "none",
                    transition: "all .3s cubic-bezier(0.22,1,0.36,1)",
                    fontFamily: "'Plus Jakarta Sans',sans-serif",
                  }}
                >
                  {busy
                    ? <span style={{ fontSize: ".85rem" }}>Saving…</span>
                    : <><CheckCircle2 size={17} strokeWidth={2.5} /> Complete Devotional</>
                  }
                </motion.button>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ display: "flex", alignItems: "center", gap: ".55rem", fontWeight: 900, color: T.ok, fontSize: ".95rem" }}
                >
                  <CheckCircle2 size={19} strokeWidth={2.5} />
                  Devotional complete · {state.streak} day{state.streak === 1 ? "" : "s"} faithful
                </motion.div>
              )}

              <div style={{ fontSize: ".75rem", fontFamily: "'DM Mono',monospace", color: p2 }}>
                {!unlockReady && needsWatchGate && "Watch today's teaching first"}
                {syncStatus === "synced" && "✓ Recorded"}
                {syncStatus === "sent"   && "✓ Sent"}
                {syncStatus === "failed" && "Saved locally"}
              </div>
            </div>
          </motion.div>

          {/* ─── FOOTER INVITE STRIP ─── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65 }}
            style={{
              marginTop: "1.5rem",
              background: dark ? T.greenD : `linear-gradient(135deg, ${T.greenD}, ${T.green})`,
              borderRadius: 24, padding: "1.5rem 2rem",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              gap: "1rem", flexWrap: "wrap",
              border: `1px solid ${T.gold}25`,
            }}
          >
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.1rem", fontWeight: 900, color: T.goldL, marginBottom: ".3rem" }}>
                #JesusChristisOurJOY
              </div>
              <div style={{ color: "rgba(253,247,236,.6)", fontSize: ".87rem", lineHeight: 1.65 }}>
                KIND holds daily at <strong style={{ color: T.cream }}>8pm WAT</strong>. Join us on the official WhatsApp channel — our Character Flagship runs every single day of the year.
              </div>
            </div>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <a
                href="https://youtube.com/@KidsInspiringNation"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: ".45rem",
                  padding: ".7rem 1.4rem", borderRadius: 999,
                  background: "rgba(255,0,0,.12)", color: "#FF6B6B",
                  border: "1px solid rgba(255,0,0,.2)",
                  fontWeight: 700, fontSize: ".82rem", textDecoration: "none",
                  transition: "background .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,0,0,.2)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,0,0,.12)"}
              >
                <Youtube size={14} strokeWidth={1.5} /> YouTube
              </a>
              <Link
                to="/NBC"
                style={{
                  display: "inline-flex", alignItems: "center", gap: ".45rem",
                  padding: ".7rem 1.4rem", borderRadius: 999,
                  background: T.gold, color: "#fff",
                  fontWeight: 800, fontSize: ".82rem", textDecoration: "none",
                  boxShadow: `0 6px 18px ${T.gold}45`,
                  transition: "filter .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.1)"}
                onMouseLeave={e => e.currentTarget.style.filter = "none"}
              >
                <Crown size={14} /> NBC
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
