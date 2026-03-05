import Link from "next/link"
import { formatPriceRange } from "@/lib/utils"
import type { Product } from "@/types"
import { FileText, BookOpen, Cpu, Package } from "lucide-react"

const categoryIcons: Record<string, React.ElementType> = {
  template: FileText,
  guide: BookOpen,
  ai: Cpu,
  bundle: Package,
}

const categoryLabels: Record<string, string> = {
  template: "テンプレート",
  guide: "ガイド",
  ai: "AI",
  bundle: "バンドル",
  subscription: "サブスクリプション",
  btob: "BtoB",
}

export default function ProductCard({ product }: { product: Product }) {
  const Icon = categoryIcons[product.category] || FileText

  return (
    <Link
      href={`/products/${product.slug}`}
      className="bg-white border border-border rounded-md p-6 hover:shadow-md transition block"
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-secondary" />
        <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded">
          {categoryLabels[product.category] || product.category}
        </span>
      </div>
      <h3 className="text-lg font-bold text-primary mb-2 leading-snug">
        {product.title}
      </h3>
      {product.description && (
        <p className="text-sm text-subtext line-clamp-2 mb-4">
          {product.description}
        </p>
      )}
      <p className="text-lg font-bold text-accent">
        {formatPriceRange(product.price_min, product.price_max)}
      </p>
    </Link>
  )
}
