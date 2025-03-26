
import { useState, useMemo } from "react";
import { FinanceProposal } from "@/types/marketplace";
import { toast } from "sonner";

export const useMarketplace = (proposals: FinanceProposal[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [facilityTypeFilter, setFacilityTypeFilter] = useState<string>("");
  const [financingTypeFilter, setFinancingTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [industryFilter, setIndustryFilter] = useState<string>("");
  const [interestRateTypeFilter, setInterestRateTypeFilter] = useState<string>("");
  const [lenderPreferencesFilter, setLenderPreferencesFilter] = useState<string>("");
  const [creditRatingFilter, setCreditRatingFilter] = useState<[number, number]>([0, 10]);
  const [principalFilter, setPrincipalFilter] = useState<string>("");
  const [termFilter, setTermFilter] = useState<string>("");
  const [sortField, setSortField] = useState<keyof FinanceProposal | "">("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Increased from 5 to 10 for better pagination with 50+ items

  // Filter and sort the proposals
  const filteredProposals = useMemo(() => {
    let result = [...proposals];

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

    // Apply new column filters
    if (interestRateTypeFilter) {
      result = result.filter(proposal => proposal.interestRateType === interestRateTypeFilter);
    }

    if (lenderPreferencesFilter) {
      result = result.filter(proposal => proposal.lenderPreferences === lenderPreferencesFilter);
    }

    if (principalFilter) {
      result = result.filter(proposal => proposal.principal === principalFilter);
    }

    if (termFilter) {
      result = result.filter(proposal => proposal.term === termFilter);
    }

    // Apply credit rating filter (range)
    if (creditRatingFilter[0] > 0 || creditRatingFilter[1] < 10) {
      result = result.filter(
        proposal => 
          proposal.creditRating >= creditRatingFilter[0] && 
          proposal.creditRating <= creditRatingFilter[1]
      );
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
  }, [
    proposals,
    searchTerm, 
    facilityTypeFilter, 
    financingTypeFilter, 
    statusFilter, 
    industryFilter,
    interestRateTypeFilter,
    lenderPreferencesFilter,
    creditRatingFilter,
    principalFilter,
    termFilter,
    sortField, 
    sortDirection
  ]);

  // Paginate the results
  const paginatedProposals = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProposals.slice(startIndex, endIndex);
  }, [filteredProposals, currentPage, itemsPerPage]);

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
    setInterestRateTypeFilter("");
    setLenderPreferencesFilter("");
    setCreditRatingFilter([0, 10]);
    setPrincipalFilter("");
    setTermFilter("");
    setSortField("");
    setSortDirection("asc");
    setCurrentPage(1);
    toast.info("All filters cleared");
  };

  return {
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
    creditRatingFilter,
    setCreditRatingFilter,
    principalFilter,
    setPrincipalFilter,
    termFilter,
    setTermFilter,
    sortField,
    sortDirection,
    currentPage,
    filteredProposals,
    paginatedProposals,
    totalPages,
    handleSort,
    handlePageChange,
    clearFilters
  };
};
