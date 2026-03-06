"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-[26px] font-black text-[#0D1B26] mt-10 mb-4 leading-snug tracking-tight">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-[22px] font-bold text-[#0D1B26] mt-9 mb-3 leading-snug tracking-tight border-b border-[#E2EBF0] pb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-[18px] font-bold text-[#0D1B26] mt-7 mb-2 leading-snug">
            {children}
          </h3>
        ),
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
