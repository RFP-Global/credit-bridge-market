import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { financeProposals } from "@/data/marketplaceProposals";
import { FinanceProposal } from "@/types/marketplace";
import { useToast } from "@/hooks/use-toast";

// Component imports
import LoadingState from "@/components/proposals/details/LoadingState";
import NotFoundState from "@/components/proposals/details/NotFoundState";
import ProposalHeader from "@/components/proposals/details/ProposalHeader";
import OverviewTab from "@/components/proposals/details/OverviewTab";
import FinancialsTab from "@/components/proposals/details/FinancialsTab";
import CreditProfileTab from "@/components/proposals/details/CreditProfileTab";
import CompanyInfoTab from "@/components/proposals/details/CompanyInfoTab";

interface FinancialRatios {
  debtServiceCoverageRatio: number;
  currentRatio: number;
  quickRatio: number;
  debtToEquityRatio: number;
  returnOnAssets: number;
  returnOnEquity: number;
  grossMargin: number;
  operatingMargin: number;
  netProfitMargin: number;
  assetTurnover: number;
  inventoryTurnover: number;
  daysReceivablesOutstanding: number;
  daysPayablesOutstanding: number;
  workingCapitalTurnover: number;
  zScore: number;
}

interface CompanyDemographics {
  founded: string;
  employees: number;
  ownership: string;
  industrySubsector: string;
  location: string;
  annualRevenue: string;
  totalAssets: string;
  totalLiabilities: string;
  netWorth: string;
  publiclyTraded: boolean;
  keyExecutives: string[];
}

interface CreditHistory {
  creditScore: number;
  paymentHistory: number;
  delinquencies: number;
  bankruptcies: number;
  taxLiens: number;
  judgments: number;
  outstandingDebt: string;
  utilizationRatio: number;
  previousLoans: number;
  defaultRate: number;
}

const ProposalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<FinanceProposal | null>(null);
  const [financialRatios, setFinancialRatios] = useState<FinancialRatios | null>(null);
  const [demographics, setDemographics] = useState<CompanyDemographics | null>(null);
  const [creditHistory, setCreditHistory] = useState<CreditHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundProposal = financeProposals.find(p => p.id === id);
      if (foundProposal) {
        setProposal(foundProposal);
        
        setFinancialRatios({
          debtServiceCoverageRatio: 1.35,
          currentRatio: 1.8,
          quickRatio: 1.2,
          debtToEquityRatio: 0.65,
          returnOnAssets: 0.09,
          returnOnEquity: 0.14,
          grossMargin: 0.38,
          operatingMargin: 0.12,
          netProfitMargin: 0.08,
          assetTurnover: 1.5,
          inventoryTurnover: 6.8,
          daysReceivablesOutstanding: 42,
          daysPayablesOutstanding: 38,
          workingCapitalTurnover: 4.2,
          zScore: 3.1
        });
        
        setDemographics({
          founded: "2011",
          employees: 85,
          ownership: "Private",
          industrySubsector: foundProposal.industry + " Services",
          location: "Chicago, IL",
          annualRevenue: "$8.5M",
          totalAssets: "$12.4M",
          totalLiabilities: "$5.2M",
          netWorth: "$7.2M",
          publiclyTraded: false,
          keyExecutives: ["Jane Smith, CEO", "Michael Chen, CFO", "Robert Williams, COO"]
        });
        
        setCreditHistory({
          creditScore: foundProposal.creditRating * 100,
          paymentHistory: 98,
          delinquencies: 0,
          bankruptcies: 0,
          taxLiens: 0,
          judgments: 0,
          outstandingDebt: "$3.8M",
          utilizationRatio: 0.45,
          previousLoans: 3,
          defaultRate: 0
        });
      }
      setLoading(false);
    }
  }, [id]);

  const handleBid = () => {
    navigate(`/proposal/${id}/bid`);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!proposal || !financialRatios || !demographics || !creditHistory) {
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
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="font-mono text-xs">OVERVIEW</TabsTrigger>
            <TabsTrigger value="financials" className="font-mono text-xs">FINANCIALS</TabsTrigger>
            <TabsTrigger value="credit" className="font-mono text-xs">CREDIT PROFILE</TabsTrigger>
            <TabsTrigger value="company" className="font-mono text-xs">COMPANY INFO</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};

export default ProposalDetails;
