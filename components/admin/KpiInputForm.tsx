"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const kpiOptions = [
  { phase: "ph1", key: "email_list", label: "メールリスト獲得数" },
  { phase: "ph1", key: "ng_sample", label: "NGレポート サンプル請求数" },
  { phase: "ph1", key: "template_sales", label: "テンプレ販売部数" },
  { phase: "ph1", key: "x_followers", label: "Xフォロワー数" },
  { phase: "ph1", key: "revenue", label: "月次収益" },
  { phase: "ph2", key: "ng_contracts", label: "NGレポート有料契約数" },
  { phase: "ph2", key: "template_sales", label: "テンプレ販売部数" },
  { phase: "ph2", key: "x_followers", label: "Xフォロワー数" },
  { phase: "ph2", key: "blog_pv", label: "ブログ月間PV" },
  { phase: "ph2", key: "revenue", label: "月次収益" },
]

export default function KpiInputForm() {
  const router = useRouter()
  const supabase = createClient()

  const [phase, setPhase] = useState("ph1")
  const [kpiKey, setKpiKey] = useState("email_list")
  const [value, setValue] = useState("")
  const [recordedAt, setRecordedAt] = useState(
    new Date().toISOString().slice(0, 7) + "-01"
  )
  const [note, setNote] = useState("")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  const filteredOptions = kpiOptions.filter((o) => o.phase === phase)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setMessage("")

    const { error } = await supabase.from("kpi_records").upsert(
      {
        phase,
        kpi_key: kpiKey,
        value: Number(value),
        recorded_at: recordedAt,
        note: note || null,
      },
      { onConflict: "phase,kpi_key,recorded_at" }
    )

    if (error) {
      setMessage(`エラー: ${error.message}`)
    } else {
      setMessage("保存しました")
      setValue("")
      setNote("")
    }

    setSaving(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-md p-6">
      <h3 className="font-bold text-primary mb-4">KPI実績入力</h3>
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">フェーズ</label>
          <select
            value={phase}
            onChange={(e) => {
              setPhase(e.target.value)
              const first = kpiOptions.find((o) => o.phase === e.target.value)
              if (first) setKpiKey(first.key)
            }}
            className="input"
          >
            <option value="ph1">Phase 1</option>
            <option value="ph2">Phase 2</option>
            <option value="ph3">Phase 3</option>
            <option value="ph4">Phase 4</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">KPI項目</label>
          <select
            value={kpiKey}
            onChange={(e) => setKpiKey(e.target.value)}
            className="input"
          >
            {filteredOptions.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">実績値</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">記録月</label>
          <input
            type="date"
            value={recordedAt}
            onChange={(e) => setRecordedAt(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">メモ</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="input"
            placeholder="任意"
          />
        </div>
      </div>

      {message && (
        <p className={`text-sm mb-4 ${message.startsWith("エラー") ? "text-red-600" : "text-accent"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-primary text-white px-6 py-2 rounded font-bold text-sm hover:opacity-90 transition disabled:opacity-50"
      >
        {saving ? "保存中..." : "保存"}
      </button>
    </form>
  )
}
