"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Star, Heart, Share2, Package, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Navbar from "../components/Navbar"
import Image from "next/image"

export default function OrderDeliveredPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [hoveredStar, setHoveredStar] = useState(0)

  const orderData = {
    orderId: "ORD1234567890",
    deliveredDate: "January 17, 2024",
    products: [
      {
        id: "1",
        name: "Organic Ashwagandha Powder",
        image: "/placeholder.svg?height=100&width=100",
        price: 449,
        quantity: 1,
      },
      {
        id: "2",
        name: "Pure Tulsi Powder",
        image: "/placeholder.svg?height=100&width=100",
        price: 199,
        quantity: 2,
      },
    ],
  }

  const handleSubmitReview = () => {
    // Handle review submission
    console.log("Review submitted:", { rating, review })
    // Show success message or redirect
  }

  const handleReorder = () => {
    // Add products back to cart and redirect
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-[#c78e60] to-[#b57d50] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-[#a07e56] mb-3">Order Delivered Successfully! 🎉</h1>
            <p className="text-lg text-gray-600 mb-2">Your Ayurvedic wellness products have been delivered safely</p>
            <p className="text-sm text-gray-500">
              Order #{orderData.orderId} • Delivered on {orderData.deliveredDate}
            </p>
          </div>

          {/* Delivered Products */}
          <Card className="card-modern mb-8">
            <CardHeader>
              <CardTitle className="flex items-center text-[#a07e56]">
                <Package className="w-5 h-5 mr-2" />
                Delivered Products
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orderData.products.map((product) => (
                  <div key={product.id} className="flex items-center space-x-4 p-4 bg-[#e2b799]/10 rounded-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#a07e56]">{product.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                      <p className="font-bold text-[#c78e60]">₹{product.price}</p>
                    </div>
                    <Button variant="outline" size="sm" className="border-[#e2b799] text-[#a07e56]">
                      Buy Again
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rate & Review */}
          <Card className="card-modern mb-8">
            <CardHeader>
              <CardTitle className="text-[#a07e56]">How was your experience?</CardTitle>
              <p className="text-sm text-gray-600">Your feedback helps us serve you better</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Star Rating */}
              <div>
                <Label className="text-base font-medium mb-3 block">Rate your overall experience</Label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredStar || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-3 text-sm text-gray-600">
                      {rating === 5
                        ? "Excellent!"
                        : rating === 4
                          ? "Very Good!"
                          : rating === 3
                            ? "Good!"
                            : rating === 2
                              ? "Fair"
                              : "Poor"}
                    </span>
                  )}
                </div>
              </div>

              {/* Written Review */}
              <div>
                <Label htmlFor="review" className="text-base font-medium">
                  Share your thoughts (optional)
                </Label>
                <Textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tell us about the product quality, packaging, delivery experience..."
                  className="mt-2 min-h-[100px] input-modern"
                />
              </div>

              <Button onClick={handleSubmitReview} disabled={rating === 0} className="btn-primary">
                Submit Review
              </Button>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button onClick={handleReorder} className="btn-primary flex items-center justify-center space-x-2">
              <RotateCcw className="w-4 h-4" />
              <span>Reorder</span>
            </Button>
            <Button
              onClick={() => router.push("/products")}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>Shop More</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 border-[#e2b799] text-[#a07e56] hover:bg-[#e2b799]/10"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Experience</span>
            </Button>
          </div>

          {/* Wellness Tips */}
          <Card className="card-modern bg-gradient-to-r from-[#e2b799]/10 to-[#c78e60]/10">
            <CardHeader>
              <CardTitle className="text-[#a07e56]">🌿 Wellness Tips for Your Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-[#c78e60] font-bold">•</span>
                  <p className="text-sm text-gray-700">
                    <strong>Ashwagandha:</strong> Take with warm milk before bedtime for better sleep and stress relief
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#c78e60] font-bold">•</span>
                  <p className="text-sm text-gray-700">
                    <strong>Tulsi:</strong> Mix with honey and consume on empty stomach for immunity boost
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-[#c78e60] font-bold">•</span>
                  <p className="text-sm text-gray-700">
                    <strong>Storage:</strong> Keep in a cool, dry place away from direct sunlight
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-center mt-8 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="font-semibold text-[#a07e56] mb-2">Thank you for choosing Aatrey! 🙏</h3>
            <p className="text-sm text-gray-600 mb-4">
              We hope our Ayurvedic products bring wellness and vitality to your life.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <span className="text-[#c78e60] font-medium">📞 +91 98765 43210</span>
              <span className="text-[#c78e60] font-medium">✉️ support@aatrey.com</span>
              <span className="text-[#c78e60] font-medium">🌐 www.aatrey.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
