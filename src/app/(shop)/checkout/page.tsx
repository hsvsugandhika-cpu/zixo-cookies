"use client"

import { useCartStore } from "@/store/cart"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { motion } from "framer-motion"
import { upiConfig, couponCodes, whatsappNumber } from "@/data"
import { CustomerDetails } from "@/types"
import { uploadScreenshot, saveOrder } from "@/lib/firebase-utils"
import { Loader2, Copy, Check, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const getTotal = useCartStore((state) => state.getTotal)
  const clearCart = useCartStore((state) => state.clearCart)

  const [formData, setFormData] = useState<CustomerDetails>({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  })

  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi")
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [discount, setDiscount] = useState(0)
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [transactionId, setTransactionId] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")

  const subtotal = getTotal()
  const total = subtotal - discount

  const generateOrderId = () => `CL${Date.now().toString(36).toUpperCase()}`

  const generateUpiLink = () => {
    return `upi://pay?pa=${upiConfig.upiId}&pn=${encodeURIComponent(upiConfig.brandName)}&am=${total}&cu=INR`
  }

  const handleCoupon = () => {
    const coupon = couponCodes[couponCode.toUpperCase()]
    if (coupon) {
      const discountAmount =
        coupon.type === "percent"
          ? Math.round(subtotal * (coupon.discount / 100))
          : coupon.discount
      setDiscount(discountAmount)
      setCouponApplied(true)
    } else {
      setError("Invalid coupon code")
      setTimeout(() => setError(""), 3000)
    }
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.pincode || !formData.city) {
      setError("Please fill in all required fields")
      return
    }

    if (paymentMethod === "upi" && (!screenshot || !transactionId)) {
      setError("Please upload payment screenshot and enter transaction ID")
      return
    }

    setLoading(true)
    setError("")

    try {
      const orderId = generateOrderId()
      let screenshotUrl = ""

      if (screenshot) {
        screenshotUrl = await uploadScreenshot(screenshot, orderId)
      }

      const orderData = {
        id: orderId,
        customerDetails: formData,
        cartItems: items.map((item) => ({
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            image: item.product.image,
          },
          quantity: item.quantity,
        })),
        totalAmount: total,
        paymentMethod,
        paymentScreenshotUrl: screenshotUrl,
        transactionId: paymentMethod === "upi" ? transactionId : "N/A",
        orderStatus: paymentMethod === "upi" ? "Pending" : "Confirmed",
        couponCode: couponApplied ? couponCode.toUpperCase() : undefined,
        discountAmount: discount,
        createdAt: new Date().toISOString(),
      }

      await saveOrder(orderData as Record<string, unknown>)
      clearCart()

      const params = new URLSearchParams({
        orderId,
        total: total.toString(),
        method: paymentMethod,
      })
      router.push(`/order-success?${params.toString()}`)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const copyUpiId = () => {
    navigator.clipboard.writeText(upiConfig.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (items.length === 0) {
    return (
      <section className="py-16 sm:py-24 bg-black min-h-[60vh] flex items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="text-brown-500 mb-6 text-sm sm:text-base">Your cart is empty. Add some delicious cookies first!</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-brown-900 text-cream font-semibold rounded-full hover:bg-gold hover:text-brown-900 transition-colors text-sm sm:text-base"
          >
            <ChevronLeft className="w-4 h-4" />
            Browse Cookies
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-6 sm:py-12 bg-black min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/cart" className="inline-flex items-center gap-1.5 text-sm text-brown-600 hover:text-brown-900 mb-4 sm:mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-playfair font-bold text-brown-900 mb-6 sm:mb-10">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-brown-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
              <h2 className="font-playfair text-lg sm:text-xl font-bold text-brown-900 mb-4">Delivery Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brown-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-brown-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-brown-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-brown-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-brown-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    placeholder="400001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-brown-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    placeholder="Maharashtra"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brown-700 mb-1">Full Address *</label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-brown-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold resize-none"
                    placeholder="House No, Street, Landmark..."
                  />
                </div>
              </div>
            </div>

            <div className="bg-brown-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
              <h2 className="font-playfair text-lg sm:text-xl font-bold text-brown-900 mb-4">Payment Method</h2>
              <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base font-medium transition-all ${
                    paymentMethod === "upi"
                      ? "border-gold bg-gold/10 text-brown-900"
                      : "border-brown-200 text-brown-500 hover:border-brown-300"
                  }`}
                >
                  UPI Payment
                </button>
                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 text-sm sm:text-base font-medium transition-all ${
                    paymentMethod === "cod"
                      ? "border-gold bg-gold/10 text-brown-900"
                      : "border-brown-200 text-brown-500 hover:border-brown-300"
                  }`}
                >
                  COD
                </button>
              </div>

              {paymentMethod === "upi" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-brown-50 rounded-lg sm:rounded-xl"
                >
                  <div className="flex items-center justify-between p-2.5 sm:p-3 bg-brown-900 rounded-lg">
                    <div>
                      <p className="text-xs sm:text-sm text-brown-500">UPI ID</p>
                      <p className="font-mono text-sm sm:text-base font-semibold text-brown-900">{upiConfig.upiId}</p>
                    </div>
                    <button
                      onClick={copyUpiId}
                      className="p-2 hover:bg-brown-100 rounded-lg transition-colors"
                      aria-label="Copy UPI ID"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-brown-500" />
                      )}
                    </button>
                  </div>

                  <a
                    href={generateUpiLink()}
                    className="block w-full py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-lg sm:rounded-xl text-center hover:bg-green-700 transition-colors text-sm sm:text-base"
                  >
                    Pay ₹{total} via UPI
                  </a>

                  <div className="text-xs sm:text-sm text-brown-500 text-center">
                    Clicking above will open PhonePe / GPay / Paytm
                  </div>

                  <div className="space-y-3 pt-1 sm:pt-2">
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-1">Transaction ID *</label>
                      <input
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-brown-200 rounded-lg sm:rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                        placeholder="Enter UPI transaction reference"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-1">
                        Payment Screenshot *
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
                        className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 border border-brown-200 rounded-lg sm:rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:bg-gold/10 file:text-brown-900 file:font-medium file:text-sm file:cursor-pointer"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {paymentMethod === "cod" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 sm:p-4 bg-brown-50 rounded-lg sm:rounded-xl"
                >
                  <p className="text-xs sm:text-sm text-brown-600">
                    Pay cash when your order is delivered. Please keep exact change ready.
                  </p>
                </motion.div>
              )}
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm bg-red-50 p-3 rounded-lg sm:rounded-xl"
              >
                {error}
              </motion.p>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-brown-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-brown-900 mb-3 sm:mb-4">Order Summary</h3>

              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 max-h-40 sm:max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-xs sm:text-sm">
                    <span className="text-brown-600">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="font-medium">₹{item.product.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="mb-3 sm:mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-brown-200 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold"
                    placeholder="Coupon code"
                    disabled={couponApplied}
                  />
                  <button
                    onClick={handleCoupon}
                    disabled={couponApplied || !couponCode}
                    className="px-3 sm:px-4 py-2 sm:py-2.5 bg-brown-900 text-cream text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl hover:bg-gold hover:text-brown-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {couponApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-green-600 text-xs sm:text-sm mt-2">Coupon applied! You saved ₹{discount}</p>
                )}
              </div>

              <div className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 pt-2 sm:pt-3 sm:border-t sm:border-brown-100">
                <div className="flex justify-between text-xs sm:text-sm text-brown-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs sm:text-sm text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs sm:text-sm text-brown-600">
                  <span>Delivery</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-brown-100">
                  <span className="font-bold text-brown-900 text-base sm:text-lg">Total</span>
                  <span className="font-bold text-brown-900 text-base sm:text-lg">₹{total}</span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 sm:py-4 bg-brown-900 text-cream font-semibold rounded-full hover:bg-gold hover:text-brown-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order - ₹${total}`
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
