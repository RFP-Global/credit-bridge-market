
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
      unit: "%",
      singleSlider: true,
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
      maxScore: 3,
      min: 0,
      max: 100,
      step: 33.33,
      preferredMin: 60,
      unit: "%",
      singleSlider: true,
      enabled: true,
      scoreMapping: [
        { min: 0, max: 33.33, score: 1, riskLevel: "Low Volume" },
        { min: 33.33, max: 66.66, score: 2, riskLevel: "Medium Volume" },
        { min: 66.66, max: 100, score: 3, riskLevel: "High Volume" }
      ]
    },
    {
      name: "FX Trading Needs",
      description: "Foreign exchange trading service requirements",
      value: "Low",
      weight: 20,
      minScore: 1,
      maxScore: 3,
      min: 0,
      max: 100,
      step: 33.33,
      preferredMin: 40,
      unit: "%",
      singleSlider: true,
      enabled: true,
      scoreMapping: [
        { min: 0, max: 33.33, score: 1, riskLevel: "Minimal FX Needs" },
        { min: 33.33, max: 66.66, score: 2, riskLevel: "Moderate FX Needs" },
        { min: 66.66, max: 100, score: 3, riskLevel: "Significant FX Needs" }
      ]
    },
    {
      name: "Credit Card Services",
      description: "Corporate credit card program potential",
      value: "Medium",
      weight: 15,
      minScore: 1,
      maxScore: 3,
      min: 0,
      max: 100,
      step: 33.33,
      preferredMin: 50,
      unit: "%",
      singleSlider: true,
      enabled: true,
      scoreMapping: [
        { min: 0, max: 33.33, score: 1, riskLevel: "Limited Interest" },
        { min: 33.33, max: 66.66, score: 2, riskLevel: "Moderate Interest" },
        { min: 66.66, max: 100, score: 3, riskLevel: "High Interest" }
      ]
    },
    {
      name: "Investment Banking",
      description: "Potential for investment banking services (M&A, capital markets)",
      value: "Low",
      weight: 15,
      minScore: 1,
      maxScore: 3,
      min: 0,
      max: 100,
      step: 33.33,
      preferredMin: 30,
      unit: "%",
      singleSlider: true,
      enabled: true,
      scoreMapping: [
        { min: 0, max: 33.33, score: 1, riskLevel: "Low Potential" },
        { min: 33.33, max: 66.66, score: 2, riskLevel: "Medium Potential" },
        { min: 66.66, max: 100, score: 3, riskLevel: "High Potential" }
      ]
    }
  ]
};

