import { useState } from "react";
import Navbar from "@/components/Navbar";
import { ChevronDown, Settings, Filter, Download, Globe, Store, Briefcase, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessSizeAnalytics from "@/components/intelligence/BusinessSizeAnalytics";
import IndustryTypeAnalytics from "@/components/intelligence/IndustryTypeAnalytics";
import BusinessStructureAnalytics from "@/components/intelligence/BusinessStructureAnalytics";
import GeographyAnalytics from "@/components/intelligence/GeographyAnalytics";
import FullscreenButton from "@/components/FullscreenButton";

// Updated chart colors to match homepage UX
export const CHART_COLORS = {
  // Primary colors
  workingCapital: "#33bbef", // Blue
  expansion: "#10b981",      // Green
  equipment: "#8B5CF6",      // Purple
  other: "#F97316",          // Orange
  
  // Status colors
  approved: "#10b981",       // Green
  rejected: "#F97316",       // Orange
  pending: "#fbd024",        // Yellow
  
  // Business size colors
  small: "#33bbef",          // Blue
  medium: "#10b981",         // Green
  large: "#F97316",          // Orange
  
  // Industry colors
  retail: "#fbd024",         // Yellow
  tech: "#33bbef",           // Blue
  construction: "#F97316",   // Orange
  manufacturing: "#10b981",  // Green
  healthcare: "#8B5CF6",     // Purple
  
  // Structure colors
  llc: "#33bbef",            // Blue
  corporate: "#10b981",      // Green
  partnership: "#F97316"     // Orange
};

const Intelligence = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [timeFilter, setTimeFilter] = useState("last-year");

  // Mock data for business size analytics
  const businessSizeData = [
    { name: 'Small', workingCapital: 40, expansion: 70, equipment: 30, rate: 5.2 },
    { name: 'Medium', workingCapital: 100, expansion: 40, equipment: 55, rate: 4.8 },
    { name: 'Large', workingCapital: 60, expansion: 180, equipment: 150, rate: 3.5 }
  ];

  const businessSizeDefaultData = [
    { name: 'Small Business', value: 45.5 },
    { name: 'Medium Business', value: 32.5 },
    { name: 'Large Business', value: 22.0 }
  ];

  const loanApprovalData = [
    { category: 'Small', approved: 60, rejected: 40 },
    { category: 'Medium', approved: 70, rejected: 30 },
    { category: 'Large', approved: 80, rejected: 20 }
  ];

  const businessSizeTermsData = [
    { month: 'Jan', small: 20, medium: 15, large: 12 },
    { month: 'Feb', small: 18, medium: 22, large: 16 },
    { month: 'Mar', small: 25, medium: 18, large: 20 },
    { month: 'Apr', small: 30, medium: 15, large: 25 },
    { month: 'May', small: 22, medium: 25, large: 18 },
    { month: 'Jun', small: 15, medium: 30, large: 22 }
  ];

  // Mock data for industry analytics
  const industryStackedData = [
    { 
      name: 'Manufacturing', 
      workingCapital: 150, 
      expansion: 200, 
      equipment: 350, 
      other: 100 
    },
    { 
      name: 'Construction', 
      workingCapital: 200, 
      expansion: 250, 
      equipment: 300, 
      other: 120 
    },
    { 
      name: 'Technology', 
      workingCapital: 300, 
      expansion: 350, 
      equipment: 200, 
      other: 150 
    },
    { 
      name: 'Retail', 
      workingCapital: 250, 
      expansion: 150, 
      equipment: 180, 
      other: 200 
    },
    { 
      name: 'Healthcare', 
      workingCapital: 180, 
      expansion: 220, 
      equipment: 150, 
      other: 120 
    }
  ];

  const industryDefaultRateData = [
    { name: 'Retail', value: 2.5 },
    { name: 'Tech', value: 10.5 },
    { name: 'Construction', value: 7.5 },
    { name: 'Healthcare', value: 3.0 },
    { name: 'Manufacturing', value: 1.5 }
  ];

  const industryPieData = [
    { name: 'Manufacturing', value: 22 },
    { name: 'Construction', value: 26 },
    { name: 'Tech', value: 20 },
    { name: 'Retail', value: 20 },
    { name: 'Healthcare', value: 12 }
  ];

  const industryTermsData = [
    { month: 'Jan', retail: 15, tech: 25, construction: 20, healthcare: 18, manufacturing: 22 },
    { month: 'Feb', retail: 18, tech: 22, construction: 25, healthcare: 20, manufacturing: 24 },
    { month: 'Mar', retail: 20, tech: 18, construction: 22, healthcare: 25, manufacturing: 28 },
    { month: 'Apr', retail: 25, tech: 15, construction: 18, healthcare: 22, manufacturing: 30 },
    { month: 'May', retail: 22, tech: 20, construction: 15, healthcare: 18, manufacturing: 35 },
    { month: 'Jun', retail: 18, tech: 25, construction: 20, healthcare: 22, manufacturing: 42 }
  ];

  // Mock data for business structure analytics
  const structureData = [
    { type: 'LLC', workingCapital: 60, expansion: 90, equipment: 30, rate: 7.5 },
    { type: 'Corporate', workingCapital: 80, expansion: 70, equipment: 85, rate: 5.5 },
    { type: 'Partnership', workingCapital: 40, expansion: 60, equipment: 75, rate: 9.5 }
  ];

  const structureTermsData = [
    { month: 'Jan', llc: 15, corporate: 25, partnership: 20 },
    { month: 'Feb', llc: 20, corporate: 22, partnership: 25 },
    { month: 'Mar', llc: 30, corporate: 18, partnership: 22 },
    { month: 'Apr', llc: 25, corporate: 25, partnership: 18 },
    { month: 'May', llc: 20, corporate: 42, partnership: 25 },
    { month: 'Jun', llc: 30, corporate: 35, partnership: 28 }
  ];

  const structureApprovalData = [
    { type: 'LLC', approved: 65, rejected: 35 },
    { type: 'Corporate', approved: 45, rejected: 55 },
    { type: 'Partnership', approved: 75, rejected: 25 }
  ];

  return (
    <div className="min-h-screen bg-black text-gray-300 overflow-x-hidden">
      <Navbar />
      <FullscreenButton />
      
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-gray-400" />
            <h1 className="text-2xl font-mono text-gray-200">Analytice</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center h-8 bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 font-mono text-xs"
            >
              <Filter className="h-3.5 w-3.5 mr-2" />
              Filters
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center h-8 bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 font-mono text-xs"
            >
              <Download className="h-3.5 w-3.5 mr-2" />
              Export
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center h-8 bg-gray-900 border-gray-700 text-gray-300 hover:bg-gray-800 font-mono text-xs"
            >
              <Settings className="h-3.5 w-3.5 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Tabs defaultValue="business" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className="bg-gray-900 rounded-sm p-2 mb-6 border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4 text-gray-400" />
                <h2 className="text-sm font-mono text-gray-300">Business Demographic Analytics</h2>
                <ChevronDown className="h-4 w-4 text-gray-500" />
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
