
import React from 'react';
import { Card } from "@/components/ui/card";
import { RiskScoreCard } from "./RiskScoreCard";
import { CategoryScoreBreakdown } from "./CategoryScoreBreakdown";
import { CriteriaGroup } from "./types";

interface MainScoreCardProps {
  totalScore: number;
  scoreThresholds: any[];
  criteriaGroups: CriteriaGroup[];
  scoreRange: { min: number; max: number };
  riskLevel: { label: string };
  handleGetScoreColor: (score: number) => string;
  handleGetScoreBackground: (score: number) => string;
  handleUpdateScoreRange: (min: number, max: number) => void;
}

export const MainScoreCard: React.FC<MainScoreCardProps> = ({
  totalScore,
  scoreThresholds,
  criteriaGroups,
  scoreRange,
  riskLevel,
  handleGetScoreColor,
  handleGetScoreBackground,
  handleUpdateScoreRange,
}) => {
  // Taking the first threshold (lowest risk) and last threshold (highest risk) for the range
  const minScore = scoreThresholds[0].value;
  const maxScore = scoreThresholds[scoreThresholds.length - 1].value;

  return (
    <Card className="bg-black/40 border-gray-800 mb-6 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <RiskScoreCard 
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
          getScoreColor={handleGetScoreColor}
          getScoreBackground={handleGetScoreBackground}
          totalScore={totalScore}
        />
      </div>
    </Card>
  );
};
