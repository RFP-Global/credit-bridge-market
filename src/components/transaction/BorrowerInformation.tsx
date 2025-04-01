
import { 
  Building, 
  Calendar, 
  Users, 
  DollarSign, 
  MapPin, 
  CreditCard, 
  History, 
  Globe, 
  GitBranch,
  Tag,
  Map,
  TrendingUp,
  BarChart,
  Briefcase,
  Building2
} from "lucide-react";

interface BorrowerInformationProps {
  transactionDetails: any;
}

const BorrowerInformation = ({ transactionDetails }: BorrowerInformationProps) => {
  const borrowerInfo = transactionDetails?.borrowerInfo;
  
  if (!borrowerInfo) return null;
  
  return (
    <div className="bg-black/50 border border-gray-800/50 rounded-lg p-5">
      <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
        Borrower Information
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Company</p>
              <p className="text-sm">{borrowerInfo.company}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Founded</p>
              <p className="text-sm">{borrowerInfo.foundedYear || "N/A"} ({borrowerInfo.yearsInBusiness} years in business)</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Users className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Employees</p>
              <p className="text-sm">{borrowerInfo.employees}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <DollarSign className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Annual Revenue</p>
              <p className="text-sm">{borrowerInfo.revenue}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Industry</p>
              <p className="text-sm">{borrowerInfo.industry}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Tag className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Sub-Sector</p>
              <p className="text-sm">{borrowerInfo.subSector || "N/A"}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Headquarters</p>
              <p className="text-sm">{borrowerInfo.city || borrowerInfo.headquarters}, {borrowerInfo.state}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Map className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Zip Code</p>
              <p className="text-sm">{borrowerInfo.zipCode || "N/A"}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Credit Score</p>
              <p className="text-sm">{borrowerInfo.creditScore}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <History className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Previous Financings</p>
              <p className="text-sm">{borrowerInfo.previousFinancings}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Globe className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Publicly Traded</p>
              <p className="text-sm">{borrowerInfo.publiclyTraded ? "Yes" : "No"}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Building2 className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Business Type</p>
              <p className="text-sm">{borrowerInfo.businessType || "Corporation"}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <GitBranch className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Subsidiaries</p>
              <p className="text-sm">{borrowerInfo.subsidiaries}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Growth Rate</p>
              <p className="text-sm">{borrowerInfo.growthRate || `${(Math.random() * 20).toFixed(1)}%`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BorrowerInformation;
