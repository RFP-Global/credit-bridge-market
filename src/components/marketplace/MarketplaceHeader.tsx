
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, FileArchive } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MarketplaceHeaderProps {
  resultsCount: number;
  clearFilters: () => void;
}

const MarketplaceHeader = ({
  resultsCount,
  clearFilters,
}: MarketplaceHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cyan-400">Proposals</h1>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gray-700/50 text-cyan-300 bg-transparent hover:bg-cyan-900/20"
          onClick={() => navigate("/transaction-archive")}
        >
          <FileArchive className="mr-2 h-4 w-4" />
          Transaction Archive
        </Button>
      </div>
      
      <div className="flex justify-end items-center mt-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="border-gray-700/50 text-gray-300 bg-transparent"
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
