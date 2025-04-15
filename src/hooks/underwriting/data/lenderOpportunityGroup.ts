
export const lenderOpportunityGroup = {
  name: "Lender Opportunity",
  description: "Assessment of borrower's potential for additional banking services",
  weight: 15,
  minScore: 0,
  maxScore: 1,
  criteria: [
    {
      name: "Treasury Services Potential",
      description: "Likelihood of utilizing cash management and treasury services",
      value: "Medium",
      weight: 25,
      minScore: 0,
      maxScore: 1,
      min: 0,
      max: 100,
      step: 5,
      preferredMin: 50,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 50, score: 0, riskLevel: "No Potential" },
        { min: 50, max: 100, score: 1, riskLevel: "Has Potential" }
      ]
    },
    {
      name: "Deposit Relationship",
      description: "Potential deposit volume and account relationships",
      value: "High",
      weight: 25,
      minScore: 0,
      maxScore: 1,
      min: 0,
      max: 100,
      step: 5,
      preferredMin: 60,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 60, score: 0, riskLevel: "No Potential" },
        { min: 60, max: 100, score: 1, riskLevel: "Has Potential" }
      ]
    },
    {
      name: "FX Trading Needs",
      description: "Foreign exchange trading service requirements",
      value: "Low",
      weight: 20,
      minScore: 0,
      maxScore: 1,
      min: 0,
      max: 100,
      step: 5,
      preferredMin: 40,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 40, score: 0, riskLevel: "No FX Needs" },
        { min: 40, max: 100, score: 1, riskLevel: "Has FX Needs" }
      ]
    },
    {
      name: "Credit Card Services",
      description: "Corporate credit card program potential",
      value: "Medium",
      weight: 15,
      minScore: 0,
      maxScore: 1,
      min: 0,
      max: 100,
      step: 5,
      preferredMin: 50,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 50, score: 0, riskLevel: "No Interest" },
        { min: 50, max: 100, score: 1, riskLevel: "Interested" }
      ]
    },
    {
      name: "Investment Banking",
      description: "Potential for investment banking services (M&A, capital markets)",
      value: "Low",
      weight: 15,
      minScore: 0,
      maxScore: 1,
      min: 0,
      max: 100,
      step: 5,
      preferredMin: 30,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 30, score: 0, riskLevel: "No Potential" },
        { min: 30, max: 100, score: 1, riskLevel: "Has Potential" }
      ]
    }
  ]
};

