
export interface Lender {
  id: number;
  code: string;
  name: string;
  description: string;
  contactName: string;
  phone: string;
  email: string;
  fundingCapacity: string;
  specialties: string[];
  minimumDeal: string;
  preferredRegions: string[];
  yearsInBusiness: number;
  loanTypes?: string[];
  interestRates?: string;
  typicalTerms?: string;
  avgProcessingTime?: string;
  successRate?: string;
  industries?: string[];
  recentDeals?: RecentDeal[];
}

export interface RecentDeal {
  id: number;
  projectType: string;
  amount: string;
  location: string;
  term: string;
  date: string;
}
