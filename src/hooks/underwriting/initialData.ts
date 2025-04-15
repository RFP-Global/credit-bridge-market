
import { initialScoreThresholds } from "./data/scoreThresholds";
import { financialStrengthGroup } from "./data/financialStrengthGroup";
import { businessStabilityGroup } from "./data/businessStabilityGroup";
import { competitivePositioningGroup } from "./data/competitivePositioningGroup";
import { managementStrengthGroup } from "./data/managementStrengthGroup";
import { industryMarketRiskGroup } from "./data/industryMarketRiskGroup";

export { initialScoreThresholds };

export const initialCriteriaGroups = [
  financialStrengthGroup,
  businessStabilityGroup,
  competitivePositioningGroup,
  managementStrengthGroup,
  industryMarketRiskGroup
];
