
export const financialRatiosScoreMapping = {
  CurrentRatio: [
    { min: 3.00, max: Number.MAX_VALUE, score: 5, level: "Exceptional liquidity; strong cash cushion" },
    { min: 2.50, max: 2.99, score: 5, level: "Very strong short-term liquidity" },
    { min: 2.00, max: 2.49, score: 4, level: "Strong liquidity, comfortably above most lending norms" },
    { min: 1.75, max: 1.99, score: 4, level: "Solid buffer, typical of well-managed mid-market firms" },
    { min: 1.50, max: 1.74, score: 3, level: "Acceptable but slightly tighter liquidity" },
    { min: 1.25, max: 1.49, score: 3, level: "Manageable but may raise caution for certain lenders" },
    { min: 1.00, max: 1.24, score: 2, level: "Tight liquidity; needs monitoring" },
    { min: 0.85, max: 0.99, score: 2, level: "Below 1.0 – potential working capital shortfall" },
    { min: 0.60, max: 0.84, score: 1, level: "Weak liquidity; at risk of cash flow issues" },
    { min: -Infinity, max: 0.59, score: 1, level: "Severely constrained liquidity; likely distressed" }
  ],
  
  DSCR: [
    { min: 3.00, max: Number.MAX_VALUE, score: 5, level: "Exceptional" },
    { min: 2.50, max: 2.99, score: 5, level: "Very Strong" },
    { min: 2.00, max: 2.49, score: 4, level: "Strong" },
    { min: 1.75, max: 1.99, score: 4, level: "Good" },
    { min: 1.50, max: 1.74, score: 3, level: "Moderate" },
    { min: 1.25, max: 1.49, score: 3, level: "Acceptable" },
    { min: 1.10, max: 1.24, score: 2, level: "Weak" },
    { min: 1.00, max: 1.09, score: 2, level: "Very Weak" },
    { min: 0.75, max: 0.99, score: 1, level: "High Risk" },
    { min: 0, max: 0.75, score: 1, level: "Severe Risk" },
  ],
  
  DebtToEBITDA: [
    { min: 0, max: 1.00, score: 5, level: "Minimal Leverage" },
    { min: 1.01, max: 2.00, score: 5, level: "Low Leverage" },
    { min: 2.01, max: 3.00, score: 4, level: "Very Manageable" },
    { min: 3.01, max: 4.00, score: 4, level: "Moderate Risk" },
    { min: 4.01, max: 5.00, score: 3, level: "Slightly Elevated Risk" },
    { min: 5.01, max: 6.00, score: 3, level: "Cautionary" },
    { min: 6.01, max: 7.00, score: 2, level: "High Risk" },
    { min: 7.01, max: 8.00, score: 2, level: "Very High Risk" },
    { min: 8.01, max: 10.00, score: 1, level: "Distressed Leverage" },
    { min: 10.01, max: Number.MAX_VALUE, score: 1, level: "Unsustainable" },
  ],
  
  InterestCoverage: [
    { min: 8.00, max: Number.MAX_VALUE, score: 5, level: "Outstanding" },
    { min: 6.00, max: 7.99, score: 5, level: "Very Strong" },
    { min: 4.50, max: 5.99, score: 4, level: "Strong" },
    { min: 3.50, max: 4.49, score: 4, level: "Good" },
    { min: 2.75, max: 3.49, score: 3, level: "Moderate" },
    { min: 2.00, max: 2.74, score: 3, level: "Acceptable" },
    { min: 1.50, max: 1.99, score: 2, level: "Weak" },
    { min: 1.00, max: 1.49, score: 2, level: "Very Weak" },
    { min: 0.75, max: 0.99, score: 1, level: "High Risk" },
    { min: 0, max: 0.75, score: 1, level: "Severe Risk" },
  ],
  
  QuickRatio: [
    { min: 18.00, max: 20.00, score: 5, level: "Exceptionally Liquid" },
    { min: 16.00, max: 17.99, score: 5, level: "Extremely Liquid" },
    { min: 14.00, max: 15.99, score: 4, level: "Very Liquid" },
    { min: 12.00, max: 13.99, score: 4, level: "Highly Liquid" },
    { min: 10.00, max: 11.99, score: 3, level: "Good Liquidity" },
    { min: 8.00, max: 9.99, score: 3, level: "Moderate Liquidity" },
    { min: 6.00, max: 7.99, score: 2, level: "Fair Liquidity" },
    { min: 4.00, max: 5.99, score: 2, level: "Low Liquidity" },
    { min: 2.00, max: 3.99, score: 1, level: "Very Low Liquidity" },
    { min: 0, max: 1.99, score: 1, level: "Critical Liquidity" },
  },
};
