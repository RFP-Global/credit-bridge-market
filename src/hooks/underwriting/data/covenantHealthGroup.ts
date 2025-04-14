import { CriteriaGroup } from "@/components/underwriting/types";

export const covenantHealthGroup: CriteriaGroup = {
  name: "Covenant Health",
  description: "Compliance with existing loan covenants",
  weight: 15,
  minScore: 4.7,
  maxScore: 4.8,
  criteria: [
    {
      name: "Covenant Compliance",
      description: "Historical compliance with financial covenants",
      value: "High",
      weight: 40,
      minScore: 5,
      maxScore: 5,
      min: 1,
      max: 5,
      step: 1,
      actualMin: 0,
      actualMax: 10,
      actualValue: 5,
      actualUnit: "",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 2, score: 5 },
        { min: 2, max: 4, score: 4 },
        { min: 4, max: 6, score: 3 },
        { min: 6, max: 8, score: 2 },
        { min: 8, max: 10, score: 1 }
      ]
    },
    {
      name: "Primary Banking Relationship",
      description: "Strength of primary banking relationship",
      value: "Strong",
      weight: 20,
      minScore: 5,
      maxScore: 5,
      min: 1,
      max: 5,
      step: 1,
      actualMin: 0,
      actualMax: 10,
      actualValue: 5,
      actualUnit: "",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 2, score: 5 },
        { min: 2, max: 4, score: 4 },
        { min: 4, max: 6, score: 3 },
        { min: 6, max: 8, score: 2 },
        { min: 8, max: 10, score: 1 }
      ]
    },
    {
      name: "Payment History",
      description: "Historical payment performance",
      value: "Excellent",
      weight: 20,
      minScore: 5,
      maxScore: 5,
      min: 1,
      max: 5,
      step: 1,
      actualMin: 0,
      actualMax: 10,
      actualValue: 5,
      actualUnit: "",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 2, score: 5 },
        { min: 2, max: 4, score: 4 },
        { min: 4, max: 6, score: 3 },
        { min: 6, max: 8, score: 2 },
        { min: 8, max: 10, score: 1 }
      ]
    },
    {
      name: "Covenant Flexibility",
      description: "Flexibility within existing covenant structure",
      value: "Medium",
      weight: 20,
      minScore: 4,
      maxScore: 4,
      min: 1,
      max: 5,
      step: 1,
      actualMin: 0,
      actualMax: 10,
      actualValue: 4,
      actualUnit: "",
      enabled: true,
      scoreMapping: [
        { min: 0, max: 2, score: 5 },
        { min: 2, max: 4, score: 4 },
        { min: 4, max: 6, score: 3 },
        { min: 6, max: 8, score: 2 },
        { min: 8, max: 10, score: 1 }
      ]
    }
  ]
};
