import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, HeartHandshake, ShieldCheck, CreditCard, Users, BookOpen } from "lucide-react";
import { ROUTE_META, SITE, T } from "./siteConfig.js";
import { usePageMeta } from "./usePageMeta.js";

function FaqItem({ q, a, open, onToggle, dark, idx = 0 }) {
  const surf = dark ? "rgba(255,255,255,.03)" : "#fff";
  const brd = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.1)";
  const txt = dark ? T.cream : T.greenD;
  const sub = dark ? "rgba(253,247,236,.7)" : T.p2;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ 
          delay: idx * 0.05, 
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1]
      }} 
      viewport={{ once: true, margin: "-50px" }}
      onClick={onToggle}
      style={{ 
          background: surf, 
          padding: "2rem", 
          borderRadius: "24px", 
          border: `1px solid ${open ? T.gold : brd}`, 
          boxShadow: open ? `0 20px 50px ${T.gold}15` : (dark ? "0 4px 20px rgba(0,0,0,0.1)" : "0 4px 20px rgba(0,0,0,0.02)"), 
          cursor: "pointer",
          transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          position: "relative",
          overflow: "hidden"
      }}
      whileHover={{ y: -5, borderColor: T.gold + "66", boxShadow: dark ? "0 12px 30px rgba(0,0,0,0.2)" : "0 12px 30px rgba(0,0,0,0.04)" }}
    >
      {open && (
          <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  width: "4px", 
                  height: "100%", 
                  background: T.gold 
              }} 
          />
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: open ? T.gold : txt, margin: 0, paddingRight: '2rem', transition: "color 0.3s" }}>{q}</h4>
          <motion.div 
              animate={{ rotate: open ? 180 : 0, color: open ? T.gold : (dark ? "rgba(253,247,236,.6)" : T.p2) }} 
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
              <ChevronDown size={22} strokeWidth={2.5} />
          </motion.div>
      </div>
      <AnimatePresence>
          {open && (
              <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: "auto", opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }} 
                  transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  style={{ overflow: "hidden" }}
              >
                  <div style={{ padding: "1.25rem 0 0.5rem 0", fontSize: "1.05rem", color: sub, lineHeight: 1.6, borderTop: `1px solid ${brd}`, marginTop: "1.25rem" }}>
                      {a}
                  </div>
              </motion.div>
          )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ({ dark }) {
  usePageMeta(ROUTE_META.faq);

  const [openKey, setOpenKey] = useState(null);

  const sections = useMemo(() => ([
    {
      key: "giving",
      icon: <CreditCard size={18} />,
      title: "Giving",
      desc: "Donations, verification, designated accounts, and receipts.",
      items: [
        { q: "How can I donate to KidsInspiring Nation?", a: "You can give by bank transfer (default on our Give page) or give online via Paystack. Visit /give to choose a method." },
        { q: "What is the official bank for giving?", a: "Our main account bank is TITAN TRUST BANK. Designated accounts are Paystack–Titan channels as labeled on the Give page." },
        { q: "Can I designate my donation (Education, Feeding, Projects)?", a: "Yes. Use the designated accounts on /give to support Education, Feeding, Projects, goDsHub, and other focus areas." },
        { q: "How do I verify donation details to avoid scams?", a: "Only trust details published on kidsinspiringnation.org and our official channels. If unsure, confirm via the official WhatsApp number before transferring." },
        { q: "Do you confirm receipt for bank transfers?", a: "Yes. After a bank transfer, message us on WhatsApp to confirm (especially for large gifts)." },
        { q: "Can I set up monthly giving?", a: "Yes. Start with any giving method, then message us on WhatsApp and we’ll help you set up consistent monthly giving." },
        { q: "Do you issue receipts?", a: "If you need a ministry receipt or confirmation beyond your bank/Paystack record, contact us via WhatsApp or email with the transfer details." },
      ],
    },
    {
      key: "programmes",
      icon: <BookOpen size={18} />,
      title: "Programmes",
      desc: "What we run, who it’s for, and how to join.",
      items: [
        { q: "What does KidsInspiring Nation do?", a: "We raise children and teenagers with character, skills, service culture, and faith through consistent programmes and communities." },
        { q: "Who can join the programmes?", a: "Children and teenagers who are willing to grow. Parents and guardians participate through guidance, routines, and support." },
        { q: "How do I join KIND Daily?", a: "Join via the official WhatsApp channel (linked on the site) and follow the daily schedule." },
        { q: "What is the National Builders Challenge (NBC)?", a: "NBC is a structured nation-building programme where young Nigerians learn values, build solutions to real problems, and are recognized for excellence." },
        { q: "Do you have programmes for schools or communities?", a: "Yes. Use /contact (subject: Partner) to discuss running a programme stream in a school or community." },
      ],
    },
    {
      key: "parents",
      icon: <Users size={18} />,
      title: "Parents & Guardians",
      desc: "Practical questions from families.",
      items: [
        { q: "Is KidsInspiring Nation a church?", a: "We are a faith-based NGO. Our programmes are centered on character, values, and spiritual formation." },
        { q: "Is participation safe for children?", a: "We prioritize child wellbeing, responsible communication, and appropriate supervision by parents/guardians." },
        { q: "What age range is best?", a: "We serve both children and teenagers. The best fit depends on the programme track and the child’s readiness to engage consistently." },
        { q: "What if my child is shy or not confident?", a: "Our environment is designed to grow confidence over time through consistent participation, mentorship, and service." },
        { q: "How do I register a child or ask for guidance?", a: "Use /contact and select “Register a Child” so we can respond with the right next step." },
      ],
    },
    {
      key: "partners",
      icon: <HeartHandshake size={18} />,
      title: "Partnerships & Volunteering",
      desc: "How to collaborate and serve with us.",
      items: [
        { q: "How can my organization partner with KidsInspiring Nation?", a: "Reach us via /contact (subject: Partner). Share your goals, location, and how you’d like to collaborate." },
        { q: "Can I volunteer?", a: "Yes. Use /contact (subject: Volunteer) and tell us your skills, availability, and city." },
        { q: "Do you accept in-kind donations?", a: "Yes. Books, materials, and other items can be delivered to our hub. See /give for details." },
        { q: "Can I sponsor a programme focus (Education, Feeding)?", a: "Yes. Use designated giving on /give and contact us so we can align reporting and updates." },
        { q: "Do you work with schools?", a: "Yes. We can explore pilot programmes and structured rollouts with school leadership." },
      ],
    },
    {
      key: "trust",
      icon: <ShieldCheck size={18} />,
      title: "Trust & Accountability",
      desc: "Verification, transparency, and updates.",
      items: [
        { q: "Where can I read your verification and transparency rules?", a: "Visit /transparency for official verification guidance and donor trust information." },
        { q: "Why do you publish designated accounts?", a: "It makes giving clear and prevents drift: donors can support specific focus areas with confidence." },
        { q: "What should I do if I see conflicting donation details online?", a: "Do not send money. Verify via the official WhatsApp number and cross-check the Give page." },
        { q: "Is the information on the website current?", a: `All information is presented as at ${SITE.infoAsAtYear}. For the most current updates, use the official WhatsApp channel and contact lines.` },
        { q: "How do I contact the team quickly?", a: "Use the Contact page or message the official WhatsApp number listed on this site." },
      ],
    },
  ]), []);

  const bg = dark ? "#050806" : "#FAFAF5";
  const txt = dark ? T.cream : T.greenD;
  const sub = dark ? "rgba(253,247,236,.7)" : T.p2;
  const brd = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.1)";

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: txt, minHeight: "100vh" }}>
      <section style={{ background: T.greenD, padding: "clamp(5rem,12vw,8rem) 0 clamp(3rem,7vw,5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 65% at 15% 55%, ${T.green}55, transparent 60%), radial-gradient(ellipse 55% 60% at 85% 20%, ${T.gold}18, transparent 55%)` }} />
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: "rgba(253,247,236,.06)", border: "1px solid rgba(253,247,236,.12)", padding: ".45rem .9rem", borderRadius: 999, marginBottom: "1.25rem" }}>
              <HelpCircle size={16} color={T.goldL} />
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(253,247,236,.75)", fontWeight: 800 }}>
                Frequently Asked Questions
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.6rem,6.5vw,4.6rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.035em", marginBottom: "1.25rem", color: T.cream }}>
              Clear answers.<br />
              <em style={{ fontStyle: "italic", color: T.goldL }}>Confident action.</em>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2.2vw,1.15rem)", lineHeight: 1.75, color: "rgba(253,247,236,.72)", maxWidth: "74ch" }}>
              This is the site-wide FAQ for KidsInspiring Nation. If you don’t find your question, use the Contact page and we’ll help you.
            </p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: "clamp(3rem,8vw,6rem) 0" }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
            {sections.map((s) => (
              <a key={s.key} href={`#${s.key}`} style={{ background: dark ? "rgba(255,255,255,.03)" : "#fff", border: `1px solid ${brd}`, borderRadius: 18, padding: "1.05rem", textDecoration: "none", color: "inherit", display: "flex", gap: ".8rem", alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 14, display: "grid", placeItems: "center", background: `${T.gold}12`, color: dark ? T.goldL : T.greenD }}>
                  {s.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 950, marginBottom: ".2rem" }}>{s.title}</div>
                  <div style={{ color: sub, lineHeight: 1.55 }}>{s.desc}</div>
                </div>
              </a>
            ))}
          </div>

          {sections.map((s) => (
            <div key={s.key} id={s.key} style={{ marginTop: "2rem" }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.9rem", fontWeight: 900 }}>{s.title}</div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3 }}>
                  {s.items.length} questions
                </div>
              </div>
              <div style={{ display: "grid", gap: ".85rem" }}>
                {s.items.map((it, idx) => {
                  const key = `${s.key}:${idx}`;
                  return (
                    <FaqItem
                      key={key}
                      q={it.q}
                      a={it.a}
                      open={openKey === key}
                      onToggle={() => setOpenKey((v) => (v === key ? null : key))}
                      dark={dark}
                      idx={idx}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

