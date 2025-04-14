
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Scale, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { FinancialRatios } from "@/types/proposalDetails";

interface LiquidityRatiosProps {
  ratios: Partial<FinancialRatios>;
}

export const LiquidityRatios: React.FC<LiquidityRatiosProps> = ({ ratios }) => {
  return (
    <Card className="bg-black border-gray-800">
      <CardHeader className="border-b border-gray-800">
        <CardTitle className="text-sm font-mono flex items-center">
          <Scale className="mr-2 h-4 w-4" />
          LIQUIDITY RATIOS
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ScrollArea className="h-[350px] pr-4">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-gray-400">CURRENT RATIO</p>
                <HelpCircle className="h-3 w-3 text-gray-400" />
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">{ratios.currentRatio?.toFixed(2) || "N/A"}</p>
                <CustomBadge 
                  variant={ratios.currentRatio && ratios.currentRatio >= 1.75 ? "success" : 
                    ratios.currentRatio && ratios.currentRatio >= 1.25 ? "warning" : "destructive"} 
                  className="text-xs"
                >
                  {ratios.currentRatio && ratios.currentRatio >= 1.75 ? "STRONG" : 
                    ratios.currentRatio && ratios.currentRatio >= 1.25 ? "ADEQUATE" : "WEAK"}
                </CustomBadge>
              </div>
              <Progress value={(ratios.currentRatio || 0) * 33.3} className="h-1 mt-1 bg-gray-800" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-gray-400">QUICK RATIO</p>
                <HelpCircle className="h-3 w-3 text-gray-400" />
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">{ratios.quickRatio?.toFixed(2) || "N/A"}</p>
                <CustomBadge 
                  variant={ratios.quickRatio && ratios.quickRatio >= 1 ? "success" : 
                    ratios.quickRatio && ratios.quickRatio >= 0.7 ? "warning" : "destructive"} 
                  className="text-xs"
                >
                  {ratios.quickRatio && ratios.quickRatio >= 1 ? "STRONG" : 
                    ratios.quickRatio && ratios.quickRatio >= 0.7 ? "ADEQUATE" : "WEAK"}
                </CustomBadge>
              </div>
              <Progress value={(ratios.quickRatio || 0) * 50} className="h-1 mt-1 bg-gray-800" />
            </div>

            <Separator className="bg-gray-800" />
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-gray-400">DEBT SERVICE COVERAGE RATIO</p>
                <HelpCircle className="h-3 w-3 text-gray-400" />
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">{ratios.debtServiceCoverageRatio?.toFixed(2) || "N/A"}x</p>
                <CustomBadge 
                  variant={ratios.debtServiceCoverageRatio && ratios.debtServiceCoverageRatio >= 1.25 ? "success" : 
                    ratios.debtServiceCoverageRatio && ratios.debtServiceCoverageRatio >= 1 ? "warning" : "destructive"} 
                  className="text-xs"
                >
                  {ratios.debtServiceCoverageRatio && ratios.debtServiceCoverageRatio >= 1.25 ? "STRONG" : 
                    ratios.debtServiceCoverageRatio && ratios.debtServiceCoverageRatio >= 1 ? "ADEQUATE" : "WEAK"}
                </CustomBadge>
              </div>
              <Progress value={(ratios.debtServiceCoverageRatio || 0) * 40} className="h-1 mt-1 bg-gray-800" />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-gray-400">DEBT TO EBITDA</p>
                <HelpCircle className="h-3 w-3 text-gray-400" />
              </div>
              <div className="flex justify-between items-center">
                <p className="font-semibold">{ratios.debtToEBITDA?.toFixed(2) || "N/A"}</p>
                <CustomBadge 
                  variant={ratios.debtToEBITDA && ratios.debtToEBITDA <= 3 ? "success" : 
                    ratios.debtToEBITDA && ratios.debtToEBITDA <= 5 ? "warning" : "destructive"} 
                  className="text-xs"
                >
                  {ratios.debtToEBITDA && ratios.debtToEBITDA <= 3 ? "STRONG" : 
                    ratios.debtToEBITDA && ratios.debtToEBITDA <= 5 ? "ADEQUATE" : "WEAK"}
                </CustomBadge>
              </div>
              <Progress value={(1 - (ratios.debtToEBITDA || 0)/10) * 100} className="h-1 mt-1 bg-gray-800" />
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
