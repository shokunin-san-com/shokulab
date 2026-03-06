import { Resend } from "resend"

let resend: Resend | null = null

function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

const FROM = "shokulab <noreply@shokulab.com>"
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@shokunin-san.com"

/**
 * 購入完了メール — 購入者へダウンロードリンクを送信
 */
export async function sendPurchaseConfirmation({
  to,
  productTitle,
  amount,
}: {
  to: string
  productTitle: string
  amount: number | null
}) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: `【shokulab】ご購入ありがとうございます — ${productTitle}`,
    html: `
      <div style="font-family: 'Noto Sans JP', sans-serif; max-width: 560px; margin: 0 auto; color: #0D1B26;">
        <div style="background: #0099CC; padding: 24px 32px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #fff; font-size: 18px; margin: 0; font-weight: 700;">shokulab</h1>
        </div>
        <div style="border: 1px solid #E2EBF0; border-top: none; padding: 32px; border-radius: 0 0 10px 10px;">
          <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 16px;">ご購入ありがとうございます</h2>
          <p style="font-size: 14px; color: #4A6070; line-height: 1.8; margin: 0 0 24px;">
            以下の商品のご購入が完了しました。
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr style="border-bottom: 1px solid #E2EBF0;">
              <td style="padding: 12px 0; font-size: 13px; color: #8EA4B4;">商品名</td>
              <td style="padding: 12px 0; font-size: 14px; font-weight: 600; text-align: right;">${productTitle}</td>
            </tr>
            ${amount ? `<tr>
              <td style="padding: 12px 0; font-size: 13px; color: #8EA4B4;">金額</td>
              <td style="padding: 12px 0; font-size: 14px; font-weight: 600; text-align: right;">¥${amount.toLocaleString()}</td>
            </tr>` : ""}
          </table>
          <p style="font-size: 14px; color: #4A6070; line-height: 1.8; margin: 0 0 24px;">
            ダウンロードリンクは別途メールでお送りいたします。<br>
            しばらくお待ちください。
          </p>
          <hr style="border: none; border-top: 1px solid #E2EBF0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #8EA4B4; line-height: 1.6; margin: 0;">
            このメールは shokulab.com からの自動送信です。<br>
            ご不明な点がございましたら、サイトよりお問い合わせください。
          </p>
        </div>
      </div>
    `,
  })
}

/**
 * NGレポートサンプル請求 — 管理者への通知メール
 */
export async function sendNgReportAdminNotification({
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
  position?: string | null
  productCategory?: string | null
  message?: string | null
}) {
  const categoryLabels: Record<string, string> = {
    building_materials: "建材メーカー",
    tools: "工具・ツールメーカー",
    workwear: "ワークウェアメーカー",
    other: "その他",
  }

  return getResend().emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `【NGレポート】新規サンプル請求 — ${company} ${name}様`,
    html: `
      <div style="font-family: 'Noto Sans JP', sans-serif; max-width: 560px; margin: 0 auto; color: #0D1B26;">
        <div style="background: #003D5C; padding: 24px 32px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #F5A000; font-size: 16px; margin: 0; font-weight: 700;">職人リアルNGレポート — サンプル請求</h1>
        </div>
        <div style="border: 1px solid #E2EBF0; border-top: none; padding: 32px; border-radius: 0 0 10px 10px;">
          <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px;">新しいサンプル請求がありました</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #E2EBF0;">
              <td style="padding: 10px 0; font-size: 13px; color: #8EA4B4; width: 120px;">会社名</td>
              <td style="padding: 10px 0; font-size: 14px; font-weight: 500;">${company}</td>
            </tr>
            <tr style="border-bottom: 1px solid #E2EBF0;">
              <td style="padding: 10px 0; font-size: 13px; color: #8EA4B4;">担当者名</td>
              <td style="padding: 10px 0; font-size: 14px;">${name}</td>
            </tr>
            ${position ? `<tr style="border-bottom: 1px solid #E2EBF0;">
              <td style="padding: 10px 0; font-size: 13px; color: #8EA4B4;">役職</td>
              <td style="padding: 10px 0; font-size: 14px;">${position}</td>
            </tr>` : ""}
            <tr style="border-bottom: 1px solid #E2EBF0;">
              <td style="padding: 10px 0; font-size: 13px; color: #8EA4B4;">メール</td>
              <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #0099CC;">${email}</a></td>
            </tr>
            ${productCategory ? `<tr style="border-bottom: 1px solid #E2EBF0;">
              <td style="padding: 10px 0; font-size: 13px; color: #8EA4B4;">業種</td>
              <td style="padding: 10px 0; font-size: 14px;">${categoryLabels[productCategory] || productCategory}</td>
            </tr>` : ""}
            ${message ? `<tr>
              <td style="padding: 10px 0; font-size: 13px; color: #8EA4B4; vertical-align: top;">メッセージ</td>
              <td style="padding: 10px 0; font-size: 14px; line-height: 1.7;">${message}</td>
            </tr>` : ""}
          </table>
          <div style="margin-top: 24px;">
            <a href="https://shokulab.com/admin/leads" style="display: inline-block; background: #0099CC; color: #fff; padding: 10px 24px; border-radius: 6px; font-size: 13px; font-weight: 700; text-decoration: none;">管理画面で確認する</a>
          </div>
        </div>
      </div>
    `,
  })
}

/**
 * NGレポートサンプル請求 — 請求者への自動返信メール
 */
export async function sendNgReportAutoReply({
  to,
  name,
}: {
  to: string
  name: string
}) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: "【shokulab】NGレポート 無料サンプルのご請求を受け付けました",
    html: `
      <div style="font-family: 'Noto Sans JP', sans-serif; max-width: 560px; margin: 0 auto; color: #0D1B26;">
        <div style="background: #003D5C; padding: 24px 32px; border-radius: 10px 10px 0 0;">
          <h1 style="color: #fff; font-size: 18px; margin: 0; font-weight: 700;">shokulab</h1>
        </div>
        <div style="border: 1px solid #E2EBF0; border-top: none; padding: 32px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 14px; color: #4A6070; line-height: 1.8; margin: 0 0 20px;">
            ${name} 様
          </p>
          <h2 style="font-size: 18px; font-weight: 700; margin: 0 0 20px;">
            サンプル請求を受け付けました
          </h2>
          <p style="font-size: 14px; color: #4A6070; line-height: 1.8; margin: 0 0 16px;">
            職人リアルNGレポート 創刊号（Vol.0）のサンプルPDFをご請求いただき、ありがとうございます。
          </p>
          <div style="background: #F0F9FD; border-left: 3px solid #0099CC; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
            <p style="font-size: 13px; font-weight: 700; color: #0099CC; margin: 0 0 8px;">お届けする内容</p>
            <p style="font-size: 14px; color: #4A6070; line-height: 1.7; margin: 0;">
              Vol.0「経験の浅い職人さんが製品説明を『分かったつもり』になる瞬間」
            </p>
          </div>
          <p style="font-size: 14px; color: #4A6070; line-height: 1.8; margin: 0 0 24px;">
            通常1〜2営業日以内に、ご登録のメールアドレスへPDFをお送りいたします。<br>
            しばらくお待ちください。
          </p>
          <hr style="border: none; border-top: 1px solid #E2EBF0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #8EA4B4; line-height: 1.6; margin: 0;">
            このメールは shokulab.com からの自動送信です。<br>
            株式会社職人さんドットコム
          </p>
        </div>
      </div>
    `,
  })
}
