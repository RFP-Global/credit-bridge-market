
import { Building, Briefcase, DollarSign, PercentIcon, Clock, Building as BuildingBank, Users, Calendar, MapPin } from "lucide-react";

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
      
      {transaction.companyName && (
        <div className="mb-4">
          <h3 className="text-md font-medium text-cyan-200">{transaction.companyName}</h3>
          {transaction.businessDescription && (
            <p className="text-sm text-gray-300 mt-1">{transaction.businessDescription}</p>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Building className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Industry</p>
              <p className="text-sm">{transaction.industry}</p>
              {transaction.subSector && <p className="text-xs text-gray-400">{transaction.subSector}</p>}
              {transaction.businessType && <p className="text-xs text-gray-400">Type: {transaction.businessType}</p>}
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
        
        {(transaction.employeeCount || transaction.annualRevenue || transaction.foundedYear) && (
          <div className="grid grid-cols-3 gap-4">
            {transaction.employeeCount && (
              <div className="flex items-center space-x-3">
                <Users className="h-4 w-4 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-400">Employee Count</p>
                  <p className="text-sm">{transaction.employeeCount}</p>
                </div>
              </div>
            )}
            
            {transaction.annualRevenue && (
              <div className="flex items-center space-x-3">
                <DollarSign className="h-4 w-4 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-400">Annual Revenue</p>
                  <p className="text-sm">{transaction.annualRevenue}</p>
                </div>
              </div>
            )}
            
            {transaction.foundedYear && (
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-400">Founded</p>
                  <p className="text-sm">{transaction.foundedYear}</p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {transaction.location && (
          <div className="flex items-center space-x-3">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm">
                {transaction.location.city}, {transaction.location.state}
                {transaction.zipCode && ` - ${transaction.zipCode}`}
              </p>
            </div>
          </div>
        )}
        
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
