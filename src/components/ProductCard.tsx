"use client"

import { Product } from "@/types"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag } from "lucide-react"
import { useCartStore } from "@/store/cart"
import { useState, useEffect } from "react"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const [added, setAdded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-brown-50 h-[120px] sm:h-[160px] mb-2 sm:mb-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.badge && (
            <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 bg-gold text-white text-[10px] sm:text-xs font-semibold rounded-full">
              {product.badge}
            </span>
          )}
          {product.originalPrice && (
            <span className="absolute top-2 right-2 sm:top-3 sm:right-3 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-brown-900/80 text-cream text-[10px] sm:text-xs font-medium rounded-full">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </Link>

      <div className="px-0.5 sm:px-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-playfair text-sm sm:text-lg font-semibold text-brown-900 group-hover:text-gold transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-[10px] sm:text-sm text-brown-500 mt-0.5 sm:mt-1">{product.weight}</p>
        <div className="flex items-center justify-between mt-1.5 sm:mt-3">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-base sm:text-xl font-bold text-brown-900">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-sm text-brown-400 line-through hidden sm:inline">₹{product.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileTap={mounted ? { scale: 0.95 } : undefined}
            onClick={handleAdd}
            className={`flex items-center gap-1 sm:gap-2 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-sm font-medium transition-all duration-300 ${
              mounted && added
                ? "bg-green-500 text-white"
                : "bg-brown-900 text-cream hover:bg-gold"
            }`}
          >
            <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{mounted && added ? "Added" : "Add"}</span>
            <span className="sm:hidden">{mounted && added ? "✓" : "+"}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
