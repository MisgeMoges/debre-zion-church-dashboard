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

interface Service {
  id?: number;
  title: string;
  description: string;
  imageUrls:[]
  category: string;
  price: number;
  time: string;
  location: string;
  leader: string;
}

interface ServiceFormProps {
  service?: Service;
  open: boolean;
  onClose: () => void;
  onSubmit: (service: Service) => void;
}

export function ServiceForm({ service, open, onClose, onSubmit }: ServiceFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Service>({
    title: service?.title || "",
    description: service?.description || "",
    category: service?.category || "fitness",
    price: service?.price || 0,
    time: service?.time || "",
    location: service?.location || "",
    leader: service?.leader || "",
    imageUrls: service?.imageUrls ,
    ...(service?.id && { id: service.id }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location) {
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
      description: `Service ${service ? 'updated' : 'created'} successfully.`,
    });
    onClose();
  };

  const handleChange = (field: keyof Service, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit Service" : "Add New Service"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name *</Label>
              <Input
                id="name"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter service name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
               <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter service name"
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
              placeholder="Enter service description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => handleChange("time", e.target.value)}
                placeholder="e.g., 60 min"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leader">Leader</Label>
              <Input
                id="leader"
                type="string"
                value={formData.leader}
                onChange={(e) => handleChange("leader", e.target.value)}
              placeholder="Enter service leader name"
              />
            </div>

           
          </div>

          <div className="space-y-2">
            <Label htmlFor="provider">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder="Enter location"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              {service ? "Update Service" : "Add Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}