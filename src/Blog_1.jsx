import { useEffect } from "react";
import { Link } from "react-router-dom";
import { posts } from "./posts/index.js";

export default function Blog() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ minHeight: "100vh", background: "#F3FAFF", fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,400&family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700;800&display=swap');
        .post-card:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important; }
        .post-card { transition: transform 0.2s, box-shadow 0.2s; }
        .read-more:hover { background: #1a3a6b !important; color: #C6FF00 !important; }
      `}</style>

      {/* Nav */}
      <nav style={{ background: "#1a3a6b", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.4rem" }}>🧭</span>
          <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.2rem", fontWeight: 700, color: "#fff" }}>
            Little<span style={{ color: "#0288D1" }}>Routes</span>
          </span>
        </Link>
        <Link to="/" style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
          ← Back to site
        </Link>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #1a3a6b 0%, #9C7FE0 100%)", padding: "4rem 2rem 3rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "0.75rem", color: "#C6FF00", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "0.8rem" }}>✦ The LittleRoutes Journal</p>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 900, color: "#fff", marginBottom: "1rem", lineHeight: 1.15 }}>
          Making Family Travel<br /><span style={{ color: "#C6FF00" }}>Genuinely Educational</span>
        </h1>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "1.05rem", color: "rgba(255,255,255,0.75)", maxWidth: 560, margin: "0 auto" }}>
          Talking points, sticky facts, trip ideas and honest advice for parents who want their kids to actually understand what they're seeing.
        </p>
      </div>

      {/* Posts grid */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {sorted.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <div className="post-card" style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.07)", border: "1.5px solid #E1F5FE", height: "100%" }}>
                {/* Card header */}
                <div style={{ background: post.headerColor || "#1a3a6b", padding: "1.5rem 1.2rem 1.2rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.8rem", flexWrap: "wrap" }}>
                    {post.tags?.map(tag => (
                      <span key={tag} style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 50, padding: "0.15rem 0.6rem", fontFamily: "'Fredoka', sans-serif", fontSize: "0.65rem", fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: "1.15rem", fontWeight: 700, color: "#fff", lineHeight: 1.3, margin: 0 }}>
                    {post.title}
                  </h2>
                </div>

                {/* Card body */}
                <div style={{ padding: "1rem 1.2rem 1.2rem" }}>
                  <p style={{ fontSize: "0.88rem", color: "#607D8B", lineHeight: 1.6, marginBottom: "1rem" }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "0.72rem", color: "#90A4AE", fontWeight: 600 }}>
                      {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                    <span className="read-more" style={{ background: "#C6FF00", color: "#1a3a6b", fontFamily: "'Fredoka', sans-serif", fontSize: "0.75rem", fontWeight: 800, borderRadius: 50, padding: "0.3rem 0.8rem", transition: "all 0.2s" }}>
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#90A4AE" }}>
            <p style={{ fontFamily: "'Fredoka', sans-serif", fontSize: "1.2rem" }}>First posts coming soon.</p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div style={{ background: "#1a3a6b", padding: "3rem 2rem", textAlign: "center" }}>
        <p style={{ fontFamily: "'Fraunces', serif", fontSize: "1.4rem", color: "#fff", marginBottom: "1rem" }}>
          Ready to make your next trip unforgettable?
        </p>
        <Link to="/" style={{ display: "inline-block", background: "#C6FF00", color: "#1a3a6b", fontFamily: "'Fredoka', sans-serif", fontWeight: 800, fontSize: "1rem", borderRadius: 50, padding: "0.8rem 2rem", textDecoration: "none" }}>
          Get Your Family Travel Playbook →
        </Link>
      </div>
    </div>
  );
}
