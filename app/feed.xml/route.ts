import { createClient } from "@supabase/supabase-js"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shokulab.com"
const SITE_NAME = "shokulab"
const SITE_DESCRIPTION =
  "職人さん・建設会社のための業務テンプレート、AI活用ガイド、M&A教材を提供。"

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  let items = ""

  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    })

    const { data: posts } = await supabase
      .from("blog_posts")
      .select("title, slug, excerpt, published_at, category, tags")
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .limit(20)

    if (posts) {
      items = posts
        .map(
          (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${escapeXml(post.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${escapeXml(post.slug)}</guid>
      ${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ""}
      ${post.published_at ? `<pubDate>${new Date(post.published_at).toUTCString()}</pubDate>` : ""}
      ${post.category ? `<category>${escapeXml(post.category)}</category>` : ""}
    </item>`
        )
        .join("")
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>ja</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
