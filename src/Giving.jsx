import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowLeft, 
  CreditCard, 
  Globe, 
  ShoppingBag,
  Zap,
  BookOpen,
  Coffee,
  Coins,
  Activity
} from "lucide-react";

// Design Tokens (Matching App.jsx)
const T = {
  green: "#16613E", greenD: "#0D3D26", greenM: "#2C4A35",
  gold: "#C4882C", goldL: "#E8B954", goldD: "#9A6620",
  coral: "#D94F30", cream: "#FDF7EC", warmBg: "#F5EFE3",
};

export default function Giving({ dark }) {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const containerVars = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const bg = dark ? "#050505" : "#FAFAF5";
  const cardBg = dark ? "rgba(28,28,30,0.6)" : "rgba(255,255,255,0.8)";
  const brd = dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)";
  const txt = dark ? T.cream : T.greenD;
  const subTxt = dark ? "rgba(253,247,236,0.6)" : "rgba(22,97,62,0.7)";

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: bg, 
      color: txt, 
      fontFamily: "'DM Sans', sans-serif",
      padding: "4rem 0",
      position: "relative",
      overflowX: "hidden"
    }}>
      {/* Background Glows */}
      <div style={{
        position: "absolute",
        top: "-10%",
        right: "-10%",
        width: "60vw",
        height: "60vw",
        background: `radial-gradient(circle, ${T.gold}15 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 0
      }} />
      <div style={{
        position: "absolute",
        bottom: "-10%",
        left: "-10%",
        width: "60vw",
        height: "60vw",
        background: `radial-gradient(circle, ${T.green}10 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1 }}>
        {/* Hero Section */}
        <motion.div 
          initial="initial"
          animate="animate"
          variants={containerVars}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <motion.div variants={itemVars} style={{ 
            fontSize: "0.85rem", 
            fontWeight: 800, 
            letterSpacing: "0.15em", 
            textTransform: "uppercase", 
            color: T.gold,
            marginBottom: "1.5rem"
          }}>
            Giving Channels
          </motion.div>
          
          <motion.h1 variants={itemVars} style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)", 
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "2rem"
          }}>
            To every <em style={{ fontStyle: "italic", color: T.goldL }}>Covenant Giver</em><br />in this Nation
          </motion.h1>

          <motion.div variants={itemVars} style={{
            maxWidth: "36rem",
            margin: "0 auto",
            padding: "2rem",
            borderRadius: "24px",
            background: `${T.gold}08`,
            border: `1px solid ${T.gold}20`,
            backdropFilter: "blur(12px)"
          }}>
            <p style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "1.25rem", 
              fontStyle: "italic",
              lineHeight: 1.6,
              color: dark ? T.goldL : T.goldD,
              marginBottom: "1rem"
            }}>
              “but he that soweth to the Spirit shall of the Spirit reap life everlasting.”
            </p>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.05em", color: T.gold }}>
              Galatians 6:8 KJV
            </div>
          </motion.div>
          
          <motion.p variants={itemVars} style={{ 
            marginTop: "2.5rem", 
            fontSize: "1.1rem", 
            color: subTxt,
            maxWidth: "32rem",
            margin: "2.5rem auto 0"
          }}>
            As you sow, your desires and expectations are returned in Jesus' Name.
          </motion.p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 30rem), 1fr))", gap: "2rem", marginBottom: "4rem" }}>
          {/* Main Ministry Account */}
          <motion.div 
            variants={itemVars}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            style={{
              background: dark ? "linear-gradient(135deg, #112D1C 0%, #0D3D26 100%)" : "linear-gradient(135deg, #16613E 0%, #0D3D26 100%)",
              borderRadius: "32px",
              padding: "3rem",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(13, 61, 38, 0.3)"
            }}
          >
            <div style={{ position: "absolute", top: "-2rem", right: "-2rem", opacity: 0.1 }}>
              <CreditCard size={200} />
            </div>
            
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "0.6rem", 
                background: "rgba(255,255,255,0.1)", 
                padding: "0.5rem 1rem", 
                borderRadius: "99px",
                fontSize: "0.8rem",
                fontWeight: 600,
                marginBottom: "2rem"
              }}>
                <Zap size={14} style={{ color: T.goldL }} /> Main Ministry Account
              </div>
              
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", marginBottom: "0.5rem" }}>Gods Global KidsInspiring</h2>
              <p style={{ opacity: 0.7, fontSize: "0.9rem", marginBottom: "2.5rem" }}>For all general giving</p>
              
              <div style={{ display: "grid", gap: "1.5rem" }}>
                <div>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: "0.4rem" }}>Bank</div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>Titan Trust Bank</div>
                </div>
                
                <div>
                  <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.6, marginBottom: "0.4rem" }}>Account Number</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ fontSize: "2.2rem", fontWeight: 800, fontFamily: "'DM Mono', monospace", letterSpacing: "0.05em" }}>0000724671</div>
                    <button 
                      onClick={() => copyToClipboard("0000724671", "main")}
                      style={{ 
                        width: "44px", 
                        height: "44px", 
                        borderRadius: "12px", 
                        background: "rgba(255,255,255,0.15)", 
                        display: "grid", 
                        placeItems: "center",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
                      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                    >
                      {copied === "main" ? <Check size={20} style={{ color: T.goldL }} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Online Links */}
          <div style={{ display: "grid", gap: "1.5rem" }}>
            <motion.a 
              href="https://paystack.shop/pay/kin"
              target="_blank"
              rel="noopener"
              variants={itemVars}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              style={{
                background: cardBg,
                borderRadius: "24px",
                padding: "2rem",
                border: `1px solid ${brd}`,
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
              }}
              whileHover={{ y: -5, borderColor: T.gold, boxShadow: "0 10px 30px rgba(196, 136, 44, 0.1)" }}
            >
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "18px", 
                background: `${T.gold}15`, 
                display: "grid", 
                placeItems: "center",
                color: T.gold,
                flexShrink: 0
              }}>
                <Globe size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.2rem" }}>Online Giving</h3>
                <p style={{ fontSize: "0.9rem", color: subTxt }}>Safe & secure via Paystack</p>
              </div>
              <ExternalLink size={20} style={{ opacity: 0.3 }} />
            </motion.a>

            <motion.a 
              href="https://paystack.shop/kidsinspiring"
              target="_blank"
              rel="noopener"
              variants={itemVars}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              style={{
                background: cardBg,
                borderRadius: "24px",
                padding: "2rem",
                border: `1px solid ${brd}`,
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                textDecoration: "none",
                color: "inherit",
                transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)"
              }}
              whileHover={{ y: -5, borderColor: T.gold, boxShadow: "0 10px 30px rgba(196, 136, 44, 0.1)" }}
            >
              <div style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "18px", 
                background: `${T.green}15`, 
                display: "grid", 
                placeItems: "center",
                color: T.green,
                flexShrink: 0
              }}>
                <ShoppingBag size={28} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.2rem" }}>Official Storefront</h3>
                <p style={{ fontSize: "0.9rem", color: subTxt }}>Support through our store</p>
              </div>
              <ExternalLink size={20} style={{ opacity: 0.3 }} />
            </motion.a>
          </div>
        </div>

        {/* Designated Accounts Section */}
        <div style={{ marginBottom: "6rem" }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", marginBottom: "1rem" }}>Designated Accounts</h2>
            <p style={{ color: subTxt, maxWidth: "34rem", margin: "0 auto" }}>
              All designated KidsInspiring Nation accounts are Paystack–Titan accounts.
            </p>
          </motion.div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 20rem), 1fr))", 
            gap: "1.25rem" 
          }}>
            {[
              { 
                tag: "PROJECTS", 
                title: "Projects", 
                desc: "Special ministry projects and outreaches", 
                acc: "9740306138", 
                icon: <Activity size={24} />,
                color: T.green
              },
              { 
                tag: "OFFERING & TITHES", 
                title: "Offering & Tithes", 
                desc: "Church giving and covenant offerings", 
                acc: "9740273528", 
                icon: <Coins size={24} />,
                color: T.gold
              },
              { 
                tag: "GODSHUB", 
                title: "goDsHub", 
                desc: "Development of the goDsHub centre", 
                acc: "9740331505", 
                icon: <Zap size={24} />,
                color: T.coral
              },
              { 
                tag: "EDUCATION", 
                title: "Education", 
                desc: "Scholarships, books and learning programs", 
                acc: "9740287365", 
                icon: <BookOpen size={24} />,
                color: "#1d4ed8" // Blue
              },
              { 
                tag: "FEEDING", 
                title: "Feeding", 
                desc: "Meals and Welfare", 
                acc: "9740304361", 
                icon: <Coffee size={24} />,
                color: "#ea580c" // Orange
              },
            ].map((acc, idx) => (
              <motion.div
                key={acc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                style={{
                  background: cardBg,
                  borderRadius: "24px",
                  padding: "1.75rem",
                  border: `1px solid ${brd}`,
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem"
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ 
                    width: "48px", 
                    height: "48px", 
                    borderRadius: "14px", 
                    background: `${acc.color}15`, 
                    color: acc.color,
                    display: "grid",
                    placeItems: "center"
                  }}>
                    {acc.icon}
                  </div>
                  <div style={{ 
                    fontSize: "0.65rem", 
                    fontWeight: 800, 
                    letterSpacing: "0.1em", 
                    color: subTxt,
                    background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "6px"
                  }}>
                    {acc.tag}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.4rem" }}>{acc.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: subTxt, lineHeight: 1.5, minHeight: "2.6rem" }}>{acc.desc}</p>
                </div>

                <div style={{ 
                  background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", 
                  padding: "1rem", 
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em" }}>
                    {acc.acc}
                  </div>
                  <button 
                    onClick={() => copyToClipboard(acc.acc, acc.title)}
                    style={{ 
                      color: copied === acc.title ? T.green : subTxt,
                      cursor: "pointer",
                      display: "grid",
                      placeItems: "center",
                      transition: "color 0.2s"
                    }}
                  >
                    {copied === acc.title ? <Check size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", borderTop: `1px solid ${brd}`, paddingTop: "4rem", paddingBottom: "2rem" }}
        >
          <p style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "2rem" }}>
            Thank you for partnering with Jesus Christ to raise children for God and for the nations.
          </p>
          
          <div style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: "1.5rem", 
            fontWeight: 800, 
            fontStyle: "italic",
            color: T.gold,
            marginBottom: "3rem"
          }}>
            #JesusChristisOurJoy
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
            <div style={{ fontSize: "1.25rem", fontWeight: 800, letterSpacing: "0.05em", color: txt }}>
              KidsInspiringNation
            </div>
            <a href="mailto:KidsInspiringOperations@gmail.com" style={{ 
              fontSize: "0.9rem", 
              color: T.gold, 
              textDecoration: "none", 
              display: "flex", 
              alignItems: "center", 
              gap: "0.5rem",
              fontWeight: 500
            }}>
              KidsInspiringOperations@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
