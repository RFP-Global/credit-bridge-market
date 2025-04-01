
import { useState } from "react";
import { Search, Filter, BarChart3, ListFilter, FileArchive } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionArchiveHeaderProps {
  totalTransactions: number;
  onSearchChange: (query: string) => void;
  onIndustryFilter: (industry: string) => void;
  onFacilityTypeFilter: (type: string) => void;
  industries: string[];
  facilityTypes: string[];
}

const TransactionArchiveHeader = ({
  totalTransactions,
  onSearchChange,
  onIndustryFilter,
  onFacilityTypeFilter,
  industries,
  facilityTypes
}: TransactionArchiveHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileArchive className="h-6 w-6 text-cyan-400" />
          <h1 className="text-3xl font-bold text-cyan-400">Transaction Archive</h1>
        </div>
        
        <div className="text-sm text-gray-400">
          {totalTransactions} transaction{totalTransactions !== 1 ? 's' : ''}
        </div>
      </div>
      
      <p className="text-gray-300">
        View and analyze anonymized transactions across the platform. Explore funding details, rates, and business insights.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            type="text"
            placeholder="Search by location, business type..." 
            className="pl-10 bg-gray-900/50 border-gray-700 text-white focus-visible:ring-cyan-500"
            value={searchQuery}
            onChange={handleSearchInput}
          />
        </div>
        
        <div className="flex gap-2">
          <div className="w-48">
            <Select onValueChange={onIndustryFilter}>
              <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:ring-cyan-500">
                <div className="flex items-center gap-2">
                  <ListFilter className="h-4 w-4 text-cyan-400" />
                  <SelectValue placeholder="Filter by Industry" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="all">All Industries</SelectItem>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-48">
            <Select onValueChange={onFacilityTypeFilter}>
              <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white focus:ring-cyan-500">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-cyan-400" />
                  <SelectValue placeholder="Filter by Facility" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700 text-white">
                <SelectItem value="all">All Facilities</SelectItem>
                {facilityTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" className="border-gray-700 text-cyan-300 bg-transparent hover:bg-cyan-900/20">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionArchiveHeader;
