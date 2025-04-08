
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
import RadarScreen from "@/components/RadarScreen";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Radar, Signal, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if user is coming from lender dashboard based on the URL path or state
  const isLenderRole = location.pathname.includes('lender-dashboard') || 
                      location.state?.from === 'lender-dashboard';
                      
  // Determine the dashboard route based on user role
  const dashboardRoute = isLenderRole ? '/lender-dashboard' : '/enterprise-dashboard';

  const handleBackNavigation = () => {
    // Check if we have a valid 'from' path in location state
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      // Default fallback
      navigate(dashboardRoute);
    }
  };

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
    columnFilters,
    setColumnFilters,
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
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="relative mr-2">
                  <Radar className="h-6 w-6 text-primary" />
                  <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span className="font-mono text-xl">RFP GLOBAL</span>
              </Link>
              <span className="ml-4 text-xs font-mono text-foreground/60 border-l border-primary/20 pl-4">MARKETPLACE</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-none font-mono border-primary/30 text-xs"
                onClick={handleBackNavigation}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                BACK TO {isLenderRole ? "LENDER" : "ENTERPRISE"} DASHBOARD
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col">
          <div className="border-b border-primary/10 pb-4 mb-6">
            <h1 className="text-2xl font-mono">Marketplace</h1>
            <p className="text-sm text-muted-foreground">
              Explore financing opportunities in the global marketplace.
            </p>
          </div>
          
          <div className="bg-transparent pb-4 z-30">
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
          </div>

          {/* Scrollable table area with fixed headers */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-[calc(100vh-340px)]">
              <div className="min-w-max">
                <MarketplaceTable 
                  proposals={paginatedProposals}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  columnFilters={columnFilters}
                  setColumnFilters={setColumnFilters}
                />
              </div>
            </ScrollArea>
          </div>

          {/* Fixed pagination at the bottom */}
          <div className="mt-4 bg-transparent pt-2">
            <MarketplacePagination 
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
