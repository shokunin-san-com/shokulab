import type { MetadataRoute } from "next"
import { createClient } from "@supabase/supabase-js"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shokulab.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/ng-report`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ]

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseKey) return entries

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  })

  // Published blog posts
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, published_at, updated_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (posts) {
    for (const post of posts) {
      entries.push({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.updated_at
          ? new Date(post.updated_at)
          : post.published_at
            ? new Date(post.published_at)
            : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })
    }
  }

  // Published products
  const { data: products } = await supabase
    .from("products")
    .select("slug, updated_at")
    .eq("is_published", true)

  if (products) {
    for (const product of products) {
      entries.push({
        url: `${SITE_URL}/products/${product.slug}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })
    }
  }

  return entries
}
