
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
}
