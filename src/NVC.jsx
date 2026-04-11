import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, ChevronRight, Target, Users, Award, BookOpen,
    MessageCircle, Send, Star, Trophy, Zap, Globe,
    CheckCircle2, Activity, Play, Download, Clock,
    Mail, User, Phone, MapPin, Lightbulb, Loader2, ArrowRight,
    ChevronLeft, Image as ImageIcon, ChevronDown
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
    const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
    const [userId, setUserId] = useState('');
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

    const [step, setStep] = useState(1);
    const [teamType, setTeamType] = useState('Solo');
    const [hasMentor, setHasMentor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const [valuesError, setValuesError] = useState(false);
    const [refLink, setRefLink] = useState('');

    // ── AUTO-FILL REFERRAL CODE from URL ──────────────────────────────────────
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (ref) {
            const el = document.querySelector('[name="referral_code"]');
            if (el) el.value = ref;
        }
    }, [step]);

    const TOTAL_STEPS = 4;
    const nextStep = (e) => { e.preventDefault(); setStep(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const prevStep = () => { setStep(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    const toggleValue = (val) => {
        setValuesError(false);
        if (selectedValues.includes(val)) {
            setSelectedValues(selectedValues.filter(v => v !== val));
        } else if (selectedValues.length < 3) {
            setSelectedValues([...selectedValues, val]);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (selectedValues.length !== 3) { setValuesError(true); return; }
        setIsSubmitting(true);

        // ⚠️ REPLACE THIS URL with your deployed Google Apps Script Web App URL
        const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";

        const form = e.target.closest('form') || document.getElementById('nbc-registration-form');
        const raw = new FormData(form);

        // Generate NBC ID
        const timestamp = Date.now().toString(36).toUpperCase();
        const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
        const nbcId = `NBC2025-${timestamp}${rand}`;

        // Collect funding checkboxes
        const fundingSources = ['funding_donations','funding_local','funding_borrow','funding_inkind','funding_personal','funding_other']
            .filter(n => raw.get(n))
            .map(n => raw.get(n))
            .join(', ');

        const payload = {
            nbc_id: nbcId,
            registration_date: new Date().toLocaleDateString(),
            timestamp: new Date().toISOString(),
            referral_code: raw.get('referral_code') || '',
            full_name: raw.get('full_name') || '',
            age: raw.get('age') || '',
            gender: raw.get('gender') || '',
            phone: raw.get('phone') || '',
            whatsapp: raw.get('whatsapp') || '',
            email: raw.get('email') || '',
            state: raw.get('state') || '',
            lga: raw.get('lga') || '',
            city: raw.get('city') || '',
            address: raw.get('address') || '',
            team_type: raw.get('team_type') || 'Solo',
            team_name: raw.get('team_name') || '',
            team_size: raw.get('team_size') || '',
            team_members: raw.get('team_members') || '',
            age_division: raw.get('age_division') || '',
            project_title: raw.get('project_title') || '',
            problem_category: raw.get('problem_category') || '',
            problem_statement: raw.get('problem_statement') || '',
            solution: raw.get('solution') || '',
            expected_impact: raw.get('expected_impact') || '',
            start_date: raw.get('start_date') || '',
            completion_date: raw.get('completion_date') || '',
            budget: raw.get('budget') || '',
            funding_sources: fundingSources,
            funding_other_text: raw.get('funding_other_text') || '',
            has_mentor: raw.get('has_mentor') || '',
            mentor_name: raw.get('mentor_name') || '',
            mentor_phone: raw.get('mentor_phone') || '',
            mentor_email: raw.get('mentor_email') || '',
            mentor_relationship: raw.get('mentor_relationship') || '',
            core_values: selectedValues.join(', '),
            source: raw.get('source') || '',
            agree_commitment: raw.get('agree_commitment') ? 'Yes' : 'No',
            agree_values: raw.get('agree_values') ? 'Yes' : 'No',
            agree_honesty: raw.get('agree_honesty') ? 'Yes' : 'No',
            agree_documentation: raw.get('agree_documentation') ? 'Yes' : 'No',
            agree_media: raw.get('agree_media') ? 'Yes' : 'No',
            agree_rules: raw.get('agree_rules') ? 'Yes' : 'No',
            agree_final: raw.get('agree_final') ? 'Yes' : 'No',
        };

        try {
            // POST to Google Sheets via Apps Script
            const fd = new FormData();
            Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
            await fetch(SCRIPT_URL, { method: 'POST', body: fd, mode: 'no-cors' });

            const link = `${window.location.origin}${window.location.pathname}?ref=${nbcId}`;
            setRefLink(link);
            setUserId(nbcId);
            setRegistrationSubmitted(true);
        } catch (error) {
            console.error("Submission failed", error);
            alert("Registration failed. Please try again or contact info@nationalbuilders.ng");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                <div style={{ maxWidth: "50rem", margin: "0 auto", padding: "0 2rem" }}>
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "4rem" }}>
                        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.8rem", fontWeight: 900, color: s.txt }}>Frequently Asked Questions</h2>
                        <p style={{ color: s.sub, fontSize: "1.1rem", marginTop: "0.5rem" }}>Everything you need to know about the Nation Builders Challenge.</p>
                    </motion.div>
                    
                    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {[
                            { q: "Who can apply for the challenge?", a: "The challenge is open to all youths and visionaries who want to solve community problems. We have removed specific age categories—if you have a viable solution, you belong here." },
                            { q: "Is there an application fee?", a: "No, participation in the National Builders Corp is 100% free. We believe in merit and hard work, not financial prerequisites." },
                            { q: "How long does the programme last?", a: "The challenge is a 9-month masterclass in resourcefulness. Builders will design, execute, and track the impact of their local community project over this period." },
                            { q: "How are the winners selected?", a: "Winners are chosen based on the actual, documented impact of their projects on their communities, overall resourcefulness, and demonstration of radical character." },
                            { q: "What are the prizes?", a: "The most impactful project receives ₦1.19 million. The next top 5 projects receive ₦200k each, and there's another pool of ₦200k for various specific category awards." }
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

                        {!registrationSubmitted ? (
                            <>
                                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                                    <div style={{ fontSize: "0.85rem", fontWeight: 800, color: T.gold, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>2025 Cohort · Limited Spots</div>
                                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 900, color: s.txt, marginBottom: "1rem" }}>Register for NBC 2025</h3>
                                    <p style={{ color: s.sub, fontSize: "1rem", marginBottom: "2rem" }}>Complete this form to join 1,000 National Builders competing for ₦3,000,000.</p>
                                </div>

                                <div className="mt-8 bg-white p-6 sm:p-10 rounded-[32px] shadow-2xl relative overflow-hidden border border-gray-100">
                                    {/* Progress Bar */}
                                    <div className="absolute top-0 left-0 h-2 bg-gray-100 w-full">
                                        <motion.div
                                            className="h-full bg-green-800"
                                            initial={{ width: `${(1 / TOTAL_STEPS) * 100}%` }}
                                            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                        />
                                    </div>

                                    <div className="flex justify-between items-center mb-8 mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Step {step} of {TOTAL_STEPS}</span>
                                            <h4 className="text-2xl font-black text-green-900 font-['Playfair_Display']">
                                                {step === 1 ? '📋 Personal Information' : step === 2 ? '👥 Team Information' : step === 3 ? '💡 Project Details' : '👨‍🏫 Mentor & Agreement'}
                                            </h4>
                                        </div>
                                        <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 font-bold text-xl border border-yellow-200 shadow-sm">
                                            {step}
                                        </div>
                                    </div>

                                    <form id="nbc-registration-form" onSubmit={step === TOTAL_STEPS ? handleRegister : nextStep} className="text-left relative min-h-[400px]">
                                        <AnimatePresence mode="wait">

                                            {/* STEP 1: PERSONAL INFORMATION */}
                                            {step === 1 && (
                                                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                                    <div className="bg-yellow-50 border-2 border-yellow-300 p-4 rounded-xl">
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">🎁 Referral Code <span className="font-normal text-gray-500">(Optional)</span></label>
                                                        <input type="text" name="referral_code" className="w-full px-4 py-3 bg-white border border-yellow-200 rounded-xl focus:border-green-700 outline-none transition-all" placeholder="Were you referred? Enter their code" />
                                                        <p className="text-xs text-gray-500 mt-1">✨ Your friend will get credit for recruiting you!</p>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="md:col-span-2">
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                                                            <input type="text" name="full_name" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 transition-all outline-none" placeholder="Enter your full legal name" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Age <span className="text-red-500">*</span></label>
                                                            <input type="number" name="age" required min="7" max="17" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 transition-all outline-none" placeholder="7–17 years" />
                                                            <p className="text-xs text-gray-500 mt-1">Must be 7–17 years old</p>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Gender <span className="text-red-500">*</span></label>
                                                            <select name="gender" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none appearance-none">
                                                                <option value="">Select gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                                                            <input type="tel" name="phone" required pattern="[0-9]{11}" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 transition-all outline-none" placeholder="08012345678" />
                                                            <p className="text-xs text-gray-500 mt-1">11 digits, no spaces</p>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">WhatsApp Number <span className="text-red-500">*</span></label>
                                                            <input type="tel" name="whatsapp" required pattern="[0-9]{11}" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 transition-all outline-none" placeholder="08012345678" />
                                                            <p className="text-xs text-gray-500 mt-1">For WhatsApp group communication</p>
                                                        </div>
                                                        <div className="md:col-span-2">
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address <span className="font-normal text-gray-500">(Optional)</span></label>
                                                            <input type="email" name="email" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 transition-all outline-none" placeholder="your@email.com" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">State <span className="text-red-500">*</span></label>
                                                            <select name="state" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none appearance-none">
                                                                <option value="">Select your state</option>
                                                                {['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'].map(st => (
                                                                    <option key={st} value={st}>{st === 'FCT' ? 'FCT Abuja' : st}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">LGA <span className="text-red-500">*</span></label>
                                                            <input type="text" name="lga" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 transition-all outline-none" placeholder="e.g., Ikeja, Onitsha North" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">City / Town <span className="text-red-500">*</span></label>
                                                            <input type="text" name="city" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 transition-all outline-none" placeholder="Where do you live?" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Street Address <span className="text-red-500">*</span></label>
                                                            <input type="text" name="address" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 transition-all outline-none" placeholder="House number and street name" />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 2: TEAM INFORMATION */}
                                            {step === 2 && (
                                                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-3">Participating solo or with a team? <span className="text-red-500">*</span></label>
                                                        <div className="space-y-3">
                                                            {[{v:'Solo',sub:"I'm working on this project alone"},{v:'Team',sub:'I have 2–5 team members working with me'}].map(opt => (
                                                                <label key={opt.v} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${teamType === opt.v ? 'border-green-700 bg-green-50' : 'border-gray-200 hover:bg-green-50'}`}>
                                                                    <input type="radio" name="team_type" value={opt.v} checked={teamType === opt.v} onChange={e => setTeamType(e.target.value)} required className="hidden" />
                                                                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${teamType === opt.v ? 'border-green-700' : 'border-gray-300'}`}>
                                                                        {teamType === opt.v && <div className="w-2.5 h-2.5 rounded-full bg-green-700" />}
                                                                    </div>
                                                                    <div><span className="font-bold text-gray-800">{opt.v}</span><p className="text-sm text-gray-500">{opt.sub}</p></div>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <AnimatePresence>
                                                        {teamType === 'Team' && (
                                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden space-y-4">
                                                                <div>
                                                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Team Name <span className="text-red-500">*</span></label>
                                                                    <input type="text" name="team_name" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none transition-all" placeholder="Choose a creative team name" />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Number of Members (including you) <span className="text-red-500">*</span></label>
                                                                    <select name="team_size" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none appearance-none">
                                                                        <option value="">Select team size</option>
                                                                        {['2','3','4','5'].map(n => <option key={n} value={n}>{n} members</option>)}
                                                                    </select>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Team Members' Names &amp; Ages</label>
                                                                    <textarea name="team_members" rows="4" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none resize-none transition-all" placeholder="List all team members (excluding yourself):&#10;1. John Okafor, Age 14&#10;2. Mary Eze, Age 13"></textarea>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Age Division <span className="text-red-500">*</span></label>
                                                        <select name="age_division" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none appearance-none">
                                                            <option value="">Select your division</option>
                                                            <option value="Junior (7-10)">Junior Builders (Ages 7–10)</option>
                                                            <option value="Intermediate (11-13)">Intermediate Builders (Ages 11–13)</option>
                                                            <option value="Senior (14-17)">Senior Builders (Ages 14–17)</option>
                                                        </select>
                                                        <p className="text-xs text-gray-500 mt-1">Based on team leader's age or oldest team member</p>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 3: PROJECT DETAILS */}
                                            {step === 3 && (
                                                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Project Title <span className="text-red-500">*</span></label>
                                                        <input type="text" name="project_title" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 outline-none transition-all" placeholder="e.g. 'Clean Water for Mushin'" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Problem Category <span className="text-red-500">*</span></label>
                                                        <select name="problem_category" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none appearance-none">
                                                            <option value="">Choose the main category</option>
                                                            {['Education & Literacy','Environment & Sanitation','Health & Wellness','Economic Empowerment','Civic Engagement','Arts & Culture','Infrastructure','Innovation & Technology','Other'].map(c=><option key={c} value={c}>{c}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Problem Statement <span className="text-gray-400 font-normal">(3–5 sentences)</span> <span className="text-red-500">*</span></label>
                                                        <textarea name="problem_statement" required rows="5" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 outline-none resize-none transition-all" placeholder="What is the problem? Who is affected? How serious is it?"></textarea>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Your Solution <span className="text-gray-400 font-normal">(3–5 sentences)</span> <span className="text-red-500">*</span></label>
                                                        <textarea name="solution" required rows="5" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 outline-none resize-none transition-all" placeholder="What will you do? How will it work?"></textarea>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Expected Impact <span className="text-red-500">*</span></label>
                                                        <textarea name="expected_impact" required rows="3" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 outline-none resize-none transition-all" placeholder="How many people will benefit? What will change?"></textarea>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Project Start Date <span className="text-red-500">*</span></label>
                                                            <input type="date" name="start_date" required min="2025-05-01" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none transition-all" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-sm font-bold text-gray-700 mb-1.5">Expected Completion <span className="text-red-500">*</span></label>
                                                            <input type="date" name="completion_date" required max="2025-10-31" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none transition-all" />
                                                            <p className="text-xs text-gray-500 mt-1">Must be by October 31, 2025</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Estimated Budget (₦) <span className="text-red-500">*</span></label>
                                                        <input type="number" name="budget" required min="0" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none transition-all" placeholder="How much will this project cost?" />
                                                        <p className="text-xs text-gray-500 mt-1">NBC doesn't provide funding — be resourceful!</p>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-3">How will you get resources? <span className="text-red-500">*</span></label>
                                                        <div className="space-y-2">
                                                            {[
                                                                {name:'funding_donations',val:'Donations',label:'Donations from community members'},
                                                                {name:'funding_local',val:'Local Materials',label:'Use free/cheap local materials'},
                                                                {name:'funding_borrow',val:'Borrow',label:'Borrow tools/equipment'},
                                                                {name:'funding_inkind',val:'In-kind',label:'In-kind contributions (volunteer labour, services)'},
                                                                {name:'funding_personal',val:'Personal',label:'Personal savings/fundraising'},
                                                                {name:'funding_other',val:'Other',label:'Other'},
                                                            ].map(f => (
                                                                <label key={f.name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:bg-green-50 cursor-pointer transition-all">
                                                                    <input type="checkbox" name={f.name} value={f.val} className="w-4 h-4 rounded border-gray-300 text-green-700" />
                                                                    <span className="text-sm text-gray-700">{f.label}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* STEP 4: MENTOR & AGREEMENT */}
                                            {step === 4 && (
                                                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-3">Do you have an adult mentor? <span className="text-red-500">*</span></label>
                                                        <div className="space-y-3">
                                                            {[{v:'Yes',sub:'Parent, Teacher, Pastor/Imam, Community Leader'},{v:'No',sub:'NBC will help me find one'}].map(opt=>(
                                                                <label key={opt.v} className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${hasMentor===opt.v?'border-green-700 bg-green-50':'border-gray-200 hover:bg-green-50'}`}>
                                                                    <input type="radio" name="has_mentor" value={opt.v} checked={hasMentor===opt.v} onChange={e=>setHasMentor(e.target.value)} required className="hidden" />
                                                                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${hasMentor===opt.v?'border-green-700':'border-gray-300'}`}>
                                                                        {hasMentor===opt.v&&<div className="w-2.5 h-2.5 rounded-full bg-green-700" />}
                                                                    </div>
                                                                    <div><span className="font-bold text-gray-800">{opt.v==='Yes'?'Yes, I have a mentor':'Not yet'}</span><p className="text-sm text-gray-500">{opt.sub}</p></div>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <AnimatePresence>
                                                        {hasMentor === 'Yes' && (
                                                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden space-y-4">
                                                                <div>
                                                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Mentor's Full Name <span className="text-red-500">*</span></label>
                                                                    <input type="text" name="mentor_name" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none transition-all" placeholder="Full legal name" />
                                                                </div>
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <div>
                                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Mentor's Phone <span className="text-red-500">*</span></label>
                                                                        <input type="tel" name="mentor_phone" pattern="[0-9]{11}" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none transition-all" placeholder="08012345678" />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Mentor's Email</label>
                                                                        <input type="email" name="mentor_email" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none transition-all" placeholder="mentor@email.com" />
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Relationship to You <span className="text-red-500">*</span></label>
                                                                    <select name="mentor_relationship" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none appearance-none">
                                                                        <option value="">Select relationship</option>
                                                                        {['Parent','Guardian','Teacher','Pastor/Religious Leader','Community Leader','Uncle/Aunt','Other Family Member','Other'].map(r=><option key={r} value={r}>{r}</option>)}
                                                                    </select>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>

                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">Choose Your 3 Core Values <span className="text-red-500">*</span></label>
                                                        <p className="text-sm text-gray-500 mb-3">Select exactly 3 values that will guide your project ({selectedValues.length}/3 selected)</p>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            {[
                                                                {v:'Integrity',l:'Integrity & Truth-Seeking'},
                                                                {v:'Discipline',l:'Discipline & Diligence'},
                                                                {v:'Wisdom',l:'Wisdom & Discernment'},
                                                                {v:'Service',l:'Service & Compassion'},
                                                                {v:'Justice',l:'Justice & Righteousness'},
                                                                {v:'Perseverance',l:'Perseverance & Resilience'},
                                                                {v:'Humility',l:'Humility & Learning'},
                                                                {v:'Excellence',l:'Excellence & Craftsmanship'},
                                                            ].map(val=>{
                                                                const selected = selectedValues.includes(val.v);
                                                                const disabled = !selected && selectedValues.length >= 3;
                                                                return (
                                                                    <button key={val.v} type="button" onClick={()=>!disabled&&toggleValue(val.v)}
                                                                        className={`p-3 rounded-xl border-2 text-left text-sm font-semibold transition-all ${
                                                                            selected ? 'border-green-700 bg-green-50 text-green-800' :
                                                                            disabled ? 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed' :
                                                                            'border-gray-200 hover:border-green-300 text-gray-700'
                                                                        }`}
                                                                    >
                                                                        {selected ? '✅ ' : ''}{val.l}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                        {valuesError && <p className="text-red-500 text-sm mt-2">Please select exactly 3 values before submitting.</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-1.5">How did you hear about NBC? <span className="text-red-500">*</span></label>
                                                        <select name="source" required className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none appearance-none">
                                                            <option value="">Select source</option>
                                                            {['Friend or Family Member','Social Media (Instagram, Facebook, Twitter)','Social Media Influencer/Content Creator','School Announcement','Church or Mosque','WhatsApp Group','Radio/TV','Poster or Flyer','NBC Website','Other'].map(src=><option key={src} value={src}>{src}</option>)}
                                                        </select>
                                                    </div>

                                                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                                                        <h4 className="font-bold text-gray-800 mb-4">NBC Participant Agreement</h4>
                                                        <div className="space-y-3">
                                                            {[
                                                                {name:'agree_commitment',text:'I commit to working on my project for the full 10-month period (March–December 2025)'},
                                                                {name:'agree_values',text:'I agree to study and apply the 8 National Builder values in my project and life'},
                                                                {name:'agree_honesty',text:'I promise to report honestly about my project progress (no exaggeration or false information)'},
                                                                {name:'agree_documentation',text:'I agree to document my project with photos and videos and submit monthly progress reports'},
                                                                {name:'agree_media',text:"I give NBC permission to share my project story, photos, and videos on social media and website"},
                                                                {name:'agree_rules',text:"I have read and agree to NBC's rules and understand that breaking them may result in disqualification"},
                                                            ].map(a=>(
                                                                <label key={a.name} className="flex items-start gap-3 cursor-pointer">
                                                                    <input type="checkbox" name={a.name} required className="mt-1 w-4 h-4 rounded border-gray-300 text-green-700 flex-shrink-0" />
                                                                    <span className="text-sm text-gray-700">{a.text}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                        <div className="mt-4 bg-white border-2 border-green-700 p-4 rounded-xl">
                                                            <label className="flex items-start gap-3 cursor-pointer">
                                                                <input type="checkbox" name="agree_final" required className="mt-1 w-4 h-4 rounded border-gray-300 text-green-700 flex-shrink-0" />
                                                                <span className="text-sm font-bold text-gray-800">I certify that all information provided is true and accurate. I understand that providing false information may lead to disqualification from NBC.</span>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <button type="submit" disabled={isSubmitting}
                                                        className="w-full bg-yellow-400 text-green-900 px-6 py-4 rounded-xl font-bold text-xl hover:bg-yellow-300 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 flex items-center justify-center shadow-lg shadow-yellow-400/30"
                                                    >
                                                        {isSubmitting ? <><Loader2 className="animate-spin mr-2" />Submitting...</> : 'SUBMIT REGISTRATION ✓'}
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Navigation Buttons */}
                                        <div className={`mt-8 flex items-center ${step > 1 ? 'justify-between' : 'justify-end'}`}>
                                            {step > 1 && (
                                                <button type="button" onClick={prevStep} className="px-6 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">← Back</button>
                                            )}
                                            {step < TOTAL_STEPS && (
                                                <button type="submit" className="px-8 py-3 rounded-xl font-bold text-green-900 bg-yellow-400 hover:bg-yellow-300 shadow-md shadow-yellow-400/20 transition-all hover:-translate-y-0.5">
                                                    Next Step →
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>

                                <div style={{ textAlign: "center", paddingTop: "2rem" }}>
                                    <p style={{ color: s.sub, fontSize: "0.9rem", marginBottom: "1.5rem" }}>After submitting, join our official community:</p>
                                    <a href="https://chat.whatsapp.com/LhdmEpKXoXgDgtEj73WVqz?mode=gi_t" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", borderRadius: 999, background: T.green, color: "white", fontWeight: 700 }}>
                                        <MessageCircle size={18} /> Join WhatsApp Community
                                    </a>
                                </div>
                            </>
                        ) : (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "2rem 0" }}>
                                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🎉</div>
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", fontWeight: 900, color: s.txt, marginBottom: "1rem" }}>Welcome, National Builder!</h3>
                                <p style={{ color: s.sub, fontSize: "1.1rem", marginBottom: "2rem" }}>Your registration is complete and logged!</p>

                                <div style={{ background: "rgba(196,136,44,0.1)", padding: "2rem", borderRadius: "20px", border: `1px dashed ${T.gold}`, marginBottom: "2rem" }}>
                                    <div style={{ fontSize: "0.8rem", fontWeight: 700, color: T.gold, textTransform: "uppercase", marginBottom: "0.5rem" }}>Your NBC ID — Save This!</div>
                                    <div style={{ fontSize: "1.8rem", fontWeight: 900, color: T.gold, fontFamily: "'DM Mono',monospace", wordBreak:'break-all' }}>{userId}</div>
                                    <p style={{ fontSize: "0.8rem", color: s.sub, marginTop: "0.5rem" }}>You'll need this ID for all future communications</p>
                                </div>

                                <div style={{ background: "rgba(22,97,62,0.05)", border: `2px solid ${T.green}`, padding: "1.5rem", borderRadius: "20px", marginBottom: "2rem", textAlign: "left" }}>
                                    <h4 style={{ fontWeight: 900, color: T.green, marginBottom: "0.5rem", textAlign: "center" }}>🎯 Your Referral Mission</h4>
                                    <p style={{ fontSize: "0.9rem", color: s.sub, marginBottom: "1rem", textAlign: "center" }}>Share your unique link and earn rewards:</p>
                                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                                        <input type="text" value={refLink} readOnly style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "10px", border: `1px solid ${T.green}40`, fontSize: "0.8rem", background: "#fff", outline:'none' }} />
                                        <button onClick={() => navigator.clipboard.writeText(refLink)} style={{ padding: "0.75rem 1.25rem", borderRadius: "10px", background: T.green, color: "white", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>Copy</button>
                                    </div>
                                    <div style={{ fontSize: "0.85rem", color: s.sub, lineHeight: 1.8 }}>
                                        <p>✅ Recruit 5 people → Become <strong>Regional Ambassador</strong></p>
                                        <p>✅ Recruit 10 people → Get a <strong>Physical Certificate</strong></p>
                                        <p>✅ Recruit 50 people → <strong>Free Trip to Grand Finale!</strong></p>
                                    </div>
                                    <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
                                        <button onClick={() => { const msg = `🇳🇬 Join me as a NATIONAL BUILDER!\n\nI just registered for NBC — Nigeria's biggest youth challenge:\n✅ Solve real problems\n✅ Learn 8 powerful values\n✅ Compete for ₦3,000,000!\n\nUse my link: ${refLink}\n\n#NationalBuildersCorps #BuildNigeria`; window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank'); }} style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "10px", background: "#25D366", color: "white", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>📱 WhatsApp</button>
                                        <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}`, '_blank')} style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "10px", background: "#1877F2", color: "white", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>📘 Facebook</button>
                                        <button onClick={() => { const t = "I just joined National Builders Corp! Competing for ₦3M. Join me:"; window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(refLink)}`, '_blank'); }} style={{ flex: 1, padding: "0.75rem 1rem", borderRadius: "10px", background: "#1DA1F2", color: "white", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", border: "none" }}>🐦 Twitter</button>
                                    </div>
                                </div>

                                <div style={{ background: "rgba(232,185,84,0.08)", borderLeft: `4px solid ${T.gold}`, padding: "1rem 1.25rem", borderRadius: "0 10px 10px 0", textAlign: "left", marginBottom: "2rem" }}>
                                    <p style={{ fontWeight: 700, marginBottom: "0.5rem" }}>📱 What happens next:</p>
                                    <ul style={{ fontSize: "0.9rem", color: s.sub, lineHeight: 2 }}>
                                        <li>✅ Check your phone for a welcome SMS within 24 hours</li>
                                        <li>✅ You'll be added to your state's WhatsApp group</li>
                                        <li>✅ Download the Values Workbook (link in SMS)</li>
                                        <li>✅ Start planning your project RIGHT NOW!</li>
                                    </ul>
                                </div>

                                <p style={{ fontSize: "1.5rem", fontWeight: 900, color: T.green }}>The ₦3M Grand Finale awaits! 🏆</p>
                                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center", marginTop: "1.5rem" }}>
                                    <a href="https://chat.whatsapp.com/LhdmEpKXoXgDgtEj73WVqz?mode=gi_t" target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "1rem 2.5rem", borderRadius: 999, background: T.green, color: "white", fontWeight: 700 }}>
                                        <MessageCircle size={18} /> Join WhatsApp Community
                                    </a>
                                    <button onClick={() => { setRegistrationSubmitted(false); setStep(1); setSelectedValues([]); setHasMentor(''); setTeamType('Solo'); }} style={{ color: s.sub, fontSize: "0.9rem", fontWeight: 600 }}>Register Another Person</button>
                                </div>
                            </motion.div>
                        )}
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
