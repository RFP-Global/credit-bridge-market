
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
  
  // Enhanced function to display specific business types based on industry
  const displayBusinessType = () => {
    if (proposal.businessType) return proposal.businessType;
    
    // Generate specific business type based on industry
    if (proposal.industry) {
      switch(proposal.industry) {
        case "Construction":
          return ["Home Builder", "Commercial Constructor", "Road Construction", "Renovation Company", "Electrical Contractor"][parseInt(proposal.id) % 5];
        case "Real Estate":
          return ["Property Management", "Commercial Developer", "Real Estate Agency", "Apartment Complex", "Office Park"][parseInt(proposal.id) % 5];
        case "Technology":
          return ["Software Developer", "IT Services", "App Startup", "Cloud Provider", "Cybersecurity Firm"][parseInt(proposal.id) % 5];
        case "Healthcare":
          return ["Medical Practice", "Pharmacy", "Assisted Living", "Medical Equipment", "Dental Office"][parseInt(proposal.id) % 5];
        case "Manufacturing":
          return ["Auto Parts", "Electronics Manufacturer", "Textile Factory", "Food Processing", "Furniture Maker"][parseInt(proposal.id) % 5];
        case "Retail":
          return ["Clothing Store", "Grocery Chain", "Electronics Shop", "Department Store", "Specialty Boutique"][parseInt(proposal.id) % 5];
        case "Energy":
          return ["Solar Provider", "Wind Farm", "Oil Extraction", "Natural Gas", "Utility Company"][parseInt(proposal.id) % 5];
        case "Wholesale":
          return ["Food Distributor", "Building Materials", "Electronics Wholesaler", "Clothing Distributor", "Auto Parts Supplier"][parseInt(proposal.id) % 5];
        case "Hospitality":
          return ["Restaurant Chain", "Hotel Group", "Resort", "Catering Business", "Event Venue"][parseInt(proposal.id) % 5];
        case "Agriculture":
          return ["Crop Farm", "Dairy Farm", "Livestock Ranch", "Fruit Orchard", "Organic Farm"][parseInt(proposal.id) % 5];
        default:
          return "Business";
      }
    }
    return "Business";
  };
  
  // Format location display with better fallbacks
  const displayLocation = () => {
    if (proposal.zipCode) return proposal.zipCode;
    
    if (proposal.location) {
      return `${proposal.location.city.substring(0, 5)}...`;
    }
    
    // Generate a realistic zipcode based on proposal ID
    const id = parseInt(proposal.id);
    return id < 20 ? "80" + (200 + id).toString() : 
           id < 40 ? "90" + (100 + id).toString() : "10" + (100 + id).toString();
  };

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
              {displayBusinessType()}
            </TableCell>
          </TooltipTrigger>
          <TooltipContent className="bg-black/90 border-gray-700 max-w-md p-3">
            <div className="space-y-2">
              <p className="text-xs font-medium text-cyan-400">Business Details</p>
              {proposal.businessDescription ? (
                <p className="text-xs text-gray-300">{proposal.businessDescription}</p>
              ) : (
                <p className="text-xs text-gray-300">
                  {proposal.industry ? `${displayBusinessType()} in the ${proposal.industry} sector` : "No business description available"}
                </p>
              )}
              {proposal.foundedYear ? (
                <p className="text-xs text-gray-300">Founded: {proposal.foundedYear}</p>
              ) : (
                <p className="text-xs text-gray-300">Founded: {2000 + (parseInt(proposal.id) % 20)}</p>
              )}
              {proposal.annualRevenue ? (
                <p className="text-xs text-gray-300">Revenue: {proposal.annualRevenue}</p>
              ) : (
                <p className="text-xs text-gray-300">
                  Revenue: ${(1 + Math.floor(parseInt(proposal.id) / 10) * 2.5).toFixed(1)}M
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <TableCell className={`${cellClass} hover:text-cyan-400`}>
              {displayLocation()}
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
                  {generateCityState(proposal.id)}
                </p>
              )}
              <p className="text-xs text-gray-300">
                Zip Code: {proposal.zipCode || displayLocation()}
              </p>
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
            <p className="text-xs text-gray-300">{proposal.subSector || generateSubsector(proposal.industry)}</p>
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

// Helper function to generate city and state based on ID
function generateCityState(id: string) {
  const idNum = parseInt(id);
  const cities = [
    "New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", 
    "Phoenix, AZ", "Philadelphia, PA", "San Antonio, TX", "San Diego, CA",
    "Dallas, TX", "San Jose, CA", "Austin, TX", "Jacksonville, FL",
    "Fort Worth, TX", "Columbus, OH", "Charlotte, NC", "San Francisco, CA",
    "Indianapolis, IN", "Seattle, WA", "Denver, CO", "Boston, MA"
  ];
  return cities[idNum % cities.length] + ", USA";
}

// Helper function to generate industry subsector
function generateSubsector(industry?: string) {
  if (!industry) return "General Business";
  
  const subsectors: Record<string, string[]> = {
    "Construction": ["Commercial Construction", "Residential Construction", "Industrial Construction", "Infrastructure"],
    "Real Estate": ["Commercial Real Estate", "Residential Real Estate", "Property Management", "Development"],
    "Technology": ["Software", "Hardware", "SaaS", "IT Services", "Fintech"],
    "Healthcare": ["Medical Services", "Pharmaceuticals", "Healthcare IT", "Medical Equipment"],
    "Manufacturing": ["Industrial Manufacturing", "Consumer Goods", "Electronics", "Automotive"],
    "Retail": ["E-commerce", "Specialty Retail", "General Merchandise", "Apparel"],
    "Energy": ["Renewable Energy", "Oil & Gas", "Power Generation", "Utilities"],
    "Wholesale": ["Distribution", "Supply Chain", "Commodities Trading", "Import/Export"],
    "Hospitality": ["Hotels & Lodging", "Food Service", "Travel & Tourism", "Event Management"],
    "Agriculture": ["Crop Production", "Livestock", "Agricultural Services", "Food Processing"]
  };
  
  const options = subsectors[industry] || ["General"];
  return options[Math.floor(Math.random() * options.length)];
}

export default ProposalTableRow;
