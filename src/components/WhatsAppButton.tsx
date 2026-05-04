"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useEffect, useState } from "react"

export function WhatsAppButton() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <motion.a
      href="https://wa.me/918096697748"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 right-5 z-50 w-12 h-12 sm:w-14 sm:h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
    </motion.a>
  )
}
