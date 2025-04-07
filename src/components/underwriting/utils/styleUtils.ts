
import { ScoreThreshold } from "../types";

export const getScoreColor = (score: number, scoreThresholds: ScoreThreshold[]) => {
  for (const threshold of scoreThresholds) {
    if (score >= threshold.threshold) {
      return threshold.color;
    }
  }
  return "text-red-500";
};

export const getScoreBackground = (score: number) => {
  if (score >= 4.5) return "bg-green-500";
  if (score >= 3.5) return "bg-blue-500";
  if (score >= 2.5) return "bg-yellow-500";
  return "bg-red-500";
};

export const getRiskLevel = (score: number) => {
  if (score >= 4.5) return { label: "Low Risk", color: "bg-green-500/20 text-green-500 border-green-500/20" };
  if (score >= 3.5) return { label: "Moderate Risk", color: "bg-blue-500/20 text-blue-500 border-blue-500/20" };
  if (score >= 2.5) return { label: "Medium-High Risk", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" };
  return { label: "High Risk", color: "bg-red-500/20 text-red-500 border-red-500/20" };
};
