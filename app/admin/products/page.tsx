"use client"
import { useEffect, useState } from "react"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    weight: "",
    image: "",
  })

  interface Category {
    id: number
    name: string
  }

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetch("https://aatrey-backend.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products", err))

    fetch("https://aatrey-backend.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories", err))
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      categoryFilter === "all" ||
      product.category?.toString() === categoryFilter ||
      product.category_id?.toString() === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleAddProduct = async () => {
    const product = {
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category_id: parseInt(newProduct.category),
      weight: newProduct.weight,
      image: newProduct.image || "/placeholder.svg",
      in_stock: true,
    }

    try {
      const res = await fetch("https://aatrey-backend.onrender.com/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })

      const data = await res.json()
      setProducts([...products, data])
      setNewProduct({ name: "", description: "", price: "", category: "", weight: "", image: "" })
      setIsAddDialogOpen(false)
    } catch (err) {
      console.error("Failed to add product:", err)
    }
  }

  const handleUpdateProduct = async () => {
    try {
      const res = await fetch(`https://aatrey-backend.onrender.com/api/products/${editProduct.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editProduct.name,
          description: editProduct.description,
          price: parseFloat(editProduct.price),
          category_id: parseInt(editProduct.category_id),
          weight: editProduct.weight,
          image: editProduct.image,
          in_stock: editProduct.in_stock ?? true,
        }),
      });

      const updated = await res.json();

      // Update local products state
      setProducts(products.map((p) => (p.id === updated.id ? updated : p)));

      // Close the dialog
      setIsEditDialogOpen(false);
      setEditProduct(null);
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };


  const handleDeleteProduct = async (id: string) => {
    try {
      await fetch(`https://aatrey-backend.onrender.com/api/products/${id}`, {
        method: "DELETE",
      })
      setProducts(products.filter((p) => p.id !== id))
    } catch (err) {
      console.error("Failed to delete product:", err)
    }
  }

  const getCategoryName = (id: string | number) => {
    const match = categories.find((c) => c.id.toString() === id.toString())
    return match?.name || "Unknown"
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products Management</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the details to add a new product to your inventory.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="Enter price"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight/Size</Label>
                <Input
                  id="weight"
                  value={newProduct.weight}
                  onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
                  placeholder="e.g., 250g, 1kg"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Enter product description"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="productImage">Upload Product Image</Label>
                <Input
                  id="productImage"
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    const formData = new FormData()
                    formData.append("file", file)

                    try {
                      const res = await fetch("https://aatrey-backend.onrender.com/api/upload-product-image", {
                        method: "POST",
                        body: formData,
                      })
                      const data = await res.json()
                      setNewProduct({ ...newProduct, image: data.url })
                    } catch (err) {
                      console.error("Image upload failed", err)
                    }
                  }}
                />
                {newProduct.image && (
                  <Image
                    src={newProduct.image}
                    alt="Product Preview"
                    width={100}
                    height={100}
                    className="rounded-md mt-2 object-cover"
                  />
                )}
              </div>

            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700">Add Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.weight}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{getCategoryName(product.category_id || product.category)}</Badge>
                  </TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>
                    <Badge className={product.in_stock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {product.in_stock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span>{product.rating || "4.5"}</span>
                      <span className="text-sm text-gray-500">({product.reviews || "99"})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditProduct(product)
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {editProduct && (
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                  <DialogDescription>Update product information below.</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {/* Same input fields as add, just bound to `editProduct` */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={editProduct.name}
                      onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={editProduct.price}
                      onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={editProduct.category_id?.toString()}
                      onValueChange={(value) => setEditProduct({ ...editProduct, category_id: parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight/Size</Label>
                    <Input
                      id="weight"
                      value={editProduct.weight}
                      onChange={(e) => setEditProduct({ ...editProduct, weight: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editProduct.description}
                      onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="editImage">Upload New Image</Label>
                    <Input
                      id="editImage"
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return

                        const formData = new FormData()
                        formData.append("file", file)

                        try {
                          const res = await fetch("https://aatrey-backend.onrender.com/api/upload-product-image", {
                            method: "POST",
                            body: formData,
                          })
                          const data = await res.json()
                          setEditProduct({ ...editProduct, image: data.url })
                        } catch (err) {
                          console.error("Image upload failed", err)
                        }
                      }}
                    />
                    {editProduct.image && (
                      <Image
                        src={editProduct.image}
                        alt="Product"
                        width={100}
                        height={100}
                        className="rounded-md mt-2 object-cover"
                      />
                    )}
                  </div>

                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpdateProduct} className="bg-blue-600 hover:bg-blue-700">Update Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

        </CardContent>
      </Card>
    </div>
  )
}
