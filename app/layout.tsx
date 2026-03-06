import type { Metadata } from "next"
import { DM_Sans, Noto_Sans_JP } from "next/font/google"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-dm-sans",
})

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
})

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
    <html lang="ja" className={`${dmSans.variable} ${notoSansJP.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
