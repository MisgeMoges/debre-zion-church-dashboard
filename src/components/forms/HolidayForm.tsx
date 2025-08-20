import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface Holiday {
  id?: number;
  title: string;
  date: string;
  reminderAdvanceDays: number;
  description: string;
}

interface HolidayFormProps {
  holiday?: Holiday;
  open: boolean;
  onClose: () => void;
  onSubmit: (holiday: Holiday) => void;
}

export function HolidayForm({ holiday, open, onClose, onSubmit }: HolidayFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Holiday>({
    title: holiday?.title || "",
    reminderAdvanceDays: holiday?.reminderAdvanceDays ,
    date: holiday?.date || new Date().toISOString().split('T')[0],
    description: holiday?.description || "",
    ...(holiday?.id && { id: holiday.id }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    onSubmit(formData);
    toast({
      title: "Success",
      description: `Holiday ${holiday ? 'updated' : 'created'} successfully.`,
    });
    onClose();
  };

  const handleChange = (field: keyof Holiday, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {holiday ? "Edit Holiday" : "Add New Holiday"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Holiday Name *</Label>
            <Input
              id="name"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter holiday name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Start Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">Reminder Advance Days</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.reminderAdvanceDays}
                onChange={(e) => handleChange("reminderAdvanceDays", e.target.value)}
                required
              />
            </div>
          </div>

         

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter holiday description"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              {holiday ? "Update Holiday" : "Add Holiday"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}