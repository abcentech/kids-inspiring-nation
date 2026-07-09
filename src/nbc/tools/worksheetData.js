// Builder Tools — the 5 NBC PDFs rebuilt as interactive, fillable, on-site tools.
// Content is drawn faithfully from the original workbooks so nothing is lost;
// every field autosaves to localStorage and each tool can be exported/printed.
//
// Tool shape:
//   { slug, title, emoji, tagline, pdf?, accent,
//     steps: [ { heading, note?, fields: [Field], chart?: Chart, checklist?: [..] } ],
//     summary?: { heading, computed: [{ label, formula }] } }
// Field: { id, label, type: text|longtext|number|date|select|slider, hint?, options?, min?, max?, unit?, prefix? }
// Chart: { kind: "bar"|"radar", title, caption?, data: [{name,value}], source: "static"|"fields", angle? }

export const TOOLS = [
  /* ─────────────────────────── VALUES ─────────────────────────── */
  {
    slug: "values-commitment",
    title: "My Values Commitment",
    emoji: "⚖️",
    tagline: "Rate yourself on the 8 core values, choose your top 3, and sign your pledge.",
    pdf: "Values Training Workbook.pdf",
    accent: "#C5A037",
    steps: [
      {
        heading: "Rate yourself today",
        note: "Be honest — this is your starting line, not your final score. You'll see your values as a shape.",
        fields: [
          { id: "v_integrity", label: "Integrity — doing right when no one watches", type: "slider", min: 1, max: 5 },
          { id: "v_discipline", label: "Discipline — showing up consistently", type: "slider", min: 1, max: 5 },
          { id: "v_wisdom", label: "Wisdom — choosing the right thing at the right time", type: "slider", min: 1, max: 5 },
          { id: "v_service", label: "Service — putting others before yourself", type: "slider", min: 1, max: 5 },
          { id: "v_justice", label: "Justice — treating everyone fairly", type: "slider", min: 1, max: 5 },
          { id: "v_perseverance", label: "Perseverance — continuing when it's hard", type: "slider", min: 1, max: 5 },
          { id: "v_humility", label: "Humility — sharing credit, learning from anyone", type: "slider", min: 1, max: 5 },
          { id: "v_excellence", label: "Excellence — finishing well, no cut corners", type: "slider", min: 1, max: 5 },
        ],
        chart: {
          kind: "radar", title: "Your values today", source: "fields",
          fields: ["v_integrity", "v_discipline", "v_wisdom", "v_service", "v_justice", "v_perseverance", "v_humility", "v_excellence"],
          names: ["Integrity", "Discipline", "Wisdom", "Service", "Justice", "Perseverance", "Humility", "Excellence"],
          caption: "Your strongest values carry your project; your weakest are where character grows this term.",
        },
      },
      {
        heading: "Choose your 3 core values",
        fields: [
          { id: "top1", label: "Core value #1", type: "select", options: ["Integrity", "Discipline", "Wisdom", "Service", "Justice", "Perseverance", "Humility", "Excellence"] },
          { id: "top2", label: "Core value #2", type: "select", options: ["Integrity", "Discipline", "Wisdom", "Service", "Justice", "Perseverance", "Humility", "Excellence"] },
          { id: "top3", label: "Core value #3", type: "select", options: ["Integrity", "Discipline", "Wisdom", "Service", "Justice", "Perseverance", "Humility", "Excellence"] },
          { id: "why_chose", label: "Why did you choose these three?", type: "longtext" },
          { id: "show1", label: "I will show value #1 by…", type: "longtext" },
          { id: "show2", label: "I will show value #2 by…", type: "longtext" },
          { id: "show3", label: "I will show value #3 by…", type: "longtext" },
        ],
      },
      {
        heading: "Your pledge",
        note: "This is your Values Identity Statement — the builder you're choosing to become.",
        fields: [
          { id: "identity", label: "\"I am a Nation Builder. I stand for…\" (your identity statement)", type: "longtext" },
          { id: "pledge_name", label: "Your name", type: "text" },
          { id: "pledge_date", label: "Date", type: "date" },
          { id: "witness", label: "Witness (a mentor, teacher or parent)", type: "text" },
        ],
      },
    ],
  },

  /* ─────────────────────── PROJECT PLANNER ─────────────────────── */
  {
    slug: "project-planner",
    title: "Project Planner",
    emoji: "📋",
    tagline: "Turn a community problem into an implementable, measurable plan — from idea to impact.",
    pdf: "Project Planning Guide.pdf",
    accent: "#2D9E53",
    steps: [
      {
        heading: "1 · Understand the problem",
        fields: [
          { id: "problem", label: "Describe the problem in ONE simple sentence", type: "longtext", hint: "If it doesn't fit in a sentence, it isn't clear yet." },
          { id: "loc_state", label: "State", type: "text" },
          { id: "loc_lga", label: "LGA", type: "text" },
          { id: "loc_community", label: "Community / Town", type: "text" },
          { id: "who_affected", label: "Who has this problem? (age, gender, occupation, how many)", type: "longtext" },
          { id: "root_causes", label: "Root causes (list 3–5)", type: "longtext" },
        ],
      },
      {
        heading: "2 · Design your solution",
        fields: [
          { id: "brainstorm", label: "Brainstorm at least 5 possible solutions", type: "longtext" },
          { id: "chosen", label: "The solution I will implement", type: "longtext" },
          { id: "why_solution", label: "Why did you choose this one?", type: "longtext" },
          { id: "steps_do", label: "Step-by-step, what will you DO?", type: "longtext" },
          { id: "risk", label: "Biggest risk — and how you'll handle it", type: "longtext" },
        ],
        chart: {
          kind: "bar", title: "Score your solution (1–5 each)", source: "static",
          data: [{ name: "Feasibility", value: 4 }, { name: "Effectiveness", value: 5 }, { name: "Sustainability", value: 3 }],
          caption: "A sample score. The best projects are feasible with what you have, effective for real people, and able to last.",
        },
      },
      {
        heading: "3 · Action plan",
        fields: [
          { id: "start", label: "Project start date", type: "date" },
          { id: "end", label: "Project end date", type: "date" },
          { id: "milestone1", label: "Milestone 1 — name, target date, what must be complete", type: "longtext" },
          { id: "milestone2", label: "Milestone 2 — name, target date, what must be complete", type: "longtext" },
          { id: "milestone3", label: "Milestone 3 — name, target date, what must be complete", type: "longtext" },
        ],
      },
      {
        heading: "4 · Map your resources",
        note: "Resourcefulness is scored higher than spending. Build with what's in your hand.",
        fields: [
          { id: "total_cost", label: "Total estimated cost", type: "number", prefix: "₦" },
          { id: "buy", label: "BUY — what, and source of funds", type: "longtext" },
          { id: "donations", label: "DONATIONS — 5 potential donors to approach", type: "longtext" },
          { id: "make", label: "MAKE / BUILD — free or cheap local materials", type: "longtext" },
          { id: "inkind", label: "IN-KIND — services people might volunteer", type: "longtext" },
        ],
      },
      {
        heading: "5 · Measure impact",
        fields: [
          { id: "metric1", label: "Metric 1 — what, how you'll count it, target number", type: "longtext" },
          { id: "metric2", label: "Metric 2 — what, how counted, target", type: "longtext" },
          { id: "metric3", label: "Metric 3 — what, how counted, target", type: "longtext" },
          { id: "baseline", label: "BEFORE (baseline) — what the situation looks like now", type: "longtext" },
          { id: "target_after", label: "AFTER (target) — what success looks like", type: "longtext" },
        ],
      },
      {
        heading: "6 · Build sustainability",
        fields: [
          { id: "continue", label: "Will it continue after the cycle? (Yes / No / Partially) — how?", type: "longtext" },
          { id: "maintainer", label: "Who will maintain it, and what do they need?", type: "longtext" },
          { id: "replicable", label: "Could another community copy it? What would they need?", type: "longtext" },
        ],
        checklist: [
          "I understand the problem and its root causes",
          "I evaluated multiple solutions and chose the best",
          "I have a timeline with monthly milestones",
          "I know how I'll get my materials",
          "I have 3–5 impact metrics with a baseline",
          "I have a plan for after the cycle ends",
        ],
      },
    ],
  },

  /* ────────────────────── MONTHLY IMPACT LOG ───────────────────── */
  {
    slug: "monthly-log",
    title: "Monthly Impact Log",
    emoji: "📊",
    tagline: "Log what you did each month. Judges reward recorded impact — proof beats promises.",
    pdf: "Monthly Progress Tracker.pdf",
    accent: "#0071E3",
    steps: [
      {
        heading: "This month's report",
        note: "Fill one of these each month. Four honest lines beat a scramble at the end.",
        fields: [
          { id: "month", label: "Month", type: "select", options: ["May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April"] },
          { id: "activities", label: "What did you do this month? (activities)", type: "longtext" },
          { id: "worked", label: "What worked well — better than expected, and why?", type: "longtext" },
          { id: "challenge", label: "Biggest challenge (and is it Resolved or Ongoing?)", type: "longtext" },
          { id: "people_helped", label: "How many people did you help this month?", type: "number" },
          { id: "story", label: "One story of someone you helped (with a quote if you can)", type: "longtext" },
          { id: "value_shown", label: "Which value did you show this month? Give an example", type: "longtext" },
          { id: "photos", label: "How many photos/videos did you take as proof?", type: "number" },
          { id: "next_goal", label: "Top goal for next month", type: "longtext" },
        ],
        chart: {
          kind: "bar", title: "People helped — a growing story", source: "static",
          data: [{ name: "May", value: 5 }, { name: "Jun", value: 12 }, { name: "Jul", value: 20 }, { name: "Aug", value: 34 }, { name: "Sep", value: 51 }, { name: "Oct", value: 72 }],
          caption: "A sample 6-month curve. Logging every month turns scattered effort into an undeniable impact story.",
        },
      },
      {
        heading: "6-month summary (fill at the end)",
        fields: [
          { id: "sum_direct", label: "Total people directly helped", type: "number" },
          { id: "sum_indirect", label: "Total people indirectly impacted", type: "number" },
          { id: "sum_hours", label: "Total volunteer hours contributed", type: "number" },
          { id: "sum_spent", label: "Total money spent", type: "number", prefix: "₦" },
          { id: "sum_biggest", label: "Your single biggest win", type: "longtext" },
        ],
      },
    ],
  },

  /* ────────────────────── IMPACT REPORT ────────────────────────── */
  {
    slug: "impact-report",
    title: "Impact Report Builder",
    emoji: "🏆",
    tagline: "Tell the story of what you built — the report judges use to pick finalists for ₦3,000,000.",
    pdf: "Impact Report.pdf",
    accent: "#8A6B25",
    steps: [
      {
        heading: "Basics",
        fields: [
          { id: "r_title", label: "Project title", type: "text" },
          { id: "r_name", label: "Team / individual name", type: "text" },
          { id: "r_age", label: "Team leader age", type: "number" },
          { id: "r_category", label: "Project category", type: "select", options: ["Environment", "Education", "Health", "Character/Community", "Poverty/Economic", "Safety", "Arts/Culture", "Other"] },
          { id: "r_location", label: "Location (State, LGA, community)", type: "text" },
        ],
      },
      {
        heading: "The problem & your solution",
        fields: [
          { id: "r_problem", label: "Describe the problem (what, who was affected, how serious)", type: "longtext" },
          { id: "r_why_matter", label: "Why it mattered — consequences of doing nothing", type: "longtext" },
          { id: "r_solution", label: "What you did (what you built/created/organised)", type: "longtext" },
          { id: "r_innovative", label: "What was creative or innovative about it?", type: "longtext" },
        ],
      },
      {
        heading: "Impact & results",
        note: "Real numbers only. Honesty is scored; exaggeration is disqualifying.",
        fields: [
          { id: "r_direct", label: "People directly helped/served", type: "number" },
          { id: "r_indirect", label: "People indirectly impacted", type: "number" },
          { id: "r_hours", label: "Volunteer hours contributed", type: "number" },
          { id: "r_before", label: "BEFORE — what the situation looked like", type: "longtext" },
          { id: "r_after", label: "AFTER — what changed, with evidence", type: "longtext" },
        ],
      },
      {
        heading: "Financial report",
        note: "Total value counts cash spent + donated goods + volunteer time (₦500/hr). Resourcefulness shows here.",
        fields: [
          { id: "f_income", label: "Total income (₦)", type: "number", prefix: "₦" },
          { id: "f_expenses", label: "Total expenses (₦)", type: "number", prefix: "₦" },
          { id: "f_inkind", label: "Total in-kind value — donated goods + volunteer time (₦)", type: "number", prefix: "₦" },
        ],
        summaryComputed: [
          { label: "Total project value", formula: "value" },
          { label: "Cost per person helped", formula: "costPerPerson" },
        ],
      },
      {
        heading: "Lessons, sustainability & endorsement",
        fields: [
          { id: "r_skills", label: "Five skills you learned or improved", type: "longtext" },
          { id: "r_growth", label: "How the project changed YOU", type: "longtext" },
          { id: "r_sustain", label: "Will it continue? Who will maintain it, and how?", type: "longtext" },
          { id: "r_endorser", label: "Community leader endorsement — name & title", type: "text" },
        ],
        checklist: [
          "Every section is filled and honest (no exaggeration)",
          "I have evidence/photos for my claims",
          "My financial report adds up",
          "A community leader has endorsed it",
        ],
      },
    ],
  },

  /* ─────────────────────── MEETING AGENDA ──────────────────────── */
  {
    slug: "meeting-agenda",
    title: "Weekly Meeting Agenda",
    emoji: "🗓️",
    tagline: "Run a tight 45–60 minute club meeting — timed agenda, decisions, and action items in one place.",
    accent: "#B5471B",
    steps: [
      {
        heading: "1 · Meeting basics",
        fields: [
          { id: "meet_date", label: "Meeting date", type: "date" },
          { id: "meet_week", label: "Term & week (e.g. Term 1, Week 4)", type: "text" },
          { id: "meet_location", label: "Location", type: "text" },
          { id: "meet_chair", label: "Who's chairing this meeting?", type: "text" },
          { id: "meet_secretary", label: "Who's taking minutes?", type: "text" },
          { id: "meet_present", label: "Builders present", type: "number" },
          { id: "meet_absent", label: "Absent — who, and why (if known)", type: "longtext" },
        ],
      },
      {
        heading: "2 · Time the agenda",
        note: "Aim for 45–60 minutes total. A timed agenda is what keeps a weekly meeting from drifting.",
        fields: [
          { id: "min_opening", label: "Opening + devotion", type: "number", unit: "min" },
          { id: "min_rollcall", label: "Roll call + review last minutes", type: "number", unit: "min" },
          { id: "min_project", label: "Project work — main session", type: "number", unit: "min" },
          { id: "min_skills", label: "Skills building / training segment", type: "number", unit: "min" },
          { id: "min_decisions", label: "Decisions by vote", type: "number", unit: "min" },
          { id: "min_closing", label: "Closing + next steps", type: "number", unit: "min" },
        ],
        chart: {
          kind: "bar", title: "Your agenda, minute by minute", source: "fields",
          fields: ["min_opening", "min_rollcall", "min_project", "min_skills", "min_decisions", "min_closing"],
          names: ["Opening", "Roll call", "Project work", "Skills", "Decisions", "Closing"],
          angle: -35,
          caption: "Add up the minutes — a healthy weekly meeting runs 45–60 minutes total. Longer than that and attendance drops.",
        },
      },
      {
        heading: "3 · What happened",
        fields: [
          { id: "topics", label: "Topics discussed", type: "longtext" },
          { id: "decisions", label: "Decisions made by vote", type: "longtext" },
          { id: "actions", label: "Action items — who does what, by when", type: "longtext" },
          { id: "wins", label: "One win to celebrate from this week", type: "longtext" },
        ],
      },
      {
        heading: "4 · Before next time",
        fields: [
          { id: "next_date", label: "Next meeting date", type: "date" },
          { id: "next_priority", label: "Top priority for next meeting", type: "longtext" },
        ],
        checklist: [
          "Minutes shared with the whole club",
          "Logbook / Monthly Log updated with this week's activity",
          "Teacher advisor informed of decisions made",
          "Absent members caught up on what they missed",
        ],
      },
    ],
  },

  /* ─────────────────────── MENTOR TOOLKIT ──────────────────────── */
  {
    slug: "mentor-checklist",
    title: "Mentor Monthly Checklist",
    emoji: "🧭",
    tagline: "For advisors: a monthly rhythm and a quarterly self-check to guide a builder well.",
    pdf: "Mentor Guide.pdf",
    accent: "#1D3A2C",
    steps: [
      {
        heading: "This month",
        fields: [
          { id: "m_month", label: "Month", type: "text" },
          { id: "m_w1", label: "Week 1 — checked in, asked about progress, identified obstacles", type: "longtext" },
          { id: "m_w2", label: "Week 2 — asked guiding questions, connected to resources", type: "longtext" },
          { id: "m_w3", label: "Week 3 — reviewed progress to goals, addressed issues", type: "longtext" },
          { id: "m_w4", label: "Week 4 — reviewed monthly report, verified honesty, signed off", type: "longtext" },
          { id: "m_well", label: "What went well this month?", type: "longtext" },
        ],
      },
      {
        heading: "Quarterly self-assessment",
        fields: [
          { id: "q_rate", label: "Rate my mentoring this quarter", type: "select", options: ["Excellent", "Good", "Fair", "Poor"] },
          { id: "q_takeover", label: "Am I guiding without taking over? One way to improve", type: "longtext" },
          { id: "q_values", label: "Have I seen values develop in my mentee(s)? Which, and how?", type: "longtext" },
          { id: "q_challenge", label: "My biggest challenge as a mentor — who could help?", type: "longtext" },
        ],
        chart: {
          kind: "bar", title: "Guide, don't do — scaffolding over time", source: "static",
          data: [{ name: "Early", value: 8 }, { name: "Mid", value: 5 }, { name: "Late", value: 2 }],
          caption: "Support should fade as the builder grows. High help early; step back as they gain confidence.",
        },
      },
    ],
  },
];

export function getTool(slug) {
  return TOOLS.find((t) => t.slug === slug) || null;
}
