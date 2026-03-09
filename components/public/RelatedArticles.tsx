import Link from "next/link"

interface RelatedPost {
  id: string
  slug: string
  title: string
  category: string | null
  tags: string[] | null
  published_at: string | null
}

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

export default function RelatedArticles({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="mt-12">
      <h2 className="text-[15px] font-bold text-[#0D1B26] mb-5">
        Related
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {posts.map((post) => {
          const gradient =
            categoryGradients[post.category || ""] ||
            categoryGradients.craftsman
          const isOwner = post.category === "owner"
          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white border border-[#E2EBF0] rounded-[10px] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all block"
            >
              <div
                className="h-[90px] flex items-end p-4 border-b border-[#E2EBF0]"
                style={{ background: gradient }}
              >
                <p
                  className={`text-[12px] font-bold leading-snug line-clamp-2 ${
                    isOwner ? "text-white" : "text-brand-navy"
                  }`}
                >
                  {post.title}
                </p>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {post.category && (
                    <span className="text-[9px] font-bold tracking-[1px] px-2 py-0.5 rounded bg-brand-blue-pale text-brand-blue">
                      {categoryLabels[post.category] || post.category}
                    </span>
                  )}
                  {post.published_at && (
                    <span className="text-[10px] text-[#8EA4B4]">
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
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
