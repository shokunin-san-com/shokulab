import Script from "next/script"

/**
 * Google AdSense 配信タグ
 *
 * 環境変数 NEXT_PUBLIC_ADSENSE_CLIENT が設定されている場合のみ
 * adsbygoogle.js を読み込む。未設定時は何もレンダリングしない。
 *
 * Vercel 側で NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX を設定すること。
 * AdSense 審査時のサイト所有確認用タグとしても機能する。
 */
export function GoogleAdsense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  if (!client) {
    return null
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
