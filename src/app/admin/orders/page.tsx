"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { logoutAdmin } from "@/lib/firebase-utils"
import { Order } from "@/types"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, Clock, Package, Image as ImageIcon } from "lucide-react"

export default function AdminOrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<(Order & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "Pending" | "Confirmed" | "Rejected">("all")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/admin/login")
      } else {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (Order & { id: string })[]
      setOrders(ordersData)
    })

    return () => unsubscribe()
  }, [])

  const handleStatusUpdate = async (orderId: string, status: "Confirmed" | "Rejected") => {
    const orderRef = doc(db, "orders", orderId)
    await updateDoc(orderRef, { orderStatus: status })
  }

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter)

  const pendingCount = orders.filter((o) => o.orderStatus === "Pending").length
  const confirmedCount = orders.filter((o) => o.orderStatus === "Confirmed").length
  const rejectedCount = orders.filter((o) => o.orderStatus === "Rejected").length

  if (loading) {
    return (
      <div className="min-h-screen bg-brown-50 flex items-center justify-center">
        <div className="animate-pulse text-brown-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-playfair font-bold text-brown-900">Orders</h1>
        <p className="text-sm text-brown-500 mt-1">Manage and track all customer orders</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: "Total Orders", value: orders.length, icon: Package, color: "text-brown-900" },
          { label: "Pending", value: pendingCount, icon: Clock, color: "text-amber-600" },
          { label: "Confirmed", value: confirmedCount, icon: CheckCircle, color: "text-green-600" },
          { label: "Rejected", value: rejectedCount, icon: XCircle, color: "text-red-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
            </div>
            <p className={`text-xl sm:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs sm:text-sm text-brown-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(["all", "Pending", "Confirmed", "Rejected"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
              filter === status
                ? "bg-brown-900 text-cream"
                : "bg-white text-brown-600 hover:bg-brown-100"
            }`}
          >
            {status === "all" ? "All Orders" : status}
          </button>
        ))}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-sm">
            <Package className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-brown-200 mb-3 sm:mb-4" />
            <p className="text-brown-500 text-sm sm:text-base">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <motion.div
              layout
              key={order.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden"
            >
              <div className="p-3 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div>
                    <h3 className="font-mono font-bold text-brown-900 text-sm sm:text-base">{order.id}</h3>
                    <p className="text-xs sm:text-sm text-brown-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span
                      className={`px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-medium ${
                        order.orderStatus === "Pending"
                          ? "bg-amber-100 text-amber-700"
                          : order.orderStatus === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                    <span className="font-bold text-brown-900 text-base sm:text-lg">₹{order.totalAmount}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 p-3 sm:p-4 bg-brown-50 rounded-lg sm:rounded-xl">
                  <div>
                    <p className="text-xs sm:text-sm text-brown-500 mb-1">Customer</p>
                    <p className="font-semibold text-brown-900 text-sm">{order.customerDetails.name}</p>
                    <p className="text-xs sm:text-sm text-brown-600">{order.customerDetails.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-brown-500 mb-1">Address</p>
                    <p className="text-xs sm:text-sm text-brown-600">{order.customerDetails.address}</p>
                    <p className="text-xs sm:text-sm text-brown-600">
                      {order.customerDetails.city} - {order.customerDetails.pincode}
                    </p>
                  </div>
                </div>

                <div className="mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-brown-500 mb-2">Items</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {order.cartItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-brown-100 text-brown-700 text-xs sm:text-sm rounded-full"
                      >
                        {item.product.name} × {item.quantity}
                      </span>
                    ))}
                  </div>
                </div>

                {order.paymentMethod === "upi" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="p-2.5 sm:p-3 bg-brown-50 rounded-lg">
                      <p className="text-xs sm:text-sm text-brown-500 mb-1">Transaction ID</p>
                      <p className="font-mono text-xs sm:text-sm font-semibold text-brown-900">
                        {order.transactionId}
                      </p>
                    </div>
                    {order.paymentScreenshotUrl && (
                      <div className="p-2.5 sm:p-3 bg-brown-50 rounded-lg">
                        <p className="text-xs sm:text-sm text-brown-500 mb-1">Payment Screenshot</p>
                        <a
                          href={order.paymentScreenshotUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 sm:gap-2 text-gold hover:text-gold-light transition-colors"
                        >
                          <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">View Screenshot</span>
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {order.couponCode && (
                  <p className="text-xs sm:text-sm text-green-600 mb-3 sm:mb-4">
                    Coupon: {order.couponCode} (Saved ₹{order.discountAmount})
                  </p>
                )}

                {order.orderStatus === "Pending" && (
                  <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-brown-100">
                    <button
                      onClick={() => handleStatusUpdate(order.id, "Confirmed")}
                      className="flex-1 py-2.5 sm:py-3 bg-green-500 text-white font-medium rounded-lg sm:rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                    >
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order.id, "Rejected")}
                      className="flex-1 py-2.5 sm:py-3 bg-red-500 text-white font-medium rounded-lg sm:rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                    >
                      <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
