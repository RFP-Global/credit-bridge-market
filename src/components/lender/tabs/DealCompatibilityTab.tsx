
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Shield, Zap, CheckCircle, AlertCircle, Percent } from "lucide-react";
import { CustomBadge } from "@/components/ui/custom-badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DealCompatibilityTabProps {
  dealData: any;
  dealType: "active" | "closed" | "watchlist";
}

const DealCompatibilityTab: React.FC<DealCompatibilityTabProps> = ({ dealData, dealType }) => {
  // Mock compatibility data
  const compatibilityData = {
    overallScore: 87,
    riskScore: 72,
    dealFit: 91,
    matchScores: [
      { name: "Funding Amount", score: 95, status: "high" },
      { name: "Industry Type", score: 85, status: "high" },
      { name: "Geographic Location", score: 90, status: "high" },
      { name: "Business Size", score: 75, status: "medium" },
      { name: "Credit Profile", score: 68, status: "medium" },
      { name: "Documentation", score: 80, status: "high" }
    ],
    criteriaFit: [
      { name: "Funding Range", matches: true, your: "$500K - $5M", deal: "$2.5M" },
      { name: "Industries", matches: true, your: "Technology, Healthcare, Manufacturing", deal: "Technology" },
      { name: "Regions", matches: true, your: "Midwest, West Coast", deal: "Chicago, IL" },
      { name: "Minimum Revenue", matches: true, your: "$5M+", deal: "$8.5M" },
      { name: "Business Age", matches: true, your: "3+ years", deal: "14 years" },
      { name: "Credit Score", matches: false, your: "680+", deal: "645" }
    ],
    peerPerformance: {
      avgConversion: "32%",
      yourProjected: "65%",
      industry: "Technology",
      similarDeals: 24,
      avgApprovalTime: "14 days"
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              OVERALL MATCH
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center space-y-4 py-6">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#1a1a1a" 
                    strokeWidth="10" 
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="10"
                    strokeDasharray={`${2 * Math.PI * 45 * compatibilityData.overallScore / 100} ${2 * Math.PI * 45 * (1 - compatibilityData.overallScore / 100)}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-4xl font-bold">{compatibilityData.overallScore}%</div>
                </div>
              </div>
              
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-400">Match Score</p>
                <CustomBadge variant="success" className="font-mono">
                  STRONG MATCH
                </CustomBadge>
              </div>
            </div>
            
            <Separator className="my-4 bg-gray-800" />
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-gray-400">RISK SCORE</p>
                  <p className="text-xs font-semibold">{compatibilityData.riskScore}%</p>
                </div>
                <Progress value={compatibilityData.riskScore} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-xs text-gray-400">DEAL FIT</p>
                  <p className="text-xs font-semibold">{compatibilityData.dealFit}%</p>
                </div>
                <Progress value={compatibilityData.dealFit} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2 bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              MATCH ANALYSIS
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {compatibilityData.matchScores.map((item, index) => (
                  <div key={index} className="border border-gray-800 rounded-md p-4">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-medium">{item.name}</p>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs text-gray-400">MATCH SCORE</p>
                      <p className="text-xs font-semibold">{item.score}%</p>
                    </div>
                    <Progress value={item.score} className="h-1.5" />
                  </div>
                ))}
              </div>
              
              <Separator className="my-6 bg-gray-800" />
              
              <div>
                <h3 className="text-sm font-semibold mb-4">Your Lending Criteria Match</h3>
                <div className="space-y-3">
                  {compatibilityData.criteriaFit.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <div>
                        <div className="flex items-center">
                          {item.matches ? (
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-yellow-500 mr-2" />
                          )}
                          <p className="text-sm">{item.name}</p>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Your criteria: {item.your}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{item.deal}</p>
                        {!item.matches && (
                          <p className="text-xs text-yellow-500">Mismatch</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-black border-gray-800">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-sm font-mono flex items-center">
            <Percent className="mr-2 h-4 w-4" />
            PEER PERFORMANCE
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="performance-metrics" className="border-gray-800">
              <AccordionTrigger className="text-sm">Performance Metrics</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">AVG. CONVERSION RATE</p>
                    <p className="text-xl font-semibold">{compatibilityData.peerPerformance.avgConversion}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">YOUR PROJECTED</p>
                    <p className="text-xl font-semibold text-green-500">{compatibilityData.peerPerformance.yourProjected}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">SIMILAR DEALS</p>
                    <p className="text-xl font-semibold">{compatibilityData.peerPerformance.similarDeals}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">AVG. APPROVAL TIME</p>
                    <p className="text-xl font-semibold">{compatibilityData.peerPerformance.avgApprovalTime}</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="recommended-actions" className="border-gray-800">
              <AccordionTrigger className="text-sm">Recommended Actions</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5" />
                    <p className="text-sm">Request updated financial statements for the last quarter to verify continued growth</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5" />
                    <p className="text-sm">Schedule a follow-up meeting to address the credit score concerns</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-3 mt-0.5" />
                    <p className="text-sm">Consider adjusted terms based on the strong performance in other criteria</p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default DealCompatibilityTab;
