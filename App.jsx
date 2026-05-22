import { useState } from "react";

// ─── QUESTIONS ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: "destination",
    question: "Where is your family headed?",
    sub: "City, country, or region",
    type: "text",
    placeholder: "e.g. Rome, Italy",
    emoji: "🗺️",
  },
  {
    id: "duration",
    question: "How many days is your trip?",
    sub: "We'll pace everything perfectly for families",
    type: "select",
    emoji: "📅",
    options: ["2–3 days", "4–5 days", "6–7 days", "1–2 weeks", "2+ weeks"],
  },
  {
    id: "kids",
    question: "How old are your kids?",
    sub: "Select all that apply — we tailor content to every age",
    type: "multi",
    emoji: "👨‍👩‍👧‍👦",
    options: [
      { label: "Toddler", sub: "Ages 1–3", id: "toddler" },
      { label: "Little Explorer", sub: "Ages 4–6", id: "little" },
      { label: "Curious Kid", sub: "Ages 7–9", id: "curious" },
      { label: "Adventure Seeker", sub: "Ages 10–12", id: "adventure" },
      { label: "Teen Traveller", sub: "Ages 13+", id: "teen" },
    ],
  },
  {
    id: "kidnames",
    question: "What are your kids' names?",
    sub: "We'll personalise parts of the playbook directly to them",
    type: "text",
    placeholder: "e.g. Sofia (8), James (11), Mia (5)",
    emoji: "✏️",
  },
  {
    id: "interests",
    question: "What does your family love?",
    sub: "Pick everything that applies",
    type: "multi",
    emoji: "✨",
    options: [
      { label: "🏛️ History & Stories", id: "history" },
      { label: "🌿 Nature & Wildlife", id: "nature" },
      { label: "🍕 Food & Cooking", id: "food" },
      { label: "🎨 Art & Culture", id: "art" },
      { label: "⚽ Sport & Active", id: "sport" },
      { label: "🔬 Science & Discovery", id: "science" },
    ],
  },
  {
    id: "notes",
    question: "Anything else we should know?",
    sub: "Dietary needs, mobility, nap schedules, special occasion…",
    type: "text",
    emoji: "💬",
    placeholder: "e.g. One child uses a wheelchair, celebrating grandma's birthday",
    optional: true,
  },
];

// ─── TIERS ────────────────────────────────────────────────────────────────────

const TIERS = [
  {
    id: "essential",
    name: "Explorer",
    price: 17,
    badge: null,
    tagline: "The essential family itinerary",
    features: [
      "Day-by-day itinerary built for families",
      "Age-specific talking points at every attraction",
      "One real historical character per day",
      "Sticky fun facts kids will repeat for years",
      "Family survival tips most guides miss",
    ],
    cta: "Get Explorer — $17",
    highlight: false,
  },
  {
    id: "playbook",
    name: "Playbook",
    price: 27,
    badge: "Most Popular",
    tagline: "The full learning adventure",
    features: [
      "Everything in Explorer",
      "Before You Land Briefing — story, mystery & character primer",
      "Age-specific scavenger hunts (location-specific, not generic)",
      "Age-specific challenges beyond the hunt",
      "Dinner table conversation starters every evening",
    ],
    cta: "Get Playbook — $27",
    highlight: true,
  },
  {
    id: "family-pack",
    name: "Family Pack",
    price: 47,
    badge: "Best Value",
    tagline: "The complete before, during & after kit",
    features: [
      "Everything in Playbook",
      "Personal Kid Briefings — written directly to each child by name",
      "The One Moment per day — phone-down, be-present scenes",
      "Memory journal prompts written to each child",
      "Post-trip school project & show-and-tell guide",
    ],
    cta: "Get Family Pack — $47",
    highlight: false,
  },
];

// ─── PROMPT BUILDER ───────────────────────────────────────────────────────────

function buildPrompt(answers, tier) {
  const ageGroups = Array.isArray(answers.kids) ? answers.kids : [];
  const interests = Array.isArray(answers.interests) ? answers.interests : [];
  const kidNames = answers.kidnames || "the kids";

  const ageLabels = {
    toddler: "Toddlers (1–3)",
    little: "Little Explorers (4–6)",
    curious: "Curious Kids (7–9)",
    adventure: "Adventure Seekers (10–12)",
    teen: "Teens (13+)",
  };

  const agesText = ageGroups.map(a => ageLabels[a] || a).join(", ");

  const hasToddler = ageGroups.includes("toddler");
  const hasLittle = ageGroups.includes("little");
  const hasCurious = ageGroups.includes("curious");
  const hasAdventure = ageGroups.includes("adventure");
  const hasTeen = ageGroups.includes("teen");
  const hasYoung = hasToddler || hasLittle;
  const hasMid = hasCurious || hasAdventure;

  return `You are a brilliant educator who deeply loves travel, children, and making the world feel magical and meaningful. You write the way the best teacher any child ever had would speak — with warmth, specificity, genuine enthusiasm, and total respect for a child's intelligence at every age. You never talk down to kids. You never use hollow filler. Every sentence earns its place.

FAMILY PROFILE:
- Destination: ${answers.destination}
- Trip duration: ${answers.duration}
- Children: ${kidNames}
- Age groups: ${agesText}
- Family interests: ${interests.join(", ")}
- Special notes: ${answers.notes || "None"}

Your job is to create a playbook that transforms an ordinary holiday into something this family will talk about for the rest of their lives. Not because of what they saw — but because of how they understood it.

---

## Welcome to ${answers.destination}!

Write 3 sentences. The first should make a parent stop scrolling and feel something. The second should reveal one thing about this destination that surprises even well-travelled adults. The third should tell the family exactly what kind of adventure awaits them.

---

## The Trip Mystery 🔍

This is the single most important section of the whole playbook. Choose ONE compelling unanswered question or unresolved mystery about ${answers.destination} — something real historians or scientists still debate, or something hidden in plain sight that most tourists never notice. Frame it as a mission the whole family carries with them from day one to the last day.

Write it like this:
- **Your Mission:** [One sentence that plants the question in every child's mind]
- **Why it matters:** [2 sentences of genuine context — the kind a great teacher would give]
- **What to look for:** [2–3 specific things to watch for across the whole trip that connect to the mystery]
- **The Big Reveal moment:** [Suggest the exact place or moment on the trip where the family should sit down and discuss what they've found]

This mystery should feel like a thread that runs through every day. It should make kids look at things differently from the moment they land.

---

## Your Family Adventure — Day by Day

For EACH day write the following. Be specific — real place names, real dishes, real details. No generics.

### Day [N] — [Title that sounds like an adventure, not a schedule]

**Meet Today's Character: [Real historical name]**
Choose one real person who lived in or shaped ${answers.destination}. NOT a famous emperor or king — choose someone ordinary or unexpected. A craftsman, a child, a rebel, a cook, a scientist. Tell their story in 3 sentences written directly to the family: who they were, what their daily life looked like, and one moment from their life that connects to something the family will see today. End with: "Keep an eye out for [specific thing] today — it's the closest you'll get to where [character name] once stood."

**The Day:** 2 sentences on the shape of the day — morning energy, afternoon depth, evening ease.

**Morning:** Specific location. What to do, what to look for, one practical tip that saves time or unlocks something most tourists miss.

**Afternoon:** Activity + specific lunch spot with one dish to order by name. One sentence on WHY this place or thing matters that goes beyond the surface.

**Evening:** Dinner recommendation with atmosphere description. A gentle wind-down idea — a walk, a gelato, a rooftop — that lets the day settle.

**Talking Points by Age** — for EACH attraction or key moment today, write what to actually say out loud. Not facts to recite. Words a parent can speak naturally:
${hasToddler ? `- **Toddlers:** Sensory and wonder-based. "Can you feel how cold this stone is? These stones are older than your great-great-great-grandma." Point to things, name things, make sounds together.` : ""}
${hasLittle ? `- **Little Explorers (4–6):** Frame everything as a secret or a discovery. "You know what? Most people walk right past this and never notice..." Give them one job — to find one specific thing — so they feel like explorers with a mission.` : ""}
${hasCurious ? `- **Curious Kids (7–9):** Answer the WHY before they ask it. Include one fact so surprising or slightly gross that they will repeat it at school on Monday. Make the scale real — compare ancient things to things they know.` : ""}
${hasAdventure ? `- **Adventure Seekers (10–12):** Give them the real story — the drama, the conflict, the unfair bits, the heroism. Connect it to something they already care about. Treat them as almost-adults who can handle complexity.` : ""}
${hasTeen ? `- **Teens:** Drop the simplified version entirely. Give them the genuine historical or cultural tension. Ask them a question that doesn't have an easy answer. Acknowledge what's complicated or contested. They will disengage the moment they feel patronised.` : ""}

**Today's Sticky Fact 🧠**
One fact — and only one — chosen because it is genuinely surprising, funny, or slightly gross. The kind of fact a 9-year-old repeats at the dinner table three weeks later. Write it in one punchy sentence.

**The One Moment ✨** *(write this for every day)*
Describe one specific scene today — a viewpoint, a doorway, a quiet courtyard, a particular time of light — where the family should put their phones away and just be present together. Write it in 2–3 vivid sentences that make a parent actually want to do it. No generic "take in the view" — be specific about what they'll feel, hear, or see.

---

${tier.id !== "essential" ? `
## Before You Land 🛫

This section is read on the plane or in the car. It is not a list of facts. It is the foundation that makes everything else land harder when they arrive.

### The Big Story
Write 4–5 sentences that tell the story of ${answers.destination} as a place — not its Wikipedia summary, but its emotional and human truth. What kind of place is this? What has it meant to the people who lived here? What does it feel like to arrive? Make a parent want to read this out loud to their kids.

### The One Mystery (from above — repeat the mission here in a shorter form for reading aloud)
Write 2 sentences. Plant the question. Make it feel urgent and exciting.

### What To Watch For When You First Arrive
3 specific things to look for in the first hour — things most tourists walk straight past. Each one should make the family feel like insiders from the moment they land. One sentence each.

### Age-Specific Primers — read these to your kids before you arrive:
${hasToddler || hasLittle ? `
**For little ones (read as a bedtime story the night before):**
Write a 5–6 sentence story about ${answers.destination} aimed at ages 2–6. Use simple, warm language. Introduce one animal, one colour, one food, and one thing they can look forward to touching or tasting. End with: "And tomorrow, you're going to see it for real."
` : ""}
${hasCurious || hasAdventure ? `
**For kids 7–12 (read like a mission briefing):**
Write 4–5 sentences framed as a challenge or mission. Tell them one surprising thing that most adults don't know. Give them one specific thing to find or figure out on day one. Make them feel like the smartest person on the plane.
` : ""}
${hasTeen ? `
**For teens (a genuine open question to sit with):**
Write 3–4 sentences that introduce a genuine moral, political, or historical tension about ${answers.destination} — something with no easy answer. Don't resolve it. Ask them what they think. Treat them as an intelligent person whose opinion matters.
` : ""}

---

## Scavenger Hunts

Rules for every hunt: items must be SPECIFIC to ${answers.destination} — not findable anywhere else in the world. No item should be completable without actually looking carefully at the place. At least 2 items per hunt should teach something real.

${hasYoung ? `
### 🔍 Little Explorer Hunt (Ages 2–6) — 6 items
Each item: one thing to find, point to, or do. Written as "Can you find...?" Simple, joyful, achievable. At least 2 items should connect to something real about ${answers.destination}.
` : ""}
${hasMid ? `
### 🔍 Explorer Hunt (Ages 7–12) — 8 items
Mix of: things to find, questions to answer by looking carefully, one item that requires asking a local or reading a sign, and one "challenge" item that requires forming an opinion. Every item should be specific to this destination — not a generic "find a church" but "find the church where [specific thing happened] and count how many [specific feature] are on the door."
` : ""}
${hasTeen ? `
### 🔍 Teen Explorer Challenge (Ages 13+) — 8 items
Sophisticated and genuinely challenging. Include: architectural details that reveal something about the society that built them, one item that connects the past to something happening in the world today, one item that requires forming and defending an opinion, one photography challenge with a specific brief. Every item should feel like it was written by someone who actually knows and loves this place.
` : ""}

---

## Age-Specific Challenges

Beyond the scavenger hunt — one ongoing challenge per age group for the whole trip. Something they carry with them every day.

${hasToddler || hasLittle ? `**Little Explorers:** [A simple counting or collecting challenge — e.g. "collect one small stone from every place we visit and keep them in your pocket"]` : ""}
${hasCurious ? `**Curious Kids (7–9):** [A drawing or writing challenge — e.g. "draw one thing every day that you want to remember, and we'll make a book when we get home"]` : ""}
${hasAdventure ? `**Adventure Seekers (10–12):** [A photography challenge with a specific brief for the whole trip — e.g. "photograph the oldest thing you can find each day"]` : ""}
${hasTeen ? `**Teens:** [A journalling or social observation challenge — e.g. "write one paragraph every evening about one local person you observed — what their life might be like, what they care about"]` : ""}

---

## Dinner Table Conversation Starters

5 questions — one per evening — that help the family process what they saw that day. Not quiz questions. Real questions with no wrong answer. The kind that make a 10-year-old go quiet for a moment before answering. Write them in order — Day 1 through Day 5 (or fewer if trip is shorter).

` : ""}

${tier.id === "family-pack" ? `
## Kid Briefings — Personal Letters to Each Child

Write one personal letter for EACH child named in the family profile (${kidNames}). Address each child by name. Write it as if you are a brilliant, warm teacher writing directly to that specific child based on their age.

Each letter should:
- Open with their name and something that makes them feel seen ("You're the kind of person who notices things other people miss...")
- Give them their personal mission for the trip — something specific to their age and personality
- Tell them one secret about ${answers.destination} that is theirs to know
- Give them one specific challenge that is just for them
- End with genuine excitement: make them feel that THIS trip, with THEIR eyes and THEIR mind, is going to be unforgettable

These are meant to be read on the plane. Keep each letter to 150–200 words. Warm, direct, and completely personal.

---

## The One Moment — Full Collection ✨

List every "One Moment" from the day-by-day section here in one place, so parents can screenshot it and use it as a quick reference on the trip without flicking through the whole document. Format as a simple numbered list: Day N — [location] — [one sentence description].

---

## Memory Journal — Prompts for Each Child

Write 5 evening journal prompts for EACH age group present. These are not "what did you see today" prompts. They are emotional and imaginative:
- What surprised you most today?
- If you could bring one person from the past back to life and show them what this place looks like now, who would you choose and why?
- If you lived here, what would your bedroom look like? What could you hear from your window?
Write them so a child actually wants to answer them.

---

## Post-Trip Learning

**Show & Tell (Ages 4–8):** A step-by-step guide for helping a young child present their trip to their class. Include: 3 things to bring in, 3 sentences to practise saying, and one question to be ready for.

**School Report Starter (Ages 9–12):** 3 specific essay topics with one strong opening sentence for each. Topics should be genuinely interesting — not "the history of Rome" but "Why did the Roman Empire fall, and could it happen to a modern country?"

**Teen Essay Prompt:** One question that requires genuine reflection and personal opinion. Something they could write 1,000 words on.

` : ""}

## Family Survival Tips

Write exactly 5 tips. Each one must be:
- Specific to ${answers.destination} with kids
- Something most travel guides don't tell you
- Actionable — a parent can do something with it immediately

Cover: one transport hack, one food strategy, one timing tip for the most crowded attraction, one cultural etiquette note for children specifically, and one thing that will make a tired child's day dramatically better in this specific destination.`;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function md(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function renderPlaybook(text, answers, tier) {
  if (!text) return null;

  const lines = text.split("\n");

  const rendered = lines.map((line, i) => {
    if (!line.trim()) return <div key={i} style={{ height: "0.5rem" }} />;

    if (/^## /.test(line)) return (
      <h2 key={i} style={{
        fontFamily: "'Fraunces', serif",
        fontSize: "1.5rem", fontWeight: 900,
        color: "#1a3a6b",
        marginTop: "2.5rem", marginBottom: "0.6rem",
        paddingBottom: "0.5rem",
        borderBottom: "3px solid #0288D1",
        lineHeight: 1.2,
      }}>{line.replace(/^## /, "")}</h2>
    );

    if (/^### /.test(line)) return (
      <h3 key={i} style={{
        fontFamily: "'Fraunces', serif",
        fontSize: "1.2rem", fontWeight: 700,
        color: "#1a3a6b",
        marginTop: "1.8rem", marginBottom: "0.4rem",
        background: "linear-gradient(135deg, #0288D1, #9C7FE0)",
        color: "#fff",
        padding: "0.6rem 1rem",
        borderRadius: 10,
      }}>{line.replace(/^### /, "")}</h3>
    );

    if (/^\*\*(.+?):\*\*/.test(line)) {
      const m = line.match(/^\*\*(.+?):\*\*\s*(.*)/s);
      if (m) return (
        <div key={i} style={{
          background: "#F3FAFF",
          border: "1.5px solid #E1F5FE",
          borderLeft: "4px solid #0288D1",
          borderRadius: 8,
          padding: "0.7rem 1rem",
          marginBottom: "0.5rem",
        }}>
          <strong style={{ color: "#0288D1", fontFamily: "'Fredoka', sans-serif", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{m[1]}</strong>
          <p style={{ fontSize: "0.9rem", color: "#1a3a6b", lineHeight: 1.75, marginTop: "0.2rem" }} dangerouslySetInnerHTML={{ __html: md(m[2]) }} />
        </div>
      );
    }

    if (/^[-•]\s/.test(line) || /^\d+\.\s/.test(line)) return (
      <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "0.4rem", paddingLeft: "0.5rem" }}>
        <span style={{ color: "#0288D1", fontWeight: 900, flexShrink: 0, marginTop: "0.1rem" }}>›</span>
        <p style={{ fontSize: "0.9rem", color: "#334", lineHeight: 1.75 }} dangerouslySetInnerHTML={{ __html: md(line.replace(/^[-•]\s/, "").replace(/^\d+\.\s/, "")) }} />
      </div>
    );

    return (
      <p key={i} style={{ fontSize: "0.92rem", color: "#334", lineHeight: 1.8, marginBottom: "0.4rem" }}
        dangerouslySetInnerHTML={{ __html: md(line) }} />
    );
  });

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Cover */}
      <div style={{ background: "linear-gradient(135deg, #0288D1 0%, #9C7FE0 100%)", padding: "4rem 2rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(198,255,0,0.08)", top: -60, right: -60 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Single clean logo tag */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "0.4rem 1.2rem", marginBottom: "1.5rem" }}>
            <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}>🧭 Little<span style={{ color: "#C6FF00" }}>Routes</span></span>
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: "0.6rem" }}>
            {answers.kidnames ? `${answers.kidnames.split(" ")[0]}'s` : "Your"} <em style={{ color: "#C6FF00", fontStyle: "italic" }}>{answers.destination?.split(",")[0]}</em> Playbook
          </h1>
          <p style={{ fontFamily: "'Fredoka', sans-serif", color: "rgba(255,255,255,0.7)", fontSize: "1rem", marginBottom: "1.5rem" }}>
            {answers.destination} · {answers.duration}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
            {["🗺️ Itinerary", "🧠 Talking Points", "✨ One Moments",
              ...(tier.id !== "essential" ? ["🔍 Scavenger Hunt", "🛫 Before You Land"] : []),
              ...(tier.id === "family-pack" ? ["💌 Personal Letter", "📖 Memory Journal"] : [])
            ].map(c => (
              <span key={c} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.9)", fontSize: "0.75rem", fontWeight: 700, padding: "0.3rem 0.8rem", borderRadius: 50 }}>{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: "#fff", maxWidth: 760, margin: "0 auto", padding: "2rem 2rem 4rem" }}>
        {rendered}
      </div>

      {/* Footer */}
      <div style={{ background: "#1a3a6b", padding: "2rem", textAlign: "center" }}>
        <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.1rem", fontWeight: 600, color: "#fff", marginBottom: "0.3rem" }}>
          Little<span style={{ color: "#0288D1" }}>Routes</span>
        </div>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>Family Travel Playbooks · littleroutes.co</p>
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.25)", marginTop: "0.2rem" }}>
          Created for {answers.kidnames || "your family"} · {answers.destination} · {answers.duration}
        </p>
      </div>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep] = useState("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [multiSelected, setMultiSelected] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedTier, setSelectedTier] = useState(null);
  const [email, setEmail] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const q = QUESTIONS[currentQ];

  function nextStep(newAnswers) {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setMultiSelected([]);
      setTextInput("");
    } else {
      setAnswers(newAnswers);
      setStep("tiers");
    }
  }

  function handleText() {
    if (!textInput.trim() && !q.optional) return;
    const val = textInput.trim() || "None";
    const updated = { ...answers, [q.id]: val };
    setAnswers(updated);
    nextStep(updated);
  }

  function handleMultiContinue() {
    if (multiSelected.length === 0) return;
    const updated = { ...answers, [q.id]: multiSelected };
    setAnswers(updated);
    nextStep(updated);
  }

  function toggleMulti(id) {
    setMultiSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  async function handleCheckout() {
    if (!email || !email.includes("@")) { setError("Please enter a valid email."); return; }
    setError("");
    setStep("generating");
    const prompt = buildPrompt(answers, selectedTier);
    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 8000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      if (data.error) {
        setResult("Error generating playbook: " + data.error.message);
        setStep("result");
        return;
      }
      const text = data.content?.map(b => b.text || "").join("\n") || "Could not generate.";
      setResult(text);
    } catch (e) {
      setResult("Something went wrong: " + e.message + ". Please try again.");
    }
    setStep("result");
  }

  function reset() {
    setStep("landing"); setCurrentQ(0); setAnswers({});
    setMultiSelected([]); setTextInput(""); setSelectedTier(null);
    setEmail(""); setResult(""); setError("");
  }

  const ageLabels = { toddler: "Toddlers", little: "Ages 4–6", curious: "Ages 7–9", adventure: "Ages 10–12", teen: "Teens" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400&family=Nunito:wght@400;500;600;700;800&family=Fredoka:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fff; font-family: 'Nunito', sans-serif; color: #1a3a6b; min-height: 100vh; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform:translateY(0) rotate(-2deg); } 50% { transform:translateY(-10px) rotate(2deg); } }
        @keyframes floatB { 0%,100% { transform:translateY(0) rotate(3deg); } 50% { transform:translateY(-8px) rotate(-1deg); } }
        @keyframes floatC { 0%,100% { transform:translateY(0) rotate(-1deg); } 50% { transform:translateY(-6px) rotate(3deg); } }
        @keyframes wiggle { 0%,100% { transform:rotate(-4deg); } 50% { transform:rotate(4deg); } }
        @keyframes blobPulse { 0%,100% { transform:scale(1); } 50% { transform:scale(1.08); } }
        .page { animation: fadeUp 0.4s ease both; }

        /* NAV */
        nav {
          position:fixed; top:0; left:0; right:0; z-index:100;
          display:flex; align-items:center; justify-content:space-between;
          padding:1rem 2rem;
          background:rgba(255,255,255,0.96);
          backdrop-filter:blur(12px);
          border-bottom:3px solid #E1F5FE;
        }
        .logo { display:flex; align-items:center; gap:0.5rem; }
        .logo-icon { width:36px; height:36px; border-radius:10px; background:#0288D1; display:flex; align-items:center; justify-content:center; font-size:1.2rem; box-shadow:0 4px 12px rgba(2,136,209,0.3); }
        .logo-text { font-family:'Fredoka',sans-serif; font-size:1.3rem; font-weight:600; color:#1a3a6b; }
        .logo-text span { color:#0288D1; }
        .nav-right { font-size:0.78rem; color:#90A4AE; font-weight:600; }

        /* LAYOUT */
        .main { min-height:100vh; padding-top:68px; }
        .center { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100vh; padding:2rem 1rem; background:#F3FAFF; }

        /* BUTTONS */
        .btn-main {
          display:inline-flex; align-items:center; gap:0.5rem;
          background:#0288D1; color:#fff;
          border:none; border-radius:50px;
          padding:1rem 2rem;
          font-family:'Fredoka',sans-serif; font-size:1.05rem; font-weight:600;
          cursor:pointer; transition:all 0.2s;
          box-shadow:0 5px 0 #0277BD, 0 8px 20px rgba(2,136,209,0.25);
          letter-spacing:0.01em;
        }
        .btn-main:hover { transform:translateY(-3px); box-shadow:0 8px 0 #0277BD, 0 12px 28px rgba(2,136,209,0.3); }
        .btn-main:active { transform:translateY(1px); box-shadow:0 2px 0 #0277BD; }
        .btn-main.yellow { background:#C6FF00; color:#1a3a6b; box-shadow:0 5px 0 #9DC200, 0 8px 20px rgba(198,255,0,0.25); }
        .btn-main.yellow:hover { transform:translateY(-3px); box-shadow:0 8px 0 #9DC200, 0 12px 28px rgba(198,255,0,0.3); }
        .btn-full { width:100%; justify-content:center; }
        .btn-ghost {
          display:flex; align-items:center; justify-content:center;
          background:transparent; border:2px solid #E1F5FE;
          border-radius:50px; padding:0.8rem; width:100%;
          font-family:'Fredoka',sans-serif; font-size:1rem; font-weight:500; color:#90A4AE;
          cursor:pointer; margin-top:0.7rem; transition:all 0.15s;
        }
        .btn-ghost:hover { border-color:#0288D1; color:#0288D1; }

        /* HERO CARDS */
        .hero-card-stack { position:relative; width:290px; height:340px; }
        .hcard { position:absolute; border-radius:22px; padding:1.4rem; box-shadow:0 6px 0 rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.1); }
        .hcard-1 { background:#0288D1; width:230px; top:0; left:20px; animation:float 4s ease-in-out infinite; }
        .hcard-2 { background:#9C7FE0; width:210px; top:115px; left:0; animation:floatB 4.5s ease-in-out infinite; }
        .hcard-3 { background:#fff; border:2px solid #E1F5FE; width:200px; top:220px; left:55px; animation:floatC 3.8s ease-in-out infinite; box-shadow:0 5px 0 #E1F5FE, 0 10px 30px rgba(0,0,0,0.07); }

        /* QUIZ */
        .qcard { background:#fff; border:3px solid #E1F5FE; border-radius:28px; padding:2.5rem; max-width:560px; width:100%; box-shadow:0 8px 0 #E1F5FE, 0 16px 40px rgba(0,0,0,0.06); }
        .q-emoji { font-size:2.8rem; margin-bottom:1rem; display:block; animation:wiggle 2s ease-in-out infinite; }
        .q-head { font-family:'Fredoka',sans-serif; font-size:2rem; font-weight:600; color:#1a3a6b; margin-bottom:0.3rem; line-height:1.2; }
        .q-sub { font-size:0.85rem; color:#90A4AE; margin-bottom:1.8rem; font-weight:600; }
        .prog { height:8px; background:#E1F5FE; border-radius:4px; margin-bottom:1.8rem; overflow:hidden; }
        .prog-fill { height:100%; background:linear-gradient(90deg,#0288D1,#9C7FE0); border-radius:4px; transition:width 0.4s ease; }

        .opt { display:block; width:100%; background:#F3FAFF; border:2px solid #E1F5FE; border-radius:16px; padding:0.9rem 1.1rem; text-align:left; font-family:'Nunito',sans-serif; font-size:0.92rem; font-weight:700; color:#1a3a6b; cursor:pointer; margin-bottom:0.5rem; transition:all 0.15s; }
        .opt:hover { border-color:#0288D1; background:#E1F5FE; transform:translateX(5px); }

        .multi-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; margin-bottom:1.2rem; }
        .multi-opt { background:#F3FAFF; border:2px solid #E1F5FE; border-radius:16px; padding:0.8rem 0.9rem; cursor:pointer; transition:all 0.15s; text-align:left; }
        .multi-opt.sel { border-color:#0288D1; background:#E1F5FE; }
        .multi-opt:hover { border-color:#0288D1; }
        .multi-label { font-size:0.88rem; font-weight:700; color:#1a3a6b; display:block; }
        .multi-sub { font-size:0.75rem; color:#90A4AE; font-weight:600; }
        .sel-check { float:right; color:#0288D1; font-size:1rem; font-weight:800; }

        .tinput { width:100%; background:#F3FAFF; border:2px solid #E1F5FE; border-radius:16px; padding:0.9rem 1rem; font-family:'Nunito',sans-serif; font-size:0.92rem; font-weight:600; color:#1a3a6b; outline:none; margin-bottom:1rem; transition:border 0.2s; }
        .tinput:focus { border-color:#0288D1; background:#fff; }
        .tinput::placeholder { color:#B0BEC5; }

        /* TIERS */
        .tiers-section { padding:3rem 1.5rem 4rem; background:#F3FAFF; }
        .tiers-head { text-align:center; margin-bottom:2.5rem; }
        .tiers-head h2 { font-family:'Fredoka',sans-serif; font-size:clamp(1.8rem,4vw,2.6rem); font-weight:700; color:#1a3a6b; margin-bottom:0.4rem; }
        .tiers-head p { color:#90A4AE; font-size:1rem; font-weight:600; }
        .tiers-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.2rem; max-width:900px; margin:0 auto; }
        .tcard { background:#fff; border:3px solid #E1F5FE; border-radius:28px; padding:2rem 1.8rem; position:relative; overflow:hidden; cursor:pointer; transition:all 0.2s; box-shadow:0 5px 0 #E1F5FE; }
        .tcard:hover { border-color:#0288D1; transform:translateY(-5px); box-shadow:0 8px 0 rgba(2,136,209,0.2), 0 16px 40px rgba(0,0,0,0.08); }
        .tcard.pop { border-color:#9C7FE0; box-shadow:0 5px 0 rgba(156,127,224,0.3); }
        .tbadge { position:absolute; top:0; right:0; background:#9C7FE0; color:#fff; font-family:'Fredoka',sans-serif; font-size:0.8rem; font-weight:600; padding:0.3rem 1rem; border-bottom-left-radius:18px; }
        .tname { font-family:'Fredoka',sans-serif; font-size:1.5rem; font-weight:600; color:#1a3a6b; margin-bottom:0.1rem; }
        .tprice { font-family:'Fredoka',sans-serif; font-size:2.6rem; font-weight:700; color:#1a3a6b; line-height:1; margin-bottom:0.2rem; }
        .tprice sup { font-size:1.1rem; vertical-align:super; }
        .ttagline { font-size:0.82rem; color:#90A4AE; margin-bottom:1.2rem; font-weight:600; }
        .tfeatures { list-style:none; margin-bottom:1.5rem; }
        .tfeatures li { font-size:0.85rem; color:#334; padding:0.3rem 0; display:flex; align-items:flex-start; gap:0.5rem; line-height:1.4; font-weight:600; }
        .tfeatures li::before { content:"✓"; color:#0288D1; font-weight:800; flex-shrink:0; }
        .tbtn { display:block; width:100%; background:#0288D1; color:#fff; border:none; border-radius:50px; padding:0.9rem; font-family:'Fredoka',sans-serif; font-size:1rem; font-weight:600; cursor:pointer; transition:all 0.2s; box-shadow:0 4px 0 #0277BD; }
        .tbtn:hover { transform:translateY(-2px); box-shadow:0 6px 0 #0277BD; }
        .tcard.pop .tbtn { background:#9C7FE0; box-shadow:0 4px 0 #7B5EA7; }
        .tcard.pop .tbtn:hover { transform:translateY(-2px); box-shadow:0 6px 0 #7B5EA7; }

        /* CHECKOUT */
        .cocard { background:#fff; border:3px solid #E1F5FE; border-radius:28px; padding:2.5rem; max-width:520px; width:100%; box-shadow:0 8px 0 #E1F5FE, 0 16px 40px rgba(0,0,0,0.06); }
        .sum-row { display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0; border-bottom:1px solid #E1F5FE; font-size:0.88rem; }
        .sum-row:last-child { border:none; }
        .sum-label { color:#90A4AE; font-weight:600; }
        .sum-val { color:#1a3a6b; font-weight:700; }
        .sum-total .sum-label { font-weight:700; color:#1a3a6b; font-size:1rem; }
        .sum-total .sum-val { font-family:'Fredoka',sans-serif; font-size:1.7rem; font-weight:700; }
        .lemon { background:#F3FAFF; border:2px solid #E1F5FE; border-radius:16px; padding:0.9rem 1rem; font-size:0.78rem; color:#607D8B; line-height:1.6; margin:1rem 0; font-weight:600; }
        .err { color:#E53935; font-size:0.8rem; margin-bottom:0.8rem; text-align:center; font-weight:700; }

        /* GENERATING */
        .gen-wrap { text-align:center; padding:3rem 0; }
        .gen-icon { font-size:3.5rem; animation:wiggle 1.5s ease-in-out infinite; display:block; margin-bottom:1rem; }
        .gen-title { font-family:'Fredoka',sans-serif; font-size:1.8rem; font-weight:600; color:#1a3a6b; margin-bottom:0.5rem; }
        .gen-sub { font-size:0.85rem; color:#90A4AE; font-weight:600; }
        .spinner { width:44px; height:44px; border:4px solid #E1F5FE; border-top:4px solid #0288D1; border-radius:50%; animation:spin 0.8s linear infinite; margin:1.5rem auto; }

        /* RESULT */
        .result-outer { max-width:800px; margin:0 auto; padding:2rem 1rem 5rem; }
        .result-banner { background:linear-gradient(135deg,#0288D1 0%,#9C7FE0 100%); border-radius:28px 28px 0 0; padding:2.5rem; }
        .rb-eyebrow { display:inline-flex; align-items:center; gap:0.4rem; background:rgba(198,255,0,0.2); border:1px solid rgba(198,255,0,0.4); color:#C6FF00; font-size:0.7rem; letter-spacing:0.15em; text-transform:uppercase; padding:0.25rem 0.7rem; border-radius:20px; margin-bottom:0.8rem; font-weight:700; }
        .rb-title { font-family:'Fredoka',sans-serif; font-size:clamp(1.8rem,4vw,2.6rem); font-weight:700; color:#fff; line-height:1.1; margin-bottom:1rem; }
        .rb-chips { display:flex; flex-wrap:wrap; gap:0.5rem; }
        .rb-chip { background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.2); color:rgba(255,255,255,0.85); font-size:0.75rem; padding:0.25rem 0.7rem; border-radius:20px; font-weight:600; }
        .result-body { background:#fff; border:3px solid #E1F5FE; border-top:none; border-radius:0 0 28px 28px; padding:2.5rem; box-shadow:0 12px 50px rgba(0,0,0,0.07); }
        .email-box { background:#F3FAFF; border:2px solid #E1F5FE; border-radius:16px; padding:1rem 1.2rem; font-size:0.82rem; color:#607D8B; line-height:1.6; text-align:center; margin-top:1.5rem; font-weight:600; }
        .email-box strong { color:#0288D1; }

        @media(max-width:600px) {
          nav { padding:0.9rem 1.2rem; }
          .qcard,.cocard { padding:1.8rem 1.4rem; }
          .result-banner,.result-body { padding:1.8rem 1.4rem; }
          .multi-grid { grid-template-columns:1fr; }
          .tiers-grid { grid-template-columns:1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav>
        <div className="logo">
          <div className="logo-icon">🧭</div>
          <div className="logo-text">Little<span>Routes</span></div>
        </div>
        <div className="nav-right">Family Travel Playbooks</div>
      </nav>

      <main className="main">

        {/* ── LANDING ── */}
        {step === "landing" && (
          <div className="page">

            {/* BAND 1 — white, big playful headline + CTA + floating cards */}
            <div style={{ background:"#fff", padding:"4rem 2rem 3rem", position:"relative", overflow:"hidden" }}>

              {/* Decorative blobs */}
              <div style={{ position:"absolute", top:30, right:"6%", width:140, height:140, borderRadius:"50%", background:"#E1F5FE", animation:"blobPulse 5s ease-in-out infinite", zIndex:0 }} />
              <div style={{ position:"absolute", top:"55%", right:"2%", width:70, height:70, borderRadius:"50%", background:"#EDE9FF", animation:"blobPulse 4s ease-in-out infinite 1s", zIndex:0 }} />
              <div style={{ position:"absolute", bottom:40, left:"4%", width:100, height:100, borderRadius:"50%", background:"#C6FF00", opacity:0.5, animation:"blobPulse 6s ease-in-out infinite 0.5s", zIndex:0 }} />
              <div style={{ position:"absolute", top:"20%", left:"30%", width:22, height:22, borderRadius:"50%", background:"#9C7FE0", opacity:0.4, zIndex:0 }} />
              <div style={{ position:"absolute", bottom:"30%", left:"20%", width:14, height:14, borderRadius:"50%", background:"#0288D1", opacity:0.3, zIndex:0 }} />

              <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center", position:"relative", zIndex:1 }}>
                <div>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:"#E1F5FE", color:"#0277BD", fontSize:"0.75rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:800, padding:"0.35rem 1rem", borderRadius:50, marginBottom:"1.2rem", fontFamily:"'Fredoka',sans-serif" }}>
                    ✦ Built for curious families
                  </div>

                  {/* Big playful headline with wobbly underline SVG */}
                  <h1 style={{ fontFamily:"'Fredoka',sans-serif", fontSize:"clamp(2.8rem,5.5vw,4.2rem)", fontWeight:700, color:"#1a3a6b", lineHeight:1.1, marginBottom:"1.2rem" }}>
                    The best way to travel{" "}
                    <span style={{ position:"relative", display:"inline-block", color:"#0288D1" }}>
                      and learn
                      <svg viewBox="0 0 200 12" style={{ position:"absolute", bottom:-6, left:0, width:"100%", height:12 }} preserveAspectRatio="none">
                        <path d="M2,8 Q25,2 50,8 Q75,14 100,8 Q125,2 150,8 Q175,14 198,8" stroke="#0288D1" strokeWidth="3" fill="none" strokeLinecap="round"/>
                      </svg>
                    </span>
                    {" "}together!
                  </h1>

                  <p style={{ fontSize:"1rem", color:"#607D8B", lineHeight:1.8, fontWeight:600, marginBottom:"2rem", maxWidth:440 }}>
                    Answer 5 questions. Get a complete family playbook — day-by-day itinerary, age-specific talking points, scavenger hunts, and teaching moments for <em style={{ color:"#9C7FE0", fontStyle:"normal", fontWeight:700 }}>every kid</em> in your group.
                  </p>

                  <button className="btn-main" style={{ fontSize:"1.1rem", padding:"1.1rem 2.4rem" }} onClick={() => setStep("quiz")}>
                    🗺️ Build Your Playbook — from $17
                  </button>
                  <p style={{ marginTop:"0.9rem", fontSize:"0.78rem", color:"#B0BEC5", fontWeight:600 }}>No subscription · One-time · Takes 2 minutes</p>

                  {/* Fun feature pills */}
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", marginTop:"1.8rem" }}>
                    {["🗺️ Itinerary","👶 All ages","🔍 Scavenger hunts","🍕 Food picks","📚 Teaching moments"].map(c => (
                      <span key={c} style={{ background:"#F3FAFF", border:"2px solid #E1F5FE", borderRadius:50, padding:"0.3rem 0.8rem", fontSize:"0.78rem", color:"#0288D1", fontWeight:700 }}>{c}</span>
                    ))}
                  </div>
                </div>

                {/* Floating preview cards */}
                <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:360 }}>
                  <div className="hero-card-stack">
                    <div className="hcard hcard-1">
                      <div style={{ color:"#C6FF00", fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:700, marginBottom:"0.5rem" }}>Day 2 — Rome · Ages 7–9</div>
                      <div style={{ color:"rgba(255,255,255,0.92)", fontSize:"0.82rem", lineHeight:1.6, fontWeight:600 }}>"The Colosseum held 50,000 people — like your school, 100 times over!"</div>
                    </div>
                    <div className="hcard hcard-2">
                      <div style={{ color:"rgba(255,255,255,0.8)", fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:800, marginBottom:"0.5rem" }}>🔍 Scavenger Hunt</div>
                      <div style={{ color:"#fff", fontSize:"0.82rem", lineHeight:1.6, fontWeight:600 }}>Find an animal carved into a building. What is it?</div>
                    </div>
                    <div className="hcard hcard-3">
                      <div style={{ color:"#0288D1", fontSize:"0.68rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:800, marginBottom:"0.4rem" }}>💬 Dinner Question</div>
                      <div style={{ color:"#1a3a6b", fontSize:"0.8rem", lineHeight:1.55, fontWeight:700 }}>If you lived here 2,000 years ago, what job would you want?</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BAND 2 — solid blue: what you get */}
            <div style={{ background:"#0288D1", padding:"3.5rem 2rem", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-30, right:-30, width:180, height:180, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }} />
              <div style={{ position:"absolute", bottom:-40, left:-20, width:140, height:140, borderRadius:"50%", background:"rgba(198,255,0,0.08)" }} />
              <div style={{ maxWidth:900, margin:"0 auto", textAlign:"center", position:"relative", zIndex:1 }}>
                <p style={{ fontSize:"0.75rem", color:"#C6FF00", fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.8rem", fontFamily:"'Fredoka',sans-serif" }}>✦ Everything in your playbook</p>
                <h2 style={{ fontFamily:"'Fredoka',sans-serif", fontSize:"clamp(1.8rem,3.5vw,2.4rem)", fontWeight:700, color:"#fff", lineHeight:1.2, marginBottom:"2rem" }}>
                  One purchase.{" "}
                  <span style={{ position:"relative", display:"inline-block", color:"#C6FF00" }}>
                    Every age covered.
                    <svg viewBox="0 0 240 12" style={{ position:"absolute", bottom:-4, left:0, width:"100%", height:10 }} preserveAspectRatio="none">
                      <path d="M2,8 Q30,2 60,8 Q90,14 120,8 Q150,2 180,8 Q210,14 238,8" stroke="#C6FF00" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h2>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"0.8rem", justifyContent:"center" }}>
                  {[
                    { e:"🗺️", l:"Day-by-day itinerary" },
                    { e:"👶", l:"Toddler to teen content" },
                    { e:"🔍", l:"Location scavenger hunts" },
                    { e:"💬", l:"Age-specific talking points" },
                    { e:"🍕", l:"Family restaurant picks" },
                    { e:"📚", l:"Teaching moments" },
                    { e:"🎒", l:"Packing list (Full Pack)" },
                    { e:"🏫", l:"Post-trip school project" },
                  ].map(f => (
                    <span key={f.l} style={{ background:"rgba(255,255,255,0.15)", border:"2px solid rgba(255,255,255,0.2)", color:"#fff", fontSize:"0.85rem", fontWeight:700, padding:"0.5rem 1.1rem", borderRadius:50, display:"flex", alignItems:"center", gap:"0.4rem" }}>
                      {f.e} {f.l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* BAND 3 — white: reviews */}
            <div style={{ background:"#fff", padding:"3.5rem 2rem 4rem" }}>
              <div style={{ maxWidth:960, margin:"0 auto" }}>
                <p style={{ textAlign:"center", fontSize:"0.75rem", color:"#9C7FE0", fontWeight:800, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:"0.6rem", fontFamily:"'Fredoka',sans-serif" }}>✦ What families are saying</p>
                <h3 style={{ fontFamily:"'Fredoka',sans-serif", fontSize:"1.8rem", fontWeight:700, color:"#1a3a6b", textAlign:"center", marginBottom:"2.5rem" }}>Parents love it. <span style={{ color:"#9C7FE0" }}>Kids remember it.</span></h3>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"1.5rem", justifyContent:"center" }}>
                  {[
                    { quote:"My 8-year-old is still talking about Rome two months later. The talking points made it click for him.", by:"Rachel T.", trip:"Rome with kids 6 & 8", emoji:"🏛️" },
                    { quote:"The scavenger hunt kept both my kids engaged all day. Worth every penny of the $47.", by:"Marcus L.", trip:"Tokyo with kids 5, 9 & 12", emoji:"🗼" },
                    { quote:"I'm a teacher and I was blown away by how well the content was calibrated to each age.", by:"Diane K.", trip:"Paris with kids 4 & 11", emoji:"🗼" },
                  ].map((t,i) => (
                    <div key={i} style={{ maxWidth:280, background:"#F3FAFF", borderRadius:24, padding:"1.8rem 1.5rem", border:"2px solid #E1F5FE", boxShadow:"0 5px 0 #E1F5FE" }}>
                      <div style={{ fontSize:"1.4rem", marginBottom:"0.8rem" }}>⭐⭐⭐⭐⭐</div>
                      <p style={{ fontFamily:"'Fraunces',serif", fontStyle:"italic", fontSize:"0.9rem", color:"#334", lineHeight:1.7, marginBottom:"0.8rem" }}>"{t.quote}"</p>
                      <p style={{ fontSize:"0.75rem", color:"#0288D1", fontWeight:800, fontFamily:"'Fredoka',sans-serif" }}>— {t.by}</p>
                      <p style={{ fontSize:"0.72rem", color:"#90A4AE", fontWeight:600 }}>{t.trip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* BAND 4 — lime green: bottom CTA */}
            <div style={{ background:"#C6FF00", padding:"3.5rem 2rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-20, left:"10%", width:80, height:80, borderRadius:"50%", background:"rgba(255,255,255,0.3)" }} />
              <div style={{ position:"absolute", bottom:-30, right:"8%", width:120, height:120, borderRadius:"50%", background:"rgba(2,136,209,0.1)" }} />
              <div style={{ position:"relative", zIndex:1 }}>
                <h3 style={{ fontFamily:"'Fredoka',sans-serif", fontSize:"clamp(1.6rem,3.5vw,2.2rem)", fontWeight:700, color:"#1a3a6b", marginBottom:"0.6rem" }}>
                  Ready to plan a trip they'll never forget? 🌍
                </h3>
                <p style={{ fontSize:"0.95rem", color:"#2a4a00", marginBottom:"1.8rem", fontWeight:600 }}>Takes 2 minutes. Delivered instantly.</p>
                <button className="btn-main" style={{ background:"#1a3a6b", color:"#C6FF00", boxShadow:"0 5px 0 #000a00, 0 8px 20px rgba(0,0,0,0.2)", fontSize:"1.1rem", padding:"1.1rem 2.4rem" }} onClick={() => setStep("quiz")}>
                  🗺️ Build Your Playbook →
                </button>
              </div>
            </div>

          </div>
        )}


        {/* ── QUIZ ── */}
        {step === "quiz" && (
          <div className="center page">
            <div className="qcard">
              <div className="prog"><div className="prog-fill" style={{ width:`${((currentQ+1)/QUESTIONS.length)*100}%` }} /></div>
              <span className="q-emoji">{q.emoji}</span>
              <div style={{ fontSize:"0.72rem", color:"#9C7FE0", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:700, marginBottom:"0.4rem" }}>
                Step {currentQ+1} of {QUESTIONS.length}
              </div>
              <div className="q-head">{q.question}</div>
              <div className="q-sub">{q.sub}</div>

              {q.type === "select" && q.options.map(opt => (
                <button key={opt} className="opt" onClick={() => {
                  const updated = { ...answers, [q.id]: opt };
                  setAnswers(updated);
                  nextStep(updated);
                }}>{opt}</button>
              ))}

              {q.type === "multi" && (
                <>
                  <div className="multi-grid">
                    {q.options.map(opt => (
                      <div key={opt.id} className={`multi-opt ${multiSelected.includes(opt.id) ? "sel" : ""}`}
                        onClick={() => toggleMulti(opt.id)}>
                        {multiSelected.includes(opt.id) && <span className="sel-check">✓</span>}
                        <span className="multi-label">{opt.label}</span>
                        {opt.sub && <span className="multi-sub">{opt.sub}</span>}
                      </div>
                    ))}
                  </div>
                  <button className="btn-main btn-full" disabled={multiSelected.length === 0}
                    style={{ opacity: multiSelected.length === 0 ? 0.4 : 1 }}
                    onClick={handleMultiContinue}>
                    Continue ({multiSelected.length} selected) →
                  </button>
                </>
              )}

              {q.type === "text" && (
                <>
                  <input className="tinput" type="text" placeholder={q.placeholder}
                    value={textInput} autoFocus
                    onChange={e => setTextInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") handleText(); }}
                  />
                  <button className="btn-main btn-full" onClick={handleText}>Continue →</button>
                  {q.optional && (
                    <button className="btn-ghost" onClick={() => { setTextInput(""); handleText(); }}>Skip this step</button>
                  )}
                </>
              )}

              {currentQ > 0 && (
                <button className="btn-ghost" onClick={() => { setCurrentQ(currentQ - 1); setMultiSelected([]); }}>← Back</button>
              )}
            </div>
          </div>
        )}

        {/* ── TIERS ── */}
        {step === "tiers" && (
          <div className="tiers-section page">
            <div className="tiers-head">
              <h2>Choose your playbook</h2>
              <p>Your {answers.destination} family adventure — pick the depth that's right for you</p>
            </div>
            <div className="tiers-grid">
              {TIERS.map(tier => (
                <div key={tier.id} className={`tcard ${tier.highlight ? "pop" : ""}`}
                  onClick={() => setSelectedTier(tier)}>
                  {tier.badge && <div className="tbadge">{tier.badge}</div>}
                  <div className="tname">{tier.name}</div>
                  <div className="tprice"><sup>$</sup>{tier.price}</div>
                  <div className="ttagline">{tier.tagline}</div>
                  <ul className="tfeatures">
                    {tier.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                  <button className="tbtn" onClick={e => { e.stopPropagation(); setSelectedTier(tier); setStep("checkout"); }}>
                    {tier.cta}
                  </button>
                </div>
              ))}
            </div>
            <div style={{ textAlign:"center", marginTop:"2rem" }}>
              <button className="btn-ghost" style={{ width:"auto", display:"inline-flex" }}
                onClick={() => { setStep("quiz"); setCurrentQ(0); }}>← Edit my answers</button>
            </div>
          </div>
        )}

        {/* ── CHECKOUT ── */}
        {step === "checkout" && selectedTier && (
          <div className="center page">
            <div className="cocard">
              <div style={{ fontSize:"0.72rem", color:"#9C7FE0", letterSpacing:"0.15em", textTransform:"uppercase", fontWeight:700, marginBottom:"0.4rem" }}>Almost there</div>
              <div style={{ fontFamily:"'Fraunces',serif", fontSize:"1.7rem", fontWeight:900, marginBottom:"0.3rem", color:"#1a3a6b" }}>Review & pay</div>
              <p style={{ fontSize:"0.85rem", color:"#aaa", marginBottom:"1.5rem", fontWeight:500 }}>Your playbook generates immediately after payment</p>

              <div style={{ background:"#F4F0FF", borderRadius:"10px", padding:"1rem 1.2rem", marginBottom:"1.2rem", border:"1px solid rgba(0,0,0,0.07)" }}>
                <div className="sum-row"><span className="sum-label">Destination</span><span className="sum-val">{answers.destination}</span></div>
                <div className="sum-row"><span className="sum-label">Duration</span><span className="sum-val">{answers.duration}</span></div>
                <div className="sum-row">
                  <span className="sum-label">Kids</span>
                  <span className="sum-val" style={{ textAlign:"right", maxWidth:"60%" }}>
                    {Array.isArray(answers.kids) ? answers.kids.map(k => ageLabels[k]).join(", ") : answers.kids}
                  </span>
                </div>
                <div className="sum-row"><span className="sum-label">Plan</span><span className="sum-val">{selectedTier.name}</span></div>
                <div className="sum-row sum-total" style={{ marginTop:"0.5rem", paddingTop:"0.7rem", borderTop:"2px solid rgba(0,0,0,0.08)" }}>
                  <span className="sum-label">Total</span>
                  <span className="sum-val">${selectedTier.price}</span>
                </div>
              </div>

              <label style={{ display:"block", fontSize:"0.75rem", color:"#aaa", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.5rem", fontWeight:700 }}>
                Email — we'll send your playbook here
              </label>
              <input className="tinput" type="email" placeholder="you@example.com"
                value={email} onChange={e => setEmail(e.target.value)} />

              <div className="lemon">
                🔒 <strong>Secure checkout via Lemon Squeezy.</strong> Your playbook is generated and emailed within 60 seconds of payment. 100% satisfaction guarantee — if it's not useful, we'll refund you.
              </div>

              {error && <p className="err">{error}</p>}

              <button className="btn-main yellow btn-full" onClick={handleCheckout}>
                Pay ${selectedTier.price} & Generate Your Playbook →
              </button>
              <button className="btn-ghost" onClick={() => setStep("tiers")}>← Change plan</button>
            </div>
          </div>
        )}

        {/* ── GENERATING ── */}
        {step === "generating" && (
          <div className="center page">
            <div className="qcard" style={{ textAlign:"center" }}>
              <div className="gen-wrap">
                <span className="gen-icon">🧭</span>
                <div className="gen-title">Building your family playbook…</div>
                <p className="gen-sub">Crafting age-specific content for {answers.destination}</p>
                <div className="spinner" />
                <p style={{ fontSize:"0.78rem", color:"#ccc", marginTop:"0.5rem", fontWeight:500 }}>This takes about 20–30 seconds</p>
              </div>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === "result" && (
          <div className="page">
            {renderPlaybook(result, answers, selectedTier)}
            <div style={{ background:"#F3FAFF", padding:"2rem", textAlign:"center" }}>
              <div style={{ background:"#fff", border:"2px solid #E1F5FE", borderRadius:16, padding:"1.2rem 1.5rem", maxWidth:560, margin:"0 auto 1.2rem", boxShadow:"0 4px 0 #E1F5FE" }}>
                <p style={{ fontSize:"0.85rem", color:"#607D8B", fontWeight:600 }}>
                  📬 A copy has been sent to <strong style={{ color:"#0288D1" }}>{email}</strong><br />
                  {selectedTier?.id === "family-pack" ? "Your beautifully formatted playbook is attached." : "Save or screenshot this page for offline access on your trip."}
                </p>
              </div>
              <button className="btn-main yellow btn-full" style={{ maxWidth:400, margin:"0 auto" }} onClick={reset}>
                🗺️ Plan Another Trip →
              </button>
            </div>
          </div>
        )}

      </main>
    </>
  );
}
