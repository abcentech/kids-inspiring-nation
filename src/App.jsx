/*
  KidsInspiring Nation — Main Website + Impact Dashboard (as at 2025)
  ═══════════════════════════════════════════════════════════════
  Vision: Raising goDs — Geniuses with divine purpose — building Nations
  NGO: goDs Global KidsInspiring | IT No. 6980735
  Contact: KidsinspiringNation@gmail.com
  Social: @KidsInspiringNation (all platforms)
  WhatsApp: https://whatsapp.com/channel/0029Va8XnCuGE56c4SMaT41w
  Telegram: @KidsInspiring
  Linktree: linktr.ee/KidsInspiringNation
  YouTube: https://youtu.be/E5b-H_IQPyI
  Giving: Bit.ly/KINgiv

  IMPACT DATA (as at 2025):
  19,695 entries | 639 goDChildren | 365 events | 7 tracked programmes
  KIND: 13,350 | KINGs: 1,718 | DF: 1,619 | gDX: 1,107 | P119: 999
  TJC: 49 | CST: 35 | FACE: 3,000+ meals

  NDPR (Nigeria Data Protection Regulation) compliant cookie banner
  Dark mode: floating toggle button
*/

import { lazy, Suspense, useState, useEffect, useRef, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell, PieChart, Pie,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import {
  LayoutDashboard, Home, BookOpen, Users, Flame, Moon, Sun,
  TrendingUp, TrendingDown, Eye, EyeOff, Menu, X, ChevronRight,
  Heart, MessageCircle, Youtube, Instagram, ExternalLink, Bell,
  CheckCircle2, Clock, Send, Phone, Mail, Shield, Cookie,
  Activity, Award, Star, Globe, Zap, Music, Coffee, ChevronDown,
  Sparkles, ArrowRight, Timer, Landmark, Utensils, Crown
} from "lucide-react";
import { ROUTE_META, SITE, T } from "./siteConfig.js";
import { usePageMeta } from "./usePageMeta.js";
import { initAnalytics } from "./analytics.js";

const NVC = lazy(() => import("./NVC.jsx"));
const NBCRegister = lazy(() => import("./NBCRegister.jsx"));
const Giving = lazy(() => import("./Giving.jsx"));
const Gallery = lazy(() => import("./Gallery.jsx"));
const GodsUniversity = lazy(() => import("./GodsUniversity.jsx"));
const About = lazy(() => import("./About.jsx"));
const Contact = lazy(() => import("./Contact.jsx"));
const KidsInspiringLanding = lazy(() => import("./KidsInspiringLanding.jsx"));
const InvestingInKidsLanding = lazy(() => import("./InvestingInKidsLanding.jsx"));
const NationBuildersCorp = lazy(() => import("./NationBuildersCorp.jsx"));
const Transparency = lazy(() => import("./Transparency.jsx"));
const FAQ = lazy(() => import("./FAQ.jsx"));
const Daily = lazy(() => import("./Daily.jsx"));
const Privacy = lazy(() => import("./Privacy.jsx"));

// ─── IMPACT DATA (AS AT 2025) ──────────────────────────────────────────────────
const MONTHLY = [
  { m: "Jan", total: 2468, sessions: 31, avg: 79 }, { m: "Feb", total: 1108, sessions: 28, avg: 39 },
  { m: "Mar", total: 1633, sessions: 31, avg: 52 }, { m: "Apr", total: 1612, sessions: 30, avg: 53 },
  { m: "May", total: 1559, sessions: 31, avg: 50 }, { m: "Jun", total: 1426, sessions: 30, avg: 47 },
  { m: "Jul", total: 1499, sessions: 31, avg: 48 }, { m: "Aug", total: 2274, sessions: 31, avg: 73 },
  { m: "Sep", total: 1730, sessions: 30, avg: 57 }, { m: "Oct", total: 1443, sessions: 31, avg: 46 },
  { m: "Nov", total: 1269, sessions: 30, avg: 42 }, { m: "Dec", total: 1203, sessions: 31, avg: 38 },
];

const PROGRAMS = [
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
    cta: true, // has JOIN CTA
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

const PILLAR_DATA = [
  { name: "Character", entries: 14349, pct: 72.8, fill: T.kindC },
  { name: "Spirit", entries: 2761, pct: 14.0, fill: T.dfC },
  { name: "Service", entries: 1767, pct: 9.0, fill: T.kingsC },
  { name: "Skills", entries: 999, pct: 5.1, fill: T.p119C },
];

const DF_GROWTH = [
  { name: "DF Week 1", y2024: 259, y2026: 406, pct: 57 },
  { name: "DF Week 2", y2024: 272, y2026: 576, pct: 112 },
  { name: "DF Week 3", y2024: 212, y2026: 637, pct: 200 },
];

const TOP_gDX = [
  { name: "ThankGod AN", sessions: 47 }, { name: "Michael OA", sessions: 47 },
  { name: "Saviour TM", sessions: 46 }, { name: "gR TTN", sessions: 46 },
  { name: "David AN", sessions: 46 }, { name: "v Faith", sessions: 44 },
  { name: "Talia AA", sessions: 34 }, { name: "Comfort BO", sessions: 34 },
];
const TOP_KIND = [
  { name: "Michael OA", score: 175 }, { name: "Talia AA", score: 173 },
  { name: "Divine UN", score: 169 }, { name: "Alicia OA", score: 167 },
  { name: "Adekore OM", score: 160 }, { name: "Ayoade OM", score: 159 },
  { name: "Tyshawn AA", score: 157 }, { name: "Mummy Adejola", score: 153 },
];
const KINGS_COHORTS = [
  { label: "KINGs 001", entries: 616, unique: 69, sessions: 43 },
  { label: "KINGs 002", entries: 864, unique: 123, sessions: 43 },
  { label: "KINGs 003", entries: 238, unique: 32, sessions: 43 },
];

// ─── UTILS ───────────────────────────────────────────────────────────────────
function useCountUp(target, dur = 800, active = true) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    const t0 = performance.now();
    let frame = 0;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * e));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, dur, active]);
  return active ? v : target;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("rev"); obs.unobserve(e.target); } }),
      { threshold: .1, rootMargin: "0px 0px -20px 0px" }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const CustomTooltip = ({ active, payload, label, dark }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: dark ? "#1C1C1E" : "#1D1D1F", border: `1px solid ${dark ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.08)"}`, borderRadius: 10, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,.32)", minWidth: 130 }}>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < payload.length - 1 ? 3 : 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.color || T.green, flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#fff", fontWeight: 500 }}>{p.value?.toLocaleString()}</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)", fontFamily: "'DM Sans',sans-serif" }}>{p.name}</span>
        </div>
      ))}
    </div>
  );
};

// goDs branding helper
const GoDs = ({ style = {}, suffixStyle = {} }) => (
  <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", ...style }}>
    <span style={{ fontWeight: 900 }}>g</span>
    <span style={{ fontWeight: 900, color: "inherit" }}>oDs</span>
    <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontStyle: "normal", fontSize: "0.42em", fontWeight: 700, letterSpacing: "0.02em", color: "inherit", opacity: 0.92, ...suffixStyle }}>
      {" "}(geniuses)
    </span>
  </span>
);

// ─── COOKIE BANNER (NDPR) ─────────────────────────────────────────────────────
function CookieBanner({ dark }) {
  const [show, setShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    const c = localStorage.getItem("kin_cookie_consent");
    if (!c) setTimeout(() => setShow(true), 1500);
  }, []);
  const accept = () => { localStorage.setItem("kin_cookie_consent", "accepted"); setShow(false); };
  const reject = () => { localStorage.setItem("kin_cookie_consent", "rejected"); setShow(false); };
  if (!show) return null;
  const bg = dark ? "#1C1C1E" : "#fff", txt = dark ? T.d1 : T.p1, sub = dark ? T.d2 : T.p2, brd = dark ? T.brdD : T.brd;
  return (
    <div className="kin-cookie-banner" style={{ zIndex: 9999, width: "min(560px,calc(100vw - 32px))", animation: "cookieIn .4s ease-out both" }}>
      <div style={{ background: bg, borderRadius: 16, padding: 20, boxShadow: "0 16px 64px rgba(0,0,0,.2),0 2px 8px rgba(0,0,0,.08)", border: `1px solid ${brd}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
          <Cookie size={18} strokeWidth={1.5} style={{ color: T.gold, flexShrink: 0, marginTop: 2 }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: txt, marginBottom: 4, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>We value your privacy</div>
            <p style={{ fontSize: 11, color: sub, lineHeight: 1.55 }}>
              KidsInspiring Nation uses cookies to improve your experience on this website, in compliance with the <strong>Nigeria Data Protection Regulation (NDPR) 2019</strong>. We collect anonymised usage data to improve our programmes and website. We do not sell your data.
              {expanded && (<span> Your data is processed by KidsInspiring Nation as the Data Controller. You have the right to access, correct or delete your data at any time by contacting KidsinspiringNation@gmail.com.</span>)}
            </p>
            <button onClick={() => setExpanded(!expanded)} style={{ fontSize: 11, color: T.gold, fontWeight: 500, marginTop: 4, cursor: "pointer", background: "none", border: "none", padding: 0 }}>
              {expanded ? "Show less ▲" : "Learn more ▼"}
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={reject} style={{ padding: "7px 16px", borderRadius: 8, fontSize: 12, fontWeight: 500, color: sub, border: `1px solid ${brd}`, background: "transparent", cursor: "pointer", transition: "background .15s ease-out" }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.04)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            Decline
          </button>
          <button onClick={accept} style={{ padding: "7px 20px", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#fff", background: T.green, cursor: "pointer", transition: "filter .15s" }}
            onMouseEnter={e => e.currentTarget.style.filter = "brightness(.88)"}
            onMouseLeave={e => e.currentTarget.style.filter = "none"}>
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── DARK MODE FLOAT ──────────────────────────────────────────────────────────
function DarkToggle({ dark, toggle }) {
  return (
    <button onClick={toggle} title="Toggle dark mode"
      className="kin-fixed-control kin-fixed-control--right"
      style={{ zIndex: 8999, width: 44, height: 44, borderRadius: "50%", background: dark ? "#1C1C1E" : "#fff", border: `1.5px solid ${dark ? T.brdD : T.brd}`, boxShadow: "0 4px 16px rgba(0,0,0,.14)", display: "grid", placeItems: "center", cursor: "pointer", color: dark ? T.goldL : T.greenD, transition: "all .2s ease-out" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.2)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,.14)"; }}>
      {dark ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  WEBSITE
// ═══════════════════════════════════════════════════════════════════════════════

function Website({ dark }) {
  const navigate = useNavigate();
  const onDash = () => navigate("/dashboard");
  const onNVC = () => navigate("/NBC");
  useReveal();
  const bg = dark ? T.bgD : T.bg;
  const txt = dark ? T.d1 : T.p1;

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: txt, overflowX: "hidden" }}>
      
      <NBCInvitePopup onNVC={onNVC} />
      <UpdatesSlider dark={dark} />
      <Hero onDash={onDash} />
      <DonorProofSection dark={dark} />
      <Marquee />
      <KINDCountdown />
      <KINDStrip dark={dark} />
      <AboutSection dark={dark} />
      <ProgramsSection dark={dark} />
      <VideoSection dark={dark} />
      <ImpactSection onDash={onDash} />
      <FACESection dark={dark} />
      <PhotoHighlightsStrip dark={dark} />
      <TestimonySection dark={dark} />
      <CTASection />
    </div>
  );
}

function DonorProofSection({ dark }) {
  const bg = dark ? "#060B08" : "#FFFFFF";
  const card = dark ? "rgba(255,255,255,.03)" : "rgba(11,42,27,.03)";
  const brd = dark ? "rgba(255,255,255,.09)" : "rgba(22,97,62,.12)";
  const sub = dark ? "rgba(253,247,236,.72)" : T.p2;

  return (
    <section style={{ background: bg, padding: "clamp(3.5rem,8vw,5.5rem) 0", borderBottom: `1px solid ${brd}` }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%, 22rem), 1fr))", gap: "1.5rem", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3, marginBottom: ".9rem" }}>
              Donations that convert to impact
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4.4vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: ".9rem", color: dark ? T.cream : T.greenD }}>
              Give in a way that’s<br />
              <em style={{ fontStyle: "italic", color: T.gold }}>clear, verified, and focused.</em>
            </h2>
            <p style={{ color: sub, lineHeight: 1.75, maxWidth: "62ch", marginBottom: "1.25rem" }}>
              Most donors in Nigeria prefer bank transfer. We made it the default: official account details, designated giving (Education, Feeding, Projects), and a transparency page for verification.
            </p>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <Link to="/give#bank" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.4em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 900, textDecoration: "none" }}>
                Give by bank transfer →
              </Link>
              <Link to="/transparency" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.2em", borderRadius: 999, border: `1.5px solid ${dark ? "rgba(253,247,236,.25)" : "rgba(22,97,62,.22)"}`, color: dark ? T.cream : T.greenD, fontWeight: 900, textDecoration: "none" }}>
                Verify & trust →
              </Link>
              <Link to="/give#online" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 1.2em", borderRadius: 999, border: `1.5px solid rgba(196,136,44,.35)`, color: T.gold, fontWeight: 900, textDecoration: "none" }}>
                See Paystack option
              </Link>
            </div>
          </div>

          <div style={{ display: "grid", gap: ".9rem" }}>
            {[
              { h: "Education", p: "Books, learning support, scholarships, and child development." },
              { h: "Feeding", p: "Community meals and welfare support through FACE." },
              { h: "Projects", p: "Programme logistics and outreach projects that scale impact." },
              { h: "goDsHub", p: "Infrastructure that makes delivery consistent and reliable." },
            ].map((x) => (
              <div key={x.h} style={{ background: card, borderRadius: 18, border: `1px solid ${brd}`, padding: "1.05rem 1.1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline" }}>
                  <div style={{ fontWeight: 950, color: dark ? T.goldL : T.greenD }}>{x.h}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.45)" : T.p3 }}>
                    Designated giving
                  </div>
                </div>
                <div style={{ marginTop: ".35rem", color: sub, lineHeight: 1.65 }}>{x.p}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── UPDATES SLIDER ────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    tag: "LATEST UPDATE",
    headline: "KIND Daily — Consistency\nThat Shapes Nations",
    body: "As at 2025, KIND has produced thousands of entries across hundreds of sessions. Our character flagship is built for consistency — shaping the hearts of goDs over time.",
    icon: BookOpen,
    gradient: `linear-gradient(135deg, ${T.greenD} 0%, #060E08 55%, #16613E 100%)`,
    accent: T.goldL,
    photo: "/photos/KIN_programs.jpg",
  },
  {
    id: 2,
    tag: "DANIEL FAST (AS AT 2025)",
    headline: "DF3 Grew 200%.\nThe Culture Deepens.",
    body: "Consecration is becoming a defining identity for KidsInspiring Nation — a culture of discipline, devotion, and spiritual depth.",
    icon: Flame,
    gradient: `linear-gradient(135deg, ${T.goldD} 0%, #5C3210 60%, ${T.gold} 100%)`,
    accent: T.goldL,
    photo: "/photos/Daniel_Fast.jpg",
  },
  {
    id: 3,
    tag: "NATIONAL BUILDERS",
    headline: "The Challenge\nIs Open.",
    body: "Nation Builders. A journey of character, resourcefulness and excellence. Applications are open for the current cohort.",
    icon: Landmark,
    gradient: `linear-gradient(135deg, #1A0E3A 0%, #2D1B69 50%, #0D3D26 100%)`,
    accent: "#A78BFA",
    photo: "/photos/Nation_Builders_Program1.jpg",
  },
  {
    id: 4,
    tag: "FACE PROGRAMME",
    headline: "1,952 Meals Served\nin 2025.",
    body: "Week after week, KidsInspiring Nation feeds every child in the community. FACE served 1,952 meals in 2025 — because raising Nations starts with meeting needs.",
    icon: Utensils,
    gradient: `linear-gradient(135deg, #A83920 0%, #D94F30 60%, #8B2010 100%)`,
    accent: "#FBBF72",
    photo: "/photos/FACE_Feed_A_Community_EveryWeek.jpg",
  },
  {
    id: 5,
    tag: "KINGS CELLS",
    headline: "3 Cohorts.\n224 Unique goDs.",
    body: "KINGs 001, 002, and 003 ran all year, building mentorship chains from senior to junior goDs (geniuses). Sunday at 5pm — the cells that shape the nation-builders of tomorrow.",
    icon: Crown,
    gradient: `linear-gradient(135deg, #4A1B55 0%, #7B2D8B 60%, #2D0A3A 100%)`,
    accent: "#D8B4FE",
    photo: "/photos/Community_impact.jpg",
  },
];

function UpdatesSlider({ dark }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef(null);

  const go = (idx, direction = 1) => {
    setDir(direction);
    setCurrent(idx);
  };

  const next = useCallback(() => {
    setDir(1);
    setCurrent(c => (c + 1) % SLIDES.length);
  }, []);

  const prev = () => go((current - 1 + SLIDES.length) % SLIDES.length, -1);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const slide = SLIDES[current];

  return (
    <div style={{ position: "relative", overflow: "hidden", background: dark ? "#060e08" : "#0D3D26" }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: dir * 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -60 }}
          transition={{ duration: .5, ease: [.25,.46,.45,.94] }}
          style={{ background: slide.gradient, position: "relative", overflow: "hidden" }}
        >
          {/* Ambient orb */}
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 80% at 90% 50%, ${slide.accent}18, transparent 60%)`, pointerEvents: "none" }} />
          
          {/* Dynamic Image Overlay (fails gracefully if file doesn't exist) */}
          <img 
            src={slide.photo} 
            alt={slide.headline}
            loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65, mixBlendMode: 'overlay', pointerEvents: 'none', transition: 'opacity 0.5s' }}
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />

          {/* Graceful Transition Masks (Top for Nav Contrast, Bottom for Hero blend) */}
          <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 180, background: "linear-gradient(to bottom, rgba(3,11,6,0.9) 0%, transparent 100%)", pointerEvents: "none", zIndex: 10 }} />
          <div aria-hidden style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 140, background: `linear-gradient(to top, ${dark ? "#0A1C12" : "#FAFAF5"} 0%, transparent 100%)`, pointerEvents: "none", zIndex: 10 }} />

          <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "5.5rem clamp(1.25rem,5vw,3rem) 4rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "2rem", alignItems: "center", position: "relative", zIndex: 12 }}>
            <div style={{ maxWidth: "52ch" }}>
              {/* Tag */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: `${slide.accent}22`, border: `1px solid ${slide.accent}44`, borderRadius: 999, padding: ".3em .9em", marginBottom: "1.25rem" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: slide.accent, display: "block", animation: "pulse 1.5s ease-in-out infinite" }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".66rem", fontWeight: 700, color: slide.accent, letterSpacing: ".15em", textTransform: "uppercase" }}>{slide.tag}</span>
              </div>
              {/* Headline */}
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 900, color: T.cream, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "1rem", whiteSpace: "pre-line" }}>
                {slide.headline}
              </h2>
              <p style={{ fontSize: "clamp(.9rem,2vw,1.05rem)", color: "rgba(253,247,236,.7)", lineHeight: 1.75, maxWidth: "48ch" }}>
                {slide.body}
              </p>
            </div>
            {/* Icon display */}
            <div style={{ color: "#fff", opacity: .12, userSelect: "none", pointerEvents: "none" }} aria-hidden>
              <slide.icon size={260} strokeWidth={0.5} />
            </div>
          </div>

          {/* Bottom bar: dots + arrows */}
          <div style={{ borderTop: `1px solid rgba(253,247,236,.08)`, padding: "1rem clamp(1.25rem,5vw,3rem)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* Dots */}
            <div style={{ display: "flex", gap: ".5rem" }}>
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => go(i, i > current ? 1 : -1)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 999, background: i === current ? slide.accent : "rgba(253,247,236,.2)", border: "none", cursor: "pointer", transition: "all .35s ease-out", padding: 0 }} />
              ))}
            </div>
            {/* Arrows */}
            <div style={{ display: "flex", gap: ".5rem" }}>
              <button onClick={prev} style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", display: "grid", placeItems: "center", color: T.cream, cursor: "pointer", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.18)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}>
                ←
              </button>
              <button onClick={next} style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", display: "grid", placeItems: "center", color: T.cream, cursor: "pointer", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.18)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}>
                →
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function KINDCountdown() {
  const calcNext = useCallback(() => {
    const now = new Date();
    const watOffset = 1 * 60;
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const watNow = new Date(utcMs + watOffset * 60000);

    const target = new Date(watNow);
    target.setHours(20, 0, 0, 0);
    if (watNow >= target) target.setDate(target.getDate() + 1);

    const diffMs = target - watNow;
    const totalSec = Math.floor(diffMs / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const isLive = h === 0 && m < 30;
    return { h, m, s, isLive };
  }, []);
  const [timeLeft, setTimeLeft] = useState(() => calcNext());

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcNext()), 1000);
    return () => clearInterval(id);
  }, [calcNext]);

  const pad = n => String(n).padStart(2, "0");
  const { h, m, s, isLive } = timeLeft;

  return (
    <div style={{
      background: isLive
        ? `linear-gradient(135deg, ${T.green} 0%, ${T.greenD} 100%)`
        : `linear-gradient(135deg, #071209 0%, #0D3D26 60%, #071209 100%)`,
      borderTop: `1px solid rgba(196,136,44,.18)`,
      borderBottom: `1px solid rgba(196,136,44,.25)`,
      padding: "1.5rem 0",
      position: "relative",
      overflow: "hidden",
      transition: "background 1s"
    }}>
      {/* Ambient glow orbs */}
      <div style={{ position: "absolute", left: "5%", top: "50%", transform: "translateY(-50%)", width: 250, height: 250, borderRadius: "50%", background: `radial-gradient(circle, ${T.green}30, transparent 65%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${T.gold}18, transparent 65%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", position: "relative", zIndex: 2 }}>

        {/* Left: label */}
        <div style={{ display: "flex", flexDirection: "column", gap: ".3rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
            {isLive
              ? <span style={{ fontSize: "1.2rem", animation: "pulse 1s ease-in-out infinite" }}>🔴</span>
              : <Clock size={18} color={T.goldL} strokeWidth={2} />}
            <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1rem", fontWeight: 800, color: T.cream, letterSpacing: ".01em", textTransform: "uppercase" }}>
              {isLive ? "KIND is LIVE right now —" : "Next KIND Session"}
            </span>
          </div>
          <span style={{ fontSize: ".78rem", color: "rgba(253,247,236,.45)", fontWeight: 500, letterSpacing: ".04em", paddingLeft: isLive ? 0 : "1.6rem" }}>
            {isLive ? "Join the devotional on WhatsApp or Telegram now" : "Daily KidsInspiring Nation Devotional · 8pm WAT every day"}
          </span>
        </div>

        {/* Right: countdown OR CTA */}
        {!isLive && (
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            {[{ v: pad(h), l: "Hours" }, { v: pad(m), l: "Mins" }, { v: pad(s), l: "Secs" }].map(({ v, l }, i) => (
              <>
                <div key={l} style={{
                  textAlign: "center",
                  background: "rgba(232,185,84,.1)",
                  border: "1px solid rgba(232,185,84,.2)",
                  borderRadius: 12,
                  padding: ".6rem 1rem",
                  minWidth: 70,
                  backdropFilter: "blur(8px)"
                }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 700, color: T.goldL, lineHeight: 1, letterSpacing: "-0.03em" }}>{v}</div>
                  <div style={{ fontSize: ".6rem", color: "rgba(253,247,236,.35)", fontWeight: 700, letterSpacing: ".15em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
                </div>
                {i < 2 && <span style={{ fontFamily: "'DM Mono',monospace", fontSize: "2rem", color: "rgba(196,136,44,.4)", lineHeight: 1, userSelect: "none" }}>:</span>}
              </>
            ))}
          </div>
        )}
        {isLive && (
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
            <a href={SITE.socials.whatsappChannel} target="_blank" rel="noopener noreferrer" aria-label="Open the official WhatsApp channel in a new tab" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".7em 1.8em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 800, fontSize: ".9rem", boxShadow: `0 6px 24px ${T.gold}60`, textDecoration: "none" }}>
              Join Now →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NBC INVITE POPUP ─────────────────────────────────────────────────────────
function NBCInvitePopup({ onNVC }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const seen = sessionStorage.getItem("kin_nbc_popup_seen");
    if (!seen) setTimeout(() => setShow(true), 3500);
  }, []);
  const close = () => { sessionStorage.setItem("kin_nbc_popup_seen", "1"); setShow(false); };
  const join = () => { close(); onNVC(); };

  if (!show) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: "fixed", inset: 0, zIndex: 8000, display: "grid", placeItems: "center", background: "rgba(0,0,0,.65)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", padding: "1rem" }}
          onClick={e => { if (e.target === e.currentTarget) close(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: .9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            style={{
              position: "relative",
              width: "min(520px, 100%)",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(0,0,0,.6), 0 0 0 1px rgba(196,136,44,.2)",
            }}
          >
            {/* Background */}
            <img src="/photos/Join_the_NBC_challenge.jpg" alt="NBC Challenge" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35, mixBlendMode: "luminosity" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(155deg, ${T.greenD}E6 0%, #050E07E6 60%, ${T.greenD}CC 100%)` }} />
            <div style={{ position: "absolute", top: "-40%", right: "-20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${T.gold}28, transparent 65%)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-30%", left: "-10%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${T.green}40, transparent 65%)`, pointerEvents: "none" }} />

            {/* Ghost text */}
            <div aria-hidden style={{ position: "absolute", bottom: "-0.15em", right: "-0.05em", fontSize: "clamp(10rem,35vw,18rem)", color: "transparent", WebkitTextStroke: "1px rgba(232,185,84,.05)", fontFamily: "'Playfair Display',serif", fontWeight: 900, fontStyle: "italic", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>NBC</div>

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, padding: "clamp(2rem,6vw,3rem)" }}>
              {/* Close */}
              <motion.button onClick={close}
                whileHover={{ scale: 1.15, background: T.cream, color: "#000" }}
                whileTap={{ scale: .9 }}
                style={{ position: "absolute", top: 20, right: 20, width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", display: "grid", placeItems: "center", color: "rgba(253,247,236,.6)", cursor: "pointer", transition: "all .2s" }}
              >
                <X size={16} strokeWidth={2} />
              </motion.button>

              {/* Badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: `${T.gold}22`, border: `1px solid ${T.gold}55`, borderRadius: 999, padding: ".35em 1em", marginBottom: "1.5rem" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: T.goldL, animation: "pulse 1.5s ease-in-out infinite", display: "block" }} />
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", fontWeight: 600, color: T.goldL, letterSpacing: ".1em", textTransform: "uppercase" }}>Cohort Now Open</span>
              </div>

              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,5vw,2.6rem)", fontWeight: 900, color: T.cream, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: ".75rem" }}>
                Build the Nigeria<br /><em style={{ fontStyle: "italic", color: T.goldL }}>You Want to See.</em>
              </h2>
              <p style={{ fontSize: ".95rem", color: "rgba(253,247,236,.7)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: "40ch" }}>
                The National Builders Challenge is a 9-month masterclass in character, resourcefulness, and nation-building — open to goDs aged 7–17.
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
                {[{ v: "₦3M", l: "Grand Prizes" }, { v: "1,000", l: "Nation Builders" }, { v: "9 mo.", l: "Programme" }].map(stat => (
                  <div key={stat.l}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 900, color: T.goldL, letterSpacing: "-0.04em", lineHeight: 1 }}>{stat.v}</div>
                    <div style={{ fontSize: ".7rem", color: "rgba(253,247,236,.45)", fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase" }}>{stat.l}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                <motion.button
                  onClick={join}
                  whileHover={{ scale: 1.04, filter: "brightness(1.1)" }}
                  whileTap={{ scale: .97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 2.2em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 700, fontSize: ".95rem", fontFamily: "'Plus Jakarta Sans',sans-serif", boxShadow: `0 12px 36px ${T.gold}55`, cursor: "pointer" }}
                >
                  Register Now <ArrowRight size={16} />
                </motion.button>
                <motion.button onClick={close} 
                  whileHover={{ scale: 1.05, background: "rgba(253,247,236,.12)", color: T.cream }}
                  whileTap={{ scale: .96 }}
                  style={{ display: "inline-flex", alignItems: "center", padding: ".9em 1.8em", borderRadius: 999, background: "rgba(253,247,236,.07)", color: "rgba(253,247,236,.6)", fontWeight: 600, fontSize: ".9rem", border: "1.5px solid rgba(253,247,236,.15)", cursor: "pointer", transition: "all .2s" }}>
                  Maybe later
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function SiteNav({ dark, onGive }) {
  const navigate = useNavigate();
  const location = useLocation();
  const goTo = (path) => {
    if (path.startsWith("#")) {
      const targetId = path.slice(1);
      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      if (location.pathname !== "/") {
        navigate(`/${path}`);
        window.setTimeout(scrollToTarget, 120);
      } else {
        window.history.replaceState(null, "", `/${path}`);
        scrollToTarget();
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
    setMob(false);
    setOpenDropdown(null);
  };
  const [sc, setSc] = useState(false);
  const [mob, setMob] = useState(false);
  const [mobSection, setMobSection] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const h = () => setSc(window.scrollY > 50);
    window.addEventListener("scroll", h, { passive: true }); h();
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const h = e => { if (navRef.current && !navRef.current.contains(e.target)) setOpenDropdown(null); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Close dropdown / mobile menu on Escape for keyboard users
  useEffect(() => {
    if (!mob && !openDropdown) return undefined;
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      setOpenDropdown(null);
      if (mob) { setMob(false); setMobSection(null); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mob, openDropdown]);

  const currentPath = location.pathname;
  const isHomeHero = currentPath === "/" && !sc;
  const useLightNavText = dark || isHomeHero;
  const navBg = sc ? (dark ? "rgba(5,5,5,.85)" : "rgba(250,250,245,.85)") : "transparent";
  const navBdr = sc ? `1px solid ${dark ? "rgba(196,136,44,.15)" : "rgba(22,97,62,.08)"}` : "1px solid transparent";
  const logoC = useLightNavText ? T.cream : T.green;
  const linkC = useLightNavText ? "rgba(253,247,236,.9)" : T.greenM;
  const brandSubC = useLightNavText
    ? (dark ? T.d3 : "rgba(253,247,236,.52)")
    : T.p3;

  const DROPDOWNS = {
    About: [
      { label: "Kids Inspiring", href: null, action: () => goTo('/kids-inspiring'), icon: "✨", desc: "What the movement means" },
      { label: "Investing in Kids", href: null, action: () => goTo('/investing-in-kids'), icon: "📚", desc: "Why kids are leverage" },
      { label: "Transparency", href: null, action: () => goTo('/transparency'), icon: "🛡️", desc: "Trust and verification" },
      { label: "Privacy", href: null, action: () => goTo('/privacy'), icon: "🔒", desc: "Data and contact privacy" },
      { label: "FAQ", href: null, action: () => goTo('/faq'), icon: "❓", desc: "Site-wide answers" },
      { label: "Who We Are", href: null, action: () => goTo('/about'), icon: "🌱", desc: "Our mission & story" },
      { label: "goDs Defined", href: null, action: () => goTo('/about'), icon: "👑", desc: "Genius Ordained by Destiny" },
      { label: "Impact Data", href: null, action: () => goTo('/about'), icon: "📊", desc: "639 goDs, 19,695 entries" },
      { label: "Photo Gallery", href: null, icon: "📸", desc: "View our memories", action: () => goTo('/gallery') },
      { label: "Contact Us", href: null, icon: "✉️", desc: "Get in touch", action: () => goTo('/contact') },
    ],
    Programs: [
      { label: "goDs University", href: null, icon: "👑", desc: "Spirit · Skills · Bible & Academic", action: () => goTo('/gU') },
      { label: "Nation Builders Corp", href: null, icon: "🇳🇬", desc: "Psalm 119 → nation building", action: () => goTo('/nation-builders') },
      { label: "Daily Streak", href: null, icon: "📅", desc: "60 seconds every day", action: () => goTo('/daily') },
      { label: "KIND · Daily", href: null, icon: "📖", desc: "Devotional · 8pm WAT", action: () => goTo('#programs') },
      { label: "KINGs Cells", href: null, icon: "👑", desc: "Sunday mentorship · 5pm", action: () => goTo('#programs') },
      { label: "Daniel Fast", href: null, icon: "🔥", desc: "Annual spiritual programme", action: () => goTo('#programs') },
      { label: "P119 Academy", href: null, icon: "🧠", desc: "Maths, English & Character", action: () => goTo('#programs') },
      { label: "FACE · Meals", href: null, icon: "🍽️", desc: "1,952 meals (as at 2025)", action: () => goTo('#programs') },
      { label: "All Programmes →", href: null, icon: "✨", desc: "View all 14 programmes", action: () => goTo('#programs') },
    ],
    Impact: [
      { label: "Impact Report", href: null, icon: "📈", desc: "Results (as at 2025)", action: () => goTo('#impact') },
      { label: "Live Dashboard", href: null, icon: "⚡", desc: "Real-time stats", action: () => goTo('/dashboard') },
      { label: "Testimonies", href: null, icon: "💬", desc: "goD stories", action: () => goTo('#impact') },
    ],
  };

  const toggleDropdown = key => setOpenDropdown(prev => prev === key ? null : key);

  const dropdownSurf = dark ? "rgba(12,20,14,.97)" : "rgba(255,255,255,.98)";
  const dropdownBrd = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.1)";
  const shellBg = sc
    ? (dark ? "rgba(6,16,10,.9)" : "rgba(255,252,246,.92)")
    : (dark ? "rgba(4,14,9,.86)" : "rgba(255,252,246,.88)");
  const shellBdr = dark ? "rgba(196,136,44,.14)" : "rgba(22,97,62,.1)";
  const utilityBg = dark ? "rgba(255,255,255,.045)" : "rgba(22,97,62,.05)";

  return (
    <>
      <style>{`
        @keyframes nvc-glow { 0% { box-shadow: 0 0 0 0 rgba(196,136,44,0.5); } 70% { box-shadow: 0 0 0 12px rgba(196,136,44,0); } 100% { box-shadow: 0 0 0 0 rgba(196,136,44,0); } }
        .nvc-pulse { animation: nvc-glow 2.2s infinite; }
        .nav-dd-item:hover { background: ${dark ? "rgba(255,255,255,.06)" : "rgba(22,97,62,.05)"} !important; }
        .nav-shell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          padding: 0.7rem 1rem;
          border-radius: 999px;
          border: 1px solid ${shellBdr};
          background: ${shellBg};
          box-shadow: ${dark ? "0 18px 40px rgba(0,0,0,.22)" : "0 18px 40px rgba(9,34,20,.08)"};
        }
        .nav-brand-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .nav-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          flex: 1 1 auto;
          min-width: 0;
        }
        .nav-primary {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          min-width: 0;
          flex: 1 1 auto;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          flex-shrink: 0;
        }
        .nav-give {
          background: ${utilityBg};
          border: 1px solid ${dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.08)"};
        }
        .nav-divider {
          width: 1px;
          height: 26px;
          background: ${dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.12)"};
          flex-shrink: 0;
        }
        @media(max-width:1380px){
          .nav-brand-meta small { display:none; }
          .nav-shell { gap: 1rem; }
        }
        @media(max-width:1240px){
          .nav-links{display:none!important}
          .mob-menu{display:flex!important}
          .nav-shell{
            padding: 0.75rem 0.95rem;
            border-radius: 20px;
          }
        }
        @media(max-width:640px){
          .nav-shell{
            padding: 0.65rem 0.8rem;
            gap: 0.75rem;
          }
        }
      `}</style>
      <nav ref={navRef} style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, padding: ".7rem 0", transition: "all .35s ease-out", background: navBg, backdropFilter: sc ? "blur(22px)" : "none", WebkitBackdropFilter: sc ? "blur(22px)" : "none", borderBottom: navBdr }}>
        <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem)" }}>
          <div className="nav-shell">

          {/* Logo with Glassmorphism Shimmering Effect */}
          <button onClick={() => goTo('/')} style={{ display: "flex", alignItems: "center", gap: ".65rem", textDecoration: "none", background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left", flexShrink: 0, minWidth: 0 }}>
            <div className="glass-logo" style={{ width: 42, height: 42, borderRadius: 12, display: "grid", placeItems: "center", flexShrink: 0 }}>
              <img src="/logo.svg" alt="KidsInspiring Nation" fetchPriority="high" style={{ width: 32, height: 32, objectFit: "contain", position: "relative", zIndex: 2 }} />
            </div>
            <div className="nav-brand-meta">
              <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".92rem", fontWeight: 800, color: logoC, letterSpacing: "-0.02em", lineHeight: 1.05, transition: "color .35s", whiteSpace: "nowrap" }}>KidsInspiring Nation</div>
              <small style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", color: brandSubC, letterSpacing: ".08em", textTransform: "uppercase", transition: "color .35s", whiteSpace: "nowrap" }}>Raising children with divine purpose</small>
            </div>
          </button>

          {/* Links */}
          <div className="nav-links">
            <div className="nav-primary">

            {/* Dropdown items */}
            {Object.entries(DROPDOWNS).map(([key, items]) => {
              const ddId = `nav-dd-${key.toLowerCase()}`;
              const isOpen = openDropdown === key;
              return (
              <div key={key} style={{ position: "relative" }}>
                <button
                  type="button"
                  onClick={() => toggleDropdown(key)}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  aria-controls={ddId}
                  style={{ display: "flex", alignItems: "center", gap: ".3rem", padding: ".52rem .78rem", borderRadius: 10, fontSize: ".75rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: isOpen ? T.goldL : linkC, background: isOpen ? (dark ? "rgba(255,255,255,.07)" : "rgba(22,97,62,.07)") : "transparent", cursor: "pointer", transition: "all .2s", border: "none", whiteSpace: "nowrap" }}
                  onMouseEnter={e => { if (!isOpen) { e.currentTarget.style.color = T.goldL; e.currentTarget.style.background = dark ? "rgba(255,255,255,.05)" : "rgba(22,97,62,.05)"; } }}
                  onMouseLeave={e => { if (!isOpen) { e.currentTarget.style.color = linkC; e.currentTarget.style.background = "transparent"; } }}
                >
                  {key}
                  <ChevronDown size={12} strokeWidth={2.5} style={{ transition: "transform .25s", transform: isOpen ? "rotate(180deg)" : "none" }} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: .97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: .97 }}
                      transition={{ duration: .18 }}
                      id={ddId}
                      role="menu"
                      aria-label={`${key} menu`}
                      style={{ position: "absolute", top: "calc(100% + 10px)", left: "50%", transform: "translateX(-50%)", minWidth: 240, background: dropdownSurf, borderRadius: 16, padding: "0.5rem", border: `1px solid ${dropdownBrd}`, boxShadow: dark ? "0 24px 60px rgba(0,0,0,.7), 0 2px 8px rgba(0,0,0,.4)" : "0 20px 50px rgba(10,28,18,.15), 0 2px 6px rgba(0,0,0,.06)", zIndex: 100 }}
                    >
                      {/* Arrow pip */}
                      <div style={{ position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)", width: 12, height: 12, background: dropdownSurf, border: `1px solid ${dropdownBrd}`, borderRadius: 3, rotate: "45deg", borderBottom: "none", borderRight: "none" }} />
                      {items.map(item => (
                        item.action
                          ? <button key={item.label} type="button" role="menuitem" onClick={() => { item.action(); setOpenDropdown(null); }} className="nav-dd-item" style={{ width: "100%", display: "flex", alignItems: "center", gap: ".85rem", padding: ".65rem .85rem", borderRadius: 10, background: "transparent", border: "none", cursor: "pointer", textAlign: "left", transition: "background .15s" }}>
                              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                              <div>
                                <div style={{ fontSize: ".83rem", fontWeight: 700, color: dark ? T.cream : T.greenD, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{item.label}</div>
                                <div style={{ fontSize: ".72rem", color: dark ? T.d2 : T.p2, marginTop: 1 }}>{item.desc}</div>
                              </div>
                            </button>
                          : <a key={item.label} role="menuitem" href={item.href} onClick={() => setOpenDropdown(null)} className="nav-dd-item" style={{ display: "flex", alignItems: "center", gap: ".85rem", padding: ".65rem .85rem", borderRadius: 10, background: "transparent", transition: "background .15s", textDecoration: "none" }}>
                              <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                              <div>
                                <div style={{ fontSize: ".83rem", fontWeight: 700, color: dark ? T.cream : T.greenD, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{item.label}</div>
                                <div style={{ fontSize: ".72rem", color: dark ? T.d2 : T.p2, marginTop: 1 }}>{item.desc}</div>
                              </div>
                            </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
            })}

            </div>

            <div className="nav-actions">
            <button onClick={() => onGive()} aria-current={currentPath === "/give" ? "page" : undefined} className="nav-give" style={{ padding: ".52rem .82rem", borderRadius: 999, fontSize: ".72rem", fontWeight: 700, letterSpacing: ".05em", textTransform: "uppercase", color: linkC, cursor: "pointer", transition: "all .2s", flexShrink: 0, whiteSpace: "nowrap" }}
              onMouseEnter={e => { e.currentTarget.style.color = T.goldL; e.currentTarget.style.background = dark ? "rgba(255,255,255,.07)" : "rgba(22,97,62,.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = linkC; e.currentTarget.style.background = utilityBg; }}
            >Give</button>

            <div className="nav-divider" />

            {/* National Builders CTA */}
            <button onClick={() => goTo('/NBC')} aria-current={currentPath === "/NBC" ? "page" : undefined} className="nvc-pulse" style={{ display: "flex", alignItems: "center", gap: ".45rem", fontSize: ".74rem", fontWeight: 800, letterSpacing: ".05em", textTransform: "uppercase", color: "#fff", background: `linear-gradient(135deg,${T.gold},${T.goldD})`, padding: ".64rem 1rem", borderRadius: 999, cursor: "pointer", border: "none", transition: "all .2s", boxShadow: `0 10px 26px ${T.gold}30`, flexShrink: 0, whiteSpace: "nowrap" }}
              onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.12)"}
              onMouseLeave={e => e.currentTarget.style.filter = "none"}
            >
              <Star size={12} fill="currentColor" /> National Builders
            </button>

            {/* Join */}
            <button onClick={() => goTo('#join')} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", minWidth: 88, padding: ".64rem 1rem", borderRadius: 999, background: T.green, color: "#fff", fontWeight: 700, fontSize: ".78rem", letterSpacing: ".02em", transition: "filter .2s ease-out", boxShadow: `0 10px 24px ${T.green}26`, flexShrink: 0, whiteSpace: "nowrap", border: "none" }}
              onMouseEnter={e => e.currentTarget.style.filter = "brightness(.88)"}
              onMouseLeave={e => e.currentTarget.style.filter = "none"}
            >Join</button>
            </div>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setMob(!mob)}
            aria-expanded={mob}
            aria-controls="mobile-nav"
            aria-label={mob ? "Close menu" : "Open menu"}
            style={{ display: "none", color: linkC, cursor: "pointer", padding: 4, background: "none", border: "none" }}
            className="mob-menu"
          >
            {mob ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            style={{ position: "fixed", inset: 0, zIndex: 1000, background: dark ? "rgba(5,12,8,.98)" : "rgba(250,250,245,.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", padding: "1.5rem" }}
          >
            {/* Mobile Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <img src="/logo.svg" alt="logo" fetchPriority="high" style={{ width: 32, height: 32 }} />
                <span style={{ fontFamily: "Cinzel, serif", fontWeight: 900, fontSize: "1rem", color: dark ? T.goldL : T.green }}>KIN</span>
              </div>
              <button onClick={() => { setMob(false); setMobSection(null); }} style={{ width: 40, height: 40, borderRadius: "50%", background: dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.05)", border: "none", display: "grid", placeItems: "center", color: dark ? T.cream : T.greenD }}>
                <X size={20} />
              </button>
            </div>

            {/* Mobile Links Scrollable area */}
            <div className="ds" style={{ flex: 1, overflowY: "auto", paddingRight: "0.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                
                {Object.entries(DROPDOWNS).map(([key, items]) => {
                  const isExp = mobSection === key;
                  return (
                    <div key={key} style={{ background: isExp ? (dark ? "rgba(255,255,255,.03)" : "rgba(22,97,62,.03)") : "transparent", borderRadius: 16, overflow: "hidden", transition: "all .3s" }}>
                      <button 
                        onClick={() => setMobSection(isExp ? null : key)}
                        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1rem", border: "none", background: "none", textAlign: "left", cursor: "pointer" }}
                      >
                        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 900, color: isExp ? T.goldL : (dark ? T.cream : T.greenD) }}>{key}</span>
                        <ChevronDown size={22} style={{ color: isExp ? T.goldL : (dark ? T.d3 : T.p3), transition: "transform .3s", transform: isExp ? "rotate(180deg)" : "none" }} />
                      </button>
                      
                      <AnimatePresence>
                        {isExp && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div style={{ padding: "0 1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                              {items.map(item => (
                                <button 
                                  key={item.label} 
                                  onClick={() => {
                                    if(item.action) { item.action(); setMob(false); setMobSection(null); }
                                    else if(item.href) { setMob(false); setMobSection(null); window.location.hash = item.href; }
                                  }}
                                  style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem", borderRadius: 12, background: dark ? "rgba(255,255,255,0.04)" : "rgba(22,97,62,0.04)", border: "none", textAlign: "left", width: "100%" }}
                                >
                                  <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
                                  <div>
                                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: dark ? T.cream : T.greenD }}>{item.label}</div>
                                    <div style={{ fontSize: "0.75rem", color: dark ? T.d3 : T.p2 }}>{item.desc}</div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                {/* Prominent Actions */}
                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: `1px dashed ${dark ? "rgba(255,255,255,.1)" : "rgba(22,97,62,.1)"}`, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <button 
                    onClick={() => { goTo("/NBC"); }}
                    style={{ background: `linear-gradient(135deg,${T.gold},${T.goldD})`, padding: "1.1rem", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", color: "#fff", fontWeight: 800, fontSize: "1.1rem", border: "none", boxShadow: `0 8px 24px ${T.gold}33` }}
                  >
                    <Star size={20} fill="currentColor" /> National Builders
                  </button>
                  
                  <button 
                    onClick={() => { onGive(); setMob(false); }}
                    style={{ background: T.green, padding: "1.1rem", borderRadius: 16, textAlign: "center", color: "#fff", fontWeight: 700, fontSize: "1.1rem", border: "none", boxShadow: `0 8px 24px ${T.green}22` }}
                  >
                    Give Support
                  </button>
                </div>

              </div>
            </div>
            
            {/* Mobile Footer */}
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <div style={{ fontSize: "0.65rem", color: dark ? T.d3 : T.p3, letterSpacing: "0.05em", textTransform: "uppercase" }}>Raising goDs (geniuses) · building Nations</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ onDash }) {
  return (
    <section style={{ minHeight: "100svh", background: T.greenD, position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: "5rem" }}>
      {/* Ambient bg */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(ellipse 80% 65% at 12% 50%,${T.green}60 0%,transparent 58%),radial-gradient(ellipse 55% 75% at 88% 10%,${T.gold}22 0%,transparent 52%),linear-gradient(140deg,#060E08 0%,#0D3D26 55%,#16613E 100%)` }} />
      {/* Ghost goDs watermark */}
      <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.5 }} aria-hidden style={{ position: "absolute", right: "-0.08em", top: "50%", fontSize: "clamp(14rem,40vw,58rem)", lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(196,136,44,.06)", userSelect: "none", pointerEvents: "none", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900, animation: "floatStar 9s ease-in-out infinite" }}>
        goDs (geniuses)
      </motion.div>

      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2, width: "100%" }}>
        <motion.div initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.12 } } }} style={{ maxWidth: "56rem" }}>
          {/* Eyebrow */}
          <motion.div variants={{ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }} style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", fontSize: "0.76rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: T.goldL, marginBottom: "1.75rem" }}>
            <span style={{ width: "2rem", height: "1.5px", background: T.gold, display: "block" }} />
            KidsInspiring Nation · character, spirit, skills and service
          </motion.div>
          {/* Main headline */}
          <motion.h1 variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,8vw,5.8rem)", fontWeight: 900, color: T.cream, letterSpacing: "-0.03em", lineHeight: .96, marginBottom: "1.5rem" }}>
            Raising <em style={{ fontStyle: "italic", color: T.goldL }}>goDs (geniuses)</em><br />
            <span style={{ fontWeight: 700, fontSize: "0.72em", color: "rgba(253,247,236,.85)" }}>Geniuses with divine purpose —</span><br />
            building <em style={{ fontStyle: "italic", color: T.goldL }}>Nations</em>
          </motion.h1>
          <motion.p variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} style={{ fontSize: "clamp(1rem,2.4vw,1.2rem)", color: "rgba(253,247,236,.72)", lineHeight: 1.68, marginBottom: "2rem", maxWidth: "48ch" }}>
            As at 2025, <strong style={{ color: T.goldL, fontWeight: 600 }}>639 goDs (geniuses)</strong> generated <strong style={{ color: T.goldL, fontWeight: 600 }}>19,695 attendance entries</strong> across 14 programmes — 365 events, every single day of the year.
          </motion.p>
          {/* CTAs */}
          <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="hero-btns" style={{ display: "flex", gap: ".75rem", alignItems: "center", flexWrap: "wrap" }}>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} href="#join" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 2.4em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              🔥 Join a Programme
            </motion.a>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} onClick={onDash} className="ghost-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 2.4em", borderRadius: 999, background: "rgba(253,247,236,.07)", color: T.cream, fontWeight: 500, fontSize: "1rem", border: "1.5px solid rgba(253,247,236,.2)", cursor: "pointer" }}>
              <Activity size={16} strokeWidth={1.5} /> Impact (as at 2025)
            </motion.button>
          </motion.div>
          {/* Schedule strip */}
          <motion.div variants={{ initial: { opacity: 0 }, animate: { opacity: 1 } }} transition={{ delay: 0.8 }} style={{ display: "flex", gap: "1.5rem", marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(196,136,44,.18)", flexWrap: "wrap" }}>
            {[
              { icon: "📖", time: "8pm WAT", label: "KIND · Daily", color: T.kindC },
              { icon: "✨", time: "Sun 11am", label: "gDX · Weekly", color: T.gdxC },
              { icon: "👑", time: "Sun 5pm", label: "KINGs · Weekly", color: T.kingsC },
              { icon: "🧠", time: "Fri 5pm", label: "P119 · Weekly", color: T.p119C },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(253,247,236,.08)", display: "grid", placeItems: "center", fontSize: ".9rem", flexShrink: 0 }}>{s.icon}</div>
                <div>
                  <div style={{ fontSize: ".8rem", fontWeight: 600, color: "rgba(253,247,236,.85)" }}>{s.label}</div>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", color: T.goldL, letterSpacing: "0.04em" }}>{s.time}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const words = ["KIND · Daily", "gDX · Sundays", "KINGs", "P119 Academy", "goDs University", "Daniel Fast", "FACE · Sundays", "TJC Concert", "goDs (geniuses)", "Nation Builders", "Spirit", "Skills", "Service", "Character"];
  return (
    <div style={{ background: T.gold, padding: ".7rem 0", overflow: "hidden" }} aria-hidden>
      <div style={{ display: "flex", gap: "2.5rem", animation: "marqueeL 30s linear infinite", width: "max-content" }}>
        {[...Array(2)].flatMap((_, ri) => words.map((w, i) => (
          <span key={`${ri}-${i}`} style={{ display: "flex", alignItems: "center", gap: "1.5rem", fontFamily: "'Playfair Display',serif", fontSize: "1.05rem", fontStyle: "italic", color: "#fff", fontWeight: 700, whiteSpace: "nowrap" }}>
            {w}<span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,.4)", display: "block" }} />
          </span>
        )))}
      </div>
    </div>
  );
}

// ─── KIND DAILY CTA STRIP ─────────────────────────────────────────────────────
function KINDStrip({ dark }) {
  return (
    <div style={{ background: dark ? "#0D2A1A" : T.green, borderBottom: `1px solid rgba(196,136,44,.2)` }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "1rem clamp(1.25rem,5vw,3rem)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: T.goldL, animation: "pulse 1.5s ease-in-out infinite", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".9rem", fontWeight: 600, color: T.cream }}>
            📖 KIND is live — every day at 8pm WAT
          </span>
          <span style={{ fontSize: ".82rem", color: "rgba(253,247,236,.65)", display: "none" }}>·</span>
          <span style={{ fontSize: ".82rem", color: "rgba(253,247,236,.65)" }}>KidsInspiring Nation Devotional · Character Flagship</span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <a href={SITE.socials.whatsappChannel} target="_blank" rel="noopener noreferrer" aria-label="Open the official WhatsApp channel in a new tab" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".5em 1.2em", borderRadius: 999, background: "rgba(37,211,102,.15)", color: "#25D366", fontWeight: 600, fontSize: ".78rem", border: "1px solid rgba(37,211,102,.3)", transition: "background .2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(37,211,102,.25)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(37,211,102,.15)"}>
            <MessageCircle size={13} strokeWidth={2} /> WhatsApp Channel
          </a>
          <a href={SITE.socials.telegram} target="_blank" rel="noopener noreferrer" aria-label="Open Telegram in a new tab" style={{ display: "inline-flex", alignItems: "center", gap: ".4rem", padding: ".5em 1.2em", borderRadius: 999, background: "rgba(0,136,204,.15)", color: "#0088CC", fontWeight: 600, fontSize: ".78rem", border: "1px solid rgba(0,136,204,.3)", transition: "background .2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(0,136,204,.25)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(0,136,204,.15)"}>
            <Send size={13} strokeWidth={2} /> Telegram
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function AboutSection({ dark }) {
  const bg = dark ? "#0D2A1A" : T.cream, card = dark ? "#112D1C" : "#fff", txt = dark ? T.d2 : T.p2;
  return (
    <section id="about" style={{ background: bg, padding: "clamp(4rem,10vw,8rem) 0" }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,24rem),1fr))", gap: "clamp(2rem,6vw,4rem)", alignItems: "center" }}>
          <div>
            <div className="reveal" style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.gold, marginBottom: "1rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
              Who We Are<span style={{ display: "block", width: "3rem", height: "1.5px", background: T.gold, flex: 1, maxWidth: "3rem" }} />
            </div>
            <h2 className="reveal d1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.08, color: dark ? T.cream : T.greenD, marginBottom: "1.25rem" }}>
              A Movement,<br />Not Just an Organisation
            </h2>
            <p className="reveal d2" style={{ fontSize: "clamp(.95rem,2vw,1.1rem)", color: dark ? "rgba(253,247,236,.75)" : T.greenM, lineHeight: 1.78, marginBottom: "1rem", maxWidth: "58ch" }}>
              KidsInspiring Nation exists to raise <strong><GoDs style={{ color: T.gold }} /></strong> — Geniuses with divine purpose — to build Nations.
            </p>
            <p className="reveal d2" style={{ fontSize: "1rem", color: txt, lineHeight: 1.72, maxWidth: "58ch", marginBottom: "1.75rem" }}>
              We are a Nigerian NGO running 14 concurrent programmes.
            </p>
            <div className="reveal d2" style={{ display: "flex", gap: ".9rem", flexWrap: "wrap", marginTop: "-1rem", marginBottom: "1.75rem" }}>
              <Link to="/kids-inspiring" style={{ fontSize: ".82rem", fontWeight: 800, color: "rgba(253,247,236,.78)", textDecoration: "none", borderBottom: "1px solid rgba(232,185,84,.35)" }}>
                Kids Inspiring →
              </Link>
              <Link to="/investing-in-kids" style={{ fontSize: ".82rem", fontWeight: 800, color: "rgba(253,247,236,.78)", textDecoration: "none", borderBottom: "1px solid rgba(232,185,84,.35)" }}>
                Investing in Kids →
              </Link>
            </div>
            {/* Quick stats */}
            <div className="reveal d3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: ".75rem", marginBottom: "1.75rem" }}>
              {[{ n: "639", l: "goDs (geniuses) reached" }, { n: "19,695", l: "Entries (as at 2025)" }, { n: "365", l: "Events held" }].map(s => (
                <div key={s.l} style={{ background: card, borderRadius: 14, padding: ".9rem .75rem", border: `1px solid rgba(22,97,62,.1)`, textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.7rem", fontWeight: 900, color: T.green, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: ".72rem", color: txt, fontWeight: 500, marginTop: ".2rem" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div className="reveal d3" style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <a href="#join" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".8em 2em", borderRadius: 999, background: T.green, color: T.cream, fontWeight: 700, fontSize: ".9rem", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
                Become a goD (genius) →
              </a>
              <a href={SITE.socials.linktree} target="_blank" rel="noopener noreferrer" aria-label="Open all KidsInspiring Nation links in a new tab" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".8em 1.6em", borderRadius: 999, border: `1.5px solid ${T.gold}`, color: T.gold, fontWeight: 500, fontSize: ".9rem", background: "transparent", transition: "background .2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(196,136,44,.08)"} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <ExternalLink size={14} strokeWidth={1.5} /> All Links
              </a>
            </div>
          </div>
          {/* Visual card */}
          <div className="reveal d2">
            <div style={{ background: T.gold, color: "#fff", borderRadius: 16, padding: "1.25rem 1.75rem", marginBottom: "1.25rem", fontFamily: "'Playfair Display',serif", fontSize: "1.35rem", fontStyle: "italic", fontWeight: 700, lineHeight: 1.3, boxShadow: "0 8px 32px rgba(196,136,44,.3)" }}>
              "Every child is a goD (genius) — a Genius Ordained by Destiny."
            </div>
            <div style={{ background: T.green, borderRadius: 24, position: "relative", overflow: "hidden", padding: "2rem", minHeight: "22rem", display: "flex", alignItems: "flex-end" }}>
              <img src="/photos/Nation_Builders_Program.jpg" alt="Nation Builders" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5, mixBlendMode: "overlay" }} />
              <div aria-hidden style={{ position: "absolute", top: "-.1em", right: "-.05em", fontSize: "clamp(10rem,30vw,22rem)", color: "transparent", WebkitTextStroke: "1px rgba(232,185,84,.07)", lineHeight: 1, pointerEvents: "none", userSelect: "none", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900 }}>goD</div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(13,61,38,.9) 0%,transparent 60%)" }} />
              <div style={{ position: "relative", zIndex: 2 }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,7vw,4.2rem)", fontWeight: 900, color: T.goldL, letterSpacing: "-0.04em", lineHeight: 1 }}>19,695</div>
                <div style={{ color: "rgba(253,247,236,.8)", fontSize: ".85rem", fontWeight: 500, letterSpacing: ".04em", marginTop: ".25rem" }}>Attendance entries · as at 2025</div>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  {[{ v: "639", l: "goDs (geniuses)" }, { v: "14", l: "Programmes" }, { v: "365", l: "Events" }, { v: "1,952", l: "Meals served in 2025" }].map(s => (
                    <div key={s.l}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 900, color: T.goldL, lineHeight: 1 }}>{s.v}</div>
                      <div style={{ fontSize: ".68rem", color: "rgba(253,247,236,.5)", fontWeight: 500, letterSpacing: ".04em" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROGRAMS ─────────────────────────────────────────────────────────────────
function ProgramsSection({ dark }) {
  const [active, setActive] = useState(null);
  const bg = dark ? "#050505" : "#FAFAF5", card = dark ? "#0E0E0F" : "#fff", txt = dark ? T.d2 : T.p2;
  return (
    <section id="programs" style={{ background: bg, padding: "clamp(4rem,10vw,8rem) 0" }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        <div className="reveal" style={{ marginBottom: "clamp(2rem,5vw,3rem)" }}>
          <div style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.gold, marginBottom: ".75rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
            14 Active Programmes<span style={{ display: "block", width: "3rem", height: "1.5px", background: T.gold }} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.08, color: dark ? T.cream : T.greenD, maxWidth: "22ch" }}>
            Built for <GoDs style={{ color: T.gold }} />, Proven by the Data
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,18rem),1fr))", gap: "1.2rem" }}>
          {PROGRAMS.map((p, i) => {
            const isOpen = active === p.code;
            const heroValue = p.displayValue ?? (p.meals ? `${p.meals.toLocaleString()}+` : p.entries?.toLocaleString() || "—");
            const heroLabel = p.displayLabel ?? (p.meals ? "meals served" : "entries (as at 2025)");
            const footerStats = p.footerStats ?? [{ l: "Sessions", v: p.sessions }, { l: "Unique", v: p.unique || (p.meals ? "—" : "—") }];
            return (
              <article key={p.code} className="chover"
                style={{ background: card, borderRadius: 22, overflow: "hidden", border: `1px solid ${dark ? "rgba(255,255,255,.06)" : "rgba(22,97,62,.09)"}`, boxShadow: dark ? "0 2px 12px rgba(0,0,0,.4)" : "0 2px 8px rgba(10,28,18,.05)", display: "flex", flexDirection: "column", cursor: "pointer" }}
                onClick={() => setActive(isOpen ? null : p.code)}>
                {/* Header */}
                <div style={{ height: "9.5rem", background: p.bg, display: "flex", alignItems: "flex-end", padding: "1.25rem 1.5rem", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
                  {p.photo && (
                    <img src={p.photo} alt={p.name} loading="lazy" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "luminosity", opacity: 0.4, zIndex: 0 }} />
                  )}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)", zIndex: 1 }} />
                  <div style={{ position: "relative", zIndex: 2, display: "flex", justifyContent: "space-between", width: "100%", alignItems: "flex-end" }}>
                    <span style={{ fontSize: "2.8rem", lineHeight: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>{p.icon}</span>
                    <div style={{ textAlign: "right", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
                      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 900, color: "rgba(255,255,255,.95)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                        {heroValue}
                      </div>
                      <div style={{ fontSize: ".65rem", color: "rgba(255,255,255,.8)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em", marginTop: ".25rem" }}>
                        {heroLabel}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Body */}
                <div style={{ padding: "1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: ".5rem", marginBottom: ".5rem" }}>
                    <div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: p.fill, fontWeight: 600, marginBottom: ".2rem" }}>{p.code}</div>
                      <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-0.02em", color: dark ? T.cream : T.greenD, lineHeight: 1.1 }}>{p.name}</h3>
                    </div>
                    <span className="kinbadge" style={{ background: `${p.fill}18`, color: p.fill, marginTop: 2 }}>{p.pillar}</span>
                  </div>
                  <div style={{ fontSize: ".76rem", fontFamily: "'DM Mono',monospace", color: p.fill, fontWeight: 500, marginBottom: ".75rem", letterSpacing: ".03em" }}>{p.schedule}</div>
                  <p style={{ fontSize: ".88rem", color: txt, lineHeight: 1.65, flex: 1 }}>{p.desc}</p>

                  {/* Expanded sub-data */}
                  {isOpen && p.sub && (
                    <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: ".4rem" }}>
                      {p.sub.map(s => (
                        <div key={s.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".5rem .75rem", borderRadius: 8, background: `${p.fill}12` }}>
                          <span style={{ fontSize: ".8rem", fontWeight: 500, color: dark ? T.cream : T.greenD }}>{s.label}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".8rem", color: p.fill, fontWeight: 600 }}>{s.entries}</span>
                            {s.prev && <span style={{ fontSize: ".7rem", color: T.ok, fontFamily: "'DM Mono',monospace" }}>+{Math.round((s.entries - s.prev) / s.prev * 100)}%</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "1rem", paddingTop: ".75rem", borderTop: `1px solid ${dark ? "rgba(255,255,255,.06)" : "rgba(22,97,62,.1)"}` }}>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      {footerStats.map(m => (
                        <div key={m.l}>
                          <div style={{ fontSize: ".64rem", textTransform: "uppercase", letterSpacing: ".05em", color: T.p3 }}>{m.l}</div>
                          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".88rem", fontWeight: 600, color: dark ? T.cream : T.greenD }}>{m.v}</div>
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize: ".76rem", fontWeight: 600, color: p.fill }}>{p.sub ? (isOpen ? "▲" : "▼ Details") : "→"}</span>
                  </div>
                </div>
                {/* KIND CTA badge */}
                {p.cta && (
                  <div style={{ background: `linear-gradient(90deg,${T.green},${T.greenD})`, padding: ".6rem 1.4rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.goldL, animation: "pulse 1.5s ease-in-out infinite" }} />
                      <span style={{ fontSize: ".76rem", fontWeight: 600, color: T.cream }}>Join tonight · 8pm WAT</span>
                    </div>
                    <a href={SITE.socials.whatsappChannel} target="_blank" rel="noopener noreferrer" aria-label="Open WhatsApp channel in a new tab" style={{ fontSize: ".7rem", fontWeight: 600, color: T.goldL, display: "flex", alignItems: "center", gap: ".3rem" }}>
                      <MessageCircle size={11} strokeWidth={2} /> WhatsApp
                    </a>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── VIDEO ────────────────────────────────────────────────────────────────────
function VideoSection({ dark }) {
  const bg = dark ? "#0A1C12" : T.cream;
  return (
    <section style={{ background: bg, padding: "clamp(3.5rem,8vw,7rem) 0" }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "clamp(2rem,4vw,3rem)" }}>
          <div style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.gold, marginBottom: ".75rem" }}>See Us In Action</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: dark ? T.cream : T.greenD }}>
            Watch KidsInspiring Nation
          </h2>
          <p style={{ fontSize: "1rem", color: dark ? "rgba(253,247,236,.6)" : T.greenM, marginTop: ".5rem", maxWidth: "40ch", margin: ".5rem auto 0" }}>
            A glimpse into life as a goD (genius) — our programmes, our people, our purpose.
          </p>
        </div>
        <div className="reveal d1" style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ borderRadius: 20, overflow: "hidden", boxShadow: dark ? "0 16px 64px rgba(0,0,0,.6)" : "0 16px 64px rgba(10,28,18,.2)", aspectRatio: "16/9", position: "relative", background: "#000" }}>
            <iframe
              src="https://www.youtube.com/embed/E5b-H_IQPyI?rel=0&modestbranding=1"
              title="KidsInspiring Nation — Our Programmes"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "1.25rem" }}>
            <a href={SITE.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="Open YouTube in a new tab" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".6em 1.6em", borderRadius: 999, background: "rgba(255,0,0,.1)", color: "#FF0000", fontWeight: 600, fontSize: ".82rem", border: "1px solid rgba(255,0,0,.2)", transition: "background .2s" }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,0,0,.18)"} onMouseLeave={e => e.currentTarget.style.background = "rgba(255,0,0,.1)"}>
              <Youtube size={15} strokeWidth={1.5} /> @KidsInspiringNation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── IMPACT ───────────────────────────────────────────────────────────────────
function ImpactSection({ onDash }) {
  return (
    <section id="impact" style={{ background: T.greenD, padding: "clamp(4rem,10vw,8rem) 0", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "'Playfair Display',serif", fontSize: "clamp(10rem,35vw,48rem)", fontWeight: 900, fontStyle: "italic", lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(196,136,44,.04)", userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap", letterSpacing: "-0.06em" }}>KIN</div>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
        <div className="reveal" style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.gold, textAlign: "center", marginBottom: ".75rem" }}>Impact (as at 2025)</div>
        <h2 className="reveal d1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.08, color: T.cream, textAlign: "center", maxWidth: "20ch", margin: "0 auto clamp(2.5rem,5vw,4rem)" }}>
          The Numbers Speak for the Nation
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,11rem),1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {[
            { n: "19,695", l: "Total\nAttendance Entries", d: "d1" }, { n: "639", l: "Unique\ngoDs", d: "d2" },
            { n: "365", l: "Events Held\n(as at 2025)", d: "d3" }, { n: "14", l: "Active\nProgrammes", d: "d4" },
            { n: "13,350", l: "KIND Entries\n(Flagship)", d: "d1" }, { n: "301", l: "Peak Day\nJan 25", d: "d2" },
            { n: "+58%", l: "KIND Growth\nQ1 YoY", d: "d3" }, { n: "+200%", l: "DF3 Growth\nvs 2024", d: "d4" },
            { n: "1,952", l: "Meals Served\nby FACE", d: "d1" }, { n: "9", l: "Daniel Fast\nSessions", d: "d2" },
          ].map(s => (
            <div key={s.l} className={`reveal ${s.d}`} style={{ textAlign: "center", padding: "1.25rem .75rem", borderRadius: 18, background: "rgba(253,247,236,.04)", border: "1px solid rgba(196,136,44,.1)", transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(253,247,236,.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(253,247,236,.04)"}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4.5vw,3rem)", fontWeight: 900, color: T.goldL, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: ".35rem" }}>{s.n}</div>
              <div style={{ fontSize: ".72rem", color: "rgba(253,247,236,.5)", fontWeight: 500, lineHeight: 1.4 }}>{s.l.split("\n").map((ln, i) => <span key={i} style={{ display: "block" }}>{ln}</span>)}</div>
            </div>
          ))}
        </div>
        <div className="reveal" style={{ textAlign: "center" }}>
          <button onClick={onDash} style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", padding: ".85em 2.25em", borderRadius: 999, background: "rgba(196,136,44,.14)", color: T.goldL, fontWeight: 500, fontSize: ".9rem", border: "1px solid rgba(196,136,44,.3)", cursor: "pointer", transition: "background .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(196,136,44,.24)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(196,136,44,.14)"}>
            <LayoutDashboard size={15} strokeWidth={1.5} /> Explore Full Dashboard →
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── FACE ─────────────────────────────────────────────────────────────────────
function FACESection({ dark }) {
  const bg = dark ? "#0D2A1A" : T.warmBg;
  return (
    <section style={{ background: bg, padding: "clamp(4rem,10vw,8rem) 0" }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,24rem),1fr))", gap: "clamp(2rem,5vw,4rem)", alignItems: "center" }}>
          <div>
            <div className="reveal" style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.coral, marginBottom: ".75rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
              FACE — Feed A Community Every week<span style={{ display: "block", width: "2rem", height: "1.5px", background: T.coral }} />
            </div>
            <h2 className="reveal d1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.08, color: dark ? T.cream : T.greenD, marginBottom: "1.25rem", maxWidth: "16ch" }}>
              Feeding Communities,<br />Every Sunday
            </h2>
            <p className="reveal d2" style={{ fontSize: "clamp(.95rem,2vw,1.1rem)", color: dark ? "rgba(253,247,236,.72)" : T.greenM, lineHeight: 1.78, marginBottom: "1rem", maxWidth: "55ch" }}>
              Every Sunday at 3pm, KidsInspiring Nation shows up to feed every child in the community. This is not a charity event — it is an act of love, a declaration that raising <GoDs style={{ color: T.coral }} /> includes meeting their most practical needs.
            </p>
            <div className="reveal d3" style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
              {[{ n: "1,952", l: "Meals (as at 2025)" }, { n: "52", l: "Sundays served" }, { n: "3pm", l: "Every Sunday" }].map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 900, color: T.coral, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontSize: ".72rem", color: dark ? T.d2 : T.p2, fontWeight: 500, marginTop: ".2rem" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal d2" style={{ background: `linear-gradient(135deg,${T.coral},#8B2500)`, borderRadius: 24, padding: "2.5rem", position: "relative", overflow: "hidden", minHeight: "22rem", display: "flex", flexDirection: "column", justifyContent: "flex-end", boxShadow: "0 16px 48px rgba(217,79,48,.35)" }}>
            <div aria-hidden style={{ position: "absolute", top: "-.1em", right: "-.05em", fontSize: "8rem", lineHeight: 1, pointerEvents: "none", userSelect: "none", opacity: .12 }}>🍽️</div>
            <div style={{ fontSize: ".76rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: ".5rem" }}>FACE · Feed A Community Every week</div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem,6vw,3.5rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: ".5rem" }}>1,952</div>
            <div style={{ color: "rgba(255,255,255,.8)", fontSize: ".9rem" }}>meals served across 52 Sundays (as at 2025)</div>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── PHOTO HIGHLIGHTS STRIP ───────────────────────────────────────────────────
function PhotoHighlightsStrip({ dark }) {
  const images = [
    "/photos/Nation_Builders_Program1.jpg",
    "/photos/Daniel_Fast.jpg",
    "/photos/P119_Academy.jpg",
    "/photos/Spirit_Filled_Parents.jpg",
    "/photos/Community_impact.jpg",
    "/photos/FACE_Feed_A_Community_EveryWeek.jpg",
  ];
  return (
    <section aria-label="Photo highlights" style={{ background: dark ? "#050505" : "#FAFAF5", padding: "1rem 0 3rem", overflowX: "hidden" }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", display: "flex", alignItems: "center", gap: "1rem", overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: "1.5rem" }} className="hide-scroll">
        {images.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" style={{ height: "240px", width: "auto", borderRadius: "16px", objectFit: "cover", flexShrink: 0, scrollSnapAlign: "center", boxShadow: dark ? "0 4px 16px rgba(0,0,0,.4)" : "0 4px 16px rgba(10,28,18,.08)", border: `1px solid ${dark ? "rgba(255,255,255,.05)" : "rgba(22,97,62,.08)"}` }} />
        ))}
      </div>
    </section>
  );
}

// ─── TESTIMONY ────────────────────────────────────────────────────────────────
function TestimonySection({ dark }) {
  const bg = dark ? "#050505" : "#FAFAF5", card = dark ? "#0E0E0F" : "#fff";
  // Real testimony from Testimony.html (Kossy Okunno, Oct 2024)
  return (
    <section style={{ background: bg, padding: "clamp(4rem,10vw,8rem) 0" }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        <div className="reveal" style={{ textAlign: "center", marginBottom: "clamp(2rem,5vw,3rem)" }}>
          <div style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.gold, marginBottom: ".75rem" }}>Voices of goDs (geniuses)</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: dark ? T.cream : T.greenD }}>What the goDs (geniuses) Are Saying</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,18rem),1fr))", gap: "1.2rem" }}>
          {[
            {
              q: "A special moment for me at KIN is when I became a goD — it was the best day of my life because I had accomplished the Psalm 119 challenge after 2 years.",
              name: "Kossy Okunno", role: "goD · P119 Academy", init: "KO", bg: T.green, real: true,
            },
            {
              q: "KIND changed how I start every day. 8pm is now sacred in our home. My children look forward to it — it's become the heartbeat of our family's evening.",
              name: "Parent of a goD", role: "KidsInspiring Nation Family", init: "P", bg: T.gold, real: false,
            },
            {
              q: "KINGs 002 is not just a mentorship group — it is family. The seniors pour into us every Sunday with such intentionality. I leave every session different.",
              name: "goD · KINGs 002", role: "Sunday Mentorship Cell", init: "K2", bg: T.kingsC, real: false,
            },
          ].map((q, i) => (
            <div key={i} className={`reveal ${["d1", "d2", "d3"][i]}`} style={{ background: card, borderRadius: 20, padding: "2rem", border: `1px solid ${dark ? "rgba(255,255,255,.06)" : "rgba(22,97,62,.09)"}`, boxShadow: dark ? "0 2px 12px rgba(0,0,0,.3)" : "0 2px 8px rgba(10,28,18,.05)", transition: "transform .2s,box-shadow .2s" }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = dark ? "0 12px 40px rgba(0,0,0,.4)" : "0 12px 40px rgba(10,28,18,.14)"; }} onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "4.5rem", lineHeight: .75, color: T.gold, opacity: .2, marginBottom: ".75rem", fontWeight: 900 }}>"</div>
              <p style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.25rem", fontStyle: "italic", color: dark ? T.cream : T.greenD, lineHeight: 1.5, marginBottom: "1.5rem" }}>{q.q}</p>
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                <div style={{ width: "2.6rem", height: "2.6rem", borderRadius: "50%", background: q.bg, display: "grid", placeItems: "center", fontFamily: "'Playfair Display',serif", fontSize: "1rem", fontWeight: 900, color: "#fff", flexShrink: 0 }}>{q.init}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: ".9rem", color: dark ? T.cream : T.greenD }}>{q.name}</div>
                  <div style={{ fontSize: ".76rem", color: dark ? T.d2 : T.p2 }}>{q.role}</div>
                </div>
                {q.real && <span className="kinbadge" style={{ marginLeft: "auto", background: "rgba(52,199,89,.1)", color: T.ok }}>✓ Real testimony</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="join" style={{ background: T.greenD, padding: "clamp(4rem,10vw,8rem) 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", bottom: "-.1em", left: "50%", transform: "translateX(-50%)", fontFamily: "'Playfair Display',serif", fontSize: "clamp(12rem,38vw,52rem)", fontWeight: 900, fontStyle: "italic", color: "transparent", WebkitTextStroke: "1px rgba(196,136,44,.04)", pointerEvents: "none", userSelect: "none", lineHeight: 1, whiteSpace: "nowrap" }}>goDs</div>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
        <div className="reveal" style={{ display: "inline-block", background: "rgba(196,136,44,.15)", border: "1px solid rgba(196,136,44,.3)", color: T.goldL, fontSize: ".76rem", letterSpacing: ".1em", textTransform: "uppercase", padding: ".4em 1.2em", borderRadius: 999, fontWeight: 500, marginBottom: "1.5rem" }}>
          Raise a goD (genius) · Build a Nation
        </div>
        <h2 className="reveal d1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.8rem,7vw,5.5rem)", fontWeight: 900, letterSpacing: "-0.04em", color: T.cream, maxWidth: "14ch", margin: "0 auto 1.25rem", lineHeight: .95 }}>
          Your Child Belongs <em style={{ fontStyle: "italic", color: T.goldL }}>Here</em>
        </h2>
        <p className="reveal d2" style={{ fontSize: "clamp(1rem,2.5vw,1.15rem)", color: "rgba(253,247,236,.7)", maxWidth: "46ch", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          As at 2025, 639 goDs (geniuses) showed up — day after day, programme after programme. The story is being written. Your child belongs in it.
        </p>
        {/* ACTION GRID */}
        <div className="reveal d3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: ".75rem", maxWidth: "700px", margin: "0 auto 2.5rem" }}>
          {[
            { label: "Join KIND Daily", sub: "8pm WAT · Every day", href: "https://whatsapp.com/channel/0029Va8XnCuGE56c4SMaT41w", icon: "📖", color: T.kindC },
            { label: "Register Your Child", sub: "All programmes", href: "/contact?subject=child", icon: "👑", color: T.kingsC },
            { label: "Give / Partner", sub: "Support a child", href: "/give", icon: "🙏", color: T.gold },
          ].map(a => (
            <a key={a.label} href={a.href} target={a.href.startsWith("http") ? "_blank" : undefined} rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "1.2rem 1rem", borderRadius: 16, background: "rgba(253,247,236,.05)", border: `1px solid rgba(253,247,236,.12)`, transition: "all .2s", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(253,247,236,.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,247,236,.05)"; e.currentTarget.style.transform = ""; }}>
              <span style={{ fontSize: "1.5rem", marginBottom: ".4rem" }}>{a.icon}</span>
              <span style={{ fontWeight: 600, fontSize: ".82rem", color: T.cream, marginBottom: ".2rem" }}>{a.label}</span>
              <span style={{ fontSize: ".7rem", color: "rgba(253,247,236,.5)" }}>{a.sub}</span>
            </a>
          ))}
        </div>
        <div className="reveal d4" style={{ display: "flex", flexWrap: "wrap", gap: ".75rem", justifyContent: "center" }}>
          <a href="/give" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 2.5em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "'Plus Jakarta Sans',sans-serif", textDecoration: "none" }}>
            💛 Give to KidsInspiring Nation
          </a>
          <a href={SITE.socials.linktree} target="_blank" rel="noopener noreferrer" aria-label="Open all KidsInspiring Nation links in a new tab" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 2em", borderRadius: 999, background: "rgba(253,247,236,.08)", color: T.cream, fontWeight: 500, fontSize: "1rem", border: "1.5px solid rgba(253,247,236,.2)" }}>
            <ExternalLink size={15} strokeWidth={1.5} /> All Our Links
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#060E08", padding: "clamp(2.5rem,6vw,5rem) 0 1.5rem" }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,12rem),1fr))", gap: "2rem 3rem", marginBottom: "3rem" }}>
          {/* Brand col */}
          <div style={{ gridColumn: "span 2", maxWidth: "26rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".75rem" }}>
              <div style={{ width: 34, height: 34, background: T.green, borderRadius: 8, display: "grid", placeItems: "center", color: T.goldL, fontSize: "1rem", fontWeight: 900, flexShrink: 0, fontFamily: "'Playfair Display',serif", fontStyle: "italic" }}>g</div>
              <div>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".88rem", fontWeight: 700, color: T.cream }}>KidsInspiring Nation</div>
                <div style={{ fontSize: ".65rem", color: "rgba(253,247,236,.35)", fontFamily: "'DM Mono',monospace", letterSpacing: ".04em" }}>Character · Spirit · Skills · Service</div>
              </div>
            </div>
            <p style={{ fontSize: ".8rem", color: "rgba(253,247,236,.4)", lineHeight: 1.68, maxWidth: "32ch", marginBottom: "1rem" }}>
              Raising <GoDs style={{ color: T.gold }} /> — Geniuses building Nations — one day, one session, one child at a time.
            </p>
            {/* Social icons */}
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
                {[
                  { icon: <Youtube size={14} strokeWidth={1.5} />, href: SITE.socials.youtube, label: "YouTube" },
                  { icon: <Instagram size={14} strokeWidth={1.5} />, href: SITE.socials.instagram, label: "Instagram" },
                  { icon: <MessageCircle size={14} strokeWidth={1.5} />, href: SITE.socials.whatsappChannel, label: "WhatsApp" },
                  { icon: <Send size={14} strokeWidth={1.5} />, href: SITE.socials.telegram, label: "Telegram" },
                  { icon: <ExternalLink size={14} strokeWidth={1.5} />, href: SITE.socials.linktree, label: "Linktree" },
                ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${s.label} in a new tab`} title={s.label}
                  style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(253,247,236,.06)", border: "1px solid rgba(253,247,236,.08)", display: "grid", placeItems: "center", color: "rgba(253,247,236,.5)", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(253,247,236,.12)"; e.currentTarget.style.color = T.goldL; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(253,247,236,.06)"; e.currentTarget.style.color = "rgba(253,247,236,.5)"; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Programmes */}
          <div>
            <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: ".75rem" }}>Programmes</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
              {["KIND (Daily 8pm)", "gDX (Sun 11am)", "KINGs (Sun 5pm)", "P119 Academy (Fri 5pm)", "goDs University", "Daniel Fast", "FACE (Sun 3pm)", "TJC Concert", "CST"].map(l => (
                <li key={l}><a href="#programs" style={{ fontSize: ".8rem", color: "rgba(253,247,236,.45)", transition: "color .15s" }} onMouseEnter={e => e.target.style.color = T.goldL} onMouseLeave={e => e.target.style.color = "rgba(253,247,236,.45)"}>{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: ".75rem" }}>Get Involved</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
              {[
                { l: "Give / Partner", href: "/give" },
                { l: "Register Your Child", href: "/contact?subject=child" },
                { l: "Volunteer (CST)", href: "/contact?subject=volunteer" },
                { l: "WhatsApp Channel", href: "https://whatsapp.com/channel/0029Va8XnCuGE56c4SMaT41w" },
                { l: "Telegram", href: "https://t.me/KidsInspiring" },
                { l: "All Links (Linktree)", href: "https://linktr.ee/KidsInspiringNation" },
              ].map(l => (
                <li key={l.l}><a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ fontSize: ".8rem", color: "rgba(253,247,236,.45)", transition: "color .15s" }} onMouseEnter={e => e.target.style.color = T.goldL} onMouseLeave={e => e.target.style.color = "rgba(253,247,236,.45)"}>{l.l}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div style={{ fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: T.gold, marginBottom: ".75rem" }}>Legal</div>
            <ul style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
              {[
                { l: "Transparency", href: "/transparency" },
                { l: "FAQ", href: "/faq" },
                { l: "Contact", href: "/contact" },
                { l: "NGO Registration", href: "/about" },
              ].map(l => (
                <li key={l.l}><a href={l.href} style={{ fontSize: ".8rem", color: "rgba(253,247,236,.45)", transition: "color .15s" }} onMouseEnter={e => e.target.style.color = T.goldL} onMouseLeave={e => e.target.style.color = "rgba(253,247,236,.45)"}>{l.l}</a></li>
              ))}
            </ul>
            <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: 10, background: "rgba(253,247,236,.04)", border: "1px solid rgba(253,247,236,.07)" }}>
              <div style={{ fontSize: ".68rem", fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "rgba(253,247,236,.35)", marginBottom: ".4rem" }}>At a glance</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".76rem", color: "rgba(253,247,236,.55)" }}>14 programmes · 19,695 entries</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".76rem", color: T.goldL }}>639 goDs (geniuses) · 1,952 meals in 2025</div>
            </div>
          </div>
        </div>

        {/* Contact bar */}
        <div style={{ background: "rgba(253,247,236,.04)", borderRadius: 12, padding: "1rem 1.5rem", marginBottom: "1.5rem", display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "center", border: "1px solid rgba(253,247,236,.06)" }}>
          {[
            { icon: <Mail size={13} strokeWidth={1.5} />, label: "KidsinspiringNation@gmail.com", href: "mailto:KidsinspiringNation@gmail.com" },
            { icon: <Youtube size={13} strokeWidth={1.5} />, label: "@KidsInspiringNation", href: "https://youtube.com/@KidsInspiringNation" },
            { icon: <ExternalLink size={13} strokeWidth={1.5} />, label: "linktr.ee/KidsInspiringNation", href: "https://linktr.ee/KidsInspiringNation" },
          ].map(c => (
            <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              style={{ display: "flex", alignItems: "center", gap: ".4rem", fontSize: ".76rem", color: "rgba(253,247,236,.5)", transition: "color .15s" }}
              onMouseEnter={e => e.currentTarget.style.color = T.goldL}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(253,247,236,.5)"}>
              {c.icon}{c.label}
            </a>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: ".5rem" }}>
          <p style={{ fontSize: ".72rem", color: "rgba(253,247,236,.25)" }}>© 2025 KidsInspiring Nation · All rights reserved</p>
          <p style={{ fontSize: ".72rem", color: "rgba(253,247,236,.25)" }}>NDPR Compliant · 19,695 entries · 639 goDs (geniuses) · One mission 🇳🇬</p>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

function Dashboard({ onBack, dark, toggleDark }) {
  const [view, setView] = useState("Overview");
  const [sideOpen, setSide] = useState(true);
  const [hide, setHide] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  const s = dark
    ? { bg: T.bgD, surf: T.srfD, brd: T.brdD, p1: T.d1, p2: T.d2, p3: T.d3 }
    : { bg: T.bg, surf: T.surf, brd: T.brd, p1: T.p1, p2: T.p2, p3: T.p3 };
  const ctx = { ...s, dark, hide, ready };

  const NAV = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Programmes", icon: BookOpen },
    { label: "Participants", icon: Users },
    { label: "DF Growth", icon: Flame },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: s.bg, fontFamily: "'DM Sans',sans-serif", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: sideOpen ? 220 : 58, flexShrink: 0, transition: "width .2s ease-out", background: s.surf, borderRight: `1px solid ${s.brd}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 12px", borderBottom: `1px solid ${s.brd}`, display: "flex", alignItems: "center", gap: 9, minHeight: 58 }}>
          <div style={{ width: 30, height: 30, background: T.green, borderRadius: 7, display: "grid", placeItems: "center", color: T.goldL, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900, fontSize: ".95rem", flexShrink: 0 }}>g</div>
          {sideOpen && <div><div style={{ fontSize: 12, fontWeight: 700, color: s.p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>KIN Dashboard</div><div style={{ fontSize: 10, color: s.p3, fontFamily: "'DM Mono',monospace" }}>As at 2025</div></div>}
        </div>
        <nav style={{ padding: "10px 6px", flex: 1 }}>
          {NAV.map(({ label, icon: Ic }, i) => {
            const act = view === label;
            return (
              <button key={label} className="nb" onClick={() => setView(label)}
                style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "7px 9px", borderRadius: 7, marginBottom: 2, border: act ? `1px solid ${dark ? "rgba(22,97,62,.35)" : "rgba(22,97,62,.18)"}` : "1px solid transparent", background: act ? (dark ? "rgba(22,97,62,.2)" : "rgba(22,97,62,.09)") : "transparent", color: act ? T.green : s.p2, animation: ready ? `enter 250ms ${i * 40}ms ease-out both` : "none" }}
                onMouseEnter={e => { if (!act) e.currentTarget.style.background = dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)"; }}
                onMouseLeave={e => { if (!act) e.currentTarget.style.background = "transparent"; }}>
                <Ic size={15} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                {sideOpen && <span style={{ fontSize: 12, fontWeight: act ? 600 : 400, whiteSpace: "nowrap" }}>{label}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "10px 6px", borderTop: `1px solid ${s.brd}` }}>
          <button className="nb" onClick={onBack}
            style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "7px 9px", borderRadius: 7, color: s.p2, border: "1px solid transparent", background: "none" }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Home size={15} strokeWidth={1.5} />
            {sideOpen && <span style={{ fontSize: 12, whiteSpace: "nowrap" }}>Back to Site</span>}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <header style={{ height: 58, background: s.surf, borderBottom: `1px solid ${s.brd}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setSide(v => !v)} style={{ width: 30, height: 30, display: "grid", placeItems: "center", borderRadius: 7, color: s.p2, background: "none", cursor: "pointer", transition: "background .15s" }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Menu size={15} strokeWidth={1.5} />
            </button>
            <div>
              <h1 style={{ fontSize: 14, fontWeight: 700, color: s.p1, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.02em" }}>{view}</h1>
              <p style={{ fontSize: 10, color: s.p3, fontFamily: "'DM Mono',monospace" }}>KidsInspiring Nation · as at 2025 · 19,695 entries · 639 goDs</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            {[
              { icon: hide ? EyeOff : Eye, action: () => setHide(h => !h), title: "Privacy" },
              { icon: dark ? Sun : Moon, action: toggleDark, title: "Theme" },
            ].map(({ icon: Ic, action, title }) => (
              <button key={title} onClick={action} title={title}
                style={{ width: 30, height: 30, display: "grid", placeItems: "center", borderRadius: 7, color: s.p2, background: "none", cursor: "pointer", transition: "background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <Ic size={14} strokeWidth={1.5} />
              </button>
            ))}
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.green, display: "grid", placeItems: "center", color: T.goldL, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900, fontSize: ".85rem" }}>g</div>
          </div>
        </header>
        {/* Content */}
        <main className="ds" style={{ flex: 1, overflow: "auto", padding: 20 }}>
          {view === "Overview" && <OverviewView ctx={ctx} />}
          {view === "Programmes" && <ProgrammesView ctx={ctx} />}
          {view === "Participants" && <ParticipantsView ctx={ctx} />}
          {view === "DF Growth" && <DFView ctx={ctx} />}
        </main>
      </div>
    </div>
  );
}

// ── KPI CARD ──────────────────────────────────────────────────────────────────
function KPI({ label, value, deltaLabel, up = true, ctx, delay = 0, spark, raw }) {
  const num = useCountUp(value, 800, ctx.ready);
  const disp = raw || (num?.toLocaleString?.() || num);
  return (
    <div className="dhover" style={{ background: ctx.surf, borderRadius: 16, padding: 20, border: `1px solid ${ctx.brd}`, boxShadow: ctx.dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ctx.ready ? `enter 250ms ${delay}ms ease-out both` : "none" }}>
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: ".07em", textTransform: "uppercase", color: ctx.p3, marginBottom: 6, fontFamily: "'DM Sans',sans-serif" }}>{label}</div>
      <div style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.04em", color: ctx.p1, lineHeight: 1, fontVariantNumeric: "tabular-nums", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 6 }}>
        {ctx.hide ? "••••" : disp}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontFamily: "'DM Mono',monospace", color: up ? T.ok : T.err, fontWeight: 500 }}>
        {up ? <TrendingUp size={11} strokeWidth={2} /> : <TrendingDown size={11} strokeWidth={2} />}
        {ctx.hide ? "••%" : deltaLabel}
      </div>
      {spark && !ctx.hide && (
        <div style={{ marginTop: 9 }}>
          <ResponsiveContainer width="100%" height={32}>
            <AreaChart data={spark} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`sp${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.goldL} stopOpacity={.4} />
                  <stop offset="50%" stopColor={T.green} stopOpacity={.2} />
                  <stop offset="100%" stopColor={T.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="total" stroke={T.green} strokeWidth={1.5} fill={`url(#sp${label})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// ── OVERVIEW ──────────────────────────────────────────────────────────────────
function OverviewView({ ctx }) {
  const { surf, brd, p1, p2, p3, dark, ready } = ctx;
  const hero = useCountUp(19695, 1000, ready);
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      {/* Hero metric */}
      <div style={{ marginBottom: 16 }}>
        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: "26px 26px 20px", border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center", animation: ready ? "enter 250ms 0ms ease-out both" : "none" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: ".07em", textTransform: "uppercase", color: p3, marginBottom: 6 }}>Total Attendance Entries · as at 2025</div>
            <div style={{ fontSize: "clamp(42px,5vw,66px)", fontWeight: 300, letterSpacing: "-0.04em", color: p1, lineHeight: 1, fontVariantNumeric: "tabular-nums", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {ctx.hide ? "••,•••" : hero.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: T.ok, fontFamily: "'DM Mono',monospace", fontWeight: 500, marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <TrendingUp size={11} strokeWidth={2} /> 639 unique goDs · 365 events · 8 programmes
            </div>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={MONTHLY} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="hG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.gold} stopOpacity={.3} />
                  <stop offset="50%" stopColor={T.green} stopOpacity={.1} />
                  <stop offset="100%" stopColor={T.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 9, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Area type="monotone" dataKey="total" name="Entries" stroke={T.green} strokeWidth={2} fill="url(#hG)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,160px),1fr))", gap: 12, marginBottom: 16 }}>
        <KPI label="goDs (unique)" value={639} deltaLabel="All-time high" up ctx={ctx} delay={40} />
        <KPI label="Events held" value={365} deltaLabel="365 days of programmes" up ctx={ctx} delay={80} />
        <KPI label="KIND entries" raw="13,350" value={13350} deltaLabel="67.8% of all activity" up ctx={ctx} delay={120} spark={MONTHLY} />
        <KPI label="Meals (FACE)" raw="3,000+" value={3000} deltaLabel="52 Sundays served" up ctx={ctx} delay={160} />
      </div>

      {/* Charts */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 12 }}>
        {/* Monthly area */}
        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 200ms ease-out both" : "none" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: p1, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Monthly Attendance</div>
              <div style={{ fontSize: 11, color: p2, marginTop: 2 }}>All programmes combined · as at 2025</div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[{ c: T.green, l: "Entries" }, { c: T.gold, l: "Avg/session" }].map(s => (
                <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: p3 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.c }} />{s.l}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={195}>
            <AreaChart data={MONTHLY} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <defs>
                {[{ id: "mG1", c: T.green }, { id: "mG2", c: T.gold }].map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.c} stopOpacity={.15} /><stop offset="95%" stopColor={g.c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Area type="monotone" dataKey="total" name="Entries" stroke={T.green} strokeWidth={1.5} fill="url(#mG1)" dot={false} />
              <Area type="monotone" dataKey="avg" name="Avg/session" stroke={T.gold} strokeWidth={1.5} fill="url(#mG2)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pillar donut */}
        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 240ms ease-out both" : "none" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: p1, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>By Pillar</div>
          <div style={{ fontSize: 11, color: p2, marginBottom: 14 }}>Share of total entries</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={PILLAR_DATA} dataKey="entries" nameKey="name" cx="50%" cy="50%" innerRadius="52%" outerRadius="80%" paddingAngle={3}>
                {PILLAR_DATA.map((p, i) => <Cell key={i} fill={p.fill} />)}
              </Pie>
              <Tooltip content={<CustomTooltip dark={dark} />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {PILLAR_DATA.map(p => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.fill, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: p1, fontWeight: 500, flex: 1 }}>{p.name}</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: p2 }}>{ctx.hide ? "••%" : `${p.pct}%`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Programme bars + KIND growth */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 280ms ease-out both" : "none" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>Programme Mix</div>
          <div style={{ fontSize: 11, color: p2, marginBottom: 14 }}>Entries by programme · as at 2025</div>
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={PROGRAMS.filter(p => p.entries && p.entries > 30)} layout="vertical" margin={{ top: 0, right: 4, left: 0, bottom: 0 }} barSize={12}>
              <CartesianGrid horizontal={false} vertical stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} />
              <XAxis type="number" tick={{ fontSize: 9, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="code" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Bar dataKey="entries" name="Entries" radius={[0, 4, 4, 0]}>
                {PROGRAMS.filter(p => p.entries && p.entries > 30).map((p, i) => <Cell key={i} fill={p.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 320ms ease-out both" : "none" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>KIND · Q1 Growth</div>
          <div style={{ fontSize: 11, color: p2, marginBottom: 14 }}>Avg attendance per session · Q1 YoY</div>
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={[{ name: "Q1 2024", val: 83 }, { name: "Q1 2025", val: 131 }]} margin={{ top: 4, right: 4, left: -22, bottom: 0 }} barSize={52}>
              <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Bar dataKey="val" name="Avg/session" radius={[5, 5, 0, 0]}>
                <Cell fill={dark ? "rgba(22,97,62,.4)" : T.greenM} /><Cell fill={T.green} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 11, fontFamily: "'DM Mono',monospace", color: T.ok, fontWeight: 500 }}>+58% year-over-year growth</div>
        </div>
      </div>
    </div>
  );
}

// ── PROGRAMMES VIEW ───────────────────────────────────────────────────────────
function ProgrammesView({ ctx }) {
  const { surf, brd, p1, p2, p3, dark, ready, hide } = ctx;
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      {/* Table */}
      <div className="dhover" style={{ background: surf, borderRadius: 16, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", overflow: "hidden", marginBottom: 16, animation: ready ? "enter 250ms 0ms ease-out both" : "none" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${brd}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>All 8 Programmes · as at 2025</div>
            <div style={{ fontSize: 11, color: p2, marginTop: 2 }}>KidsInspiring Nation · NDPR Data Controller</div>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Code", "Programme", "Pillar", "Schedule", "Entries", "Sessions", "Unique", "Status"].map(h => (
                  <th key={h} style={{ padding: "9px 14px", textAlign: ["Entries", "Sessions", "Unique"].includes(h) ? "right" : "left", fontSize: 10, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: p3, borderBottom: `1px solid ${brd}`, whiteSpace: "nowrap", fontFamily: "'DM Sans',sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROGRAMS.map((p, i) => (
                <tr key={p.code} className={`trh ${dark ? "trh-dk" : ""}`} style={{ borderBottom: i < PROGRAMS.length - 1 ? `1px solid ${brd}` : "none" }}>
                  <td style={{ padding: "12px 14px" }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, color: p.fill }}>{p.code}</span></td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: p1, fontWeight: 500 }}>{p.name}</td>
                  <td style={{ padding: "12px 14px" }}><span className="kinbadge" style={{ background: `${p.fill}18`, color: p.fill }}>{p.pillar}</span></td>
                  <td style={{ padding: "12px 14px", fontSize: 11, color: p2, fontFamily: "'DM Mono',monospace", whiteSpace: "nowrap" }}>{p.schedule}</td>
                  <td style={{ padding: "12px 14px", textAlign: "right", fontFamily: "'DM Mono',monospace", fontSize: 12, color: p1, fontWeight: 500 }}>{hide ? "•••" : p.meals ? `${p.meals.toLocaleString()}+ meals` : (p.entries?.toLocaleString() || "—")}</td>
                  <td style={{ padding: "12px 14px", textAlign: "right", fontFamily: "'DM Mono',monospace", fontSize: 12, color: p2 }}>{p.sessions}</td>
                  <td style={{ padding: "12px 14px", textAlign: "right", fontFamily: "'DM Mono',monospace", fontSize: 12, color: p2 }}>{hide ? "••" : p.unique || "—"}</td>
                  <td style={{ padding: "12px 14px" }}><span className="kinbadge" style={{ background: "rgba(52,199,89,.1)", color: T.ok }}><CheckCircle2 size={9} strokeWidth={2.5} /> Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 12 }}>
        {PROGRAMS.map((p, i) => (
          <div key={p.code} className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? `enter 250ms ${i * 45 + 80}ms ease-out both` : "none" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "1.3rem" }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: p.fill, fontWeight: 700 }}>{p.code}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.name}</div>
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 300, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.04em" }}>
                {hide ? "•••" : p.meals ? `${p.meals.toLocaleString()}+` : (p.entries?.toLocaleString() || "—")}
              </div>
            </div>
            <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: p.fill, fontWeight: 500, marginBottom: 12, letterSpacing: ".02em" }}>{p.schedule}</div>
            {p.entries && <div style={{ height: 3, background: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)", borderRadius: 999, marginBottom: 12, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${p.pct || 1}%`, background: p.fill, borderRadius: 999 }} />
            </div>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {[{ l: "Sessions", v: p.sessions }, { l: "Unique", v: p.unique || "—" }, { l: "Share", v: p.pct ? `${p.pct}%` : "—" }].map(m => (
                <div key={m.l}>
                  <div style={{ fontSize: 9, color: p3, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 2 }}>{m.l}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: p1, fontFamily: "'DM Mono',monospace" }}>{hide && m.l !== "Sessions" ? "••" : m.v}</div>
                </div>
              ))}
            </div>
            {p.sub && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${brd}` }}>
                {p.sub.map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: p2, flex: 1 }}>{s.label}</span>
                    <div style={{ width: 50, height: 2, borderRadius: 999, background: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)", overflow: "hidden" }}>
                      <div style={{ height: "100%", background: p.fill, borderRadius: 999, width: `${Math.round((s.entries || 0) / (p.entries || 1) * 100)}%` }} />
                    </div>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: p1 }}>{hide ? "•••" : s.entries}</span>
                    {s.prev && <span style={{ fontSize: 9, color: T.ok, fontFamily: "'DM Mono',monospace" }}>+{Math.round((s.entries - s.prev) / s.prev * 100)}%</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PARTICIPANTS VIEW ─────────────────────────────────────────────────────────
function ParticipantsView({ ctx }) {
  const { surf, brd, p1, p2, p3, dark, ready, hide } = ctx;
  const maxGDX = TOP_gDX[0].sessions, maxKIND = TOP_KIND[0].score;
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* gDX leaderboard */}
        <div className="dhover" style={{ background: surf, borderRadius: 16, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", overflow: "hidden", animation: ready ? "enter 250ms 0ms ease-out both" : "none" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${brd}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>gDX Leaders · as at 2025</div>
              <div style={{ fontSize: 10, color: p2, marginTop: 2 }}>goDxperience attendance — Sunday 11am</div>
            </div>
            <span className="kinbadge" style={{ background: "rgba(232,185,84,.15)", color: T.goldL }}>gDX</span>
          </div>
          <div style={{ padding: "6px 0" }}>
            {TOP_gDX.map((g, i) => (
              <div key={g.name} className={`trh ${dark ? "trh-dk" : ""}`} style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 18px", borderBottom: i < TOP_gDX.length - 1 ? `1px solid ${brd}` : "none" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: i < 3 ? T.gold : "rgba(0,0,0,.06)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, color: i < 3 ? "#fff" : p3, flexShrink: 0, fontFamily: "'DM Mono',monospace" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: p1 }}>{hide ? "••• ••" : g.name}</div>
                  <div style={{ height: 2, marginTop: 4, borderRadius: 999, background: dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: T.gold, borderRadius: 999, width: `${Math.round(g.sessions / maxGDX * 100)}%` }} />
                  </div>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600, color: p1 }}>{hide ? "••" : g.sessions}</div>
                <div style={{ fontSize: 9, color: p3, width: 48, textAlign: "right" }}>sessions</div>
              </div>
            ))}
          </div>
        </div>

        {/* KIND leaderboard */}
        <div className="dhover" style={{ background: surf, borderRadius: 16, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", overflow: "hidden", animation: ready ? "enter 250ms 60ms ease-out both" : "none" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${brd}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>KIND Champions · as at 2025</div>
              <div style={{ fontSize: 10, color: p2, marginTop: 2 }}>Devotional attendance H1 score — Daily 8pm</div>
            </div>
            <span className="kinbadge" style={{ background: "rgba(22,97,62,.12)", color: T.kindC }}>KIND</span>
          </div>
          <div style={{ padding: "6px 0" }}>
            {TOP_KIND.map((k, i) => (
              <div key={k.name} className={`trh ${dark ? "trh-dk" : ""}`} style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 18px", borderBottom: i < TOP_KIND.length - 1 ? `1px solid ${brd}` : "none" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: i < 3 ? T.green : "rgba(0,0,0,.06)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, color: i < 3 ? T.goldL : p3, flexShrink: 0, fontFamily: "'DM Mono',monospace" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: p1 }}>{hide ? "••• ••" : k.name}</div>
                  <div style={{ height: 2, marginTop: 4, borderRadius: 999, background: dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: T.green, borderRadius: 999, width: `${Math.round(k.score / maxKIND * 100)}%` }} />
                  </div>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600, color: p1 }}>{hide ? "•••" : k.score}</div>
                <div style={{ fontSize: 9, color: p3, width: 44, textAlign: "right" }}>H1 score</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KINGs cohorts */}
      <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", marginTop: 14, animation: ready ? "enter 250ms 140ms ease-out both" : "none" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>KINGs goD Cells — Cohort Breakdown</div>
            <div style={{ fontSize: 11, color: p2, marginTop: 2 }}>Three cohorts · 43 sessions each · Sundays 5pm · as at 2025</div>
          </div>
          <span className="kinbadge" style={{ background: "rgba(123,45,139,.12)", color: T.kingsC }}>KINGs</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 18 }}>
          {KINGS_COHORTS.map(k => (
            <div key={k.label} style={{ background: dark ? "rgba(123,45,139,.1)" : "rgba(123,45,139,.05)", borderRadius: 12, padding: 14, border: "1px solid rgba(123,45,139,.15)" }}>
              <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: T.kingsC, fontWeight: 700, letterSpacing: ".06em", marginBottom: 8 }}>{k.label}</div>
              <div style={{ fontSize: 30, fontWeight: 300, letterSpacing: "-0.04em", color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1 }}>{hide ? "•••" : k.entries}</div>
              <div style={{ fontSize: 9, color: p3, marginTop: 3 }}>entries</div>
              <div style={{ marginTop: 10, display: "flex", gap: 14 }}>
                {[{ l: "Sessions", v: k.sessions }, { l: "Unique", v: hide ? "••" : k.unique }].map(m => (
                  <div key={m.l}><div style={{ fontSize: 9, color: p3 }}>{m.l}</div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: p1 }}>{m.v}</div></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={KINGS_COHORTS} margin={{ top: 4, right: 4, left: -22, bottom: 0 }} barSize={56}>
            <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip dark={dark} />} />
            <Bar dataKey="entries" name="Entries" fill={T.kingsC} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ── DF GROWTH VIEW ────────────────────────────────────────────────────────────
function DFView({ ctx }) {
  const { surf, brd, p1, p2, p3, dark, ready, hide } = ctx;
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      {/* 3 growth cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 14 }}>
        {DF_GROWTH.map((d, i) => (
          <div key={d.name} className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? `enter 250ms ${i * 60}ms ease-out both` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, color: T.dfC, letterSpacing: ".06em" }}>{d.name}</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, color: T.ok }}>{hide ? "••%" : `+${d.pct}%`}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[{ l: "2024", v: d.y2024, dim: true }, { l: "2025", v: d.y2026, dim: false }].map(y => (
                <div key={y.l} style={{ textAlign: "center", padding: "10px 6px", borderRadius: 10, background: y.dim ? (dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)") : (dark ? "rgba(196,136,44,.12)" : "rgba(196,136,44,.06)"), border: y.dim ? "none" : `1px solid rgba(196,136,44,.2)` }}>
                  <div style={{ fontSize: 9, color: p3, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>{y.l}</div>
                  <div style={{ fontSize: 26, fontWeight: 300, color: y.dim ? p2 : T.gold, letterSpacing: "-0.04em", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{hide ? "•••" : y.v}</div>
                  <div style={{ fontSize: 9, color: p3 }}>entries</div>
                </div>
              ))}
            </div>
            <div style={{ height: 3, borderRadius: 999, background: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)", overflow: "hidden" }}>
              <div style={{ height: "100%", background: T.dfC, borderRadius: 999, width: `${Math.round(d.y2026 / (d.y2026 + d.y2024) * 100)}%` }} />
            </div>
            <div style={{ fontSize: 9, color: p3, marginTop: 5, fontFamily: "'DM Mono',monospace" }}>2025 share of 2-year combined total</div>
          </div>
        ))}
      </div>

      {/* Grouped bar chart */}
      <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", marginBottom: 14, animation: ready ? "enter 250ms 200ms ease-out both" : "none" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>Daniel Fast · 2024 vs 2025</div>
        <div style={{ fontSize: 11, color: p2, marginBottom: 14 }}>Attendance entries per week · year-over-year comparison</div>
        <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
          {[{ c: dark ? "rgba(196,136,44,.35)" : T.greenM, l: "2024" }, { c: T.dfC, l: "2025" }].map(s => (
            <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: p3 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />{s.l}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={DF_GROWTH} margin={{ top: 4, right: 4, left: -22, bottom: 0 }} barGap={8} barSize={44}>
            <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip dark={dark} />} />
            <Bar dataKey="y2024" name="2024" fill={dark ? "rgba(196,136,44,.3)" : T.greenM} radius={[4, 4, 0, 0]} />
            <Bar dataKey="y2026" name="2025" fill={T.dfC} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insight cards */}
      <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 260ms ease-out both" : "none" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14 }}>What This Growth Means</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 12 }}>
          {[
            { icon: "🔥", t: "DF3 is the defining story", d: "200% growth in DF Week 3 (212→637) shows that goDs who complete earlier weeks deepen their commitment. The fasting culture is compounding." },
            { icon: "📈", t: "Overall DF momentum", d: "Total DF grew from 743 (2024) to 1,619 (as at 2025) — a 118% increase. Daniel Fast is now a defining identity marker for KidsInspiring Nation." },
            { icon: "✨", t: "Retention driving numbers", d: "DF3 unique participants grew +43%, but entries grew +200% — meaning existing participants attended far more sessions, not just more people attending once." },
          ].map(c => (
            <div key={c.t} style={{ background: dark ? "rgba(196,136,44,.07)" : "rgba(196,136,44,.04)", borderRadius: 10, padding: 14, border: "1px solid rgba(196,136,44,.12)" }}>
              <span style={{ fontSize: "1.3rem", display: "block", marginBottom: 7 }}>{c.icon}</span>
              <div style={{ fontSize: 12, fontWeight: 600, color: p1, marginBottom: 5 }}>{c.t}</div>
              <div style={{ fontSize: 11, color: p2, lineHeight: 1.55 }}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════

// ─── FLOATING CHAT ───────────────────────────────────────────────────────────
function FloatingChat({ dark }) {
  const [expanded, setExpanded] = useState(false);
  
  const iconMap = {
    telegram: Send,
    instagram: Instagram,
  };
  const socialLinks = [
    { key: "telegram", label: "Telegram", href: SITE.socials.telegram, color: "#0088CC" },
    { key: "whatsapp", label: "WhatsApp", href: SITE.socials.whatsappChat, color: "#25D366" },
    { key: "instagram", label: "Instagram", href: SITE.socials.instagram, color: "#E4405F" }
  ];

  return (
    <div className="kin-fixed-control kin-fixed-control--left" style={{ zIndex: 8500, display: "flex", flexDirection: "column-reverse", gap: 12 }}>
      <button 
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-controls="floating-chat-links"
        style={{ 
          height: 52, 
          padding: "0 20px",
          borderRadius: "99px", 
          background: T.green, 
          color: "#fff", 
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 8px 32px rgba(22,97,62,0.3)", 
          border: "none", 
          cursor: "pointer", 
          transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.2s" 
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        id="floating-chat-toggle"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={expanded ? "close" : "chat"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            {expanded ? (
              <>
                <X size={18} strokeWidth={2.5} />
                <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.02em" }}>Close</span>
              </>
            ) : (
              <>
                <MessageCircle size={18} />
                <span style={{ fontSize: "14px", fontWeight: 700, letterSpacing: "0.02em" }}>Chat</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, x: -10, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, y: 10, scale: 0.9 }}
            id="floating-chat-links"
            style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 4 }}
          >
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${s.label} in a new tab`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                style={{ 
                  height: 44, 
                  padding: "0 16px 0 12px",
                  borderRadius: "99px", 
                  background: dark ? "rgba(28,28,30,0.95)" : "rgba(255,255,255,1)", 
                  border: `1px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}`, 
                  backdropFilter: "blur(12px)", 
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  color: s.color, 
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)", 
                  textDecoration: "none" 
                }}
                whileHover={{ scale: 1.05, x: 6 }}
                title={s.label}
              >
                {s.key === "whatsapp" ? <MessageCircle size={18} strokeWidth={2.5} /> : (() => {
                  const Icon = iconMap[s.key];
                  return <Icon size={18} strokeWidth={2.5} />;
                })()}
                <span style={{ fontSize: "12px", fontWeight: 600, color: dark ? T.cream : T.greenD }}>{s.label}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RouteFrame({ children, meta, paddingTop = "80px", fullHeight = false }) {
  usePageMeta(meta);
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={fullHeight ? { height: "100vh" } : undefined}>
      {paddingTop ? <div style={{ paddingTop }}>{children}</div> : children}
    </motion.div>
  );
}

function NotFoundPage({ dark }) {
  usePageMeta(ROUTE_META.fallback);
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "7rem 1.5rem 2rem", textAlign: "center", background: dark ? T.bgD : T.bg, color: dark ? T.cream : T.greenD }}>
      <div style={{ maxWidth: 520 }}>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: T.gold, marginBottom: "1rem" }}>404</div>
        <h1 style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)", marginBottom: "1rem" }}>This page has moved or does not exist.</h1>
        <p style={{ color: dark ? T.d2 : T.p2, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Try returning to the homepage or opening one of the main programme pages from the navigation.
        </p>
        <Link to="/" className="gold-btn" style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 2em", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 700 }}>
          Back to Home <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function SiteBottomBar({ dark }) {
  return (
    <footer style={{ background: "#060E08", borderTop: "1px solid rgba(253,247,236,.06)", padding: "2rem 0" }}>
      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center", textAlign: "center" }}>
          
          {/* Trust & Legal Strip */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "center", fontSize: ".82rem", color: "rgba(253,247,236,.45)" }}>
            <div style={{ fontWeight: 800, color: T.goldL }}>{SITE.registrationId}</div>
            <span style={{ width: 1, height: 12, background: "rgba(253,247,236,0.15)" }} />
            <Link to="/privacy" style={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>Privacy Policy</Link>
            <span style={{ width: 1, height: 12, background: "rgba(253,247,236,0.15)" }} />
            <Link to="/transparency" style={{ color: "inherit", textDecoration: "none", fontWeight: 600 }}>Transparency</Link>
            <span style={{ width: 1, height: 12, background: "rgba(253,247,236,0.15)" }} />
            <span style={{ fontStyle: "italic" }}>#JesusChristisOurJOY</span>
          </div>

          {/* Credits */}
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: ".85rem", color: "rgba(253,247,236,.35)" }}>
            <span>© {new Date().getFullYear()} {SITE.legalName}</span>
            <span>·</span>
            <span>Designed with JOY by</span>
            <a
              href="https://arkbuilders.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: T.goldL, fontWeight: 800, textDecoration: "none" }}
            >
              ArkBuilders
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const toggleDark = useCallback(() => setDark(d => !d), []);
  const location = useLocation();
  const navigate = useNavigate();
  const onGive = useCallback(() => navigate("/give"), [navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const timer = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <div style={{ background: dark ? "#0A1C12" : "#FAFAF5", color: dark ? T.cream : T.greenD, minHeight: "100vh" }}>
      <SiteNav dark={dark} onGive={onGive} />
      
      <AnimatePresence mode="wait">
        <Suspense fallback={<div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: dark ? T.cream : T.greenD }}>Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<RouteFrame meta={ROUTE_META.home} paddingTop=""><Website dark={dark} /></RouteFrame>} />
          <Route path="/kids-inspiring" element={<RouteFrame meta={ROUTE_META.kidsInspiring}><KidsInspiringLanding dark={dark} /></RouteFrame>} />
          <Route path="/investing-in-kids" element={<RouteFrame meta={ROUTE_META.investingInKids}><InvestingInKidsLanding dark={dark} /></RouteFrame>} />
          <Route path="/nation-builders" element={<RouteFrame meta={ROUTE_META.nationBuilders}><NationBuildersCorp dark={dark} /></RouteFrame>} />
          <Route path="/daily" element={<RouteFrame meta={ROUTE_META.daily}><Daily dark={dark} /></RouteFrame>} />
          <Route path="/gU" element={<RouteFrame meta={ROUTE_META.godsUniversity}><GodsUniversity dark={dark} /></RouteFrame>} />
          <Route path="/NBC" element={<RouteFrame meta={ROUTE_META.nbc}><NVC dark={dark} /></RouteFrame>} />
          <Route path="/nbc" element={<Navigate to="/NBC" replace />} />
          <Route path="/NBC/register" element={<RouteFrame meta={ROUTE_META.nbcRegister}><NBCRegister /></RouteFrame>} />
          <Route path="/give" element={<RouteFrame meta={ROUTE_META.give}><Giving dark={dark} /></RouteFrame>} />
          <Route path="/donate" element={<Navigate to="/give" replace />} />
          <Route path="/support" element={<Navigate to="/give" replace />} />
          <Route path="/giving" element={<Navigate to="/give" replace />} />
          <Route path="/transparency" element={<RouteFrame meta={ROUTE_META.transparency}><Transparency dark={dark} /></RouteFrame>} />
          <Route path="/faq" element={<RouteFrame meta={ROUTE_META.faq}><FAQ dark={dark} /></RouteFrame>} />
          <Route path="/privacy" element={<RouteFrame meta={ROUTE_META.privacy}><Privacy dark={dark} /></RouteFrame>} />
          <Route path="/dashboard" element={<RouteFrame meta={ROUTE_META.home} paddingTop="" fullHeight><Dashboard onBack={() => navigate(-1)} dark={dark} toggleDark={toggleDark} /></RouteFrame>} />
          <Route path="/about" element={<RouteFrame meta={ROUTE_META.about}><About dark={dark} /></RouteFrame>} />
          <Route path="/contact" element={<RouteFrame meta={ROUTE_META.contact}><Contact dark={dark} /></RouteFrame>} />
          <Route path="/gallery" element={<RouteFrame meta={ROUTE_META.gallery}><Gallery dark={dark} /></RouteFrame>} />
          <Route path="*" element={<NotFoundPage dark={dark} />} />
        </Routes>
        </Suspense>
      </AnimatePresence>

      <SiteBottomBar dark={dark} />

      <FloatingChat dark={dark} />
      <DarkToggle dark={dark} toggle={toggleDark} />
      <CookieBanner dark={dark} />
    </div>
  );
}
