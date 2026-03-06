"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  const navLinks = [
    { href: "/products", label: "商品一覧" },
    { href: "/blog", label: "ブログ" },
    { href: "/ng-report", label: "NGレポート" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 h-16 bg-white transition-all duration-200 ${
        scrolled
          ? "border-b border-gray-200 shadow-sm"
          : "border-b border-transparent"
      }`}
    >
      <Link
        href="/"
        className="text-[21px] font-black text-brand-blue tracking-tight font-dm"
      >
        shokulab
      </Link>
      <div className="flex gap-8 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-[13px] pb-1 border-b-2 transition-colors ${
              pathname === link.href
                ? "text-brand-blue border-brand-blue font-bold"
                : "text-gray-500 border-transparent hover:text-brand-blue hover:border-brand-blue"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/ng-report#sample"
          className="ml-2 bg-brand-orange text-white px-6 py-2.5 rounded-md text-[13px] font-bold hover:bg-[#E09200] hover:-translate-y-0.5 transition-all"
        >
          無料サンプルを請求する
        </Link>
      </div>
    </nav>
  )
}
