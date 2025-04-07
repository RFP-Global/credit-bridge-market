
export interface FinancialRatios {
  debtServiceCoverageRatio: number;
  currentRatio: number;
  quickRatio: number;
  debtToEquityRatio: number;
  returnOnAssets: number;
  returnOnEquity: number;
  grossMargin: number;
  operatingMargin: number;
  netProfitMargin: number;
  assetTurnover: number;
  inventoryTurnover: number;
  daysReceivablesOutstanding: number;
  daysPayablesOutstanding: number;
  workingCapitalTurnover: number;
  zScore: number;
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
