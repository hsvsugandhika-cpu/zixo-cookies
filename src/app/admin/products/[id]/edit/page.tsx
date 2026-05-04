"use client"

import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { ProductForm } from "@/components/admin/ProductForm"
import { ProductFormData } from "@/types"
import { Loader2 } from "lucide-react"
import { notFound, useParams } from "next/navigation"

export default function EditProductPage() {
  const params = useParams()
  const id = params?.id as string
  const [product, setProduct] = useState<(ProductFormData & { id: string; rating?: number; reviews?: number; createdAt?: string }) | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return
      const productRef = doc(db, "products", id)
      const snapshot = await getDoc(productRef)
      if (snapshot.exists()) {
        setProduct({ id: snapshot.id, ...snapshot.data() } as ProductFormData & { id: string; rating?: number; reviews?: number; createdAt?: string })
      } else {
        notFound()
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-brown-500" />
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-playfair font-bold text-brown-900">Edit Product</h1>
        <p className="text-sm text-brown-500 mt-1">{product.name}</p>
      </div>
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <ProductForm initialData={product} isEdit productId={product.id} />
      </div>
    </div>
  )
}
