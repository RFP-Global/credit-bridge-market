
import { Search, SlidersHorizontal, Filter, FilterX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useMemo } from "react";
import { FinanceProposal } from "@/types/marketplace";

interface MarketplaceFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  facilityTypeFilter: string;
  setFacilityTypeFilter: (filter: string) => void;
  financingTypeFilter: string;
  setFinancingTypeFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  industryFilter: string;
  setIndustryFilter: (filter: string) => void;
  interestRateTypeFilter: string;
  setInterestRateTypeFilter: (filter: string) => void;
  lenderPreferencesFilter: string;
  setLenderPreferencesFilter: (filter: string) => void;
  creditRatingFilter: [number, number];
  setCreditRatingFilter: (range: [number, number]) => void;
  principalFilter: string;
  setPrincipalFilter: (filter: string) => void;
  termFilter: string;
  setTermFilter: (filter: string) => void;
  proposals: FinanceProposal[];
  facilityTypes: string[];
  industries: string[];
  clearFilters: () => void;
}

const MarketplaceFilters = ({
  searchTerm,
  setSearchTerm,
  facilityTypeFilter,
  setFacilityTypeFilter,
  financingTypeFilter,
  setFinancingTypeFilter,
  statusFilter,
  setStatusFilter,
  industryFilter,
  setIndustryFilter,
  interestRateTypeFilter,
  setInterestRateTypeFilter,
  lenderPreferencesFilter,
  setLenderPreferencesFilter,
  principalFilter,
  setPrincipalFilter,
  termFilter,
  setTermFilter,
  proposals,
  facilityTypes,
  industries,
  clearFilters,
}: MarketplaceFiltersProps) => {
  
  // Extract unique values for more dropdown filters
  const lenderPreferences = useMemo(() => 
    [...new Set(proposals.map(p => p.lenderPreferences))], 
    [proposals]
  );

  const principals = useMemo(() => 
    [...new Set(proposals.map(p => p.principal))], 
    [proposals]
  );

  const terms = useMemo(() => 
    [...new Set(proposals.map(p => p.term))], 
    [proposals]
  );
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="relative flex-grow max-w-xs">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
        <Input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Select value={facilityTypeFilter} onValueChange={setFacilityTypeFilter}>
        <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300">
          <SelectValue placeholder="Facility Type" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 border-gray-700/50 text-gray-300">
          <SelectItem value="">All Facility Types</SelectItem>
          {facilityTypes.map(type => (
            <SelectItem key={type} value={type}>{type}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={financingTypeFilter} onValueChange={setFinancingTypeFilter}>
        <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300">
          <SelectValue placeholder="Financing Type" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 border-gray-700/50 text-gray-300">
          <SelectItem value="">All Financing Types</SelectItem>
          <SelectItem value="New Financing">New Financing</SelectItem>
          <SelectItem value="Refinancing">Refinancing</SelectItem>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 border-gray-700/50 text-gray-300">
          <SelectItem value="">All Statuses</SelectItem>
          <SelectItem value="OPEN">Open</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="EXPIRED">Expired</SelectItem>
        </SelectContent>
      </Select>

      <Select value={industryFilter} onValueChange={setIndustryFilter}>
        <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300">
          <SelectValue placeholder="Industry" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 border-gray-700/50 text-gray-300">
          <SelectItem value="">All Industries</SelectItem>
          {industries.map(industry => (
            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={interestRateTypeFilter} onValueChange={setInterestRateTypeFilter}>
        <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300">
          <SelectValue placeholder="Interest Rate Type" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 border-gray-700/50 text-gray-300">
          <SelectItem value="">All Rate Types</SelectItem>
          <SelectItem value="Fixed">Fixed</SelectItem>
          <SelectItem value="Floating">Floating</SelectItem>
        </SelectContent>
      </Select>

      <Select value={principalFilter} onValueChange={setPrincipalFilter}>
        <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300">
          <SelectValue placeholder="Principal" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 border-gray-700/50 text-gray-300">
          <SelectItem value="">All Principals</SelectItem>
          {principals.map(principal => (
            <SelectItem key={principal} value={principal}>{principal}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={termFilter} onValueChange={setTermFilter}>
        <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300">
          <SelectValue placeholder="Term" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 border-gray-700/50 text-gray-300">
          <SelectItem value="">All Terms</SelectItem>
          {terms.map(term => (
            <SelectItem key={term} value={term}>{term}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={lenderPreferencesFilter} onValueChange={setLenderPreferencesFilter}>
        <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300">
          <SelectValue placeholder="Lender Preferences" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 border-gray-700/50 text-gray-300">
          <SelectItem value="">All Preferences</SelectItem>
          {lenderPreferences.map(pref => (
            <SelectItem key={pref} value={pref}>{pref}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button 
        variant="outline" 
        size="sm" 
        className="border-gray-700/50 text-gray-300 bg-transparent hover:bg-cyan-500/10 hover:text-cyan-300"
        onClick={clearFilters}
      >
        <FilterX className="mr-2 h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );
};

export default MarketplaceFilters;
