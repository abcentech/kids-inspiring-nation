import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RotateCw, Lightbulb, Trophy, Target } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts";
import { C } from "../nbcBrand.js";

// A library of interactive lesson blocks for the Nation Builders Course.
// Every block calls onSolved() once the learner has genuinely engaged with it,
// so a lesson can require interaction before it can be marked complete.
// Blocks are mobile-first: tap targets, no drag, no heavy 3D.

const card = (s, active, ok) => ({
  background: s.bg,
  border: `1.5px solid ${ok ? C.ok : active ? C.gold : s.brd}`,
  borderRadius: 14,
  padding: ".8rem 1rem",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: ".92rem",
  color: s.txt,
  textAlign: "left",
  width: "100%",
  transition: "all .18s",
});

const shell = (s) => ({
  padding: "1.1rem 1.2rem",
  borderRadius: 16,
  background: `${C.gold}0d`,
  border: `1px dashed ${C.gold}44`,
});

const label = { fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".7rem", fontWeight: 800, letterSpacing: ".12em", textTransform: "uppercase", color: C.gold, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: ".6rem" };

/* ── Multi-question quiz ─────────────────────────────────────────── */
function QuizBlock({ block, s, onSolved }) {
  const [answers, setAnswers] = useState({});
  const total = block.questions.length;
  const correctCount = block.questions.filter((q, qi) => answers[qi] === q.answer).length;
  const allRight = correctCount === total;

  const pick = (qi, oi) => {
    const nextA = { ...answers, [qi]: oi };
    setAnswers(nextA);
    if (block.questions.every((q, i) => nextA[i] === q.answer)) onSolved?.();
  };

  return (
    <div style={shell(s)}>
      <div style={label}><Target size={13} /> Quick check · {correctCount}/{total}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {block.questions.map((q, qi) => (
          <div key={qi}>
            <p style={{ fontWeight: 800, margin: "0 0 .55rem", color: s.txt }}>{q.q}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: ".45rem" }}>
              {q.options.map((opt, oi) => {
                const picked = answers[qi] === oi;
                const showRight = picked && oi === q.answer;
                const showWrong = picked && oi !== q.answer;
                return (
                  <button key={oi} onClick={() => pick(qi, oi)}
                    style={{ ...card(s, picked), borderColor: showRight ? C.ok : showWrong ? C.coral : picked ? C.gold : s.brd, background: showRight ? `${C.ok}14` : showWrong ? `${C.coral}12` : s.bg }}>
                    {opt} {showRight && "✓"}{showWrong && "— try again"}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {allRight && <Solved text="Nailed it." />}
    </div>
  );
}

/* ── Estimate slider (guess a number, reveal the truth) ──────────── */
function SliderBlock({ block, s, onSolved }) {
  const [val, setVal] = useState(Math.round((block.min + block.max) / 2));
  const [revealed, setRevealed] = useState(false);
  const near = Math.abs(val - block.answer) <= (block.tolerance ?? (block.max - block.min) * 0.1);

  return (
    <div style={shell(s)}>
      <div style={label}><Lightbulb size={13} /> Your estimate</div>
      <p style={{ fontWeight: 800, margin: "0 0 .9rem", color: s.txt }}>{block.prompt}</p>
      <div style={{ fontSize: "2rem", fontWeight: 900, fontFamily: "'Playfair Display',serif", color: C.goldD, textAlign: "center" }}>
        {block.prefix}{val.toLocaleString()}{block.unit}
      </div>
      <input type="range" min={block.min} max={block.max} step={block.step ?? 1} value={val}
        onChange={(e) => setVal(Number(e.target.value))}
        style={{ width: "100%", accentColor: C.gold, margin: ".6rem 0 1rem" }} />
      {!revealed ? (
        <button onClick={() => { setRevealed(true); onSolved?.(); }} style={btn()}>Reveal the answer</button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ padding: "1rem", borderRadius: 12, background: near ? `${C.ok}14` : `${C.gold}14`, border: `1px solid ${near ? C.ok : C.gold}44` }}>
          <p style={{ margin: 0, color: s.txt, lineHeight: 1.55 }}>
            <strong>{block.prefix}{block.answer.toLocaleString()}{block.unit}.</strong> {block.reveal}
          </p>
          {near && <p style={{ margin: ".4rem 0 0", color: C.ok, fontWeight: 800, fontSize: ".85rem" }}>Great instinct — you were close!</p>}
        </motion.div>
      )}
    </div>
  );
}

/* ── Tap-to-order (put steps in sequence) ────────────────────────── */
function OrderBlock({ block, s, onSolved }) {
  // block.items is already in the CORRECT order; we shuffle a display copy.
  const shuffled = useMemo(() => {
    const arr = block.items.map((t, i) => ({ t, correct: i }));
    for (let i = arr.length - 1; i > 0; i--) { const j = (i * 7 + 3) % (i + 1); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    return arr;
  }, [block]);
  const [seq, setSeq] = useState([]); // indices into shuffled, in tapped order
  const done = seq.length === shuffled.length;
  const correct = done && seq.every((si, pos) => shuffled[si].correct === pos);

  const tap = (si) => {
    if (seq.includes(si)) { setSeq(seq.filter((x) => x !== si)); return; }
    const nextSeq = [...seq, si];
    setSeq(nextSeq);
    if (nextSeq.length === shuffled.length && nextSeq.every((s2, pos) => shuffled[s2].correct === pos)) onSolved?.();
  };
  const reset = () => setSeq([]);

  return (
    <div style={shell(s)}>
      <div style={label}><Target size={13} /> Put these in order</div>
      <p style={{ fontWeight: 800, margin: "0 0 .8rem", color: s.txt }}>{block.prompt}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        {shuffled.map((item, si) => {
          const order = seq.indexOf(si);
          const placed = order !== -1;
          const wrong = done && !correct && placed && item.correct !== order;
          return (
            <button key={si} onClick={() => tap(si)}
              style={{ ...card(s, placed), borderColor: wrong ? C.coral : placed ? C.gold : s.brd, display: "flex", alignItems: "center", gap: ".7rem" }}>
              <span style={{ width: 24, height: 24, flexShrink: 0, borderRadius: 999, display: "grid", placeItems: "center", background: placed ? C.gold : s.brd, color: placed ? C.greenD : s.sub, fontWeight: 800, fontSize: ".8rem" }}>
                {placed ? order + 1 : "•"}
              </span>
              {item.t}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: ".6rem", marginTop: ".8rem", alignItems: "center" }}>
        {(done && !correct) && <button onClick={reset} style={{ ...btn(true), display: "inline-flex", alignItems: "center", gap: 6 }}><RotateCw size={14} /> Try again</button>}
        {correct && <Solved inline text="Perfect order." />}
      </div>
    </div>
  );
}

/* ── Flip cards (tap to reveal) ──────────────────────────────────── */
function FlipBlock({ block, s, onSolved }) {
  const [flipped, setFlipped] = useState({});
  const flip = (i) => {
    const n = { ...flipped, [i]: !flipped[i] };
    setFlipped(n);
    if (block.cards.every((_, ci) => n[ci])) onSolved?.();
  };
  return (
    <div style={shell(s)}>
      <div style={label}><RotateCw size={13} /> Tap each card</div>
      {block.prompt && <p style={{ fontWeight: 800, margin: "0 0 .8rem", color: s.txt }}>{block.prompt}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: ".7rem" }}>
        {block.cards.map((cardData, i) => {
          const isF = !!flipped[i];
          return (
            <button key={i} onClick={() => flip(i)} style={{ perspective: 700, background: "none", border: "none", padding: 0, cursor: "pointer", minHeight: 118 }}>
              <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 118, transformStyle: "preserve-3d", transition: "transform .5s", transform: isF ? "rotateY(180deg)" : "none" }}>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", borderRadius: 14, background: C.greenD, color: C.cream, display: "grid", placeItems: "center", padding: ".9rem", fontWeight: 800, textAlign: "center" }}>
                  {cardData.front}
                </div>
                <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: 14, background: `${C.gold}1a`, border: `1px solid ${C.gold}55`, color: s.txt, display: "grid", placeItems: "center", padding: ".9rem", fontSize: ".85rem", lineHeight: 1.4, textAlign: "center" }}>
                  {cardData.back}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Scenario (choose a path, get feedback) ──────────────────────── */
function ScenarioBlock({ block, s, onSolved }) {
  const [picked, setPicked] = useState(null);
  const choose = (i) => { setPicked(i); if (block.options[i].good) onSolved?.(); else onSolved?.(); };
  return (
    <div style={shell(s)}>
      <div style={label}><Lightbulb size={13} /> What would you do?</div>
      <p style={{ fontWeight: 800, margin: "0 0 .8rem", color: s.txt }}>{block.prompt}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        {block.options.map((opt, i) => {
          const on = picked === i;
          return (
            <button key={i} onClick={() => choose(i)}
              style={{ ...card(s, on), borderColor: on ? (opt.good ? C.ok : C.gold) : s.brd, background: on ? (opt.good ? `${C.ok}12` : `${C.gold}12`) : s.bg }}>
              {opt.label}
            </button>
          );
        })}
      </div>
      <AnimatePresence>
        {picked !== null && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden" }}>
            <p style={{ margin: ".9rem 0 0", padding: ".8rem 1rem", borderRadius: 12, background: block.options[picked].good ? `${C.ok}14` : `${C.coral}10`, color: s.txt, lineHeight: 1.55, fontSize: ".92rem" }}>
              {block.options[picked].good ? "✅ " : "🤔 "}{block.options[picked].feedback}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Sort into buckets ───────────────────────────────────────────── */
function SortBlock({ block, s, onSolved }) {
  const [assign, setAssign] = useState({}); // itemIdx -> bucketIdx
  const allDone = block.items.every((_, i) => assign[i] !== undefined);
  const allRight = allDone && block.items.every((it, i) => assign[i] === it.bucket);
  const cycle = (i) => {
    const cur = assign[i];
    const nextB = cur === undefined ? 0 : (cur + 1) % (block.buckets.length + 1);
    const n = { ...assign };
    if (nextB === block.buckets.length) delete n[i]; else n[i] = nextB;
    setAssign(n);
    if (block.items.every((it, k) => n[k] === it.bucket)) onSolved?.();
  };
  return (
    <div style={shell(s)}>
      <div style={label}><Target size={13} /> Tap to sort</div>
      <p style={{ fontWeight: 800, margin: "0 0 .3rem", color: s.txt }}>{block.prompt}</p>
      <p style={{ margin: "0 0 .8rem", fontSize: ".8rem", color: s.sub }}>Tap an item to cycle it through: {block.buckets.join(" · ")}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
        {block.items.map((it, i) => {
          const b = assign[i];
          const set = b !== undefined;
          const wrong = allDone && !allRight && set && b !== it.bucket;
          return (
            <button key={i} onClick={() => cycle(i)}
              style={{ ...card(s, set), borderColor: wrong ? C.coral : set ? C.gold : s.brd, display: "flex", justifyContent: "space-between", alignItems: "center", gap: ".6rem" }}>
              <span>{it.text}</span>
              <span style={{ flexShrink: 0, fontSize: ".72rem", fontWeight: 800, padding: "3px 9px", borderRadius: 999, background: set ? C.gold : s.brd, color: set ? C.greenD : s.sub }}>
                {set ? block.buckets[b] : "tap"}
              </span>
            </button>
          );
        })}
      </div>
      {allRight && <Solved text="Sorted perfectly." />}
    </div>
  );
}

/* ── Chart (data viz) ────────────────────────────────────────────── */
function ChartBlock({ block, s }) {
  const palette = [C.gold, C.green, C.goldD, C.greenM, C.ok, C.goldL];
  return (
    <div style={{ ...shell(s), background: s.surf, border: `1px solid ${s.brd}`, borderStyle: "solid" }}>
      {block.title && <div style={label}><Trophy size={13} /> {block.title}</div>}
      <div style={{ width: "100%", height: block.height ?? 240 }}>
        <ResponsiveContainer>
          {block.kind === "radar" ? (
            <RadarChart data={block.data} outerRadius="72%">
              <PolarGrid stroke={s.brd} />
              <PolarAngleAxis dataKey="name" tick={{ fill: s.sub, fontSize: 11 }} />
              <Radar dataKey="value" stroke={C.gold} fill={C.gold} fillOpacity={0.35} />
            </RadarChart>
          ) : (
            <BarChart data={block.data} margin={{ top: 8, right: 8, bottom: 4, left: -18 }}>
              <XAxis dataKey="name" tick={{ fill: s.sub, fontSize: 11 }} interval={0} angle={block.angle ?? 0} textAnchor={block.angle ? "end" : "middle"} height={block.angle ? 60 : 30} />
              <YAxis tick={{ fill: s.sub, fontSize: 11 }} />
              <Tooltip cursor={{ fill: `${C.gold}12` }} contentStyle={{ borderRadius: 10, border: `1px solid ${s.brd}`, background: s.surf, color: s.txt }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {block.data.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {block.caption && <p style={{ margin: ".6rem 0 0", fontSize: ".85rem", color: s.sub, lineHeight: 1.5 }}>{block.caption}</p>}
    </div>
  );
}

function Solved({ text, inline }) {
  return (
    <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: inline ? 0 : ".8rem", color: C.ok, fontWeight: 800, fontSize: ".88rem" }}>
      <CheckCircle2 size={16} /> {text}
    </motion.div>
  );
}

function btn(ghost) {
  return { padding: ".7rem 1.4rem", borderRadius: 999, border: ghost ? `1.5px solid ${C.gold}66` : "none", background: ghost ? "transparent" : C.green, color: ghost ? C.goldD : "#fff", fontWeight: 800, fontSize: ".88rem", cursor: "pointer" };
}

const REGISTRY = {
  quiz: QuizBlock,
  slider: SliderBlock,
  order: OrderBlock,
  flip: FlipBlock,
  scenario: ScenarioBlock,
  sort: SortBlock,
  chart: ChartBlock,
};

// Renders one interactive block by type. Calls onSolved when the learner has
// engaged enough (correct quiz, revealed estimate, ordered right, flipped all,
// chose a path, sorted right). Chart blocks are informational (auto-solved).
export default function InteractiveBlock({ block, s, onSolved }) {
  const Cmp = REGISTRY[block.type];
  if (!Cmp) return null;
  return <Cmp block={block} s={s} onSolved={onSolved} />;
}

export const isPassiveBlock = (type) => type === "chart";
