import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PaymentForm } from "@/components/forms/PaymentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Search, Edit, Trash2, CreditCard, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const paymentsData = [
  { month: "Jan", amount: 8500 },
  { month: "Feb", amount: 9200 },
  { month: "Mar", amount: 7800 },
  { month: "Apr", amount: 10500 },
  { month: "May", amount: 11200 },
  { month: "Jun", amount: 9800 },
];

const mockPayments = [
  { id: 1, member: "Alice Cooper", amount: 150, date: "2024-08-08", status: "completed", type: "membership", method: "card" },
  { id: 2, member: "Bob Wilson", amount: 75, date: "2024-08-07", status: "pending", type: "event", method: "bank" },
  { id: 3, member: "Carol Davis", amount: 200, date: "2024-08-06", status: "completed", type: "membership", method: "card" },
  { id: 4, member: "Daniel Brown", amount: 50, date: "2024-08-05", status: "failed", type: "service", method: "card" },
  { id: 5, member: "Eva Martinez", amount: 300, date: "2024-08-04", status: "completed", type: "premium", method: "bank" },
];

interface PaymentsProps {
  onLogout?: () => void;
}

export default function Payments({ onLogout }: PaymentsProps) {
  const [payments, setPayments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const { toast } = useToast();

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const pendingPayments = payments.filter(p => p.status === "pending").length;
  const completedPayments = payments.filter(p => p.status === "completed").length;
  const failedPayments = payments.filter(p => p.status === "failed").length;

  const filteredPayments = payments.filter(payment =>
    payment.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormSubmit = (paymentData: any) => {
    if (selectedPayment) {
      // Update existing payment
      setPayments(payments.map(p => 
        p.id === selectedPayment.id 
          ? { ...paymentData, id: selectedPayment.id }
          : p
      ));
      toast({ title: "Payment updated successfully" });
    } else {
      // Add new payment
      const newPayment = {
        ...paymentData,
        id: Math.max(...payments.map(p => p.id)) + 1
      };
      setPayments([newPayment, ...payments]);
      toast({ title: "Payment added successfully" });
    }
    setIsFormDialogOpen(false);
    setSelectedPayment(null);
  };

  const handleEdit = (payment: any) => {
    setSelectedPayment(payment);
    setIsFormDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedPayment(null);
    setIsFormDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setPayments(payments.filter(p => p.id !== id));
    toast({ title: "Payment deleted successfully" });
  };

  return (
    <DashboardLayout onLogout={onLogout}>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Payments</h1>
            <p className="text-muted-foreground">Track member payments and transactions</p>
          </div>
          <Button className="gap-2 btn-gradient" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            Add Payment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPayments.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingPayments}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedPayments}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{failedPayments}</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <CardTitle>Payment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={paymentsData}>
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
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Search and Table */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle>All Payments</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search payments..."
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
                  <TableHead>Member</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.member}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{payment.type}</Badge>
                    </TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>
                      <Badge variant={payment.status === "completed" ? "default" : payment.status === "pending" ? "secondary" : "destructive"}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(payment)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(payment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Form Dialog */}
        <PaymentForm
          payment={selectedPayment}
          open={isFormDialogOpen}
          onClose={() => setIsFormDialogOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
    </DashboardLayout>
  );
}