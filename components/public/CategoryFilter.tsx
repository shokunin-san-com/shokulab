"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useTransition } from "react"

const CATEGORIES = [
  { value: "", label: "すべて" },
  { value: "craftsman", label: "業務効率化" },
  { value: "owner", label: "経営者向け" },
  { value: "maker", label: "AI活用" },
  { value: "ma", label: "建設業M&A" },
]

export default function CategoryFilter({ current }: { current: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  function handleClick(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("category", value)
    } else {
      params.delete("category")
    }
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {CATEGORIES.map((cat) => {
        const isActive = current === cat.value
        return (
          <button
            key={cat.value}
            onClick={() => handleClick(cat.value)}
            disabled={isPending}
            className={`text-[12px] font-bold px-4 py-1.5 rounded-full border transition-all ${
              isActive
                ? "bg-brand-blue text-white border-brand-blue"
                : "bg-white text-[#4B5563] border-[#E2EBF0] hover:border-brand-blue hover:text-brand-blue"
            } ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}
