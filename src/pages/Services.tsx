import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ServiceForm } from "@/components/forms/ServiceForm";
import { DeleteConfirmation } from "@/components/forms/DeleteConfirmation";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Plus, Search, Edit, Trash2, Settings, Users, Clock, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const servicesDistribution = [
  { name: "Fitness Classes", value: 35, color: "#10b981" },
  { name: "Counseling", value: 25, color: "#3b82f6" },
  { name: "Workshops", value: 20, color: "#f59e0b" },
  { name: "Support Groups", value: 15, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#ef4444" },
];

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

const mockServices = [
  { id: 1, title: "Yoga Classes", description: "Weekly yoga sessions for all levels", category: "fitness", price: 25, time: "60 min",  leader: "Sarah Johnson",location:'addids ababa' },
  { id: 2, title: "Yoga Classes", description: "Weekly yoga sessions for all levels", category: "fitness", price: 25, time: "60 min",  leader: "Sarah Johnson",location:'addids ababa' },
  
  { id: 3, title: "Yoga Classes", description: "Weekly yoga sessions for all levels", category: "fitness", price: 25, time: "60 min",  leader: "Sarah Johnson",location:'addids ababa' },
  { id: 4, title: "Yoga Classes", description: "Weekly yoga sessions for all levels", category: "fitness", price: 25, time: "60 min",  leader: "Sarah Johnson",location:'addids ababa' },
  
];

interface ServicesProps {
  onLogout?: () => void;
}

export default function Services({ onLogout }: ServicesProps) {
  const [services, setServices] = useState(mockServices);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteService, setDeleteService] = useState(null);
  const { toast } = useToast();

  const totalServices = services.length;
  // const activeServices = services.filter(s => s.status === "active").length;
  const totalRevenue = services.reduce((sum, service) => sum + service.price, 0);
  const avgPrice = totalRevenue / services.length;

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.leader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (serviceData: any) => {
    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? serviceData : s));
    } else {
      setServices([{ ...serviceData, id: Date.now() }, ...services]);
    }
    setEditingService(null);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setServices(services.filter(s => s.id !== id));
    setDeleteService(null);
    toast({ title: "Service deleted successfully" });
  };

  return (
    <DashboardLayout onLogout={onLogout}>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Services</h1>
            <p className="text-muted-foreground">Manage community services and programs</p>
          </div>
          <Button 
            className="gap-2" 
            onClick={() => {
              setEditingService(null);
              setIsFormOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Add Service
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Services</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalServices}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            {/* <CardContent>
              <div className="text-2xl font-bold">{activeServices}</div>
            </CardContent> */}
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(avgPrice)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={servicesDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {servicesDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Search and Table */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle>All Services</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search services..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>time</TableHead>
                  <TableHead>Leader</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.title}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{service.category}</Badge>
                    </TableCell>
                    <TableCell>${service.price}</TableCell>
                    <TableCell>{service.time}</TableCell>
                    <TableCell>{service.leader}</TableCell>
                    <TableCell>
                      {service.location}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(service)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteService(service)}
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

        {/* Forms and Dialogs */}
        <ServiceForm
          service={editingService}
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingService(null);
          }}
          onSubmit={handleSubmit}
        />

        <DeleteConfirmation
          open={!!deleteService}
          onClose={() => setDeleteService(null)}
          onConfirm={() => handleDelete(deleteService?.id)}
          title="Delete Service"
          description={`Are you sure you want to delete "${deleteService?.name}"? This action cannot be undone.`}
        />
      </div>
    </DashboardLayout>
  );
}