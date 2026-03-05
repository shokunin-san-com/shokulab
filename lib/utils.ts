export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "JPY",
  }).format(price)
}

export function formatPriceRange(min: number, max: number | null): string {
  if (!max || min === max) return formatPrice(min)
  return `${formatPrice(min)}〜${formatPrice(max)}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
