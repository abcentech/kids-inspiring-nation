// Nation Builders Course — client-side progress, badges & streak.
// No backend: everything persists in localStorage so a student can leave and
// come back and "continue where they left off". Reuses the existing daily
// streak store (dailyStorage.js) for the shared "Builder Streak".

import { NBC_MODULES } from "./nbcCourse.js";
import { readDailyState } from "./dailyStorage.js";

const KEY = "nbc_course_v1";

function safeParse(json, fallback) {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

// Shape: { completed: { "<moduleSlug>:<lessonIndex>": true }, updatedAt }
export function readProgress() {
  if (typeof localStorage === "undefined") return { completed: {} };
  const raw = localStorage.getItem(KEY);
  const state = raw ? safeParse(raw, null) : null;
  if (!state || typeof state !== "object" || typeof state.completed !== "object") {
    return { completed: {} };
  }
  return { completed: state.completed || {} };
}

function write(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...state, updatedAt: Date.now() }));
  } catch {
    /* ignore quota / private mode */
  }
}

export function lessonKey(slug, idx) {
  return `${slug}:${idx}`;
}

export function isLessonComplete(slug, idx, state = readProgress()) {
  return Boolean(state.completed[lessonKey(slug, idx)]);
}

export function markLessonComplete(slug, idx) {
  const state = readProgress();
  state.completed[lessonKey(slug, idx)] = true;
  write(state);
  return state;
}

// How many lessons of a module are done.
export function moduleProgress(slug, state = readProgress()) {
  const mod = NBC_MODULES.find((m) => m.slug === slug);
  if (!mod) return { done: 0, total: 0, pct: 0, complete: false };
  const total = mod.lessons.length;
  let done = 0;
  for (let i = 0; i < total; i++) {
    if (state.completed[lessonKey(slug, i)]) done++;
  }
  const pct = total ? Math.round((done / total) * 100) : 0;
  return { done, total, pct, complete: total > 0 && done === total };
}

// A "Builder Badge" is earned per fully-completed module.
export function earnedBadges(state = readProgress()) {
  return NBC_MODULES.filter((m) => moduleProgress(m.slug, state).complete).map((m) => ({
    slug: m.slug,
    title: m.title,
    emoji: m.emoji,
  }));
}

// Overall course completion %.
export function overallProgress(state = readProgress()) {
  const total = NBC_MODULES.reduce((n, m) => n + m.lessons.length, 0);
  let done = 0;
  NBC_MODULES.forEach((m) => {
    done += moduleProgress(m.slug, state).done;
  });
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

// The next module a student should continue with (first not-yet-complete).
export function nextModule(state = readProgress()) {
  return NBC_MODULES.find((m) => !moduleProgress(m.slug, state).complete) || null;
}

// Shared Builder Streak (reuses the daily-streak store).
export function builderStreak() {
  try {
    const { streak = 0, bestStreak = 0 } = readDailyState();
    return { streak, bestStreak };
  } catch {
    return { streak: 0, bestStreak: 0 };
  }
}
