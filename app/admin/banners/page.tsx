"use client"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Eye, EyeOff, Plus, Trash2, Upload } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Banner {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  position: "hero" | "middle" | "bottom"
  isActive: boolean
  startDate: string
  endDate: string
  priority: number
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([])

  useEffect(() => {
    fetch("http://localhost:3000/api/banners")
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error("Failed to load banners:", err))
  }, [])


  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null)
  const [newBanner, setNewBanner] = useState<Partial<Banner>>({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    ctaText: "",
    ctaLink: "",
    position: "hero",
    isActive: true,
    startDate: "",
    endDate: "",
    priority: 1,
  })

  const handleAddBanner = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBanner),
      })
      const created = await res.json()
      setBanners([...banners, created])
      setNewBanner({
        title: "",
        subtitle: "",
        description: "",
        image: "",
        ctaText: "",
        ctaLink: "",
        position: "hero",
        isActive: true,
        startDate: "",
        endDate: "",
        priority: 1,
      })
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Failed to add banner", error)
    }
  }


  const handleEditBanner = async () => {
    if (!editingBanner) return
    try {
      const res = await fetch(`http://localhost:3000/api/banners/${editingBanner.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingBanner),
      })
      const updated = await res.json()
      setBanners(banners.map((b) => (b.id === updated.id ? updated : b)))
      setEditingBanner(null)
      setIsEditDialogOpen(false)
    } catch (error) {
      console.error("Failed to update banner", error)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    try {
      const res = await fetch("http://localhost:3000/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      setNewBanner({ ...newBanner, image: data.url }) // set the uploaded image URL
    } catch (err) {
      console.error("Upload failed", err)
    }
  }

  const handleDeleteBanner = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/banners/${id}`, { method: "DELETE" })
      setBanners(banners.filter((b) => b.id !== id))
    } catch (error) {
      console.error("Failed to delete banner", error)
    }
  }

  const toggleBannerStatus = async (id: string) => {
    const banner = banners.find((b) => b.id === id)
    if (!banner) return

    try {
      const res = await fetch(`http://localhost:3000/api/banners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...banner, isActive: !banner.isActive }),
      })
      const updated = await res.json()
      setBanners(banners.map((b) => (b.id === id ? updated : b)))
    } catch (error) {
      console.error("Failed to toggle status", error)
    }
  }


  const openEditDialog = (banner: Banner) => {
    setEditingBanner({ ...banner })
    setIsEditDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Banner Management</h1>
          <p className="text-gray-600">Manage homepage banners and promotional content</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Banner</DialogTitle>
              <DialogDescription>Create a new promotional banner for your website.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                  placeholder="Enter banner title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={newBanner.subtitle}
                  onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                  placeholder="Enter subtitle"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newBanner.description}
                  onChange={(e) => setNewBanner({ ...newBanner, description: e.target.value })}
                  placeholder="Enter banner description"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="imageUpload">Upload Image</Label>
                  <Input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  {newBanner.image && (
                    <div className="mt-2">
                      <Image
                        src={newBanner.image}
                        alt="Uploaded"
                        width={200}
                        height={100}
                        className="rounded"
                      />
                    </div>
                  )}
                </div>

              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaText">CTA Button Text</Label>
                <Input
                  id="ctaText"
                  value={newBanner.ctaText}
                  onChange={(e) => setNewBanner({ ...newBanner, ctaText: e.target.value })}
                  placeholder="e.g., Shop Now"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ctaLink">CTA Link</Label>
                <Input
                  id="ctaLink"
                  value={newBanner.ctaLink}
                  onChange={(e) => setNewBanner({ ...newBanner, ctaLink: e.target.value })}
                  placeholder="e.g., /products"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select
                  value={newBanner.position}
                  onValueChange={(value: "hero" | "middle" | "bottom") =>
                    setNewBanner({ ...newBanner, position: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero Section</SelectItem>
                    <SelectItem value="middle">Middle Section</SelectItem>
                    <SelectItem value="bottom">Bottom Section</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Input
                  id="priority"
                  type="number"
                  min="1"
                  value={newBanner.priority}
                  onChange={(e) => setNewBanner({ ...newBanner, priority: Number.parseInt(e.target.value) })}
                  placeholder="1 (highest)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newBanner.startDate}
                  onChange={(e) => setNewBanner({ ...newBanner, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newBanner.endDate}
                  onChange={(e) => setNewBanner({ ...newBanner, endDate: e.target.value })}
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={newBanner.isActive}
                  onCheckedChange={(checked) => setNewBanner({ ...newBanner, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBanner} className="bg-green-600 hover:bg-green-700">
                Add Banner
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{banners.length}</div>
            <p className="text-sm text-gray-600">Total Banners</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{banners.filter((b) => b.isActive).length}</div>
            <p className="text-sm text-gray-600">Active Banners</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{banners.filter((b) => b.position === "hero").length}</div>
            <p className="text-sm text-gray-600">Hero Banners</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{banners.filter((b) => b.position === "middle").length}</div>
            <p className="text-sm text-gray-600">Promo Banners</p>
          </CardContent>
        </Card>
      </div>

      {/* Banners Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Banners</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banner</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Image
                        src={banner.image?.startsWith("/banners") ? banner.image : `/banners/${banner.image?.split("/").pop()}`}
                        alt={banner.title}
                        width={60}
                        height={40}
                        className="rounded-md object-cover"
                      />

                      <div>
                        <p className="font-medium">{banner.title}</p>
                        <p className="text-sm text-gray-500">{banner.subtitle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{banner.position}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">#{banner.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{banner.startDate}</div>
                      <div className="text-gray-500">to {banner.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => toggleBannerStatus(banner.id)}>
                      <Badge className={banner.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {banner.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(banner)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => toggleBannerStatus(banner.id)}>
                        {banner.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBanner(banner.id)}
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
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
            <DialogDescription>Update banner information and settings.</DialogDescription>
          </DialogHeader>
          {editingBanner && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editingBanner.title}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                  placeholder="Enter banner title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-subtitle">Subtitle</Label>
                <Input
                  id="edit-subtitle"
                  value={editingBanner.subtitle}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                  placeholder="Enter subtitle"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingBanner.description}
                  onChange={(e) => setEditingBanner({ ...editingBanner, description: e.target.value })}
                  placeholder="Enter banner description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ctaText">CTA Button Text</Label>
                <Input
                  id="edit-ctaText"
                  value={editingBanner.ctaText}
                  onChange={(e) => setEditingBanner({ ...editingBanner, ctaText: e.target.value })}
                  placeholder="e.g., Shop Now"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ctaLink">CTA Link</Label>
                <Input
                  id="edit-ctaLink"
                  value={editingBanner.ctaLink}
                  onChange={(e) => setEditingBanner({ ...editingBanner, ctaLink: e.target.value })}
                  placeholder="e.g., /products"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-position">Position</Label>
                <Select
                  value={editingBanner.position}
                  onValueChange={(value: "hero" | "middle" | "bottom") =>
                    setEditingBanner({ ...editingBanner, position: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero Section</SelectItem>
                    <SelectItem value="middle">Middle Section</SelectItem>
                    <SelectItem value="bottom">Bottom Section</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-priority">Priority</Label>
                <Input
                  id="edit-priority"
                  type="number"
                  min="1"
                  value={editingBanner.priority}
                  onChange={(e) => setEditingBanner({ ...editingBanner, priority: Number.parseInt(e.target.value) })}
                  placeholder="1 (highest)"
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <Switch
                  id="edit-isActive"
                  checked={editingBanner.isActive}
                  onCheckedChange={(checked) => setEditingBanner({ ...editingBanner, isActive: checked })}
                />
                <Label htmlFor="edit-isActive">Active</Label>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditBanner} className="bg-green-600 hover:bg-green-700">
              Update Banner
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
