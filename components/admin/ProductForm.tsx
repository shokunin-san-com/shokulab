"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/types"

const categories = [
  { value: "template", label: "テンプレート" },
  { value: "guide", label: "ガイド" },
  { value: "ai", label: "AI" },
  { value: "bundle", label: "バンドル" },
  { value: "subscription", label: "サブスクリプション" },
  { value: "btob", label: "BtoB" },
]

const phases = [
  { value: "ph1", label: "Phase 1" },
  { value: "ph2", label: "Phase 2" },
  { value: "ph3", label: "Phase 3" },
  { value: "ph4", label: "Phase 4" },
  { value: "future", label: "将来" },
]

const axes = [
  { value: "chiba", label: "千葉" },
  { value: "okabe", label: "岡部" },
  { value: "yamamoto", label: "山本" },
  { value: "company", label: "会社" },
]

interface Props {
  product?: Product
}

export default function ProductForm({ product }: Props) {
  const isNew = !product
  const router = useRouter()
  const supabase = createClient()

  const [form, setForm] = useState({
    slug: product?.slug ?? "",
    title: product?.title ?? "",
    description: product?.description ?? "",
    price_min: product?.price_min ?? 0,
    price_max: product?.price_max ?? "",
    stripe_payment_link: product?.stripe_payment_link ?? "",
    category: product?.category ?? "template",
    phase: product?.phase ?? "ph1",
    target: product?.target ?? "",
    axis: product?.axis ?? "company",
    is_published: product?.is_published ?? false,
    sort_order: product?.sort_order ?? 0,
    download_url: product?.download_url ?? "",
    image_url: product?.image_url ?? "",
    features: (product?.features ?? []).join("\n"),
    body: product?.body ?? "",
  })

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")

  function update(field: string, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")

    const data = {
      ...form,
      price_max: form.price_max === "" ? null : Number(form.price_max),
      price_min: Number(form.price_min),
      sort_order: Number(form.sort_order),
      stripe_payment_link: form.stripe_payment_link || null,
      target: form.target || null,
      description: form.description || null,
      download_url: form.download_url || null,
      image_url: form.image_url || null,
      features: form.features
        ? form.features.split("\n").map((s) => s.trim()).filter(Boolean)
        : [],
      body: form.body || null,
    }

    if (isNew) {
      const { error } = await supabase.from("products").insert(data)
      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
    } else {
      const { error } = await supabase
        .from("products")
        .update(data)
        .eq("id", product.id)
      if (error) {
        setError(error.message)
        setSaving(false)
        return
      }
    }

    router.push("/admin/products")
    router.refresh()
  }

  async function handleDelete() {
    if (!product) return
    if (!confirm("この商品を削除してもよろしいですか？")) return

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id)

    if (error) {
      setError(error.message)
      return
    }

    router.push("/admin/products")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="商品名" required>
          <input
            type="text"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="スラッグ（URL）" required>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            required
            pattern="[a-z0-9-]+"
            className="input"
          />
        </Field>
      </div>

      <Field label="説明文（Markdown可）">
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={5}
          className="input"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="最低価格（円）" required>
          <input
            type="number"
            value={form.price_min}
            onChange={(e) => update("price_min", e.target.value)}
            required
            min={0}
            className="input"
          />
        </Field>
        <Field label="最高価格（円）">
          <input
            type="number"
            value={form.price_max}
            onChange={(e) => update("price_max", e.target.value)}
            min={0}
            className="input"
            placeholder="範囲がない場合は空欄"
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="カテゴリ" required>
          <select
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className="input"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </Field>
        <Field label="フェーズ" required>
          <select
            value={form.phase}
            onChange={(e) => update("phase", e.target.value)}
            className="input"
          >
            {phases.map((p) => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </Field>
        <Field label="軸">
          <select
            value={form.axis}
            onChange={(e) => update("axis", e.target.value)}
            className="input"
          >
            {axes.map((a) => (
              <option key={a.value} value={a.value}>{a.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Stripe Payment Link URL">
        <input
          type="url"
          value={form.stripe_payment_link}
          onChange={(e) => update("stripe_payment_link", e.target.value)}
          className="input"
          placeholder="https://buy.stripe.com/..."
        />
      </Field>

      <Field label="ダウンロードURL（購入後メールに自動送信）">
        <input
          type="url"
          value={form.download_url}
          onChange={(e) => update("download_url", e.target.value)}
          className="input"
          placeholder="https://drive.google.com/... or https://..."
        />
      </Field>

      <Field label="商品画像URL">
        <input
          type="url"
          value={form.image_url}
          onChange={(e) => update("image_url", e.target.value)}
          className="input"
          placeholder="https://..."
        />
      </Field>

      <Field label="特典リスト（1行1項目）">
        <textarea
          value={form.features}
          onChange={(e) => update("features", e.target.value)}
          rows={4}
          className="input"
          placeholder={"PDF 32ページ\nExcelテンプレ付き\n商用利用可\n購入後サポートメール付き"}
        />
      </Field>

      <Field label="商品詳細本文（Markdown可）">
        <textarea
          value={form.body}
          onChange={(e) => update("body", e.target.value)}
          rows={8}
          className="input"
          placeholder="## こんな方におすすめ&#10;&#10;- ...&#10;&#10;## 内容"
        />
      </Field>

      <Field label="ターゲット説明">
        <input
          type="text"
          value={form.target}
          onChange={(e) => update("target", e.target.value)}
          className="input"
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-4 items-end">
        <Field label="表示順">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => update("sort_order", e.target.value)}
            className="input"
          />
        </Field>
        <label className="flex items-center gap-2 cursor-pointer pb-1">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => update("is_published", e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">公開する</span>
        </label>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white px-6 py-2 rounded font-bold text-sm hover:opacity-90 transition disabled:opacity-50"
        >
          {saving ? "保存中..." : isNew ? "作成" : "更新"}
        </button>

        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            className="text-red-600 text-sm hover:underline"
          >
            削除
          </button>
        )}
      </div>
    </form>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  )
}
