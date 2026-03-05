import { createClient } from "@/lib/supabase/server"
import { formatDate } from "@/lib/utils"
import type { Lead } from "@/types"
import LeadStatusSelect from "@/components/admin/LeadStatusSelect"

export const dynamic = "force-dynamic"

export default async function AdminLeadsPage() {
  const supabase = createClient()

  const [{ data: leads }, { data: ngRequests }] = await Promise.all([
    supabase.from("leads").select("*").order("created_at", { ascending: false }),
    supabase
      .from("ng_report_requests")
      .select("*")
      .order("created_at", { ascending: false }),
  ])

  return (
    <div className="space-y-8">
      {/* NGレポート サンプル請求 */}
      <section>
        <h1 className="text-2xl font-bold text-primary mb-6">職人リアルNGレポート サンプル請求</h1>
        <div className="bg-white border border-border rounded-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-white text-left">
                <th className="px-4 py-3 font-medium">会社名</th>
                <th className="px-4 py-3 font-medium">担当者</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">メール</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">カテゴリ</th>
                <th className="px-4 py-3 font-medium">状態</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">請求日</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ngRequests?.map((req) => (
                <tr key={req.id} className="hover:bg-surface transition">
                  <td className="px-4 py-3 font-medium">{req.company}</td>
                  <td className="px-4 py-3">
                    {req.name}
                    {req.position && (
                      <span className="text-subtext text-xs ml-1">({req.position})</span>
                    )}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-subtext">{req.email}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-subtext">
                    {req.product_category || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <NgStatusBadge status={req.status} />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-subtext">
                    {formatDate(req.created_at)}
                  </td>
                </tr>
              ))}
              {(!ngRequests || ngRequests.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-subtext">
                    サンプル請求はまだありません。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* リード一覧 */}
      <section>
        <h2 className="text-2xl font-bold text-primary mb-6">リード管理</h2>
        <div className="bg-white border border-border rounded-md overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-white text-left">
                <th className="px-4 py-3 font-medium">メール</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">名前</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">会社</th>
                <th className="px-4 py-3 font-medium">ソース</th>
                <th className="px-4 py-3 font-medium">状態</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">登録日</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {(leads as Lead[] | null)?.map((lead) => (
                <tr key={lead.id} className="hover:bg-surface transition">
                  <td className="px-4 py-3">{lead.email}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-subtext">
                    {lead.name || "-"}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-subtext">
                    {lead.company || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <SourceBadge source={lead.source} />
                  </td>
                  <td className="px-4 py-3">
                    <LeadStatusSelect id={lead.id} currentStatus={lead.status} />
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-subtext">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))}
              {(!leads || leads.length === 0) && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-subtext">
                    リードがまだありません。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function NgStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-50 text-yellow-700",
    sent: "bg-accent/10 text-accent",
    following: "bg-blue-50 text-blue-700",
  }
  const labels: Record<string, string> = {
    pending: "未対応",
    sent: "送付済み",
    following: "フォロー中",
  }
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${styles[status] || "bg-gray-100 text-subtext"}`}>
      {labels[status] || status}
    </span>
  )
}

function SourceBadge({ source }: { source: string | null }) {
  const labels: Record<string, string> = {
    ng_report_sample: "職人リアルNGレポート",
    line: "LINE",
    blog: "ブログ",
    x: "X",
    direct: "直接",
  }
  return (
    <span className="text-xs text-subtext">
      {source ? labels[source] || source : "-"}
    </span>
  )
}
