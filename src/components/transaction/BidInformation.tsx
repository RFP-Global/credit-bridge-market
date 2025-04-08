
import { BarChart, User, Clock, Building as BuildingBank, FileCheck } from "lucide-react";

interface BidInformationProps {
  transactionDetails: any;
}

const BidInformation = ({ transactionDetails }: BidInformationProps) => {
  return (
    <div className="bg-black/50 border border-gray-800/50 rounded-lg p-5">
      <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
        Bid Information
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <BarChart className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Opening Bid</p>
              <p className="text-sm">{transactionDetails?.openingBid || "$2.45M"}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <BarChart className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Closing Bid</p>
              <p className="text-sm">{transactionDetails?.closingBid || "$2.38M"}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <User className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Bids Received</p>
              <p className="text-sm">{transactionDetails?.bidsReceived || "5"}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <BuildingBank className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Bank Type</p>
              <p className="text-sm">{transactionDetails?.bankType || "Commercial Bank"}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Time to Funding</p>
              <p className="text-sm">{transactionDetails?.timeToFunding || "7 days"}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <FileCheck className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Underwriting Score</p>
              <p className="text-sm">{transactionDetails?.underwritingScore || "78"}/100</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidInformation;
