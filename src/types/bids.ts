
export interface Bid {
  id: string;
  amount: string;
  interestRate: string;
  interestRateType: "Fixed" | "Floating";
  term: string;
  facilityType: string;
  status: "Under Review" | "Approved" | "Rejected";
  submittedDate: string;
  additionalTerms: string;
  features?: string[];
}

export interface Proposal {
  id: string;
  name: string;
  industry: string;
  status: string;
  principal: string;
}
