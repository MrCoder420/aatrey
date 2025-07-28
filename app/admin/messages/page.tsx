"use client"

import { useState } from "react"
import { Eye, Reply, Trash2, Star, StarOff, Search, MessageCircle, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  category: "general" | "support" | "complaint" | "feedback" | "business"
  priority: "low" | "medium" | "high"
  status: "new" | "read" | "replied" | "resolved" | "closed"
  isStarred: boolean
  createdAt: string
  repliedAt?: string
  adminReply?: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([
    {
      id: "1",
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "+91 98765 43210",
      subject: "Product Quality Query",
      message:
        "Hi, I wanted to know about the organic certification of your amla powder. Is it certified by any recognized organic certification body? Also, what is the shelf life of the product?",
      category: "general",
      priority: "medium",
      status: "new",
      isStarred: false,
      createdAt: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Rajesh Patel",
      email: "rajesh@example.com",
      phone: "+91 98765 43211",
      subject: "Order Delivery Issue",
      message:
        "My order #1002 was supposed to be delivered yesterday but I haven't received it yet. The tracking shows it's out for delivery since 2 days. Please help me track this order.",
      category: "support",
      priority: "high",
      status: "read",
      isStarred: true,
      createdAt: "2024-01-14T14:15:00Z",
    },
    {
      id: "3",
      name: "Meena Iyer",
      email: "meena@example.com",
      subject: "Bulk Order Inquiry",
      message:
        "I run a small wellness center and would like to place bulk orders for various health powders. Do you offer wholesale pricing? What are the minimum order quantities?",
      category: "business",
      priority: "medium",
      status: "replied",
      isStarred: false,
      createdAt: "2024-01-13T09:45:00Z",
      repliedAt: "2024-01-13T16:20:00Z",
      adminReply:
        "Thank you for your interest! We do offer wholesale pricing for bulk orders. Please find attached our wholesale price list and terms.",
    },
    {
      id: "4",
      name: "Amit Kumar",
      email: "amit@example.com",
      phone: "+91 98765 43213",
      subject: "Product Recommendation",
      message:
        "I am diabetic and looking for healthy flour alternatives. Can you recommend which of your flours would be best for diabetic patients? Any sugar-free options?",
      category: "general",
      priority: "low",
      status: "new",
      isStarred: false,
      createdAt: "2024-01-12T11:20:00Z",
    },
    {
      id: "5",
      name: "Sunita Devi",
      email: "sunita@example.com",
      subject: "Excellent Service!",
      message:
        "I just wanted to thank you for the excellent quality products and fast delivery. The ashwagandha powder has really helped with my stress levels. Keep up the good work!",
      category: "feedback",
      priority: "low",
      status: "read",
      isStarred: true,
      createdAt: "2024-01-11T16:30:00Z",
    },
    {
      id: "6",
      name: "Vikram Singh",
      email: "vikram@example.com",
      subject: "Package Damaged",
      message:
        "I received my order today but the package was damaged and the powder container was broken. The product has spilled out. I need a replacement urgently.",
      category: "complaint",
      priority: "high",
      status: "resolved",
      isStarred: false,
      createdAt: "2024-01-10T12:00:00Z",
      repliedAt: "2024-01-10T15:30:00Z",
      adminReply:
        "We sincerely apologize for the damaged package. We're sending a replacement immediately via express delivery.",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)
  const [replyText, setReplyText] = useState("")

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || message.status === statusFilter
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsViewDialogOpen(true)

    // Mark as read if it's new
    if (message.status === "new") {
      setMessages(messages.map((m) => (m.id === message.id ? { ...m, status: "read" } : m)))
    }
  }

  const handleReplyMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setReplyText("")
    setIsReplyDialogOpen(true)
  }

  const handleSendReply = () => {
    if (selectedMessage && replyText) {
      setMessages(
        messages.map((m) =>
          m.id === selectedMessage.id
            ? {
                ...m,
                status: "replied",
                adminReply: replyText,
                repliedAt: new Date().toISOString(),
              }
            : m,
        ),
      )
      setReplyText("")
      setIsReplyDialogOpen(false)
      setSelectedMessage(null)
    }
  }

  const toggleStar = (id: string) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, isStarred: !m.isStarred } : m)))
  }

  const updateStatus = (id: string, status: ContactMessage["status"]) => {
    setMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)))
  }

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "read":
        return "bg-gray-100 text-gray-800"
      case "replied":
        return "bg-green-100 text-green-800"
      case "resolved":
        return "bg-purple-100 text-purple-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "support":
        return <MessageCircle className="h-4 w-4" />
      case "complaint":
        return <Mail className="h-4 w-4 text-red-500" />
      case "business":
        return <Phone className="h-4 w-4 text-blue-500" />
      default:
        return <MessageCircle className="h-4 w-4" />
    }
  }

  const totalMessages = messages.length
  const newMessages = messages.filter((m) => m.status === "new").length
  const starredMessages = messages.filter((m) => m.isStarred).length
  const pendingReply = messages.filter((m) => m.status === "read").length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Messages & Support</h1>
        <p className="text-gray-600">Manage customer inquiries and support requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{totalMessages}</div>
            <p className="text-sm text-gray-600">Total Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{newMessages}</div>
            <p className="text-sm text-gray-600">New Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{pendingReply}</div>
            <p className="text-sm text-gray-600">Pending Reply</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{starredMessages}</div>
            <p className="text-sm text-gray-600">Starred</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages by name, email, subject, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="read">Read</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Messages Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id} className={message.status === "new" ? "bg-blue-50" : ""}>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => toggleStar(message.id)}>
                      {message.isStarred ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{message.name}</p>
                      <p className="text-sm text-gray-500">{message.email}</p>
                      {message.phone && <p className="text-sm text-gray-500">{message.phone}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{message.subject}</p>
                      <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {getCategoryIcon(message.category)}
                      <Badge variant="outline">{message.category}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={message.status}
                      onValueChange={(value) => updateStatus(message.id, value as ContactMessage["status"])}
                    >
                      <SelectTrigger className="w-32">
                        <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{new Date(message.createdAt).toLocaleDateString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewMessage(message)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReplyMessage(message)}
                        disabled={message.status === "closed"}
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteMessage(message.id)}
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

      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">From:</Label>
                  <p className="text-sm">{selectedMessage.name}</p>
                  <p className="text-sm text-gray-500">{selectedMessage.email}</p>
                  {selectedMessage.phone && <p className="text-sm text-gray-500">{selectedMessage.phone}</p>}
                </div>
                <div>
                  <Label className="text-sm font-medium">Date:</Label>
                  <p className="text-sm">{new Date(selectedMessage.createdAt).toLocaleString()}</p>
                  <div className="flex space-x-2 mt-2">
                    <Badge className={getPriorityColor(selectedMessage.priority)}>{selectedMessage.priority}</Badge>
                    <Badge variant="outline">{selectedMessage.category}</Badge>
                  </div>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium">Subject:</Label>
                <p className="text-lg font-medium">{selectedMessage.subject}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Message:</Label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              {selectedMessage.adminReply && (
                <div>
                  <Label className="text-sm font-medium">Admin Reply:</Label>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="whitespace-pre-wrap">{selectedMessage.adminReply}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Replied on: {selectedMessage.repliedAt && new Date(selectedMessage.repliedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
            {selectedMessage && selectedMessage.status !== "closed" && (
              <Button
                onClick={() => {
                  setIsViewDialogOpen(false)
                  handleReplyMessage(selectedMessage)
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                Reply
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reply Dialog */}
      <Dialog open={isReplyDialogOpen} onOpenChange={setIsReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              {selectedMessage && `Replying to ${selectedMessage.name} - ${selectedMessage.subject}`}
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Label className="text-sm font-medium">Original Message:</Label>
                <p className="text-sm mt-1">{selectedMessage.message}</p>
              </div>
              <div>
                <Label htmlFor="reply-text">Your Reply:</Label>
                <Textarea
                  id="reply-text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply here..."
                  rows={6}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsReplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendReply} disabled={!replyText.trim()} className="bg-green-600 hover:bg-green-700">
              Send Reply
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
