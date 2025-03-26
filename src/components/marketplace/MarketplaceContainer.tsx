
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import FullscreenButton from "@/components/FullscreenButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarketplacePagination from "@/components/marketplace/MarketplacePagination";

interface MarketplaceContainerProps {
  children: ReactNode;
  headerSection: ReactNode;
  paginationProps: {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
  };
}

const MarketplaceContainer = ({
  children,
  headerSection,
  paginationProps,
}: MarketplaceContainerProps) => {
  const { currentPage, totalPages, handlePageChange } = paginationProps;

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <Navbar />
      <FullscreenButton />
      
      <div className="container mx-auto px-4 py-6 pt-24 h-screen flex flex-col">
        {/* Header section */}
        <div className="bg-background pb-4 z-30">
          {headerSection}
        </div>

        {/* Scrollable table area with fixed headers */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-[calc(100vh-340px)]">
            <div className="min-w-max">
              {children}
            </div>
          </ScrollArea>
        </div>

        {/* Fixed pagination at the bottom */}
        <div className="mt-4 bg-background pt-2">
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

export default MarketplaceContainer;
