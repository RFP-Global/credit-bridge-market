
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CustomBadge } from "@/components/ui/custom-badge";
import { HelpCircle } from "lucide-react";
import { FinanceProposal } from "@/types/marketplace";
import { FinancialRatios } from "@/types/proposalDetails";

interface OverviewTabProps {
  proposal: FinanceProposal;
  demographics: {
    annualRevenue: string;
    totalAssets: string;
    totalLiabilities: string;
    netWorth: string;
  };
  financialRatios: Partial<FinancialRatios>;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ 
  proposal, 
  demographics, 
  financialRatios 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono">PROPOSAL SUMMARY</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">FACILITY TYPE</p>
                <p className="font-semibold">{proposal.facilityType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">FINANCING TYPE</p>
                <p className="font-semibold">{proposal.financingType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">PRINCIPAL</p>
                <p className="font-semibold">{proposal.principal}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">INTEREST RATE</p>
                <p className="font-semibold">{proposal.interestRate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">TERM</p>
                <p className="font-semibold">{proposal.term}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">BID DEADLINE</p>
                <p className="font-semibold">{proposal.bidDeadline}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">INDUSTRY</p>
                <p className="font-semibold">{proposal.industry}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">LENDER PREFERENCES</p>
                <p className="font-semibold">{proposal.lenderPreferences}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">CREDIT RATING</p>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">{proposal.creditRating.toFixed(1)}/10</span>
                  <HelpCircle className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>
            
            <Separator className="my-6 bg-gray-800" />
            
            <div>
              <p className="text-xs text-gray-400 mb-3">BIDDING PROGRESS</p>
              <div className="flex items-center mb-2">
                <Progress value={proposal.bidVolume} className="h-2 w-full bg-cyan-950/40 mr-4" />
                <span className="text-sm font-semibold">{proposal.bidVolume}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono">KEY FINANCIALS</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">ANNUAL REVENUE</p>
                <p className="font-semibold">{demographics.annualRevenue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">TOTAL ASSETS</p>
                <p className="font-semibold">{demographics.totalAssets}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">TOTAL LIABILITIES</p>
                <p className="font-semibold">{demographics.totalLiabilities}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">NET WORTH</p>
                <p className="font-semibold">{demographics.netWorth}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">DEBT SERVICE COVERAGE</p>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">
                    {financialRatios.debtServiceCoverageRatio?.toFixed(2) || "N/A"}x
                  </span>
                  <CustomBadge 
                    variant={
                      financialRatios.debtServiceCoverageRatio && 
                      financialRatios.debtServiceCoverageRatio > 1.25 ? "success" : 
                      financialRatios.debtServiceCoverageRatio && 
                      financialRatios.debtServiceCoverageRatio > 1 ? "warning" : "destructive"
                    } 
                    className="text-xs"
                  >
                    {
                      financialRatios.debtServiceCoverageRatio && 
                      financialRatios.debtServiceCoverageRatio > 1.25 ? "STRONG" : 
                      financialRatios.debtServiceCoverageRatio && 
                      financialRatios.debtServiceCoverageRatio > 1 ? "ADEQUATE" : "WEAK"
                    }
                  </CustomBadge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
