
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TimeFilterRow } from "@/components/intelligence/TimeFilterRow";
import { IntelligenceCard } from "@/components/intelligence/IntelligenceCard";

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
          <h3 className="text-sm font-mono text-gray-300">Geography</h3>
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
        <h3 className="text-sm font-mono text-gray-300">Geography</h3>
        <ChevronDown className="h-4 w-4 text-gray-500 transform rotate-180" />
      </div>
      
      <div className="p-3">
        <TimeFilterRow activeFilter={timeFilter} onFilterChange={onTimeFilterChange} />
        
        <div className="mt-2">
          <IntelligenceCard title="Loan Demand by Region" timeFilter={timeFilter}>
            <div className="relative w-full h-[300px] bg-gray-800 rounded border border-gray-700">
              <div className="absolute inset-0 opacity-50">
                {/* Map would go here - using a placeholder for now */}
                <img 
                  src="/lovable-uploads/899271ea-23cd-4d9a-a417-d86654a829ff.png" 
                  alt="US Map" 
                  className="w-full h-full object-cover opacity-40"
                />
              </div>
              
              {/* Sample heatmap points */}
              <div className="absolute h-6 w-6 rounded-full bg-green-500 blur-md opacity-70" style={{ top: '40%', left: '25%' }}></div>
              <div className="absolute h-8 w-8 rounded-full bg-green-400 blur-md opacity-70" style={{ top: '30%', left: '45%' }}></div>
              <div className="absolute h-7 w-7 rounded-full bg-green-500 blur-md opacity-70" style={{ top: '45%', left: '55%' }}></div>
              <div className="absolute h-5 w-5 rounded-full bg-green-500 blur-md opacity-70" style={{ top: '55%', left: '35%' }}></div>
              <div className="absolute h-8 w-8 rounded-full bg-green-400 blur-md opacity-70" style={{ top: '60%', left: '80%' }}></div>
              <div className="absolute h-9 w-9 rounded-full bg-green-400 blur-md opacity-70" style={{ top: '25%', left: '80%' }}></div>
              <div className="absolute h-6 w-6 rounded-full bg-green-500 blur-md opacity-70" style={{ top: '65%', left: '50%' }}></div>
              <div className="absolute h-8 w-8 rounded-full bg-green-400 blur-md opacity-70" style={{ top: '45%', left: '75%' }}></div>
            </div>
          </IntelligenceCard>
        </div>
      </div>
    </div>
  );
};

export default GeographyAnalytics;
