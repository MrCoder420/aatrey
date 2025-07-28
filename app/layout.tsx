import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import dynamic from "next/dynamic"
import "./globals.css"
import { CartProvider } from "./context/CartContext"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true
})

// Lazy load performance monitor only in development
const PerformanceMonitor = dynamic(() => import("./components/PerformanceMonitor"), {
  ssr: false,
})

export const metadata: Metadata = {
  title: "Aatrey - Premium Health Products & Organic Foods",
  description:
    "Shop premium health powders, Ayurvedic herbs, organic flours, and wellness products. 100% natural and organic products for healthy living.",
  keywords: "health powders, ayurvedic herbs, organic flour, wellness products, natural supplements",
  generator: 'v0.dev',
  // Performance optimizations
  other: {
    'X-DNS-Prefetch-Control': 'on',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//localhost:3000" />
        {/* Preconnect to backend */}
        <link rel="preconnect" href="http://localhost:3000" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          {children}
          {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
        </CartProvider>
      </body>
    </html>
  )
}
