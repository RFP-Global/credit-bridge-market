
import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { TimeFilterRow } from "@/components/intelligence/TimeFilterRow";
import { IntelligenceCard } from "@/components/intelligence/IntelligenceCard";
import GeoMap from "@/components/GeoMap";

interface GeographyAnalyticsProps {
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
}

const GeographyAnalytics = ({ 
  timeFilter, 
  onTimeFilterChange
}: GeographyAnalyticsProps) => {
  const [expanded, setExpanded] = useState(true);

  if (!expanded) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded mb-3 p-2">
        <div 
          className="flex items-center justify-between cursor-pointer" 
          onClick={() => setExpanded(true)}
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-cyan-500" />
            <h3 className="text-sm font-mono text-gray-300">Geography</h3>
          </div>
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
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-cyan-500" />
          <h3 className="text-sm font-mono text-gray-300">Geography</h3>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-500 transform rotate-180" />
      </div>
      
      <div className="p-3">
        <TimeFilterRow activeFilter={timeFilter} onFilterChange={onTimeFilterChange} />
        
        <div className="mt-2">
          <IntelligenceCard title="Loan Demand by Region" timeFilter={timeFilter}>
            <div className="relative w-full h-[400px]">
              <GeoMap timeFilter={timeFilter} />
            </div>
          </IntelligenceCard>
        </div>
      </div>
    </div>
  );
};

export default GeographyAnalytics;
