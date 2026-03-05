import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Plus } from "lucide-react"
import { formatPriceRange } from "@/lib/utils"
import type { Product } from "@/types"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
  const supabase = createClient()
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("sort_order", { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">商品管理</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition"
        >
          <Plus className="w-4 h-4" />
          新規商品
        </Link>
      </div>

      <div className="bg-white border border-border rounded-md overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-white text-left">
              <th className="px-4 py-3 font-medium">商品名</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">カテゴリ</th>
              <th className="px-4 py-3 font-medium hidden md:table-cell">フェーズ</th>
              <th className="px-4 py-3 font-medium">価格</th>
              <th className="px-4 py-3 font-medium">状態</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {(products as Product[] | null)?.map((product) => (
              <tr key={product.id} className="hover:bg-surface transition">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-secondary hover:underline font-medium"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-subtext">
                  {product.category}
                </td>
                <td className="px-4 py-3 hidden md:table-cell text-subtext">
                  {product.phase}
                </td>
                <td className="px-4 py-3">
                  {formatPriceRange(product.price_min, product.price_max)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      product.is_published
                        ? "bg-accent/10 text-accent"
                        : "bg-gray-100 text-subtext"
                    }`}
                  >
                    {product.is_published ? "公開" : "非公開"}
                  </span>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-subtext">
                  商品がまだありません。「新規商品」から追加してください。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
