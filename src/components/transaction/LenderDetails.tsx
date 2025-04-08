
import { 
  Building, 
  Calendar, 
  BarChart3, 
  DollarSign, 
  MapPin, 
  Repeat, 
  Briefcase, 
  CreditCard,
  User
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
        Banker Details
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Banker</p>
              <p className="text-sm">{lenderInfo.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Institution</p>
              <p className="text-sm">{lenderInfo.institution}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Title</p>
              <p className="text-sm">{lenderInfo.title}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Calendar className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Years Experience</p>
              <p className="text-sm">{lenderInfo.experience}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm">{lenderInfo.location}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Success Rate</p>
              <p className="text-sm">{lenderInfo.successRate}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Repeat className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Previous Deals</p>
              <p className="text-sm">{lenderInfo.previousDeals}</p>
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
