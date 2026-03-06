import Link from "next/link"
import NgReportForm from "@/components/public/NgReportForm"
import { CheckCircle } from "lucide-react"
import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "職人リアルNGレポート | shokulab",
  description:
    "職人が製品を「選ばない理由」を毎月可視化。建材・ツール・ワークウェアメーカーの商品開発・営業・マーケ担当者向け月刊レポート。",
}

export default function NgReportPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <main>
        {/* Hero */}
        <section
          className="pt-36 pb-20 text-center"
          style={{
            background: "linear-gradient(135deg, #003D5C 0%, #005A85 100%)",
          }}
        >
          <div className="max-w-[760px] mx-auto px-8">
            <span className="inline-block text-[11px] font-bold tracking-[2px] text-brand-orange uppercase mb-4">
              FOR MANUFACTURERS
            </span>
            <h1 className="text-[44px] font-black leading-tight text-white mb-5 tracking-tight">
              職人リアルNGレポート
            </h1>
            <p className="text-lg text-white/65 leading-relaxed mb-2">
              職人が製品を「選ばない理由」を毎月可視化する
            </p>
            <p className="text-white/50 leading-relaxed mb-10">
              建材・ツール・ワークウェアメーカーの商品開発・営業・マーケ担当者のための月刊定期購読レポート
            </p>
            <a
              href="#sample"
              className="inline-block bg-brand-orange text-white px-10 py-4 rounded-md font-bold text-[15px] hover:bg-[#E09200] hover:-translate-y-0.5 transition-all"
            >
              無料サンプルを請求する
            </a>
          </div>
        </section>

        {/* What is */}
        <section className="py-20 bg-[#F6F9FB] border-t border-[#E2EBF0]">
          <div className="max-w-[1040px] mx-auto px-16">
            <div className="text-center mb-12">
              <span className="inline-block text-[11px] font-bold tracking-[2px] text-brand-blue uppercase mb-3">
                ABOUT
              </span>
              <h2 className="text-[30px] font-black tracking-tight text-[#0D1B26]">
                NGレポートとは？
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="bg-white border border-[#E2EBF0] rounded-[10px] p-8 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 bg-brand-blue-pale rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0099CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0D1B26] mb-2">リアルな不満を可視化</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  現場の職人が製品を「なぜ選ばないのか」をインタビュー・アンケートで収集し、定量データとして毎月レポート化します。
                </p>
              </div>
              <div className="bg-white border border-[#E2EBF0] rounded-[10px] p-8 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 bg-brand-blue-pale rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0099CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0D1B26] mb-2">毎月25日配信</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  PDF形式でメール配信。商品開発会議や営業戦略の策定にそのまま活用できます。
                </p>
              </div>
              <div className="bg-white border border-[#E2EBF0] rounded-[10px] p-8 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <div className="w-12 h-12 bg-brand-blue-pale rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0099CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0D1B26] mb-2">メーカー特化</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  建材・ツール・ワークウェアメーカーの商品開発・営業・マーケティング担当者向けに特化した内容です。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 bg-white border-t border-[#E2EBF0]">
          <div className="max-w-[1040px] mx-auto px-16">
            <div className="text-center mb-12">
              <span className="inline-block text-[11px] font-bold tracking-[2px] text-brand-blue uppercase mb-3">
                PRICING
              </span>
              <h2 className="text-[30px] font-black tracking-tight text-[#0D1B26]">
                料金プラン
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {/* TRIAL */}
              <div className="bg-white border border-[#E2EBF0] rounded-[10px] p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <p className="text-[11px] font-bold text-[#8EA4B4] tracking-[1.5px] mb-2">TRIAL</p>
                <h3 className="text-lg font-bold text-[#0D1B26] mb-3">単発購入</h3>
                <p className="text-[32px] font-black text-[#0D1B26] mb-1 font-dm">
                  ¥50,000<span className="text-sm font-normal text-gray-500">/回（税別）</span>
                </p>
                <ul className="mt-5 space-y-3 text-sm">
                  <li className="flex items-start gap-2.5 text-gray-500">
                    <CheckCircle className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                    最新号1冊をお届け
                  </li>
                  <li className="flex items-start gap-2.5 text-gray-500">
                    <CheckCircle className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                    契約なし・都度購入
                  </li>
                </ul>
              </div>

              {/* STANDARD */}
              <div className="bg-white border-2 border-brand-blue rounded-[10px] p-8 relative hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <p className="text-[11px] font-bold text-brand-blue tracking-[1.5px] mb-2">STANDARD</p>
                <h3 className="text-lg font-bold text-[#0D1B26] mb-3">月額プラン</h3>
                <p className="text-[32px] font-black text-[#0D1B26] mb-1 font-dm">
                  ¥39,800<span className="text-sm font-normal text-gray-500">/月（税別）</span>
                </p>
                <p className="text-xs text-gray-500">3ヶ月契約</p>
                <ul className="mt-5 space-y-3 text-sm">
                  <li className="flex items-start gap-2.5 text-gray-500">
                    <CheckCircle className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                    毎月25日にPDF配信
                  </li>
                  <li className="flex items-start gap-2.5 text-gray-500">
                    <CheckCircle className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                    3ヶ月ごとに自動更新
                  </li>
                </ul>
              </div>

              {/* BEST VALUE */}
              <div
                className="rounded-[10px] p-8 border border-[#004D70] hover:shadow-lg hover:-translate-y-0.5 transition-all"
                style={{ background: "linear-gradient(145deg, #003D5C 0%, #005A85 100%)" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-[11px] font-bold text-brand-orange tracking-[1.5px]">BEST VALUE</p>
                  <span className="text-[10px] bg-brand-orange text-white px-2 py-0.5 rounded font-bold">15%OFF</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">年間プラン</h3>
                <p className="text-[32px] font-black text-white mb-1 font-dm">
                  ¥402,000<span className="text-sm font-normal text-white/50">/年（税別）</span>
                </p>
                <p className="text-xs text-white/50">月あたり ¥33,500</p>
                <ul className="mt-5 space-y-3 text-sm">
                  <li className="flex items-start gap-2.5 text-white/65">
                    <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                    年間12号すべて配信
                  </li>
                  <li className="flex items-start gap-2.5 text-white/65">
                    <CheckCircle className="w-4 h-4 text-brand-orange mt-0.5 flex-shrink-0" />
                    最もお得な料金プラン
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Free Sample CTA + Form */}
        <section id="sample" className="py-20 bg-[#F6F9FB] border-t border-[#E2EBF0]">
          <div className="max-w-[520px] mx-auto px-8">
            <div className="text-center mb-10">
              <span className="inline-block bg-brand-orange text-white text-[10px] font-bold tracking-[1px] px-3 py-1 rounded mb-4">
                FREE SAMPLE
              </span>
              <h2 className="text-[26px] font-black text-[#0D1B26] mb-4 tracking-tight">
                創刊号（Vol.0）を無料でお届けします
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                「経験の浅い職人さんが製品説明を『分かったつもり』になる瞬間」
              </p>
              <p className="text-sm text-gray-500 leading-relaxed mt-1">
                以下のフォームからお気軽にご請求ください。
              </p>
            </div>
            <NgReportForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
