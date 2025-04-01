
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { historicalTransactions } from "@/data/transactionArchiveData";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Navbar from "@/components/Navbar";
import FullscreenButton from "@/components/FullscreenButton";
import RadarScreen from "@/components/RadarScreen";
import TransactionSummary from "@/components/transaction/TransactionSummary";
import BidInformation from "@/components/transaction/BidInformation";
import TransactionTimeline from "@/components/transaction/TransactionTimeline";
import DocumentationTable from "@/components/transaction/DocumentationTable";
import NotFoundMessage from "@/components/transaction/NotFoundMessage";
import BorrowerInformation from "@/components/transaction/BorrowerInformation";
import LenderDetails from "@/components/transaction/LenderDetails";
import MetricsPanel from "@/components/transaction/MetricsPanel";

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const transaction = useMemo(() => 
    historicalTransactions.find(transaction => transaction.id === id),
    [id]
  );
  
  const transactionDetails = useMemo(() => {
    if (!transaction) return null;
    
    const completionDate = new Date(transaction.completionDate);
    const startDate = new Date(completionDate.getTime() - Math.random() * 10000000000);
    
    return {
      openingBid: `${(parseFloat(transaction.interestRate.replace("%", "")) + (Math.random() * 2).toFixed(2))}%`,
      closingBid: transaction.interestRate,
      timeToFunding: `${Math.floor(Math.random() * 14) + 3} days`,
      bankType: transaction.facilityType === "SBA Loan" ? "SBA Lender" : 
                transaction.facilityType === "Venture Debt" ? "Venture Capital" : 
                "Commercial Bank",
      startDate: startDate.toLocaleDateString(),
      completionDate: completionDate.toLocaleDateString(),
      underwritingScore: Math.floor(Math.random() * 50) + 50,
      bidsReceived: Math.floor(Math.random() * 10) + 3,
      winningLender: "Anonymous Lender",
      documentation: Math.floor(Math.random() * 8) + 3,
      // Add more detailed transaction metrics
      metrics: {
        debtServiceCoverageRatio: (Math.random() * 2 + 1).toFixed(2),
        loanToValueRatio: `${(Math.random() * 30 + 50).toFixed(1)}%`,
        interestCoverageRatio: (Math.random() * 3 + 1.5).toFixed(2),
        netOperatingIncome: `$${(Math.random() * 5 + 1).toFixed(2)}M`,
        capitalExpenditures: `$${(Math.random() * 2).toFixed(2)}M`,
        fundingEfficiency: `${(Math.random() * 20 + 80).toFixed(1)}%`,
        negotiationRounds: Math.floor(Math.random() * 5) + 1
      },
      // Add anonymized borrower information
      borrowerInfo: {
        company: "Anonymous Company",
        size: ["Small", "Medium", "Enterprise"][Math.floor(Math.random() * 3)],
        yearsInBusiness: Math.floor(Math.random() * 20) + 3,
        employees: Math.floor(Math.random() * 950) + 50,
        revenue: `$${(Math.random() * 20 + 1).toFixed(1)}M`,
        industry: transaction.industry,
        subSector: transaction.subSector,
        businessType: transaction.businessType,
        headquarters: transaction.location.city,
        state: transaction.location.state,
        zipCode: transaction.zipCode,
        creditScore: Math.floor(Math.random() * 300) + 550,
        previousFinancings: Math.floor(Math.random() * 5),
        publiclyTraded: Math.random() > 0.7,
        subsidiaries: Math.floor(Math.random() * 5)
      },
      // Add anonymized lender information
      lenderInfo: {
        name: "Anonymous Financial Institution",
        type: transaction.facilityType === "SBA Loan" ? "SBA Lender" : 
              transaction.facilityType === "Venture Debt" ? "Venture Capital" : 
              "Commercial Bank",
        assets: `$${(Math.random() * 100 + 10).toFixed(1)}B`,
        founded: 1900 + Math.floor(Math.random() * 120),
        headquarters: "Undisclosed Location",
        marketShare: `${(Math.random() * 15).toFixed(1)}%`,
        regularClient: Math.random() > 0.7,
        specializedIn: [
          "Commercial Real Estate",
          "Industrial Manufacturing",
          "Healthcare Facilities",
          "Technology Startups",
          "Retail Franchises"
        ][Math.floor(Math.random() * 5)],
        averageDealSize: `$${(Math.random() * 15 + 1).toFixed(1)}M`
      }
    };
  }, [transaction]);

  if (!transaction) {
    return <NotFoundMessage />;
  }

  return (
    <div className="min-h-screen bg-black/90 text-gray-200 relative grid-bg font-typewriter">
      <Navbar />
      <FullscreenButton />
      
      <RadarScreen className="z-0" />
      
      <div className="scanline z-10"></div>
      
      <div className="container mx-auto px-4 py-6 pt-24 h-screen flex flex-col relative z-10">
        <div className="bg-transparent pb-4 z-30">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/transaction-archive")}
              className="text-gray-400 hover:text-gray-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Archive
            </Button>
            
            <div className="flex justify-between items-center mt-2">
              <h1 className="text-2xl font-bold text-cyan-400">
                {transaction.projectIndex !== undefined 
                  ? `Project ${String.fromCharCode(65 + (transaction.projectIndex % 26))}` 
                  : `Project ${transaction.id.substring(0, 6)}`} 
                <span className="text-sm font-normal text-cyan-300">Transaction #{transaction.id.substring(0, 6)}</span>
              </h1>
              
              <div className="flex gap-3 items-center">
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-700/50">
                  Completed
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-cyan-300 border-cyan-700/50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
            {/* First row */}
            <TransactionSummary transaction={transaction} transactionDetails={transactionDetails} />
            <BidInformation transactionDetails={transactionDetails} />
            <MetricsPanel transactionDetails={transactionDetails} />
            
            {/* Second row */}
            <BorrowerInformation transactionDetails={transactionDetails} />
            <LenderDetails transactionDetails={transactionDetails} />
            
            {/* Third row - full width components */}
            <TransactionTimeline transactionDetails={transactionDetails} className="lg:col-span-3" />
            <DocumentationTable transactionDetails={transactionDetails} className="lg:col-span-3" />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TransactionDetails;
