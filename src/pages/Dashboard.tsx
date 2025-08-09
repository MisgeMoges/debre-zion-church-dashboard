import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { DashboardCharts } from "@/components/dashboard/DashboardCharts";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import {
  Megaphone,
  Calendar,
  Users,
  Heart,
  CreditCard,
  Plane,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  // Mock data for summary cards
  const summaryData = [
    {
      title: "Total Announcements",
      value: 42,
      change: "+12%",
      changeType: "positive" as const,
      icon: Megaphone,
      color: "primary" as const,
    },
    {
      title: "Upcoming Bookings",
      value: 28,
      change: "+8%",
      changeType: "positive" as const,
      icon: Calendar,
      color: "primary" as const,
    },
    {
      title: "Active Members",
      value: 600,
      change: "+5%",
      changeType: "positive" as const,
      icon: Users,
      color: "success" as const,
    },
    {
      title: "Total Donations",
      value: "$12,450",
      change: "+15%",
      changeType: "positive" as const,
      icon: Heart,
      color: "success" as const,
    },
    {
      title: "Pending Payments",
      value: 7,
      change: "-3%",
      changeType: "positive" as const,
      icon: CreditCard,
      color: "warning" as const,
    },
    {
      title: "Upcoming Holidays",
      value: 3,
      change: "No change",
      changeType: "neutral" as const,
      icon: Plane,
      color: "primary" as const,
    },
    {
      title: "Active Services",
      value: 15,
      change: "+2",
      changeType: "positive" as const,
      icon: Settings,
      color: "primary" as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Community Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening in your community today.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((card, index) => (
            <div key={card.title} style={{ animationDelay: `${index * 0.1}s` }}>
              <SummaryCard {...card} />
            </div>
          ))}
        </div>

        {/* Charts */}
        <DashboardCharts />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </DashboardLayout>
  );
}