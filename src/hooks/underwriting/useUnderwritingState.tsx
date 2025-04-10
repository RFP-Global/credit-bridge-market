
import { useState } from "react";
import { UseUnderwritingStateReturn } from "./types";
import { initialScoreThresholds, initialCriteriaGroups } from "./initialData";

export const useUnderwritingState = (): UseUnderwritingStateReturn => {
  const [totalScore, setTotalScore] = useState(4.45);
  const [scoreThresholds, setScoreThresholds] = useState(initialScoreThresholds);
  const [criteriaGroups, setCriteriaGroups] = useState(initialCriteriaGroups);

  return {
    totalScore,
    setTotalScore,
    scoreThresholds,
    setScoreThresholds,
    criteriaGroups,
    setCriteriaGroups
  };
};
