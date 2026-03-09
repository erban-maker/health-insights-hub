import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { FormProvider } from "@/contexts/FormContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HealthCheck from "./pages/HealthCheck";
import Results from "./pages/Results";
import BMICalculator from "./pages/BMICalculator";
import Dashboard from "./pages/Dashboard";
import DiseaseInfo from "./pages/DiseaseInfo";
import HealthTips from "./pages/HealthTips";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <FormProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/health-check" element={<HealthCheck />} />
              <Route path="/results" element={<Results />} />
              <Route path="/bmi-calculator" element={<BMICalculator />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/disease-info" element={<DiseaseInfo />} />
              <Route path="/health-tips" element={<HealthTips />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </FormProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
