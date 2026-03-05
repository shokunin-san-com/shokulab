import Link from "next/link"
import { CheckCircle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "ご購入ありがとうございます | shokulab",
}

export default function ThanksPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-primary text-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold">
            shokulab
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-20 text-center">
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-4">
          ご購入ありがとうございます
        </h1>
        <p className="text-subtext leading-relaxed mb-8">
          ご登録のメールアドレスにダウンロードリンクをお送りしました。
          <br />
          メールが届かない場合は、迷惑メールフォルダをご確認ください。
        </p>
        <Link
          href="/products"
          className="inline-block bg-primary text-white px-6 py-3 rounded font-bold hover:opacity-90 transition"
        >
          他の商品を見る
        </Link>
      </main>

      <footer className="bg-primary text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted">
          <p>&copy; {new Date().getFullYear()} 株式会社職人さんドットコム All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
