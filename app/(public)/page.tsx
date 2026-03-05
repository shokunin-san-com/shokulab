import Link from "next/link"
import { FileText, BookOpen, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            shokulab
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link href="/products" className="hover:text-accent transition">
              商品一覧
            </Link>
            <Link href="/blog" className="hover:text-accent transition">
              ブログ
            </Link>
            <Link href="/ng-report" className="hover:text-accent transition">
              職人リアルNGレポート
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-6">
            職人の仕事を、
            <br />
            もっとスマートに。
          </h1>
          <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
            業務テンプレート・AI活用ガイド・SNS運用ツールで
            <br className="hidden md:block" />
            建設業界のDXをサポートします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-accent text-white px-8 py-3 rounded font-bold hover:opacity-90 transition"
            >
              商品を見る
            </Link>
            <Link
              href="/ng-report"
              className="border border-white text-white px-8 py-3 rounded font-bold hover:bg-white/10 transition"
            >
              無料サンプルを請求する
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-surface">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            shokulab が提供するもの
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText className="w-8 h-8 text-accent" />}
              title="業務テンプレート"
              description="見積書・請求書・契約書など、インボイス対応済みのテンプレートを即ダウンロード。"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-accent" />}
              title="AI活用ガイド"
              description="ChatGPTを使った業務効率化の方法を、職人向けにわかりやすく解説。"
            />
            <FeatureCard
              icon={<BookOpen className="w-8 h-8 text-accent" />}
              title="建設業M&A教材"
              description="建設会社のM&Aに関する知識を体系的にまとめた完全ガイド。"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} 株式会社職人さんドットコム All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="bg-white rounded-md border border-border p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-subtext leading-relaxed">{description}</p>
    </div>
  )
}
