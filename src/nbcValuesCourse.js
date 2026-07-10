// The Core Values Deep Dive — 8 modules, one per value.
// Taught in plain English AND Nigerian Pidgin, with real Naija examples,
// proverbs, and interactive checks. Rendered by the same course engine
// (NBCCourse.jsx) — these modules carry `series: "values"` so the course
// index groups them under their own banner.
//
// Lessons here use an extra optional field:
//   pidgin — a Pidgin-language explainer shown in its own voice box.

export const VALUES_SERIES = [
  {
    slug: "value-integrity",
    series: "values",
    accent: "#2D9E53",
    pidgin: "Do wetin correct, even when nobody dey look.",
    proverb: { text: "Cunny die, cunny bury am.", meaning: "Every trick ends in the grave it dug. Build straight — shortcuts are the longest road." },
    title: "Integrity — Do the Correct Thing",
    emoji: "🛡️",
    summary: "Do wetin correct even when nobody dey look. The value every other value stands on.",
    minutes: 6,
    lessons: [
      {
        heading: "Wetin be integrity?",
        body: "Integrity means your inside and your outside match: what you say, what you do, and what you do in secret are the same thing. It is the value every other value stands on — because a builder nobody can trust cannot build anything that lasts.",
        takeaway: "Integrity is who you are when no one is watching.",
        interactions: [
          {
            type: "scenario",
            prompt: "You dey write exam. Your best friend slide answer paper give you, and the invigilator no dey look. Wetin you go do?",
            options: [
              { label: "Copy am sharp sharp — na free marks.", feedback: "Those marks are borrowed, not earned. A certificate built on cheating is a building built on sand — one day e go collapse on top your head.", good: false },
              { label: "Push it back quietly and face your own paper.", feedback: "Correct! You fit lose small marks today, but you keep something worth far more — a name people can trust. That name go open doors wey marks no fit open.", good: true },
              { label: "Collect am but promise yourself say na only this once.", feedback: "'Only this once' is how every corrupt person started. Integrity no get part-time.", good: false },
            ],
          },
        ],
      },
      {
        heading: "The cleaner wey return millions",
        body: "In 2015, Josephine Ugwu, a cleaner at Lagos airport earning less than ₦8,000 a month, found ₦12 million forgotten by a passenger — and returned every kobo. Not once: she returned lost money several times. She was celebrated across Nigeria and the world. Her salary was small, but her name became priceless.",
        takeaway: "Your name can become worth more than any money you will ever hold.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "Why is Josephine Ugwu's story powerful for a Nation Builder?", options: ["She later became rich", "She proved integrity no be about how much you get — na about who you be", "She was promoted to manager"], answer: 1 },
              { q: "Integrity is easiest to see when…", options: ["People are watching and clapping", "There is a reward for doing right", "Nobody go ever find out — and you still do right"], answer: 2 },
            ],
          },
        ],
      },
      {
        heading: "Live am this week",
        body: "Integrity is built in small reps, like muscle. This week: return anything that is not yours (even ₦50 change), admit one mistake instead of covering it, and keep one promise that has become inconvenient.",
        takeaway: "Practise integrity in ₦50 matters and it will hold in ₦12 million matters.",
        interactions: [
          {
            type: "sort",
            prompt: "Integrity or not? Sort each action.",
            buckets: ["Integrity ✅", "No be integrity ❌"],
            items: [
              { text: "Telling the teacher the truth even though your friend begged you to cover for him.", bucket: 0 },
              { text: "Adding fake numbers to your project report so your club looks better.", bucket: 1 },
              { text: "Returning extra change the mama-put mistakenly gave you.", bucket: 0 },
              { text: "Copying assignment but changing the handwriting.", bucket: 1 },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "value-discipline",
    series: "values",
    accent: "#B5471B",
    pidgin: "Show up every day — feelings or no feelings.",
    proverb: { text: "Small small na im bird take build nest.", meaning: "No nest is built in a day. Daily effort, however small, builds the biggest things." },
    title: "Discipline — Show Up Every Day",
    emoji: "⏰",
    summary: "Do the work whether you feel like it or not. Na discipline separate dreamers from builders.",
    minutes: 6,
    lessons: [
      {
        heading: "Wetin be discipline?",
        body: "Discipline is doing what you planned to do, whether or not you feel like it at the moment. Motivation is a visitor — it comes and goes. Discipline is family — it lives with you. Every skill, every project, every great nation is built by people who kept showing up on days they didn't feel like it.",
        takeaway: "You don't need to feel like it. You need to do it.",
        interactions: [
          {
            type: "flip",
            prompt: "Tap each card — motivation talk vs discipline talk.",
            cards: [
              { front: "\"I no feel like reading today.\"", back: "Discipline says: read the first page. Feelings follow action — start, and the mood go meet you there." },
              { front: "\"I go start on Monday.\"", back: "Discipline says: start with 10 minutes NOW. Monday na where dreams dey go die." },
              { front: "\"The project too big.\"", back: "Discipline says: break am. One small brick every day builds the house." },
            ],
          },
        ],
      },
      {
        heading: "Tobi Amusan and the 12 seconds",
        body: "In 2022, Tobi Amusan became world champion and world-record holder in the 100m hurdles — 12.12 seconds. But those 12 seconds were bought with about ten years of 5am training sessions, in Ijebu-Ode and beyond, on days with no cameras, no medals, and no applause. The world saw 12 seconds. Discipline saw ten years.",
        takeaway: "The world sees the 12 seconds. Discipline paid for the 10 years.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "What did the world NOT see behind Tobi Amusan's world record?", options: ["The medal ceremony", "Years of unseen 5am training", "The race itself"], answer: 1 },
              { q: "For your NBC project, discipline looks like…", options: ["Working hard only when the mentor is coming", "A small, steady effort every single week", "One giant all-nighter before the deadline"], answer: 1 },
            ],
          },
        ],
      },
      {
        heading: "Live am this week",
        body: "Pick ONE small daily action for your project — 15 minutes, same time every day. Tie it to something you already do (after dinner, before assembly). Track it for 7 days. Miss a day? Resume the next day — discipline is not perfection, it is resumption.",
        takeaway: "Discipline is not never falling — it is always resuming.",
        interactions: [
          {
            type: "order",
            prompt: "Arrange the discipline ladder — from first step to result.",
            items: [
              "Choose one small daily action",
              "Attach it to a fixed time you already keep",
              "Do it even on days you no feel like am",
              "Resume immediately after any missed day",
              "Watch the results compound into something big",
            ],
          },
          {
            type: "chart",
            kind: "bar",
            title: "15 minutes a day — the compound effect",
            data: [
              { name: "1 week", value: 2 },
              { name: "1 month", value: 8 },
              { name: "1 term", value: 23 },
              { name: "1 session", value: 68 },
            ],
            caption: "Hours of real work built from just 15 disciplined minutes a day. Small daily bricks become a house — na so discipline dey pay.",
          },
        ],
      },
    ],
  },

  {
    slug: "value-wisdom",
    series: "values",
    accent: "#6B4FA1",
    pidgin: "Sabi book na one thing; sabi life na another.",
    proverb: { text: "Person wey ask road no dey lost.", meaning: "Asking questions is the fastest shortcut to wisdom. The proud get lost; the humble arrive." },
    title: "Wisdom — Right Thing, Right Time",
    emoji: "🦉",
    summary: "Knowledge na to sabi book; wisdom na to sabi life. Choosing the right action at the right time.",
    minutes: 6,
    lessons: [
      {
        heading: "Wetin be wisdom?",
        body: "Knowledge is knowing facts. Wisdom is knowing what to DO with them — the right action, at the right time, in the right way. Nigeria has many brilliant people; what builds a nation is brilliant people who also choose well. Our elders packaged wisdom into proverbs so it could travel light from generation to generation.",
        takeaway: "Knowledge knows the facts. Wisdom knows what to do with them.",
        interactions: [
          {
            type: "flip",
            prompt: "Naija proverbs — tap to open the wisdom inside.",
            cards: [
              { front: "\"Cunny die, cunny bury am.\"", back: "Tricks always meet bigger tricks. Shortcuts are the longest road — build straight." },
              { front: "\"One tree no fit make forest.\"", back: "Wisdom knows when to ask for help. The lone genius builds a hut; a team builds a city." },
              { front: "\"When breeze blow, fowl yansh go open.\"", back: "Everything hidden gets exposed eventually. Build things that can survive daylight." },
              { front: "\"Person wey never cross river, no dey insult crocodile.\"", back: "Timing! Even a true word spoken at the wrong time becomes a problem. Finish the crossing first." },
            ],
          },
        ],
      },
      {
        heading: "Wisdom in action",
        body: "Wisdom shows in three choices: WHAT to do (of all the problems around, which one can I actually solve?), WHEN to do it (is this the right moment?), and HOW to do it (who should I involve? what could go wrong?). Great builders think one step ahead — like a chess player, not a gambler.",
        takeaway: "Ask: right problem? right time? right way? — before you move.",
        interactions: [
          {
            type: "scenario",
            prompt: "Your club wan fix the broken school toilet, but the principal is in a terrible mood today and exams start tomorrow. Wetin wisdom go do?",
            options: [
              { label: "March into the principal's office right now with the demand.", feedback: "Right idea, wrong time. Even a true word at the wrong time becomes a quarrel. Wisdom waits for the door to be open.", good: false },
              { label: "Write the plan neatly, wait for after exams, then book a good time to present it.", feedback: "Na so! Same idea, right timing, right packaging — completely different result. That is wisdom.", good: true },
              { label: "Abandon the idea — the principal go never gree.", feedback: "Wisdom is not fear. Giving up entirely is not wise timing; it is quitting wearing wisdom's cloth.", good: false },
            ],
          },
        ],
      },
      {
        heading: "Borrow sense — the wise dey ask",
        body: "The wisest thing a young builder can do is borrow wisdom: ask people who have walked the road before. That is exactly why every NBC project team has a mentor. Asking is not weakness; the person wey ask direction no dey lost for long.",
        takeaway: "Wisdom compounds fastest when you borrow it from those ahead of you.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "Which one shows wisdom?", options: ["Doing the project alone so nobody shares the glory", "Asking your mentor to poke holes in your plan BEFORE you start", "Copying another school's project exactly"], answer: 1 },
              { q: "\"Person wey ask road no dey lost\" teaches that…", options: ["Only lost people ask questions", "Asking questions is a shortcut to wisdom", "You should always follow other people"], answer: 1 },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "value-service",
    series: "values",
    accent: "#0E7490",
    pidgin: "Use wetin dey your hand lift another person.",
    proverb: { text: "One hand no fit carry load reach head.", meaning: "Even your own success needs other people's hands. Lift others — na so nation dey rise." },
    title: "Service — Put Others First",
    emoji: "🤲",
    summary: "Use wetin you get to lift people wey need am. The heartbeat of nation building.",
    minutes: 6,
    lessons: [
      {
        heading: "Wetin be service?",
        body: "Service is using what is in your hand — your time, energy, talent — for someone who cannot pay you back. It is the exact opposite of 'wetin dey there for me?'. A nation rises when enough people ask 'wetin I fit give?' instead of 'wetin I fit collect?'.",
        takeaway: "Builders ask 'what can I give?' — not 'what can I get?'",
        interactions: [
          {
            type: "sort",
            prompt: "Service or self? Sort each mindset.",
            buckets: ["Service 🤲", "Self 🪞"],
            items: [
              { text: "Teaching your junior ones maths after school, free.", bucket: 0 },
              { text: "Joining the club only because of the prize money.", bucket: 1 },
              { text: "Cleaning the community borehole area every Saturday.", bucket: 0 },
              { text: "Helping only when the camera dey around.", bucket: 1 },
            ],
          },
        ],
      },
      {
        heading: "Dr. Adadevoh — the service wey save millions",
        body: "In 2014, a very sick traveller brought Ebola into Lagos. Dr. Stella Ameyo Adadevoh refused enormous pressure to release him, kept him isolated, and protected a city of over 20 million people. She caught the virus and died — but Nigeria recorded only 20 cases in an outbreak that could have killed thousands. The whole world praised how Nigeria stopped Ebola. That was one person's service.",
        takeaway: "One person's service can shield millions of people.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "What made Dr. Adadevoh's action true service?", options: ["She was paid extra for it", "She protected millions at great personal cost", "She became famous immediately"], answer: 1 },
              { q: "Your version of service today is…", options: ["Waiting until you are rich enough to help", "Using what is already in your hand for someone who can't repay you", "Doing big things only when NBC dey watch"], answer: 1 },
            ],
          },
        ],
      },
      {
        heading: "Live am this week",
        body: "You do not need a medical degree or millions. This week, do one act of service that costs you something real (time, comfort, sweat) for someone who cannot repay you — then log it in your project tracker. Service that costs you nothing changes nothing.",
        takeaway: "Real service always costs the server something.",
        interactions: [
          {
            type: "scenario",
            prompt: "Your club get ₦2,000 and Saturday free. Which plan is the strongest service?",
            options: [
              { label: "Print club T-shirts so people can know us around town.", feedback: "Branding is fine, but that money serves YOU, not the community. Service points outward.", good: false },
              { label: "Buy chalk and teach free weekend lessons for primary pupils wey dey struggle.", feedback: "Correct! Small money, big service — and the impact compounds every week you show up.", good: true },
              { label: "Save the money until it becomes big enough for a borehole.", feedback: "A borehole someday is worth less than literacy today. Start serving with what is in your hand NOW.", good: false },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "value-justice",
    series: "values",
    accent: "#1D4ED8",
    pidgin: "Fair na fair — for everybody.",
    proverb: { text: "Monkey dey work, baboon dey chop.", meaning: "When those who labour never share the reward, the nation scatters. Justice keeps the team whole." },
    title: "Justice — Fair to Everybody",
    emoji: "⚖️",
    summary: "Everybody — rich or poor, loud or quiet — deserves fairness. Builders defend those wey no get voice.",
    minutes: 6,
    lessons: [
      {
        heading: "Wetin be justice?",
        body: "Justice means everyone gets fair treatment — not because of who they know, how they look, where they come from, or how loudly they can shout. In a just team, the quiet member's idea gets the same hearing as the popular member's idea. Injustice anywhere in your club is a crack in your foundation.",
        takeaway: "A team is only as strong as how it treats its weakest voice.",
        interactions: [
          {
            type: "scenario",
            prompt: "During your club meeting, the loudest boy always talks over Amina, whose ideas are actually good. As team lead, wetin justice demand?",
            options: [
              { label: "Let it be — na so life dey; the loud go always win.", feedback: "'Na so life dey' is exactly how injustice survives. Builders exist to change 'na so life dey'.", good: false },
              { label: "Introduce a rule: everyone speaks in turn, and quiet members are asked directly for their view.", feedback: "Correct! Justice is often a SYSTEM, not just a feeling — fair structures protect fair treatment.", good: true },
              { label: "Ban the loud boy from meetings.", feedback: "That trades one injustice for another. Justice restrains unfairness without becoming unfair.", good: false },
            ],
          },
        ],
      },
      {
        heading: "Gani — the lawyer of the masses",
        body: "Gani Fawehinmi, a Nigerian lawyer, spent his life defending people too poor to hire any lawyer — market women, students, journalists. He was jailed dozens of times for standing against unjust power, and Nigerians crowned him 'Senior Advocate of the Masses'. His weapon was not anger; it was courage plus the law.",
        takeaway: "Justice is courage, organised.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "What made Gani Fawehinmi a justice builder?", options: ["He defended those who could not pay or fight for themselves", "He was the richest lawyer in Nigeria", "He avoided all trouble with authority"], answer: 0 },
              { q: "In your school, justice-building looks like…", options: ["Reporting only your enemies", "Standing up (properly and calmly) when someone is treated unfairly — even if the person no be your friend", "Keeping quiet so wahala no go find you"], answer: 1 },
            ],
          },
        ],
      },
      {
        heading: "Justice starts inside your team",
        body: "Before you fight injustice outside, check inside: Does every member of your team get a turn to lead? Is credit shared honestly? Are the youngest members heard? Run this justice audit on your own club this week — builders sweep their own compound first.",
        takeaway: "Justice, like charity, begins at home — audit your own team first.",
        interactions: [
          {
            type: "sort",
            prompt: "Just or unjust? Sort these team habits.",
            buckets: ["Just ⚖️", "Unjust 🚫"],
            items: [
              { text: "Rotating who leads the weekly meeting.", bucket: 0 },
              { text: "The founder's name goes on everything; helpers are never mentioned.", bucket: 1 },
              { text: "New members get the same speaking time as old ones.", bucket: 0 },
              { text: "Punishing a mistake for one person but excusing it for a friend.", bucket: 1 },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "value-perseverance",
    series: "values",
    accent: "#15803D",
    pidgin: "Fall seven times? Stand up eight.",
    proverb: { text: "No matter how night tey, day must break.", meaning: "However long the darkness lasts, dawn is compulsory. Keep building till your daybreak." },
    title: "Perseverance — No Give Up",
    emoji: "🌱",
    summary: "Fall seven times, stand up eight. Wetin separate finished projects from abandoned ones.",
    minutes: 6,
    lessons: [
      {
        heading: "Wetin be perseverance?",
        body: "Perseverance is continuing after the excitement has died — after the plan fails once, twice, three times. Nigeria is full of abandoned projects; what the nation needs is finishers. Every real solution you admire failed quietly several times before it worked publicly once.",
        takeaway: "The plan failing is not the project dying — quitting is.",
        interactions: [
          {
            type: "flip",
            prompt: "Tap each setback to see what a persevering builder does with it.",
            cards: [
              { front: "The principal said no.", back: "Ask why, fix that reason, come back next term with a better proposal. 'No' today often means 'not like this'." },
              { front: "Half the team stopped coming.", back: "Build with the two wey remain. A small loyal team beats a big vanished one. Others go return when dem see progress." },
              { front: "We tried and it didn't work.", back: "You didn't fail — you found one way wey no dey work. Log the lesson, adjust, go again. Version 2 dey always better." },
            ],
          },
        ],
      },
      {
        heading: "From Ikorodu to the world record",
        body: "Tunde Onakoya grew up with little money in Ikorodu, taught himself chess, and started Chess in Slums Africa — teaching chess and giving scholarships to children in Makoko, Oshodi and beyond. In 2024, he played chess for 60 straight hours in New York's Times Square to break a Guinness World Record and raise money for African children's education. His famous words: 'It is possible to do great things from a small place.'",
        takeaway: "It is possible to do great things from a small place.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "What does Tunde Onakoya's story prove about perseverance?", options: ["You need to leave Nigeria to succeed", "Where you start does not decide where you finish", "Chess is the only way out"], answer: 1 },
              { q: "60 hours of chess was possible because…", options: ["He trained and prepared for it, then refused to stop", "It was easy for him", "He was lucky on the day"], answer: 0 },
            ],
          },
        ],
      },
      {
        heading: "Build your bounce-back plan",
        body: "Perseverance is easier when you plan for setbacks BEFORE they come. Write down: the 3 most likely things that could block your project, and what you will do the same day each one happens. Teams with a bounce-back plan don't debate whether to continue — they already decided.",
        takeaway: "Decide you will continue BEFORE the setback comes.",
        interactions: [
          {
            type: "order",
            prompt: "Arrange the bounce-back cycle in order.",
            items: [
              "Something fails or blocks the project",
              "Feel the disappointment — one day maximum",
              "Write down the lesson the failure taught",
              "Adjust the plan with the new lesson",
              "Resume — stronger and wiser than version 1",
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "value-humility",
    series: "values",
    accent: "#A16207",
    pidgin: "Na full bag of rice dey bend down.",
    proverb: { text: "River wey forget im source go dry.", meaning: "Stay connected to the people and places that made you — pride cuts the river from its spring." },
    title: "Humility — Carry Others Along",
    emoji: "🌾",
    summary: "Share credit, learn from anybody, remember your source. Full rice bags dey bend down.",
    minutes: 6,
    lessons: [
      {
        heading: "Wetin be humility?",
        body: "Humility is not thinking small of yourself — it is thinking of yourself less. The humble builder shares credit, learns from anyone (including juniors), and never forgets the people and places that made them. Our elders put it perfectly: the river that forgets its source will dry up.",
        takeaway: "The river that forgets its source will dry up.",
        interactions: [
          {
            type: "flip",
            prompt: "Proverbs on humility — tap to open them.",
            cards: [
              { front: "\"Na full bag of rice dey bend down.\"", back: "The fuller the bag, the lower it bows. Empty bags stand stiff and proud. Real substance is quiet." },
              { front: "\"No matter how tall you be, you no fit see tomorrow.\"", back: "However great you become, you still need others, still need to learn, still need to ask." },
              { front: "\"One hand no fit carry load reach head.\"", back: "Even lifting your own success requires other people's hands. Credit them." },
            ],
          },
        ],
      },
      {
        heading: "The captain wey dey pack chairs",
        body: "Watch true leaders closely: the best team captains arrive first to arrange the chairs and leave last after packing them. When the project wins, they call every member's name before their own. That is not weakness — people follow humble leaders further, because everyone can see the mission matters more to them than the spotlight.",
        takeaway: "People follow humble leaders further.",
        interactions: [
          {
            type: "scenario",
            prompt: "Your project just won the school award. Journalists ask, 'Who did this?' Wetin humility talk?",
            options: [
              { label: "\"Na me get the idea — the others just helped small.\"", feedback: "Even if true, you just taught your team never to give their best for you again. Pride eats its own future.", good: false },
              { label: "\"Our team did this — let me tell you what each person built.\"", feedback: "Correct! Shared credit multiplies loyalty. Next project, the same team go run through wall for you.", good: true },
              { label: "Say nothing and let people guess.", feedback: "False modesty is still about you. Humility actively lifts others into the light.", good: false },
            ],
          },
        ],
      },
      {
        heading: "Learn from anybody",
        body: "The humble learn fastest because they can learn from anyone: a junior student's fresh question, a gateman's observation, a rival club's better method. This week, deliberately ask someone 'below' or outside your circle for feedback on your project — and change one thing based on it.",
        takeaway: "Humility is a learning superpower — the humble can learn from anyone.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "Why do humble builders improve faster?", options: ["People pity them", "They can receive lessons and corrections from anyone", "They work alone quietly"], answer: 1 },
              { q: "\"Na full bag of rice dey bend down\" means…", options: ["Heavy things are weak", "The more substance you carry, the more humbly you carry yourself", "Rice is valuable"], answer: 1 },
            ],
          },
        ],
      },
    ],
  },

  {
    slug: "value-excellence",
    series: "values",
    accent: "#BE185D",
    pidgin: "No 'manage am' — finish am well well.",
    proverb: { text: "Anything wey worth doing, worth doing well.", meaning: "Half-done work announces who you are. Let everything your hand touches carry quality." },
    title: "Excellence — Finish Am Well",
    emoji: "✨",
    summary: "Anything worth doing dey worth doing well. The Naija stamp the world should know us for.",
    minutes: 6,
    lessons: [
      {
        heading: "Wetin be excellence?",
        body: "Excellence is refusing to submit 'manage am like that'. It is the extra pass — the neat handwriting, the third revision, the photo retaken in better light, the report checked twice. Excellence is not perfection or expensive equipment; it is finishing everything you touch at the highest level YOUR hands can reach.",
        takeaway: "'Manage am like that' is the enemy of nation building.",
        interactions: [
          {
            type: "sort",
            prompt: "Excellence or 'manage am'? Sort these project habits.",
            buckets: ["Excellence ✨", "Manage am 😩"],
            items: [
              { text: "Rewriting the report because the first draft was rough.", bucket: 0 },
              { text: "\"The photo blur small but dem go understand.\"", bucket: 1 },
              { text: "Testing the solution twice before presenting it.", bucket: 0 },
              { text: "Submitting late and unproofread — \"na the idea matter.\"", bucket: 1 },
            ],
          },
        ],
      },
      {
        heading: "Draft am again — like Chimamanda",
        body: "Chimamanda Ngozi Adichie, one of the most celebrated writers alive, rewrites her work over and over — entire chapters thrown away and rebuilt. The books that won global prizes were not written once; they were REwritten relentlessly. Excellence is rarely a gift. It is usually a revision.",
        takeaway: "Excellence is rarely a first draft — it is a revision.",
        interactions: [
          {
            type: "quiz",
            questions: [
              { q: "The secret behind Chimamanda's excellence is…", options: ["Writing perfectly the first time", "Relentless rewriting and polishing", "Expensive writing equipment"], answer: 1 },
              { q: "For your NBC project, excellence means…", options: ["Waiting for perfect conditions before starting", "Doing your absolute best with what you have — then improving it", "Spending the most money"], answer: 1 },
            ],
          },
        ],
      },
      {
        heading: "The Naija stamp",
        body: "Every project you finish carries an invisible stamp: 'A young Nigerian built this.' Make it a stamp of quality. When your documentation is clean, your photos clear, and your solution actually works, you are not just finishing a project — you are repairing how the world sees Nigerian workmanship, one excellent finish at a time.",
        takeaway: "Every excellent finish repairs Nigeria's name in the world.",
        interactions: [
          {
            type: "scenario",
            prompt: "Your project works, but the poster get spelling mistakes and the photos dark. Presentation na tomorrow. Wetin excellence do?",
            options: [
              { label: "Present am like that — the solution na im matter.", feedback: "A great solution presented poorly gets remembered poorly. The wrapping is part of the gift.", good: false },
              { label: "Tonight: fix the spellings, re-snap 3 photos in daylight tomorrow morning, print again.", feedback: "Correct! Excellence is often just 2 extra hours nobody else was willing to spend.", good: true },
              { label: "Cancel the presentation until everything is perfect.", feedback: "Excellence ships; perfectionism hides. Improve what you can in the time you have — then show up.", good: false },
            ],
          },
        ],
      },
    ],
  },
];
