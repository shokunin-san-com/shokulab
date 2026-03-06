import type { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shokulab.com"

export default function robots(): MetadataRoute.Robots {
  const disallowPaths = ["/admin/", "/api/"]

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: disallowPaths },
      { userAgent: "GPTBot", allow: "/", disallow: disallowPaths },
      { userAgent: "ClaudeBot", allow: "/", disallow: disallowPaths },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
