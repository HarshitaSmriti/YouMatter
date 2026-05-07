<<<<<<< HEAD
import {
  Routes,
  Route,
} from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Journal from "./pages/Journal";
import MoodTracker from "./pages/MoodTracker";
import Breathing from "./pages/Breathing";
import Games from "./pages/Games";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import ConsentForm from "./pages/ConsentForm";
import AuthCallback from "./pages/AuthCallback";

import {
  useEffect,
  useState,
} from "react";

function App() {
  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      document.documentElement.classList.remove(
        "dark"
      );

      localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [darkMode]);

  return (
    <Routes>
      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/consent"
        element={<ConsentForm />}
      />

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/chat"
        element={<Chat />}
      />

      <Route
        path="/journal"
        element={<Journal />}
      />

      <Route
        path="/mood"
        element={<MoodTracker />}
      />

      <Route
        path="/breathing"
        element={<Breathing />}
      />

      <Route
        path="/games"
        element={<Games />}
      />

      <Route
        path="/support"
        element={<Support />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

      <Route
        path="/auth/callback"
        element={<AuthCallback />}
      />
    </Routes>
  );
}
=======
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
>>>>>>> 02e552b9d9158fd1d5eb1a2c67a771f15424d1bf

export default App;