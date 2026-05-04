"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { auth } from "@/lib/firebase"
import { logoutAdmin } from "@/lib/firebase-utils"
import { LogOut, Package, ShoppingCart, Plus } from "lucide-react"
import Link from "next/link"
import { WhatsAppButton } from "@/components/WhatsAppButton"

const adminNav = [
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/products/new", label: "Add Product", icon: Plus },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/admin/login")
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleLogout = async () => {
    await logoutAdmin()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-brown-50 flex flex-col sm:flex-row">
      <aside className="sm:w-56 bg-brown-900 text-cream flex-shrink-0">
        <div className="p-4 border-b border-brown-800">
          <Link href="/admin/orders" className="flex items-center gap-2">
            <span className="text-xl font-playfair font-bold">
              Zixo <span className="text-gold">Cookies</span>
            </span>
          </Link>
          <p className="text-brown-400 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="p-3 space-y-1">
          {adminNav.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gold/20 text-gold"
                    : "text-brown-300 hover:bg-brown-800 hover:text-cream"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}

          <div className="pt-4 mt-4 border-t border-brown-800">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-brown-400 hover:bg-brown-800 hover:text-red-400 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </nav>
      </aside>

      <main className="flex-1 min-h-screen">{children}</main>
      <WhatsAppButton />
    </div>
  )
}
