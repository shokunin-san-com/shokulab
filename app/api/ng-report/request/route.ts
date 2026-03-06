import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { sendNgReportRequestNotification } from "@/lib/email"

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

    // リードテーブルにも登録
    await supabase.from("leads").insert({
      email,
      name,
      company,
      source: "ng_report_sample",
      type: "btob",
    })

    // 管理者に通知メール送信
    await sendNgReportRequestNotification({
      company,
      name,
      email,
      position,
      productCategory: product_category,
      message,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
