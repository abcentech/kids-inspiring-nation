import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Search, ClipboardList, Rocket, Trophy,
  UserPlus, PenLine, HandHeart, Hammer, School, HeartHandshake,
  Calendar, CheckCircle2, ArrowRight,
} from "lucide-react";
import { ROUTE_META, SITE } from "../siteConfig.js";
import { usePageMeta } from "../usePageMeta.js";
import { NBC, PILLARS, CALENDAR, C } from "./nbcBrand.js";
import NBCEmblem from "./NBCEmblem.jsx";

// "The Program" — the plain-language explainer for the Nation Builders Corps.
// One page that answers three questions clearly: What is it? Who do we look
// for? How do you get involved? Every headline number and step comes from
// nbcBrand.js / the NBC page FAQ so the story stays consistent across the site.

const cream = "rgba(250,249,246,.72)";
const dim = "rgba(250,249,246,.5)";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

// What a builder actually does across the year — the five stages of every project.
const STAGES = [
  { Icon: Search, t: "Investigate", d: "Find a real problem in your community — something that actually needs fixing." },
  { Icon: ClipboardList, t: "Plan", d: "Set goals, share roles, and work out a simple budget and timeline." },
  { Icon: Rocket, t: "Act", d: "Do the work. Create change you can see, count, and stand behind." },
  { Icon: PenLine, t: "Reflect", d: "Write down honestly what worked, what didn't, and what you learned." },
  { Icon: Trophy, t: "Demonstrate", d: "Present it all at the Grand Finale and be graded by the nation." },
];

// The four steps to join through a school.
const JOIN_STEPS = [
  { n: "01", Icon: UserPlus, t: "Recruit", d: "You hear the call — through a school club, an advisor, or right here online." },
  { n: "02", Icon: PenLine, t: "Apply", d: "Answer one question: “Why do you want to be a Nation Builder?”" },
  { n: "03", Icon: HandHeart, t: "Induct", d: "Take the Builder's Pledge and receive your “NB” name and Builder ID." },
  { n: "04", Icon: Hammer, t: "Build", d: "Run your project for a full July–July year, logging impact every month." },
];

// The three ways in.
const PATHS = [
  {
    Icon: UserPlus,
    t: "As a young builder",
    who: "Aged 10 and above",
    d: "Generate your free Builder ID, register a project, and take the free course. You can start on your own today.",
    cta: "Get your Builder ID",
    to: "/NBC#join",
  },
  {
    Icon: School,
    t: "Through your school",
    who: "Students & teachers",
    d: "Charter a Nation Builders Club led by a teacher-advisor, so a whole chapter of builders runs projects together through the terms.",
    cta: "Start a club",
    to: "/nbc/course/start-a-club",
  },
  {
    Icon: HeartHandshake,
    t: "As a partner or funder",
    who: "Adults & organisations",
    d: "Keep the course free, equip school clubs, and power the December Conference and July Grand Finale.",
    cta: "Fund the Corps",
    to: "/nbc/fund",
  },
];

function Eyebrow({ children }) {
  return (
    <div style={{ fontSize: ".76rem", fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.goldL, marginBottom: "1rem", display: "flex", alignItems: "center", gap: ".75rem", justifyContent: "center" }}>
      <span style={{ height: "1.5px", width: "2rem", background: `${C.gold}66` }} />
      {children}
      <span style={{ height: "1.5px", width: "2rem", background: `${C.gold}66` }} />
    </div>
  );
}

function H2({ children }) {
  return (
    <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,4.5vw,2.9rem)", fontWeight: 900, letterSpacing: "-.025em", lineHeight: 1.1, textAlign: "center", margin: "0 auto 1rem", maxWidth: "20ch" }}>
      {children}
    </h2>
  );
}

const card = {
  background: "rgba(250,249,246,.04)",
  border: `1px solid ${C.gold}22`,
  borderRadius: 18,
  padding: "clamp(1.4rem,3vw,1.9rem)",
};

export default function ProgramPage() {
  usePageMeta(ROUTE_META.nbc);
  const wrap = { maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" };

  return (
    <div style={{ background: C.greenD, color: C.cream, fontFamily: "'DM Sans',sans-serif" }}>
      {/* HERO — what it is, in one breath */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(4rem,10vw,7rem) 0 clamp(3rem,7vw,5rem)", textAlign: "center" }}>
        <div style={{ position: "absolute", top: "-25%", left: "50%", transform: "translateX(-50%)", width: "48rem", height: "48rem", background: `radial-gradient(circle, ${C.gold}18, transparent 68%)`, pointerEvents: "none" }} />
        <div style={wrap}>
          <motion.div {...reveal}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}><NBCEmblem size={72} id="program-hero" /></div>
            <Eyebrow>The Program</Eyebrow>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.3rem,6vw,3.8rem)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.05, margin: "0 auto 1.25rem", maxWidth: "16ch" }}>
              Stop waiting for the nation to change. Build it.
            </h1>
            <p style={{ fontSize: "clamp(1.05rem,2.2vw,1.3rem)", color: cream, lineHeight: 1.7, maxWidth: "50ch", margin: "0 auto 2rem" }}>
              The Nation Builders Corps is a year-long challenge for young Nigerians who refuse to sit and wait. You pick a real problem in your community, and you build the solution — with character, not excuses.
            </p>
            <div style={{ display: "flex", gap: ".9rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/NBC#join" style={{ background: C.gold, color: C.greenD, fontWeight: 800, padding: ".9rem 1.8rem", borderRadius: 999, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
                Become a Builder <ArrowRight size={17} />
              </Link>
              <a href="#how" style={{ border: `1px solid ${C.gold}55`, color: C.cream, fontWeight: 700, padding: ".9rem 1.8rem", borderRadius: 999, textDecoration: "none" }}>
                How it works
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section style={{ padding: "clamp(3rem,7vw,5rem) 0", borderTop: `1px solid ${C.gold}18` }}>
        <div style={wrap}>
          <motion.div {...reveal}>
            <Eyebrow>What it is</Eyebrow>
            <H2>A character-first movement, run like a mission.</H2>
            <p style={{ fontSize: "clamp(1rem,2vw,1.15rem)", color: cream, lineHeight: 1.8, maxWidth: "56ch", margin: "0 auto 2.5rem", textAlign: "center" }}>
              Nation building isn't a one-election-cycle job — it's a 70-year work of character, carried by generation after generation of young builders. NBC is where that work starts: real projects, real communities, one full year at a time.
            </p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,13rem),1fr))", gap: "1rem" }}>
            {[
              ["A full year", "One July–July cycle of building, from The Call to the Grand Finale."],
              ["Real projects", "Not theory — actual problems solved in your own community."],
              ["Character graded", "You're measured on integrity and impact, not grades alone."],
              ["Nationwide", "Open in all 36 states and the FCT, on your own or through a school."],
            ].map(([t, d]) => (
              <motion.div key={t} {...reveal} style={card}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.15rem", color: C.goldL, marginBottom: ".4rem" }}>{t}</div>
                <div style={{ fontSize: ".9rem", color: cream, lineHeight: 1.6 }}>{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE LOOK FOR */}
      <section style={{ padding: "clamp(3rem,7vw,5rem) 0", background: `linear-gradient(180deg, ${C.green}, ${C.greenD})` }}>
        <div style={wrap}>
          <motion.div {...reveal}>
            <Eyebrow>Who we look for</Eyebrow>
            <H2>Chosen for character. Not for grades.</H2>
            <p style={{ fontSize: "clamp(1rem,2vw,1.15rem)", color: cream, lineHeight: 1.8, maxWidth: "54ch", margin: "0 auto 2.5rem", textAlign: "center" }}>
              You don't need to be top of your class. You need to be <strong style={{ color: C.cream }}>aged 10 or above</strong>, honest, hardworking, and willing to commit to weekly action and real community impact. That's it. Builders are chosen for who they are becoming.
            </p>
          </motion.div>
          <motion.div {...reveal}>
            <p style={{ textAlign: "center", color: dim, fontSize: ".8rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              You carry one of the eight values
            </p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,11rem),1fr))", gap: ".85rem" }}>
            {PILLARS.map((p) => (
              <motion.div key={p.key} {...reveal} style={{ ...card, padding: "1.15rem 1.25rem", display: "flex", gap: ".75rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1.4rem", lineHeight: 1 }}>{p.emoji}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: ".98rem", color: C.cream }}>{p.key}</div>
                  <div style={{ fontSize: ".82rem", color: cream, lineHeight: 1.5 }}>{p.line}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU DO */}
      <section id="how" style={{ padding: "clamp(3rem,7vw,5rem) 0", scrollMarginTop: "80px" }}>
        <div style={wrap}>
          <motion.div {...reveal}>
            <Eyebrow>What you actually do</Eyebrow>
            <H2>Every project moves through five stages.</H2>
            <p style={{ fontSize: "clamp(1rem,2vw,1.15rem)", color: cream, lineHeight: 1.8, maxWidth: "52ch", margin: "0 auto 2.75rem", textAlign: "center" }}>
              You check in once a week to keep your Builder Streak alive — and across the year, your team walks these five steps from a problem to a solution the nation can see.
            </p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,12rem),1fr))", gap: "1rem" }}>
            {STAGES.map((st, i) => (
              <motion.div key={st.t} {...reveal} style={{ ...card, position: "relative" }}>
                <div style={{ position: "absolute", top: "1.1rem", right: "1.2rem", fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.5rem", color: `${C.gold}30` }}>{i + 1}</div>
                <st.Icon size={26} color={C.goldL} strokeWidth={1.6} />
                <div style={{ fontWeight: 800, fontSize: "1.05rem", color: C.cream, margin: ".8rem 0 .35rem" }}>{st.t}</div>
                <div style={{ fontSize: ".88rem", color: cream, lineHeight: 1.6 }}>{st.d}</div>
              </motion.div>
            ))}
          </div>

          {/* The year at a glance */}
          <motion.div {...reveal} style={{ marginTop: "clamp(2.5rem,6vw,4rem)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".6rem", color: C.goldL, fontWeight: 800, fontSize: ".9rem", letterSpacing: ".05em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              <Calendar size={18} /> The builder's year
            </div>
            <div style={{ display: "grid", gap: ".75rem" }}>
              {CALENDAR.map((c) => (
                <div key={c.title} style={{ ...card, display: "grid", gridTemplateColumns: "6rem 1fr", gap: "1rem", alignItems: "center", padding: "1.1rem 1.4rem" }}>
                  <div style={{ fontWeight: 800, color: C.goldL, fontSize: ".85rem", letterSpacing: ".04em", textTransform: "uppercase" }}>{c.tag}</div>
                  <div>
                    <div style={{ fontWeight: 800, color: C.cream, fontSize: "1rem" }}>{c.title}</div>
                    <div style={{ fontSize: ".88rem", color: cream, lineHeight: 1.55 }}>{c.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* HOW TO GET INVOLVED */}
      <section id="join" style={{ padding: "clamp(3rem,7vw,5rem) 0", background: `linear-gradient(180deg, ${C.greenD}, ${C.green})`, scrollMarginTop: "80px" }}>
        <div style={wrap}>
          <motion.div {...reveal}>
            <Eyebrow>How to get involved</Eyebrow>
            <H2>Three ways in. Pick yours.</H2>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,16rem),1fr))", gap: "1.1rem", marginTop: "2rem" }}>
            {PATHS.map((p) => (
              <motion.div key={p.t} {...reveal} style={{ ...card, display: "flex", flexDirection: "column", gap: ".65rem" }}>
                <p.Icon size={30} color={C.goldL} strokeWidth={1.6} />
                <div style={{ fontSize: ".72rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: dim }}>{p.who}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.35rem", color: C.cream }}>{p.t}</div>
                <p style={{ fontSize: ".92rem", color: cream, lineHeight: 1.65, flex: 1, margin: 0 }}>{p.d}</p>
                <Link to={p.to} style={{ marginTop: ".5rem", display: "inline-flex", alignItems: "center", gap: ".4rem", color: C.goldL, fontWeight: 800, fontSize: ".92rem", textDecoration: "none" }}>
                  {p.cta} <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* The four steps to join */}
          <motion.div {...reveal} style={{ marginTop: "clamp(2.5rem,6vw,4rem)" }}>
            <p style={{ textAlign: "center", color: dim, fontSize: ".8rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              Joining, step by step
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,13rem),1fr))", gap: "1rem" }}>
              {JOIN_STEPS.map((st) => (
                <div key={st.n} style={{ ...card, display: "flex", flexDirection: "column", gap: ".5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <st.Icon size={24} color={C.goldL} strokeWidth={1.6} />
                    <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "1.4rem", color: `${C.gold}40` }}>{st.n}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: "1.02rem", color: C.cream }}>{st.t}</div>
                  <div style={{ fontSize: ".87rem", color: cream, lineHeight: 1.55 }}>{st.d}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE PLEDGE + CTA */}
      <section style={{ padding: "clamp(3.5rem,8vw,6rem) 0", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "-30%", left: "50%", transform: "translateX(-50%)", width: "46rem", height: "46rem", background: `radial-gradient(circle, ${C.gold}16, transparent 68%)`, pointerEvents: "none" }} />
        <div style={{ ...wrap, position: "relative" }}>
          <motion.div {...reveal}>
            <Eyebrow>The Builder's Pledge</Eyebrow>
            <div style={{ maxWidth: "44rem", margin: "0 auto 2.5rem" }}>
              {NBC.pledge.map((line, i) => (
                <p key={i} style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "clamp(1.15rem,2.6vw,1.6rem)", fontWeight: i === NBC.pledge.length - 1 ? 900 : 500, color: i === NBC.pledge.length - 1 ? C.goldL : C.cream, lineHeight: 1.5, margin: ".2rem 0" }}>
                  {line}
                </p>
              ))}
            </div>
            <p style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", color: cream, fontSize: "1.05rem", marginBottom: "2rem" }}>
              <CheckCircle2 size={18} color={C.goldL} /> Free to join. Open nationwide. Start in 30 seconds.
            </p>
            <div style={{ display: "flex", gap: ".9rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/NBC#join" style={{ background: C.gold, color: C.greenD, fontWeight: 800, padding: "1rem 2rem", borderRadius: 999, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: ".5rem" }}>
                Become a Builder <ArrowRight size={18} />
              </Link>
              <Link to="/nbc/course" style={{ border: `1px solid ${C.gold}55`, color: C.cream, fontWeight: 700, padding: "1rem 2rem", borderRadius: 999, textDecoration: "none" }}>
                Take the free course
              </Link>
            </div>
            <p style={{ marginTop: "1.75rem", color: dim, fontSize: ".9rem" }}>
              Questions? Talk to your school advisor or WhatsApp{" "}
              <a href={`https://wa.me/${(SITE.whatsapp || "2348113494684").replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" style={{ color: C.goldL, fontWeight: 700, textDecoration: "none" }}>
                +234 811 349 4684
              </a>.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
