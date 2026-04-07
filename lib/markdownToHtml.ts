/**
 * 軽量 Markdown → HTML 変換（依存ゼロ・サーバー専用）
 * Gemini が生成するブログ記事の出力パターンに対応:
 * ## h2, ### h3, **bold**, `code`, - list, | table |, 段落
 */
export function markdownToHtml(md: string): string {
  const lines = md.split("\n")
  const out: string[] = []
  let inList = false
  let inTable = false
  let inCode = false
  let codeBuf: string[] = []

  const flush = () => {
    if (inList) { out.push("</ul>"); inList = false }
    if (inTable) { out.push("</tbody></table>"); inTable = false }
  }

  const inline = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // コードブロック
    if (line.startsWith("```")) {
      if (inCode) {
        flush()
        out.push(`<pre><code>${codeBuf.map(l => l.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")).join("\n")}</code></pre>`)
        codeBuf = []
        inCode = false
      } else {
        flush()
        inCode = true
      }
      continue
    }
    if (inCode) { codeBuf.push(line); continue }

    // 見出し
    if (line.startsWith("### ")) { flush(); out.push(`<h3>${inline(line.slice(4))}</h3>`); continue }
    if (line.startsWith("## ")) { flush(); out.push(`<h2>${inline(line.slice(3))}</h2>`); continue }
    if (line.startsWith("# ")) { flush(); out.push(`<h1>${inline(line.slice(2))}</h1>`); continue }

    // 水平線
    if (/^[-*_]{3,}$/.test(line.trim())) { flush(); out.push("<hr>"); continue }

    // テーブル
    if (line.includes("|") && line.trim().startsWith("|")) {
      const cells = line.split("|").slice(1, -1).map(c => c.trim())
      if (!inTable) {
        flush()
        // 次の行が区切り行か確認
        const next = lines[i + 1] || ""
        if (next.includes("|") && /[-|: ]+/.test(next)) {
          out.push('<table><thead><tr>')
          cells.forEach(c => out.push(`<th>${inline(c)}</th>`))
          out.push("</tr></thead><tbody>")
          inTable = true
          i++ // 区切り行をスキップ
        } else {
          out.push(`<p>${inline(line)}</p>`)
        }
      } else {
        out.push("<tr>")
        cells.forEach(c => out.push(`<td>${inline(c)}</td>`))
        out.push("</tr>")
      }
      continue
    }

    // リスト
    const listMatch = line.match(/^[-*+] (.+)/)
    if (listMatch) {
      if (!inList) { if (inTable) { out.push("</tbody></table>"); inTable = false }; out.push("<ul>"); inList = true }
      out.push(`<li>${inline(listMatch[1])}</li>`)
      continue
    }

    // 番号付きリスト
    const olMatch = line.match(/^\d+\. (.+)/)
    if (olMatch) {
      if (inList) { out.push("</ul>"); inList = false }
      if (inTable) { out.push("</tbody></table>"); inTable = false }
      out.push(`<li>${inline(olMatch[1])}</li>`)
      continue
    }

    // 空行
    if (line.trim() === "") { flush(); continue }

    // 引用
    if (line.startsWith("> ")) { flush(); out.push(`<blockquote><p>${inline(line.slice(2))}</p></blockquote>`); continue }

    // 段落
    flush()
    out.push(`<p>${inline(line)}</p>`)
  }

  flush()
  return out.join("\n")
}
