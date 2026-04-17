import Script from "next/script"

/**
 * Google Analytics 4 計測タグ
 *
 * 環境変数 NEXT_PUBLIC_GA_MEASUREMENT_ID が設定されている場合のみ gtag を読み込む。
 * 未設定時は何もレンダリングしないので、ローカル開発やプレビュー環境では無害。
 *
 * Vercel 側で NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX を設定すること。
 */
export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
