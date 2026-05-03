import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import DashboardHome from "./pages/dashboard/DashboardHome"; // ✅ added

import Chat from "./pages/dashboard/Chat";
import Journal from "./pages/dashboard/Journal";
import MoodTracker from "./pages/dashboard/MoodTracker";
import Breathe from "./pages/dashboard/Breathe";
import LabReports from "./pages/dashboard/LabReports";
import Profile from "./pages/dashboard/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* ✅ FIXED ONLY THIS LINE */}
            <Route index element={<DashboardHome />} />

            <Route path="chat" element={<Chat />} />
            <Route path="chat/:id" element={<Chat />} />
            <Route path="journal" element={<Journal />} />
            <Route path="mood" element={<MoodTracker />} />
            <Route path="breathe" element={<Breathe />} />
            <Route path="lab-reports" element={<LabReports />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;