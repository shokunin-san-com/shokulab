"use client"

import { useEffect, useRef } from "react"

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\u3000-\u9fff\u30a0-\u30ff\u3040-\u309f\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    || `heading-${Math.random().toString(36).slice(2, 8)}`
}

function addIdsToHtmlHeadings(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (_match, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim()
    const id = slugify(text)
    if (attrs.includes("id=")) return _match
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
  })
}

const htmlStyles = `
  .blog-html-content h1 { font-size: 26px; font-weight: 900; color: #0D1B26; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.4; letter-spacing: -0.02em; }
  .blog-html-content h2 { font-size: 22px; font-weight: 700; color: #0D1B26; margin-top: 2.25rem; margin-bottom: 0.75rem; line-height: 1.4; letter-spacing: -0.02em; border-bottom: 1px solid #E2EBF0; padding-bottom: 0.5rem; }
  .blog-html-content h3 { font-size: 18px; font-weight: 700; color: #0D1B26; margin-top: 1.75rem; margin-bottom: 0.5rem; line-height: 1.4; }
  .blog-html-content h4 { font-size: 16px; font-weight: 700; color: #0D1B26; margin-top: 1.25rem; margin-bottom: 0.5rem; }
  .blog-html-content p { font-size: 15px; color: #4B5563; line-height: 1.9; margin-bottom: 1.25rem; }
  .blog-html-content ul { list-style: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; font-size: 15px; color: #4B5563; line-height: 1.9; }
  .blog-html-content ol { list-style: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; font-size: 15px; color: #4B5563; line-height: 1.9; }
  .blog-html-content li { margin-bottom: 0.375rem; }
  .blog-html-content blockquote { border-left: 3px solid #00A5D9; background: #F6F9FB; padding: 0.75rem 1rem 0.75rem 1.25rem; margin-bottom: 1.25rem; font-size: 14px; color: #6B7280; font-style: italic; border-radius: 0 0.375rem 0.375rem 0; }
  .blog-html-content a { color: #00A5D9; text-decoration: underline; text-underline-offset: 2px; }
  .blog-html-content a:hover { color: #007AAD; }
  .blog-html-content a.cta-button { display: block; width: 100%; max-width: 480px; margin: 1.5rem auto; padding: 16px 32px; background: #E8631A; color: #fff !important; text-align: center; text-decoration: none !important; font-weight: 700; font-size: 16px; border-radius: 8px; box-shadow: 0 4px 16px rgba(232,99,26,0.3); transition: transform 0.15s, box-shadow 0.15s; }
  .blog-html-content a.cta-button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(232,99,26,0.4); color: #fff !important; }
  .blog-html-content a.cta-button strong { color: #fff !important; font-weight: 700; }
  .blog-html-content strong { font-weight: 700; color: #0D1B26; }
  .blog-html-content code { background: #F0F4F7; color: #C7254E; font-size: 13px; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-family: monospace; }
  .blog-html-content pre { background: #1a2a35; color: #e2e8f0; font-size: 13px; line-height: 1.7; border-radius: 0.5rem; padding: 1.25rem; margin-bottom: 1.25rem; overflow-x: auto; font-family: monospace; }
  .blog-html-content pre code { background: transparent; color: inherit; padding: 0; }
  .blog-html-content table { width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 1.25rem; }
  .blog-html-content thead { background: #003D5C; color: white; }
  .blog-html-content th { padding: 0.625rem 1rem; text-align: left; font-size: 13px; font-weight: 700; }
  .blog-html-content td { padding: 0.625rem 1rem; border-bottom: 1px solid #E2EBF0; color: #4B5563; }
  .blog-html-content hr { border-color: #E2EBF0; margin: 2rem 0; }
  .blog-html-content img { border-radius: 0.5rem; max-width: 100%; height: auto; margin: 1.25rem 0; }
`

/**
 * HTML文字列をサニタイズして表示するコンポーネント。
 * Markdown→HTML変換はserver component側（page.tsx）で行い、
 * このコンポーネントにはHTML文字列を渡す。
 */
export default function MarkdownRenderer({ content }: { content: string }) {
  const withIds = addIdsToHtmlHeadings(content)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // クライアント側でDOMPurifyをdynamic importしてサニタイズ
    let cancelled = false
    import("dompurify").then((mod) => {
      if (cancelled || !ref.current) return
      const DOMPurify = mod.default || mod
      const safeHtml = DOMPurify.sanitize(withIds, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
      })
      ref.current.innerHTML = safeHtml
    })
    return () => { cancelled = true }
  }, [withIds])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: htmlStyles }} />
      <div
        ref={ref}
        className="blog-html-content"
        dangerouslySetInnerHTML={{ __html: withIds }}
      />
    </>
  )
}
