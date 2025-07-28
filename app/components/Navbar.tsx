"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { LogOut, Menu, Package, Search, ShoppingCart, User, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useCallback, useMemo } from "react"
import { useCart } from "../context/CartContext"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { items } = useCart()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const currentUser = localStorage.getItem("currentUser")
      if (currentUser) {
        setUser(JSON.parse(currentUser))
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      localStorage.removeItem("currentUser")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const cartItemsCount = useMemo(() => 
    items.reduce((sum, item) => sum + item.quantity, 0), 
    [items]
  )

  const handleLogout = useCallback(() => {
    localStorage.removeItem("currentUser")
    setUser(null)
    // Use router instead of window.location.reload for better performance
    window.location.href = "/"
  }, [])

  const handleMenuToggle = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  // Prevent rendering login button until user state is determined
  const LoginButton = useMemo(() => {
    if (isLoading) {
      return (
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
      )
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#4a9960] to-[#3d8050] rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <span className="font-medium text-[#2d6040] hidden lg:block">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/orders" className="flex items-center">
                <Package className="mr-2 h-4 w-4" />
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <Link
        href="/auth"
        className="flex items-center space-x-2 text-[#2d6040] hover:text-[#4a9960] transition-colors p-2"
        prefetch={true}
      >
        <User className="w-5 h-5" />
        <span className="font-medium hidden lg:block">Login</span>
      </Link>
    )
  }, [user, isLoading, handleLogout])

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-[#b8d4b8]/20">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-[#4a9960] to-[#3d8050] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg md:text-xl">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#2d6040] to-[#4a9960] bg-clip-text text-transparent">
                Aatrey
              </span>
              <span className="text-xs text-[#2d6040] font-medium tracking-wide hidden sm:block">
                Ancient Wisdom, Modern Living
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-1 top-1/2 transform -translate-y-1/2 text-[#2d6040] w-5 h-5 " />

              <Input
                type="text"
                placeholder="Search for health powders, flours, herbs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-modern ml-9"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link href="/products" className="nav-link">
              Products
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>

            {LoginButton}

            <Link href="/cart" className="relative" prefetch={true}>
              <Button className="btn-primary flex items-center space-x-2 px-3 lg:px-4">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden lg:block">Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#e74c3c] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/cart" className="relative p-2" prefetch={true}>
              <ShoppingCart className="w-6 h-6 text-[#2d6040]" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#e74c3c] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <Button variant="ghost" size="sm" onClick={handleMenuToggle} className="p-2">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#b8d4b8]/20 bg-white">
            {/* Mobile Search */}
            <div className="mb-4 px-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-modern pl-10 pr-4"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2d6040] w-4 h-4" />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1 px-4">
              <Link href="/products" className="nav-link w-full justify-start" onClick={handleMenuClose} prefetch={true}>
                Products
              </Link>
              <Link href="/about" className="nav-link w-full justify-start" onClick={handleMenuClose} prefetch={true}>
                About
              </Link>
              <Link href="/contact" className="nav-link w-full justify-start" onClick={handleMenuClose} prefetch={true}>
                Contact
              </Link>

              {!isLoading && (
                user ? (
                  <>
                    <Link href="/profile" className="nav-link w-full justify-start" onClick={handleMenuClose} prefetch={true}>
                      <User className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                    <Link href="/orders" className="nav-link w-full justify-start" onClick={handleMenuClose} prefetch={true}>
                      <Package className="w-4 h-4 mr-2" />
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        handleMenuClose()
                      }}
                      className="nav-link w-full justify-start text-left"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/auth" className="nav-link w-full justify-start" onClick={handleMenuClose} prefetch={true}>
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
