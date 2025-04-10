import React from 'react';
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

  // Taking the first threshold (lowest risk) and last threshold (highest risk) for the range
  const minScore = scoreThresholds[0].value;
  const maxScore = scoreThresholds[scoreThresholds.length - 1].value;

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
            
            <Card className="bg-black/40 border-gray-800 mb-6 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="bg-gradient-to-br from-gray-900 to-gray-950 p-6 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-800/50">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Overall Risk Score Range</div>
                  <div className="flex items-center gap-2">
                    <div className={`text-4xl font-bold ${handleGetScoreColor(minScore)}`}>
                      {minScore.toFixed(2)}
                    </div>
                    <span className="text-gray-500">-</span>
                    <div className={`text-4xl font-bold ${handleGetScoreColor(maxScore)}`}>
                      {maxScore.toFixed(2)}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-800/60 rounded-full mt-3 overflow-hidden">
                    <div 
                      className={`h-full ${handleGetScoreBackground(totalScore)}`}
                      style={{ width: `${(totalScore / maxScore) * 100}%` }}
                    />
                  </div>
                  <CustomBadge 
                    variant={
                      totalScore >= 9 ? "success" : 
                      totalScore >= 7 ? "secondary" :
                      totalScore >= 5 ? "warning" : "destructive"
                    } 
                    className="mt-3"
                  >
                    {riskLevel.label}
                  </CustomBadge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="mt-3 text-xs text-gray-400">
                          <Info className="h-3 w-3 mr-1" /> Score Scale
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="w-[240px] text-xs">
                          Risk Score Scale:<br />
                          1-4.99: High Risk<br />
                          5-6.99: Medium-High Risk<br />
                          7-8.99: Moderate Risk<br />
                          9-10: Low Risk
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="lg:col-span-2 p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">CATEGORY SCORE BREAKDOWN</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {criteriaGroups.map((group) => (
                      <div key={group.name} className="bg-black/30 rounded-md p-3 border border-gray-800/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium bg-primary/10 text-primary">
                              {group.weight}%
                            </div>
                            <span className="text-sm font-medium">{group.name}</span>
                          </div>
                          <div className={`text-sm font-bold ${handleGetScoreColor(group.score)}`}>
                            {group.score.toFixed(2)}
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${handleGetScoreBackground(group.score)}`}
                            style={{ width: `${(group.score / 10) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-800/50 flex items-center justify-between">
                    <span className="text-sm font-medium">Total Score</span>
                    <div className={`text-lg font-bold ${handleGetScoreColor(totalScore)}`}>
                      {totalScore.toFixed(2)}
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
