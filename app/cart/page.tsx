"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "../context/CartContext"
import Navbar from "../components/Navbar"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f8fdf8]">
        <Navbar />
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-[#2d6040]">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6 md:mb-8 text-sm md:text-base">Add some healthy products to get started!</p>
            <Button onClick={() => router.push("/products")} className="btn-primary">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8fdf8]">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-[#2d6040]">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="card-modern">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="sm:w-20 sm:h-20 rounded-md object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base md:text-lg truncate">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.weight}</p>
                      <p className="text-[#4a9960] font-bold text-sm md:text-base">₹{item.price}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center space-x-1 md:space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="border-[#b8d4b8] text-[#2d6040] hover:bg-[#b8d4b8]/10 h-8 w-8 p-0"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-6 md:w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="border-[#b8d4b8] text-[#2d6040] hover:bg-[#b8d4b8]/10 h-8 w-8 p-0"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-sm md:text-base">₹{(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="card-modern sticky top-4 md:top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-[#2d6040]">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>₹50.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>₹{(getTotalPrice() * 0.18).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-[#4a9960]">
                      ₹{(getTotalPrice() + 50 + getTotalPrice() * 0.18).toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => router.push("/checkout")}
                  className="w-full btn-primary mb-2"
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  onClick={() => router.push("/products")}
                  variant="outline"
                  className="w-full border-[#b8d4b8] text-[#2d6040] hover:bg-[#b8d4b8]/10"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
