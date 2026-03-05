import KpiProgressBar from "./KpiProgressBar"

interface KpiItem {
  kpi_key: string
  label: string
  target: number
  unit: string
  value: number
}

interface Props {
  phase: string
  phaseLabel: string
  items: KpiItem[]
}

export default function KpiPhaseCard({ phase, phaseLabel, items }: Props) {
  return (
    <div className="bg-white border border-border rounded-md overflow-hidden">
      <div className="bg-secondary text-white px-4 py-2">
        <h3 className="font-bold text-sm">
          {phaseLabel}
          <span className="text-white/60 ml-2 font-normal">{phase.toUpperCase()}</span>
        </h3>
      </div>
      <div className="p-4 space-y-4">
        {items.map((item) => (
          <KpiProgressBar
            key={item.kpi_key}
            label={item.label}
            value={item.value}
            target={item.target}
            unit={item.unit}
          />
        ))}
      </div>
    </div>
  )
}
