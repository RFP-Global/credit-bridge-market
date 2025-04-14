
import { CriteriaGroup, ScoreThreshold } from "@/components/underwriting/types";

export interface UseUnderwritingStateReturn {
  minTotalScore: number;
  maxTotalScore: number;
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>;
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>;
  scoreThresholds: ScoreThreshold[];
  setScoreThresholds: React.Dispatch<React.SetStateAction<ScoreThreshold[]>>;
  criteriaGroups: CriteriaGroup[];
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>;
  loadIndustryCriteria: (industry: string) => void;
  saveIndustryCriteria: (industry: string, groups: CriteriaGroup[]) => void;
}
