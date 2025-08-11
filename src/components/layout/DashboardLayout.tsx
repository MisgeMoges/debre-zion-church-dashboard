import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { DashboardHeader } from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout?: () => void;
}

export function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        onLogout={onLogout}
      />
      <div className="flex-1 overflow-auto flex flex-col">
        <DashboardHeader onLogout={onLogout} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}