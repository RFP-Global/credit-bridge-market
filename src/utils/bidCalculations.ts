
/**
 * Calculates the total cost of a loan
 */
export const calculateTotalCost = (amount: string, interestRate: string, term: string): string => {
  // Parse the input values
  const principal = parseFloat(amount.replace(/[^0-9.]/g, '')) * 1000000; // Convert $XM to a number
  const rate = parseFloat(interestRate.replace('%', '')) / 100; // Convert percentage to decimal
  const months = parseInt(term.split(' ')[0]); // Extract months from "XX months"
  
  // For simplified calculation (ignoring compounding), we'll use the formula:
  // Total = Principal + (Principal * Rate * Term in years)
  const years = months / 12;
  const interest = principal * rate * years;
  const total = principal + interest;
  
  // Format the result
  return `$${(total / 1000000).toFixed(2)}M`;
};

/**
 * Calculates the annualized cost (cost per year)
 */
export const calculateAnnualizedCost = (amount: string, interestRate: string, term: string): string => {
  // Parse the input values
  const principal = parseFloat(amount.replace(/[^0-9.]/g, '')) * 1000000; // Convert $XM to a number
  const rate = parseFloat(interestRate.replace('%', '')) / 100; // Convert percentage to decimal
  const months = parseInt(term.split(' ')[0]); // Extract months from "XX months"
  const years = months / 12;
  
  // Calculate total cost
  const interest = principal * rate * years;
  const total = principal + interest;
  
  // Calculate annualized cost (total cost divided by years)
  const annualizedCost = total / years;
  
  // Format the result
  return `$${(annualizedCost / 1000000).toFixed(2)}M/yr`;
};
