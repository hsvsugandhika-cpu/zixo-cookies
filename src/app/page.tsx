import { Hero } from "@/components/Hero"
import { FeaturedProducts } from "@/components/FeaturedProducts"
import { WhyChooseUs } from "@/components/WhyChooseUs"
import { Testimonials } from "@/components/Testimonials"

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
    </>
  )
}
