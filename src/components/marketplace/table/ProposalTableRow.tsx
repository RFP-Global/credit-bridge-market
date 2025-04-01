
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FinanceProposal } from "@/types/marketplace";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProposalTableRowProps {
  proposal: FinanceProposal;
  onViewDetails: (id: string) => void;
}

const ProposalTableRow = ({ proposal, onViewDetails }: ProposalTableRowProps) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    onViewDetails(proposal.id);
  };

  const handleBidClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/proposal/${proposal.id}/bid`);
  };

  // Common class for all cells to ensure consistent alignment with headers
  const cellClass = "flex-1 text-center px-4 py-2 font-extralight";
  
  // Format business type display
  const displayBusinessType = proposal.businessType || "Business Details";
  
  // Format location display
  const displayLocation = proposal.zipCode || 
    (proposal.location ? `${proposal.location.city.substring(0, 5)}...` : "Location Info");

  return (
    <TableRow 
      className="border-gray-700/30 hover:bg-gray-800/20 cursor-pointer transition-colors flex w-full"
      onClick={handleViewClick}
    >
      <TableCell className={`font-mono text-xs ${cellClass}`}>{proposal.creditRating.toFixed(1)}</TableCell>
      <TableCell className={cellClass}>{proposal.projectName}</TableCell>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <TableCell className={`${cellClass} hover:text-cyan-400`}>
              {displayBusinessType}
            </TableCell>
          </TooltipTrigger>
          <TooltipContent className="bg-black/90 border-gray-700 max-w-md p-3">
            <div className="space-y-2">
              <p className="text-xs font-medium text-cyan-400">Business Details</p>
              {proposal.businessDescription ? (
                <p className="text-xs text-gray-300">{proposal.businessDescription}</p>
              ) : (
                <p className="text-xs text-gray-300">No business description available</p>
              )}
              {proposal.foundedYear ? (
                <p className="text-xs text-gray-300">Founded: {proposal.foundedYear}</p>
              ) : (
                <p className="text-xs text-gray-300">Founded: Not specified</p>
              )}
              {proposal.annualRevenue ? (
                <p className="text-xs text-gray-300">Revenue: {proposal.annualRevenue}</p>
              ) : (
                <p className="text-xs text-gray-300">Revenue: Not specified</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <TableCell className={`${cellClass} hover:text-cyan-400`}>
              {displayLocation}
            </TableCell>
          </TooltipTrigger>
          <TooltipContent className="bg-black/90 border-gray-700 max-w-md p-3">
            <div className="space-y-2">
              <p className="text-xs font-medium text-cyan-400">Location</p>
              {proposal.location ? (
                <p className="text-xs text-gray-300">
                  {proposal.location.city}, {proposal.location.state}, {proposal.location.country}
                </p>
              ) : (
                <p className="text-xs text-gray-300">
                  Location information not available
                </p>
              )}
              {proposal.zipCode && (
                <p className="text-xs text-gray-300">Zip Code: {proposal.zipCode}</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TableCell className={cellClass}>{proposal.facilityType}</TableCell>
      <TableCell className={cellClass}>{proposal.financingType}</TableCell>
      <TableCell className={cellClass}>{proposal.principal}</TableCell>
      <TableCell className={cellClass}>{proposal.interestRateType}</TableCell>
      <TableCell className={cellClass}>{proposal.interestRate}</TableCell>
      <TableCell className={cellClass}>{proposal.term}</TableCell>
      <TableCell className={cellClass}>
        <Badge className={`
          ${proposal.status === "OPEN" ? "bg-white/10 text-white" : 
            proposal.status === "COMPLETED" ? "bg-gray-500/20 text-gray-300" : 
            "bg-gray-400/10 text-gray-400"}
          rounded-full px-2 text-xs mx-auto
        `}>
          {proposal.status}
        </Badge>
      </TableCell>
      <TableCell className={cellClass}>{proposal.bidDeadline}</TableCell>
      <TableCell className={cellClass}>{proposal.lenderPreferences}</TableCell>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <TableCell className={`${cellClass} hover:text-cyan-400`}>
              {proposal.industry}
            </TableCell>
          </TooltipTrigger>
          <TooltipContent className="bg-black/90 border-gray-700 max-w-md p-3">
            <p className="text-xs text-gray-300">{proposal.subSector || "No subsector specified"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TableCell className={cellClass}>
        <div className="flex items-center justify-center">
          <div className="w-16 bg-gray-700/50 h-1 rounded-full overflow-hidden mr-2">
            <div 
              className="bg-cyan-400/80 h-full rounded-full"
              style={{ width: `${proposal.bidVolume}%` }}
            />
          </div>
          <span className="text-xs">{proposal.bidVolume}%</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ProposalTableRow;
