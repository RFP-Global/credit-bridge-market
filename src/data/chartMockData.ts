
// Mock data for the TimeSeriesLineChart
export const timeSeriesData = [
  { month: "Jan", revenue: 120000, expenses: 80000, profit: 40000 },
  { month: "Feb", revenue: 140000, expenses: 85000, profit: 55000 },
  { month: "Mar", revenue: 160000, expenses: 90000, profit: 70000 },
  { month: "Apr", revenue: 180000, expenses: 95000, profit: 85000 },
  { month: "May", revenue: 200000, expenses: 100000, profit: 100000 },
  { month: "Jun", revenue: 220000, expenses: 110000, profit: 110000 },
];

export const timeSeriesLines = [
  { dataKey: "revenue", name: "Revenue", color: "#33bbef" },
  { dataKey: "expenses", name: "Expenses", color: "#F97316" },
  { dataKey: "profit", name: "Profit", color: "#10b981" },
];

// Mock data for the IndustryBarChart
export const industryBarData = [
  { name: "Credit Score", value: 750, color: "#33bbef" },
  { name: "Industry Avg", value: 680, color: "#8B5CF6" },
  { name: "Sector Min", value: 620, color: "#F97316" },
  { name: "Sector Max", value: 820, color: "#10b981" },
];
