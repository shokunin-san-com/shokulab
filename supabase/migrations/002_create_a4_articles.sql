-- ============================================
-- A-4 SEOメディア用記事テーブル
-- Supabase SQL Editor で実行してください
-- ============================================

CREATE TABLE IF NOT EXISTS a4_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    idea_id TEXT NOT NULL DEFAULT '',
    title TEXT NOT NULL,
    content TEXT NOT NULL DEFAULT '',
    excerpt TEXT DEFAULT '',
    eyecatch TEXT DEFAULT '',
    meta_description TEXT DEFAULT '',
    tags TEXT[] DEFAULT '{}',
    lp_url TEXT DEFAULT '',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE a4_articles ENABLE ROW LEVEL SECURITY;

-- 公開側: 公開済み記事は誰でも読める
CREATE POLICY "Public can read published a4 articles"
    ON a4_articles FOR SELECT
    USING (is_published = true);

-- サービスロール: 全操作可能（記事生成スクリプトが使用）
CREATE POLICY "Service role can manage a4 articles"
    ON a4_articles FOR ALL
    USING (true);

-- updated_at 自動更新トリガー
CREATE TRIGGER a4_articles_updated_at
    BEFORE UPDATE ON a4_articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- インデックス
CREATE INDEX IF NOT EXISTS idx_a4_articles_published
    ON a4_articles (published_at DESC)
    WHERE is_published = true;

CREATE INDEX IF NOT EXISTS idx_a4_articles_idea_id
    ON a4_articles (idea_id);
