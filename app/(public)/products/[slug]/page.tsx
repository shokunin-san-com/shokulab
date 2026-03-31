import { createPublicClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { formatPriceRange } from "@/lib/utils"
import { productJsonLd, breadcrumbJsonLd } from "@/lib/jsonld"
import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import MarkdownRenderer from "@/components/public/MarkdownRenderer"
import type { Product } from "@/types"
import type { Metadata } from "next"

export const revalidate = 3600

export async function generateStaticParams() {
  const supabase = createPublicClient()
  const { data: products } = await supabase
    .from("products")
    .select("slug")
    .eq("is_published", true)
  return (products ?? []).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const supabase = createPublicClient()
  const { data: product } = await supabase
    .from("products")
    .select("title, description")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!product) return { title: "商品が見つかりません" }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shokulab.com"
  return {
    title: product.title,
    description: product.description?.slice(0, 160) || undefined,
    alternates: { canonical: `${siteUrl}/products/${params.slug}` },
    openGraph: {
      title: product.title,
      description: product.description?.slice(0, 160) || undefined,
      type: "website",
      url: `${siteUrl}/products/${params.slug}`,
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createPublicClient()
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!product) notFound()

  const p = product as Product
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shokulab.com"

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(p)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "ホーム", url: siteUrl },
              { name: "商品一覧", url: `${siteUrl}/products` },
              { name: p.title, url: `${siteUrl}/products/${p.slug}` },
            ])
          ),
        }}
      />
      <SiteNav />

      <main className="pt-28 pb-20 max-w-[760px] mx-auto px-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-[13px] text-gray-500 hover:text-brand-blue mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          商品一覧に戻る
        </Link>

        {/* 商品画像 */}
        {p.image_url && (
          <div className="relative w-full aspect-[16/7] rounded-[10px] overflow-hidden mb-8 border border-[#E2EBF0]">
            <Image
              src={p.image_url}
              alt={p.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="bg-white border border-[#E2EBF0] rounded-[10px] p-10">
          <h1 className="text-[30px] font-black text-[#0D1B26] mb-5 tracking-tight">
            {p.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-[28px] font-black text-brand-blue font-dm">
              {formatPriceRange(p.price_min, p.price_max)}
            </span>
            <span className="text-xs text-gray-500 bg-[#F6F9FB] px-2.5 py-1 rounded">
              税込
            </span>
          </div>

          {p.description && (
            <div className="mb-10">
              <MarkdownRenderer content={p.description} />
            </div>
          )}

          {/* 特典リスト */}
          {p.features && p.features.length > 0 && (
            <div className="bg-[#F6F9FB] rounded-lg p-7 mb-10">
              <h2 className="font-bold text-[#0D1B26] mb-4 text-[15px]">
                この商品に含まれるもの
              </h2>
              <ul className="space-y-3">
                {p.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-500">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 flex-shrink-0">
                      <circle cx="8" cy="8" r="8" fill="#0099CC" opacity="0.15" />
                      <path d="M4.5 8L6.8 10.5L11.5 5.5" stroke="#0099CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA */}
          {p.stripe_payment_link ? (
            <a
              href={p.stripe_payment_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-orange text-white px-10 py-4 rounded-md font-bold text-[15px] hover:bg-[#E09200] hover:-translate-y-0.5 transition-all"
            >
              購入する
              <ExternalLink className="w-5 h-5" />
            </a>
          ) : (
            <p className="text-gray-500 text-sm bg-[#F6F9FB] rounded-lg p-5">
              この商品は現在準備中です。販売開始までしばらくお待ちください。
            </p>
          )}

          {/* 詳細本文 */}
          {p.body && (
            <div className="mt-12 pt-10 border-t border-[#E2EBF0]">
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                {p.body}
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
