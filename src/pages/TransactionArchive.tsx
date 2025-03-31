
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import FullscreenButton from "@/components/FullscreenButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import RadarScreen from "@/components/RadarScreen";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileArchive } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { financeProposals } from "@/data/marketplaceProposals";

const TransactionArchive = () => {
  const navigate = useNavigate();
  
  // Filter for completed transactions only
  const completedTransactions = useMemo(() => 
    financeProposals.filter(proposal => proposal.status === "COMPLETED"),
    []
  );

  const handleTransactionClick = (transactionId: string) => {
    navigate(`/transaction/${transactionId}`);
  };

  return (
    <div className="min-h-screen bg-black/90 text-gray-200 relative grid-bg font-typewriter">
      <Navbar />
      <FullscreenButton />
      
      <RadarScreen className="z-0" />
      
      <div className="scanline z-10"></div>
      
      <div className="container mx-auto px-4 py-6 pt-24 h-screen flex flex-col relative z-10">
        {/* Header section */}
        <div className="bg-transparent pb-4 z-30">
          <div className="flex justify-between items-center mb-6">
            <div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/marketplace")}
                className="text-gray-400 hover:text-gray-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Marketplace
              </Button>
              <h1 className="text-2xl font-bold text-cyan-400">Transaction Archive</h1>
            </div>
            
            <div className="flex items-center">
              <FileArchive className="mr-2 h-5 w-5 text-cyan-300" />
              <span className="text-cyan-300 font-mono text-sm">
                {completedTransactions.length} Archived Transactions
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable table area */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-340px)]">
            <div className="min-w-max">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700/50 text-left bg-black/50 text-cyan-200 font-mono text-xs uppercase">
                    <th className="px-4 py-3">Transaction ID</th>
                    <th className="px-4 py-3">Project Name</th>
                    <th className="px-4 py-3">Facility Type</th>
                    <th className="px-4 py-3">Principal</th>
                    <th className="px-4 py-3">Interest Rate</th>
                    <th className="px-4 py-3">Term</th>
                    <th className="px-4 py-3">Completion Date</th>
                    <th className="px-4 py-3">Industry</th>
                  </tr>
                </thead>
                <tbody>
                  {completedTransactions.length > 0 ? (
                    completedTransactions.map((transaction, index) => (
                      <tr 
                        key={transaction.id} 
                        className={`border-b border-gray-800/30 hover:bg-cyan-900/30 text-gray-300 font-mono cursor-pointer ${
                          index % 2 === 0 ? "bg-black/40" : "bg-black/20"
                        }`}
                        onClick={() => handleTransactionClick(transaction.id)}
                      >
                        <td className="px-4 py-3">{transaction.id}</td>
                        <td className="px-4 py-3">{transaction.projectName}</td>
                        <td className="px-4 py-3">{transaction.facilityType}</td>
                        <td className="px-4 py-3">${transaction.principal.toLocaleString()}</td>
                        <td className="px-4 py-3">{transaction.interestRate}</td>
                        <td className="px-4 py-3">{transaction.term}</td>
                        <td className="px-4 py-3">
                          {new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">{transaction.industry}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                        No completed transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TransactionArchive;
