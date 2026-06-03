import { T } from "./siteConfig.js";

export const MONTHLY = [
  { m: "Jan", total: 2468, sessions: 31, avg: 79 }, { m: "Feb", total: 1108, sessions: 28, avg: 39 },
  { m: "Mar", total: 1633, sessions: 31, avg: 52 }, { m: "Apr", total: 1612, sessions: 30, avg: 53 },
  { m: "May", total: 1559, sessions: 31, avg: 50 }, { m: "Jun", total: 1426, sessions: 30, avg: 47 },
  { m: "Jul", total: 1499, sessions: 31, avg: 48 }, { m: "Aug", total: 2274, sessions: 31, avg: 73 },
  { m: "Sep", total: 1730, sessions: 30, avg: 57 }, { m: "Oct", total: 1443, sessions: 31, avg: 46 },
  { m: "Nov", total: 1269, sessions: 30, avg: 42 }, { m: "Dec", total: 1203, sessions: 31, avg: 38 },
];

export const PROGRAMS = [
  {
    code: "KIND", name: "KIN Devotional",
    full: "KidsInspiring Nation Devotional",
    pillar: "Character", icon: "📖", fill: T.kindC,
    entries: 13350, sessions: 359, unique: 276, pct: 67.8,
    schedule: "Daily · 8pm WAT",
    tagline: "Our Character Flagship — holds every single day of the year",
    desc: "A daily devotional shaping the character of every goD (genius). It is the heartbeat of KIN.",
    bg: `linear-gradient(135deg,${T.green},${T.greenD})`,
    photo: "/photos/KIN_programs.jpg",
    cta: true,
  },
  {
    code: "KINGs", name: "KIN goD Cells",
    full: "KINGs — KIN goD Cells Mentorship",
    pillar: "Service", icon: "👑", fill: T.kingsC,
    entries: 1718, sessions: 129, unique: 224, pct: 8.7,
    schedule: "Sundays · 5pm WAT",
    tagline: "Senior goDs (geniuses) mentor junior goDs (geniuses) in communal cells",
    desc: "A structured mentorship community where senior goDs (geniuses) pour into juniors.",
    bg: `linear-gradient(135deg,#7B2D8B,#4A1B55)`,
    photo: "/photos/Community_impact.jpg",
    sub: [{ label: "KINGs 001", entries: 616, unique: 69 }, { label: "KINGs 002", entries: 864, unique: 123 }, { label: "KINGs 003", entries: 238, unique: 32 }],
  },
  {
    code: "DF", name: "Daniel Fast",
    full: "Daniel Fast — Spiritual Discipline Programme",
    pillar: "Spirit", icon: "🔥", fill: T.dfC,
    entries: 1619, sessions: 9, unique: 63, pct: 8.2,
    schedule: "Annual · 3-week programme",
    tagline: "Our most prestigious spiritual programme",
    desc: "A three-week season of consecration through fasting, prayer and the Word.",
    bg: `linear-gradient(135deg,${T.gold},${T.goldD})`,
    photo: "/photos/Daniel_Fast.jpg",
    sub: [{ label: "DF Week 1", entries: 406, prev: 259 }, { label: "DF Week 2", entries: 576, prev: 272 }, { label: "DF Week 3", entries: 637, prev: 212 }],
  },
  {
    code: "gDX", name: "goDxperience",
    full: "goDxperience — Sunday Spiritual Training",
    pillar: "Spirit", icon: "✨", fill: T.gdxC,
    entries: 1107, sessions: 47, unique: 134, pct: 5.6,
    schedule: "Sundays · 11am WAT",
    tagline: "Faith-based training for Nation-building goDs",
    desc: "A Sunday morning spiritual formation experience raising Nation-builders.",
    bg: `linear-gradient(135deg,${T.goldL},${T.gold})`,
    photo: "/photos/Spirit_Filled_Parents.jpg",
  },
  {
    code: "P119", name: "P119 Academy",
    full: "Psalm 119 Academy — Mind Capacity",
    pillar: "Skills", icon: "🧠", fill: T.p119C,
    entries: 999, sessions: 42, unique: 131, pct: 5.1,
    schedule: "Fridays · 5pm WAT",
    tagline: "Maths, English & Character — from the Oldest Book",
    desc: "A weekly community programme teaching core academic subjects and Character.",
    bg: `linear-gradient(135deg,${T.info},#004C99)`,
    photo: "/photos/P119_Academy.jpg",
  },
  {
    code: "gU", name: "goDs University",
    full: "goDs University — Spirit & Skills Formation",
    pillar: "Spirit + Skills", icon: "🎓", fill: T.gold,
    entries: null, sessions: 44, unique: null, pct: null,
    displayValue: "2",
    displayLabel: "dimensions",
    footerStats: [{ l: "Pathways", v: 2 }, { l: "Weeks", v: 44 }],
    schedule: "Ongoing · two dimensions",
    tagline: "Spirit formation and academic excellence in one funnel",
    desc: "goDs University forms children in Spirit and sharpens them in Skills for service.",
    bg: `linear-gradient(135deg,${T.goldD},${T.green})`,
    photo: "/photos/Skills_Development.jpg",
  },
  {
    code: "FACE", name: "Feed A Community",
    full: "FACE — Feed A Community Every week",
    pillar: "Service", icon: "🍽️", fill: T.faceC,
    entries: null, sessions: 52, unique: null, pct: null,
    meals: 1952,
    schedule: "Sundays · 3pm WAT",
    tagline: "1,952 meals served in 2025",
    desc: "KidsInspiring Nation feeds every child in the community, meeting their practical needs.",
    bg: `linear-gradient(135deg,${T.coral},#A83920)`,
    photo: "/photos/FACE_Feed_A_Community_EveryWeek.jpg",
  },
  {
    code: "TJC", name: "Jesus Christ Concert",
    full: "The Jesus Christ Concert — Annual Celebration",
    pillar: "Service", icon: "🎶", fill: T.tjcC,
    entries: 49, sessions: 1, unique: 49, pct: 0.2,
    schedule: "Annual · Christmas Season",
    tagline: "Songs, awards, drama, feeding & the true meaning of Christmas",
    desc: "TJC is KidsInspiring Nation's yearly celebration with a true Christmas experience.",
    bg: `linear-gradient(135deg,#8B4513,#5C2D0A)`,
    photo: "/photos/Epic_moments.jpg",
  },
  {
    code: "CST", name: "Covenant Servants",
    full: "Covenant Servants Training — Volunteer Formation",
    pillar: "Spirit", icon: "🕊️", fill: T.cstC,
    entries: 35, sessions: 4, unique: 10, pct: 0.2,
    schedule: "Ongoing",
    tagline: "Training the volunteers who power KidsInspiring Nation",
    desc: "CST equips our volunteers — called Covenant Servants — with the heart, skills and spiritual formation.",
    bg: `linear-gradient(135deg,#27AE60,#1A6B3C)`,
    photo: "/photos/Skills_Development.jpg",
  },
];

export const PILLAR_DATA = [
  { name: "Character", entries: 14349, pct: 72.8, fill: T.kindC },
  { name: "Spirit", entries: 2761, pct: 14.0, fill: T.dfC },
  { name: "Service", entries: 1767, pct: 9.0, fill: T.kingsC },
  { name: "Skills", entries: 999, pct: 5.1, fill: T.p119C },
];

export const DF_GROWTH = [
  { name: "DF Week 1", y2024: 259, y2026: 406, pct: 57 },
  { name: "DF Week 2", y2024: 272, y2026: 576, pct: 112 },
  { name: "DF Week 3", y2024: 212, y2026: 637, pct: 200 },
];

export const TOP_gDX = [
  { name: "ThankGod AN", sessions: 47 }, { name: "Michael OA", sessions: 47 },
  { name: "Saviour TM", sessions: 46 }, { name: "gR TTN", sessions: 46 },
  { name: "David AN", sessions: 46 }, { name: "v Faith", sessions: 44 },
  { name: "Talia AA", sessions: 34 }, { name: "Comfort BO", sessions: 34 },
];

export const TOP_KIND = [
  { name: "Michael OA", score: 175 }, { name: "Talia AA", score: 173 },
  { name: "Divine UN", score: 169 }, { name: "Alicia OA", score: 167 },
  { name: "Adekore OM", score: 160 }, { name: "Ayoade OM", score: 159 },
  { name: "Tyshawn AA", score: 157 }, { name: "Mummy Adejola", score: 153 },
];

export const KINGS_COHORTS = [
  { label: "KINGs 001", entries: 616, unique: 69, sessions: 43 },
  { label: "KINGs 002", entries: 864, unique: 123, sessions: 43 },
  { label: "KINGs 003", entries: 238, unique: 32, sessions: 43 },
];
