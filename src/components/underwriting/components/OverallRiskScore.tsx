
import React from 'react';
import { Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomBadge } from "@/components/ui/custom-badge";
import { RangeScoreSlider } from "./RangeScoreSlider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OverallRiskScoreProps {
  totalScore: number;
  minScore: number;
  maxScore: number;
  scoreRange: { min: number; max: number };
  riskLevel: { label: string; color: string };
  handleGetScoreColor: (score: number) => string;
  handleGetScoreBackground: (score: number) => string;
  handleUpdateScoreRange: (min: number, max: number) => void;
}

export const OverallRiskScore = ({
  totalScore,
  minScore,
  maxScore,
  scoreRange,
  riskLevel,
  handleGetScoreColor,
  handleGetScoreBackground,
  handleUpdateScoreRange,
}: OverallRiskScoreProps) => {
  return (
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
      <RangeScoreSlider
        minValue={1}
        maxValue={10}
        initialMin={scoreRange.min}
        initialMax={scoreRange.max}
        step={0.1}
        onRangeChange={handleUpdateScoreRange}
      />
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
  );
};
