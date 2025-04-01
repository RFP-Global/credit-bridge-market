
import { FinanceProposal } from "@/types/marketplace";

/**
 * Finance proposals for the Construction industry
 */
export const constructionProposals: FinanceProposal[] = [
  {
    id: "1",
    creditRating: 7.5,
    projectName: "Project A",
    facilityType: "Term Loan",
    financingType: "New Financing",
    principal: "$500,000",
    interestRateType: "Fixed",
    interestRate: "12.00%",
    term: "36 Months",
    status: "OPEN",
    bidDeadline: "21:08:30",
    lenderPreferences: "Regional Bank",
    industry: "Construction",
    bidVolume: 65,
    companyName: "BuildRight Construction Co.",
    businessDescription: "Commercial construction firm specializing in retail spaces",
    subSector: "Commercial Construction",
    businessType: "General Contractor",
    employeeCount: 47,
    annualRevenue: "$8.2M",
    foundedYear: 2008,
    location: {
      city: "Denver",
      state: "CO",
      country: "USA"
    },
    zipCode: "80205"
  },
  {
    id: "28",
    creditRating: 8.3,
    projectName: "Project AB",
    facilityType: "Construction Loan",
    financingType: "New Financing",
    principal: "$11,250,000",
    interestRateType: "Fixed",
    interestRate: "7.00%",
    term: "48 Months",
    status: "OPEN",
    bidDeadline: "04:35:55",
    lenderPreferences: "Regional Bank",
    industry: "Construction",
    bidVolume: 79
  },
  {
    id: "11",
    creditRating: 7.3,
    projectName: "Project K",
    facilityType: "Construction Loan",
    financingType: "New Financing",
    principal: "$8,750,000",
    interestRateType: "Fixed",
    interestRate: "7.75%",
    term: "36 Months",
    status: "OPEN",
    bidDeadline: "09:45:20",
    lenderPreferences: "Regional Bank",
    industry: "Construction",
    bidVolume: 73
  },
  {
    id: "43",
    creditRating: 5.7,
    projectName: "Project AQ",
    facilityType: "Construction Loan",
    financingType: "New Financing",
    principal: "$2,950,000",
    interestRateType: "Fixed",
    interestRate: "7.50%",
    term: "30 Months",
    status: "OPEN",
    bidDeadline: "19:40:10",
    lenderPreferences: "Regional Bank",
    industry: "Construction",
    bidVolume: 49
  }
];
