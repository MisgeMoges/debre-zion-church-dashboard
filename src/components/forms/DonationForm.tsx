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

interface Donation {
  id?: number;
  userId:number;
 description:string;
 method:string;
 transactionId:string;
  amount: number;
  date: string;
  status: string;
  paymentType: string;
}

interface DonationFormProps {
  donation?: Donation;
  open: boolean;
  onClose: () => void;
  onSubmit: (donation: Donation) => void;
}

export function DonationForm({ donation, open, onClose, onSubmit }: DonationFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Donation>({
    amount: donation?.amount || 0,
    date: donation?.date ,
    status: donation?.status || "pending",
    paymentType: donation?.paymentType || "one-time",
    transactionId: donation?.transactionId ,
    method: donation?.method ,
    description: donation?.description ,
    id: donation?.id ,
    userId: donation?.userId ,
    ...(donation?.id && { id: donation.id }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.userId || formData.amount <= 0) {
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
      description: `Donation ${donation ? 'updated' : 'created'} successfully.`,
    });
    onClose();
  };

  const handleChange = (field: keyof Donation, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {donation ? "Edit Donation" : "Add New Donation"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="donor">Donor Id *</Label>
            <Input
              id="donor"
              value={formData.userId}
              onChange={(e) => handleChange("userId", e.target.value)}
              placeholder="Enter donor Id"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="method">Method *</Label>
            <Input
              id="method"
              value={formData.method}
              onChange={(e) => handleChange("method", e.target.value)}
              placeholder="Enter payment method"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transactionId">Donor Id *</Label>
            <Input
              id="transactionId"
              value={formData.transactionId}
              onChange={(e) => handleChange("transactionId", e.target.value)}
              placeholder="Enter transaction Id"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($) *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleChange("amount", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={formData.paymentType} onValueChange={(value) => handleChange("paymentType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="one-time">One-time</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient">
              {donation ? "Update Donation" : "Add Donation"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}