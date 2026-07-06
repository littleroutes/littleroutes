import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { posts } from "./posts/index.js";
import { setSEO } from "./seo.js";

// Very simple markdown-to-HTML renderer (no external library needed)
function renderMarkdown(md) {
  if (!md) return "";
  return md
    // H2
    .replace(/^## (.+)$/gm, '<h2 style="font-family:\'Fraunces\',serif;font-size:1.4rem;font-weight:700;color:#1a3a6b;margin:1.6rem 0 0.5rem;line-height:1.2;">$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3 style="font-family:\'Fredoka\',sans-serif;font-size:1.1rem;font-weight:700;color:#0288D1;margin:1.2rem 0 0.4rem;">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:800;color:#1a3a6b;">$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em style="font-style:italic;color:#607D8B;">$1</em>')
    // Links — must come before italic/bold processing
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" style="color:#0288D1;font-weight:700;text-decoration:underline;" target="_blank" rel="noopener">$1</a>')
    // Blockquote
    .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #C6FF00;background:#F3FAFF;margin:1rem 0;padding:0.7rem 1rem 0.7rem 1.1rem;border-radius:0 8px 8px 0;font-family:\'Georgia\',serif;font-style:italic;font-size:0.95rem;color:#1a3a6b;line-height:1.55;">$1</blockquote>')
    // Horizontal rule
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid #E1F5FE;margin:1.5rem 0;"/>')
    // Unordered list items
    .replace(/^- (.+)$/gm, '<li style="margin-bottom:0.3rem;line-height:1.55;">$1</li>')
    // Wrap consecutive li in ul
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, (match) => `<ul style="padding-left:1.4rem;margin:0.6rem 0;color:#334;">${match}</ul>`)
    // Paragraphs — blank line separated
    .split(/\n\n+/)
    .map(block => {
      block = block.trim();
      if (!block) return "";
      if (block.startsWith("<h") || block.startsWith("<ul") || block.startsWith("<blockquote") || block.startsWith("<hr")) return block;
      return `<p style="font-size:0.97rem;line-height:1.7;color:#334;margin-bottom:0.8rem;font-family:'Nunito',sans-serif;">${block.replace(/\n/g, " ")}</p>`;
    })
    .join("\n");
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (post) {
      setSEO({
        title: `${post.title} | LittleRoutes`,
        description: post.excerpt || undefined,
        path: `/blog/${post.slug}`,
        type: "article",
        publishedTime: post.date,
      });
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div style={{ minHeight: "100vh", background: "#F3FAFF", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');
      `}</style>

      {/* Nav */}
      <nav style={{ background: "#1a3a6b", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.4rem" }}>🧭</span>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>
            Little<span style={{ color: "#0288D1" }}>Routes</span>
          </span>
        </Link>
        <Link to="/blog" style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
          ← All posts
        </Link>
      </nav>

      {/* Post header */}
      <div style={{ background: `linear-gradient(135deg, ${post.headerColor || "#1a3a6b"} 0%, #9C7FE0 100%)`, padding: "3.5rem 2rem 3rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            {post.tags?.map(tag => (
              <span key={tag} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "0.2rem 0.8rem", fontFamily: "'Fredoka', sans-serif", fontSize: "0.7rem", fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: "1rem" }}>
            {post.title}
          </h1>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.7)" }}>
            {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            {post.readTime && ` · ${post.readTime} min read`}
          </p>
        </div>
      </div>

      {/* Post content */}
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }} />

        {/* CTA box */}
        <div style={{ background: "#1a3a6b", borderRadius: 20, padding: "2rem", marginTop: "3rem", textAlign: "center" }}>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "0.7rem", color: "#C6FF00", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.6rem" }}>✦ LittleRoutes</p>
          <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.3rem", color: "#fff", marginBottom: "0.6rem", lineHeight: 1.3 }}>
            Want a complete playbook for your trip?
          </p>
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.65)", marginBottom: "1.2rem" }}>
            Talking points, scavenger hunts, personal letters to each child by name. Delivered instantly.
          </p>
          <Link to="/" style={{ display: "inline-block", background: "#C6FF00", color: "#1a3a6b", fontFamily: "'Fredoka', sans-serif", fontWeight: 800, fontSize: "1rem", borderRadius: 50, padding: "0.8rem 2rem", textDecoration: "none" }}>
            Get Your Family Travel Playbook →
          </Link>
          <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginTop: "0.6rem" }}>From $17 · Instant delivery · littleroutes.co</p>
        </div>

        {/* Back to blog */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Link to="/blog" style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "0.9rem", color: "#0288D1", fontWeight: 700, textDecoration: "none" }}>
            ← Back to all posts
          </Link>
        </div>
      </div>
    </div>
  );
}
