"use client"

import { useState } from "react"

export default function NgReportForm() {
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    position: "",
    product_category: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/ng-report/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("送信に失敗しました")
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white border border-border rounded-md p-8 text-center">
        <h2 className="text-xl font-bold text-primary mb-2">送信完了</h2>
        <p className="text-subtext">
          サンプル請求を受け付けました。
          <br />
          担当者より折り返しご連絡いたします。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-md p-8 space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          会社名 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          required
          className="input"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">役職</label>
          <input
            type="text"
            value={form.position}
            onChange={(e) => update("position", e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          メールアドレス <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">興味のある商品カテゴリ</label>
        <select
          value={form.product_category}
          onChange={(e) => update("product_category", e.target.value)}
          className="input"
        >
          <option value="">選択してください</option>
          <option value="template">業務テンプレート</option>
          <option value="ai">AI活用ツール</option>
          <option value="guide">ガイド・教材</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">メッセージ</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          className="input"
          placeholder="ご質問やご要望があればお書きください"
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">送信に失敗しました。もう一度お試しください。</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-accent text-white py-3 rounded font-bold hover:opacity-90 transition disabled:opacity-50"
      >
        {status === "loading" ? "送信中..." : "サンプルを請求する（無料）"}
      </button>
    </form>
  )
}
