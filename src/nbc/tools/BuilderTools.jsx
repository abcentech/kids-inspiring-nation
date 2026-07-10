import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
} from "recharts";
import { Download, ArrowLeft, ArrowRight, Check, FileText, Save } from "lucide-react";
import { usePageMeta } from "../../usePageMeta.js";
import { ROUTE_META } from "../../siteConfig.js";
import { C } from "../nbcBrand.js";
import { HubHero, Section, surfaces, WRAP, CTA, grid } from "../hubs/hubKit.jsx";
import { TOOLS, getTool } from "./worksheetData.js";
import { PDF_BASE } from "../../nbcCourse.js";
import { trackEvent } from "../../analytics.js";

const KEY = (slug) => `nbc_tool_${slug}`;
const readTool = (slug) => { try { return JSON.parse(localStorage.getItem(KEY(slug)) || "{}"); } catch { return {}; } };
const allFieldIds = (tool) => tool.steps.flatMap((st) => (st.fields || []).map((f) => f.id));
const toolPct = (tool, data) => {
  const ids = allFieldIds(tool);
  if (!ids.length) return 0;
  const filled = ids.filter((id) => data[id] !== undefined && String(data[id]).trim() !== "").length;
  return Math.round((filled / ids.length) * 100);
};

/* ── Chart ───────────────────────────────────────────────────────── */
function Chart({ chart, data, s }) {
  const palette = [C.gold, C.green, C.goldD, C.greenM, C.ok, C.goldL];
  const rows = chart.source === "fields"
    ? chart.fields.map((fid, i) => ({ name: chart.names[i], value: Number(data[fid]) || 0 }))
    : chart.data;
  return (
    <div style={{ background: s.bg, border: `1px solid ${s.brd}`, borderRadius: 16, padding: "1.1rem 1.2rem", marginTop: "1.25rem" }}>
      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: ".72rem", fontWeight: 800, letterSpacing: ".1em", textTransform: "uppercase", color: C.gold, marginBottom: ".6rem" }}>{chart.title}</div>
      <div style={{ width: "100%", height: 240 }}>
        <ResponsiveContainer>
          {chart.kind === "radar" ? (
            <RadarChart data={rows} outerRadius="72%">
              <PolarGrid stroke={s.brd} />
              <PolarAngleAxis dataKey="name" tick={{ fill: s.sub, fontSize: 10 }} />
              <Radar dataKey="value" stroke={C.gold} fill={C.gold} fillOpacity={0.35} />
            </RadarChart>
          ) : (
            <BarChart data={rows} margin={{ top: 8, right: 8, bottom: 4, left: -20 }}>
              <XAxis dataKey="name" tick={{ fill: s.sub, fontSize: 11 }} interval={0} angle={chart.angle ?? 0} textAnchor={chart.angle ? "end" : "middle"} height={chart.angle ? 56 : 30} />
              <YAxis tick={{ fill: s.sub, fontSize: 11 }} />
              <Tooltip cursor={{ fill: `${C.gold}12` }} contentStyle={{ borderRadius: 10, border: `1px solid ${s.brd}`, background: s.surf, color: s.txt }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>{rows.map((_, i) => <Cell key={i} fill={palette[i % palette.length]} />)}</Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {chart.caption && <p style={{ margin: ".5rem 0 0", fontSize: ".82rem", color: s.sub, lineHeight: 1.5 }}>{chart.caption}</p>}
    </div>
  );
}

/* ── Field ───────────────────────────────────────────────────────── */
function Field({ f, value, onChange, s }) {
  const base = { width: "100%", padding: ".7rem .9rem", borderRadius: 12, border: `1.5px solid ${s.brd}`, background: s.bg, color: s.txt, fontSize: ".95rem", fontFamily: "inherit", outline: "none" };
  return (
    <div>
      <label style={{ display: "block", fontWeight: 700, fontSize: ".9rem", color: s.txt, marginBottom: ".4rem" }}>{f.label}</label>
      {f.hint && <p style={{ margin: "0 0 .5rem", fontSize: ".8rem", color: s.sub }}>{f.hint}</p>}
      {f.type === "longtext" ? (
        <textarea value={value || ""} onChange={(e) => onChange(e.target.value)} rows={3} style={{ ...base, resize: "vertical" }} />
      ) : f.type === "select" ? (
        <select value={value || ""} onChange={(e) => onChange(e.target.value)} style={base}>
          <option value="">Choose…</option>
          {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : f.type === "slider" ? (
        <div>
          <input type="range" min={f.min} max={f.max} value={value || f.min} onChange={(e) => onChange(Number(e.target.value))} style={{ width: "100%", accentColor: C.gold }} />
          <div style={{ textAlign: "right", fontWeight: 800, color: C.goldD }}>{value || f.min} / {f.max}</div>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          {f.prefix && <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: s.sub, fontWeight: 700 }}>{f.prefix}</span>}
          <input type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"} value={value || ""} onChange={(e) => onChange(e.target.value)} style={{ ...base, paddingLeft: f.prefix ? "1.8rem" : ".9rem", paddingRight: f.unit ? "3rem" : ".9rem" }} />
          {f.unit && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: s.sub, fontWeight: 700, fontSize: ".82rem" }}>{f.unit}</span>}
        </div>
      )}
    </div>
  );
}

/* ── Computed summary (financials) ───────────────────────────────── */
function computed(data) {
  const exp = Number(data.f_expenses) || 0;
  const inkind = Number(data.f_inkind) || 0;
  const direct = Number(data.r_direct) || 0;
  const value = exp + inkind;
  return { value, costPerPerson: direct > 0 ? Math.round(value / direct) : 0 };
}

/* ── Tool view ───────────────────────────────────────────────────── */
function ToolView({ dark, tool }) {
  const s = surfaces(dark);
  const navigate = useNavigate();
  const [data, setData] = useState(() => readTool(tool.slug));
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);

  usePageMeta({ title: `${tool.title} — Nation Builders Corps`, description: tool.tagline, canonicalPath: `/nbc/tools/${tool.slug}`, image: ROUTE_META.nbc.image });
  useEffect(() => { setData(readTool(tool.slug)); setStep(0); window.scrollTo(0, 0); }, [tool.slug]);

  const update = (id, v) => {
    setData((prev) => {
      const next = { ...prev, [id]: v };
      try { localStorage.setItem(KEY(tool.slug), JSON.stringify(next)); } catch { /* storage full */ }
      return next;
    });
    if (!saved) { setSaved(true); trackEvent("nbc_tool_edit", { tool: tool.slug }); }
  };

  const pct = toolPct(tool, data);
  const st = tool.steps[step];
  const comp = st.summaryComputed ? computed(data) : null;

  const exportTxt = () => {
    const lines = [`${tool.title.toUpperCase()}`, `Nation Builders Corps`, ""];
    tool.steps.forEach((sec) => {
      lines.push(`## ${sec.heading}`);
      (sec.fields || []).forEach((f) => { if (data[f.id]) lines.push(`- ${f.label}: ${data[f.id]}`); });
      lines.push("");
    });
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${tool.slug}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
    trackEvent("nbc_tool_export", { tool: tool.slug });
  };

  return (
    <div>
      <HubHero eyebrow={<><Link to="/nbc/tools" style={{ color: C.goldL, textDecoration: "none" }}>Builder Tools</Link> · {tool.emoji} {tool.title}</>} title={tool.title} sub={tool.tagline}>
        <div style={{ width: "min(100%,26rem)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: ".78rem", opacity: .85, marginBottom: 6 }}>
            <span><Save size={12} /> Autosaves on this device</span><span>{pct}% filled</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: "rgba(255,255,255,.14)", overflow: "hidden" }}>
            <motion.div animate={{ width: `${pct}%` }} style={{ height: "100%", background: `linear-gradient(90deg,${C.goldD},${C.gold})` }} />
          </div>
        </div>
      </HubHero>

      <Section dark={dark}>
        {/* Step chips */}
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
          {tool.steps.map((sec, i) => (
            <button key={i} onClick={() => setStep(i)}
              style={{ cursor: "pointer", padding: ".55rem .9rem", borderRadius: 999, border: `1px solid ${i === step ? C.gold : s.brd}`, background: i === step ? `${C.gold}16` : s.surf, color: s.txt, fontWeight: 700, fontSize: ".82rem" }}>
              {i + 1}. {sec.heading.replace(/^\d+\s·\s/, "")}
            </button>
          ))}
        </div>

        <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .3 }}
          style={{ background: s.surf, border: `1px solid ${s.brd}`, borderRadius: 22, padding: "clamp(1.25rem,4vw,2rem)" }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 900, color: s.txt, margin: "0 0 .4rem" }}>{st.heading}</h2>
          {st.note && <p style={{ color: s.sub, margin: "0 0 1.25rem", lineHeight: 1.55 }}>{st.note}</p>}

          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {(st.fields || []).map((f) => <Field key={f.id} f={f} value={data[f.id]} onChange={(v) => update(f.id, v)} s={s} />)}
          </div>

          {comp && (
            <div style={{ ...grid(180), marginTop: "1.25rem" }}>
              <div style={{ padding: "1rem", borderRadius: 14, background: `${C.gold}12`, border: `1px solid ${C.gold}44` }}>
                <div style={{ fontSize: ".78rem", color: s.sub, fontWeight: 700 }}>Total project value</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 900, color: C.goldD }}>₦{comp.value.toLocaleString()}</div>
              </div>
              <div style={{ padding: "1rem", borderRadius: 14, background: `${C.ok}12`, border: `1px solid ${C.ok}44` }}>
                <div style={{ fontSize: ".78rem", color: s.sub, fontWeight: 700 }}>Cost per person helped</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.6rem", fontWeight: 900, color: C.ok }}>₦{comp.costPerPerson.toLocaleString()}</div>
              </div>
            </div>
          )}

          {st.chart && <Chart chart={st.chart} data={data} s={s} />}

          {st.checklist && (
            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ fontWeight: 800, color: s.txt, marginBottom: ".7rem" }}>Readiness checklist</div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                {st.checklist.map((item, i) => {
                  const id = `chk_${step}_${i}`;
                  const on = !!data[id];
                  return (
                    <button key={i} onClick={() => update(id, on ? "" : "1")}
                      style={{ display: "flex", gap: ".7rem", alignItems: "center", textAlign: "left", cursor: "pointer", padding: ".7rem .9rem", borderRadius: 12, border: `1.5px solid ${on ? C.ok : s.brd}`, background: on ? `${C.ok}10` : s.bg, color: s.txt, fontWeight: 600, fontSize: ".92rem" }}>
                      <span style={{ width: 24, height: 24, flexShrink: 0, borderRadius: 7, border: `2px solid ${on ? C.ok : s.brd}`, background: on ? C.ok : "transparent", display: "grid", placeItems: "center" }}>{on && <Check size={15} color="#fff" />}</span>
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Nav + export */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
          <button onClick={() => (step > 0 ? setStep(step - 1) : navigate("/nbc/tools"))}
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: ".8rem 1.4rem", borderRadius: 999, border: `1.5px solid ${s.brd}`, background: s.surf, color: s.txt, fontWeight: 700, cursor: "pointer" }}>
            <ArrowLeft size={16} /> {step > 0 ? "Back" : "All tools"}
          </button>
          <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap" }}>
            <button onClick={exportTxt} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: ".8rem 1.4rem", borderRadius: 999, border: `1.5px solid ${C.gold}66`, background: "transparent", color: C.goldD, fontWeight: 800, cursor: "pointer" }}>
              <Download size={16} /> Export my answers
            </button>
            {step < tool.steps.length - 1 && (
              <button onClick={() => setStep(step + 1)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: ".8rem 1.6rem", borderRadius: 999, border: "none", background: C.green, color: "#fff", fontWeight: 800, cursor: "pointer" }}>
                Next <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {tool.pdf && (
          <a href={`${PDF_BASE}${tool.pdf}`} download style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: "1.5rem", padding: ".8rem 1.4rem", borderRadius: 999, border: `1.5px solid ${s.brd}`, background: s.surf, color: s.sub, fontWeight: 700, textDecoration: "none", fontSize: ".9rem" }}>
            <FileText size={16} /> Prefer paper? Download the original workbook (PDF)
          </a>
        )}
      </Section>
    </div>
  );
}

/* ── Tools index ─────────────────────────────────────────────────── */
function ToolsIndex({ dark }) {
  usePageMeta(ROUTE_META.nbcTools);
  const s = surfaces(dark);
  const [progress, setProgress] = useState({});
  useEffect(() => { const p = {}; TOOLS.forEach((t) => (p[t.slug] = toolPct(t, readTool(t.slug)))); setProgress(p); }, []);

  return (
    <div>
      <HubHero eyebrow="🧰 Builder Tools" title="The whole toolkit," accent="interactive." sub="Every Nation Builders workbook, rebuilt as a fillable on-site tool. Your answers autosave on this device and export in a tap — no printing required.">
        <CTA to="/nbc/course" ghost>Or take the course</CTA>
      </HubHero>
      <Section dark={dark}>
        <div style={grid(280)}>
          {TOOLS.map((t, i) => (
            <motion.div key={t.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Link to={`/nbc/tools/${t.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
                <div style={{ background: s.surf, border: `1px solid ${s.brd}`, borderRadius: 20, padding: "1.6rem", height: "100%", display: "flex", flexDirection: "column", borderTop: `3px solid ${t.accent}` }}>
                  <span style={{ fontSize: "2rem" }}>{t.emoji}</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: s.txt, margin: ".6rem 0 .4rem" }}>{t.title}</h3>
                  <p style={{ color: s.sub, lineHeight: 1.55, flex: 1, margin: 0, fontSize: ".93rem" }}>{t.tagline}</p>
                  <div style={{ marginTop: "1.1rem" }}>
                    <div style={{ height: 6, borderRadius: 999, background: s.brd, overflow: "hidden" }}>
                      <div style={{ width: `${progress[t.slug] || 0}%`, height: "100%", background: t.accent }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".5rem", fontSize: ".8rem", fontWeight: 700, color: s.sub }}>
                      <span>{progress[t.slug] ? `${progress[t.slug]}% filled` : "Start"}</span>
                      <span style={{ color: t.accent, display: "inline-flex", alignItems: "center", gap: 4 }}>Open <ArrowRight size={13} /></span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default function BuilderTools({ dark }) {
  const { slug } = useParams();
  if (slug) {
    const tool = getTool(slug);
    if (tool) return <ToolView dark={dark} tool={tool} />;
  }
  return <ToolsIndex dark={dark} />;
}
