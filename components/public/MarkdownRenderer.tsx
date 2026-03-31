"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import DOMPurify from "isomorphic-dompurify"

/**
 * content が純粋なHTML（<h1>, <p> 等で始まる）か判定。
 * HTMLの場合は dangerouslySetInnerHTML で直接レンダリング。
 * Markdownの場合は react-markdown で処理。
 */
function isHtmlContent(content: string): boolean {
  const trimmed = content.trim()
  return trimmed.startsWith("<") && /<\/(p|h[1-6]|div|section|article)>/.test(trimmed)
}

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

function childrenToText(children: React.ReactNode): string {
  if (typeof children === "string") return children
  if (Array.isArray(children)) return children.map(childrenToText).join("")
  if (children && typeof children === "object" && "props" in children) {
    return childrenToText((children as React.ReactElement<{children?: React.ReactNode}>).props.children)
  }
  return String(children ?? "")
}

/**
 * HTML見出しにid属性を自動挿入する（ToC連携用）
 */
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
  .blog-html-content strong { font-weight: 700; color: #0D1B26; }
  .blog-html-content table { width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 1.25rem; }
  .blog-html-content thead { background: #003D5C; color: white; }
  .blog-html-content th { padding: 0.625rem 1rem; text-align: left; font-size: 13px; font-weight: 700; }
  .blog-html-content td { padding: 0.625rem 1rem; border-bottom: 1px solid #E2EBF0; color: #4B5563; }
  .blog-html-content hr { border-color: #E2EBF0; margin: 2rem 0; }
  .blog-html-content img { border-radius: 0.5rem; max-width: 100%; height: auto; margin: 1.25rem 0; }
`

export default function MarkdownRenderer({ content }: { content: string }) {
  // HTML content → dangerouslySetInnerHTML で直接レンダリング
  if (isHtmlContent(content)) {
    // ページヘッダーにタイトルがあるので、body_html内の最初のH1を除去
    let cleanedHtml = content.replace(/^\s*<h1[^>]*>.*?<\/h1>\s*/i, "")
    // ToC連携: h2/h3にid属性を自動付与
    cleanedHtml = addIdsToHtmlHeadings(cleanedHtml)
    const safeHtml = DOMPurify.sanitize(cleanedHtml, { ADD_TAGS: ["iframe"], ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"] })
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: htmlStyles }} />
        <div
          className="blog-html-content"
          dangerouslySetInnerHTML={{ __html: safeHtml }}
        />
      </>
    )
  }

  // Markdown content → react-markdown で処理
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-[26px] font-black text-[#0D1B26] mt-10 mb-4 leading-snug tracking-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => {
          const id = slugify(childrenToText(children))
          return (
            <h2 id={id} className="text-[22px] font-bold text-[#0D1B26] mt-9 mb-3 leading-snug tracking-tight border-b border-[#E2EBF0] pb-2">
              {children}
            </h2>
          )
        },
        h3: ({ children }) => {
          const id = slugify(childrenToText(children))
          return (
            <h3 id={id} className="text-[18px] font-bold text-[#0D1B26] mt-7 mb-2 leading-snug">
              {children}
            </h3>
          )
        },
        h4: ({ children }) => (
          <h4 className="text-[16px] font-bold text-[#0D1B26] mt-5 mb-2">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="text-[15px] text-gray-600 leading-[1.9] mb-5">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-5 space-y-1.5 text-[15px] text-gray-600 leading-[1.9]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-5 space-y-1.5 text-[15px] text-gray-600 leading-[1.9]">
            {children}
          </ol>
        ),
        li: ({ children }) => <li>{children}</li>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-[3px] border-brand-blue bg-[#F6F9FB] pl-5 pr-4 py-3 mb-5 text-[14px] text-gray-500 italic rounded-r-md">
            {children}
          </blockquote>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-brand-blue underline underline-offset-2 hover:text-[#007AAD] transition-colors"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes("language-")
          if (isBlock) {
            return (
              <code className={`${className} block`}>
                {children}
              </code>
            )
          }
          return (
            <code className="bg-[#F0F4F7] text-[#C7254E] text-[13px] px-1.5 py-0.5 rounded font-mono">
              {children}
            </code>
          )
        },
        pre: ({ children }) => (
          <pre className="bg-[#1a2a35] text-[#e2e8f0] text-[13px] leading-[1.7] rounded-lg p-5 mb-5 overflow-x-auto font-mono">
            {children}
          </pre>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-5">
            <table className="w-full border-collapse text-[14px]">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[#003D5C] text-white">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="px-4 py-2.5 text-left text-[13px] font-bold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-2.5 border-b border-[#E2EBF0] text-gray-600">
            {children}
          </td>
        ),
        hr: () => <hr className="border-[#E2EBF0] my-8" />,
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || ""}
            className="rounded-lg max-w-full h-auto my-5"
            loading="lazy"
          />
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-[#0D1B26]">{children}</strong>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
