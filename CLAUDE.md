# shokulab.com — プロジェクト設計書

Claude Code用のコンテキストファイルです。実装前に必ずこのファイルを読んでください。

---

## プロジェクト概要

| 項目 | 内容 |
|---|---|
| サイト名 | shokulab.com |
| 運営 | 株式会社職人さんドットコム |
| 目的 | 職人・建設業界向けコンテンツメディア＋商品販売＋管理ダッシュボード |
| ターゲット | BtoC：個人職人・小規模工務店 / BtoB：建材・ツールメーカー |

---

## 技術スタック

```
フロントエンド : Next.js 14 (App Router)
バックエンド   : Next.js API Routes + Supabase
データベース   : Supabase (PostgreSQL)
認証          : Supabase Auth
ファイル保存   : Supabase Storage（PDF・Canvaテンプレ配布用）
決済          : Stripe（Payment Links + Webhooks）
ホスティング   : Vercel
ドメイン      : shokulab.com（Xサーバー取得 → Vercelに向ける）
スタイル      : Tailwind CSS
```

---

## ディレクトリ構成

```
shokulab/
├── app/
│   ├── (public)/                  # 公開側
│   │   ├── page.tsx               # TOP / LP
│   │   ├── products/
│   │   │   ├── page.tsx           # 商品一覧
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # 商品個別LP
│   │   ├── blog/
│   │   │   ├── page.tsx           # ブログ一覧
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # ブログ記事
│   │   ├── ng-report/
│   │   │   └── page.tsx           # NGレポート サンプル請求LP
│   │   └── thanks/
│   │       └── page.tsx           # 購入完了・請求完了ページ
│   │
│   ├── (admin)/                   # 管理側（要認証）
│   │   ├── layout.tsx             # 管理画面共通レイアウト
│   │   ├── dashboard/
│   │   │   └── page.tsx           # KPIダッシュボード
│   │   ├── products/
│   │   │   ├── page.tsx           # 商品管理一覧
│   │   │   └── [id]/
│   │   │       └── page.tsx       # 商品編集
│   │   ├── blog/
│   │   │   ├── page.tsx           # 記事管理一覧
│   │   │   └── [id]/
│   │   │       └── page.tsx       # 記事編集（Markdown）
│   │   ├── leads/
│   │   │   └── page.tsx           # メールリスト・リード管理
│   │   └── kpi/
│   │       └── page.tsx           # KPI実績入力・フェーズ管理
│   │
│   ├── api/
│   │   ├── stripe/
│   │   │   └── webhook/
│   │   │       └── route.ts       # Stripe Webhook受信
│   │   ├── ng-report/
│   │   │   └── request/
│   │   │       └── route.ts       # NGレポートサンプル請求フォーム送信
│   │   └── leads/
│   │       └── route.ts           # リード登録API
│   │
│   └── layout.tsx                 # ルートレイアウト
│
├── components/
│   ├── ui/                        # 汎用UIコンポーネント
│   ├── public/                    # 公開側コンポーネント
│   │   ├── ProductCard.tsx
│   │   ├── BlogCard.tsx
│   │   └── NgReportForm.tsx
│   └── admin/                     # 管理側コンポーネント
│       ├── KpiPhaseCard.tsx
│       ├── KpiProgressBar.tsx
│       └── Sidebar.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # クライアントサイド用
│   │   └── server.ts              # サーバーサイド用
│   ├── stripe.ts                  # Stripe初期化
│   └── utils.ts
│
├── types/
│   └── index.ts                   # 型定義
│
└── CLAUDE.md                      # このファイル
```

---

## Supabase DB設計

### `products`（商品）

```sql
create table products (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,          -- URL用スラッグ
  title       text not null,                 -- 商品名
  description text,                          -- 説明文（Markdown可）
  price_min   integer not null,              -- 最低価格（円）
  price_max   integer,                       -- 最高価格（円）※範囲がある場合
  stripe_payment_link text,                  -- StripeのPayment Link URL
  category    text not null,                 -- 'template' | 'guide' | 'ai' | 'bundle' | 'subscription' | 'btob'
  phase       text not null,                 -- 'ph1' | 'ph2' | 'ph3' | 'ph4' | 'future'
  target      text,                          -- ターゲット説明
  axis        text,                          -- 'chiba' | 'okabe' | 'yamamoto' | 'company'
  is_published boolean default false,
  sort_order  integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
```

### `blog_posts`（ブログ記事）

```sql
create table blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  content     text,                          -- Markdown
  excerpt     text,                          -- 一覧表示用抜粋
  category    text,                          -- 'craftsman' | 'owner' | 'maker' | 'ma'
  tags        text[],                        -- タグ配列
  seo_title   text,
  seo_description text,
  is_published boolean default false,
  published_at timestamptz,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);
```

### `leads`（リード・メールリスト）

```sql
create table leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  name        text,
  company     text,
  source      text,                          -- 'ng_report_sample' | 'line' | 'blog' | 'x' | 'direct'
  type        text,                          -- 'btoc' | 'btob'
  status      text default 'new',            -- 'new' | 'contacted' | 'contracted' | 'lost'
  note        text,
  created_at  timestamptz default now()
);
```

### `ng_report_requests`（NGレポートサンプル請求）

```sql
create table ng_report_requests (
  id          uuid primary key default gen_random_uuid(),
  company     text not null,                 -- 会社名
  name        text not null,                 -- 担当者名
  email       text not null,
  position    text,                          -- 役職
  product_category text,                     -- 興味のある商品カテゴリ
  message     text,
  status      text default 'pending',        -- 'pending' | 'sent' | 'following'
  created_at  timestamptz default now()
);
```

### `kpi_records`（KPI実績）

```sql
create table kpi_records (
  id          uuid primary key default gen_random_uuid(),
  phase       text not null,                 -- 'ph1' | 'ph2' | 'ph3' | 'ph4'
  kpi_key     text not null,                 -- 'email_list' | 'ng_sample' | 'template_sales' など
  value       numeric,                       -- 実績値
  recorded_at date not null,                 -- 記録日（月次）
  note        text,
  created_at  timestamptz default now(),
  unique(phase, kpi_key, recorded_at)
);
```

### `purchases`（購買履歴 ※Stripe Webhookで自動生成）

```sql
create table purchases (
  id                uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  product_id        uuid references products(id),
  customer_email    text,
  amount            integer,                 -- 円
  status            text,                    -- 'paid' | 'refunded'
  created_at        timestamptz default now()
);
```

---

## 認証設計

- Supabase Auth（メール＋パスワード）
- 管理画面（`/admin/*`）はミドルウェアで認証必須
- 管理者アカウントは手動でSupabaseコンソールから作成
- 一般ユーザー向けの会員機能は **Ph.4メンバーズ開始時まで不要**

```typescript
// middleware.ts
// /admin/* へのアクセスはセッションチェック → 未認証はログインページへリダイレクト
```

---

## Stripe連携設計

### 商品販売フロー（BtoC）

```
ユーザー → 商品LP → 「購入する」ボタン
→ Stripe Payment Link（商品ごとに発行）
→ Stripe決済完了
→ Webhook → /api/stripe/webhook
→ purchases テーブルに記録
→ Supabase Storage からダウンロードURLを発行してメール送信
→ /thanks ページへリダイレクト
```

### NGレポート請求フロー（BtoB）

```
メーカー担当者 → NGレポートLP → サンプル請求フォーム
→ /api/ng-report/request → ng_report_requests テーブルに登録
→ 管理者に通知メール（Supabase Edge Functions or Resend）
→ 管理画面 /admin/leads で対応・ステータス管理
→ 有料契約は請求書払い対応（Stripe Invoicing）
```

---

## 商品ラインナップ（初期投入データ）

| slug | タイトル | フェーズ | 価格 | 軸 |
|---|---|---|---|---|
| `estimate-template` | 見積書・請求書テンプレ（インボイス対応） | ph1 | 780〜980円 | company |
| `completion-report-template` | 工事完了報告書テンプレ | ph1 | 580円 | company |
| `contract-template` | 工事請負契約書テンプレ | ph2 | 2,980円 | company |
| `instagram-template` | Instagram投稿テンプレ30枚（Canva） | ph2 | 1,980円 | chiba |
| `startup-pack` | 独立スターターパック（書類5点セット） | ph2 | 5,800円 | company |
| `chatgpt-guide` | 職人向け ChatGPT活用ガイド | ph2 | 1,980〜3,980円 | chiba |
| `ai-template-pack` | 建設業 AI業務効率化テンプレ集 | ph2 | 4,980〜9,800円 | chiba |
| `sns-ai-starter` | SNS×AI運用スターターパック | ph2 | 2,980円 | chiba |
| `ma-complete-guide` | 建設会社M&A完全ガイド | ph3 | 19,800〜49,800円 | okabe |
| `ma-template-pack` | 建設業M&Aテンプレ集 | ph3 | 4,980〜9,800円 | okabe |

---

## KPI定義（管理画面用）

| フェーズ | kpi_key | ラベル | 目標値 | 現実的見立て |
|---|---|---|---|---|
| ph1 | email_list | メールリスト獲得数 | 100件 | 30〜60件 |
| ph1 | ng_sample | NGサンプル請求数 | 30件 | 5〜15件 |
| ph1 | template_sales | テンプレ販売部数 | 50部/月 | 3〜15部 |
| ph1 | x_followers | Xフォロワー数（4アカ合計） | 500人 | 50〜200人 |
| ph1 | revenue | 月次収益 | 200,000円 | 0〜50,000円 |
| ph2 | ng_contracts | NGレポート有料契約数 | 5社 | 1〜3社 |
| ph2 | template_sales | テンプレ販売部数 | 100部/月 | 20〜50部 |
| ph2 | x_followers | Xフォロワー数（4アカ合計） | 2,000人 | 300〜800人 |
| ph2 | blog_pv | ブログ月間PV | 3,000PV | 500〜1,500PV |
| ph2 | revenue | 月次収益 | 500,000円 | 80,000〜200,000円 |
| ph3 | ng_contracts | NGレポート有料契約数 | 10社 | 4〜7社 |
| ph3 | ma_sales | M&A教材販売部数 | 3部/月 | 0〜2部 |
| ph3 | x_followers | Xフォロワー数（4アカ合計） | 5,000人 | 1,000〜2,500人 |
| ph3 | revenue | 月次収益 | 850,000円 | 200,000〜450,000円 |
| ph4 | ng_contracts | NGレポート継続契約数 | 10社 | 6〜10社 |
| ph4 | members | メンバーズ会員数 | 100名 | 20〜60名 |
| ph4 | revenue | 月次収益（MRR） | 850,000円 | 350,000〜600,000円 |

---

## 環境変数

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# メール送信（Resend推奨）
RESEND_API_KEY=

# サイト
NEXT_PUBLIC_SITE_URL=https://shokulab.com
```

---

## 実装優先順位

### Phase A（最初に動かす — 1〜2週間）
1. Supabaseプロジェクト作成・テーブル定義
2. Next.jsプロジェクト初期化・Vercelデプロイ・ドメイン設定
3. 管理画面ログイン
4. 商品管理CRUD
5. 商品一覧・個別LPページ（公開側）
6. Stripe Payment Link連携・購買記録

### Phase B（販売開始後 — 2〜4週間）
7. NGレポートサンプル請求フォーム＋リード管理
8. ブログ投稿管理・記事公開ページ
9. KPIダッシュボード（実績入力・グラフ表示）

### Phase C（軌道に乗ってから）
10. メール自動送信（購入完了・サンプル送付）
11. メンバーズ会員機能（Supabase Auth）
12. X投稿スケジュール管理

---

## 注意事項・制約

- 管理画面URLは `/admin` 配下に統一。外部公開しない
- ダウンロード商品のファイルはSupabase Storageの**非公開バケット**に格納し、購入完了時に署名付きURLを発行する（直リンク防止）
- NGレポートの本文PDFはStorageに置かず、請求フォーム経由のみで配布（メール添付）
- Stripe Webhookは必ず署名検証を実装すること
- BtoB（メーカー）の契約は請求書払いが多いため、Stripe Invoicingも対応できる設計にしておく

---

## デザイン方針

### 基本コンセプト
**「職人業界に信頼されるSaaSメディア」**
SmartHR / freee のような「プロが使うツール感」をベースに、コンテンツメディアとしての読みやすさを両立する。

### カラーパレット

```
Primary   : #1a3a4a  （ネイビー — 信頼・安定）
Secondary : #2d6e6e  （ティール — 行動・誠実）
Accent    : #52b788  （グリーン — 成長・成功）
Background: #ffffff
Surface   : #f4f6f8  （薄グレー — カード背景）
Border    : #dde3e8
Text      : #1a2a35
SubText   : #4a6070
Muted     : #7a9aaa

※ 既存の戦略資料PDFのカラーと統一する
```

### タイポグラフィ

```
Font    : Noto Sans JP（Google Fonts）
見出し  : font-weight: 900 / 700
本文    : font-weight: 400 / 16px / line-height: 1.75
英数字  : Inter（サブフォントとして併用）
```

### UIコンポーネント方針
- カードは `border-radius: 6px`、ドロップシャドウは控えめ
- ボタンはフラットデザイン（グラデーション不使用）
- アイコンは `lucide-react` で統一
- テーブルはヘッダーをネイビー塗り（戦略資料と統一）
- セクション見出しはティール背景のラベル帯

### レスポンシブ方針
- モバイル・PCを同等に重視（Tailwind の `sm` / `md` / `lg` ブレイクポイントを適切に使う）
- 管理画面はサイドバーあり（PC: 固定表示 / スマホ: ハンバーガーメニュー）
- 公開側はカードグリッド（PC: 3列 / タブレット: 2列 / スマホ: 1列）

### 参考サイト
- SmartHR（https://smarthr.jp）— レイアウト・余白感・信頼感の出し方
- freee（https://www.freee.co.jp）— CTAボタンの使い方・機能説明の見せ方

### やらないこと
- グラデーション多用
- アニメーション多用（必要最小限のみ）
- ダークモード対応（初期フェーズは不要）
- 装飾的なイラスト・キャラクター使用
