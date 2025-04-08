
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TimeFilterRow } from "@/components/intelligence/TimeFilterRow";
import { IntelligenceCard } from "@/components/intelligence/IntelligenceCard";
import LoanRequestChart from "./businessSize/LoanRequestChart";
import DefaultDistributionChart from "./businessSize/DefaultDistributionChart";
import LoanTermsChart from "./businessSize/LoanTermsChart";
import ApprovalRejectionChart from "./businessSize/ApprovalRejectionChart";

interface BusinessSizeAnalyticsProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
  businessSizeData: any[];
  businessSizeDefaultData: any[];
  businessSizeTermsData: any[];
  loanApprovalData: any[];
  colors: Record<string, string>;
}

const BusinessSizeAnalytics = ({ 
  timeFilter, 
  onTimeFilterChange,
  businessSizeData,
  businessSizeDefaultData,
  businessSizeTermsData,
  loanApprovalData,
  colors
}: BusinessSizeAnalyticsProps) => {
  const [expanded, setExpanded] = useState(true);

  if (!expanded) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded mb-3 p-2">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setExpanded(true)}
        >
          <h3 className="text-sm font-mono text-gray-300">Business Size Analytics</h3>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded mb-3">
      <div 
        className="flex items-center justify-between p-2 cursor-pointer border-b border-gray-800" 
        onClick={() => setExpanded(false)}
      >
        <h3 className="text-sm font-mono text-gray-300">Business Size Analytics</h3>
        <ChevronDown className="h-4 w-4 text-gray-500 transform rotate-180" />
      </div>
      
      <div className="p-3">
        <TimeFilterRow activeFilter={timeFilter} onFilterChange={onTimeFilterChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
          <IntelligenceCard title="Loan Request Patterns by Size" timeFilter={timeFilter}>
            <LoanRequestChart data={businessSizeData} colors={colors} />
          </IntelligenceCard>

          <IntelligenceCard title="Loan Default Distribution By Business Size" timeFilter={timeFilter}>
            <DefaultDistributionChart data={businessSizeDefaultData} colors={colors} />
          </IntelligenceCard>

          <IntelligenceCard title="Loan Terms by Business Size" timeFilter={timeFilter}>
            <LoanTermsChart data={businessSizeTermsData} colors={colors} />
          </IntelligenceCard>

          <IntelligenceCard title="Loan Approval And Rejection Rates" timeFilter={timeFilter}>
            <ApprovalRejectionChart data={loanApprovalData} colors={colors} />
          </IntelligenceCard>
        </div>
      </div>
    </div>
  );
};

export default BusinessSizeAnalytics;
