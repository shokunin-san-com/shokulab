import { Package, FileText, Users, TrendingUp, ShoppingCart, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { formatPrice, formatDate } from "@/lib/utils"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = createClient()

  const [
    { count: productCount },
    { count: blogCount },
    { count: leadCount },
    { data: recentPurchases },
    { count: purchaseCount },
    { data: recentLeads },
    { count: ngRequestCount },
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("purchases").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("purchases").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("ng_report_requests").select("*", { count: "exact", head: true }),
  ])

  // 今月の売上
  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const { data: monthlyPurchases } = await supabase
    .from("purchases")
    .select("amount")
    .eq("status", "paid")
    .gte("created_at", firstOfMonth)

  const monthlyRevenue = monthlyPurchases?.reduce((sum, p) => sum + (p.amount || 0), 0) ?? 0

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">ダッシュボード</h1>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package} label="商品数" value={String(productCount ?? 0)} />
        <StatCard icon={FileText} label="公開記事数" value={String(blogCount ?? 0)} />
        <StatCard icon={Users} label="リード数" value={String(leadCount ?? 0)} />
        <StatCard icon={TrendingUp} label="今月の売上" value={formatPrice(monthlyRevenue)} />
      </div>

      {/* Sub stats */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <StatCard icon={Mail} label="NGレポート サンプル請求数" value={String(ngRequestCount ?? 0)} />
        <StatCard icon={ShoppingCart} label="累計購入数" value={String(purchaseCount ?? 0)} />
      </div>

      {/* Recent activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent purchases */}
        <div className="bg-white border border-border rounded-md">
          <div className="bg-secondary text-white px-4 py-2 rounded-t-md">
            <h3 className="font-bold text-sm">最近の購入</h3>
          </div>
          <div className="p-4">
            {recentPurchases && recentPurchases.length > 0 ? (
              <ul className="space-y-3">
                {recentPurchases.map((p) => (
                  <li key={p.id} className="flex justify-between items-center text-sm">
                    <span className="text-subtext">{p.customer_email || "不明"}</span>
                    <span className="font-bold text-primary">
                      {p.amount ? formatPrice(p.amount) : "-"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-subtext">購入履歴はまだありません。</p>
            )}
          </div>
        </div>

        {/* Recent leads */}
        <div className="bg-white border border-border rounded-md">
          <div className="bg-secondary text-white px-4 py-2 rounded-t-md">
            <h3 className="font-bold text-sm">最近のリード</h3>
          </div>
          <div className="p-4">
            {recentLeads && recentLeads.length > 0 ? (
              <ul className="space-y-3">
                {recentLeads.map((l) => (
                  <li key={l.id} className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-text">{l.email}</span>
                      {l.source && (
                        <span className="text-xs text-muted ml-2">{l.source}</span>
                      )}
                    </div>
                    <span className="text-xs text-subtext">{formatDate(l.created_at)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-subtext">リードはまだありません。</p>
            )}
            <Link
              href="/admin/leads"
              className="block text-center text-sm text-secondary hover:underline mt-4"
            >
              すべて見る →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="bg-white border border-border rounded-md p-4">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-secondary" />
        <span className="text-sm text-subtext">{label}</span>
      </div>
      <p className="text-2xl font-bold text-primary">{value}</p>
    </div>
  )
}
