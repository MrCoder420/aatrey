"use client"

import { useEffect, useState, Suspense, memo, useMemo, useCallback } from "react"
import dynamic from "next/dynamic"
import Navbar from "./components/Navbar"
import HeroBanner from "./components/HeroBanner"

// Lazy load heavy components
const CategorySection = dynamic(() => import("./components/CategorySection"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg mb-6"></div>,
  ssr: false
})

const AboutSection = dynamic(() => import("./components/AboutSection"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>,
  ssr: false
})

const TestimonialsSection = dynamic(() => import("./components/TestimonialsSection"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-80 rounded-lg"></div>,
  ssr: false
})

const NewsletterSection = dynamic(() => import("./components/NewsletterSection"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  ssr: false
})

const SocialMediaSection = dynamic(() => import("./components/SocialMediaSection"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  ssr: false
})

const Footer = dynamic(() => import("./components/Footer"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>,
  ssr: false
})

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

// Memoized CategorySection to prevent unnecessary re-renders
const MemoizedCategorySection = memo(CategorySection)

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryWithProducts[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout
      
      const res = await fetch("http://localhost:3000/api/products-by-category", {
        signal: controller.signal,
        headers: {
          'Cache-Control': 'max-age=300', // Cache for 5 minutes
        }
      })
      
      clearTimeout(timeoutId)
      
      if (!res.ok) throw new Error('Failed to fetch')
      
      const data = await res.json()
      setCategories(data)
    } catch (err) {
      console.error("Error loading categories:", err)
      // Fallback empty categories
      setCategories([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  // Memoize the filtered categories to prevent unnecessary recalculations
  const displayCategories = useMemo(() => categories.slice(0, 3), [categories])

  return (
    <div className="min-h-screen gradient-wellness">
      <Navbar />
      <main>
        <HeroBanner />
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
              ))}
            </div>
          ) : (
            displayCategories.map((category) => (
              <Suspense key={category.category_id} fallback={
                <div className="animate-pulse bg-gray-200 h-64 rounded-lg mb-6"></div>
              }>
                <MemoizedCategorySection
                  title={category.category_name}
                  products={category.products}
                  categoryId={category.category_id}
                />
              </Suspense>
            ))
          )}
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
