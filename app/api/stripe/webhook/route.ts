import { NextRequest, NextResponse } from "next/server"
import { getStripe } from "@/lib/stripe"
import { createServiceClient } from "@/lib/supabase/server"
import { sendPurchaseConfirmation } from "@/lib/email"
import Stripe from "stripe"

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${message}` },
      { status: 400 }
    )
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const supabase = createServiceClient()

    // メタデータからproduct_idを取得（Payment Link作成時にmetadataに設定）
    const productSlug = session.metadata?.product_slug

    let productId: string | null = null
    let productTitle = "ご購入商品"
    if (productSlug) {
      const { data: product } = await supabase
        .from("products")
        .select("id, title")
        .eq("slug", productSlug)
        .single()
      productId = product?.id ?? null
      productTitle = product?.title ?? productTitle
    }

    await supabase.from("purchases").insert({
      stripe_session_id: session.id,
      product_id: productId,
      customer_email: session.customer_details?.email ?? null,
      amount: session.amount_total ? Math.round(session.amount_total) : null,
      status: "paid",
    })

    // 購入完了メール送信
    const customerEmail = session.customer_details?.email
    if (customerEmail && process.env.RESEND_API_KEY) {
      try {
        await sendPurchaseConfirmation({
          to: customerEmail,
          productTitle,
          amount: session.amount_total ? Math.round(session.amount_total) : null,
        })
      } catch (e) {
        console.error("Failed to send purchase confirmation email:", e)
      }
    }
  }

  return NextResponse.json({ received: true })
}
