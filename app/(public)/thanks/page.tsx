import Link from "next/link"
import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ご購入ありがとうございます | shokulab",
}

export default function ThanksPage() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      <main className="pt-36 pb-24 max-w-[520px] mx-auto px-8 text-center">
        <div className="w-16 h-16 bg-brand-blue-pale rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8L6.5 11.5L13 4.5"
              stroke="#0099CC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="text-[30px] font-black text-[#0D1B26] mb-5 tracking-tight">
          ご購入ありがとうございます
        </h1>
        <p className="text-[15px] text-gray-500 leading-[1.9] mb-10">
          ご登録のメールアドレスにダウンロードリンクをお送りしました。
          <br />
          メールが届かない場合は、迷惑メールフォルダをご確認ください。
        </p>
        <Link
          href="/products"
          className="inline-block bg-brand-blue text-white px-8 py-3.5 rounded-md font-bold text-sm hover:bg-brand-blue-dark hover:-translate-y-0.5 transition-all"
        >
          他の商品を見る
        </Link>
      </main>

      <SiteFooter />
    </div>
  )
}
