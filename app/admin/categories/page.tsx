"use client"
import { useEffect, useState } from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Plus, Trash2 } from "lucide-react"


interface Category {
  id: string
  name: string
  description: string
  productCount: number
  isActive: boolean
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])

// fetch categories on mount
useEffect(() => {
  fetch("https://aatrey-backend.onrender.com/api/categories")
    .then((res) => res.json())
    .then((data) => setCategories(data))
    .catch((err) => console.error("Failed to fetch categories", err))
}, [])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  })

  const handleAddCategory = async () => {
  try {
    const response = await fetch("https://aatrey-backend.onrender.com/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    })

    const data = await response.json()

    setCategories([...categories, data]) // update UI
    setNewCategory({ name: "", description: "" })
    setIsAddDialogOpen(false)
  } catch (err) {
    console.error("Failed to add category:", err)
  }
}


  const handleDeleteCategory = async (id: string) => {
  try {
    await fetch(`https://aatrey-backend.onrender.com/api/categories/${id}`, {
      method: "DELETE",
    })
    setCategories(categories.filter((c) => c.id !== id))
  } catch (err) {
    console.error("Delete failed", err)
  }
}

const [editCategory, setEditCategory] = useState<Category | null>(null)
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
const handleUpdateCategory = async () => {
  if (!editCategory) return

  try {
    const res = await fetch(`https://aatrey-backend.onrender.com/api/categories/${editCategory.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: editCategory.name,
        description: editCategory.description,
      }),
    })

    const updated = await res.json()

    setCategories(categories.map((c) => (c.id === updated.id ? updated : c)))
    setIsEditDialogOpen(false)
    setEditCategory(null)
  } catch (err) {
    console.error("Update failed", err)
  }
}



 const toggleCategoryStatus = async (id: string) => {
  try {
    const res = await fetch(`https://aatrey-backend.onrender.com/api/categories/${id}/toggle`, {
      method: "PATCH",
    })
    const updated = await res.json()

    setCategories(categories.map((c) => (c.id === id ? updated : c)))
  } catch (err) {
    console.error("Failed to toggle status", err)
  }
}


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categories Management</h1>
          <p className="text-gray-600">Organize your products into categories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new product category to organize your inventory.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="Enter category name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category-description">Description</Label>
                <Textarea
                  id="category-description"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  placeholder="Enter category description"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory} className="bg-green-600 hover:bg-green-700">
                Add Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-sm text-gray-600">Total Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{categories.filter((c) => c.isActive).length}</div>
            <p className="text-sm text-gray-600">Active Categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{categories.reduce((sum, c) => sum + (Number(c.productCount) || 0), 0)}
</div>
            <p className="text-sm text-gray-600">Total Products</p>
          </CardContent>
        </Card>
      </div>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-xs">
                    <p className="text-sm text-gray-600 truncate">{category.description}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{category.productCount} products</Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => toggleCategoryStatus(category.id)}>
                      <Badge className={category.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {category.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => {
  setEditCategory(category)
  setIsEditDialogOpen(true)
}}>
  <Edit className="h-4 w-4" />
</Button>

{/* Edit Dialog */}



                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-700"
                        disabled={category.productCount > 0}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {editCategory && (
  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription>Update this category's name and description</DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="edit-category-name">Category Name</Label>
          <Input
            id="edit-category-name"
            value={editCategory.name}
            onChange={(e) =>
              setEditCategory((prev) => prev ? { ...prev, name: e.target.value } : null)
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="edit-category-description">Description</Label>
          <Textarea
            id="edit-category-description"
            value={editCategory.description}
            onChange={(e) =>
              setEditCategory((prev) => prev ? { ...prev, description: e.target.value } : null)
            }
          />
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-4">
        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleUpdateCategory}>Update</Button>
      </div>
    </DialogContent>
  </Dialog>
)}
    </div>
  )
}
