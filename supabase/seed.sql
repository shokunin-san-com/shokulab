-- ============================================
-- 初期商品データ投入
-- ============================================

insert into products (slug, title, description, price_min, price_max, category, phase, axis, is_published, sort_order) values
  ('estimate-template', '見積書・請求書テンプレ（インボイス対応）', 'インボイス制度完全対応の見積書・請求書テンプレート。Excel/Googleスプレッドシート対応。', 780, 980, 'template', 'ph1', 'company', true, 1),
  ('completion-report-template', '工事完了報告書テンプレ', '現場写真付きの工事完了報告書テンプレート。施主への報告がスムーズに。', 580, null, 'template', 'ph1', 'company', true, 2),
  ('contract-template', '工事請負契約書テンプレ', '建設業法に準拠した工事請負契約書テンプレート。弁護士監修。', 2980, null, 'template', 'ph2', 'company', false, 3),
  ('instagram-template', 'Instagram投稿テンプレ30枚（Canva）', '職人・工務店向けInstagram投稿テンプレート30枚セット。Canvaで簡単編集。', 1980, null, 'template', 'ph2', 'chiba', false, 4),
  ('startup-pack', '独立スターターパック（書類5点セット）', '独立・開業に必要な書類5点セット。見積書・請求書・契約書・名刺・チラシ。', 5800, null, 'bundle', 'ph2', 'company', false, 5),
  ('chatgpt-guide', '職人向け ChatGPT活用ガイド', 'ChatGPTを使って見積作成・日報・メール返信を効率化する方法を解説。', 1980, 3980, 'guide', 'ph2', 'chiba', false, 6),
  ('ai-template-pack', '建設業 AI業務効率化テンプレ集', 'ChatGPT・Claudeを活用した業務効率化テンプレート集。プロンプト付き。', 4980, 9800, 'ai', 'ph2', 'chiba', false, 7),
  ('sns-ai-starter', 'SNS×AI運用スターターパック', 'AIを活用したSNS運用の始め方。投稿テンプレ・スケジュール・分析ツール付き。', 2980, null, 'bundle', 'ph2', 'chiba', false, 8),
  ('ma-complete-guide', '建設会社M&A完全ガイド', '建設会社のM&Aを検討する経営者向けの完全ガイド。実務フロー・事例付き。', 19800, 49800, 'guide', 'ph3', 'okabe', false, 9),
  ('ma-template-pack', '建設業M&Aテンプレ集', 'M&A実務に必要な書類テンプレート集。NDA・意向表明書・基本合意書など。', 4980, 9800, 'template', 'ph3', 'okabe', false, 10),
  ('ai-consulting', 'AI導入コンサルティング', '建設会社向けAI導入のコンサルティングサービス。業務分析から導入支援まで。', 100000, 300000, 'btob', 'future', 'chiba', false, 11);
