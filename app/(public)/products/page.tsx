import { createClient } from "@/lib/supabase/server"
import ProductCard from "@/components/public/ProductCard"
import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { Product } from "@/types"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "商品一覧 | shokulab",
  description:
    "職人・建設業界向けの業務テンプレート、AI活用ガイド、M&A教材をお探しの方はこちら。",
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
      <SiteNav />

      {/* Hero */}
      <section
        className="pt-32 pb-12 border-b border-[#E2EBF0]"
        style={{ background: "linear-gradient(180deg, #EDF6FB 0%, #fff 100%)" }}
      >
        <div className="max-w-[1040px] mx-auto px-16">
          <span className="inline-block text-[11px] font-bold tracking-[2px] text-brand-blue uppercase mb-3">
            PRODUCTS
          </span>
          <h1 className="text-[36px] font-black tracking-tight text-[#0D1B26] mb-3">
            商品一覧
          </h1>
          <p className="text-[15px] text-gray-500 leading-relaxed">
            職人・建設業界に特化したテンプレート・ガイドをご用意しています。
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-[1040px] mx-auto px-16 py-16">
        {products && products.length > 0 ? (
          <div className="grid grid-cols-3 gap-5">
            {(products as Product[]).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-[#F6F9FB] border border-[#E2EBF0] rounded-[10px] p-16 text-center">
            <p className="text-gray-500">現在、公開中の商品はありません。</p>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
