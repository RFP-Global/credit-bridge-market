import { CriteriaGroup } from "@/components/underwriting/types";

export const managementStrengthGroup: CriteriaGroup = {
  name: "Management Strength",
  description: "Assesses the experience and capability of leadership team",
  weight: 15,
  minScore: 4.8,
  maxScore: 4.9,
  criteria: [
    {
      name: "Leadership Depth",
      description: "Experience level of management team",
      value: "Very High",
      weight: 40,
      minScore: 5,
      maxScore: 5,
      min: 1,
      max: 5,
      step: 1,
      actualMin: 1,
      actualMax: 10,
      actualValue: 9,
      actualUnit: "",
      enabled: true,
      scoreMapping: [
        { min: 1, max: 3, score: 1 },
        { min: 3, max: 5, score: 2 },
        { min: 5, max: 6, score: 3 },
        { min: 6, max: 8, score: 4 },
        { min: 8, max: 10, score: 5 }
      ]
    },
    {
      name: "Ownership/Management Alignment",
      description: "Alignment between ownership and management",
      value: "High",
      weight: 30,
      minScore: 5,
      maxScore: 5,
      min: 1,
      max: 5,
      step: 1,
      actualMin: 1,
      actualMax: 10,
      actualValue: 8,
      actualUnit: "",
      enabled: true,
      scoreMapping: [
        { min: 1, max: 3, score: 1 },
        { min: 3, max: 5, score: 2 },
        { min: 5, max: 6, score: 3 },
        { min: 6, max: 8, score: 4 },
        { min: 8, max: 10, score: 5 }
      ]
    },
    {
      name: "Succession Plan",
      description: "Quality of transition planning",
      value: "Moderate",
      weight: 30,
      minScore: 4,
      maxScore: 4,
      min: 1,
      max: 5,
      step: 1,
      actualMin: 1,
      actualMax: 10,
      actualValue: 7,
      actualUnit: "",
      enabled: true,
      scoreMapping: [
        { min: 1, max: 3, score: 1 },
        { min: 3, max: 5, score: 2 },
        { min: 5, max: 6, score: 3 },
        { min: 6, max: 8, score: 4 },
        { min: 8, max: 10, score: 5 }
      ]
    }
  ]
};
