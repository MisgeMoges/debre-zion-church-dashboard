import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DonationForm } from "@/components/forms/DonationForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Search, Edit, Trash2, DollarSign, TrendingUp, Users, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const donationsData = [
  { month: "Jan", amount: 12500 },
  { month: "Feb", amount: 15800 },
  { month: "Mar", amount: 18200 },
  { month: "Apr", amount: 16900 },
  { month: "May", amount: 22400 },
  { month: "Jun", amount: 19800 },
];

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

const mockDonations:Donation[] = [
  { id: 1, userId: 1, amount: 500, date: "2024-08-08", status: "completed", paymentType: "one-time",description:'holiday',method:'bank',transactionId:'98' },
  { id: 2, userId: 2, amount: 500, date: "2024-08-08", status: "completed", paymentType: "one-time",description:'holiday',method:'bank',transactionId:'98' },
  { id: 3, userId: 3, amount: 500, date: "2024-08-08", status: "completed", paymentType: "one-time",description:'holiday',method:'bank',transactionId:'98' },
  { id: 4, userId: 4, amount: 500, date: "2024-08-08", status: "completed", paymentType: "one-time",description:'holiday',method:'bank',transactionId:'98' },
];

interface DonationsProps {
  onLogout?: () => void;
}

export default function Donations({ onLogout }: DonationsProps) {
  const [donations, setDonations] = useState(mockDonations);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const { toast } = useToast();

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const completedDonations = donations.filter(d => d.status === "completed").length;
  const monthlyDonors = donations.filter(d => d.paymentType === "monthly").length;
  const avgDonation = totalDonations / donations.length;

  // const filteredDonations = donations.filter(donation =>
  //   donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   donation.type.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const handleFormSubmit = (donationData: any) => {
    if (selectedDonation) {
      // Update existing donation
      setDonations(donations.map(d => 
        d.id === selectedDonation.id 
          ? { ...donationData, id: selectedDonation.id }
          : d
      ));
      toast({ title: "Donation updated successfully" });
    } else {
      // Add new donation
      const newDonation = {
        ...donationData,
        id: Math.max(...donations.map(d => d.id)) + 1
      };
      setDonations([newDonation, ...donations]);
      toast({ title: "Donation added successfully" });
    }
    setIsFormDialogOpen(false);
    setSelectedDonation(null);
  };

  const handleEdit = (donation: any) => {
    setSelectedDonation(donation);
    setIsFormDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedDonation(null);
    setIsFormDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDonations(donations.filter(d => d.id !== id));
    toast({ title: "Donation deleted successfully" });
  };

  return (
    <DashboardLayout onLogout={onLogout}>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Donations</h1>
            <p className="text-muted-foreground">Manage community donations</p>
          </div>
          <Button className="gap-2 btn-gradient" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            Add Donation
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedDonations}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Donors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyDonors}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(avgDonation)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <CardTitle>Donations Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={donationsData}>
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
                  dataKey="amount"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Search and Table */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle>All Donations</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search donations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor Id</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Payment Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                  <TableHead>description</TableHead>
                  <TableHead>method</TableHead>
                  <TableHead>transaction Id</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.userId}</TableCell>
                    <TableCell>${donation.amount}</TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>
                      <Badge variant={donation.paymentType === "monthly" ? "default" : "secondary"}>
                        {donation.paymentType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={donation.status === "completed" ? "default" : donation.status === "pending" ? "secondary" : "destructive"}>
                        {donation.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(donation)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(donation.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{donation.description}</TableCell>
                    <TableCell>{donation.method}</TableCell>
                    <TableCell>{donation.transactionId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Donation Form Dialog */}
        <DonationForm
          donation={selectedDonation}
          open={isFormDialogOpen}
          onClose={() => setIsFormDialogOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
    </DashboardLayout>
  );
}