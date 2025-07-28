"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "../context/CartContext"
import type { Product } from "../types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigating when button is clicked
    addItem(product)
  }

  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="product-card w-full hover:shadow-lg transition border rounded-md overflow-hidden">
        <div className="relative overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-40 sm:h-48 md:h-52 object-cover"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
              {product.discount}% OFF
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm md:text-base">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="p-4 md:p-5">
          <h3 className="font-semibold text-[#2f2f2f] mb-2 md:mb-3 hover:text-[#4a9960] transition-colors line-clamp-2 text-base md:text-lg">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 mb-2 md:mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

          <div className="flex items-center mb-2 md:mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 md:w-4 md:h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm text-gray-600 ml-2 font-medium">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3 md:mb-4 flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-lg md:text-xl font-bold price-primary">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            <span className="text-xs md:text-sm text-[#2d6040] font-medium bg-[#b8d4b8]/20 px-2 py-1 rounded-lg">
              {product.weight}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full mt-1 ${
              product.inStock ? "btn-primary" : "bg-gray-300 cursor-not-allowed"
            } flex items-center justify-center space-x-2 text-sm md:text-base`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
          </Button>
        </div>
      </div>
    </Link>
  )
}
