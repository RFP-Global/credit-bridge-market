
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building, Users, Calendar, DollarSign, Percent, BarChart4, TrendingUp, FileText, BadgeInfo, BarChart, PieChart, Scale, Briefcase, Calculator, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import { financeProposals } from "@/data/marketplaceProposals";
import { FinanceProposal } from "@/types/marketplace";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TimeSeriesLineChart, IndustryBarChart } from "@/components/charts";

// Add types for financial data that will be displayed on this page
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
  paymentHistory: number; // Percentage of on-time payments
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
  const [proposal, setProposal] = useState<FinanceProposal | null>(null);
  const [financialRatios, setFinancialRatios] = useState<FinancialRatios | null>(null);
  const [demographics, setDemographics] = useState<CompanyDemographics | null>(null);
  const [creditHistory, setCreditHistory] = useState<CreditHistory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Find the proposal in our data
      const foundProposal = financeProposals.find(p => p.id === id);
      if (foundProposal) {
        setProposal(foundProposal);
        
        // In a real application, these would be fetched from an API
        // For this demo, we'll generate some realistic sample data
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
          creditScore: foundProposal.creditRating * 100, // Scale from 0-10 to 0-1000
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-200">
        <Navbar />
        <div className="container mx-auto px-4 py-6 pt-24">
          <div className="flex items-center justify-center h-[80vh]">
            <div className="animate-pulse">Loading proposal details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!proposal || !financialRatios || !demographics || !creditHistory) {
    return (
      <div className="min-h-screen bg-black text-gray-200">
        <Navbar />
        <div className="container mx-auto px-4 py-6 pt-24">
          <div className="flex flex-col items-center justify-center h-[80vh]">
            <h1 className="text-2xl mb-4">Proposal Not Found</h1>
            <Button asChild>
              <Link to="/marketplace">Return to Marketplace</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6 pt-24">
        {/* Back button and header */}
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link to="/marketplace" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={`
                  ${proposal.status === "OPEN" ? "bg-white/10 text-white" : 
                    proposal.status === "COMPLETED" ? "bg-gray-500/20 text-gray-300" : 
                    "bg-gray-400/10 text-gray-400"}
                  rounded-full px-3
                `}>
                  {proposal.status}
                </Badge>
                <Badge variant="outline" className="font-mono">
                  <Building className="mr-2 h-3 w-3" />
                  {demographics.ownership}
                </Badge>
                <Badge variant="outline" className="font-mono">
                  <Calendar className="mr-2 h-3 w-3" />
                  EST. {demographics.founded}
                </Badge>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {proposal.projectName}: {proposal.facilityType}
              </h1>
              
              <p className="text-gray-400 mt-1">
                <span className="font-semibold">{proposal.industry}</span> • 
                <span className="ml-2">{demographics.location}</span> • 
                <span className="ml-2">{demographics.employees} Employees</span>
              </p>
            </div>
            
            <div className="flex flex-col items-start md:items-end">
              <div className="flex items-center mb-2">
                <div className="text-xl font-bold mr-2">{proposal.principal}</div>
                <Badge variant="secondary" className="font-mono text-xs">
                  {proposal.financingType}
                </Badge>
              </div>
              
              <div className="flex space-x-2 text-sm text-gray-400">
                <span className="flex items-center">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {proposal.interestRate}
                </span>
                <span>•</span>
                <span>{proposal.term}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="font-mono text-xs">OVERVIEW</TabsTrigger>
            <TabsTrigger value="financials" className="font-mono text-xs">FINANCIALS</TabsTrigger>
            <TabsTrigger value="credit" className="font-mono text-xs">CREDIT PROFILE</TabsTrigger>
            <TabsTrigger value="company" className="font-mono text-xs">COMPANY INFO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 md:col-span-2 bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono">PROPOSAL SUMMARY</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">FACILITY TYPE</p>
                      <p className="font-semibold">{proposal.facilityType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">FINANCING TYPE</p>
                      <p className="font-semibold">{proposal.financingType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">PRINCIPAL</p>
                      <p className="font-semibold">{proposal.principal}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">INTEREST RATE</p>
                      <p className="font-semibold">{proposal.interestRate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">TERM</p>
                      <p className="font-semibold">{proposal.term}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">BID DEADLINE</p>
                      <p className="font-semibold">{proposal.bidDeadline}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">INDUSTRY</p>
                      <p className="font-semibold">{proposal.industry}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">LENDER PREFERENCES</p>
                      <p className="font-semibold">{proposal.lenderPreferences}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">CREDIT RATING</p>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">{proposal.creditRating.toFixed(1)}/10</span>
                        <HelpCircle className="h-3 w-3 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6 bg-gray-800" />
                  
                  <div>
                    <p className="text-xs text-gray-400 mb-3">BIDDING PROGRESS</p>
                    <div className="flex items-center mb-2">
                      <Progress value={proposal.bidVolume} className="h-2 w-full bg-cyan-950/40 mr-4" />
                      <span className="text-sm font-semibold">{proposal.bidVolume}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono">KEY FINANCIALS</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">ANNUAL REVENUE</p>
                      <p className="font-semibold">{demographics.annualRevenue}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">TOTAL ASSETS</p>
                      <p className="font-semibold">{demographics.totalAssets}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">TOTAL LIABILITIES</p>
                      <p className="font-semibold">{demographics.totalLiabilities}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">NET WORTH</p>
                      <p className="font-semibold">{demographics.netWorth}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">DEBT SERVICE COVERAGE</p>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">{financialRatios.debtServiceCoverageRatio.toFixed(2)}x</span>
                        <Badge variant={financialRatios.debtServiceCoverageRatio > 1.25 ? "success" : "destructive"} className="text-xs">
                          {financialRatios.debtServiceCoverageRatio > 1.25 ? "STRONG" : "WEAK"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-black border-gray-800">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-sm font-mono">HISTORICAL PERFORMANCE</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 h-80">
                <TimeSeriesLineChart />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="financials" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono flex items-center">
                    <Scale className="mr-2 h-4 w-4" />
                    LIQUIDITY RATIOS
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">CURRENT RATIO</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{financialRatios.currentRatio.toFixed(2)}</p>
                          <Badge variant={financialRatios.currentRatio >= 1.5 ? "success" : 
                            financialRatios.currentRatio >= 1 ? "warning" : "destructive"} 
                            className="text-xs">
                            {financialRatios.currentRatio >= 1.5 ? "STRONG" : 
                              financialRatios.currentRatio >= 1 ? "ADEQUATE" : "WEAK"}
                          </Badge>
                        </div>
                        <Progress value={financialRatios.currentRatio * 33.3} className="h-1 mt-1 bg-gray-800" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">QUICK RATIO</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{financialRatios.quickRatio.toFixed(2)}</p>
                          <Badge variant={financialRatios.quickRatio >= 1 ? "success" : 
                            financialRatios.quickRatio >= 0.7 ? "warning" : "destructive"} 
                            className="text-xs">
                            {financialRatios.quickRatio >= 1 ? "STRONG" : 
                              financialRatios.quickRatio >= 0.7 ? "ADEQUATE" : "WEAK"}
                          </Badge>
                        </div>
                        <Progress value={financialRatios.quickRatio * 50} className="h-1 mt-1 bg-gray-800" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">WORKING CAPITAL TURNOVER</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="font-semibold">{financialRatios.workingCapitalTurnover.toFixed(2)}</p>
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">DEBT SERVICE COVERAGE RATIO</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{financialRatios.debtServiceCoverageRatio.toFixed(2)}x</p>
                          <Badge variant={financialRatios.debtServiceCoverageRatio >= 1.25 ? "success" : 
                            financialRatios.debtServiceCoverageRatio >= 1 ? "warning" : "destructive"} 
                            className="text-xs">
                            {financialRatios.debtServiceCoverageRatio >= 1.25 ? "STRONG" : 
                              financialRatios.debtServiceCoverageRatio >= 1 ? "ADEQUATE" : "WEAK"}
                          </Badge>
                        </div>
                        <Progress value={financialRatios.debtServiceCoverageRatio * 40} className="h-1 mt-1 bg-gray-800" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">DEBT TO EQUITY RATIO</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">{financialRatios.debtToEquityRatio.toFixed(2)}</p>
                          <Badge variant={financialRatios.debtToEquityRatio <= 0.5 ? "success" : 
                            financialRatios.debtToEquityRatio <= 1 ? "warning" : "destructive"} 
                            className="text-xs">
                            {financialRatios.debtToEquityRatio <= 0.5 ? "LOW RISK" : 
                              financialRatios.debtToEquityRatio <= 1 ? "MODERATE" : "HIGH RISK"}
                          </Badge>
                        </div>
                        <Progress value={(1 - financialRatios.debtToEquityRatio/2) * 100} className="h-1 mt-1 bg-gray-800" />
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    PROFITABILITY RATIOS
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ScrollArea className="h-[350px] pr-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">GROSS MARGIN</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="font-semibold">{(financialRatios.grossMargin * 100).toFixed(1)}%</p>
                        <Progress value={financialRatios.grossMargin * 100} className="h-1 mt-1 bg-gray-800" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">OPERATING MARGIN</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="font-semibold">{(financialRatios.operatingMargin * 100).toFixed(1)}%</p>
                        <Progress value={financialRatios.operatingMargin * 100 * 2} className="h-1 mt-1 bg-gray-800" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">NET PROFIT MARGIN</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="font-semibold">{(financialRatios.netProfitMargin * 100).toFixed(1)}%</p>
                        <Progress value={financialRatios.netProfitMargin * 100 * 3} className="h-1 mt-1 bg-gray-800" />
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">RETURN ON ASSETS (ROA)</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="font-semibold">{(financialRatios.returnOnAssets * 100).toFixed(1)}%</p>
                        <Progress value={financialRatios.returnOnAssets * 100 * 5} className="h-1 mt-1 bg-gray-800" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">RETURN ON EQUITY (ROE)</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="font-semibold">{(financialRatios.returnOnEquity * 100).toFixed(1)}%</p>
                        <Progress value={financialRatios.returnOnEquity * 100 * 3} className="h-1 mt-1 bg-gray-800" />
                      </div>
                      
                      <Separator className="bg-gray-800" />
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">ASSET TURNOVER</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="font-semibold">{financialRatios.assetTurnover.toFixed(2)}</p>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <p className="text-xs text-gray-400">INVENTORY TURNOVER</p>
                          <HelpCircle className="h-3 w-3 text-gray-400" />
                        </div>
                        <p className="font-semibold">{financialRatios.inventoryTurnover.toFixed(2)}</p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-black border-gray-800">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-sm font-mono flex items-center">
                  <Calculator className="mr-2 h-4 w-4" />
                  ADDITIONAL FINANCIAL METRICS
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-400">DAYS RECEIVABLES OUTSTANDING</p>
                      <HelpCircle className="h-3 w-3 text-gray-400" />
                    </div>
                    <p className="font-semibold">{financialRatios.daysReceivablesOutstanding.toFixed(0)} days</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-400">DAYS PAYABLES OUTSTANDING</p>
                      <HelpCircle className="h-3 w-3 text-gray-400" />
                    </div>
                    <p className="font-semibold">{financialRatios.daysPayablesOutstanding.toFixed(0)} days</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-xs text-gray-400">ALTMAN Z-SCORE</p>
                      <HelpCircle className="h-3 w-3 text-gray-400" />
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{financialRatios.zScore.toFixed(2)}</p>
                      <Badge variant={financialRatios.zScore > 2.99 ? "success" : 
                        financialRatios.zScore > 1.8 ? "warning" : "destructive"} 
                        className="text-xs">
                        {financialRatios.zScore > 2.99 ? "SAFE" : 
                          financialRatios.zScore > 1.8 ? "CAUTION" : "DISTRESS RISK"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="credit" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono flex items-center">
                    <BarChart4 className="mr-2 h-4 w-4" />
                    CREDIT PROFILE
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">RFP CREDIT RATING</p>
                      <div className="flex items-center">
                        <div className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="font-semibold">{proposal.creditRating.toFixed(1)}/10</span>
                            <Badge variant={proposal.creditRating >= 7 ? "success" : 
                              proposal.creditRating >= 5 ? "warning" : "destructive"} 
                              className="text-xs">
                              {proposal.creditRating >= 7 ? "EXCELLENT" : 
                                proposal.creditRating >= 5 ? "MODERATE" : "HIGH RISK"}
                            </Badge>
                          </div>
                          <Progress value={proposal.creditRating * 10} className="h-1 bg-gray-800" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">BUSINESS CREDIT SCORE</p>
                      <div className="flex items-center">
                        <div className="w-full">
                          <div className="flex justify-between mb-1">
                            <span className="font-semibold">{creditHistory.creditScore.toFixed(0)}/1000</span>
                            <Badge variant={creditHistory.creditScore >= 700 ? "success" : 
                              creditHistory.creditScore >= 600 ? "warning" : "destructive"} 
                              className="text-xs">
                              {creditHistory.creditScore >= 700 ? "EXCELLENT" : 
                                creditHistory.creditScore >= 600 ? "MODERATE" : "POOR"}
                            </Badge>
                          </div>
                          <Progress value={creditHistory.creditScore / 10} className="h-1 bg-gray-800" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">PAYMENT HISTORY</p>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{creditHistory.paymentHistory}% On-Time</span>
                        <Badge variant={creditHistory.paymentHistory >= 95 ? "success" : 
                          creditHistory.paymentHistory >= 90 ? "warning" : "destructive"} 
                          className="text-xs">
                          {creditHistory.paymentHistory >= 95 ? "EXCELLENT" : 
                            creditHistory.paymentHistory >= 90 ? "GOOD" : "POOR"}
                        </Badge>
                      </div>
                      <Progress value={creditHistory.paymentHistory} className="h-1 bg-gray-800" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">DELINQUENCIES (24M)</p>
                        <p className="font-semibold">{creditHistory.delinquencies}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 mb-1">BANKRUPTCIES</p>
                        <p className="font-semibold">{creditHistory.bankruptcies}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 mb-1">TAX LIENS</p>
                        <p className="font-semibold">{creditHistory.taxLiens}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-400 mb-1">JUDGMENTS</p>
                        <p className="font-semibold">{creditHistory.judgments}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono flex items-center">
                    <DollarSign className="mr-2 h-4 w-4" />
                    DEBT OVERVIEW
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">OUTSTANDING DEBT</p>
                      <p className="font-semibold">{creditHistory.outstandingDebt}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">CREDIT UTILIZATION</p>
                      <div className="flex justify-between mb-1">
                        <span className="font-semibold">{(creditHistory.utilizationRatio * 100).toFixed(0)}%</span>
                        <Badge variant={creditHistory.utilizationRatio <= 0.3 ? "success" : 
                          creditHistory.utilizationRatio <= 0.7 ? "warning" : "destructive"} 
                          className="text-xs">
                          {creditHistory.utilizationRatio <= 0.3 ? "LOW" : 
                            creditHistory.utilizationRatio <= 0.7 ? "MODERATE" : "HIGH"}
                        </Badge>
                      </div>
                      <Progress value={creditHistory.utilizationRatio * 100} className="h-1 bg-gray-800" />
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">PREVIOUS LOANS</p>
                      <p className="font-semibold">{creditHistory.previousLoans}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-400 mb-1">HISTORICAL DEFAULT RATE</p>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">{creditHistory.defaultRate}%</span>
                        <Badge variant="success" className="text-xs">EXCELLENT</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-black border-gray-800">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-sm font-mono">CREDIT METRICS COMPARISON</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 h-80">
                <IndustryBarChart />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="company" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 md:col-span-2 bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono flex items-center">
                    <Building className="mr-2 h-4 w-4" />
                    COMPANY PROFILE
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">LEGAL NAME</p>
                      <p className="font-semibold">{proposal.projectName} Inc.</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">FOUNDED</p>
                      <p className="font-semibold">{demographics.founded}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">EMPLOYEES</p>
                      <p className="font-semibold">{demographics.employees}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">OWNERSHIP</p>
                      <p className="font-semibold">{demographics.ownership}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">INDUSTRY</p>
                      <p className="font-semibold">{proposal.industry}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">SUBSECTOR</p>
                      <p className="font-semibold">{demographics.industrySubsector}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">LOCATION</p>
                      <p className="font-semibold">{demographics.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">PUBLICLY TRADED</p>
                      <p className="font-semibold">{demographics.publiclyTraded ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">ANNUAL REVENUE</p>
                      <p className="font-semibold">{demographics.annualRevenue}</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6 bg-gray-800" />
                  
                  <div>
                    <p className="text-xs text-gray-400 mb-3">KEY EXECUTIVES</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {demographics.keyExecutives.map((executive, index) => (
                        <div key={index} className="flex items-center">
                          <Users className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{executive}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    DOCUMENTS
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-3 border border-gray-800 rounded-sm flex items-center justify-between hover:bg-gray-800/20 transition cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Financial Statements</span>
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">PDF</Badge>
                    </div>
                    
                    <div className="p-3 border border-gray-800 rounded-sm flex items-center justify-between hover:bg-gray-800/20 transition cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Business Plan</span>
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">PDF</Badge>
                    </div>
                    
                    <div className="p-3 border border-gray-800 rounded-sm flex items-center justify-between hover:bg-gray-800/20 transition cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Tax Returns</span>
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">PDF</Badge>
                    </div>
                    
                    <div className="p-3 border border-gray-800 rounded-sm flex items-center justify-between hover:bg-gray-800/20 transition cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-gray-400" />
                        <span>Corporate Bylaws</span>
                      </div>
                      <Badge variant="outline" className="font-mono text-xs">PDF</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button 
              variant="default"
              className="w-full font-mono text-sm"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              SUBMIT PROPOSAL
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProposalDetails;
