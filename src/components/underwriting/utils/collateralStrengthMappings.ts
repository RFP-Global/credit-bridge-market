
export const collateralStrengthScoreMapping = {
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

