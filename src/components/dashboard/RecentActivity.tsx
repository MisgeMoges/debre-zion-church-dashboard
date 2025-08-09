import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Megaphone, Calendar } from "lucide-react";

const recentAnnouncements = [
  {
    id: 1,
    title: "Community Meeting This Friday",
    author: "Admin",
    date: "2024-08-09",
    status: "active",
  },
  {
    id: 2,
    title: "New Playground Equipment Installed",
    author: "Maintenance Team",
    date: "2024-08-08",
    status: "active",
  },
  {
    id: 3,
    title: "Holiday Pool Hours Update",
    author: "Pool Staff",
    date: "2024-08-07",
    status: "archived",
  },
];

const recentBookings = [
  {
    id: 1,
    facility: "Community Center",
    member: "John Smith",
    date: "2024-08-12",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: 2,
    facility: "Tennis Court #1",
    member: "Sarah Johnson",
    date: "2024-08-11",
    time: "10:00 AM",
    status: "pending",
  },
  {
    id: 3,
    facility: "Pool Area",
    member: "Mike Chen",
    date: "2024-08-10",
    time: "3:30 PM",
    status: "confirmed",
  },
];

export function RecentActivity() {
  const statusColors = {
    active: "bg-success text-success-foreground",
    archived: "bg-muted text-muted-foreground",
    confirmed: "bg-success text-success-foreground",
    pending: "bg-warning text-warning-foreground",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Announcements */}
      <Card className="card-elevated p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Megaphone className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Recent Announcements</h3>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="space-y-4">
          {recentAnnouncements.map((announcement) => (
            <div
              key={announcement.id}
              className="flex items-start justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">
                  {announcement.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  by {announcement.author} • {announcement.date}
                </p>
              </div>
              <Badge
                className={statusColors[announcement.status as keyof typeof statusColors]}
              >
                {announcement.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Bookings */}
      <Card className="card-elevated p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">Recent Bookings</h3>
          </div>
          <Button variant="ghost" size="sm" className="text-primary">
            View All <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex items-start justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-medium text-foreground mb-1">
                  {booking.facility}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {booking.member} • {booking.date} at {booking.time}
                </p>
              </div>
              <Badge
                className={statusColors[booking.status as keyof typeof statusColors]}
              >
                {booking.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}