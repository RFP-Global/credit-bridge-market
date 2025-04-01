
import { FinanceProposal } from "@/types/marketplace";

/**
 * Finance proposals for the Healthcare industry
 */
export const healthcareProposals: FinanceProposal[] = [
  {
    id: "3",
    creditRating: 5.4,
    projectName: "Project C",
    facilityType: "Asset-Based Loan",
    financingType: "Refinancing",
    principal: "$250,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 350",
    term: "14 Months",
    status: "OPEN",
    bidDeadline: "02:11:10",
    lenderPreferences: "National Bank",
    industry: "Healthcare",
    bidVolume: 35
  },
  {
    id: "15",
    creditRating: 5.8,
    projectName: "Project O",
    facilityType: "Working Capital Loan",
    financingType: "Refinancing",
    principal: "$1,850,000",
    interestRateType: "Floating",
    interestRate: "Prime + 275",
    term: "24 Months",
    status: "EXPIRED",
    bidDeadline: "Closed",
    lenderPreferences: "Community Bank",
    industry: "Healthcare",
    bidVolume: 51
  },
  {
    id: "24",
    creditRating: 9.2,
    projectName: "Project X",
    facilityType: "Acquisition Financing",
    financingType: "New Financing",
    principal: "$18,500,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 200",
    term: "84 Months",
    status: "COMPLETED",
    bidDeadline: "Closed",
    lenderPreferences: "Investment Bank",
    industry: "Healthcare",
    bidVolume: 94
  },
  {
    id: "35",
    creditRating: 6.5,
    projectName: "Project AI",
    facilityType: "Equipment Financing",
    financingType: "Refinancing",
    principal: "$3,150,000",
    interestRateType: "Fixed",
    interestRate: "6.75%",
    term: "48 Months",
    status: "OPEN",
    bidDeadline: "15:05:30",
    lenderPreferences: "Equipment Finance",
    industry: "Healthcare",
    bidVolume: 62
  },
  {
    id: "45",
    creditRating: 8.0,
    projectName: "Project AS",
    facilityType: "Acquisition Financing",
    financingType: "New Financing",
    principal: "$14,500,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 175",
    term: "84 Months",
    status: "OPEN",
    bidDeadline: "09:25:45",
    lenderPreferences: "Investment Bank",
    industry: "Healthcare",
    bidVolume: 78
  }
];
