import Link from "next/link"
import type { BlogPost } from "@/types"

const categoryLabels: Record<string, string> = {
  craftsman: "業務効率化",
  owner: "経営者向け",
  maker: "AI活用",
  ma: "建設業M&A",
}

const categoryGradients: Record<string, string> = {
  craftsman: "linear-gradient(135deg, #E6F4FA 0%, #B8E6F0 100%)",
  owner: "linear-gradient(135deg, #003D5C 0%, #005A80 100%)",
  maker: "linear-gradient(135deg, #F0F9FD 0%, #D6EFF8 100%)",
  ma: "linear-gradient(135deg, #FFF8EC 0%, #FFE8B8 100%)",
}

const categoryIcons: Record<string, string> = {
  craftsman: "wrench",
  owner: "trending-up",
  maker: "cpu",
  ma: "handshake",
}

export default function BlogCard({ post }: { post: BlogPost }) {
  const gradient = categoryGradients[post.category || ""] || categoryGradients.craftsman
  const isOwner = post.category === "owner"

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-white border border-[#E2EBF0] rounded-[10px] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all block"
    >
      {/* Category-styled thumbnail */}
      <div
        className="h-[140px] flex items-end p-5 border-b border-[#E2EBF0] relative"
        style={{ background: gradient }}
      >
        <p className={`text-[13px] font-bold leading-snug line-clamp-2 ${isOwner ? "text-white" : "text-brand-navy"}`}>
          {post.title}
        </p>
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
