import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, phone, message } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: "お名前・メールアドレスは必須です。" },
        { status: 400 }
      )
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "メールアドレスの形式が正しくありません。" },
        { status: 400 }
      )
    }
    if (name.length > 100 || email.length > 254) {
      return NextResponse.json({ error: "入力値が長すぎます。" }, { status: 400 })
    }
    if (company && company.length > 200) {
      return NextResponse.json({ error: "入力値が長すぎます。" }, { status: 400 })
    }
    if (message && message.length > 2000) {
      return NextResponse.json(
        { error: "メッセージは2000文字以内で入力してください。" },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    // リードテーブルに登録
    const { error: leadsError } = await supabase.from("leads").insert({
      email,
      name,
      company: company || null,
      source: "ma_advisory",
      type: "btob",
      note: [
        phone ? `TEL: ${phone}` : null,
        message ? `メモ: ${message}` : null,
      ]
        .filter(Boolean)
        .join("\n") || null,
    })

    if (leadsError && leadsError.code !== "23505") {
      console.error("Failed to insert lead:", leadsError.message)
      return NextResponse.json(
        { error: "データ保存に失敗しました。" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("POST /api/ma-advisory/contact error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
