import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import BlogCard from "@/components/public/BlogCard"
import type { BlogPost } from "@/types"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ブログ | shokulab",
  description: "職人・建設業界に関するノウハウ、最新情報をお届けします。",
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
    <div className="min-h-screen">
      <header className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">shokulab</Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/products" className="hover:text-accent transition">商品一覧</Link>
            <Link href="/blog" className="text-accent font-bold">ブログ</Link>
            <Link href="/ng-report" className="hover:text-accent transition">NGレポート</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-2">ブログ</h1>
        <p className="text-subtext mb-8">
          職人・建設業界に関するノウハウ、最新情報をお届けします。
        </p>

        {posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(posts as BlogPost[]).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-md p-12 text-center">
            <p className="text-subtext">記事は準備中です。</p>
          </div>
        )}
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} 株式会社職人さんドットコム All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
