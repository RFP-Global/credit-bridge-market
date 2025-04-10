
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, FileSpreadsheet, Settings, Save } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LenderHeader from "@/components/lender/LenderHeader";
import LenderSidebar from "@/components/lender/LenderSidebar";
import { useUnderwritingState } from "@/hooks/useUnderwritingState";
import { 
  updateCriterionWeight, 
  updateGroupWeight, 
  updateCriterionScore, 
  updateCriterionRange,
  updateActualMetricValue
} from "@/components/underwriting/utils/scoreUtils";
import {
  getScoreColor,
  getScoreBackground,
  getRiskLevel
} from "@/components/underwriting/utils/styleUtils";
import { CategoryWeights } from "@/components/underwriting/CategoryWeights";
import { RiskScoreBreakdown } from "@/components/underwriting/RiskScoreBreakdown";
import { Accordion } from "@/components/ui/accordion";
import { CriteriaGroup } from "@/components/underwriting/CriteriaGroup";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Separator } from "@/components/ui/separator";

const Underwriting = () => {
  const {
    totalScore,
    setTotalScore,
    scoreThresholds,
    criteriaGroups,
    setCriteriaGroups
  } = useUnderwritingState();

  // Create handler functions that use the utility functions
  const handleUpdateCriterionWeight = (groupIndex: number, criterionIndex: number, newWeight: number) => {
    updateCriterionWeight(criteriaGroups, groupIndex, criterionIndex, newWeight, setCriteriaGroups, setTotalScore);
  };

  const handleUpdateGroupWeight = (groupIndex: number, newWeight: number) => {
    updateGroupWeight(criteriaGroups, groupIndex, newWeight, setCriteriaGroups, setTotalScore);
  };

  const handleUpdateCriterionScore = (groupIndex: number, criterionIndex: number, newScore: number) => {
    updateCriterionScore(criteriaGroups, groupIndex, criterionIndex, newScore, setCriteriaGroups, setTotalScore);
  };

  const handleUpdateCriterionRange = (groupIndex: number, criterionIndex: number, min: number, max: number) => {
    updateCriterionRange(criteriaGroups, groupIndex, criterionIndex, min, max, setCriteriaGroups, setTotalScore);
  };
  
  const handleUpdateActualMetricValue = (groupIndex: number, criterionIndex: number, value: number) => {
    updateActualMetricValue(criteriaGroups, groupIndex, criterionIndex, value, setCriteriaGroups, setTotalScore);
  };

  // Create wrapper functions for style utilities that use the state
  const handleGetScoreColor = (score: number) => getScoreColor(score, scoreThresholds);
  const handleGetScoreBackground = (score: number) => getScoreBackground(score);
  
  const riskLevel = getRiskLevel(totalScore);
  
  return (
    <div className="min-h-screen bg-black text-gray-200 relative grid-bg">
      <LenderHeader />
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <LenderSidebar />
          
          <main className="flex-1">
            <div className="border-b border-primary/10 pb-4 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-mono">Underwriting Engine</h1>
                <p className="text-sm text-muted-foreground">
                  Customize borrower metric ranges and scoring criteria for your lending preferences
                </p>
              </div>
            </div>
            
            {/* Enhanced Score Card at the top */}
            <Card className="bg-black/40 border-gray-800 mb-6">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-lg font-mono mb-2">RISK PREFERENCE SCORE</h2>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your current risk algorithm is configured to the following preference
                    </p>
                    
                    {/* Component Score Breakdown */}
                    <div className="space-y-3">
                      {criteriaGroups.map((group) => (
                        <div key={group.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                              {group.weight}%
                            </div>
                            <span className="text-sm">{group.name}</span>
                          </div>
                          <div className={`font-medium ${handleGetScoreColor(group.score)}`}>
                            {group.score.toFixed(2)}
                          </div>
                        </div>
                      ))}
                      
                      <Separator className="my-2 bg-gray-800/50" />
                      
                      <div className="flex items-center justify-between font-semibold">
                        <span>Total Score</span>
                        <div className={`${handleGetScoreColor(totalScore)}`}>
                          {totalScore.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center border-l border-gray-800/50 pl-6">
                    <div className="bg-black/60 border border-primary/20 rounded-md p-4 flex flex-col items-center min-w-[140px]">
                      <div className="text-xs text-muted-foreground mb-2">OVERALL SCORE</div>
                      <div className={`text-4xl font-bold ${handleGetScoreColor(totalScore)}`}>
                        {totalScore.toFixed(2)}
                      </div>
                      <CustomBadge 
                        variant={
                          totalScore >= 4.5 ? "success" : 
                          totalScore >= 3.5 ? "secondary" :
                          totalScore >= 2.5 ? "warning" : "destructive"
                        } 
                        className="mt-2"
                      >
                        {riskLevel.label}
                      </CustomBadge>
                      
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="mt-2">
                              <Info className="h-4 w-4 mr-1" /> Score Scale
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">
                            <p className="w-[240px] text-xs">
                              Risk Score Scale:<br />
                              1-2.49: High Risk<br />
                              2.5-3.49: Medium-High Risk<br />
                              3.5-4.49: Moderate Risk<br />
                              4.5-5: Low Risk
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                <CategoryWeights 
                  criteriaGroups={criteriaGroups}
                  updateGroupWeight={handleUpdateGroupWeight}
                  getScoreColor={handleGetScoreColor}
                />
                <RiskScoreBreakdown 
                  criteriaGroups={criteriaGroups}
                  getScoreColor={handleGetScoreColor}
                  getScoreBackground={handleGetScoreBackground}
                />
              </div>
              
              <Accordion type="single" collapsible className="w-full space-y-4">
                {criteriaGroups.map((group, groupIndex) => (
                  <CriteriaGroup
                    key={group.name}
                    group={group}
                    groupIndex={groupIndex}
                    updateGroupWeight={handleUpdateGroupWeight}
                    updateCriterionWeight={handleUpdateCriterionWeight}
                    updateCriterionScore={handleUpdateCriterionScore}
                    updateCriterionRange={handleUpdateCriterionRange}
                    updateActualMetricValue={handleUpdateActualMetricValue}
                    getScoreColor={handleGetScoreColor}
                    getScoreBackground={handleGetScoreBackground}
                  />
                ))}
              </Accordion>
              
              <div className="flex justify-end mt-8">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Save className="mr-2 h-4 w-4" />
                  Save Algorithm Configuration
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Underwriting;
