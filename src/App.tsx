
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
import { useState } from "react";
import TransactionDetailsView from "./pages/TransactionDetailsView";
import EnterpriseNetwork from "./pages/EnterpriseNetwork";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FullscreenButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/proposal/:id" element={<ProposalDetails />} />
            <Route path="/proposal/:id/bid" element={<BidSubmission />} />
            <Route path="/access" element={<Access />} />
            <Route path="/enterprise-login" element={<EnterpriseLogin />} />
            <Route path="/lender-login" element={<LenderLogin />} />
            <Route path="/enterprise-signup" element={<EnterpriseSignUp />} />
            <Route path="/lender-signup" element={<LenderSignUp />} />
            <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />
            <Route path="/enterprise-profile" element={<EnterpriseProfile />} />
            <Route path="/lender-dashboard" element={<LenderDashboard />} />
            <Route path="/lender-dashboard/deal/:id" element={<DealDetails />} />
            <Route path="/intelligence" element={<Intelligence />} />
            <Route path="/education" element={<Education />} />
            <Route path="/proposals-dashboard" element={<ProposalsDashboard />} />
            <Route path="/proposal-bids/:id" element={<ProposalBids />} />
            <Route path="/bid-comparison/:id" element={<BidComparison />} />
            <Route path="/create-proposal" element={<CreateProposal />} />
            <Route path="/transaction-archive" element={<TransactionArchive />} />
            <Route path="/transaction-details/:id" element={<TransactionDetailsView />} />
            <Route path="/facility-builder" element={<FacilityBuilder />} />
            <Route path="/facility-mechanics/:facilityId" element={<FacilityMechanics />} />
            <Route path="/facility-reference/:facilityId/:sectionType" element={<FacilityReferenceDetail />} />
            <Route path="/vdr" element={<VDR />} />
            <Route path="/lenders" element={<Lenders />} />
            <Route path="/lender/:id" element={<LenderProfile />} />
            <Route path="/enterprise-network" element={<EnterpriseNetwork />} />
            <Route path="/team" element={<Team />} />
            <Route path="/underwriting" element={<Underwriting />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
