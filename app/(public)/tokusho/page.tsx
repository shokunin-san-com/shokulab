import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "特定商取引法に基づく表記。shokulab.comで販売する商品・サービスに関する事業者情報、販売価格、支払方法、引渡時期、返品等について記載します。",
  robots: { index: true, follow: true },
}

const ROWS: Array<[string, React.ReactNode]> = [
  ["販売事業者", "株式会社職人さんドットコム"],
  ["運営責任者", "代表取締役 岡部洋佑"],
  [
    "所在地",
    "ご請求いただいた場合、遅滞なく開示いたします。お問い合わせフォームよりご連絡ください。",
  ],
  [
    "連絡先",
    <>
      <a key="c" href="/contact" className="text-brand-blue hover:underline">
        お問い合わせフォーム
      </a>
      <br />
      ご請求いただいた場合、電話番号を遅滞なく開示いたします。
    </>,
  ],
  [
    "販売価格",
    "各商品ページに税込価格で表示しています。",
  ],
  [
    "商品代金以外の必要料金",
    "インターネット接続料、通信料等はお客様のご負担となります。",
  ],
  [
    "支払方法",
    "クレジットカード決済（Stripeを通じた決済）",
  ],
  [
    "支払時期",
    "ご注文時に即時決済となります。",
  ],
  [
    "商品の引渡時期",
    "決済完了後、ご登録のメールアドレス宛にダウンロードリンクを自動送信します（原則即時）。",
  ],
  [
    "返品・キャンセル",
    <>
      デジタルコンテンツの性質上、決済完了後の返品・キャンセルはお受けできません。
      <br />
      ただし、商品の内容に不備がある場合は、ご購入後7日以内にお問い合わせフォームよりご連絡いただいた場合に限り、返金または再送信にて対応いたします。
    </>,
  ],
  [
    "動作環境",
    "PDFを閲覧できる環境（Adobe Acrobat Reader等）、一般的なインターネット接続環境が必要です。",
  ],
]

export default function TokushoPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 sm:px-8">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B26] mb-4 tracking-tight">
          特定商取引法に基づく表記
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          特定商取引法第11条に基づき、以下の事項を表示します。
        </p>

        <div className="border border-[#e6e8e9] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {ROWS.map(([label, value], i) => (
                <tr
                  key={label}
                  className={i !== ROWS.length - 1 ? "border-b border-[#e6e8e9]" : ""}
                >
                  <th className="bg-gray-50 text-left font-medium text-[#505050] px-5 py-4 w-40 sm:w-56 align-top">
                    {label}
                  </th>
                  <td className="px-5 py-4 text-[#222] leading-relaxed">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
