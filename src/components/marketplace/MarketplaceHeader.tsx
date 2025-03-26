
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal } from "lucide-react";

interface MarketplaceHeaderProps {
  resultsCount: number;
  clearFilters: () => void;
}

const MarketplaceHeader = ({
  resultsCount,
  clearFilters,
}: MarketplaceHeaderProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-cyan-400 mb-4">Proposals</h1>
      <div className="flex justify-between items-center">
        <Button className="bg-black border border-gray-700 hover:bg-gray-800 text-white">
          New Proposal
        </Button>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700 text-gray-300"
            onClick={clearFilters}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
          <Badge className="bg-cyan-500/20 text-cyan-300">
            {resultsCount} Results
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
