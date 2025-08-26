import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { AnnouncementForm } from "@/components/forms/AnnouncementForm";
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

import {
  useGetAnnouncementsQuery,
  useAddAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} from "@/state/services/announcements";
import { Announcement } from "@/types/annoucement";

interface AnnouncementsProps {
  onLogout?: () => void;
}

export default function Announcements({ onLogout }: AnnouncementsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  // ✅ RTK Query hooks
  const { data: announcements = [], isLoading } = useGetAnnouncementsQuery();
  const [addAnnouncement] = useAddAnnouncementMutation();
  const [updateAnnouncement] = useUpdateAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const filteredAnnouncements = announcements.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.body.toLowerCase().includes(searchTerm.toLowerCase())
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
      value: announcements.filter((a) => Array.isArray(a.targetCategories) && a.targetCategories.includes("all")).length,
      change: "+8%",
      changeType: "positive" as const,
      icon: Eye,
      color: "success" as const,
    },
    {
      title: "All Categories",
      value: announcements.filter((a) => a.targetType === "all").length,
      change: "No change",
      changeType: "neutral" as const,
      icon: Archive,
      color: "warning" as const,
    },
    {
      title: "Total Views",
      value: announcements.reduce((sum, a) => sum + (a.isRead ? 1 : 0), 0),
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

  // 🔹 Handlers
  const handleDelete = async (id: string) => {
    try {
      await deleteAnnouncement(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsFormDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedAnnouncement(null);
    setIsFormDialogOpen(true);
  };

  const handleFormSubmit = async (data: Announcement) => {
    try {
      if (selectedAnnouncement) {
        await updateAnnouncement({ ...selectedAnnouncement, ...data });
      } else {
        await addAnnouncement(data);
      }
      setIsFormDialogOpen(false);
      setSelectedAnnouncement(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout onLogout={onLogout}>
      {/* HEADER */}
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Announcements</h1>
            <p className="text-muted-foreground">Manage community announcements.</p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" /> Add Announcement
          </Button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {summaryData.map((card, i) => (
            <SummaryCard key={i} {...card} />
          ))}
        </div>

        {/* SEARCH */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </Card>

        {/* TABLE */}
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Read Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.id}</TableCell>
                  <TableCell>{a.title}</TableCell>
                  <TableCell>{a.body}</TableCell>
                  <TableCell>{a.timestamp?.toDate?.()?.toLocaleDateString?.()}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[a.targetType]}>{a.targetType}</Badge>
                  </TableCell>
                  <TableCell>{a.isRead ? "Read" : "Unread"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(a)}>
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
                          <AlertDialogTitle>Delete Announcement?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 hover:bg-red-600"
                            onClick={() => handleDelete(a.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* FORM */}
        <AnnouncementForm
          announcement={selectedAnnouncement}
          open={isFormDialogOpen}
          onClose={() => setIsFormDialogOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
    </DashboardLayout>
  );
}
