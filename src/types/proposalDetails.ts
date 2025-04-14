export interface FinancialRatios {
  // Liquidity Ratios
  currentRatio: number;
  quickRatio: number;
  cashRatio: number;

  // Leverage Ratios
  debtToEquity: number;
  leverageRatio: number;
  equityRatio: number;
  interestCoverageRatio: number;
  fixedChargeCoverageRatio: number;

  // Profitability Ratios
  netProfitMargin: number;
  grossProfitMargin: number;
  operatingMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;

  // Cash Flow Ratios
  operatingCashFlowRatio: number;
  debtServiceCoverageRatio: number;
  freeCashFlowToFirm: number;

  // Coverage & Repayment Ratios
  loanToValueRatio: number;
  collateralCoverageRatio: number;
  leverageCoverageRatio: number;
  paybackPeriod: number;

  // Efficiency & Operational Ratios
  accountsReceivableTurnover: number;
  inventoryTurnover: number;
  assetTurnover: number;

  // Legacy ratios (kept for backward compatibility)
  debtToEBITDA: number;
}

export interface CompanyDemographics {
  founded: string;
  employees: number;
  ownership: string;
  industrySubsector: string;
  location: string;
  annualRevenue: string;
  totalAssets: string;
  totalLiabilities: string;
  netWorth: string;
  publiclyTraded: boolean;
  keyExecutives: string[];
}

export interface CreditHistory {
  creditScore: number;
  paymentHistory: number;
  delinquencies: number;
  bankruptcies: number;
  taxLiens: number;
  judgments: number;
  outstandingDebt: string;
  utilizationRatio: number;
  previousLoans: number;
  defaultRate: number;
}

export interface CriteriaFitItem {
  name: string;
  matches: boolean;
  yourCriteria: string;
  dealValue: string;
}

export interface UnderwritingCompatibility {
  overallScore: number;
  categoryScores: {
    financialStrength: number;
    businessStability: number;
    competitivePosition: number;
    collateralStrength: number;
    industryRisk: number;
    bankingRelationship: number;
  };
  criteriaFit: CriteriaFitItem[];
}

export interface CategoryComponent {
  name: string;
  score: number;
  description?: string;
}

export interface CategoryDetails {
  name: string;
  score: number;
  components: CategoryComponent[];
}
