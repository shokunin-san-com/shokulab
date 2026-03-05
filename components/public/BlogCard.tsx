import Link from "next/link"
import { formatDate } from "@/lib/utils"
import type { BlogPost } from "@/types"

const categoryLabels: Record<string, string> = {
  craftsman: "職人向け",
  owner: "経営者向け",
  maker: "メーカー向け",
  ma: "M&A",
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-white border border-border rounded-md p-6 hover:shadow-md transition block"
    >
      <div className="flex items-center gap-2 mb-3">
        {post.category && (
          <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded">
            {categoryLabels[post.category] || post.category}
          </span>
        )}
        {post.published_at && (
          <span className="text-xs text-subtext">{formatDate(post.published_at)}</span>
        )}
      </div>
      <h3 className="text-lg font-bold text-primary mb-2 leading-snug">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="text-sm text-subtext line-clamp-3">{post.excerpt}</p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-muted bg-surface px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  )
}
