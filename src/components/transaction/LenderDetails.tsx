
import { 
  Building, 
  Calendar, 
  BarChart3, 
  DollarSign, 
  MapPin, 
  Repeat, 
  Briefcase, 
  CreditCard
} from "lucide-react";

interface LenderDetailsProps {
  transactionDetails: any;
}

const LenderDetails = ({ transactionDetails }: LenderDetailsProps) => {
  const lenderInfo = transactionDetails?.lenderInfo;
  
  if (!lenderInfo) return null;
  
  return (
    <div className="bg-black/50 border border-gray-800/50 rounded-lg p-5">
      <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
        Lender Details
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Institution</p>
              <p className="text-sm">{lenderInfo.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Founded</p>
              <p className="text-sm">{lenderInfo.founded}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Lender Type</p>
              <p className="text-sm">{lenderInfo.type}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <DollarSign className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Assets Under Management</p>
              <p className="text-sm">{lenderInfo.assets}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Headquarters</p>
              <p className="text-sm">{lenderInfo.headquarters}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Market Share</p>
              <p className="text-sm">{lenderInfo.marketShare}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Repeat className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Regular Client</p>
              <p className="text-sm">{lenderInfo.regularClient ? "Yes" : "No"}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <CreditCard className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Average Deal Size</p>
              <p className="text-sm">{lenderInfo.averageDealSize}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Briefcase className="h-4 w-4 text-cyan-400" />
          <div>
            <p className="text-xs text-gray-400">Specialized In</p>
            <p className="text-sm">{lenderInfo.specializedIn}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LenderDetails;
