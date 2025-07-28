export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  weight: string
  rating: number
  reviews: number
  inStock: boolean
  ingredients?: string[]
  benefits?: string[]
}

export interface CartItem extends Product {
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: Address
}

export interface Address {
  street: string
  city: string
  state: string
  pincode: string
  country: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  shippingAddress: Address
}
