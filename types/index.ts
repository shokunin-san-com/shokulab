export type ProductCategory =
  | "template"
  | "guide"
  | "ai"
  | "bundle"
  | "subscription"
  | "btob"

export type Phase = "ph1" | "ph2" | "ph3" | "ph4" | "future"

export type Axis = "chiba" | "okabe" | "yamamoto" | "company"

export interface Product {
  id: string
  slug: string
  title: string
  description: string | null
  price_min: number
  price_max: number | null
  stripe_payment_link: string | null
  category: ProductCategory
  phase: Phase
  target: string | null
  axis: Axis | null
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  content: string | null
  excerpt: string | null
  category: string | null
  tags: string[] | null
  seo_title: string | null
  seo_description: string | null
  is_published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface Lead {
  id: string
  email: string
  name: string | null
  company: string | null
  source: string | null
  type: "btoc" | "btob" | null
  status: "new" | "contacted" | "contracted" | "lost"
  note: string | null
  created_at: string
}

export interface NgReportRequest {
  id: string
  company: string
  name: string
  email: string
  position: string | null
  product_category: string | null
  message: string | null
  status: "pending" | "sent" | "following"
  created_at: string
}

export interface KpiRecord {
  id: string
  phase: Phase
  kpi_key: string
  value: number | null
  recorded_at: string
  note: string | null
  created_at: string
}

export interface Purchase {
  id: string
  stripe_session_id: string | null
  product_id: string | null
  customer_email: string | null
  amount: number | null
  status: "paid" | "refunded" | null
  created_at: string
}
