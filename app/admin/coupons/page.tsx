"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, Copy, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Coupon {
  id: string
  code: string
  name: string
  description: string
  type: "percentage" | "fixed"
  value: number
  minOrderAmount: number
  maxDiscount?: number
  usageLimit: number
  usedCount: number
  isActive: boolean
  startDate: string
  endDate: string
  applicableCategories: string[]
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "1",
      code: "WELCOME25",
      name: "Welcome Discount",
      description: "25% off for new customers",
      type: "percentage",
      value: 25,
      minOrderAmount: 500,
      maxDiscount: 200,
      usageLimit: 100,
      usedCount: 23,
      isActive: true,
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      applicableCategories: ["all"],
    },
    {
      id: "2",
      code: "HEALTHY50",
      name: "Health Boost",
      description: "₹50 off on health powders",
      type: "fixed",
      value: 50,
      minOrderAmount: 300,
      usageLimit: 200,
      usedCount: 87,
      isActive: true,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      applicableCategories: ["Health Powders", "Ayurvedic"],
    },
    {
      id: "3",
      code: "COMBO15",
      name: "Combo Pack Discount",
      description: "15% off on all combo packs",
      type: "percentage",
      value: 15,
      minOrderAmount: 800,
      maxDiscount: 150,
      usageLimit: 50,
      usedCount: 12,
      isActive: true,
      startDate: "2024-01-01",
      endDate: "2024-03-31",
      applicableCategories: ["Combo Packs"],
    },
    {
      id: "4",
      code: "EXPIRED10",
      name: "Old Offer",
      description: "10% off - expired offer",
      type: "percentage",
      value: 10,
      minOrderAmount: 200,
      usageLimit: 100,
      usedCount: 89,
      isActive: false,
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      applicableCategories: ["all"],
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    code: "",
    name: "",
    description: "",
    type: "percentage",
    value: 0,
    minOrderAmount: 0,
    maxDiscount: undefined,
    usageLimit: 100,
    usedCount: 0,
    isActive: true,
    startDate: "",
    endDate: "",
    applicableCategories: ["all"],
  })

  const categories = ["all", "Health Powders", "Ayurvedic", "Flours", "Combo Packs", "Organic"]

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewCoupon({ ...newCoupon, code: result })
  }

  const handleAddCoupon = () => {
    const coupon: Coupon = {
      id: (coupons.length + 1).toString(),
      code: newCoupon.code!,
      name: newCoupon.name!,
      description: newCoupon.description!,
      type: newCoupon.type!,
      value: newCoupon.value!,
      minOrderAmount: newCoupon.minOrderAmount!,
      maxDiscount: newCoupon.maxDiscount,
      usageLimit: newCoupon.usageLimit!,
      usedCount: 0,
      isActive: newCoupon.isActive!,
      startDate: newCoupon.startDate!,
      endDate: newCoupon.endDate!,
      applicableCategories: newCoupon.applicableCategories!,
    }
    setCoupons([...coupons, coupon])
    setNewCoupon({
      code: "",
      name: "",
      description: "",
      type: "percentage",
      value: 0,
      minOrderAmount: 0,
      maxDiscount: undefined,
      usageLimit: 100,
      usedCount: 0,
      isActive: true,
      startDate: "",
      endDate: "",
      applicableCategories: ["all"],
    })
    setIsAddDialogOpen(false)
  }

  const handleEditCoupon = () => {
    if (editingCoupon) {
      setCoupons(coupons.map((c) => (c.id === editingCoupon.id ? editingCoupon : c)))
      setEditingCoupon(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id))
  }

  const toggleCouponStatus = (id: string) => {
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c)))
  }

  const openEditDialog = (coupon: Coupon) => {
    setEditingCoupon({ ...coupon })
    setIsEditDialogOpen(true)
  }

  const copyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // You could add a toast notification here
  }

  const activeCoupons = coupons.filter((c) => c.isActive).length
  const totalUsage = coupons.reduce((sum, c) => sum + c.usedCount, 0)
  const expiredCoupons = coupons.filter((c) => new Date(c.endDate) < new Date()).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Coupon Management</h1>
          <p className="text-gray-600">Create and manage discount coupons for your customers</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Coupon</DialogTitle>
              <DialogDescription>Create a new discount coupon for your customers.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">Coupon Code</Label>
                <div className="flex space-x-2">
                  <Input
                    id="code"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    placeholder="WELCOME25"
                  />
                  <Button type="button" variant="outline" onClick={generateCouponCode}>
                    Generate
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Coupon Name</Label>
                <Input
                  id="name"
                  value={newCoupon.name}
                  onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                  placeholder="Welcome Discount"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  placeholder="Describe what this coupon offers"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Discount Type</Label>
                <Select
                  value={newCoupon.type}
                  onValueChange={(value: "percentage" | "fixed") => setNewCoupon({ ...newCoupon, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Discount Value {newCoupon.type === "percentage" ? "(%)" : "(₹)"}</Label>
                <Input
                  id="value"
                  type="number"
                  value={newCoupon.value}
                  onChange={(e) => setNewCoupon({ ...newCoupon, value: Number.parseFloat(e.target.value) })}
                  placeholder={newCoupon.type === "percentage" ? "25" : "50"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minOrder">Minimum Order Amount (₹)</Label>
                <Input
                  id="minOrder"
                  type="number"
                  value={newCoupon.minOrderAmount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minOrderAmount: Number.parseFloat(e.target.value) })}
                  placeholder="500"
                />
              </div>
              {newCoupon.type === "percentage" && (
                <div className="space-y-2">
                  <Label htmlFor="maxDiscount">Maximum Discount (₹)</Label>
                  <Input
                    id="maxDiscount"
                    type="number"
                    value={newCoupon.maxDiscount || ""}
                    onChange={(e) =>
                      setNewCoupon({
                        ...newCoupon,
                        maxDiscount: e.target.value ? Number.parseFloat(e.target.value) : undefined,
                      })
                    }
                    placeholder="200"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="usageLimit">Usage Limit</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  value={newCoupon.usageLimit}
                  onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: Number.parseInt(e.target.value) })}
                  placeholder="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={newCoupon.startDate}
                  onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newCoupon.endDate}
                  onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <Switch
                  id="isActive"
                  checked={newCoupon.isActive}
                  onCheckedChange={(checked) => setNewCoupon({ ...newCoupon, isActive: checked })}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCoupon} className="bg-green-600 hover:bg-green-700">
                Add Coupon
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{coupons.length}</div>
            <p className="text-sm text-gray-600">Total Coupons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{activeCoupons}</div>
            <p className="text-sm text-gray-600">Active Coupons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{totalUsage}</div>
            <p className="text-sm text-gray-600">Total Usage</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{expiredCoupons}</div>
            <p className="text-sm text-gray-600">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Coupon Code</TableHead>
                <TableHead>Name & Description</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Validity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons.map((coupon) => (
                <TableRow key={coupon.id}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge className="font-mono">{coupon.code}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyCouponCode(coupon.code)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{coupon.name}</p>
                      <p className="text-sm text-gray-500">{coupon.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {coupon.type === "percentage" ? `${coupon.value}%` : `₹${coupon.value}`}
                      </p>
                      <p className="text-sm text-gray-500">Min: ₹{coupon.minOrderAmount}</p>
                      {coupon.maxDiscount && <p className="text-sm text-gray-500">Max: ₹{coupon.maxDiscount}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {coupon.usedCount}/{coupon.usageLimit}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{coupon.startDate}</div>
                      <div className="text-gray-500">to {coupon.endDate}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => toggleCouponStatus(coupon.id)}>
                      <Badge
                        className={
                          coupon.isActive
                            ? new Date(coupon.endDate) >= new Date()
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {coupon.isActive ? (new Date(coupon.endDate) >= new Date() ? "Active" : "Expired") : "Inactive"}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(coupon)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => toggleCouponStatus(coupon.id)}>
                        {coupon.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCoupon(coupon.id)}
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
            <DialogTitle>Edit Coupon</DialogTitle>
            <DialogDescription>Update coupon information and settings.</DialogDescription>
          </DialogHeader>
          {editingCoupon && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-code">Coupon Code</Label>
                <Input
                  id="edit-code"
                  value={editingCoupon.code}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
                  placeholder="WELCOME25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Coupon Name</Label>
                <Input
                  id="edit-name"
                  value={editingCoupon.name}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, name: e.target.value })}
                  placeholder="Welcome Discount"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editingCoupon.description}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, description: e.target.value })}
                  placeholder="Describe what this coupon offers"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-type">Discount Type</Label>
                <Select
                  value={editingCoupon.type}
                  onValueChange={(value: "percentage" | "fixed") => setEditingCoupon({ ...editingCoupon, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage (%)</SelectItem>
                    <SelectItem value="fixed">Fixed Amount (₹)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-value">Discount Value {editingCoupon.type === "percentage" ? "(%)" : "(₹)"}</Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={editingCoupon.value}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, value: Number.parseFloat(e.target.value) })}
                  placeholder={editingCoupon.type === "percentage" ? "25" : "50"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-usageLimit">Usage Limit</Label>
                <Input
                  id="edit-usageLimit"
                  type="number"
                  value={editingCoupon.usageLimit}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, usageLimit: Number.parseInt(e.target.value) })}
                  placeholder="100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={editingCoupon.endDate}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, endDate: e.target.value })}
                />
              </div>
              <div className="col-span-2 flex items-center space-x-2">
                <Switch
                  id="edit-isActive"
                  checked={editingCoupon.isActive}
                  onCheckedChange={(checked) => setEditingCoupon({ ...editingCoupon, isActive: checked })}
                />
                <Label htmlFor="edit-isActive">Active</Label>
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCoupon} className="bg-green-600 hover:bg-green-700">
              Update Coupon
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
