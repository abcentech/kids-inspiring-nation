import { useState } from "react";
import { motion } from "framer-motion";
import { Flame, Check, Trophy } from "lucide-react";
import { T } from "../siteConfig.js";
import { C } from "./nbcBrand.js";
import { readStreak, checkInThisWeek, TERM_WEEKS } from "./nbcStreak.js";

// A weekly check-in habit loop. 13 weeks = one school term. Two shapes:
//   <WeeklyStreak dark />            full card (landing / student hub)
//   <WeeklyStreak dark compact />    inline chip (course header)

export default function WeeklyStreak({ dark, compact }) {
  const [st, setSt] = useState(readStreak);
  const [justChecked, setJustChecked] = useState(false);
  const s = dark
    ? { surf: T.srfD, brd: T.brdD, txt: T.d1, sub: T.d2 }
    : { surf: "#FFFFFF", brd: "rgba(11,42,27,.08)", txt: T.green, sub: T.greenM };

  const check = () => {
    if (st.checkedThisWeek) return;
    setSt(checkInThisWeek());
    setJustChecked(true);
    setTimeout(() => setJustChecked(false), 1600);
  };

  if (compact) {
    return (
      <button onClick={check} disabled={st.checkedThisWeek}
        style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 999, cursor: st.checkedThisWeek ? "default" : "pointer",
          background: st.checkedThisWeek ? "rgba(45,158,83,.16)" : "rgba(197,160,55,.16)", color: st.checkedThisWeek ? C.ok : C.goldD, fontWeight: 800, fontSize: ".8rem", border: "none" }}>
        {st.checkedThisWeek ? <Check size={15} /> : <Flame size={15} />}
        {st.streak > 0 ? `${st.streak}-week streak` : "Start your streak"}
        {!st.checkedThisWeek && <span style={{ opacity: .7, fontWeight: 700 }}>· check in</span>}
      </button>
    );
  }

  return (
    <div style={{ background: s.surf, border: `1px solid ${s.brd}`, borderRadius: 22, padding: "1.6rem", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.goldD, fontWeight: 800, fontSize: ".74rem", letterSpacing: ".12em", textTransform: "uppercase" }}>
            <Flame size={15} /> Weekly Builder Streak
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: ".3rem" }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontWeight: 900, fontSize: "2.4rem", color: s.txt, lineHeight: 1 }}>{st.streak}</span>
            <span style={{ color: s.sub, fontWeight: 700 }}>week{st.streak === 1 ? "" : "s"} in a row</span>
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: ".8rem", color: s.sub }}>
          <div>Week <strong style={{ color: s.txt }}>{Math.max(st.weekInTerm, st.checkedThisWeek || st.streak ? st.weekInTerm : 0) || 0}</strong> of {TERM_WEEKS} this term</div>
          {st.termsCompleted > 0 && <div style={{ color: C.ok, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4, marginTop: 2 }}><Trophy size={12} /> {st.termsCompleted} term{st.termsCompleted === 1 ? "" : "s"} done</div>}
          {st.best > st.streak && <div style={{ marginTop: 2 }}>Best: {st.best} weeks</div>}
        </div>
      </div>

      {/* 13-week term ring */}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", margin: "1.25rem 0" }}>
        {Array.from({ length: TERM_WEEKS }).map((_, i) => {
          const filled = i < st.weekInTerm;
          return (
            <div key={i} title={`Week ${i + 1}`} style={{ flex: "1 1 16px", minWidth: 16, height: 12, borderRadius: 4, background: filled ? `linear-gradient(90deg,${C.goldD},${C.gold})` : s.brd, transition: "background .3s" }} />
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
        <button onClick={check} disabled={st.checkedThisWeek}
          style={{ padding: ".8rem 1.5rem", borderRadius: 999, border: "none", fontWeight: 800, fontSize: ".9rem", cursor: st.checkedThisWeek ? "default" : "pointer",
            background: st.checkedThisWeek ? "rgba(45,158,83,.15)" : C.green, color: st.checkedThisWeek ? C.ok : "#fff", display: "inline-flex", alignItems: "center", gap: 8 }}>
          {st.checkedThisWeek ? <><Check size={17} /> Checked in this week</> : <><Flame size={17} /> Check in for this week</>}
        </button>
        <span style={{ fontSize: ".85rem", color: s.sub, lineHeight: 1.4 }}>
          {st.checkedThisWeek ? "See you next week — keep the chain alive." : "One check-in a week keeps your streak alive. 13 weeks = a full term."}
        </span>
      </div>

      {justChecked && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          style={{ position: "absolute", top: 12, right: 14, background: C.ok, color: "#fff", padding: "4px 12px", borderRadius: 999, fontWeight: 800, fontSize: ".78rem" }}>
          +1 week 🔥
        </motion.div>
      )}
    </div>
  );
}
