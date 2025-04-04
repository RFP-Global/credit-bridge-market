
import { Lender } from "@/types/lenders";

export const lenders: Lender[] = [
  {
    id: 1,
    code: "LEN-GCF-001",
    name: "Global Capital Finance",
    description: "Specializing in commercial real estate and renewable energy financing.",
    contactName: "Sarah Johnson",
    phone: "(555) 123-4567",
    email: "sjohnson@globalcapital.com",
    fundingCapacity: "$25M-$100M",
    specialties: ["Commercial Real Estate", "Renewable Energy"],
    minimumDeal: "$5M",
    preferredRegions: ["Northeast", "West Coast"],
    yearsInBusiness: 15,
    loanTypes: ["Commercial Mortgage", "Construction Loans", "Bridge Financing", "Mezzanine Debt"],
    interestRates: "5.5% - 8.2% depending on risk profile and term",
    typicalTerms: "3-10 years with flexible payment options",
    avgProcessingTime: "45-60 days from application to funding",
    successRate: "76% approval rate for qualified applicants",
    industries: ["Real Estate Development", "Renewable Energy", "Hospitality", "Office", "Retail"],
    recentDeals: [
      {
        id: 101,
        projectType: "Mixed-Use Development",
        amount: "$42M",
        location: "Boston, MA",
        term: "7 years",
        date: "2023-09-12"
      },
      {
        id: 102,
        projectType: "Solar Farm Acquisition",
        amount: "$18M",
        location: "San Diego, CA",
        term: "5 years",
        date: "2023-06-30"
      },
      {
        id: 103,
        projectType: "Office Complex Refinance",
        amount: "$35M",
        location: "New York, NY",
        term: "10 years",
        date: "2023-02-15"
      }
    ]
  },
  {
    id: 2,
    code: "LEN-PIG-002",
    name: "Pinnacle Investment Group",
    description: "Infrastructure and healthcare sector financing solutions.",
    contactName: "Michael Chen",
    phone: "(555) 987-6543",
    email: "mchen@pinnacleig.com",
    fundingCapacity: "$10M-$50M",
    specialties: ["Infrastructure", "Healthcare"],
    minimumDeal: "$2M",
    preferredRegions: ["Midwest", "Southeast"],
    yearsInBusiness: 8,
    loanTypes: ["Project Finance", "Equipment Financing", "Working Capital", "Acquisition Loans"],
    interestRates: "6.0% - 9.5% based on project risk assessment",
    typicalTerms: "2-7 years with quarterly or semi-annual payments",
    avgProcessingTime: "30-45 days for existing clients, 60-75 for new relationships",
    successRate: "68% approval rate with strong preference for healthcare sector",
    industries: ["Healthcare", "Infrastructure", "Medical Equipment", "Senior Living", "Hospitals"],
    recentDeals: [
      {
        id: 201,
        projectType: "Hospital Expansion",
        amount: "$27M",
        location: "Chicago, IL",
        term: "6 years",
        date: "2023-11-05"
      },
      {
        id: 202,
        projectType: "Bridge Infrastructure",
        amount: "$15M",
        location: "Atlanta, GA",
        term: "4 years",
        date: "2023-08-22"
      }
    ]
  },
  {
    id: 3,
    code: "LEN-HFP-003",
    name: "Heritage Funding Partners",
    description: "Traditional and mezz debt for mid-market commercial projects.",
    contactName: "David Williams",
    phone: "(555) 456-7890",
    email: "dwilliams@heritagefp.com",
    fundingCapacity: "$5M-$30M",
    specialties: ["Mid-Market Commercial", "Mezzanine Debt"],
    minimumDeal: "$1M",
    preferredRegions: ["National"],
    yearsInBusiness: 12,
    loanTypes: ["Traditional Commercial Loans", "Mezzanine Financing", "SBA Loans", "Asset-Backed Lending"],
    interestRates: "5.75% - 11.2% with lower rates for strong credit profiles",
    typicalTerms: "1-8 years with various amortization schedules available",
    avgProcessingTime: "21-35 days, with expedited options available",
    successRate: "81% approval rate for businesses with 3+ years operating history",
    industries: ["Manufacturing", "Wholesale", "Distribution", "Service Businesses", "Franchises"],
    recentDeals: [
      {
        id: 301,
        projectType: "Manufacturing Plant Expansion",
        amount: "$12M",
        location: "Detroit, MI",
        term: "5 years",
        date: "2023-10-18"
      },
      {
        id: 302,
        projectType: "Franchise Acquisition",
        amount: "$3.5M",
        location: "Dallas, TX",
        term: "7 years",
        date: "2023-07-09"
      },
      {
        id: 303,
        projectType: "Distribution Center",
        amount: "$8M",
        location: "Phoenix, AZ",
        term: "6 years",
        date: "2023-03-27"
      }
    ]
  },
  {
    id: 4,
    code: "LEN-VCF-004",
    name: "Venture Capital Funders",
    description: "Early stage and growth financing for technology companies.",
    contactName: "Jessica Lee",
    phone: "(555) 789-0123",
    email: "jlee@vcfunders.com",
    fundingCapacity: "$2M-$20M",
    specialties: ["Technology", "SaaS", "Fintech"],
    minimumDeal: "$500K",
    preferredRegions: ["West Coast", "Northeast"],
    yearsInBusiness: 6,
    loanTypes: ["Venture Debt", "Convertible Notes", "Revenue-Based Financing", "Growth Capital"],
    interestRates: "8.0% - 12.5% plus equity components in many deals",
    typicalTerms: "2-5 years with interest-only periods and equity kickers",
    avgProcessingTime: "30-45 days including due diligence",
    successRate: "42% selective approval focused on high-growth potential",
    industries: ["Software", "Fintech", "Healthtech", "Artificial Intelligence", "B2B SaaS"],
    recentDeals: [
      {
        id: 401,
        projectType: "SaaS Platform Expansion",
        amount: "$8.5M",
        location: "San Francisco, CA",
        term: "3 years",
        date: "2023-12-01"
      },
      {
        id: 402,
        projectType: "Fintech Startup",
        amount: "$4.2M",
        location: "Boston, MA",
        term: "2 years",
        date: "2023-09-15"
      }
    ]
  },
  {
    id: 5,
    code: "LEN-CLG-005",
    name: "Commercial Lending Group",
    description: "Full-service commercial lending for established businesses.",
    contactName: "Robert Taylor",
    phone: "(555) 234-5678",
    email: "rtaylor@commerciallendinggroup.com",
    fundingCapacity: "$15M-$75M",
    specialties: ["Manufacturing", "Distribution", "Retail"],
    minimumDeal: "$3M",
    preferredRegions: ["National"],
    yearsInBusiness: 20,
    loanTypes: ["Commercial Real Estate", "Equipment Financing", "Inventory Financing", "Business Acquisition"],
    interestRates: "5.25% - 7.75% with relationship discounts available",
    typicalTerms: "5-15 years with custom structured repayment options",
    avgProcessingTime: "40-65 days for comprehensive underwriting",
    successRate: "73% with emphasis on established business history",
    industries: ["Manufacturing", "Distribution", "Retail", "Multi-unit Retail", "Warehousing"],
    recentDeals: [
      {
        id: 501,
        projectType: "Retail Chain Expansion",
        amount: "$22M",
        location: "Multiple US Locations",
        term: "10 years",
        date: "2023-11-30"
      },
      {
        id: 502,
        projectType: "Manufacturing Equipment",
        amount: "$17M",
        location: "Charlotte, NC",
        term: "7 years",
        date: "2023-08-05"
      },
      {
        id: 503,
        projectType: "Warehouse Acquisition",
        amount: "$31M",
        location: "Denver, CO",
        term: "15 years",
        date: "2023-05-12"
      }
    ]
  }
];

export const getLenderById = (id: number | string): Lender | undefined => {
  const numericId = typeof id === 'string' ? parseInt(id) : id;
  return lenders.find(lender => lender.id === numericId);
};
