import { useState } from "react";
import { motion } from "framer-motion";
import { usePageMeta } from "../../usePageMeta.js";
import { ROUTE_META } from "../../siteConfig.js";
import { C } from "../nbcBrand.js";
import { HubHero, Section, SectionHead, TiltCard, CTA, surfaces, grid } from "./hubKit.jsx";
import WeeklyStreak from "../WeeklyStreak.jsx";
import { IdCard, BookOpen, Wrench, LineChart, Trophy } from "lucide-react";

// The builder journey — a 5-step path a young person walks from "I want in"
// to "I was honoured at the Grand Finale."
const JOURNEY = [
  { Icon: IdCard, t: "Get your Builder ID", d: "Claim your free Builder ID in 30 seconds — your name, your state, your badge. No sign-up, no fee.", to: "/NBC#join", cta: "Claim my ID" },
  { Icon: BookOpen, t: "Take the course", d: "Eight bite-sized modules teach the character, values, and skills of a Nation Builder. Earn a badge for each.", to: "/nbc/course", cta: "Start learning" },
  { Icon: Wrench, t: "Build a project", d: "Pick one real problem and plan it out — with creativity and grit, not cash. The Project Planner walks you from idea to impact.", to: "/nbc/tools/project-planner", cta: "Open the planner" },
  { Icon: LineChart, t: "Track your impact", d: "Log what you did and who you helped every month. Your log is your evidence — proof beats promises.", to: "/nbc/tools/monthly-log", cta: "Open the log" },
  { Icon: Trophy, t: "Win recognition", d: "Build your Impact Report to earn a certificate — and a shot at ₦3,000,000 in prizes at the July Grand Finale.", to: "/nbc/tools/impact-report", cta: "Open the report builder" },
];

export default function StudentsHub({ dark }) {
  usePageMeta(ROUTE_META.nbcStudents);
  const s = surfaces(dark);
  const [active, setActive] = useState(0);

  return (
    <div>
      <HubHero
        eyebrow="🎒 For Students"
        title="You don't need permission to"
        accent="build."
        sub="Age 7 to 17, anywhere in Nigeria. This is your step-by-step path from first idea to national recognition — free, and yours to share."
      >
        <CTA to="/NBC#join">Get your Builder ID</CTA>
        <CTA to="/nbc/course" ghost>Take the free course</CTA>
      </HubHero>

      {/* Interactive journey */}
      <Section dark={dark} id="journey">
        <SectionHead eyebrow="The builder journey" title="Five steps. One year. Real impact." sub="Tap a step to see what it takes. Each one is free and self-paced." dark={dark} />

        {/* Step rail */}
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
          {JOURNEY.map((step, i) => {
            const on = i === active;
            return (
              <button key={i} onClick={() => setActive(i)}
                style={{ flex: "1 1 auto", minWidth: 96, cursor: "pointer", padding: ".7rem .6rem", borderRadius: 14, border: `1px solid ${on ? C.gold : s.brd}`, background: on ? `${C.gold}14` : s.surf, color: s.txt, display: "flex", flexDirection: "column", alignItems: "center", gap: ".4rem", transition: "all .2s" }}>
                <span style={{ width: 30, height: 30, borderRadius: 999, display: "grid", placeItems: "center", background: on ? C.gold : s.brd, color: on ? C.greenD : s.sub, fontWeight: 800, fontSize: ".85rem" }}>{i + 1}</span>
                <span style={{ fontSize: ".68rem", fontWeight: 700, textAlign: "center", opacity: on ? 1 : 0.7 }}>{step.t.split(" ").slice(-1)}</span>
              </button>
            );
          })}
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <TiltCard dark={dark} glow={C.gold}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem", flexWrap: "wrap" }}>
              <div style={{ width: 56, height: 56, borderRadius: 16, background: `${C.gold}1a`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                {(() => { const I = JOURNEY[active].Icon; return <I size={26} color={C.goldD} />; })()}
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".72rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: C.gold }}>Step {active + 1} of {JOURNEY.length}</div>
                <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: s.txt, margin: ".3rem 0 .6rem" }}>{JOURNEY[active].t}</h3>
                <p style={{ color: s.sub, lineHeight: 1.65, margin: "0 0 1.2rem" }}>{JOURNEY[active].d}</p>
                <CTA to={JOURNEY[active].to}>{JOURNEY[active].cta}</CTA>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </Section>

      {/* Weekly streak */}
      <Section dark={dark} id="streak">
        <SectionHead eyebrow="Keep the chain alive" title="One check-in a week." sub="Nation building is a habit, not a sprint. Check in each week you build — 13 weeks completes a term. Miss a week and the chain breaks, so keep it going." dark={dark} />
        <div style={{ maxWidth: "40rem" }}>
          <WeeklyStreak dark={dark} />
        </div>
      </Section>

      {/* Why it's worth it */}
      <Section dark={dark} alt>
        <SectionHead eyebrow="What you get" title="More than a certificate." dark={dark} center />
        <div style={grid(240)}>
          {[
            { t: "A national stage", d: "The most impactful builders are celebrated at the July Grand Finale, in front of the nation." },
            { t: "Real skills for life", d: "Problem-solving, leadership, and follow-through — the skills school rarely grades but life always tests." },
            { t: "A tribe of builders", d: "Join a community of young Nigerians who chose to build instead of complain. You are not doing this alone." },
            { t: "Proof you can show", d: "Your Builder ID, badges, and Impact Report are a portfolio you can share with any school or scholarship." },
          ].map((b, i) => (
            <TiltCard key={i} dark={dark}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: s.txt, margin: "0 0 .5rem" }}>{b.t}</h4>
              <p style={{ color: s.sub, lineHeight: 1.6, margin: 0, fontSize: ".95rem" }}>{b.d}</p>
            </TiltCard>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <CTA to="/NBC#join">Start your journey — get your Builder ID</CTA>
        </div>
      </Section>
    </div>
  );
}
