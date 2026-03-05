import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { BlogPost } from "@/types"

export const dynamic = "force-dynamic"

const categoryLabels: Record<string, string> = {
  craftsman: "職人向け",
  owner: "経営者向け",
  maker: "メーカー向け",
  ma: "M&A",
}

export default async function AdminBlogPage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">ブログ管理</h1>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          新規記事
        </Link>
      </div>

      <div className="bg-white border border-border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="px-4 py-3 font-medium">タイトル</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">カテゴリ</th>
              <th className="px-4 py-3 font-medium">状態</th>
              <th className="px-4 py-3 font-medium hidden lg:table-cell">作成日</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(posts as BlogPost[] | null)?.map((post) => (
              <tr key={post.id} className="hover:bg-surface transition">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="text-secondary hover:underline font-medium"
                  >
                    {post.title}
                  </Link>
                  {post.excerpt && (
                    <p className="text-xs text-subtext mt-0.5 line-clamp-1">{post.excerpt}</p>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-subtext">
                  {categoryLabels[post.category || ""] || post.category || "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      post.is_published
                        ? "bg-accent/10 text-accent"
                        : "bg-gray-100 text-subtext"
                    }`}
                  >
                    {post.is_published ? "公開" : "下書き"}
                  </span>
                </td>
                <td className="px-4 py-3 hidden lg:table-cell text-subtext">
                  {formatDate(post.created_at)}
                </td>
              </tr>
            ))}
            {(!posts || posts.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-subtext">
                  記事がまだありません。「新規記事」から追加してください。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
