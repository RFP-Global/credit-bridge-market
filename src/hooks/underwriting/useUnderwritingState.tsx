
import { useState, useCallback } from "react";
import { UseUnderwritingStateReturn } from "./types";
import { initialScoreThresholds, initialCriteriaGroups } from "./initialData";
import { toast } from "sonner";

export const useUnderwritingState = (): UseUnderwritingStateReturn => {
  const [minTotalScore, setMinTotalScore] = useState(3.75);
  const [maxTotalScore, setMaxTotalScore] = useState(5.25);
  const [scoreThresholds, setScoreThresholds] = useState(initialScoreThresholds);
  const [criteriaGroups, setCriteriaGroups] = useState(initialCriteriaGroups);
  
  // Store industry-specific criteria
  const [industryCriteriaMap, setIndustryCriteriaMap] = useState<Record<string, typeof initialCriteriaGroups>>({
    "Manufacturing": JSON.parse(JSON.stringify(initialCriteriaGroups)),
    "Healthcare": JSON.parse(JSON.stringify(initialCriteriaGroups)),
    "Technology": JSON.parse(JSON.stringify(initialCriteriaGroups)),
    "Retail": JSON.parse(JSON.stringify(initialCriteriaGroups)),
    "Construction": JSON.parse(JSON.stringify(initialCriteriaGroups)),
    "Financial Services": JSON.parse(JSON.stringify(initialCriteriaGroups))
  });

  // Load criteria for a specific industry
  const loadIndustryCriteria = useCallback((industry: string) => {
    if (industryCriteriaMap[industry]) {
      setCriteriaGroups(industryCriteriaMap[industry]);
      // Recalculate min and max total score based on the loaded criteria
      const calculatedMin = calculateMinTotalScore(industryCriteriaMap[industry]);
      const calculatedMax = calculateMaxTotalScore(industryCriteriaMap[industry]);
      setMinTotalScore(calculatedMin);
      setMaxTotalScore(calculatedMax);
      toast.success(`Loaded criteria for ${industry} industry`);
    } else {
      // If no criteria exist for this industry, use the initial criteria
      setCriteriaGroups(initialCriteriaGroups);
      setMinTotalScore(3.75);
      setMaxTotalScore(5.25);
    }
  }, [industryCriteriaMap]);

  // Save criteria for a specific industry
  const saveIndustryCriteria = useCallback((industry: string, groups: typeof initialCriteriaGroups) => {
    setIndustryCriteriaMap(prev => ({
      ...prev,
      [industry]: JSON.parse(JSON.stringify(groups))
    }));
  }, []);

  // Helper function to calculate min total score based on criteria groups
  const calculateMinTotalScore = (groups: typeof initialCriteriaGroups) => {
    return groups.reduce((total, group) => {
      return total + (group.minScore * group.weight) / 100;
    }, 0);
  };

  // Helper function to calculate max total score based on criteria groups
  const calculateMaxTotalScore = (groups: typeof initialCriteriaGroups) => {
    return groups.reduce((total, group) => {
      return total + (group.maxScore * group.weight) / 100;
    }, 0);
  };

  return {
    minTotalScore,
    maxTotalScore,
    setMinTotalScore,
    setMaxTotalScore,
    scoreThresholds,
    setScoreThresholds,
    criteriaGroups,
    setCriteriaGroups,
    loadIndustryCriteria,
    saveIndustryCriteria
  };
};
