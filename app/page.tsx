"use client"

import { useEffect, useState, Suspense } from "react"
import Navbar from "./components/Navbar"
import HeroBanner from "./components/HeroBanner"
import CategorySection from "./components/CategorySection"
import AboutSection from "./components/AboutSection"
import TestimonialsSection from "./components/TestimonialsSection"
import NewsletterSection from "./components/NewsletterSection"
import SocialMediaSection from "./components/SocialMediaSection"
import Footer from "./components/Footer"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  weight: string
  in_stock: boolean
}

interface CategoryWithProducts {
  category_id: string
  category_name: string
  products: Product[]
}

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([])

  useEffect(() => {
    fetch("https://aatrey-backend.onrender.com/api/products-by-category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories:", err))
  }, [])

  return (
    <div className="min-h-screen gradient-wellness">
      <Navbar />
      <main>
        <HeroBanner />
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
          {categories.slice(0, 3).map((category) => (
            <Suspense key={category.category_id} fallback={<div>Loading...</div>}>
              <CategorySection
                title={category.category_name}
                products={category.products}
                categoryId={category.category_id}
              />
            </Suspense>
          ))}
        </div>

        <AboutSection />
        <TestimonialsSection />
        <NewsletterSection />
        <SocialMediaSection />
      </main>
      <Footer />
    </div>
  )
}
