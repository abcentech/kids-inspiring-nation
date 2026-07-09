import { useState } from "react";
import { motion } from "framer-motion";
import { usePageMeta } from "../../usePageMeta.js";
import { ROUTE_META, SITE } from "../../siteConfig.js";
import { C } from "../nbcBrand.js";
import { HubHero, Section, SectionHead, TiltCard, CTA, surfaces, grid } from "./hubKit.jsx";
import ClubRequestForm from "./ClubRequestForm.jsx";
import { UserCheck, Users, FileText, ListChecks, Check } from "lucide-react";

const STEPS = [
  { Icon: UserCheck, t: "Find an Advisor", d: "One teacher or staff member agrees to guide the club — a monthly check-in, not a full-time job. Share the Advisor hub with them.", link: { to: "/nbc/advisors", label: "See the Advisor hub" } },
  { Icon: Users, t: "Gather 10 builders", d: "Round up at least 10 students who want to build. That's the minimum for a recognised chapter — there's no maximum.", link: null },
  { Icon: FileText, t: "Request your chapter", d: "Submit the short Chapter Request below. We add your school to the national map and send your welcome pack and starter resources.", link: { href: "#request", label: "Jump to the form" } },
  { Icon: ListChecks, t: "Send your roster", d: "Share your member list and you're official. Your club can now run projects and represent the school at the December Conference and July Grand Finale.", link: null },
];

export default function SchoolsHub({ dark }) {
  usePageMeta(ROUTE_META.nbcSchools);
  const s = surfaces(dark);
  const [done, setDone] = useState([]);
  const toggle = (i) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]));
  const pct = Math.round((done.length / STEPS.length) * 100);

  return (
    <div>
      <HubHero
        eyebrow="🏫 For Schools"
        title="Put your school on the"
        accent="national map."
        sub="A Nation Builders Club gives your students a nationwide stage for character, service, and real community impact — at no cost to the school. Starting one takes four steps."
      >
        <CTA href="#request">Start a club</CTA>
        <CTA href="/psalm119/downloads/Project Planning Guide.pdf" ghost>School starter guide</CTA>
      </HubHero>

      {/* Interactive 4-step checklist */}
      <Section dark={dark}>
        <SectionHead eyebrow="Start a club" title="Four steps to a chapter." sub="Tick each step as you go — watch your school get on the map." dark={dark} />

        {/* Progress bar */}
        <div style={{ marginBottom: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".8rem", fontWeight: 700, color: s.sub, marginBottom: ".4rem" }}>
            <span>Your progress</span><span>{done.length}/{STEPS.length} · {pct}%</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: s.brd, overflow: "hidden" }}>
            <motion.div animate={{ width: `${pct}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} style={{ height: "100%", background: `linear-gradient(90deg, ${C.goldD}, ${C.gold})` }} />
          </div>
        </div>

        <div style={grid(260)}>
          {STEPS.map((step, i) => {
            const on = done.includes(i);
            return (
              <TiltCard key={i} dark={dark} glow={on ? C.ok : C.gold} style={{ borderColor: on ? `${C.ok}66` : undefined }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".9rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: on ? `${C.ok}1a` : `${C.gold}1a`, display: "grid", placeItems: "center" }}>
                    <step.Icon size={22} color={on ? C.ok : C.goldD} />
                  </div>
                  <button onClick={() => toggle(i)} aria-label={on ? "Mark step incomplete" : "Mark step complete"}
                    style={{ width: 30, height: 30, borderRadius: 999, cursor: "pointer", border: `2px solid ${on ? C.ok : s.brd}`, background: on ? C.ok : "transparent", display: "grid", placeItems: "center", transition: "all .2s" }}>
                    {on && <Check size={16} color="#fff" />}
                  </button>
                </div>
                <div style={{ fontSize: ".72rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: C.gold }}>Step {i + 1}</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: s.txt, margin: ".25rem 0 .5rem" }}>{step.t}</h4>
                <p style={{ color: s.sub, lineHeight: 1.6, margin: 0, fontSize: ".92rem" }}>{step.d}</p>
                {step.link && <div style={{ marginTop: "1rem" }}>{step.link.href ? <CTA href={step.link.href} ghost>{step.link.label}</CTA> : <CTA to={step.link.to} ghost>{step.link.label}</CTA>}</div>}
              </TiltCard>
            );
          })}
        </div>

        {pct === 100 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: "2rem", textAlign: "center", padding: "1.5rem", borderRadius: 18, background: `${C.ok}12`, border: `1px solid ${C.ok}44` }}>
            <p style={{ margin: "0 0 1rem", color: s.txt, fontWeight: 700 }}>🎉 That's a chapter! Ready to make it official?</p>
            <CTA href="#request">Submit your Chapter Request</CTA>
          </motion.div>
        )}
      </Section>

      {/* Why host */}
      <Section dark={dark} alt>
        <SectionHead eyebrow="Why host a club" title="What your school gains." dark={dark} center />
        <div style={grid(240)}>
          {[
            { t: "Character, visibly", d: "A structured, year-long programme that grows integrity, service, and leadership — the traits parents and inspectors look for." },
            { t: "Community goodwill", d: "Your students solve real local problems. The school becomes known for building, not just testing." },
            { t: "A national platform", d: "Clubs represent the school at the December Conference and July Grand Finale — recognition on a national stage." },
            { t: "Zero cost to run", d: "The course and resources are free. NBC rewards resourcefulness, so a club needs commitment, not a budget." },
          ].map((b, i) => (
            <TiltCard key={i} dark={dark}>
              <h4 style={{ fontSize: "1.02rem", fontWeight: 800, color: s.txt, margin: "0 0 .5rem" }}>{b.t}</h4>
              <p style={{ color: s.sub, lineHeight: 1.6, margin: 0, fontSize: ".93rem" }}>{b.d}</p>
            </TiltCard>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <CTA href="#request">Start your school's chapter</CTA>
        </div>
      </Section>

      {/* Safeguarding & standards */}
      <Section dark={dark}>
        <SectionHead eyebrow="Safeguarding & standards" title="Your students are protected." sub="Every club runs to the same standards, everywhere in Nigeria — so heads, teachers, and parents can say yes with confidence." dark={dark} center />
        <div style={grid(240)}>
          {[
            { e: "🧑‍🏫", t: "Adult supervision, always", d: "Every club is guided by a named teacher advisor appointed by the school. No unsupervised activity, ever." },
            { e: "✍️", t: "Parental consent first", d: "Written parental consent is collected for every member before a club is inaugurated. Parents stay informed." },
            { e: "🛡️", t: "Privacy by design", d: "Builders appear publicly by first name only. We never publish surnames, contact details, or locations of minors." },
            { e: "📜", t: "A registered organisation", d: `Nation Builders Corp is a programme of KidsInspiring Nation, registered in Nigeria (CAC ${SITE.registrationId}) — with full records kept for every club.` },
          ].map((b, i) => (
            <TiltCard key={i} dark={dark}>
              <span style={{ fontSize: "1.6rem" }}>{b.e}</span>
              <h4 style={{ fontSize: "1.02rem", fontWeight: 800, color: s.txt, margin: ".6rem 0 .5rem" }}>{b.t}</h4>
              <p style={{ color: s.sub, lineHeight: 1.6, margin: 0, fontSize: ".93rem" }}>{b.d}</p>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* Chapter request form */}
      <Section dark={dark} id="request">
        <SectionHead eyebrow="Charter your club" title="Request your chapter" sub="Three quick fields — that's all it takes to get your school on the national map. Your member roster comes later, by email." dark={dark} center />
        <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
          <ClubRequestForm dark={dark} />
        </div>
      </Section>
    </div>
  );
}
