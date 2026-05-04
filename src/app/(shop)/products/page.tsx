import { products } from "@/data"
import { ProductCard } from "@/components/ProductCard"

export default function ProductsPage() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-14">
          <span className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-widest">
            Our Collection
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-cream mt-2 sm:mt-3">
            Premium Cookies
          </h1>
          <p className="text-brown-500 mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base px-4">
            Each cookie is a masterpiece, handcrafted with the finest ingredients and baked to perfection.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
