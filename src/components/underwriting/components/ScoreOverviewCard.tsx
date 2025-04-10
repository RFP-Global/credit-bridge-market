
import React from 'react';
import { Card } from "@/components/ui/card";
import { CriteriaGroup } from "../types";
import { OverallRiskScore } from "./OverallRiskScore";
import { CategoryScoreBreakdown } from "./CategoryScoreBreakdown";

interface ScoreOverviewCardProps {
  totalScore: number;
  scoreThresholds: Array<{ value: number }>;
  criteriaGroups: CriteriaGroup[];
  scoreRange: { min: number; max: number };
  riskLevel: { label: string; color: string };
  handleGetScoreColor: (score: number) => string;
  handleGetScoreBackground: (score: number) => string;
  handleUpdateScoreRange: (min: number, max: number) => void;
}

export const ScoreOverviewCard = ({
  totalScore,
  scoreThresholds,
  criteriaGroups,
  scoreRange,
  riskLevel,
  handleGetScoreColor,
  handleGetScoreBackground,
  handleUpdateScoreRange,
}: ScoreOverviewCardProps) => {
  // Taking the first threshold (lowest risk) and last threshold (highest risk) for the range
  const minScore = scoreThresholds[0].value;
  const maxScore = scoreThresholds[scoreThresholds.length - 1].value;

  return (
    <Card className="bg-black/40 border-gray-800 mb-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <OverallRiskScore 
          totalScore={totalScore}
          minScore={minScore}
          maxScore={maxScore}
          scoreRange={scoreRange}
          riskLevel={riskLevel}
          handleGetScoreColor={handleGetScoreColor}
          handleGetScoreBackground={handleGetScoreBackground}
          handleUpdateScoreRange={handleUpdateScoreRange}
        />
        
        <CategoryScoreBreakdown 
          criteriaGroups={criteriaGroups}
          totalScore={totalScore}
          handleGetScoreColor={handleGetScoreColor}
          handleGetScoreBackground={handleGetScoreBackground}
        />
      </div>
    </Card>
  );
};
