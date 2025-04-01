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
  
  // Format business type display with more descriptive business types
  const displayBusinessType = () => {
    if (proposal.businessType) return proposal.businessType;
    
    // Determine business type based on industry if available
    if (proposal.industry) {
      switch(proposal.industry) {
        case "Construction": 
          return getConstructionBusinessType(proposal.id);
        case "Real Estate": 
          return getRealEstateBusinessType(proposal.id);
        case "Technology": 
          return getTechBusinessType(proposal.id);
        case "Healthcare": 
          return getHealthcareBusinessType(proposal.id);
        case "Manufacturing": 
          return getManufacturingBusinessType(proposal.id);
        case "Retail": 
          return getRetailBusinessType(proposal.id);
        case "Energy": 
          return getEnergyBusinessType(proposal.id);
        case "Wholesale": 
          return getWholesaleBusinessType(proposal.id);
        case "Hospitality": 
          return getHospitalityBusinessType(proposal.id);
        case "Agriculture": 
          return getAgricultureBusinessType(proposal.id);
        default: 
          return getGenericBusinessType(proposal.id);
      }
    }
    return getGenericBusinessType(proposal.id);
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
                  {getBusinessDescription(proposal.industry, displayBusinessType())}
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

// Helper functions to generate specific business types based on industry
function getConstructionBusinessType(id: string): string {
  const types = [
    "General Contractor", 
    "Home Builder", 
    "Commercial Developer", 
    "Renovation Specialist",
    "Infrastructure Developer",
    "Specialty Contractor",
    "Civil Engineering Firm",
    "Construction Management"
  ];
  return types[parseInt(id) % types.length];
}

function getRealEstateBusinessType(id: string): string {
  const types = [
    "Property Management Firm", 
    "Real Estate Agency", 
    "Commercial Developer", 
    "Residential Developer",
    "REIT",
    "Real Estate Investment Group",
    "Property Flipping Business"
  ];
  return types[parseInt(id) % types.length];
}

function getTechBusinessType(id: string): string {
  const types = [
    "Software Development Studio", 
    "SaaS Company", 
    "IT Services Provider", 
    "App Developer",
    "Cloud Computing Provider",
    "Cybersecurity Firm",
    "Data Analytics Company",
    "Tech Startup"
  ];
  return types[parseInt(id) % types.length];
}

function getHealthcareBusinessType(id: string): string {
  const types = [
    "Medical Practice", 
    "Telehealth Provider", 
    "Specialty Clinic", 
    "Healthcare IT",
    "Medical Device Company",
    "Pharmaceutical Research",
    "Wellness Center",
    "Home Health Service"
  ];
  return types[parseInt(id) % types.length];
}

function getManufacturingBusinessType(id: string): string {
  const types = [
    "Assembly Plant", 
    "Electronics Manufacturer", 
    "Food Processing Plant", 
    "Automotive Parts Supplier",
    "Textile Factory",
    "Furniture Maker",
    "Industrial Equipment Producer",
    "Plastics Manufacturer"
  ];
  return types[parseInt(id) % types.length];
}

function getRetailBusinessType(id: string): string {
  const types = [
    "Boutique Store", 
    "Online Retailer", 
    "Chain Store", 
    "Specialty Shop",
    "Department Store",
    "Direct-to-Consumer Brand",
    "Pop-up Shop",
    "Discount Store"
  ];
  return types[parseInt(id) % types.length];
}

function getEnergyBusinessType(id: string): string {
  const types = [
    "Solar Installation Company", 
    "Wind Farm Developer", 
    "Oil & Gas Provider", 
    "Energy Consulting Firm",
    "Biofuel Producer",
    "Energy Storage Solutions",
    "Utility Service Provider",
    "EV Charging Network"
  ];
  return types[parseInt(id) % types.length];
}

function getWholesaleBusinessType(id: string): string {
  const types = [
    "Distribution Center", 
    "Import/Export Business", 
    "Bulk Supplier", 
    "B2B Marketplace",
    "Food Distributor",
    "Industrial Supply Wholesaler",
    "Raw Materials Supplier",
    "Wholesale Showroom"
  ];
  return types[parseInt(id) % types.length];
}

function getHospitalityBusinessType(id: string): string {
  const types = [
    "Boutique Hotel", 
    "Restaurant", 
    "Food Truck", 
    "Coffee Shop",
    "Bed & Breakfast",
    "Event Venue",
    "Catering Service",
    "Brewpub"
  ];
  return types[parseInt(id) % types.length];
}

function getAgricultureBusinessType(id: string): string {
  const types = [
    "Family Farm", 
    "Organic Produce Grower", 
    "Livestock Operation", 
    "Vertical Farm",
    "Aquaponics Facility",
    "Specialty Crop Producer",
    "Community Supported Agriculture",
    "Agtech Startup"
  ];
  return types[parseInt(id) % types.length];
}

function getGenericBusinessType(id: string): string {
  const types = [
    "Service Provider", 
    "Local Business", 
    "Online Platform", 
    "Consulting Firm",
    "Specialty Shop",
    "Family Business",
    "Franchise",
    "Startup"
  ];
  return types[parseInt(id) % types.length];
}

function getBusinessDescription(industry?: string, businessType?: string): string {
  if (!industry && !businessType) {
    return "A growing business seeking financing for expansion.";
  }
  
  if (businessType) {
    switch(businessType) {
      case "Food Truck":
        return "A mobile food business offering specialty cuisine with plans to expand fleet.";
      case "Restaurant":
        return "A dining establishment looking to renovate facilities and expand menu offerings.";
      case "Software Development Studio":
        return "A team of developers creating custom software solutions for business clients.";
      case "Online Retailer":
        return "An e-commerce business selling products directly to consumers via their website.";
      default:
        return `A ${businessType.toLowerCase()} ${industry ? `in the ${industry.toLowerCase()} sector` : ''} seeking financing for operations and growth.`;
    }
  }
  
  return `A business in the ${industry?.toLowerCase() || 'service'} industry looking for capital to fuel growth.`;
}

export default ProposalTableRow;
