"use client"

import { motion } from "framer-motion"
import { products } from "@/data"
import { ProductCard } from "@/components/ProductCard"
import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function FeaturedProducts() {
  const featured = products.slice(0, 4)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [mounted, setMounted] = useState(false)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    setMounted(true)
    checkScroll()
    const el = scrollRef.current
    el?.addEventListener("scroll", checkScroll)
    return () => el?.removeEventListener("scroll", checkScroll)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-12 sm:py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-cream"
          >
            Bestsellers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brown-400 mt-3 max-w-md mx-auto text-sm sm:text-base"
          >
            Our most loved cookies, crafted to perfection
          </motion.p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-5 overflow-x-auto pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featured.map((product, index) => (
              <div key={product.id} className="min-w-[180px] sm:min-w-[220px] max-w-[220px] snap-start flex-shrink-0">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>

          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-9 h-9 sm:w-10 sm:h-10 bg-dark-card/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-dark-border transition-colors z-10"
               aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-brown-300" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-9 h-9 sm:w-10 sm:h-10 bg-dark-card/90 backdrop-blur rounded-full shadow-lg flex items-center justify-center hover:bg-dark-border transition-colors z-10"
               aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-brown-300" />
            </button>
          )}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <a
            href="/products"
            className="inline-flex items-center gap-2 text-brown-300 hover:text-gold transition-colors font-medium text-sm"
          >
            View All Cookies
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
