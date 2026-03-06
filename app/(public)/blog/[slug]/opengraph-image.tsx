import { ImageResponse } from "next/og"
import { createClient } from "@/lib/supabase/server"

export const runtime = "edge"
export const alt = "shokulab ブログ記事"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const categoryLabels: Record<string, string> = {
  craftsman: "業務効率化",
  owner: "経営者向け",
  maker: "AI活用",
  ma: "建設業M&A",
}

async function loadNotoSansJP(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@900&display=swap",
      { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" } }
    ).then((r) => r.text())

    const url = css.match(/src:\s*url\(([^)]+)\)\s*format\(['"]woff2['"]\)/)?.[1]
    if (!url) return null
    return fetch(url).then((r) => r.arrayBuffer())
  } catch {
    return null
  }
}

export default async function Image({ params }: { params: { slug: string } }) {
  const supabase = createClient()
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, category")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  const title = post?.title || "shokulab ブログ"
  const category = post?.category
    ? categoryLabels[post.category] || post.category
    : ""

  const font = await loadNotoSansJP()

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #003D5C 0%, #001F30 100%)",
          padding: "60px",
          fontFamily: '"Noto Sans JP", sans-serif',
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {category && (
            <div
              style={{
                background: "#0099CC",
                color: "white",
                fontSize: "20px",
                fontWeight: 700,
                padding: "6px 20px",
                borderRadius: "6px",
                letterSpacing: "1px",
              }}
            >
              {category}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: title.length > 30 ? 42 : 52,
              fontWeight: 900,
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title.length > 60 ? title.slice(0, 57) + "..." : title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "#0099CC",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "22px",
                fontWeight: 900,
              }}
            >
              S
            </div>
            <div
              style={{
                color: "#D6EFF8",
                fontSize: "24px",
                fontWeight: 700,
                letterSpacing: "2px",
              }}
            >
              shokulab
            </div>
          </div>
          <div style={{ color: "#8EA4B4", fontSize: "16px" }}>
            shokulab.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: "Noto Sans JP", data: font, style: "normal" as const, weight: 900 as const }]
        : [],
    }
  )
}
