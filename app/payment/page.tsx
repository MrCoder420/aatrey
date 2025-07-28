"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Building, CreditCard, Lock, Shield, Smartphone, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { useCart } from "../context/CartContext"

export default function PaymentPage() {
  const router = useRouter()
  const { clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [checkoutData, setCheckoutData] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  useEffect(() => {
    const data = localStorage.getItem("checkoutData")
    if (data) {
      setCheckoutData(JSON.parse(data))
    } else {
      router.push("/cart")
    }
  }, [router])

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Create order via API
      const orderPayload = {
        user_id: 1, // You should get this from authentication context
        total_amount: checkoutData.total,
        status: "confirmed",
        payment_status: "completed",
        items: checkoutData.items
      }

      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const result = await response.json()
      const orderId = result.order.id

      // Store order data for confirmation page
      localStorage.setItem(
        "orderData",
        JSON.stringify({
          orderId,
          ...checkoutData,
          paymentMethod,
          orderDate: new Date().toISOString(),
          orderDetails: result.order
        }),
      )

      // Clear cart
      clearCart()

      // Clear checkout data
      localStorage.removeItem("checkoutData")

      // Redirect to confirmation
      router.push("/order-confirmation")

    } catch (error) {
      console.error("Payment failed:", error)
      alert("Payment failed. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#c78e60]"></div>
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
          <h1 className="text-3xl font-bold text-[#a07e56]">Secure Payment</h1>
          <div className="ml-auto flex items-center text-[#c78e60]">
            <Shield className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">SSL Secured</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="card-modern">
              <CardHeader>
                <CardTitle className="flex items-center text-[#a07e56]">
                  <Lock className="w-5 h-5 mr-2" />
                  Choose Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* Credit/Debit Card */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-4 border border-[#e2b799]/30 rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="w-5 h-5 text-[#c78e60]" />
                      <Label htmlFor="card" className="font-medium">
                        Credit/Debit Card
                      </Label>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="ml-8 space-y-4 p-4 bg-[#e2b799]/10 rounded-lg">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={cardData.cardNumber}
                            onChange={handleCardInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="input-modern"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardholderName">Cardholder Name</Label>
                          <Input
                            id="cardholderName"
                            name="cardholderName"
                            value={cardData.cardholderName}
                            onChange={handleCardInputChange}
                            placeholder="John Doe"
                            className="input-modern"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                              id="expiryDate"
                              name="expiryDate"
                              value={cardData.expiryDate}
                              onChange={handleCardInputChange}
                              placeholder="MM/YY"
                              className="input-modern"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              value={cardData.cvv}
                              onChange={handleCardInputChange}
                              placeholder="123"
                              className="input-modern"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* UPI */}
                  <div className="flex items-center space-x-3 p-4 border border-[#e2b799]/30 rounded-lg">
                    <RadioGroupItem value="upi" id="upi" />
                    <Smartphone className="w-5 h-5 text-[#c78e60]" />
                    <Label htmlFor="upi" className="font-medium">
                      UPI Payment
                    </Label>
                    <div className="ml-auto text-sm text-gray-600">GPay, PhonePe, Paytm</div>
                  </div>

                  {/* Net Banking */}
                  <div className="flex items-center space-x-3 p-4 border border-[#e2b799]/30 rounded-lg">
                    <RadioGroupItem value="netbanking" id="netbanking" />
                    <Building className="w-5 h-5 text-[#c78e60]" />
                    <Label htmlFor="netbanking" className="font-medium">
                      Net Banking
                    </Label>
                    <div className="ml-auto text-sm text-gray-600">All major banks</div>
                  </div>

                  {/* Wallet */}
                  <div className="flex items-center space-x-3 p-4 border border-[#e2b799]/30 rounded-lg">
                    <RadioGroupItem value="wallet" id="wallet" />
                    <Wallet className="w-5 h-5 text-[#c78e60]" />
                    <Label htmlFor="wallet" className="font-medium">
                      Digital Wallet
                    </Label>
                    <div className="ml-auto text-sm text-gray-600">Paytm, Amazon Pay</div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Security Info */}
            <Card className="card-modern bg-gradient-to-r from-[#e2b799]/10 to-[#c78e60]/10">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-[#c78e60]" />
                  <div>
                    <h3 className="font-semibold text-[#a07e56]">Your payment is secure</h3>
                    <p className="text-sm text-gray-600">We use 256-bit SSL encryption to protect your data</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="card-modern sticky top-24">
              <CardHeader>
                <CardTitle className="text-[#a07e56]">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{(checkoutData.total - 50 - (checkoutData.total - 50) * 0.18).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>₹{checkoutData.deliveryMethod === "express" ? "100" : "50"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%):</span>
                    <span>₹{((checkoutData.total - 50) * 0.18).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount:</span>
                    <span className="text-[#c78e60]">₹{checkoutData.total.toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={handlePayment} disabled={isProcessing} className="w-full btn-primary">
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    `Pay ₹${checkoutData.total.toFixed(2)}`
                  )}
                </Button>

                {/* Trust Badges */}
                <div className="text-center pt-4 space-y-2">
                  <div className="flex justify-center space-x-4 text-xs text-gray-600">
                    <span>🔒 SSL Secured</span>
                    <span>🛡️ PCI Compliant</span>
                  </div>
                  <p className="text-xs text-gray-500">Your payment information is encrypted and secure</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
