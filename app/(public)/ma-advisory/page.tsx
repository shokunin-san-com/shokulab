import type { Metadata } from "next"
import MaContactForm from "@/components/public/MaContactForm"
import {
  Shield,
  Clock,
  UserCheck,
  Building2,
  Handshake,
  ChevronRight,
  ChevronDown,
  Star,
  Phone,
  Mail,
  Lock,
} from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "M&A ADVISORY | 建設業に強いM&A・事業承継支援",
  description:
    "建設業に強いM&A・事業承継支援。M&Aを経験したチームが、匿名相談OKで伴走します。",
  openGraph: {
    title: "M&A ADVISORY | 建設業に強いM&A・事業承継支援",
    description:
      "実際にM&Aを経験したチームが、準備不要・匿名相談OKで伴走します。",
  },
}

/* ─── FAQ data ─── */
const faqs = [
  {
    q: "匿名でも相談することはできますか？",
    a: "はい。社名を伏せたままご相談いただけます。必要に応じてNDAを締結し、段階的に情報開示します。",
  },
  {
    q: "面談前に準備しておく必要がある書類等はありますか？",
    a: "不要です。初回は状況ヒアリングが中心で、資料は、次回以降一緒に整えていきます。",
  },
  {
    q: "費用はどのようになりますか？",
    a: "完全成功報酬制で、着手金・中間金・月額費用などの初期費用は一切いただきません。詳細はお問い合わせください。",
  },
]

/* ─── Fee table data ─── */
const feeRows = [
  { range: "〜5億円以下", rate: "5%" },
  { range: "5億円超〜10億円以下", rate: "4%" },
  { range: "10億円超〜50億円以下", rate: "3%" },
  { range: "50億円超〜100億円以下", rate: "2%" },
  { range: "100億円超〜", rate: "1%" },
]

/* ─── Process steps ─── */
const steps = [
  {
    num: "01",
    title: "初回相談",
    desc: "会社への想いや現状を伺います。匿名・秘密厳守で対応。",
  },
  {
    num: "02",
    title: "現状分析・企業価値評価",
    desc: "財務・事業内容を整理し、適正な企業価値を算出します。",
  },
  {
    num: "03",
    title: "マッチング・候補選定",
    desc: "理念や条件に合う候補先を選定し、慎重にアプローチします。",
  },
  {
    num: "04",
    title: "交渉・デューデリジェンス",
    desc: "条件交渉から詳細調査まで、専門家と連携して進めます。",
  },
  {
    num: "05",
    title: "契約締結・PMI支援",
    desc: "クロージング後の統合プロセスまで、伴走し続けます。",
  },
]

export default function MaAdvisoryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── Nav ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#f5efe3]" style={{ background: "#0e1830cc", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-[76px]">
          <Link href="/ma-advisory" className="flex items-center gap-2">
            <span className="text-white font-bold text-lg tracking-wide">
              <span className="text-xs text-white/60 block leading-none">shokunin-san.com</span>
              M&A ADVISORY
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#story" className="text-white/80 hover:text-white text-sm transition-colors">私たちの経験</a>
            <a href="#features" className="text-white/80 hover:text-white text-sm transition-colors">特徴</a>
            <a href="#fee" className="text-white/80 hover:text-white text-sm transition-colors">報酬体系</a>
            <a href="#process" className="text-white/80 hover:text-white text-sm transition-colors">進め方</a>
            <a href="#faq" className="text-white/80 hover:text-white text-sm transition-colors">FAQ</a>
            <a
              href="#contact"
              className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-bold px-5 py-2.5 rounded-md text-sm transition-all"
            >
              初回相談(30分・匿名可)▶︎
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* ─── Hero ─── */}
        <section className="relative min-h-[700px] flex items-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-[#1a1a2e]">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b1220]/90 via-[#0b1220]/70 to-transparent" />
          </div>

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-32 md:py-40">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-white/90 text-sm">幅広い業種に対応 M&A・事業承継支援</span>
            </div>

            <h1 className="text-3xl md:text-[48px] font-black text-white leading-tight mb-6 tracking-tight">
              実際にM&Aを経験したチームが、
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-amber-300">準備不要・匿名相談OK</span>
                <span className="absolute bottom-0 left-0 right-0 h-3 bg-amber-400/30 -z-0" />
              </span>
              で伴走します。
            </h1>

            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-2 max-w-2xl">
              まずはお気軽にご連絡ください。会社への想いや経営理念についてお伺いします。
            </p>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-3 max-w-2xl">
              会社の状況やお悩みを整理するところから、秘密厳守で一緒に進めて参ります。
            </p>
            <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-2xl">
              建設業で培った知見を活かし、製造・IT・サービスなど幅広い事業承継を支援します。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0b1220] font-bold px-8 py-4 rounded-md hover:bg-gray-100 transition-all text-[15px]"
              >
                無料相談を申し込む
                <ChevronRight className="w-4 h-4" />
              </a>
              <a
                href="#story"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-bold px-8 py-4 rounded-md hover:bg-white/10 transition-all text-[15px]"
              >
                私たちの経験を見る
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            {/* 3 Feature badges */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur border border-white/15 rounded-xl px-5 py-3 text-center min-w-[130px]">
                <Building2 className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <p className="text-white font-bold text-sm">建設業に強い</p>
                <p className="text-white/50 text-xs mt-0.5">他業種にも<br/>柔軟に対応します</p>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/15 rounded-xl px-5 py-3 text-center min-w-[130px]">
                <Clock className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <p className="text-white font-bold text-sm">24h以内に返信</p>
                <p className="text-white/50 text-xs mt-0.5">平日9:00–18:00</p>
              </div>
              <div className="bg-white/10 backdrop-blur border border-white/15 rounded-xl px-5 py-3 text-center min-w-[130px]">
                <Shield className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <p className="text-white font-bold text-sm">匿名OK</p>
                <p className="text-white/50 text-xs mt-0.5">お気軽に<br/>ご相談ください。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHY NOW ─── */}
        <section className="py-20 bg-gradient-to-b from-amber-50/80 to-white">
          <div className="max-w-[1040px] mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[3px] text-amber-600 uppercase">WHY NOW</span>
              <h2 className="text-[28px] md:text-[32px] font-black text-[#222] mt-2 tracking-tight">安心して相談できる3つの理由</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <UserCheck className="w-6 h-6" />, title: "M&A経験者が対応", desc: "仲介会社任せではなく、自らM&Aを経験したメンバーが直接対応。当事者目線でお話しします。" },
                { icon: <Shield className="w-6 h-6" />, title: "秘密厳守・NDA対応", desc: "匿名でのご相談も可能。必要に応じてNDAを締結し、段階的に情報を共有します。" },
                { icon: <Handshake className="w-6 h-6" />, title: "完全成功報酬制", desc: "着手金・中間金・月額費用は一切不要。ご成約時にのみ費用が発生する安心の料金体系です。" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#e6e8e9] rounded-xl p-8 text-center hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center mx-auto mb-4 text-amber-600">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-[#222] text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-[#505050] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── OUR STORY ─── */}
        <section id="story" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-[1040px] mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-xs font-bold tracking-[3px] text-amber-600 uppercase">OUR STORY</span>
              <h2 className="text-[28px] md:text-[32px] font-black text-[#222] mt-2 tracking-tight">私たちの経験</h2>
              <p className="text-[#505050] mt-4 leading-relaxed">
                私たちは独立事業からグループに参画するM&Aを経験しました。
              </p>
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-center gap-0 mb-14">
              {["創業", "M&A 参画", "支援開始"].map((label, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-[#0b1220] flex items-center justify-center text-white font-bold text-sm border-4 border-amber-400">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <span className="text-sm font-bold text-[#222] mt-2">{label}</span>
                  </div>
                  {i < 2 && (
                    <div className="w-16 md:w-24 h-0.5 bg-amber-300 mx-2 mt-[-1rem]" />
                  )}
                </div>
              ))}
            </div>

            {/* Learnings */}
            <div className="bg-[#fafafa] border border-[#e6e8e9] rounded-xl p-8 md:p-10 max-w-3xl mx-auto">
              <h3 className="font-bold text-[#222] text-lg mb-5">経験から得た3つの学び</h3>
              <ul className="space-y-4">
                {[
                  "数字だけでは決まらない。経営理念や思いを引き継ぎ、価値観の共有と相性が重要",
                  "PMI契約後が本番。社内外の温度差への配慮が企業成長の鍵へつながる。",
                  "早すぎる情報開示はリスク。段階共有が最善策",
                ].map((text, i) => (
                  <li key={i} className="flex gap-3 text-[#333] leading-relaxed">
                    <span className="text-amber-500 font-bold shrink-0">・</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[#505050] text-sm mt-6 leading-relaxed border-t border-[#e6e8e9] pt-5">
                これらの経験から当事者として向き合った知見をもとに、表面的ではない支援を行います。
              </p>
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" className="py-20 bg-[#f5f7fa] scroll-mt-20">
          <div className="max-w-[1040px] mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[3px] text-amber-600 uppercase">FEATURES</span>
              <h2 className="text-[28px] md:text-[32px] font-black text-[#222] mt-2 tracking-tight">私たちが選ばれる理由</h2>
            </div>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[#333] leading-[1.9] mb-6">
                私たちは、業界特有の構造や交渉のリアルを踏まえ、事業承継スキームのご提案、実行支援などのサービスをご提供しています。
              </p>
              <p className="text-[#505050] leading-[1.9]">
                従来のサービス支援で積み重ねてきた建設業の深い理解に加え、
                製造・物流・IT・サービスなど幅広い業種の事業承継にも柔軟に対応します。
              </p>
            </div>
          </div>
        </section>

        {/* ─── FEE STRUCTURE ─── */}
        <section id="fee" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-[1040px] mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[3px] text-amber-600 uppercase">FEE STRUCTURE</span>
              <h2 className="text-[28px] md:text-[32px] font-black text-[#222] mt-2 tracking-tight">料金・報酬体系</h2>
              <p className="text-[#505050] mt-4 leading-relaxed max-w-xl mx-auto">
                完全成功報酬制で、着手金・中間金・月額費用などの初期費用は一切いただきません。
                <br />
                ご成約時にのみ費用が発生します。
              </p>
            </div>

            {/* Highlight badge */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl px-8 py-4">
                <div>
                  <p className="text-amber-700 font-black text-xl">完全成功報酬</p>
                  <p className="text-amber-600/70 text-sm">中間金なし・月額なし</p>
                </div>
              </div>
            </div>

            {/* Fee table */}
            <div className="max-w-2xl mx-auto overflow-hidden rounded-xl border border-[#e6e8e9]">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0b1220] text-white">
                    <th className="text-left px-6 py-4 font-bold text-sm">譲渡価格（報酬基準額）</th>
                    <th className="text-right px-6 py-4 font-bold text-sm">報酬率</th>
                  </tr>
                </thead>
                <tbody>
                  {feeRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
                      <td className="px-6 py-4 text-sm text-[#333]">{row.range}</td>
                      <td className="px-6 py-4 text-sm text-right font-bold text-amber-600">{row.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="max-w-2xl mx-auto mt-6 space-y-1.5 text-sm text-[#707070]">
              <p>・中間金・月額報酬・タイムチャージは不要です。</p>
              <p>・契約成立時（クロージング）にのみ成功報酬が発生します。</p>
              <p>・具体金額は規模・範囲に応じて個別お見積もり。初回相談は無料です。</p>
            </div>
          </div>
        </section>

        {/* ─── PROCESS ─── */}
        <section id="process" className="py-20 bg-[#f5f7fa] scroll-mt-20">
          <div className="max-w-[1040px] mx-auto px-6">
            <div className="text-center mb-14">
              <span className="text-xs font-bold tracking-[3px] text-amber-600 uppercase">PROCESS</span>
              <h2 className="text-[28px] md:text-[32px] font-black text-[#222] mt-2 tracking-tight">支援の進め方</h2>
            </div>

            <div className="max-w-2xl mx-auto space-y-0">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-5">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-[#0b1220] text-amber-400 font-bold text-sm flex items-center justify-center shrink-0 border-2 border-amber-400">
                      {step.num}
                    </div>
                    {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-amber-200 my-1" />}
                  </div>
                  {/* Content */}
                  <div className={`pb-8 ${i === steps.length - 1 ? "" : ""}`}>
                    <h3 className="font-bold text-[#222] text-lg mt-2">{step.title}</h3>
                    <p className="text-sm text-[#505050] leading-relaxed mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section id="faq" className="py-20 bg-white scroll-mt-20">
          <div className="max-w-[1040px] mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold tracking-[3px] text-amber-600 uppercase">FAQ</span>
              <h2 className="text-[28px] md:text-[32px] font-black text-[#222] mt-2 tracking-tight">よくある質問</h2>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-[#e6e8e9] rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none">
                    <div className="flex items-center gap-3">
                      <span className="text-amber-500 font-bold text-sm">Q</span>
                      <span className="font-bold text-[#222] text-[15px]">{faq.q}</span>
                    </div>
                    <ChevronDown className="w-5 h-5 text-[#707070] transition-transform group-open:rotate-180 shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-5 pt-0">
                    <p className="text-sm text-[#505050] leading-relaxed pl-7">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Contact Form ─── */}
        <section id="contact" className="py-20 bg-gradient-to-b from-amber-50/80 to-[#f5f7fa] scroll-mt-20">
          <div className="max-w-[1040px] mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-[24px] md:text-[28px] font-black text-[#222] tracking-tight">
                初回相談（30分・匿名可）を申し込む
              </h2>
            </div>
            <div className="max-w-lg mx-auto bg-white border border-[#e6e8e9] rounded-xl p-8 md:p-10 shadow-sm">
              <h3 className="font-bold text-[#222] text-lg mb-6 text-center">初回相談を申し込む</h3>
              <MaContactForm />
            </div>

            {/* Trust badges */}
            <div className="max-w-lg mx-auto mt-8 bg-white border border-[#e6e8e9] rounded-xl p-6">
              <h4 className="font-bold text-[#222] text-sm mb-4">安心の運用体制</h4>
              <div className="space-y-3 text-sm text-[#505050]">
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p>通信はTLSで暗号化されます。</p>
                    <p>個別NDAの雛形をご用意しています。</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p>平日9:00–18:00の受付、原則24時間以内に返信。</p>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p>03-6823-3524</p>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p>info@shokunin-san.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer className="bg-[#0b1220] text-white py-14">
          <div className="max-w-[1040px] mx-auto px-6">
            <div className="md:flex md:justify-between md:items-start gap-8">
              <div className="mb-8 md:mb-0">
                <h4 className="font-bold mb-1">会社情報</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  株式会社 職人さんドットコム
                  <br />
                  〒220-0004 神奈川県横浜市西区北幸
                  <br />
                  2丁目10-28 むつみビル3F
                </p>
                <p className="text-white/60 text-sm mt-3">info@shokunin-san.com</p>
                <p className="text-white/60 text-sm">03-6823-3524（平日9:00〜18:00）</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <a href="#" className="text-white/60 hover:text-white transition-colors">利用規約</a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">プライバシーポリシー</a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">中小M&Aガイドライン（第３版）遵守に関する宣言</a>
              </div>
            </div>
            <div className="border-t border-white/10 mt-10 pt-6 text-center">
              <p className="text-white/40 text-xs">&copy; {new Date().getFullYear()} 職人さん.com All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
