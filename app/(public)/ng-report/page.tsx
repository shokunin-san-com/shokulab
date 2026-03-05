import Link from "next/link"
import NgReportForm from "@/components/public/NgReportForm"
import { CheckCircle, FileText, Calendar, TrendingUp } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "職人リアルNGレポート | shokulab",
  description:
    "職人が製品を「選ばない理由」を毎月可視化。建材・ツール・ワークウェアメーカーの商品開発・営業・マーケ担当者向け月刊レポート。",
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
            <Link href="/ng-report" className="text-accent font-bold">職人リアルNGレポート</Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-primary text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-accent font-bold text-sm mb-3 tracking-wider">FOR MANUFACTURERS</p>
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
              職人リアルNGレポート
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-2">
              職人が製品を「選ばない理由」を毎月可視化する
            </p>
            <p className="text-muted leading-relaxed mb-8">
              建材・ツール・ワークウェアメーカーの
              <br className="hidden md:block" />
              商品開発・営業・マーケ担当者のための月刊定期購読レポート
            </p>
            <a
              href="#sample"
              className="inline-block bg-accent text-white px-8 py-3 rounded font-bold hover:opacity-90 transition"
            >
              無料サンプルを請求する
            </a>
          </div>
        </section>

        {/* What is */}
        <section className="py-16 bg-surface">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary text-center mb-10">
              NGレポートとは？
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-border rounded-md p-6 text-center">
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2">リアルな不満を可視化</h3>
                <p className="text-sm text-subtext leading-relaxed">
                  現場の職人が製品を「なぜ選ばないのか」をインタビュー・アンケートで収集し、定量データとして毎月レポート化します。
                </p>
              </div>
              <div className="bg-white border border-border rounded-md p-6 text-center">
                <Calendar className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2">毎月25日配信</h3>
                <p className="text-sm text-subtext leading-relaxed">
                  PDF形式でメール配信。商品開発会議や営業戦略の策定にそのまま活用できます。
                </p>
              </div>
              <div className="bg-white border border-border rounded-md p-6 text-center">
                <FileText className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="font-bold text-primary mb-2">メーカー特化</h3>
                <p className="text-sm text-subtext leading-relaxed">
                  建材・ツール・ワークウェアメーカーの商品開発・営業・マーケティング担当者向けに特化した内容です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary text-center mb-10">料金プラン</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {/* TRIAL */}
              <div className="bg-white border border-border rounded-md p-6">
                <p className="text-xs font-bold text-subtext tracking-wider mb-1">TRIAL</p>
                <h3 className="text-lg font-bold text-primary mb-2">単発購入</h3>
                <p className="text-3xl font-black text-primary mb-1">
                  ¥50,000<span className="text-sm font-normal text-subtext">/回（税別）</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>最新号1冊をお届け</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>契約なし・都度購入</span>
                  </li>
                </ul>
              </div>

              {/* STANDARD */}
              <div className="bg-white border-2 border-secondary rounded-md p-6 relative">
                <p className="text-xs font-bold text-secondary tracking-wider mb-1">STANDARD</p>
                <h3 className="text-lg font-bold text-primary mb-2">月額プラン</h3>
                <p className="text-3xl font-black text-primary mb-1">
                  ¥39,800<span className="text-sm font-normal text-subtext">/月（税別）</span>
                </p>
                <p className="text-xs text-subtext">3ヶ月契約</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>毎月25日にPDF配信</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>3ヶ月ごとに自動更新</span>
                  </li>
                </ul>
              </div>

              {/* BEST VALUE */}
              <div className="bg-primary text-white rounded-md p-6">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-bold text-accent tracking-wider">BEST VALUE</p>
                  <span className="text-xs bg-accent text-white px-2 py-0.5 rounded font-bold">15%OFF</span>
                </div>
                <h3 className="text-lg font-bold mb-2">年間プラン</h3>
                <p className="text-3xl font-black mb-1">
                  ¥402,000<span className="text-sm font-normal text-muted">/年（税別）</span>
                </p>
                <p className="text-xs text-muted">月あたり ¥33,500</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>年間12号すべて配信</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>最もお得な料金プラン</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Free Sample CTA + Form */}
        <section id="sample" className="py-16 bg-surface">
          <div className="max-w-xl mx-auto px-4">
            <div className="text-center mb-8">
              <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded mb-3">
                無料
              </span>
              <h2 className="text-2xl font-bold text-primary mb-3">
                創刊号（Vol.0）を無料でお届けします
              </h2>
              <p className="text-subtext leading-relaxed text-sm">
                「経験の浅い職人さんが製品説明を『分かったつもり』になる瞬間」
              </p>
              <p className="text-subtext leading-relaxed text-sm mt-2">
                以下のフォームからお気軽にご請求ください。
              </p>
            </div>
            <NgReportForm />
          </div>
        </section>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} 株式会社職人さんドットコム All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
