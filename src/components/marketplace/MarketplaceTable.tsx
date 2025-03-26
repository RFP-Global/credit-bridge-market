
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { FinanceProposal } from "@/types/marketplace";
import ProposalTableRow from "./table/ProposalTableRow";
import EmptyTableRow from "./table/EmptyTableRow";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import ColumnFilterButton from "./table/ColumnFilterButton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface MarketplaceTableProps {
  proposals: FinanceProposal[];
  sortField: keyof FinanceProposal | "";
  sortDirection: "asc" | "desc";
  handleSort: (field: keyof FinanceProposal) => void;
  
  // Add filter props
  facilityTypeFilter: string;
  setFacilityTypeFilter: (value: string) => void;
  financingTypeFilter: string;
  setFinancingTypeFilter: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  industryFilter: string;
  setIndustryFilter: (value: string) => void;
  interestRateTypeFilter: string;
  setInterestRateTypeFilter: (value: string) => void;
  lenderPreferencesFilter: string;
  setLenderPreferencesFilter: (value: string) => void;
  principalFilter: string;
  setPrincipalFilter: (value: string) => void;
  termFilter: string;
  setTermFilter: (value: string) => void;
  
  // Add data for filter options
  facilityTypes: string[];
  industries: string[];
}

const MarketplaceTable = ({
  proposals,
  sortField,
  sortDirection,
  handleSort,
  
  // Add filter values
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
  
  // Add filter options
  facilityTypes,
  industries,
}: MarketplaceTableProps) => {
  const navigate = useNavigate();

  const viewProposalDetails = (id: string) => {
    navigate(`/proposal/${id}`);
  };

  // Get unique values from proposals for filter dropdowns
  const financingTypes = [...new Set(proposals.map(p => p.financingType))];
  const statuses = [...new Set(proposals.map(p => p.status))];
  const interestRateTypes = [...new Set(proposals.map(p => p.interestRateType))];
  const lenderPreferencesOptions = [...new Set(proposals.map(p => p.lenderPreferences))];
  const principalOptions = [...new Set(proposals.map(p => p.principal))];
  const termOptions = [...new Set(proposals.map(p => p.term))];

  // Function to render column header with sort indicators and filter button
  const renderColumnHeader = (field: keyof FinanceProposal, title: string, filterContent: React.ReactNode) => {
    return (
      <div 
        className="font-mono text-xs text-center text-cyan-400 flex-1 px-4 py-3 cursor-pointer hover:text-white flex items-center justify-center relative"
      >
        <div onClick={() => handleSort(field)} className="flex items-center">
          {title}
          {sortField === field && (
            <span className="ml-1">
              {sortDirection === "asc" ? (
                <ArrowUp className="h-3 w-3 inline" />
              ) : (
                <ArrowDown className="h-3 w-3 inline" />
              )}
            </span>
          )}
        </div>
        
        {filterContent && (
          <ColumnFilterButton field={field as string} title={title}>
            {filterContent}
          </ColumnFilterButton>
        )}
      </div>
    );
  };

  return (
    <div className="mb-4 relative">
      {/* Separate fixed header */}
      <div className="sticky top-0 z-20 bg-black/90 border-b border-gray-700/30 mb-1">
        <div className="flex w-full">
          {renderColumnHeader("creditRating", "CREDIT RATING", 
            <div className="space-y-2">
              <span className="text-xs text-gray-400 block">Rating range coming soon</span>
            </div>
          )}
          
          {renderColumnHeader("projectName", "PROJECT NAME", 
            <div className="space-y-2">
              <Input 
                placeholder="Search project names..." 
                className="bg-gray-900 text-white border-gray-700 text-xs h-8" 
              />
            </div>
          )}
          
          {renderColumnHeader("facilityType", "FACILITY TYPE", 
            <div className="space-y-2">
              <Select value={facilityTypeFilter} onValueChange={setFacilityTypeFilter}>
                <SelectTrigger className="bg-gray-900 text-white border-gray-700 text-xs h-8">
                  <SelectValue placeholder="Select facility type" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-gray-700 text-white">
                  <SelectItem value="">All</SelectItem>
                  {facilityTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {renderColumnHeader("financingType", "FINANCING TYPE", 
            <div className="space-y-2">
              <Select value={financingTypeFilter} onValueChange={setFinancingTypeFilter}>
                <SelectTrigger className="bg-gray-900 text-white border-gray-700 text-xs h-8">
                  <SelectValue placeholder="Select financing type" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-gray-700 text-white">
                  <SelectItem value="">All</SelectItem>
                  {financingTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {renderColumnHeader("principal", "TARGET PRINCIPAL", 
            <div className="space-y-2">
              <Select value={principalFilter} onValueChange={setPrincipalFilter}>
                <SelectTrigger className="bg-gray-900 text-white border-gray-700 text-xs h-8">
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-gray-700 text-white">
                  <SelectItem value="">All</SelectItem>
                  {principalOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {renderColumnHeader("interestRateType", "INTEREST RATE TYPE", 
            <div className="space-y-2">
              <Select value={interestRateTypeFilter} onValueChange={setInterestRateTypeFilter}>
                <SelectTrigger className="bg-gray-900 text-white border-gray-700 text-xs h-8">
                  <SelectValue placeholder="Select rate type" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-gray-700 text-white">
                  <SelectItem value="">All</SelectItem>
                  {interestRateTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {renderColumnHeader("interestRate", "TARGET INTEREST RATE", 
            <div className="space-y-2">
              <span className="text-xs text-gray-400 block">Rate range coming soon</span>
            </div>
          )}
          
          {renderColumnHeader("term", "TARGET TERM", 
            <div className="space-y-2">
              <Select value={termFilter} onValueChange={setTermFilter}>
                <SelectTrigger className="bg-gray-900 text-white border-gray-700 text-xs h-8">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-gray-700 text-white">
                  <SelectItem value="">All</SelectItem>
                  {termOptions.map((term) => (
                    <SelectItem key={term} value={term}>{term}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {renderColumnHeader("status", "STATUS", 
            <div className="space-y-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-gray-900 text-white border-gray-700 text-xs h-8">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-gray-700 text-white">
                  <SelectItem value="">All</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {renderColumnHeader("bidDeadline", "BID DEADLINE", 
            <div className="space-y-2">
              <span className="text-xs text-gray-400 block">Date filtering coming soon</span>
            </div>
          )}
          
          {renderColumnHeader("lenderPreferences", "LENDER PREFERENCES", 
            <div className="space-y-2">
              <Select value={lenderPreferencesFilter} onValueChange={setLenderPreferencesFilter}>
                <SelectTrigger className="bg-gray-900 text-white border-gray-700 text-xs h-8">
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-gray-700 text-white">
                  <SelectItem value="">All</SelectItem>
                  {lenderPreferencesOptions.map((pref) => (
                    <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {renderColumnHeader("industry", "INDUSTRY", 
            <div className="space-y-2">
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger className="bg-gray-900 text-white border-gray-700 text-xs h-8">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-gray-700 text-white">
                  <SelectItem value="">All</SelectItem>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {renderColumnHeader("bidVolume", "BID VOLUME", 
            <div className="space-y-2">
              <span className="text-xs text-gray-400 block">Volume range coming soon</span>
            </div>
          )}
        </div>
      </div>

      {/* Scrollable table content */}
      <div className="rounded-sm overflow-hidden border-0">
        <Table>
          <TableBody>
            {proposals.length > 0 ? (
              proposals.map((proposal) => (
                <ProposalTableRow 
                  key={proposal.id}
                  proposal={proposal} 
                  onViewDetails={viewProposalDetails} 
                />
              ))
            ) : (
              <EmptyTableRow />
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MarketplaceTable;
