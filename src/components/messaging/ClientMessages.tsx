import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Send
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
  }
];

export function ClientMessages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    payment: "bg-success text-success-foreground",
    complaint: "bg-destructive text-destructive-foreground",
    suggestion: "bg-warning text-warning-foreground"
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Client Messages</h2>
          <p className="text-muted-foreground">
            Manage communication with community members.
          </p>
        </div>
      </div>

      {/* Search */}
      <Card className="card-elevated p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Messages List */}
      <div className="space-y-3">
        {filteredMessages.map((message) => (
          <Card key={message.id} className="card-elevated p-4 hover:shadow-lg transition-shadow">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-foreground">{message.subject}</h3>
                    <Badge className={statusColors[message.status]}>
                      {getStatusIcon(message.status)}
                      <span className="ml-1">{message.status}</span>
                    </Badge>
                    <Badge className={priorityColors[message.priority]}>
                      {message.priority}
                    </Badge>
                    <Badge className={categoryColors[message.category]}>
                      {message.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {message.sender.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      From: {message.sender}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {message.content}
                  </p>
                </div>
                
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
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}