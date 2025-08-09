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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Booking {
  id: number;
  facility: string;
  member: string;
  date: string;
  time: string;
  duration: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

const mockBookings: Booking[] = [
  {
    id: 1,
    facility: "Community Center",
    member: "John Smith",
    date: "2024-08-12",
    time: "2:00 PM",
    duration: "2 hours",
    status: "confirmed",
    createdAt: "2024-08-09",
  },
  {
    id: 2,
    facility: "Tennis Court #1",
    member: "Sarah Johnson",
    date: "2024-08-11",
    time: "10:00 AM",
    duration: "1 hour",
    status: "pending",
    createdAt: "2024-08-09",
  },
  {
    id: 3,
    facility: "Pool Area",
    member: "Mike Chen",
    date: "2024-08-10",
    time: "3:30 PM",
    duration: "1.5 hours",
    status: "confirmed",
    createdAt: "2024-08-08",
  },
  {
    id: 4,
    facility: "Basketball Court",
    member: "Emily Davis",
    date: "2024-08-09",
    time: "7:00 PM",
    duration: "2 hours",
    status: "cancelled",
    createdAt: "2024-08-07",
  },
];

const bookingTrendsData = [
  { month: "Jan", bookings: 45 },
  { month: "Feb", bookings: 52 },
  { month: "Mar", bookings: 48 },
  { month: "Apr", bookings: 61 },
  { month: "May", bookings: 55 },
  { month: "Jun", bookings: 67 },
];

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter(booking =>
    booking.facility.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.member.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const summaryData = [
    {
      title: "Total Bookings",
      value: bookings.length,
      change: "+18%",
      changeType: "positive" as const,
      icon: Calendar,
      color: "primary" as const,
    },
    {
      title: "Confirmed",
      value: bookings.filter(b => b.status === "confirmed").length,
      change: "+12%",
      changeType: "positive" as const,
      icon: CheckCircle,
      color: "success" as const,
    },
    {
      title: "Pending",
      value: bookings.filter(b => b.status === "pending").length,
      change: "+5%",
      changeType: "positive" as const,
      icon: Clock,
      color: "warning" as const,
    },
    {
      title: "Cancelled",
      value: bookings.filter(b => b.status === "cancelled").length,
      change: "-8%",
      changeType: "positive" as const,
      icon: XCircle,
      color: "destructive" as const,
    },
  ];

  const statusColors = {
    confirmed: "bg-success text-success-foreground",
    pending: "bg-warning text-warning-foreground",
    cancelled: "bg-destructive text-destructive-foreground",
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Bookings
            </h1>
            <p className="text-muted-foreground">
              Manage facility bookings and reservations.
            </p>
          </div>
          
          <Button variant="gradient">
            <Plus className="w-4 h-4 mr-2" />
            New Booking
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((card, index) => (
            <div key={card.title} style={{ animationDelay: `${index * 0.1}s` }}>
              <SummaryCard {...card} />
            </div>
          ))}
        </div>

        {/* Booking Trends Chart */}
        <Card className="card-elevated p-6 animate-slide-up">
          <h3 className="text-lg font-semibold mb-6">Booking Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-medium)",
                }}
              />
              <Bar
                dataKey="bookings"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Search and Filters */}
        <Card className="card-elevated p-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search bookings..."
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

        {/* Bookings Table */}
        <Card className="card-elevated animate-slide-up">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Facility</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">
                    {booking.facility}
                  </TableCell>
                  <TableCell>{booking.member}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell>{booking.time}</TableCell>
                  <TableCell>{booking.duration}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[booking.status]}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}