
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

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Always show first page
    if (totalPages > 5 && currentPage > 3) {
      pageNumbers.push(1);
      if (currentPage > 4) pageNumbers.push('...');
    }

    // Calculate start and end for middle pages
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);

    for (let page = start; page <= end; page++) {
      pageNumbers.push(page);
    }

    // Always show last page if more than 5 pages
    if (totalPages > 5 && currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

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
        
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <span className="px-2 text-gray-400">...</span>
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={page}>
              <PaginationLink 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof page === 'number') handlePageChange(page);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
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
