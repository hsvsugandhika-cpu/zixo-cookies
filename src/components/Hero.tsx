"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-brown-900">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1600&q=80"
          alt="Premium cookies background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown-900/95 via-brown-900/85 to-brown-900/95" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-gold/20 text-gold text-sm font-semibold rounded-full mb-6"
          >
            Handcrafted with Premium Ingredients
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-bold text-cream leading-tight"
          >
            Freshly Baked.
            <br />
            <span className="text-gold">Delivered with Love.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-brown-900 font-semibold rounded-full hover:bg-gold-light transition-colors"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
