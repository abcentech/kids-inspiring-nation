// Nation Builders Course — modular micro-course.
// Single source of truth for the in-site lessons that replace the old PDF toolkit.
// Each module maps to a retained downloadable PDF in /public/psalm119/downloads/
// so nothing from the old "Builder's Toolkit" is lost.
//
// Shape:
//   { slug, title, emoji, summary, minutes, pdf?, lessons: [
//       { heading, body, takeaway, check?: { q, options: [..], answer: idx } }
//   ] }

export const NBC_MODULES = [
  {
    slug: "what-is-a-nation-builder",
    title: "What Is a Nation Builder?",
    emoji: "🇳🇬",
    summary: "The mindset shift from complaining about what is broken to building what is needed.",
    minutes: 4,
    lessons: [
      {
        heading: "A nation builder builds",
        body: "A Nation Builder is anyone — age 7 or 70 — who stops waiting for someone else to fix the broken thing and starts building the needed thing. You do not need money, a title, or permission. You need a problem you care about and the character to keep going.",
        takeaway: "You become a Nation Builder the moment you start building.",
      },
      {
        heading: "Character before cash",
        body: "The Nation Builders Corp is a meritocracy of character, not wealth. The best builders solve problems with waste, volunteers, and creativity — often spending zero naira. Resourcefulness is the flex.",
        takeaway: "Character is the highest form of national capital.",
        check: {
          q: "What matters most in the Nation Builders Corp?",
          options: ["How much money you have", "Your character and resourcefulness", "The size of your school"],
          answer: 1,
        },
      },
    ],
  },
  {
    slug: "the-8-values",
    title: "The 8 Core Values",
    emoji: "📖",
    summary: "Integrity, Discipline, Wisdom, Service, Justice, Perseverance, Humility, Excellence — the building blocks.",
    minutes: 5,
    pdf: "Values Training Workbook.pdf",
    lessons: [
      {
        heading: "Why values come first",
        body: "Every strong nation is built on the character of its people. The 8 values are the operating system of a Nation Builder: Integrity, Discipline, Wisdom, Service, Justice, Perseverance, Humility, and Excellence. Learn them, then live them in your project.",
        takeaway: "Values are not a lecture — they are a daily practice.",
      },
      {
        heading: "Integrity, Discipline & Service",
        body: "Integrity is obeying what is right even when no one is watching. Discipline is training yourself to show up consistently — an hour a day on your project even when you are tired. Service is putting your community's needs above your own reward.",
        takeaway: "Show up, stay honest, serve others.",
      },
      {
        heading: "Live it in your project",
        body: "Pick one value this week and point it at your project. Justice: make sure every teammate leads. Excellence: make your documentation neat and your photos clear. Perseverance: refine your solution after it fails the first three times.",
        takeaway: "A value you do not use is a value you do not have.",
        check: {
          q: "How do you 'earn' a value in NBC?",
          options: ["By memorising the definition", "By demonstrating it in your project and community", "By listing it on the form"],
          answer: 1,
        },
      },
    ],
  },
  {
    slug: "find-a-problem",
    title: "Find a Problem Worth Solving",
    emoji: "🔍",
    summary: "How to spot a real community problem you can actually move on this term.",
    minutes: 4,
    pdf: "Project Planning Guide.pdf",
    lessons: [
      {
        heading: "Look where you already stand",
        body: "The best projects solve a problem in your own street, school, or market — the environment (a blocked gutter), education (kids who cannot read), health (no clean water), or character (bullying). If it bothers you daily, it is worth solving.",
        takeaway: "Start with a problem you can touch this week.",
      },
      {
        heading: "Make it small enough to win",
        body: "A huge problem paralyses you. Shrink it: not 'end poverty' but 'set up a book swap for 20 kids on my street.' A small, finished project beats a giant, abandoned one every time.",
        takeaway: "Narrow the problem until it becomes doable.",
        check: {
          q: "Which is the better first project?",
          options: ["Fix Nigeria's power grid", "Organise a weekly reading club for 15 neighbourhood kids"],
          answer: 1,
        },
      },
    ],
  },
  {
    slug: "design-your-solution",
    title: "Design Your Solution",
    emoji: "📋",
    summary: "Turn a problem into a plan you can run with the resources you already have.",
    minutes: 4,
    pdf: "Project Planning Guide.pdf",
    lessons: [
      {
        heading: "Solution on one page",
        body: "Write it plainly: the problem, who it hurts, your solution, who you will help, and when. If it does not fit on one page, it is not clear yet.",
        takeaway: "Clarity is the first resource.",
      },
      {
        heading: "Do much with little",
        body: "List what you already have — friends, waste materials, a free afternoon, a willing teacher. Design the project around those, not around money you do not have. Resourcefulness is scored higher than spending.",
        takeaway: "Build with what is in your hand.",
      },
    ],
  },
  {
    slug: "find-a-mentor",
    title: "Find a Mentor",
    emoji: "🎓",
    summary: "The adult who believes in you — and how to find one if you have none.",
    minutes: 3,
    pdf: "Mentor Guide.pdf",
    lessons: [
      {
        heading: "Who makes a good mentor",
        body: "A mentor is any trusted adult who believes in you: a parent, teacher, pastor or imam, or community leader. Their job is not to do the work — it is to cheer, question, and keep you accountable.",
        takeaway: "A mentor multiplies your courage.",
      },
      {
        heading: "No mentor yet? Here's how",
        body: "Ask one adult this week using a simple line: 'I am joining the Nation Builders Corp to solve [problem]. Will you check in on me once a month?' Most people say yes when a young person asks to serve.",
        takeaway: "The ask is one sentence. Send it today.",
      },
    ],
  },
  {
    slug: "track-your-impact",
    title: "Track Your Impact",
    emoji: "📊",
    summary: "Log what you did, who you helped, and the proof — every month.",
    minutes: 3,
    pdf: "Monthly Progress Tracker.pdf",
    lessons: [
      {
        heading: "If it is not logged, it did not happen",
        body: "Each month, write down what you did, how many people you helped, and snap a photo. Judges reward recorded impact, resourcefulness, and character — not fancy stories. Your log is your evidence.",
        takeaway: "A monthly log turns effort into evidence.",
        check: {
          q: "How often should you log progress?",
          options: ["Only at the end", "Every month", "Never — judges just trust you"],
          answer: 1,
        },
      },
    ],
  },
  {
    slug: "report-your-impact",
    title: "Report Your Impact",
    emoji: "🏆",
    summary: "Tell the story of your project so it can be celebrated and scaled.",
    minutes: 3,
    pdf: "Impact Report.pdf",
    lessons: [
      {
        heading: "The Impact Report",
        body: "At the end of the cycle you submit an Impact Report: the problem, what you built, the numbers, the photos, and what you learned when things went wrong. Every builder who submits a complete report earns a certificate.",
        takeaway: "Finish by telling the truth of what you built.",
      },
    ],
  },
  {
    slug: "start-a-club",
    title: "Start a Nation Builders Club",
    emoji: "🏫",
    summary: "Bring the movement to your school with a chapter of builders.",
    minutes: 4,
    lessons: [
      {
        heading: "A chapter in every school",
        body: "A Nation Builders Club is a chapter of builders inside your school, guided by a teacher-advisor. Clubs meet through the terms, run community projects together, and represent the school at the December Conference and July Grand Finale.",
        takeaway: "A club turns one builder into a team.",
      },
      {
        heading: "The 4 steps to start",
        body: "1) Find a teacher or staff member to be your Advisor. 2) Gather at least 10 students who want to build. 3) Submit the Chapter Request form on this site. 4) Send your member roster. That's it — your school is on the map.",
        takeaway: "Advisor → 10 members → request → roster.",
        check: {
          q: "What is the minimum club size to start a chapter?",
          options: ["3 students", "10 students and an advisor", "100 students"],
          answer: 1,
        },
      },
    ],
  },
];

export const PDF_BASE = "/psalm119/downloads/";

export function getModule(slug) {
  return NBC_MODULES.find((m) => m.slug === slug) || null;
}
