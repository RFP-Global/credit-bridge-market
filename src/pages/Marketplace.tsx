
import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import FullscreenButton from "@/components/FullscreenButton";
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import MarketplaceTable from "@/components/marketplace/MarketplaceTable";
import MarketplacePagination from "@/components/marketplace/MarketplacePagination";
import { useMarketplace } from "@/hooks/useMarketplace";
import { financeProposals } from "@/data/marketplaceProposals";
import { ScrollArea } from "@/components/ui/scroll-area";

const Marketplace = () => {
  // Extract unique values for filters
  const facilityTypes = useMemo(() => 
    [...new Set(financeProposals.map(p => p.facilityType))], 
    []
  );
  
  const industries = useMemo(() => 
    [...new Set(financeProposals.map(p => p.industry))], 
    []
  );

  const {
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
    sortField,
    sortDirection,
    currentPage,
    filteredProposals,
    paginatedProposals,
    totalPages,
    handleSort,
    handlePageChange,
    clearFilters
  } = useMarketplace(financeProposals);

  return (
    <div className="min-h-screen bg-black text-gray-200 relative">
      <Navbar />
      <FullscreenButton />
      
      <div className="container mx-auto px-4 py-6 pt-24 h-screen flex flex-col">
        <MarketplaceHeader 
          resultsCount={filteredProposals.length}
          clearFilters={clearFilters}
        />

        <MarketplaceFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          facilityTypeFilter={facilityTypeFilter}
          setFacilityTypeFilter={setFacilityTypeFilter}
          financingTypeFilter={financingTypeFilter}
          setFinancingTypeFilter={setFinancingTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          industryFilter={industryFilter}
          setIndustryFilter={setIndustryFilter}
          facilityTypes={facilityTypes}
          industries={industries}
          clearFilters={clearFilters}
        />

        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-340px)]">
            <MarketplaceTable 
              proposals={paginatedProposals}
              sortField={sortField}
              sortDirection={sortDirection}
              handleSort={handleSort}
            />
          </ScrollArea>
        </div>

        <div className="mt-4">
          <MarketplacePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
