import React, { useState, useEffect } from 'react';
import {
    Home, ChevronRight, Target, Users, Award, BookOpen,
    MessageCircle, Send, Star, Trophy, Zap, Globe,
    CheckCircle2, Activity, Play, Download
} from 'lucide-react';

// ─── DESIGN TOKENS (Shared with KIN Main) ───────────────────────────────────
const T = {
    green: "#16613E", greenD: "#0D3D26", greenM: "#2C4A35",
    gold: "#C4882C", goldL: "#E8B954", goldD: "#9A6620",
    coral: "#D94F30", cream: "#FDF7EC", warmBg: "#F5EFE3",
    ok: "#34C759", warn: "#FF9F0A", err: "#FF3B30", info: "#0071E3",
    txtD: "#0A1C12",
    brd: "rgba(22,97,62,.09)",
};

// ─── COMPONENTS ─────────────────────────────────────────────────────────────
const GoDs = ({ style = {} }) => (
    <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", ...style }}>
        <span style={{ fontWeight: 900 }}>g</span>
        <span style={{ fontWeight: 900, color: "inherit" }}>oDs</span>
    </span>
);

export default function NVC({ onBack }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
    const [userId, setUserId] = useState('');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    useEffect(() => {
        // Reveal animation trigger
        const els = document.querySelectorAll(".reveal");
        const obs = new IntersectionObserver(
            es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("rev"); obs.unobserve(e.target); } }),
            { threshold: .1 }
        );
        els.forEach(el => obs.observe(el));
        return () => obs.disconnect();
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        setUserId('NB2025-' + (Math.floor(Math.random() * 8999) + 1000));
        setRegistrationSubmitted(true);
    };

    const navBg = scrolled ? "rgba(253,247,236,.92)" : "transparent";
    const navBdr = scrolled ? `1px solid ${T.brd}` : "1px solid transparent";
    const navTxt = scrolled ? T.greenD : T.cream;

    return (
        <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#FAFAF5", color: T.greenM, overflowX: "hidden" }}>

            {/* Navigation */}
            <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, padding: ".75rem 0", transition: "all .35s", background: navBg, backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom: navBdr }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div style={{ width: 32, height: 32, background: T.green, borderRadius: 8, display: "grid", placeItems: "center", color: T.goldL, fontWeight: 900, fontFamily: "'Playfair Display',serif" }}>g</div>
                        <div style={{ fontWeight: 700, fontSize: "0.9rem", color: navTxt, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.01em" }}>National Builders Corp 🇳🇬</div>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        {['About', 'Process', 'Prizes', 'Values'].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: navTxt, transition: "color .2s" }} onMouseEnter={e => e.currentTarget.style.color = T.gold}>{item}</a>
                        ))}
                        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: T.goldL, cursor: "pointer" }}>
                            <Home size={14} /> KIN Home
                        </button>
                        <a href="#register" style={{ padding: ".5rem 1.4rem", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 600, fontSize: "0.75rem", transition: "filter .2s" }}>Join Challenge</a>
                    </div>

                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden" style={{ color: navTxt }}>
                        <Activity size={24} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" style={{ minHeight: "100svh", background: T.greenD, position: "relative", display: "flex", alignItems: "center", overflow: "hidden", padding: "6rem 0" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 80% 40%,${T.green}50 0%,transparent 70%), linear-gradient(135deg,#060E08 0%,#0D3D26 60%,#16613E 100%)` }} />
                <div style={{ position: "absolute", left: "-5vw", bottom: "5vh", fontSize: "20vw", fontWeight: 900, color: "transparent", WebkitTextStroke: "1px rgba(196,136,44,.05)", fontFamily: "'Playfair Display',serif", fontStyle: "italic", userSelect: "none" }}>NBC</div>

                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2, width: "100%" }}>
                    <div style={{ maxWidth: "54rem" }}>
                        <div className="reveal d1" style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: T.goldL, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ width: 40, height: 1.5, background: T.gold }} /> 2025 National Builders Challenge
                        </div>
                        <h1 className="reveal d2" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.5rem, 8vw, 5.2rem)", fontWeight: 900, color: T.cream, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "2rem" }}>
                            Build the <em style={{ fontStyle: "italic", color: T.goldL }}>Nigeria</em><br />
                            You Want to <GoDs style={{ color: T.goldL }} />
                        </h1>
                        <p className="reveal d3" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(253,247,236,.7)", lineHeight: 1.6, marginBottom: "2.5rem", maxWidth: "45ch" }}>
                            Join 1,000 young <GoDs style={{ color: T.gold }} /> solving real community problems through universal values and resourcefulness. No money needed — just heart.
                        </p>

                        <div className="reveal d4" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                            <a href="#register" style={{ padding: "1.1rem 2.8rem", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 700, fontSize: "1.1rem", boxShadow: `0 12px 32px ${T.gold}40` }}>Register Now — Free</a>
                            <div style={{ background: "rgba(253,247,236,.06)", padding: "0.9rem 1.8rem", borderRadius: 999, border: "1px solid rgba(253,247,236,.15)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <Trophy size={20} color={T.goldL} />
                                <span style={{ color: T.cream, fontWeight: 700, fontSize: "1.1rem" }}>₦3,000,000 Grand Prize</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{ background: "#fff", borderBottom: `1px solid ${T.brd}`, padding: "4rem 0" }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2.5rem" }}>
                        {[
                            { n: "1,000", l: "Participants", i: <Users /> },
                            { n: "₦3,000,000", l: "Total Prizes", i: <Award /> },
                            { n: "7-10", l: "Elite Finalists", i: <Target /> },
                            { n: "Dec 17", l: "Grand Finale", i: <Zap /> },
                        ].map(s => (
                            <div key={s.l} className="reveal" style={{ textAlign: "center" }}>
                                <div style={{ color: T.gold, display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>{s.i}</div>
                                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.2rem", fontWeight: 900, color: T.greenD, lineHeight: 1 }}>{s.n}</div>
                                <div style={{ fontSize: "0.75rem", color: T.p2, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginTop: "0.3rem" }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" style={{ padding: "clamp(4rem, 10vw, 8rem) 0", background: T.warmBg }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 26rem), 1fr))", gap: "4rem", alignItems: "center" }}>
                        <div>
                            <div className="reveal" style={{ fontSize: "0.75rem", fontWeight: 600, color: T.gold, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>The Vision</div>
                            <h2 className="reveal d1" style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, color: T.greenD, lineHeight: 1.1, marginBottom: "1.5rem" }}>
                                National Builders Corp: Raising <em style={{ fontStyle: "italic", color: T.gold }}>Legacy</em>
                            </h2>
                            <p className="reveal d2" style={{ fontSize: "1.1rem", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                                NBC is a 10-month challenge for youth (ages 7-17) to solve REAL problems. We don't fund you — we train you to be resourceful.
                            </p>
                            <div className="reveal d3" style={{ background: T.green, borderRadius: 20, padding: "2rem", color: T.cream, position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: -10, right: -10, opacity: 0.1 }}><GoDs style={{ fontSize: "6rem" }} /></div>
                                <p style={{ fontSize: "1.25rem", fontStyle: "italic", fontWeight: 500, lineHeight: 1.5, position: "relative", zIndex: 2 }}>
                                    "You don't need money to build a nation. You need values, creativity, and persistent hustle."
                                </p>
                            </div>
                        </div>
                        <div className="reveal d2" style={{ background: T.greenD, borderRadius: 32, padding: "3rem", position: "relative", overflow: "hidden", minHeight: "26rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 10% 10%, ${T.gold}15 0%, transparent 50%)` }} />
                            <div style={{ position: "relative", zIndex: 2 }}>
                                <span style={{ display: "inline-block", background: T.gold, color: "#fff", padding: "0.4rem 1rem", borderRadius: 999, fontSize: "0.75rem", fontWeight: 700, marginBottom: "1rem" }}>EST. 2025</span>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.4rem", color: T.cream, fontWeight: 900, lineHeight: 1.1, marginBottom: "1rem" }}>Creating a New Standard for Nigerian Youth.</h3>
                                <div style={{ display: "flex", gap: "1rem" }}>
                                    <div style={{ width: 40, height: 2, background: T.gold, marginTop: "0.8rem" }} />
                                    <p style={{ color: "rgba(253,247,236,.6)", fontSize: "0.95rem" }}>Character-first problem solving at scale.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section id="process" style={{ padding: "clamp(4rem, 10vw, 8rem) 0", background: "#fff" }}>
                <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 2rem" }}>
                    <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", fontWeight: 900, color: T.greenD }}>The 6-Step Journey</h2>
                        <p style={{ color: T.p2, fontSize: "1.1rem", marginTop: "1rem" }}>From registration to the Grand Finale stage in Abuja.</p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {[
                            { t: "Register", d: "Fill the 10-minute form. No essays, no fees.", s: "March" },
                            { t: "Learn Values", d: "Download the Values Workbook and learn the 8 habits.", s: "April" },
                            { t: "Start Project", d: "Use what you have. Borrow, build, and innovate.", s: "May" },
                            { t: "Work & Record", d: "Solve the problem and document with photos/video.", s: "Jun - Oct" },
                            { t: "Submit Story", d: "Report your impact. 15 pages max + 2min video.", s: "Oct 31" },
                            { t: "Grand Finale", d: "Pitch live in Abuja. Win your share of ₦3M.", s: "Dec 17" },
                        ].map((item, idx) => (
                            <div key={item.t} className="reveal" style={{ background: "#FAFAF5", borderRadius: 20, padding: "1.5rem 2rem", border: `1px solid ${T.brd}`, display: "flex", gap: "2rem", alignItems: "center" }}>
                                <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.green, color: T.goldL, display: "grid", placeItems: "center", fontWeight: 900, flexShrink: 0 }}>{idx + 1}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                                        <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 800, color: T.greenD }}>{item.t}</h4>
                                        <span style={{ fontSize: "0.75rem", fontWeight: 700, color: T.gold, background: `${T.gold}15`, padding: "0.2rem 0.6rem", borderRadius: 4 }}>{item.s}</span>
                                    </div>
                                    <p style={{ color: T.p2, fontSize: "0.95rem" }}>{item.d}</p>
                                </div>
                                <ChevronRight size={20} color={T.brd} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prizes Section */}
            <section id="prizes" style={{ padding: "clamp(4rem, 10vw, 8rem) 0", background: T.greenD, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.05, background: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }} />
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2 }}>
                    <div className="reveal" style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", fontWeight: 900, color: T.goldL }}>The Rewards of Excellence</h2>
                        <p style={{ color: "rgba(253,247,236,.6)", fontSize: "1.1rem", marginTop: "1rem" }}>₦3,000,000 total across 7-10 exceptional <GoDs style={{ color: T.goldL }} />.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
                        {[
                            { n: "₦1,000,000", t: "Grand Champion", d: "Trophy + Media Tour + Face of NBC 2026", c: T.gold, g: true },
                            { n: "₦600,000", t: "1st Runner Up", d: "Trophy + Certificate + Mentorship", c: "rgba(253,247,236,.1)" },
                            { n: "₦400,000", t: "2nd Runner Up", d: "Trophy + Certificate", c: "rgba(253,247,236,.1)" },
                            { n: "₦200,000", t: "Special Awards", d: "4-7 Finalists. Values & Innovation awards.", c: "rgba(253,247,236,.1)" },
                        ].map(p => (
                            <div key={p.t} className="reveal" style={{ background: p.g ? T.gold : p.c, borderRadius: 24, padding: "2.5rem 2rem", textAlign: "center", border: p.g ? "none" : "1px solid rgba(253,247,236,.15)", backdropFilter: "blur(10px)" }}>
                                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{p.t === "Grand Champion" ? "🥇" : p.t.includes("Runner") ? "🥈" : "🏆"}</div>
                                <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "2rem", fontWeight: 800, color: p.g ? T.greenD : T.goldL, marginBottom: "0.25rem" }}>{p.n}</h3>
                                <div style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: p.g ? T.green : T.cream, marginBottom: "1rem" }}>{p.t}</div>
                                <p style={{ color: p.g ? T.greenD : "rgba(253,247,236,.7)", fontSize: "0.85rem", lineHeight: 1.5 }}>{p.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section id="values" style={{ padding: "clamp(4rem, 10vw, 8rem) 0", background: "#FAFAF5" }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem" }}>
                    <div className="reveal" style={{ marginBottom: "4rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.8rem", fontWeight: 900, color: T.greenD }}>The 8 Core Values</h2>
                        <p style={{ color: T.p2, fontSize: "1.1rem", borderLeft: `3px solid ${T.gold}`, paddingLeft: "1.2rem", marginTop: "0.5rem" }}>The internal compass of every effective National Builder.</p>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
                        {[
                            { i: "✅", t: "Integrity", q: "I go do am well", d: "Truth in word and excellence in work." },
                            { i: "💪", t: "Discipline", q: "I no dey give up", d: "Showing up every day until the job is done." },
                            { i: "🧠", t: "Wisdom", q: "I sabi think am well", d: "Careful thought before action." },
                            { i: "❤️", t: "Service", q: "My brother's problem na my problem", d: "Solving for others, not just self." },
                            { i: "⚖️", t: "Justice", q: "E must fair for everybody", d: "Defending the vulnerable." },
                            { i: "🔥", t: "Resilience", q: "Wahala no fit stop me", d: "Bouncing back from every setback." },
                            { i: "🙏", t: "Humility", q: "I fit learn from anybody", d: "Staying teachable at every level." },
                            { i: "⭐", t: "Excellence", q: "If I wan do am, correct", d: "Quality that leaves a lasting mark." }
                        ].map(v => (
                            <div key={v.t} className="reveal" style={{ background: "#fff", padding: "2rem", borderRadius: 24, border: `1px solid ${T.brd}`, transition: "transform .3s ease", cursor: "default" }}>
                                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{v.i}</div>
                                <h4 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 800, color: T.greenD, marginBottom: "0.25rem" }}>{v.t}</h4>
                                <p style={{ fontSize: "0.75rem", fontStyle: "italic", color: T.gold, fontWeight: 600, marginBottom: "1rem" }}>{v.q}</p>
                                <p style={{ fontSize: "0.9rem", color: T.p2, lineHeight: 1.5 }}>{v.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Form */}
            <section id="register" style={{ padding: "clamp(4rem, 10vw, 8rem) 0", background: T.cream }}>
                <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "0 2rem" }}>
                    <div className="reveal" style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.8rem", fontWeight: 900, color: T.greenD }}>Start Your Legacy</h2>
                        <p style={{ color: T.p2, marginTop: "0.5rem" }}>Join the 2025 cohort of National Builders.</p>
                    </div>

                    <div style={{ background: "#fff", borderRadius: 32, padding: "3rem", boxShadow: "0 20px 60px rgba(22,97,62,.08)", border: `1px solid ${T.brd}` }}>
                        {!registrationSubmitted ? (
                            <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.p3, marginBottom: "0.5rem" }}>Full Name</label>
                                    <input required style={{ width: "100%", padding: "1rem", borderRadius: 12, border: `1px solid ${T.brd}`, background: "#FAFAF5", outline: "none", fontSize: "1rem" }} placeholder="Olufemi Adeyemi" />
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                                    <div>
                                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.p3, marginBottom: "0.5rem" }}>Age (7-17)</label>
                                        <input type="number" min="7" max="17" required style={{ width: "100%", padding: "1rem", borderRadius: 12, border: `1px solid ${T.brd}`, background: "#FAFAF5", outline: "none" }} placeholder="12" />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.p3, marginBottom: "0.5rem" }}>State</label>
                                        <input required style={{ width: "100%", padding: "1rem", borderRadius: 12, border: `1px solid ${T.brd}`, background: "#FAFAF5", outline: "none" }} placeholder="Lagos" />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.p3, marginBottom: "0.5rem" }}>Phone Number</label>
                                    <input required type="tel" style={{ width: "100%", padding: "1rem", borderRadius: 12, border: `1px solid ${T.brd}`, background: "#FAFAF5", outline: "none" }} placeholder="080 000 0000" />
                                </div>
                                <div>
                                    <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: T.p3, marginBottom: "0.5rem" }}>Problem You Want to Solve</label>
                                    <textarea rows="4" required style={{ width: "100%", padding: "1rem", borderRadius: 12, border: `1px solid ${T.brd}`, background: "#FAFAF5", outline: "none", fontFamily: "inherit" }} placeholder="e.g. Clean water in my street, recycling plastics..." />
                                </div>
                                <button type="submit" style={{ padding: "1.2rem", borderRadius: 16, background: T.gold, color: "#fff", fontWeight: 700, fontSize: "1.1rem", boxShadow: `0 8px 24px ${T.gold}30`, marginTop: "1rem" }}>
                                    Submit Registration
                                </button>
                            </form>
                        ) : (
                            <div style={{ textAlign: "center", padding: "2rem 0" }}>
                                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎯</div>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 900, color: T.greenD, marginBottom: "0.5rem" }}>You're In!</h3>
                                <p style={{ color: T.p2, marginBottom: "1.5rem" }}>Registry Successful. Your Builder ID is:</p>
                                <div style={{ background: T.greenD, color: T.goldL, padding: "1rem", borderRadius: 12, fontSize: "1.5rem", fontWeight: 800, fontFamily: "'DM Mono',monospace", letterSpacing: "0.1em", display: "inline-block" }}>{userId}</div>
                                <p style={{ color: T.p3, fontSize: "0.85rem", marginTop: "1.5rem" }}>Check your phone for the next steps.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: T.greenD, padding: "5rem 0", borderTop: `1px solid ${T.gold}30` }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "2rem" }}>
                        <div style={{ width: 40, height: 40, background: T.green, borderRadius: 10, display: "grid", placeItems: "center", color: T.goldL, fontWeight: 900, fontFamily: "'Playfair Display',serif" }}>g</div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ color: T.cream, fontWeight: 700, fontSize: "1rem" }}>National Builders Corp</div>
                            <div style={{ color: T.goldL, fontSize: "0.7rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em" }}>Raising <GoDs /></div>
                        </div>
                    </div>
                    <div style={{ height: "1px", background: "rgba(253,247,236,.1)", maxWidth: "20rem", margin: "0 auto 2rem" }} />
                    <p style={{ color: "rgba(253,247,236,.4)", fontSize: "0.85rem" }}>&copy; 2025 goDs Global KidsInspiring. IT No. 6980735</p>
                </div>
            </footer>

            {/* Reveal Effects CSS */}
            <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .rev { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 100ms; }
        .d2 { transition-delay: 200ms; }
        .d3 { transition-delay: 300ms; }
        .d4 { transition-delay: 400ms; }
      `}</style>
        </div>
    );
}
