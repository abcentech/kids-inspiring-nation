import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Design Tokens (Matching App.jsx)
const T = {
  green: "#16613E", greenD: "#0D3D26", greenM: "#2C4A35",
  gold: "#C4882C", goldL: "#E8B954", goldD: "#9A6620",
  coral: "#D94F30", cream: "#FDF7EC", warmBg: "#F5EFE3",
  // Base dark theme colors from original HTML
  htmlDark: "#080D1E", htmlDark2: "#0D1530", htmlDark3: "#111A35",
  htmlCard: "#161F35", htmlCard2: "#1B2840", htmlCard3: "#20304A",
  htmlText: "#F0F4FF", htmlText2: "#94A3B8", htmlText3: "#4A6080",
};

const gUStyles = `
  /* Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400;1,600&display=swap');

  .gu-page {
    font-family: 'Plus Jakarta Sans', sans-serif;
    line-height: 1.6;
    overflow-x: hidden;
  }
  
  .gu-container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 5vw;
    position: relative;
    z-index: 1;
  }
  
  .gu-section { padding: 100px 0; }

  .gu-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(232,196,67,.08); border: 1px solid rgba(232,196,67,.2);
    border-radius: 100px; padding: 6px 18px; font-size: 11px; letter-spacing: 3px;
    color: ${T.goldL}; text-transform: uppercase; font-weight: 700; margin-bottom: 20px;
  }
  .gu-sec-label {
    font-size: 11px; letter-spacing: 4px; text-transform: uppercase;
    color: ${T.goldL}; font-weight: 700; text-align: center; margin-bottom: 12px;
  }
  .gu-sec-title {
    font-family: Cinzel, serif; font-size: clamp(30px, 4.5vw, 52px); font-weight: 700;
    text-align: center; line-height: 1.1; margin-bottom: 16px;
  }
  .gu-sec-sub {
    font-size: 16px; color: ${T.htmlText2}; text-align: center; max-width: 600px;
    margin: 0 auto 60px; line-height: 1.8;
  }

  /* Actions */
  .gu-btn-gold {
    background: linear-gradient(135deg, #C9A835, #E8C443, #F6DC74); color: ${T.htmlDark};
    padding: 14px 32px; border-radius: 24px; font-weight: 800; font-size: 15px;
    box-shadow: 0 8px 32px rgba(232,196,67,.3); transition: all .25s; text-decoration: none;
    display: inline-block; cursor: pointer; border: none; font-family: inherit;
  }
  .gu-btn-gold:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(232,196,67,.4); }
  
  .gu-btn-outline {
    border: 2px solid rgba(232,196,67,.35); color: ${T.goldL};
    padding: 14px 32px; border-radius: 24px; font-weight: 700; font-size: 15px;
    transition: all .25s; backdrop-filter: blur(4px); text-decoration: none;
    display: inline-block; background: transparent; cursor: pointer; font-family: inherit;
  }
  .gu-btn-outline:hover { background: rgba(232,196,67,.12); border-color: ${T.goldL}; }

  /* Hero */
  .gu-hero-crown {
    font-size: 72px; display: block; margin-bottom: 20px;
    animation: gu-float 4s ease-in-out infinite; filter: drop-shadow(0 0 30px rgba(232,196,67,.5));
  }
  @keyframes gu-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  
  @keyframes gu-bounce { 
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(6px); }
  }

  /* Components */
  .gu-stat-block { flex: 1; min-width: 120px; padding: 20px 16px; text-align: center; border-right: 1px solid rgba(255,255,255,.08); }
  .gu-stat-block:last-child { border-right: none; }
  
  .gu-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
  .gu-pathways-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  
  .gu-pathway-card {
    background: ${T.htmlCard}; border: 1px solid rgba(255,255,255,.08); border-radius: 20px;
    padding: 36px 28px; text-align: center; position: relative; overflow: hidden;
    transition: all .3s;
  }
  .gu-pathway-card::after {
    content: ''; position: absolute; inset: 0; opacity: 0; transition: opacity .3s;
    background: linear-gradient(135deg, rgba(232,196,67,.04), transparent);
  }
  .gu-pathway-card:hover { transform: translateY(-6px); border-color: rgba(232,196,67,.2); box-shadow: 0 20px 60px rgba(0,0,0,.5); }
  .gu-pathway-card:hover::after { opacity: 1; }

  .gu-steps-grid {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; position: relative; max-width: 980px; margin: 0 auto;
  }
  .gu-step-col { text-align: center; padding: 0 16px; position: relative; }
  .gu-step-col::after {
    content: ''; position: absolute; top: 26px; left: calc(50% + 26px); right: 0;
    height: 1px; background: linear-gradient(90deg, rgba(232,196,67,.2), transparent);
  }
  .gu-step-col:last-child::after { display: none; }
  
  .gu-gpa-grid { display: grid; grid-template-columns: 280px 1fr; gap: 60px; align-items: start; }
  
  .gu-portal-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 32px; }
  .gu-testimonies-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

  /* Responsive Adjustments */
  @media(max-width: 960px) {
    .gu-about-grid { grid-template-columns: 1fr; }
    .gu-about-visual { order: -1; }
    .gu-pathways-grid { grid-template-columns: 1fr; }
    .gu-pathway-card { text-align: left; }
    .gu-pw-ic { display: inline; margin-right: 12px; font-size: 32px; }
    .gu-pw-name { display: inline; }
    .gu-pw-ages { position: static; display: inline-block; margin-bottom: 12px; }
    .gu-steps-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .gu-step-col::after { display: none; }
    .gu-gpa-grid { grid-template-columns: 1fr; }
    .gu-gpa-demo { max-width: 300px; margin: 0 auto; }
    .gu-portal-features { grid-template-columns: 1fr 1fr; }
    .gu-testimonies-grid { grid-template-columns: 1fr; }
  }
  
  @media(max-width: 600px) {
    .gu-steps-grid { grid-template-columns: 1fr; }
    .gu-portal-features { grid-template-columns: 1fr; }
    .gu-ds-cats-grid { grid-template-columns: repeat(3, 1fr) !important; }
    .gu-stat-block { min-width: 100px; padding: 16px 12px; }
  }
`;

export default function GodsUniversity({ onBack, dark }) {
  // Using dark mode prop to gently alter the mostly dark theme
  const bg = dark ? "#050508" : T.htmlDark;
  const altBg = dark ? "#0A0D15" : T.htmlDark2;
  const textColor = T.htmlText;

  useEffect(() => {
    // Inject Custom CSS
    const styleEl = document.createElement("style");
    styleEl.innerHTML = gUStyles;
    document.head.appendChild(styleEl);
    return () => { document.head.removeChild(styleEl); };
  }, []);

  const containerVars = {
    animate: { transition: { staggerChildren: 0.1 } }
  };
  const itemVars = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    viewport: { once: true, margin: "-50px" }
  };

  // Links as specified
  const REGISTER_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdGHVOsyZBTq6ko-MdLCJtZV88CtqSmhDhJphMDONJceCm3DA/viewform";
  const PROSPECTUS_LINK = "https://www.canva.com/design/DAGbhF8ek5o/uFhNtEH_Z_q3l051t543ZQ/view?utm_content=DAGbhF8ek5o&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=he877c76682";
  const PORTAL_LINK = "https://abcentech.github.io/gU/";

  return (
    <div className="gu-page" style={{ background: bg, color: textColor, minHeight: "100vh" }}>
      
      {/* Back Navigation */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "1.5rem 5vw", pointerEvents: "none" }}>
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: T.goldL,
            fontWeight: 600,
            fontSize: "0.9rem",
            cursor: "pointer",
            background: "rgba(8,13,30,0.6)",
            backdropFilter: "blur(8px)",
            padding: "0.5rem 1rem",
            borderRadius: "99px",
            border: `1px solid rgba(232,196,67,.2)`,
            pointerEvents: "auto"
          }}
        >
          <ArrowLeft size={18} /> Back to KidsInspiring Nation
        </motion.button>
      </div>

      {/* Hero Section */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "100px 5vw 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 800, height: 600, background: "radial-gradient(ellipse, rgba(232,196,67,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        
        <motion.div initial="initial" animate="whileInView" variants={containerVars} style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <motion.span variants={itemVars} className="gu-hero-crown">👑</motion.span>
          <motion.h1 variants={itemVars} style={{ fontFamily: "Cinzel, serif", fontWeight: 900, lineHeight: 1, marginBottom: 10 }}>
            <span style={{ fontSize: "clamp(72px, 14vw, 140px)", display: "block", background: "linear-gradient(135deg, #8A6F1A 0%, #E8C443 40%, #F6DC74 60%, #E8C443 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>goDs</span>
            <span style={{ fontSize: "clamp(20px, 4vw, 38px)", display: "block", letterSpacing: 8, color: T.htmlText2 }}>University</span>
          </motion.h1>
          
          <motion.p variants={itemVars} style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: "clamp(16px, 2vw, 20px)", color: T.htmlText2, margin: "24px 0 8px", lineHeight: 1.6 }}>
            "And Jesus grew in wisdom and stature, and in favour with God and man."
          </motion.p>
          
          <motion.p variants={itemVars} style={{ fontSize: 12, letterSpacing: 5, textTransform: "uppercase", color: T.goldL, marginBottom: 44, display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <span>In Spirit</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.goldL, opacity: 0.5 }}></span>
            <span>By Skills</span>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: T.goldL, opacity: 0.5 }}></span>
            <span>For Service</span>
          </motion.p>

          <motion.div variants={itemVars} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 70 }}>
            <a href={REGISTER_LINK} target="_blank" rel="noopener" className="gu-btn-gold">Enrol a Genius →</a>
            <a href={PROSPECTUS_LINK} target="_blank" rel="noopener" className="gu-btn-outline">Prospectus</a>
            <a href={PORTAL_LINK} target="_blank" rel="noopener" className="gu-btn-outline">Parent Portal →</a>
          </motion.div>

          <motion.div variants={itemVars} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", border: "1px solid rgba(255,255,255,.08)", borderRadius: 20, overflow: "hidden", background: "rgba(22,31,53,.6)", backdropFilter: "blur(10px)", maxWidth: 600, margin: "0 auto" }}>
            {[
              { n: "36+", l: "Nation Builders" },
              { n: "44", l: "Weeks" },
              { n: "3", l: "Pathways" },
              { n: "300+", l: "Min/Week Target" }
            ].map(stat => (
              <div key={stat.l} className="gu-stat-block">
                <div style={{ fontFamily: "Cinzel, serif", fontSize: 28, fontWeight: 900, color: T.goldL }}>{stat.n}</div>
                <div style={{ fontSize: 11, color: T.htmlText3, letterSpacing: 1, marginTop: 3 }}>{stat.l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

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
      <section className="gu-section">
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
                  <span style={{ background: "rgba(232,196,67,.12)", border: "1px solid rgba(232,196,67,.25)", borderRadius: 5, padding: "3px 9px", fontSize: 10, color: T.goldL, fontWeight: 700 }}>Wk 6 · 2026</span>
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
            <a href={PORTAL_LINK} target="_blank" rel="noopener" className="gu-btn-gold">Access Parent Portal →</a>
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
                av: "A", n: "Parent of Olohi", r: "Old Testament Pathway · Session 2026"
              },
              {
                q: "Watching my son explain a parable to his younger sibling with such confidence — that is the fruit. goDs University builds knowledge and character at the same time.",
                av: "M", n: "Parent of Samuel", r: "Old Testament Pathway · Session 2026"
              },
              {
                q: "The Parent Portal changed everything. I know exactly what she read, what the instructor said, and what to reinforce at home each week. I feel genuinely involved now.",
                av: "T", n: "Parent of Talia", r: "New Testament Pathway · Session 2026"
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

      {/* CTA Section */}
      <section className="gu-section" style={{ textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(232,196,67,.07), transparent 70%)", pointerEvents: "none" }} />
        
        <div className="gu-container" style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(34px, 5vw, 60px)", fontWeight: 900, marginBottom: 18, lineHeight: 1.1 }}>Ready to Raise<br />a Nation Builder?</h2>
          <p style={{ fontSize: 17, color: T.htmlText2, maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.85 }}>
            Join a community of families committed to raising children who know God's Word — not by accident, but by design.
          </p>
          
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <a href={REGISTER_LINK} target="_blank" rel="noopener" className="gu-btn-gold">Enrol a Genius</a>
            <a href={PORTAL_LINK} target="_blank" rel="noopener" className="gu-btn-outline">Parent Portal →</a>
          </div>

          <p style={{ fontFamily: "Lora, serif", fontStyle: "italic", fontSize: 14, color: T.htmlText3, lineHeight: 1.8, maxWidth: 500, margin: "0 auto" }}>
            "From childhood you have known the sacred scriptures, which are able to make you wise for salvation through faith in Christ Jesus."
            <cite style={{ display: "block", fontSize: 11, letterSpacing: 2, color: T.htmlText3, marginTop: 6, fontStyle: "normal" }}>— 2 TIMOTHY 3:15</cite>
          </p>
        </div>
      </section>
    </div>
  );
}
