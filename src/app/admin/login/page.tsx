"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { loginAdmin } from "@/lib/firebase-utils"
import { motion } from "framer-motion"
import { Loader2, Cookie } from "lucide-react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await SignINWithemailAndPassword(auth,email, password)
      router.push("/admin/orders")
    } catch (err) {
      setError("Invalid credentials. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen bg-brown-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-brown-800 rounded-2xl flex items-center justify-center">
            <Cookie className="w-8 h-8 text-gold" />
          </div>
          <h1 className="text-3xl font-playfair font-bold text-cream">
            Zixo <span className="text-gold">Cookies</span>
          </h1>
          <p className="text-brown-300 mt-2">Admin Panel</p>
        </div>

        <form onSubmit={handleLogin} className="bg-brown-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-cream mb-6">Sign In</h2>

          {error && (
            <p className="text-red-400 text-sm bg-red-900/30 p-3 rounded-xl mb-4">{error}</p>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brown-200 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-brown-700 border border-brown-600 rounded-xl text-cream placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                placeholder="admin@cookieluxe.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brown-200 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-brown-700 border border-brown-600 rounded-xl text-cream placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 py-4 bg-gold text-brown-900 font-semibold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </motion.div>
    </section>
  )
}
