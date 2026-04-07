export interface TocItem {
  id: string
  text: string
  level: number
}

function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^a-z0-9\u3000-\u9fff\u30a0-\u30ff\u3040-\u309f\s-]/g, "")
      .replace(/[\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || `heading-${Math.random().toString(36).slice(2, 8)}`
  )
}

export function extractHeadings(content: string): TocItem[] {
  const headings: TocItem[] = []
  const htmlRegex = /<h([23])[^>]*>(.*?)<\/h\1>/gi
  let match
  while ((match = htmlRegex.exec(content)) !== null) {
    const level = parseInt(match[1])
    const text = match[2].replace(/<[^>]+>/g, "").trim()
    if (text) {
      headings.push({ id: slugify(text), text, level })
    }
  }

  if (headings.length === 0) {
    const mdRegex = /^(#{2,3})\s+(.+)$/gm
    while ((match = mdRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      if (text) {
        headings.push({ id: slugify(text), text, level })
      }
    }
  }

  return headings
}

export function estimateReadingTime(content: string): number {
  const text = content.replace(/<[^>]+>/g, "").replace(/[#*_~`]/g, "").trim()
  return Math.max(1, Math.ceil(text.length / 400))
}
