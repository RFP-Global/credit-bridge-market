
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Scale, TrendingUp, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FinancialRatios as FinancialRatiosType } from "@/types/proposalDetails";

// Define a local interface that extends the official FinancialRatios with additional properties
// This lets us maintain backward compatibility for the UI
interface ExtendedFinancialRatios extends Partial<FinancialRatiosType> {
  debtToEquityRatio?: number;
  grossMargin?: number;
  operatingMargin?: number;
  netProfitMargin?: number;
  returnOnAssets?: number;
  returnOnEquity?: number;
  assetTurnover?: number;
  inventoryTurnover?: number;
  workingCapitalTurnover?: number;
}

interface FinancialsTabProps {
  financialRatios: ExtendedFinancialRatios;
}

const FinancialsTab: React.FC<FinancialsTabProps> = ({ financialRatios }) => {
  // Default values for any ratios that might be missing
  const defaultRatios = {
    debtToEquityRatio: 0.5,
    grossMargin: 0.35,
    operatingMargin: 0.15,
    netProfitMargin: 0.1,
    returnOnAssets: 0.08,
    returnOnEquity: 0.15,
    assetTurnover: 1.2,
    inventoryTurnover: 6.0,
    workingCapitalTurnover: 4.0
  };

  // Merge provided ratios with defaults
  const ratios = { ...defaultRatios, ...financialRatios };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <CustomBadge variant={ratios.currentRatio && ratios.currentRatio >= 1.5 ? "success" : 
                      ratios.currentRatio && ratios.currentRatio >= 1 ? "warning" : "destructive"} 
                      className="text-xs">
                      {ratios.currentRatio && ratios.currentRatio >= 1.5 ? "STRONG" : 
                        ratios.currentRatio && ratios.currentRatio >= 1 ? "ADEQUATE" : "WEAK"}
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
                    <CustomBadge variant={ratios.quickRatio && ratios.quickRatio >= 1 ? "success" : 
                      ratios.quickRatio && ratios.quickRatio >= 0.7 ? "warning" : "destructive"} 
                      className="text-xs">
                      {ratios.quickRatio && ratios.quickRatio >= 1 ? "STRONG" : 
                        ratios.quickRatio && ratios.quickRatio >= 0.7 ? "ADEQUATE" : "WEAK"}
                    </CustomBadge>
                  </div>
                  <Progress value={(ratios.quickRatio || 0) * 50} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">WORKING CAPITAL TURNOVER</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{ratios.workingCapitalTurnover?.toFixed(2) || "N/A"}</p>
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">DEBT SERVICE COVERAGE RATIO</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{ratios.debtServiceCoverageRatio?.toFixed(2) || "N/A"}x</p>
                    <CustomBadge variant={ratios.debtServiceCoverageRatio && ratios.debtServiceCoverageRatio >= 1.25 ? "success" : 
                      ratios.debtServiceCoverageRatio && ratios.debtServiceCoverageRatio >= 1 ? "warning" : "destructive"} 
                      className="text-xs">
                      {ratios.debtServiceCoverageRatio && ratios.debtServiceCoverageRatio >= 1.25 ? "STRONG" : 
                        ratios.debtServiceCoverageRatio && ratios.debtServiceCoverageRatio >= 1 ? "ADEQUATE" : "WEAK"}
                    </CustomBadge>
                  </div>
                  <Progress value={(ratios.debtServiceCoverageRatio || 0) * 40} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">DEBT TO EQUITY RATIO</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{ratios.debtToEquityRatio?.toFixed(2) || "N/A"}</p>
                    <CustomBadge variant={ratios.debtToEquityRatio && ratios.debtToEquityRatio <= 0.5 ? "success" : 
                      ratios.debtToEquityRatio && ratios.debtToEquityRatio <= 1 ? "warning" : "destructive"} 
                      className="text-xs">
                      {ratios.debtToEquityRatio && ratios.debtToEquityRatio <= 0.5 ? "LOW RISK" : 
                        ratios.debtToEquityRatio && ratios.debtToEquityRatio <= 1 ? "MODERATE" : "HIGH RISK"}
                    </CustomBadge>
                  </div>
                  <Progress value={(1 - (ratios.debtToEquityRatio || 0)/2) * 100} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">DEBT TO EBITDA</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{ratios.debtToEBITDA?.toFixed(2) || "N/A"}</p>
                    <CustomBadge variant={ratios.debtToEBITDA && ratios.debtToEBITDA <= 3 ? "success" : 
                      ratios.debtToEBITDA && ratios.debtToEBITDA <= 5 ? "warning" : "destructive"} 
                      className="text-xs">
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
        
        <Card className="bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              PROFITABILITY RATIOS
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ScrollArea className="h-[350px] pr-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">GROSS MARGIN</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{((ratios.grossMargin || 0) * 100).toFixed(1)}%</p>
                  <Progress value={(ratios.grossMargin || 0) * 100} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">OPERATING MARGIN</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{((ratios.operatingMargin || 0) * 100).toFixed(1)}%</p>
                  <Progress value={(ratios.operatingMargin || 0) * 100 * 2} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">NET PROFIT MARGIN</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{((ratios.netProfitMargin || 0) * 100).toFixed(1)}%</p>
                  <Progress value={(ratios.netProfitMargin || 0) * 100 * 3} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">RETURN ON ASSETS (ROA)</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{((ratios.returnOnAssets || 0) * 100).toFixed(1)}%</p>
                  <Progress value={(ratios.returnOnAssets || 0) * 100 * 5} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">RETURN ON EQUITY (ROE)</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{((ratios.returnOnEquity || 0) * 100).toFixed(1)}%</p>
                  <Progress value={(ratios.returnOnEquity || 0) * 100 * 3} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">ASSET TURNOVER</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{ratios.assetTurnover?.toFixed(2) || "N/A"}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">INVENTORY TURNOVER</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{ratios.inventoryTurnover?.toFixed(2) || "N/A"}</p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialsTab;
