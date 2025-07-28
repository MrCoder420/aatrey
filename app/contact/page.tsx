"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Headphones, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-[#4a9960]" />,
      title: "Phone Support",
      details: ["+91 98765 43210", "+91 98765 43211"],
      description: "Mon-Sat, 9 AM - 7 PM",
    },
    {
      icon: <Mail className="w-6 h-6 text-[#4a9960]" />,
      title: "Email Support",
      details: ["support@aatrey.com", "orders@aatrey.com"],
      description: "We reply within 24 hours",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#4a9960]" />,
      title: "Head Office",
      details: ["123 Wellness Street", "Mumbai, Maharashtra 400001"],
      description: "Visit us for consultations",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#4a9960]" />,
      title: "Business Hours",
      details: ["Monday - Saturday: 9 AM - 7 PM", "Sunday: 10 AM - 5 PM"],
      description: "Always here to help",
    },
  ]

  const supportOptions = [
    {
      icon: <MessageCircle className="w-8 h-8 text-[#4a9960]" />,
      title: "Live Chat",
      description: "Get instant help from our wellness experts",
      action: "Start Chat",
      available: true,
    },
    {
      icon: <Headphones className="w-8 h-8 text-[#4a9960]" />,
      title: "Phone Support",
      description: "Speak directly with our customer care team",
      action: "Call Now",
      available: true,
    },
    {
      icon: <Users className="w-8 h-8 text-[#4a9960]" />,
      title: "Ayurvedic Consultation",
      description: "Book a session with our certified practitioners",
      action: "Book Session",
      available: false,
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccess(true)
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      category: "",
      message: "",
    })

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000)
  }

  return (
    <div className="min-h-screen bg-[#f8fdf8]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#2d6040] to-[#1e4a2e] text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">Get in Touch</h1>
          <p className="text-xl md:text-2xl mb-8 text-[#b8d4b8] max-w-3xl mx-auto leading-relaxed">
            We're here to support your wellness journey. Reach out for any questions, guidance, or support.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2d6040] mb-4">Contact Information</h2>
            <p className="text-lg text-gray-600">Multiple ways to reach our dedicated support team</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-modern text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-[#b8d4b8]/20 rounded-full">{info.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#2d6040] mb-3">{info.title}</h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{info.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-gradient-to-br from-[#f8fdf8] to-[#f0f8f0]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2d6040] mb-4">How Can We Help?</h2>
            <p className="text-lg text-gray-600">Choose the support option that works best for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => (
              <Card key={index} className="card-modern text-center hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-[#b8d4b8]/20 rounded-full">{option.icon}</div>
                  </div>
                  <h3 className="text-xl font-semibold text-[#2d6040] mb-3">{option.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                  <Button
                    className={`w-full ${option.available ? "btn-primary" : "bg-gray-300 cursor-not-allowed"}`}
                    disabled={!option.available}
                  >
                    {option.action}
                    {!option.available && " (Coming Soon)"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2d6040] mb-4">Send Us a Message</h2>
            <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>

          {showSuccess && (
            <Alert className="mb-8 border-[#4a9960] bg-[#b8d4b8]/10">
              <AlertDescription className="text-[#2d6040]">
                ✅ Thank you for your message! We'll get back to you within 24 hours.
              </AlertDescription>
            </Alert>
          )}

          <Card className="card-modern">
            <CardHeader>
              <CardTitle className="text-[#2d6040] text-center">Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="input-modern"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="input-modern"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={handleSelectChange}>
                      <SelectTrigger className="input-modern">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="product">Product Question</SelectItem>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="wholesale">Wholesale Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief subject of your message"
                      className="input-modern"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your inquiry in detail..."
                    className="input-modern min-h-[120px]"
                    required
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full btn-primary">
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-[#f8fdf8] to-[#f0f8f0]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2d6040] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "What makes Aatrey products different from others?",
                a: "Our products are sourced directly from organic farms, tested for purity, and processed using traditional methods to maintain their natural potency.",
              },
              {
                q: "How long does delivery take?",
                a: "Standard delivery takes 5-7 business days, while express delivery takes 2-3 business days. We provide tracking information for all orders.",
              },
              {
                q: "Are your products certified organic?",
                a: "Yes, all our products are certified organic and approved by FSSAI. We maintain strict quality standards throughout our supply chain.",
              },
              {
                q: "Do you offer bulk or wholesale pricing?",
                a: "Yes, we offer special pricing for bulk orders and wholesale customers. Please contact us directly for wholesale inquiries.",
              },
            ].map((faq, index) => (
              <Card key={index} className="card-modern">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-[#2d6040] mb-3">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2d6040] mb-4">Visit Our Office</h2>
            <p className="text-lg text-gray-600">Come visit us for personalized Ayurvedic consultations</p>
          </div>

          <Card className="card-modern overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-[#b8d4b8] to-[#4a9960] flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Aatrey Head Office</h3>
                <p className="text-lg">123 Wellness Street, Mumbai, Maharashtra 400001</p>
                <Button className="mt-4 bg-white text-[#2d6040] hover:bg-[#b8d4b8]">Get Directions</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
