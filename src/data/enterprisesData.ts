
import { Enterprise } from "@/types/enterprises";

export const enterprises: Enterprise[] = [
  {
    id: 1,
    code: "TF",
    name: "TerraForge Inc.",
    description: "Leading commercial real estate developer specializing in sustainable building practices and LEED-certified properties.",
    contactName: "Alex Chen",
    phone: "(555) 123-4567",
    email: "a.chen@terraforge.com",
    industry: "Commercial Real Estate",
    specialties: ["Sustainable Development", "Office Buildings", "Mixed-Use", "Urban Renewal"],
    annualRevenue: "$120M",
    foundedYear: 2008,
    headquarters: "Seattle, WA",
    employeeCount: "215",
    projectTypes: ["Office", "Retail", "Mixed-Use"],
    preferredFinancing: "Construction Loans, Mezzanine Debt",
    avgDealSize: "$15-30M",
    financialRatios: {
      debtServiceCoverageRatio: 1.8,
      currentRatio: 2.5,
      quickRatio: 1.9,
      debtToEquityRatio: 0.65,
      returnOnAssets: 0.12,
      returnOnEquity: 0.18,
      grossMargin: 0.35,
      operatingMargin: 0.22,
      netProfitMargin: 0.15
    },
    demographics: {
      ceo: "Taylor Chen",
      yearEstablished: 2008,
      legalStructure: "Corporation",
      publiclyTraded: false,
      employeeGrowthRate: "15% YoY",
      totalAssets: "$450M",
      totalLiabilities: "$220M",
      netWorth: "$230M"
    },
    socialMedia: {
      website: "www.terraforge.com",
      linkedin: "linkedin.com/company/terraforge",
      twitter: "twitter.com/terraforge",
      facebook: "facebook.com/terraforge",
      instagram: "instagram.com/terraforge"
    },
    recentProjects: [
      {
        id: 101,
        projectType: "Office Tower",
        amount: "$28.5M",
        location: "Seattle, WA",
        date: "2023-11-15",
        status: "Active"
      },
      {
        id: 102,
        projectType: "Mixed-Use Development",
        amount: "$32.7M",
        location: "Portland, OR",
        date: "2023-09-22",
        status: "Active"
      }
    ]
  },
  {
    id: 2,
    code: "VH",
    name: "Verdant Horizons LLC",
    description: "Renewable energy project developer focusing on solar, wind, and battery storage installations across North America.",
    contactName: "Priya Sharma",
    phone: "(555) 234-5678",
    email: "p.sharma@verdanthorizons.com",
    industry: "Renewable Energy",
    specialties: ["Solar Farms", "Wind Projects", "Battery Storage", "Grid Integration"],
    annualRevenue: "$85M",
    foundedYear: 2012,
    headquarters: "Denver, CO",
    employeeCount: "145",
    projectTypes: ["Utility Scale Solar", "Wind Farms", "Energy Storage"],
    preferredFinancing: "Project Finance, Tax Equity",
    avgDealSize: "$25-50M",
    recentProjects: [
      {
        id: 103,
        projectType: "Solar Farm",
        amount: "$45.2M",
        location: "Arizona",
        date: "2023-10-05",
        status: "Active"
      }
    ]
  },
  {
    id: 3,
    code: "BL",
    name: "BlueLine Manufacturing",
    description: "Advanced manufacturing company specializing in precision components for aerospace and defense industries.",
    contactName: "Marcus Johnson",
    phone: "(555) 345-6789",
    email: "m.johnson@bluelinemfg.com",
    industry: "Manufacturing",
    specialties: ["Aerospace", "Defense", "Precision Engineering", "Advanced Materials"],
    annualRevenue: "$65M",
    foundedYear: 2005,
    headquarters: "Chicago, IL",
    employeeCount: "320",
    projectTypes: ["Facility Expansion", "Equipment Financing", "Working Capital"],
    preferredFinancing: "Equipment Loans, Lines of Credit",
    avgDealSize: "$5-15M",
    recentProjects: [
      {
        id: 104,
        projectType: "Facility Expansion",
        amount: "$12.8M",
        location: "Detroit, MI",
        date: "2023-08-18",
        status: "Active"
      }
    ]
  },
  {
    id: 4,
    code: "NH",
    name: "NorthStar Healthcare",
    description: "Healthcare provider network developing medical facilities and specialized care centers throughout the Northeast.",
    contactName: "Sarah Williams",
    phone: "(555) 456-7890",
    email: "s.williams@northstarhc.com",
    industry: "Healthcare",
    specialties: ["Medical Centers", "Specialty Clinics", "Senior Care", "Rehabilitation Facilities"],
    annualRevenue: "$210M",
    foundedYear: 2000,
    headquarters: "Boston, MA",
    employeeCount: "575",
    projectTypes: ["Medical Center Development", "Equipment Financing", "Facility Acquisition"],
    preferredFinancing: "Long-term Mortgages, Tax-Exempt Bonds",
    avgDealSize: "$20-45M",
    recentProjects: [
      {
        id: 105,
        projectType: "Medical Center",
        amount: "$38.2M",
        location: "Hartford, CT",
        date: "2023-09-10",
        status: "Active"
      }
    ]
  },
  {
    id: 5,
    code: "CP",
    name: "Coastal Properties Group",
    description: "Hospitality and resort development company specializing in waterfront properties and tourist destinations.",
    contactName: "David Reyes",
    phone: "(555) 567-8901",
    email: "d.reyes@coastalproperties.com",
    industry: "Hospitality",
    specialties: ["Hotels", "Resorts", "Waterfront Development", "Tourism Infrastructure"],
    annualRevenue: "$95M",
    foundedYear: 2010,
    headquarters: "Miami, FL",
    employeeCount: "180",
    projectTypes: ["Resort Development", "Hotel Renovation", "Property Acquisition"],
    preferredFinancing: "Construction Loans, Mezzanine Debt, JV Equity",
    avgDealSize: "$30-70M",
    recentProjects: [
      {
        id: 106,
        projectType: "Beach Resort",
        amount: "$62.5M",
        location: "Gulf Shores, AL",
        date: "2023-07-20",
        status: "Active"
      }
    ]
  }
];
