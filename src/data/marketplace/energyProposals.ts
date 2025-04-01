
import { FinanceProposal } from "@/types/marketplace";

/**
 * Finance proposals for the Energy industry
 */
export const energyProposals: FinanceProposal[] = [
  {
    id: "9",
    creditRating: 8.7,
    projectName: "Project I",
    facilityType: "Term Loan",
    financingType: "New Financing",
    principal: "$6,500,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 175",
    term: "60 Months",
    status: "COMPLETED",
    bidDeadline: "Closed",
    lenderPreferences: "Investment Bank",
    industry: "Energy",
    bidVolume: 87
  },
  {
    id: "18",
    creditRating: 8.9,
    projectName: "Project R",
    facilityType: "Senior Secured Loan",
    financingType: "New Financing",
    principal: "$15,000,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 150",
    term: "84 Months",
    status: "OPEN",
    bidDeadline: "08:20:45",
    lenderPreferences: "Investment Bank",
    industry: "Energy",
    bidVolume: 89
  },
  {
    id: "30",
    creditRating: 9.3,
    projectName: "Project AD",
    facilityType: "Senior Secured Loan",
    financingType: "New Financing",
    principal: "$22,000,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 125",
    term: "96 Months",
    status: "COMPLETED",
    bidDeadline: "Closed",
    lenderPreferences: "Investment Bank",
    industry: "Energy",
    bidVolume: 95
  },
  {
    id: "47",
    creditRating: 9.5,
    projectName: "Project AU",
    facilityType: "Senior Secured Loan",
    financingType: "New Financing",
    principal: "$25,000,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 100",
    term: "96 Months",
    status: "COMPLETED",
    bidDeadline: "Closed",
    lenderPreferences: "Investment Bank",
    industry: "Energy",
    bidVolume: 96
  },
  {
    id: "52",
    creditRating: 9.6,
    projectName: "Project AZ",
    facilityType: "Term Loan",
    financingType: "New Financing",
    principal: "$19,500,000",
    interestRateType: "Fixed",
    interestRate: "6.25%",
    term: "72 Months",
    status: "OPEN",
    bidDeadline: "08:30:40",
    lenderPreferences: "Investment Bank",
    industry: "Energy",
    bidVolume: 97
  }
];
