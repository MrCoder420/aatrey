"use client"

import Link from "next/link"
import { Home, ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fdf8]">
      <Navbar />

      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold text-[#b8d4b8] mb-4">404</div>
            <div className="w-32 h-1 bg-[#4a9960] mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-[#2d6040] mb-4">Oops! Page Not Found</h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            The page you're looking for seems to have wandered off like a lost herb in the forest. Don't worry, we'll
            help you find your way back to wellness!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button className="btn-primary flex items-center space-x-2">
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </Button>
            </Link>

            <Link href="/products">
              <Button
                variant="outline"
                className="border-[#b8d4b8] text-[#2d6040] hover:bg-[#b8d4b8]/10 flex items-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Browse Products</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              onClick={() => window.history.back()}
              className="text-[#2d6040] hover:bg-[#b8d4b8]/10 flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-[#b8d4b8]/30">
            <p className="text-gray-600 mb-4">Looking for something specific? Try these popular pages:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/products" className="text-[#4a9960] hover:text-[#2d6040] font-medium">
                All Products
              </Link>
              <Link href="/about" className="text-[#4a9960] hover:text-[#2d6040] font-medium">
                About Us
              </Link>
              <Link href="/contact" className="text-[#4a9960] hover:text-[#2d6040] font-medium">
                Contact Support
              </Link>
              <Link href="/cart" className="text-[#4a9960] hover:text-[#2d6040] font-medium">
                Shopping Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
