
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Download, Settings, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import BusinessSizeAnalytics from "@/components/intelligence/BusinessSizeAnalytics";
import IndustryTypeAnalytics from "@/components/intelligence/IndustryTypeAnalytics";
import BusinessStructureAnalytics from "@/components/intelligence/BusinessStructureAnalytics";
import GeographyAnalytics from "@/components/intelligence/GeographyAnalytics";
import { COLORS } from "@/components/charts/ChartUtils";

// Mock data for the charts
const businessSizeData = [
  { name: 'Small Business', pending: 45, approved: 78, rejected: 23, rate: 0.32 },
  { name: 'Medium Business', approved: 65, pending: 32, rejected: 12, rate: 0.36 },
  { name: 'Large Business', approved: 88, pending: 45, rejected: 34, rate: 0.32 }
];

const pieBusinessSizeData = [
  { name: 'Small Business', value: 40 },
  { name: 'Medium Business', value: 25 },
  { name: 'Large Business', value: 35 }
];

const industryData = [
  { name: 'Manufacturing', value: 30, color: '#33bbef' },
  { name: 'Construction', value: 25, color: '#8B5CF6' },
  { name: 'Tech', value: 20, color: '#10b981' },
  { name: 'Retail', value: 15, color: '#F97316' },
  { name: 'Healthcare', value: 10, color: '#fbd024' }
];

const industryPieData = [
  { name: 'Manufacturing', value: 22 },
  { name: 'Construction', value: 28 },
  { name: 'Tech', value: 22 },
  { name: 'Retail', value: 18 },
  { name: 'Healthcare', value: 10 }
];

const industryStackedData = [
  { 
    name: 'Manufacturing', 
    workingCapital: 200, 
    expansion: 300, 
    equipment: 150, 
    other: 100 
  },
  { 
    name: 'Construction', 
    workingCapital: 150, 
    expansion: 250, 
    equipment: 200, 
    other: 180 
  },
  { 
    name: 'Tech', 
    workingCapital: 100, 
    expansion: 200, 
    equipment: 150, 
    other: 120 
  },
  { 
    name: 'Retail', 
    workingCapital: 120, 
    expansion: 180, 
    equipment: 90, 
    other: 60 
  },
  { 
    name: 'Healthcare', 
    workingCapital: 80, 
    expansion: 120, 
    equipment: 70, 
    other: 50 
  }
];

const timeSeriesData = [
  { month: 'Jan', small: 20, medium: 30, large: 45 },
  { month: 'Feb', small: 25, medium: 35, large: 50 },
  { month: 'Mar', small: 30, medium: 40, large: 55 },
  { month: 'Apr', small: 35, medium: 45, large: 60 },
  { month: 'May', small: 40, medium: 50, large: 65 },
  { month: 'Jun', small: 45, medium: 55, large: 40 }
];

const loanRequestData = [
  { name: 'Small', pending: 40, approved: 75, rejected: 20 },
  { name: 'Medium', pending: 35, approved: 60, rejected: 25 },
  { name: 'Large', pending: 55, approved: 80, rejected: 30 }
];

const loanApprovalData = [
  { category: 'Small Business', approved: 65, rejected: 35 },
  { category: 'Medium Business', approved: 78, rejected: 22 },
  { category: 'Large Business', approved: 85, rejected: 15 }
];

const structureData = [
  { type: 'LLC', workingCapital: 42, expansion: 35, equipment: 23, rate: 7.5 },
  { type: 'Corporate', workingCapital: 28, expansion: 45, equipment: 32, rate: 6.2 },
  { type: 'Partnership', workingCapital: 30, expansion: 25, equipment: 28, rate: 8.1 }
];

const structureLoanTermData = [
  { month: 'Jan', llc: 30, corporate: 45, partnership: 25 },
  { month: 'Feb', llc: 35, corporate: 50, partnership: 30 },
  { month: 'Mar', llc: 45, corporate: 40, partnership: 35 },
  { month: 'Apr', llc: 40, corporate: 35, partnership: 30 },
  { month: 'May', llc: 30, corporate: 30, partnership: 35 },
  { month: 'Jun', llc: 35, corporate: 25, partnership: 30 }
];

const industryLoanTermData = [
  { month: 'Jan', retail: 30, tech: 45, construction: 25, healthcare: 20, manufacturing: 35 },
  { month: 'Feb', retail: 35, tech: 50, construction: 30, healthcare: 25, manufacturing: 40 },
  { month: 'Mar', retail: 45, tech: 40, construction: 35, healthcare: 30, manufacturing: 35 },
  { month: 'Apr', retail: 40, tech: 35, construction: 45, healthcare: 20, manufacturing: 30 },
  { month: 'May', retail: 30, tech: 30, construction: 40, healthcare: 25, manufacturing: 35 },
  { month: 'Jun', retail: 35, tech: 25, construction: 30, healthcare: 40, manufacturing: 45 }
];

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
            <BusinessSizeAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              loanRequestData={loanRequestData}
              pieBusinessSizeData={pieBusinessSizeData}
              timeSeriesData={timeSeriesData}
              loanApprovalData={loanApprovalData}
            />

            {/* Industry Type Analytics */}
            <IndustryTypeAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              industryStackedData={industryStackedData}
              industryData={industryData}
              industryLoanTermData={industryLoanTermData}
              industryPieData={industryPieData}
            />

            {/* Business Structure Analytics */}
            <BusinessStructureAnalytics 
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              structureData={structureData}
              structureLoanTermData={structureLoanTermData}
            />

            {/* Geographic Analytics */}
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
