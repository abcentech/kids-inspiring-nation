import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    ChevronDown, ArrowRight, BookOpen, Clock, Instagram, Youtube, Heart,
    School, Users, Wrench, Flame, Mic, Trophy, Menu, X as XIcon, Download,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTE_META, T, SITE } from './siteConfig.js';
import { usePageMeta } from './usePageMeta.js';
import { NBC_MODULES } from './nbcCourse.js';
import NBCEmblem from './nbc/NBCEmblem.jsx';
import Crest3D from './nbc/three/Crest3D.jsx';
import BuilderID from './nbc/BuilderID.jsx';
import NationalLedger from './nbc/NationalLedger.jsx';
import WallOfBuilders from './nbc/WallOfBuilders.jsx';
import { NBC, PILLARS, CALENDAR, C } from './nbc/nbcBrand.js';
import GalleryStrip from './nbc/GalleryStrip.jsx';

/* Subtle film grain for depth. */
const GRAIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E";

const Eyebrow = ({ children, center }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 12, color: C.gold, fontWeight: 800, letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".76rem", justifyContent: center ? "center" : "flex-start" }}>
        <span style={{ width: 38, height: 2, background: C.gold }} /> {children}
    </div>
);

const FAQItem = ({ faq, idx, s }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05, duration: 0.5 }} viewport={{ once: true, margin: "-40px" }}
            onClick={() => setOpen(!open)}
            style={{ background: s.surf, padding: "1.75rem 2rem", borderRadius: 20, border: `1px solid ${open ? C.gold : s.brd}`, cursor: "pointer", transition: "border-color .3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: open ? C.goldD : s.txt, margin: 0 }}>{faq.q}</h4>
                <motion.div animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={20} color={open ? C.gold : s.sub} /></motion.div>
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} style={{ overflow: "hidden" }}>
                        <p style={{ padding: "1.1rem 0 0", color: s.sub, lineHeight: 1.65, borderTop: `1px solid ${s.brd}`, marginTop: "1.1rem" }}>{faq.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const INITIATIVES = [
    { Icon: School, t: "Nation Builders Club", d: "A chapter of builders in every school, led by a teacher-advisor — meeting through the terms and running projects together.", href: "/nbc/course/start-a-club", cta: "Start a club" },
    { Icon: BookOpen, t: "The Course", d: "Free, bite-sized lessons anyone can take and share with the world. Earn Builder Badges and keep your streak.", href: "/nbc/course", cta: "Take the course" },
    { Icon: Wrench, t: "Community Projects", d: "Every builder solves one real local problem — with creativity and grit, not cash — and logs the impact each month.", href: "#join", cta: "Start a project" },
    { Icon: Flame, t: "Weekly Streak", d: "Check in once a week to keep your Builder Streak alive. Thirteen weeks completes a term — a habit that compounds character across the year.", href: "/nbc/students#streak", cta: "Build your streak" },
    { Icon: Mic, t: "December Conference", d: "The nation's builders gather to learn, connect, and showcase the year's work so far.", href: "#journey", cta: "See the year" },
    { Icon: Trophy, t: "July Grand Finale", d: "The session culminates as the most impactful builders are honoured by the nation and awarded.", href: "#recognition", cta: "See the prizes" },
];

const FAQS = [
    { q: "What exactly is the Nation Builders Corp?", a: "A national movement where young people (7–17) become 'Nation Builders' — solving real community problems with character and resourcefulness. It runs July to July, with the school calendar." },
    { q: "How do I join?", a: "Generate your free Builder ID in 30 seconds above — no sign-up needed to start. Then register your project and take the free course when you're ready." },
    { q: "Do I need money to take part?", a: "No. NBC is a test of resourcefulness, not wealth. The best builders solve problems with waste, volunteers, and creativity — often spending zero naira." },
    { q: "When does the program run?", a: "July to July — from the end of one 3rd term to the next. You join in July, build through the terms, meet at the December Conference, and finish at the July Grand Finale." },
    { q: "What is the December Nation Builders Conference?", a: "Our national gathering. Builders and school clubs come together to learn, connect, and showcase the year's work so far — a mid-year boost on the road to the Grand Finale." },
    { q: "What happens at the July Grand Finale?", a: "It's the culmination of the session and our elite recognition event. The most impactful builders are celebrated, their projects showcased, and ₦3,000,000 in prizes awarded." },
    { q: "How do I start a Nation Builders Club in my school?", a: "Four steps: find a teacher-advisor, gather at least 10 students, submit the Chapter Request, then send your member roster. Start with the free 'Start a Club' lesson in the course." },
    { q: "What are the 8 core values?", a: "Integrity, Discipline, Wisdom, Service, Justice, Perseverance, Humility, and Excellence — the building blocks of a true Nation Builder. Learn them in the free course." },
    { q: "Will I get a certificate?", a: "Yes — every builder who submits a complete Impact Report earns a certificate, and top referrers and finalists receive national recognition." },
    { q: "Is there a community I can join?", a: "Yes. After you register you'll get the link to our official WhatsApp community — the best place for updates and to meet other builders." },
];

export default function NVC({ dark }) {
    usePageMeta(ROUTE_META.nbc);
    const [scrolled, setScrolled] = useState(false);
    const [menu, setMenu] = useState(false);
    const { scrollY } = useScroll();
    const crestY = useTransform(scrollY, [0, 600], [0, 120]);
    const crestRotate = useTransform(scrollY, [0, 600], [0, 20]);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    const s = dark
        ? { bg: T.bgD, surf: T.srfD, brd: T.brdD, txt: T.d1, sub: T.d2 }
        : { bg: T.cream, surf: "#FFFFFF", brd: "rgba(11,42,27,.06)", txt: T.green, sub: T.greenM };

    const navSolid = scrolled || menu;
    const navBg = navSolid ? (dark ? "rgba(5,14,10,.9)" : "rgba(250,249,246,.92)") : "transparent";
    const navTxt = navSolid ? (dark ? C.goldL : C.green) : C.cream;

    const NAV = [["The Pledge", "#join"], ["Movement", "#movement"], ["Course", "/nbc/course"], ["The Year", "#journey"], ["Fund", "/nbc/fund"]];

    return (
        <div style={{ fontFamily: "'DM Sans',sans-serif", background: s.bg, color: s.txt, overflowX: "hidden" }}>
            <div aria-hidden style={{ position: "fixed", inset: 0, backgroundImage: `url("${GRAIN}")`, opacity: dark ? 0.05 : 0.03, pointerEvents: "none", zIndex: 1, mixBlendMode: "overlay" }} />

            {/* Hero */}
            <section id="top" style={{ minHeight: "100svh", background: C.greenD, position: "relative", display: "flex", alignItems: "center", overflow: "hidden", padding: "7rem 0 4rem" }}>
                <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 18% 28%, ${C.gold}18 0%, transparent 42%), radial-gradient(circle at 82% 75%, ${C.green}55 0%, transparent 55%), linear-gradient(160deg, ${C.greenD} 0%, ${C.greenM} 55%, ${C.greenD} 100%)` }} />
                <motion.div aria-hidden style={{ position: "absolute", right: "-4vw", top: "10vh", y: crestY, opacity: 0.92, zIndex: 1 }}>
                    <Crest3D size={520} emblemId="hero" />
                </motion.div>
                <div aria-hidden style={{ position: "absolute", left: "-3vw", bottom: "-4vh", fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900, fontSize: "34vw", color: "transparent", WebkitTextStroke: `1px ${C.gold}12`, userSelect: "none", lineHeight: .8 }}>NBC</div>

                <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)", position: "relative", zIndex: 2, width: "100%" }}>
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} style={{ maxWidth: "60rem" }}>
                        <div style={{ marginBottom: "1.75rem" }}><Eyebrow>🇳🇬 The Nation Builders Corp</Eyebrow></div>
                        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem, 9vw, 6.8rem)", fontWeight: 900, color: C.cream, lineHeight: .88, letterSpacing: "-.045em", margin: "0 0 1.75rem" }}>
                            Don't wait for the nation.<br /><em style={{ fontStyle: "italic", color: C.goldL }}>Build</em> it.
                        </h1>
                        <p style={{ display: "inline-flex", alignItems: "center", gap: ".7rem", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", fontSize: ".82rem", color: C.goldL, margin: "0 0 1.5rem", padding: ".5rem .95rem", border: `1px solid ${C.gold}44`, borderRadius: 999, background: `${C.gold}10` }}>
                            <span aria-hidden style={{ fontSize: "1rem" }}>🏛️</span> Our mandate — {NBC.mandate}
                        </p>
                        <p style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)", color: "rgba(250,249,246,.82)", lineHeight: 1.6, marginBottom: "2.75rem", maxWidth: "46ch" }}>
                            A movement of young Nigerians solving real community problems with character and grit — one school, one project, one year at a time. Become a Nation Builder in 30 seconds.
                        </p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} href="#join" style={{ padding: "1.15rem 2.6rem", borderRadius: 999, background: C.gold, color: "#14532d", fontWeight: 800, fontSize: "1.1rem", boxShadow: `0 15px 40px ${C.gold}45`, textDecoration: "none" }}>Become a Builder</motion.a>
                            <motion.a whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} href="/nbc/course" style={{ padding: "1.15rem 2.2rem", borderRadius: 999, background: "rgba(253,247,236,.07)", color: C.cream, fontWeight: 800, fontSize: "1.05rem", border: "1px solid rgba(253,247,236,.25)", backdropFilter: "blur(10px)", display: "inline-flex", alignItems: "center", gap: ".5rem", textDecoration: "none" }}><BookOpen size={18} /> Take the free course</motion.a>
                        </div>
                    </motion.div>
                </div>
                <motion.div aria-hidden animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", color: "rgba(253,247,236,.5)", zIndex: 2 }}>
                    <ChevronDown size={26} />
                </motion.div>
            </section>

            {/* Live ticker */}
            <div style={{ background: dark ? T.srfD : C.green, borderBottom: `1px solid ${C.gold}22`, padding: ".8rem 0", position: "relative", zIndex: 2 }}>
                <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", gap: "1.5rem", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", whiteSpace: "nowrap" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.ok, animation: "pulse 2s infinite" }} />
                        <span style={{ fontSize: ".76rem", fontWeight: 800, color: C.cream, textTransform: "uppercase", letterSpacing: ".08em" }}>Live</span>
                    </div>
                    <motion.div animate={{ x: ["100%", "-100%"] }} transition={{ duration: 32, repeat: Infinity, ease: "linear" }} style={{ whiteSpace: "nowrap", flex: 1, color: "rgba(253,247,236,.7)", fontSize: ".85rem", fontWeight: 500 }}>
                        · NEW BUILDER: NB-2026-4821, Kano · CHARTERED: Govt College, Ibadan · PROJECT LOGGED: "Waste to Wealth", Lagos · COURSE STARTED: Port Harcourt · CONFERENCE: December · GRAND FINALE: July ·
                    </motion.div>
                </div>
            </div>

            {/* Become a Builder — Pledge + ID card */}
            <section id="join" style={{ background: `linear-gradient(180deg, ${C.green} 0%, ${C.greenD} 100%)`, color: C.cream, padding: "clamp(4.5rem,10vw,8rem) 0", position: "relative", zIndex: 2 }}>
                <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
                    <div style={{ textAlign: "center", marginBottom: "3.5rem", maxWidth: "42rem", marginInline: "auto" }}>
                        <div style={{ marginBottom: "1.25rem", display: "flex", justifyContent: "center" }}><Eyebrow center>Take the oath</Eyebrow></div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5.5vw,3.4rem)", fontWeight: 900, lineHeight: 1.08, margin: "0 0 1.5rem" }}>Get your Builder ID.<br /><span style={{ color: C.goldL }}>Carry it with pride.</span></h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: ".35rem", color: "rgba(250,249,246,.75)", fontStyle: "italic", fontFamily: "'Playfair Display',serif", fontSize: "clamp(1rem,2.4vw,1.2rem)", lineHeight: 1.5 }}>
                            {NBC.pledge.map((line, i) => <span key={i} style={i === NBC.pledge.length - 1 ? { color: C.goldL, fontWeight: 700, marginTop: ".4rem" } : undefined}>{line}</span>)}
                        </div>
                    </div>
                    <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(230,201,143,.16)", borderRadius: 32, padding: "clamp(1.5rem,4vw,3rem)" }}>
                        <BuilderID />
                    </div>
                </div>
            </section>

            {/* Movement / national ledger */}
            <NationalLedger />

            {/* Wall of Builders */}
            <WallOfBuilders />

            {/* Moments — Nation Builders Corp National Values gallery */}
            <GalleryStrip dark={dark} />

            {/* Receipts — the proof behind the promise */}
            <section aria-label="Our track record" style={{ background: dark ? "#080808" : "#FFFFFF", borderBottom: `1px solid ${s.brd}`, padding: "clamp(3rem,7vw,5rem) 0" }}>
                <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "2.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: ".75rem" }}><Eyebrow center>A movement with receipts</Eyebrow></div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,4.5vw,2.6rem)", fontWeight: 900, color: s.txt, margin: 0 }}>Promises are easy. Here's the proof.</h2>
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: "1rem", textAlign: "center" }}>
                        {[
                            ["639", "children reached", "as at 2025"],
                            ["365", "events held", "as at 2025"],
                            ["14", "active programmes", "running year-round"],
                            ["₦595,119", "top winner's cheque", "2025 Grand Finale"],
                            ["2017", "building since", `CAC ${SITE.registrationId}`],
                        ].map(([n, l, sub], i) => (
                            <motion.div key={l} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}
                                style={{ background: s.surf, border: `1px solid ${s.brd}`, borderRadius: 20, padding: "1.5rem 1rem" }}>
                                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 900, color: C.goldD, lineHeight: 1 }}>{n}</div>
                                <div style={{ fontWeight: 800, color: s.txt, fontSize: ".92rem", marginTop: ".5rem" }}>{l}</div>
                                <div style={{ color: s.sub, fontSize: ".78rem", marginTop: ".2rem" }}>{sub}</div>
                            </motion.div>
                        ))}
                    </div>
                    <p style={{ textAlign: "center", color: s.sub, fontSize: ".85rem", marginTop: "1.5rem", marginBottom: 0 }}>
                        Numbers from the KidsInspiring Nation 2025 impact records and the Nation Builders Corp National Values Challenge Grand Finale.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section id="mission" style={{ padding: "clamp(4.5rem,10vw,8rem) 0", background: s.bg }}>
                <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "clamp(2.5rem,6vw,5rem)", alignItems: "center" }}>
                        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <Eyebrow>The mission</Eyebrow>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, color: s.txt, lineHeight: 1.1, margin: "1rem 0 1.5rem" }}>Character is the highest form of national capital.</h2>
                            <p style={{ fontSize: "1.1rem", color: s.sub, lineHeight: 1.7, marginBottom: "2rem" }}>
                                We believe money is secondary to character. The Nation Builders Corp is a meritocracy where young Nigerians learn to build a nation from the ground up — solving local problems using only creativity, discipline, and service.
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                                {[["🎯", "Discipline first", "No handouts. We teach the hustle it takes to lead."], ["🤝", "Radical service", "Lead by solving your neighbour's problems."]].map(([e, t, d]) => (
                                    <div key={t} style={{ display: "flex", gap: "1rem" }}>
                                        <span style={{ fontSize: "1.4rem" }}>{e}</span>
                                        <div><h4 style={{ fontWeight: 800, color: s.txt, margin: 0 }}>{t}</h4><p style={{ color: s.sub, margin: ".2rem 0 0", fontSize: ".95rem" }}>{d}</p></div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, scale: .95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ background: C.green, color: "#fff", padding: "clamp(2.5rem,6vw,4rem) 2.5rem", borderRadius: 32, textAlign: "center", position: "relative", overflow: "hidden" }}>
                            <div aria-hidden style={{ position: "absolute", top: -50, right: -50, opacity: .12 }}><NBCEmblem size={240} ring={false} id="mission" /></div>
                            <div style={{ position: "relative" }}>
                                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", color: C.goldL, fontSize: "4rem", fontWeight: 900, lineHeight: 1 }}>7–17</div>
                                <p style={{ textTransform: "uppercase", letterSpacing: ".18em", fontSize: ".78rem", fontWeight: 700, opacity: .9, marginTop: ".5rem" }}>The age of a builder</p>
                                <div style={{ height: 1, background: "rgba(255,255,255,.15)", margin: "2rem 0" }} />
                                <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, fontStyle: "italic", lineHeight: 1.35, color: C.cream, margin: 0 }}>"You don't need to be an adult to build a nation. You just need a problem you refuse to ignore."</blockquote>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Initiatives */}
            <section id="initiatives" style={{ padding: "clamp(4.5rem,10vw,8rem) 0", background: dark ? "#080808" : "#FFFFFF", borderTop: `1px solid ${s.brd}` }}>
                <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: ".75rem" }}><Eyebrow center>How it works</Eyebrow></div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5.5vw,3.2rem)", fontWeight: 900, color: s.txt }}>Six ways we build nation builders</h2>
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: "1.25rem" }}>
                        {INITIATIVES.map((c, idx) => (
                            <motion.a key={c.t} href={c.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }} whileHover={{ y: -6 }}
                                style={{ background: s.surf, border: `1px solid ${s.brd}`, borderRadius: 24, padding: "2rem", textDecoration: "none", color: s.txt, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
                                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(197,160,55,.12)", display: "grid", placeItems: "center", marginBottom: "1.25rem" }}><c.Icon size={24} color={C.goldD} /></div>
                                <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: ".5rem" }}>{c.t}</h3>
                                <p style={{ fontSize: ".95rem", color: s.sub, lineHeight: 1.6, flex: 1, marginBottom: "1.25rem" }}>{c.d}</p>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.goldD, fontWeight: 800, fontSize: ".9rem" }}>{c.cta} <ArrowRight size={15} /></span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Course */}
            <section id="course" style={{ padding: "clamp(4.5rem,10vw,8rem) 0", background: s.bg }}>
                <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ borderLeft: `4px solid ${C.gold}`, paddingLeft: "2rem", marginBottom: "3rem" }}>
                        <div style={{ marginBottom: ".5rem" }}><Eyebrow>Learn &amp; share</Eyebrow></div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, color: s.txt }}>The Nation Builders Course.</h2>
                        <p style={{ color: s.sub, fontSize: "1.15rem", marginTop: ".5rem", maxWidth: "58ch" }}>We tore up the PDFs and built something better: short, free lessons anyone can take — and share with the world. Track progress, earn Builder Badges, keep your streak.</p>
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
                        {NBC_MODULES.slice(0, 4).map((m, idx) => (
                            <motion.a key={m.slug} href={`/nbc/course/${m.slug}`} initial={{ opacity: 0, scale: .95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }} whileHover={{ y: -5 }}
                                style={{ background: s.surf, padding: "2rem 1.5rem", borderRadius: 24, border: `1px solid ${s.brd}`, display: "flex", flexDirection: "column", textDecoration: "none", color: s.txt }}>
                                <div style={{ fontSize: "2.2rem", marginBottom: ".75rem" }}>{m.emoji}</div>
                                <h4 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: ".4rem" }}>{m.title}</h4>
                                <p style={{ fontSize: ".85rem", color: s.sub, lineHeight: 1.5, flex: 1, marginBottom: "1rem" }}>{m.summary}</p>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: ".8rem", fontWeight: 700, color: C.goldD }}><Clock size={13} /> {m.minutes} min</span>
                            </motion.a>
                        ))}
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <a href="/nbc/course" style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", padding: "1rem 2.5rem", borderRadius: 999, background: C.green, color: "#fff", fontWeight: 800, fontSize: "1.05rem", textDecoration: "none" }}>Explore all {NBC_MODULES.length} lessons <ArrowRight size={18} /></a>
                    </div>
                </div>
            </section>

            {/* The Year — journey */}
            <section id="journey" style={{ padding: "clamp(4.5rem,10vw,8rem) 0", background: C.greenD, color: C.cream, position: "relative", overflow: "hidden" }}>
                <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 20%, ${C.gold}12, transparent 50%)` }} />
                <div style={{ maxWidth: "58rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)", position: "relative" }}>
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: ".75rem" }}><Eyebrow center>The July → July year</Eyebrow></div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5.5vw,3.2rem)", fontWeight: 900 }}>A nation-building year, in five acts.</h2>
                        <p style={{ color: "rgba(250,249,246,.6)", fontSize: "1.05rem", marginTop: ".5rem" }}>Our calendar runs with the schools — from the end of one 3rd term to the next.</p>
                    </motion.div>
                    <div style={{ position: "relative", paddingLeft: "clamp(1.5rem,5vw,2.5rem)" }}>
                        <div style={{ position: "absolute", left: "clamp(.35rem,1.2vw,.65rem)", top: 8, bottom: 8, width: 2, background: `linear-gradient(${C.gold}, ${C.gold}22)` }} />
                        {CALENDAR.map((evt, idx) => (
                            <motion.div key={idx} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }} viewport={{ once: true }} style={{ position: "relative", marginBottom: idx === CALENDAR.length - 1 ? 0 : "2.5rem" }}>
                            <div style={{ position: "absolute", left: "calc(-1 * clamp(1.5rem,5vw,2.5rem) + clamp(.35rem,1.2vw,.65rem) - 6px)", top: 4, width: 14, height: 14, borderRadius: "50%", background: C.gold, border: `3px solid ${C.greenD}`, boxShadow: `0 0 0 3px ${C.gold}33` }} />
                                <div style={{ fontSize: ".8rem", fontWeight: 800, color: C.goldL, textTransform: "uppercase", letterSpacing: ".1em" }}>{evt.tag}</div>
                                <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 800, margin: ".25rem 0 .4rem" }}>{evt.title}</h4>
                                <p style={{ color: "rgba(250,249,246,.7)", lineHeight: 1.6, margin: 0 }}>{evt.body}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mandate band */}
            <section aria-label="Our mandate" style={{ background: C.greenD, color: C.cream, padding: "clamp(3.5rem,8vw,6rem) 0", position: "relative", overflow: "hidden", borderTop: `1px solid ${C.gold}22`, borderBottom: `1px solid ${C.gold}22` }}>
                <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 120%, ${C.gold}18 0%, transparent 60%)` }} />
                <div style={{ maxWidth: "56rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)", textAlign: "center", position: "relative", zIndex: 2 }}>
                    <div style={{ marginBottom: "1.25rem", display: "flex", justifyContent: "center" }}><Eyebrow center>Our mandate</Eyebrow></div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "clamp(2rem,6vw,3.6rem)", lineHeight: 1.05, letterSpacing: "-.02em", margin: 0 }}>
                        In <em style={{ fontStyle: "italic", color: C.goldL }}>7 Decades</em>, Nigeria Will Be Built.
                    </motion.h2>
                    <p style={{ color: "rgba(250,249,246,.75)", fontSize: "1.05rem", lineHeight: 1.65, marginTop: "1.5rem", maxWidth: "42rem", marginInline: "auto" }}>
                        Not in one election cycle. Not by one government. Nation building is a 70-year work of character — carried by generation after generation of young builders. We are the first. {NBC.heritage}.
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem", marginTop: "2.25rem" }}>
                        {[
                            ["3rd", "most populous nation on Earth by 2050 — Nigeria's projected rank"],
                            ["~18", "the median age of a Nigerian — this is a nation of children"],
                        ].map(([n, l]) => (
                            <div key={n} style={{ display: "flex", alignItems: "center", gap: ".9rem", background: "rgba(255,255,255,.05)", border: `1px solid ${C.gold}33`, borderRadius: 16, padding: ".9rem 1.4rem", maxWidth: "21rem", textAlign: "left" }}>
                                <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.7rem", fontWeight: 900, color: C.goldL, flexShrink: 0 }}>{n}</span>
                                <span style={{ fontSize: ".85rem", color: "rgba(250,249,246,.75)", lineHeight: 1.45 }}>{l}</span>
                            </div>
                        ))}
                    </div>
                    <p style={{ color: C.goldL, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontSize: "1.1rem", marginTop: "1.75rem", marginBottom: 0 }}>
                        Whoever builds Nigeria's children is building a meaningful share of humanity's future.
                    </p>
                </div>
            </section>

            {/* Recognition / prizes */}
            <section id="recognition" style={{ padding: "clamp(4.5rem,10vw,8rem) 0", background: s.bg }}>
                <div style={{ maxWidth: "78rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: ".75rem" }}><Eyebrow center>Honoured by the nation</Eyebrow></div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5.5vw,3.2rem)", fontWeight: 900, color: s.txt }}>₦3,000,000 in prizes at the July Grand Finale</h2>
                        <p style={{ color: s.sub, fontSize: "1.05rem", marginTop: ".5rem" }}>Awarded to the builders whose character and impact moved the nation.</p>
                    </motion.div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "1.5rem" }}>
                        {[{ n: "₦1.19M", t: "Most Impactful Project", i: "🥇" }, { n: "₦200K", t: "Top 5 Projects (each)", i: "🌟" }, { n: "₦200K", t: "Category Awards", i: "🏆" }].map((p, idx) => (
                            <motion.div key={p.t} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} viewport={{ once: true }} whileHover={{ y: -8 }}
                                style={{ background: C.green, color: C.cream, padding: "3rem 2rem", borderRadius: 28, textAlign: "center", position: "relative", overflow: "hidden", border: `1px solid rgba(230,201,143,.2)` }}>
                                <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: C.gold }} />
                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{p.i}</div>
                                <div style={{ fontSize: "2.4rem", fontWeight: 900, color: C.goldL, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.n}</div>
                                <div style={{ fontSize: ".8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".12em", marginTop: ".5rem", opacity: .85 }}>{p.t}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fund */}
            <section id="fund" style={{ padding: "clamp(4.5rem,10vw,8rem) 0", background: C.green, color: C.cream, position: "relative", overflow: "hidden" }}>
                <div aria-hidden style={{ position: "absolute", top: "-6rem", right: "-4rem", opacity: .08 }}><NBCEmblem size={360} ring={false} id="fund" /></div>
                <div style={{ maxWidth: "68rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)", position: "relative" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: "3rem", alignItems: "center" }}>
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div style={{ marginBottom: "1rem" }}><Eyebrow>For donors &amp; funders</Eyebrow></div>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, lineHeight: 1.1, marginBottom: "1.25rem" }}>Invest in the character of a generation.</h2>
                            <p style={{ fontSize: "1.1rem", color: "rgba(250,249,246,.82)", lineHeight: 1.6, marginBottom: "2rem" }}>Your gift equips school clubs, keeps the course free for every child, and powers the December Conference and July Grand Finale. Every project is documented and measured.</p>
                            <Link to="/nbc/fund" style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", padding: "1.1rem 2.6rem", borderRadius: 999, background: C.gold, color: "#14532d", fontWeight: 800, fontSize: "1.1rem", textDecoration: "none" }}>Become a Funder <ArrowRight size={18} /></Link>
                        </motion.div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {[["$250", "equips one school club for a term"], ["$2,500", "trains a cohort of 50 builders"], ["$25,000", "powers the national Conference & Grand Finale"]].map(([a, d]) => (
                                <div key={a} style={{ display: "flex", alignItems: "baseline", gap: "1rem", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 16, padding: "1.1rem 1.5rem" }}>
                                    <span style={{ fontSize: "1.6rem", fontWeight: 900, color: C.goldL, fontFamily: "'Plus Jakarta Sans',sans-serif", minWidth: "5.5rem" }}>{a}</span>
                                    <span style={{ color: "rgba(250,249,246,.85)" }}>{d}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" style={{ padding: "clamp(4.5rem,10vw,8rem) 0", background: dark ? "#050505" : "#FAFAF5", borderTop: `1px solid ${s.brd}` }}>
                <div style={{ maxWidth: "58rem", margin: "0 auto", padding: "0 clamp(1.25rem,4vw,2.5rem)" }}>
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: 900, color: s.txt }}>Questions, answered.</h2>
                        <p style={{ color: s.sub, marginTop: ".5rem" }}>Everything you need to know before you build.</p>
                    </motion.div>
                    <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
                        {FAQS.map((faq, idx) => <FAQItem key={idx} faq={faq} idx={idx} s={s} />)}
                    </div>
                </div>
            </section>


            <style>{`
                @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
                @media (min-width: 768px) { .md\\:flex { display: flex !important; } .md\\:hidden { display: none !important; } }
                @media (max-width: 767px) { .md\\:flex { display: none !important; } }
            `}</style>
        </div>
    );
}
