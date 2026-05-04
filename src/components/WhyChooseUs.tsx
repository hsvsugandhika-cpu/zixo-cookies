"use client"

import { motion } from "framer-motion"
import { Star, Leaf, HandHeart, Award, Truck } from "lucide-react"

const features = [
  {
    icon: HandHeart,
    title: "Handmade with Love",
    description: "Every cookie is carefully crafted by hand, ensuring perfection in every batch.",
  },
  {
    icon: Leaf,
    title: "Premium Ingredients",
    description: "We source the finest Belgian chocolate, Iranian pistachios, and Madagascar vanilla.",
  },
  {
    icon: Award,
    title: "Freshly Baked Daily",
    description: "Baked fresh every morning and delivered the same day for maximum freshness.",
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Same-day delivery available in select cities. Your cookies arrive at their best.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-24 bg-brown-900 text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold text-sm font-semibold uppercase tracking-widest"
          >
            The Zixo Cookies Promise
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold mt-3"
          >
            Why Choose Us
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brown-800 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-brown-300 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
