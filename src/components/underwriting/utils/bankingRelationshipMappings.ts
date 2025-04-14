
export const bankingRelationshipScoreMapping = {
  PrimaryBankingStability: {
    "10+ Years": 10,
    "7-9 Years": 8,
    "4-6 Years": 6,
    "1-3 Years": 4,
    "< 1 Year": 2,
  },
  
  LevelOfDifferentiation: {
    "Highly Unique (Patented/IP Protected, No Close Substitutes)": 10,
    "Moderately Unique (Some Competitors, But Strong Differentiation)": 8,
    "Somewhat Differentiated (Competitors Exist, But Offers Special Features/Branding)": 6,
    "Similar to Competitors (Only Minor Differentiation, Mostly Price-Based Competition)": 4,
    "Commodity Product (No Differentiation, Easily Replicated)": 2,
  },
  
  ActiveRelationships: {
    "1-2": 10,
    "3": 8,
    "4-5": 6,
    "6-7": 4,
    "8+": 2,
  },
  
  MissedPaymentsDefaults: {
    "No Missed Payments": 10,
    "1-2 Late Payments": 8,
    "3-4 Late Payments": 6,
    "5+ Late Payments": 4,
    "Default History": 2,
  },
  
  CovenantViolations: {
    "No Violations / Modifications": 10,
    "1 Minor Waiver": 8,
    "2 Minor Waivers": 6,
    "3+ Breaches": 4,
    "Major Restructuring": 2,
  },
  
  BankingProductBreadth: {
    "3+ Banking Services": 10,
    "2 Services": 8,
    "1 Service": 6,
    "No Additional Services": 4,
    "No Active Bank Accounts": 2,
  },
};

