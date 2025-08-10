import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Megaphone,
  Calendar,
  Users,
  Heart,
  CreditCard,
  Plane,
  Settings,
  Menu,
  BarChart3,
  X,
  MessageSquare,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3 },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Announcements", href: "/announcements", icon: Megaphone },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Members", href: "/members", icon: Users },
  { name: "Donations", href: "/donations", icon: Heart },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Holidays", href: "/holidays", icon: Plane },
  { name: "Services", href: "/services", icon: Settings },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

export function AppSidebar({ collapsed, onToggle, onLogout }: AppSidebarProps) {
  const location = useLocation();

  return (
    <div
      className={cn(
        "bg-card border-r border-border/50 flex flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2 animate-fade-in">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-lg font-semibold text-foreground">
                Community
              </h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="ml-auto hover:bg-primary/10"
          >
            {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                <Icon className={cn("w-5 h-5 flex-shrink-0")} />
                {!collapsed && (
                  <span className="animate-fade-in">{item.name}</span>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="px-4 pb-4">
        <Separator className="mb-4" />
        <Button
          variant="ghost"
          onClick={onLogout}
          className={cn(
            "w-full justify-start gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/50",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span className="animate-fade-in">Logout</span>}
        </Button>
      </div>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border/50 animate-fade-in">
          <div className="text-xs text-muted-foreground text-center">
            Community Dashboard v1.0
          </div>
        </div>
      )}
    </div>
  );
}