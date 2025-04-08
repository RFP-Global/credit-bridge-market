import { useState } from "react";
import { ChevronDown, Settings, Filter, Download, Globe, Store, Briefcase, Map, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BusinessSizeAnalytics from "@/components/intelligence/BusinessSizeAnalytics";
import IndustryTypeAnalytics from "@/components/intelligence/IndustryTypeAnalytics";
import BusinessStructureAnalytics from "@/components/intelligence/BusinessStructureAnalytics";
import GeographyAnalytics from "@/components/intelligence/GeographyAnalytics";
import FullscreenButton from "@/components/FullscreenButton";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

export const CHART_COLORS = {
  workingCapital: "#33bbef",
  expansion: "#0284c7",
  equipment: "#0ea5e9",
  other: "#38bdf8",
  approved: "#0ea5e9",
  rejected: "#0369a1",
  pending: "#7dd3fc",
  small: "#38bdf8",
  medium: "#0ea5e9",
  large: "#0284c7",
  retail: "#7dd3fc",
  tech: "#38bdf8",
  construction: "#0ea5e9",
  manufacturing: "#0284c7",
  healthcare: "#0369a1",
  llc: "#38bdf8",
  corporate: "#0ea5e9",
  partnership: "#0284c7"
};

const Intelligence = () => {
  const [activeTab, setActiveTab] = useState("business");
  const [timeFilter, setTimeFilter] = useState("last-year");
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the previous page from location state
  const previousPage = location.state?.from;
  
  // Default fallback destination
  const defaultDestination = "/";
  
  // Determine the appropriate back button text based on the previous page
  let backButtonText = "Back to Home";
  
  if (previousPage) {
    if (previousPage.includes('lender-dashboard')) {
      backButtonText = "Back to Lender Dashboard";
    } else if (previousPage.includes('enterprise-dashboard')) {
      backButtonText = "Back to Enterprise Dashboard";
    } else if (previousPage.includes('marketplace')) {
      backButtonText = "Back to Marketplace";
    } else if (previousPage.includes('underwriting')) {
      backButtonText = "Back to Underwriting";
    } else if (previousPage.includes('transaction-archive')) {
      backButtonText = "Back to Transaction Archive";
    }
  }

  const handleBackNavigation = () => {
    // Check if we have a valid 'from' path in location state
    if (previousPage) {
      navigate(previousPage);
    } else {
      // Default fallback
      navigate(defaultDestination);
    }
  };

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

  const industryLoanRequestData = [
    { name: 'Manufacturing', size: 350 },
    { name: 'Construction', size: 300 },
    { name: 'Technology', size: 280 },
    { name: 'Retail', size: 220 },
    { name: 'Healthcare', size: 180 },
    { name: 'Financial Services', size: 150 },
    { name: 'Hospitality', size: 120 }
  ];

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
      
      <div className="container mx-auto px-4 py-8 mt-24">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-gray-400" />
            <h1 className="text-2xl font-mono text-gray-200">Analytics</h1>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-none font-mono border-primary/30 text-xs"
            onClick={handleBackNavigation}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {backButtonText}
          </Button>
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
