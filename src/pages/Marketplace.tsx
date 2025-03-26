import { useState } from "react";
import Navbar from "@/components/Navbar";
import FullscreenButton from "@/components/FullscreenButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Eye,
  CircleHelp
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface FinanceProposal {
  id: string;
  creditRating: number;
  projectName: string;
  facilityType: string;
  financingType: "New Financing" | "Refinancing";
  principal: string;
  interestRateType: "Fixed" | "Floating";
  interestRate: string;
  term: string;
  status: "OPEN" | "COMPLETED" | "EXPIRED";
  bidDeadline: string;
  lenderPreferences: string;
  industry: string;
  bidVolume: number;
}

const financeProposals: FinanceProposal[] = [
  {
    id: "1",
    creditRating: 7.5,
    projectName: "Project A",
    facilityType: "Term Loan",
    financingType: "New Financing",
    principal: "$500,000",
    interestRateType: "Fixed",
    interestRate: "12.00%",
    term: "36 Months",
    status: "OPEN",
    bidDeadline: "21:08:30",
    lenderPreferences: "Regional Bank",
    industry: "Construction",
    bidVolume: 65
  },
  {
    id: "2",
    creditRating: 8.2,
    projectName: "Project B",
    facilityType: "364-Day Revolver",
    financingType: "Refinancing",
    principal: "$1,500,000",
    interestRateType: "Fixed",
    interestRate: "10.175%",
    term: "12 Months",
    status: "OPEN",
    bidDeadline: "00:05:35",
    lenderPreferences: "Community Bank",
    industry: "Real Estate",
    bidVolume: 45
  },
  {
    id: "3",
    creditRating: 5.4,
    projectName: "Project C",
    facilityType: "Asset-Based Loan",
    financingType: "Refinancing",
    principal: "$250,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 350",
    term: "14 Months",
    status: "OPEN",
    bidDeadline: "02:11:10",
    lenderPreferences: "National Bank",
    industry: "Healthcare",
    bidVolume: 35
  },
  {
    id: "4",
    creditRating: 9.4,
    projectName: "Project D",
    facilityType: "SBA Loan",
    financingType: "New Financing",
    principal: "$5,000,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 200",
    term: "24 Months",
    status: "COMPLETED",
    bidDeadline: "Closed",
    lenderPreferences: "FinTech",
    industry: "Manufacturing",
    bidVolume: 90
  },
  {
    id: "5",
    creditRating: 4.7,
    projectName: "Project E",
    facilityType: "Equipment Financing",
    financingType: "Refinancing",
    principal: "$7,500,000",
    interestRateType: "Floating",
    interestRate: "8.750%",
    term: "60 Months",
    status: "EXPIRED",
    bidDeadline: "Closed",
    lenderPreferences: "Private Credit",
    industry: "Manufacturing",
    bidVolume: 78
  }
];

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loanType, setLoanType] = useState("");
  const [targetTerms, setTargetTerms] = useState("");
  const [dealActivity, setDealActivity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="min-h-screen bg-black text-gray-200 relative">
      <Navbar />
      <FullscreenButton />
      
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-cyan-400 mb-4">Proposals</h1>
          <div className="flex justify-between items-center">
            <Button className="bg-black border border-gray-700 hover:bg-gray-800 text-white">
              New Proposal
            </Button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Filter className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-8 mx-1 bg-gray-700" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 4h7"/><path d="M14 9h7"/><path d="M14 15h7"/><path d="M14 20h7"/></svg>
            </Button>
          </div>

          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 bg-black/60 border-gray-700 text-gray-300 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-grow max-w-sm relative">
            <Button className="w-full justify-between bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              Loan Request Type
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="flex-grow max-w-sm relative">
            <Button className="w-full justify-between bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              Target Terms
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="flex-grow max-w-sm relative">
            <Button className="w-full justify-between bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              Deal Activity Metrics
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="border border-gray-700 rounded-sm overflow-hidden mb-4">
          <Table>
            <TableHeader className="bg-gray-800/40">
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-center w-16 text-xs font-medium text-cyan-400">
                  
                </TableHead>
                <TableHead className="text-center w-24 text-xs font-medium text-cyan-400">
                  RFP CREDIT RATING
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  PROJECT NAME
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  FACILITY TYPE
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  NEW FINANCING OR REFINANCING
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  TARGET PRINCIPAL
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  INTEREST RATE TYPE
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  TARGET INTEREST RATE
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  TARGET TERM
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  STATUS
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  BID DEADLINE
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  LENDER PREFERENCES
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  INDUSTRY
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  BID VOLUME
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {financeProposals.map((proposal) => (
                <TableRow key={proposal.id} className="border-gray-700 hover:bg-gray-800/20">
                  <TableCell className="text-center py-3">
                    <div className="flex justify-center items-center">
                      <Eye className="h-5 w-5 text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-3">
                    <div className="flex justify-center items-center gap-2">
                      <CircleHelp className="h-5 w-5 text-gray-400" />
                      <span>{proposal.creditRating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.projectName}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.facilityType}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.financingType}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.principal}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.interestRateType}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.interestRate}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.term}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    <Badge 
                      className={`
                        ${proposal.status === "OPEN" ? "bg-white/10 text-white" : 
                          proposal.status === "COMPLETED" ? "bg-gray-500/20 text-gray-300" : 
                          "bg-gray-400/10 text-gray-400"}
                        rounded-full px-3
                      `}
                    >
                      {proposal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.bidDeadline}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.lenderPreferences}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    {proposal.industry}
                  </TableCell>
                  <TableCell className="text-center py-3">
                    <Progress value={proposal.bidVolume} className="h-2 w-32 bg-cyan-950/40" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink href="#" aria-label="Previous">
                &laquo;
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">20</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" aria-label="Next">
                &raquo;
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Marketplace;
