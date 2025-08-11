import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Announcements from "./pages/Announcements";
import Members from "./pages/Members";
import Bookings from "./pages/Bookings";
import Donations from "./pages/Donations";
import Payments from "./pages/Payments";
import Holidays from "./pages/Holidays";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const handleLogout = () => {
    console.log("User logged out");
    // Navigate to login page would go here
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard onLogout={handleLogout} />} />
            <Route path="/messages" element={<Messages onLogout={handleLogout} />} />
            <Route path="/announcements" element={<Announcements onLogout={handleLogout} />} />
            <Route path="/members" element={<Members onLogout={handleLogout} />} />
            <Route path="/bookings" element={<Bookings onLogout={handleLogout} />} />
            <Route path="/donations" element={<Donations onLogout={handleLogout} />} />
            <Route path="/payments" element={<Payments onLogout={handleLogout} />} />
            <Route path="/holidays" element={<Holidays onLogout={handleLogout} />} />
            <Route path="/services" element={<Services onLogout={handleLogout} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
