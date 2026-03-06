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
    if (productSlug) {
      const { data: product } = await supabase
        .from("products")
        .select("id")
        .eq("slug", productSlug)
        .single()
      productId = product?.id ?? null
    }

    await supabase.from("purchases").insert({
      stripe_session_id: session.id,
      product_id: productId,
      customer_email: session.customer_details?.email ?? null,
      amount: session.amount_total ? Math.round(session.amount_total) : null,
      status: "paid",
    })

    // 購入者に確認メール送信
    const customerEmail = session.customer_details?.email
    if (customerEmail && productSlug) {
      const { data: product } = await supabase
        .from("products")
        .select("title")
        .eq("slug", productSlug)
        .single()

      if (product) {
        await sendPurchaseConfirmation({
          customerEmail,
          productTitle: product.title,
          amount: session.amount_total ? Math.round(session.amount_total) : 0,
        })
      }
    }
  }

  return NextResponse.json({ received: true })
}
