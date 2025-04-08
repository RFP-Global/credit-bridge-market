
export interface Enterprise {
  id: number;
  code: string;
  name: string;
  description: string;
  contactName: string;
  phone: string;
  email: string;
  industry: string;
  specialties: string[];
  annualRevenue: string;
  foundedYear: number;
  headquarters: string;
  employeeCount: string;
  projectTypes?: string[];
  preferredFinancing?: string;
  avgDealSize?: string;
  recentProjects?: RecentProject[];
  financialRatios?: FinancialRatios;
  demographics?: CompanyDemographics;
  socialMedia?: SocialMediaLinks;
}

export interface RecentProject {
  id: number;
  projectType: string;
  amount: string;
  location: string;
  date: string;
  status: string;
}

export interface FinancialRatios {
  debtServiceCoverageRatio: number;
  currentRatio: number;
  quickRatio: number;
  debtToEquityRatio: number;
  returnOnAssets: number;
  returnOnEquity: number;
  grossMargin: number;
  operatingMargin: number;
  netProfitMargin: number;
}

export interface CompanyDemographics {
  ceo?: string;
  yearEstablished: number;
  legalStructure: string;
  publiclyTraded: boolean;
  stockSymbol?: string;
  employeeGrowthRate?: string;
  totalAssets?: string;
  totalLiabilities?: string;
  netWorth?: string;
}

export interface SocialMediaLinks {
  website?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
}
