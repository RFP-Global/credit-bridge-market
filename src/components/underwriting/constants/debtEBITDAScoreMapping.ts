
import { ScoreRange } from "../types";

export const debtEBITDAScoreMapping: ScoreRange[] = [
  { min: null, max: 1.0, score: 10, description: "Minimal Leverage" },
  { min: 1.01, max: 2.0, score: 9, description: "Low Leverage" },
  { min: 2.01, max: 3.0, score: 8, description: "Very Manageable" },
  { min: 3.01, max: 4.0, score: 7, description: "Moderate Risk" },
  { min: 4.01, max: 5.0, score: 6, description: "Slightly Elevated Risk" },
  { min: 5.01, max: 6.0, score: 5, description: "Cautionary" },
  { min: 6.01, max: 7.0, score: 4, description: "High Risk" },
  { min: 7.01, max: 8.0, score: 3, description: "Very High Risk" },
  { min: 8.01, max: 10.0, score: 2, description: "Distressed Leverage" },
  { min: 10.01, max: null, score: 1, description: "Unsustainable" }
];
