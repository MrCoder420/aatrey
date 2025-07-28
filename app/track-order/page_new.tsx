"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

interface Order {
  id: number
  user_id: number
  total_amount: number
  status: string
  payment_status: string
  order_date: string
  items: Array<{
    id: number
    product_id: number
    product_name: string
    product_image: string
    quantity: number
    price: number
  }>
}

export default function TrackOrderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [trackingId, setTrackingId] = useState("")

  useEffect(() => {
    if (orderId) {
      setTrackingId(orderId)
      fetchOrder(orderId)
    }
  }, [orderId])

  const fetchOrder = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/api/orders/${id}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data)
      } else {
        setOrder(null)
      }
    } catch (error) {
      console.error("Error fetching order:", error)
      setOrder(null)
    } finally {
      setLoading(false)
    }
  }

  const handleTrackOrder = () => {
    if (trackingId) {
      fetchOrder(trackingId)
    }
  }

  const getTrackingSteps = (status: string) => {
    const baseSteps = [
      {
        id: 1,
        title: "Order Received",
        description: "Your order has been placed successfully",
        icon: Package,
        completed: true,
      },
      {
        id: 2,
        title: "Order Confirmed",
        description: "Your order has been confirmed and is being prepared",
        icon: CheckCircle,
        completed: status !== "pending",
      },
      {
        id: 3,
        title: "Shipped",
        description: "Your order is on its way",
        icon: Truck,
        completed: ["shipped", "delivered"].includes(status),
        current: status === "shipped",
      },
      {
        id: 4,
        title: "Delivered",
        description: "Order delivered successfully",
        icon: CheckCircle,
        completed: status === "delivered",
        current: status === "delivered",
      },
    ]

    if (status === "cancelled") {
      return [
        baseSteps[0],
        {
          id: 2,
          title: "Order Cancelled",
          description: "Your order has been cancelled",
          icon: XCircle,
          completed: true,
          current: true,
        },
      ]
    }

    return baseSteps
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Package className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Track Your Order</h1>
              <p className="text-gray-600">Monitor your order status and delivery progress</p>
            </div>
          </div>

          {/* Search Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Enter Order ID</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="tracking-id">Order ID</Label>
                  <Input
                    id="tracking-id"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter your order ID (e.g., 123)"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button onClick={handleTrackOrder} disabled={!trackingId || loading}>
                    {loading ? "Tracking..." : "Track Order"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Details & Tracking */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p>Loading order details...</p>
            </div>
          ) : order ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Order #{order.id}</span>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{new Date(order.order_date).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <Badge variant="outline" className={order.payment_status === 'completed' ? 'border-green-200 text-green-700' : 'border-yellow-200 text-yellow-700'}>
                      {order.payment_status === 'completed' ? 'Paid' : 'Pending'}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-bold text-lg">₹{order.total_amount}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Items ({order.items.length})</p>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                          <Image
                            src={item.product_image || "/placeholder.svg"}
                            alt={item.product_name}
                            width={40}
                            height={40}
                            className="rounded object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.product_name}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getTrackingSteps(order.status).map((step, index) => {
                      const IconComponent = step.icon
                      return (
                        <div key={step.id} className="flex items-start space-x-4">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? 'bg-green-100 text-green-600' 
                              : step.current 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-gray-100 text-gray-400'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${step.completed || step.current ? 'text-gray-900' : 'text-gray-500'}`}>
                              {step.title}
                            </h4>
                            <p className={`text-sm ${step.completed || step.current ? 'text-gray-600' : 'text-gray-400'}`}>
                              {step.description}
                            </p>
                            {step.completed && (
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(order.order_date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {index < getTrackingSteps(order.status).length - 1 && (
                            <div className={`absolute left-5 mt-10 w-0.5 h-6 ${
                              step.completed ? 'bg-green-200' : 'bg-gray-200'
                            }`} style={{ marginLeft: '1.25rem' }} />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : trackingId && !loading ? (
            <Card className="text-center py-12">
              <CardContent>
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Not Found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find an order with ID "{trackingId}". Please check your order ID and try again.
                </p>
                <Button variant="outline" onClick={() => setTrackingId("")}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  )
}
