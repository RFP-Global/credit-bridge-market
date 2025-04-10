
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import LenderHeader from "@/components/lender/LenderHeader";
import LenderSidebar from "@/components/lender/LenderSidebar";
import { useUnderwritingState } from "@/hooks/useUnderwritingState";
import { 
  updateCriterionWeight, 
  updateGroupWeight, 
  updateCriterionScore, 
  updateCriterionRange,
  updateActualMetricValue,
  updateScoreRange
} from "@/components/underwriting/utils/scoreUtils";
import {
  getScoreColor,
  getScoreBackground,
  getRiskLevel
} from "@/components/underwriting/utils/styleUtils";
import { Accordion } from "@/components/ui/accordion";
import { ScoreOverviewCard } from "@/components/underwriting/components/ScoreOverviewCard";
import { CategoryWeights } from "@/components/underwriting/CategoryWeights";
import { RiskScoreBreakdown } from "@/components/underwriting/RiskScoreBreakdown";
import { CriteriaGroup } from "@/components/underwriting/CriteriaGroup";

const Underwriting = () => {
  const {
    totalScore,
    setTotalScore,
    scoreThresholds,
    criteriaGroups,
    setCriteriaGroups,
    scoreRange,
    setScoreRange
  } = useUnderwritingState();

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

  const handleUpdateScoreRange = (min: number, max: number) => {
    updateScoreRange(min, max, setScoreRange);
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
            
            <ScoreOverviewCard 
              totalScore={totalScore}
              scoreThresholds={scoreThresholds}
              criteriaGroups={criteriaGroups}
              scoreRange={scoreRange}
              riskLevel={riskLevel}
              handleGetScoreColor={handleGetScoreColor}
              handleGetScoreBackground={handleGetScoreBackground}
              handleUpdateScoreRange={handleUpdateScoreRange}
            />
            
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
