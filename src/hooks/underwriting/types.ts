
import { CriteriaGroup, ScoreThreshold } from "@/components/underwriting/types";

export interface UnderwritingState {
  activeTab: string;
  totalScore: number;
  scoreThresholds: ScoreThreshold[];
  criteriaGroups: CriteriaGroup[];
}

export interface UnderwritingStateActions {
  setActiveTab: (tab: string) => void;
  setTotalScore: (score: number) => void;
  setScoreThresholds: (thresholds: ScoreThreshold[]) => void;
  setCriteriaGroups: (groups: CriteriaGroup[]) => void;
}

export type UseUnderwritingStateReturn = UnderwritingState & UnderwritingStateActions;
