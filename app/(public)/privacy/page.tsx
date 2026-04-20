import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "shokulab.comにおける個人情報の取り扱いについて。収集する情報、利用目的、第三者提供、Cookie・アクセス解析、広告配信に関する方針を記載します。",
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-6 sm:px-8">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B26] mb-4 tracking-tight">
          プライバシーポリシー
        </h1>
        <p className="text-sm text-gray-500 mb-12">最終更新日: 2026年4月20日</p>

        <div className="prose prose-sm sm:prose-base max-w-none text-[#222] leading-relaxed space-y-10">
          <section>
            <p>
              株式会社職人さんドットコム（以下「当社」といいます）は、当社が運営するウェブサイト「shokulab.com」（以下「本サイト」といいます）における個人情報の取り扱いについて、本プライバシーポリシーを定めます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">1. 事業者情報</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>事業者名: 株式会社職人さんドットコム</li>
              <li>運営責任者: 代表取締役 岡部洋佑</li>
              <li>連絡先: <a href="/contact" className="text-brand-blue hover:underline">お問い合わせフォーム</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">2. 収集する個人情報</h2>
            <p>本サイトでは、以下の個人情報を収集する場合があります。</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>お問い合わせフォーム等でご提供いただく氏名、会社名、メールアドレス、電話番号、お問い合わせ内容</li>
              <li>商品購入時にご提供いただく情報（決済は決済事業者にて処理され、クレジットカード番号等は当社サーバーには保存されません）</li>
              <li>本サイト閲覧時のIPアドレス、ブラウザ情報、アクセス日時、閲覧ページ等のログ情報</li>
              <li>Cookie等の技術により取得される識別子および行動履歴</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">3. 個人情報の利用目的</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>お問い合わせへの対応・返信のため</li>
              <li>商品・サービスの提供、代金決済、発送のため</li>
              <li>メールマガジン等による情報提供のため（ご同意いただいた場合に限ります）</li>
              <li>本サイトの利用状況の分析、機能改善およびコンテンツ品質向上のため</li>
              <li>不正アクセス・不正利用の防止およびセキュリティ確保のため</li>
              <li>法令に基づく対応のため</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">4. 第三者への提供</h2>
            <p>
              当社は、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
              <li>業務委託先に対して、利用目的の達成に必要な範囲で提供する場合（機密保持契約を締結します）</li>
              <li>事業の承継に伴い提供する場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">5. Cookieおよびアクセス解析ツールについて</h2>
            <p>
              本サイトでは、サービス品質向上およびアクセス解析のためCookieおよび類似技術を使用しています。また、以下のアクセス解析ツールを利用しています。
            </p>
            <h3 className="font-bold mt-5 mb-2">Google Analytics 4</h3>
            <p>
              本サイトではGoogle LLCが提供するアクセス解析ツール「Google Analytics 4」を利用しています。このサービスはトラフィックデータの収集のためにCookieを使用しますが、個人を特定する情報は取得しません。収集されたデータはGoogle社のプライバシーポリシーに基づき管理されます。
            </p>
            <p className="mt-3">
              参照: <a href="https://policies.google.com/privacy?hl=ja" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">Google プライバシーポリシー</a>
            </p>
            <p className="mt-3">
              Cookieを無効化することでデータの収集を拒否できます。設定方法はご利用のブラウザのヘルプをご参照ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">6. 広告配信について</h2>
            <p>
              本サイトは、第三者配信の広告サービス（Google AdSense・Google 広告を含む）を利用する場合があります。このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、本サイトや他のサイトへのアクセスに関する情報（氏名・住所・メールアドレス・電話番号は含まれません）をCookieを通じて取得・利用することがあります。
            </p>
            <p className="mt-3">
              Googleによる広告のためのCookie使用を無効にするには、<a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">Googleの広告設定</a>ページにアクセスしてください。第三者広告ネットワークの広告配信を無効にする場合は<a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">aboutads.info</a>へアクセスしてください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">7. 個人情報の安全管理措置</h2>
            <p>
              当社は、個人情報の漏洩、滅失または毀損の防止その他の個人情報の安全管理のため、必要かつ適切な措置を講じます。通信経路の暗号化（TLS）、アクセス権限の適切な管理、業務委託先の監督を含みます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">8. 個人情報の開示・訂正・削除</h2>
            <p>
              ご本人からの個人情報の開示、訂正、利用停止、削除等のご請求に対しては、ご本人であることを確認のうえ、法令に従い合理的な期間内に対応いたします。ご請求は<a href="/contact" className="text-brand-blue hover:underline">お問い合わせフォーム</a>よりお願いいたします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">9. プライバシーポリシーの変更</h2>
            <p>
              本ポリシーの内容は、法令改正その他の事情により変更されることがあります。変更後の内容は本ページに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mt-10 mb-4">10. お問い合わせ窓口</h2>
            <p>
              本ポリシーまたは個人情報の取り扱いに関するお問い合わせは、<a href="/contact" className="text-brand-blue hover:underline">お問い合わせフォーム</a>よりお願いいたします。
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
