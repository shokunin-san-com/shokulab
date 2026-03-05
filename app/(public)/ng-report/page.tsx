import Link from "next/link"
import NgReportForm from "@/components/public/NgReportForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NGレポート サンプル請求 | shokulab",
  description: "建設業向けNGレポートのサンプルを無料でお送りします。",
}

export default function NgReportPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">shokulab</Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/products" className="hover:text-accent transition">商品一覧</Link>
            <Link href="/blog" className="hover:text-accent transition">ブログ</Link>
            <Link href="/ng-report" className="text-accent font-bold">NGレポート</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-primary mb-4">
            NGレポート サンプル請求
          </h1>
          <p className="text-subtext leading-relaxed">
            建設業界の施工NGを体系的にまとめたレポートのサンプルを無料でお送りします。
            <br />
            以下のフォームからお気軽にご請求ください。
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <NgReportForm />
        </div>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} 株式会社職人さんドットコム All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
