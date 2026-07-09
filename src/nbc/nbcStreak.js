// NBC Weekly Streak — a Nation-Builders-owned habit loop (no dependency on the
// KidsInspiring daily streak). A builder checks in ONCE A WEEK; a school term is
// 13 weeks, so 13 consecutive check-ins completes a term. Persists in
// localStorage — leave and come back, your streak is waiting.

const KEY = "nbc_streak_v1";
export const TERM_WEEKS = 13;

function safeRead() {
  try {
    const raw = localStorage.getItem(KEY);
    const s = raw ? JSON.parse(raw) : null;
    return s && typeof s === "object" && s.weeks ? s : { weeks: {}, best: 0 };
  } catch {
    return { weeks: {}, best: 0 };
  }
}

// ISO-week key, e.g. "2026-W27". Uses the local Date (available in the browser).
export function isoWeekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = d.getUTCDay() || 7; // Mon=1..Sun=7
  d.setUTCDate(d.getUTCDate() + 4 - day); // shift to Thursday of this week
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const wk = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getUTCFullYear()}-W${String(wk).padStart(2, "0")}`;
}

function weekKeyAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n * 7);
  return isoWeekKey(d);
}

// Consecutive weekly check-ins ending now. If this week isn't checked in yet the
// streak is still "alive" (counted from last week) — you have until Sunday.
function computeStreak(weeks) {
  const checkedThisWeek = !!weeks[weekKeyAgo(0)];
  let streak = 0;
  let i = checkedThisWeek ? 0 : 1;
  while (weeks[weekKeyAgo(i)]) { streak++; i++; }
  return { streak, checkedThisWeek };
}

export function readStreak() {
  const s = safeRead();
  const { streak, checkedThisWeek } = computeStreak(s.weeks);
  const totalCheckins = Object.keys(s.weeks).length;
  const termsCompleted = Math.floor(streak / TERM_WEEKS);
  const weekInTerm = streak === 0 ? 0 : ((streak - 1) % TERM_WEEKS) + 1; // 1..13
  return {
    streak,
    best: Math.max(s.best || 0, streak),
    checkedThisWeek,
    totalCheckins,
    termsCompleted,
    weekInTerm,
    termWeeks: TERM_WEEKS,
  };
}

// Mark this week as done. Returns the fresh readStreak() snapshot.
export function checkInThisWeek() {
  const s = safeRead();
  s.weeks[weekKeyAgo(0)] = true;
  const { streak } = computeStreak(s.weeks);
  s.best = Math.max(s.best || 0, streak);
  try { localStorage.setItem(KEY, JSON.stringify({ ...s, updatedAt: Date.now() })); } catch { /* quota */ }
  return readStreak();
}
