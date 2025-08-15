import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Contact } from "lucide-react";

interface Booking {
  id?: string;  
  memberName: string;
  date: string;
  status: "confirmed" | "pending" | "cancelled";
  contact: string;
  serviceType:string;
  message: string;
}

interface BookingFormProps {
  booking?: Booking;
  open: boolean;
  onClose: () => void;
  onSubmit: (booking: Booking) => void;
}



const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
  "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
];



export function BookingForm({ booking, open, onClose, onSubmit }: BookingFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Booking>({
    memberName: booking?.memberName ,
    date: booking?.date || new Date().toISOString().split('T')[0],
   status: booking?.status || "pending",
   contact: booking?.contact ,
   serviceType: booking?.serviceType,
   message: booking?.message
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.memberName || !formData.date || !formData.message || !formData.contact || !formData.serviceType) {
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
      description: `Booking ${booking ? 'updated' : 'created'} successfully.`,
    });
    onClose();
  };

  const handleChange = (field: keyof Booking, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>
            {booking ? "Edit Booking" : "New Booking"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* <div className="space-y-2">
              <Label htmlFor="facility">Facility *</Label>
              <Select value={formData.facility} onValueChange={(value) => handleChange("facility", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select facility" />
                </SelectTrigger>
                <SelectContent>
                  {facilities.map((facility) => (
                    <SelectItem key={facility} value={facility}>
                      {facility}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            
            <div className="space-y-2">
              <Label htmlFor="member">Member *</Label>
              <Input
                id="member"
                value={formData.memberName}
                onChange={(e) => handleChange("memberName", e.target.value)}
                placeholder="Enter member name"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Select value={formData.date} onValueChange={(value) => handleChange("date", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Contact</Label>
              <Input
                id="contact"
                type="contact"
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                required
              />
            </div>

             <div className="space-y-2">
              <Label htmlFor="service type">Service Type</Label>
              <Input
                id="service type"
                value={formData.serviceType}
                onChange={(e) => handleChange("serviceType", e.target.value)}
                placeholder="Enter service type"
                required
              />
            </div>

             <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Enter message"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              {booking ? "Update Booking" : "Create Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}