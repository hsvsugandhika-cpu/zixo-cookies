export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  weight: string
  ingredients: string[]
  rating: number
  reviews: number
  badge?: string
  inStock: boolean
}

export type ProductFormData = Omit<Product, "id" | "rating" | "reviews">

export interface CartItem {
  product: Product
  quantity: number
}

export interface CustomerDetails {
  name: string
  phone: string
  address: string
  pincode: string
  city: string
  state: string
}

export interface Order {
  id: string
  customerDetails: CustomerDetails
  cartItems: CartItem[]
  totalAmount: number
  paymentMethod: "upi" | "cod"
  paymentScreenshotUrl?: string
  transactionId?: string
  upiIntentUrl?: string
  orderStatus: "Pending" | "Confirmed" | "Rejected"
  couponCode?: string
  discountAmount: number
  createdAt: string
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  text: string
  rating: number
}
