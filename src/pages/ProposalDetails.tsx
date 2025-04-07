
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { financeProposals } from "@/data/marketplaceProposals";
import { useToast } from "@/hooks/use-toast";
import { getCompatibilityScore } from "@/components/underwriting/utils/styleUtils";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { useProposalDetails } from "@/hooks/useProposalDetails";
import LoadingState from "@/components/proposals/details/LoadingState";
import NotFoundState from "@/components/proposals/details/NotFoundState";
import ProposalHeader from "@/components/proposals/details/ProposalHeader";
import OverviewTab from "@/components/proposals/details/OverviewTab";
import FinancialsTab from "@/components/proposals/details/FinancialsTab";
import CreditProfileTab from "@/components/proposals/details/CreditProfileTab";
import CompanyInfoTab from "@/components/proposals/details/CompanyInfoTab";
import CategoryDetailsModal from "@/components/proposals/details/CategoryDetailsModal";
import CompatibilityTab from "@/components/proposals/details/CompatibilityTab";

const ProposalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    proposal, 
    financialRatios, 
    demographics, 
    creditHistory, 
    compatibility, 
    loading,
    categoryModalOpen,
    selectedCategory,
    setCategoryModalOpen,
    handleCategoryClick,
    handleBid
  } = useProposalDetails(id);

  if (loading) {
    return <LoadingState />;
  }

  if (!proposal || !financialRatios || !demographics || !creditHistory || !compatibility) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-20 pointer-events-none" />
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pt-24 relative z-10">
        <ProposalHeader 
          proposal={proposal} 
          demographics={demographics} 
          onBidClick={handleBid} 
        />
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="overview" className="font-mono text-xs">OVERVIEW</TabsTrigger>
            <TabsTrigger value="financials" className="font-mono text-xs">FINANCIALS</TabsTrigger>
            <TabsTrigger value="credit" className="font-mono text-xs">CREDIT PROFILE</TabsTrigger>
            <TabsTrigger value="company" className="font-mono text-xs">COMPANY INFO</TabsTrigger>
            <TabsTrigger value="compatibility" className="font-mono text-xs">COMPATIBILITY</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab 
              proposal={proposal} 
              demographics={demographics} 
              financialRatios={financialRatios} 
            />
          </TabsContent>
          
          <TabsContent value="financials">
            <FinancialsTab financialRatios={financialRatios} />
          </TabsContent>
          
          <TabsContent value="credit">
            <CreditProfileTab 
              proposal={proposal} 
              creditHistory={creditHistory} 
            />
          </TabsContent>
          
          <TabsContent value="company">
            <CompanyInfoTab 
              proposal={proposal} 
              demographics={demographics} 
            />
          </TabsContent>
          
          <TabsContent value="compatibility">
            <CompatibilityTab
              compatibility={compatibility}
              onCategoryClick={handleCategoryClick}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {selectedCategory && (
        <CategoryDetailsModal
          open={categoryModalOpen}
          onOpenChange={setCategoryModalOpen}
          categoryName={selectedCategory.name}
          categoryScore={selectedCategory.score}
          components={selectedCategory.components}
        />
      )}
    </div>
  );
};

export default ProposalDetails;
