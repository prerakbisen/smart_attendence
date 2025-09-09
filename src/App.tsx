import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import AttendanceMonitor from "./pages/AttendanceMonitor";
import DailyRoutine from "./pages/DailyRoutine";
import FaceRecognition from "./pages/FaceRecognition";
import StudentManagement from "./pages/StudentManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/attendance" element={<Layout><AttendanceMonitor /></Layout>} />
          <Route path="/routine" element={<Layout><DailyRoutine /></Layout>} />
          <Route path="/camera" element={<Layout><FaceRecognition /></Layout>} />
          <Route path="/students" element={<Layout><StudentManagement /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
