import React, { useState } from 'react';
import { ChevronRight, Target, Users, Award, BookOpen, MessageCircle, Send, Home } from 'lucide-react';

export default function NVC({ onBack }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
    const [userId, setUserId] = useState('');

    const handleRegister = (e) => {
        e.preventDefault();
        const id = 'NB2025-' + (Math.floor(Math.random() * 10000) + 1000);
        setUserId(id);
        setRegistrationSubmitted(true);
    };

    return (
        <div className="bg-gray-50 font-sans text-gray-900">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-green-800 text-white shadow-lg z-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <span className="text-2xl">🎯</span>
                            <span className="font-bold text-xl">National Builders Corp 🇳🇬</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
                            <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
                            <a href="#how-it-works" className="hover:text-yellow-400 transition-colors">How It Works</a>
                            <a href="#prizes" className="hover:text-yellow-400 transition-colors">Prizes</a>
                            <a href="#values" className="hover:text-yellow-400 transition-colors">Values</a>
                            <a href="#resources" className="hover:text-yellow-400 transition-colors">Resources</a>
                            <a href="#register" className="hover:text-yellow-400 transition-colors font-bold">Register</a>
                            <button onClick={onBack} className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition-colors text-sm">
                                <Home size={14} /> KIN Home
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden pb-4 transition-all`}>
                        <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-yellow-400">Home</a>
                        <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-yellow-400">About</a>
                        <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-yellow-400">How It Works</a>
                        <a href="#prizes" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-yellow-400">Prizes</a>
                        <a href="#values" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-yellow-400">Values</a>
                        <a href="#resources" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-yellow-400">Resources</a>
                        <a href="#register" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-yellow-400 font-bold">Register</a>
                        <button onClick={onBack} className="block w-full text-left py-2 hover:text-yellow-400">Back to KIN</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="bg-gradient-to-br from-green-800 to-green-600 text-white py-20 px-4 mt-16">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
                        Build the Nigeria You Want to See
                    </h1>
                    <p className="text-xl md:text-2xl mb-6">
                        Join 1,000 young Nigerians solving real community problems
                    </p>
                    <div className="bg-yellow-400 text-green-800 inline-block px-8 py-4 rounded-lg text-2xl font-bold mb-8 animate-pulse">
                        7-10 Finalists Will Share ₦3,000,000!
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <a href="#register" className="bg-yellow-400 text-green-800 px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 transition-all transform hover:scale-105">
                            REGISTER NOW - It's FREE!
                        </a>
                        <a href="#how-it-works" className="bg-transparent border-2 border-white px-8 py-4 rounded-full text-xl font-bold hover:bg-white hover:text-green-800 transition-all">
                            Learn More
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="bg-white shadow-lg py-8 px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-800">1,000</div>
                        <div className="text-gray-600">Target Participants</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-800">₦3M</div>
                        <div className="text-gray-600">Total Prizes</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-800">7-10</div>
                        <div className="text-gray-600">Finalists</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-800">Dec 17</div>
                        <div className="text-gray-600">Grand Finale</div>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <section id="about" className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-green-800 text-center mb-8">
                    What is National Builders Corp?
                </h2>
                <p className="text-xl text-center mb-8">
                    NBC is a 10-month challenge where Nigerian youth (ages 7-17) solve REAL problems in their
                    communities using universal values and resourcefulness. We don't give you money during the
                    challenge - we give you training, mentorship, and the chance to win BIG at the Grand Finale!
                </p>
                <div className="bg-green-50 border-l-4 border-green-800 p-6 my-8">
                    <p className="text-2xl font-bold text-green-800 text-center italic">
                        "You don't need money to be a nation-builder. You need values, creativity, and hustle."
                    </p>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="bg-gray-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-green-800 text-center mb-4">How It Works</h2>
                    <p className="text-center text-xl text-gray-600 mb-12">6 Simple Steps from Registration to Grand Finale</p>

                    <div className="space-y-8">
                        {[
                            { step: 1, title: 'REGISTER (March)', desc: 'Fill our super-simple form on your phone (10 minutes). No essays, no documents needed. Just your name, age, and project idea.' },
                            { step: 2, title: 'LEARN VALUES (April)', desc: 'Download free Values Workbook. Learn the 8 habits of National Builders. Study at your own pace. Join WhatsApp group for support.' },
                            { step: 3, title: 'START YOUR PROJECT (May)', desc: "Don't wait for money - use what you have! Borrow, build, ask for donations. Get creative with limited resources. This is the test!" },
                            { step: 4, title: 'WORK & DOCUMENT (June-October)', desc: 'Spend 5 months solving your problem. Take photos and videos. Count your impact. Check in monthly via WhatsApp.' },
                            { step: 5, title: 'SUBMIT YOUR STORY (October 31)', desc: 'Write simple report (15 pages max). Submit photos. Record 2-minute video. Judges review all submissions.' },
                            { step: 6, title: 'GRAND FINALE (December 17)', desc: 'Judges shortlist 7-10 FINALISTS. Come to Abuja (free travel). Present on stage. ₦3 MILLION awarded!' }
                        ].map((item) => (
                            <div key={item.step} className="bg-white rounded-lg shadow-lg p-6 flex gap-6 hover:shadow-xl transition-shadow">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-green-800 text-white rounded-full flex items-center justify-center text-2xl font-bold">{item.step}</div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-green-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-700">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prizes Section */}
            <section id="prizes" className="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-green-800 text-center mb-4">The Prizes</h2>
                <p className="text-center text-xl text-gray-600 mb-12">
                    All ₦3,000,000 awarded at Grand Finale to 7-10 exceptional projects
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-300 rounded-lg shadow-lg p-6 text-center transform scale-105">
                        <div className="text-6xl mb-4">🥇</div>
                        <div className="text-3xl font-bold mb-2 text-green-800">₦1,000,000</div>
                        <div className="text-xl font-bold mb-4 text-green-900">GRAND CHAMPION</div>
                        <p className="text-green-900">Best project overall + Trophy + Media tour + Face of NBC 2026</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <div className="text-6xl mb-4">🥈</div>
                        <div className="text-3xl font-bold mb-2 text-green-800">₦600,000</div>
                        <div className="text-xl font-bold mb-4 text-gray-700">1ST RUNNER-UP</div>
                        <p className="text-gray-600">Second place + Trophy + Certificate</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <div className="text-6xl mb-4">🥉</div>
                        <div className="text-3xl font-bold mb-2 text-green-800">₦400,000</div>
                        <div className="text-xl font-bold mb-4 text-gray-700">2ND RUNNER-UP</div>
                        <p className="text-gray-600">Third place + Trophy + Certificate</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <div className="text-6xl mb-4">🏆</div>
                        <div className="text-3xl font-bold mb-2 text-green-800">₦200,000</div>
                        <div className="text-xl font-bold mb-4 text-gray-700">SPECIAL AWARDS</div>
                        <p className="text-gray-600">4-7 more finalists receive ₦200K each: Values Exemplar, Greatest Impact, Most Innovative, People's Choice, and more!</p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section id="values" className="bg-gray-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-green-800 text-center mb-4">
                        The 8 National Builder Values
                    </h2>
                    <p className="text-center text-xl text-gray-600 mb-12">
                        These universal values will guide your project and your life
                    </p>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '✅', title: 'Integrity & Truth', quote: '"I go do am well, no shortcut"', desc: 'Always tell the truth. Do what\'s right even when no one is watching.' },
                            { icon: '💪', title: 'Discipline & Diligence', quote: '"I no dey give up"', desc: 'Work hard consistently. Show up every day. Finish what you start.' },
                            { icon: '🧠', title: 'Wisdom & Discernment', quote: '"I sabi think am well"', desc: 'Think carefully before acting. Seek advice. Learn from mistakes.' },
                            { icon: '❤️', title: 'Service & Compassion', quote: '"My brother\'s problem na my problem"', desc: 'Care about others. Help without expecting anything back.' },
                            { icon: '⚖️', title: 'Justice & Righteousness', quote: '"E must fair for everybody"', desc: 'Stand for what\'s right. Treat everyone equally. Defend the vulnerable.' },
                            { icon: '🔥', title: 'Perseverance & Resilience', quote: '"Wahala no fit stop me"', desc: 'Bounce back from failure. Keep going when it\'s hard.' },
                            { icon: '🙏', title: 'Humility & Learning', quote: '"I fit learn from anybody"', desc: 'Stay teachable. Admit mistakes. Work well with others.' },
                            { icon: '⭐', title: 'Excellence & Craftsmanship', quote: '"If I wan do am, make I do am correct"', desc: 'Quality work. Attention to detail. Always improving.' }
                        ].map((v) => (
                            <div key={v.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer">
                                <div className="text-5xl text-center mb-4">{v.icon}</div>
                                <h3 className="text-xl font-bold text-green-800 text-center mb-2">{v.title}</h3>
                                <p className="text-center text-gray-600 italic text-sm mb-4">{v.quote}</p>
                                <p className="text-gray-700 text-sm text-center">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Resources Section */}
            <section id="resources" class="max-w-6xl mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-green-800 text-center mb-4">Free Resources</h2>
                <p className="text-center text-xl text-gray-600 mb-12">Everything you need to succeed - download for free!</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: 'Values Training Workbook', desc: '40-page guide teaching all 8 values with reflection questions, examples, and exercises.', meta: '40 pages' },
                        { title: 'Project Planning Guide', desc: '20-page simple planning tool to help you design and organize your project.', meta: '20 pages' },
                        { title: 'Monthly Progress Tracker', desc: '10-page form for quick monthly check-ins to track your impact.', meta: '10 pages' },
                        { title: 'Final Impact Report Template', desc: '15-page fill-in-the-blank template for your October 31 submission.', meta: '15 pages' },
                        { title: 'Mentor Guide', desc: '25-page handbook for adults supporting youth. How to guide without taking over.', meta: '25 pages' },
                        { title: 'Video Tutorial', desc: 'Learn how to use your phone to document your project professionally.', meta: 'Video' }
                    ].map((r) => (
                        <div key={r.title} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <h3 className="text-xl font-bold text-green-800 mb-3">📖 {r.title}</h3>
                            <p className="text-gray-700 mb-4">{r.desc}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">{r.meta}</span>
                                <button className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">Download</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="bg-yellow-400 text-green-800 px-8 py-4 rounded-full text-xl font-bold hover:bg-yellow-300 transition-all">
                        DOWNLOAD ALL RESOURCES (ZIP)
                    </button>
                </div>
            </section>

            {/* Registration Section */}
            <section id="register" className="bg-gray-50 py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-green-800 text-center mb-4">Register Now - It's FREE!</h2>
                    <p className="text-center text-xl text-gray-600 mb-8">
                        Simple 3-step form. Works on any phone. Takes only 10 minutes.
                    </p>

                    <div className="bg-white rounded-lg shadow-2xl p-8">
                        {!registrationSubmitted ? (
                            <form onSubmit={handleRegister} className="space-y-6">
                                <h3 className="text-2xl font-bold text-green-800 text-center mb-6">STEP 1: Basic Info</h3>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Full Name *</label>
                                    <input type="text" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none" placeholder="Enter your full name" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Age * (7-17 years)</label>
                                    <input type="number" required min="7" max="17" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none" placeholder="Your age" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Phone Number *</label>
                                    <input type="tel" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none" placeholder="08012345678" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">State *</label>
                                    <select required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none">
                                        <option value="">Select your state</option>
                                        <option value="lagos">Lagos</option>
                                        <option value="abuja">FCT Abuja</option>
                                        <option value="kano">Kano</option>
                                        {/* Simplified list for brevity */}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">Problem Statement *</label>
                                    <textarea required rows="4" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none" placeholder="Describe the problem..."></textarea>
                                </div>
                                <div className="bg-gray-100 p-4 rounded-lg">
                                    <label className="flex items-start">
                                        <input type="checkbox" required className="mr-3 mt-1" />
                                        <span className="text-sm">I agree to work on my project, learn the 8 values, and report honestly.</span>
                                    </label>
                                </div>
                                <button type="submit" className="w-full bg-yellow-400 text-green-800 px-6 py-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors text-xl">
                                    SUBMIT REGISTRATION ✓
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-6xl mb-4">🎉</div>
                                <h3 className="text-3xl font-bold text-green-800 mb-4">Welcome, National Builder!</h3>
                                <p className="text-xl mb-4">Your registration is complete!</p>
                                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                                    <p className="font-bold">Your ID: <span className="text-green-800">{userId}</span></p>
                                </div>
                                <p className="text-lg">Check your phone for next steps!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-800 text-white py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">National Builders Corp</h3>
                            <p>Building a New Nigeria Over 7 Decades</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Quick Links</h4>
                            <div className="space-y-2">
                                <a href="#about" className="block hover:text-yellow-400">About</a>
                                <a href="#register" className="block hover:text-yellow-400">Register</a>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Contact Us</h4>
                            <p>Email: info@nationalbuilders.ng</p>
                        </div>
                    </div>
                    <div className="border-t border-green-700 pt-8 text-center">
                        <p>&copy; 2025 National Builders Corp. All Rights Reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
