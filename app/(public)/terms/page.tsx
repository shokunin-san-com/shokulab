import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "利用規約",
  description:
    "shokulab.comの利用規約。本サイトのご利用にあたっての条件、禁止事項、免責事項、著作権等を記載します。",
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 sm:px-8">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B26] mb-4 tracking-tight">
          利用規約
        </h1>
        <p className="text-sm text-gray-500 mb-12">最終更新日: 2026年4月20日</p>

        <div className="prose prose-sm sm:prose-base max-w-none text-[#222] leading-relaxed space-y-10">
          <section>
            <p>
              本利用規約（以下「本規約」といいます）は、株式会社職人さんドットコム（以下「当社」といいます）が運営するウェブサイト「shokulab.com」（以下「本サイト」といいます）の利用条件を定めるものです。ご利用の皆様（以下「ユーザー」といいます）には、本規約に同意のうえ本サイトをご利用いただきます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">第1条（適用）</h2>
            <p>
              本規約は、ユーザーと当社との間の本サイト利用に関わる一切の関係に適用されます。当社が本サイト上に掲載する個別規定は、本規約の一部を構成するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">第2条（禁止事項）</h2>
            <p>ユーザーは、本サイトの利用にあたり、以下の行為をしてはなりません。</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>本サイトまたは第三者のサーバー・ネットワーク機能を破壊・妨害する行為</li>
              <li>本サイトの運営を妨害するおそれのある行為</li>
              <li>他のユーザーまたは第三者になりすます行為</li>
              <li>本サイトに関連して得た情報を商業的に利用する行為（当社が許諾した場合を除く）</li>
              <li>本サイトの他のユーザーまたは第三者の知的財産権・プライバシー・名誉等の権利を侵害する行為</li>
              <li>不正アクセス、不正ログイン、脆弱性の悪用</li>
              <li>自動化された手段（スクレイピング・ボット等）による大量アクセス</li>
              <li>その他、当社が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">第3条（本サイトの提供の停止等）</h2>
            <p>
              当社は、以下の事由が生じた場合、ユーザーへの事前通知なく本サイトの全部または一部の提供を停止または中断することができるものとします。
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>本サイトのシステム保守点検または更新を行う場合</li>
              <li>地震、落雷、火災、停電、天災等の不可抗力により本サイトの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他、当社が本サイトの提供が困難と判断した場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">第4条（著作権・知的財産権）</h2>
            <p>
              本サイトに掲載されているテキスト、画像、デザイン、ロゴ、ソフトウェア等の著作権およびその他の知的財産権は、当社または正当な権利者に帰属します。ユーザーは、当社の事前の書面による承諾なく、本サイトのコンテンツを複製、転載、改変、頒布等することはできません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">第5条（免責事項）</h2>
            <p>
              当社は、本サイトに掲載される情報について、正確性、完全性、有用性、最新性を保証するものではありません。本サイトの情報に基づいて行われた行為によりユーザーに生じた損害について、当社は一切の責任を負いません。
            </p>
            <p className="mt-3">
              本サイトから第三者のウェブサイトへのリンクが張られている場合、当社はリンク先のサイトの内容について一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">第6条（サービス内容の変更等）</h2>
            <p>
              当社は、ユーザーに通知することなく、本サイトの内容を変更、追加または廃止することができるものとし、ユーザーはこれを異議なく承諾するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">第7条（利用規約の変更）</h2>
            <p>
              当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更できるものとします。変更後の規約は、本サイトに掲載された時点から効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">第8条（準拠法・裁判管轄）</h2>
            <p>
              本規約の解釈にあたっては、日本法を準拠法とします。本サイトに関連して紛争が生じた場合には、当社本店所在地を管轄する裁判所を専属的合意管轄裁判所とします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">お問い合わせ</h2>
            <p>
              本規約に関するお問い合わせは、<a href="/contact" className="text-brand-blue hover:underline">お問い合わせフォーム</a>よりお願いいたします。
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
