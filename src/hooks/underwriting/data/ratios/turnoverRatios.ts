
export const turnoverRatios = [
  {
    name: "Accounts Receivable Turnover Ratio",
    description: "Measures how efficiently a company collects its receivables",
    value: "Net Credit Sales / Average Accounts Receivable",
    weight: 5,
    minScore: 4.0,
    maxScore: 8.0,
    min: 0,
    max: 20,
    step: 0.1,
    unit: "times",
    enabled: true
  },
  {
    name: "Inventory Turnover Ratio",
    description: "Indicates how many times inventory is sold and replaced over a period",
    value: "Cost of Goods Sold / Average Inventory",
    weight: 5,
    minScore: 4.0,
    maxScore: 8.0,
    min: 0,
    max: 20,
    step: 0.1,
    unit: "times",
    enabled: true
  },
  {
    name: "Asset Turnover Ratio",
    description: "Measures the efficiency of company's assets in generating revenue",
    value: "Net Sales / Average Total Assets",
    weight: 5,
    minScore: 4.0,
    maxScore: 8.0,
    min: 0,
    max: 5,
    step: 0.1,
    unit: "times",
    enabled: true
  }
];
