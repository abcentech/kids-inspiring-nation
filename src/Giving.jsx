import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  ExternalLink,
  CreditCard,
  Globe,
  ShoppingBag,
  Zap,
  BookOpen,
  Coffee,
  Coins,
  Activity,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { DONATION_DETAILS, SITE, T } from "./siteConfig.js";
import { trackEvent } from "./analytics.js";

const PAYSTACK_GIVE = "https://paystack.shop/pay/kin";
const PAYSTACK_STOREFRONT = "https://paystack.shop/kidsinspiring";

export default function Giving({ dark }) {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      trackEvent("copy_donation_detail", { id });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      // no-op
    }
  };

  const bg = dark ? "#050806" : "#FAFAF5";
  const cardBg = dark ? "rgba(28,28,30,0.65)" : "rgba(255,255,255,0.9)";
  const brd = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const txt = dark ? T.cream : T.greenD;
  const subTxt = dark ? "rgba(253,247,236,0.7)" : "rgba(22,97,62,0.72)";

  const designated = [
    { tag: "PROJECTS", title: "Projects", desc: "Special ministry projects and outreaches", acc: "9740306138", icon: <Activity size={24} />, color: T.green },
    { tag: "OFFERING & TITHES", title: "Offering & Tithes", desc: "Church giving and covenant offerings", acc: "9740273528", icon: <Coins size={24} />, color: T.gold },
    { tag: "GODSHUB", title: "goDsHub", desc: "Development of the goDsHub centre", acc: "9740331505", icon: <Zap size={24} />, color: T.coral },
    { tag: "EDUCATION", title: "Education", desc: "Scholarships, books and learning programs", acc: "9740287365", icon: <BookOpen size={24} />, color: "#1d4ed8" },
    { tag: "FEEDING", title: "Feeding", desc: "Meals and welfare", acc: "9740304361", icon: <Coffee size={24} />, color: "#ea580c" },
  ];

  const trust = [
    { label: "Registered NGO", value: SITE.registrationId },
    { label: "Verified Contacts", value: `${SITE.email} · ${SITE.phone}` },
    { label: "Official Channels", value: "Paystack–Titan accounts + official WhatsApp" },
  ];

  const ctaBtn = (style) => ({
    borderRadius: 999,
    padding: ".95em 1.35em",
    fontWeight: 900,
    fontSize: ".95rem",
    letterSpacing: ".01em",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: ".55rem",
    ...style,
  });

  return (
    <div style={{ minHeight: "100vh", background: bg, color: txt, fontFamily: "'DM Sans',sans-serif", padding: "4.5rem 0", position: "relative", overflowX: "hidden" }}>
      {/* Background glows */}
      <div aria-hidden style={{ position: "absolute", top: "-10%", right: "-10%", width: "60vw", height: "60vw", background: `radial-gradient(circle, ${T.gold}18 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "60vw", height: "60vw", background: `radial-gradient(circle, ${T.green}12 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: "74rem", margin: "0 auto", padding: "0 clamp(1.25rem,5vw,3rem)", position: "relative", zIndex: 1 }}>
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", marginBottom: "1.25rem" }}>
          <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: subTxt }}>
            Give · Donate · Support
          </div>
          <Link to="/" style={{ color: dark ? "rgba(253,247,236,.8)" : T.p2, textDecoration: "none", fontWeight: 800, fontSize: ".85rem" }}>
            ← Back to home
          </Link>
        </div>

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2.6rem,6.5vw,4.8rem)", fontWeight: 900, lineHeight: 1.03, letterSpacing: "-0.035em", marginBottom: "1rem" }}>
            Invest in Nigeria’s next<br />
            <em style={{ fontStyle: "italic", color: T.goldL }}>Nation Builders.</em>
          </h1>
          <p style={{ fontSize: "clamp(1rem,2.1vw,1.15rem)", color: subTxt, maxWidth: "72ch", margin: "0 auto", lineHeight: 1.8 }}>
            Your gift funds programmes that form character, build skills, and raise children and teenagers who can solve real problems and build Nigeria.
          </p>

          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
            <a
              href="#bank"
              onClick={() => trackEvent("donate_click", { method: "bank_transfer", placement: "hero_primary" })}
              style={ctaBtn({ background: T.gold, color: "#fff", boxShadow: `0 10px 30px ${T.gold}22` })}
            >
              <CreditCard size={18} /> Bank transfer (Nigeria)
            </a>
            <a
              href={PAYSTACK_GIVE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("donate_click", { method: "paystack", placement: "hero_secondary" })}
              style={ctaBtn({ border: `1.5px solid ${dark ? "rgba(253,247,236,.28)" : "rgba(22,97,62,.22)"}`, color: dark ? T.cream : T.greenD, background: "transparent" })}
            >
              <Globe size={18} /> Give online (Paystack)
            </a>
            <a
              href={`${SITE.socials.whatsappChat}?text=Hello%20KidsInspiring%20Nation%2C%20I%20want%20to%20give%20support.`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("donate_click", { method: "whatsapp", placement: "hero_help" })}
              style={ctaBtn({ border: `1.5px solid rgba(37,211,102,.35)`, color: "#25D366", background: "rgba(37,211,102,.06)" })}
            >
              <MessageCircle size={18} /> Need help giving?
            </a>
          </div>
        </motion.div>

        {/* Trust row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))", gap: "1rem", marginBottom: "2.75rem" }}>
          {trust.map((t) => (
            <div key={t.label} style={{ background: cardBg, borderRadius: 18, border: `1px solid ${brd}`, padding: "1.1rem 1.1rem", display: "flex", alignItems: "flex-start", gap: ".8rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, display: "grid", placeItems: "center", background: `${T.green}12`, color: dark ? T.goldL : T.green }}>
                <ShieldCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: ".78rem", letterSpacing: ".12em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3, fontWeight: 800 }}>{t.label}</div>
                <div style={{ marginTop: ".25rem", color: subTxt, lineHeight: 1.6, fontWeight: 650 }}>{t.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Online options */}
        <div id="online" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 28rem), 1fr))", gap: "1.25rem", marginBottom: "2.5rem" }}>
          <motion.a
            href={PAYSTACK_GIVE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("donate_click", { method: "paystack", placement: "cards" })}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: cardBg, borderRadius: 24, padding: "2rem", border: `1px solid ${brd}`, display: "flex", alignItems: "center", gap: "1.25rem", textDecoration: "none", color: "inherit" }}
          >
            <div style={{ width: 60, height: 60, borderRadius: 18, background: `${T.gold}15`, display: "grid", placeItems: "center", color: T.gold, flexShrink: 0 }}>
              <Globe size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: ".2rem" }}>Give Online</div>
              <div style={{ color: subTxt, lineHeight: 1.6 }}>Safe and secure via Paystack.</div>
            </div>
            <ExternalLink size={20} style={{ opacity: 0.35 }} />
          </motion.a>

          <motion.a
            href={PAYSTACK_STOREFRONT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("donate_click", { method: "storefront", placement: "cards" })}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ background: cardBg, borderRadius: 24, padding: "2rem", border: `1px solid ${brd}`, display: "flex", alignItems: "center", gap: "1.25rem", textDecoration: "none", color: "inherit" }}
          >
            <div style={{ width: 60, height: 60, borderRadius: 18, background: `${T.green}15`, display: "grid", placeItems: "center", color: T.green, flexShrink: 0 }}>
              <ShoppingBag size={28} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "1.25rem", fontWeight: 900, marginBottom: ".2rem" }}>Official Storefront</div>
              <div style={{ color: subTxt, lineHeight: 1.6 }}>Support through our official Paystack storefront.</div>
            </div>
            <ExternalLink size={20} style={{ opacity: 0.35 }} />
          </motion.a>
        </div>

        {/* Bank transfer (primary for many donors) */}
        <div id="bank" style={{ marginBottom: "3.25rem" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3, marginBottom: ".75rem" }}>
              Bank transfer
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 900, marginBottom: ".75rem" }}>
              Official Account Details
            </h2>
            <p style={{ color: subTxt, maxWidth: "70ch", margin: "0 auto", lineHeight: 1.75 }}>
              Use this for general giving. If you want to designate your gift (Education, Feeding, Projects), use the accounts below.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: dark ? "linear-gradient(135deg, #112D1C 0%, #0D3D26 100%)" : "linear-gradient(135deg, #16613E 0%, #0D3D26 100%)", borderRadius: 32, padding: "2.25rem", color: "#fff", position: "relative", overflow: "hidden", boxShadow: "0 20px 50px rgba(13, 61, 38, 0.25)" }}>
            <div aria-hidden style={{ position: "absolute", top: "-2rem", right: "-2rem", opacity: 0.1 }}>
              <CreditCard size={200} />
            </div>
            <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", background: "rgba(255,255,255,0.1)", padding: "0.5rem 1rem", borderRadius: "99px", fontSize: "0.8rem", fontWeight: 700, width: "fit-content" }}>
                <Zap size={14} style={{ color: T.goldL }} /> Main Ministry Account
              </div>

              <div>
                <div style={{ opacity: 0.75, fontSize: ".78rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".35rem" }}>Account Name</div>
                <div style={{ fontSize: "1.35rem", fontWeight: 900 }}>{DONATION_DETAILS.primaryAccountName}</div>
              </div>

              <div>
                <div style={{ opacity: 0.75, fontSize: ".78rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".35rem" }}>Bank</div>
                <div style={{ fontSize: "1.1rem", fontWeight: 950, letterSpacing: ".02em" }}>{DONATION_DETAILS.primaryBankName}</div>
              </div>

              <div>
                <div style={{ opacity: 0.75, fontSize: ".78rem", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".35rem" }}>Account Number</div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ fontSize: "2.1rem", fontWeight: 900, fontFamily: "'DM Mono',monospace", letterSpacing: "0.05em" }}>{DONATION_DETAILS.primaryAccountNumber}</div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(DONATION_DETAILS.primaryAccountNumber, "main_account")}
                    style={{ width: 46, height: 46, borderRadius: 14, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.18)", display: "grid", placeItems: "center", cursor: "pointer" }}
                    aria-label="Copy account number"
                  >
                    {copied === "main_account" ? <Check size={20} style={{ color: T.goldL }} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: ".25rem" }}>
                <a
                  href={`${SITE.socials.whatsappChat}?text=Hello%20KidsInspiring%20Nation%2C%20I%20just%20sent%20a%20bank%20transfer%20donation.%20Please%20confirm%20receipt.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("donate_click", { method: "whatsapp_confirm", placement: "bank_card" })}
                  style={{ ...ctaBtn({ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)" }), fontSize: ".9rem" }}
                >
                  <MessageCircle size={18} /> Confirm via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Designated giving */}
        <div style={{ marginBottom: "3.25rem" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3, marginBottom: ".75rem" }}>
              Designated giving
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 900, marginBottom: ".75rem" }}>
              Choose a Focus
            </h2>
            <p style={{ color: subTxt, maxWidth: "72ch", margin: "0 auto", lineHeight: 1.75 }}>
              If you want your gift to go to a specific area, use one of the official designated accounts below (Paystack–Titan).
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", gap: "1.25rem" }}>
            {designated.map((acc) => (
              <motion.div
                key={acc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                style={{ background: cardBg, borderRadius: 24, padding: "1.6rem", border: `1px solid ${brd}`, position: "relative", overflow: "hidden" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: `${acc.color}15`, color: acc.color, display: "grid", placeItems: "center" }}>
                    {acc.icon}
                  </div>
                  <div style={{ fontSize: ".65rem", fontWeight: 900, letterSpacing: ".1em", color: subTxt, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", padding: "0.3rem 0.6rem", borderRadius: "6px" }}>
                    PAYSTACK-TITAN | {acc.tag}
                  </div>
                </div>

                <div style={{ marginTop: "1rem" }}>
                  <div style={{ fontSize: "1.15rem", fontWeight: 900, marginBottom: ".35rem" }}>{acc.title}</div>
                  <div style={{ color: subTxt, lineHeight: 1.6, minHeight: "2.6rem" }}>{acc.desc}</div>
                </div>

                <div style={{ marginTop: "1rem", background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".75rem", border: `1px dashed ${brd}` }}>
                  <div style={{ fontFamily: "'DM Mono',monospace", fontSize: "1.05rem", fontWeight: 900, letterSpacing: "0.04em" }}>
                    {acc.acc}
                  </div>
                  <button type="button" onClick={() => copyToClipboard(acc.acc, `designated_${acc.tag}`)} style={{ color: copied === `designated_${acc.tag}` ? T.ok : subTxt, cursor: "pointer", display: "grid", placeItems: "center", background: "transparent", border: "none" }} aria-label={`Copy ${acc.title} account number`}>
                    {copied === `designated_${acc.tag}` ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* International / in-kind */}
        <div style={{ marginBottom: "3.25rem" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3, marginBottom: ".75rem" }}>
              International + in-kind
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 900, marginBottom: ".75rem" }}>
              Other Ways to Support
            </h2>
            <p style={{ color: subTxt, maxWidth: "72ch", margin: "0 auto", lineHeight: 1.75 }}>
              If you want to give in USD or send items (books, materials), use the official WhatsApp line and our physical hub.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 25rem), 1fr))", gap: "1.25rem" }}>
            <div style={{ background: cardBg, borderRadius: 24, padding: "2rem", border: `1px solid ${brd}`, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${T.gold}15`, color: T.gold, display: "grid", placeItems: "center" }}>
                <Globe size={24} />
              </div>
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: 900, marginBottom: ".35rem" }}>Dollar Giving</div>
                <div style={{ color: subTxt, lineHeight: 1.7 }}>Message us for USD account details using the official WhatsApp number.</div>
              </div>
              <a
                href={`${SITE.socials.whatsappChat}?text=Hello%20KidsInspiring%20Nation%2C%20please%20share%20your%20USD%20donation%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("donate_click", { method: "usd_request", placement: "other_methods" })}
                style={{ ...ctaBtn({ background: "#25D366", color: "#fff", borderRadius: 14, justifyContent: "center", padding: ".9em 1.1em" }), width: "fit-content" }}
              >
                <MessageCircle size={18} /> Request USD details
              </a>
            </div>

            <div style={{ background: cardBg, borderRadius: 24, padding: "2rem", border: `1px solid ${brd}`, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: `${T.green}15`, color: T.green, display: "grid", placeItems: "center" }}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: 900, marginBottom: ".35rem" }}>Physical Giving</div>
                <div style={{ color: subTxt, lineHeight: 1.7 }}>Donations in-kind (books, materials) can be sent to our hub.</div>
              </div>
              <div style={{ background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", padding: "1rem", borderRadius: 12, color: txt, border: `1px dashed ${brd}`, lineHeight: 1.6 }}>
                {SITE.officeAddress.replace(", Ota, Nigeria.", "")},<br />
                Ota, Nigeria.<br />
                <span style={{ fontSize: ".9rem", color: subTxt, fontWeight: 700 }}>{SITE.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: "2.5rem" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", letterSpacing: ".16em", textTransform: "uppercase", color: dark ? "rgba(253,247,236,.55)" : T.p3, marginBottom: ".75rem" }}>
              FAQ
            </div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 900, marginBottom: ".75rem" }}>
              Donation Questions
            </h2>
          </motion.div>

          <div style={{ background: cardBg, borderRadius: 24, padding: "1.75rem", border: `1px solid ${brd}` }}>
            {[
              { q: "How do I know these are the official details?", a: `These accounts are listed on the official ${SITE.name} website and are Paystack–Titan channels. If unsure, confirm with us via the official WhatsApp number (${SITE.phone}) before transferring.` },
              { q: "Can I designate my donation?", a: "Yes. Use the designated accounts (Education, Feeding, Projects, goDsHub, etc.) to support a specific focus." },
              { q: "Do you confirm receipt?", a: "Yes. After a bank transfer, message us on WhatsApp to confirm, especially for large gifts." },
              { q: "Can I support monthly?", a: "Yes. Start by giving online, then message us on WhatsApp and we’ll help you set up a consistent monthly giving plan." },
            ].map((f, idx) => (
              <div key={f.q} style={{ padding: idx === 0 ? "0 0 1.1rem" : "1.1rem 0", borderTop: idx === 0 ? "none" : `1px solid ${brd}` }}>
                <div style={{ fontWeight: 950, marginBottom: ".35rem" }}>{f.q}</div>
                <div style={{ color: subTxt, lineHeight: 1.75 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Close-out */}
        <div style={{ textAlign: "center", padding: "2.25rem 0 1.25rem", borderTop: `1px solid ${brd}` }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.35rem", fontWeight: 900, marginBottom: ".5rem" }}>
            Thank you for building Nigeria with us.
          </div>
          <div style={{ color: subTxt, lineHeight: 1.7, maxWidth: "70ch", margin: "0 auto 1.25rem" }}>
            For partnership or sponsorship enquiries, reach us via the official contact page.
          </div>
          <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact?subject=donate" style={ctaBtn({ background: dark ? "rgba(255,255,255,0.06)" : "rgba(22,97,62,0.06)", border: `1px solid ${brd}`, color: txt })}>
              Contact the team
            </Link>
            <a href={PAYSTACK_GIVE} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("donate_click", { method: "paystack", placement: "footer_cta" })} style={ctaBtn({ background: T.gold, color: "#fff" })}>
              Give now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
