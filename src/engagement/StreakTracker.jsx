import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Leaf, 
  Calendar, 
  User, 
  ChevronRight, 
  PartyPopper, 
  Clock, 
  Award,
  RefreshCcw,
  TreeDeciduous,
  Sprout
} from 'lucide-react';

// Design Tokens
const T = {
  green: "#16613E",
  greenD: "#0D3D26",
  gold: "#C4882C",
  goldL: "#E8B954",
  cream: "#FDF7EC",
  coral: "#D94F30"
};

const MS_PER_HOUR = 3600000;
const MS_PER_DAY = 24 * MS_PER_HOUR;
const GRACE_PERIOD_MS = 12 * MS_PER_HOUR;
const RESET_THRESHOLD_MS = MS_PER_DAY + GRACE_PERIOD_MS; // 36 hours

export default function StreakTracker() {
  const [userData, setUserData] = useState(null);
  const [streakData, setStreakData] = useState({
    count: 0,
    lastCheckIn: 0,
    totalCheckIns: 0,
    history: []
  });
  const [loading, setLoading] = useState(true);
  const [showCelebration, setShowCelebration] = useState(false);

  // Form State
  const [form, setForm] = useState({ firstName: '', lastName: '', dob: '' });

  useEffect(() => {
    const savedUser = localStorage.getItem('kin_user_data');
    const savedStreak = localStorage.getItem('kin_streak_data');

    if (savedUser) setUserData(JSON.parse(savedUser));
    if (savedStreak) {
      const parsed = JSON.parse(savedStreak);
      // Check for reset
      const now = Date.now();
      if (parsed.lastCheckIn > 0 && (now - parsed.lastCheckIn > RESET_THRESHOLD_MS)) {
        // Reset streak but keep history/total
        setStreakData({ ...parsed, count: 0 });
      } else {
        setStreakData(parsed);
      }
    }
    setLoading(false);
  }, []);

  const saveUserData = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.dob) return;
    const data = { ...form };
    localStorage.setItem('kin_user_data', JSON.stringify(data));
    setUserData(data);
  };

  const handleCheckIn = () => {
    const now = Date.now();
    const newStreak = {
      count: (streakData.count || 0) + 1,
      lastCheckIn: now,
      totalCheckIns: (streakData.totalCheckIns || 0) + 1,
      history: [...(streakData.history || []), now]
    };

    localStorage.setItem('kin_streak_data', JSON.stringify(newStreak));
    setStreakData(newStreak);
    
    // Celebration triggers
    if (newStreak.count === 7 || newStreak.count === 14 || newStreak.count === 30 || newStreak.count === 1) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 4000);
    }
  };

  const canCheckIn = useMemo(() => {
    if (!streakData.lastCheckIn) return true;
    const diff = Date.now() - streakData.lastCheckIn;
    return diff >= MS_PER_DAY;
  }, [streakData.lastCheckIn]);

  const getTimeToNext = () => {
    if (!streakData.lastCheckIn) return null;
    const nextPossible = streakData.lastCheckIn + MS_PER_DAY;
    const diff = nextPossible - Date.now();
    if (diff <= 0) return null;
    
    const hours = Math.floor(diff / MS_PER_HOUR);
    const mins = Math.floor((diff % MS_PER_HOUR) / 60000);
    return `${hours}h ${mins}m`;
  };

  if (loading) return null;

  if (!userData) {
    return (
      <div className="max-w-md mx-auto p-8 bg-white rounded-3xl shadow-xl border border-gray-100 mt-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#16613E] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#E8B954] font-serif italic text-2xl font-black">g</div>
          <h2 className="text-2xl font-bold text-[#0D3D26] font-['Plus_Jakarta_Sans']">Welcome, Little goD!</h2>
          <p className="text-gray-500 mt-2 text-sm">Let's start your Nation Builder journey.</p>
        </div>

        <form onSubmit={saveUserData} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">First Name</label>
            <input 
              required
              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:border-[#C4882C] transition-colors"
              placeholder="e.g. David"
              value={form.firstName}
              onChange={e => setForm({...form, firstName: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Last Name</label>
            <input 
              required
              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:border-[#C4882C] transition-colors"
              placeholder="e.g. Okoro"
              value={form.lastName}
              onChange={e => setForm({...form, lastName: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1">Date of Birth</label>
            <input 
              required
              type="date"
              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:border-[#C4882C] transition-colors"
              value={form.dob}
              onChange={e => setForm({...form, dob: e.target.value})}
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-[#16613E] text-[#FDF7EC] py-4 rounded-xl font-bold text-lg hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-[#16613E]30"
          >
            Start My Streak →
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-serif italic font-black text-[#0D3D26]">
            Welcome back, <span className="text-[#C4882C]">goD {userData.firstName}</span>!
          </h2>
          <p className="text-gray-500 font-medium">Character is our highest flag. Keep building!</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Streak</div>
            <div className="text-2xl font-black text-[#16613E]">{streakData.count} Days</div>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Build</div>
            <div className="text-2xl font-black text-[#C4882C]">{streakData.totalCheckIns}</div>
          </div>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="relative grid md:grid-cols-2 gap-8 items-center bg-[#FDF7EC] p-8 md:p-12 rounded-[40px] border-2 border-[#E8B954]30 overflow-hidden shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4882C] opacity-[0.03] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#16613E] opacity-[0.03] blur-3xl pointer-events-none" />

        {/* Tree Visualization */}
        <div className="flex flex-col items-center justify-center min-h-[300px] relative">
          <AnimatePresence mode="wait">
            <TreeIcon count={streakData.count} key={streakData.count} />
          </AnimatePresence>
          
          <div className="mt-8 text-center">
            <span className="inline-block px-4 py-1.5 bg-[#16613E]10 text-[#16613E] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Level: {getStageName(streakData.count)}
            </span>
            <p className="text-[#0D3D26] font-medium text-sm">
              {getStageQuote(streakData.count)}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-6">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white">
            <h3 className="text-lg font-bold text-[#0D3D26] mb-4 flex items-center gap-2">
              <Calendar className="text-[#C4882C]" size={20} /> Daily KIND Check-In
            </h3>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              Did you complete your KIND devotional tonight? Check in to see your tree grow!
            </p>
            
            <button 
              disabled={!canCheckIn}
              onClick={handleCheckIn}
              className={`w-full py-5 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-lg ${
                canCheckIn 
                ? 'bg-[#C4882C] text-white hover:scale-[1.02] active:scale-95 shadow-[#C4882C]40' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {canCheckIn ? (
                <>
                  <Star fill="currentColor" size={20} />
                  I COMPLETED KIND TODAY!
                </>
              ) : (
                <>
                  <Clock size={20} />
                  NEXT BUILD IN: {getTimeToNext()}
                </>
              )}
            </button>
            {!canCheckIn && (
              <p className="text-[10px] text-center text-gray-400 mt-3 font-bold uppercase tracking-widest">
                Check-in resets every 24 hours.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/40 p-4 rounded-2xl border border-white text-center">
              <Sprout size={20} className="mx-auto mb-2 text-[#16613E]" />
              <div className="text-[10px] font-bold text-gray-400 uppercase">Growth Plan</div>
              <div className="text-xs font-bold text-[#0D3D26]">12h Grace Active</div>
            </div>
            <div className="bg-white/40 p-4 rounded-2xl border border-white text-center">
              <Award size={20} className="mx-auto mb-2 text-[#C4882C]" />
              <div className="text-[10px] font-bold text-gray-400 uppercase">Next Goal</div>
              <div className="text-xs font-bold text-[#0D3D26]">{getNextMilestone(streakData.count)} Days</div>
            </div>
          </div>
        </div>
      </div>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className="bg-white p-10 rounded-[40px] shadow-2xl border-4 border-[#C4882C] text-center"
            >
              <PartyPopper size={80} className="mx-auto text-[#C4882C] mb-4" />
              <h2 className="text-4xl font-serif italic font-black text-[#16613E] mb-2">WELL DONE!</h2>
              <p className="text-xl font-bold text-[#0D3D26]">You just built another day of character!</p>
              <div className="mt-6 flex justify-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 45, 0]
                    }}
                    transition={{ delay: i * 0.1, repeat: Infinity }}
                  >
                    <Star fill="#C4882C" color="#C4882C" size={24} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper Components & Logic
function TreeIcon({ count }) {
  // SVG Tree based on growth
  const scale = 1 + Math.min(count * 0.05, 1.5);
  
  if (count <= 2) { // SEED
    return (
      <motion.div 
        initial={{ scale: 0 }} 
        animate={{ scale: 1 }} 
        className="w-24 h-24 bg-[#5C4033] rounded-full flex items-center justify-center relative shadow-inner"
      >
        <div className="w-12 h-16 bg-[#3D2B1F] rounded-t-full absolute bottom-4 rotate-12" />
        <motion.div 
          animate={{ rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute -top-2 text-2xl"
        >🌱</motion.div>
      </motion.div>
    );
  }
  
  if (count <= 6) { // SPROUT
    return (
      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        className="relative"
      >
        <Sprout size={120} className="text-[#16613E]" strokeWidth={1.5} />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute -top-4 -right-4"
        >
          <Star fill={T.goldL} color={T.goldL} size={24} />
        </motion.div>
      </motion.div>
    );
  }

  if (count <= 13) { // YOUNG BUILDER
    return (
      <motion.div 
        initial={{ scale: 0.8 }} 
        animate={{ scale: 1 }}
        className="relative"
      >
        <TreeDeciduous size={160} className="text-[#2C4A35]" strokeWidth={1.5} />
        <div className="flex gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Leaf className="text-[#E8B954]" size={32} />
          <Leaf className="text-[#E8B954]" size={32} />
        </div>
      </motion.div>
    );
  }

  // MIGHTY TREE
  return (
    <motion.div 
      initial={{ scale: 0.5, rotate: -10 }} 
      animate={{ scale: 1, rotate: 0 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-[#E8B954] blur-[100px] opacity-20" />
      <TreeDeciduous size={220} className="text-[#16613E] relative z-10" strokeWidth={1.5} />
      <motion.div 
        animate={{ 
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1.1, 0.8]
        }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <Star fill="white" color="white" size={40} className="blur-[1px]" />
      </motion.div>
      {/* Hanging milestones */}
      {count >= 30 && (
        <div className="absolute top-1/4 left-0 right-0 flex justify-between px-8 z-30">
          <Award className="text-[#E8B954] drop-shadow-lg" size={32} />
          <Award className="text-[#E8B954] drop-shadow-lg" size={32} />
        </div>
      )}
    </motion.div>
  );
}

function getStageName(count) {
  if (count <= 2) return "Faithful Seed";
  if (count <= 6) return "Rising Sprout";
  if (count <= 13) return "Steady Builder";
  if (count <= 29) return "Nation Pillar";
  return "Mighty goD Tree";
}

function getStageQuote(count) {
  if (count === 0) return "Plant your first seed today!";
  if (count <= 2) return "A humble start to a divine purpose.";
  if (count <= 6) return "Growth is silent but certain. Keep listening!";
  if (count <= 13) return "You are becoming a pillar of character.";
  if (count <= 29) return "Look how much you've built, goD!";
  return "You are a Master Builder. The Nation is watching!";
}

function getNextMilestone(count) {
  if (count < 7) return 7;
  if (count < 14) return 14;
  if (count < 30) return 30;
  return count + 7;
}
