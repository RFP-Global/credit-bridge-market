
import { useState } from "react";
import { UseUnderwritingStateReturn } from "./types";
import { initialScoreThresholds, initialCriteriaGroups } from "./initialData";

export const useUnderwritingState = (): UseUnderwritingStateReturn => {
  const [activeTab, setActiveTab] = useState<string>("preferences");
  const [totalScore, setTotalScore] = useState(4.45);
  const [scoreThresholds, setScoreThresholds] = useState(initialScoreThresholds);
  const [criteriaGroups, setCriteriaGroups] = useState(initialCriteriaGroups);

  return {
    activeTab,
    setActiveTab,
    totalScore,
    setTotalScore,
    scoreThresholds,
    setScoreThresholds,
    criteriaGroups,
    setCriteriaGroups
  };
};
