"use client"

import { useEffect, useState } from "react"
import { Search, Eye, Ban, Mail, Pencil, Trash, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  orders: number
  total_spent: number
  joined_date: string
  status: "active" | "blocked"
  last_order: string | null
  role?: string
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
    password: "",
  });

  const openEditModal = (customer: Customer) => {
    setEditingCustomer(customer);
    setEditForm({
      name: customer.name,
      email: customer.email,
      role: customer.role || "user",
      status: customer.status || "active",
      password: "", // optional
    });
  };


  const fetchCustomers = () => {
    fetch("https://aatrey-backend.onrender.com/api/customers")
      .then(res => res.json())
      .then(data => setCustomers(data))
      .catch(err => console.error("Failed to fetch customers", err))
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  const handleEditSubmit = async () => {
    if (!editingCustomer) return;

    try {
      const res = await fetch(`https://aatrey-backend.onrender.com/api/customers/${editingCustomer.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: editForm.name,
          email: editForm.email,
          password: editForm.password,
          role: editForm.role,
          status: editForm.status,
        }),
      });

      const updated = await res.json();

      setCustomers((prev) =>
        prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
      );
      setEditingCustomer(null);
    } catch (err) {
      alert("Failed to update customer.");
    }
  };


  const handleStatusToggle = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "blocked" : "active";
    try {
      const res = await fetch(`https://aatrey-backend.onrender.com/api/customers/status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedCustomer = await res.json();
      setCustomers((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: updatedCustomer.status } : c))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      await fetch(`https://aatrey-backend.onrender.com/api/customers/${id}`, {
        method: "DELETE",
      });
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  )

  const totalCustomers = customers.length
  const activeCustomers = customers.filter(c => c.status === "active").length
  const totalRevenue = customers.reduce((sum, c) => sum + (c.total_spent ?? 0), 0)
  const totalOrders = customers.reduce((sum, c) => sum + (c.orders ?? 0), 0)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
        <p className="text-gray-600">Manage your customer base and relationships</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><div className="text-2xl font-bold">{totalCustomers}</div><p className="text-sm text-gray-600">Total Customers</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold">{activeCustomers}</div><p className="text-sm text-gray-600">Active Customers</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold">₹{(totalRevenue ?? 0).toLocaleString()}</div><p className="text-sm text-gray-600">Total Revenue</p></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-2xl font-bold">₹{Math.round(avgOrderValue)}</div><p className="text-sm text-gray-600">Avg Order Value</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-500">Joined {customer.joined_date?.slice(0, 10) ?? "—"}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{customer.email}</p>
                      <p className="text-sm text-gray-500">{customer.phone ?? "—"}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{customer.orders} orders</Badge>
                  </TableCell>
                  <TableCell className="font-medium">₹{(customer.total_spent ?? 0).toLocaleString()}</TableCell>
                  <TableCell>{customer.last_order?.slice(0, 10) ?? "—"}</TableCell>
                  <TableCell>
                    <Badge className={customer.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{customer.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditModal(customer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStatusToggle(customer.id, customer.status)}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(customer.id)}
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
      {editingCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Customer</h2>
            <div className="space-y-3">
              <Input
                placeholder="Full Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
              <Input
                placeholder="Password (optional)"
                type="password"
                value={editForm.password}
                onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              />
              <select
                className="w-full border p-2 rounded"
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <select
                className="w-full border p-2 rounded"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingCustomer(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditSubmit}>Update</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
