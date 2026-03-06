const SITE_NAME = "shokulab"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://shokulab.com"
const SITE_DESCRIPTION =
  "職人さん・建設会社のための業務テンプレート、AI活用ガイド、M&A教材を提供。20年間・累計55回の職人アンケートで積み上げた知見をビジネスに活かす。"
const ORG_NAME = "株式会社職人さんドットコム"

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: "ja",
    publisher: organizationEntity(),
  }
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  }
}

type ArticleInput = {
  title: string
  slug: string
  excerpt?: string | null
  published_at: string | null
  updated_at?: string | null
  tags?: string[] | null
  seo_description?: string | null
}

export function articleJsonLd(post: ArticleInput) {
  const articleUrl = `${SITE_URL}/blog/${post.slug}`
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    url: articleUrl,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    description: post.seo_description || post.excerpt || "",
    inLanguage: "ja",
    author: { "@type": "Organization", name: ORG_NAME, url: SITE_URL },
    publisher: organizationEntity(),
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    isPartOf: { "@type": "Blog", name: SITE_NAME, url: `${SITE_URL}/blog` },
    ...(post.tags && post.tags.length > 0
      ? { keywords: post.tags.join(", ") }
      : {}),
  }
}

type PostSummary = {
  title: string
  slug: string
  published_at: string | null
}

export function blogListJsonLd(posts: PostSummary[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} ブログ`,
    description: "職人・建設業界に関するノウハウ、最新情報をお届けします。",
    url: `${SITE_URL}/blog`,
    inLanguage: "ja",
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  }
}

type ProductInput = {
  title: string
  slug: string
  description?: string | null
  price_min: number
  price_max?: number | null
}

export function productJsonLd(product: ProductInput) {
  const productUrl = `${SITE_URL}/products/${product.slug}`
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    url: productUrl,
    description: product.description || "",
    offers: {
      "@type": "Offer",
      price: product.price_min,
      priceCurrency: "JPY",
      availability: "https://schema.org/InStock",
      url: productUrl,
    },
  }
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

function organizationEntity() {
  return {
    "@type": "Organization",
    name: ORG_NAME,
    url: SITE_URL,
  }
}
