
import { Building, Briefcase, DollarSign, PercentIcon, Clock, Building as BuildingBank } from "lucide-react";

interface TransactionSummaryProps {
  transaction: any;
  transactionDetails: any;
}

const TransactionSummary = ({ transaction, transactionDetails }: TransactionSummaryProps) => {
  return (
    <div className="bg-black/50 border border-gray-800/50 rounded-lg p-5">
      <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
        Transaction Summary
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Industry</p>
              <p className="text-sm">{transaction.industry}</p>
              {transaction.subSector && <p className="text-xs text-gray-400">{transaction.subSector}</p>}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Briefcase className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Facility Type</p>
              <p className="text-sm">{transaction.facilityType}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <DollarSign className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Principal</p>
              <p className="text-sm">${transaction.principal.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <PercentIcon className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Final Interest Rate</p>
              <p className="text-sm">{transaction.interestRate}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Term</p>
              <p className="text-sm">{transaction.term}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <BuildingBank className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Winning Lender</p>
              <p className="text-sm">{transactionDetails?.winningLender}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
