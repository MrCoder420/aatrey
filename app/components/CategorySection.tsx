"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import type { Product } from "../types"
import ProductCard from "./ProductCard"

interface CategorySectionProps {
  title: string
  products: Product[]
  categoryId: string
}

export default function CategorySection({ title, products, categoryId }: CategorySectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  if (!products || products.length === 0) return null

  return (
    <section className="category-section mb-8 md:mb-12 px-4 md:px-0">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h2>
        <Link href={`/products?category=${encodeURIComponent(title)}`}>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2">
            View All
          </Button>
        </Link>
      </div>

      <div className="relative">
        {/* Scroll Buttons - Hidden on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Scrollable Product Cards */}
        <div
          ref={scrollRef}
          className="flex space-x-2 md:space-x-4 overflow-x-auto pb-4 no-scrollbar"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-40 sm:w-48 md:w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
