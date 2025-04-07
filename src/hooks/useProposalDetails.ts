
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { financeProposals } from "@/data/marketplaceProposals";
import { FinanceProposal } from "@/types/marketplace";
import { useToast } from "@/hooks/use-toast";
import { 
  FinancialRatios, 
  CompanyDemographics, 
  CreditHistory, 
  UnderwritingCompatibility 
} from "@/types/proposalDetails";

export const useProposalDetails = (id: string | undefined) => {
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<FinanceProposal | null>(null);
  const [financialRatios, setFinancialRatios] = useState<FinancialRatios | null>(null);
  const [demographics, setDemographics] = useState<CompanyDemographics | null>(null);
  const [creditHistory, setCreditHistory] = useState<CreditHistory | null>(null);
  const [compatibility, setCompatibility] = useState<UnderwritingCompatibility | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    score: number;
    components: { name: string; score: number; description?: string }[];
  } | null>(null);

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
        
        const financialStrength = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        const businessStability = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        const competitivePosition = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        const collateralStrength = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        const industryRisk = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        const bankingRelationship = Math.min(100, Math.max(20, baseScore + Math.random() * 20 - 10));
        
        const overallScore = Math.round(
          (financialStrength + businessStability + competitivePosition + 
           collateralStrength + industryRisk + bankingRelationship) / 6
        );
        
        setCompatibility({
          overallScore,
          categoryScores: {
            financialStrength: Math.round(financialStrength),
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

  const handleCategoryClick = (categoryName: string, categoryScore: number) => {
    const categoryComponents = {
      "Financial Strength": [
        { name: "EBITDA", score: Math.round(categoryScore * 0.9), description: "Earnings Before Interest, Taxes, Depreciation, and Amortization" },
        { name: "Debt/EBITDA", score: Math.round(categoryScore * 1.1), description: "Ratio of total debt to EBITDA" },
        { name: "Current Ratio", score: Math.round(categoryScore * 0.95), description: "Current assets divided by current liabilities" },
        { name: "Revenue Growth", score: Math.round(categoryScore * 1.05), description: "Year-over-year revenue growth" }
      ],
      "Business Stability": [
        { name: "Years in Business", score: Math.round(categoryScore * 0.9), description: "Evaluates the longevity and establishment of the business" },
        { name: "Revenue Consistency", score: Math.round(categoryScore * 1.1), description: "Measures the stability of revenue streams over time" },
        { name: "Management Experience", score: Math.round(categoryScore * 0.95), description: "Assesses leadership experience and industry knowledge" }
      ],
      "Competitive Position": [
        { name: "Market Share", score: Math.round(categoryScore * 1.05), description: "Percentage of market controlled relative to competitors" },
        { name: "Product Differentiation", score: Math.round(categoryScore * 0.9), description: "Uniqueness of offerings compared to competitors" },
        { name: "Customer Loyalty", score: Math.round(categoryScore * 1.1), description: "Strength of customer relationships and retention" }
      ],
      "Collateral Strength": [
        { name: "Asset Quality", score: Math.round(categoryScore * 0.95), description: "Value and liquidity of assets being used as collateral" },
        { name: "Loan-to-Value Ratio", score: Math.round(categoryScore * 1.05), description: "Ratio of loan amount to the value of assets" },
        { name: "Asset Depreciation Rate", score: Math.round(categoryScore * 0.9), description: "Speed at which collateral assets lose value" }
      ],
      "Industry & Market Risk": [
        { name: "Industry Growth Rate", score: Math.round(categoryScore * 1.1), description: "Overall growth trends in the company's industry" },
        { name: "Market Volatility", score: Math.round(categoryScore * 0.9), description: "Stability of the market where the company operates" },
        { name: "Regulatory Environment", score: Math.round(categoryScore * 0.95), description: "Impact of regulations on business operations" }
      ],
      "Banking Relationship": [
        { name: "Credit History", score: Math.round(categoryScore * 1.05), description: "Past payment behavior with financial institutions" },
        { name: "Relationship Longevity", score: Math.round(categoryScore * 0.95), description: "Duration of banking relationships" },
        { name: "Product Utilization", score: Math.round(categoryScore * 1.0), description: "Range of financial products used by the business" }
      ]
    };
    
    const normalizeComponents = (components: any[]) => {
      return components.map(comp => ({
        ...comp,
        score: Math.min(100, Math.max(0, comp.score))
      }));
    };
    
    setSelectedCategory({
      name: categoryName,
      score: categoryScore,
      components: normalizeComponents(categoryComponents[categoryName as keyof typeof categoryComponents] || [])
    });
    
    setCategoryModalOpen(true);
  };

  return {
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
  };
};
