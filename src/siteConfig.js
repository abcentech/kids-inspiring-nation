export const T = {
  green: "#0B2A1B",
  greenD: "#05140D",
  greenM: "#1D3A2C",
  gold: "#C5A037",
  goldL: "#E6C98F",
  goldD: "#8A6B25",
  coral: "#D94F30",
  cream: "#FAF9F6",
  warmBg: "#F5F2EA",
  bg: "#FAF9F6",
  surf: "#FFFFFF",
  brd: "rgba(11, 42, 27, 0.05)",
  p1: "#0B2A1B",
  p2: "#3D4F46",
  p3: "#8A9991",
  bgD: "#050806",
  srfD: "#0D110F",
  brdD: "rgba(197, 160, 55, 0.08)",
  d1: "#FAF9F6",
  d2: "#A5B2AA",
  d3: "#45504A",
  ok: "#2D9E53",
  warn: "#C5A037",
  err: "#D94F30",
  info: "#0071E3",
  kindC: "#0B2A1B",
  kingsC: "#7B2D8B",
  dfC: "#C5A037",
  gdxC: "#E6C98F",
  p119C: "#0071E3",
  faceC: "#D94F30",
  tjcC: "#8B4513",
  cstC: "#27AE60",
  htmlDark: "#080D1E",
  htmlDark2: "#0D1530",
  htmlDark3: "#111A35",
  htmlCard: "#161F35",
  htmlCard2: "#1B2840",
  htmlCard3: "#20304A",
  htmlText: "#F0F4FF",
  htmlText2: "#94A3B8",
  htmlText3: "#4A6080",
};

export const SITE = {
  name: "KidsInspiring Nation",
  legalName: "goDs Global KidsInspiring",
  tagline: "Raising goDs, Building Nations",
  registrationId: "IT No. 6980735",
  establishedYear: 2022,
  foundedYears: "2017/2018",
  infoAsAtYear: 2025,
  siteUrl: "https://kidsinspiringnation.org",
  email: "KidsinspiringNation@gmail.com",
  operationsEmail: "KidsInspiringOperations@gmail.com",
  phone: "+234 812 267 3417",
  officeAddress: "goDshub 0.1, Oremetta, Ota, Nigeria.",
  socials: {
    whatsappChannel: "https://whatsapp.com/channel/0029Va8XnCuGE56c4SMaT41w",
    whatsappChat: "https://wa.me/2348122673417",
    telegram: "https://t.me/KidsInspiringNation",
    youtube: "https://youtube.com/@KidsInspiringNation",
    instagram: "https://instagram.com/KidsInspiringNation",
    linktree: "https://linktr.ee/KidsInspiringNation",
  },
};

export const DONATION_DETAILS = {
  primaryAccountName: "Gods Global KidsInspiring",
  primaryBankName: "TITAN TRUST BANK",
  primaryAccountNumber: "0000724671",
};

export const CONTACT_SUBJECTS = [
  { value: "join", label: "Join a Programme", icon: "👑" },
  { value: "child", label: "Register a Child", icon: "🌱" },
  { value: "donate", label: "Give / Donate", icon: "💛" },
  { value: "partner", label: "Partner / Collaborate", icon: "🤝" },
  { value: "volunteer", label: "Volunteer (CST)", icon: "🕊️" },
  { value: "media", label: "Media / Press", icon: "🎥" },
  { value: "general", label: "General Enquiry", icon: "💬" },
];

export const SOCIAL_LINKS = [
  {
    key: "whatsapp-channel",
    label: "WhatsApp Channel",
    href: SITE.socials.whatsappChannel,
    color: "#25D366",
    bg: "rgba(37,211,102,.1)",
  },
  {
    key: "telegram",
    label: "Telegram",
    href: SITE.socials.telegram,
    color: "#0088CC",
    bg: "rgba(0,136,204,.1)",
  },
  {
    key: "youtube",
    label: "YouTube",
    href: SITE.socials.youtube,
    color: "#FF0000",
    bg: "rgba(255,0,0,.08)",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: SITE.socials.instagram,
    color: "#E4405F",
    bg: "rgba(228,64,95,.1)",
  },
  {
    key: "linktree",
    label: "Linktree",
    href: SITE.socials.linktree,
    color: T.gold,
    bg: "rgba(196,136,44,.1)",
  },
];

export const ROUTE_META = {
  home: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "KidsInspiring Nation is a Nigerian NGO raising Geniuses with Divine Purpose through character, service, faith, and nation building.",
    canonicalPath: "/",
    image: "/logo.png",
  },
  kidsInspiring: {
    title: `Kids Inspiring Nigeria — ${SITE.name}`,
    description:
      "KidsInspiring Nation is the Kids Inspiring movement raising children and teenagers to build Nigeria through character, service, skills, and faith.",
    canonicalPath: "/kids-inspiring",
    image: "/photos/KINevents.jpg",
  },
  investingInKids: {
    title: `Investing In Kids In Nigeria — ${SITE.name}`,
    description:
      "A practical case for investing in kids: how KidsInspiring Nation builds values, skills, service, and nation builders across Nigeria.",
    canonicalPath: "/investing-in-kids",
    image: "/photos/Community_impact.jpg",
  },
  nationBuilders: {
    title: `Nation Builders Corp (NBC Origin Story) — ${SITE.name}`,
    description:
      "The Nation Building arm of KidsInspiring Nation: how Psalm 119 grew from rewarding academic rigour into Nation Builders Corp and community impact.",
    canonicalPath: "/nation-builders",
    image: "/photos/Nation_Builders_Program.jpg",
  },
  daily: {
    title: `Daily Streak — ${SITE.name}`,
    description: "A 60-second daily prompt to build a Nation Builder streak: integrity, service, discipline, excellence.",
    canonicalPath: "/daily",
    image: "/logo.png",
  },
  about: {
    title: `About — ${SITE.name}`,
    description: "Read the story, milestones, and long-term vision behind KidsInspiring Nation.",
    canonicalPath: "/about",
    image: "/photos/KIN_programs.jpg",
  },
  give: {
    title: `Give — ${SITE.name}`,
    description: "Give to KidsInspiring Nation and fund programmes raising children to build Nigeria.",
    canonicalPath: "/give",
    image: "/logo.png",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: `Give — ${SITE.name}`,
        description: "Donation page for KidsInspiring Nation.",
        url: "https://kidsinspiringnation.org/give",
      },
      {
        "@context": "https://schema.org",
        "@type": "NGO",
        name: SITE.name,
        alternateName: SITE.legalName,
        url: SITE.siteUrl,
        email: SITE.email,
        telephone: SITE.phone,
        identifier: SITE.registrationId,
        sameAs: Object.values(SITE.socials),
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "How can I donate to KidsInspiring Nation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can give online via Paystack or give by bank transfer to the official Paystack–Titan accounts listed on this page.",
            },
          },
          {
            "@type": "Question",
            name: "Can I give to a specific focus (education, feeding, projects)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Use the designated accounts on the Give page to support specific areas such as Education, Feeding, Projects, or goDsHub development.",
            },
          },
          {
            "@type": "Question",
            name: "How do I verify the donation details?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Use only the official KidsInspiring Nation site and channels listed on this page. If unsure, contact us via the official WhatsApp number before transferring.",
            },
          },
        ],
      },
    ],
  },
  faq: {
    title: `FAQ — ${SITE.name}`,
    description: "Answers to common questions about KidsInspiring Nation: giving, programmes, participation, and partnerships.",
    canonicalPath: "/faq",
    image: "/logo.png",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How can I donate to KidsInspiring Nation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can give by bank transfer or give online via Paystack on the official Give page."
          }
        },
        {
          "@type": "Question",
          name: "What is the official bank for giving?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our main giving bank is TITAN TRUST BANK, with designated Paystack–Titan channels listed on the Give page."
          }
        },
        {
          "@type": "Question",
          name: "How do I verify donation details to avoid scams?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Only trust details published on kidsinspiringnation.org and the official KidsInspiring Nation channels. If unsure, confirm by official WhatsApp before sending funds."
          }
        },
        {
          "@type": "Question",
          name: "What does KidsInspiring Nation do?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "KidsInspiring Nation raises children and teenagers through character, service, skills, and spiritual formation programmes."
          }
        },
        {
          "@type": "Question",
          name: "Where can I read your verification and transparency rules?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Visit the Transparency page for official verification guidance and donor trust information."
          }
        }
      ]
    },
  },
  transparency: {
    title: `Transparency — ${SITE.name}`,
    description: "How KidsInspiring Nation verifies official channels and handles donor trust and accountability.",
    canonicalPath: "/transparency",
    image: "/logo.png",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Transparency — ${SITE.name}`,
      description: "Donor trust and verification information for KidsInspiring Nation.",
      url: "https://kidsinspiringnation.org/transparency",
    },
  },
  privacy: {
    title: `Privacy Policy — ${SITE.name}`,
    description: "How KidsInspiring Nation handles contact information, cookies, analytics, submissions, and donor privacy.",
    canonicalPath: "/privacy",
    image: "/logo.png",
  },
  contact: {
    title: `Contact — ${SITE.name}`,
    description: "Get in touch with KidsInspiring Nation for programmes, partnerships, giving, or volunteer opportunities.",
    canonicalPath: "/contact",
    image: "/logo.png",
  },
  gallery: {
    title: `Gallery — ${SITE.name}`,
    description: "Explore photos and memories from KidsInspiring Nation programmes and events.",
    canonicalPath: "/gallery",
    image: "/photos/KINevents.jpg",
  },
  nbc: {
    title: `National Builders Challenge — ${SITE.name}`,
    description: "Join the National Builders Challenge and help build the Nigeria you want to see.",
    canonicalPath: "/NBC",
    image: "/photos/NBC_Main_og.jpg",
  },
  nbcRegister: {
    title: `NBC Registration — ${SITE.name}`,
    description: "Register for the National Builders Challenge and submit your project idea.",
    canonicalPath: "/NBC/register",
    image: "/photos/Join_the_NBC_challenge.jpg",
  },
  godsUniversity: {
    title: `goDs University — ${SITE.name}`,
    description: "goDs University: choose the Spirit pathway (44-week Bible curriculum, gPA scoring, Parent Portal) or the Skills pathway (Academic Mentoring — ₦7,000/month, weekly sessions, monthly reports, Grades 1–16). Raising the whole child.",
    canonicalPath: "/gU",
    image: "/photos/Community_impact.jpg",
  },
  fallback: {
    title: `Page Not Found — ${SITE.name}`,
    description: "The page you are looking for could not be found.",
    canonicalPath: "/404",
    image: "/logo.png",
    robots: "noindex, nofollow",
  },
};
