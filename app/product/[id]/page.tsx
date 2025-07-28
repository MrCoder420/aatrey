"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Minus, Plus, RotateCcw, Share2, Shield, ShoppingCart, Star, Truck } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import ProductCard from "../../components/ProductCard"
import { useCart } from "../../context/CartContext"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category_name: string
  image: string
  weight: string
  rating: number
  reviews: number
  in_stock: boolean
}

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  // Fetch product
  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:3000/api/products/${id}`)
      if (res.ok) {
        const data = await res.json()
        setProduct(data)

        // Fetch related
        const relatedRes = await fetch(`http://localhost:3000/api/products?category=${data.category_name}`)
        const relatedData = await relatedRes.json()
        setRelatedProducts(relatedData.filter((p: Product) => p.id !== data.id).slice(0, 8))
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addItem(product)
      }
      setQuantity(1)
    }
  }

  const calculateDiscount = () => {
    if (product?.originalPrice && product?.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    }
    return 0
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container max-w-6xl mx-auto px-4 py-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4 hidden sm:block">
          <span>Home</span> / <span>{product.category_name}</span> / <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-100 sm:h-96 md:h-[28rem] lg:h-[32rem] object-cover rounded-lg border"
              />
              {product.originalPrice && (
                <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                  {calculateDiscount()}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">{product.category_name}</Badge>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base mt-2 line-clamp-3">{product.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 py-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="py-3 border-y border-gray-200">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl sm:text-3xl font-bold text-green-600">₹{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="line-through text-gray-400 text-lg sm:text-xl">₹{product.originalPrice}</span>
                    <span className="text-green-600 font-medium text-sm">{calculateDiscount()}% off</span>
                  </>
                )}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Weight:</span> {product.weight}
              </div>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              {product.in_stock ? (
                <>
                  <Badge className="bg-green-100 text-green-700 border-green-200">✓ In Stock</Badge>
                  <span className="text-sm text-green-600">Ready to ship</span>
                </>
              ) : (
                <Badge className="bg-red-100 text-red-700 border-red-200">Out of Stock</Badge>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white flex-1 h-12 text-base font-medium"
                  disabled={!product.in_stock}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="h-12 px-6">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" className="h-12 px-6">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4 text-blue-600" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-purple-600" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Card className="mb-8">
          <CardContent className="p-4 sm:p-6">
            <Tabs defaultValue="description">
              <TabsList className="grid grid-cols-3 w-full mb-6">
                <TabsTrigger value="description" className="text-xs sm:text-sm">Description</TabsTrigger>
                <TabsTrigger value="ingredients" className="text-xs sm:text-sm">Ingredients</TabsTrigger>
                <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="ingredients" className="mt-4">
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700">Pure {product.name} - 100% Natural, No artificial preservatives</p>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="mt-4">
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

       // ...existing code...
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">You may also like</h2>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                View All
              </Button>
            </div>
            
            {/* Mobile: Horizontal scroll */}
            <div className="block sm:hidden">
              <div className="flex gap-3 overflow-x-auto pb-4 -mx-3 px-3">
                {relatedProducts.slice(0, 6).map((p) => (
                  <div key={p.id} className="min-w-[160px] max-w-[160px] flex-shrink-0">
                    <div className="w-full h-full">
                      <ProductCard product={p} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: Grid */}
            <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.slice(0, 8).map((p) => (
                <div key={p.id} className="w-full">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
{/* // ...existing code... */}
      </div>
    </div>
  )
}