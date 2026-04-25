import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, Mail, Globe } from "lucide-react";
import { SITE, T } from "./siteConfig.js";
import { usePageMeta } from "./usePageMeta.js";

export default function Privacy({ dark }) {
  usePageMeta({
    title: `Privacy Policy — ${SITE.name}`,
    description: "KidsInspiring Nation Privacy Policy and NDPR 2019 compliance information.",
  });

  const bg = dark ? "#050806" : "#FAFAF5";
  const card = dark ? "rgba(255,255,255,.03)" : "#fff";
  const txt = dark ? T.cream : T.greenD;
  const sub = dark ? "rgba(253,247,236,.7)" : T.p2;
  const brd = dark ? "rgba(255,255,255,.08)" : "rgba(22,97,62,.1)";

  const sections = [
    {
      icon: <Lock size={20} />,
      title: "Data Controller",
      content: `KidsInspiring Nation (registered as goDs Global KidsInspiring, IT No. 6980735) is the data controller for information collected on this website. Our registered office is at ${SITE.officeAddress}.`
    },
    {
      icon: <Eye size={20} />,
      title: "Data We Collect",
      content: "We collect information you provide directly via our contact and registration forms (Name, Email, Phone, Subject, Message). We also use cookies to collect anonymised usage data through Google Analytics to improve our services."
    },
    {
      icon: <Shield size={20} />,
      title: "Legal Basis (NDPR 2019)",
      content: "In compliance with the Nigeria Data Protection Regulation (NDPR) 2019, we process your data based on your explicit consent (when you submit a form or accept cookies) or for our legitimate interest in providing NGO services."
    },
    {
      icon: <FileText size={20} />,
      title: "How We Use Your Data",
      content: "Your data is used solely to respond to your enquiries, manage programme registrations, process donations, and improve website performance. We do not sell, rent, or trade your personal data with third parties."
    },
    {
      icon: <Globe size={20} />,
      title: "Data Retention & Security",
      content: "We retain personal data only as long as necessary for the purposes outlined. We implement robust technical and organisational measures to protect your data against unauthorised access or loss."
    },
    {
      icon: <Mail size={20} />,
      title: "Your Rights",
      content: "You have the right to access, rectify, or request the deletion of your personal data. To exercise these rights, please contact our Data Protection Officer at KidsinspiringNation@gmail.com."
    }
  ];

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: bg, color: txt, minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ background: T.greenD, padding: "clamp(5rem,12vw,8rem) 0 clamp(3rem,7vw,5rem)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 65% at 20% 55%, ${T.green}45, transparent 60%), radial-gradient(ellipse 50% 60% at 85% 20%, ${T.gold}15, transparent 55%)` }} />
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: "rgba(253,247,236,.7)", marginBottom: "1rem" }}>
              Trust · Transparency · Protection
            </div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.6rem,6.5vw,4.5rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.035em", marginBottom: "1.25rem", color: T.cream }}>
              Privacy & Data<br />
              <em style={{ fontStyle: "italic", color: T.goldL }}>Protection.</em>
            </h1>
            <p style={{ fontSize: "clamp(1rem,2.2vw,1.1rem)", lineHeight: 1.75, color: "rgba(253,247,236,.72)", maxWidth: "65ch" }}>
              We are committed to protecting your privacy in accordance with the Nigeria Data Protection Regulation (NDPR) 2019. This policy explains how we handle your information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "clamp(3rem,8vw,6rem) 0" }}>
        <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.5rem" }}>
            {sections.map((s, i) => (
              <motion.div 
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                style={{ background: card, borderRadius: 24, padding: "2rem", border: `1px solid ${brd}`, display: "flex", flexDirection: "column", gap: "1rem" }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${T.gold}12`, color: T.gold, display: "grid", placeItems: "center" }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 900, fontFamily: "'Playfair Display',serif" }}>{s.title}</h3>
                <p style={{ color: sub, lineHeight: 1.7, fontSize: ".95rem" }}>{s.content}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.5 }}
             viewport={{ once: true }}
             style={{ marginTop: "3rem", padding: "2rem", borderRadius: 28, background: T.greenD, border: `1px solid ${T.gold}20`, textAlign: "center" }}
          >
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 900, color: T.cream, marginBottom: "1rem" }}>
              Questions about your data?
            </h2>
            <p style={{ color: "rgba(253,247,236,.7)", marginBottom: "1.5rem", maxWidth: "50ch", margin: "0 auto 1.5rem" }}>
              If you have any questions regarding this policy or wish to exercise your data rights, please reach out to our team.
            </p>
            <a href={`mailto:${SITE.email}`} style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: "1rem 2rem", borderRadius: 999, background: T.gold, color: "#fff", fontWeight: 800, textDecoration: "none" }}>
              Contact DPO
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
