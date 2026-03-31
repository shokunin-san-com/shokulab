-- ============================================
-- #5 パフォーマンス向上インデックス追加
-- Supabase SQL Editor で実行してください
-- ============================================

-- products: 公開商品一覧・カテゴリフィルタ・ソート
create index if not exists idx_products_published_sort
  on products (is_published, sort_order)
  where is_published = true;

create index if not exists idx_products_category
  on products (category);

-- blog_posts: 公開記事一覧・カテゴリフィルタ・日付ソート
create index if not exists idx_blog_posts_published_at
  on blog_posts (is_published, published_at desc)
  where is_published = true;

create index if not exists idx_blog_posts_category
  on blog_posts (category);

-- leads: メール重複チェック（upsert用）
create unique index if not exists idx_leads_email_unique
  on leads (email);

-- purchases: Stripe冪等性チェック（unique制約は既存、検索高速化）
create index if not exists idx_purchases_customer_email
  on purchases (customer_email);

-- ng_report_requests: メールで重複チェック
create index if not exists idx_ng_report_requests_email
  on ng_report_requests (email);
