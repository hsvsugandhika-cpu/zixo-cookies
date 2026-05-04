import { Product, Testimonial } from "@/types"

export const products: Product[] = [
  {
    id: "chocolate-chunk",
    name: "Double Chocolate Chunk",
    description:
      "Rich, indulgent cookies loaded with premium Belgian dark and milk chocolate chunks. Baked to perfection with a crispy edge and gooey center.",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80",
    ],
    category: "Chocolate",
    weight: "200g (6 pcs)",
    ingredients: ["Belgian Dark Chocolate", "Belgian Milk Chocolate", "Premium Butter", "Organic Eggs", "Madagascar Vanilla"],
    rating: 4.9,
    reviews: 234,
    badge: "Bestseller",
    inStock: true,
  },
  {
    id: "classic-chip",
    name: "Classic Chocolate Chip",
    description:
      "The timeless favorite. Golden-brown cookies studded with premium chocolate chips, delivering that perfect balance of sweet and buttery in every bite.",
    price: 249,
    originalPrice: 329,
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      "https://images.unsplash.com/photo-1625876981498-79b73be06dcf?w=800&q=80",
    ],
    category: "Classic",
    weight: "200g (6 pcs)",
    ingredients: ["Semi-Sweet Chocolate Chips", "Brown Sugar", "Premium Butter", "Organic Eggs", "Sea Salt"],
    rating: 4.8,
    reviews: 189,
    badge: "Popular",
    inStock: true,
  },
  {
    id: "red-velvet",
    name: "Red Velvet Dream",
    description:
      "Luxurious red velvet cookies with cream cheese filling. A showstopper dessert that combines vibrant color with irresistible taste.",
    price: 349,
    originalPrice: 449,
    image: "https://images.unsplash.com/photo-1618923850107-d1a2f7b4640a?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1618923850107-d1a2f7b4640a?w=800&q=80",
      "https://images.unsplash.com/photo-1625876981498-79b73be06dcf?w=800&q=80",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80",
    ],
    category: "Premium",
    weight: "200g (6 pcs)",
    ingredients: ["Cocoa Powder", "Cream Cheese", "Red Food Coloring", "Premium Butter", "Vanilla Extract"],
    rating: 4.9,
    reviews: 156,
    badge: "Premium",
    inStock: true,
  },
  {
    id: "matcha-white",
    name: "Matcha White Chocolate",
    description:
      "Japanese ceremonial grade matcha meets sweet white chocolate. An exotic fusion that's both earthy and sweet.",
    price: 329,
    originalPrice: 429,
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
    ],
    category: "Exotic",
    weight: "200g (6 pcs)",
    ingredients: ["Ceremonial Matcha", "White Chocolate", "Premium Butter", "Organic Eggs", "Almond Flour"],
    rating: 4.7,
    reviews: 98,
    inStock: true,
  },
  {
    id: "salted-caramel",
    name: "Salted Caramel Pecan",
    description:
      "Handmade salted caramel swirled into buttery cookie dough with toasted pecans. Sweet, salty, crunchy perfection.",
    price: 349,
    originalPrice: 449,
    image: "https://images.unsplash.com/photo-1625876981498-79b73be06dcf?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1625876981498-79b73be06dcf?w=800&q=80",
      "https://images.unsplash.com/photo-1618923850107-d1a2f7b4640a?w=800&q=80",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80",
    ],
    category: "Premium",
    weight: "200g (6 pcs)",
    ingredients: ["Homemade Caramel", "Toasted Pecans", "Fleur de Sel", "Premium Butter", "Brown Sugar"],
    rating: 4.8,
    reviews: 167,
    badge: "Chef's Special",
    inStock: true,
  },
  {
    id: "pistachio-rose",
    name: "Pistachio & Rose",
    description:
      "An elegant fusion of crushed pistachios and delicate rose water. Inspired by Middle Eastern patisserie traditions.",
    price: 379,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1607114910019-4d46e9d8b385?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1607114910019-4d46e9d8b385?w=800&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
    ],
    category: "Exotic",
    weight: "200g (6 pcs)",
    ingredients: ["Iranian Pistachios", "Rose Water", "Premium Butter", "Organic Eggs", "Cardamom"],
    rating: 4.9,
    reviews: 112,
    badge: "Limited Edition",
    inStock: true,
  },
  {
    id: "oatmeal-raisin",
    name: "Oatmeal Raisin Spice",
    description:
      "Hearty oats, plump raisins, and warm cinnamon come together in this wholesome yet indulgent cookie. Comfort in every bite.",
    price: 229,
    originalPrice: 299,
    image: "https://images.unsplash.com/photo-1584272743101-59b5657592b8?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584272743101-59b5657592b8?w=800&q=80",
      "https://images.unsplash.com/photo-1625876981498-79b73be06dcf?w=800&q=80",
      "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=800&q=80",
    ],
    category: "Classic",
    weight: "200g (6 pcs)",
    ingredients: ["Rolled Oats", "Plump Raisins", "Cinnamon", "Nutmeg", "Premium Butter"],
    rating: 4.6,
    reviews: 145,
    inStock: true,
  },
  {
    id: "lotus-biscoff",
    name: "Lotus Biscoff Blast",
    description:
      "Crushed Biscoff cookies and speculoos spread create an explosion of caramelized flavor. A cookie lover's dream.",
    price: 349,
    originalPrice: 449,
    image: "https://images.unsplash.com/photo-1548365328-8c6db3220e2c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1548365328-8c6db3220e2c?w=800&q=80",
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
    ],
    category: "Premium",
    weight: "200g (6 pcs)",
    ingredients: ["Biscoff Cookies", "Speculoos Spread", "Premium Butter", "Brown Sugar", "Cinnamon"],
    rating: 4.8,
    reviews: 201,
    badge: "New",
    inStock: true,
  },
]

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "PS",
    text: "The Double Chocolate Chunk cookies are absolutely divine! Best cookies I've ever had. The packaging was premium and they arrived fresh.",
    rating: 5,
  },
  {
    id: "2",
    name: "Rahul Mehta",
    avatar: "RM",
    text: "Ordered the gift box for my wife's birthday. She loved it! The Pistachio & Rose flavor is so unique and delicious. Will order again!",
    rating: 5,
  },
  {
    id: "3",
    name: "Ananya Iyer",
    avatar: "AI",
    text: "Fresh, handmade, and absolutely premium. You can taste the quality ingredients. The Salted Caramel Pecan is my family's favorite.",
    rating: 5,
  },
  {
    id: "4",
    name: "Vikram Singh",
    avatar: "VS",
    text: "These cookies are next level! Ordered for a party and everyone was asking where I got them from. The matcha white chocolate is a game changer.",
    rating: 5,
  },
]

export const upiConfig = {
  upiId: "yourbrand@upi",
  brandName: "Zixo Cookies",
}

export const couponCodes: Record<string, { discount: number; type: "percent" | "flat" }> = {
  FRESH10: { discount: 10, type: "percent" },
  SAVE50: { discount: 50, type: "flat" },
  COOKIE20: { discount: 20, type: "percent" },
}

export const whatsappNumber = "918096697748"
export const contactPhone = "+91 8096697748"
export const brandAddress = "Babapet, CPT Road, Narasaraopet, Palnadu District - 522601"
export const supportHours = "9 am to 5 pm"
export const socialLinks = {
  instagram: "https://www.instagram.com/zixo_cookies?igsh=MWY3ZXp6cXFoZmZlMw==",
  youtube: "https://youtube.com/@subhani-04?si=XVOeAa9hhe8QZrNQ",
}
