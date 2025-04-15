export const lenderOpportunityGroup = {
  name: "Lender Opportunity",
  description: "Assessment of borrower's potential for additional banking services",
  weight: 15,
  minScore: 1,
  maxScore: 10,
  criteria: [
    {
      name: "Treasury Services Potential",
      description: "Likelihood of utilizing cash management and treasury services",
      value: "Medium",
      weight: 25,
      minScore: 1,
      maxScore: 3,
      min: 0,
      max: 100,
      step: 33.33,
      preferredMin: 50,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 33.33, score: 1, riskLevel: "Low Potential" },
        { min: 33.33, max: 66.66, score: 2, riskLevel: "Medium Potential" },
        { min: 66.66, max: 100, score: 3, riskLevel: "High Potential" }
      ]
    },
    {
      name: "Deposit Relationship",
      description: "Potential deposit volume and account relationships",
      value: "High",
      weight: 25,
      minScore: 1,
      maxScore: 10,
      min: 0,
      max: 100,
      step: 5,
      preferredMin: 60,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 40, score: 3, riskLevel: "Low Volume" },
        { min: 40, max: 70, score: 6, riskLevel: "Medium Volume" },
        { min: 70, max: 100, score: 9, riskLevel: "High Volume" }
      ]
    },
    {
      name: "FX Trading Needs",
      description: "Foreign exchange trading service requirements",
      value: "Low",
      weight: 20,
      minScore: 1,
      maxScore: 10,
      min: 0,
      max: 100,
      step: 5,
      preferredMin: 40,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 25, score: 3, riskLevel: "Minimal FX Needs" },
        { min: 25, max: 75, score: 6, riskLevel: "Moderate FX Needs" },
        { min: 75, max: 100, score: 9, riskLevel: "Significant FX Needs" }
      ]
    },
    {
      name: "Credit Card Services",
      description: "Corporate credit card program potential",
      value: "Medium",
      weight: 15,
      minScore: 1,
      maxScore: 10,
      min: 0,
      max: 100,
      step: 5,
      preferredMin: 50,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 30, score: 3, riskLevel: "Limited Interest" },
        { min: 30, max: 70, score: 6, riskLevel: "Moderate Interest" },
        { min: 70, max: 100, score: 9, riskLevel: "High Interest" }
      ]
    },
    {
      name: "Investment Banking",
      description: "Potential for investment banking services (M&A, capital markets)",
      value: "Low",
      weight: 15,
      minScore: 1,
      maxScore: 10,
      min: 0,
      max: 100,
      step: 5,
      preferredMin: 30,
      preferredMax: 100,
      unit: "%",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 20, score: 3, riskLevel: "Low Potential" },
        { min: 20, max: 60, score: 6, riskLevel: "Medium Potential" },
        { min: 60, max: 100, score: 9, riskLevel: "High Potential" }
      ]
    }
  ]
};
