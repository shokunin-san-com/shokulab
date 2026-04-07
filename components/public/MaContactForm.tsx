"use client"

import { useState } from "react"

export default function MaContactForm() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
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
      const res = await fetch("/api/ma-advisory/contact", {
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
      <div className="bg-white rounded-xl p-10 text-center border border-[#e6e8e9]">
        <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
            <path d="M3 8L6.5 11.5L13 4.5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#222] mb-2">送信が完了しました</h3>
        <p className="text-[#505050] text-sm leading-relaxed">
          お問い合わせありがとうございます。
          <br />
          原則24時間以内にご返信いたします。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          お名前 <span className="text-xs text-amber-600 font-normal ml-1">必須</span>
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-white transition-colors"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          会社名 <span className="text-xs text-[#707070] font-normal ml-1">任意</span>
        </label>
        <input
          type="text"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-white transition-colors"
          placeholder="株式会社○○"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          メールアドレス <span className="text-xs text-amber-600 font-normal ml-1">必須</span>
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-white transition-colors"
          placeholder="info@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          電話番号 <span className="text-xs text-[#707070] font-normal ml-1">任意</span>
        </label>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-white transition-colors"
          placeholder="03-0000-0000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          ご相談メモ <span className="text-xs text-[#707070] font-normal ml-1">任意</span>
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 bg-white transition-colors resize-none"
          placeholder="現在の状況やご質問など、お気軽にご記入ください"
        />
      </div>

      <div className="text-xs text-[#707070] leading-relaxed">
        <p>通信はTLSで暗号化され、安全に送信されます。</p>
        <p>受信後の情報管理はプライバシーポリシーに基づき適切に行います。</p>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold py-4 rounded-lg text-[15px] transition-all disabled:opacity-60"
      >
        {status === "loading" ? "送信中..." : "送信する"}
      </button>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">送信に失敗しました。もう一度お試しください。</p>
      )}
    </form>
  )
}
