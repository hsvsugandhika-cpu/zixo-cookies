"use client"

import { useCartStore } from "@/store/cart"
import Link from "next/link"
import { motion } from "framer-motion"
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight } from "lucide-react"

export default function CartPage() {
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)
  const removeFromCart = useCartStore((state) => state.removeFromCart)
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  if (items.length === 0) {
    return (
      <section className="py-16 sm:py-24 bg-cream min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <ShoppingBag className="w-14 h-14 sm:w-16 sm:h-16 mx-auto text-brown-200 mb-6" />
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-brown-900 mb-3">
            Your cart is empty
          </h2>
          <p className="text-brown-500 mb-8 text-sm sm:text-base">
            Looks like you have not added any cookies to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-brown-900 text-cream font-semibold rounded-full hover:bg-gold hover:text-brown-900 transition-colors text-sm sm:text-base"
          >
            Browse Cookies
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-6 sm:py-12 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-brown-900 mb-6 sm:mb-10">
          Your Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {items.map((item) => (
              <motion.div
                layout
                key={item.product.id}
                className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm"
              >
                <Link href={`/product/${item.product.id}`} className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.product.id}`}>
                    <h3 className="font-playfair font-semibold text-brown-900 truncate hover:text-gold transition-colors text-sm sm:text-base">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-xs sm:text-sm text-brown-500 mt-0.5 sm:mt-1">{item.product.weight}</p>
                  <p className="font-bold text-brown-900 mt-1 sm:mt-2 text-sm sm:text-base">₹{item.product.price}</p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-1.5 text-brown-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-brown-200 flex items-center justify-center hover:bg-brown-50"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 sm:w-8 text-center font-semibold text-xs sm:text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-brown-200 flex items-center justify-center hover:bg-brown-50"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-brown-900 mb-4">Order Summary</h3>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex justify-between text-sm sm:text-base text-brown-600">
                  <span>Subtotal</span>
                  <span>₹{getTotal()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-brown-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="border-t border-brown-100 pt-2 sm:pt-3 flex justify-between">
                  <span className="font-bold text-brown-900 text-base sm:text-lg">Total</span>
                  <span className="font-bold text-brown-900 text-base sm:text-lg">₹{getTotal()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-3 sm:py-4 bg-brown-900 text-cream font-semibold rounded-full hover:bg-gold hover:text-brown-900 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Proceed to Checkout
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
