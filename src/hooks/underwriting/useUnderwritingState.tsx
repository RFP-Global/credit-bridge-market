
import { useState } from "react";
import { UseUnderwritingStateReturn } from "./types";
import { initialScoreThresholds, initialCriteriaGroups } from "./initialData";

export const useUnderwritingState = (): UseUnderwritingStateReturn => {
  const [totalScore, setTotalScore] = useState(4.45);
  const [scoreThresholds, setScoreThresholds] = useState(initialScoreThresholds);
  const [criteriaGroups, setCriteriaGroups] = useState(initialCriteriaGroups);
  const [scoreRange, setScoreRange] = useState({ min: 4.2, max: 7.8 });
  const [metricRanges, setMetricRanges] = useState<{ [key: string]: { min: number; max: number } }>({});

  return {
    totalScore,
    setTotalScore,
    scoreThresholds,
    setScoreThresholds,
    criteriaGroups,
    setCriteriaGroups,
    scoreRange,
    setScoreRange,
    metricRanges,
    setMetricRanges
  };
};
