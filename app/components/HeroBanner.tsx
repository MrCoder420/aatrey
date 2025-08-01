"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Banner {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  cta_text: string
  cta_link: string
}

export default function HeroBanner() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    // ✅ Fetch only hero banners from your new endpoint
    fetch("https://aatrey-backend.onrender.com/api/banners/hero")
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error("Failed to load hero banners:", err))
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [banners.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  if (banners.length === 0) return null

  return (
    <div className="hero-banner relative overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div
            className="w-full h-full hero-content"
            style={{
              backgroundImage: `linear-gradient(rgba(47,47,47,0.4), rgba(47,47,47,0.4)), url(${banner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="container mx-auto px-3 sm:px-4 lg:px-6 h-full flex items-center text-white">
              <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
                <h2 className="text-sm sm:text-base md:text-lg text-[#b8d4b8] tracking-wide mb-2 sm:mb-3">{banner.subtitle}</h2>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-shadow leading-tight mb-3 sm:mb-4 md:mb-6">{banner.title}</h1>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">{banner.description}</p>
                <Link href={banner.cta_link || "/products"}>
                  <Button className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 font-semibold w-full sm:w-auto rounded-lg">
                    {banner.cta_text || "Shop Now"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="scroll-btn absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 hidden sm:flex"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="scroll-btn absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 hidden sm:flex"
        onClick={nextSlide}
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
