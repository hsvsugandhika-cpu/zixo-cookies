"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { saveProduct, uploadProductImage } from "@/lib/firebase-utils"
import { Loader2, Plus, X } from "lucide-react"
import { ProductFormData } from "@/types"

interface ProductFormProps {
  initialData?: ProductFormData & { id: string; rating?: number; reviews?: number; createdAt?: string }
  isEdit?: boolean
  productId?: string
}

const emptyForm: ProductFormData = {
  name: "",
  description: "",
  price: 0,
  originalPrice: undefined,
  image: "",
  images: [],
  category: "",
  weight: "200g (6 pcs)",
  ingredients: [],
  badge: "",
  inStock: true,
}

export function ProductForm({ initialData, isEdit, productId }: ProductFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<ProductFormData>(
    initialData ?? emptyForm
  )
  const [ingredientInput, setIngredientInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [imageUploading, setImageUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.description || !form.price || !form.category) {
      setError("Please fill in all required fields")
      return
    }
    if (!form.image && form.images.length === 0) {
      setError("Please add at least one product image")
      return
    }

    setLoading(true)
    setError("")

    try {
      const id = productId || form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
      const productData = {
        ...form,
        id,
        image: form.image || form.images[0],
        images: form.images.length > 0 ? form.images : [form.image],
        rating: initialData?.rating ?? 0,
        reviews: initialData?.reviews ?? 0,
        createdAt: initialData?.createdAt || new Date().toISOString(),
      }
      await saveProduct(id, productData as unknown as Record<string, unknown>)
      router.push("/admin/products")
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageUploading(true)
    try {
      const tempId = productId || "temp"
      const url = await uploadProductImage(file, tempId)
      setForm((prev) => ({
        ...prev,
        image: url,
        images: [...prev.images, url],
      }))
    } catch (err) {
      setError("Failed to upload image")
    } finally {
      setImageUploading(false)
    }
  }

  const addIngredient = () => {
    if (ingredientInput.trim() && !form.ingredients.includes(ingredientInput.trim())) {
      setForm((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput.trim()],
      }))
      setIngredientInput("")
    }
  }

  const removeIngredient = (index: number) => {
    setForm((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      image: index === 0 ? (prev.images[1] || prev.image) : prev.image,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-brown-700 mb-1">Product Name *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 border border-brown-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            placeholder="e.g. Double Chocolate Chunk"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-brown-700 mb-1">Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-2.5 border border-brown-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
            placeholder="Describe the product..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">Price (₹) *</label>
          <input
            type="number"
            value={form.price || ""}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            className="w-full px-4 py-2.5 border border-brown-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            placeholder="299"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">Original Price (₹)</label>
          <input
            type="number"
            value={form.originalPrice || ""}
            onChange={(e) => setForm({ ...form, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
            className="w-full px-4 py-2.5 border border-brown-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            placeholder="399"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">Category *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2.5 border border-brown-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
            required
          >
            <option value="">Select category</option>
            <option value="Classic">Classic</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Premium">Premium</option>
            <option value="Exotic">Exotic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">Weight</label>
          <input
            type="text"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className="w-full px-4 py-2.5 border border-brown-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            placeholder="200g (6 pcs)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brown-700 mb-1">Badge (optional)</label>
          <select
            value={form.badge || ""}
            onChange={(e) => setForm({ ...form, badge: e.target.value || undefined })}
            className="w-full px-4 py-2.5 border border-brown-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold bg-white"
          >
            <option value="">No badge</option>
            <option value="Bestseller">Bestseller</option>
            <option value="Popular">Popular</option>
            <option value="Premium">Premium</option>
            <option value="New">New</option>
            <option value="Limited Edition">Limited Edition</option>
            <option value="Chef's Special">Chef&apos;s Special</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.inStock}
              onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
              className="w-4 h-4 rounded border-brown-300 text-gold focus:ring-gold/50"
            />
            <span className="text-sm text-brown-700">In Stock</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-700 mb-2">Images</label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={imageUploading}
              className="flex-1 px-3 py-2 border border-brown-200 rounded-lg text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gold/10 file:text-brown-900 file:font-medium file:text-sm file:cursor-pointer"
            />
          </div>
          {form.images.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {form.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt="" className="w-20 h-20 rounded-lg object-cover border border-brown-200" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-0 left-0 right-0 bg-brown-900/80 text-white text-[9px] text-center py-0.5 rounded-b-lg">
                      Main
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          {imageUploading && (
            <div className="flex items-center gap-2 text-sm text-brown-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading image...
            </div>
          )}
          {!form.image && form.images.length === 0 && (
            <input
              type="url"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full px-4 py-2.5 border border-brown-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
              placeholder="Or paste image URL"
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-brown-700 mb-2">Ingredients</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addIngredient()
              }
            }}
            className="flex-1 px-4 py-2.5 border border-brown-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
            placeholder="Add ingredient"
          />
          <button
            type="button"
            onClick={addIngredient}
            className="px-3 py-2.5 bg-brown-100 text-brown-700 rounded-xl hover:bg-brown-200 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {form.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {form.ingredients.map((ing, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-brown-100 text-brown-700 text-xs rounded-full"
              >
                {ing}
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t border-brown-100">
        <button
          type="submit"
          disabled={loading || imageUploading}
          className="flex-1 py-3 bg-brown-900 text-cream font-semibold rounded-xl hover:bg-gold hover:text-brown-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : isEdit ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-6 py-3 bg-brown-100 text-brown-700 font-medium rounded-xl hover:bg-brown-200 transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
