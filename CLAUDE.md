# CLAUDE.md

This file gives Claude Code the context it needs to work safely and effectively in the LittleRoutes codebase. Read this before making changes.

## What this project is

LittleRoutes (littleroutes.co) is an AI-powered family travel playbook business. A user answers a short quiz about their trip, picks a pricing tier, pays via Lemon Squeezy, and receives an AI-generated personalized travel playbook (talking points, sticky facts, dinner questions, etc. for their destination and kids' ages).

## Tech stack

- **Frontend:** React (Vite)
- **Hosting:** Vercel, auto-deploys on push to GitHub `main`
- **Routing:** react-router-dom v6
- **Payments:** Lemon Squeezy (littleroutesco.lemonsqueezy.com, store ID 384232)
- **AI model:** `claude-haiku-4-5-20251001`, called **server-side only** from a Vercel serverless function
- **Repo:** GitHub, repo name `littleroutes`

## ⚠️ Critical constraint: separate Anthropic account

The Anthropic API key used by this app's `/api/generate.js` belongs to a **completely separate Anthropic account** (`littleroutes.co@gmail.com`) from the developer's personal Claude.ai subscription. Mixing these caused a real billing incident before. Never suggest merging these, never hardcode or move API keys between contexts, and never expose `ANTHROPIC_API_KEY` to the browser (no `VITE_` prefix, ever).

## File structure

```
littleroutes/ (root)
├── App.jsx                 ← Main app — ALL site code lives here (1,090+ lines)
├── index.html               ← HTML shell + Pinterest pixel + meta tags
├── package.json
├── vite.config.js
├── vercel.json               ← Rewrites all routes to index.html — required for React Router
├── api/
│   └── generate.js          ← Serverless function, calls Anthropic API server-side
└── src/
    ├── main.jsx              ← React entry point — imports '../App.jsx' (note the path!)
    ├── Blog.jsx              ← Blog listing page
    ├── BlogPost.jsx          ← Individual blog post renderer
    └── posts/
        ├── index.js          ← Auto-loads all post files via import.meta.glob — never edit manually
        └── [slug].js         ← One file per blog post
```

**Unusual but intentional:** `App.jsx` lives at the repo root, not inside `src/`. `src/main.jsx` imports it as `'../App.jsx'`. Do not "fix" this by moving the file.

## App.jsx internals

- **`QUESTIONS` array** — the 6 quiz questions (destination, duration, kids' ages, kids' names, interests, notes).
- **`TIERS` array** — the 3 pricing tiers (Explorer $17, Family Playbook $27, Family Pack $47), each with a Lemon Squeezy checkout UUID.
- **`buildPrompt()`** — builds the Claude prompt from quiz answers; gates content by tier (`essential` vs `playbook` vs `family-pack`); caps days at 7.
- **`renderPlaybook()`** — renders the AI's markdown response as styled JSX (headers, bold/italic, blockquotes, bullets, checkboxes).
- **`App()`** — router wrapper: `/blog`, `/blog/:slug`, and `/*` (main app).
- **`LittleRoutesApp()`** — the main site. State machine driven by `step`: `landing → quiz → tiers → checkout → generating → result`.

### Payment flow
1. User finishes quiz, picks tier, enters email, clicks pay.
2. `handleCheckout()` saves quiz answers/tier/email to `sessionStorage`, redirects to Lemon Squeezy.
3. Lemon Squeezy redirects back to `littleroutes.co?success=true` after payment.
4. A `useEffect` with an **empty dependency array** (must stay `[]` — fires once on mount) detects `?success=true`, reads `sessionStorage`, clears it and the URL param immediately, then calls `POST /api/generate`.
5. Result is rendered via `renderPlaybook()`.

### Serverless function — `api/generate.js`
Receives `{ prompt }`, calls Anthropic with `claude-haiku-4-5-20251001` and `max_tokens: 6000` using `process.env.ANTHROPIC_API_KEY` (server-side only), returns `{ result }`.

## Blog architecture

- `Blog.jsx` lists posts from `src/posts/index.js`, sorted by date descending.
- `BlogPost.jsx` renders a single post with a custom (no-library) markdown renderer: H2/H3, bold/italic, links, blockquotes, HR, bullet lists. Ends with a CTA back to the homepage.
- `src/posts/index.js` uses `import.meta.glob('./*.js', { eager: true })` — **adding a post is just adding a new file to `src/posts/`**, no manual index edits needed.
- Each post file exports `export const post = { slug, title, date, excerpt, tags, headerColor, readTime, content }`, with `content` as a markdown template literal.

## Brand system

- **Colors:** Navy `#1a3a6b`, Sky blue `#0288D1`, Lilac `#9C7FE0`, Lime `#C6FF00`, White `#ffffff`, light bg `#F3FAFF`, light border `#E1F5FE`, muted text `#90A4AE`. No other colors — never orange, red, green, or Facebook blue.
- **Fonts:** Fredoka (headlines/labels/buttons), Fraunces (serif display/blog & playbook titles), Nunito (body).
- **Destination color mapping:** Rome → navy, Kyoto → sky blue, Paris → lilac.

## Common tasks

| Task | Where |
|---|---|
| Add/edit a quiz question | `QUESTIONS` array in `App.jsx` |
| Change pricing | `TIERS` array in `App.jsx` **and** the matching Lemon Squeezy product |
| Add a new tier | `TIERS` array + new Lemon Squeezy product + `baseUrls` in `handleCheckout()` + gating logic in `buildPrompt()` |
| Add a landing page band | Inside the `{step === "landing"}` block, after the last band, following the existing wrapper/`maxWidth: 960` pattern |
| Change the AI model | `model` field in `api/generate.js` |
| Change max output length | `max_tokens` in `api/generate.js` |
| Add a route | New `<Route>` in `App()` + new component in `src/` |
| Add a blog post | New `src/posts/[slug].js` file — auto-detected |
| Update Pinterest pixel / meta tags | `index.html` |

## Hard rules — do not do these

- Never add a `VITE_` prefix to `ANTHROPIC_API_KEY`, or otherwise expose it to client-side code.
- Never call the Anthropic API directly from the browser — always route through `/api/generate.js`.
- Never change the payment-detection `useEffect`'s dependency array away from `[]`.
- Never remove or bypass `vercel.json` — it's required for client-side routing to work on refresh/direct nav.
- Never change the `src/main.jsx` import path (`'../App.jsx'`, not `'./App.jsx'`).
- Never use `<form>` tags — use `onClick` handlers.
- Never use `localStorage`/`sessionStorage` for anything other than the payment flow handoff.
- Never suggest merging the LittleRoutes Anthropic API account with any other Anthropic account.

## Deployment

1. Commit to `main` on GitHub.
2. Vercel auto-deploys (~60s).
3. Check Vercel → Deployments for build status; Logs tab if it fails.
4. Common errors: `Cannot find module` (wrong path/folder), `Expected ',' or '}'` (JSON syntax in `package.json`), `duplicate key` (duplicate CSS property in a style object), `is not defined` (missing import).

## Marketing context (for reference, not code)

Traffic comes primarily from Pinterest (3 pins/day across Rome, Kyoto, Paris boards), with Substack planned as a list-building funnel and TikTok in early development. This doesn't affect app code but may come up in requests referencing blog posts, SEO, or content calendars — those are generated by separate content skills, not part of this repo's code.
