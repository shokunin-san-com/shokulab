import type { Metadata } from "next"
import { DM_Sans, Noto_Sans_JP } from "next/font/google"
import { websiteJsonLd } from "@/lib/jsonld"
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shokulab.com"

export const metadata: Metadata = {
  title: {
    default: "shokulab - 職人・建設業界のための総合プラットフォーム",
    template: "%s | shokulab",
  },
  description:
    "職人さん・建設会社のための業務テンプレート、AI活用ガイド、M&A教材を提供。20年間・累計55回の職人アンケートで積み上げた知見をビジネスに活かす。",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "shokulab",
    title: "shokulab - 職人・建設業界のための総合プラットフォーム",
    description:
      "職人さん・建設会社のための業務テンプレート、AI活用ガイド、M&A教材を提供。20年間の知見をビジネスに活かす。",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "shokulab - 職人・建設業界のための総合プラットフォーム",
    description:
      "職人さん・建設会社のための業務テンプレート、AI活用ガイド、M&A教材を提供。",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
    types: {
      "application/rss+xml": `${siteUrl}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${dmSans.variable} ${notoSansJP.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd()),
          }}
        />
        {children}
      </body>
    </html>
  )
}
