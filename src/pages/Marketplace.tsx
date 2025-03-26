
import { useMarketplace } from "@/hooks/useMarketplace";
import { useFilterExtraction } from "@/hooks/useFilterExtraction";
import { financeProposals } from "@/data/marketplaceProposals";
import MarketplaceContainer from "@/components/marketplace/MarketplaceContainer";
import MarketplaceHeaderSection from "@/components/marketplace/MarketplaceHeaderSection";
import MarketplaceContent from "@/components/marketplace/MarketplaceContent";

const Marketplace = () => {
  // Extract unique values for filters
  const { facilityTypes, industries } = useFilterExtraction(financeProposals);
  
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
    <MarketplaceContainer
      headerSection={
        <MarketplaceHeaderSection
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
          resultsCount={filteredProposals.length}
          clearFilters={clearFilters}
        />
      }
      paginationProps={{
        currentPage,
        totalPages,
        handlePageChange
      }}
    >
      <MarketplaceContent
        proposals={paginatedProposals}
        sortField={sortField}
        sortDirection={sortDirection}
        handleSort={handleSort}
      />
    </MarketplaceContainer>
  );
};

export default Marketplace;
