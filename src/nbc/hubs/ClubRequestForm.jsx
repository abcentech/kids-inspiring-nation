import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, School, ChevronDown } from "lucide-react";
import { SITE } from "../../siteConfig.js";
import { submitJsonForm } from "../../formSubmit.js";
import { trackEvent } from "../../analytics.js";
import { C } from "../nbcBrand.js";
import { referralFields } from "../referral.js";
import { surfaces } from "./hubKit.jsx";

const ENDPOINT = "https://formsubmit.co/ajax/" + SITE.operationsEmail;

// Three required fields — school, contact, email — is all it takes to land on
// the national map. Role/phone/student-count are real but optional, tucked
// behind a disclosure so the default form reads as fast as it actually is.
export default function ClubRequestForm({ dark }) {
  const s = surfaces(dark);
  const [f, setF] = useState({ school: "", contact: "", role: "Teacher / Staff", email: "", phone: "", students: "" });
  const [showMore, setShowMore] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await submitJsonForm(ENDPOINT, {
        _subject: "🏫 New Nation Builders Club Request",
        School: f.school, Contact: f.contact, Role: f.role, Email: f.email,
        Phone: f.phone || "—", "Interested students": f.students || "—",
        ...referralFields(),
      }, "club-request");
      trackEvent("nbc_club_request", { role: f.role });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  const field = { width: "100%", padding: ".75rem .9rem", borderRadius: 12, border: `1.5px solid ${s.brd}`, background: s.bg, color: s.txt, fontSize: ".95rem", fontFamily: "inherit", outline: "none" };
  const lbl = { display: "block", fontWeight: 700, fontSize: ".82rem", color: s.txt, marginBottom: ".35rem" };

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}
        style={{ background: s.surf, border: `1px solid ${C.ok}55`, borderRadius: 22, padding: "2.5rem 1.75rem", textAlign: "center" }}>
        <CheckCircle2 size={44} color={C.ok} style={{ margin: "0 auto" }} />
        <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: s.txt, margin: ".75rem 0 .5rem" }}>Request received 🎉</h3>
        <p style={{ color: s.sub, lineHeight: 1.6, margin: 0 }}>{f.school} is on its way to the national map. We'll email <strong>{f.email}</strong> with your welcome pack and next steps (your member roster) within a few days.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} style={{ background: s.surf, border: `1px solid ${s.brd}`, borderRadius: 22, padding: "clamp(1.25rem,4vw,2rem)" }}>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: C.goldD, fontWeight: 800, fontSize: ".74rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: "1.1rem" }}>
        <School size={15} /> Chapter Request · takes a minute
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={lbl}>School name</label>
          <input required value={f.school} onChange={set("school")} style={field} placeholder="e.g. Unity College, Ikeja" />
        </div>
        <div>
          <label style={lbl}>Your name</label>
          <input required value={f.contact} onChange={set("contact")} style={field} placeholder="Who should we contact?" />
        </div>
        <div>
          <label style={lbl}>Email</label>
          <input required type="email" value={f.email} onChange={set("email")} style={field} placeholder="you@school.edu.ng" />
        </div>
      </div>

      {!showMore ? (
        <button type="button" onClick={() => setShowMore(true)}
          style={{ marginTop: ".9rem", display: "inline-flex", alignItems: "center", gap: 5, background: "none", border: "none", padding: 0, cursor: "pointer", color: s.sub, fontWeight: 700, fontSize: ".84rem" }}>
          <ChevronDown size={14} /> Add role, phone, student count (optional)
        </button>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <label style={lbl}>Your role</label>
            <select value={f.role} onChange={set("role")} style={field}>
              {["Teacher / Staff", "Head / Principal", "Student", "Parent", "Other"].map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Phone</label>
            <input type="tel" value={f.phone} onChange={set("phone")} style={field} placeholder="080…" />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={lbl}>Roughly how many students want to build?</label>
            <input type="number" value={f.students} onChange={set("students")} style={field} placeholder="At least 10 to charter — an estimate is fine" />
          </div>
        </div>
      )}
      {status === "error" && <p style={{ color: C.coral, marginTop: ".8rem", fontSize: ".88rem" }}>Something went wrong. Please try again, or reach us on WhatsApp.</p>}
      <button type="submit" disabled={status === "sending"}
        style={{ marginTop: "1.25rem", padding: ".9rem 1.8rem", borderRadius: 999, border: "none", background: C.green, color: "#fff", fontWeight: 800, fontSize: ".95rem", cursor: status === "sending" ? "wait" : "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
        {status === "sending" ? <><Loader2 size={17} className="spin" /> Sending…</> : "Request our chapter"}
      </button>
      <style>{`.spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </form>
  );
}
