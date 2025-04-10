
import { useState } from "react";
import { UseUnderwritingStateReturn } from "./types";
import { initialScoreThresholds, initialCriteriaGroups } from "./initialData";

export const useUnderwritingState = (): UseUnderwritingStateReturn => {
  const [minTotalScore, setMinTotalScore] = useState(3.75);
  const [maxTotalScore, setMaxTotalScore] = useState(5.25);
  const [scoreThresholds, setScoreThresholds] = useState(initialScoreThresholds);
  const [criteriaGroups, setCriteriaGroups] = useState(initialCriteriaGroups);

  return {
    minTotalScore,
    maxTotalScore,
    setMinTotalScore,
    setMaxTotalScore,
    scoreThresholds,
    setScoreThresholds,
    criteriaGroups,
    setCriteriaGroups
  };
};
