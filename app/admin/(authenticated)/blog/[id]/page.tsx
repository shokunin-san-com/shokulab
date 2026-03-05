import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import BlogPostForm from "@/components/admin/BlogPostForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { BlogPost } from "@/types"

export const dynamic = "force-dynamic"

export default async function AdminBlogEditPage({
  params,
}: {
  params: { id: string }
}) {
  if (params.id === "new") {
    return (
      <div>
        <Link
          href="/admin/blog"
          className="flex items-center gap-1 text-sm text-subtext hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          記事一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-primary mb-6">新規記事</h1>
        <BlogPostForm />
      </div>
    )
  }

  const supabase = createClient()
  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!post) notFound()

  return (
    <div>
      <Link
        href="/admin/blog"
        className="flex items-center gap-1 text-sm text-subtext hover:text-primary mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        記事一覧に戻る
      </Link>
      <h1 className="text-2xl font-bold text-primary mb-6">記事編集</h1>
      <BlogPostForm post={post as BlogPost} />
    </div>
  )
}
