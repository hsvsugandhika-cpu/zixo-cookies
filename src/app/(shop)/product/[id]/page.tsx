import { products } from "@/data"
import { notFound } from "next/navigation"
import { ProductDetailClient } from "./ProductDetailClient"

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
