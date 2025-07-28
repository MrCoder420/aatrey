"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Gift, Lightbulb, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const benefits = [
    {
      icon: <Lightbulb className="w-6 h-6 text-green-600" />,
      title: "Health Tips",
      description: "Expert advice on natural wellness",
    },
    {
      icon: <Gift className="w-6 h-6 text-green-600" />,
      title: "Exclusive Offers",
      description: "Member-only discounts and deals",
    },
    {
      icon: <Bell className="w-6 h-6 text-green-600" />,
      title: "New Products",
      description: "Be first to know about new arrivals",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-green-600 to-green-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-white text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3 md:mb-4">
              <Mail className="w-6 h-6 md:w-8 md:h-8" />
              <span className="text-base md:text-lg font-semibold">Stay Connected</span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">Join the Aatrey Wellness Community</h2>

            <p className="text-green-100 text-base md:text-lg mb-6 md:mb-8">
              Get health tips, seasonal recipes, exclusive offers, and product updates delivered straight to your inbox.
              Join thousands who trust Aatrey for their wellness journey.
            </p>

            <div className="space-y-3 md:space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start justify-center lg:justify-start space-x-3">
                  <div className="bg-white bg-opacity-20 p-1.5 md:p-2 rounded-lg">{benefit.icon}</div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white text-sm md:text-base">{benefit.title}</h3>
                    <p className="text-green-100 text-xs md:text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Newsletter Form */}
          <div className="mt-6 lg:mt-0">
            <Card className="bg-white shadow-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="text-center mb-4 md:mb-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Subscribe to Our Newsletter</h3>
                  <p className="text-gray-600 text-sm md:text-base">Get health tips, offers, and product updates</p>
                </div>

                {subscribed ? (
                  <div className="text-center py-6 md:py-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <Mail className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
                    </div>
                    <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Thank You!</h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      You've successfully subscribed to our newsletter. Check your email for a welcome message!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-10 md:h-12 text-base md:text-lg"
                      />
                    </div>

                    <Button type="submit" className="w-full h-10 md:h-12 bg-green-600 hover:bg-green-700 text-base md:text-lg font-semibold">
                      Subscribe Now
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      By subscribing, you agree to our Privacy Policy. You can unsubscribe at any time.
                    </p>
                  </form>
                )}

                <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-center space-x-3 md:space-x-6 text-xs md:text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Weekly Tips</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>No Spam</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Easy Unsubscribe</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
