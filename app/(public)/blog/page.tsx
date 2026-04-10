import Link from "next/link"
import { Suspense } from "react"
import { createPublicClient } from "@/lib/supabase/server"
import BlogCard from "@/components/public/BlogCard"
import CategoryFilter from "@/components/public/CategoryFilter"
import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import { blogListJsonLd } from "@/lib/jsonld"
import type { BlogPost } from "@/types"
import type { Metadata } from "next"

const CATEGORY_LABELS: Record<string, string> = {
  craftsman: "業務効率化",
  owner: "経営者向け",
  maker: "AI活用",
  ma: "建設業M&A",
}

export function generateMetadata({
  searchParams,
}: {
  searchParams: { category?: string }
}): Metadata {
  const cat = searchParams.category
  const catLabel = cat ? CATEGORY_LABELS[cat] : null
  return {
    title: catLabel ? `${catLabel} | ブログ | shokulab` : "ブログ | shokulab",
    description: "職人・建設業界に関するノウハウ、最新情報をお届けします。",
  }
}

export const revalidate = 3600

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const supabase = createPublicClient()
  const category = searchParams.category || ""

  let query = supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  if (category) {
    query = query.eq("category", category)
  }

  const { data: posts } = await query

  return (
    <div className="min-h-screen bg-[#F6F9FB]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogListJsonLd(
              (posts as BlogPost[])?.map((p) => ({
                title: p.title,
                slug: p.slug,
                published_at: p.published_at,
              })) || []
            )
          ),
        }}
      />
      <SiteNav />

      {/* Hero */}
      <section
        className="pt-32 pb-12 border-b border-[#E2EBF0]"
        style={{ background: "linear-gradient(180deg, #EDF6FB 0%, #F6F9FB 100%)" }}
      >
        <div className="max-w-[1040px] mx-auto px-16">
          <span className="inline-block text-[11px] font-bold tracking-[2px] text-brand-blue uppercase mb-3">
            BLOG
          </span>
          <h1 className="text-[36px] font-black tracking-tight text-[#0D1B26] mb-3">
            {category && CATEGORY_LABELS[category]
              ? `ブログ — ${CATEGORY_LABELS[category]}`
              : "ブログ"}
          </h1>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            職人・建設業界に関するノウハウ、最新情報をお届けします。
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-[1040px] mx-auto px-16 py-12">
        {/* Category filter */}
        <Suspense fallback={null}>
          <CategoryFilter current={category} />
        </Suspense>

        {posts && posts.length > 0 ? (
          <>
            <p className="text-[12px] text-gray-400 mb-5">{posts.length}件</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {(posts as BlogPost[]).map((post, i) => (
                <BlogCard key={post.id} post={post} priority={i < 3} />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white border border-[#E2EBF0] rounded-[10px] p-16 text-center">
            <p className="text-gray-500">
              {category ? "このカテゴリの記事はまだありません。" : "記事は準備中です。"}
            </p>
            {category && (
              <Link
                href="/blog"
                className="inline-block mt-4 text-sm text-brand-blue hover:underline"
              >
                すべての記事を見る
              </Link>
            )}
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
