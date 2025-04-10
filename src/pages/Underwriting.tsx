
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
import { useUnderwritingState } from "@/hooks/underwriting/useUnderwritingState";
import { 
  updateCriterionWeight, 
  updateGroupWeight, 
  updateCriterionScore, 
  updateCriterionRange,
  updateActualMetricValue,
  toggleCriterionEnabled
} from "@/components/underwriting/utils/scoreUtils";
import {
  getScoreColor,
  getScoreBackground,
  getRiskLevel
} from "@/components/underwriting/utils/styleUtils";
import { CategoryWeights } from "@/components/underwriting/CategoryWeights";
import { AlgorithmTab } from "@/components/underwriting/AlgorithmTab";
import { CustomBadge } from "@/components/ui/custom-badge";

const Underwriting = () => {
  const {
    minTotalScore,
    maxTotalScore,
    setMinTotalScore,
    setMaxTotalScore,
    scoreThresholds,
    criteriaGroups,
    setCriteriaGroups
  } = useUnderwritingState();

  const handleUpdateCriterionWeight = (groupIndex: number, criterionIndex: number, newWeight: number) => {
    updateCriterionWeight(criteriaGroups, groupIndex, criterionIndex, newWeight, setCriteriaGroups, setMinTotalScore, setMaxTotalScore);
  };

  const handleUpdateGroupWeight = (groupIndex: number, newWeight: number) => {
    updateGroupWeight(criteriaGroups, groupIndex, newWeight, setCriteriaGroups, setMinTotalScore, setMaxTotalScore);
  };

  const handleUpdateCriterionScore = (groupIndex: number, criterionIndex: number, minScore: number, maxScore: number) => {
    updateCriterionScore(criteriaGroups, groupIndex, criterionIndex, minScore, maxScore, setCriteriaGroups, setMinTotalScore, setMaxTotalScore);
  };

  const handleUpdateCriterionRange = (groupIndex: number, criterionIndex: number, min: number, max: number) => {
    updateCriterionRange(criteriaGroups, groupIndex, criterionIndex, min, max, setCriteriaGroups, setMinTotalScore, setMaxTotalScore);
  };
  
  const handleUpdateActualMetricValue = (groupIndex: number, criterionIndex: number, value: number) => {
    updateActualMetricValue(criteriaGroups, groupIndex, criterionIndex, value, setCriteriaGroups, setMinTotalScore, setMaxTotalScore);
  };
  
  const handleToggleCriterionEnabled = (groupIndex: number, criterionIndex: number, enabled: boolean) => {
    toggleCriterionEnabled(criteriaGroups, groupIndex, criterionIndex, enabled, setCriteriaGroups, setMinTotalScore, setMaxTotalScore);
  };

  const handleGetScoreColor = (score: number) => getScoreColor(score, scoreThresholds);
  const handleGetScoreBackground = (score: number) => getScoreBackground(score);
  
  const avgTotalScore = (minTotalScore + maxTotalScore) / 2;
  const riskLevel = getRiskLevel(avgTotalScore);
  
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
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">Overall Risk Score</div>
                  <div className={`text-5xl font-bold ${handleGetScoreColor(avgTotalScore)}`}>
                    {minTotalScore.toFixed(1)}-{maxTotalScore.toFixed(1)}
                  </div>
                  <CustomBadge 
                    variant={
                      avgTotalScore >= 9 ? "success" : 
                      avgTotalScore >= 7 ? "secondary" :
                      avgTotalScore >= 5 ? "warning" : "destructive"
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
              </div>
            </Card>
            
            <AlgorithmTab 
              criteriaGroups={criteriaGroups}
              updateGroupWeight={handleUpdateGroupWeight}
              updateCriterionWeight={handleUpdateCriterionWeight}
              updateCriterionScore={handleUpdateCriterionScore}
              updateCriterionRange={handleUpdateCriterionRange}
              updateActualMetricValue={handleUpdateActualMetricValue}
              toggleCriterionEnabled={handleToggleCriterionEnabled}
              getScoreColor={handleGetScoreColor}
              getScoreBackground={handleGetScoreBackground}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Underwriting;

