"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle, Package, ChevronRight, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const orderId = searchParams.get("orderId") || ""
  const total = searchParams.get("total") || ""
  const method = searchParams.get("method") || "upi"

  const whatsappNumber = "918096697748"
  const whatsappMessage = encodeURIComponent(
    `Hi! I just placed an order on Zixo Cookies.\n\nOrder ID: ${orderId}\nAmount: ₹${total}\nPayment: ${method === "upi" ? "UPI (Pending Verification)" : "Cash on Delivery"}\n\nPlease confirm my order. Thank you!`
  )

  return (
    <section className="py-12 sm:py-24 bg-black min-h-[70vh] flex items-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-cream mb-2 sm:mb-3"
        >
          Order Placed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-brown-500 mb-6 sm:mb-8 text-sm sm:text-base"
        >
          Thank you for your order. We will verify your payment and confirm shortly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-brown-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <Package className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
            <span className="text-xs sm:text-sm text-brown-500">Order ID</span>
          </div>
          <p className="font-mono text-lg sm:text-2xl font-bold text-cream mb-1 sm:mb-2">{orderId}</p>
          <p className="text-sm sm:text-base text-brown-600">Amount: ₹{total}</p>
          {method === "upi" && mounted && (
            <p className="text-xs sm:text-sm text-amber-600 mt-2 sm:mt-3">
              Your payment is being verified. We will confirm within 30 minutes.
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.5 }}
          className="space-y-3 sm:space-y-4"
        >
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 sm:py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            Confirm via WhatsApp
          </a>

          <Link
            href="/products"
            className="w-full py-3 sm:py-4 bg-brown-900 text-cream font-semibold rounded-full hover:bg-gold hover:text-cream transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            Continue Shopping
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
