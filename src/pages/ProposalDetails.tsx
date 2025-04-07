
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { financeProposals } from "@/data/marketplaceProposals";
import { FinanceProposal } from "@/types/marketplace";
import { useToast } from "@/hooks/use-toast";
import { getCompatibilityScore } from "@/components/underwriting/utils/styleUtils";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, CheckCircle, AlertCircle } from "lucide-react";

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

interface UnderwritingCompatibility {
  overallScore: number;
  categoryScores: {
    businessStability: number;
    competitivePosition: number;
    collateralStrength: number;
    industryRisk: number;
    bankingRelationship: number;
  };
  criteriaFit: {
    name: string;
    matches: boolean;
    yourCriteria: string;
    dealValue: string;
  }[];
}

const ProposalDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<FinanceProposal | null>(null);
  const [financialRatios, setFinancialRatios] = useState<FinancialRatios | null>(null);
  const [demographics, setDemographics] = useState<CompanyDemographics | null>(null);
  const [creditHistory, setCreditHistory] = useState<CreditHistory | null>(null);
  const [compatibility, setCompatibility] = useState<UnderwritingCompatibility | null>(null);
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
        
        const creditRating = foundProposal.creditRating;
        const baseScore = (creditRating / 10) * 100;
        
        const businessStability = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        const competitivePosition = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        const collateralStrength = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        const industryRisk = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        const bankingRelationship = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        
        const overallScore = Math.round((businessStability + competitivePosition + collateralStrength + industryRisk + bankingRelationship) / 5);
        
        setCompatibility({
          overallScore,
          categoryScores: {
            businessStability: Math.round(businessStability),
            competitivePosition: Math.round(competitivePosition),
            collateralStrength: Math.round(collateralStrength),
            industryRisk: Math.round(industryRisk),
            bankingRelationship: Math.round(bankingRelationship)
          },
          criteriaFit: [
            { 
              name: "Funding Range", 
              matches: true, 
              yourCriteria: "$250K - $10M", 
              dealValue: foundProposal.principal 
            },
            { 
              name: "Industry", 
              matches: true, 
              yourCriteria: "All Industries", 
              dealValue: foundProposal.industry 
            },
            { 
              name: "Credit Rating", 
              matches: creditRating >= 6, 
              yourCriteria: "6.0+", 
              dealValue: creditRating.toFixed(1) 
            },
            { 
              name: "Term Length", 
              matches: true, 
              yourCriteria: "12-60 Months", 
              dealValue: foundProposal.term 
            },
            { 
              name: "Facility Type", 
              matches: true, 
              yourCriteria: "All Types", 
              dealValue: foundProposal.facilityType 
            }
          ]
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
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 bg-black/40 border border-gray-800 rounded-md p-6">
                  <div className="flex items-center mb-6">
                    <Shield className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-medium">Compatibility Match</h3>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center space-y-4 py-6">
                    <div className="relative w-36 h-36 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke="#1a1a1a" 
                          strokeWidth="10" 
                        />
                        <circle 
                          cx="50" 
                          cy="50" 
                          r="45" 
                          fill="none" 
                          stroke={compatibility.overallScore >= 80 ? "#10b981" : 
                                 compatibility.overallScore >= 60 ? "#3b82f6" : 
                                 compatibility.overallScore >= 40 ? "#f59e0b" : "#ef4444"} 
                          strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 45 * compatibility.overallScore / 100} ${2 * Math.PI * 45 * (1 - compatibility.overallScore / 100)}`}
                          strokeDashoffset={2 * Math.PI * 45 * 0.25}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-4xl font-bold">{compatibility.overallScore}%</div>
                      </div>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <p className="text-sm text-gray-400">Compatibility Score</p>
                      <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCompatibilityScore(compatibility.overallScore).color}`}>
                        {getCompatibilityScore(compatibility.overallScore).label}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-span-1 md:col-span-2 bg-black/40 border border-gray-800 rounded-md p-6">
                  <div className="flex items-center mb-6">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-lg font-medium">Category Scores</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm">Business Stability</p>
                        <p className="text-sm font-semibold">{compatibility.categoryScores.businessStability}%</p>
                      </div>
                      <Progress 
                        value={compatibility.categoryScores.businessStability} 
                        className="h-2" 
                        // Removed indicatorClassName prop and will modify the Progress component if needed
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm">Competitive Position</p>
                        <p className="text-sm font-semibold">{compatibility.categoryScores.competitivePosition}%</p>
                      </div>
                      <Progress 
                        value={compatibility.categoryScores.competitivePosition} 
                        className="h-2"
                        // Removed indicatorClassName prop
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm">Collateral Strength</p>
                        <p className="text-sm font-semibold">{compatibility.categoryScores.collateralStrength}%</p>
                      </div>
                      <Progress 
                        value={compatibility.categoryScores.collateralStrength} 
                        className="h-2"
                        // Removed indicatorClassName prop
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm">Industry & Market Risk</p>
                        <p className="text-sm font-semibold">{compatibility.categoryScores.industryRisk}%</p>
                      </div>
                      <Progress 
                        value={compatibility.categoryScores.industryRisk} 
                        className="h-2"
                        // Removed indicatorClassName prop
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm">Banking & Relationship</p>
                        <p className="text-sm font-semibold">{compatibility.categoryScores.bankingRelationship}%</p>
                      </div>
                      <Progress 
                        value={compatibility.categoryScores.bankingRelationship} 
                        className="h-2"
                        // Removed indicatorClassName prop
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 border border-gray-800 rounded-md p-6">
                <h3 className="text-lg font-medium mb-4">Lending Criteria Match</h3>
                <div className="space-y-4">
                  {compatibility.criteriaFit.map((criteria, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-800 pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center">
                        {criteria.matches ? (
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{criteria.name}</p>
                          <p className="text-xs text-gray-400">Your criteria: {criteria.yourCriteria}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{criteria.dealValue}</p>
                        {!criteria.matches && <p className="text-xs text-yellow-500">Mismatch</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-black/40 border border-gray-800 rounded-md p-6">
                <h3 className="text-lg font-medium mb-4">Compatibility Notes</h3>
                <p className="text-sm text-gray-300 mb-4">
                  This deal has been analyzed using your compatibility preferences. The compatibility 
                  score reflects the alignment between your lending criteria and this opportunity's 
                  characteristics.
                </p>
                <p className="text-sm text-gray-300">
                  {compatibility.overallScore >= 80 
                    ? "This opportunity is a strong match for your lending criteria. We recommend proceeding with this deal based on your compatibility assessment."
                    : compatibility.overallScore >= 60
                    ? "This opportunity is a good match overall, though there are some areas that may need additional review before proceeding."
                    : compatibility.overallScore >= 40
                    ? "This opportunity shows moderate alignment with your criteria. Several important factors require careful consideration."
                    : "This opportunity has significant misalignment with your lending preferences. We recommend caution before proceeding."}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProposalDetails;
