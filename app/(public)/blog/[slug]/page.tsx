import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { formatDate } from "@/lib/utils"
import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

const categoryLabels: Record<string, string> = {
  craftsman: "業務効率化",
  owner: "経営者向け",
  maker: "AI活用",
  ma: "建設業M&A",
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const supabase = createClient()
  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, seo_title, seo_description")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!post) return { title: "記事が見つかりません | shokulab" }

  return {
    title: `${post.seo_title || post.title} | shokulab`,
    description: post.seo_description || undefined,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-[#F6F9FB]">
      <SiteNav />

      <main className="pt-28 pb-20 max-w-[760px] mx-auto px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-[13px] text-gray-500 hover:text-brand-blue mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          ブログ一覧に戻る
        </Link>

        <article className="bg-white border border-[#E2EBF0] rounded-[10px] overflow-hidden">
          {/* Article header */}
          <div className="px-10 pt-10 pb-8 border-b border-[#E2EBF0]">
            <div className="flex items-center gap-3 mb-5">
              {post.category && (
                <span className="inline-block text-[10px] font-bold tracking-[1px] px-2.5 py-0.5 rounded bg-brand-blue-pale text-brand-blue">
                  {categoryLabels[post.category] || post.category}
                </span>
              )}
              {post.published_at && (
                <span className="text-[12px] text-[#8EA4B4]">
                  {formatDate(post.published_at)}
                </span>
              )}
            </div>
            <h1 className="text-[28px] font-black text-[#0D1B26] leading-snug tracking-tight">
              {post.title}
            </h1>
          </div>

          {/* Article body */}
          <div className="px-10 py-10">
            <div className="text-[15px] text-gray-600 leading-[1.9] whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="px-10 pb-10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs text-brand-blue bg-brand-blue-pale px-3 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* CTA */}
        <div className="mt-10 bg-white border border-[#E2EBF0] rounded-[10px] p-8 text-center">
          <p className="text-[13px] text-gray-500 mb-4">
            職人・建設業界向けの業務テンプレート・ツールをお探しですか？
          </p>
          <Link
            href="/products"
            className="inline-block bg-brand-orange text-white px-8 py-3 rounded-md text-sm font-bold hover:bg-[#E09200] hover:-translate-y-0.5 transition-all"
          >
            商品一覧を見る
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
