"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, MapPin, Truck } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Navbar from "../components/Navbar"
import { useCart } from "../context/CartContext"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const subtotal = getTotalPrice()
  const shippingCost = deliveryMethod === "express" ? 100 : 50
  const tax = subtotal * 0.18
  const total = subtotal + shippingCost + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleProceedToPayment = () => {
    // Store checkout data in localStorage for payment page
    const checkoutData = {
      formData,
      deliveryMethod,
      total,
      items: items.map(item => ({
        product_id: item.id,
        quantity: 1, // You might want to track quantities in cart
        price: item.price
      }))
    }
    localStorage.setItem("checkoutData", JSON.stringify(checkoutData))
    router.push("/payment")
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fffaf3]">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 text-[#a07e56]">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some healthy products to get started!</p>
            <Button onClick={() => router.push("/products")} className="btn-primary">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-3xl font-bold text-[#a07e56]">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-[#a07e56]">
                  <MapPin className="w-5 h-5 mr-2" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="input-modern"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="input-modern"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="input-modern"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Complete Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Flat No, Street, Area"
                    className="input-modern"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="input-modern"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="State"
                      className="input-modern"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="input-modern"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Method */}
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-[#a07e56]">
                  <Truck className="w-5 h-5 mr-2" />
                  Delivery Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                  <div className="flex items-center space-x-3 p-4 border border-[#e2b799]/30 rounded-lg">
                    <RadioGroupItem value="standard" id="standard" />
                    <div className="flex-1">
                      <Label htmlFor="standard" className="font-medium">
                        Standard Delivery (5-7 days)
                      </Label>
                      <p className="text-sm text-gray-600">Free shipping on orders above ₹500</p>
                    </div>
                    <span className="font-bold text-[#c78e60]">₹50</span>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-[#e2b799]/30 rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <div className="flex-1">
                      <Label htmlFor="express" className="font-medium">
                        Express Delivery (2-3 days)
                      </Label>
                      <p className="text-sm text-gray-600">Fast delivery for urgent orders</p>
                    </div>
                    <span className="font-bold text-[#c78e60]">₹100</span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="card-modern sticky top-24">
              <CardHeader>
                <CardTitle className="text-[#a07e56]">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Products */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-[#c78e60]">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>₹{shippingCost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%):</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span className="text-[#c78e60]">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={handleProceedToPayment} className="w-full btn-primary">
                  Proceed to Payment
                </Button>

                {/* Trust Signals */}
                <div className="text-center pt-4">
                  <div className="flex justify-center space-x-4 text-xs text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      Fast Delivery
                    </span>
                    <span>🔒 Secure Payment</span>
                    <span>📞 24/7 Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
