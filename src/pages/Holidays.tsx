import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState(null);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const holidayData = {
      id: editingHoliday?.id || Date.now(),
      name: formData.get("name") as string,
      date: formData.get("date") as string,
      endDate: formData.get("endDate") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      status: formData.get("status") as string,
      description: formData.get("description") as string,
    };

    if (editingHoliday) {
      setHolidays(holidays.map(h => h.id === editingHoliday.id ? holidayData : h));
      toast({ title: "Holiday updated successfully" });
    } else {
      setHolidays([holidayData, ...holidays]);
      toast({ title: "Holiday added successfully" });
    }

    setIsDialogOpen(false);
    setEditingHoliday(null);
  };

  const handleEdit = (holiday: any) => {
    setEditingHoliday(holiday);
    setIsDialogOpen(true);
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
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2" onClick={() => setEditingHoliday(null)}>
                <Plus className="h-4 w-4" />
                Add Holiday
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingHoliday ? "Edit Holiday" : "Add New Holiday"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Holiday Name</Label>
                  <Input id="name" name="name" defaultValue={editingHoliday?.name || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Start Date</Label>
                  <Input id="date" name="date" type="date" defaultValue={editingHoliday?.date || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" name="endDate" type="date" defaultValue={editingHoliday?.endDate || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" defaultValue={editingHoliday?.location || ""} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select id="type" name="type" defaultValue={editingHoliday?.type || "celebration"} className="w-full p-2 border rounded-md">
                    <option value="celebration">Celebration</option>
                    <option value="festival">Festival</option>
                    <option value="national">National</option>
                    <option value="religious">Religious</option>
                    <option value="cultural">Cultural</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <select id="status" name="status" defaultValue={editingHoliday?.status || "upcoming"} className="w-full p-2 border rounded-md">
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" name="description" defaultValue={editingHoliday?.description || ""} rows={3} />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">Save</Button>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">Cancel</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
      </div>
    </DashboardLayout>
  );
}