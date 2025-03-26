
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  facilityTypes,
  industries,
  clearFilters,
}: MarketplaceFiltersProps) => {
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
          <SelectItem value="all-facility-types">All Facility Types</SelectItem>
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
          <SelectItem value="all-financing-types">All Financing Types</SelectItem>
          <SelectItem value="New Financing">New Financing</SelectItem>
          <SelectItem value="Refinancing">Refinancing</SelectItem>
        </SelectContent>
      </Select>

      <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-[180px] bg-black/30 backdrop-blur-sm border-gray-700/50 text-gray-300">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-black/80 border-gray-700/50 text-gray-300">
          <SelectItem value="all-statuses">All Statuses</SelectItem>
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
          <SelectItem value="all-industries">All Industries</SelectItem>
          {industries.map(industry => (
            <SelectItem key={industry} value={industry}>{industry}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MarketplaceFilters;
