
import { useState } from "react";

export const useCategoryDetails = () => {
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    score: number;
    components: { name: string; score: number; description?: string }[];
  } | null>(null);

  const handleCategoryClick = (categoryName: string, categoryScore: number) => {
    const categoryComponents = {
      "Financial Strength": [
        { name: "EBITDA", score: Math.round(categoryScore * 0.9), description: "Earnings Before Interest, Taxes, Depreciation, and Amortization" },
        { name: "Debt/EBITDA", score: Math.round(categoryScore * 1.1), description: "Ratio of total debt to EBITDA" },
        { name: "Current Ratio", score: Math.round(categoryScore * 0.95), description: "Current assets divided by current liabilities" },
        { name: "Revenue Growth", score: Math.round(categoryScore * 1.05), description: "Year-over-year revenue growth" }
      ],
      "Business Stability": [
        { name: "Years in Business", score: Math.round(categoryScore * 0.9), description: "Evaluates the longevity and establishment of the business" },
        { name: "Revenue Consistency", score: Math.round(categoryScore * 1.1), description: "Measures the stability of revenue streams over time" },
        { name: "Management Experience", score: Math.round(categoryScore * 0.95), description: "Assesses leadership experience and industry knowledge" }
      ],
      "Competitive Position": [
        { name: "Market Share", score: Math.round(categoryScore * 1.05), description: "Percentage of market controlled relative to competitors" },
        { name: "Product Differentiation", score: Math.round(categoryScore * 0.9), description: "Uniqueness of offerings compared to competitors" },
        { name: "Customer Loyalty", score: Math.round(categoryScore * 1.1), description: "Strength of customer relationships and retention" }
      ],
      "Collateral Strength": [
        { name: "Asset Quality", score: Math.round(categoryScore * 0.95), description: "Value and liquidity of assets being used as collateral" },
        { name: "Loan-to-Value Ratio", score: Math.round(categoryScore * 1.05), description: "Ratio of loan amount to the value of assets" },
        { name: "Asset Depreciation Rate", score: Math.round(categoryScore * 0.9), description: "Speed at which collateral assets lose value" }
      ],
      "Industry & Market Risk": [
        { name: "Industry Growth Rate", score: Math.round(categoryScore * 1.1), description: "Overall growth trends in the company's industry" },
        { name: "Market Volatility", score: Math.round(categoryScore * 0.9), description: "Stability of the market where the company operates" },
        { name: "Regulatory Environment", score: Math.round(categoryScore * 0.95), description: "Impact of regulations on business operations" }
      ],
      "Banking Relationship": [
        { name: "Credit History", score: Math.round(categoryScore * 1.05), description: "Past payment behavior with financial institutions" },
        { name: "Relationship Longevity", score: Math.round(categoryScore * 0.95), description: "Duration of banking relationships" },
        { name: "Product Utilization", score: Math.round(categoryScore * 1.0), description: "Range of financial products used by the business" }
      ]
    };
    
    const normalizeComponents = (components: any[]) => {
      return components.map(comp => ({
        ...comp,
        score: Math.min(100, Math.max(0, comp.score))
      }));
    };
    
    setSelectedCategory({
      name: categoryName,
      score: categoryScore,
      components: normalizeComponents(categoryComponents[categoryName as keyof typeof categoryComponents] || [])
    });
    
    setCategoryModalOpen(true);
  };

  return {
    categoryModalOpen,
    selectedCategory,
    setCategoryModalOpen,
    handleCategoryClick
  };
};
