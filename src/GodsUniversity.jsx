import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import "./godsUniversity.css";
import { T } from "./siteConfig.js";

export default function GodsUniversity({ dark }) {
  const bg = dark ? "#050508" : T.htmlDark;
  const altBg = dark ? "#0A0D15" : T.htmlDark2;
  const textColor = T.htmlText;

  const [tab, setTab] = useState("spirit");
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ parentName: "", childName: "", email: "", level: "", subject: "", phone: "", enrolledStatus: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  const containerVars = { animate: { transition: { staggerChildren: 0.1 } } };
  const itemVars = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    viewport: { once: true, margin: "-50px" }
  };

  const REGISTER_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdGHVOsyZBTq6ko-MdLCJtZV88CtqSmhDhJphMDONJceCm3DA/viewform";
  const PROSPECTUS_LINK = "https://www.canva.com/design/DAGbhF8ek5o/uFhNtEH_Z_q3l051t543ZQ/view?utm_content=DAGbhF8ek5o&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he877c76682";
  const PORTAL_LINK = "/gu/index.html";
  const PAYSTACK_LINK = "https://paystack.shop/kidsinspiring";
  const WHATSAPP_FREE = "https://wa.me/2348122673417?text=I%20am%20interested%20in%20the%20free%20academic%20mentoring%20for%20my%20child.";
  const FORM_EMAIL = "KidsInspiringOperations@gmail.com";
  const heroVerse = "\"As for these four children, God gave them knowledge and skill in all learning and wisdom.\"";
  const heroVerseRef = "— Daniel 1:17";
  const heroCopy = "goDs University develops the whole child through two complementary dimensions: Spirit for inner formation and Skills for outward excellence, so every child can grow into wise national service.";
  const heroEyebrow = "Spirit Formation · Skill Development · National Service";
  const heroStats = [
    { n: "2", l: "Dimensions" },
    { n: "1", l: "Shared Mission" },
    { n: "Weekly", l: "Live Formation" },
    { n: "Service", l: "End Goal" }
  ];
  const focusSignals = {
    spirit: ["Prayer", "Word Study", "Miracles", "Anointing", "Character", "Discipleship"],
    skills: ["Formulas", "Laws", "Words", "Logic", "Research", "Mastery"]
  };
  const focusConfig = {
    spirit: {
      ctaPrimary: "Choose Your Focus",
      ctaTarget: "gu-pathway-selector",
      ctaSecondary: "See How It Works",
      secondaryTarget: "gu-spirit-process",
      glow: "radial-gradient(circle at 50% 20%, rgba(232,196,67,.2), transparent 62%)",
      stats: [
        { n: "44", l: "Weeks" },
        { n: "3", l: "Bible Pathways" },
        { n: "300+", l: "Min/Week Target" },
        { n: "gPA", l: "Weekly Accountability" }
      ]
    },
    skills: {
      ctaPrimary: "Choose Your Focus",
      ctaTarget: "gu-pathway-selector",
      ctaSecondary: "See How It Works",
      secondaryTarget: "gu-skills-process",
      glow: "radial-gradient(circle at 50% 20%, rgba(83,148,255,.22), transparent 62%)",
      stats: [
        { n: "Weekly", l: "Live Sessions" },
        { n: "Monthly", l: "Parent Reports" },
        { n: "Gr 1–16", l: "All Levels" },
        { n: "₦7,000", l: "Per Month" }
      ]
    }
  };

  const scrollToSection = id => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFormSubmit = async e => {
    e.preventDefault(); setFormError(false);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "📚 New Academic Mentoring Interest — KIN",
          "Parent Name": formData.parentName,
          "Child Name": formData.childName,
          "Email Address": formData.email,
          "School Level": formData.level,
          "Subject Focus": formData.subject,
          "WhatsApp": formData.phone,
          "Already Enrolled at gU?": formData.enrolledStatus
        }),
      });
      if (res.ok) setFormSubmitted(true); else setFormError(true);
    } catch { setFormError(true); }
  };

  const SPIRIT_FAQ = [
    { q: "How much does the Spirit pathway cost?", a: "The Spirit pathway is ₦30,000 per month (subscription) or ₦250,000 per single session. The monthly subscription offers the best value for families committed to consistent spiritual growth." },
    { q: "What is goDs University Spirit pathway?", a: "It is a structured, 44-week spiritual curriculum for children aged 5–18 combining daily Bible reading, live weekly classes, instructor mentorship, and measurable accountability through our gPA scoring system." },
    { q: "Is this the same as Sunday school?", a: "No. goDs University is a full academic programme with enrolled pathways, weekly gPA scores, parent reports, and a dedicated portal. It is intentional, tracked, and consistent — not casual." },
    { q: "What are the three Bible pathways?", a: "Bible Basics (Ages 5–10) — story-based introduction to the whole Bible. New Testament (Ages 10–15) — systematic read-through from the Gospels to the Epistles. Old Testament (Ages 12–18) — deep engagement from Genesis through the Prophets." },
    { q: "How is gPA calculated?", a: "gPA stands for goD Points Average. Five habits are scored each week: Weekly Report, Time Sheet, Pathway (Bible chapters), Activity, and Attendance. Each is scored 0, 0.5, or 1 — the average becomes the weekly gPA score." },
    { q: "What is the Parent Portal?", a: "The Parent Portal is a dedicated login where parents see their child's weekly gPA score, instructor notes, a specific home action to reinforce learning, and term-wide progress — every single week." },
    { q: "How long is one full session?", a: "One session runs 44 weeks, with weekly live classes every Saturday. Children submit written reflections and a signed time sheet before each class." },
    { q: "What does my child need to do each week?", a: "Read their assigned Bible chapters daily (target: 300+ minutes/week), submit a written weekly reflection, complete a signed time sheet, and attend Saturday class live online." },
    { q: "How do I enrol my child?", a: "Open the Spirit section and choose Enrol, Prospectus, or Parent Portal depending on whether you are joining, reviewing details, or returning as an existing family." },
  ];

  const SKILLS_FAQ = [
    { q: "How much does gU Skills mentoring cost?", a: "Academic mentoring is ₦7,000 per month. This subscription ensures consistent progress and includes weekly sessions and monthly reports." },
    { q: "How often are sessions held?", a: "Sessions are held weekly, at an agreed time between you and your child's mentor. Monthly subscribers receive sessions every week throughout the month." },
    { q: "When do I receive my child's progress report?", a: "Monthly progress reports are sent directly to parents with mentor observations, growth notes, and one specific home action to reinforce progress." },
    { q: "What is free mentoring and how does my child qualify?", a: "Families whose total termly school fees are below ₦70,000 qualify for free academic mentoring. Reach out on WhatsApp and we will guide you through the process." },
    { q: "Who are the mentors?", a: "Our mentors are Covenant Servants of KidsInspiring Nation and volunteer professionals who are people of excellence in their respective fields — verified, trained, and accountable to KIN's values." },
    { q: "Can I cancel my subscription?", a: "Yes. Contact us on WhatsApp within 24 hours. We kindly ask for at least one week's notice before the next billing date." },
    { q: "Are sessions online or in-person?", a: "Sessions are conducted online for maximum accessibility, regardless of where you are located." },
    { q: "How is mentoring different from tutoring?", a: "Mentoring focuses on study habits, mindset, subject understanding, values, and character. Tutoring (coming soon) will focus on intensive, exam-specific preparation." },
  ];

  function GUFaqSection({ items, openFaq, setOpenFaq }) {
    return (
      <div style={{ display: "grid", gap: 10, marginTop: 32 }}>
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
            style={{ background: T.htmlCard, border: `1px solid ${openFaq === i ? "rgba(232,196,67,.3)" : "rgba(255,255,255,.08)"}`, borderRadius: 14, overflow: "hidden", transition: "border .2s" }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "18px 20px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: openFaq === i ? T.goldL : T.htmlText, lineHeight: 1.4 }}>{item.q}</span>
              <ChevronDown size={16} color={T.htmlText3} style={{ flexShrink: 0, transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform .25s" }} />
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                  style={{ overflow: "hidden" }}>
                  <div style={{ padding: "0 20px 18px", fontSize: 13, color: T.htmlText2, lineHeight: 1.75, borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 14 }}>
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="gu-page" style={{ background: bg, color: textColor, minHeight: "100vh" }}>
      
      {/* Hero Section */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 5vw 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 600, background: "radial-gradient(ellipse, rgba(232,196,67,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: focusConfig[tab].glow, pointerEvents: "none", transition: "background .35s ease" }} />
        
        <motion.div initial="initial" animate="whileInView" variants={containerVars} style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <motion.span variants={itemVars} className={`gu-hero-crown gu-hero-sigil gu-hero-sigil-${tab}`}>{tab === "spirit" ? "✦" : "∑"}</motion.span>
          <motion.h1 variants={itemVars} style={{ fontFamily: "Cinzel, serif", fontWeight: 900, lineHeight: 1, marginBottom: 10 }}>
            <span style={{ fontSize: "clamp(72px, 14vw, 140px)", display: "block", lineHeight: 0.92 }}>
              <span style={{ color: "#E8C443" }}>go</span>
              <span style={{ background: "linear-gradient(135deg, #8A6F1A 0%, #E8C443 40%, #F6DC74 60%, #E8C443 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textShadow: "0 10px 30px rgba(232,196,67,.14)" }}>D</span>
              <span style={{ color: "#E8C443" }}>s</span>
            </span>
            <span style={{ fontSize: "clamp(20px, 4vw, 38px)", display: "block", letterSpacing: 8, color: T.htmlText2 }}>University</span>
          </motion.h1>
          
          <motion.p variants={itemVars} style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: "clamp(16px, 2vw, 20px)", color: T.htmlText2, margin: "24px 0 8px", lineHeight: 1.6 }}>
            {heroVerse}
            <cite style={{ display: "block", fontSize: 11, letterSpacing: 2, color: T.htmlText3, marginTop: 8, fontStyle: "normal", textTransform: "uppercase" }}>{heroVerseRef}</cite>
          </motion.p>
          
          <motion.p variants={itemVars} style={{ fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: T.goldL, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <span>In Spirit</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.goldL, opacity: 0.5 }}></span>
            <span>By Skills</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.goldL, opacity: 0.5 }}></span>
            <span>For Service</span>
          </motion.p>

          <motion.p variants={itemVars} style={{ fontSize: 14, color: T.htmlText2, maxWidth: 560, margin: "0 auto 20px", lineHeight: 1.8 }}>
            {heroCopy}
          </motion.p>

          <motion.p variants={itemVars} style={{ fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: T.goldL, marginBottom: 28 }}>
            {heroEyebrow}
          </motion.p>

          <motion.div variants={itemVars} className="gu-focus-ribbon">
            {focusSignals[tab].map(signal => (
              <span key={signal} className={`gu-focus-pill gu-focus-pill-${tab}`}>{signal}</span>
            ))}
          </motion.div>

          <motion.div variants={itemVars} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 70 }}>
            <button type="button" onClick={() => scrollToSection(focusConfig[tab].ctaTarget)} className="gu-btn-gold">{focusConfig[tab].ctaPrimary} →</button>
            <button type="button" onClick={() => scrollToSection(focusConfig[tab].secondaryTarget)} className="gu-btn-outline">{focusConfig[tab].ctaSecondary}</button>
          </motion.div>

          <motion.div variants={itemVars} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, overflow: "hidden", background: "rgba(22,31,53,.6)", backdropFilter: "blur(10px)", maxWidth: 600, margin: "0 auto" }}>
            {heroStats.map(stat => (
              <div key={stat.l} className="gu-stat-block">
                <div style={{ fontFamily: "Cinzel, serif", fontSize: 28, fontWeight: 900, color: T.goldL }}>{stat.n}</div>
                <div style={{ fontSize: 11, color: T.htmlText3, letterSpacing: 1, marginTop: 3 }}>{stat.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Pathway Selector ───────────────────────────────────────── */}
      <section id="gu-pathway-selector" style={{ background: altBg, padding: "3rem 0", borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div className="gu-container" style={{ textAlign: "center" }}>
          <p className="gu-sec-label">Choose Your Focus</p>
          <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 700, color: T.htmlText, marginBottom: 8 }}>Spirit or Skills</h2>
          <p style={{ fontSize: 14, color: T.htmlText2, maxWidth: 680, margin: "0 auto 28px", lineHeight: 1.7 }}>Start with the dimension your child needs most right now. Spirit strengthens inner formation. Skills strengthens academic excellence. Both serve the same larger mission of raising wise, disciplined nation builders.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, maxWidth: 620, margin: "0 auto" }}>
            {[
              { key: "spirit", icon: "🕊️", title: "Spirit", sub: "Bible Literacy & Spiritual Formation", desc: "44-week structured curriculum · 3 pathways · gPA scoring · Parent Portal" },
              { key: "skills", icon: "🧠", title: "Skills", sub: "Academic Excellence & Mental Capacity", desc: "Weekly sessions · Mentor guidance · Monthly parent reports" },
            ].map(p => (
              <motion.button
                key={p.key}
                type="button"
                whileHover={{ scale: 1.02 }}
                onClick={() => setTab(p.key)}
                style={{
                  background: T.htmlCard,
                  border: tab === p.key ? `2px solid ${T.goldL}` : "2px solid rgba(255,255,255,.08)",
                  borderRadius: 20,
                  padding: "26px 18px",
                  textAlign: "center",
                  transition: "all .25s",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: tab === p.key ? "0 16px 40px rgba(232,196,67,.14)" : "none",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)"
                }}
              >
                {tab === p.key && (
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(232,196,67,.08), transparent 50%)", pointerEvents: "none" }} />
                )}
                <div style={{ fontSize: 36, marginBottom: 10 }}>{p.icon}</div>
                <div style={{ fontFamily: "Cinzel, serif", fontSize: 16, fontWeight: 700, color: T.goldL, marginBottom: 3 }}>{p.title}</div>
                <div style={{ fontSize: 10, color: T.goldL, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{p.sub}</div>
                <div style={{ fontSize: 11, color: T.htmlText3, lineHeight: 1.6 }}>{p.desc}</div>
                <div className="gu-card-tags">
                  {(p.key === "spirit" ? ["Prayer", "Word", "Miracles"] : ["Formulas", "Laws", "Words"]).map(tag => (
                    <span key={tag} className={`gu-focus-pill gu-focus-pill-${p.key}`}>{tag}</span>
                  ))}
                </div>
                <div style={{ marginTop: 16, fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: tab === p.key ? T.goldL : T.htmlText3, fontWeight: 700 }}>
                  {tab === p.key ? "Current Focus" : "Select Focus"}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {tab === "spirit" && (
          <motion.div key="spirit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>

      {/* About Section */}
      <section className="gu-section gu-container">
        <div className="gu-about-grid">
          <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }} variants={itemVars} className="gu-about-visual" style={{ position: "relative" }}>
            <div style={{ background: T.htmlCard, border: "1px solid rgba(255,255,255,.08)", borderRadius: 24, padding: 36, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(232,196,67,.06), transparent 60%, rgba(20,184,166,.04))", pointerEvents: "none" }} />
              
              <div style={{ position: "absolute", top: -20, right: -20, background: T.goldL, borderRadius: "50%", width: 80, height: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "Cinzel, serif", fontWeight: 900, boxShadow: "0 8px 24px rgba(232,196,67,.4)" }}>
                <div style={{ fontSize: 22, color: T.htmlDark, lineHeight: 1 }}>44</div>
                <div style={{ fontSize: 8, color: "rgba(8,13,30,.7)", letterSpacing: 1 }}>WEEKS</div>
              </div>

              <span style={{ fontSize: 56, textAlign: "center", display: "block", marginBottom: 20, filter: "drop-shadow(0 4px 16px rgba(232,196,67,.4))" }}>👑</span>
              
              <div style={{ borderLeft: `3px solid ${T.goldL}`, padding: "14px 20px", background: "rgba(232,196,67,.12)", borderRadius: "0 12px 12px 0", margin: "0 0 24px 0" }}>
                <p style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: 14, color: T.htmlText2, margin: 0 }}>
                  "Here am I and the children the LORD has given me. We are signs and symbols in Israel from the LORD Almighty."
                </p>
                <cite style={{ display: "block", fontSize: 11, color: T.htmlText3, fontStyle: "normal", letterSpacing: 1, marginTop: 6 }}>— ISAIAH 8:18</cite>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 10 }}>
                {[
                  { ic: "🕊️", t: "In Spirit", d: "Deep roots in God's Word daily" },
                  { ic: "⚙️", t: "By Skills", d: "Discipline, writing & consistency" },
                  { ic: "🌍", t: "For Service", d: "Building nations for God's glory" }
                ].map(p => (
                  <div key={p.t} style={{ background: T.htmlCard2, border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: "14px 10px", textAlign: "center" }}>
                    <div style={{ fontSize: 22, marginBottom: 6 }}>{p.ic}</div>
                    <div style={{ fontFamily: "Cinzel, serif", fontSize: 10, fontWeight: 700, color: T.goldL, letterSpacing: 1 }}>{p.t}</div>
                    <div style={{ fontSize: 10, color: T.htmlText3, marginTop: 4 }}>{p.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }} variants={itemVars}>
            <div className="gu-eyebrow">✶ Our Mission</div>
            <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
              Raising <em style={{ fontStyle: "normal", color: T.goldL }}>Nation Builders</em><br />for God's Kingdom
            </h2>
            <p style={{ color: T.htmlText2, fontSize: 15, marginBottom: 18 }}>
              goDs University is a structured, 44-week spiritual curriculum for children aged 5–18 — combining daily Bible reading, live weekly classes, instructor mentorship and measurable accountability to build lifelong habits in God's Word.
            </p>
            <p style={{ color: T.htmlText2, fontSize: 15, marginBottom: 18 }}>
              It is not a Sunday school. It is a full academic programme where children are enrolled in a specific Bible pathway, tracked weekly with our gPA scoring system, and supported by parents through a dedicated portal.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", margin: "24px 0 18px" }}>
              <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-gold">Enrol a Genius →</a>
              <a href={PROSPECTUS_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-outline">Prospectus</a>
              <a href={PORTAL_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-outline">Parent Portal →</a>
            </div>
            <div style={{ borderLeft: `3px solid ${T.goldL}`, padding: "14px 20px", background: "rgba(232,196,67,.12)", borderRadius: "0 12px 12px 0", margin: "24px 0" }}>
              <p style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: 14, color: T.htmlText2, margin: 0 }}>
                "Train up a child in the way he should go; even when he is old he will not depart from it."
              </p>
              <cite style={{ display: "block", fontSize: 11, color: T.htmlText3, fontStyle: "normal", letterSpacing: 1, marginTop: 6 }}>— PROVERBS 22:6</cite>
            </div>
            <p style={{ color: T.htmlText2, fontSize: 15, margin: 0 }}>
              Every week builds on the last — 44 weeks, three pathways, one mission: raising a generation who know God's Word not by accident, but by design.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pathways Section */}
      <section className="gu-section" style={{ background: altBg }}>
        <div className="gu-container">
          <p className="gu-sec-label">Curriculum</p>
          <h2 className="gu-sec-title" style={{ color: T.htmlText }}>Three Pathways</h2>
          <p className="gu-sec-sub">
            Children are placed into the pathway that matches their age, reading level and spiritual readiness. 
            Each is a complete, structured curriculum covering the entire Bible over multiple sessions.
          </p>

          <div className="gu-pathways-grid">
            {[
              {
                ages: "Ages 5–10", ic: "📖", name: "Bible Basics", abbr: "BB · Foundation",
                desc: "A story-based introduction to the whole Bible from Creation to Revelation. Children engage with key narratives, learn to love reading God's Word, and build a strong foundation of scripture knowledge through weekly discussions and activities.",
                tags: ["Creation", "The Patriarchs", "Exodus", "The Gospels", "Acts"]
              },
              {
                ages: "Ages 10–15", ic: "✝️", name: "New Testament", abbr: "NT · The Life of Christ",
                desc: "A systematic read-through of the New Testament — from the Gospels through Paul's epistles. Students learn the life and teachings of Jesus, the early church's story in Acts, and foundational Christian doctrine for daily living.",
                tags: ["Matthew", "Luke & John", "Acts", "Romans", "Epistles"]
              },
              {
                ages: "Ages 12–18", ic: "📜", name: "Old Testament", abbr: "OT · The Full Narrative",
                desc: "A deep engagement with the Old Testament — from Genesis through the Prophets. Students explore Israel's history, the wisdom literature of Psalms and Proverbs, and prophetic writings to understand God's redemptive plan for humanity.",
                tags: ["Genesis", "Exodus", "Psalms", "Isaiah", "Daniel"]
              }
            ].map((pw, i) => (
              <motion.div 
                key={pw.name}
                initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }
                }}
                className="gu-pathway-card"
              >
                <div className="gu-pw-ages" style={{ position: "absolute", top: 18, right: 18, fontSize: 11, color: T.htmlText3, background: T.htmlCard2, border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "4px 10px", fontWeight: 600 }}>{pw.ages}</div>
                <span className="gu-pw-ic" style={{ fontSize: 52, display: "block", marginBottom: 20 }}>{pw.ic}</span>
                <div className="gu-pw-name" style={{ fontFamily: "Cinzel, serif", fontSize: 22, fontWeight: 700, color: T.goldL, marginBottom: 4 }}>{pw.name}</div>
                <div style={{ fontSize: 11, letterSpacing: 3, color: T.htmlText3, textTransform: "uppercase", marginBottom: 18 }}>{pw.abbr}</div>
                <p style={{ fontSize: 14, color: T.htmlText2, lineHeight: 1.75, margin: "0 0 22px 0" }}>{pw.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                  {pw.tags.map(tag => (
                    <span key={tag} style={{ background: "rgba(232,196,67,.07)", border: "1px solid rgba(232,196,67,.15)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: T.htmlText3 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="gu-spirit-process" className="gu-section">
        <div className="gu-container">
          <p className="gu-sec-label">The Process</p>
          <h2 className="gu-sec-title" style={{ color: T.htmlText }}>How It Works</h2>
          <p className="gu-sec-sub">
            A simple, repeatable weekly rhythm. Five habits, consistently practised over 44 weeks, build a child who is rooted, disciplined and full of God's Word.
          </p>

          <div className="gu-steps-grid">
            {[
              { n: 1, t: "Daily Reading", d: "Each child reads their assigned Bible chapters daily according to their pathway. Target: 300+ minutes per week logged." },
              { n: 2, t: "Weekly Class", d: "Live online class every Saturday. Instructors discuss the reading, ask questions and mentor each child personally." },
              { n: 3, t: "Submit Reports", d: "Children submit a written weekly reflection and a signed time sheet logging their daily reading minutes before Sunday." },
              { n: 4, t: "gPA Scored", d: "Report, Time Sheet, Pathway, Activity and Attendance are each scored. The average becomes the weekly gPA score." },
              { n: 5, t: "Parent Portal", d: "Parents log in to see scores, instructor notes, a specific action to take this week, and term-wide progress." }
            ].map((s, i) => (
              <motion.div 
                key={s.n}
                initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }
                }}
                className="gu-step-col"
              >
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.goldL, color: T.htmlDark, fontFamily: "Cinzel, serif", fontSize: 18, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", position: "relative", zIndex: 1, boxShadow: "0 4px 20px rgba(232,196,67,.35)" }}>
                  {s.n}
                </div>
                <div style={{ fontFamily: "Cinzel, serif", fontSize: 13, fontWeight: 700, color: T.htmlText, marginBottom: 8 }}>{s.t}</div>
                <p style={{ fontSize: 12, color: T.htmlText3, lineHeight: 1.6 }}>{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* gPA Scoring System */}
      <section className="gu-section" style={{ background: altBg }}>
        <div className="gu-container">
          <p className="gu-sec-label">Accountability</p>
          <h2 className="gu-sec-title" style={{ color: T.htmlText }}>The gPA System</h2>
          <p className="gu-sec-sub">goD Points Average — five habits scored weekly, visible to parents and children, building a culture of joyful accountability.</p>

          <div className="gu-gpa-grid">
            {/* Left: Score Card */}
            <div>
              <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }} variants={itemVars} className="gu-gpa-demo" style={{ background: T.htmlCard, border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 28, textAlign: "center" }}>
                <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 16px" }}>
                  <svg viewBox="0 0 160 160" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="80" cy="80" r="58" fill="none" stroke="rgba(128,128,128,.1)" strokeWidth="14" />
                    <circle cx="80" cy="80" r="58" fill="none" stroke="url(#gg-gu)" strokeWidth="14" strokeDasharray="364.4" strokeDashoffset="91" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gg-gu" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8A6F1A" />
                        <stop offset="50%" stopColor="#E8C443" />
                        <stop offset="100%" stopColor="#F6DC74" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: "Cinzel, serif", fontSize: 32, fontWeight: 900, color: T.goldL }}>75%</div>
                    <div style={{ fontSize: 11, color: T.htmlText3, letterSpacing: 2, marginTop: 2 }}>WEEK 6</div>
                  </div>
                </div>
                <div style={{ display: "inline-block", background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.25)", borderRadius: 8, padding: "5px 14px", fontFamily: "Cinzel, serif", fontSize: 13, color: "#14B981", fontWeight: 700, marginBottom: 6 }}>
                  Good ◇
                </div>
                <p style={{ fontSize: 12, color: T.htmlText3, marginTop: 6 }}>Sample — Olohi Iyoko · gOEI</p>
              </motion.div>

              <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }} variants={itemVars} style={{ marginTop: 16, padding: 16, background: "rgba(232,196,67,.12)", border: "1px solid rgba(232,196,67,.2)", borderRadius: 12 }}>
                <h4 style={{ fontFamily: "Cinzel, serif", fontSize: 12, color: T.goldL, letterSpacing: 2, marginBottom: 10 }}>SCORING KEY</h4>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["1.0 = Fully Done", "0.5 = Partial", "0 = Not Done"].map(k => (
                    <div key={k} style={{ background: T.htmlCard, border: "1px solid rgba(255,255,255,.08)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: T.htmlText2 }}>
                      {k}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: T.htmlText3, marginTop: 10, lineHeight: 1.6 }}>
                  80%+ = Excellent &nbsp;·&nbsp; 60–79% = Good &nbsp;·&nbsp; 40–59% = Fair &nbsp;·&nbsp; &lt;40% = Needs Support
                </p>
              </motion.div>
            </div>

            {/* Right: Detailed Categories */}
            <div style={{ display: "grid", gap: 14 }}>
              {[
                { ic: "📋", n: "Weekly Report", d: "Written reflection on what was studied. Builds the discipline of documentation, communication and accountability that every nation builder needs.", v: "100%", c: "#14B981" },
                { ic: "⏱️", n: "Time Sheet", d: "Daily log of reading sessions in minutes. If you cannot measure it, you cannot grow it. Signed and submitted before class each week.", v: "50%", c: "#F59E0B" },
                { ic: "📖", n: "Pathway (Word Challenge)", d: "Completion of the assigned Bible chapters — the core spiritual curriculum. Reading with understanding, not just coverage, is what the instructor assesses in class.", v: "100%", c: "#14B981" },
                { ic: "🎯", n: "Activity", d: "Class discussions, parables, memory work and exercises. Active engagement shows genuine understanding — this is where learning becomes application.", v: "100%", c: "#14B981" },
                { ic: "📡", n: "Attendance", d: "Present, on time, camera on, fully engaged. The foundation everything else builds on. Consistent attendance is the single strongest predictor of growth.", v: "50%", c: "#F59E0B" }
              ].map((c, i) => (
                <motion.div 
                  key={c.n}
                  initial="initial" whileInView="whileInView" viewport={{ once: true }}
                  variants={{
                    initial: { opacity: 0, x: 20 },
                    whileInView: { opacity: 1, x: 0, transition: { duration: 0.5, delay: i * 0.1 } }
                  }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: 14, background: T.htmlCard2, border: "1px solid rgba(255,255,255,.08)", borderRadius: 12 }}
                >
                  <div style={{ fontSize: 20, width: 32, textAlign: "center", flexShrink: 0, paddingTop: 2 }}>{c.ic}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.htmlText, marginBottom: 3 }}>{c.n}</div>
                    <div style={{ fontSize: 12, color: T.htmlText3, lineHeight: 1.5, marginBottom: 7 }}>{c.d}</div>
                    <div style={{ height: 5, background: T.htmlCard3, borderRadius: 3, overflow: "hidden" }}>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: c.v }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.2 + (i * 0.1) }} style={{ height: "100%", borderRadius: 3, background: c.c }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Parent Portal Preview */}
      <section className="gu-section">
        <div className="gu-container">
          <p className="gu-sec-label">For Parents</p>
          <h2 className="gu-sec-title" style={{ color: T.htmlText }}>The Parent Portal</h2>
          <p className="gu-sec-sub">
            Log in every week to see exactly how your child is doing, what the instructor observed, and one specific action you can take at home.
          </p>

          <motion.div initial="initial" whileInView="whileInView" viewport={{ once: true }} variants={itemVars} style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ background: T.htmlCard, border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,.7), 0 0 0 1px rgba(255,255,255,.04)" }}>
              <div style={{ background: "rgba(8,13,30,.8)", padding: "12px 18px", borderBottom: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "Cinzel, serif", fontSize: 13, fontWeight: 700 }}>gU · Portal v7</span>
                  <span style={{ background: "rgba(232,196,67,.12)", border: "1px solid rgba(232,196,67,.25)", borderRadius: 5, padding: "3px 9px", fontSize: 10, color: T.goldL, fontWeight: 700 }}>Wk 6 · 2025</span>
                  <span style={{ background: "rgba(20,184,166,.1)", border: "1px solid rgba(20,184,166,.25)", borderRadius: 5, padding: "3px 9px", fontSize: 10, color: "#14B981", fontWeight: 700 }}>● Live</span>
                </div>
                <span style={{ fontSize: 11, color: T.htmlText3 }}>Olohi Iyoko · gOEI</span>
              </div>
              
              <div style={{ padding: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ background: T.htmlCard2, border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: T.htmlText3, marginBottom: 10 }}>Latest Week Score</div>
                  <div style={{ fontFamily: "Cinzel, serif", fontSize: 48, fontWeight: 900, color: T.goldL, lineHeight: 1, marginBottom: 6 }}>80%</div>
                  <div style={{ display: "inline-block", background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 6, padding: "3px 10px", fontSize: 11, color: "#14B981", fontWeight: 700 }}>Excellent ✦</div>
                  <div style={{ fontSize: 11, color: "#14B981", marginTop: 8 }}>↑ Up 40% from Week 5</div>
                </div>

                <div style={{ background: "linear-gradient(135deg, rgba(232,196,67,.1), rgba(232,196,67,.03))", border: "1px solid rgba(232,196,67,.25)", borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, color: T.goldL, textTransform: "uppercase", marginBottom: 8 }}>🎯 Do This Today — Week 6</div>
                  <div style={{ fontSize: 12, color: T.htmlText2, lineHeight: 1.65 }}>
                    Olohi had an excellent week scoring 80%! Celebrate with her. Next class: Mar 21. Encourage her to keep the momentum in Genesis Chapters 7–9.
                  </div>
                </div>

                <div style={{ gridColumn: "1 / -1", background: T.htmlCard2, border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, padding: 14 }}>
                  <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: T.htmlText3, marginBottom: 10 }}>Category Breakdown</div>
                  <div className="gu-ds-cats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginTop: 8 }}>
                    {[
                      { l: "Report", v: "✓", c: "#14B981" },
                      { l: "TimeSheet", v: "✓", c: "#14B981" },
                      { l: "Pathway", v: "✓", c: "#14B981" },
                      { l: "Activity", v: "✓", c: "#14B981" },
                      { l: "Attend.", v: "◑", c: "#F59E0B" }
                    ].map(st => (
                      <div key={st.l} style={{ textAlign: "center", background: T.htmlCard3, borderRadius: 8, padding: "8px 4px" }}>
                        <div style={{ fontSize: 9, color: T.htmlText3, marginBottom: 4 }}>{st.l}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: st.c }}>{st.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Portal Features Grid */}
          <div className="gu-portal-features">
            {[
              { ic: "📅", t: "Weekly Snapshot", d: "Full breakdown of every week — scores, minutes, instructor notes" },
              { ic: "🎯", t: "Do This Today", d: "One specific parent action every week — no guesswork" },
              { ic: "👨👩👧👦", t: "Family View", d: "All your children's scores side by side in one tab" },
              { ic: "🏅", t: "Achievement Badges", d: "Downloadable certificates when milestones are reached" },
              { ic: "📊", t: "Class Comparison", d: "See your child's score vs. the class average each week" },
              { ic: "🤖", t: "AI Term Summary", d: "AI-generated analysis of your child's full term performance" }
            ].map((f, i) => (
              <motion.div 
                key={f.t}
                initial="initial" whileInView="whileInView" viewport={{ once: true }}
                variants={{
                  initial: { opacity: 0, y: 15 },
                  whileInView: { opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } }
                }}
                style={{ background: T.htmlCard, border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, padding: 20, textAlign: "center", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,196,67,.2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 26, marginBottom: 10 }}>{f.ic}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.htmlText, marginBottom: 4 }}>{f.t}</div>
                <div style={{ fontSize: 12, color: T.htmlText3, lineHeight: 1.5 }}>{f.d}</div>
              </motion.div>
            ))}
          </div>
          
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href={PORTAL_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-gold">Access Parent Portal →</a>
          </div>
        </div>
      </section>

      {/* Testimonies */}
      <section className="gu-section" style={{ background: altBg }}>
        <div className="gu-container">
          <p className="gu-sec-label">Testimonies</p>
          <h2 className="gu-sec-title" style={{ color: T.htmlText }}>What Parents Say</h2>
          <p className="gu-sec-sub">Families experiencing the fruit of raising children intentionally in God's Word.</p>
          
          <div className="gu-testimonies-grid">
            {[
              {
                q: "My daughter used to need reminders every day. Now she picks up her Bible before I even ask. The consistency of goDs University has completely changed our home rhythm.",
                av: "A", n: "Parent of Olohi", r: "Old Testament Pathway · Session 2025"
              },
              {
                q: "Watching my son explain a parable to his younger sibling with such confidence — that is the fruit. goDs University builds knowledge and character at the same time.",
                av: "M", n: "Parent of Samuel", r: "Old Testament Pathway · Session 2025"
              },
              {
                q: "The Parent Portal changed everything. I know exactly what she read, what the instructor said, and what to reinforce at home each week. I feel genuinely involved now.",
                av: "T", n: "Parent of Talia", r: "New Testament Pathway · Session 2025"
              }
            ].map((t, i) => (
              <motion.div 
                key={t.n}
                initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}
                variants={{
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } }
                }}
                style={{ background: T.htmlCard, border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, padding: 30, position: "relative", overflow: "hidden", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,196,67,.2)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #8A6F1A, #E8C443, #F6DC74, transparent)" }} />
                <div style={{ fontFamily: "Georgia, serif", fontSize: 80, color: "rgba(232,196,67,.08)", position: "absolute", top: 8, left: 16, lineHeight: 1 }}>"</div>
                <p style={{ fontSize: 14, color: T.htmlText2, lineHeight: 1.8, marginBottom: 20, position: "relative" }}>{t.q}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: T.goldD, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Cinzel, serif", fontSize: 15, fontWeight: 700, color: T.htmlDark, flexShrink: 0 }}>
                    {t.av}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.htmlText }}>{t.n}</div>
                    <div style={{ fontSize: 11, color: T.htmlText3, marginTop: 2 }}>{t.r}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Spirit Pricing */}
      <section className="gu-section" style={{ background: altBg }}>
        <div className="gu-container">
          <p className="gu-sec-label">Subscription</p>
          <h2 className="gu-sec-title" style={{ color: T.htmlText }}>Simple, Honest Pricing</h2>
          <p className="gu-sec-sub">One clear plan. No hidden fees. Cancel anytime. Excellence at every level.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 780, margin: "0 auto 28px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              style={{ background: "rgba(232,196,67,.06)", border: "2px solid rgba(232,196,67,.4)", borderRadius: 24, padding: 32, position: "relative", overflow: "hidden", boxShadow: "0 0 0 1px rgba(232,196,67,.1), 0 12px 40px rgba(232,196,67,.06)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #E8C443, transparent)" }} />
              <div style={{ display: "inline-block", background: "rgba(232,196,67,.15)", border: "1px solid rgba(232,196,67,.3)", borderRadius: 6, padding: "4px 12px", fontSize: 11, color: T.goldL, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>BEST VALUE ✦</div>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: 22, fontWeight: 700, color: T.htmlText, marginBottom: 8 }}>Monthly Subscription</div>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: 42, fontWeight: 900, color: T.goldL, lineHeight: 1, marginBottom: 4 }}>₦30,000</div>
              <div style={{ fontSize: 12, color: T.htmlText3, marginBottom: 24 }}>per month · weekly classes included</div>
              {["Weekly live classes", "Pathway assigned", "Weekly report scoring", "Parent portal access", "Character & values integration", "gPA tracking"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: "#14B981", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: T.htmlText2 }}>{f}</span>
                </div>
              ))}
              <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-gold" style={{ display: "block", textAlign: "center", marginTop: 24 }}>Subscribe Now →</a>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              style={{ background: T.htmlCard, border: "2px solid rgba(232,196,67,.2)", borderRadius: 24, padding: 32, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(232,196,67,.4), transparent)" }} />
              <div style={{ display: "inline-block", background: "rgba(232,196,67,.08)", border: "1px solid rgba(232,196,67,.2)", borderRadius: 6, padding: "4px 12px", fontSize: 11, color: T.goldL, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>PER SESSION</div>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: 22, fontWeight: 700, color: T.htmlText, marginBottom: 8 }}>Single Session</div>
              <div style={{ fontFamily: "Cinzel, serif", fontSize: 42, fontWeight: 900, color: T.goldL, lineHeight: 1, marginBottom: 4 }}>₦250,000</div>
              <div style={{ fontSize: 12, color: T.htmlText3, marginBottom: 24 }}>per session · pay as you go</div>
              {["One focused session", "No commitment required", "Same instructor quality", "Ideal for assessments", "Subject-specific focus"].map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ color: T.goldL, fontSize: 14, fontWeight: 700, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 13, color: T.htmlText2 }}>{f}</span>
                </div>
              ))}
              <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-outline" style={{ display: "block", textAlign: "center", marginTop: 24 }}>Book a Session →</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spirit FAQ */}
      <section className="gu-section" style={{ background: bg }}>
        <div className="gu-container" style={{ maxWidth: 720 }}>
          <p className="gu-sec-label">Questions</p>
          <h2 className="gu-sec-title" style={{ color: T.htmlText }}>Frequently Asked</h2>
          <p className="gu-sec-sub">Everything you need to know about the goDs University Spirit pathway — pathways, gPA, the Portal, and how to enrol.</p>
          <GUFaqSection items={SPIRIT_FAQ} openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="gu-section" style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(232,196,67,.07), transparent 70%)", pointerEvents: "none" }} />
        
        <div className="gu-container" style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 900, marginBottom: 18, lineHeight: 1.1 }}>Ready to Raise<br />a Nation Builder?</h2>
          <p style={{ fontSize: 17, color: T.htmlText2, maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.85 }}>
            Join a community of families committed to raising children who know God's Word — not by accident, but by design.
          </p>
          
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <a href={REGISTER_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-gold">Enrol a Genius</a>
            <a href={PORTAL_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-outline">Parent Portal →</a>
          </div>

          <p style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: 14, color: T.htmlText3, lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
            "From childhood you have known the sacred scriptures, which are able to make you wise for salvation through faith in Christ Jesus."
            <cite style={{ display: "block", fontSize: 11, letterSpacing: 2, color: T.htmlText3, marginTop: 6, fontStyle: "normal" }}>— 2 TIMOTHY 3:15</cite>
          </p>
        </div>
      </section>
          </motion.div>
        )}

        {tab === "skills" && (
          <motion.div key="skills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>

            {/* Skills Hero */}
            <section className="gu-section" style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(232,196,67,.06), transparent 70%)", pointerEvents: "none" }} />
              <div className="gu-container" style={{ position: "relative", zIndex: 1 }}>
                <p className="gu-sec-label">Skills Pathway</p>
                <h2 className="gu-sec-title" style={{ color: T.htmlText }}>Academic Excellence,<br />God's Way</h2>
                <p className="gu-sec-sub">"Do you see someone skilled in their work? They will serve before kings." — Proverbs 22:29<br /><br />Every child is called to excellence — not just in spirit, but in mind. We pair your child with a dedicated mentor who combines subject mastery with godly character.</p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", margin: "32px 0 36px" }}>
                  <a href={PAYSTACK_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-gold">Subscribe Directly — ₦7,000/mo →</a>
                  <a href={WHATSAPP_FREE} target="_blank" rel="noopener noreferrer" className="gu-btn-outline">Check Free Eligibility</a>
                </div>
                <div style={{ display: "flex", justifyContent: "center", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, overflow: "hidden", background: "rgba(22,31,53,.6)", backdropFilter: "blur(10px)", maxWidth: 560, margin: "0 auto" }}>
                  {[{ n: "₦7,000", l: "Per Month" }, { n: "Weekly", l: "Sessions" }, { n: "Monthly", l: "Reports" }, { n: "Gr 1–16", l: "All Levels" }].map(s => (
                    <div key={s.l} className="gu-stat-block">
                      <div style={{ fontFamily: "Cinzel, serif", fontSize: 20, fontWeight: 900, color: T.goldL }}>{s.n}</div>
                      <div style={{ fontSize: 11, color: T.htmlText3, letterSpacing: 1, marginTop: 3 }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Student Levels */}
            <section className="gu-section" style={{ background: altBg }}>
              <div className="gu-container">
                <p className="gu-sec-label">Who We Mentor</p>
                <h2 className="gu-sec-title" style={{ color: T.htmlText }}>All School Levels</h2>
                <p className="gu-sec-sub">Whether your child is just starting primary school or preparing for university, we have a mentor matched to their level and goals.</p>
                <div className="gu-pathways-grid">
                  {[
                    { lv: "Primary", grades: "Grades 1–6", ic: "📖", desc: "Building strong foundations — reading comprehension, numeracy, basic science, and the study habits that set children up for life.", tags: ["English Language", "Mathematics", "Basic Science", "Social Studies", "Civic Education"] },
                    { lv: "Secondary", grades: "Grades 7–11", ic: "✝️", desc: "Navigating secondary school with confidence — subject mastery, exam strategies, and the character to perform under pressure.", tags: ["English", "Mathematics", "Sciences", "Economics", "Literature"] },
                    { lv: "Tertiary / A-Level", grades: "Grades 12–16", ic: "📜", desc: "University entry preparation, advanced subject mastery, research skills, and the excellence mindset that sets nation builders apart.", tags: ["University Prep", "Advanced Sciences", "Study Skills", "Research Methods", "All Subjects"] },
                  ].map((lv, i) => (
                    <motion.div key={lv.lv} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.15 }} className="gu-pathway-card">
                      <div className="gu-pw-ages" style={{ position: "absolute", top: 18, right: 18, fontSize: 11, color: T.htmlText3, background: T.htmlCard2, border: "1px solid rgba(255,255,255,.08)", borderRadius: 8, padding: "4px 10px", fontWeight: 600 }}>{lv.grades}</div>
                      <span style={{ fontSize: 52, display: "block", marginBottom: 20 }}>{lv.ic}</span>
                      <div style={{ fontFamily: "Cinzel, serif", fontSize: 22, fontWeight: 700, color: T.goldL, marginBottom: 14 }}>{lv.lv}</div>
                      <p style={{ fontSize: 14, color: T.htmlText2, lineHeight: 1.75, margin: "0 0 22px 0" }}>{lv.desc}</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                        {lv.tags.map(t => <span key={t} style={{ background: "rgba(232,196,67,.07)", border: "1px solid rgba(232,196,67,.15)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: T.htmlText3 }}>{t}</span>)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* REMAINING SECTIONS PLACEHOLDER */}

            {/* How It Works */}
            <section id="gu-skills-process" className="gu-section">
              <div className="gu-container">
                <p className="gu-sec-label">The Process</p>
                <h2 className="gu-sec-title" style={{ color: T.htmlText }}>How It Works</h2>
                <p className="gu-sec-sub">Five simple steps — from sign-up to measurable academic improvement, built on consistency, character, and care.</p>
                <div className="gu-steps-grid">
                  {[
                    { n: 1, t: "Register", d: "Choose Subscribe Directly or fill the interest form below. We confirm enrolment within 24 hours." },
                    { n: 2, t: "Assessment", d: "Your mentor assesses your child's current level, learning gaps, and academic goals in a short introductory session." },
                    { n: 3, t: "Matched", d: "Your child is matched with a mentor who excels in their subject area and models faith, excellence, and service." },
                    { n: 4, t: "Weekly Sessions", d: "Live, structured online sessions every week at an agreed time — accessible from anywhere." },
                    { n: 5, t: "Monthly Report", d: "Parents receive a detailed monthly report with mentor observations, growth notes, and one specific action to reinforce at home." },
                  ].map((s, i) => (
                    <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.1 }} className="gu-step-col">
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.goldL, color: T.htmlDark, fontFamily: "Cinzel, serif", fontSize: 18, fontWeight: 900, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", boxShadow: "0 4px 20px rgba(232,196,67,.35)" }}>{s.n}</div>
                      <div style={{ fontFamily: "Cinzel, serif", fontSize: 13, fontWeight: 700, color: T.htmlText, marginBottom: 8 }}>{s.t}</div>
                      <p style={{ fontSize: 12, color: T.htmlText3, lineHeight: 1.6 }}>{s.d}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Pricing */}
            <section className="gu-section" style={{ background: altBg }}>
              <div className="gu-container">
                <p className="gu-sec-label">Subscription</p>
                <h2 className="gu-sec-title" style={{ color: T.htmlText }}>Simple, Honest Pricing</h2>
                <p className="gu-sec-sub">One clear plan. No hidden fees. Cancel anytime. Excellence at every level.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 680, margin: "0 auto 28px" }}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ background: "rgba(232,196,67,.06)", border: "2px solid rgba(232,196,67,.4)", borderRadius: 24, padding: 32, position: "relative", overflow: "hidden", boxShadow: "0 0 0 1px rgba(232,196,67,.1), 0 12px 40px rgba(232,196,67,.06)" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, #E8C443, transparent)" }} />
                    <div style={{ display: "inline-block", background: "rgba(232,196,67,.15)", border: "1px solid rgba(232,196,67,.3)", borderRadius: 6, padding: "4px 12px", fontSize: 11, color: T.goldL, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>ACTIVE ✦</div>
                    <div style={{ fontFamily: "Cinzel, serif", fontSize: 22, fontWeight: 700, color: T.htmlText, marginBottom: 8 }}>Academic Mentoring</div>
                    <div style={{ fontFamily: "Cinzel, serif", fontSize: 42, fontWeight: 900, color: T.goldL, lineHeight: 1, marginBottom: 4 }}>₦7,000</div>
                    <div style={{ fontSize: 12, color: T.htmlText3, marginBottom: 24 }}>per month</div>
                    {["Weekly live sessions", "Subject-specific mentoring", "Monthly progress report", "Mentor notes & parent update", "Character & values integration", "Grades 1–16 · All levels"].map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <span style={{ color: "#14B981", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: 13, color: T.htmlText2 }}>{f}</span>
                      </div>
                    ))}
                    <a href={PAYSTACK_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-gold" style={{ display: "block", textAlign: "center", marginTop: 24 }}>Subscribe Directly →</a>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
                    style={{ background: T.htmlCard, border: "2px solid rgba(255,255,255,.06)", borderRadius: 24, padding: 32, position: "relative", opacity: 0.65 }}>
                    <div style={{ display: "inline-block", background: "rgba(74,96,128,.2)", border: "1px solid rgba(74,96,128,.3)", borderRadius: 6, padding: "4px 12px", fontSize: 11, color: T.htmlText3, fontWeight: 700, letterSpacing: 1, marginBottom: 16 }}>COMING SOON 🔜</div>
                    <div style={{ fontFamily: "Cinzel, serif", fontSize: 22, fontWeight: 700, color: T.htmlText3, marginBottom: 8 }}>Tutoring</div>
                    <div style={{ fontFamily: "Cinzel, serif", fontSize: 42, fontWeight: 900, color: T.htmlText3, lineHeight: 1, marginBottom: 4 }}>TBD</div>
                    <div style={{ fontSize: 12, color: T.htmlText3, marginBottom: 24 }}>per month</div>
                    {["1-on-1 intensive sessions", "Exam-specific preparation", "Grade-targeted curriculum", "Weekly performance tracking", "Subject deep-dives"].map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                        <span style={{ color: T.htmlText3, fontSize: 14, flexShrink: 0 }}>○</span>
                        <span style={{ fontSize: 13, color: T.htmlText3 }}>{f}</span>
                      </div>
                    ))}
                    <div style={{ textAlign: "center", marginTop: 24, padding: "13px 28px", borderRadius: 999, background: "rgba(255,255,255,.04)", color: T.htmlText3, fontSize: 14, fontWeight: 600, border: "1px solid rgba(255,255,255,.08)" }}>Notify me when available</div>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                  style={{ background: "rgba(20,185,129,.06)", border: "1px solid rgba(20,185,129,.25)", borderRadius: 18, padding: "22px 28px", maxWidth: 680, margin: "0 auto", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 32, flexShrink: 0 }}>🌱</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Cinzel, serif", fontSize: 14, fontWeight: 700, color: "#14B981", marginBottom: 4 }}>Free Mentoring — For Qualifying Families</div>
                    <p style={{ fontSize: 13, color: T.htmlText2, lineHeight: 1.65, margin: 0 }}>If your family's total termly school fees are below <strong style={{ color: T.htmlText }}>₦70,000</strong>, your child qualifies for <strong style={{ color: "#14B981" }}>free academic mentoring</strong>. No child should be left behind because of finances.</p>
                  </div>
                  <a href={WHATSAPP_FREE} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 999, background: "rgba(20,185,129,.15)", border: "1px solid rgba(20,185,129,.35)", color: "#14B981", fontWeight: 700, fontSize: 13, textDecoration: "none", flexShrink: 0, transition: "all .2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(20,185,129,.25)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(20,185,129,.15)"}>
                    Check Eligibility →
                  </a>
                </motion.div>
              </div>
            </section>

            {/* MENTORS + TESTIMONIALS + FORM + FAQ PLACEHOLDER */}

            {/* Who Are Our Mentors */}
            <section className="gu-section">
              <div className="gu-container">
                <p className="gu-sec-label">Our People</p>
                <h2 className="gu-sec-title" style={{ color: T.htmlText }}>Who Are Our Mentors?</h2>
                <p className="gu-sec-sub">Every mentor is a person of excellence in their field — verified, trained, and fully accountable to KIN's values of character, faith, and service.</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginTop: 36 }}>
                  {[
                    { ic: "🕊️", t: "Covenant Servants", d: "Trained KIN volunteers committed to character, faith, and service — the backbone of everything we do." },
                    { ic: "🏆", t: "People of Excellence", d: "Volunteer professionals who have attained excellence in their academic and professional fields, giving back through mentorship." },
                    { ic: "✅", t: "Vetted & Accountable", d: "Every mentor is screened, trained, and accountable to KIN leadership. Parents can trust who is with their child." },
                    { ic: "💛", t: "Values-Driven", d: "More than subject experts — our mentors integrate godly character, discipline, and purpose into every session." },
                  ].map((m, i) => (
                    <motion.div key={m.t} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                      style={{ background: T.htmlCard, border: "1px solid rgba(255,255,255,.08)", borderRadius: 16, padding: "24px 18px", textAlign: "center", transition: "all .25s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,196,67,.2)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div style={{ fontSize: 30, marginBottom: 10 }}>{m.ic}</div>
                      <div style={{ fontFamily: "Cinzel, serif", fontSize: 12, fontWeight: 700, color: T.goldL, marginBottom: 7 }}>{m.t}</div>
                      <p style={{ fontSize: 12, color: T.htmlText3, lineHeight: 1.65, margin: 0 }}>{m.d}</p>
                    </motion.div>
                  ))}
                </div>
                <div style={{ borderLeft: `3px solid ${T.goldL}`, padding: "14px 20px", background: "rgba(232,196,67,.08)", borderRadius: "0 12px 12px 0", margin: "32px 0 0" }}>
                  <p style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: 14, color: T.htmlText2, margin: 0 }}>"As iron sharpens iron, so one person sharpens another."</p>
                  <cite style={{ display: "block", fontSize: 11, color: T.htmlText3, fontStyle: "normal", letterSpacing: 1, marginTop: 6 }}>— PROVERBS 27:17</cite>
                </div>
              </div>
            </section>

            {/* Interest Form */}
            <section className="gu-section" style={{ background: altBg }}>
              <div className="gu-container" style={{ maxWidth: 640 }}>
                <p className="gu-sec-label">Register Interest</p>
                <h2 className="gu-sec-title" style={{ color: T.htmlText }}>Get Started Today</h2>
                <p className="gu-sec-sub">Fill in your details below and our team will reach out within 24 hours to complete your child's enrolment.</p>
                {formSubmitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: "rgba(20,185,129,.08)", border: "1px solid rgba(20,185,129,.3)", borderRadius: 20, padding: "40px 32px", textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                    <div style={{ fontFamily: "Cinzel, serif", fontSize: 20, fontWeight: 700, color: "#14B981", marginBottom: 8 }}>Interest Registered!</div>
                    <p style={{ fontSize: 14, color: T.htmlText2, lineHeight: 1.7 }}>Thank you! Our team will contact you on WhatsApp within 24 hours to complete enrolment.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} style={{ display: "grid", gap: 16 }}>
                    {[
                      { name: "parentName", label: "Parent / Guardian Name", type: "text", placeholder: "Your full name" },
                      { name: "childName", label: "Child's Name", type: "text", placeholder: "Your child's full name" },
                      { name: "email", label: "Email Address", type: "email", placeholder: "you@example.com" },
                      { name: "phone", label: "WhatsApp Number", type: "tel", placeholder: "+234 800 000 0000" },
                    ].map(f => (
                      <div key={f.name}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.htmlText2, marginBottom: 6, letterSpacing: 0.5 }}>{f.label}</label>
                        <input name={f.name} type={f.type} placeholder={f.placeholder} required value={formData[f.name]}
                          onChange={e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }))}
                          style={{ width: "100%", background: T.htmlCard, border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: T.htmlText, outline: "none", boxSizing: "border-box", transition: "border .2s" }}
                          onFocus={e => e.currentTarget.style.border = "1px solid rgba(232,196,67,.4)"}
                          onBlur={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,.12)"} />
                      </div>
                    ))}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.htmlText2, marginBottom: 6 }}>Is your child already enrolled at gU?</label>
                        <select name="enrolledStatus" required value={formData.enrolledStatus} onChange={e => setFormData(p => ({ ...p, enrolledStatus: e.target.value }))}
                          style={{ width: "100%", background: T.htmlCard, border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: T.htmlText, outline: "none", boxSizing: "border-box" }}>
                          <option value="">Select status</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.htmlText2, marginBottom: 6 }}>School Level</label>
                        <select name="level" required value={formData.level} onChange={e => setFormData(p => ({ ...p, level: e.target.value }))}
                          style={{ width: "100%", background: T.htmlCard, border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: T.htmlText, outline: "none", boxSizing: "border-box" }}>
                          <option value="">Select level</option>
                          <option value="Primary (Grades 1–6)">Primary (Grades 1–6)</option>
                          <option value="Secondary (Grades 7–11)">Secondary (Grades 7–11)</option>
                          <option value="Tertiary / A-Level (Grades 12–16)">Tertiary / A-Level (Grades 12–16)</option>
                        </select>
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: T.htmlText2, marginBottom: 6 }}>Subject Focus</label>
                        <select name="subject" required value={formData.subject} onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                          style={{ width: "100%", background: T.htmlCard, border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 16px", fontSize: 14, color: T.htmlText, outline: "none", boxSizing: "border-box" }}>
                          <option value="">Select subject</option>
                          <option value="Mathematics">Mathematics</option>
                          <option value="English Language">English Language</option>
                          <option value="Sciences">Sciences</option>
                          <option value="Multiple Subjects">Multiple Subjects</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    {formError && <p style={{ fontSize: 12, color: "#F87171", margin: 0 }}>Something went wrong. Please try again or reach out on WhatsApp.</p>}
                    <button type="submit" className="gu-btn-gold" style={{ border: "none", cursor: "pointer", marginTop: 4 }}>Submit Interest →</button>
                    <a href={PAYSTACK_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-outline" style={{ textAlign: "center" }}>Subscribe Directly →</a>
                  </form>
                )}
              </div>
            </section>

            {/* FAQ */}
            <section className="gu-section">
              <div className="gu-container" style={{ maxWidth: 720 }}>
                <p className="gu-sec-label">Questions</p>
                <h2 className="gu-sec-title" style={{ color: T.htmlText }}>Frequently Asked</h2>
                <p className="gu-sec-sub">Everything you need to know about gU Skills — pricing, sessions, mentors, reports, and how to get started.</p>
                <GUFaqSection items={SKILLS_FAQ} openFaq={openFaq} setOpenFaq={setOpenFaq} />
              </div>
            </section>

            {/* Skills CTA */}
            <section className="gu-section" style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(232,196,67,.07), transparent 70%)", pointerEvents: "none" }} />
              <div className="gu-container" style={{ position: "relative", zIndex: 1 }}>
                <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(28px, 4vw, 50px)", fontWeight: 900, marginBottom: 16, lineHeight: 1.1 }}>Ready to Unlock<br />Your Child's Potential?</h2>
                <p style={{ fontSize: 16, color: T.htmlText2, maxWidth: 500, margin: "0 auto 36px", lineHeight: 1.85 }}>Join families who trust KidsInspiring Nation to raise academically excellent, godly children — one weekly session at a time.</p>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 40 }}>
                  <a href={PAYSTACK_LINK} target="_blank" rel="noopener noreferrer" className="gu-btn-gold">Subscribe Directly — ₦7,000/mo →</a>
                  <a href={WHATSAPP_FREE} target="_blank" rel="noopener noreferrer" className="gu-btn-outline">Check Free Eligibility</a>
                </div>
                <p style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: 14, color: T.htmlText3, lineHeight: 1.8, maxWidth: 480, margin: "0 auto" }}>
                  "Do you see someone skilled in their work? They will serve before kings; they will not serve before officials of low rank."
                  <cite style={{ display: "block", fontSize: 11, letterSpacing: 2, color: T.htmlText3, marginTop: 6, fontStyle: "normal" }}>— PROVERBS 22:29</cite>
                </p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
