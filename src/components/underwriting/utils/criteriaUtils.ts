
import { CriteriaGroup } from "../types";
import { recalculateScores } from "./scoreCalculationUtils";

/**
 * Toggles the enabled status of a criterion and recalculates scores.
 */
export const toggleCriterionEnabled = (
  criteriaGroups: CriteriaGroup[],
  groupIndex: number,
  criterionIndex: number,
  enabled: boolean,
  setCriteriaGroups: React.Dispatch<React.SetStateAction<CriteriaGroup[]>>,
  setMinTotalScore: React.Dispatch<React.SetStateAction<number>>,
  setMaxTotalScore: React.Dispatch<React.SetStateAction<number>>
) => {
  const newGroups = [...criteriaGroups];
  newGroups[groupIndex].criteria[criterionIndex].enabled = enabled;
  recalculateScores(newGroups, setMinTotalScore, setMaxTotalScore);
  setCriteriaGroups(newGroups);
};
