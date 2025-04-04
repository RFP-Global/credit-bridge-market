
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CustomBadge } from "@/components/ui/custom-badge";
import { BarChart4, DollarSign } from "lucide-react";
import { FinanceProposal } from "@/types/marketplace";

interface CreditHistory {
  creditScore: number;
  paymentHistory: number;
  delinquencies: number;
  bankruptcies: number;
  taxLiens: number;
  judgments: number;
  outstandingDebt: string;
  utilizationRatio: number;
  previousLoans: number;
  defaultRate: number;
}

interface CreditProfileTabProps {
  proposal: FinanceProposal;
  creditHistory: CreditHistory;
}

const CreditProfileTab: React.FC<CreditProfileTabProps> = ({ proposal, creditHistory }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <BarChart4 className="mr-2 h-4 w-4" />
              CREDIT PROFILE
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">RFP CREDIT RATING</p>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">{proposal.creditRating.toFixed(1)}/10</span>
                      <CustomBadge variant={proposal.creditRating >= 7 ? "success" : 
                        proposal.creditRating >= 5 ? "warning" : "destructive"} 
                        className="text-xs">
                        {proposal.creditRating >= 7 ? "EXCELLENT" : 
                          proposal.creditRating >= 5 ? "MODERATE" : "HIGH RISK"}
                      </CustomBadge>
                    </div>
                    <Progress value={proposal.creditRating * 10} className="h-1 bg-gray-800" />
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">BUSINESS CREDIT SCORE</p>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">{creditHistory.creditScore.toFixed(0)}/1000</span>
                      <CustomBadge variant={creditHistory.creditScore >= 700 ? "success" : 
                        creditHistory.creditScore >= 600 ? "warning" : "destructive"} 
                        className="text-xs">
                        {creditHistory.creditScore >= 700 ? "EXCELLENT" : 
                          creditHistory.creditScore >= 600 ? "MODERATE" : "POOR"}
                      </CustomBadge>
                    </div>
                    <Progress value={creditHistory.creditScore / 10} className="h-1 bg-gray-800" />
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">PAYMENT HISTORY</p>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{creditHistory.paymentHistory}% On-Time</span>
                  <CustomBadge variant={creditHistory.paymentHistory >= 95 ? "success" : 
                    creditHistory.paymentHistory >= 90 ? "warning" : "destructive"} 
                    className="text-xs">
                    {creditHistory.paymentHistory >= 95 ? "EXCELLENT" : 
                      creditHistory.paymentHistory >= 90 ? "GOOD" : "POOR"}
                  </CustomBadge>
                </div>
                <Progress value={creditHistory.paymentHistory} className="h-1 bg-gray-800" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">DELINQUENCIES (24M)</p>
                  <p className="font-semibold">{creditHistory.delinquencies}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-1">BANKRUPTCIES</p>
                  <p className="font-semibold">{creditHistory.bankruptcies}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-1">TAX LIENS</p>
                  <p className="font-semibold">{creditHistory.taxLiens}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-1">JUDGMENTS</p>
                  <p className="font-semibold">{creditHistory.judgments}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              DEBT OVERVIEW
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">OUTSTANDING DEBT</p>
                <p className="font-semibold">{creditHistory.outstandingDebt}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">CREDIT UTILIZATION</p>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">{(creditHistory.utilizationRatio * 100).toFixed(0)}%</span>
                  <CustomBadge variant={creditHistory.utilizationRatio <= 0.3 ? "success" : 
                    creditHistory.utilizationRatio <= 0.7 ? "warning" : "destructive"} 
                    className="text-xs">
                    {creditHistory.utilizationRatio <= 0.3 ? "LOW" : 
                      creditHistory.utilizationRatio <= 0.7 ? "MODERATE" : "HIGH"}
                  </CustomBadge>
                </div>
                <Progress value={creditHistory.utilizationRatio * 100} className="h-1 bg-gray-800" />
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">PREVIOUS LOANS</p>
                <p className="font-semibold">{creditHistory.previousLoans}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-400 mb-1">HISTORICAL DEFAULT RATE</p>
                <div className="flex items-center">
                  <span className="font-semibold mr-2">{creditHistory.defaultRate}%</span>
                  <CustomBadge variant="success" className="text-xs">EXCELLENT</CustomBadge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreditProfileTab;
