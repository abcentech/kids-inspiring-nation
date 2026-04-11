import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, CheckCircle2, MessageCircle, ArrowLeft, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const T = {
    green: "#16613E", greenD: "#0D3D26",
    gold: "#C4882C", goldL: "#E8B954",
    cream: "#FDF7EC",
};

const NIGERIAN_STATES = [
    'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
    'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
    'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa',
    'Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba',
    'Yobe','Zamfara'
];

const INPUT = "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 focus:bg-white focus:ring-4 focus:ring-green-800/10 transition-all outline-none text-gray-800";
const SELECT = "w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-green-700 outline-none appearance-none text-gray-800";
const LABEL = "block text-sm font-bold text-gray-700 mb-1.5";

export default function NBCRegister({ dark }) {
    const [step, setStep] = useState(1);
    const [teamType, setTeamType] = useState('Solo');
    const [hasMentor, setHasMentor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedValues, setSelectedValues] = useState([]);
    const [valuesError, setValuesError] = useState(false);
    const [refLink, setRefLink] = useState('');
    const [userId, setUserId] = useState('');
    const [submitted, setSubmitted] = useState(false);
    
    // New state for DOB and Dynamic Team
    const [dob, setDob] = useState('');
    const [calculatedAge, setCalculatedAge] = useState('');
    const [teamMembers, setTeamMembers] = useState([{ name: '', age: '', phone: '' }]);

    // Ref for the form card — we scroll this into view instead of window
    const formCardRef = useRef(null);

    const TOTAL_STEPS = 4;

    // Auto-fill referral code from URL ?ref=
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (ref) {
            const el = document.querySelector('[name="referral_code"]');
            if (el) el.value = ref;
        }
    }, [step]);

    const scrollToForm = () => {
        if (formCardRef.current) {
            formCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const nextStep = (e) => {
        e.preventDefault();
        setStep(prev => prev + 1);
        // Small delay so new step renders before we scroll
        setTimeout(scrollToForm, 50);
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        setTimeout(scrollToForm, 50);
    };

    const calculateAge = (birthDate) => {
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
    };

    const handleAddMember = () => setTeamMembers([...teamMembers, { name: '', age: '', phone: '' }]);
    const handleRemoveMember = (index) => setTeamMembers(teamMembers.filter((_, i) => i !== index));
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

    const handleRegister = async (e) => {
        e.preventDefault();
        if (selectedValues.length !== 3) { setValuesError(true); return; }
        setIsSubmitting(true);

        // ⚠️ REPLACE with your Google Apps Script Web App URL
        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzJipOJljZxXDmUWjoagFyRotta8ohyMPNrCPn4EeqhEXd9zOFm4z5i-_QsIii7bBoYHA/exec";

        const form = document.getElementById('nbc-registration-form');
        const raw = new FormData(form);

        // Generate NBC ID
        const ts = Date.now().toString(36).toUpperCase();
        const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
        const nbcId = `NBC2026-${ts}${rand}`;

        const fundingSources = ['funding_donations','funding_local','funding_borrow','funding_inkind','funding_personal','funding_other']
            .filter(n => raw.get(n))
            .map(n => raw.get(n))
            .join(', ');

        const payload = {
            'Timestamp': new Date().toISOString(),
            'Registration Date': new Date().toLocaleDateString(),
            'NBC ID': nbcId,
            'Referral Code': raw.get('referral_code') || '',
            'Full Name': raw.get('full_name') || '',
            'DOB': dob,
            'Age': calculatedAge,
            'Gender': raw.get('gender') || '',
            'Phone': raw.get('phone') || '',
            'WhatsApp': raw.get('whatsapp') || '',
            'Email': raw.get('email') || '',
            'School Name': raw.get('school_name') || '',
            'State': raw.get('state') || '',
            'LGA': raw.get('lga') || '',
            'City': raw.get('city') || '',
            'Address': raw.get('address') || '',
            'Team Type': raw.get('team_type') || 'Solo',
            'Team Name': raw.get('team_name') || '',
            'Team Size': raw.get('team_size') || '',
            'Team Members': teamType === 'Team' 
                ? teamMembers.map((m, i) => `Member ${i+1}: ${m.name} (${m.age}) - ${m.phone}`).join('; ')
                : '',
            'Project Title': raw.get('project_title') || '',
            'Problem Category': raw.get('problem_category') || '',
            'Problem Statement': raw.get('problem_statement') || '',
            'Solution': raw.get('solution') || '',
            'Expected Impact': raw.get('expected_impact') || '',
            'Start Date': raw.get('start_date') || '',
            'Completion Date': raw.get('completion_date') || '',
            'Budget': raw.get('budget') || '',
            'Funding Sources': fundingSources,
            'Has Mentor': raw.get('has_mentor') || '',
            'Mentor Name': raw.get('mentor_name') || '',
            'Mentor Phone': raw.get('mentor_phone') || '',
            'Mentor Email': raw.get('mentor_email') || '',
            'Mentor Relationship': raw.get('mentor_relationship') || '',
            'Core Values': selectedValues.join(', '),
            'Source': raw.get('source') || '',
            'Agree Commitment': raw.get('agree_commitment') ? 'Yes' : 'No',
            'Agree Values': raw.get('agree_values') ? 'Yes' : 'No',
            'Agree Honesty': raw.get('agree_honesty') ? 'Yes' : 'No',
            'Agree Documentation': raw.get('agree_documentation') ? 'Yes' : 'No',
            'Agree Media': raw.get('agree_media') ? 'Yes' : 'No',
            'Agree Rules': raw.get('agree_rules') ? 'Yes' : 'No',
            'Agree Final': raw.get('agree_final') ? 'Yes' : 'No',
        };

        try {
            const params = new URLSearchParams();
            Object.entries(payload).forEach(([k, v]) => params.append(k, v));
            
            await fetch(SCRIPT_URL, { 
                method: 'POST', 
                body: params, 
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const link = `${window.location.origin}/NBC/register?ref=${nbcId}`;
            setRefLink(link);
            setUserId(nbcId);
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            console.error('Submission failed', err);
            alert('Registration failed. Please try again or contact info@nationalbuilders.ng');
        } finally {
            setIsSubmitting(false);
        }
    };

    const stepLabels = [
        '📋 Personal Info',
        '👥 Team Info',
        '💡 Project Details',
        '👨‍🏫 Mentor & Agreement',
    ];

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
                        }}>2026 Cohort · Limited Spots</div>
                        <h1 style={{
                            fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)',
                            fontWeight: 900, color: 'white', marginBottom: '0.75rem', lineHeight: 1.2,
                        }}>Register for NBC 2026</h1>
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
                            {/* Progress Bar */}
                            <div style={{ height: '6px', background: '#f1f5f9' }}>
                                <motion.div
                                    style={{ height: '100%', background: 'linear-gradient(90deg, #16613E, #2a9e64)', borderRadius: '0 3px 3px 0' }}
                                    initial={{ width: `${(1 / TOTAL_STEPS) * 100}%` }}
                                    animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                                    transition={{ duration: 0.5, ease: 'easeInOut' }}
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
                                {/* Step Dots */}
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
                            <form id="nbc-registration-form" onSubmit={step === TOTAL_STEPS ? handleRegister : nextStep}>
                                <div style={{ padding: '1.5rem 2rem' }}>
                                    <AnimatePresence mode="wait">

                                        {/* ── STEP 1: PERSONAL INFORMATION ── */}
                                        {step === 1 && (
                                            <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-4">

                                                {/* Referral Code */}
                                                <div style={{ background: '#fefce8', border: '2px solid #fde047', borderRadius: '14px', padding: '1rem' }}>
                                                    <label className={LABEL}>🎁 Referral Code <span style={{ fontWeight: 400, color: '#64748b' }}>(Optional)</span></label>
                                                    <input type="text" name="referral_code" className={INPUT} style={{ background: 'white' }} placeholder="Were you referred? Enter their code" />
                                                    <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.4rem' }}>✨ Your friend gets credit for recruiting you!</p>
                                                </div>

                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className={LABEL}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="text" name="full_name" required className={INPUT} placeholder="Your full legal name" />
                                                    </div>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className={LABEL}>Date of Birth <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input 
                                                            type="date" 
                                                            name="dob" 
                                                            required 
                                                            className={INPUT} 
                                                            value={dob}
                                                            onChange={(e) => {
                                                                setDob(e.target.value);
                                                                setCalculatedAge(calculateAge(e.target.value));
                                                            }}
                                                        />
                                                        {calculatedAge && (
                                                            <p style={{ fontSize: '0.85rem', color: T.green, fontWeight: 700, marginTop: '0.4rem' }}>
                                                                Calculated Age: {calculatedAge}
                                                            </p>
                                                        )}
                                                        <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>Participants must be 7–17 years old</p>
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>Gender <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <select name="gender" required className={SELECT}>
                                                            <option value="">Select</option>
                                                            <option>Male</option>
                                                            <option>Female</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>Phone Number <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="tel" name="phone" required pattern="[0-9]{11}" className={INPUT} placeholder="08012345678" />
                                                        <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>11 digits, no spaces</p>
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>WhatsApp Number <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="tel" name="whatsapp" required pattern="[0-9]{11}" className={INPUT} placeholder="08012345678" />
                                                    </div>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className={LABEL}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="email" name="email" required className={INPUT} placeholder="your@email.com" />
                                                    </div>
                                                    <div style={{ gridColumn: '1 / -1' }}>
                                                        <label className={LABEL}>School Name <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="text" name="school_name" required className={INPUT} placeholder="e.g. Unity Primary School, Ikeja" />
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>State <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <select name="state" required className={SELECT}>
                                                            <option value="">Select state</option>
                                                            {NIGERIAN_STATES.map(s => <option key={s} value={s}>{s === 'FCT' ? 'FCT Abuja' : s}</option>)}
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>LGA <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="text" name="lga" required className={INPUT} placeholder="e.g. Ikeja" />
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>City / Town <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="text" name="city" required className={INPUT} placeholder="Where do you live?" />
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>Street Address <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="text" name="address" required className={INPUT} placeholder="House no. & street" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* ── STEP 2: TEAM INFORMATION ── */}
                                        {step === 2 && (
                                            <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-5">
                                                <div>
                                                    <label className={LABEL}>Are you participating solo or with a team? <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                                                        {[
                                                            { v: 'Solo', sub: "I'm working on this project alone" },
                                                            { v: 'Team', sub: 'I have 2–5 team members with me' },
                                                        ].map(opt => (
                                                            <label key={opt.v} style={{
                                                                display: 'flex', alignItems: 'center', padding: '1rem',
                                                                border: `2px solid ${teamType === opt.v ? T.green : '#e2e8f0'}`,
                                                                borderRadius: '14px', cursor: 'pointer',
                                                                background: teamType === opt.v ? '#f0fdf4' : 'transparent',
                                                                transition: 'all 0.2s',
                                                            }}>
                                                                <input type="radio" name="team_type" value={opt.v} checked={teamType === opt.v} onChange={e => setTeamType(e.target.value)} required style={{ display: 'none' }} />
                                                                <div style={{
                                                                    width: '20px', height: '20px', borderRadius: '50%',
                                                                    border: `2px solid ${teamType === opt.v ? T.green : '#cbd5e1'}`,
                                                                    marginRight: '0.75rem', flexShrink: 0,
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                }}>
                                                                    {teamType === opt.v && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: T.green }} />}
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{opt.v}</div>
                                                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{opt.sub}</div>
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                <AnimatePresence>
                                                    {teamType === 'Team' && (
                                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }} className="space-y-4">
                                                            <div>
                                                                <label className={LABEL}>Team Name <span style={{ color: '#ef4444' }}>*</span></label>
                                                                <input type="text" name="team_name" className={INPUT} placeholder="Choose a creative team name" />
                                                            </div>
                                                            <div>
                                                                <label className={LABEL}>Number of Members (incl. you) <span style={{ color: '#ef4444' }}>*</span></label>
                                                                <select name="team_size" className={SELECT}>
                                                                    <option value="">Select</option>
                                                                    {['2','3','4','5','6+'].map(n => <option key={n} value={n === '6+' ? 'More than 5' : n}>{n} members</option>)}
                                                                </select>
                                                            </div>
                                                            <div>
                                                                <label className={LABEL} style={{ marginBottom: '1rem' }}>Team Members Details <span style={{ fontWeight: 400, color: '#64748b' }}>(Excluding yourself)</span></label>
                                                                <div className="space-y-4">
                                                                    {teamMembers.map((member, idx) => (
                                                                        <div key={idx} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '16px', border: '1px solid #e2e8f0', position: 'relative' }}>
                                                                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 0.8fr 1.2fr', gap: '0.75rem' }}>
                                                                                <div>
                                                                                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Name</label>
                                                                                    <input type="text" placeholder="Full Name" className={INPUT} style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem' }} value={member.name} onChange={(e) => handleMemberChange(idx, 'name', e.target.value)} />
                                                                                </div>
                                                                                <div>
                                                                                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Age</label>
                                                                                    <input type="number" placeholder="Age" className={INPUT} style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem' }} value={member.age} onChange={(e) => handleMemberChange(idx, 'age', e.target.value)} />
                                                                                </div>
                                                                                <div style={{ position: 'relative' }}>
                                                                                    <label style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Phone</label>
                                                                                    <input type="tel" placeholder="Phone" className={INPUT} style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem' }} value={member.phone} onChange={(e) => handleMemberChange(idx, 'phone', e.target.value)} />
                                                                                    {teamMembers.length > 1 && (
                                                                                        <button type="button" onClick={() => handleRemoveMember(idx)} style={{ position: 'absolute', top: '-0.5rem', right: '-0.5rem', width: '24px', height: '24px', borderRadius: '50%', background: '#ef4444', color: 'white', display: 'grid', placeItems: 'center', fontSize: '1rem', border: 'none', cursor: 'pointer', boxShadow: '0 4px 10px rgba(239,68,68,0.3)' }}>×</button>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                    <button type="button" onClick={handleAddMember} style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: `2px dashed ${T.green}`, color: T.green, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', background: 'transparent' }} onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                                                        + Add Team Member
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        )}

                                        {/* ── STEP 3: PROJECT DETAILS ── */}
                                        {step === 3 && (
                                            <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-5">
                                                <div>
                                                    <label className={LABEL}>Project Title <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <input type="text" name="project_title" required className={INPUT} placeholder="e.g. 'Clean Water for Mushin'" />
                                                </div>
                                                <div>
                                                    <label className={LABEL}>Problem Category <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <select name="problem_category" required className={SELECT}>
                                                        <option value="">Choose the main category</option>
                                                        {['Education & Literacy','Environment & Sanitation','Health & Wellness','Economic Empowerment','Civic Engagement','Arts & Culture','Infrastructure','Innovation & Technology','Other'].map(c => <option key={c}>{c}</option>)}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className={LABEL}>Problem Statement <span style={{ fontWeight: 400, color: '#94a3b8', fontSize: '0.8rem' }}>(3–5 sentences)</span> <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <textarea name="problem_statement" required rows="5" className={INPUT} style={{ resize: 'none' }} placeholder="What is the problem? Who is affected? How serious is it?" />
                                                </div>
                                                <div>
                                                    <label className={LABEL}>Your Solution <span style={{ fontWeight: 400, color: '#94a3b8', fontSize: '0.8rem' }}>(3–5 sentences)</span> <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <textarea name="solution" required rows="5" className={INPUT} style={{ resize: 'none' }} placeholder="What will you do? How will it work? Why will it solve the problem?" />
                                                </div>
                                                <div>
                                                    <label className={LABEL}>Expected Impact <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <textarea name="expected_impact" required rows="3" className={INPUT} style={{ resize: 'none' }} placeholder="How many people will benefit? What will change?" />
                                                </div>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                    <div>
                                                        <label className={LABEL}>Start Date <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="date" name="start_date" required min="2026-01-01" className={INPUT} />
                                                    </div>
                                                    <div>
                                                        <label className={LABEL}>Completion Date <span style={{ color: '#ef4444' }}>*</span></label>
                                                        <input type="date" name="completion_date" required max="2026-11-30" className={INPUT} />
                                                        <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>By Nov 30, 2026</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className={LABEL}>Estimated Budget (₦) <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <input type="number" name="budget" required min="0" className={INPUT} placeholder="Total project cost in Naira" />
                                                    <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '0.3rem' }}>NBC doesn't fund projects — be resourceful!</p>
                                                </div>
                                                <div>
                                                    <label className={LABEL} style={{ marginBottom: '0.75rem' }}>How will you get resources? <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                                        {[
                                                            { name: 'funding_donations', val: 'Donations', label: 'Donations from community members' },
                                                            { name: 'funding_local', val: 'Local Materials', label: 'Use free / cheap local materials' },
                                                            { name: 'funding_borrow', val: 'Borrow', label: 'Borrow tools or equipment' },
                                                            { name: 'funding_inkind', val: 'In-kind', label: 'In-kind contributions (volunteer labour, services)' },
                                                            { name: 'funding_personal', val: 'Personal', label: 'Personal savings or fundraising' },
                                                            { name: 'funding_other', val: 'Other', label: 'Other' },
                                                        ].map(f => (
                                                            <label key={f.name} style={{
                                                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                                                padding: '0.75rem 1rem', borderRadius: '12px',
                                                                border: '1px solid #e2e8f0', cursor: 'pointer',
                                                                transition: 'background 0.15s',
                                                            }}>
                                                                <input type="checkbox" name={f.name} value={f.val} style={{ width: '16px', height: '16px', accentColor: T.green }} />
                                                                <span style={{ fontSize: '0.9rem', color: '#374151' }}>{f.label}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* ── STEP 4: MENTOR & AGREEMENT ── */}
                                        {step === 4 && (
                                            <motion.div key="s4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.25 }} className="space-y-5">

                                                {/* Mentor Section */}
                                                <div>
                                                    <label className={LABEL}>Do you have an adult mentor? <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                                                        {[
                                                            { v: 'Yes', sub: 'Parent, Teacher, Pastor/Imam, Community Leader' },
                                                            { v: 'No', sub: 'I am still searching for one' },
                                                        ].map(opt => (
                                                            <label key={opt.v} style={{
                                                                display: 'flex', alignItems: 'center', padding: '1rem',
                                                                border: `2px solid ${hasMentor === opt.v ? T.green : '#e2e8f0'}`,
                                                                borderRadius: '14px', cursor: 'pointer',
                                                                background: hasMentor === opt.v ? '#f0fdf4' : 'transparent',
                                                                transition: 'all 0.2s',
                                                            }}>
                                                                <input type="radio" name="has_mentor" value={opt.v} checked={hasMentor === opt.v} onChange={e => setHasMentor(e.target.value)} required style={{ display: 'none' }} />
                                                                <div style={{
                                                                    width: '20px', height: '20px', borderRadius: '50%',
                                                                    border: `2px solid ${hasMentor === opt.v ? T.green : '#cbd5e1'}`,
                                                                    marginRight: '0.75rem', flexShrink: 0,
                                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                }}>
                                                                    {hasMentor === opt.v && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: T.green }} />}
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{opt.v === 'Yes' ? 'Yes, I have a mentor' : 'Not yet'}</div>
                                                                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{opt.sub}</div>
                                                                </div>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                <AnimatePresence>
                                                    {hasMentor === 'Yes' && (
                                                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }} className="space-y-4">
                                                            <div>
                                                                <label className={LABEL}>Mentor's Full Name <span style={{ color: '#ef4444' }}>*</span></label>
                                                                <input type="text" name="mentor_name" className={INPUT} placeholder="Full legal name" />
                                                            </div>
                                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                                                <div>
                                                                    <label className={LABEL}>Mentor's Phone <span style={{ color: '#ef4444' }}>*</span></label>
                                                                    <input type="tel" name="mentor_phone" pattern="[0-9]{11}" className={INPUT} placeholder="08012345678" />
                                                                </div>
                                                                <div>
                                                                    <label className={LABEL}>Mentor's Email</label>
                                                                    <input type="email" name="mentor_email" className={INPUT} placeholder="mentor@email.com" />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <label className={LABEL}>Relationship to You <span style={{ color: '#ef4444' }}>*</span></label>
                                                                <select name="mentor_relationship" className={SELECT}>
                                                                    <option value="">Select</option>
                                                                    {['Parent','Guardian','Teacher','Pastor/Religious Leader','Community Leader','Uncle/Aunt','Other Family Member','Other'].map(r => <option key={r}>{r}</option>)}
                                                                </select>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Core Values */}
                                                <div>
                                                    <label className={LABEL}>Choose Your 3 Core Values <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                                                        Select exactly 3 values that will guide your project &nbsp;
                                                        <span style={{ fontWeight: 700, color: selectedValues.length === 3 ? T.green : '#94a3b8' }}>
                                                            ({selectedValues.length}/3)
                                                        </span>
                                                    </p>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                                                        {[
                                                            { v: 'Integrity', l: 'Integrity & Truth' },
                                                            { v: 'Discipline', l: 'Discipline & Diligence' },
                                                            { v: 'Wisdom', l: 'Wisdom & Discernment' },
                                                            { v: 'Service', l: 'Service & Compassion' },
                                                            { v: 'Justice', l: 'Justice & Righteousness' },
                                                            { v: 'Perseverance', l: 'Perseverance & Resilience' },
                                                            { v: 'Humility', l: 'Humility & Learning' },
                                                            { v: 'Excellence', l: 'Excellence & Craftsmanship' },
                                                        ].map(val => {
                                                            const sel = selectedValues.includes(val.v);
                                                            const dis = !sel && selectedValues.length >= 3;
                                                            return (
                                                                <button key={val.v} type="button" onClick={() => !dis && toggleValue(val.v)} style={{
                                                                    padding: '0.75rem 1rem', borderRadius: '12px',
                                                                    border: `2px solid ${sel ? T.green : dis ? '#f1f5f9' : '#e2e8f0'}`,
                                                                    background: sel ? '#f0fdf4' : dis ? '#f8fafc' : 'white',
                                                                    color: sel ? T.green : dis ? '#94a3b8' : '#374151',
                                                                    fontSize: '0.85rem', fontWeight: 600, textAlign: 'left',
                                                                    cursor: dis ? 'not-allowed' : 'pointer',
                                                                    transition: 'all 0.2s', fontFamily: 'inherit',
                                                                }}>
                                                                    {sel ? '✅ ' : ''}{val.l}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                    {valuesError && (
                                                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>Please select exactly 3 values before submitting.</p>
                                                    )}
                                                </div>

                                                {/* How did you hear */}
                                                <div>
                                                    <label className={LABEL}>How did you hear about NBC? <span style={{ color: '#ef4444' }}>*</span></label>
                                                    <select name="source" required className={SELECT}>
                                                        <option value="">Select</option>
                                                        {['Friend or Family Member','Social Media (Instagram, Facebook, Twitter)','Social Media Influencer','School Announcement','Church or Mosque','WhatsApp Group','Radio/TV','Poster or Flyer','NBC Website','Other'].map(s => <option key={s}>{s}</option>)}
                                                    </select>
                                                </div>

                                                {/* Agreements */}
                                                <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
                                                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>NBC Participant Agreement</h4>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                                        {[
                                                            { name: 'agree_commitment', text: 'I commit to working on my project for the full 10-month period (March–December 2026)' },
                                                            { name: 'agree_values', text: 'I agree to study and apply the 8 National Builder values in my project and life' },
                                                            { name: 'agree_honesty', text: 'I promise to report honestly about my project progress — no exaggeration or false information' },
                                                            { name: 'agree_documentation', text: 'I agree to document my project with photos/videos and submit monthly progress reports' },
                                                            { name: 'agree_media', text: "I give NBC permission to share my project story, photos, and videos on social media and website" },
                                                            { name: 'agree_rules', text: "I have read NBC's rules and understand that breaking them may result in disqualification" },
                                                        ].map(a => (
                                                            <label key={a.name} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                                                                <input type="checkbox" name={a.name} required style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: T.green, flexShrink: 0 }} />
                                                                <span style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.5 }}>{a.text}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                    <div style={{ marginTop: '1rem', background: 'white', border: `2px solid ${T.green}`, borderRadius: '12px', padding: '1rem' }}>
                                                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                                                            <input type="checkbox" name="agree_final" required style={{ marginTop: '3px', width: '16px', height: '16px', accentColor: T.green, flexShrink: 0 }} />
                                                            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a', lineHeight: 1.5 }}>
                                                                I certify that all information provided is true and accurate. I understand that providing false information may lead to disqualification from NBC.
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Submit Button */}
                                                <button type="submit" disabled={isSubmitting} style={{
                                                    width: '100%', padding: '1.1rem',
                                                    background: isSubmitting ? '#d1d5db' : 'linear-gradient(135deg, #eab308, #f59e0b)',
                                                    color: '#14532d', fontWeight: 800, fontSize: '1.1rem',
                                                    borderRadius: '14px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                                    boxShadow: '0 8px 20px rgba(234,179,8,0.3)',
                                                    transition: 'transform 0.15s',
                                                    fontFamily: 'inherit',
                                                }}>
                                                    {isSubmitting ? <><Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> Submitting...</> : 'SUBMIT REGISTRATION ✓'}
                                                </button>
                                            </motion.div>
                                        )}

                                    </AnimatePresence>
                                </div>

                                {/* Nav Buttons */}
                                <div style={{
                                    display: 'flex', justifyContent: step > 1 ? 'space-between' : 'flex-end',
                                    padding: '0 2rem 2rem', gap: '1rem',
                                }}>
                                    {step > 1 && step < TOTAL_STEPS && (
                                        <button type="button" onClick={prevStep} style={{
                                            padding: '0.75rem 1.5rem', borderRadius: '12px',
                                            background: '#f1f5f9', color: '#64748b', fontWeight: 700,
                                            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                        }}>← Back</button>
                                    )}
                                    {step === TOTAL_STEPS && (
                                        <button type="button" onClick={prevStep} style={{
                                            padding: '0.75rem 1.5rem', borderRadius: '12px',
                                            background: '#f1f5f9', color: '#64748b', fontWeight: 700,
                                            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                        }}>← Back</button>
                                    )}
                                    {step < TOTAL_STEPS && (
                                        <button type="submit" style={{
                                            padding: '0.85rem 2rem', borderRadius: '12px',
                                            background: T.green, color: 'white', fontWeight: 800,
                                            border: 'none', cursor: 'pointer', fontSize: '1rem',
                                            boxShadow: `0 6px 16px ${T.green}40`,
                                            fontFamily: 'inherit',
                                        }}>Next Step →</button>
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
                                <a href="https://chat.whatsapp.com/LhdmEpKXoXgDgtEj73WVqz?mode=gi_t" target="_blank" rel="noopener" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '1rem 2.5rem', borderRadius: '999px', background: T.green,
                                    color: 'white', fontWeight: 700, textDecoration: 'none',
                                }}>
                                    <MessageCircle size={18} /> Join WhatsApp Community
                                </a>
                                <button onClick={() => { setSubmitted(false); setStep(1); setSelectedValues([]); setHasMentor(''); setTeamType('Solo'); setUserId(''); setRefLink(''); }} style={{
                                    color: '#94a3b8', fontSize: '0.875rem', fontWeight: 600,
                                    background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                                }}>Register Another Person</button>
                            </div>
                        </div>
                    )}
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
