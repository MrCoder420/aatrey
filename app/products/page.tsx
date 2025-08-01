"use client"

import { useState, useEffect } from "react"
import { Filter, Grid, List, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Navbar from "../components/Navbar"
import ProductCard from "../components/ProductCard"
import { useSearchParams } from "next/navigation"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<string>("")
  const [showFilters, setShowFilters] = useState(false)
  const [products, setProducts] = useState<any[]>([])
  const [allCategories, setAllCategories] = useState<string[]>([])

  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  // Initial category from URL
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl])
    }
  }, [categoryFromUrl])

  // Fetch categories once
  useEffect(() => {
    fetch("https://aatrey-backend.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => {
        const names = data.map((cat: any) => cat.name)
        setAllCategories(names)
      })
      .catch((err) => console.error("Category fetch error:", err))
  }, [])

  // Fetch products whenever filters change
  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams()

      if (selectedCategories.length > 0) {
        queryParams.append("category", selectedCategories[0])
      }

      if (priceRange && priceRange !== "all") {
        const [min, max] = priceRange.split("-")
        queryParams.append("minPrice", min)
        queryParams.append("maxPrice", max)
      }

      if (sortBy) {
        queryParams.append("sort", sortBy)
      }

      const res = await fetch(`https://aatrey-backend.onrender.com/api/products?${queryParams.toString()}`)
      const data = await res.json()
      setProducts(data)
    }

    fetchProducts()
  }, [selectedCategories, priceRange, sortBy])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([category])
    } else {
      setSelectedCategories([])
    }
  }

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedCategories([])
            setPriceRange("")
          }}
          className="text-blue-600 hover:text-blue-800"
        >
          Clear all
        </Button>
      </div>

      {/* Active Filters */}
      {(selectedCategories.length > 0 || priceRange) && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Active filters:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <div key={category} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {category}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => handleCategoryChange(category, false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            {priceRange && (
              <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                ₹{priceRange}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1"
                  onClick={() => setPriceRange("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3 text-gray-900">Department</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {allCategories.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label htmlFor={category} className="text-sm text-gray-700 cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3 text-gray-900">Price</h3>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Prices" },
            { value: "0-100", label: "Under ₹100" },
            { value: "100-300", label: "₹100 to ₹300" },
            { value: "300-500", label: "₹300 to ₹500" },
            { value: "500-1000", label: "₹500 & Above" },
          ].map((option) => (
            <div key={option.value} className="flex items-center space-x-3">
              <Checkbox
                id={option.value}
                checked={priceRange === option.value}
                onCheckedChange={() => setPriceRange(priceRange === option.value ? "" : option.value)}
                className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <Label htmlFor={option.value} className="text-sm text-gray-700 cursor-pointer">
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
        {/* Mobile Header */}
        <div className="block sm:hidden mb-4">
          <h1 className="text-xl font-bold mb-3">All Products</h1>
          <div className="flex items-center justify-between gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden sm:flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold">All Products</h1>

          <div className="flex items-center space-x-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden lg:flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 lg:gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden sm:block w-64 lg:w-72 flex-shrink-0">
            <Card className="sticky top-4">
              <CardContent className="p-4 lg:p-6">
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b">
              <p className="text-sm text-gray-600">
                <span className="font-medium">{products.length}</span> results
                {selectedCategories.length > 0 && (
                  <span> for "{selectedCategories.join(", ")}"</span>
                )}
              </p>
              
              <div className="hidden sm:block lg:hidden">
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No products found</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategories([])
                    setPriceRange("")
                  }}
                >
                  Clear all filters
                </Button>
              </div>
           // ...existing code...
            ) : (
              <div
                className={`grid gap-3 sm:gap-4 ${
                  viewMode === "grid"
                    ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
{/* // ...existing code... */}
          </div>
        </div>
      </div>
    </div>
  )
}