import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  color?: "primary" | "success" | "warning" | "destructive";
  onClick?: () => void;
}

export function SummaryCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  color = "primary",
  onClick,
}: SummaryCardProps) {
  const colorStyles = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };

  const changeStyles = {
    positive: "text-success",
    negative: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <Card className="card-elevated p-6 cursor-pointer animate-fade-in" onClick={onClick}>
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-lg", colorStyles[color])}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <span className={cn("text-sm font-medium", changeStyles[changeType])}>
            {change}
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </Card>
  );
}