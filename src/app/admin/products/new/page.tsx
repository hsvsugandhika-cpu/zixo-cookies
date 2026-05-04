"use client"

import { ProductForm } from "@/components/admin/ProductForm"

export default function AddProductPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-playfair font-bold text-brown-900">Add Product</h1>
        <p className="text-sm text-brown-500 mt-1">Create a new cookie product</p>
      </div>
      <div className="bg-brown-900 rounded-2xl p-4 sm:p-6 shadow-sm">
        <ProductForm />
      </div>
    </div>
  )
}
