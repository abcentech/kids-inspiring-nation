import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, MessageCircle, ArrowLeft, ChevronLeft, Info, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTE_META, SITE, T } from './siteConfig.js';
import { usePageMeta } from './usePageMeta.js';
import { submitUrlEncodedForm } from './formSubmit.js';

const SCRIPT_URL = import.meta.env.VITE_NBC_FORM_URL || "";

const NIGERIAN_STATES = [
    'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
    'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
    'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
    'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
    'Yobe','Zamfara'
];

const INPUT = "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#C5A037] focus:bg-white focus:ring-4 focus:ring-[#C5A037]/5 transition-all outline-none text-gray-800 placeholder-gray-400";
const SELECT = "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-[#C5A037] outline-none appearance-none text-gray-800";
const LABEL = "block text-xs font-bold text-gray-500 uppercase letter-spacing-[0.05em] mb-1.5";

const VALUE_INFO = {
    'Integrity': {
        def: "Consistently obeying moral principles even when no one is watching. Honesty in every action.",
        example: "Returning a lost item to its owner or admitting a mistake in your project even if it affects your score."
    },
    'Discipline': {
        def: "The practice of training yourself to obey rules or a code of behavior through consistency.",
        example: "Allocating exactly 1 hour every day to work on your builder project, even when you feel tired."
    },
    'Wisdom': {
        def: "The ability to judge what is true, right, or lasting by using knowledge to solve problems.",
        example: "Choosing a project that solves a long-term problem for many people rather than a quick fix for one person."
    },
    'Service': {
        def: "Putting the needs of others above your own and helping your community without expecting a reward.",
        example: "Spending your weekend organizing a free cleanup for the neighborhood gutter or teaching younger kids."
    },
    'Justice': {
        def: "Fairness, equity, and treating everyone with respect irrespective of their background.",
        example: "Ensuring all your team members have a chance to lead and that everyone's voice is heard equally."
    },
    'Perseverance': {
        def: "Persistence in doing something despite difficulty or delay in achieving success.",
        example: "Continuing to refine your solution when your first three attempts fail to solve the problem."
    },
    'Humility': {
        def: "A modest view of one's importance and the willingness to learn from everyone.",
        example: "Listening carefully to your mentor's feedback and being willing to change your approach."
    },
    'Excellence': {
        def: "The quality of being outstanding. Doing your absolute best in every small detail.",
        example: "Ensuring your project documentation is neat, your photos are clear, and your results are well-recorded."
    }
};

const ValueModal = ({ valueName, info, onClose }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'grid', placeItems: 'center', padding: '1.5rem' }}>
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} style={{ background: 'white', borderRadius: '24px', padding: '2rem', maxWidth: '440px', width: '100%', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', position: 'relative' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: '#94a3b8' }}><X size={20} /></button>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#16613E', marginBottom: '1rem', fontFamily: 'serif' }}>{valueName}</div>
            <div style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.5rem' }}>{info.def}</div>
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '16px', padding: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16613E', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Workbook Example</div>
                <div style={{ fontSize: '0.95rem', color: '#166534', fontStyle: 'italic', lineHeight: 1.5 }}>"{info.example}"</div>
            </div>
            <button onClick={onClose} style={{ width: '100%', marginTop: '2rem', padding: '1rem', background: '#16613E', color: 'white', borderRadius: '12px', fontWeight: 700 }}>Got it!</button>
        </motion.div>
    </motion.div>
);

export default function NBCRegister() {
    usePageMeta(ROUTE_META.nbcRegister);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const [valuesError, setValuesError] = useState(false);
    const [refLink, setRefLink] = useState('');
    const [userId, setUserId] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [activeValueModal, setActiveValueModal] = useState(null);
    const [submitError, setSubmitError] = useState("");
    
    // Centralized form state
    const [formData, setFormData] = useState({
        referral_code: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: '',
        age: '',
        gender: '',
        phone: '',
        whatsapp: '',
        email: '',
        school_name: '',
        state: '',
        lga: '',
        city: '',
        address: '',
        team_type: 'Solo',
        team_name: '',
        team_size: '',
        project_title: '',
        problem_category: '',
        problem_statement: '',
        solution: '',
        expected_impact: '',
        start_date: '',
        completion_date: '',
        budget: '',
        funding_donations: false,
        funding_local: false,
        funding_borrow: false,
        funding_inkind: false,
        funding_personal: false,
        funding_other: false,
        has_mentor: '',
        mentor_name: '',
        mentor_phone: '',
        mentor_email: '',
        mentor_relationship: '',
        source: '',
        agree_commitment: false,
        agree_values: false,
        agree_honesty: false,
        agree_documentation: false,
        agree_media: false,
        agree_rules: false,
        agree_final: false
    });

    const [teamMembers, setTeamMembers] = useState([{ name: '', age: '', phone: '' }]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const TOTAL_STEPS = 5; // Step 5 is Review

    // Auto-fill referral code from URL ?ref=
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (ref && !formData.referral_code) {
            setFormData(prev => ({ ...prev, referral_code: ref }));
        }
    }, [formData.referral_code]);

    const formCardRef = useRef(null);

    const scrollToForm = () => {
        if (formCardRef.current) {
            formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const nextStep = (e) => {
        if (e) e.preventDefault();
        setStep(prev => prev + 1);
        setTimeout(scrollToForm, 50);
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        setTimeout(scrollToForm, 50);
    };

    function calculateAge(birthDate) {
        if (!birthDate) return "";
        const today = new Date();
        const birth = new Date(birthDate);
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
            years--;
            months += 12;
        }
        return `${years} years, ${months} months`;
    }

    // Update age when DOB changes
    useEffect(() => {
        if (formData.dob) {
            setFormData(prev => ({ ...prev, age: calculateAge(formData.dob) }));
        }
    }, [formData.dob]);

    const handleAddMember = () => setTeamMembers([...teamMembers, { name: '', age: '', phone: '' }]);
    const handleMemberChange = (index, field, value) => {
        const newMembers = [...teamMembers];
        newMembers[index][field] = value;
        setTeamMembers(newMembers);
    };

    const toggleValue = (val) => {
        setValuesError(false);
        if (selectedValues.includes(val)) {
            setSelectedValues(selectedValues.filter(v => v !== val));
        } else if (selectedValues.length < 3) {
            setSelectedValues([...selectedValues, val]);
        }
    };

    const getAgeDivision = (ageString) => {
        if (!ageString) return "";
        const years = parseInt(ageString.split(' ')[0]);
        if (isNaN(years)) return "Junior"; // Default
        return years < 13 ? "Junior" : "Senior";
    };

    const handleRegister = async () => {
        if (selectedValues.length !== 3) { setValuesError(true); return; }
        setIsSubmitting(true);
        setSubmitError("");

        const ts = Date.now().toString(36).toUpperCase();
        const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
        const nbcId = `NBC2025-${ts}${rand}`;

        const fundingSources = [
            formData.funding_donations && 'Donations',
            formData.funding_local && 'Local Materials',
            formData.funding_borrow && 'Borrow',
            formData.funding_inkind && 'In-kind',
            formData.funding_personal && 'Personal',
            formData.funding_other && 'Other'
        ].filter(Boolean).join(', ');

        const payload = {
            'Timestamp': new Date().toISOString(),
            'Registration Date': new Date().toLocaleDateString(),
            'NBC ID': nbcId,
            'Referral Code': formData.referral_code,
            'First Name': formData.first_name,
            'Middle Name': formData.middle_name,
            'Last Name': formData.last_name,
            'DOB': formData.dob,
            'Age': formData.age,
            'Gender': formData.gender,
            'Phone': formData.phone,
            'WhatsApp': formData.whatsapp,
            'Email': formData.email,
            'State': formData.state,
            'LGA': formData.lga,
            'City': formData.city,
            'Address': formData.address,
            'Team Type': formData.team_type,
            'Team Name': formData.team_name,
            'Team Size': formData.team_size,
            'Team Members': formData.team_type === 'Team' 
                ? teamMembers.map((m, i) => `Member ${i+1}: ${m.name} (${m.age}) - ${m.phone}`).join('; ')
                : 'Solo',
            'Age Division': getAgeDivision(formData.age),
            'Project Title': formData.project_title,
            'Problem Category': formData.problem_category,
            'Problem Statement': formData.problem_statement,
            'Solution': formData.solution,
            'Expected Impact': formData.expected_impact,
            'Start Date': formData.start_date,
            'Completion Date': formData.completion_date,
            'Budget': formData.budget,
            'Funding Sources': fundingSources,
            'Has Mentor': formData.has_mentor,
            'Mentor Name': formData.mentor_name,
            'Mentor Phone': formData.mentor_phone,
            'Mentor Email': formData.mentor_email,
            'Mentor Relationship': formData.mentor_relationship,
            'Core Values': selectedValues.join(', '),
            'Source': formData.source,
            'Agree Commitment': formData.agree_commitment ? 'Yes' : 'No',
            'Agree Values': formData.agree_values ? 'Yes' : 'No',
            'Agree Honesty': formData.agree_honesty ? 'Yes' : 'No',
            'Agree Documentation': formData.agree_documentation ? 'Yes' : 'No',
            'Agree Media': formData.agree_media ? 'Yes' : 'No',
            'Agree Rules': formData.agree_rules ? 'Yes' : 'No',
            'Agree Final': formData.agree_final ? 'Yes' : 'No',
            'school_name': formData.school_name, // Added at the end as in user's manual list
        };

        try {
            await submitUrlEncodedForm(SCRIPT_URL, payload, 'NBC registration');

            setRefLink(`${window.location.origin}/NBC/register?ref=${nbcId}`);
            setUserId(nbcId);
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error('Submission failed', err);
            setSubmitError(err.message || `Registration failed. Please try again or contact ${SITE.email}.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const stepLabels = [
        '📋 Personal Info',
        '👥 Team Info',
        '💡 Project Details',
        '👨‍🏫 Mentor & Agreement',
        '👀 Review & Confirm'
    ];

    const ReviewSection = ({ title, stepNum, children }) => (
        <div style={{ marginBottom: '1.5rem', padding: '1.25rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: T.green, textTransform: 'uppercase' }}>{title}</h4>
                <button type="button" onClick={() => setStep(stepNum)} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {children}
            </div>
        </div>
    );

    const ReviewItem = ({ label, value }) => (
        <div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.2rem' }}>{label}</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0f172a' }}>{value || <span style={{ color: '#cbd5e1', fontWeight: 400 }}>Not provided</span>}</div>
        </div>
    );

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0D3D26 0%, #16613E 50%, #1a7a4e 100%)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>
            {/* Hero Header */}
            <div style={{ padding: '2rem 1.5rem 0', maxWidth: '700px', margin: '0 auto' }}>
                <Link to="/NBC" style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                    color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', fontWeight: 600,
                    marginBottom: '2rem',
                }}>
                    <ChevronLeft size={16} /> Back to NBC
                </Link>

                {!submitted && (
                    <div style={{ textAlign: 'center', paddingBottom: '2rem' }}>
                        <div style={{
                            display: 'inline-block', background: 'rgba(232,185,84,0.2)',
                            border: '1px solid rgba(232,185,84,0.4)', borderRadius: '999px',
                            padding: '0.4rem 1.2rem', fontSize: '0.8rem', fontWeight: 800,
                            color: T.goldL, textTransform: 'uppercase', letterSpacing: '0.15em',
                            marginBottom: '1.25rem',
                        }}>2025 Cohort · Limited Spots</div>
                        <h1 style={{
                            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 900, color: 'white', marginBottom: '0.75rem', lineHeight: 1.2,
                        }}>Register for NBC 2025</h1>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
                            Join 1,000 National Builders competing for <strong style={{ color: T.goldL }}>₦3,000,000</strong>
                        </p>
                    </div>
                )}
            </div>

            {/* Form Card */}
            <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1rem 5rem' }}>
                <div
                    ref={formCardRef}
                    style={{
                        background: 'white', borderRadius: '28px',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
                        overflow: 'hidden',
                        scrollMarginTop: '80px',
                    }}
                >
                    {!submitted ? (
                        <>
                            {/* Progress Bar with Gold Glow */}
                            <div style={{ height: '8px', background: 'rgba(5, 20, 13, 0.05)', position: 'relative' }}>
                                <motion.div
                                    style={{ 
                                        height: '100%', 
                                        background: `linear-gradient(90deg, ${T.green}, ${T.gold})`, 
                                        borderRadius: '0 4px 4px 0',
                                        boxShadow: `0 0 15px ${T.gold}66`
                                    }}
                                    initial={{ width: `${(1 / TOTAL_STEPS) * 100}%` }}
                                    animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </div>

                            {/* Step Header */}
                            <div style={{ padding: '2rem 2rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.35rem' }}>
                                        Step {step} of {TOTAL_STEPS}
                                    </div>
                                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                                        {stepLabels[step - 1]}
                                    </h2>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                                        <div key={i} style={{
                                            width: i + 1 === step ? '24px' : '8px',
                                            height: '8px',
                                            borderRadius: '999px',
                                            background: i + 1 <= step ? T.green : '#e2e8f0',
                                            transition: 'all 0.3s ease',
                                        }} />
                                    ))}
                                </div>
                            </div>

                            {/* Form Body */}
                            <form id="nbc-registration-form" onSubmit={step === TOTAL_STEPS ? (e) => { e.preventDefault(); handleRegister(); } : nextStep}>
                                <div style={{ padding: '1.5rem 2rem' }}>
                                    <AnimatePresence mode="wait">

                                        {/* ── STEP 1: PERSONAL INFORMATION ── */}
                                        {step === 1 && (
                                            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-4">
                                                <div style={{ background: '#fefce8', border: '2px solid #fde047', borderRadius: '14px', padding: '1rem' }}>
                                                    <label className={LABEL}>🎁 Referral Code <span style={{ fontWeight: 400, color: '#64748b' }}>(Optional)</span></label>
                                                    <input type="text" name="referral_code" value={formData.referral_code} onChange={handleInputChange} className={INPUT} style={{ background: 'white' }} placeholder="Were you referred? Enter their code" />
                                                    <p style={{ fontSize: '0.75rem', color: T.gold, marginTop: '0.3rem', fontWeight: 600 }}>✨ Your friend gets credit for recruiting you!</p>
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className={LABEL}>Your Name <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                            <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} placeholder="First Name" required className={INPUT} />
                                                            <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} placeholder="Last Name" required className={INPUT} />
                                                        </div>
                                                        <div style={{ marginTop: '0.75rem' }}>
                                                            <input type="text" name="middle_name" value={formData.middle_name} onChange={handleInputChange} placeholder="Middle Name (Optional)" className={INPUT} />
                                                        </div>
                                                    </div>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className={LABEL}>Date of Birth <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required className={INPUT} />
                                                        {formData.age ? (
                                                            <p style={{ fontSize: '0.85rem', color: T.green, fontWeight: 700, marginTop: '0.4rem' }}>Calculated Age: {formData.age}</p>
                                                        ) : (
                                                            <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>Participants must be 7-17 years old</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>Gender <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <select name="gender" value={formData.gender} onChange={handleInputChange} required className={SELECT}>
                                                            <option value="">Select</option>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required pattern="[0-9]{11}" className={INPUT} placeholder="08012345678" />
                                                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.2rem' }}>11 digits, no spaces</p>
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>WhatsApp Number <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} required pattern="[0-9]{11}" className={INPUT} placeholder="08012345678" />
                                                        <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.2rem' }}>WhatsApp is preferred for updates</p>
                                                    </div>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className={LABEL}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={INPUT} placeholder="your@email.com" />
                                                    </div>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className={LABEL}>School Name <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="text" name="school_name" value={formData.school_name} onChange={handleInputChange} required className={INPUT} placeholder="e.g. Unity Primary School, Ikeja" />
                                                        <button type="button" onClick={() => setFormData(p => ({ ...p, school_name: 'I am out of school' }))} style={{ marginTop: '0.4rem', fontSize: '0.75rem', color: T.green, fontWeight: 700, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>I am out of school</button>
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>State <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <select name="state" value={formData.state} onChange={handleInputChange} required className={SELECT}>
                                                            <option value="">Select state</option>
                                                            {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s === 'FCT' ? 'FCT Abuja' : s}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>LGA <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="text" name="lga" value={formData.lga} onChange={handleInputChange} required className={INPUT} placeholder="e.g. Ikeja" />
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>City / Town <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className={INPUT} placeholder="Where do you live?" />
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>Address <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className={INPUT} placeholder="House no. & street" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* ── STEP 2: TEAM INFORMATION ── */}
                                        {step === 2 && (
                                            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-5">
                                                <div>
                                                    <label className={LABEL}>Solo or Team? <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                                                        {['Solo', 'Team'].map(v => (
                                                            <label key={v} style={{ display: 'flex', alignItems: 'center', padding: '1rem', border: `2px solid ${formData.team_type === v ? T.green : '#e2e8f0'}`, borderRadius: '14px', cursor: 'pointer', background: formData.team_type === v ? '#f0fdf4' : 'transparent', transition: 'all 0.2s' }}>
                                                                <input type="radio" name="team_type" value={v} checked={formData.team_type === v} onChange={handleInputChange} style={{ display: 'none' }} />
                                                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${formData.team_type === v ? T.green : '#cbd5e1'}`, marginRight: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{formData.team_type === v && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: T.green }} />}</div>
                                                                <div><div style={{ fontWeight: 700 }}>{v}</div><div style={{ fontSize: '0.85rem', color: '#64748b' }}>{v === 'Solo' ? 'Working alone' : '2–5 members'}</div></div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                {formData.team_type === 'Team' && (
                                                    <div className="space-y-4">
                                                        <div><label className={LABEL}>Team Name</label><input type="text" name="team_name" value={formData.team_name} onChange={handleInputChange} className={INPUT} /></div>
                                                        <div><label className={LABEL}>Team Size</label><select name="team_size" value={formData.team_size} onChange={handleInputChange} className={SELECT}><option value="">Select</option>{['2','3','4','5','6+'].map(n => <option key={n} value={n}>{n} members</option>)}</select></div>
                                                        <div className="space-y-3">
                                                            {teamMembers.map((m, i) => (
                                                                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.8fr 1.2fr', gap: '0.5rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '12px' }}>
                                                                    <input type="text" placeholder="Name" value={m.name} onChange={e => handleMemberChange(i, 'name', e.target.value)} className={INPUT} style={{ padding: '0.5rem' }} />
                                                                    <input type="number" placeholder="Age" value={m.age} onChange={e => handleMemberChange(i, 'age', e.target.value)} className={INPUT} style={{ padding: '0.5rem' }} />
                                                                    <input type="tel" placeholder="Phone" value={m.phone} onChange={e => handleMemberChange(i, 'phone', e.target.value)} className={INPUT} style={{ padding: '0.5rem' }} />
                                                                </div>
                                                            ))}
                                                            <button type="button" onClick={handleAddMember} style={{ width: '100%', padding: '0.5rem', border: `2px dashed ${T.green}`, color: T.green, borderRadius: '10px', fontWeight: 700 }}>+ Add Member</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}

                                        {/* ── STEP 3: PROJECT DETAILS ── */}
                                        {step === 3 && (
                                            <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-5">
                                                <div><label className={LABEL}>Project Title</label><input type="text" name="project_title" value={formData.project_title} onChange={handleInputChange} required className={INPUT} placeholder="e.g. Waste to Wealth" /></div>
                                                <div><label className={LABEL}>Problem Category</label><select name="problem_category" value={formData.problem_category} onChange={handleInputChange} required className={SELECT}><option value="">Select Category</option>{['Education','Environment','Health','Economic','Civic','Arts','Tech','Other'].map(c => <option key={c}>{c}</option>)}</select></div>
                                                <div><label className={LABEL}>Problem Statement</label><textarea name="problem_statement" value={formData.problem_statement} onChange={handleInputChange} required rows="4" className={INPUT} placeholder="What specific community issue are you solving?" /></div>
                                                <div><label className={LABEL}>Solution</label><textarea name="solution" value={formData.solution} onChange={handleInputChange} required rows="4" className={INPUT} placeholder="How exactly will you solve it using character and resourcefulness?" /></div>
                                                <div><label className={LABEL}>Expected Impact</label><textarea name="expected_impact" value={formData.expected_impact} onChange={handleInputChange} required rows="2" className={INPUT} placeholder="Who will benefit and what will change?" /></div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <div><label className={LABEL}>Start</label><input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} required className={INPUT} /></div>
                                                    <div><label className={LABEL}>End</label><input type="date" name="completion_date" value={formData.completion_date} onChange={handleInputChange} required className={INPUT} /></div>
                                                </div>
                                                <div><label className={LABEL}>Budget (₦)</label><input type="number" name="budget" value={formData.budget} onChange={handleInputChange} required className={INPUT} /></div>
                                                <div className="space-y-2">
                                                    <label className={LABEL}>Resources</label>
                                                    {['Donations', 'Local Materials', 'Borrow', 'In-kind', 'Personal', 'Other'].map(v => (
                                                        <label key={v} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', cursor: 'pointer' }}>
                                                            <input type="checkbox" name={`funding_${v.toLowerCase().replace(' ', '')}`} checked={formData[`funding_${v.toLowerCase().replace(' ', '')}`]} onChange={handleInputChange} /> <span>{v}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                         {/* ── STEP 4: MENTOR & AGREEMENT ── */}
                                        {step === 4 && (
                                            <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-6">
                                                <div style={{ background: `linear-gradient(135deg, ${T.green}, ${T.greenD})`, borderRadius: '16px', padding: '1.75rem', color: 'white', boxShadow: '0 10px 30px rgba(11,42,27,0.2)' }}>
                                                    <h3 style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: "'Playfair Display', serif", marginBottom: '0.6rem', color: T.goldL }}>Guidance & Commitment</h3>
                                                    <p style={{ fontSize: '0.9rem', opacity: 0.85, lineHeight: 1.6 }}>Great projects are built with guidance. Tell us about your mentor, select the values that drive you, and commit to your journey as a National Builder.</p>
                                                </div>

                                                <div>
                                                    <label className={LABEL}>Mentor Details <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                                                        {['Yes', 'No'].map(v => (
                                                            <label key={v} style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '1rem', border: `2px solid ${formData.has_mentor === v ? T.green : '#e2e8f0'}`, borderRadius: '14px', cursor: 'pointer', background: formData.has_mentor === v ? '#f0fdf4' : 'transparent', transition: 'all 0.2s' }}>
                                                                <input type="radio" name="has_mentor" value={v} checked={formData.has_mentor === v} onChange={handleInputChange} style={{ display: 'none' }} />
                                                                <span style={{ fontWeight: 600, color: formData.has_mentor === v ? T.green : '#64748b' }}>{v === 'Yes' ? 'I have a mentor' : 'No mentor yet'}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                    
                                                    {formData.has_mentor === 'Yes' && (
                                                        <div className="space-y-3">
                                                            <input type="text" name="mentor_name" value={formData.mentor_name} onChange={handleInputChange} placeholder="Who will guide you? (Name)" className={INPUT} />
                                                            <input type="tel" name="mentor_phone" value={formData.mentor_phone} onChange={handleInputChange} placeholder="Mentor's Phone (11 digits)" className={INPUT} />
                                                            <select name="mentor_relationship" value={formData.mentor_relationship} onChange={handleInputChange} className={SELECT}>
                                                                <option value="">Relationship (e.g. Parent, Teacher)</option>
                                                                {['Parent','Teacher','Leader','Other'].map(r => <option key={r}>{r}</option>)}
                                                            </select>
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className={LABEL}>Core Values (Exactly 3) <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem' }}>Click the <Info size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> icon to learn more about each value.</p>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                                                        {Object.entries(VALUE_INFO).map(([v]) => (
                                                            <div key={v} style={{ position: 'relative' }}>
                                                                <button type="button" onClick={() => toggleValue(v)} style={{ width: '100%', textAlign: 'left', padding: '1rem', borderRadius: '14px', border: `2px solid ${selectedValues.includes(v) ? T.green : '#f1f5f9'}`, background: selectedValues.includes(v) ? '#f0fdf4' : 'white', fontWeight: 700, transition: 'all 0.2s', color: selectedValues.includes(v) ? T.green : '#334155' }}>
                                                                    {v}
                                                                </button>
                                                                <button type="button" onClick={() => setActiveValueModal(v)} style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', padding: '0.2rem', color: selectedValues.includes(v) ? T.green : '#94a3b8' }}>
                                                                    <Info size={18} />
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {valuesError && (
                                                        <p style={{ fontSize: '0.75rem', color: T.err, marginTop: '0.75rem' }}>
                                                            Select exactly 3 core values before submitting your registration.
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="space-y-3 pt-2">
                                                    <label className={LABEL}>Required Commitments</label>
                                                    {[
                                                        { id: 'commitment', text: "I agree to commit to the 6-month duration of the challenge and see my project through to completion." },
                                                        { id: 'values', text: "I agree to uphold the 8 Core Values of a National Builder in my personal life and project." },
                                                        { id: 'honesty', text: "I certify that all information provided is true, and this project is my original idea." },
                                                        { id: 'media', text: "I consent to the use of my photos, videos, and project documentation for educational and promotional purposes." },
                                                        { id: 'rules', text: "I agree to abide by the official rules, regulations, and judge's decisions of NBC 2025." }
                                                    ].map(v => (
                                                        <label key={v.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.75rem', fontSize: '0.85rem', cursor: 'pointer', background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                                                            <input type="checkbox" name={`agree_${v.id}`} checked={formData[`agree_${v.id}`]} onChange={handleInputChange} required style={{ marginTop: '0.15rem' }} /> 
                                                            <span style={{ color: '#445164', fontWeight: 500 }}>{v.text}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* ── STEP 5: REVIEW & CONFIRM ── */}
                                        {step === 5 && (
                                            <motion.div key="s5" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }}>
                                                {submitError && (
                                                    <div style={{ marginBottom: '1rem', padding: '1rem 1.25rem', borderRadius: '14px', border: `1px solid ${T.err}33`, background: `${T.err}10`, color: T.err, fontSize: '0.9rem', lineHeight: 1.6 }}>
                                                        {submitError}
                                                    </div>
                                                )}
                                                <ReviewSection title="Personal Information" stepNum={1}>
                                                    <ReviewItem label="Name" value={`${formData.first_name} ${formData.middle_name} ${formData.last_name}`.replace(/\s+/g, ' ').trim()} />
                                                    <ReviewItem label="Age" value={formData.age} />
                                                    <ReviewItem label="Email" value={formData.email} />
                                                    <ReviewItem label="WhatsApp" value={formData.whatsapp} />
                                                    <ReviewItem label="School" value={formData.school_name} />
                                                    <ReviewItem label="Location" value={`${formData.city}, ${formData.state}`} />
                                                </ReviewSection>

                                                <ReviewSection title="Team Status" stepNum={2}>
                                                    <ReviewItem label="Type" value={formData.team_type} />
                                                    {formData.team_type === 'Team' && <ReviewItem label="Team Name" value={formData.team_name} />}
                                                </ReviewSection>

                                                <ReviewSection title="Project Vision" stepNum={3}>
                                                    <ReviewItem label="Title" value={formData.project_title} />
                                                    <ReviewItem label="Category" value={formData.problem_category} />
                                                    <ReviewItem label="Budget" value={`₦${formData.budget}`} />
                                                </ReviewSection>

                                                <ReviewSection title="Leadership" stepNum={4}>
                                                    <ReviewItem label="Mentor" value={formData.has_mentor === 'Yes' ? formData.mentor_name : 'No'} />
                                                    <ReviewItem label="Core Values" value={selectedValues.join(', ')} />
                                                </ReviewSection>

                                                <div style={{ padding: '1rem', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '16px', marginTop: '1.5rem' }}>
                                                    <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                                                        <input type="checkbox" name="agree_final" checked={formData.agree_final} onChange={handleInputChange} required style={{ marginTop: '0.2rem' }} />
                                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#92400e' }}>I certify that all provided information is true and I am ready to build Nigeria!</span>
                                                    </label>
                                                </div>
                                            </motion.div>
                                        )}

                                    </AnimatePresence>
                                </div>

                                {/* Nav Buttons */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2rem 2rem', gap: '1rem' }}>
                                    {step > 1 && (
                                        <button type="button" onClick={prevStep} style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', background: '#f1f5f9', color: '#64748b', fontWeight: 700, border: 'none', cursor: 'pointer' }}>← Back</button>
                                    )}
                                    <div style={{ flex: 1 }} />
                                    {step < TOTAL_STEPS ? (
                                        <button type="submit" style={{ padding: '0.85rem 2rem', borderRadius: '12px', background: T.green, color: 'white', fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: `0 6px 16px ${T.green}40` }}>Next Step →</button>
                                    ) : (
                                        <button type="button" onClick={handleRegister} disabled={isSubmitting || !formData.agree_final} style={{ padding: '0.85rem 2rem', borderRadius: '12px', background: 'linear-gradient(135deg, #eab308, #f59e0b)', color: '#14532d', fontWeight: 800, border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 8px 20px rgba(234,179,8,0.3)' }}>
                                            {isSubmitting ? 'Submitting...' : 'FINISH & REGISTER ✓'}
                                        </button>
                                    )}
                                </div>
                            </form>
                        </>
                    ) : (
                        /* ── SUCCESS STATE ── */
                        <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                            </motion.div>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>
                                Welcome, National Builder!
                            </h2>
                            <p style={{ color: '#64748b', marginBottom: '2rem' }}>Your registration is confirmed!</p>

                            {/* NBC ID */}
                            <div style={{ background: 'rgba(196,136,44,0.08)', border: '1.5px dashed #C4882C', borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: T.gold, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Your NBC ID — Save this!</div>
                                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: T.gold, fontFamily: "'DM Mono', monospace", wordBreak: 'break-all' }}>{userId}</div>
                                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>Keep this for all future NBC communications</p>
                            </div>

                            {/* Referral */}
                            <div style={{ background: '#f0fdf4', border: `2px solid ${T.green}`, borderRadius: '16px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
                                <h4 style={{ fontWeight: 900, color: T.green, marginBottom: '0.5rem', textAlign: 'center' }}>🎯 Your Referral Mission</h4>
                                <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem', textAlign: 'center' }}>Share your link to earn rewards:</p>
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <input readOnly value={refLink} style={{
                                        flex: 1, padding: '0.75rem', borderRadius: '10px',
                                        border: '1px solid #bbf7d0', fontSize: '0.8rem', outline: 'none', background: 'white',
                                    }} />
                                    <button onClick={() => navigator.clipboard.writeText(refLink)} style={{
                                        padding: '0.75rem 1rem', borderRadius: '10px', background: T.green,
                                        color: 'white', fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                    }}>Copy</button>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#374151', lineHeight: 2 }}>
                                    <p>✅ 10 referrals → Become <strong>Regional Ambassador</strong></p>
                                    <p>✅ 20 referrals → Get a <strong>Physical Certificate</strong></p>
                                    <p>✅ 50 referrals → <strong>Free Trip to Grand Finale!</strong></p>
                                </div>
                                {/* Social Sharing */}
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                    {[
                                        { label: '📱 WhatsApp', bg: '#25D366', onClick: () => { const m = `🇳🇬 Join me as a NATIONAL BUILDER!\n\nI just registered for NBC — Nigeria's biggest youth challenge for kids!\n✅ Solve real problems in your community\n✅ Learn 8 powerful values\n✅ Compete for ₦3,000,000!\n\nRegister here: ${refLink}\n\n#NationalBuildersCorps`; window.open(`https://wa.me/?text=${encodeURIComponent(m)}`, '_blank'); } },
                                        { label: '📘 Facebook', bg: '#1877F2', onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}`, '_blank') },
                                        { label: '🐦 Twitter', bg: '#1DA1F2', onClick: () => { const t = `I just joined Nigeria's National Builders Corp! Competing for ₦3M. Join me:`; window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(t)}&url=${encodeURIComponent(refLink)}`, '_blank'); } },
                                    ].map(btn => (
                                        <button key={btn.label} onClick={btn.onClick} style={{
                                            flex: 1, padding: '0.65rem', borderRadius: '10px',
                                            background: btn.bg, color: 'white', fontWeight: 700,
                                            fontSize: '0.8rem', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                        }}>{btn.label}</button>
                                    ))}
                                </div>
                            </div>

                            {/* Next Steps */}
                            <div style={{ textAlign: 'left', background: '#fffbeb', borderLeft: `4px solid ${T.gold}`, padding: '1rem 1.25rem', borderRadius: '0 12px 12px 0', marginBottom: '2rem' }}>
                                <p style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#0f172a' }}>📱 What happens next:</p>
                                <ul style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 2 }}>
                                    <li>✅ Welcome WhatsApp within 24 hours</li>
                                    <li>✅ You'll be added to your state WhatsApp group</li>
                                    <li>✅ Download the Values Workbook (link in WhatsApp)</li>
                                    <li>✅ Start planning your project RIGHT NOW!</li>
                                </ul>
                            </div>

                            <p style={{ fontSize: '1.3rem', fontWeight: 900, color: T.green, marginBottom: '1.5rem' }}>The ₦3M Grand Finale awaits! 🏆</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                <a href="https://chat.whatsapp.com/LhdmEpKXoXgDgtEj73WVqz?mode=gi_t" target="_blank" rel="noopener noreferrer" aria-label="Open the NBC WhatsApp community in a new tab" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '1rem 2.5rem', borderRadius: '999px', background: T.green,
                                    color: 'white', fontWeight: 700, textDecoration: 'none',
                                }}>
                                    <MessageCircle size={18} /> Join WhatsApp Community
                                </a>
                                <button onClick={() => {
                                    setSubmitted(false);
                                    setStep(1);
                                    setSelectedValues([]);
                                    setUserId('');
                                    setRefLink('');
                                    setSubmitError("");
                                    setFormData(prev => ({ ...prev, has_mentor: '', team_type: 'Solo' }));
                                }} style={{
                                    color: '#94a3b8', fontSize: '0.875rem', fontWeight: 600,
                                    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                }}>Register Another Person</button>
                            </div>
                        </div>
                    )}
                    {activeValueModal && <ValueModal valueName={activeValueModal} info={VALUE_INFO[activeValueModal]} onClose={() => setActiveValueModal(null)} />}
                </div>
            </div>

            <style>{`
                @keyframes spin { to { transform: rotate(360deg); } }
                .space-y-4 > * + * { margin-top: 1rem; }
                .space-y-5 > * + * { margin-top: 1.25rem; }
            `}</style>
        </div>
    );
}
