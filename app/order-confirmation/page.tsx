"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Package, Truck, Home, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Navbar from "../components/Navbar"

export default function OrderConfirmationPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    const data = localStorage.getItem("orderData")
    if (data) {
      setOrderData(JSON.parse(data))
    } else {
      router.push("/")
    }
  }, [router])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#c78e60]"></div>
      </div>
    )
  }

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + (orderData.deliveryMethod === "express" ? 3 : 7))

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-[#c78e60] to-[#b57d50] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#a07e56] mb-2">Thank You for Your Order!</h1>
            <p className="text-gray-600">Your order has been successfully placed and is being processed.</p>
          </div>

          {/* Order Details */}
          <Card className="card-modern mb-6">
            <CardHeader>
              <CardTitle className="text-[#a07e56]">Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order Number</p>
                  <p className="font-bold text-[#c78e60]">{orderData.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-medium">{new Date(orderData.orderDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium capitalize">{orderData.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-bold text-[#c78e60]">₹{orderData.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card className="card-modern mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-[#a07e56]">
                <Truck className="w-5 h-5 mr-2" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Delivery Address</p>
                <div className="font-medium">
                  <p>{orderData.formData.fullName}</p>
                  <p>{orderData.formData.address}</p>
                  <p>
                    {orderData.formData.city}, {orderData.formData.state} - {orderData.formData.pincode}
                  </p>
                  <p>{orderData.formData.phone}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Delivery Method</p>
                  <p className="font-medium capitalize">{orderData.deliveryMethod} Delivery</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-medium text-[#c78e60]">{estimatedDelivery.toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="card-modern mb-6">
            <CardHeader>
              <CardTitle className="text-[#a07e56]">What happens next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#c78e60] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold">Order Confirmation</h3>
                    <p className="text-sm text-gray-600">You'll receive an email confirmation shortly</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#e2b799] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold">Order Processing</h3>
                    <p className="text-sm text-gray-600">We'll prepare your Ayurvedic products with care</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-[#a07e56] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold">Shipping & Delivery</h3>
                    <p className="text-sm text-gray-600">Track your package until it reaches your doorstep</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => router.push(`/track-order?id=${orderData.orderId}`)}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Package className="w-4 h-4" />
              <span>Track Order</span>
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="btn-secondary flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 border-[#e2b799] text-[#a07e56] hover:bg-[#e2b799]/10"
            >
              <Download className="w-4 h-4" />
              <span>Download Invoice</span>
            </Button>
          </div>

          {/* Support Info */}
          <div className="text-center mt-8 p-4 bg-gradient-to-r from-[#e2b799]/10 to-[#c78e60]/10 rounded-lg">
            <h3 className="font-semibold text-[#a07e56] mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Our customer support team is here to help you with any questions.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <span className="text-[#c78e60] font-medium">📞 +91 98765 43210</span>
              <span className="text-[#c78e60] font-medium">✉️ support@aatrey.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
