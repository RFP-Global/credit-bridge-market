
import { useState } from "react";
import { CriteriaGroup, ScoreThreshold } from "@/components/underwriting/types";

export const useUnderwritingState = () => {
  const [activeTab, setActiveTab] = useState<string>("preferences");
  const [totalScore, setTotalScore] = useState(4.45);
  
  const [scoreThresholds, setScoreThresholds] = useState<ScoreThreshold[]>([
    { threshold: 4.5, color: "text-green-500" },
    { threshold: 3.5, color: "text-blue-500" },
    { threshold: 2.5, color: "text-yellow-500" },
    { threshold: 0, color: "text-red-500" }
  ]);
  
  const [criteriaGroups, setCriteriaGroups] = useState<CriteriaGroup[]>([
    {
      name: "Financial Strength",
      description: "Measures the overall financial health of the borrower",
      weight: 25,
      score: 4.10,
      criteria: [
        {
          name: "EBITDA",
          description: "Earnings Before Interest, Taxes, Depreciation, and Amortization",
          value: "$4.5M",
          weight: 40,
          score: 4,
          min: 1,
          max: 5,
          step: 1,
          unit: "$M",
          preferredMin: 3.5,
          preferredMax: 10
        },
        {
          name: "Debt/EBITDA",
          description: "Ratio of total debt to EBITDA",
          value: "3.6x",
          weight: 25,
          score: 3,
          min: 1,
          max: 5,
          step: 1,
          unit: "x",
          preferredMin: 2.0,
          preferredMax: 4.0
        },
        {
          name: "Current Ratio",
          description: "Current assets divided by current liabilities",
          value: "1.8x",
          weight: 20,
          score: 4,
          min: 1,
          max: 5,
          step: 1,
          unit: "x",
          preferredMin: 1.5,
          preferredMax: 3.0
        },
        {
          name: "Revenue Growth",
          description: "Year-over-year revenue growth",
          value: "$10.5M",
          weight: 15,
          score: 5,
          min: 1,
          max: 5,
          step: 1,
          unit: "%",
          preferredMin: 5,
          preferredMax: 25
        }
      ]
    },
    {
      name: "Business Stability",
      description: "Evaluates the operational stability of the business",
      weight: 20,
      score: 3.4,
      criteria: [
        {
          name: "Years in Business",
          description: "Number of years since company founding",
          value: "14 years",
          weight: 35,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Revenue Concentration",
          description: "Dependency on key customers",
          value: "32%",
          weight: 25,
          score: 3,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Geographic Footprint",
          description: "Regional diversity of operations",
          value: "7 states",
          weight: 40,
          score: 3,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
    {
      name: "Competitive Positioning",
      description: "Evaluates market position relative to competitors",
      weight: 15,
      score: 4.35,
      criteria: [
        {
          name: "Market Share",
          description: "Percentage of total addressable market",
          value: "7%",
          weight: 30,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Differentiation Score",
          description: "Uniqueness of product/service offering",
          value: "High",
          weight: 35,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Barrier to Entry Score",
          description: "Difficulty for new competitors to enter market",
          value: "Medium-High",
          weight: 35,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
    {
      name: "Management Strength",
      description: "Assesses the experience and capability of leadership team",
      weight: 15,
      score: 4.8,
      criteria: [
        {
          name: "Leadership Depth",
          description: "Experience level of management team",
          value: "Very High",
          weight: 40,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Ownership/Management Alignment",
          description: "Alignment between ownership and management",
          value: "High",
          weight: 30,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Succession Plan",
          description: "Quality of transition planning",
          value: "Moderate",
          weight: 30,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
    {
      name: "Industry & Market Risk",
      description: "Evaluates sector-specific risks and market dynamics",
      weight: 25,
      score: 3.6,
      criteria: [
        {
          name: "Industry Volatility",
          description: "Historical stability of the industry",
          value: "Moderate",
          weight: 30,
          score: 3,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Market Growth",
          description: "Projected growth rate of target market",
          value: "Growing/Predictable",
          weight: 40,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Regulatory Risk",
          description: "Exposure to regulatory changes",
          value: "Moderate-High",
          weight: 30,
          score: 3,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    },
    {
      name: "Covenant Health",
      description: "Compliance with existing loan covenants",
      weight: 15,
      score: 4.7,
      criteria: [
        {
          name: "Covenant Compliance",
          description: "Historical compliance with financial covenants",
          value: "High",
          weight: 40,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Primary Banking Relationship",
          description: "Strength of primary banking relationship",
          value: "Strong",
          weight: 20,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Payment History",
          description: "Historical payment performance",
          value: "Excellent",
          weight: 20,
          score: 5,
          min: 1,
          max: 5,
          step: 1
        },
        {
          name: "Covenant Flexibility",
          description: "Flexibility within existing covenant structure",
          value: "Medium",
          weight: 20,
          score: 4,
          min: 1,
          max: 5,
          step: 1
        }
      ]
    }
  ]);

  return {
    activeTab,
    setActiveTab,
    totalScore,
    setTotalScore,
    scoreThresholds,
    setScoreThresholds,
    criteriaGroups,
    setCriteriaGroups
  };
};
