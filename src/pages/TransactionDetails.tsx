import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Building, Briefcase, DollarSign, PercentIcon, Clock, 
  Building as BuildingBank, BarChart, User, FileCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { financeProposals } from "@/data/marketplaceProposals";
import Navbar from "@/components/Navbar";
import FullscreenButton from "@/components/FullscreenButton";
import RadarScreen from "@/components/RadarScreen";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    return (
      <div className="min-h-screen bg-black/90 text-gray-200 relative grid-bg font-typewriter flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4">Transaction Not Found</h1>
          <Button 
            onClick={() => navigate("/transaction-archive")}
            className="bg-cyan-800 hover:bg-cyan-700 text-white"
          >
            Return to Archive
          </Button>
        </div>
      </div>
    );
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
            <div className="bg-black/50 border border-gray-800/50 rounded-lg p-5">
              <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
                Transaction Summary
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Industry</p>
                      <p className="text-sm">{transaction.industry}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Briefcase className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Facility Type</p>
                      <p className="text-sm">{transaction.facilityType}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Principal</p>
                      <p className="text-sm">${transaction.principal.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <PercentIcon className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Final Interest Rate</p>
                      <p className="text-sm">{transaction.interestRate}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Term</p>
                      <p className="text-sm">{transaction.term}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <BuildingBank className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Winning Lender</p>
                      <p className="text-sm">{transactionDetails?.winningLender}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800/50 rounded-lg p-5">
              <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
                Bid Information
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <BarChart className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Opening Bid</p>
                      <p className="text-sm">{transactionDetails?.openingBid}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <BarChart className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Closing Bid</p>
                      <p className="text-sm">{transactionDetails?.closingBid}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Bids Received</p>
                      <p className="text-sm">{transactionDetails?.bidsReceived}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <BuildingBank className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Bank Type</p>
                      <p className="text-sm">{transactionDetails?.bankType}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Time to Funding</p>
                      <p className="text-sm">{transactionDetails?.timeToFunding}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <FileCheck className="h-4 w-4 text-cyan-400" />
                    <div>
                      <p className="text-xs text-gray-400">Underwriting Score</p>
                      <p className="text-sm">{transactionDetails?.underwritingScore}/100</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800/50 rounded-lg p-5 lg:col-span-2">
              <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
                Transaction Timeline
              </h2>
              
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-8 border-l border-dashed border-gray-700"></div>
                
                <div className="space-y-8 relative">
                  <div className="flex items-start">
                    <div className="bg-cyan-600 h-4 w-4 rounded-full mt-1 z-10"></div>
                    <div className="ml-6">
                      <p className="text-cyan-300">{transactionDetails?.startDate}</p>
                      <h3 className="text-white">Proposal Posted to Marketplace</h3>
                      <p className="text-sm text-gray-400 mt-1">Initial proposal listed with opening terms.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-600 h-4 w-4 rounded-full mt-1 z-10"></div>
                    <div className="ml-6">
                      <p className="text-cyan-300">{new Date(new Date(transactionDetails?.startDate || "").getTime() + 86400000 * 2).toLocaleDateString()}</p>
                      <h3 className="text-white">First Bids Received</h3>
                      <p className="text-sm text-gray-400 mt-1">Initial offers submitted by interested lenders.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-600 h-4 w-4 rounded-full mt-1 z-10"></div>
                    <div className="ml-6">
                      <p className="text-cyan-300">{new Date(new Date(transactionDetails?.completionDate || "").getTime() - 86400000 * 4).toLocaleDateString()}</p>
                      <h3 className="text-white">Final Bid Selection</h3>
                      <p className="text-sm text-gray-400 mt-1">Selected winning bid from {transactionDetails?.winningLender}.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-600 h-4 w-4 rounded-full mt-1 z-10"></div>
                    <div className="ml-6">
                      <p className="text-cyan-300">{transactionDetails?.completionDate}</p>
                      <h3 className="text-white">Transaction Completed</h3>
                      <p className="text-sm text-gray-400 mt-1">Final documents signed and funding completed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 border border-gray-800/50 rounded-lg p-5 lg:col-span-2">
              <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
                Transaction Documentation
              </h2>
              
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-cyan-200">Document Name</TableHead>
                    <TableHead className="text-cyan-200">Type</TableHead>
                    <TableHead className="text-cyan-200">Date</TableHead>
                    <TableHead className="text-cyan-200">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: transactionDetails?.documentation || 0 }).map((_, i) => (
                    <TableRow key={i} className="border-gray-800/30">
                      <TableCell className="font-mono">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-cyan-400" />
                          {["Term Sheet", "Credit Agreement", "Promissory Note", "Security Agreement", "Guaranty", "Due Diligence Report", "Financial Statements", "Collateral Evaluation"][i % 8]} {i > 7 ? i : ""}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">
                        {["Legal", "Financial", "Compliance", "Analysis", "Agreement"][i % 5]}
                      </TableCell>
                      <TableCell className="font-mono">
                        {new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-700/50">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TransactionDetails;
