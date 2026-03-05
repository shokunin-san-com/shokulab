import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react"
import { formatPriceRange } from "@/lib/utils"
import type { Product } from "@/types"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const supabase = createClient()
  const { data: product } = await supabase
    .from("products")
    .select("title, description")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!product) return { title: "商品が見つかりません | shokulab" }

  return {
    title: `${product.title} | shokulab`,
    description: product.description || undefined,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = createClient()
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", params.slug)
    .eq("is_published", true)
    .single()

  if (!product) notFound()

  const p = product as Product

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            shokulab
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/products" className="hover:text-accent transition">
              商品一覧
            </Link>
            <Link href="/blog" className="hover:text-accent transition">
              ブログ
            </Link>
            <Link href="/ng-report" className="hover:text-accent transition">
              職人リアルNGレポート
            </Link>
          </nav>
        </div>
      </header>

      {/* Product Detail */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/products"
          className="flex items-center gap-1 text-sm text-subtext hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          商品一覧に戻る
        </Link>

        <div className="bg-white border border-border rounded-md p-8">
          <h1 className="text-3xl font-bold text-primary mb-4">{p.title}</h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-accent">
              {formatPriceRange(p.price_min, p.price_max)}
            </span>
            <span className="text-xs text-subtext bg-surface px-2 py-1 rounded">
              税込
            </span>
          </div>

          {p.description && (
            <div className="prose prose-sm max-w-none text-text mb-8 whitespace-pre-wrap leading-relaxed">
              {p.description}
            </div>
          )}

          {/* Features list */}
          <div className="bg-surface rounded-md p-6 mb-8">
            <h2 className="font-bold text-primary mb-3">この商品に含まれるもの</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>ダウンロード即利用可能</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <span>購入後のメールサポート付き</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          {p.stripe_payment_link ? (
            <a
              href={p.stripe_payment_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-3 rounded font-bold text-lg hover:opacity-90 transition"
            >
              購入する
              <ExternalLink className="w-5 h-5" />
            </a>
          ) : (
            <p className="text-subtext text-sm bg-surface rounded-md p-4">
              この商品は現在準備中です。販売開始までしばらくお待ちください。
            </p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} 株式会社職人さんドットコム All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
