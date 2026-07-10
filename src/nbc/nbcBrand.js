// Nation Builders Corps — sub-brand system.
// The "Republic of Builders" identity: crest, motto, pillars, civic pledge,
// and the movement figures shown across the NBC experience.
// Numbers here are program-design facts (cohort target, states, prize pool) —
// edit MOVEMENT to reflect verified figures as the movement grows.

import { T } from "../siteConfig.js";

export const NBC = {
  name: "Nation Builders Corps",
  short: "NBC",
  motto: "Build the nation you want to see.",
  // The long-horizon mandate — sprinkled across the site as our rallying line.
  mandate: "In 7 Decades, Nigeria Will Be Built.",
  mandateShort: "In 7 decades, a nation built.",
  heritage: "Nation Builders Corps · National Values",
  oath: "the Builder's Oath",
  // The civic pledge every new builder takes.
  pledge: [
    "I will not wait for the nation to change — I will build it.",
    "I will solve real problems with character, not excuses.",
    "I will serve my community before myself,",
    "and give my best in every small thing.",
    "I am a Nation Builder.",
  ],
};

// The 8 pillars (values) — a builder chooses one to carry on their ID.
export const PILLARS = [
  { key: "Integrity", emoji: "⚖️", line: "Right even when no one is watching." },
  { key: "Discipline", emoji: "🎯", line: "Show up. Every single day." },
  { key: "Wisdom", emoji: "🧭", line: "Solve the problem that lasts." },
  { key: "Service", emoji: "🤝", line: "Others before self." },
  { key: "Justice", emoji: "🕊️", line: "Fairness for everyone." },
  { key: "Perseverance", emoji: "🔥", line: "Try again, and again." },
  { key: "Humility", emoji: "🌱", line: "Always ready to learn." },
  { key: "Excellence", emoji: "⭐", line: "Best in the smallest detail." },
];

// The movement, in numbers. Framed as program design + targets, not invented stats.
export const MOVEMENT = [
  { key: "builders", value: 1000, suffix: "+", label: "Young builders", sub: "2026 cohort target" },
  { key: "states", value: 37, suffix: "", label: "States & FCT", sub: "Open nationwide" },
  { key: "values", value: 8, suffix: "", label: "Core values", sub: "The builder's code" },
  { key: "prize", value: 3, prefix: "₦", suffix: "M", label: "Prize pool", sub: "Awarded each July" },
];

// 36 states + FCT, roughly ordered by region for the presence grid.
export const STATES = [
  "Lagos", "Ogun", "Oyo", "Osun", "Ondo", "Ekiti",
  "FCT", "Niger", "Kwara", "Kogi", "Nasarawa", "Benue", "Plateau",
  "Kano", "Kaduna", "Katsina", "Kebbi", "Sokoto", "Zamfara", "Jigawa",
  "Bauchi", "Gombe", "Borno", "Yobe", "Adamawa", "Taraba",
  "Rivers", "Delta", "Bayelsa", "Akwa Ibom", "Cross River", "Edo",
  "Anambra", "Enugu", "Imo", "Abia", "Ebonyi",
];

// The three ceremonial moments of the July→July year.
export const CALENDAR = [
  { tag: "July", title: "The Call", body: "As the 3rd term ends, the new cohort forms and school clubs are chartered nationwide." },
  { tag: "Term 1–2", title: "The Build", body: "Builders run real community projects, take the course, and log impact every month." },
  { tag: "December", title: "The Conference", body: "The nation's builders gather to learn, connect, and showcase the year's work." },
  { tag: "Term 3", title: "The Reports", body: "Projects are completed and Impact Reports submitted for national grading." },
  { tag: "July", title: "The Grand Finale", body: "The session culminates — the most impactful builders are honoured by the nation." },
];

// Brand colours (lean on site tokens, name them for clarity in NBC files).
export const C = {
  green: T.green,
  greenD: T.greenD,
  greenM: T.greenM,
  gold: T.gold,
  goldL: T.goldL,
  goldD: T.goldD,
  cream: T.cream,
  coral: T.coral,
  ok: T.ok,
};

// Deterministic-ish builder id from a name (stable per name within a browser).
export function makeBuilderId(name, year = 2026) {
  const base = (name || "builder").toLowerCase().replace(/[^a-z]/g, "");
  let h = 0;
  for (let i = 0; i < base.length; i++) h = (h * 31 + base.charCodeAt(i)) % 100000;
  const n = String(1000 + (h % 8999));
  return `NB-${year}-${n}`;
}
