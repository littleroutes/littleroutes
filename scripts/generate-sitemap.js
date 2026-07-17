#!/usr/bin/env node

// Regenerates public/sitemap.xml from the post files in src/posts/.
// Runs automatically before every build (see package.json "prebuild"),
// so a new post can never be forgotten from the sitemap again.

const fs = require("fs");
const path = require("path");

const POSTS_DIR = path.resolve(__dirname, "../src/posts");
const SITEMAP_PATH = path.resolve(__dirname, "../public/sitemap.xml");
const SITE_URL = "https://www.littleroutes.co";

function extractField(source, file, field) {
  const match = source.match(new RegExp(`${field}:\\s*"([^"]+)"`));
  if (!match) {
    throw new Error(`generate-sitemap: could not find "${field}" in ${file}`);
  }
  return match[1];
}

const postFiles = fs
  .readdirSync(POSTS_DIR)
  .filter((file) => file.endsWith(".js") && file !== "index.js");

const posts = postFiles.map((file) => {
  const source = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  return {
    slug: extractField(source, file, "slug"),
    date: extractField(source, file, "date"),
  };
});

posts.sort((a, b) => new Date(a.date) - new Date(b.date));

const postEntries = posts
  .map(
    (post) => `  <url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("\n\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Main site -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Blog listing -->
  <url>
    <loc>${SITE_URL}/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Blog posts (sorted by date) -->
${postEntries}

</urlset>
`;

fs.writeFileSync(SITEMAP_PATH, xml);
console.log(`generate-sitemap: wrote ${posts.length} blog posts to public/sitemap.xml`);
