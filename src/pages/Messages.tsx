import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { 
  MessageSquare, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send,
  Mail,
  Users,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  subject: string;
  content: string;
  sender: string;
  recipient: string;
  status: "unread" | "read" | "replied";
  priority: "low" | "normal" | "high";
  createdAt: string;
  category: "general" | "booking" | "payment" | "complaint" | "suggestion";
}

// Mock data
const messageStats = [
  { name: "Unread", value: 8, color: "#3b82f6" },
  { name: "Read", value: 15, color: "#10b981" },
  { name: "Replied", value: 12, color: "#f59e0b" },
];

const messagesTrend = [
  { month: "Jan", count: 25 },
  { month: "Feb", count: 30 },
  { month: "Mar", count: 28 },
  { month: "Apr", count: 35 },
  { month: "May", count: 32 },
  { month: "Jun", count: 38 },
];

const mockMessages: Message[] = [
  {
    id: 1,
    subject: "Booking Issue - Tennis Court",
    content: "I'm having trouble booking the tennis court for next week. The system shows it's available but won't let me complete the booking.",
    sender: "John Smith",
    recipient: "Admin",
    status: "unread",
    priority: "high",
    createdAt: "2024-08-10T10:30:00",
    category: "booking"
  },
  {
    id: 2,
    subject: "Payment Confirmation Request",
    content: "Could you please confirm if my membership payment went through? I paid yesterday but haven't received a confirmation email.",
    sender: "Sarah Johnson",
    recipient: "Admin", 
    status: "read",
    priority: "normal",
    createdAt: "2024-08-09T15:45:00",
    category: "payment"
  },
  {
    id: 3,
    subject: "Suggestion for Pool Hours",
    content: "I'd like to suggest extending pool hours during weekends. Many members work late and would appreciate evening swimming options.",
    sender: "Mike Chen",
    recipient: "Admin",
    status: "replied",
    priority: "low",
    createdAt: "2024-08-08T09:20:00",
    category: "suggestion"
  },
  {
    id: 4,
    subject: "Complaint about Noise",
    content: "There has been excessive noise from the fitness center during evening hours. This needs to be addressed.",
    sender: "Emma Wilson",
    recipient: "Admin",
    status: "unread",
    priority: "high",
    createdAt: "2024-08-07T18:00:00",
    category: "complaint"
  },
  {
    id: 5,
    subject: "General Inquiry",
    content: "What are the operating hours for the community center during holidays?",
    sender: "David Lee",
    recipient: "Admin",
    status: "read",
    priority: "normal",
    createdAt: "2024-08-06T11:20:00",
    category: "general"
  }
];

interface MessagesProps {
  onLogout?: () => void;
}

export default function Messages({ onLogout }: MessagesProps) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalMessages = messages.length;
  const unreadMessages = messages.filter(m => m.status === "unread").length;
  const repliedMessages = messages.filter(m => m.status === "replied").length;
  const responseRate = Math.round((repliedMessages / totalMessages) * 100);

  const statusColors = {
    unread: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    read: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    replied: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  };

  const priorityColors = {
    low: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    normal: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  };

  const categoryColors = {
    general: "bg-secondary text-secondary-foreground",
    booking: "bg-primary text-primary-foreground",
    payment: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    complaint: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    suggestion: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
  };

  const handleReply = (messageId: number) => {
    if (!replyContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter a reply message.",
        variant: "destructive",
      });
      return;
    }

    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, status: "replied" as const }
          : msg
      )
    );

    toast({
      title: "Reply Sent",
      description: "Your reply has been sent successfully.",
    });

    setReplyContent("");
    setSelectedMessage(null);
  };

  const markAsRead = (messageId: number) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId && msg.status === "unread"
          ? { ...msg, status: "read" as const }
          : msg
      )
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <AlertCircle className="w-4 h-4" />;
      case "read":
        return <Clock className="w-4 h-4" />;
      case "replied":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout onLogout={onLogout}>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Messages</h1>
            <p className="text-muted-foreground">
              Manage communication with community members.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMessages}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadMessages}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Replied</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{repliedMessages}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{responseRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-elevated animate-slide-up">
            <CardHeader>
              <CardTitle>Message Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={messageStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {messageStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="card-elevated animate-slide-up">
            <CardHeader>
              <CardTitle>Messages Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={messagesTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="card-elevated">
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </CardHeader>
        </Card>

        {/* Messages Table */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <CardTitle>All Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
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
                  <TableRow key={message.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {message.sender.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{message.sender}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs truncate">
                      {message.subject}
                    </TableCell>
                    <TableCell>
                      <Badge className={categoryColors[message.category]}>
                        {message.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={priorityColors[message.priority]}>
                        {message.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[message.status]}>
                        {getStatusIcon(message.status)}
                        <span className="ml-1">{message.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(message.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markAsRead(message.id)}
                        >
                          View
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="gradient" 
                              size="sm"
                              onClick={() => setSelectedMessage(message)}
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Reply
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Reply to: {message.subject}</DialogTitle>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                              <div className="bg-muted p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback className="text-xs">
                                      {message.sender.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">{message.sender}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {formatDate(message.createdAt)}
                                  </span>
                                </div>
                                <p className="text-sm">{message.content}</p>
                              </div>
                              
                              <div className="space-y-2">
                                <label className="text-sm font-medium">Your Reply</label>
                                <Textarea
                                  placeholder="Type your reply here..."
                                  value={replyContent}
                                  onChange={(e) => setReplyContent(e.target.value)}
                                  rows={4}
                                />
                              </div>
                              
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                                  Cancel
                                </Button>
                                <Button 
                                  variant="gradient"
                                  onClick={() => handleReply(message.id)}
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Send Reply
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}