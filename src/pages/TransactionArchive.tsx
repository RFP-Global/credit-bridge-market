import { useState, useMemo } from "react";
import TransactionHistoryTable from "@/components/transaction/TransactionHistoryTable";
import TransactionArchiveHeader from "@/components/transaction/TransactionArchiveHeader";
import { historicalTransactions } from "@/data/transactionArchiveData";

const TransactionArchive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [facilityTypeFilter, setFacilityTypeFilter] = useState("all");
  
  const industries = useMemo(() => {
    return [...new Set(historicalTransactions.map(t => t.industry))];
  }, []);
  
  const facilityTypes = useMemo(() => {
    return [...new Set(historicalTransactions.map(t => t.facilityType))];
  }, []);
  
  const filteredTransactions = useMemo(() => {
    return historicalTransactions.filter(transaction => {
      const matchesSearch = searchQuery === "" || 
        transaction.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transaction.subSector && transaction.subSector.toLowerCase().includes(searchQuery.toLowerCase())) ||
        transaction.id.substring(0, 6).toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesIndustry = industryFilter === "all" || transaction.industry === industryFilter;
      const matchesFacilityType = facilityTypeFilter === "all" || transaction.facilityType === facilityTypeFilter;
      
      return matchesSearch && matchesIndustry && matchesFacilityType;
    });
  }, [searchQuery, industryFilter, facilityTypeFilter]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 pt-8">
        <TransactionArchiveHeader 
          totalTransactions={filteredTransactions.length}
          onSearchChange={setSearchQuery}
          onIndustryFilter={setIndustryFilter}
          onFacilityTypeFilter={setFacilityTypeFilter}
          industries={industries}
          facilityTypes={facilityTypes}
        />
        
        <div className="mt-6">
          {filteredTransactions.length > 0 ? (
            <TransactionHistoryTable transactions={filteredTransactions} />
          ) : (
            <div className="border border-gray-700 rounded-lg p-12 text-center">
              <p className="text-gray-400 text-lg">No transactions match your filters.</p>
              <p className="text-gray-500 mt-2">Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionArchive;
