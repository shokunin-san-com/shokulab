import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, category, message, agreed } = body

    if (!name || !email || !category || !message) {
      return NextResponse.json(
        { error: "必須項目が入力されていません。" },
        { status: 400 }
      )
    }

    if (!agreed) {
      return NextResponse.json(
        { error: "プライバシーポリシーへの同意が必要です。" },
        { status: 400 }
      )
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "メールアドレスの形式が正しくありません。" },
        { status: 400 }
      )
    }

    if (
      name.length > 100 ||
      email.length > 254 ||
      (company && company.length > 200) ||
      category.length > 50 ||
      message.length > 2000
    ) {
      return NextResponse.json({ error: "入力値が長すぎます。" }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { error: leadsError } = await supabase.from("leads").insert({
      email,
      name,
      company: company || null,
      source: "contact",
      type: "inquiry",
      note: [`種別: ${category}`, `内容: ${message}`].join("\n"),
    })

    if (leadsError && leadsError.code !== "23505") {
      console.error("Failed to insert contact lead:", leadsError.message)
      return NextResponse.json(
        { error: "データ保存に失敗しました。" },
        { status: 500 }
      )
    }

    // Discord通知（A-4 #a4チャンネルのジニーwebhook流用を想定。
    // 未設定時はスキップ。webhook側で設定された表示名をそのまま使う）
    const webhookUrl = process.env.DISCORD_WEBHOOK_CONTACT
    if (webhookUrl) {
      try {
        const snippet = String(message).replace(/\n/g, " ").slice(0, 500)
        const content = [
          "📩 **shokulab お問い合わせ**",
          `**種別**: ${category}`,
          `**氏名**: ${name}${company ? `（${company}）` : ""}`,
          `**メール**: ${email}`,
          `**内容**: ${snippet}${message.length > 500 ? "…" : ""}`,
        ].join("\n")
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        })
      } catch (e) {
        console.error("Discord notify failed:", e)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("POST /api/contact error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
