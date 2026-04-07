"use client"

import { useEffect, useState } from "react"
import { extractHeadings, estimateReadingTime } from "@/lib/headingUtils"
import type { TocItem } from "@/lib/headingUtils"

export { extractHeadings, estimateReadingTime }
export type { TocItem }

export default function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState<string>("")
  const headings = extractHeadings(content)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav className="sticky top-28">
      <p className="text-[11px] font-bold tracking-[1px] text-[#8EA4B4] mb-3">
        INDEX
      </p>
      <ul className="space-y-0.5">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(h.id)
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              }}
              className={`
                block text-[12px] leading-[1.6] py-1 border-l-2 transition-colors
                ${h.level === 3 ? "pl-5" : "pl-3"}
                ${
                  activeId === h.id
                    ? "border-brand-blue text-brand-blue font-semibold"
                    : "border-transparent text-[#8EA4B4] hover:text-[#4B5563] hover:border-[#D1DCE3]"
                }
              `}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
