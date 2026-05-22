import { useState } from "react";

const STEPS = [
  {
    id: 1,
    phase: "GitHub",
    color: "#1a3a6b",
    emoji: "🐙",
    title: "Create a GitHub Account",
    why: "GitHub is where your website code lives — think of it like a USB stick in the cloud. Vercel (your hosting) connects to it and deploys automatically every time you make a change.",
    tasks: [
      { text: "Go to github.com and click Sign up", url: "https://github.com", action: "Open GitHub" },
      { text: "Enter your email, create a password, choose a username (try 'littleroutes')" },
      { text: "Verify your email — click the link GitHub sends you" },
      { text: "Skip all the setup questions — scroll to bottom and click 'Skip personalization'" },
    ],
    done: "GitHub account created ✓"
  },
  {
    id: 2,
    phase: "GitHub",
    color: "#1a3a6b",
    emoji: "📁",
    title: "Create a Repository",
    why: "A repository is a folder that holds your website files. You need one called 'littleroutes' before you can upload anything.",
    tasks: [
      { text: "Click the '+' icon top right → New repository" },
      { text: "Name it: littleroutes" },
      { text: "Set it to Public (not Private)" },
      { text: "Tick 'Add a README file'" },
      { text: "Click the green 'Create repository' button" },
    ],
    done: "Repository created ✓"
  },
  {
    id: 3,
    phase: "GitHub",
    color: "#1a3a6b",
    emoji: "📤",
    title: "Upload Your Code Files",
    why: "You need 4 files in your repository for the site to work. You already have the main one (littleroutes-v3.jsx) — the other 3 are small config files you create directly on GitHub.",
    tasks: [
      { text: "Download littleroutes-v3.jsx from this chat to your Desktop" },
      { text: "In your repository click 'Add file' → 'Upload files' → drag in littleroutes-v3.jsx → click 'Commit changes'" },
      { text: "Create package.json: click 'Add file' → 'Create new file' → name it package.json → paste the code below → Commit", code: `{\n  "name": "littleroutes",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.0.0",\n    "react-dom": "^18.0.0"\n  }\n}` },
      { text: "Create index.html: same process, name it index.html → paste code below → Commit", code: `<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>LittleRoutes — Family Travel Playbooks</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>\n  </body>\n</html>` },
      { text: "Create src/main.jsx: 'Add file' → 'Create new file' → type filename as src/main.jsx (the src/ creates a folder) → paste code below → Commit", code: `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from '../littleroutes-v3.jsx'\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n)` },
    ],
    done: "All 4 files uploaded to GitHub ✓"
  },
  {
    id: 4,
    phase: "Vercel",
    color: "#0288D1",
    emoji: "🚀",
    title: "Deploy on Vercel",
    why: "Vercel takes your code from GitHub and publishes it as a real live website. It's free, takes about 5 minutes to set up, and automatically updates your site whenever you change your code on GitHub.",
    tasks: [
      { text: "Go to vercel.com and click Sign Up → Continue with GitHub", url: "https://vercel.com", action: "Open Vercel" },
      { text: "Click 'Add New Project'" },
      { text: "Find your 'littleroutes' repository and click Import" },
      { text: "Before clicking Deploy — scroll down to 'Environment Variables'. Add:\nName: VITE_ANTHROPIC_API_KEY\nValue: your Anthropic API key\n\nGet your key at console.anthropic.com → API Keys → Create Key", important: true },
      { text: "Click the big Deploy button — takes 60–90 seconds" },
      { text: "Vercel gives you a URL like littleroutes.vercel.app — click it to see your live site" },
    ],
    done: "Site live on Vercel ✓"
  },
  {
    id: 5,
    phase: "Domain",
    color: "#43A047",
    emoji: "🌐",
    title: "Connect littleroutes.co",
    why: "Right now your site is at littleroutes.vercel.app. This step connects your Porkbun domain so it loads at littleroutes.co instead. You do it once and never touch it again.",
    tasks: [
      { text: "In Vercel → your project → Settings → Domains → type 'littleroutes.co' → click Add" },
      { text: "Vercel shows you 2 DNS records. Leave this page open — you need these values next" },
      { text: "Open Porkbun in a new tab → log in → find littleroutes.co → click DNS", url: "https://porkbun.com", action: "Open Porkbun" },
      { text: "Add the A record:\nType: A\nHost: leave blank\nAnswer: 76.76.21.21\nTTL: 600\nClick Save" },
      { text: "Add the CNAME record:\nType: CNAME\nHost: www\nAnswer: cname.vercel-dns.com\nTTL: 600\nClick Save" },
      { text: "Wait 10–30 minutes then visit littleroutes.co in your browser" },
    ],
    done: "littleroutes.co is live ✓"
  },
  {
    id: 6,
    phase: "Payments",
    color: "#9C7FE0",
    emoji: "💳",
    title: "Set Up Lemon Squeezy",
    why: "Right now clicking Pay doesn't actually charge anyone. Lemon Squeezy handles real payments, taxes, and pays you weekly. Takes about 30 minutes to set up.",
    tasks: [
      { text: "Go to lemonsqueezy.com → create an account → set up your store named LittleRoutes → add your payout details", url: "https://lemonsqueezy.com", action: "Open Lemon Squeezy" },
      { text: "Create Product 1: Click Products → New Product\nName: Explorer Playbook\nPrice: $17\nType: Single Payment → Save" },
      { text: "Create Product 2:\nName: Playbook\nPrice: $27 → Save" },
      { text: "Create Product 3:\nName: Family Pack\nPrice: $47 → Save" },
      { text: "For each product click 'Share' and copy the checkout URL. It looks like:\nhttps://yourstore.lemonsqueezy.com/checkout/buy/XXXXX\n\nSave all 3 URLs somewhere" },
      { text: "In GitHub, open littleroutes-v3.jsx → click the pencil to edit → find the comment that says 'LEMON SQUEEZY INTEGRATION POINT' → swap in your 3 real URLs → Commit changes" },
    ],
    done: "Payments live ✓"
  },
  {
    id: 7,
    phase: "Test",
    color: "#FF7043",
    emoji: "🧪",
    title: "Test the Full Flow",
    why: "Before you send anyone to your site, buy your own product. Make sure everything works end to end. Fix any issues before real customers see them.",
    tasks: [
      { text: "Open littleroutes.co in an incognito window so you see it as a customer would" },
      { text: "Go through the full quiz — use real details" },
      { text: "Select Family Pack and reach the checkout" },
      { text: "In Lemon Squeezy dashboard enable Test Mode. Use test card:\nNumber: 4242 4242 4242 4242\nExpiry: any future date\nCVC: any 3 digits" },
      { text: "Complete the payment and check the playbook output — is it generating? Does it look good?" },
      { text: "Check the whole flow on your phone — most customers will be on mobile" },
      { text: "When happy — disable Test Mode in Lemon Squeezy. You are now taking real payments." },
    ],
    done: "Everything works. You're open for business ✓"
  },
];

function CodeSnippet({ code }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position: "relative", marginTop: "0.7rem" }}>
      <pre style={{
        background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8, padding: "0.9rem 1rem",
        fontSize: "0.72rem", color: "#e6edf3",
        lineHeight: 1.7, whiteSpace: "pre-wrap",
        wordBreak: "break-word", fontFamily: "monospace",
        margin: 0,
      }}>{code}</pre>
      <button
        onClick={() => { navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        style={{
          position: "absolute", top: 6, right: 6,
          background: copied ? "#43A047" : "rgba(255,255,255,0.1)",
          border: "none", borderRadius: 5,
          padding: "0.2rem 0.6rem", fontSize: "0.62rem",
          color: "#fff", cursor: "pointer",
          fontFamily: "'Fredoka', sans-serif", fontWeight: 700,
          transition: "all 0.15s",
        }}
      >{copied ? "✓ Copied" : "Copy"}</button>
    </div>
  );
}

export default function SetupGuide() {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState([]);
  const [checkedTasks, setCheckedTasks] = useState({});

  const step = STEPS[current];
  const checked = checkedTasks[step.id] || [];
  const progress = Math.round((checked.length / step.tasks.length) * 100);
  const overall = Math.round((done.length / STEPS.length) * 100);

  function toggleTask(i) {
    const cur = checkedTasks[step.id] || [];
    setCheckedTasks(p => ({
      ...p,
      [step.id]: cur.includes(i) ? cur.filter(x => x !== i) : [...cur, i]
    }));
  }

  function markDone() {
    if (!done.includes(step.id)) setDone(p => [...p, step.id]);
    if (current < STEPS.length - 1) setCurrent(current + 1);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900&family=Fredoka:wght@500;600;700&family=Nunito:wght@500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F3FAFF; font-family: 'Nunito', sans-serif; color: #1a3a6b; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #E1F5FE; border-radius: 2px; }
      `}</style>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div style={{ background: "#fff", borderBottom: "2px solid #E1F5FE", padding: "0.9rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.1rem", fontWeight: 600 }}>
            🧭 Little<span style={{ color: "#0288D1" }}>Routes</span>
            <span style={{ color: "#90A4AE", fontSize: "0.8rem", marginLeft: "0.7rem", fontWeight: 500 }}>Setup Guide</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <span style={{ fontSize: "0.75rem", color: "#90A4AE", fontFamily: "'Fredoka', sans-serif", fontWeight: 700 }}>{done.length}/{STEPS.length} steps done</span>
            <div style={{ width: 90, height: 5, background: "#E1F5FE", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${overall}%`, background: "linear-gradient(90deg,#0288D1,#C6FF00)", transition: "width 0.4s" }} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flex: 1 }}>

          {/* SIDEBAR */}
          <div style={{ width: 200, flexShrink: 0, background: "#fff", borderRight: "2px solid #E1F5FE", padding: "1rem 0", overflowY: "auto" }}>
            {STEPS.map((s, i) => {
              const isDone = done.includes(s.id);
              const isCur = i === current;
              return (
                <button key={s.id} onClick={() => setCurrent(i)} style={{
                  width: "100%", textAlign: "left", background: isCur ? "#F3FAFF" : "transparent",
                  border: "none", borderLeft: `3px solid ${isCur ? s.color : "transparent"}`,
                  padding: "0.7rem 1rem", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  transition: "all 0.15s",
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                    background: isDone ? s.color : isCur ? s.color : "#F3FAFF",
                    border: `2px solid ${isDone || isCur ? s.color : "#E1F5FE"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", fontWeight: 800, fontFamily: "'Fredoka', sans-serif",
                    color: isDone || isCur ? "#fff" : "#90A4AE",
                    transition: "all 0.2s",
                  }}>
                    {isDone ? "✓" : s.id}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.74rem", fontWeight: 700, color: isCur ? "#1a3a6b" : isDone ? "#90A4AE" : "#607D8B", lineHeight: 1.3 }}>{s.title}</div>
                    <div style={{ fontSize: "0.6rem", fontWeight: 700, color: isCur ? s.color : "#B0BEC5", fontFamily: "'Fredoka', sans-serif" }}>{s.phase}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* MAIN CONTENT */}
          <div style={{ flex: 1, overflowY: "auto", padding: "2rem 1.5rem 5rem" }}>
            <div style={{ maxWidth: 640, margin: "0 auto" }}>

              {/* Step header */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ background: step.color, color: "#fff", fontFamily: "'Fredoka', sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 800, padding: "0.2rem 0.7rem", borderRadius: 50 }}>{step.phase}</span>
                  <span style={{ fontSize: "0.72rem", color: "#90A4AE", fontWeight: 600 }}>Step {step.id} of {STEPS.length}</span>
                </div>
                <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.5rem,4vw,1.9rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "0.3rem" }}>
                  {step.emoji} {step.title}
                </h1>
              </div>

              {/* Why box */}
              <div style={{ background: "#fff", border: "2px solid #E1F5FE", borderLeft: `4px solid ${step.color}`, borderRadius: 12, padding: "0.9rem 1.1rem", marginBottom: "1.5rem" }}>
                <div style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: step.color, fontWeight: 800, marginBottom: "0.3rem" }}>💡 Why you're doing this</div>
                <p style={{ fontSize: "0.85rem", color: "#607D8B", lineHeight: 1.7, fontWeight: 500 }}>{step.why}</p>
              </div>

              {/* Progress */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1rem" }}>
                <div style={{ flex: 1, height: 5, background: "#E1F5FE", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress}%`, background: step.color, borderRadius: 3, transition: "width 0.3s" }} />
                </div>
                <span style={{ fontSize: "0.7rem", color: "#90A4AE", fontWeight: 700, fontFamily: "'Fredoka', sans-serif" }}>{checked.length}/{step.tasks.length}</span>
              </div>

              {/* Tasks */}
              <div style={{ marginBottom: "1.8rem" }}>
                {step.tasks.map((task, ti) => {
                  const isDone = checked.includes(ti);
                  return (
                    <div key={ti} onClick={() => toggleTask(ti)} style={{
                      background: isDone ? `${step.color}0a` : "#fff",
                      border: `2px solid ${isDone ? step.color + "40" : "#E1F5FE"}`,
                      borderRadius: 12, padding: "0.9rem 1.1rem",
                      marginBottom: "0.6rem", cursor: "pointer", transition: "all 0.15s",
                    }}>
                      <div style={{ display: "flex", gap: "0.8rem", alignItems: "flex-start" }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                          background: isDone ? step.color : "#F3FAFF",
                          border: `2px solid ${isDone ? step.color : "#E1F5FE"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.7rem", color: "#fff", fontWeight: 900,
                          marginTop: "0.1rem", transition: "all 0.2s",
                        }}>{isDone ? "✓" : ""}</div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: "0.85rem", fontWeight: isDone ? 500 : 700, color: isDone ? "#90A4AE" : "#1a3a6b", lineHeight: 1.65, whiteSpace: "pre-line", textDecoration: isDone ? "line-through" : "none" }}>
                            {task.text}
                          </p>
                          {task.important && (
                            <div style={{ background: "rgba(255,152,0,0.08)", border: "1px solid rgba(255,152,0,0.25)", borderRadius: 8, padding: "0.6rem 0.8rem", marginTop: "0.5rem" }}>
                              <p style={{ fontSize: "0.78rem", color: "#E65100", fontWeight: 700, lineHeight: 1.6 }}>⚠️ Important: {task.text.includes("Environment") ? "Your API key is secret — never share it. Add it as an environment variable, not directly in code." : ""}</p>
                            </div>
                          )}
                          {task.code && <CodeSnippet code={task.code} />}
                          {task.url && (
                            <a href={task.url} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
                              display: "inline-flex", alignItems: "center", gap: "0.4rem",
                              marginTop: "0.5rem", background: step.color, color: "#fff",
                              fontSize: "0.75rem", fontWeight: 800, padding: "0.3rem 0.8rem",
                              borderRadius: 50, textDecoration: "none",
                              fontFamily: "'Fredoka', sans-serif",
                            }}>→ {task.action}</a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: "0.7rem", flexWrap: "wrap", alignItems: "center" }}>
                <button onClick={markDone} style={{
                  background: progress === 100 ? step.color : "#E1F5FE",
                  color: progress === 100 ? "#fff" : "#90A4AE",
                  border: "none", borderRadius: 50, padding: "0.85rem 1.8rem",
                  fontFamily: "'Fredoka', sans-serif", fontSize: "0.95rem", fontWeight: 700,
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: progress === 100 ? `0 4px 0 ${step.color}88` : "none",
                }}>
                  {current === STEPS.length - 1 ? "🎉 All done!" : "✓ Done — next step →"}
                </button>
                {current > 0 && (
                  <button onClick={() => setCurrent(current - 1)} style={{
                    background: "transparent", border: "2px solid #E1F5FE", borderRadius: 50,
                    padding: "0.85rem 1.2rem", fontFamily: "'Fredoka', sans-serif",
                    fontSize: "0.85rem", fontWeight: 600, color: "#90A4AE", cursor: "pointer",
                  }}>← Back</button>
                )}
              </div>

              {done.includes(step.id) && (
                <p style={{ marginTop: "0.8rem", fontSize: "0.82rem", fontFamily: "'Fredoka', sans-serif", fontWeight: 800, color: step.color }}>✓ {step.done}</p>
              )}

              {/* Final celebration */}
              {done.length === STEPS.length && (
                <div style={{ marginTop: "2rem", background: `linear-gradient(135deg, #0288D1, #9C7FE0)`, borderRadius: 20, padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.8rem" }}>🎉</div>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.7rem", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>LittleRoutes is live.</h2>
                  <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", fontWeight: 600, marginBottom: "1.2rem" }}>
                    Real website. Real payments. Real domain.<br />Now go post your first Pinterest pin.
                  </p>
                  <div style={{ background: "#C6FF00", color: "#1a3a6b", fontFamily: "'Fredoka', sans-serif", fontSize: "0.95rem", fontWeight: 800, padding: "0.7rem 2rem", borderRadius: 50, display: "inline-block", boxShadow: "0 4px 0 #9DC200" }}>
                    → littleroutes.co
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
