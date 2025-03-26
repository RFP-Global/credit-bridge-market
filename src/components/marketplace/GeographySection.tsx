
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GeoMap from "@/components/GeoMap";

interface GeographySectionProps {
  timeFilter: string;
  setTimeFilter: (filter: string) => void;
}

const GeographySection: React.FC<GeographySectionProps> = ({
  timeFilter,
  setTimeFilter
}) => {
  return (
    <Card className="bg-black/20 border-gray-800 shadow-lg">
      <CardHeader className="p-3 border-b border-gray-800 bg-black/40 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-cyan-400 flex items-center">
          Geography
          <ChevronDown className="ml-2 h-4 w-4" />
        </CardTitle>
        <div className="flex space-x-2 text-xs text-gray-400">
          <span className="border-b border-cyan-400 px-1">Last Year</span>
          <span className="px-1">6 Months</span>
          <span className="px-1">Last Month</span>
          <span className="px-1">Last Week</span>
          <span className="px-1">Today</span>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <Card className="bg-black/30 border-gray-800 shadow-lg">
          <CardHeader className="p-3 border-b border-gray-800 bg-black/40">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-cyan-400">Loan Demand by Region</CardTitle>
              <Select defaultValue="last-year" onValueChange={setTimeFilter}>
                <SelectTrigger className="h-8 w-[120px] text-xs bg-black/60 border-gray-700 text-gray-300">
                  <SelectValue placeholder="Last Year" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 border-gray-700 text-gray-300">
                  <SelectItem value="last-day">Last Day</SelectItem>
                  <SelectItem value="last-week">Last Week</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="last-year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <GeoMap timeFilter={timeFilter} />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default GeographySection;
