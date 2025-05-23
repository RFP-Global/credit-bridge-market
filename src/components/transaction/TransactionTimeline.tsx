
interface TransactionTimelineProps {
  transactionDetails: any;
  className?: string;
}

const TransactionTimeline = ({ transactionDetails, className = "" }: TransactionTimelineProps) => {
  const borrowerInfo = transactionDetails?.borrowerInfo || {};
  const businessName = borrowerInfo.company || "Company";

  return (
    <div className={`bg-black/50 border border-gray-800/50 rounded-lg p-5 ${className}`}>
      <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
        Transaction Timeline
      </h2>
      
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-8 border-l border-dashed border-gray-700"></div>
        
        <div className="space-y-8 relative">
          <div className="flex items-start">
            <div className="bg-cyan-600 h-4 w-4 rounded-full mt-1 z-10"></div>
            <div className="ml-6">
              <p className="text-cyan-300">{transactionDetails?.startDate}</p>
              <h3 className="text-white">Proposal Posted to Marketplace</h3>
              <p className="text-sm text-gray-400 mt-1">
                {businessName} ({borrowerInfo.businessType || 'Corporation'}) from {borrowerInfo.city || 'City'}, {borrowerInfo.state || 'State'} 
                posted initial {transactionDetails?.facilityType || 'financing'} proposal.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-cyan-600 h-4 w-4 rounded-full mt-1 z-10"></div>
            <div className="ml-6">
              <p className="text-cyan-300">{new Date(new Date(transactionDetails?.startDate || "").getTime() + 86400000 * 2).toLocaleDateString()}</p>
              <h3 className="text-white">First Bids Received</h3>
              <p className="text-sm text-gray-400 mt-1">
                Initial offers submitted by interested lenders for {borrowerInfo.subSector || 'sector'} financing.
                {borrowerInfo.zipCode ? ` Project location: ${borrowerInfo.city}, ${borrowerInfo.state} ${borrowerInfo.zipCode}` : ''}
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-cyan-600 h-4 w-4 rounded-full mt-1 z-10"></div>
            <div className="ml-6">
              <p className="text-cyan-300">{new Date(new Date(transactionDetails?.completionDate || "").getTime() - 86400000 * 4).toLocaleDateString()}</p>
              <h3 className="text-white">Final Bid Selection</h3>
              <p className="text-sm text-gray-400 mt-1">
                {businessName} ({borrowerInfo.foundedYear ? `founded ${borrowerInfo.foundedYear}, ` : ''}{borrowerInfo.employees} employees) 
                selected winning bid from {transactionDetails?.winningLender}.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-cyan-600 h-4 w-4 rounded-full mt-1 z-10"></div>
            <div className="ml-6">
              <p className="text-cyan-300">{transactionDetails?.completionDate}</p>
              <h3 className="text-white">Transaction Completed</h3>
              <p className="text-sm text-gray-400 mt-1">
                Final documents signed and funding completed for {borrowerInfo.revenue} annual revenue business in the {borrowerInfo.subSector || borrowerInfo.industry} subsector.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTimeline;
