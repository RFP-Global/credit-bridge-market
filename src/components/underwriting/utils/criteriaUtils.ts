
import { CriteriaGroup } from "../types";

export const getFilteredCriteria = (criteria: CriteriaGroup["criteria"], criteriaNames: string[]) => {
  return criteria.filter(c => criteriaNames.includes(c.name));
};

export const findCriteriaIndices = (criteria: CriteriaGroup["criteria"], filteredCriteria: CriteriaGroup["criteria"]) => {
  return filteredCriteria.map(fc => criteria.findIndex(c => c.name === fc.name));
};

export const ratioNames = {
  liquidityRatios: ["Current Ratio", "Quick Ratio", "Cash Ratio"],
  leverageRatios: ["Debt-to-Equity", "Debt Ratio", "Equity Ratio", "Fixed Charge Coverage Ratio", "Interest Coverage Ratio"],
  cashFlowRatios: ["Operating Cash Flow Ratio", "Debt Service Coverage Ratio"],
  coverageRatios: ["Loan-to-Value Ratio", "Collateral Coverage Ratio", "Leverage Coverage Ratio", "Payback Ratio"],
  profitabilityRatios: ["Net Profit Margin", "Gross Profit Margin", "Operating Margin", "Return on Assets", "Return on Equity"],
  turnoverRatios: ["Accounts Receivable Turnover Ratio", "Inventory Turnover Ratio", "Asset Turnover Ratio"]
};
