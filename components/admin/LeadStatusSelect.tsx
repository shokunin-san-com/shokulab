"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const statuses = [
  { value: "new", label: "新規" },
  { value: "contacted", label: "連絡済み" },
  { value: "contracted", label: "契約済み" },
  { value: "lost", label: "失注" },
]

export default function LeadStatusSelect({
  id,
  currentStatus,
}: {
  id: string
  currentStatus: string
}) {
  const supabase = createClient()
  const router = useRouter()

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { error } = await supabase
      .from("leads")
      .update({ status: e.target.value })
      .eq("id", id)
    if (error) {
      console.error("Failed to update lead status:", error)
      alert("ステータスの更新に失敗しました。")
      return
    }
    router.refresh()
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className="text-xs border border-border rounded px-2 py-1 bg-white"
    >
      {statuses.map((s) => (
        <option key={s.value} value={s.value}>
          {s.label}
        </option>
      ))}
    </select>
  )
}
