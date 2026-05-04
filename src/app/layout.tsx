import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Zixo Cookies | Premium Handcrafted Cookies",
  description:
    "Freshly baked, handmade premium cookies crafted with the finest ingredients. Delivered with love to your doorstep.",
  keywords: ["premium cookies", "handmade cookies", "luxury desserts", "fresh cookies delivery"],
  authors: [{ name: "Zixo Cookies" }],
  openGraph: {
    title: "Zixo Cookies | Premium Handcrafted Cookies",
    description: "Freshly Baked. Delivered with Love.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-cream text-brown-900 flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
