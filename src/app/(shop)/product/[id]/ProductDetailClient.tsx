"use client"

import { Product } from "@/types"
import { useCartStore } from "@/store/cart"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Minus, Plus, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react"

interface ProductDetailClientProps {
  product: Product
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [added, setAdded] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAdd = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <section className="py-6 sm:py-12 bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-dark-card aspect-square mb-3 sm:mb-4 border border-dark-border"
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-3 py-1 sm:px-4 sm:py-1.5 bg-gold text-white text-xs sm:text-sm font-semibold rounded-full">
                  {product.badge}
                </span>
              )}
            </motion.div>

            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index ? "border-gold" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:py-4">
            {product.badge && (
              <span className="inline-block px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full mb-3 sm:mb-4">
                {product.badge}
              </span>
            )}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-cream">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-brown-200"}`}
                  />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-brown-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 mt-4 sm:mt-6 flex-wrap">
              <span className="text-2xl sm:text-3xl font-bold text-cream">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-base sm:text-xl text-brown-400 line-through">₹{product.originalPrice}</span>
                  <span className="px-2 py-0.5 sm:py-1 bg-green-900/30 text-green-400 text-xs sm:text-sm font-medium rounded-full">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                </>
              )}
            </div>

            <p className="text-sm sm:text-base text-brown-400 mt-4 sm:mt-6 leading-relaxed">{product.description}</p>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-dark-card rounded-lg sm:rounded-xl border border-dark-border">
              <p className="text-xs sm:text-sm font-semibold text-cream mb-1 sm:mb-2">Weight</p>
              <p className="text-sm text-brown-600">{product.weight}</p>
            </div>

            <div className="mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm font-semibold text-cream mb-2 sm:mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-dark-border flex items-center justify-center hover:bg-dark-border transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 sm:w-12 text-center font-semibold text-base sm:text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-dark-border flex items-center justify-center hover:bg-dark-border transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <motion.button
              whileTap={mounted ? { scale: 0.98 } : undefined}
              onClick={handleAdd}
              className={`w-full mt-6 sm:mt-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 ${
                mounted && added
                  ? "bg-green-500 text-white"
                  : "bg-gold text-brown-900 hover:bg-gold-light"
              }`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {mounted && added ? "Added to Cart!" : `Add to Cart - ₹${product.price * quantity}`}
            </motion.button>

            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: ShieldCheck, text: "Secure Payment" },
                { icon: RotateCcw, text: "Fresh Guarantee" },
              ].map((item) => (
                <div key={item.text} className="text-center p-2 sm:p-3 bg-dark-card rounded-lg sm:rounded-xl border border-dark-border">
                  <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-gold mb-1" />
                  <p className="text-[10px] sm:text-xs text-brown-600">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <h3 className="font-semibold text-sm sm:text-base text-cream mb-2 sm:mb-3">Premium Ingredients</h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {product.ingredients.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-dark-card border border-dark-border text-cream text-xs sm:text-sm rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
