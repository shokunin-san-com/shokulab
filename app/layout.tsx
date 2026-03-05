import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "shokulab - 職人・建設業界のための総合プラットフォーム",
  description:
    "職人さん・建設会社のための業務テンプレート、AI活用ガイド、M&A教材を提供するコンテンツメディア",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
