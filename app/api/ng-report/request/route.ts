import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import {
  sendNgReportAdminNotification,
  sendNgReportAutoReply,
} from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { company, name, email, position, product_category, message } = body

    if (!company || !name || !email) {
      return NextResponse.json(
        { error: "会社名・お名前・メールアドレスは必須です。" },
        { status: 400 }
      )
    }

    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "メールアドレスの形式が正しくありません。" }, { status: 400 })
    }
    if (company.length > 200 || name.length > 100 || email.length > 254) {
      return NextResponse.json({ error: "入力値が長すぎます。" }, { status: 400 })
    }
    if (message && message.length > 2000) {
      return NextResponse.json({ error: "メッセージは2000文字以内で入力してください。" }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { error } = await supabase.from("ng_report_requests").insert({
      company,
      name,
      email,
      position: position || null,
      product_category: product_category || null,
      message: message || null,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // リードテーブルにも登録（重複は無視）
    const { error: leadsError } = await supabase.from("leads").insert({
      email,
      name,
      company,
      source: "ng_report_sample",
      type: "btob",
    })
    if (leadsError && leadsError.code !== "23505") {
      console.error("Failed to insert lead:", leadsError.message)
    }

    // メール送信（RESEND_API_KEYがある場合のみ）
    if (process.env.RESEND_API_KEY) {
      try {
        // 管理者への通知
        await sendNgReportAdminNotification({
          company,
          name,
          email,
          position,
          productCategory: product_category,
          message,
        })

        // 請求者への自動返信
        await sendNgReportAutoReply({ to: email, name })
      } catch (e) {
        console.error("Failed to send NG report emails:", e)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("POST /api/ng-report/request error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
