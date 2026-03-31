-- ============================================
-- products テーブル拡張
-- 自動納品・商品詳細ページ充実のため
-- ============================================

-- ダウンロードURL（購入後メールに直接埋め込む）
alter table products
  add column if not exists download_url text;

-- 商品画像URL（Supabase Storage or 外部URL）
alter table products
  add column if not exists image_url text;

-- 特典リスト（例: ["PDF 32ページ", "Excelテンプレ付き", "商用利用可"]）
alter table products
  add column if not exists features jsonb default '[]'::jsonb;

-- 商品詳細本文（Markdown）
alter table products
  add column if not exists body text;
