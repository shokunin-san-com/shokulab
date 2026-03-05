import { NextRequest, NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, source, type } = body

    if (!email) {
      return NextResponse.json({ error: "メールアドレスは必須です。" }, { status: 400 })
    }

    const supabase = createServiceClient()

    const { error } = await supabase.from("leads").insert({
      email,
      name: name || null,
      source: source || "direct",
      type: type || "btoc",
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
