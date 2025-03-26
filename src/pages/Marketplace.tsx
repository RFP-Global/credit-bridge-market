
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, Settings, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import BusinessSizeSection from "@/components/marketplace/BusinessSizeSection";
import IndustryTypeSection from "@/components/marketplace/IndustryTypeSection";
import BusinessStructureSection from "@/components/marketplace/BusinessStructureSection";
import GeographySection from "@/components/marketplace/GeographySection";
import {
  businessSizeData,
  pieBusinessSizeData,
  industryData,
  industryPieData,
  industryStackedData,
  timeSeriesData,
  loanRequestData,
  loanApprovalData,
  structureData,
  structureLoanTermData,
  industryLoanTermData
} from "@/data/marketplaceData";

const Intelligence = () => {
  const [timeFilter, setTimeFilter] = useState("last-year");
  const [chartType, setChartType] = useState("bar");
  const [businessSize, setBusinessSize] = useState("all");
  const [industry, setIndustry] = useState("all");

  return (
    <div className="min-h-screen bg-black text-gray-200 overflow-x-hidden">
      <Navbar />
      <div className="container mx-auto px-2 py-6 mt-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-cyan-400">Analytic Intelligence</h1>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="flex items-center h-8 bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              <Filter className="h-3.5 w-3.5 mr-1.5" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center h-8 bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center h-8 bg-black/60 border-gray-700 text-gray-300 hover:bg-gray-800">
              <Settings className="h-3.5 w-3.5 mr-1.5" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="business" className="w-full">
          <TabsList className="mb-4 bg-black/40 border border-gray-800">
            <TabsTrigger 
              value="business" 
              className="data-[state=active]:bg-gray-800 data-[state=active]:text-cyan-400"
            >
              Business Demographic Analytics
            </TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            {/* Business Size Analytics */}
            <BusinessSizeSection 
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              loanRequestData={loanRequestData}
              pieBusinessSizeData={pieBusinessSizeData}
              timeSeriesData={timeSeriesData}
              loanApprovalData={loanApprovalData}
            />

            {/* Industry Type Analytics */}
            <IndustryTypeSection 
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              industryStackedData={industryStackedData}
              industryData={industryData}
              industryLoanTermData={industryLoanTermData}
              industryPieData={industryPieData}
            />

            {/* Business Structure Analytics */}
            <BusinessStructureSection 
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
              structureData={structureData}
              structureLoanTermData={structureLoanTermData}
            />

            {/* Geographic Analytics */}
            <GeographySection 
              timeFilter={timeFilter}
              setTimeFilter={setTimeFilter}
            />
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Intelligence;
