import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  BookOpen, Clock, Download, ArrowLeft, ArrowRight, CheckCircle2,
  Flame, Award, Home, ChevronRight,
} from "lucide-react";
import { ROUTE_META, SITE, T } from "./siteConfig.js";
import { usePageMeta } from "./usePageMeta.js";
import { ShareRow } from "./engagement/GrowthWidgets.jsx";
import Certificate from "./nbc/Certificate.jsx";
import BuilderID from "./nbc/BuilderID.jsx";
import { trackEvent } from "./analytics.js";
import { NBC_MODULES, CORE_MODULES, VALUES_SERIES, PDF_BASE, getModule } from "./nbcCourse.js";
import InteractiveBlock, { isPassiveBlock } from "./nbc/course/InteractiveBlocks.jsx";
import WeeklyStreak from "./nbc/WeeklyStreak.jsx";
import {
  readProgress, isLessonComplete, markLessonComplete, moduleProgress,
  overallProgress, earnedBadges, nextModule,
} from "./nbcProgress.js";

const COURSE_URL = `${SITE.siteUrl}/nbc/course`;

function theme(dark) {
  return dark
    ? { bg: T.bgD, surf: T.srfD, brd: T.brdD, txt: T.d1, sub: T.d2 }
    : { bg: T.cream, surf: "#FFFFFF", brd: "rgba(11,42,27,.06)", txt: T.green, sub: T.greenM };
}

function ProgressBar({ pct, s }) {
  return (
    <div style={{ height: 8, borderRadius: 999, background: s.brd, overflow: "hidden" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ height: "100%", background: `linear-gradient(90deg, ${T.gold}, ${T.goldL})` }}
      />
    </div>
  );
}

/* ── Course index ──────────────────────────────────────────────── */
function CourseIndex({ dark }) {
  usePageMeta(ROUTE_META.nbcCourse);
  const s = theme(dark);
  const [state, setState] = useState(readProgress);
  useEffect(() => { setState(readProgress()); }, []);

  const overall = overallProgress(state);
  const badges = earnedBadges(state);
  const resume = nextModule(state);

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: s.bg, color: s.txt, minHeight: "100vh", paddingBottom: "4rem" }}>
      {/* Hero */}
      <section style={{ background: T.greenD, color: T.cream, padding: "clamp(3.5rem,8vw,6rem) 1.25rem 3rem" }}>
        <div style={{ maxWidth: "60rem", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".8rem", opacity: .75, marginBottom: "1rem" }}>
            <Link to="/NBC" style={{ color: T.goldL, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}><Home size={13} /> NBC</Link>
            <ChevronRight size={13} /> <span>Course</span>
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: T.goldL, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", fontSize: ".78rem", marginBottom: ".9rem" }}>
            <BookOpen size={16} /> The Nation Builders Course
          </div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.2rem,7vw,3.6rem)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 1rem" }}>
            Learn to build a nation.<br />In a few minutes a day.
          </h1>
          <p style={{ fontSize: "1.05rem", color: "rgba(250,249,246,.8)", maxWidth: "48ch", lineHeight: 1.6, marginBottom: "1.75rem" }}>
            Short, free lessons anyone can take — and share with the world. No PDFs to wade through: just the ideas that turn a young person into a Nation Builder.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
            {resume ? (
              <Link to={`/nbc/course/${resume.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "1rem 2rem", borderRadius: 999, background: T.gold, color: "#14532d", fontWeight: 800, textDecoration: "none" }}>
                {overall.done > 0 ? "Continue where you left off" : "Start the course"} <ArrowRight size={17} />
              </Link>
            ) : (
              <span style={{ padding: "1rem 2rem", borderRadius: 999, background: "rgba(255,255,255,.1)", fontWeight: 800 }}>🎉 Course complete!</span>
            )}
            <WeeklyStreak dark={dark} compact />
          </div>

          {/* Overall progress */}
          <div style={{ marginTop: "2rem", maxWidth: "34rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".8rem", opacity: .8, marginBottom: 6 }}>
              <span>Your progress</span><span>{overall.pct}% · {badges.length}/{NBC_MODULES.length} badges</span>
            </div>
            <ProgressBar pct={overall.pct} s={{ brd: "rgba(255,255,255,.14)" }} />
          </div>
        </div>
      </section>

      {/* Module grid */}
      <section style={{ maxWidth: "68rem", margin: "0 auto", padding: "3rem 1.25rem 0" }}>
        <ModuleGrid modules={CORE_MODULES} state={state} s={s} />

        {/* Core Values Deep Dive series */}
        <div style={{ margin: "3.5rem 0 1.5rem", padding: "2rem", borderRadius: 24, background: T.greenD, color: T.cream }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: T.goldL, fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", fontSize: ".76rem", marginBottom: ".6rem" }}>
            🗣️ For English & Pidgin
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,5vw,2.3rem)", fontWeight: 900, margin: "0 0 .5rem" }}>
            The Core Values Deep Dive
          </h2>
          <p style={{ color: "rgba(250,249,246,.82)", lineHeight: 1.6, maxWidth: "56ch", margin: 0 }}>
            Eight values, eight short modules — real Naija heroes, proverbs from our elders, and challenges you can live this week. Na here character dey start.
          </p>
          {/* 8-value progress dots */}
          <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginTop: "1.25rem" }}>
            {VALUES_SERIES.map((v) => {
              const done = moduleProgress(v.slug, state).complete;
              return (
                <span key={v.slug} title={v.title} style={{ width: 38, height: 38, borderRadius: 999, display: "grid", placeItems: "center", fontSize: "1.05rem", background: done ? v.accent : "rgba(255,255,255,.08)", border: `2px solid ${done ? v.accent : "rgba(255,255,255,.18)"}`, filter: done ? "none" : "grayscale(1)", opacity: done ? 1 : .55 }}>
                  {v.emoji}
                </span>
              );
            })}
            <span style={{ alignSelf: "center", fontSize: ".82rem", color: "rgba(250,249,246,.7)", fontWeight: 700, marginLeft: ".25rem" }}>
              {VALUES_SERIES.filter((v) => moduleProgress(v.slug, state).complete).length}/8 values mastered
            </span>
          </div>
        </div>
        <ModuleGrid modules={VALUES_SERIES} state={state} s={s} />

        {/* Values completion certificate */}
        {VALUES_SERIES.every((v) => moduleProgress(v.slug, state).complete) && (
          <div style={{ marginTop: "2.5rem" }}>
            <Certificate achievement="has mastered the 8 Core Values of a Nation Builder" eventName="values_complete" />
          </div>
        )}

        {/* Builder ID — photo upload + shareable card */}
        <div style={{ marginTop: "3rem" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.4rem,4vw,1.9rem)", fontWeight: 900, margin: "0 0 .35rem" }}>Mint your Builder ID</h2>
          <p style={{ color: s.sub, margin: "0 0 1.25rem", lineHeight: 1.6 }}>Upload your photo, claim your Builder number, and carry the card that says you build Nigeria. Your photo also appears on your certificates.</p>
          <BuilderID />
        </div>

        {/* Resource library */}
        <ResourceLibrary s={s} />
      </section>

      <section style={{ maxWidth: "68rem", margin: "0 auto", padding: "0 1.25rem" }}>
        {/* Certificate on full completion */}
        {overall.pct === 100 && (
          <div style={{ marginTop: "3rem" }}>
            <Certificate achievement="has completed the Nation Builders Course" eventName="course_complete" />
          </div>
        )}

        {/* Share the course */}
        <div style={{ marginTop: "3rem", padding: "2rem", borderRadius: 24, background: s.surf, border: `1px solid ${s.brd}`, textAlign: "center" }}>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 800, margin: "0 0 .5rem" }}>Share nation building with the world</h3>
          <p style={{ color: s.sub, marginBottom: "1.25rem" }}>Send this free course to a young person who should be a Nation Builder.</p>
          <ShareRow dark={dark} url={COURSE_URL} text="Take the free Nation Builders Course — learn to build the Nigeria you want to see 🇳🇬" />
        </div>
      </section>
    </div>
  );
}

const RESOURCES = [
  { file: "NBC Brochure.pdf", label: "NBC Brochure", note: "The full programme — share with schools, parents & sponsors", emoji: "📘" },
  { file: "Values Training Workbook.pdf", label: "Values Workbook", note: "The 8 values, on paper", emoji: "📖" },
  { file: "Project Planning Guide.pdf", label: "Project Planner", note: "From idea to community project", emoji: "🗺️" },
  { file: "Mentor Guide.pdf", label: "Mentor Guide", note: "For advisors & mentors", emoji: "🧭" },
  { file: "Monthly Progress Tracker.pdf", label: "Progress Tracker", note: "Log your monthly impact", emoji: "📊" },
  { file: "Impact Report.pdf", label: "Impact Report", note: "How builders report results", emoji: "🏆" },
];

function ResourceLibrary({ s }) {
  return (
    <div style={{ marginTop: "3rem" }}>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.4rem,4vw,1.9rem)", fontWeight: 900, margin: "0 0 .35rem" }}>Take everything with you</h2>
      <p style={{ color: s.sub, margin: "0 0 1.25rem", lineHeight: 1.6 }}>The brochure and every builder resource — free to download, print, and share offline.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))", gap: ".9rem" }}>
        {RESOURCES.map((r) => (
          <a key={r.file} href={`${PDF_BASE}${r.file}`} download
            style={{ display: "flex", alignItems: "center", gap: ".85rem", padding: "1rem 1.1rem", borderRadius: 16, background: s.surf, border: `1px solid ${s.brd}`, textDecoration: "none", color: s.txt }}>
            <span style={{ fontSize: "1.6rem" }}>{r.emoji}</span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: "block", fontWeight: 800, fontSize: ".95rem" }}>{r.label}</span>
              <span style={{ display: "block", fontSize: ".78rem", color: s.sub, lineHeight: 1.4 }}>{r.note}</span>
            </span>
            <Download size={17} color={T.goldD} style={{ flexShrink: 0 }} />
          </a>
        ))}
      </div>
    </div>
  );
}

function ModuleGrid({ modules, state, s }) {
  return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
          {modules.map((m, i) => {
            const mp = moduleProgress(m.slug, state);
            return (
              <motion.div key={m.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                style={{ background: s.surf, border: `1px solid ${mp.complete ? T.gold : s.brd}`, borderTop: m.accent ? `5px solid ${m.accent}` : undefined, borderRadius: 22, padding: "1.5rem", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: ".75rem" }}>
                  <span style={{ fontSize: "2rem" }}>{m.emoji}</span>
                  {mp.complete
                    ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: T.ok, fontWeight: 800, fontSize: ".78rem" }}><Award size={15} /> Badge</span>
                    : <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: s.sub, fontSize: ".78rem" }}><Clock size={13} /> {m.minutes} min</span>}
                </div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, margin: "0 0 .4rem" }}>{m.title}</h3>
                {m.pidgin && <p style={{ fontSize: ".88rem", fontStyle: "italic", color: m.accent || T.goldD, fontWeight: 700, margin: "0 0 .4rem" }}>🗣️ “{m.pidgin}”</p>}
                <p style={{ fontSize: ".9rem", color: s.sub, lineHeight: 1.5, flex: 1, marginBottom: "1rem" }}>{m.summary}</p>
                {mp.done > 0 && <div style={{ marginBottom: ".9rem" }}><ProgressBar pct={mp.pct} s={s} /></div>}
                <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                  <Link to={`/nbc/course/${m.slug}`} style={{ flex: 1, textAlign: "center", padding: ".7rem 1rem", borderRadius: 999, background: mp.complete ? "transparent" : T.green, color: mp.complete ? s.txt : "#fff", border: mp.complete ? `1.5px solid ${s.brd}` : "none", fontWeight: 700, fontSize: ".85rem", textDecoration: "none" }}>
                    {mp.complete ? "Review" : mp.done > 0 ? "Resume" : "Start"}
                  </Link>
                  {m.pdf && (
                    <a href={`${PDF_BASE}${m.pdf}`} download aria-label={`Download ${m.title} PDF`} style={{ padding: ".7rem", borderRadius: 999, background: "rgba(197,160,55,.12)", color: T.goldD, display: "grid", placeItems: "center" }}>
                      <Download size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
  );
}

/* ── Lesson view ───────────────────────────────────────────────── */
function LessonView({ dark, mod }) {
  const s = theme(dark);
  const navigate = useNavigate();
  const [state, setState] = useState(readProgress);
  const idx = useMemo(() => NBC_MODULES.findIndex((m) => m.slug === mod.slug), [mod.slug]);
  const prev = idx > 0 ? NBC_MODULES[idx - 1] : null;
  const next = idx < NBC_MODULES.length - 1 ? NBC_MODULES[idx + 1] : null;

  usePageMeta({
    title: `${mod.title} — Nation Builders Course`,
    description: mod.summary,
    canonicalPath: `/nbc/course/${mod.slug}`,
    image: ROUTE_META.nbcCourse.image,
  });

  useEffect(() => { setState(readProgress()); window.scrollTo(0, 0); }, [mod.slug]);

  const complete = (i) => {
    const next = markLessonComplete(mod.slug, i);
    setState(next);
    trackEvent("nbc_lesson_complete", { module: mod.slug, lesson: i });
    if (moduleProgress(mod.slug, next).complete) trackEvent("nbc_module_complete", { module: mod.slug });
  };
  const mp = moduleProgress(mod.slug, state);
  const lessonUrl = `${SITE.siteUrl}/nbc/course/${mod.slug}`;

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: s.bg, color: s.txt, minHeight: "100vh", paddingBottom: "4rem" }}>
      <section style={{ background: T.greenD, color: T.cream, padding: "clamp(3rem,7vw,4.5rem) 1.25rem 2.5rem" }}>
        <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".8rem", opacity: .75, marginBottom: "1rem", flexWrap: "wrap" }}>
            <Link to="/nbc/course" style={{ color: T.goldL, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}><ArrowLeft size={13} /> All lessons</Link>
            <ChevronRight size={13} /> <span>{mod.title}</span>
          </div>
          <div style={{ fontSize: "2.4rem", marginBottom: ".5rem" }}>{mod.emoji}</div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,6vw,3rem)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 .75rem" }}>{mod.title}</h1>
          {mod.pidgin && <p style={{ fontStyle: "italic", color: T.goldL, fontWeight: 700, fontSize: "1.05rem", margin: "0 0 .6rem" }}>🗣️ “{mod.pidgin}”</p>}
          <p style={{ color: "rgba(250,249,246,.8)", lineHeight: 1.6, marginBottom: "1.25rem" }}>{mod.summary}</p>
          {mod.proverb && (
            <div style={{ margin: "0 0 1.25rem", padding: "1rem 1.25rem", borderRadius: 16, background: "rgba(197,160,55,.12)", border: "1px solid rgba(230,201,143,.35)", maxWidth: "34rem" }}>
              <div style={{ fontWeight: 800, fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: T.goldL, marginBottom: ".3rem" }}>🪶 Elders' Proverb</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.15rem", fontWeight: 700, color: T.cream, lineHeight: 1.4 }}>“{mod.proverb.text}”</div>
              <div style={{ fontSize: ".85rem", color: "rgba(250,249,246,.75)", marginTop: ".35rem", lineHeight: 1.5 }}>{mod.proverb.meaning}</div>
            </div>
          )}
          <div style={{ maxWidth: "26rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".78rem", opacity: .8, marginBottom: 6 }}>
              <span><Clock size={12} /> {mod.minutes} min</span><span>{mp.done}/{mp.total} done</span>
            </div>
            <ProgressBar pct={mp.pct} s={{ brd: "rgba(255,255,255,.14)" }} />
          </div>
        </div>
      </section>

      <section style={{ maxWidth: "44rem", margin: "0 auto", padding: "2.5rem 1.25rem 0", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {mod.lessons.map((l, i) => {
          const done = isLessonComplete(mod.slug, i, state);
          return (
            <LessonCard key={i} lesson={l} done={done} onComplete={() => complete(i)} s={s} n={i + 1} />
          );
        })}

        {mp.complete && (
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} style={{ padding: "1.75rem", borderRadius: 22, background: "rgba(45,158,83,.1)", border: `1px solid ${T.ok}40`, textAlign: "center" }}>
            <Award size={34} color={T.ok} />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: ".5rem 0" }}>Badge earned: {mod.title} 🏅</h3>
            <p style={{ color: s.sub }}>You finished this module. Keep the momentum going.</p>
          </motion.div>
        )}

        {/* Per-module PDF */}
        {mod.pdf && (
          <a href={`${PDF_BASE}${mod.pdf}`} download style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: ".9rem 1.5rem", borderRadius: 999, border: `1.5px solid ${s.brd}`, color: s.txt, fontWeight: 700, textDecoration: "none", background: s.surf }}>
            <Download size={16} /> Download this module as a PDF (offline)
          </a>
        )}

        {/* Share */}
        <div style={{ padding: "1.5rem", borderRadius: 22, background: s.surf, border: `1px solid ${s.brd}`, textAlign: "center" }}>
          <p style={{ fontWeight: 800, marginBottom: ".9rem" }}>Share this lesson</p>
          <ShareRow dark={dark} url={lessonUrl} text={`${mod.title} — a lesson from the free Nation Builders Course 🇳🇬`} />
        </div>

        {/* Prev / Next */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          {prev
            ? <Link to={`/nbc/course/${prev.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: ".85rem 1.4rem", borderRadius: 999, border: `1.5px solid ${s.brd}`, color: s.txt, textDecoration: "none", fontWeight: 700 }}><ArrowLeft size={16} /> {prev.title}</Link>
            : <span />}
          {next
            ? <Link to={`/nbc/course/${next.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: ".85rem 1.4rem", borderRadius: 999, background: T.green, color: "#fff", textDecoration: "none", fontWeight: 700 }}>{next.title} <ArrowRight size={16} /></Link>
            : <button onClick={() => navigate("/nbc/course")} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: ".85rem 1.4rem", borderRadius: 999, background: T.gold, color: "#14532d", border: "none", fontWeight: 800, cursor: "pointer" }}>Back to all lessons <ArrowRight size={16} /></button>}
        </div>
      </section>
    </div>
  );
}

function LessonCard({ lesson, done, onComplete, s, n }) {
  const blocks = lesson.interactions || [];
  // Every non-passive block (chart is informational) must be engaged with
  // before the lesson can be marked complete.
  const requiredIdx = useMemo(
    () => blocks.map((b, i) => (isPassiveBlock(b.type) ? null : i)).filter((i) => i !== null),
    [lesson]
  );
  const [solved, setSolved] = useState(() => new Set());
  const markSolved = (i) => setSolved((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  const allSolved = requiredIdx.every((i) => solved.has(i));
  const gated = requiredIdx.length > 0 && !allSolved && !done;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      style={{ background: s.surf, border: `1px solid ${done ? T.gold : s.brd}`, borderRadius: 22, padding: "1.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: ".75rem" }}>
        <span style={{ width: 28, height: 28, borderRadius: 999, background: done ? T.ok : "rgba(197,160,55,.15)", color: done ? "#fff" : T.goldD, display: "grid", placeItems: "center", fontWeight: 800, fontSize: ".85rem", flexShrink: 0 }}>
          {done ? <CheckCircle2 size={16} /> : n}
        </span>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>{lesson.heading}</h3>
      </div>
      <p style={{ color: s.sub, lineHeight: 1.7, margin: "0 0 1rem" }}>{lesson.body}</p>
      <div style={{ padding: ".85rem 1.1rem", borderRadius: 14, background: "rgba(197,160,55,.1)", color: T.goldD, fontWeight: 700, fontSize: ".92rem" }}>
        💡 {lesson.takeaway}
      </div>

      {blocks.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", margin: "1.25rem 0" }}>
          {blocks.map((b, i) => (
            <InteractiveBlock key={i} block={b} s={s} onSolved={() => markSolved(i)} />
          ))}
        </div>
      )}

      {!done ? (
        <button onClick={onComplete} disabled={gated}
          style={{ padding: ".8rem 1.6rem", borderRadius: 999, border: "none", fontWeight: 800, fontSize: ".9rem",
            cursor: gated ? "not-allowed" : "pointer",
            background: gated ? s.brd : T.green, color: gated ? s.sub : "#fff" }}>
          {gated ? "Complete the activity above to continue" : "Mark complete"}
        </button>
      ) : (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: T.ok, fontWeight: 800, fontSize: ".9rem" }}>
          <CheckCircle2 size={17} /> Completed
        </span>
      )}
    </motion.div>
  );
}

/* ── Router entry ──────────────────────────────────────────────── */
export default function NBCCourse({ dark }) {
  const { slug } = useParams();
  if (slug) {
    const mod = getModule(slug);
    if (mod) return <LessonView dark={dark} mod={mod} />;
  }
  return <CourseIndex dark={dark} />;
}
