
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessSizeAnalytics from "@/components/intelligence/BusinessSizeAnalytics";
import IndustryTypeAnalytics from "@/components/intelligence/IndustryTypeAnalytics";
import BusinessStructureAnalytics from "@/components/intelligence/BusinessStructureAnalytics";
import GeographyAnalytics from "@/components/intelligence/GeographyAnalytics";
import FullscreenButton from "@/components/FullscreenButton";
import IntelligenceHeader from "@/components/intelligence/IntelligenceHeader";
import { useLocation } from "react-router-dom";
import { CHART_COLORS } from "@/constants/chartColors";
import Navbar from "@/components/Navbar";
import {
  businessSizeData,
  businessSizeDefaultData,
  loanApprovalData,
  businessSizeTermsData,
  industryStackedData,
  industryDefaultRateData,
  industryPieData,
  industryTermsData,
  industryLoanRequestData,
  structureData,
  structureTermsData,
  structureApprovalData
} from "@/data/intelligenceData";

const Intelligence = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [timeFilter, setTimeFilter] = useState("last-year");
  const location = useLocation();
  
  // Get the previous page from location state
  const previousPage = location.state?.from;

  return (
    <div className="min-h-screen bg-black text-gray-300 overflow-x-hidden">
      <Navbar />
      <FullscreenButton />
      
      <div className="container mx-auto px-4 py-8 mt-24">
        <IntelligenceHeader previousPage={previousPage} />

        <Tabs defaultValue="business" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className="bg-gray-900 rounded-sm p-2 mb-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h2 className="text-sm font-mono text-gray-300">Business Demographic Analytics</h2>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                Customize
              </div>
            </div>
            
            <BusinessSizeAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              businessSizeData={businessSizeData}
              businessSizeDefaultData={businessSizeDefaultData}
              businessSizeTermsData={businessSizeTermsData}
              loanApprovalData={loanApprovalData}
              colors={CHART_COLORS}
            />

            <IndustryTypeAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              industryStackedData={industryStackedData}
              industryDefaultRateData={industryDefaultRateData}
              industryTermsData={industryTermsData}
              industryPieData={industryPieData}
              industryLoanRequestData={industryLoanRequestData}
              colors={CHART_COLORS}
            />

            <BusinessStructureAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              structureData={structureData}
              structureTermsData={structureTermsData}
              structureApprovalData={structureApprovalData}
              colors={CHART_COLORS}
            />

            <GeographyAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Intelligence;
