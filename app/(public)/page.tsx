import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import SiteNav from "@/components/public/SiteNav"
import SiteFooter from "@/components/public/SiteFooter"
import type { BlogPost } from "@/types"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, title, slug, category, created_at, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3)

  const categoryLabels: Record<string, string> = {
    craftsman: "業務効率化",
    owner: "経営者向け",
    maker: "AI活用",
    ma: "建設業M&A",
  }

  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* ── Hero ── */}
      <section
        className="pt-40 pb-24 text-center"
        style={{ background: "linear-gradient(180deg, #EDF6FB 0%, #fff 100%)" }}
      >
        <div className="max-w-[760px] mx-auto px-8">
          {/* Pill badge */}
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[2px] text-brand-blue bg-brand-blue-pale border border-brand-blue-mid px-3.5 py-1.5 rounded-full mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block" />
            建設業界の「現場の本音」を、ビジネスに活かす
          </span>

          <h1 className="text-[56px] font-black leading-[1.15] tracking-tight mb-6 text-[#0D1B26] font-dm">
            職人さんの声が、
            <br />
            <span className="text-brand-blue">ビジネス</span>を変える。
          </h1>

          <p className="text-[17px] leading-[1.9] text-gray-500 mb-12 max-w-[520px] mx-auto">
            20年間・累計55回の職人アンケートで積み上げた知見を
            <br />
            職人向け業務ツールと、メーカー向け調査レポートで提供します。
          </p>

          <div className="flex gap-3 justify-center">
            <Link
              href="/products"
              className="bg-brand-orange text-white px-9 py-3.5 rounded-md text-[15px] font-bold hover:bg-[#E09200] hover:-translate-y-0.5 transition-all"
            >
              職人向け商品を見る
            </Link>
            <Link
              href="/ng-report"
              className="text-brand-blue border-[1.5px] border-brand-blue px-9 py-3.5 rounded-md text-[15px] font-bold hover:bg-brand-blue-pale hover:-translate-y-0.5 transition-all"
            >
              NGレポートを見る（メーカー向け）
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2ルート入口 ── */}
      <section className="bg-[#F6F9FB] py-[72px] px-16">
        <div className="max-w-[1040px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[11px] font-bold tracking-[2px] text-brand-blue uppercase mb-3">
              SERVICES
            </span>
            <h2 className="text-[30px] font-black tracking-tight">
              2つの入口から、始めてください。
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {/* 職人向けカード */}
            <div className="bg-white border border-[#E2EBF0] rounded-[10px] p-11 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <span className="inline-flex items-center gap-1.5 bg-brand-blue-pale text-brand-blue text-[11px] font-bold tracking-[1.5px] px-3 py-1 rounded border border-brand-blue-mid mb-6">
                職人・建設業の方へ
              </span>
              <h3 className="text-2xl font-black mb-3.5 leading-snug tracking-tight">
                現場で使える業務ツールを、すぐに。
              </h3>
              <p className="text-sm text-gray-500 leading-[1.9] mb-7">
                見積書・請求書・契約書などのテンプレートや、AI活用ガイド、建設業M&A教材。現場目線で作った実用コンテンツをすぐにダウンロードできます。
              </p>
              <div className="mb-8">
                {[
                  "業務テンプレート（見積書・請求書・契約書）",
                  "AI活用ガイド（ChatGPT実践編）",
                  "建設業M&A教材",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-gray-500 leading-relaxed py-2.5 border-b border-[#E2EBF0] last:border-b-0"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <circle cx="8" cy="8" r="8" fill="#0099CC" opacity="0.15" />
                      <path
                        d="M4.5 8L6.8 10.5L11.5 5.5"
                        stroke="#0099CC"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href="/products"
                className="block w-full text-center text-brand-blue border-[1.5px] border-brand-blue py-3.5 rounded-md text-sm font-bold hover:bg-brand-blue-pale hover:-translate-y-0.5 transition-all"
              >
                商品一覧を見る →
              </Link>
            </div>

            {/* メーカー向けカード */}
            <div
              className="rounded-[10px] p-11 border border-[#004D70] hover:shadow-lg hover:-translate-y-0.5 transition-all"
              style={{
                background: "linear-gradient(145deg, #003D5C 0%, #005A85 100%)",
              }}
            >
              <span className="inline-flex items-center gap-1.5 bg-[rgba(245,160,0,0.15)] text-brand-orange text-[11px] font-bold tracking-[1.5px] px-3 py-1 rounded border border-[rgba(245,160,0,0.3)] mb-6">
                建材・工具メーカーの方へ
              </span>
              <h3 className="text-2xl font-black mb-3.5 leading-snug tracking-tight text-white">
                「選ばれない理由」が、
                <br />
                毎月届く。
              </h3>
              <p className="text-sm text-white/65 leading-[1.9] mb-7">
                職人が製品を「選ばない瞬間」を可視化する月刊レポート。3年間・累計55回の独自アンケートから、現場の本音を編集してお届けします。
              </p>
              <div className="mb-8">
                {[
                  "毎月25日配信・PDF形式",
                  "職人さんドットコムが調査・編集",
                  "単発50,000円〜、月額39,800円〜",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 text-sm text-white/65 leading-relaxed py-2.5 border-b border-white/10 last:border-b-0"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 flex-shrink-0"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="8"
                        fill="rgba(245,160,0,0.2)"
                      />
                      <path
                        d="M4.5 8L6.8 10.5L11.5 5.5"
                        stroke="#F5A000"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href="/ng-report#sample"
                className="block w-full text-center bg-brand-orange text-white py-3.5 rounded-md text-sm font-bold hover:bg-[#E09200] hover:-translate-y-0.5 transition-all"
              >
                無料サンプルを請求する →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 実績 ── */}
      <section className="bg-white py-20 px-16 border-t border-[#E2EBF0]">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex items-center gap-[72px]">
            <div className="flex-none w-[340px]">
              <span className="inline-block text-[11px] font-bold tracking-[2px] text-brand-blue uppercase mb-3">
                TRACK RECORD
              </span>
              <h2 className="text-[28px] font-black leading-snug tracking-tight">
                職人さんの本音を、
                <br />
                誰よりも知っている。
              </h2>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-px bg-[#E2EBF0] rounded-[10px] overflow-hidden">
              {[
                { num: "20", unit: "年", label: "職人ポータルサイト運営" },
                { num: "55", unit: "回", label: "職人アンケート累計実施" },
                { num: "3", unit: "年間", label: "継続調査" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-white py-9 px-7 text-center"
                >
                  <div className="mb-2">
                    <span className="text-[56px] font-black text-brand-blue leading-none tracking-tight font-dm">
                      {s.num}
                    </span>
                    <span className="text-xl font-bold text-brand-blue ml-1 font-dm">
                      {s.unit}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-500 leading-relaxed">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── NGレポート詳細 ── */}
      <section className="bg-[#F6F9FB] py-20 px-16 border-t border-[#E2EBF0]">
        <div className="max-w-[1040px] mx-auto flex items-start gap-[72px]">
          {/* Left */}
          <div className="flex-1">
            <span className="inline-block text-[11px] font-bold tracking-[2px] text-brand-blue uppercase mb-3">
              FOR MANUFACTURERS
            </span>
            <h2 className="text-[30px] font-black mb-5 leading-[1.3] tracking-tight">
              「なんとなく」の100人より、
              <br />
              1人のリアルなNGが製品を変える。
            </h2>
            <p className="text-[15px] text-gray-500 leading-[1.9] mb-8">
              従来の満足度調査では見えない「購買を決める瞬間の本音」を、職人コミュニティへの独自調査で収集。第三者視点で編集し、商品開発・営業・マーケティングにすぐ使える形でお届けします。
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-9">
              {[
                "商品開発のヒントに",
                "営業トーク改善に",
                "カタログ・Web表現改善に",
                "部門間の共通言語化に",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#E2EBF0] rounded-md px-4 py-3 text-[13px] text-gray-500 font-medium flex items-center gap-2"
                >
                  <span className="text-brand-orange font-black text-xs">
                    ◆
                  </span>
                  {item}
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Link
                href="/ng-report#sample"
                className="bg-brand-orange text-white px-7 py-3.5 rounded-md text-sm font-bold hover:bg-[#E09200] hover:-translate-y-0.5 transition-all"
              >
                無料サンプルを請求する
              </Link>
              <Link
                href="/ng-report"
                className="text-brand-blue border-[1.5px] border-brand-blue px-7 py-3.5 rounded-md text-sm font-bold hover:bg-brand-blue-pale hover:-translate-y-0.5 transition-all"
              >
                詳しく見る
              </Link>
            </div>
          </div>

          {/* Right — Sample card */}
          <div className="flex-none w-[400px] bg-white border border-[#E2EBF0] rounded-xl p-9 shadow-[0_4px_24px_rgba(0,80,120,0.08)]">
            <div className="flex justify-between items-center mb-6 pb-5 border-b border-[#E2EBF0]">
              <div>
                <p className="text-[11px] text-[#8EA4B4] tracking-[1px] mb-1">
                  SAMPLE REPORT
                </p>
                <p className="text-[15px] font-bold text-[#0D1B26]">
                  カタログで信用を失う表現の共通点
                </p>
              </div>
              <span className="bg-brand-blue-pale text-brand-blue text-[10px] font-bold px-2 py-1 rounded ml-3 whitespace-nowrap">
                Vol.42
              </span>
            </div>

            {/* VOICE */}
            <div className="bg-[#F6F9FB] rounded-lg px-5 py-4.5 mb-4 border-l-[3px] border-brand-orange">
              <p className="text-[10px] text-brand-orange font-bold tracking-[1.5px] mb-2.5">
                VOICE
              </p>
              <p className="text-[13px] text-gray-500 leading-[1.8] italic">
                &ldquo;「誰でもプロの仕上がり」って書かれると、俺たちの技術を軽視されてる気がして使う気失せるわ。&rdquo;
              </p>
            </div>

            {/* IMPROVEMENT */}
            <div className="bg-brand-blue-pale rounded-lg px-5 py-4.5 border-l-[3px] border-brand-blue">
              <p className="text-[10px] text-brand-blue font-bold tracking-[1.5px] mb-2.5">
                IMPROVEMENT
              </p>
              <p className="text-[13px] text-gray-500 leading-[1.7]">
                抽象的な形容詞を排除し、数値的根拠と職人の技術への敬意を示す表現へ。具体的な改善チェックリスト付き。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ブログ最新記事 ── */}
      <section className="bg-white py-20 px-16 border-t border-[#E2EBF0]">
        <div className="max-w-[1040px] mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[2px] text-brand-blue uppercase mb-3">
                LATEST POSTS
              </span>
              <h2 className="text-[28px] font-black tracking-tight">
                最新記事
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-brand-blue text-[13px] font-bold hover:underline"
            >
              記事一覧を見る →
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {posts && posts.length > 0 ? (
              (posts as BlogPost[]).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-[#E2EBF0] rounded-[10px] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  {/* Thumbnail placeholder */}
                  <div
                    className="h-[120px] flex items-center justify-center border-b border-[#E2EBF0]"
                    style={{
                      background:
                        "linear-gradient(135deg, #E6F4FA, #D0ECF7)",
                    }}
                  >
                    <div className="w-12 h-12 bg-brand-blue-pale border border-brand-blue-mid rounded-lg flex items-center justify-center text-[22px]">
                      📄
                    </div>
                  </div>
                  <div className="px-5 py-5">
                    <div className="flex justify-between items-center mb-3">
                      <span className="inline-block text-[10px] font-bold tracking-[1px] px-2.5 py-0.5 rounded bg-brand-blue-pale text-brand-blue">
                        {post.category
                          ? categoryLabels[post.category] || post.category
                          : "記事"}
                      </span>
                      <span className="text-[11px] text-[#8EA4B4]">
                        {post.published_at
                          ? new Date(post.published_at)
                              .toLocaleDateString("ja-JP", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              })
                              .replace(/\//g, ".")
                          : ""}
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-[1.7] text-[#0D1B26]">
                      {post.title}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <>
                {[
                  {
                    tag: "業務効率化",
                    title:
                      "インボイス対応テンプレートで見積書作成を時短する方法",
                    date: "2026.03.01",
                  },
                  {
                    tag: "AI活用",
                    title:
                      "ChatGPTで現場の書類作業を半分にした職人さんの実例",
                    date: "2026.02.20",
                  },
                  {
                    tag: "建設業M&A",
                    title:
                      "事業承継を考え始めたら最初に読む基礎知識まとめ",
                    date: "2026.02.10",
                  },
                ].map((b, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#E2EBF0] rounded-[10px] overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <div
                      className="h-[120px] flex items-center justify-center border-b border-[#E2EBF0]"
                      style={{
                        background:
                          "linear-gradient(135deg, #E6F4FA, #D0ECF7)",
                      }}
                    >
                      <div className="w-12 h-12 bg-brand-blue-pale border border-brand-blue-mid rounded-lg flex items-center justify-center text-[22px]">
                        📄
                      </div>
                    </div>
                    <div className="px-5 py-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="inline-block text-[10px] font-bold tracking-[1px] px-2.5 py-0.5 rounded bg-brand-blue-pale text-brand-blue">
                          {b.tag}
                        </span>
                        <span className="text-[11px] text-[#8EA4B4]">
                          {b.date}
                        </span>
                      </div>
                      <p className="text-sm font-semibold leading-[1.7] text-[#0D1B26]">
                        {b.title}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        className="py-20 px-16"
        style={{
          background: "linear-gradient(135deg, #003D5C 0%, #005A85 100%)",
        }}
      >
        <div className="max-w-[700px] mx-auto text-center">
          <h2 className="text-[34px] font-black text-white mb-4 tracking-tight leading-[1.25]">
            まずは、見てみてください。
          </h2>
          <p className="text-white/65 text-[15px] mb-12 leading-[1.8]">
            職人向け商品・メーカー向けNGレポート、
            <br />
            どちらからでも始められます。
          </p>
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/products"
              className="flex flex-col items-center gap-1.5 bg-white/[0.12] text-white border border-white/20 py-6 px-4 rounded-lg text-[13px] font-bold hover:-translate-y-0.5 transition-all"
            >
              商品を見る
              <span className="text-[11px] font-normal opacity-65">
                職人・建設業の方
              </span>
            </Link>
            <Link
              href="/ng-report#sample"
              className="flex flex-col items-center gap-1.5 bg-brand-orange text-white py-6 px-4 rounded-lg text-[13px] font-bold hover:bg-[#E09200] hover:-translate-y-0.5 transition-all"
            >
              無料サンプルを請求する
              <span className="text-[11px] font-normal opacity-65">
                NGレポート（メーカー向け）
              </span>
            </Link>
            <Link
              href="/blog"
              className="flex flex-col items-center gap-1.5 bg-white/[0.12] text-white border border-white/20 py-6 px-4 rounded-lg text-[13px] font-bold hover:-translate-y-0.5 transition-all"
            >
              ブログを読む
              <span className="text-[11px] font-normal opacity-65">
                建設業の役立つ情報
              </span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
