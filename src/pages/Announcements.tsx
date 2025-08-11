import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Megaphone,
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  Eye,
  Archive,
} from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  status: "active" | "archived" | "draft";
  views: number;
}

const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Community Meeting This Friday",
    content: "Join us for our monthly community meeting to discuss upcoming projects and initiatives.",
    author: "Admin",
    date: "2024-08-09",
    status: "active",
    views: 147,
  },
  {
    id: 2,
    title: "New Playground Equipment Installed",
    content: "We're excited to announce that new playground equipment has been installed in the children's area.",
    author: "Maintenance Team",
    date: "2024-08-08",
    status: "active",
    views: 98,
  },
  {
    id: 3,
    title: "Holiday Pool Hours Update",
    content: "Please note the updated pool hours for the upcoming holiday weekend.",
    author: "Pool Staff",
    date: "2024-08-07",
    status: "archived",
    views: 203,
  },
  {
    id: 4,
    title: "Security Camera System Upgrade",
    content: "We're upgrading our security camera system to better serve the community.",
    author: "Security Team",
    date: "2024-08-06",
    status: "draft",
    views: 0,
  },
];

interface AnnouncementsProps {
  onLogout?: () => void;
}

export default function Announcements({ onLogout }: AnnouncementsProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredAnnouncements = announcements.filter(announcement =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const summaryData = [
    {
      title: "Total Announcements",
      value: announcements.length,
      change: "+12%",
      changeType: "positive" as const,
      icon: Megaphone,
      color: "primary" as const,
    },
    {
      title: "Active",
      value: announcements.filter(a => a.status === "active").length,
      change: "+8%",
      changeType: "positive" as const,
      icon: Eye,
      color: "success" as const,
    },
    {
      title: "Archived",
      value: announcements.filter(a => a.status === "archived").length,
      change: "No change",
      changeType: "neutral" as const,
      icon: Archive,
      color: "warning" as const,
    },
    {
      title: "Total Views",
      value: announcements.reduce((sum, a) => sum + a.views, 0),
      change: "+25%",
      changeType: "positive" as const,
      icon: Eye,
      color: "primary" as const,
    },
  ];

  const statusColors = {
    active: "bg-success text-success-foreground",
    archived: "bg-muted text-muted-foreground",
    draft: "bg-warning text-warning-foreground",
  };

  const handleDelete = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsEditDialogOpen(true);
  };

  return (
    <DashboardLayout onLogout={onLogout}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Announcements
            </h1>
            <p className="text-muted-foreground">
              Manage community announcements and updates.
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn-gradient">
                <Plus className="w-4 h-4 mr-2" />
                Add Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Add a new announcement for the community.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter announcement title" />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="Enter announcement content" rows={4} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button className="btn-gradient">Create Announcement</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((card, index) => (
            <div key={card.title} style={{ animationDelay: `${index * 0.1}s` }}>
              <SummaryCard {...card} />
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="card-elevated p-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Announcements Table */}
        <Card className="card-elevated animate-slide-up">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell className="font-medium">
                    {announcement.title}
                  </TableCell>
                  <TableCell>{announcement.author}</TableCell>
                  <TableCell>{announcement.date}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[announcement.status]}>
                      {announcement.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{announcement.views}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(announcement)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the announcement.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(announcement.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>
                Update the announcement details.
              </DialogDescription>
            </DialogHeader>
            {selectedAnnouncement && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    defaultValue={selectedAnnouncement.title}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-content">Content</Label>
                  <Textarea
                    id="edit-content"
                    defaultValue={selectedAnnouncement.content}
                    rows={4}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="btn-gradient">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}