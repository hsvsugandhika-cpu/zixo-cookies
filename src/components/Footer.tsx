import Link from "next/link"
import { Camera, Mail, Phone, Play, MapPin } from "lucide-react"
import { contactPhone, brandAddress, supportHours, socialLinks } from "@/data"

export function Footer() {
  return (
    <footer className="bg-brown-900 text-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <div className="sm:col-span-2">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-playfair font-bold text-cream mb-3 sm:mb-4">
              Zixo <span className="text-gold">Cookies</span>
            </h3>
            <p className="text-brown-300 max-w-sm mb-5 text-sm sm:text-base leading-relaxed">
              Handcrafted with love, baked to perfection. Every cookie tells a story of premium ingredients
              and passionate baking.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 bg-brown-800 rounded-full hover:bg-brown-700 transition-colors"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 bg-brown-800 rounded-full hover:bg-brown-700 transition-colors"
                aria-label="YouTube"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://wa.me/918096697748"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 bg-brown-800 rounded-full hover:bg-brown-700 transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-cream mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              <li>
                <Link href="/" className="text-brown-300 hover:text-gold transition-colors text-sm sm:text-base">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-brown-300 hover:text-gold transition-colors text-sm sm:text-base">
                  All Cookies
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-brown-300 hover:text-gold transition-colors text-sm sm:text-base">
                  Your Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-cream mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base">
              <li className="flex items-start gap-2 text-brown-300">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold" />
                <span>{brandAddress}</span>
              </li>
              <li className="flex items-center gap-2 text-brown-300">
                <Phone className="w-4 h-4 flex-shrink-0 text-gold" />
                <a href="tel:+918096697748" className="hover:text-gold transition-colors">{contactPhone}</a>
              </li>
              <li className="flex items-center gap-2 text-brown-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-gold" />
                <span>Support: {supportHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brown-800 mt-8 sm:mt-10 pt-6 sm:pt-8 text-center text-brown-400 text-xs sm:text-sm">
          <p>© 2026 Zixo Cookies. All rights reserved. Made with love.</p>
        </div>
      </div>
    </footer>
  )
}
