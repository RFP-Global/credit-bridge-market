
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Scale, TrendingUp, HelpCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FinancialRatios {
  currentRatio: number;
  quickRatio: number;
  workingCapitalTurnover: number;
  debtServiceCoverageRatio: number;
  debtToEquityRatio: number;
  grossMargin: number;
  operatingMargin: number;
  netProfitMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  assetTurnover: number;
  inventoryTurnover: number;
}

interface FinancialsTabProps {
  financialRatios: FinancialRatios;
}

const FinancialsTab: React.FC<FinancialsTabProps> = ({ financialRatios }) => {
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
                    <p className="font-semibold">{financialRatios.currentRatio.toFixed(2)}</p>
                    <CustomBadge variant={financialRatios.currentRatio >= 1.5 ? "success" : 
                      financialRatios.currentRatio >= 1 ? "warning" : "destructive"} 
                      className="text-xs">
                      {financialRatios.currentRatio >= 1.5 ? "STRONG" : 
                        financialRatios.currentRatio >= 1 ? "ADEQUATE" : "WEAK"}
                    </CustomBadge>
                  </div>
                  <Progress value={financialRatios.currentRatio * 33.3} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">QUICK RATIO</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{financialRatios.quickRatio.toFixed(2)}</p>
                    <CustomBadge variant={financialRatios.quickRatio >= 1 ? "success" : 
                      financialRatios.quickRatio >= 0.7 ? "warning" : "destructive"} 
                      className="text-xs">
                      {financialRatios.quickRatio >= 1 ? "STRONG" : 
                        financialRatios.quickRatio >= 0.7 ? "ADEQUATE" : "WEAK"}
                    </CustomBadge>
                  </div>
                  <Progress value={financialRatios.quickRatio * 50} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">WORKING CAPITAL TURNOVER</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{financialRatios.workingCapitalTurnover.toFixed(2)}</p>
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">DEBT SERVICE COVERAGE RATIO</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{financialRatios.debtServiceCoverageRatio.toFixed(2)}x</p>
                    <CustomBadge variant={financialRatios.debtServiceCoverageRatio >= 1.25 ? "success" : 
                      financialRatios.debtServiceCoverageRatio >= 1 ? "warning" : "destructive"} 
                      className="text-xs">
                      {financialRatios.debtServiceCoverageRatio >= 1.25 ? "STRONG" : 
                        financialRatios.debtServiceCoverageRatio >= 1 ? "ADEQUATE" : "WEAK"}
                    </CustomBadge>
                  </div>
                  <Progress value={financialRatios.debtServiceCoverageRatio * 40} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">DEBT TO EQUITY RATIO</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{financialRatios.debtToEquityRatio.toFixed(2)}</p>
                    <CustomBadge variant={financialRatios.debtToEquityRatio <= 0.5 ? "success" : 
                      financialRatios.debtToEquityRatio <= 1 ? "warning" : "destructive"} 
                      className="text-xs">
                      {financialRatios.debtToEquityRatio <= 0.5 ? "LOW RISK" : 
                        financialRatios.debtToEquityRatio <= 1 ? "MODERATE" : "HIGH RISK"}
                    </CustomBadge>
                  </div>
                  <Progress value={(1 - financialRatios.debtToEquityRatio/2) * 100} className="h-1 mt-1 bg-gray-800" />
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
                  <p className="font-semibold">{(financialRatios.grossMargin * 100).toFixed(1)}%</p>
                  <Progress value={financialRatios.grossMargin * 100} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">OPERATING MARGIN</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{(financialRatios.operatingMargin * 100).toFixed(1)}%</p>
                  <Progress value={financialRatios.operatingMargin * 100 * 2} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">NET PROFIT MARGIN</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{(financialRatios.netProfitMargin * 100).toFixed(1)}%</p>
                  <Progress value={financialRatios.netProfitMargin * 100 * 3} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">RETURN ON ASSETS (ROA)</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{(financialRatios.returnOnAssets * 100).toFixed(1)}%</p>
                  <Progress value={financialRatios.returnOnAssets * 100 * 5} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">RETURN ON EQUITY (ROE)</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{(financialRatios.returnOnEquity * 100).toFixed(1)}%</p>
                  <Progress value={financialRatios.returnOnEquity * 100 * 3} className="h-1 mt-1 bg-gray-800" />
                </div>
                
                <Separator className="bg-gray-800" />
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">ASSET TURNOVER</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{financialRatios.assetTurnover.toFixed(2)}</p>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs text-gray-400">INVENTORY TURNOVER</p>
                    <HelpCircle className="h-3 w-3 text-gray-400" />
                  </div>
                  <p className="font-semibold">{financialRatios.inventoryTurnover.toFixed(2)}</p>
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
