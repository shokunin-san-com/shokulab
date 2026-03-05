import { createClient } from "@/lib/supabase/server"
import ProductCard from "@/components/public/ProductCard"
import Link from "next/link"
import type { Product } from "@/types"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "商品一覧 | shokulab",
  description: "職人・建設業界向けの業務テンプレート、AI活用ガイド、M&A教材をお探しの方はこちら。",
}

export const dynamic = "force-dynamic"

export default async function ProductsPage() {
  const supabase = createClient()
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            shokulab
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/products" className="text-accent font-bold">
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

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-2">商品一覧</h1>
        <p className="text-subtext mb-8">
          職人・建設業界に特化したテンプレート・ガイドをご用意しています。
        </p>

        {products && products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(products as Product[]).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-md p-12 text-center">
            <p className="text-subtext">現在、公開中の商品はありません。</p>
          </div>
        )}
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
