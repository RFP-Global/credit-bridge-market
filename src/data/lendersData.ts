
import { Lender } from "@/types/lenders";

export const lenders: Lender[] = [
  {
    id: 1,
    code: "LEN-001",
    name: "Michael Reynolds",
    title: "Senior Loan Officer",
    bankName: "First National Commercial Bank",
    description: "Experienced commercial loan officer specializing in real estate and renewable energy financing with over 15 years in the industry.",
    phone: "(XXX) XXX-XXXX",
    email: "michael.reynolds@fnbank.com",
    fundingCapacity: "$25M-$100M",
    specialties: ["Commercial Real Estate", "Renewable Energy"],
    minimumDeal: "$5M",
    preferredRegions: ["Northeast", "West Coast"],
    yearsInBusiness: 15,
    yearsExperience: 15,
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
    code: "LEN-002",
    name: "Sarah Chen",
    title: "VP of Healthcare Financing",
    bankName: "MidState Financial Group",
    description: "Healthcare and infrastructure financing specialist with expertise in complex project finance structures and public-private partnerships.",
    phone: "(XXX) XXX-XXXX",
    email: "sarah.chen@midstatefinancial.com",
    fundingCapacity: "$10M-$50M",
    specialties: ["Infrastructure", "Healthcare"],
    minimumDeal: "$2M",
    preferredRegions: ["Midwest", "Southeast"],
    yearsInBusiness: 8,
    yearsExperience: 12,
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
    code: "LEN-003",
    name: "David Martinez",
    title: "Commercial Banking Director",
    bankName: "Commerce Capital Partners",
    description: "Specialized in traditional and mezzanine debt for mid-market businesses with a focus on growth-stage companies and expansion projects.",
    phone: "(XXX) XXX-XXXX",
    email: "david.martinez@commercecapital.com",
    fundingCapacity: "$5M-$30M",
    specialties: ["Mid-Market Commercial", "Mezzanine Debt"],
    minimumDeal: "$1M",
    preferredRegions: ["National"],
    yearsInBusiness: 12,
    yearsExperience: 16,
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
    code: "LEN-004",
    name: "Emily Wong",
    title: "Technology Financing Specialist",
    bankName: "Horizon Venture Debt",
    description: "Technology sector specialist providing growth capital and venture debt to early-stage and scaling technology companies.",
    phone: "(XXX) XXX-XXXX",
    email: "emily.wong@horizonventure.com",
    fundingCapacity: "$2M-$20M",
    specialties: ["Technology", "SaaS", "Fintech"],
    minimumDeal: "$500K",
    preferredRegions: ["West Coast", "Northeast"],
    yearsInBusiness: 6,
    yearsExperience: 10,
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
    code: "LEN-005",
    name: "Robert Johnson",
    title: "Senior Relationship Manager",
    bankName: "Heartland Commercial Bank",
    description: "Relationship-focused banker specializing in full-service commercial lending for established businesses across multiple sectors.",
    phone: "(XXX) XXX-XXXX",
    email: "robert.johnson@heartlandbank.com",
    fundingCapacity: "$15M-$75M",
    specialties: ["Manufacturing", "Distribution", "Retail"],
    minimumDeal: "$3M",
    preferredRegions: ["National"],
    yearsInBusiness: 20,
    yearsExperience: 22,
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
  },
  {
    id: 6,
    code: "LEN-006",
    name: "Jessica Miller",
    title: "Agricultural Finance Manager",
    bankName: "Rural Development Finance",
    description: "Expert in agricultural and rural development financing with deep understanding of seasonal business cycles and farming operations.",
    phone: "(XXX) XXX-XXXX",
    email: "jessica.miller@ruraldevelopment.com",
    fundingCapacity: "$1M-$25M",
    specialties: ["Agriculture", "Rural Development", "Sustainable Farming"],
    minimumDeal: "$750K",
    preferredRegions: ["Midwest", "South", "Pacific Northwest"],
    yearsInBusiness: 25,
    yearsExperience: 15,
    loanTypes: ["Agricultural Loans", "Farm Acquisition", "Equipment Financing", "Land Development"],
    interestRates: "4.75% - 7.25% with government subsidies available",
    typicalTerms: "7-20 years with seasonal payment options",
    avgProcessingTime: "30-60 days including land assessment",
    successRate: "70% approval rate for qualified farming operations",
    industries: ["Farming", "Agriculture Technology", "Food Production", "Livestock", "Crop Production"],
    recentDeals: [
      {
        id: 601,
        projectType: "Organic Farm Acquisition",
        amount: "$4.5M",
        location: "Iowa",
        term: "15 years",
        date: "2023-10-10"
      },
      {
        id: 602,
        projectType: "Sustainable Dairy Expansion",
        amount: "$7.8M",
        location: "Wisconsin",
        term: "12 years",
        date: "2023-07-22"
      }
    ]
  },
  {
    id: 7,
    code: "LEN-007",
    name: "Alexander Kim",
    title: "Global Trade Finance Director",
    bankName: "Global Trade Partners",
    description: "International finance expert specializing in cross-border transactions and export financing with extensive global network.",
    phone: "(XXX) XXX-XXXX",
    email: "alexander.kim@globaltradepartners.com",
    fundingCapacity: "$5M-$150M",
    specialties: ["International Trade", "Export Financing", "Cross-Border Transactions"],
    minimumDeal: "$2M",
    preferredRegions: ["Global", "Emerging Markets"],
    yearsInBusiness: 18,
    yearsExperience: 20,
    loanTypes: ["Trade Finance", "Export Credit", "Letter of Credit", "Supply Chain Financing"],
    interestRates: "Variable based on country risk profiles, typically 6.5% - 11%",
    typicalTerms: "6 months to 5 years with transaction-specific structures",
    avgProcessingTime: "14-45 days depending on jurisdiction",
    successRate: "65% with thorough international due diligence",
    industries: ["Manufacturing", "Commodities", "Consumer Goods", "Industrial Equipment", "Technology"],
    recentDeals: [
      {
        id: 701,
        projectType: "Manufacturing Equipment Export",
        amount: "$24M",
        location: "US to Brazil",
        term: "3 years",
        date: "2023-11-15"
      },
      {
        id: 702,
        projectType: "Cross-Border Acquisition",
        amount: "$68M",
        location: "US to Singapore",
        term: "5 years",
        date: "2023-08-30"
      }
    ]
  },
  {
    id: 8,
    code: "LEN-008",
    name: "Nicole Adams",
    title: "Nonprofit Sector Specialist",
    bankName: "Community Development Bank",
    description: "Dedicated to financing educational institutions and nonprofits with expertise in tax-exempt structures and mission-driven organizations.",
    phone: "(XXX) XXX-XXXX",
    email: "nicole.adams@communitybank.com",
    fundingCapacity: "$1M-$50M",
    specialties: ["Education", "Nonprofit", "Healthcare"],
    minimumDeal: "$1M",
    preferredRegions: ["National"],
    yearsInBusiness: 22,
    yearsExperience: 18,
    loanTypes: ["Tax-Exempt Bonds", "Bridge Loans", "Facility Improvement", "Working Capital"],
    interestRates: "4.0% - 6.5% with tax advantages for qualified entities",
    typicalTerms: "5-30 years with flexible payment structures",
    avgProcessingTime: "60-90 days including regulatory review",
    successRate: "80% for established institutions",
    industries: ["Education", "Healthcare", "Social Services", "Religious Organizations", "Cultural Institutions"],
    recentDeals: [
      {
        id: 801,
        projectType: "University Science Building",
        amount: "$35M",
        location: "Pennsylvania",
        term: "25 years",
        date: "2023-09-28"
      },
      {
        id: 802,
        projectType: "Charter School Network Expansion",
        amount: "$12M",
        location: "Florida",
        term: "20 years",
        date: "2023-06-15"
      }
    ]
  },
  {
    id: 9,
    code: "LEN-009",
    name: "James Sullivan",
    title: "Clean Energy Finance Director",
    bankName: "Sustainable Capital Partners",
    description: "Focused on renewable energy and green infrastructure project financing with strong commitment to sustainability and ESG principles.",
    phone: "(XXX) XXX-XXXX",
    email: "james.sullivan@sustainablecapital.com",
    fundingCapacity: "$10M-$200M",
    specialties: ["Solar Energy", "Wind Power", "Green Infrastructure"],
    minimumDeal: "$5M",
    preferredRegions: ["National", "International"],
    yearsInBusiness: 10,
    yearsExperience: 14,
    loanTypes: ["Project Finance", "Tax Equity", "Green Bonds", "Development Loans"],
    interestRates: "5.0% - 8.5% with ESG incentives",
    typicalTerms: "7-25 years aligned with project lifecycles",
    avgProcessingTime: "60-120 days including environmental assessment",
    successRate: "55% with rigorous project viability evaluation",
    industries: ["Renewable Energy", "Utilities", "Infrastructure", "Sustainable Development"],
    recentDeals: [
      {
        id: 901,
        projectType: "Utility-Scale Solar Farm",
        amount: "$87M",
        location: "Nevada",
        term: "20 years",
        date: "2023-10-05"
      },
      {
        id: 902,
        projectType: "Offshore Wind Project",
        amount: "$124M",
        location: "Massachusetts Coast",
        term: "22 years",
        date: "2023-07-18"
      }
    ]
  },
  {
    id: 10,
    code: "LEN-010",
    name: "Sofia Rodriguez",
    title: "Media & Entertainment Specialist",
    bankName: "Creative Industries Capital",
    description: "Entertainment and digital media financing expert with extensive industry connections and specialized knowledge of content distribution cycles.",
    phone: "(XXX) XXX-XXXX",
    email: "sofia.rodriguez@creativecapital.com",
    fundingCapacity: "$500K-$30M",
    specialties: ["Film Production", "Digital Media", "Entertainment"],
    minimumDeal: "$500K",
    preferredRegions: ["West Coast", "Northeast", "Europe"],
    yearsInBusiness: 15,
    yearsExperience: 17,
    loanTypes: ["Production Financing", "IP-Backed Loans", "Distribution Advances", "Studio Infrastructure"],
    interestRates: "7.5% - 14% based on project risk assessment",
    typicalTerms: "1-7 years with revenue-share components",
    avgProcessingTime: "30-45 days for experienced producers",
    successRate: "40% with emphasis on distribution agreements",
    industries: ["Film & TV", "Digital Media", "Music", "Gaming", "Streaming Content"],
    recentDeals: [
      {
        id: 1001,
        projectType: "Feature Film Production",
        amount: "$18M",
        location: "Los Angeles",
        term: "3 years",
        date: "2023-11-20"
      },
      {
        id: 1002,
        projectType: "Streaming Platform Expansion",
        amount: "$24M",
        location: "New York",
        term: "5 years",
        date: "2023-08-12"
      }
    ]
  }
];

export const getLenderById = (id: number | string): Lender | undefined => {
  const numericId = typeof id === 'string' ? parseInt(id) : id;
  return lenders.find(lender => lender.id === numericId);
};
