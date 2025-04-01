
export interface FinanceProposal {
  id: string;
  creditRating: number;
  projectName: string;
  facilityType: string;
  financingType: "New Financing" | "Refinancing";
  principal: string;
  interestRateType: "Fixed" | "Floating";
  interestRate: string;
  term: string;
  status: "OPEN" | "COMPLETED" | "EXPIRED";
  bidDeadline: string;
  lenderPreferences: string;
  industry: string;
  bidVolume: number;
  // Additional business details
  subSector?: string;
  zipCode?: string;
  businessType?: string;
  employeeCount?: number;
  annualRevenue?: string;
  foundedYear?: number;
  location?: {
    city: string;
    state: string;
    country: string;
  };
}
