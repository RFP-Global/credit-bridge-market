
import { ScoreThreshold } from "../types";

export const getScoreColor = (score: number, scoreThresholds: ScoreThreshold[]) => {
  for (const threshold of scoreThresholds) {
    if (score >= threshold.threshold) {
      return threshold.color;
    }
  }
  return "text-red-500";
};

export const getScoreBackground = (score: number) => {
  if (score >= 9) return "bg-green-500";
  if (score >= 7) return "bg-blue-500";
  if (score >= 5) return "bg-yellow-500";
  return "bg-red-500";
};

export const getRiskLevel = (score: number) => {
  if (score >= 9) return { label: "Low Risk", color: "bg-green-500/20 text-green-500 border-green-500/20" };
  if (score >= 7) return { label: "Moderate Risk", color: "bg-blue-500/20 text-blue-500 border-blue-500/20" };
  if (score >= 5) return { label: "Medium-High Risk", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" };
  return { label: "High Risk", color: "bg-red-500/20 text-red-500 border-red-500/20" };
};

// Compatibility score styling
export const getCompatibilityScore = (score: number) => {
  if (score >= 80) return { label: "Strong Match", color: "bg-green-500/20 text-green-500 border-green-500/20" };
  if (score >= 60) return { label: "Good Match", color: "bg-blue-500/20 text-blue-500 border-blue-500/20" };
  if (score >= 40) return { label: "Moderate Match", color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/20" };
  return { label: "Poor Match", color: "bg-red-500/20 text-red-500 border-red-500/20" };
};

// Financial ratio score mapping
export const financialRatiosScoreMapping = {
  // DSCR (Debt Service Coverage Ratio)
  DSCR: [
    { min: 3.00, max: Number.MAX_VALUE, score: 10, level: "Exceptional" },
    { min: 2.50, max: 2.99, score: 9, level: "Very Strong" },
    { min: 2.00, max: 2.49, score: 8, level: "Strong" },
    { min: 1.75, max: 1.99, score: 7, level: "Good" },
    { min: 1.50, max: 1.74, score: 6, level: "Moderate" },
    { min: 1.25, max: 1.49, score: 5, level: "Acceptable" },
    { min: 1.10, max: 1.24, score: 4, level: "Weak" },
    { min: 1.00, max: 1.09, score: 3, level: "Very Weak" },
    { min: 0.75, max: 0.99, score: 2, level: "High Risk" },
    { min: 0, max: 0.75, score: 1, level: "Severe Risk" },
  ],
  
  // Debt/EBITDA
  DebtToEBITDA: [
    { min: 0, max: 1.00, score: 10, level: "Minimal Leverage" },
    { min: 1.01, max: 2.00, score: 9, level: "Low Leverage" },
    { min: 2.01, max: 3.00, score: 8, level: "Very Manageable" },
    { min: 3.01, max: 4.00, score: 7, level: "Moderate Risk" },
    { min: 4.01, max: 5.00, score: 6, level: "Slightly Elevated Risk" },
    { min: 5.01, max: 6.00, score: 5, level: "Cautionary" },
    { min: 6.01, max: 7.00, score: 4, level: "High Risk" },
    { min: 7.01, max: 8.00, score: 3, level: "Very High Risk" },
    { min: 8.01, max: 10.00, score: 2, level: "Distressed Leverage" },
    { min: 10.01, max: Number.MAX_VALUE, score: 1, level: "Unsustainable" },
  ],
  
  // Current Ratio
  CurrentRatio: [
    { min: 3.00, max: Number.MAX_VALUE, score: 10, level: "Highly Liquid" },
    { min: 2.50, max: 2.99, score: 9, level: "Very Strong" },
    { min: 2.00, max: 2.49, score: 8, level: "Strong" },
    { min: 1.75, max: 1.99, score: 7, level: "Good" },
    { min: 1.50, max: 1.74, score: 6, level: "Moderate" },
    { min: 1.25, max: 1.49, score: 5, level: "Acceptable" },
    { min: 1.10, max: 1.24, score: 4, level: "Weak" },
    { min: 1.00, max: 1.09, score: 3, level: "Poor" },
    { min: 0.75, max: 0.99, score: 2, level: "Very Poor" },
    { min: 0, max: 0.75, score: 1, level: "Critical" },
  ],
  
  // Interest Coverage
  InterestCoverage: [
    { min: 8.00, max: Number.MAX_VALUE, score: 10, level: "Outstanding" },
    { min: 6.00, max: 7.99, score: 9, level: "Very Strong" },
    { min: 4.50, max: 5.99, score: 8, level: "Strong" },
    { min: 3.50, max: 4.49, score: 7, level: "Good" },
    { min: 2.75, max: 3.49, score: 6, level: "Moderate" },
    { min: 2.00, max: 2.74, score: 5, level: "Acceptable" },
    { min: 1.50, max: 1.99, score: 4, level: "Weak" },
    { min: 1.00, max: 1.49, score: 3, level: "Very Weak" },
    { min: 0.75, max: 0.99, score: 2, level: "High Risk" },
    { min: 0, max: 0.75, score: 1, level: "Severe Risk" },
  ],
  
  // Revenue (in millions)
  Revenue: [
    { min: 500.00, max: Number.MAX_VALUE, score: 10, level: "Highly Stable" },
    { min: 250.00, max: 500.00, score: 9, level: "Strong" },
    { min: 100.00, max: 249.00, score: 8, level: "Very Good" },
    { min: 50.00, max: 99.00, score: 7, level: "Good" },
    { min: 25.00, max: 49.00, score: 6, level: "Moderate" },
    { min: 10.00, max: 24.00, score: 5, level: "Acceptable" },
    { min: 5.00, max: 9.00, score: 4, level: "Small Business Risk" },
    { min: 1.00, max: 4.99, score: 3, level: "High Risk" },
    { min: 0.50, max: 1.00, score: 2, level: "Very High Risk" },
    { min: 0, max: 0.50, score: 1, level: "Micro-Business Risk" },
  ]
};

// Business stability score mapping
export const businessStabilityScoreMapping = {
  // Years in Operation
  YearsInOperation: [
    { min: 15.00, max: Number.MAX_VALUE, score: 10 },
    { min: 10.00, max: 15.00, score: 9 },
    { min: 7.00, max: 10.00, score: 8 },
    { min: 5.00, max: 7.00, score: 7 },
    { min: 3.00, max: 5.00, score: 6 },
    { min: 2.00, max: 3.00, score: 5 },
    { min: 1.00, max: 2.00, score: 4 },
    { min: 0.50, max: 1.00, score: 3 },
    { min: 0.25, max: 0.50, score: 2 },
    { min: 0, max: 0.25, score: 1 },
  ],
  
  // Revenue from Top Customer(s) %
  CustomerConcentration: [
    { min: 0, max: 10, score: 10 },
    { min: 10, max: 15, score: 9 },
    { min: 15, max: 20, score: 8 },
    { min: 20, max: 25, score: 7 },
    { min: 25, max: 30, score: 6 },
    { min: 30, max: 40, score: 5 },
    { min: 40, max: 50, score: 4 },
    { min: 50, max: 60, score: 3 },
    { min: 60, max: 75, score: 2 },
    { min: 75, max: 100, score: 1 },
  ],
  
  // Competitor Count
  CompetitorCount: [
    { min: 0, max: 2, score: 10 },
    { min: 3, max: 5, score: 8 },
    { min: 6, max: 10, score: 6 },
    { min: 11, max: 20, score: 4 },
    { min: 21, max: Number.MAX_VALUE, score: 2 },
  ],
  
  // Customer Retention Rate %
  CustomerRetention: [
    { min: 80, max: 100, score: 10 },
    { min: 60, max: 79, score: 8 },
    { min: 40, max: 59, score: 6 },
    { min: 20, max: 39, score: 4 },
    { min: 0, max: 20, score: 2 },
  ],
};

// Collateral strength score mapping
export const collateralStrengthScoreMapping = {
  // Collateral Type
  CollateralType: {
    "Cash or Marketable Securities": 10,
    "Investment Grade Bonds": 9,
    "Accounts Receivable (High Credit Quality)": 8,
    "Equipment (New, Highly Liquid)": 7,
    "Inventory (Fast-Moving, Liquid)": 6,
    "Real Estate (Well-Located, Low LTV)": 5,
    "Inventory (Slow Moving)": 4,
    "Real Estate (High LTV, Special Purpose)": 3,
    "No Collateral": 1,
  },
  
  // LTV (Loan to Value)
  LTV: [
    { min: 0, max: 30, score: 10 },
    { min: 30, max: 40, score: 9 },
    { min: 40, max: 50, score: 8 },
    { min: 50, max: 60, score: 7 },
    { min: 60, max: 70, score: 6 },
    { min: 70, max: 75, score: 5 },
    { min: 75, max: 80, score: 4 },
    { min: 80, max: 85, score: 3 },
    { min: 85, max: 90, score: 2 },
    { min: 90, max: 100, score: 1 },
  ],
  
  // Collateral Type (Loan Priority)
  CollateralPriority: {
    "Senior Secured (1st Lien)": 10,
    "1st Lien but Shared Collateral": 9,
    "2nd Lien, Strong Sub. Protections": 8,
    "2nd Lien, Limited Sub. Protections": 7,
    "Mezzanine Debt (Some Protections)": 6,
    "Subordinated Debt (Limited Protections)": 5,
    "Convertible Debt": 4,
    "Unsecured Debt": 3,
    "Deep Subordinated Debt": 2,
    "Equity-Like Risk": 1,
  },
};

// Banking & Relationship score mapping
export const bankingRelationshipScoreMapping = {
  // Primary Banking Stability
  PrimaryBankingStability: {
    "10+ Years": 10,
    "7-9 Years": 8,
    "4-6 Years": 6,
    "1-3 Years": 4,
    "< 1 Year": 2,
  },
  
  // Level of Differentiation
  LevelOfDifferentiation: {
    "Highly Unique (Patented/IP Protected, No Close Substitutes)": 10,
    "Moderately Unique (Some Competitors, But Strong Differentiation)": 8,
    "Somewhat Differentiated (Competitors Exist, But Offers Special Features/Branding)": 6,
    "Similar to Competitors (Only Minor Differentiation, Mostly Price-Based Competition)": 4,
    "Commodity Product (No Differentiation, Easily Replicated)": 2,
  },
  
  // Active Relationships
  ActiveRelationships: {
    "1-2": 10,
    "3": 8,
    "4-5": 6,
    "6-7": 4,
    "8+": 2,
  },
  
  // # Missed Payments / Defaults
  MissedPaymentsDefaults: {
    "No Missed Payments": 10,
    "1-2 Late Payments": 8,
    "3-4 Late Payments": 6,
    "5+ Late Payments": 4,
    "Default History": 2,
  },
  
  // Covenant Violations/Loan Mods
  CovenantViolations: {
    "No Violations / Modifications": 10,
    "1 Minor Waiver": 8,
    "2 Minor Waivers": 6,
    "3+ Breaches": 4,
    "Major Restructuring": 2,
  },
  
  // Banking Product Breadth
  BankingProductBreadth: {
    "3+ Banking Services": 10,
    "2 Services": 8,
    "1 Service": 6,
    "No Additional Services": 4,
    "No Active Bank Accounts": 2,
  },
};
