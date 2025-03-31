
import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { financeProposals } from "@/data/marketplaceProposals";
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

const TransactionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const transaction = useMemo(() => 
    financeProposals.find(proposal => proposal.id === id),
    [id]
  );
  
  const transactionDetails = useMemo(() => {
    if (!transaction) return null;
    
    const completionDate = new Date(Date.now() - Math.random() * 15000000000);
    const startDate = new Date(completionDate.getTime() - Math.random() * 10000000000);
    
    return {
      openingBid: `${(parseFloat(transaction.interestRate.replace("%", "")) + (Math.random() * 2).toFixed(2))}%`,
      closingBid: transaction.interestRate,
      timeToFunding: `${Math.floor(Math.random() * 14) + 3} days`,
      bankType: transaction.lenderPreferences,
      startDate: startDate.toLocaleDateString(),
      completionDate: completionDate.toLocaleDateString(),
      underwritingScore: Math.floor(Math.random() * 50) + 50,
      bidsReceived: Math.floor(Math.random() * 10) + 3,
      winningLender: `${["Alpha", "Omega", "Zenith", "Capital", "First", "Premier", "Trust", "Global"][Math.floor(Math.random() * 8)]} ${["Bank", "Financial", "Investments", "Partners", "Group", "Capital"][Math.floor(Math.random() * 6)]}`,
      documentation: Math.floor(Math.random() * 8) + 3,
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
                {transaction.projectName} <span className="text-sm font-normal text-cyan-300">Transaction #{transaction.id}</span>
              </h1>
              
              <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-700/50">
                {transaction.status}
              </Badge>
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
            <TransactionSummary transaction={transaction} transactionDetails={transactionDetails} />
            <BidInformation transactionDetails={transactionDetails} />
            <TransactionTimeline transactionDetails={transactionDetails} />
            <DocumentationTable transactionDetails={transactionDetails} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TransactionDetails;
