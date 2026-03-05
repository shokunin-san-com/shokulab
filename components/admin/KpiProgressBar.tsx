interface Props {
  label: string
  value: number
  target: number
  unit: string
}

export default function KpiProgressBar({ label, value, target, unit }: Props) {
  const percentage = target > 0 ? Math.min((value / target) * 100, 100) : 0

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-text">{label}</span>
        <span className="text-sm text-subtext">
          <span className="font-bold text-primary">{value.toLocaleString()}</span>
          <span className="text-muted"> / {target.toLocaleString()}{unit}</span>
        </span>
      </div>
      <div className="h-2 bg-surface rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor:
              percentage >= 100 ? "#52b788" : percentage >= 50 ? "#2d6e6e" : "#7a9aaa",
          }}
        />
      </div>
    </div>
  )
}
