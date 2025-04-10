import { CriteriaGroup, ScoreThreshold } from "@/components/underwriting/types";

export const initialScoreThresholds: ScoreThreshold[] = [
  { threshold: 4.5, color: "text-green-500" },
  { threshold: 3.5, color: "text-blue-500" },
  { threshold: 2.5, color: "text-yellow-500" },
  { threshold: 1, color: "text-red-500" },
];

export const initialCriteriaGroups: CriteriaGroup[] = [
  {
    name: "Financial Strength",
    description: "Assessment of the company's financial stability and performance",
    weight: 35,
    score: 4.2,
    criteria: [
      {
        name: "Debt/EBITDA",
        description: "Ratio of debt to earnings before interest, taxes, depreciation and amortization",
        value: "2.8x",
        weight: 30,
        score: 4.1,
        min: 0,
        max: 10,
        step: 0.1,
        preferredMin: 1.5,
        preferredMax: 3.0,
        unit: "x",
        actualMin: 0,
        actualMax: 10,
        actualValue: 2.8,
        actualUnit: "x",
        useRangeSlider: true,
        scoreMapping: [
          { min: 0, max: 2, score: 5 },
          { min: 2, max: 4, score: 4 },
          { min: 4, max: 6, score: 3 },
          { min: 6, max: 8, score: 2 },
          { min: 8, max: 10, score: 1 }
        ]
      },
      {
        name: "Revenue Growth",
        description: "Percentage increase in a company’s revenue during a specific period",
        value: "15%",
        weight: 25,
        score: 3.8,
        min: 0,
        max: 50,
        step: 0.5,
        preferredMin: 10,
        preferredMax: 25,
        unit: "%",
        actualMin: 0,
        actualMax: 50,
        actualValue: 15,
        actualUnit: "%",
        scoreMapping: [
          { min: 0, max: 10, score: 1 },
          { min: 10, max: 20, score: 3 },
          { min: 20, max: 30, score: 4 },
          { min: 30, max: 50, score: 5 }
        ]
      },
      {
        name: "Gross Margin",
        description: "The percentage of revenue that exceeds the cost of goods sold (COGS)",
        value: "60%",
        weight: 20,
        score: 4.5,
        min: 20,
        max: 80,
        step: 1,
        preferredMin: 50,
        preferredMax: 70,
        unit: "%",
        actualMin: 20,
        actualMax: 80,
        actualValue: 60,
        actualUnit: "%",
        scoreMapping: [
          { min: 20, max: 40, score: 1 },
          { min: 40, max: 50, score: 3 },
          { min: 50, max: 60, score: 4 },
          { min: 60, max: 80, score: 5 }
        ]
      },
      {
        name: "Cash Flow",
        description: "The net amount of cash and cash-equivalents moving into and out of a company",
        value: "$2M",
        weight: 25,
        score: 4.0,
        min: 0,
        max: 10,
        step: 0.1,
        unit: "$M",
        actualMin: 0,
        actualMax: 10,
        actualValue: 2,
        actualUnit: "$M",
        scoreMapping: [
          { min: 0, max: 1, score: 2 },
          { min: 1, max: 3, score: 4 },
          { min: 3, max: 10, score: 5 }
        ]
      }
    ]
  },
  {
    name: "Operational Efficiency",
    description: "Evaluation of how well the company manages its resources",
    weight: 25,
    score: 3.5,
    criteria: [
      {
        name: "Inventory Turnover",
        description: "How many times a company's inventory is sold and replaced over a period",
        value: "5x",
        weight: 35,
        score: 3.2,
        min: 1,
        max: 10,
        step: 0.1,
        preferredMin: 3,
        preferredMax: 7,
        unit: "x",
        actualMin: 1,
        actualMax: 10,
        actualValue: 5,
        actualUnit: "x",
        scoreMapping: [
          { min: 1, max: 3, score: 2 },
          { min: 3, max: 5, score: 4 },
          { min: 5, max: 7, score: 5 },
          { min: 7, max: 10, score: 3 }
        ]
      },
      {
        name: "Receivables Turnover",
        description: "How efficiently a company collects its accounts receivable",
        value: "12x",
        weight: 30,
        score: 3.7,
        min: 5,
        max: 20,
        step: 0.5,
        preferredMin: 8,
        preferredMax: 15,
        unit: "x",
        actualMin: 5,
        actualMax: 20,
        actualValue: 12,
        actualUnit: "x",
        scoreMapping: [
          { min: 5, max: 8, score: 2 },
          { min: 8, max: 12, score: 4 },
          { min: 12, max: 15, score: 5 },
          { min: 15, max: 20, score: 3 }
        ]
      },
      {
        name: "Asset Turnover",
        description: "How efficiently a company uses its assets to generate sales",
        value: "1.5x",
        weight: 35,
        score: 3.6,
        min: 0.5,
        max: 3,
        step: 0.1,
        preferredMin: 1,
        preferredMax: 2,
        unit: "x",
        actualMin: 0.5,
        actualMax: 3,
        actualValue: 1.5,
        actualUnit: "x",
        scoreMapping: [
          { min: 0.5, max: 1, score: 2 },
          { min: 1, max: 1.5, score: 4 },
          { min: 1.5, max: 2, score: 5 },
          { min: 2, max: 3, score: 3 }
        ]
      }
    ]
  },
  {
    name: "Market Position",
    description: "Analysis of the company's standing within its industry",
    weight: 20,
    score: 4.0,
    criteria: [
      {
        name: "Market Share",
        description: "Percentage of total sales volume in a market captured by a brand, product, or company",
        value: "20%",
        weight: 40,
        score: 4.2,
        min: 0,
        max: 50,
        step: 0.5,
        preferredMin: 10,
        preferredMax: 30,
        unit: "%",
        actualMin: 0,
        actualMax: 50,
        actualValue: 20,
        actualUnit: "%",
        scoreMapping: [
          { min: 0, max: 10, score: 1 },
          { min: 10, max: 20, score: 4 },
          { min: 20, max: 30, score: 5 },
          { min: 30, max: 50, score: 3 }
        ]
      },
      {
        name: "Brand Recognition",
        description: "Extent to which a brand is familiar to potential customers",
        value: "High",
        weight: 30,
        score: 3.9,
        min: 1,
        max: 5,
        step: 1,
        preferredMin: 3,
        preferredMax: 5,
        unit: "",
        actualMin: 1,
        actualMax: 5,
        actualValue: 4,
        actualUnit: "",
        scoreMapping: [
          { min: 1, max: 2, score: 1 },
          { min: 2, max: 3, score: 3 },
          { min: 3, max: 4, score: 4 },
          { min: 4, max: 5, score: 5 }
        ]
      },
      {
        name: "Customer Loyalty",
        description: "Tendency of clients or customers to repeatedly purchase goods or services from a company",
        value: "Medium",
        weight: 30,
        score: 4.0,
        min: 1,
        max: 5,
        step: 1,
        preferredMin: 3,
        preferredMax: 5,
        unit: "",
        actualMin: 1,
        actualMax: 5,
        actualValue: 3,
        actualUnit: "",
        scoreMapping: [
          { min: 1, max: 2, score: 1 },
          { min: 2, max: 3, score: 3 },
          { min: 3, max: 4, score: 4 },
          { min: 4, max: 5, score: 5 }
        ]
      }
    ]
  },
  {
    name: "Management Experience",
    description: "Assessment of the leadership team's capabilities and track record",
    weight: 20,
    score: 3.8,
    criteria: [
      {
        name: "Years in Industry",
        description: "Total years of experience of the management team in the relevant industry",
        value: "15 years",
        weight: 40,
        score: 3.5,
        min: 0,
        max: 30,
        step: 1,
        preferredMin: 10,
        preferredMax: 20,
        unit: "years",
        actualMin: 0,
        actualMax: 30,
        actualValue: 15,
        actualUnit: "years",
        scoreMapping: [
          { min: 0, max: 5, score: 1 },
          { min: 5, max: 10, score: 3 },
          { min: 10, max: 20, score: 5 },
          { min: 20, max: 30, score: 4 }
        ]
      },
      {
        name: "Prior Successes",
        description: "Number of successful ventures or projects led by the management team",
        value: "3",
        weight: 30,
        score: 4.2,
        min: 0,
        max: 5,
        step: 1,
        preferredMin: 2,
        preferredMax: 4,
        unit: "",
        actualMin: 0,
        actualMax: 5,
        actualValue: 3,
        actualUnit: "",
        scoreMapping: [
          { min: 0, max: 1, score: 1 },
          { min: 1, max: 2, score: 3 },
          { min: 2, max: 4, score: 5 },
          { min: 4, max: 5, score: 4 }
        ]
      },
      {
        name: "Strategic Planning",
        description: "Quality and foresight demonstrated in the company's strategic plans",
        value: "Comprehensive",
        weight: 30,
        score: 3.7,
        min: 1,
        max: 5,
        step: 1,
        preferredMin: 3,
        preferredMax: 5,
        unit: "",
        actualMin: 1,
        actualMax: 5,
        actualValue: 4,
        actualUnit: "",
        scoreMapping: [
          { min: 1, max: 2, score: 1 },
          { min: 2, max: 3, score: 3 },
          { min: 3, max: 4, score: 4 },
          { min: 4, max: 5, score: 5 }
        ]
      }
    ]
  }
];
