
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import FullscreenButton from "@/components/FullscreenButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import RadarScreen from "@/components/RadarScreen";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileArchive, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { financeProposals } from "@/data/marketplaceProposals";

const TransactionArchive = () => {
  const navigate = useNavigate();
  
  // Filter for completed transactions only
  const completedTransactions = useMemo(() => 
    financeProposals.filter(proposal => proposal.status === "COMPLETED").map(proposal => ({
      ...proposal,
      // Add more detailed demographic information for borrowers
      borrowerInfo: {
        company: proposal.businessName || proposal.projectName.replace("Project ", "Company "),
        size: ["Small", "Medium", "Enterprise"][Math.floor(Math.random() * 3)],
        yearsInBusiness: Math.floor(Math.random() * 20) + 3,
        employees: proposal.employeeCount || Math.floor(Math.random() * 950) + 50,
        revenue: proposal.annualRevenue || `$${(Math.random() * 20 + 1).toFixed(1)}M`,
        subSector: proposal.subSector || ["SaaS", "FinTech", "E-commerce", "Healthcare Tech", "EdTech", "CleanTech", "Biotech", "Manufacturing", "Retail", "Hospitality", "Construction"][Math.floor(Math.random() * 11)],
        businessType: proposal.businessType || ["Corporation", "LLC", "Partnership", "Sole Proprietorship", "Non-Profit"][Math.floor(Math.random() * 5)],
        zipCode: proposal.zipCode || `${Math.floor(Math.random() * 90000) + 10000}`,
        city: proposal.location?.city || ["New York", "Chicago", "San Francisco", "Boston", "Los Angeles", "Dallas", "Miami", "Seattle"][Math.floor(Math.random() * 8)],
        state: proposal.location?.state || ["NY", "IL", "CA", "MA", "TX", "FL", "WA"][Math.floor(Math.random() * 7)],
        foundedYear: proposal.foundedYear || (new Date().getFullYear() - Math.floor(Math.random() * 30) - 3)
      },
      completionDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
    })),
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
                    {/* Enhanced borrower information columns */}
                    <th className="px-4 py-3 bg-black/60">Sub-Sector</th>
                    <th className="px-4 py-3 bg-black/60">Business Name</th>
                    <th className="px-4 py-3 bg-black/60">Business Type</th>
                    <th className="px-4 py-3 bg-black/60">Location</th>
                    <th className="px-4 py-3 bg-black/60">Zip Code</th>
                    <th className="px-4 py-3 bg-black/60">Founded</th>
                    <th className="px-4 py-3 bg-black/60">Employees</th>
                    <th className="px-4 py-3 bg-black/60">Annual Revenue</th>
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
                        <td className="px-4 py-3">{transaction.completionDate}</td>
                        <td className="px-4 py-3">{transaction.industry}</td>
                        {/* Enhanced borrower information cells */}
                        <td className="px-4 py-3 bg-cyan-900/10">{transaction.borrowerInfo.subSector}</td>
                        <td className="px-4 py-3 bg-cyan-900/10">{transaction.borrowerInfo.company}</td>
                        <td className="px-4 py-3 bg-cyan-900/10">{transaction.borrowerInfo.businessType}</td>
                        <td className="px-4 py-3 bg-cyan-900/10">{transaction.borrowerInfo.city}, {transaction.borrowerInfo.state}</td>
                        <td className="px-4 py-3 bg-cyan-900/10">{transaction.borrowerInfo.zipCode}</td>
                        <td className="px-4 py-3 bg-cyan-900/10">{transaction.borrowerInfo.foundedYear}</td>
                        <td className="px-4 py-3 bg-cyan-900/10">{transaction.borrowerInfo.employees}</td>
                        <td className="px-4 py-3 bg-cyan-900/10">{transaction.borrowerInfo.revenue}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={16} className="px-4 py-8 text-center text-gray-500">
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
