import Link from "next/link"
import { formatPriceRange } from "@/lib/utils"
import type { Product } from "@/types"

const categoryLabels: Record<string, string> = {
  template: "テンプレート",
  guide: "ガイド",
  ai: "AI",
  bundle: "バンドル",
  subscription: "サブスクリプション",
  btob: "BtoB",
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="bg-white border border-[#E2EBF0] rounded-[10px] p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all block"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-block text-[10px] font-bold tracking-[1px] px-2.5 py-0.5 rounded bg-brand-blue-pale text-brand-blue">
          {categoryLabels[product.category] || product.category}
        </span>
      </div>
      <h3 className="text-[16px] font-bold text-[#0D1B26] mb-2 leading-snug">
        {product.title}
      </h3>
      {product.description && (
        <p className="text-[13px] text-gray-500 line-clamp-2 mb-5 leading-relaxed">
          {product.description}
        </p>
      )}
      <p className="text-lg font-black text-brand-blue font-dm">
        {formatPriceRange(product.price_min, product.price_max)}
      </p>
    </Link>
  )
}
