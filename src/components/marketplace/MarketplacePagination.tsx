
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface MarketplacePaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const MarketplacePagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: MarketplacePaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
          >
            Previous
          </PaginationLink>
        </PaginationItem>
        
        {Array.from({length: Math.min(5, totalPages)}, (_, i) => {
          // Show pagination numbers around current page
          const pageNumbers = [];
          const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
          const endPage = Math.min(totalPages, startPage + 4);
          
          for (let page = startPage; page <= endPage; page++) {
            pageNumbers.push(
              <PaginationItem key={page}>
                <PaginationLink 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return pageNumbers;
        })}
        
        <PaginationItem>
          <PaginationLink 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
          >
            Next
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default MarketplacePagination;
