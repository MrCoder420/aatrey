import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import { CartProvider } from "./context/CartContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aatrey - Premium Health Products & Organic Foods",
  description:
    "Shop premium health powders, Ayurvedic herbs, organic flours, and wellness products. 100% natural and organic products for healthy living.",
  keywords: "health powders, ayurvedic herbs, organic flour, wellness products, natural supplements",
  generator: 'v0.dev',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/aatrey-logo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/aatrey-logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
