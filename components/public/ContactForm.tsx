"use client"

import { useState } from "react"

type FormState = {
  name: string
  email: string
  company: string
  category: string
  message: string
  agreed: boolean
}

const INITIAL: FormState = {
  name: "",
  email: "",
  company: "",
  category: "",
  message: "",
  agreed: false,
}

const CATEGORIES = [
  "記事の内容について",
  "商品・サービスについて",
  "広告・提携について",
  "取材・メディア掲載依頼",
  "その他",
]

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState<string>("")

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || "送信に失敗しました")
      }
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "送信に失敗しました")
    }
  }

  if (status === "success") {
    return (
      <div className="bg-white rounded-xl p-10 text-center border border-[#e6e8e9]">
        <div className="w-14 h-14 bg-brand-blue-pale rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8L6.5 11.5L13 4.5"
              stroke="#0099CC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#222] mb-2">送信が完了しました</h3>
        <p className="text-[#505050] text-sm leading-relaxed">
          お問い合わせありがとうございます。
          <br />
          原則3営業日以内にご登録のメールアドレス宛にご返信いたします。
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          お名前 <span className="text-xs text-brand-blue font-normal ml-1">必須</span>
        </label>
        <input
          type="text"
          required
          maxLength={100}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue bg-white transition-colors"
          placeholder="山田 太郎"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          メールアドレス <span className="text-xs text-brand-blue font-normal ml-1">必須</span>
        </label>
        <input
          type="email"
          required
          maxLength={254}
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue bg-white transition-colors"
          placeholder="info@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          会社名 <span className="text-xs text-[#707070] font-normal ml-1">任意</span>
        </label>
        <input
          type="text"
          maxLength={200}
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue bg-white transition-colors"
          placeholder="株式会社○○"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          お問い合わせの種別 <span className="text-xs text-brand-blue font-normal ml-1">必須</span>
        </label>
        <select
          required
          value={form.category}
          onChange={(e) => update("category", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue bg-white transition-colors"
        >
          <option value="">選択してください</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#222] mb-1.5">
          お問い合わせ内容 <span className="text-xs text-brand-blue font-normal ml-1">必須</span>
        </label>
        <textarea
          required
          rows={6}
          maxLength={2000}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full border border-[#e6e8e9] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue bg-white transition-colors resize-none"
          placeholder="お問い合わせ内容を具体的にご記入ください（2000文字以内）"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer text-sm text-[#505050] leading-relaxed">
        <input
          type="checkbox"
          required
          checked={form.agreed}
          onChange={(e) => update("agreed", e.target.checked)}
          className="mt-1 w-4 h-4 accent-brand-blue"
        />
        <span>
          <a href="/privacy" target="_blank" className="text-brand-blue hover:underline">
            プライバシーポリシー
          </a>
          に同意したうえで送信します。
        </span>
      </label>

      <div className="text-xs text-[#707070] leading-relaxed">
        <p>通信はTLSで暗号化され、安全に送信されます。</p>
        <p>ご返信まで3営業日程度お時間をいただく場合がございます。</p>
      </div>

      <button
        type="submit"
        disabled={status === "loading" || !form.agreed}
        className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-bold py-4 rounded-lg text-[15px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? "送信中..." : "送信する"}
      </button>

      {status === "error" && (
        <p className="text-red-500 text-sm text-center">{errorMsg || "送信に失敗しました。もう一度お試しください。"}</p>
      )}
    </form>
  )
}
