import { useState, useEffect } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell, PieChart, Pie,
} from "recharts";
import {
  LayoutDashboard, BookOpen, Users, Flame, Moon, Sun,
  TrendingUp, TrendingDown, Eye, EyeOff, Menu, Home, CheckCircle2,
} from "lucide-react";
import { T } from "./siteConfig.js";
import { MONTHLY, PROGRAMS, PILLAR_DATA, DF_GROWTH, TOP_gDX, TOP_KIND, KINGS_COHORTS } from "./impactData.js";

function useCountUp(target, dur = 800, active = true) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    const t0 = performance.now();
    let frame = 0;
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * e));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, dur, active]);
  return active ? v : target;
}

const CustomTooltip = ({ active, payload, label, dark }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: dark ? "#1C1C1E" : "#1D1D1F", border: `1px solid ${dark ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.08)"}`, borderRadius: 10, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,.32)", minWidth: 130 }}>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: "rgba(255,255,255,.45)", marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: i < payload.length - 1 ? 3 : 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.color || T.green, flexShrink: 0 }} />
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, color: "#fff", fontWeight: 500 }}>{p.value?.toLocaleString()}</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)", fontFamily: "'DM Sans',sans-serif" }}>{p.name}</span>
        </div>
      ))}
    </div>
  );
};

function KPI({ label, value, deltaLabel, up = true, ctx, delay = 0, spark, raw }) {
  const num = useCountUp(value, 800, ctx.ready);
  const disp = raw || (num?.toLocaleString?.() || num);
  return (
    <div className="dhover" style={{ background: ctx.surf, borderRadius: 16, padding: 20, border: `1px solid ${ctx.brd}`, boxShadow: ctx.dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ctx.ready ? `enter 250ms ${delay}ms ease-out both` : "none" }}>
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: ".07em", textTransform: "uppercase", color: ctx.p3, marginBottom: 6, fontFamily: "'DM Sans',sans-serif" }}>{label}</div>
      <div style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.04em", color: ctx.p1, lineHeight: 1, fontVariantNumeric: "tabular-nums", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 6 }}>
        {ctx.hide ? "••••" : disp}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, fontFamily: "'DM Mono',monospace", color: up ? T.ok : T.err, fontWeight: 500 }}>
        {up ? <TrendingUp size={11} strokeWidth={2} /> : <TrendingDown size={11} strokeWidth={2} />}
        {ctx.hide ? "••%" : deltaLabel}
      </div>
      {spark && !ctx.hide && (
        <div style={{ marginTop: 9 }}>
          <ResponsiveContainer width="100%" height={32}>
            <AreaChart data={spark} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`sp${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.goldL} stopOpacity={.4} />
                  <stop offset="50%" stopColor={T.green} stopOpacity={.2} />
                  <stop offset="100%" stopColor={T.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="total" stroke={T.green} strokeWidth={1.5} fill={`url(#sp${label})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function OverviewView({ ctx }) {
  const { surf, brd, p1, p2, p3, dark, ready } = ctx;
  const hero = useCountUp(19695, 1000, ready);
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ marginBottom: 16 }}>
        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: "26px 26px 20px", border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center", animation: ready ? "enter 250ms 0ms ease-out both" : "none" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: ".07em", textTransform: "uppercase", color: p3, marginBottom: 6 }}>Total Attendance Entries · as at 2025</div>
            <div style={{ fontSize: "clamp(42px,5vw,66px)", fontWeight: 300, letterSpacing: "-0.04em", color: p1, lineHeight: 1, fontVariantNumeric: "tabular-nums", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
              {ctx.hide ? "••,•••" : hero.toLocaleString()}
            </div>
            <div style={{ fontSize: 11, color: T.ok, fontFamily: "'DM Mono',monospace", fontWeight: 500, marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}>
              <TrendingUp size={11} strokeWidth={2} /> 639 unique goDs · 365 events · 8 programmes
            </div>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={MONTHLY} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="hG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.gold} stopOpacity={.3} />
                  <stop offset="50%" stopColor={T.green} stopOpacity={.1} />
                  <stop offset="100%" stopColor={T.green} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 9, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Area type="monotone" dataKey="total" name="Entries" stroke={T.green} strokeWidth={2} fill="url(#hG)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,160px),1fr))", gap: 12, marginBottom: 16 }}>
        <KPI label="goDs (unique)" value={639} deltaLabel="All-time high" up ctx={ctx} delay={40} />
        <KPI label="Events held" value={365} deltaLabel="365 days of programmes" up ctx={ctx} delay={80} />
        <KPI label="KIND entries" raw="13,350" value={13350} deltaLabel="67.8% of all activity" up ctx={ctx} delay={120} spark={MONTHLY} />
        <KPI label="Meals (FACE)" raw="3,000+" value={3000} deltaLabel="52 Sundays served" up ctx={ctx} delay={160} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 12 }}>
        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 200ms ease-out both" : "none" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: p1, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Monthly Attendance</div>
              <div style={{ fontSize: 11, color: p2, marginTop: 2 }}>All programmes combined · as at 2025</div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[{ c: T.green, l: "Entries" }, { c: T.gold, l: "Avg/session" }].map(s => (
                <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: p3 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.c }} />{s.l}
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={195}>
            <AreaChart data={MONTHLY} margin={{ top: 4, right: 4, left: -22, bottom: 0 }}>
              <defs>
                {[{ id: "mG1", c: T.green }, { id: "mG2", c: T.gold }].map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.c} stopOpacity={.15} /><stop offset="95%" stopColor={g.c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Area type="monotone" dataKey="total" name="Entries" stroke={T.green} strokeWidth={1.5} fill="url(#mG1)" dot={false} />
              <Area type="monotone" dataKey="avg" name="Avg/session" stroke={T.gold} strokeWidth={1.5} fill="url(#mG2)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 240ms ease-out both" : "none" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: p1, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>By Pillar</div>
          <div style={{ fontSize: 11, color: p2, marginBottom: 14 }}>Share of total entries</div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={PILLAR_DATA} dataKey="entries" nameKey="name" cx="50%" cy="50%" innerRadius="52%" outerRadius="80%" paddingAngle={3}>
                {PILLAR_DATA.map((p, i) => <Cell key={i} fill={p.fill} />)}
              </Pie>
              <Tooltip content={<CustomTooltip dark={dark} />} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {PILLAR_DATA.map(p => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.fill, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: p1, fontWeight: 500, flex: 1 }}>{p.name}</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: p2 }}>{ctx.hide ? "••%" : `${p.pct}%`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 280ms ease-out both" : "none" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>Programme Mix</div>
          <div style={{ fontSize: 11, color: p2, marginBottom: 14 }}>Entries by programme · as at 2025</div>
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={PROGRAMS.filter(p => p.entries && p.entries > 30)} layout="vertical" margin={{ top: 0, right: 4, left: 0, bottom: 0 }} barSize={12}>
              <CartesianGrid horizontal={false} vertical stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} />
              <XAxis type="number" tick={{ fontSize: 9, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="code" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Bar dataKey="entries" name="Entries" radius={[0, 4, 4, 0]}>
                {PROGRAMS.filter(p => p.entries && p.entries > 30).map((p, i) => <Cell key={i} fill={p.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 320ms ease-out both" : "none" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>KIND · Q1 Growth</div>
          <div style={{ fontSize: 11, color: p2, marginBottom: 14 }}>Avg attendance per session · Q1 YoY</div>
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={[{ name: "Q1 2024", val: 83 }, { name: "Q1 2025", val: 131 }]} margin={{ top: 4, right: 4, left: -22, bottom: 0 }} barSize={52}>
              <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip dark={dark} />} />
              <Bar dataKey="val" name="Avg/session" radius={[5, 5, 0, 0]}>
                <Cell fill={dark ? "rgba(22,97,62,.4)" : T.greenM} /><Cell fill={T.green} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 11, fontFamily: "'DM Mono',monospace", color: T.ok, fontWeight: 500 }}>+58% year-over-year growth</div>
        </div>
      </div>
    </div>
  );
}

function ProgrammesView({ ctx }) {
  const { surf, brd, p1, p2, p3, dark, ready, hide } = ctx;
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <div className="dhover" style={{ background: surf, borderRadius: 16, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", overflow: "hidden", marginBottom: 16, animation: ready ? "enter 250ms 0ms ease-out both" : "none" }}>
        <div style={{ padding: "14px 18px", borderBottom: `1px solid ${brd}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>All 8 Programmes · as at 2025</div>
            <div style={{ fontSize: 11, color: p2, marginTop: 2 }}>KidsInspiring Nation · NDPR Data Controller</div>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Code", "Programme", "Pillar", "Schedule", "Entries", "Sessions", "Unique", "Status"].map(h => (
                  <th key={h} style={{ padding: "9px 14px", textAlign: ["Entries", "Sessions", "Unique"].includes(h) ? "right" : "left", fontSize: 10, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: p3, borderBottom: `1px solid ${brd}`, whiteSpace: "nowrap", fontFamily: "'DM Sans',sans-serif" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PROGRAMS.map((p, i) => (
                <tr key={p.code} className={`trh ${dark ? "trh-dk" : ""}`} style={{ borderBottom: i < PROGRAMS.length - 1 ? `1px solid ${brd}` : "none" }}>
                  <td style={{ padding: "12px 14px" }}><span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, color: p.fill }}>{p.code}</span></td>
                  <td style={{ padding: "12px 14px", fontSize: 13, color: p1, fontWeight: 500 }}>{p.name}</td>
                  <td style={{ padding: "12px 14px" }}><span className="kinbadge" style={{ background: `${p.fill}18`, color: p.fill }}>{p.pillar}</span></td>
                  <td style={{ padding: "12px 14px", fontSize: 11, color: p2, fontFamily: "'DM Mono',monospace", whiteSpace: "nowrap" }}>{p.schedule}</td>
                  <td style={{ padding: "12px 14px", textAlign: "right", fontFamily: "'DM Mono',monospace", fontSize: 12, color: p1, fontWeight: 500 }}>{hide ? "•••" : p.meals ? `${p.meals.toLocaleString()}+ meals` : (p.entries?.toLocaleString() || "—")}</td>
                  <td style={{ padding: "12px 14px", textAlign: "right", fontFamily: "'DM Mono',monospace", fontSize: 12, color: p2 }}>{p.sessions}</td>
                  <td style={{ padding: "12px 14px", textAlign: "right", fontFamily: "'DM Mono',monospace", fontSize: 12, color: p2 }}>{hide ? "••" : p.unique || "—"}</td>
                  <td style={{ padding: "12px 14px" }}><span className="kinbadge" style={{ background: "rgba(52,199,89,.1)", color: T.ok }}><CheckCircle2 size={9} strokeWidth={2.5} /> Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))", gap: 12 }}>
        {PROGRAMS.map((p, i) => (
          <div key={p.code} className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? `enter 250ms ${i * 45 + 80}ms ease-out both` : "none" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "1.3rem" }}>{p.icon}</span>
                <div>
                  <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", letterSpacing: ".08em", textTransform: "uppercase", color: p.fill, fontWeight: 700 }}>{p.code}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{p.name}</div>
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 300, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.04em" }}>
                {hide ? "•••" : p.meals ? `${p.meals.toLocaleString()}+` : (p.entries?.toLocaleString() || "—")}
              </div>
            </div>
            <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: p.fill, fontWeight: 500, marginBottom: 12, letterSpacing: ".02em" }}>{p.schedule}</div>
            {p.entries && <div style={{ height: 3, background: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)", borderRadius: 999, marginBottom: 12, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${p.pct || 1}%`, background: p.fill, borderRadius: 999 }} />
            </div>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
              {[{ l: "Sessions", v: p.sessions }, { l: "Unique", v: p.unique || "—" }, { l: "Share", v: p.pct ? `${p.pct}%` : "—" }].map(m => (
                <div key={m.l}>
                  <div style={{ fontSize: 9, color: p3, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 2 }}>{m.l}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: p1, fontFamily: "'DM Mono',monospace" }}>{hide && m.l !== "Sessions" ? "••" : m.v}</div>
                </div>
              ))}
            </div>
            {p.sub && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${brd}` }}>
                {p.sub.map(s => (
                  <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: p2, flex: 1 }}>{s.label}</span>
                    <div style={{ width: 50, height: 2, borderRadius: 999, background: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)", overflow: "hidden" }}>
                      <div style={{ height: "100%", background: p.fill, borderRadius: 999, width: `${Math.round((s.entries || 0) / (p.entries || 1) * 100)}%` }} />
                    </div>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: p1 }}>{hide ? "•••" : s.entries}</span>
                    {s.prev && <span style={{ fontSize: 9, color: T.ok, fontFamily: "'DM Mono',monospace" }}>+{Math.round((s.entries - s.prev) / s.prev * 100)}%</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ParticipantsView({ ctx }) {
  const { surf, brd, p1, p2, p3, dark, ready, hide } = ctx;
  const maxGDX = TOP_gDX[0].sessions, maxKIND = TOP_KIND[0].score;
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="dhover" style={{ background: surf, borderRadius: 16, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", overflow: "hidden", animation: ready ? "enter 250ms 0ms ease-out both" : "none" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${brd}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>gDX Leaders · as at 2025</div>
              <div style={{ fontSize: 10, color: p2, marginTop: 2 }}>goDxperience attendance — Sunday 11am</div>
            </div>
            <span className="kinbadge" style={{ background: "rgba(232,185,84,.15)", color: T.goldL }}>gDX</span>
          </div>
          <div style={{ padding: "6px 0" }}>
            {TOP_gDX.map((g, i) => (
              <div key={g.name} className={`trh ${dark ? "trh-dk" : ""}`} style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 18px", borderBottom: i < TOP_gDX.length - 1 ? `1px solid ${brd}` : "none" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: i < 3 ? T.gold : "rgba(0,0,0,.06)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, color: i < 3 ? "#fff" : p3, flexShrink: 0, fontFamily: "'DM Mono',monospace" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: p1 }}>{hide ? "••• ••" : g.name}</div>
                  <div style={{ height: 2, marginTop: 4, borderRadius: 999, background: dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: T.gold, borderRadius: 999, width: `${Math.round(g.sessions / maxGDX * 100)}%` }} />
                  </div>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600, color: p1 }}>{hide ? "••" : g.sessions}</div>
                <div style={{ fontSize: 9, color: p3, width: 48, textAlign: "right" }}>sessions</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dhover" style={{ background: surf, borderRadius: 16, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", overflow: "hidden", animation: ready ? "enter 250ms 60ms ease-out both" : "none" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${brd}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>KIND Champions · as at 2025</div>
              <div style={{ fontSize: 10, color: p2, marginTop: 2 }}>Devotional attendance H1 score — Daily 8pm</div>
            </div>
            <span className="kinbadge" style={{ background: "rgba(22,97,62,.12)", color: T.kindC }}>KIND</span>
          </div>
          <div style={{ padding: "6px 0" }}>
            {TOP_KIND.map((k, i) => (
              <div key={k.name} className={`trh ${dark ? "trh-dk" : ""}`} style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 18px", borderBottom: i < TOP_KIND.length - 1 ? `1px solid ${brd}` : "none" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: i < 3 ? T.green : "rgba(0,0,0,.06)", display: "grid", placeItems: "center", fontSize: 10, fontWeight: 700, color: i < 3 ? T.goldL : p3, flexShrink: 0, fontFamily: "'DM Mono',monospace" }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: p1 }}>{hide ? "••• ••" : k.name}</div>
                  <div style={{ height: 2, marginTop: 4, borderRadius: 999, background: dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.05)", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: T.green, borderRadius: 999, width: `${Math.round(k.score / maxKIND * 100)}%` }} />
                  </div>
                </div>
                <div style={{ fontFamily: "'DM Mono',monospace", fontSize: 12, fontWeight: 600, color: p1 }}>{hide ? "•••" : k.score}</div>
                <div style={{ fontSize: 9, color: p3, width: 44, textAlign: "right" }}>H1 score</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", marginTop: 14, animation: ready ? "enter 250ms 140ms ease-out both" : "none" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>KINGs goD Cells — Cohort Breakdown</div>
            <div style={{ fontSize: 11, color: p2, marginTop: 2 }}>Three cohorts · 43 sessions each · Sundays 5pm · as at 2025</div>
          </div>
          <span className="kinbadge" style={{ background: "rgba(123,45,139,.12)", color: T.kingsC }}>KINGs</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 18 }}>
          {KINGS_COHORTS.map(k => (
            <div key={k.label} style={{ background: dark ? "rgba(123,45,139,.1)" : "rgba(123,45,139,.05)", borderRadius: 12, padding: 14, border: "1px solid rgba(123,45,139,.15)" }}>
              <div style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: T.kingsC, fontWeight: 700, letterSpacing: ".06em", marginBottom: 8 }}>{k.label}</div>
              <div style={{ fontSize: 30, fontWeight: 300, letterSpacing: "-0.04em", color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1 }}>{hide ? "•••" : k.entries}</div>
              <div style={{ fontSize: 9, color: p3, marginTop: 3 }}>entries</div>
              <div style={{ marginTop: 10, display: "flex", gap: 14 }}>
                {[{ l: "Sessions", v: k.sessions }, { l: "Unique", v: hide ? "••" : k.unique }].map(m => (
                  <div key={m.l}><div style={{ fontSize: 9, color: p3 }}>{m.l}</div><div style={{ fontFamily: "'DM Mono',monospace", fontSize: 13, color: p1 }}>{m.v}</div></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={130}>
          <BarChart data={KINGS_COHORTS} margin={{ top: 4, right: 4, left: -22, bottom: 0 }} barSize={56}>
            <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip dark={dark} />} />
            <Bar dataKey="entries" name="Entries" fill={T.kingsC} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function DFView({ ctx }) {
  const { surf, brd, p1, p2, p3, dark, ready, hide } = ctx;
  return (
    <div style={{ maxWidth: 1240, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 14 }}>
        {DF_GROWTH.map((d, i) => (
          <div key={d.name} className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? `enter 250ms ${i * 60}ms ease-out both` : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, color: T.dfC, letterSpacing: ".06em" }}>{d.name}</span>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, fontWeight: 700, color: T.ok }}>{hide ? "••%" : `+${d.pct}%`}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[{ l: "2024", v: d.y2024, dim: true }, { l: "2025", v: d.y2026, dim: false }].map(y => (
                <div key={y.l} style={{ textAlign: "center", padding: "10px 6px", borderRadius: 10, background: y.dim ? (dark ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.03)") : (dark ? "rgba(196,136,44,.12)" : "rgba(196,136,44,.06)"), border: y.dim ? "none" : `1px solid rgba(196,136,44,.2)` }}>
                  <div style={{ fontSize: 9, color: p3, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>{y.l}</div>
                  <div style={{ fontSize: 26, fontWeight: 300, color: y.dim ? p2 : T.gold, letterSpacing: "-0.04em", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{hide ? "•••" : y.v}</div>
                  <div style={{ fontSize: 9, color: p3 }}>entries</div>
                </div>
              ))}
            </div>
            <div style={{ height: 3, borderRadius: 999, background: dark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.06)", overflow: "hidden" }}>
              <div style={{ height: "100%", background: T.dfC, borderRadius: 999, width: `${Math.round(d.y2026 / (d.y2026 + d.y2024) * 100)}%` }} />
            </div>
            <div style={{ fontSize: 9, color: p3, marginTop: 5, fontFamily: "'DM Mono',monospace" }}>2025 share of 2-year combined total</div>
          </div>
        ))}
      </div>

      <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", marginBottom: 14, animation: ready ? "enter 250ms 200ms ease-out both" : "none" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 3 }}>Daniel Fast · 2024 vs 2025</div>
        <div style={{ fontSize: 11, color: p2, marginBottom: 14 }}>Attendance entries per week · year-over-year comparison</div>
        <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
          {[{ c: dark ? "rgba(196,136,44,.35)" : T.greenM, l: "2024" }, { c: T.dfC, l: "2025" }].map(s => (
            <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: p3 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: s.c }} />{s.l}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={DF_GROWTH} margin={{ top: 4, right: 4, left: -22, bottom: 0 }} barGap={8} barSize={44}>
            <CartesianGrid horizontal stroke={dark ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.04)"} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: p3, fontFamily: "'DM Mono',monospace" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip dark={dark} />} />
            <Bar dataKey="y2024" name="2024" fill={dark ? "rgba(196,136,44,.3)" : T.greenM} radius={[4, 4, 0, 0]} />
            <Bar dataKey="y2026" name="2025" fill={T.dfC} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="dhover" style={{ background: surf, borderRadius: 16, padding: 20, border: `1px solid ${brd}`, boxShadow: dark ? "none" : "0 1px 2px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.04)", animation: ready ? "enter 250ms 260ms ease-out both" : "none" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: p1, fontFamily: "'Plus Jakarta Sans',sans-serif", marginBottom: 14 }}>What This Growth Means</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 12 }}>
          {[
            { icon: "🔥", t: "DF3 is the defining story", d: "200% growth in DF Week 3 (212→637) shows that goDs who complete earlier weeks deepen their commitment. The fasting culture is compounding." },
            { icon: "📈", t: "Overall DF momentum", d: "Total DF grew from 743 (2024) to 1,619 (as at 2025) — a 118% increase. Daniel Fast is now a defining identity marker for KidsInspiring Nation." },
            { icon: "✨", t: "Retention driving numbers", d: "DF3 unique participants grew +43%, but entries grew +200% — meaning existing participants attended far more sessions, not just more people attending once." },
          ].map(c => (
            <div key={c.t} style={{ background: dark ? "rgba(196,136,44,.07)" : "rgba(196,136,44,.04)", borderRadius: 10, padding: 14, border: "1px solid rgba(196,136,44,.12)" }}>
              <span style={{ fontSize: "1.3rem", display: "block", marginBottom: 7 }}>{c.icon}</span>
              <div style={{ fontSize: 12, fontWeight: 600, color: p1, marginBottom: 5 }}>{c.t}</div>
              <div style={{ fontSize: 11, color: p2, lineHeight: 1.55 }}>{c.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard({ onBack, dark, toggleDark }) {
  const [view, setView] = useState("Overview");
  const [sideOpen, setSide] = useState(true);
  const [hide, setHide] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  const s = dark
    ? { bg: T.bgD, surf: T.srfD, brd: T.brdD, p1: T.d1, p2: T.d2, p3: T.d3 }
    : { bg: T.bg, surf: T.surf, brd: T.brd, p1: T.p1, p2: T.p2, p3: T.p3 };
  const ctx = { ...s, dark, hide, ready };

  const NAV = [
    { label: "Overview", icon: LayoutDashboard },
    { label: "Programmes", icon: BookOpen },
    { label: "Participants", icon: Users },
    { label: "DF Growth", icon: Flame },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", background: s.bg, fontFamily: "'DM Sans',sans-serif", overflow: "hidden" }}>
      <aside style={{ width: sideOpen ? 220 : 58, flexShrink: 0, transition: "width .2s ease-out", background: s.surf, borderRight: `1px solid ${s.brd}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "16px 12px", borderBottom: `1px solid ${s.brd}`, display: "flex", alignItems: "center", gap: 9, minHeight: 58 }}>
          <div style={{ width: 30, height: 30, background: T.green, borderRadius: 7, display: "grid", placeItems: "center", color: T.goldL, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900, fontSize: ".95rem", flexShrink: 0 }}>g</div>
          {sideOpen && <div><div style={{ fontSize: 12, fontWeight: 700, color: s.p1, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>KIN Dashboard</div><div style={{ fontSize: 10, color: s.p3, fontFamily: "'DM Mono',monospace" }}>As at 2025</div></div>}
        </div>
        <nav style={{ padding: "10px 6px", flex: 1 }}>
          {NAV.map(({ label, icon: Ic }, i) => {
            const act = view === label;
            return (
              <button key={label} className="nb" onClick={() => setView(label)}
                style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "7px 9px", borderRadius: 7, marginBottom: 2, border: act ? `1px solid ${dark ? "rgba(22,97,62,.35)" : "rgba(22,97,62,.18)"}` : "1px solid transparent", background: act ? (dark ? "rgba(22,97,62,.2)" : "rgba(22,97,62,.09)") : "transparent", color: act ? T.green : s.p2, animation: ready ? `enter 250ms ${i * 40}ms ease-out both` : "none" }}
                onMouseEnter={e => { if (!act) e.currentTarget.style.background = dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)"; }}
                onMouseLeave={e => { if (!act) e.currentTarget.style.background = "transparent"; }}>
                <Ic size={15} strokeWidth={1.5} style={{ flexShrink: 0 }} />
                {sideOpen && <span style={{ fontSize: 12, fontWeight: act ? 600 : 400, whiteSpace: "nowrap" }}>{label}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding: "10px 6px", borderTop: `1px solid ${s.brd}` }}>
          <button className="nb" onClick={onBack}
            style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "7px 9px", borderRadius: 7, color: s.p2, border: "1px solid transparent", background: "none" }}
            onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.05)" : "rgba(0,0,0,.04)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
            <Home size={15} strokeWidth={1.5} />
            {sideOpen && <span style={{ fontSize: 12, whiteSpace: "nowrap" }}>Back to Site</span>}
          </button>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <header style={{ height: 58, background: s.surf, borderBottom: `1px solid ${s.brd}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={() => setSide(v => !v)} style={{ width: 30, height: 30, display: "grid", placeItems: "center", borderRadius: 7, color: s.p2, background: "none", cursor: "pointer", transition: "background .15s" }}
              onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.05)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <Menu size={15} strokeWidth={1.5} />
            </button>
            <div>
              <h1 style={{ fontSize: 14, fontWeight: 700, color: s.p1, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: "-0.02em" }}>{view}</h1>
              <p style={{ fontSize: 10, color: s.p3, fontFamily: "'DM Mono',monospace" }}>KidsInspiring Nation · as at 2025 · 19,695 entries · 639 goDs</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            {[
              { icon: hide ? EyeOff : Eye, action: () => setHide(h => !h), title: "Privacy" },
              { icon: dark ? Sun : Moon, action: toggleDark, title: "Theme" },
            ].map(({ icon: Ic, action, title }) => (
              <button key={title} onClick={action} title={title}
                style={{ width: 30, height: 30, display: "grid", placeItems: "center", borderRadius: 7, color: s.p2, background: "none", cursor: "pointer", transition: "background .15s" }}
                onMouseEnter={e => e.currentTarget.style.background = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <Ic size={14} strokeWidth={1.5} />
              </button>
            ))}
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.green, display: "grid", placeItems: "center", color: T.goldL, fontFamily: "'Playfair Display',serif", fontStyle: "italic", fontWeight: 900, fontSize: ".85rem" }}>g</div>
          </div>
        </header>
        <main className="ds" style={{ flex: 1, overflow: "auto", padding: 20 }}>
          {view === "Overview" && <OverviewView ctx={ctx} />}
          {view === "Programmes" && <ProgrammesView ctx={ctx} />}
          {view === "Participants" && <ParticipantsView ctx={ctx} />}
          {view === "DF Growth" && <DFView ctx={ctx} />}
        </main>
      </div>
    </div>
  );
}
