
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Clock, DollarSign, Building } from "lucide-react";

interface DealOverviewTabProps {
  dealData: any;
  dealType: "active" | "closed" | "watchlist";
}

const DealOverviewTab: React.FC<DealOverviewTabProps> = ({ dealData, dealType }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono">DEAL SUMMARY</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">COMPANY</p>
                <p className="font-semibold">{dealData.company}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">AMOUNT</p>
                <p className="font-semibold">{dealData.amount}</p>
              </div>
              {dealType === "active" && (
                <>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">STAGE</p>
                    <p className="font-semibold">{dealData.stage}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">DUE DATE</p>
                    <p className="font-semibold">{dealData.dueDate}</p>
                  </div>
                </>
              )}
              {dealType === "closed" && (
                <>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">RESULT</p>
                    <p className="font-semibold">{dealData.result}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">CLOSE DATE</p>
                    <p className="font-semibold">{dealData.closeDate}</p>
                  </div>
                </>
              )}
              {dealType === "watchlist" && (
                <>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">STATUS</p>
                    <p className="font-semibold">{dealData.status}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">NOTES</p>
                    <p className="font-semibold truncate max-w-[200px]">{dealData.notes}</p>
                  </div>
                </>
              )}
            </div>
            
            {dealType === "active" && (
              <>
                <Separator className="my-6 bg-gray-800" />
                
                <div>
                  <p className="text-xs text-gray-400 mb-3">TIMELINE</p>
                  <div className="relative pl-8 border-l border-primary/20 space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[29px] top-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                      </div>
                      <h4 className="text-xs font-semibold">Initial Review</h4>
                      <p className="text-xs text-muted-foreground">April 2, 2025</p>
                      <p className="text-sm mt-1">Received initial application and began review process.</p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[29px] top-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                      </div>
                      <h4 className="text-xs font-semibold">Documentation Review</h4>
                      <p className="text-xs text-muted-foreground">April 5, 2025</p>
                      <p className="text-sm mt-1">Financial statements and business plan under evaluation.</p>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-[29px] top-0 w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-400"></div>
                      </div>
                      <h4 className="text-xs font-semibold text-muted-foreground">Final Approval</h4>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
        
        <Card className="bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono">DEAL METRICS</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">DEAL TYPE</p>
                <p className="font-semibold">Financing</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">INDUSTRY</p>
                <p className="font-semibold">Technology</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">RELATIONSHIP</p>
                <p className="font-semibold">{dealType === "watchlist" ? "Potential" : "Established"}</p>
              </div>
              
              {dealType === "watchlist" && (
                <div>
                  <p className="text-xs text-gray-400 mb-1">OPPORTUNITY RATING</p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs mt-1">75%</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DealOverviewTab;
