
import Navbar from "@/components/Navbar";
import { columnConfig } from "@/components/marketplace/table/ColumnConfig";

const TransactionArchive = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <h1 className="text-3xl font-bold mb-6">Transaction Archive</h1>
        <p className="mb-8">
          View and analyze historical transaction data across the platform.
        </p>
        
        {/* Transaction archive content will go here */}
        <div className="border border-gray-700 rounded-lg p-6">
          <p className="text-gray-400">Transaction history will be displayed here.</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionArchive;
