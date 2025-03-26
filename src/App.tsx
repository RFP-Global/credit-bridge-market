
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Access from "./pages/Access";
import NotFound from "./pages/NotFound";
import EnterpriseLogin from "./pages/EnterpriseLogin";
import LenderLogin from "./pages/LenderLogin";
import EnterpriseDashboard from "./pages/EnterpriseDashboard";
import LenderDashboard from "./pages/LenderDashboard";
import Intelligence from "./pages/Intelligence";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/access" element={<Access />} />
          <Route path="/enterprise-login" element={<EnterpriseLogin />} />
          <Route path="/lender-login" element={<LenderLogin />} />
          <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />
          <Route path="/lender-dashboard" element={<LenderDashboard />} />
          <Route path="/intelligence" element={<Intelligence />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
