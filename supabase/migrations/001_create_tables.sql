-- ============================================
-- shokulab DB Schema
-- Supabase SQL Editor で実行してください
-- ============================================

-- 商品テーブル
create table products (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  description text,
  price_min   integer not null,
  price_max   integer,
  stripe_payment_link text,
  category    text not null,
  phase       text not null,
  target      text,
  axis        text,
  is_published boolean default false,
  sort_order  integer default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ブログ記事テーブル
create table blog_posts (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  content     text,
  excerpt     text,
  category    text,
  tags        text[],
  seo_title   text,
  seo_description text,
  is_published boolean default false,
  published_at timestamptz,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- リード・メールリストテーブル
create table leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  name        text,
  company     text,
  source      text,
  type        text,
  status      text default 'new',
  note        text,
  created_at  timestamptz default now()
);

-- NGレポートサンプル請求テーブル
create table ng_report_requests (
  id          uuid primary key default gen_random_uuid(),
  company     text not null,
  name        text not null,
  email       text not null,
  position    text,
  product_category text,
  message     text,
  status      text default 'pending',
  created_at  timestamptz default now()
);

-- KPI実績テーブル
create table kpi_records (
  id          uuid primary key default gen_random_uuid(),
  phase       text not null,
  kpi_key     text not null,
  value       numeric,
  recorded_at date not null,
  note        text,
  created_at  timestamptz default now(),
  unique(phase, kpi_key, recorded_at)
);

-- 購買履歴テーブル（Stripe Webhookで自動生成）
create table purchases (
  id                uuid primary key default gen_random_uuid(),
  stripe_session_id text unique,
  product_id        uuid references products(id),
  customer_email    text,
  amount            integer,
  status            text,
  created_at        timestamptz default now()
);

-- updated_at 自動更新トリガー
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at();

-- RLS (Row Level Security) ポリシー
alter table products enable row level security;
alter table blog_posts enable row level security;
alter table leads enable row level security;
alter table ng_report_requests enable row level security;
alter table kpi_records enable row level security;
alter table purchases enable row level security;

-- 公開側：公開済み商品・記事は誰でも読める
create policy "Public can read published products"
  on products for select
  using (is_published = true);

create policy "Public can read published blog posts"
  on blog_posts for select
  using (is_published = true);

-- 認証済みユーザー（管理者）は全操作可能
create policy "Authenticated users can manage products"
  on products for all
  using (auth.role() = 'authenticated');

create policy "Authenticated users can manage blog posts"
  on blog_posts for all
  using (auth.role() = 'authenticated');

create policy "Authenticated users can manage leads"
  on leads for all
  using (auth.role() = 'authenticated');

create policy "Authenticated users can manage ng_report_requests"
  on ng_report_requests for all
  using (auth.role() = 'authenticated');

create policy "Authenticated users can manage kpi_records"
  on kpi_records for all
  using (auth.role() = 'authenticated');

create policy "Authenticated users can manage purchases"
  on purchases for all
  using (auth.role() = 'authenticated');

-- ng_report_requests は匿名ユーザーが INSERT 可能
create policy "Anyone can insert ng_report_requests"
  on ng_report_requests for insert
  with check (true);

-- leads は匿名ユーザーが INSERT 可能
create policy "Anyone can insert leads"
  on leads for insert
  with check (true);
