
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Building, Calendar, DollarSign } from "lucide-react";

interface DealHeaderProps {
  dealData: any;
  dealType: "active" | "closed" | "watchlist";
}

const DealHeader: React.FC<DealHeaderProps> = ({ dealData, dealType }) => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4 flex-grow">
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={`
                ${dealType === "active" ? "bg-white/10 text-white" : 
                  dealType === "closed" ? "bg-gray-500/20 text-gray-300" : 
                  "bg-gray-400/10 text-gray-400"}
                rounded-full px-3
              `}>
                {dealType === "active" ? "ACTIVE" : 
                 dealType === "closed" ? "CLOSED" : 
                 "WATCHLIST"}
              </Badge>
              <Badge variant="outline" className="font-mono">
                <Building className="mr-2 h-3 w-3" />
                {dealData.company}
              </Badge>
              {dealType === "active" && (
                <Badge variant="outline" className="font-mono">
                  <Calendar className="mr-2 h-3 w-3" />
                  DUE: {dealData.dueDate}
                </Badge>
              )}
              {dealType === "closed" && (
                <Badge variant="outline" className="font-mono">
                  <Calendar className="mr-2 h-3 w-3" />
                  CLOSED: {dealData.closeDate}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {dealData.name}
              </h1>
            </div>
            
            <p className="text-gray-400 mt-1">
              <span className="font-semibold">{dealData.company}</span>
              {dealType === "active" && (
                <>
                  <span className="ml-2">•</span> 
                  <span className="ml-2">Stage: {dealData.stage}</span>
                </>
              )}
              {dealType === "closed" && (
                <>
                  <span className="ml-2">•</span> 
                  <span className="ml-2">Result: {dealData.result}</span>
                </>
              )}
              {dealType === "watchlist" && (
                <>
                  <span className="ml-2">•</span> 
                  <span className="ml-2">Status: {dealData.status}</span>
                </>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end">
          <div className="flex items-center mb-2">
            <div className="text-xl font-bold mr-2">{dealData.amount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealHeader;
