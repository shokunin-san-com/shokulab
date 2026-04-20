import Link from "next/link"

const FOOTER_LINKS: Array<{ label: string; href: string }> = [
  { label: "運営者情報", href: "/about" },
  { label: "お問い合わせ", href: "/contact" },
  { label: "プライバシーポリシー", href: "/privacy" },
  { label: "利用規約", href: "/terms" },
  { label: "特定商取引法に基づく表記", href: "/tokusho" },
]

export default function SiteFooter() {
  return (
    <footer className="bg-brand-navy-dark py-10 px-6 sm:px-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <Link
          href="/"
          className="font-dm text-[17px] font-extrabold text-brand-blue whitespace-nowrap"
        >
          shokulab
        </Link>

        <nav aria-label="footer" className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm">
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-white/60 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10">
        <p className="text-white/30 text-xs text-center sm:text-right">
          © {new Date().getFullYear()} shokulab / 株式会社職人さんドットコム
        </p>
      </div>
    </footer>
  )
}
