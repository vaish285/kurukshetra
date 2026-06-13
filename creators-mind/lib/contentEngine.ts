// ─── Content Engine — generates specific, actionable content per topic ────────

let seed = 0;
export function nextSeed() { return ++seed; }

// ─── Strip filler from user input ────────────────────────────────────────────
export function extractTopic(raw: string): string {
  const fillers = [
    "i want a content on","i want content on","i want to make a video on",
    "i want to post about","make content on","create content on",
    "content about","video about","reel about","post about",
    "i want to talk about","topic is","my topic is","idea is",
    "i want","make a","create a","give me","help me with","content on",
  ];
  let d = raw.trim().toLowerCase();
  for (const f of fillers) {
    if (d.startsWith(f)) { d = d.slice(f.length).trim(); break; }
  }
  return d.charAt(0).toUpperCase() + d.slice(1);
}

// ─── Niche definitions ────────────────────────────────────────────────────────
export type NicheData = {
  niche: string;
  keywords: string[];
  // What to actually DO/film — specific actions
  contentIdeas: string[][];   // [variation][steps]
  songs: string[];            // trending songs for this niche
  hooks: string[];
  painPoints: string[];
  tips: string[];
  stats: string[];
  hashtags: string[];
  captions: { short: string[]; long: string[] };
  viralTips: string[];
  performance: {
    energy: string; opening: string; pacing: string;
    expression: string; camera: string; cta: string;
  }[];
};

export const NICHES: Record<string, NicheData> = {
  fitness: {
    niche: "Fitness & Workout",
    keywords: ["fitness","workout","gym","weight","muscle","exercise","training","body","fat","calories","protein","cardio","strength","squat","pushup","abs","hiit","yoga","pilates","running"],
    contentIdeas: [
      [
        "🎬 WHAT TO FILM: A 60-second morning workout reel",
        "Move 1 — 15 Push-ups (film from side angle, show full range)",
        "Move 2 — 20 Bodyweight Squats (film from front, go deep)",
        "Move 3 — 30-second Plank (film from side, keep hips level)",
        "Move 4 — 20 Jump Lunges (film from front, show the jump)",
        "Move 5 — 10 Burpees (film from side, show the full movement)",
        "📸 End shot: you breathing hard, hands on knees, then look up and smile at camera",
        "🎵 Use trending audio — cut each move to the beat drop",
      ],
      [
        "🎬 WHAT TO FILM: Before/After transformation reveal",
        "Start with back to camera, arms crossed",
        "Turn around slowly on the beat drop",
        "Show your current physique confidently — flex or pose naturally",
        "Cut to: close-up of your face, genuine smile",
        "Text overlay: 'X weeks / X months of consistency'",
        "📸 Film in good lighting — natural window light or ring light",
        "🎵 Use 'Levitating' by Dua Lipa or 'As It Was' by Harry Styles for the reveal",
      ],
      [
        "🎬 WHAT TO FILM: 'What I eat in a day' fitness edition",
        "Shot 1: Morning — show your protein breakfast (eggs, oats, shake)",
        "Shot 2: Pre-workout snack — banana + peanut butter",
        "Shot 3: Post-workout meal — rice, chicken, veggies on a plate",
        "Shot 4: Evening — cottage cheese or Greek yogurt",
        "Film each meal from above (flat lay) AND from the side",
        "📸 Use natural light, clean background, no clutter",
        "🎵 Use lo-fi or aesthetic background music — keep it calm",
      ],
    ],
    songs: ["'Superhero' — Metro Boomin","'Calm Down' — Rema","'Flowers' — Miley Cyrus","'Escapism' — RAYE","'Creepin' — Metro Boomin"],
    hooks: [
      "I did this workout every morning for 30 days. Here's what happened to my body.",
      "Stop going to the gym until you watch this.",
      "The 5-minute morning workout that changed my entire body.",
      "Nobody told me fitness was this simple. I wasted 2 years doing it wrong.",
      "Do these 3 exercises every day and your body will never be the same.",
    ],
    painPoints: ["spending hours in the gym with zero results","trying every diet and still not losing weight","feeling motivated for 2 weeks then quitting"],
    tips: ["progressive overload every week — add 1 rep or 2.5kg","0.8g protein per pound of bodyweight daily","compound movements: squat, deadlift, bench = 80% of results","sleep 7–9 hours — muscles grow during rest, not during workout","consistency over 90 days beats any 30-day challenge"],
    stats: ["80% of people quit fitness goals by February","Nutrition = 70% of your body transformation","3 days/week strength training is enough for most people"],
    hashtags: ["#FitnessMotivation","#WorkoutTips","#FitLife","#GymLife","#HealthyLifestyle","#FitnessJourney","#WeightLoss","#BodyTransformation","#HomeWorkout","#FitnessTips","#GymMotivation","#WorkoutRoutine","#FitFam","#HealthAndFitness","#ExerciseDaily"],
    captions: {
      short: [
        "POV: you finally stopped making excuses 💪 #fitness #workout",
        "30 days of this workout = this result 🔥 Save this for tomorrow morning",
        "The only bad workout is the one you didn't do 👇 Full routine below",
        "Your future body is built in the moments you don't feel like it 💯",
        "This 5-minute routine hits every muscle. No gym needed. 🏠💪",
      ],
      long: [
        "Let me be honest about fitness.\n\nI spent 2 years going to the gym with zero results. Wrong exercises. Wrong diet. No plan.\n\nThen I learned 3 things that changed everything:\n\n→ Progressive overload (add weight/reps every week)\n→ Protein first (0.8g per pound of bodyweight)\n→ Compound movements only (squat, deadlift, bench)\n\nIn 90 days I saw more progress than in the previous 2 years combined.\n\nSave this. Start tomorrow. Your body will thank you in 3 months. 💪\n\nWhat's your biggest fitness struggle? Drop it below 👇",
        "Nobody talks about the mental side of fitness.\n\nThe hardest part isn't the workout. It's showing up on the days you don't feel like it.\n\nHere's what keeps me consistent:\n\n1. Workout clothes on before I think about it\n2. 5-minute minimum rule — just start, you can stop after 5 mins (you never do)\n3. Track everything — seeing progress is addictive\n4. Same time every day — it becomes automatic\n\nYou don't need motivation. You need a system.\n\nFollow for daily fitness content that actually works 🔥",
      ],
    },
    viralTips: [
      "Post your workout reel between 6–8 AM or 6–9 PM — peak fitness scroll time",
      "Show your FACE and real effort — sweating, breathing hard = authentic = more shares",
      "Add text overlays with reps/sets — viewers save these as reference",
      "Use before/after format — highest engagement in fitness niche by far",
      "Reply to every comment in first 30 mins — algorithm boosts early engagement",
    ],
    performance: [
      { energy: "High energy, intense — you're mid-workout, not posing", opening: "Start already moving. Don't say hi. First frame = first exercise. Let the action hook them.", pacing: "Cut on every rep change. Fast cuts = energy. Match cuts to the beat.", expression: "Focused and intense during moves. Big smile at the end — the relief/pride face.", camera: "Film from multiple angles — side for squats/lunges, front for push-ups. Stabilise with a tripod or lean phone against something.", cta: "End breathing hard. Look at camera. Say 'Save this for tomorrow morning' — direct and confident." },
      { energy: "Motivational and real — show the struggle AND the result", opening: "Start with the 'before' moment — tired, unmotivated. Then cut to you crushing it.", pacing: "Slow at the start (emotional), fast during the workout montage, slow again at the end.", expression: "Real struggle face during hard parts. Genuine pride at the end. Don't fake it.", camera: "Mix of close-ups (face, muscles working) and wide shots (full body movement).", cta: "Look straight at camera after the last rep. Pause. Then say your CTA slowly." },
    ],
  },

  dance: {
    niche: "Dance & Choreography",
    keywords: ["dance","dancing","choreography","reel","trend","step","move","routine","hip hop","classical","bollywood","freestyle","tiktok dance","viral dance","contemporary","jazz","salsa","bhangra"],
    contentIdeas: [
      [
        "🎬 WHAT TO FILM: Trending dance reel",
        "Song: 'Calm Down' by Rema & Selena Gomez",
        "Step 1 (0:00–0:03): Start with arms crossed, head down",
        "Step 2 (0:03–0:07): On the beat drop — arms open wide, head up, step right",
        "Step 3 (0:07–0:12): Hip sway left-right x4, arms follow naturally",
        "Step 4 (0:12–0:18): Spin on the 'calm down' lyric, land facing camera",
        "Step 5 (0:18–0:24): Body roll from shoulders down, end with a pose",
        "📸 Film in a well-lit room, plain wall behind you, full body in frame",
        "🎵 Use the original audio — trending audio = more reach",
      ],
      [
        "🎬 WHAT TO FILM: Bollywood/Desi dance reel",
        "Song: 'Kesariya' by Arijit Singh OR 'Jhoome Jo Pathaan'",
        "Step 1: Classic thumka — hip pop right, arms up, wrist flick",
        "Step 2: Step-touch left-right x2 with shoulder shimmy",
        "Step 3: Spin with dupatta/scarf (or just arms flowing)",
        "Step 4: Signature Bollywood hand gesture — bring hands to heart, then open out",
        "Step 5: End pose — one hand on hip, other extended, chin up",
        "📸 Wear something colourful — it pops on screen. Film in good light.",
        "🎵 Sync your moves to the mukhda (chorus) — that's the viral moment",
      ],
      [
        "🎬 WHAT TO FILM: 'Teach me your move' duet-bait reel",
        "Film yourself doing ONE signature move in slow motion first",
        "Then show it at normal speed",
        "Then break it down: 'Step 1... Step 2... Step 3...'",
        "End with the full move at full speed to the beat",
        "📸 Film from the front, full body. Slow-mo = use your phone's slo-mo mode",
        "🎵 Use 'Flowers' by Miley Cyrus or 'Unholy' by Sam Smith",
        "💡 This format gets DUETS — people try your move = free reach",
      ],
    ],
    songs: ["'Calm Down' — Rema ft. Selena Gomez","'Kesariya' — Arijit Singh","'Jhoome Jo Pathaan' — Arijit Singh","'Flowers' — Miley Cyrus","'Unholy' — Sam Smith","'Pasoori' — Ali Sethi","'Besharam Rang' — Shilpa Rao","'Naatu Naatu' — MM Keeravani"],
    hooks: [
      "Learn this dance in 60 seconds — I'll break it down step by step.",
      "This move went viral for a reason. Here's how to do it.",
      "POV: you finally nail the move you've been practising for weeks.",
      "I learned this dance in 1 day. Here's the exact breakdown.",
      "The trending step everyone's doing — and how to make it look good.",
    ],
    painPoints: ["not knowing which trending song to dance to","moves looking stiff on camera","not knowing how to start a dance reel"],
    tips: ["sync your key move to the beat drop — that's the viral moment","film in front of a plain wall — background distracts from your movement","slow-mo breakdown + full speed = most saved dance content","wear fitted clothes — loose clothes hide your movement","practice the 3-second hook move 20 times before filming"],
    stats: ["Dance reels get 3x more shares than talking-head videos","Reels with trending audio get 2–3x more reach","Tutorial-style dance content gets 5x more saves"],
    hashtags: ["#DanceReels","#DanceTrend","#LearnThisDance","#DanceChallenge","#ReelsDance","#BollywoodDance","#DanceVideo","#TrendingDance","#DanceTutorial","#DanceLife","#Choreography","#DanceCover","#InstaDance","#DanceIndia","#ViralDance"],
    captions: {
      short: [
        "Learn this in 60 seconds 👇 Step-by-step breakdown in the reel 🕺",
        "POV: you finally nail the trending move 💃 Save this to practise later",
        "This song + this move = viral. You're welcome 🎵🔥",
        "Teach me yours in the comments and I'll learn it 👇 #dancechallenge",
        "The move everyone's doing — here's how to actually do it right 💯",
      ],
      long: [
        "Dance tip nobody tells you:\n\nThe move doesn't matter as much as the TIMING.\n\nHit the beat drop with your biggest move every single time.\n\nHere's the breakdown for this reel:\n→ Arms crossed at the start (builds anticipation)\n→ Open on the beat drop (the payoff)\n→ Hip sway to keep the energy going\n→ Spin on the lyric change\n→ End pose — hold it for 2 seconds\n\nPractise this 10 times before filming. Your body needs to know it before the camera does.\n\nDuet this with your version — I want to see it! 💃",
        "The secret to viral dance reels:\n\n1. Pick a song that's trending RIGHT NOW (check the Reels audio tab)\n2. Learn ONE signature move from that song — not the whole thing\n3. Film it 3 ways: slow-mo breakdown, normal speed, then full energy\n4. Post between 6–9 PM when your audience is scrolling\n\nThat's it. That's the formula.\n\nSave this for your next reel 🎵\n\nWhat song should I do next? Drop it below 👇",
      ],
    },
    viralTips: [
      "Use the ORIGINAL trending audio — don't use a cover or remix, it kills reach",
      "Film your best move in the first 2 seconds — don't build up to it, start with it",
      "Add 'Learn this dance 👇' as text overlay — it drives saves and replays",
      "Post a 'duet this' CTA — when people duet your reel, your reach multiplies",
      "Comment back on every 'how did you do that?' — it signals quality to the algorithm",
    ],
    performance: [
      { energy: "Full energy, expressive — let the music move you, don't think too much", opening: "Don't start standing still. Start mid-movement or with a pose that builds anticipation. First frame should make them stop scrolling.", pacing: "Match every cut to the beat. If you're not cutting on the beat, it feels off. Use CapCut's beat sync feature.", expression: "Smile when the music is happy. Intense when the beat is heavy. Your face tells the story — don't be blank.", camera: "Full body in frame — we need to see your feet AND your head. Film in landscape first, then crop to 9:16 if needed.", cta: "End with a pose, hold for 2 seconds, then look at camera and wink or smile. Don't just stop moving abruptly." },
      { energy: "Smooth and confident — make it look effortless even if it took 50 takes", opening: "Start with back to camera or eyes closed. Open/turn on the first beat. Instant intrigue.", pacing: "Slow build, then hit hard on the chorus. Let the music dictate your speed.", expression: "Confident smirk throughout. This is YOUR moment — own it.", camera: "Slightly lower angle (phone on floor pointing up) makes movement look more powerful and dramatic.", cta: "Freeze on the last beat. Hold the pose. Text overlay: 'Your turn 👇'" },
    ],
  },

  skincare: {
    niche: "Skincare & Beauty",
    keywords: ["skincare","skin","acne","glow","beauty","moisturizer","serum","routine","face","spf","sunscreen","cleanser","toner","retinol","vitamin c","dark spots","oily skin","dry skin"],
    contentIdeas: [
      [
        "🎬 WHAT TO FILM: Morning skincare routine reel",
        "Step 1: Show your face before routine — no filter, natural light",
        "Step 2: Cleanser — film yourself applying and rinsing (30 sec clip)",
        "Step 3: Toner — show the cotton pad or hands patting it in",
        "Step 4: Vitamin C serum — show 2–3 drops on fingertips",
        "Step 5: Moisturiser — show application in upward strokes",
        "Step 6: SPF — show applying generously (most people under-apply)",
        "End: Show your glowing skin after — same angle as the before shot",
        "📸 Film in natural window light. No ring light — it washes out skin texture.",
        "🎵 Use aesthetic lo-fi or 'Get Him Back' by Olivia Rodrigo",
      ],
      [
        "🎬 WHAT TO FILM: 'Skin transformation' before/after",
        "Before: Raw, unfiltered close-up of your skin concern (acne, dullness, etc.)",
        "During: Show your 3-product routine in 15 seconds",
        "After: Same close-up angle, glowing result",
        "Text overlay: 'Week 1 vs Week 8' or 'Before vs After [product name]'",
        "📸 Same lighting, same angle for before and after — consistency is key",
        "🎵 Use 'Flowers' by Miley Cyrus for the reveal moment",
        "💡 This format gets the most saves in the skincare niche",
      ],
    ],
    songs: ["'Flowers' — Miley Cyrus","'As It Was' — Harry Styles","'Escapism' — RAYE","'About Damn Time' — Lizzo","'Golden Hour' — JVKE"],
    hooks: ["My skin was a mess 6 months ago. Here's exactly what changed it.","The 3 skincare products that actually work (dermatologist approved).","Stop buying skincare until you watch this.","I tried 20 products. These 3 are the only ones that matter.","Your skin isn't the problem. Your routine is."],
    painPoints: ["spending hundreds on products that don't work","not knowing what order to apply skincare","breaking out from products meant to help"],
    tips: ["SPF every morning — #1 anti-aging product, full stop","less is more: 3-step routine beats 12-step","retinol at night, vitamin C in morning — never mix them","patch test every new product for 48 hours","results take 6–8 weeks — most people quit at week 3"],
    stats: ["SPF prevents 90% of visible skin aging","Most people see results after 6–8 weeks, not days","The average person uses 7 skincare products — most cancel each other out"],
    hashtags: ["#SkincareRoutine","#GlowUp","#SkincareTips","#ClearSkin","#SkincareAddict","#BeautyTips","#NaturalSkincare","#AntiAging","#SkincareJourney","#GlowingSkin","#SkincareCommunity","#AcneSkin","#SkincareObsessed","#BeautyRoutine","#HealthySkin"],
    captions: {
      short: ["My skin transformation in 8 weeks 👇 3 products, no filters 🌟","Stop buying random skincare. Start here 👇 #skincare #glowup","The only 3 products your skin actually needs 💧 Save this","POV: your skin finally starts cooperating 🥹✨","Before vs after 8 weeks of THIS routine 👇"],
      long: ["Real talk about skincare:\n\nI spent ₹15,000 on products that did nothing.\n\nThen I learned: less is more.\n\nMy current routine:\n→ Gentle cleanser (CeraVe or Cetaphil)\n→ Niacinamide serum (The Ordinary — ₹600)\n→ SPF 50 every single morning\n\nThat's it. 3 products. 8 weeks. Completely different skin.\n\nThe secret? Consistency. Not expensive products.\n\nSave this and try it for 60 days. Your skin will thank you. 🌟\n\nWhat's your biggest skin concern? Drop it below 👇","The skincare order nobody explains:\n\n1. Cleanser (removes dirt)\n2. Toner (balances pH)\n3. Serum (active ingredients)\n4. Moisturiser (locks it in)\n5. SPF (protects everything)\n\nApply thinnest to thickest. Always.\n\nBreaking out from your routine? You're probably layering wrong.\n\nSave this as your reference 📌\n\nFollow for more skincare tips that actually make sense 💧"],
    },
    viralTips: ["Before/after content gets 4x more saves than tips-only content in skincare","Film in natural light — ring lights make skin look flat and fake","Tag the products you use — brand accounts often repost and share","'Get ready with me' format outperforms standalone routine videos","Post consistently for 30 days — skincare audiences are loyal once they trust you"],
    performance: [
      { energy: "Calm, trustworthy, like a knowledgeable friend — not a salesperson", opening: "Start with your bare face, no makeup, natural light. Vulnerability builds trust instantly in the skincare niche.", pacing: "Slow and deliberate. Show each product clearly. Don't rush — people are watching to learn.", expression: "Genuine and relaxed. Smile when showing results. Look directly at camera when giving tips.", camera: "Close-up on your face and hands. Natural window light from the side. No filters on the 'before' shot.", cta: "Hold up the product at the end. Say 'This is the one' and point to it. Then look at camera: 'Save this for later.'" },
      { energy: "Excited and relatable — 'I can't believe this worked' energy", opening: "Start with the problem — show your skin concern close up, no filter. Honesty = trust = saves.", pacing: "Quick cuts between products, slow reveal of the result. Build anticipation.", expression: "Genuine surprise and happiness at the result. This is the emotion that makes people share.", camera: "Same angle and lighting for before and after — consistency makes the transformation believable.", cta: "Point at your skin at the end. 'This is real. No filter. 8 weeks.' Then smile at camera." },
    ],
  },
  food: {
    niche: "Food & Cooking",
    keywords: ["food","cook","recipe","meal","eat","kitchen","bake","restaurant","nutrition","diet","healthy","snack","breakfast","lunch","dinner","dessert","street food","homemade"],
    contentIdeas: [
      [
        "🎬 WHAT TO FILM: 60-second recipe reel",
        "Shot 1 (3 sec): Ingredients flat lay — everything on a clean surface from above",
        "Shot 2 (5 sec): Chopping/prepping — close-up, satisfying cuts",
        "Shot 3 (5 sec): Cooking — sizzle in the pan, steam rising",
        "Shot 4 (5 sec): Plating — slow pour of sauce, garnish going on",
        "Shot 5 (5 sec): First bite — genuine reaction, close-up on your face",
        "Shot 6 (3 sec): Final dish beauty shot from above",
        "📸 Film on a clean white or wooden surface. Natural light only.",
        "🎵 Use satisfying ASMR sounds + trending audio layered underneath",
      ],
      [
        "🎬 WHAT TO FILM: 'What I eat in a day — healthy edition'",
        "Morning: Overnight oats or smoothie bowl — film from above",
        "Snack: Fruits + nuts — quick 3-second shot",
        "Lunch: Balanced plate — protein + carb + veggies, film from 45° angle",
        "Dinner: Home-cooked meal — show the cooking process in 10 seconds",
        "End: Show your energy/mood — 'This is how I feel eating like this'",
        "📸 Consistent aesthetic — same filter, same surface for all shots",
        "🎵 Use lo-fi beats or 'Golden Hour' by JVKE",
      ],
    ],
    songs: ["'Golden Hour' — JVKE","'Watermelon Sugar' — Harry Styles","'Levitating' — Dua Lipa","'As It Was' — Harry Styles","'Blinding Lights' — The Weeknd"],
    hooks: ["I made this in 10 minutes and it tastes better than any restaurant.","The easiest healthy meal you'll ever make — 5 ingredients.","Stop ordering food. Make this instead.","This recipe changed how I eat every single day.","The meal prep that saves me 5 hours every week."],
    painPoints: ["spending too much on takeout","making the same 3 meals on repeat","wasting groceries every week"],
    tips: ["meal prep Sunday = 5+ hours saved during the week","season in layers — salt at every stage, not just at the end","high heat for searing, low heat for sauces","mise en place: prep everything before you start cooking","master 5 base sauces = 50 different dishes"],
    stats: ["Home-cooked meals cost 5x less than restaurant meals","The average family wastes ₹10,000 in food per year","Meal prepping saves 2–3 hours per week on average"],
    hashtags: ["#FoodReels","#RecipeOfTheDay","#HealthyEating","#MealPrep","#HomeCooking","#FoodPhotography","#EasyRecipes","#CookingTips","#FoodBlogger","#WhatIEatInADay","#HealthyFood","#FoodLovers","#QuickRecipes","#IndianFood","#FoodTrend"],
    captions: {
      short: ["Made this in 10 minutes 🍳 Recipe in the reel 👇 #food #recipe","5 ingredients. 10 minutes. Better than takeout. 🔥 Save this","POV: you finally stop ordering food every night 💪 #mealprep","This is what healthy eating actually looks like 👇 No diet culture","The easiest meal prep you'll ever do 🥗 Full breakdown below"],
      long: ["I used to spend ₹8,000/month on food delivery.\n\nNow I spend ₹2,000 and eat better.\n\nHere's how:\n\n→ Sunday meal prep (2 hours = 5 days of meals)\n→ 3 base proteins: chicken, eggs, paneer\n→ 2 base carbs: rice, roti\n→ Rotate the sauces and spices\n\nSame ingredients, completely different meals every day.\n\nSave this recipe and try it this Sunday 🍳\n\nWhat's your go-to quick meal? Drop it below 👇","The secret to cooking that nobody tells you:\n\nIt's not the recipe. It's the technique.\n\nLearn these 3 things and you can cook anything:\n\n1. How to season properly (layers, not just at the end)\n2. Heat control (high for searing, low for sauces)\n3. Mise en place (prep everything before you start)\n\nOnce you know these, any recipe becomes easy.\n\nSave this for your next cooking session 🍳\n\nFollow for more recipes that actually make sense 👨‍🍳"],
    },
    viralTips: ["ASMR cooking sounds get 2x more watch time — use a good mic or film close","Overhead shots of plating are the most shared food content","Show the FIRST BITE reaction — it's the most engaging moment in food reels","Post at 11 AM–1 PM (lunch scroll) or 6–8 PM (dinner planning time)","Recipe in the caption = more saves = algorithm boost"],
    performance: [
      { energy: "Warm, inviting, like you're cooking for someone you love", opening: "Start with the finished dish — show the result first, then cut back to 'here's how I made it'. Reverse reveal keeps people watching.", pacing: "Match cuts to satisfying moments — the sizzle, the pour, the chop. Each cut should feel satisfying.", expression: "Genuine enjoyment when tasting. Don't fake it — real reactions are what people share.", camera: "Overhead (flat lay) for ingredients and plating. 45° angle for cooking process. Close-up for the first bite.", cta: "Hold up the finished dish. 'Make this tonight.' Simple, direct, confident." },
      { energy: "Excited and proud — 'I can't believe I made this' energy", opening: "Start with the first bite reaction — then cut to 'let me show you how I made this'.", pacing: "Quick and energetic. This isn't a cooking class — it's a highlight reel.", expression: "Genuine surprise and satisfaction. The 'mmm' face when tasting is the most shareable moment.", camera: "Mix of close-ups (texture, steam, sauce) and wide shots (full dish). Movement adds life.", cta: "Point at the dish. 'Save this for tonight.' Then smile." },
    ],
  },
};

// ─── Match user description to a niche ───────────────────────────────────────
export function matchNiche(description: string): NicheData | null {
  const d = description.toLowerCase();
  for (const data of Object.values(NICHES)) {
    if (data.keywords.some(kw => d.includes(kw))) return data;
  }
  return null;
}

// ─── Build the full kit ───────────────────────────────────────────────────────
export function buildKit(description: string, platform: string, seed: number) {
  const topic = extractTopic(description);
  const pl = platform.toLowerCase();
  const v = seed % 5;
  const niche = matchNiche(description);

  const nicheLabel = niche?.niche ?? topic;
  const contentIdea = niche?.contentIdeas[v % (niche.contentIdeas.length)] ?? [
    `🎬 WHAT TO FILM: A reel about ${topic}`,
    `Start with a bold statement or question about ${topic}`,
    `Show 3 key points or steps related to ${topic}`,
    `End with your result or transformation`,
    `📸 Film in good natural light, clean background`,
  ];
  const song = niche?.songs[v % niche.songs.length] ?? "Use a currently trending audio on your platform";
  const hook = niche?.hooks[v % niche.hooks.length] ?? `The truth about ${topic} that nobody talks about.`;
  const perf = niche?.performance[v % niche.performance.length] ?? {
    energy: "Confident and direct", opening: `Start with your hook immediately — no intro, no 'hey guys'`,
    pacing: "Cut every 3–4 seconds, match cuts to the beat",
    expression: "Engaged and genuine — talk to the camera like a friend",
    camera: "Eye level, natural light, clean background, vertical 9:16",
    cta: "Look at camera, pause, then deliver your CTA confidently",
  };

  const tip1 = niche?.tips[v % (niche.tips.length ?? 1)] ?? `be consistent with ${topic}`;
  const tip2 = niche?.tips[(v+1) % (niche?.tips.length ?? 1)] ?? `track your progress`;
  const tip3 = niche?.tips[(v+2) % (niche?.tips.length ?? 1)] ?? `double down on what works`;
  const stat = niche?.stats[v % (niche?.stats.length ?? 1)] ?? "";
  const painPoint = niche?.painPoints[v % (niche?.painPoints.length ?? 1)] ?? `struggling with ${topic}`;

  const scriptIntros = [
    `${hook} And I'm going to prove it to you in the next 60 seconds.`,
    `Let me be real about ${nicheLabel}. I was ${painPoint} — until I found this.`,
    `Quick question: how long have you been dealing with ${painPoint}? If it's more than a month, watch this.`,
    `${hook} Here's the breakdown.`,
    `I spent months figuring out ${nicheLabel}. Here's the shortcut.`,
  ];
  const scriptBodies = [
    `Here's what nobody tells you about ${nicheLabel}:\n\n${tip1}.\n\nMost people skip this because it sounds too simple. Don't.\n\nThen: ${tip2}.\n\nAnd finally: ${tip3}.\n\n${stat ? `Here's the data: ${stat}.` : ""}\n\nThese three things compound. Do them for 30 days and you'll see a difference you can't ignore.`,
    `The problem with ${nicheLabel} is everyone overcomplicates it.\n\nStrip it back:\n\nFirst — ${tip1}.\nSecond — ${tip2}.\nThird — ${tip3}.\n\n${stat ? stat + "." : ""}\n\nSimple beats complicated every single time. I've seen it over and over.`,
    `My exact framework for ${nicheLabel}:\n\nStep 1: ${tip1}\nStep 2: ${tip2}\nStep 3: ${tip3}\n\n${stat ? `Why it works: ${stat}.` : ""}\n\nThe hard part isn't knowing what to do. It's doing it consistently when you don't feel like it.`,
  ];
  const ctaMap: Record<string, string[]> = {
    youtube: [`Hit like if this helped — it tells me to make more ${nicheLabel} content. Subscribe for the full breakdown next week.`, `Subscribe and comment your biggest ${nicheLabel} challenge — I'll answer every one.`],
    instagram: [`Save this — you'll want it later. Follow for more ${nicheLabel} content every week.`, `Tag someone who needs to see this about ${nicheLabel}. Follow for more.`],
    tiktok: [`Follow for part 2. Comment 'MORE' if you want the full breakdown.`, `Duet this with your own ${nicheLabel} experience. Follow for more.`],
    linkedin: [`Repost if this resonated. Follow for weekly ${nicheLabel} insights.`, `What's your experience with ${nicheLabel}? Drop it in the comments.`],
  };
  const ctaList = ctaMap[pl] ?? ctaMap.instagram;

  const script = {
    intro: scriptIntros[v % scriptIntros.length],
    body: scriptBodies[v % scriptBodies.length],
    cta: ctaList[v % ctaList.length],
  };

  const caption_short = niche?.captions.short[v % niche.captions.short.length]
    ?? `The truth about ${topic} 👇 #${topic.toLowerCase().replace(/\s+/g,"")}`;
  const caption_long = niche?.captions.long[v % niche.captions.long.length]
    ?? `Real talk about ${topic}.\n\n→ ${tip1}\n→ ${tip2}\n→ ${tip3}\n\nSave this. Start today. 💪`;

  const platformTags: Record<string, string[]> = {
    youtube: ["#YouTube","#YouTubeTips","#ContentCreator","#YouTubeGrowth"],
    instagram: ["#Instagram","#Reels","#InstagramGrowth","#InstagramTips"],
    tiktok: ["#TikTok","#FYP","#ForYouPage","#TikTokTips"],
    linkedin: ["#LinkedIn","#LinkedInTips","#PersonalBranding","#ProfessionalGrowth"],
  };
  const hashtags = [...(niche?.hashtags ?? []), ...(platformTags[pl] ?? [])].slice(0, 20);

  const thumbnailSets = [
    [`The TRUTH About ${topic} (Nobody Talks About This)`, `I Tried ${topic} For 30 Days — Here's What Happened`, `${topic}: What Actually Works in ${new Date().getFullYear()}`],
    [`Stop Making This Mistake With ${topic}`, `How I Finally Cracked ${topic}`, `${topic} — The Honest Truth`],
    [`From Zero to Results: My ${topic} Journey`, `The ${topic} System That Actually Works`, `Why Most People Fail At ${topic} (And How to Win)`],
  ];
  const thumbnails = thumbnailSets[v % thumbnailSets.length];
  const viralTips = niche?.viralTips ?? [
    `Post between 6–9 PM — peak scroll time for your audience`,
    `Add text overlays on key points — 60% of people watch on mute`,
    `Reply to every comment in the first hour — algorithm rewards early engagement`,
    `Use trending audio — it gives 2–3x more reach`,
  ];

  return { topic, nicheLabel, contentIdea, song, hook, perf, script, caption_short, caption_long, hashtags, thumbnails, viralTips };
}

export type Kit = ReturnType<typeof buildKit>;
