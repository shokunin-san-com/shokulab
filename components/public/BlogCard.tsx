import Link from "next/link"
import type { BlogPost } from "@/types"

const categoryLabels: Record<string, string> = {
  craftsman: "業務効率化",
  owner: "経営者向け",
  maker: "AI活用",
  ma: "建設業M&A",
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-white border border-[#E2EBF0] rounded-[10px] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all block"
    >
      {/* Thumbnail placeholder */}
      <div
        className="h-[120px] flex items-center justify-center border-b border-[#E2EBF0]"
        style={{ background: "linear-gradient(135deg, #E6F4FA, #D0ECF7)" }}
      >
        <div className="w-12 h-12 bg-brand-blue-pale border border-brand-blue-mid rounded-lg flex items-center justify-center text-[22px]">
          📄
        </div>
      </div>
      <div className="px-5 py-5">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {post.category && (
              <span className="inline-block text-[10px] font-bold tracking-[1px] px-2.5 py-0.5 rounded bg-brand-blue-pale text-brand-blue">
                {categoryLabels[post.category] || post.category}
              </span>
            )}
          </div>
          {post.published_at && (
            <span className="text-[11px] text-[#8EA4B4]">
              {new Date(post.published_at)
                .toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .replace(/\//g, ".")}
            </span>
          )}
        </div>
        <p className="text-sm font-semibold leading-[1.7] text-[#0D1B26]">
          {post.title}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-brand-blue bg-brand-blue-pale px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
