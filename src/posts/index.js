// ─────────────────────────────────────────────────────────────────────────────
// LittleRoutes Blog Post Registry — Auto-loading
// ─────────────────────────────────────────────────────────────────────────────
// To add a new post:
// 1. Create a new file in this folder: src/posts/your-post-slug.js
// 2. Upload it to GitHub
// 3. Done — post goes live in 60 seconds. No other changes needed.
// ─────────────────────────────────────────────────────────────────────────────

const modules = import.meta.glob('./*.js', { eager: true });

export const posts = Object.entries(modules)
  .filter(([path]) => !path.includes('index'))
  .map(([, mod]) => mod.post)
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date));
