"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { BlogPost } from "@/types"

const categories = [
  { value: "craftsman", label: "職人向け" },
  { value: "owner", label: "経営者向け" },
  { value: "maker", label: "メーカー向け" },
  { value: "ma", label: "M&A" },
]

interface Props {
  post?: BlogPost
}

export default function BlogPostForm({ post }: Props) {
  const isNew = !post
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    slug: post?.slug ?? "",
    title: post?.title ?? "",
    content: post?.content ?? "",
    excerpt: post?.excerpt ?? "",
    category: post?.category ?? "craftsman",
    tags: post?.tags?.join(", ") ?? "",
    seo_title: post?.seo_title ?? "",
    seo_description: post?.seo_description ?? "",
    is_published: post?.is_published ?? false,
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const data = {
      slug: form.slug,
      title: form.title,
      content: form.content || null,
      excerpt: form.excerpt || null,
      category: form.category,
      tags: tags.length > 0 ? tags : null,
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
    }

    if (isNew) {
      const { error } = await supabase.from("blog_posts").insert(data)
      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
    } else {
      const { error } = await supabase
        .from("blog_posts")
        .update(data)
        .eq("id", post.id)
      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
    }

    router.push("/admin/blog")
    router.refresh()
  }

  async function handleDelete() {
    if (!post) return
    if (!confirm("この記事を削除してもよろしいですか？")) return

    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", post.id)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/admin/blog")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            タイトル <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            スラッグ（URL） <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            required
            pattern="[a-z0-9-]+"
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">本文（Markdown）</label>
        <textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          rows={20}
          className="input font-mono text-sm"
          placeholder="# 見出し&#10;&#10;本文をMarkdownで記述してください..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">抜粋（一覧表示用）</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={3}
          className="input"
          placeholder="一覧ページに表示される要約文"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">カテゴリ</label>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="input"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">タグ（カンマ区切り）</label>
          <input
            type="text"
            value={form.tags}
            onChange={(e) => update("tags", e.target.value)}
            className="input"
            placeholder="見積, インボイス, テンプレート"
          />
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-bold mb-3">SEO設定</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">SEOタイトル</label>
            <input
              type="text"
              value={form.seo_title}
              onChange={(e) => update("seo_title", e.target.value)}
              className="input"
              placeholder="空欄の場合はタイトルが使用されます"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">SEOディスクリプション</label>
            <textarea
              value={form.seo_description}
              onChange={(e) => update("seo_description", e.target.value)}
              rows={2}
              className="input"
              placeholder="検索結果に表示される説明文"
            />
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={form.is_published}
          onChange={(e) => update("is_published", e.target.checked)}
          className="w-4 h-4"
        />
        <span className="text-sm font-medium">公開する</span>
      </label>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded font-bold text-sm hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "保存中..." : isNew ? "作成" : "更新"}
        </button>

        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-600 text-sm hover:underline"
          >
            削除
          </button>
        )}
      </div>
    </form>
  )
}
