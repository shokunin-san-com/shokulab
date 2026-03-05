import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import ProductForm from "@/components/admin/ProductForm"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Product } from "@/types"

export const dynamic = "force-dynamic"

export default async function AdminProductEditPage({
  params,
}: {
  params: { id: string }
}) {
  // 新規作成
  if (params.id === "new") {
    return (
      <div>
        <Link
          href="/admin/products"
          className="flex items-center gap-1 text-sm text-subtext hover:text-primary mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          商品一覧に戻る
        </Link>
        <h1 className="text-2xl font-bold text-primary mb-6">新規商品</h1>
        <ProductForm />
      </div>
    )
  }

  const supabase = createClient()
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single()

  if (!product) notFound()

  return (
    <div>
      <Link
        href="/admin/products"
        className="flex items-center gap-1 text-sm text-subtext hover:text-primary mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        商品一覧に戻る
      </Link>
      <h1 className="text-2xl font-bold text-primary mb-6">商品編集</h1>
      <ProductForm product={product as Product} />
    </div>
  )
}
