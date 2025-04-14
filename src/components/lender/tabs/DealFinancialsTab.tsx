
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TrendingUp, BarChart } from "lucide-react";
import { FinancialRatios } from "@/types/proposalDetails";

interface DealFinancialsTabProps {
  dealData: any;
}

const DealFinancialsTab: React.FC<DealFinancialsTabProps> = ({ dealData }) => {
  // Mock financial ratios for the deal
  const financialRatios: FinancialRatios & {
    debtToEquityRatio: number;
    grossMargin: number;
  } = {
    debtServiceCoverageRatio: 1.35,
    currentRatio: 1.8,
    quickRatio: 1.2,
    debtToEBITDA: 0.65,
    operatingCashFlowRatio: 1.25,
    leverageRatio: 0.42,
    netProfitMargin: 0.08,
    grossProfitMargin: 0.38,
    operatingMargin: 0.12,
    returnOnAssets: 0.09,
    returnOnEquity: 0.14,
    assetTurnover: 1.4,
    inventoryTurnover: 6.8,
    debtToEquity: 0.65,
    equityRatio: 0.58,
    // Additional ratios for display purposes
    debtToEquityRatio: 0.65,
    grossMargin: 0.38
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <TrendingUp className="mr-2 h-4 w-4" />
              FINANCIAL RATIOS
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">DEBT SERVICE COVERAGE</p>
                <p className="font-semibold">{financialRatios.debtServiceCoverageRatio.toFixed(2)}x</p>
                <p className="text-xs text-gray-400 mt-1">
                  {financialRatios.debtServiceCoverageRatio > 1.25 ? "Strong" : 
                   financialRatios.debtServiceCoverageRatio > 1 ? "Adequate" : "Weak"}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">CURRENT RATIO</p>
                <p className="font-semibold">{financialRatios.currentRatio.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {financialRatios.currentRatio > 1.5 ? "Strong" : 
                   financialRatios.currentRatio > 1 ? "Adequate" : "Weak"}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">QUICK RATIO</p>
                <p className="font-semibold">{financialRatios.quickRatio.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {financialRatios.quickRatio > 1 ? "Strong" : "Weak"}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">DEBT TO EQUITY</p>
                <p className="font-semibold">{financialRatios.debtToEquityRatio.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {financialRatios.debtToEquityRatio < 0.5 ? "Low leverage" : 
                   financialRatios.debtToEquityRatio < 1 ? "Moderate leverage" : "High leverage"}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">DEBT TO EBITDA</p>
                <p className="font-semibold">{financialRatios.debtToEBITDA.toFixed(2)}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {financialRatios.debtToEBITDA < 3 ? "Strong" : 
                   financialRatios.debtToEBITDA < 5 ? "Moderate" : "High"}
                </p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">RETURN ON ASSETS</p>
                <p className="font-semibold">{(financialRatios.returnOnAssets * 100).toFixed(1)}%</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">RETURN ON EQUITY</p>
                <p className="font-semibold">{(financialRatios.returnOnEquity * 100).toFixed(1)}%</p>
              </div>
            </div>
            
            <Separator className="my-6 bg-gray-800" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">GROSS MARGIN</p>
                <p className="font-semibold">{(financialRatios.grossMargin * 100).toFixed(1)}%</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">OPERATING MARGIN</p>
                <p className="font-semibold">{(financialRatios.operatingMargin * 100).toFixed(1)}%</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">NET PROFIT MARGIN</p>
                <p className="font-semibold">{(financialRatios.netProfitMargin * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <BarChart className="mr-2 h-4 w-4" />
              DEAL FINANCIALS
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">DEAL AMOUNT</p>
                <p className="font-semibold text-lg">{dealData.amount}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">ESTIMATED IRR</p>
                <p className="font-semibold">12.5%</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">TERM LENGTH</p>
                <p className="font-semibold">5 Years</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">INTEREST RATE</p>
                <p className="font-semibold">7.25%</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">COLLATERAL</p>
                <p className="font-semibold">Business Assets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DealFinancialsTab;
