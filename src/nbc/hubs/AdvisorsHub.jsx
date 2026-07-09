import { motion } from "framer-motion";
import { usePageMeta } from "../../usePageMeta.js";
import { ROUTE_META } from "../../siteConfig.js";
import { C } from "../nbcBrand.js";
import { HubHero, Section, SectionHead, TiltCard, CTA, surfaces, grid } from "./hubKit.jsx";
import { Heart, MessageCircle, ClipboardCheck, Download, CheckCircle2 } from "lucide-react";

const ROLE = [
  { Icon: Heart, t: "Believe, don't do", d: "Your job is not to run the project — it's to believe in the builder, ask good questions, and keep them accountable. The work stays theirs." },
  { Icon: MessageCircle, t: "Check in monthly", d: "One short conversation a month: What did you do? Who did it help? What's next? That rhythm is what carries a project to the finish." },
  { Icon: ClipboardCheck, t: "Guard the character", d: "Reward integrity, resourcefulness, and service over spending. A ₦0 project done with grit beats an expensive one done for show." },
];

const MEETING = [
  "Open with one value of the week (2 min) — from the 8 core values.",
  "Each builder shares one thing they did since last meeting (5 min).",
  "Solve one blocker together as a club (10 min).",
  "Agree each builder's single next action before you close (3 min).",
  "Log attendance and wins — proof for the December Conference.",
];

export default function AdvisorsHub({ dark }) {
  usePageMeta(ROUTE_META.nbcAdvisors);
  const s = surfaces(dark);

  return (
    <div>
      <HubHero
        eyebrow="🧭 For Advisors"
        title="You are the adult who makes it"
        accent="possible."
        sub="Teachers, mentors, pastors, imams, parents — a Nation Builders Club needs one trusted adult. Here's everything you need to guide young builders well, without doing the work for them."
      >
        <CTA to="/nbc/schools">Start a club</CTA>
        <CTA href="/psalm119/downloads/Mentor Guide.pdf" ghost>Download Advisor Pack</CTA>
      </HubHero>

      <Section dark={dark}>
        <SectionHead eyebrow="Your role" title="Three lines, and you're doing it right." dark={dark} />
        <div style={grid(280)}>
          {ROLE.map((r, i) => (
            <TiltCard key={i} dark={dark}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${C.gold}1a`, display: "grid", placeItems: "center", marginBottom: "1rem" }}>
                <r.Icon size={24} color={C.goldD} />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: s.txt, margin: "0 0 .5rem" }}>{r.t}</h4>
              <p style={{ color: s.sub, lineHeight: 1.65, margin: 0, fontSize: ".95rem" }}>{r.d}</p>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Run a meeting */}
      <Section dark={dark} alt>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "2.5rem", alignItems: "start" }}>
          <div>
            <SectionHead eyebrow="Run a club meeting" title="A 20-minute meeting that actually moves projects." sub="Copy this simple agenda. It keeps clubs consistent — and consistency is what turns good intentions into finished projects." dark={dark} />
            <CTA href="/psalm119/downloads/Mentor Guide.pdf"><Download size={16} /> Full Advisor Pack (PDF)</CTA>
          </div>
          <TiltCard dark={dark}>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: ".9rem" }}>
              {MEETING.map((step, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  style={{ display: "flex", gap: ".8rem", alignItems: "flex-start" }}>
                  <CheckCircle2 size={20} color={C.ok} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: s.txt, lineHeight: 1.5, fontSize: ".95rem" }}>{step}</span>
                </motion.li>
              ))}
            </ol>
          </TiltCard>
        </div>
      </Section>

      {/* Reviewing impact */}
      <Section dark={dark}>
        <SectionHead eyebrow="Coaching impact" title="How to review a builder's month." dark={dark} center />
        <div style={grid(240)}>
          {[
            { t: "Ask for the log", d: "No log, no impact. Have every builder keep a monthly record — it's the single habit that predicts who finishes." },
            { t: "Reward resourcefulness", d: "Praise the builder who did more with less. It teaches the exact mindset the nation needs." },
            { t: "Normalise failure", d: "A project that failed and was fixed shows more character than one that never risked anything." },
            { t: "Point to the report", d: "Everything builds toward the Impact Report. Keep it in view so the year has a finish line." },
          ].map((b, i) => (
            <TiltCard key={i} dark={dark}>
              <h4 style={{ fontSize: "1.02rem", fontWeight: 800, color: s.txt, margin: "0 0 .5rem" }}>{b.t}</h4>
              <p style={{ color: s.sub, lineHeight: 1.6, margin: 0, fontSize: ".93rem" }}>{b.d}</p>
            </TiltCard>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <CTA to="/nbc/schools">Bring a club to your school</CTA>
        </div>
      </Section>
    </div>
  );
}
