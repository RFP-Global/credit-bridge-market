import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "@/pages/Login";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import Access from "./pages/Access";
import NotFound from "./pages/NotFound";
import EnterpriseLogin from "./pages/EnterpriseLogin";
import LenderLogin from "./pages/LenderLogin";
import EnterpriseSignUp from "./pages/EnterpriseSignUp";
import LenderSignUp from "./pages/LenderSignUp";
import EnterpriseDashboard from "./pages/EnterpriseDashboard";
import EnterpriseProfile from "./pages/EnterpriseProfile";
import LenderDashboard from "./pages/LenderDashboard";
import DealDetails from "./components/lender/DealDetails";
import Intelligence from "./pages/Intelligence";
import Education from "./pages/Education";
import ProposalDetails from "./pages/ProposalDetails";
import BidSubmission from "./pages/BidSubmission";
import FullscreenButton from "./components/FullscreenButton";
import ProposalsDashboard from "./pages/ProposalsDashboard";
import ProposalBids from "./pages/ProposalBids";
import CreateProposal from "./pages/CreateProposal";
import TransactionArchive from "./pages/TransactionArchive";
import TransactionDetails from "./pages/TransactionDetails";
import FacilityBuilder from "./pages/FacilityBuilder";
import FacilityMechanics from "./pages/FacilityMechanics";
import FacilityReferenceDetail from "./pages/FacilityReferenceDetail";
import BidComparison from "./pages/BidComparison";
import VDR from "./pages/VDR";
import Lenders from "./pages/Lenders";
import LenderProfile from "./pages/LenderProfile";
import Team from "./pages/Team";
import Underwriting from "./pages/Underwriting";
import BorrowerUnderwritingPage from "./pages/BorrowerUnderwritingPage";
import { useState } from "react";
import TransactionDetailsView from "./pages/TransactionDetailsView";
import EnterpriseNetwork from "./pages/EnterpriseNetwork";
import EnterpriseDetail from "./pages/EnterpriseDetail";
import BorrowerRatioDetails from "./pages/BorrowerRatioDetails";
import FinancialReport from "./pages/FinancialReport";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <FullscreenButton />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
              <Route path="/proposal/:id" element={<ProtectedRoute><ProposalDetails /></ProtectedRoute>} />
              <Route path="/proposal/:id/bid" element={<ProtectedRoute><BidSubmission /></ProtectedRoute>} />
              <Route path="/access" element={<ProtectedRoute><Access /></ProtectedRoute>} />
              <Route path="/enterprise-login" element={<ProtectedRoute><EnterpriseLogin /></ProtectedRoute>} />
              <Route path="/lender-login" element={<ProtectedRoute><LenderLogin /></ProtectedRoute>} />
              <Route path="/enterprise-signup" element={<ProtectedRoute><EnterpriseSignUp /></ProtectedRoute>} />
              <Route path="/lender-signup" element={<ProtectedRoute><LenderSignUp /></ProtectedRoute>} />
              <Route path="/enterprise-dashboard" element={<ProtectedRoute><EnterpriseDashboard /></ProtectedRoute>} />
              <Route path="/enterprise-profile" element={<ProtectedRoute><EnterpriseProfile /></ProtectedRoute>} />
              <Route path="/lender-dashboard" element={<ProtectedRoute><LenderDashboard /></ProtectedRoute>} />
              <Route path="/lender-dashboard/deal/:id" element={<ProtectedRoute><DealDetails /></ProtectedRoute>} />
              <Route path="/intelligence" element={<ProtectedRoute><Intelligence /></ProtectedRoute>} />
              <Route path="/education" element={<ProtectedRoute><Education /></ProtectedRoute>} />
              <Route path="/proposals-dashboard" element={<ProtectedRoute><ProposalsDashboard /></ProtectedRoute>} />
              <Route path="/proposal-bids/:id" element={<ProtectedRoute><ProposalBids /></ProtectedRoute>} />
              <Route path="/bid-comparison/:id" element={<ProtectedRoute><BidComparison /></ProtectedRoute>} />
              <Route path="/create-proposal" element={<ProtectedRoute><CreateProposal /></ProtectedRoute>} />
              <Route path="/transaction-archive" element={<ProtectedRoute><TransactionArchive /></ProtectedRoute>} />
              <Route path="/transaction-details/:id" element={<ProtectedRoute><TransactionDetailsView /></ProtectedRoute>} />
              <Route path="/facility-builder" element={<ProtectedRoute><FacilityBuilder /></ProtectedRoute>} />
              <Route path="/facility-mechanics/:facilityId" element={<ProtectedRoute><FacilityMechanics /></ProtectedRoute>} />
              <Route path="/facility-reference/:facilityId/:sectionType" element={<ProtectedRoute><FacilityReferenceDetail /></ProtectedRoute>} />
              <Route path="/vdr" element={<ProtectedRoute><VDR /></ProtectedRoute>} />
              <Route path="/borrower-underwriting" element={<ProtectedRoute><BorrowerUnderwritingPage /></ProtectedRoute>} />
              <Route path="/borrower-ratio-details" element={<ProtectedRoute><BorrowerRatioDetails /></ProtectedRoute>} />
              <Route path="/financial-report" element={<ProtectedRoute><FinancialReport /></ProtectedRoute>} />
              <Route path="/lenders" element={<ProtectedRoute><Lenders /></ProtectedRoute>} />
              <Route path="/lender/:id" element={<ProtectedRoute><LenderProfile /></ProtectedRoute>} />
              <Route path="/enterprise-network" element={<ProtectedRoute><EnterpriseNetwork /></ProtectedRoute>} />
              <Route path="/enterprise/:id" element={<ProtectedRoute><EnterpriseDetail /></ProtectedRoute>} />
              <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
              <Route path="/underwriting" element={<ProtectedRoute><Underwriting /></ProtectedRoute>} />
              <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
