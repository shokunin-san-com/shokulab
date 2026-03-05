import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

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
    <div className="min-h-screen">
      <header className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold">shokulab</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="flex items-center gap-1 text-sm text-subtext hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          ブログ一覧に戻る
        </Link>
        <article>
          <h1 className="text-3xl font-bold text-primary mb-4">{post.title}</h1>
          {post.published_at && (
            <p className="text-sm text-subtext mb-8">{formatDate(post.published_at)}</p>
          )}
          <div className="prose prose-sm max-w-none whitespace-pre-wrap leading-relaxed">
            {post.content}
          </div>
        </article>
      </main>
      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} 株式会社職人さんドットコム All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
