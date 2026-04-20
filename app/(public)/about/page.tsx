import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "shokulab.comの運営者情報。運営会社である株式会社職人さんドットコムの概要・事業内容を記載します。",
  robots: { index: true, follow: true },
}

const ROWS: Array<[string, React.ReactNode]> = [
  ["運営サイト名", "shokulab.com"],
  ["運営会社", "株式会社職人さんドットコム"],
  ["代表者", "代表取締役 岡部洋佑"],
  ["設立", "2020年"],
  [
    "所在地",
    <>
      〒220-0004
      <br />
      神奈川県横浜市西区北幸2丁目10-28 むつみビル3F
    </>,
  ],
  ["電話番号", "03-6823-3524（平日 9:00〜18:00 / 土日祝休）"],
  ["メールアドレス", "info@shokunin-san.com"],
  [
    "事業内容",
    "職人・建設業界向け業務テンプレートの提供、AI活用支援、コンテンツメディア運営、M&Aアドバイザリー",
  ],
  [
    "お問い合わせ",
    <a key="c" href="/contact" className="text-brand-blue hover:underline">
      お問い合わせフォーム
    </a>,
  ],
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 sm:px-8">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B26] mb-4 tracking-tight">
          運営者情報
        </h1>
        <p className="text-sm text-gray-500 mb-12">shokulab.com を運営する事業者についてご案内します。</p>

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

        <section className="mt-12 space-y-5 text-[#222] leading-relaxed">
          <h2 className="text-xl font-bold">ミッション</h2>
          <p>
            職人・建設業界のアナログな現場にテクノロジーとノウハウを届け、現場で働く方が本業に集中できる環境をつくることを目指しています。20年間・累計55回にわたる職人さんへのアンケート・ヒアリングで積み上げた一次情報をもとに、実務で役立つ情報発信・商品提供・事業支援を行っています。
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
