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
import ProtectedRoute from "@/components/layout/ProtectedRoute"; // ✅
import { signOut } from "firebase/auth";
import { auth } from "@/firebase"; // adjust path if needed

const queryClient = new QueryClient();

const App = () => {
  const handleLogout = async () => {
  try {
    await signOut(auth);
    window.location.href = "/"; // redirect to login page after logout
  } catch (error) {
    console.error("Logout failed:", error);
    // Optionally show a toast or notification about logout failure
  }
};


  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route path="/" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/announcements"
              element={
                <ProtectedRoute>
                  <Announcements onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <Members onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <ProtectedRoute>
                  <Bookings onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/donations"
              element={
                <ProtectedRoute>
                  <Donations onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <Payments onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/holidays"
              element={
                <ProtectedRoute>
                  <Holidays onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/services"
              element={
                <ProtectedRoute>
                  <Services onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            {/* 404 fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
