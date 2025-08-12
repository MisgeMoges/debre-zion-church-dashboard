import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HolidayForm } from "@/components/forms/HolidayForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Plus, Search, Edit, Trash2, Calendar, Clock, MapPin, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const holidaysData = [
  { month: "Jan", count: 2 },
  { month: "Feb", count: 1 },
  { month: "Mar", count: 3 },
  { month: "Apr", count: 2 },
  { month: "May", count: 4 },
  { month: "Jun", count: 3 },
  { month: "Jul", count: 5 },
  { month: "Aug", count: 2 },
  { month: "Sep", count: 1 },
  { month: "Oct", count: 3 },
  { month: "Nov", count: 2 },
  { month: "Dec", count: 4 },
];

const mockHolidays = [
  { id: 1, name: "Summer Festival", date: "2024-08-15", endDate: "2024-08-17", location: "Community Center", type: "festival", status: "upcoming", description: "Annual summer celebration with food and music" },
  { id: 2, name: "Independence Day", date: "2024-07-04", endDate: "2024-07-04", location: "Main Park", type: "national", status: "completed", description: "National holiday celebration" },
  { id: 3, name: "Christmas", date: "2024-12-25", endDate: "2024-12-25", location: "Various Venues", type: "religious", status: "upcoming", description: "Christmas celebration events" },
  { id: 4, name: "New Year", date: "2024-12-31", endDate: "2025-01-01", location: "Town Square", type: "celebration", status: "upcoming", description: "New Year's Eve celebration" },
  { id: 5, name: "Easter", date: "2024-03-31", endDate: "2024-03-31", location: "Community Hall", type: "religious", status: "completed", description: "Easter celebration and egg hunt" },
];

interface HolidaysProps {
  onLogout?: () => void;
}

export default function Holidays({ onLogout }: HolidaysProps) {
  const [holidays, setHolidays] = useState(mockHolidays);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const { toast } = useToast();

  const totalHolidays = holidays.length;
  const upcomingHolidays = holidays.filter(h => h.status === "upcoming").length;
  const completedHolidays = holidays.filter(h => h.status === "completed").length;
  const thisMonthHolidays = holidays.filter(h => {
    const holidayDate = new Date(h.date);
    const currentDate = new Date();
    return holidayDate.getMonth() === currentDate.getMonth() && holidayDate.getFullYear() === currentDate.getFullYear();
  }).length;

  const filteredHolidays = holidays.filter(holiday =>
    holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holiday.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    holiday.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFormSubmit = (holidayData: any) => {
    if (selectedHoliday) {
      // Update existing holiday
      setHolidays(holidays.map(h => 
        h.id === selectedHoliday.id 
          ? { ...holidayData, id: selectedHoliday.id }
          : h
      ));
      toast({ title: "Holiday updated successfully" });
    } else {
      // Add new holiday
      const newHoliday = {
        ...holidayData,
        id: Math.max(...holidays.map(h => h.id)) + 1
      };
      setHolidays([newHoliday, ...holidays]);
      toast({ title: "Holiday added successfully" });
    }
    setIsFormDialogOpen(false);
    setSelectedHoliday(null);
  };

  const handleEdit = (holiday: any) => {
    setSelectedHoliday(holiday);
    setIsFormDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedHoliday(null);
    setIsFormDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setHolidays(holidays.filter(h => h.id !== id));
    toast({ title: "Holiday deleted successfully" });
  };

  return (
    <DashboardLayout onLogout={onLogout}>
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Holidays</h1>
            <p className="text-muted-foreground">Manage community holidays and celebrations</p>
          </div>
          <Button className="gap-2 btn-gradient" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            Add Holiday
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Holidays</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHolidays}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingHolidays}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedHolidays}</div>
            </CardContent>
          </Card>
          <Card className="card-elevated animate-slide-up">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisMonthHolidays}</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <CardTitle>Holidays Throughout the Year</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={holidaysData}>
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
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Search and Table */}
        <Card className="card-elevated animate-slide-up">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle>All Holidays</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search holidays..."
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
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredHolidays.map((holiday) => (
                  <TableRow key={holiday.id}>
                    <TableCell className="font-medium">{holiday.name}</TableCell>
                    <TableCell>
                      {holiday.date === holiday.endDate ? holiday.date : `${holiday.date} - ${holiday.endDate}`}
                    </TableCell>
                    <TableCell>{holiday.location}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{holiday.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={holiday.status === "upcoming" ? "default" : holiday.status === "completed" ? "secondary" : "destructive"}>
                        {holiday.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(holiday)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(holiday.id)}
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

        {/* Holiday Form Dialog */}
        <HolidayForm
          holiday={selectedHoliday}
          open={isFormDialogOpen}
          onClose={() => setIsFormDialogOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </div>
    </DashboardLayout>
  );
}