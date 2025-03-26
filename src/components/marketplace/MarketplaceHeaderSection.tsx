
import MarketplaceHeader from "@/components/marketplace/MarketplaceHeader";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";

interface MarketplaceHeaderSectionProps {
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
  resultsCount: number;
  clearFilters: () => void;
}

const MarketplaceHeaderSection = ({
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
  resultsCount,
  clearFilters,
}: MarketplaceHeaderSectionProps) => {
  return (
    <>
      <MarketplaceHeader 
        resultsCount={resultsCount}
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
    </>
  );
};

export default MarketplaceHeaderSection;
