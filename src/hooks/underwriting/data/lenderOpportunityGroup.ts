export const lenderOpportunityGroup = {
  name: "Lender Opportunity",
  description: "Assessment of borrower's potential for additional banking services",
  weight: 15,
  minScore: 1,
  maxScore: 3,
  criteria: [
    {
      name: "Treasury Services Potential",
      description: "Likelihood of utilizing cash management and treasury services",
      value: "Medium",
      weight: 25,
      minScore: 1,
      maxScore: 3,
      min: 1,
      max: 3,
      step: 1,
      preferredMin: 2,
      unit: "",
      singleSlider: true,
      enabled: true,
      scoreMapping: [
        { min: 1, max: 1.1, score: 1, riskLevel: "Low Potential" },
        { min: 2, max: 2.1, score: 2, riskLevel: "Medium Potential" },
        { min: 3, max: 3.1, score: 3, riskLevel: "High Potential" }
      ]
    },
    {
      name: "Deposit Relationship",
      description: "Potential deposit volume and account relationships",
      value: "High",
      weight: 25,
      minScore: 1,
      maxScore: 3,
      min: 1,
      max: 3,
      step: 1,
      preferredMin: 3,
      unit: "",
      singleSlider: true,
      enabled: true,
      scoreMapping: [
        { min: 1, max: 1.1, score: 1, riskLevel: "Low Volume" },
        { min: 2, max: 2.1, score: 2, riskLevel: "Medium Volume" },
        { min: 3, max: 3.1, score: 3, riskLevel: "High Volume" }
      ]
    },
    {
      name: "FX Trading Needs",
      description: "Foreign exchange trading service requirements",
      value: "Low",
      weight: 20,
      minScore: 1,
      maxScore: 3,
      min: 1,
      max: 3,
      step: 1,
      preferredMin: 1,
      unit: "",
      singleSlider: true,
      enabled: true,
      scoreMapping: [
        { min: 1, max: 1.1, score: 1, riskLevel: "Minimal FX Needs" },
        { min: 2, max: 2.1, score: 2, riskLevel: "Moderate FX Needs" },
        { min: 3, max: 3.1, score: 3, riskLevel: "Significant FX Needs" }
      ]
    },
    {
      name: "Credit Card Services",
      description: "Corporate credit card program potential",
      value: "Medium",
      weight: 15,
      minScore: 1,
      maxScore: 3,
      min: 1,
      max: 3,
      step: 1,
      preferredMin: 2,
      unit: "",
      singleSlider: true,
      enabled: true,
      scoreMapping: [
        { min: 1, max: 1.1, score: 1, riskLevel: "Limited Interest" },
        { min: 2, max: 2.1, score: 2, riskLevel: "Moderate Interest" },
        { min: 3, max: 3.1, score: 3, riskLevel: "High Interest" }
      ]
    },
    {
      name: "Investment Banking",
      description: "Potential for investment banking services (M&A, capital markets)",
      value: "Low",
      weight: 15,
      minScore: 1,
      maxScore: 3,
      min: 1,
      max: 3,
      step: 1,
      preferredMin: 1,
      unit: "",
      singleSlider: true,
      enabled: true,
      scoreMapping: [
        { min: 1, max: 1.1, score: 1, riskLevel: "Low Potential" },
        { min: 2, max: 2.1, score: 2, riskLevel: "Medium Potential" },
        { min: 3, max: 3.1, score: 3, riskLevel: "High Potential" }
      ]
    }
  ]
};
