async function getResend() {
  if (!process.env.RESEND_API_KEY) return null
  const { Resend } = await import("resend")
  return new Resend(process.env.RESEND_API_KEY)
}

type SendEmailParams = {
  to: string
  subject: string
  html: string
}

async function sendEmail({ to, subject, html }: SendEmailParams) {
  const resend = await getResend()
  if (!resend) {
    console.warn("[email] RESEND_API_KEY not set, skipping email send")
    return null
  }

  const fromEmail = process.env.FROM_EMAIL || "noreply@shokulab.com"

  const { data, error } = await resend.emails.send({
    from: `shokulab <${fromEmail}>`,
    to,
    subject,
    html,
  })

  if (error) {
    console.error("[email] Failed to send:", error)
    return null
  }
  return data
}

export async function sendPurchaseConfirmation({
  customerEmail,
  productTitle,
  amount,
}: {
  customerEmail: string
  productTitle: string
  amount: number
}) {
  return sendEmail({
    to: customerEmail,
    subject: `【shokulab】ご購入ありがとうございます — ${productTitle}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 20px; color: #0D1B26; margin-bottom: 24px;">ご購入ありがとうございます</h1>
        <p style="font-size: 15px; color: #4a6070; line-height: 1.8;">
          以下の商品をご購入いただきありがとうございます。
        </p>
        <div style="background: #F6F9FB; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0 0 8px; font-weight: bold; color: #0D1B26;">${productTitle}</p>
          <p style="margin: 0; color: #4a6070;">お支払い金額: ¥${amount.toLocaleString()}</p>
        </div>
        <p style="font-size: 14px; color: #4a6070; line-height: 1.8;">
          ダウンロードリンクは別途メールでお送りいたします。<br>
          ご不明点がございましたら、お気軽にお問い合わせください。
        </p>
        <hr style="border: none; border-top: 1px solid #E2EBF0; margin: 32px 0;" />
        <p style="font-size: 12px; color: #8EA4B4;">
          shokulab — 職人・建設業界のための総合プラットフォーム<br>
          株式会社職人さんドットコム
        </p>
      </div>
    `,
  })
}

export async function sendNgReportRequestNotification({
  company,
  name,
  email,
  position,
  productCategory,
  message,
}: {
  company: string
  name: string
  email: string
  position?: string
  productCategory?: string
  message?: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.warn("[email] ADMIN_EMAIL not set, skipping admin notification")
    return null
  }

  return sendEmail({
    to: adminEmail,
    subject: `【shokulab】NGレポートサンプル請求 — ${company}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 20px; color: #0D1B26; margin-bottom: 24px;">NGレポートサンプル請求がありました</h1>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #8EA4B4; width: 120px;">会社名</td><td style="padding: 8px 0; color: #0D1B26;">${company}</td></tr>
          <tr><td style="padding: 8px 0; color: #8EA4B4;">担当者名</td><td style="padding: 8px 0; color: #0D1B26;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #8EA4B4;">メール</td><td style="padding: 8px 0; color: #0D1B26;">${email}</td></tr>
          ${position ? `<tr><td style="padding: 8px 0; color: #8EA4B4;">役職</td><td style="padding: 8px 0; color: #0D1B26;">${position}</td></tr>` : ""}
          ${productCategory ? `<tr><td style="padding: 8px 0; color: #8EA4B4;">カテゴリ</td><td style="padding: 8px 0; color: #0D1B26;">${productCategory}</td></tr>` : ""}
          ${message ? `<tr><td style="padding: 8px 0; color: #8EA4B4;">メッセージ</td><td style="padding: 8px 0; color: #0D1B26;">${message}</td></tr>` : ""}
        </table>
        <hr style="border: none; border-top: 1px solid #E2EBF0; margin: 32px 0;" />
        <p style="font-size: 12px; color: #8EA4B4;">shokulab 管理者通知</p>
      </div>
    `,
  })
}

export async function sendLeadNotification({
  email,
  name,
  source,
}: {
  email: string
  name?: string
  source?: string
}) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) return null

  return sendEmail({
    to: adminEmail,
    subject: `【shokulab】新規リード — ${name || email}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 24px;">
        <h1 style="font-size: 20px; color: #0D1B26; margin-bottom: 24px;">新規リードが登録されました</h1>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #8EA4B4; width: 120px;">メール</td><td style="padding: 8px 0; color: #0D1B26;">${email}</td></tr>
          ${name ? `<tr><td style="padding: 8px 0; color: #8EA4B4;">名前</td><td style="padding: 8px 0; color: #0D1B26;">${name}</td></tr>` : ""}
          ${source ? `<tr><td style="padding: 8px 0; color: #8EA4B4;">ソース</td><td style="padding: 8px 0; color: #0D1B26;">${source}</td></tr>` : ""}
        </table>
        <hr style="border: none; border-top: 1px solid #E2EBF0; margin: 32px 0;" />
        <p style="font-size: 12px; color: #8EA4B4;">shokulab 管理者通知</p>
      </div>
    `,
  })
}
