import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Mock data for charts
const monthlyData = [
  { month: "Jan", donations: 4200, payments: 3800 },
  { month: "Feb", donations: 3800, payments: 4200 },
  { month: "Mar", donations: 5200, payments: 3900 },
  { month: "Apr", donations: 4800, payments: 4500 },
  { month: "May", donations: 6200, payments: 5200 },
  { month: "Jun", donations: 5800, payments: 4800 },
];

const memberDistribution = [
  { name: "Regular Members", value: 320, color: "#10b981" },
  { name: "Premium Members", value: 128, color: "#3b82f6" },
  { name: "Senior Members", value: 87, color: "#f59e0b" },
  { name: "Student Members", value: 65, color: "#8b5cf6" },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Donations and Payments Trend */}
      <Card className="card-elevated p-6 xl:col-span-2 animate-slide-up">
        <h3 className="text-lg font-semibold mb-6">Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={monthlyData}>
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
            <Legend />
            <Area
              type="monotone"
              dataKey="donations"
              stackId="1"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
              name="Donations"
            />
            <Area
              type="monotone"
              dataKey="payments"
              stackId="1"
              stroke="hsl(var(--primary-light))"
              fill="hsl(var(--primary-light))"
              fillOpacity={0.6}
              name="Payments"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Member Distribution */}
      <Card className="card-elevated p-6 animate-slide-up">
        <h3 className="text-lg font-semibold mb-6">Member Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={memberDistribution}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {memberDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-medium)",
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Legend */}
        <div className="mt-4 space-y-2">
          {memberDistribution.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}