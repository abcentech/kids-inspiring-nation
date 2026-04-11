import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, ChevronRight, Target, Users, Award, BookOpen,
    MessageCircle, Send, Star, Trophy, Zap, Globe,
    Activity, Play, Download, Clock, Image as ImageIcon, ChevronLeft,
    Mail, User, Phone, MapPin, Lightbulb, ArrowRight, ChevronDown
} from 'lucide-react';

// ─── DESIGN TOKENS (Shared with KIN Main) ───────────────────────────────────
const T = {
    green: "#16613E", greenD: "#0D3D26", greenM: "#2C4A35",
    gold: "#C4882C", goldL: "#E8B954", goldD: "#9A6620",
    coral: "#D94F30", cream: "#FDF7EC", warmBg: "#F5EFE3",
    ok: "#34C759", warn: "#FF9F0A", err: "#FF3B30", info: "#0071E3",
    // Dark mode specific
    bgD: "#050505", srfD: "#1C1C1E", brdD: "rgba(255,255,255,.08)",
    d1: "#F5F5F7", d2: "#98989D", d3: "#636366",
};

const GoDs = ({ style = {} }) => (
    <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: "italic", ...style }}>
        <span style={{ fontWeight: 900 }}>g</span>
        <span style={{ fontWeight: 900, color: "inherit" }}>oDs</span>
    </span>
);

const FAQItem = ({ faq, idx, s }) => {
    const [open, setOpen] = useState(false);
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98, y: 15 }} 
            whileInView={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ delay: idx * 0.05 }} 
            viewport={{ once: true }}
            onClick={() => setOpen(!open)}
            style={{ 
                background: s.surf, 
                padding: "1.75rem 2rem", 
                borderRadius: "20px", 
                border: `1px solid ${open ? '#E8B954' : s.brd}`, 
                boxShadow: open ? "0 20px 40px rgba(232,185,84,0.12)" : "0 10px 30px rgba(0,0,0,0.02)", 
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                position: "relative",
                overflow: "hidden"
            }}
            whileHover={{ y: -4, boxShadow: "0 15px 35px rgba(0,0,0,0.05)" }}
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
                        background: "#E8B954" 
                    }} 
                />
            )}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: open ? "#E8B954" : s.txt, margin: 0, paddingRight: '2rem', transition: "color 0.3s" }}>{faq.q}</h4>
                <motion.div 
                    animate={{ rotate: open ? 180 : 0, color: open ? "#E8B954" : "inherit" }} 
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
                        <div style={{ padding: "1.25rem 0 0.5rem 0", fontSize: "1.05rem", color: s.sub, lineHeight: 1.6, borderTop: `1px solid ${s.brd}`, marginTop: "1.25rem" }}>
                            {faq.a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function NVC({ dark }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Photo Slider State
    const [currentImage, setCurrentImage] = useState(0);
    const nvcImages = [
        "/photos/NVC1.jpg",
        "/photos/NVC2.jpg",
        "/photos/NVC3.jpg",
        "/photos/NVC4.jpg",
        "/photos/NVC5.jpg",
        "/photos/NVC6.jpg"
    ];

    // Auto-advance slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % nvcImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [nvcImages.length]);

    const nextImage = () => setCurrentImage((prev) => (prev + 1) % nvcImages.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + nvcImages.length) % nvcImages.length);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);


    const s = dark
        ? { bg: T.bgD, surf: T.srfD, brd: T.brdD, txt: T.d1, sub: T.d2, card: "rgba(255,255,255,.03)" }
        : { bg: "#FAFAF5", surf: "#FFFFFF", brd: "rgba(22,97,62,.09)", txt: T.greenD, sub: T.greenM, card: "#fff" };

    const navBg = scrolled ? (dark ? "rgba(10,10,10,.85)" : "rgba(253,247,236,.92)") : "transparent";
    const navBdr = scrolled ? `1px solid ${s.brd}` : "1px solid transparent";
    const navTxt = scrolled ? (dark ? T.goldL : T.green) : T.cream;

    // Animation variants
    const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
    const stagger = { animate: { transition: { staggerChildren: 0.1 } } };

    return (
        <div style={{ fontFamily: "'DM Sans',sans-serif", background: s.bg, color: s.txt, overflowX: "hidden", minHeight: "100vh" }}>

            {/* Navigation */}
            <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: ".85rem 0", transition: "all .35s", background: navBg, backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: navBdr }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div style={{ width: 34, height: 34, background: T.green, borderRadius: 10, display: "grid", placeItems: "center", color: T.goldL, fontWeight: 900, fontFamily: "'Playfair Display',serif" }}>g</div>
                        <div style={{ fontWeight: 800, fontSize: "0.95rem", color: navTxt, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.01em" }}>National Builders Corp</div>
                    </motion.div>

                    <div className="hidden md:flex items-center gap-8">
                        {['About', 'Process', 'Prizes', 'Values'].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: "0.78rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: navTxt, opacity: 0.8 }} className="hover:opacity-100 transition-opacity">{item}</a>
                        ))}
                        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#register" style={{ padding: ".6rem 1.6rem", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 700, fontSize: "0.78rem" }}>Join Challenge</motion.a>
                    </div>

                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden" style={{ color: navTxt }}>
                        <Activity size={24} />
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ minHeight: "100svh", background: T.greenD, position: "relative", display: "flex", alignItems: "center", overflow: "hidden", padding: "8rem 0" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.8, background: `radial-gradient(ellipse 80% 70% at 85% 40%,${T.green}40 0%,transparent 60%), linear-gradient(135deg,#050505 0%,#0D3D26 70%,#16613E 100%)` }} />
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2 }} style={{ position: "absolute", right: "-2vw", bottom: "10vh", fontSize: "25vw", fontWeight: 900, color: "transparent", WebkitTextStroke: "1.5px rgba(232,185,84,.06)", fontFamily: "'Playfair Display',serif", fontStyle: "italic", userSelect: "none", pointerEvents: "none" }}>NBC</motion.div>

                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2, width: "100%" }}>
                    <motion.div initial="initial" animate="animate" variants={stagger} style={{ maxWidth: "56rem" }}>
                        <motion.div variants={fadeIn} style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: T.goldL, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                            <span style={{ width: 45, height: 2, background: T.gold }} /> 🇳🇬 National Builders Challenge
                        </motion.div>
                        <motion.h1 variants={fadeIn} style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(3rem, 9vw, 6rem)", fontWeight: 900, color: T.cream, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: "2rem" }}>
                            Build the Nigeria <br />
                            You Want To <em style={{ fontStyle: "italic", color: T.goldL }}>See</em>.
                        </motion.h1>
                        <motion.p variants={fadeIn} style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "rgba(253,247,236,.75)", lineHeight: 1.6, marginBottom: "3rem", maxWidth: "42ch" }}>
                            A 9-month masterclass in resourcefulness. Join 1,000 young visionaries solving real community problems through character and grit.
                        </motion.p>

                        <motion.div variants={fadeIn} style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "center" }}>
                            <motion.a whileHover={{ scale: 1.05, filter: "brightness(1.1)" }} whileTap={{ scale: 0.98 }} href="#register" style={{ padding: "1.2rem 3.2rem", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 800, fontSize: "1.15rem", boxShadow: `0 15px 40px ${T.gold}50` }}>Start Your Legacy</motion.a>
                            <div style={{ background: "rgba(253,247,236,.06)", padding: "1rem 2rem", borderRadius: 999, border: "1px solid rgba(253,247,236,.2)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <div style={{ width: 10, height: 10, background: T.ok, borderRadius: "50%", animation: "pulse 2s infinite" }} />
                                <span style={{ color: T.cream, fontWeight: 700 }}>2026 Cohort Open</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Live Activity Strip */}
            <div style={{ background: dark ? T.srfD : T.green, borderBottom: `1px solid ${T.gold}20`, padding: "0.85rem 0" }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", gap: "1.5rem", overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", whiteSpace: "nowrap" }}>
                        <Clock size={16} color={T.goldL} />
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: T.cream, textTransform: "uppercase", letterSpacing: "0.05em" }}>Live Updates</span>
                    </div>
                    <motion.div animate={{ x: ["100%", "-100%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} style={{ whiteSpace: "nowrap", flex: 1, color: "rgba(253,247,236,.7)", fontSize: "0.85rem", fontWeight: 500 }}>
                        · REGISTERED: NB-7841 Kano · UPDATED: Project "Waste to Wealth" (Lagos) · NEW MENTOR JOINED: Abuja Cell · WORKBOOK DOWNLOADED: Port Harcourt · FINALE DATE: Dec 17 ·
                    </motion.div>
                </div>
            </div>

            {/* Photo Gallery Slider */}
            <section style={{ padding: "6rem 0", background: s.bg, borderBottom: `1px solid ${s.brd}` }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem" }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "3rem" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: T.gold, marginBottom: "0.5rem" }}>
                            <ImageIcon size={20} />
                            <span style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em" }}>In Action</span>
                        </div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 900, color: s.txt }}>Builders at Work</h2>
                    </motion.div>

                    <div style={{ position: "relative", width: "100%", maxWidth: "1000px", margin: "0 auto", aspectRatio: "16/9", borderRadius: "24px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", border: `1px solid ${s.brd}` }}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentImage}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    backgroundImage: `url('${nvcImages[currentImage]}')`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            />
                        </AnimatePresence>

                        {/* Navigation Overlay */}
                        <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 1rem", pointerEvents: "none" }}>
                            <button onClick={prevImage} style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", color: "white", display: "grid", placeItems: "center", cursor: "pointer", pointerEvents: "auto", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }} className="hover:background-black/60 hover:scale-105">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextImage} style={{ width: "3.5rem", height: "3.5rem", borderRadius: "50%", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", color: "white", display: "grid", placeItems: "center", cursor: "pointer", pointerEvents: "auto", border: "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }} className="hover:background-black/60 hover:scale-105">
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* Pagination Dots */}
                        <div style={{ position: "absolute", bottom: "1.5rem", left: 0, right: 0, display: "flex", justifyContent: "center", gap: "0.5rem", zIndex: 10 }}>
                            {nvcImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentImage(idx)}
                                    style={{
                                        width: currentImage === idx ? "2rem" : "0.5rem",
                                        height: "0.5rem",
                                        borderRadius: "999px",
                                        background: currentImage === idx ? T.gold : "rgba(255,255,255,0.5)",
                                        border: "none",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        padding: 0
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section id="about" style={{ padding: "8rem 0", background: s.bg }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "start" }}>
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <div style={{ fontSize: "0.8rem", fontWeight: 800, color: T.gold, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem" }}>The Mission</div>
                            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", fontWeight: 900, color: s.txt, lineHeight: 1.1, marginBottom: "2rem" }}>Discipline, Service, and Radical Character.</h2>
                            <p style={{ fontSize: "1.1rem", color: s.sub, lineHeight: 1.6, marginBottom: "2.5rem" }}>
                                We believe money is secondary to character. The National Builders Corp is a meritocracy where youth (7-17) learn to build a nation from the ground up by solving local problems using only creativity and hustle.
                            </p>
                            
                            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                    <div style={{ fontSize: "1.5rem" }}>🎯</div>
                                    <div>
                                        <h4 style={{ fontWeight: 800, color: s.txt, fontSize: "1.1rem" }}>Discipline First</h4>
                                        <p style={{ fontSize: "0.9rem", color: s.sub }}>No handouts. We teach the hustle required to lead.</p>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                                    <div style={{ fontSize: "1.5rem" }}>🤝</div>
                                    <div>
                                        <h4 style={{ fontWeight: 800, color: s.txt, fontSize: "1.1rem" }}>Radical Service</h4>
                                        <p style={{ fontSize: "0.9rem", color: s.sub }}>Lead by solving your neighbor's problems.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ background: T.green, color: "white", padding: "4rem 3rem", borderRadius: 32, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <h3 style={{ color: T.goldL, fontSize: "4rem", fontWeight: 900, marginBottom: "0.5rem", fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1 }}>1,000</h3>
                            <p style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "0.8rem", fontWeight: 700, opacity: 0.9 }}>Strategic Builders</p>
                            <div style={{ height: "1px", background: "rgba(255,255,255,0.15)", margin: "2.5rem 0" }} />
                            <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 700, fontStyle: "italic", lineHeight: 1.3, color: T.cream }}>
                                "Character is the highest form of national capital."
                            </blockquote>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Evidence of Impact */}
            <section id="impact" style={{ padding: "8rem 0", background: dark ? "#000" : "#fff" }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem" }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", fontWeight: 900, color: s.txt, marginBottom: "1rem" }}>Evidence of Impact</h2>
                        <p style={{ color: s.sub, fontSize: "1.1rem", maxWidth: "60ch", margin: "0 auto" }}>Data-driven growth from previous National Values Challenges.</p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "3rem" }}>
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: s.surf, padding: "2rem", borderRadius: 24, border: `1px solid ${s.brd}`, boxShadow: "0 10px 40px rgba(0,0,0,.03)" }}>
                            <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: "1.5rem", background: "#f5f5f5" }}>
                                <img src="/psalm119/images/Psalm 119 National Values Challenge_ Maximum of Score Across the CBT.png" alt="Max Mastery CBT" style={{ width: "100%", display: "block" }} />
                            </div>
                            <h4 style={{ fontSize: "1.3rem", fontWeight: 800, color: s.txt, marginBottom: "0.5rem" }}>Peak Mastery</h4>
                            <p style={{ color: s.sub, fontSize: "0.95rem", lineHeight: 1.5 }}>Top builders demonstrate 95%+ mastery in national values assessment across Nigeria.</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }} style={{ background: s.surf, padding: "2rem", borderRadius: 24, border: `1px solid ${s.brd}`, boxShadow: "0 10px 40px rgba(0,0,0,.03)" }}>
                            <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: "1.5rem", background: "#f5f5f5" }}>
                                <img src="/psalm119/images/Psalm 119 National Values Challenge_ Minimum Score Across the CBTs.png" alt="Baseline Growth CBT" style={{ width: "100%", display: "block" }} />
                            </div>
                            <h4 style={{ fontSize: "1.3rem", fontWeight: 800, color: s.txt, marginBottom: "0.5rem" }}>Sustained Elevation</h4>
                            <p style={{ color: s.sub, fontSize: "0.95rem", lineHeight: 1.5 }}>Participants show significantly higher integrity scores than traditional peer groups.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Prizes Section - Glassmorphism focused */}
            <section id="prizes" style={{ padding: "8rem 0", background: T.greenD, position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, opacity: 0.4, background: `linear-gradient(to bottom, ${T.greenD}, transparent, ${T.greenD})` }} />
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2 }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "5rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3.5rem", fontWeight: 900, color: T.goldL, letterSpacing: "-0.02em" }}>Elite Recognition</h2>
                        <p style={{ color: "rgba(253,247,236,.6)", fontSize: "1.1rem", maxWidth: "60ch", margin: "1rem auto" }}>Our Grand Finale is where Nation Builders are celebrated by the Nation.</p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                        {[
                            { n: "₦1.19M", t: "Most Impactful Project", i: "🥇", accent: T.gold },
                            { n: "₦200,000", t: "Top 5 Projects (Each)", i: "🌟", accent: "#E5E7EB" },
                            { n: "₦200,000", t: "Various Category Awards", i: "🏆", accent: "#D97706" },
                        ].map((p, idx) => (
                            <motion.div key={p.t} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.15 }} viewport={{ once: true }} whileHover={{ y: -10 }} style={{ background: "rgba(255,255,255,.05)", padding: "4rem 2rem", borderRadius: 32, border: "1px solid rgba(255,255,255,.12)", backdropFilter: "blur(20px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: p.accent }} />
                                <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>{p.i}</div>
                                <h3 style={{ fontSize: "2.4rem", fontWeight: 900, color: T.goldL, marginBottom: "0.5rem", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.n}</h3>
                                <div style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: T.cream }}>{p.t}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Builder's Toolkit */}
            <section id="toolkit" style={{ padding: "8rem 0", background: s.bg }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem" }}>
                    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ borderLeft: `4px solid ${T.gold}`, paddingLeft: "2rem", marginBottom: "4rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", fontWeight: 900, color: s.txt }}>The Builder's Toolkit.</h2>
                        <p style={{ color: s.sub, fontSize: "1.2rem", marginTop: "0.5rem" }}>Free resources to help you design, launch, and track your impact.</p>
                    </motion.div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
                        {[
                            { i: "🖼️", t: "NBC Main Flyer", d: "Official Program Flyer.", f: "NBC_Main.jpeg" },
                            { i: "📖", t: "Values Workbook", d: "The core training curriculum.", f: "Values Training Workbook.pdf" },
                            { i: "🎓", t: "Mentor Guide", d: "For parents and supporters.", f: "Mentor Guide.pdf" },
                            { i: "📋", t: "Project Planner", d: "Design your local solution.", f: "Project Planning Guide.pdf" },
                            { i: "📊", t: "Impact Tracker", d: "Log your monthly progress.", f: "Monthly Progress Tracker.pdf" },
                            { i: "🏆", t: "Impact Report", d: "Final submission template.", f: "Impact Report.pdf" }
                        ].map((v, idx) => (
                            <motion.div key={v.t} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }} viewport={{ once: true }} style={{ background: s.surf, padding: "2.5rem 1.75rem", borderRadius: 24, border: `1px solid ${s.brd}`, textAlign: "center", display: "flex", flexDirection: "column" }}>
                                <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{v.i}</div>
                                <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: s.txt, marginBottom: "0.5rem" }}>{v.t}</h4>
                                <p style={{ fontSize: "0.85rem", color: s.sub, lineHeight: 1.5, marginBottom: "2rem", flex: 1 }}>{v.d}</p>
                                <a href={v.f.includes("NBC_Main") ? "/photos/NBC_Main.jpeg" : `/psalm119/downloads/${v.f}`} download style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1.5rem", background: idx === 0 ? T.green : "rgba(22,97,62,0.08)", color: idx === 0 ? "#fff" : T.green, borderRadius: 999, fontWeight: 700, fontSize: "0.85rem", border: idx === 0 ? "none" : `1px solid ${T.green}30`, transition: "all 0.2s" }} className="hover:scale-105">
                                    <Download size={14} /> Download
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            
            
            {/* Timeline Section */}
            <section id="timeline" style={{ padding: "8rem 0", background: dark ? "#080808" : "#FFFFFF", borderBottom: `1px solid ${s.brd}` }}>
                <div style={{ maxWidth: "60rem", margin: "0 auto", padding: "0 2rem" }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", color: '#E8B954', marginBottom: "1rem" }}>
                            <Clock size={20} />
                            <span style={{ fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em" }}>Journey</span>
                        </div>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "3rem", fontWeight: 900, color: s.txt }}>The 9-Month Roadmap</h2>
                        <p style={{ color: s.sub, fontSize: "1.1rem", marginTop: "0.5rem" }}>Key milestones on the path to becoming a Nation Builder.</p>
                    </motion.div>

                    <div className="timeline-container" style={{ position: "relative", padding: "2rem 0" }}>
                        <div className="timeline-line" style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: 'rgba(232,185,84,0.3)', transform: "translateX(-50%)" }} />
                        
                        {[
                            { m: "April", t: "2026 Cohort Registration Opens", d: "Applications open nationwide for all young visionaries." },
                            { m: "July", t: "Evaluation on Community Projects", d: "Mid-point reviews of actual impact data from local solution implementations." },
                            { m: "October", t: "Preliminary Submission", d: "Builders submit their completed Impact Reports and metrics for initial grading." },
                            { m: "December", t: "Grand Finale", d: "Elite Recognition event where the most impactful projects receive their awards." }
                        ].map((evt, idx) => (
                            <motion.div 
                                key={evt.m} 
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }} 
                                className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}
                                style={{ 
                                    display: "flex", 
                                    justifyContent: idx % 2 === 0 ? "flex-end" : "flex-start", 
                                    alignItems: "center", 
                                    width: "100%", 
                                    marginBottom: "3.5rem", 
                                    position: "relative" 
                                }}
                            >
                                <div className="timeline-dot" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: "16px", height: "16px", borderRadius: "50%", background: '#E8B954', border: "4px solid " + (dark ? "#080808" : "#FFFFFF"), zIndex: 2 }} />

                                <div className="timeline-content" style={{ width: "45%", textAlign: idx % 2 === 0 ? "right" : "left" }}>
                                    <div style={{ fontSize: "1.25rem", fontWeight: 800, color: '#E8B954', fontFamily: "'Playfair Display',serif", letterSpacing: "0.05em" }}>{evt.m}</div>
                                    <h4 style={{ fontSize: "1.2rem", fontWeight: 800, color: s.txt, margin: "0.5rem 0" }}>{evt.t}</h4>
                                    <p style={{ fontSize: "1rem", color: s.sub, lineHeight: 1.6 }}>{evt.d}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" style={{ padding: "8rem 0", background: dark ? "#050505" : "#FAFAF5", borderTop: `1px solid ${s.brd}` }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem" }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.8rem", fontWeight: 900, color: s.txt }}>Frequently Asked Questions</h2>
                        <p style={{ color: s.sub, fontSize: "1.1rem", marginTop: "0.5rem" }}>Everything you need to know about the Nation Builders Challenge.</p>
                    </motion.div>
                    
                    <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", 
                        gap: "1.5rem",
                        alignItems: "start" 
                    }}>
                        {[
                            { q: "What exactly is the National Builders Corp (NBC)?", a: "It's a high-impact community challenge where 1,000 young visionaries solve real local problems. Think of it as a masterclass in leadership, resourcefulness, and national transformation." },
                            { q: "I’m only 8 years old. Is this too big for me?", a: "Absolutely not! We’ve seen 7-year-olds lead incredible projects. You don’t need to be an adult to be a Nation Builder; you just need a solution for your community." },
                            { q: "I have no money to start a project. How am I supposed to win?", a: "NBC is a test of resourcefulness, not wealth. The best builders use waste, volunteers, and creativity to solve problems without spending a kobo. Often, using no money is more impressive!" },
                            { q: "Who is a 'Nation Builder'?", a: "Someone who stops complaining about what's broken and starts building what's needed. It's a title earned through discipline, service, and radical character." },
                            { q: "Can I do this with my friends or do I have to be solo?", a: "You can choose! You can work as a Solo Builder or form a team (2-5 members or more). Teams are great for bigger projects, while Solo is great for focused execution." },
                            { q: "I’m not in school right now. Can I still join?", a: "Yes! We have a specific 'I am out of school' option in the registration. This challenge is about your potential and your project, not just your school status." },
                            { q: "What kind of 'problems' should I be solving?", a: "Anything that helps! This could be environment (cleaning a gutter), education (teaching younger kids), health (health awareness), or character building in your neighborhood." },
                            { q: "Who should be my mentor?", a: "Your mentor should be an adult who believes in you. This can be your Parent, Teacher, Pastor/Imam, or a Community Leader." },
                            { q: "What if I can’t find a mentor?", a: "Don't worry! Select 'I am still searching for one' during registration. We will provide you with a 'Mentor Guide' that helps you know how to find one in your community." },
                            { q: "Do I have to live in a specific city to win?", a: "No. The NBC is open to builders across all 36 states and the FCT. Impact is impact, whether it's in a big city like Lagos or a small village." },
                            { q: "How much total prize money is up for grabs?", a: "A total pool of ₦3,000,000! The Most Impactful Project wins ₦1.19M, with Top 5 projects getting ₦200k each, and special category awards filling the rest." },
                            { q: "What is the 'Values Workbook' everyone talks about?", a: "It's your secret weapon. It’s a free download that teaches you the 8 core values required to succeed in the challenge and in life." },
                            { q: "Is there a test or exam I need to pass?", a: "There isn't a traditional exam, but we evaluate your 'Impact Reports' and project data. Top builders also undergo a CBT (Computer Based Test) on national values." },
                            { q: "What happens during the Grand Finale in December?", a: "It’s our elite recognition event! The top builders in Nigeria are celebrated, their projects are showcased, and the prize money is officially awarded." },
                            { q: "Can I change my project idea after I’ve registered?", a: "Yes. You just need to document the change in your Monthly Progress Tracker. Builders often pivot when they find a better way to solve a problem!" },
                            { q: "How do I 'log my progress' every month?", a: "Once registered, you'll use our 'Monthly Progress Tracker' template to note down what you did, who you helped, and any photos you took." },
                            { q: "What are the 8 powerful values?", a: "Integrity, Humility, Responsibility, Courage, Justice, Discipline, Compassion, and Faith. These are the building blocks of a true Nation Builder." },
                            { q: "Can I solve a problem using technology (like an app)?", a: "Absolutely! If you can build a digital solution that solves a local community problem, that counts as a project." },
                            { q: "Will I get a certificate even if I don’t win the cash?", a: "Yes! Every participant who submits a complete Impact Report receives a certificate. Top 20 referrers also get Physical Certificates." },
                            { q: "How do I become a 'Regional Ambassador'?", a: "By inviting your friends! Reach 10 successful referrals to become a Regional Ambassador and lead the movement in your area." },
                            { q: "What happens if my project doesn't fully work?", a: "Failure is part of building. We grade you on your effort, your documentation, and the character you showed when things got tough." },
                            { q: "Are the prizes for me or for my project?", a: "The prize money is awarded to the builder/team to celebrate their impact and to help them sustain or scale their solution." },
                            { q: "Is there a WhatsApp group I can join?", a: "Yes! Once you register, follow the link to join our official community. It's the best place to get updates and meet other builders." },
                            { q: "How are the winners actually picked?", a: "Our panel of judges looks at: 1. Actual recorded impact, 2. Resourcefulness (doing much with little), and 3. Demonstration of the 8 core values." },
                            { q: "I just registered. What is my very first task?", a: "Download the 'Values Workbook' and the 'Project Planner' from the Toolkit section. These will guide your first steps!" }
                        ].map((faq, idx) => (
                            <FAQItem key={idx} faq={faq} idx={idx} s={s} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Section */}
            <section id="register" style={{ padding: "8rem 0", background: s.bg }}>
                <div style={{ maxWidth: "50rem", margin: "0 auto", padding: "0 2rem" }}>
                    <div style={{ 
                        background: dark ? T.srfD : "#FDF7EC", 
                        borderRadius: 32, 
                        padding: "3rem", 
                        border: `2px solid ${T.gold}30`, 
                        boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
                        position: "relative",
                        overflow: "hidden"
                    }}>
                        <div style={{ position: "absolute", top: "-5rem", right: "-5rem", opacity: 0.05, transform: "rotate(15deg)" }}>
                            <Star size={300} fill={T.gold} />
                        </div>

                        {/* Registration CTA — full form is at /NBC/register */}
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: "0.85rem", fontWeight: 800, color: T.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.75rem" }}>2026 Cohort · Limited Spots</div>
                            <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 900, color: s.txt, marginBottom: "1.25rem", lineHeight: 1.2 }}>
                                Ready to Build Nigeria?
                            </h3>
                            <p style={{ color: s.sub, fontSize: "1.05rem", marginBottom: "2.5rem", maxWidth: "520px", margin: "0 auto 2.5rem" }}>
                                Join 1,000 young Nigerians solving real problems, learning 8 powerful values, and competing for <strong style={{ color: T.gold }}>₦3,000,000</strong>.
                            </p>

                            {/* CTA Buttons */}
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                                <a href="/NBC/register" style={{
                                    display: "inline-flex", alignItems: "center", gap: "0.6rem",
                                    padding: "1.1rem 3rem", borderRadius: "999px",
                                    background: "linear-gradient(135deg, #eab308, #f59e0b)",
                                    color: "#14532d", fontWeight: 800, fontSize: "1.15rem",
                                    boxShadow: "0 12px 30px rgba(234,179,8,0.35)",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    textDecoration: "none",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(234,179,8,0.45)"; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(234,179,8,0.35)"; }}
                                >
                                    🚀 Start Registration Now
                                </a>
                                <a href="https://chat.whatsapp.com/LhdmEpKXoXgDgtEj73WVqz?mode=gi_t" target="_blank" rel="noopener" style={{
                                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                                    padding: "0.85rem 2rem", borderRadius: "999px",
                                    border: `2px solid ${T.green}`, color: s.txt,
                                    fontWeight: 700, fontSize: "0.95rem", textDecoration: "none",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = T.green; e.currentTarget.style.color = "white"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = s.txt; }}
                                >
                                    <MessageCircle size={16} /> Join WhatsApp Community
                                </a>
                            </div>

                            {/* Trust bar */}
                            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "2rem", marginTop: "3rem", paddingTop: "2rem", borderTop: `1px solid ${s.brd}` }}>
                                {[
                                    { icon: "🕐", label: "Takes < 10 mins" },
                                    { icon: "🔒", label: "Your data is safe" },
                                    { icon: "📱", label: "Mobile friendly" },
                                    { icon: "✅", label: "Free to join" },
                                ].map(item => (
                                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.875rem", color: s.sub, fontWeight: 600 }}>
                                        <span style={{ fontSize: "1.2rem" }}>{item.icon}</span> {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: dark ? "#000" : T.greenD, padding: "6rem 0", color: T.cream }}>
                <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 2rem", textAlign: "center" }}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 900, fontFamily: "'Playfair Display',serif", marginBottom: "1rem" }}>Building a New Nigeria.</div>
                    <div style={{ color: T.goldL, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.8rem", marginBottom: "3rem" }}>Raising Nation Builders</div>

                    <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginBottom: "3rem" }}>
                        <MessageCircle size={20} className="hover:text-gold transition-colors" />
                        <Globe size={20} className="hover:text-gold transition-colors" />
                        <Zap size={20} className="hover:text-gold transition-colors" />
                    </div>

                    <div style={{ opacity: 0.4, fontSize: "0.75rem" }}>
                        &copy; 2026 KidsInspiring Nation · IT No. 6980735
                    </div>
                </div>
            </footer>

            <style>{`
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
        .ds::-webkit-scrollbar { width: 4px; }
        .ds::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }

        @media (max-width: 768px) {
            .timeline-line { left: 24px !important; transform: none !important; }
            .timeline-dot { left: 24px !important; transform: none !important; margin-left: -7px; }
            .timeline-item { justify-content: flex-start !important; padding-left: 3.5rem !important; }
            .timeline-content { width: 100% !important; text-align: left !important; padding: 0 !important; }
            .timeline-item.left .timeline-content { text-align: left !important; }
        }
      `}</style>
        </div>
    );
}
