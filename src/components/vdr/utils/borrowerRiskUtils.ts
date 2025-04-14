
import { getScoreColor, getScoreBackground, getRiskLevel } from "@/components/underwriting/utils/styleUtils";

interface RatioScoreMapping {
  ratio: string;
  ranges: {
    min: number;
    max: number;
    score: number;
  }[];
}

const ratioScoreMappings: RatioScoreMapping[] = [
  {
    ratio: "debtServiceCoverageRatio",
    ranges: [
      { min: 2, max: Infinity, score: 9 },
      { min: 1.5, max: 2, score: 7.5 },
      { min: 1.2, max: 1.5, score: 6 },
      { min: 1, max: 1.2, score: 4 },
      { min: -Infinity, max: 1, score: 2 }
    ]
  },
  {
    ratio: "currentRatio",
    ranges: [
      { min: 2, max: Infinity, score: 9 },
      { min: 1.5, max: 2, score: 7.5 },
      { min: 1.2, max: 1.5, score: 6 },
      { min: 1, max: 1.2, score: 4 },
      { min: -Infinity, max: 1, score: 2 }
    ]
  },
  {
    ratio: "quickRatio",
    ranges: [
      { min: 1.5, max: Infinity, score: 9 },
      { min: 1.2, max: 1.5, score: 7.5 },
      { min: 1, max: 1.2, score: 6 },
      { min: 0.8, max: 1, score: 4 },
      { min: -Infinity, max: 0.8, score: 2 }
    ]
  },
  {
    ratio: "debtToEquityRatio",
    ranges: [
      { min: -Infinity, max: 0.5, score: 9 },
      { min: 0.5, max: 1, score: 7.5 },
      { min: 1, max: 1.5, score: 6 },
      { min: 1.5, max: 2, score: 4 },
      { min: 2, max: Infinity, score: 2 }
    ]
  },
  {
    ratio: "returnOnAssets",
    ranges: [
      { min: 0.15, max: Infinity, score: 9 },
      { min: 0.1, max: 0.15, score: 7.5 },
      { min: 0.06, max: 0.1, score: 6 },
      { min: 0.03, max: 0.06, score: 4 },
      { min: -Infinity, max: 0.03, score: 2 }
    ]
  }
];

export const calculateRatioScore = (ratioName: string, value: number): number => {
  const mapping = ratioScoreMappings.find(m => m.ratio === ratioName);
  if (!mapping) return 5; // Default middle score

  const range = mapping.ranges.find(r => value >= r.min && value < r.max);
  return range ? range.score : 5;
};

export const calculateOverallRiskScore = (ratios: Record<string, number>): number => {
  let totalScore = 0;
  let count = 0;

  for (const [ratio, value] of Object.entries(ratios)) {
    if (ratioScoreMappings.some(m => m.ratio === ratio)) {
      totalScore += calculateRatioScore(ratio, value);
      count++;
    }
  }

  return count > 0 ? Number((totalScore / count).toFixed(2)) : 5;
};

export { getScoreColor, getScoreBackground, getRiskLevel };
