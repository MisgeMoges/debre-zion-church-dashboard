import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

interface Announcement {
  id: string;
  title: string;
  body: string;
  imageUrl?: string;
  isRead?: boolean;
  targetCategories?: string[] | null;
  targetType?: string;
  targetUserIds?: string[] | null;
  timestamp?: any;
};

interface AnnouncementFormProps {
  announcement?: Announcement;
  open: boolean;
  onClose: () => void;
  onSubmit: (announcement: Announcement) => void;
}

export function AnnouncementForm({ announcement, open, onClose, onSubmit }: AnnouncementFormProps) {
  console.log("AnnouncementForm rendered with:", announcement);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Announcement>({
    id: "",
    title: "",
    body: "",
    imageUrl: "",
    isRead: false,
    targetCategories: [],
    targetType: "all",
    targetUserIds: [],
    timestamp: null,
  });

  // 🔹 Update formData when announcement changes
  useEffect(() => {
    if (announcement) {
      setFormData({
        id: announcement.id || "",
        title: announcement.title || "",
        body: announcement.body || "",
        imageUrl: announcement.imageUrl || "",
        isRead: announcement.isRead || false,
        targetCategories: announcement.targetCategories || [],
        targetType: announcement.targetType || "all",
        targetUserIds: announcement.targetUserIds || [],
        timestamp: announcement.timestamp || null,
      });
    } else {
      // Reset form when creating new announcement
      setFormData({
        id: "",
        title: "",
        body: "",
        imageUrl: "",
        isRead: false,
        targetCategories: [],
        targetType: "all",
        targetUserIds: [],
        timestamp: null,
      });
    }
  }, [announcement, open]); // include open so it resets when reopening the dialog


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.body) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: announcement ? "Announcement Updated" : "Announcement Created",
      description: `The announcement has been ${announcement ? "updated" : "created"} successfully.`,
    });
    onClose();
  };

  const handleChange = (field: keyof Announcement, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {announcement ? "Edit Announcement" : "Create New Announcement"}
          </DialogTitle>
          <DialogDescription>
            {announcement ? "Update the announcement details." : "Add a new announcement for the community."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter announcement title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Content *</Label>
            <Textarea
              id="body"
              value={formData.body}
              onChange={(e) => handleChange("body", e.target.value)}
              placeholder="Enter announcement content"
              rows={5}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => handleChange("imageUrl", e.target.value)}
                placeholder="Optional image URL"
              />
            </div>
          
            <div className="space-y-2">
              <Label htmlFor="status">Target Type</Label>
              <Select value={formData.targetType} onValueChange={(value) => handleChange("targetType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Target Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={formData.targetType} onClick={() => handleChange("targetType", "all")}>All</SelectItem>
                  <SelectItem value={formData.targetType} onClick={() => handleChange("targetType", "clergy")}>Clergy</SelectItem>
                  <SelectItem value={formData.targetType} onClick={() => handleChange("targetType", "archived")}>Members</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Publication Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.timestamp}
              onChange={(e) => handleChange("timestamp", e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="btn-gradient">
              {announcement ? "Update Announcement" : "Create Announcement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}