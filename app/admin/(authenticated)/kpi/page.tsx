import { createClient } from "@/lib/supabase/server"
import KpiPhaseCard from "@/components/admin/KpiPhaseCard"
import KpiInputForm from "@/components/admin/KpiInputForm"

export const dynamic = "force-dynamic"

// CLAUDE.mdのKPI定義
const kpiDefinitions = [
  {
    phase: "ph1",
    phaseLabel: "基盤構築",
    items: [
      { kpi_key: "email_list", label: "メールリスト獲得数", target: 100, unit: "件" },
      { kpi_key: "ng_sample", label: "NGレポート サンプル請求数", target: 30, unit: "件" },
      { kpi_key: "template_sales", label: "テンプレ販売部数", target: 50, unit: "部/月" },
      { kpi_key: "x_followers", label: "Xフォロワー数", target: 500, unit: "人" },
      { kpi_key: "revenue", label: "月次収益", target: 200000, unit: "円" },
    ],
  },
  {
    phase: "ph2",
    phaseLabel: "収益拡大",
    items: [
      { kpi_key: "ng_contracts", label: "NGレポート有料契約数", target: 5, unit: "社" },
      { kpi_key: "template_sales", label: "テンプレ販売部数", target: 100, unit: "部/月" },
      { kpi_key: "x_followers", label: "Xフォロワー数", target: 2000, unit: "人" },
      { kpi_key: "blog_pv", label: "ブログ月間PV", target: 3000, unit: "PV" },
      { kpi_key: "revenue", label: "月次収益", target: 500000, unit: "円" },
    ],
  },
  {
    phase: "ph3",
    phaseLabel: "事業拡張",
    items: [
      { kpi_key: "ng_contracts", label: "NGレポート有料契約数", target: 10, unit: "社" },
      { kpi_key: "ma_sales", label: "M&A教材販売部数", target: 3, unit: "部/月" },
      { kpi_key: "x_followers", label: "Xフォロワー数", target: 5000, unit: "人" },
      { kpi_key: "revenue", label: "月次収益", target: 850000, unit: "円" },
    ],
  },
  {
    phase: "ph4",
    phaseLabel: "メンバーズ・安定化",
    items: [
      { kpi_key: "ng_contracts", label: "NGレポート継続契約数", target: 10, unit: "社" },
      { kpi_key: "members", label: "メンバーズ会員数", target: 100, unit: "名" },
      { kpi_key: "revenue", label: "月次収益（MRR）", target: 850000, unit: "円" },
    ],
  },
]

export default async function AdminKpiPage() {
  const supabase = createClient()

  // 各フェーズの最新KPIデータを取得
  const { data: records } = await supabase
    .from("kpi_records")
    .select("*")
    .order("recorded_at", { ascending: false })

  // 最新の値をマッピング（phase+kpi_keyで一番新しいもの）
  const latestValues: Record<string, number> = {}
  if (records) {
    for (const r of records) {
      const key = `${r.phase}:${r.kpi_key}`
      if (!(key in latestValues)) {
        latestValues[key] = Number(r.value) || 0
      }
    }
  }

  const phasesWithData = kpiDefinitions.map((def) => ({
    ...def,
    items: def.items.map((item) => ({
      ...item,
      value: latestValues[`${def.phase}:${item.kpi_key}`] || 0,
    })),
  }))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">KPI管理</h1>

      <KpiInputForm />

      <div className="grid lg:grid-cols-2 gap-6">
        {phasesWithData.map((p) => (
          <KpiPhaseCard
            key={p.phase}
            phase={p.phase}
            phaseLabel={p.phaseLabel}
            items={p.items}
          />
        ))}
      </div>
    </div>
  )
}
