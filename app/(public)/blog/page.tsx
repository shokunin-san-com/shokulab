import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import BlogCard from "@/components/public/BlogCard"
import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { BlogPost } from "@/types"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ブログ | shokulab",
  description:
    "職人・建設業界に関するノウハウ、最新情報をお届けします。",
}

export const dynamic = "force-dynamic"

export default async function BlogPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  return (
    <div className="min-h-screen bg-[#F6F9FB]">
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
            ブログ
          </h1>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            職人・建設業界に関するノウハウ、最新情報をお届けします。
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-[1040px] mx-auto px-16 py-16">
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-5">
            {(posts as BlogPost[]).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#E2EBF0] rounded-[10px] p-16 text-center">
            <p className="text-gray-500">記事は準備中です。</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
