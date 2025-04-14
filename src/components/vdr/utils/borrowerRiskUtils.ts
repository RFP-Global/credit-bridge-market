import { getScoreBackground, getRiskLevel } from "@/components/underwriting/utils/styleUtils";

interface RatioScoreMapping {
  ratio: string;
  ranges: {
    min: number;
    max: number;
    score: number;
  }[];
}

// Updated to match the Financial Strength ratios from the lender underwriting
const ratioScoreMappings: RatioScoreMapping[] = [
  {
    ratio: "debtServiceCoverageRatio",
    ranges: [
      { min: 3.00, max: Infinity, score: 10 },
      { min: 2.50, max: 2.99, score: 9 },
      { min: 2.00, max: 2.49, score: 8 },
      { min: 1.75, max: 1.99, score: 7 },
      { min: 1.50, max: 1.74, score: 6 },
      { min: 1.25, max: 1.49, score: 5 },
      { min: 1.10, max: 1.24, score: 4 },
      { min: 1.00, max: 1.09, score: 3 },
      { min: 0.75, max: 0.99, score: 2 },
      { min: -Infinity, max: 0.75, score: 1 }
    ]
  },
  {
    ratio: "currentRatio",
    ranges: [
      { min: 3.00, max: Infinity, score: 10 },
      { min: 2.50, max: 2.99, score: 9 },
      { min: 2.00, max: 2.49, score: 8 },
      { min: 1.75, max: 1.99, score: 7 },
      { min: 1.50, max: 1.74, score: 6 },
      { min: 1.25, max: 1.49, score: 5 },
      { min: 1.10, max: 1.24, score: 4 },
      { min: 1.00, max: 1.09, score: 3 },
      { min: 0.75, max: 0.99, score: 2 },
      { min: -Infinity, max: 0.75, score: 1 }
    ]
  },
  {
    ratio: "quickRatio",
    ranges: [
      { min: 18.00, max: 20.00, score: 10 },
      { min: 16.00, max: 17.99, score: 9 },
      { min: 14.00, max: 15.99, score: 8 },
      { min: 12.00, max: 13.99, score: 7 },
      { min: 10.00, max: 11.99, score: 6 },
      { min: 8.00, max: 9.99, score: 5 },
      { min: 6.00, max: 7.99, score: 4 },
      { min: 4.00, max: 5.99, score: 3 },
      { min: 2.00, max: 3.99, score: 2 },
      { min: -Infinity, max: 1.99, score: 1 }
    ]
  },
  {
    ratio: "interestCoverageRatio",
    ranges: [
      { min: 8.00, max: Infinity, score: 10 },
      { min: 6.00, max: 7.99, score: 9 },
      { min: 4.50, max: 5.99, score: 8 },
      { min: 3.50, max: 4.49, score: 7 },
      { min: 2.75, max: 3.49, score: 6 },
      { min: 2.00, max: 2.74, score: 5 },
      { min: 1.50, max: 1.99, score: 4 },
      { min: 1.00, max: 1.49, score: 3 },
      { min: 0.75, max: 0.99, score: 2 },
      { min: -Infinity, max: 0.75, score: 1 }
    ]
  },
  {
    ratio: "debtToEBITDA",
    ranges: [
      { min: -Infinity, max: 1.00, score: 10 },
      { min: 1.01, max: 2.00, score: 9 },
      { min: 2.01, max: 3.00, score: 8 },
      { min: 3.01, max: 4.00, score: 7 },
      { min: 4.01, max: 5.00, score: 6 },
      { min: 5.01, max: 6.00, score: 5 },
      { min: 6.01, max: 7.00, score: 4 },
      { min: 7.01, max: 8.00, score: 3 },
      { min: 8.01, max: 10.00, score: 2 },
      { min: 10.01, max: Infinity, score: 1 }
    ]
  }
];

// Define our own score thresholds for the borrower risk utility
const scoreThresholds = [
  { threshold: 9, color: "text-green-500" },
  { threshold: 7, color: "text-blue-500" },
  { threshold: 5, color: "text-yellow-500" },
  { threshold: 0, color: "text-red-500" }
];

// Create our own version of getScoreColor that doesn't require the scoreThresholds parameter
export const getScoreColor = (score: number): string => {
  for (const threshold of scoreThresholds) {
    if (score >= threshold.threshold) {
      return threshold.color;
    }
  }
  return "text-red-500";
};

export const calculateRatioScore = (ratioName: string, value: number): number => {
  const mapping = ratioScoreMappings.find(m => m.ratio === ratioName);
  if (!mapping) return 5; // Default middle score

  const range = mapping.ranges.find(r => value >= r.min && value < r.max);
  return range ? range.score / 2 : 5; // Divide by 2 to match the 1-5 scale used in the UI
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

export { getScoreBackground, getRiskLevel };
