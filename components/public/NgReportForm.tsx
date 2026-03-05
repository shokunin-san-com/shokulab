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
        <h2 className="text-xl font-bold text-primary mb-2">請求を受け付けました</h2>
        <p className="text-subtext">
          創刊号（Vol.0）のサンプルPDFをメールでお送りいたします。
          <br />
          通常1〜2営業日以内にお届けします。
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
          placeholder="例：〇〇建材株式会社"
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
            placeholder="例：商品開発部 部長"
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
        <label className="block text-sm font-medium mb-1">貴社の業種</label>
        <select
          value={form.product_category}
          onChange={(e) => update("product_category", e.target.value)}
          className="input"
        >
          <option value="">選択してください</option>
          <option value="building_materials">建材メーカー</option>
          <option value="tools">工具・ツールメーカー</option>
          <option value="workwear">ワークウェアメーカー</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">ご質問・ご要望</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={3}
          className="input"
          placeholder="特定のカテゴリや製品に関する情報をご希望の場合はお書きください"
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
        {status === "loading" ? "送信中..." : "無料サンプルを請求する"}
      </button>
    </form>
  )
}
