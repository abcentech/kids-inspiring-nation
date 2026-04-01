/*
  KidsInspiring Nation — About Page
  Founding story (modal chapters) + Key dates slider + Vision
*/

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart, Globe, Star, BookOpen, Zap, Users } from "lucide-react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  green: "#16613E", greenD: "#0D3D26", greenM: "#2C4A35",
  gold: "#C4882C", goldL: "#E8B954", goldD: "#9A6620",
  coral: "#D94F30", cream: "#FDF7EC", warmBg: "#F5EFE3",
  p1: "#1D1D1F", p2: "#6E6E73", p3: "#AEAEB2",
  kingsC: "#7B2D8B",
};

// ─── FOUNDING STORY CHAPTERS (for modals) ─────────────────────────────────────
const CHAPTERS = [
  {
    id: 1,
    title: "The Heart Cry",
    date: "2017",
    icon: "🕊️",
    color: T.green,
    gradient: `linear-gradient(135deg, ${T.green}, ${T.greenD})`,
    preview: "A conversation with the Holy Spirit about sustainable soul-winning changed everything.",
    full: [
      `KidsInspiring Nation began as a heart cry for the kingdom and our nation, Nigeria.`,
      `Participating in the soul-winning drive of the Living Faith Church, and in a conversation with the Spirit on soul-winning that is sustainable, the Spirit of God said:`,
      `"The soul of a child is as important as the soul of an adult."`,
      `Thus, in 2017, we began to teach children after Sunday school at the church. What began as an after Sunday school event began to take shape into a Children Ministry unto the nations.`,
      `These children were to be raised as gods — from Daniel 1:4, 8, 17, 20, 21. In other words, a god to the gods of nations.`,
    ],
    photo: "/photos/KIN_programs.jpg",
  },
  {
    id: 2,
    title: "Taking Shape",
    date: "2018–2021",
    icon: "🌱",
    color: T.gold,
    gradient: `linear-gradient(135deg, ${T.gold}, ${T.goldD})`,
    preview: "From an after-Sunday-school gathering into a ministry that crossed borders during COVID-19.",
    full: [
      `What began as an after Sunday school event began to take extraordinary shape.`,
      `In 2018, The Jesus Christ Concert (TJC) launched — an event to herald Jesus Christ as the reason for the season of Christmas. That same year, the Psalm 119 Challenge was born: a global challenge to get children to learn all 176 verses of Psalm 119, the longest chapter in God's Word.`,
      `Then in 2020, COVID-19 unexpectedly expanded our borders. KidsInspiring went Global — children from other nations of the world began to participate.`,
      `In 2021, The Scripture Class began — a weekly class to drill down to the tenets of Psalm 119, verse by verse. That same year, the Psalm 119 National Values Challenge reached schools across Nigeria:`,
      `• 2021: 11,917 students\n• 2022: 119,119 students\n• 2023: 357,119 students\n• 2024: 528,119 students`,
    ],
    photo: "/photos/P119_Academy.jpg",
  },
  {
    id: 3,
    title: "A Nation Is Born",
    date: "July 2, 2022",
    icon: "🏛️",
    color: T.coral,
    gradient: `linear-gradient(135deg, ${T.coral}, #8B2500)`,
    preview: "On July 2, 2022, KidsInspiring became a Nation — receiving the mandate for nation building.",
    full: [
      `On the 1st of July, 2022, KidsInspiring, became a Nation. Because we received the mandate for nation building — anchored in Genesis 12:1-3.`,
      `That is the core of what we do today: that every single goD-child (genius) that we raise should be responsible for building, transforming, and making their nations great.`,
      `In July 2022, KidsInspiring Nation — From "Living an Inspiration" raising children as gods, & "raising gods" to "raising gods, building nations."`,
      `The projection was bold and faith-filled: July 2, 2092 — 75th Year — Billions of god-children part of the KIN.`,
      `KidsInspiring Nation was no longer just a children's ministry. It was a movement.`,
    ],
    photo: "/photos/Nation_Builders_Program.jpg",
  },
  {
    id: 4,
    title: "The 7-Year University",
    date: "2023–2026",
    icon: "🎓",
    color: T.kingsC,
    gradient: `linear-gradient(135deg, ${T.kingsC}, #4A1B55)`,
    preview: "goDs University — a 7-year regimen raising goDs across Spirit, Skills, and Service to Nations.",
    full: [
      `Today, KidsInspiring Nation runs a 7-year goD-University program that raises children in three main ways:`,
      `• Their Spirit — to God\n• Their Skills — in themselves\n• Their Service — to Nations`,
      `In January 2023, Daniel Fast launched — a 10-day wait on the Lord with water and fruits, and prayers every 3 hours. It has since become one of our most defining programmes.`,
      `In February 2024, goDs University was formalised — a 7-year training regimen to raise goDs to nations.`,
      `In February 2026, goDxperience launched — a church by kids, for kids, raising kids as goDs. Sparked by the experiences of Prince Todimu, Princess Todimumu, and Princess Talia.`,
      `In March 2026, goDcell launched — a weekly meeting of sharing God's Word and training goDs from every community.`,
    ],
    photo: "/photos/Community_impact.jpg",
  },
  {
    id: 5,
    title: "The Vision & The Invitation",
    date: "Always",
    icon: "🌍",
    color: T.greenM,
    gradient: `linear-gradient(135deg, #1A5C38, #0D3D26)`,
    preview: "Finding children, raising them, and releasing them as geniuses — goDs — to their world.",
    full: [
      `The KidsInspiring Nation's vision has always been about finding children, raising them, and releasing them as geniuses (goDs) to their world.`,
      `Over the last four years, KidsInspiring Nation has continued, witnessing to children (& teenagers) across race, creed, tribes & tongues — on a regular and consistent basis.`,
      `We invite everyone who is passionate about nation building, raising exceptional children, and bringing the Kingdom of God into our communities to join us in this race!`,
      `#JesusChristisOurJOY`,
    ],
    photo: "/photos/Spirit_Filled_Parents.jpg",
  },
];

// ─── KEY DATES TIMELINE ────────────────────────────────────────────────────────
const KEY_DATES = [
  { year: "Mid-2017", event: "KidsInspiring begins as an after-Sunday-school programme", icon: "📖" },
  { year: "2018", event: "TJC 1.0 — The Jesus Christ Concert launches", icon: "🎶" },
  { year: "2018", event: "Psalm 119 Challenge — children learn all 176 verses globally", icon: "✨" },
  { year: "Apr–Jul 2019", event: "1st Psalm 119 Challenge completes", icon: "🏆" },
  { year: "2020", event: "KidsInspiring Global — COVID-19 opens the borders to other nations", icon: "🌍" },
  { year: "2021", event: "The Scripture Class begins — weekly verse-by-verse teaching", icon: "📜" },
  { year: "2021", event: "Psalm 119 National Values Challenge: 11,917 students in schools", icon: "🏫" },
  { year: "2022", event: "The Bible Challenge — 2-year challenge to learn, love & live God's Word", icon: "📖" },
  { year: "Jul 2, 2022", event: "KidsInspiring becomes a Nation — Genesis 12:1-3", icon: "🇳🇬", highlight: true },
  { year: "Jan 2023", event: "Daniel Fast launches — 10-day fast, prayer every 3 hours", icon: "🔥" },
  { year: "Feb 2023", event: "Nehemiah Feb 23 — 24+ hours of prayer and fasting for Nigeria", icon: "🙏" },
  { year: "Feb 2024", event: "goDs University — a 7-year training regimen formalised", icon: "🎓", highlight: true },
  { year: "Feb 2026", event: "goDxperience — a church by kids, for kids, raising kids as goDs", icon: "⚡" },
  { year: "Mar 2026", event: "goDcell — weekly community meetings of goDs", icon: "👑" },
  { year: "Jul 2, 2092", event: "75th Year Vision — Billions of goD-children part of the KIN", icon: "🌌", highlight: true },
];

// ─── CHAPTER MODAL ─────────────────────────────────────────────────────────────
function ChapterModal({ chapter, onClose, dark }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={e => { if (e.target === e.currentTarget) onClose(); }}
        style={{
          position: "fixed", inset: 0, zIndex: 9000,
          background: "rgba(0,0,0,.75)", backdropFilter: "blur(12px)",
          display: "grid", placeItems: "center", padding: "1rem",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          style={{
            width: "min(680px, 100%)",
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 40px 100px rgba(0,0,0,.6)",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{
            background: chapter.gradient,
            padding: "clamp(1.5rem, 5vw, 2.5rem)",
            position: "relative",
            minHeight: 160,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}>
            <img
              src={chapter.photo}
              alt={chapter.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.3, mixBlendMode: "overlay" }}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,.2) 0%, rgba(0,0,0,.6) 100%)" }} />
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 16, right: 16,
                width: 38, height: 38, borderRadius: "50%",
                background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)",
                display: "grid", placeItems: "center", color: "#fff", cursor: "pointer",
              }}
            >
              <X size={16} strokeWidth={2} />
            </button>
            <div style={{ position: "relative", zIndex: 2 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: ".5rem",
                background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)",
                borderRadius: 999, padding: ".3em .9em", marginBottom: ".75rem",
              }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", color: "rgba(255,255,255,.85)", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700 }}>
                  {chapter.date}
                </span>
              </div>
              <div style={{ fontSize: "2.5rem", marginBottom: ".4rem" }}>{chapter.icon}</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4vw,2.4rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                {chapter.title}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div style={{
            background: dark ? "#0E1A12" : "#fff",
            padding: "clamp(1.5rem, 5vw, 2.5rem)",
            overflowY: "auto",
            flex: 1,
          }}>
            {chapter.full.map((para, i) => (
              <p key={i} style={{
                fontSize: "clamp(.95rem, 2vw, 1.05rem)",
                color: para.startsWith('"') ? chapter.color : (dark ? "rgba(253,247,236,.8)" : T.p1),
                lineHeight: 1.75,
                marginBottom: i < chapter.full.length - 1 ? "1.1rem" : 0,
                fontStyle: para.startsWith('"') ? "italic" : "normal",
                fontFamily: para.startsWith('"') ? "'Playfair Display',serif" : "'DM Sans',sans-serif",
                fontWeight: para.startsWith('"') ? 700 : para.startsWith("•") ? 500 : 400,
                whiteSpace: "pre-line",
                borderLeft: para.startsWith('"') ? `3px solid ${chapter.color}` : "none",
                paddingLeft: para.startsWith('"') ? "1rem" : 0,
              }}>
                {para}
              </p>
            ))}
            <button
              onClick={onClose}
              style={{
                marginTop: "1.75rem",
                padding: ".75em 2em",
                borderRadius: 999,
                background: chapter.color,
                color: "#fff",
                fontWeight: 700,
                fontSize: ".9rem",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans',sans-serif",
              }}
            >
              Close ✕
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── TIMELINE SLIDER ───────────────────────────────────────────────────────────
function TimelineSlider({ dark }) {
  const [current, setCurrent] = useState(0);
  const total = KEY_DATES.length;
  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);
  const date = KEY_DATES[current];

  return (
    <div style={{
      background: dark ? "#060E08" : T.greenD,
      borderRadius: 24,
      overflow: "hidden",
      boxShadow: "0 16px 48px rgba(0,0,0,.3)",
    }}>
      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(255,255,255,.08)" }}>
        <div style={{
          height: "100%",
          width: `${((current + 1) / total) * 100}%`,
          background: T.goldL,
          transition: "width .4s ease-out",
          borderRadius: 999,
        }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ padding: "clamp(2rem, 6vw, 3.5rem)" }}
        >
          {/* Year badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: ".5rem",
            background: date.highlight ? `${T.gold}25` : "rgba(255,255,255,.06)",
            border: `1px solid ${date.highlight ? `${T.gold}55` : "rgba(255,255,255,.1)"}`,
            borderRadius: 999, padding: ".35em 1em", marginBottom: "1.25rem",
          }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", fontWeight: 700, color: date.highlight ? T.goldL : "rgba(253,247,236,.6)", letterSpacing: ".12em", textTransform: "uppercase" }}>
              {date.year}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: "2rem" }}>
            <span style={{ fontSize: "3rem", lineHeight: 1 }}>{date.icon}</span>
            <p style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
              fontWeight: date.highlight ? 900 : 700,
              color: date.highlight ? T.goldL : T.cream,
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
            }}>
              {date.event}
            </p>
          </div>

          {/* Counter + Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", color: "rgba(253,247,236,.4)", letterSpacing: ".08em" }}>
              {current + 1} / {total}
            </span>
            <div style={{ display: "flex", gap: ".5rem" }}>
              <button onClick={prev} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", display: "grid", placeItems: "center", color: T.cream, cursor: "pointer", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.18)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}>
                <ChevronLeft size={18} strokeWidth={2} />
              </button>
              <button onClick={next} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", display: "grid", placeItems: "center", color: T.cream, cursor: "pointer", transition: "background .2s" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,.18)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.08)"}>
                <ChevronRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot navigation */}
      <div style={{ padding: "0 clamp(2rem, 6vw, 3.5rem) 1.5rem", display: "flex", gap: ".35rem", flexWrap: "wrap" }}>
        {KEY_DATES.map((d, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? 22 : (d.highlight ? 10 : 8),
            height: i === current ? 8 : (d.highlight ? 10 : 8),
            borderRadius: 999,
            background: i === current ? T.goldL : d.highlight ? `${T.gold}80` : "rgba(255,255,255,.2)",
            border: "none", cursor: "pointer", transition: "all .3s",
            padding: 0,
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ABOUT PAGE ──────────────────────────────────────────────────────────
export default function About({ dark }) {
  const [openChapter, setOpenChapter] = useState(null);
  const bg = dark ? "#0A1C12" : "#FAFAF5";
  const txt = dark ? T.cream : T.greenD;
  const card = dark ? "#0E1A12" : "#fff";

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: txt, overflowX: "hidden" }}>

      {/* ─── HERO ─── */}
      <section style={{
        background: T.greenD,
        padding: "clamp(5rem,12vw,9rem) 0 clamp(3.5rem,8vw,6rem)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 70% at 15% 55%, ${T.green}50 0%, transparent 58%), radial-gradient(ellipse 55% 70% at 85% 15%, ${T.gold}20, transparent 55%)` }} />
        <div aria-hidden style={{ position: "absolute", right: "-0.05em", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(12rem,35vw,40rem)", lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(196,136,44,.05)", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900, userSelect: "none", pointerEvents: "none" }}>KIN</div>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase", color: T.goldL, marginBottom: "1rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
              <span style={{ width: "2rem", height: "1.5px", background: T.gold, display: "block" }} />
              Our Story
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem,8vw,5.5rem)", fontWeight: 900, color: T.cream, letterSpacing: "-0.035em", lineHeight: 0.95, marginBottom: "1.5rem" }}>
              A Heart Cry for<br />
              <em style={{ fontStyle: "italic", color: T.goldL }}>the Nation</em>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2.4vw,1.15rem)", color: "rgba(253,247,236,.7)", lineHeight: 1.72, maxWidth: "50ch" }}>
              Since 2017, KidsInspiring Nation has been raising children as <strong style={{ color: T.goldL }}>goDs</strong> — Geniuses Ordained by Destiny — to build, transform, and lead their nations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── QUICK STATS ─── */}
      <div style={{ background: T.gold, padding: "1.5rem 0" }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 10rem), 1fr))", gap: "1.25rem" }}>
          {[
            { n: "2017", l: "Year Founded" },
            { n: "639", l: "goDs Reached (2026)" },
            { n: "19,695", l: "Attendance Entries" },
            { n: "14", l: "Active Programmes" },
            { n: "365", l: "Events in 2026" },
            { n: "7", l: "Year University" },
          ].map(s => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.75)", fontWeight: 500, marginTop: ".2rem", letterSpacing: ".03em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── FOUNDING STORY (Chapter Modal Cards) ─── */}
      <section style={{ padding: "clamp(4rem,10vw,7rem) 0", background: bg }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,6vw,4rem)" }}>
            <div style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.gold, marginBottom: ".75rem" }}>
              The Founding Story
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: dark ? T.cream : T.greenD, marginBottom: ".75rem" }}>
              Five Chapters of a Movement
            </h2>
            <p style={{ fontSize: "1rem", color: dark ? "rgba(253,247,236,.6)" : T.p2, maxWidth: "40ch", margin: "0 auto" }}>
              Click any chapter to read the full story — how KIDsInspiring Nation came to be.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1.2rem" }}>
            {CHAPTERS.map((ch, i) => (
              <motion.button
                key={ch.id}
                onClick={() => setOpenChapter(ch)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(10,28,18,.18)" }}
                style={{
                  background: card,
                  borderRadius: 22,
                  overflow: "hidden",
                  border: `1px solid ${dark ? "rgba(255,255,255,.06)" : "rgba(22,97,62,.09)"}`,
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  padding: 0,
                  transition: "transform .2s, box-shadow .2s",
                }}
              >
                {/* Card header with gradient */}
                <div style={{ background: ch.gradient, height: "7rem", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.25rem 1.5rem", position: "relative", overflow: "hidden" }}>
                  <img src={ch.photo} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", mixBlendMode: "overlay", opacity: 0.5 }} onError={e => { e.currentTarget.style.display = "none"; }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,.4) 0%, transparent 70%)" }} />
                  <span style={{ fontSize: "2.8rem", position: "relative", zIndex: 2 }}>{ch.icon}</span>
                  <div style={{ position: "relative", zIndex: 2, background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 999, padding: ".25em .7em" }}>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", fontWeight: 600, color: "#fff", letterSpacing: ".1em" }}>{ch.date}</span>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: "1.4rem" }}>
                  <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.35rem", fontWeight: 700, color: dark ? T.cream : T.greenD, lineHeight: 1.15, marginBottom: ".5rem" }}>
                    {ch.title}
                  </h3>
                  <p style={{ fontSize: ".88rem", color: dark ? "rgba(253,247,236,.6)" : T.p2, lineHeight: 1.6, marginBottom: "1rem" }}>
                    {ch.preview}
                  </p>
                  <span style={{ fontSize: ".8rem", fontWeight: 600, color: ch.color, display: "flex", alignItems: "center", gap: ".3rem" }}>
                    Read chapter →
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KEY DATES TIMELINE ─── */}
      <section style={{ padding: "clamp(3rem,8vw,6rem) 0", background: dark ? "#050505" : T.warmBg }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))", gap: "clamp(2rem,5vw,4rem)", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.gold, marginBottom: ".75rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
                Key Milestones <span style={{ display: "block", width: "3rem", height: "1.5px", background: T.gold }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: dark ? T.cream : T.greenD, lineHeight: 1.1, marginBottom: "1rem" }}>
                From 2017 to <em style={{ fontStyle: "italic", color: T.goldL }}>2092</em>
              </h2>
              <p style={{ fontSize: "clamp(.95rem,2vw,1.05rem)", color: dark ? "rgba(253,247,236,.65)" : T.p2, lineHeight: 1.72, maxWidth: "44ch" }}>
                Every milestone in KidsInspiring Nation's journey is a faith statement. From the first Sunday school session in 2017 to the 75-year vision of billions of goD-children.
              </p>
            </div>
            <TimelineSlider dark={dark} />
          </div>
        </div>
      </section>

      {/* ─── THREE PILLARS ─── */}
      <section style={{ padding: "clamp(4rem,10vw,7rem) 0", background: T.greenD }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,6vw,4rem)" }}>
            <div style={{ fontSize: ".76rem", fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: T.goldL, marginBottom: ".75rem" }}>
              How We Raise goDs
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: T.cream }}>
              Three Pillars
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 16rem), 1fr))", gap: "1.5rem" }}>
            {[
              { icon: "🔥", title: "Spirit", subtitle: "To God", desc: "Daily devotionals, Daniel Fast, goDxperience — building a deep, personal relationship with God is the first priority for every goD.", color: T.gold },
              { icon: "🧠", title: "Skills", subtitle: "In Themselves", desc: "P119 Academy, Psalm 119 National Values Challenge — equipping goDs with academic, character, and mind-capacity tools.", color: T.goldL },
              { icon: "🌍", title: "Service", subtitle: "To Nations", desc: "FACE, TJC, NBC — every goD is trained to serve their community, feed the hungry, and build their nation.", color: T.coral },
            ].map(p => (
              <div key={p.title} style={{ background: "rgba(253,247,236,.05)", border: "1px solid rgba(196,136,44,.12)", borderRadius: 22, padding: "2rem" }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(253,247,236,.08)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(253,247,236,.05)"}>
                <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "1rem" }}>{p.icon}</span>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 900, color: p.color, letterSpacing: "-0.02em", lineHeight: 1 }}>{p.title}</div>
                <div style={{ fontSize: ".72rem", color: "rgba(253,247,236,.5)", fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: ".75rem" }}>{p.subtitle}</div>
                <p style={{ fontSize: ".9rem", color: "rgba(253,247,236,.7)", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INVITATION ─── */}
      <section style={{ padding: "clamp(4rem,10vw,7rem) 0", background: bg, textAlign: "center" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1.25rem" }}>🌍</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, letterSpacing: "-0.025em", color: dark ? T.cream : T.greenD, marginBottom: "1rem" }}>
            Join Us In This Race
          </h2>
          <p style={{ fontSize: "clamp(1rem,2.2vw,1.1rem)", color: dark ? "rgba(253,247,236,.7)" : T.p2, lineHeight: 1.75, marginBottom: "2rem", maxWidth: "44ch", margin: "0 auto 2rem" }}>
            We invite everyone who is passionate about nation building, raising exceptional children, and bringing the Kingdom of God into our communities.
            <br /><br />
            <em style={{ fontFamily: "'Playfair Display',serif", fontWeight: 700, color: T.gold }}>#JesusChristisOurJOY</em>
          </p>
          <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://whatsapp.com/channel/0029Va8XnCuGE56c4SMaT41w" target="_blank" rel="noopener"
              style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 2.4em", borderRadius: 999, background: T.green, color: "#fff", fontWeight: 700, fontSize: "1rem", fontFamily: "'Plus Jakarta Sans',sans-serif", textDecoration: "none", transition: "filter .2s" }}
              onMouseEnter={e => e.currentTarget.style.filter = "brightness(.88)"}
              onMouseLeave={e => e.currentTarget.style.filter = "none"}>
              Join KIND Daily →
            </a>
            <a href="mailto:KidsinspiringNation@gmail.com"
              style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".9em 2.2em", borderRadius: 999, background: "transparent", color: T.gold, fontWeight: 600, fontSize: "1rem", border: `1.5px solid ${T.gold}`, textDecoration: "none", transition: "background .2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(196,136,44,.08)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Chapter Modal */}
      {openChapter && (
        <ChapterModal chapter={openChapter} onClose={() => setOpenChapter(null)} dark={dark} />
      )}
    </div>
  );
}
