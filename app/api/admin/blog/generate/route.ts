import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

const BLOG_PROMPT = `あなたは職人・建設業界の専門ライターです。
以下の条件でSEO記事をJSON形式で生成してください。

出力はJSONのみ（コードブロック・説明文不要）:
{
  "seo_title": "SEOタイトル（28〜38文字、キーワードと数字を含む）",
  "h1": "記事見出し（28〜38文字）",
  "excerpt": "記事の要約（80〜120文字、検索結果に表示される説明文）",
  "seo_description": "metaディスクリプション（100〜150文字）",
  "tags": ["タグ1", "タグ2", "タグ3"],
  "content": "Markdown形式の本文（3000〜5000字）"
}

本文（content）の要件:
- ## 見出し（h2）を5〜7個、### 小見出し（h3）を適宜使用
- 冒頭リード文（読者の悩みに共感）200字程度
- 各セクション500〜800字
- 箇条書き・表を積極的に使用（読みやすさ重視）
- 数字・具体例・事例を含める
- まとめセクションで締める
- 語尾は「です・ます」調
- 読者は職人・工務店経営者（専門用語OK、IT初心者想定）`;

const TOPICS = [
  { slug: "shokunin-dokuritsu-guide", category: "craftsman", tags: ["独立", "開業", "職人"], keyword: "職人 独立 開業 方法" },
  { slug: "shokunin-nennshu-age-kata", category: "craftsman", tags: ["年収", "収入", "職人"], keyword: "職人 年収 上げる 方法" },
  { slug: "kensetsu-sns-kakusan", category: "craftsman", tags: ["SNS", "集客", "建設業"], keyword: "職人 SNS 集客 Instagram" },
  { slug: "shokunin-hoken-nenkin", category: "craftsman", tags: ["保険", "年金", "一人親方"], keyword: "一人親方 保険 年金 加入" },
  { slug: "kensetsu-ginou-kentei", category: "craftsman", tags: ["技能検定", "資格", "建設業"], keyword: "建設業 技能検定 資格 取り方" },
  { slug: "tosou-shokunin-shigoto", category: "craftsman", tags: ["塗装", "仕事", "職人"], keyword: "塗装職人 仕事 独立 収入" },
  { slug: "daiku-shokunin-mirai", category: "craftsman", tags: ["大工", "キャリア", "将来"], keyword: "大工 将来性 仕事 収入" },
  { slug: "kensetsu-gaikokujin-ginou", category: "craftsman", tags: ["外国人", "特定技能", "建設"], keyword: "建設業 外国人 特定技能 採用" },
  { slug: "shokunin-kakuteishinkoku", category: "craftsman", tags: ["確定申告", "税金", "フリー"], keyword: "職人 確定申告 経費 やり方" },
  { slug: "kensetsu-anzen-kanri", category: "craftsman", tags: ["安全", "労災", "管理"], keyword: "建設業 安全管理 労災防止" },
  { slug: "komuten-dx-nyumon", category: "owner", tags: ["DX", "IT化", "工務店"], keyword: "工務店 DX デジタル化 方法" },
  { slug: "kensetsu-saiyo-kakuho", category: "owner", tags: ["採用", "人手不足", "建設"], keyword: "建設業 採用 人手不足 解決" },
  { slug: "komuten-genka-sakugen", category: "owner", tags: ["原価", "利益", "経営"], keyword: "工務店 原価管理 利益率 改善" },
  { slug: "kensetsu-hojokin-2026", category: "owner", tags: ["補助金", "助成金", "建設"], keyword: "建設業 補助金 2026 一覧" },
  { slug: "komuten-keiei-kpi", category: "owner", tags: ["KPI", "経営", "指標"], keyword: "工務店 経営 KPI 管理 方法" },
  { slug: "kensetsu-it-dounyuu", category: "owner", tags: ["IT", "システム", "建設"], keyword: "建設業 IT導入 システム 比較" },
  { slug: "komuten-uriage-age", category: "owner", tags: ["売上", "集客", "工務店"], keyword: "工務店 売上アップ 集客 方法" },
  { slug: "kensetsu-shiharai-kanri", category: "owner", tags: ["支払い", "下請け", "管理"], keyword: "建設業 支払い管理 下請け 法律" },
  { slug: "komuten-kyouiku-kunren", category: "owner", tags: ["教育", "研修", "人材"], keyword: "工務店 社員教育 研修 OJT" },
  { slug: "kensetsu-jigyo-keikaku", category: "owner", tags: ["事業計画", "経営", "戦略"], keyword: "建設業 事業計画書 作り方 書き方" },
  { slug: "komuten-genba-kanri-app", category: "owner", tags: ["現場管理", "アプリ", "DX"], keyword: "工務店 現場管理 アプリ おすすめ" },
  { slug: "kensetsu-zaimu-kaiszen", category: "owner", tags: ["財務", "資金繰り", "経営"], keyword: "建設業 資金繰り 改善 方法" },
  { slug: "komuten-web-shukyaku", category: "owner", tags: ["Web", "集客", "ホームページ"], keyword: "工務店 ホームページ 集客 SEO" },
  { slug: "kensetsu-kotei-kanri", category: "owner", tags: ["工程管理", "スケジュール"], keyword: "建設業 工程管理 ツール アプリ" },
  { slug: "komuten-souzoku-taisaku", category: "owner", tags: ["相続", "事業承継", "経営"], keyword: "工務店 事業承継 相続 対策" },
  { slug: "kenzai-maker-hanbai", category: "maker", tags: ["建材", "販路", "メーカー"], keyword: "建材メーカー 販路拡大 方法" },
  { slug: "kensetsu-tool-ec", category: "maker", tags: ["EC", "通販", "建設工具"], keyword: "建設工具 通販 EC 販売" },
  { slug: "kenzai-branding", category: "maker", tags: ["ブランディング", "差別化"], keyword: "建材 ブランディング 差別化 方法" },
  { slug: "kensetsu-maker-dx", category: "maker", tags: ["DX", "製造", "建材"], keyword: "建材メーカー DX 製造 デジタル化" },
  { slug: "kenzai-kankyou-taiou", category: "maker", tags: ["環境", "SDGs", "建材"], keyword: "建材 環境対応 SDGs エコ" },
  { slug: "kensetsu-ma-nyumon", category: "ma", tags: ["M&A", "建設業", "基礎知識"], keyword: "建設業 M&A 入門 基礎知識" },
  { slug: "komuten-jigyoushoukeui", category: "ma", tags: ["事業承継", "後継者", "工務店"], keyword: "工務店 事業承継 後継者 準備" },
  { slug: "kensetsu-ma-baika", category: "ma", tags: ["M&A", "売却", "建設会社"], keyword: "建設会社 M&A 売却 価格 相場" },
  { slug: "kensetsu-ma-nagare", category: "ma", tags: ["M&A", "手続き", "流れ"], keyword: "建設業 M&A 流れ 手順 期間" },
  { slug: "komuten-ma-merger", category: "ma", tags: ["合併", "買収", "統合"], keyword: "工務店 M&A 合併 買収 メリット" },
];

async function callGemini(prompt: string): Promise<Record<string, unknown> | null> {
  if (!GEMINI_API_KEY) return null;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, responseMimeType: "application/json" },
      }),
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const supabase = createClient();

  // Auth check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const requestedSlug = (body as Record<string, unknown>).slug as string | undefined;

  // Get existing slugs
  const { data: existing } = await supabase.from("blog_posts").select("slug");
  const existingSlugs = new Set((existing || []).map((r: { slug: string }) => r.slug));

  // Find topic to generate
  let topic: (typeof TOPICS)[number] | undefined;
  if (requestedSlug) {
    topic = TOPICS.find((t) => t.slug === requestedSlug);
    if (!topic) {
      return NextResponse.json({ error: "slug not found in topics" }, { status: 400 });
    }
    if (existingSlugs.has(requestedSlug)) {
      return NextResponse.json({ error: "already generated" }, { status: 409 });
    }
  } else {
    topic = TOPICS.find((t) => !existingSlugs.has(t.slug));
    if (!topic) {
      return NextResponse.json({ error: "all topics generated", total: TOPICS.length }, { status: 200 });
    }
  }

  const prompt = `${BLOG_PROMPT}

カテゴリ: ${topic.category}
メインキーワード: ${topic.keyword}
想定タグ: ${topic.tags.join(", ")}

上記をもとに職人・建設業界向けSEO記事を生成してください。`;

  const article = await callGemini(prompt);
  if (!article || !article.content) {
    return NextResponse.json({ error: "generation failed" }, { status: 502 });
  }

  const now = new Date().toISOString();
  const post = {
    slug: topic.slug,
    title: (article.h1 || article.seo_title || "") as string,
    content: article.content as string,
    excerpt: (article.excerpt || "") as string,
    category: topic.category,
    tags: (article.tags || topic.tags) as string[],
    seo_title: (article.seo_title || "") as string,
    seo_description: (article.seo_description || "") as string,
    is_published: true,
    published_at: now,
    created_at: now,
    updated_at: now,
  };

  const { error } = await supabase.from("blog_posts").insert(post);
  if (error) {
    return NextResponse.json({ error: "insert failed", detail: error.message }, { status: 500 });
  }

  // Revalidate cache
  const revalidateSecret = process.env.REVALIDATE_SECRET;
  if (revalidateSecret) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shokulab.com";
    for (const path of [`/blog/${topic.slug}`, "/blog"]) {
      try {
        await fetch(`${baseUrl}/api/revalidate?secret=${encodeURIComponent(revalidateSecret)}&path=${encodeURIComponent(path)}`, { method: "POST" });
      } catch { /* ignore */ }
    }
  }

  return NextResponse.json({
    success: true,
    slug: topic.slug,
    title: post.title,
    wordCount: (post.content || "").length,
  });
}
