
import { FinanceProposal } from "@/types/marketplace";

/**
 * Finance proposals for other industries (Wholesale, Hospitality, Agriculture)
 */
export const otherProposals: FinanceProposal[] = [
  // Wholesale
  {
    id: "8",
    creditRating: 5.2,
    projectName: "Project H",
    facilityType: "Accounts Receivable Financing",
    financingType: "Refinancing",
    principal: "$850,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 425",
    term: "12 Months",
    status: "OPEN",
    bidDeadline: "06:30:15",
    lenderPreferences: "Specialty Finance",
    industry: "Wholesale",
    bidVolume: 31
  },
  {
    id: "19",
    creditRating: 5.1,
    projectName: "Project S",
    facilityType: "Accounts Receivable Financing",
    financingType: "Refinancing",
    principal: "$750,000",
    interestRateType: "Floating",
    interestRate: "Prime + 350",
    term: "12 Months",
    status: "OPEN",
    bidDeadline: "05:40:25",
    lenderPreferences: "Factoring Company",
    industry: "Wholesale",
    bidVolume: 39
  },
  {
    id: "29",
    creditRating: 5.6,
    projectName: "Project AC",
    facilityType: "Inventory Financing",
    financingType: "Refinancing",
    principal: "$1,350,000",
    interestRateType: "Floating",
    interestRate: "Prime + 375",
    term: "24 Months",
    status: "OPEN",
    bidDeadline: "09:10:20",
    lenderPreferences: "Asset-Based Lender",
    industry: "Wholesale",
    bidVolume: 47
  },
  {
    id: "37",
    creditRating: 5.0,
    projectName: "Project AK",
    facilityType: "Accounts Receivable Financing",
    financingType: "Refinancing",
    principal: "$925,000",
    interestRateType: "Floating",
    interestRate: "Prime + 400",
    term: "12 Months",
    status: "OPEN",
    bidDeadline: "10:35:15",
    lenderPreferences: "Factoring Company",
    industry: "Wholesale",
    bidVolume: 38
  },
  {
    id: "44",
    creditRating: 7.0,
    projectName: "Project AR",
    facilityType: "Inventory Financing",
    financingType: "Refinancing",
    principal: "$1,650,000",
    interestRateType: "Floating",
    interestRate: "Prime + 300",
    term: "18 Months",
    status: "EXPIRED",
    bidDeadline: "Closed",
    lenderPreferences: "Asset-Based Lender",
    industry: "Wholesale",
    bidVolume: 55
  },
  {
    id: "53",
    creditRating: 4.5,
    projectName: "Project BA",
    facilityType: "Accounts Receivable Financing",
    financingType: "Refinancing",
    principal: "$450,000",
    interestRateType: "Floating",
    interestRate: "Prime + 425",
    term: "12 Months",
    status: "EXPIRED",
    bidDeadline: "Closed",
    lenderPreferences: "Factoring Company",
    industry: "Wholesale",
    bidVolume: 28
  },
  
  // Hospitality
  {
    id: "10",
    creditRating: 6.1,
    projectName: "Project J",
    facilityType: "Revolving Line of Credit",
    financingType: "Refinancing",
    principal: "$1,200,000",
    interestRateType: "Floating",
    interestRate: "Prime + 250",
    term: "24 Months",
    status: "EXPIRED",
    bidDeadline: "Closed",
    lenderPreferences: "Credit Union",
    industry: "Hospitality",
    bidVolume: 64
  },
  {
    id: "25",
    creditRating: 4.8,
    projectName: "Project Y",
    facilityType: "Working Capital Loan",
    financingType: "Refinancing",
    principal: "$650,000",
    interestRateType: "Floating",
    interestRate: "Prime + 325",
    term: "18 Months",
    status: "EXPIRED",
    bidDeadline: "Closed",
    lenderPreferences: "Community Bank",
    industry: "Hospitality",
    bidVolume: 32
  },
  {
    id: "40",
    creditRating: 4.6,
    projectName: "Project AN",
    facilityType: "Revolving Line of Credit",
    financingType: "Refinancing",
    principal: "$550,000",
    interestRateType: "Floating",
    interestRate: "SOFR + 450",
    term: "24 Months",
    status: "OPEN",
    bidDeadline: "14:30:55",
    lenderPreferences: "Credit Union",
    industry: "Hospitality",
    bidVolume: 29
  },
  
  // Agriculture
  {
    id: "23",
    creditRating: 5.3,
    projectName: "Project W",
    facilityType: "Equipment Financing",
    financingType: "Refinancing",
    principal: "$1,750,000",
    interestRateType: "Fixed",
    interestRate: "7.25%",
    term: "36 Months",
    status: "OPEN",
    bidDeadline: "07:50:15",
    lenderPreferences: "Equipment Finance",
    industry: "Agriculture",
    bidVolume: 43
  }
];
