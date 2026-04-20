import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import ContactForm from "@/components/public/ContactForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "shokulab.comへのお問い合わせはこちらから。記事内容、商品・サービス、広告・提携、取材・メディア掲載など各種ご相談を承ります。",
  robots: { index: true, follow: true },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <main className="pt-32 pb-24 max-w-xl mx-auto px-6 sm:px-8">
        <h1 className="text-3xl sm:text-4xl font-black text-[#0D1B26] mb-4 tracking-tight">
          お問い合わせ
        </h1>
        <p className="text-[15px] text-[#505050] mb-10 leading-relaxed">
          記事の内容、商品・サービス、広告・提携、取材のご依頼等、shokulabに関する各種お問い合わせはこちらのフォームよりお願いいたします。原則3営業日以内にご返信いたします。
        </p>

        <ContactForm />
      </main>

      <SiteFooter />
    </div>
  )
}
