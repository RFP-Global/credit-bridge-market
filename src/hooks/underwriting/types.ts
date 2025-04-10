
import { CriteriaGroup, ScoreThreshold } from "@/components/underwriting/types";

export interface UseUnderwritingStateReturn {
  totalScore: number;
  setTotalScore: React.Dispatch<React.SetStateAction<number>>;
  scoreThresholds: ScoreThreshold[];
  setScoreThresholds: React.Dispatch<React.SetStateAction<ScoreThreshold[]>>;
  criteriaGroups: CriteriaGroup[];
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>;
}
