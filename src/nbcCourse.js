// Nation Builders Course — modular micro-course.
// Single source of truth for the in-site lessons that replace the old PDF toolkit.
// Each module maps to a retained downloadable PDF in /public/psalm119/downloads/
// so nothing from the old "Builder's Toolkit" is lost.
//
// Lesson shape:
//   { heading, body, takeaway, interactions?: [ Block ] }
//
// A Block is an interactive element rendered by nbc/course/InteractiveBlocks.jsx:
//   { type: "quiz",     questions: [{ q, options:[..], answer: idx }] }
//   { type: "slider",   prompt, min, max, step?, answer, unit?, prefix?, tolerance?, reveal }
//   { type: "order",    prompt, items: [..in correct order..] }
//   { type: "flip",     prompt?, cards: [{ front, back }] }
//   { type: "scenario", prompt, options: [{ label, feedback, good? }] }
//   { type: "sort",     prompt, buckets: [..], items: [{ text, bucket: idx }] }
//   { type: "chart",    kind: "bar"|"radar", title?, caption?, data: [{ name, value }], height?, angle? }
// All blocks except "chart" must be engaged with before a lesson can be completed.

export const NBC_MODULES = [
  {
    slug: "what-is-a-nation-builder",
    title: "What Is a Nation Builder?",
    emoji: "🇳🇬",
    summary: "The mindset shift from complaining about what is broken to building what is needed.",
    minutes: 5,
    lessons: [
      {
        heading: "A nation builder builds",
        body: "A Nation Builder is anyone — age 7 or 70 — who stops waiting for someone else to fix the broken thing and starts building the needed thing. You do not need money, a title, or permission. You need a problem you care about and the character to keep going.",
        takeaway: "You become a Nation Builder the moment you start building.",
        interactions: [
          {
            type: "scenario",
            prompt: "The gutter on your street is blocked and floods every time it rains. What does a Nation Builder do first?",
            options: [
              { label: "Wait for the government to send someone.", feedback: "Waiting is the opposite of building. The nation is built by people who move first.", good: false },
              { label: "Gather a few friends, assess it, and clear what you safely can — then log it.", feedback: "Exactly. Start small, start now, with what's in your hand.", good: true },
              { label: "Post about how bad it is and move on.", feedback: "Naming a problem isn't solving it. Builders turn complaints into a first small action.", good: false },
            ],
          },
        ],
      },
      {
        heading: "Character before cash",
        body: "The Nation Builders Corps is a meritocracy of character, not wealth. The best builders solve problems with waste, volunteers, and creativity — often spending zero naira. Resourcefulness is the flex.",
        takeaway: "Character is the highest form of national capital.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "What matters most in the Nation Builders Corps?", options: ["How much money you have", "Your character and resourcefulness", "The size of your school"], answer: 1 },
              { q: "A builder solves a real problem spending ₦0. In NBC that is…", options: ["A weakness — they had no budget", "The flex — resourcefulness is scored highest", "Against the rules"], answer: 1 },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "the-8-values",
    title: "The 8 Core Values",
    emoji: "📖",
    summary: "Integrity, Discipline, Wisdom, Service, Justice, Perseverance, Humility, Excellence — the building blocks.",
    minutes: 7,
    pdf: "Values Training Workbook.pdf",
    lessons: [
      {
        heading: "Why values come first",
        body: "Every strong nation is built on the character of its people. The 8 values are the operating system of a Nation Builder. Learn them, then live them in your project.",
        takeaway: "Values are not a lecture — they are a daily practice.",
        interactions: [
          {
            type: "flip",
            prompt: "Tap each value to reveal what it means in practice.",
            cards: [
              { front: "Integrity", back: "Doing right even when no one is watching." },
              { front: "Discipline", back: "Showing up consistently — even when you're tired." },
              { front: "Wisdom", back: "Choosing the right thing to do, at the right time." },
              { front: "Service", back: "Putting your community's needs above your own reward." },
              { front: "Justice", back: "Making sure everyone is treated fairly — including the quiet ones." },
              { front: "Perseverance", back: "Refining your solution after it fails the first three times." },
              { front: "Humility", back: "Sharing credit; learning from anyone." },
              { front: "Excellence", back: "Neat work, clear photos, finishing what you start." },
            ],
          },
        ],
      },
      {
        heading: "Live it in your project",
        body: "Pick one value this week and point it at your project. Justice: make sure every teammate leads. Excellence: make your documentation neat and your photos clear. Perseverance: refine your solution after it fails.",
        takeaway: "A value you do not use is a value you do not have.",
        interactions: [
          {
            type: "sort",
            prompt: "Which value is each builder practising?",
            buckets: ["Service", "Discipline", "Excellence"],
            items: [
              { text: "Spends an hour on the project daily, even when tired.", bucket: 1 },
              { text: "Redraws the poster three times until it's clear.", bucket: 2 },
              { text: "Gives up a Saturday to help a neighbour read.", bucket: 0 },
            ],
          },
          {
            type: "chart",
            kind: "radar",
            title: "Rate yourself across the 8 values",
            data: [
              { name: "Integrity", value: 4 }, { name: "Discipline", value: 3 }, { name: "Wisdom", value: 3 },
              { name: "Service", value: 5 }, { name: "Justice", value: 4 }, { name: "Perseverance", value: 3 },
              { name: "Humility", value: 4 }, { name: "Excellence", value: 3 },
            ],
            caption: "A sample self-rating. Your strongest values carry your project; your weakest are where character grows this term.",
          },
        ],
      },
    ],
  },

  {
    slug: "find-a-problem",
    title: "Find a Problem Worth Solving",
    emoji: "🔍",
    summary: "How to spot a real community problem you can actually move on this term.",
    minutes: 5,
    pdf: "Project Planning Guide.pdf",
    lessons: [
      {
        heading: "Look where you already stand",
        body: "The best projects solve a problem in your own street, school, or market — environment (a blocked gutter), education (kids who cannot read), health (no clean water), or character (bullying). If it bothers you daily, it is worth solving.",
        takeaway: "Start with a problem you can touch this week.",
        interactions: [
          {
            type: "slider",
            prompt: "Look around your street for 60 seconds. How many real problems can most people spot?",
            min: 0, max: 20, answer: 12, unit: " problems", tolerance: 4,
            reveal: "Most builders find far more than they expect. The nation isn't short of problems to solve — it's short of people who start. Pick the one that bothers you most.",
          },
        ],
      },
      {
        heading: "Make it small enough to win",
        body: "A huge problem paralyses you. Shrink it: not 'end poverty' but 'set up a book swap for 20 kids on my street.' A small, finished project beats a giant, abandoned one every time.",
        takeaway: "Narrow the problem until it becomes doable.",
        interactions: [
          {
            type: "sort",
            prompt: "Which of these is a good first project?",
            buckets: ["Too big to win", "Small enough to win"],
            items: [
              { text: "Fix Nigeria's power grid", bucket: 0 },
              { text: "A weekly reading club for 15 neighbourhood kids", bucket: 1 },
              { text: "End hunger in my state", bucket: 0 },
              { text: "A clean-up rota for one blocked gutter", bucket: 1 },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "design-your-solution",
    title: "Design Your Solution",
    emoji: "📋",
    summary: "Turn a problem into a plan you can run with the resources you already have.",
    minutes: 5,
    pdf: "Project Planning Guide.pdf",
    lessons: [
      {
        heading: "Solution on one page",
        body: "Write it plainly: the problem, who it hurts, your solution, who you will help, and when. If it does not fit on one page, it is not clear yet.",
        takeaway: "Clarity is the first resource.",
        interactions: [
          {
            type: "order",
            prompt: "Put the one-page plan in the order you'd write it.",
            items: [
              "The problem — what's broken",
              "Who it hurts — the people affected",
              "Your solution — what you'll build",
              "Who you'll help — how many, by when",
              "First step — what you'll do this week",
            ],
          },
        ],
      },
      {
        heading: "Do much with little",
        body: "List what you already have — friends, waste materials, a free afternoon, a willing teacher. Design the project around those, not around money you do not have. Resourcefulness is scored higher than spending.",
        takeaway: "Build with what is in your hand.",
        interactions: [
          {
            type: "sort",
            prompt: "Sort these into what you likely already have vs. what you'd have to buy.",
            buckets: ["Already have", "Would have to buy"],
            items: [
              { text: "A few willing friends", bucket: 0 },
              { text: "Cardboard and old bottles", bucket: 0 },
              { text: "A free Saturday afternoon", bucket: 0 },
              { text: "Brand-new equipment", bucket: 1 },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "find-a-mentor",
    title: "Find a Mentor",
    emoji: "🎓",
    summary: "The adult who believes in you — and how to find one if you have none.",
    minutes: 4,
    pdf: "Mentor Guide.pdf",
    lessons: [
      {
        heading: "Who makes a good mentor",
        body: "A mentor is any trusted adult who believes in you: a parent, teacher, pastor or imam, or community leader. Their job is not to do the work — it is to cheer, question, and keep you accountable.",
        takeaway: "A mentor multiplies your courage.",
        interactions: [
          {
            type: "flip",
            prompt: "Tap each person — could they be your mentor?",
            cards: [
              { front: "A teacher", back: "Yes — a great mentor. Ask them to check in monthly." },
              { front: "A pastor or imam", back: "Yes — trusted adults in your community count." },
              { front: "A parent or aunt", back: "Yes — family who believes in you is a mentor too." },
              { front: "Someone who'll do the work for you", back: "No — a mentor guides; the project stays yours." },
            ],
          },
        ],
      },
      {
        heading: "No mentor yet? Here's how",
        body: "Ask one adult this week using a simple line: 'I am joining the Nation Builders Corps to solve [problem]. Will you check in on me once a month?' Most people say yes when a young person asks to serve.",
        takeaway: "The ask is one sentence. Send it today.",
        interactions: [
          {
            type: "scenario",
            prompt: "How should you ask a busy teacher to mentor you?",
            options: [
              { label: "\"Will you run my whole project for me?\"", feedback: "That asks them to do the work. A mentor guides — the project is yours.", good: false },
              { label: "\"I'm solving [problem] with NBC. Will you check in on me once a month?\"", feedback: "Perfect — small, clear, and it honours their time. Most people say yes.", good: true },
              { label: "Say nothing and hope they notice.", feedback: "Builders ask. The one-sentence ask is the whole skill here.", good: false },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "track-your-impact",
    title: "Track Your Impact",
    emoji: "📊",
    summary: "Log what you did, who you helped, and the proof — every month.",
    minutes: 4,
    pdf: "Monthly Progress Tracker.pdf",
    lessons: [
      {
        heading: "If it is not logged, it did not happen",
        body: "Each month, write down what you did, how many people you helped, and snap a photo. Judges reward recorded impact, resourcefulness, and character — not fancy stories. Your log is your evidence.",
        takeaway: "A monthly log turns effort into evidence.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "How often should you log progress?", options: ["Only at the end", "Every month", "Never — judges just trust you"], answer: 1 },
            ],
          },
          {
            type: "chart",
            kind: "bar",
            title: "What judges actually reward",
            data: [
              { name: "Recorded impact", value: 9 },
              { name: "Resourcefulness", value: 8 },
              { name: "Character", value: 8 },
              { name: "Fancy stories", value: 2 },
            ],
            angle: -20,
            caption: "Proof beats promises. A simple monthly log of real numbers and photos outscores a beautiful story with nothing behind it.",
          },
        ],
      },
      {
        heading: "What to record each month",
        body: "Keep it to four things: what you did, how many people it helped, one photo, and one lesson learned. Four lines a month is all it takes to build an unbeatable Impact Report.",
        takeaway: "Four lines a month beats a scramble at the end.",
        interactions: [
          {
            type: "order",
            prompt: "Put a monthly log entry in order.",
            items: [
              "What I did this month",
              "How many people it helped",
              "One photo as proof",
              "One thing I learned",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "report-your-impact",
    title: "Report Your Impact",
    emoji: "🏆",
    summary: "Tell the story of your project so it can be celebrated and scaled.",
    minutes: 4,
    pdf: "Impact Report.pdf",
    lessons: [
      {
        heading: "The Impact Report",
        body: "At the end of the cycle you submit an Impact Report: the problem, what you built, the numbers, the photos, and what you learned when things went wrong. Every builder who submits a complete report earns a certificate.",
        takeaway: "Finish by telling the truth of what you built.",
        interactions: [
          {
            type: "sort",
            prompt: "What belongs in a strong Impact Report?",
            buckets: ["Include it", "Leave it out"],
            items: [
              { text: "The real numbers — how many you helped", bucket: 0 },
              { text: "Photos as proof", bucket: 0 },
              { text: "What went wrong and what you learned", bucket: 0 },
              { text: "Exaggerations to look impressive", bucket: 1 },
            ],
          },
          {
            type: "scenario",
            prompt: "Your project partly failed halfway through. What goes in the report?",
            options: [
              { label: "Hide it — only show the wins.", feedback: "Honesty is scored. A failure you fixed shows more character than a flawless story.", good: false },
              { label: "Explain what failed and how you adapted.", feedback: "Yes. Judges reward the builder who failed, learned, and kept going.", good: true },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "start-a-club",
    title: "Start a Nation Builders Club",
    emoji: "🏫",
    summary: "Bring the movement to your school with a chapter of builders.",
    minutes: 5,
    lessons: [
      {
        heading: "A chapter in every school",
        body: "A Nation Builders Club is a chapter of builders inside your school, guided by a teacher-advisor. Clubs meet through the terms, run community projects together, and represent the school at the December Conference and July Grand Finale.",
        takeaway: "A club turns one builder into a team.",
        interactions: [
          {
            type: "slider",
            prompt: "What's the minimum number of students to start a recognised club?",
            min: 1, max: 30, answer: 10, unit: " students", tolerance: 0,
            reveal: "You need at least 10 builders and one teacher-advisor. There's no maximum — the bigger the club, the bigger the impact.",
          },
        ],
      },
      {
        heading: "The 4 steps to start",
        body: "1) Find a teacher or staff member to be your Advisor. 2) Gather at least 10 students who want to build. 3) Submit the Chapter Request form on this site. 4) Send your member roster. That's it — your school is on the map.",
        takeaway: "Advisor → 10 members → request → roster.",
        interactions: [
          {
            type: "order",
            prompt: "Put the 4 steps to start a club in order.",
            items: [
              "Find a teacher-advisor",
              "Gather at least 10 students",
              "Submit the Chapter Request",
              "Send your member roster",
            ],
          },
          {
            type: "quiz",
            questions: [
              { q: "What is the minimum club size to start a chapter?", options: ["3 students", "10 students and an advisor", "100 students"], answer: 1 },
            ],
          },
        ],
      },
    ],
  },
];

// The Core Values Deep Dive — 8 Pidgin-and-English modules, one per value.
// Kept in its own file for size; merged here so progress/badges/routing
// treat them like any other module.
import { VALUES_SERIES } from "./nbcValuesCourse.js";
NBC_MODULES.push(...VALUES_SERIES);

export const CORE_MODULES = NBC_MODULES.filter((m) => !m.series);
export { VALUES_SERIES };

export const PDF_BASE = "/psalm119/downloads/";

export function getModule(slug) {
  return NBC_MODULES.find((m) => m.slug === slug) || null;
}
