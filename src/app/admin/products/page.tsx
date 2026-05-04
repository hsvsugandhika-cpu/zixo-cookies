"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { subscribeToProducts, deleteProduct } from "@/lib/firebase-utils"
import { motion } from "framer-motion"
import { Plus, Trash2, Edit2, Package, Loader2, ToggleLeft, ToggleRight } from "lucide-react"
import Link from "next/link"

interface AdminProduct {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  weight: string
  ingredients: string[]
  rating: number
  reviews: number
  badge?: string
  inStock: boolean
  createdAt?: string
}

export default function AdminProductsPage() {
  const router = useRouter()
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data as AdminProduct[])
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    setDeleting(id)
    await deleteProduct(id)
    setDeleting(null)
  }

  const toggleStock = async (id: string, currentStock: boolean) => {
    await import("firebase/firestore").then(async ({ doc, updateDoc }) => {
      const { db } = await import("@/lib/firebase")
      const productRef = doc(db, "products", id)
      await updateDoc(productRef, { inStock: !currentStock })
    })
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-brown-500" />
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-playfair font-bold text-cream">Products</h1>
          <p className="text-sm text-brown-500 mt-1">{products.length} products in store</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-brown-900 text-cream font-medium rounded-xl hover:bg-gold hover:text-brown-900 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-brown-900 rounded-2xl p-12 text-center shadow-sm">
          <Package className="w-12 h-12 mx-auto text-brown-200 mb-4" />
          <p className="text-brown-500 mb-4">No products found</p>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-cream font-medium rounded-xl hover:bg-gold-light transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <motion.div
              layout
              key={product.id}
              className="bg-brown-900 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-cream text-sm sm:text-base truncate">{product.name}</h3>
                    {product.badge && (
                      <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-semibold rounded-full hidden sm:inline">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brown-500 mt-0.5">{product.category} · {product.weight}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-bold text-cream text-sm">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-brown-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleStock(product.id, product.inStock)}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                      product.inStock
                        ? "text-green-600 hover:bg-green-50"
                        : "text-red-500 hover:bg-red-50"
                    }`}
                    title={product.inStock ? "In Stock" : "Out of Stock"}
                  >
                    {product.inStock ? <ToggleRight className="w-5 h-5 sm:w-6 sm:h-6" /> : <ToggleLeft className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </button>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="p-1.5 sm:p-2 text-brown-500 hover:text-gold hover:bg-brown-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deleting === product.id}
                    className="p-1.5 sm:p-2 text-brown-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {deleting === product.id ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
