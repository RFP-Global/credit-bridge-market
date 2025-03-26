
import { useState, useMemo } from "react";
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
  CircleHelp,
  ArrowUpDown,
  SlidersHorizontal
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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
  const [facilityTypeFilter, setFacilityTypeFilter] = useState<string>("");
  const [financingTypeFilter, setFinancingTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [industryFilter, setIndustryFilter] = useState<string>("");
  const [sortField, setSortField] = useState<keyof FinanceProposal | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter and sort the proposals
  const filteredProposals = useMemo(() => {
    let result = [...financeProposals];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(proposal => 
        proposal.projectName.toLowerCase().includes(searchLower) ||
        proposal.facilityType.toLowerCase().includes(searchLower) ||
        proposal.industry.toLowerCase().includes(searchLower)
      );
    }

    // Apply dropdown filters
    if (facilityTypeFilter) {
      result = result.filter(proposal => proposal.facilityType === facilityTypeFilter);
    }

    if (financingTypeFilter) {
      result = result.filter(proposal => proposal.financingType === financingTypeFilter);
    }

    if (statusFilter) {
      result = result.filter(proposal => proposal.status === statusFilter);
    }

    if (industryFilter) {
      result = result.filter(proposal => proposal.industry === industryFilter);
    }

    // Apply sorting
    if (sortField) {
      result = result.sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        
        // Handle numeric vs string comparison
        if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return sortDirection === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        } else {
          const strA = String(fieldA).toLowerCase();
          const strB = String(fieldB).toLowerCase();
          return sortDirection === 'asc' 
            ? strA.localeCompare(strB) 
            : strB.localeCompare(strA);
        }
      });
    }

    return result;
  }, [searchTerm, facilityTypeFilter, financingTypeFilter, statusFilter, industryFilter, sortField, sortDirection]);

  // Paginate the results
  const paginatedProposals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProposals.slice(startIndex, endIndex);
  }, [filteredProposals, currentPage]);

  // Total pages for pagination
  const totalPages = Math.max(1, Math.ceil(filteredProposals.length / itemsPerPage));

  // Handle sorting
  const handleSort = (field: keyof FinanceProposal) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, set to ascending
      setSortField(field);
      setSortDirection('asc');
    }
    toast.info(`Sorted by ${field} ${sortDirection === 'asc' ? 'ascending' : 'descending'}`);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFacilityTypeFilter("");
    setFinancingTypeFilter("");
    setStatusFilter("");
    setIndustryFilter("");
    setSortField("");
    setSortDirection("asc");
    setCurrentPage(1);
    toast.info("All filters cleared");
  };

  // Check if proposal detail view is selected - placeholder for future implementation
  const viewProposalDetails = (id: string) => {
    toast.info(`Viewing details for proposal ${id}`);
  };

  // Extract unique values for filters
  const facilityTypes = [...new Set(financeProposals.map(p => p.facilityType))];
  const industries = [...new Set(financeProposals.map(p => p.industry))];

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
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-700 text-gray-300"
                onClick={clearFilters}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
              <Badge className="bg-cyan-500/20 text-cyan-300">
                {filteredProposals.length} Results
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-grow max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 bg-black/60 border-gray-700 text-gray-300 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={facilityTypeFilter} onValueChange={setFacilityTypeFilter}>
            <SelectTrigger className="w-[180px] bg-black/60 border-gray-700 text-gray-300">
              <SelectValue placeholder="Facility Type" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-gray-700 text-gray-300">
              <SelectItem value="">All Facility Types</SelectItem>
              {facilityTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={financingTypeFilter} onValueChange={setFinancingTypeFilter}>
            <SelectTrigger className="w-[180px] bg-black/60 border-gray-700 text-gray-300">
              <SelectValue placeholder="Financing Type" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-gray-700 text-gray-300">
              <SelectItem value="">All Financing Types</SelectItem>
              <SelectItem value="New Financing">New Financing</SelectItem>
              <SelectItem value="Refinancing">Refinancing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] bg-black/60 border-gray-700 text-gray-300">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-gray-700 text-gray-300">
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="OPEN">Open</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="EXPIRED">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-[180px] bg-black/60 border-gray-700 text-gray-300">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 border-gray-700 text-gray-300">
              <SelectItem value="">All Industries</SelectItem>
              {industries.map(industry => (
                <SelectItem key={industry} value={industry}>{industry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="border border-gray-700 rounded-sm overflow-hidden mb-4">
          <Table>
            <TableHeader className="bg-gray-800/40">
              <TableRow className="border-gray-700 hover:bg-transparent">
                <TableHead className="text-center w-16 text-xs font-medium text-cyan-400">
                  
                </TableHead>
                <TableHead 
                  className="text-center w-24 text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort('creditRating')}
                >
                  <div className="flex items-center justify-center">
                    RFP CREDIT RATING
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort('projectName')}
                >
                  <div className="flex items-center justify-center">
                    PROJECT NAME
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort('facilityType')}
                >
                  <div className="flex items-center justify-center">
                    FACILITY TYPE
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort('financingType')}
                >
                  <div className="flex items-center justify-center">
                    NEW FINANCING OR REFINANCING
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  TARGET PRINCIPAL
                </TableHead>
                <TableHead 
                  className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort('interestRateType')}
                >
                  <div className="flex items-center justify-center">
                    INTEREST RATE TYPE
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  TARGET INTEREST RATE
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  TARGET TERM
                </TableHead>
                <TableHead 
                  className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center justify-center">
                    STATUS
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead className="text-center text-xs font-medium text-cyan-400">
                  BID DEADLINE
                </TableHead>
                <TableHead 
                  className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort('lenderPreferences')}
                >
                  <div className="flex items-center justify-center">
                    LENDER PREFERENCES
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort('industry')}
                >
                  <div className="flex items-center justify-center">
                    INDUSTRY
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
                <TableHead 
                  className="text-center text-xs font-medium text-cyan-400 cursor-pointer hover:text-white"
                  onClick={() => handleSort('bidVolume')}
                >
                  <div className="flex items-center justify-center">
                    BID VOLUME
                    <ArrowUpDown className="ml-1 h-3 w-3" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProposals.length > 0 ? (
                paginatedProposals.map((proposal) => (
                  <TableRow key={proposal.id} className="border-gray-700 hover:bg-gray-800/20">
                    <TableCell className="text-center py-3">
                      <div className="flex justify-center items-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700/50"
                          onClick={() => viewProposalDetails(proposal.id)}
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={14} className="text-center py-10 text-gray-400">
                    No results found. Try adjusting your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
                >
                  Previous
                </PaginationLink>
              </PaginationItem>
              
              {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
                // Show pagination numbers around current page
                const pageNumbers = [];
                const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                const endPage = Math.min(totalPages, startPage + 4);
                
                for (let page = startPage; page <= endPage; page++) {
                  pageNumbers.push(
                    <PaginationItem key={page}>
                      <PaginationLink 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(page);
                        }}
                        isActive={currentPage === page}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return pageNumbers;
              })}
              
              <PaginationItem>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
