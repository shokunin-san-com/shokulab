"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Loader2 } from "lucide-react"

export default function GenerateButton() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const router = useRouter()

  async function handleGenerate() {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/admin/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })

      const data = await res.json()

      if (data.success) {
        setResult(`${data.title}（${data.wordCount.toLocaleString()}字）`)
        router.refresh()
      } else if (data.error === "all topics generated") {
        setResult("全トピック生成済み")
      } else {
        setResult(`エラー: ${data.error}`)
      }
    } catch {
      setResult("通信エラー")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
        {loading ? "生成中..." : "AI記事生成"}
      </button>
      {result && (
        <span className="text-xs text-subtext max-w-xs truncate">{result}</span>
      )}
    </div>
  )
}
