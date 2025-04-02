
import { v4 as uuidv4 } from 'uuid';

export interface HistoricalTransaction {
  id: string;
  companyName: string;
  facilityType: string;
  industry: string;
  subSector?: string;
  businessType: string;
  principal: number;
  interestRate: string;
  term: string;
  location: {
    city: string;
    state: string;
  };
  completionDate: string;
  winningLender: string;
  employeeCount?: string;
  annualRevenue?: string;
  foundedYear?: number;
  zipCode?: string;
}

export const historicalTransactions: HistoricalTransaction[] = [
  {
    id: uuidv4(),
    companyName: "Urban Street Eats",
    facilityType: "Equipment Finance",
    industry: "Food & Beverage",
    subSector: "Quick Service",
    businessType: "Hot Dog Stand",
    principal: 75000,
    interestRate: "5.75%",
    term: "36 months",
    location: {
      city: "Chicago",
      state: "IL"
    },
    completionDate: "2023-11-15",
    winningLender: "First Metro Bank",
    employeeCount: "4",
    annualRevenue: "$350K",
    foundedYear: 2020,
    zipCode: "60614"
  },
  {
    id: uuidv4(),
    companyName: "Eastside Properties",
    facilityType: "Commercial Mortgage",
    industry: "Real Estate",
    subSector: "Residential Real Estate",
    businessType: "Sneaker Manufacturer",
    principal: 2500000,
    interestRate: "4.25%",
    term: "15 years",
    location: {
      city: "Miami",
      state: "FL"
    },
    completionDate: "2023-10-22",
    winningLender: "Coastal Capital",
    employeeCount: "32",
    annualRevenue: "$4.7M",
    foundedYear: 2011,
    zipCode: "33130"
  },
  {
    id: uuidv4(),
    companyName: "NextGen Solar",
    facilityType: "Working Capital",
    industry: "Energy",
    subSector: "Renewable Energy",
    businessType: "Solar Panel Installation",
    principal: 500000,
    interestRate: "6.25%",
    term: "48 months",
    location: {
      city: "Phoenix",
      state: "AZ"
    },
    completionDate: "2023-09-30",
    winningLender: "Western Credit Union",
    employeeCount: "27",
    annualRevenue: "$3.2M",
    foundedYear: 2015
  },
  {
    id: uuidv4(),
    companyName: "MedTech Solutions",
    facilityType: "SBA Loan",
    industry: "Healthcare",
    subSector: "Medical Devices",
    businessType: "Medical Equipment Supplier",
    principal: 1200000,
    interestRate: "3.75%",
    term: "10 years",
    location: {
      city: "Boston",
      state: "MA"
    },
    completionDate: "2023-09-15",
    winningLender: "Eastern Bank",
    employeeCount: "42",
    annualRevenue: "$7.5M",
    foundedYear: 2009
  },
  {
    id: uuidv4(),
    companyName: "Global Logistics Inc.",
    facilityType: "Asset-Based Lending",
    industry: "Transportation",
    subSector: "Freight & Logistics",
    businessType: "Logistics Provider",
    principal: 3500000,
    interestRate: "5.50%",
    term: "7 years",
    location: {
      city: "Dallas",
      state: "TX"
    },
    completionDate: "2023-08-28",
    winningLender: "Southwest Financial",
    employeeCount: "78",
    annualRevenue: "$12.3M",
    foundedYear: 2007
  },
  {
    id: uuidv4(),
    companyName: "Tech Innovations",
    facilityType: "Venture Debt",
    industry: "Technology",
    subSector: "Software Development",
    businessType: "SaaS Provider",
    principal: 4000000,
    interestRate: "7.25%",
    term: "60 months",
    location: {
      city: "San Francisco",
      state: "CA"
    },
    completionDate: "2023-08-10",
    winningLender: "Pacific Innovation Capital",
    employeeCount: "63",
    annualRevenue: "$8.9M",
    foundedYear: 2018
  },
  {
    id: uuidv4(),
    companyName: "Fresh Harvest Co-op",
    facilityType: "Agricultural Loan",
    industry: "Agriculture",
    subSector: "Organic Farming",
    businessType: "Produce Distributor",
    principal: 850000,
    interestRate: "4.75%",
    term: "8 years",
    location: {
      city: "Portland",
      state: "OR"
    },
    completionDate: "2023-07-25",
    winningLender: "Northwest Agricultural Bank",
    employeeCount: "21",
    annualRevenue: "$2.8M",
    foundedYear: 2014
  },
  {
    id: uuidv4(),
    companyName: "Precision Manufacturing",
    facilityType: "Equipment Finance",
    industry: "Manufacturing",
    subSector: "Precision Parts",
    businessType: "Auto Parts Manufacturer",
    principal: 1750000,
    interestRate: "5.00%",
    term: "5 years",
    location: {
      city: "Detroit",
      state: "MI"
    },
    completionDate: "2023-07-12",
    winningLender: "Industrial Finance Partners",
    employeeCount: "54",
    annualRevenue: "$9.2M",
    foundedYear: 2005
  },
  // New transactions for better statistics
  {
    id: uuidv4(),
    companyName: "Green Earth Construction",
    facilityType: "Term Loans",
    industry: "Construction",
    subSector: "Sustainable Building",
    businessType: "General Contractor",
    principal: 1250000,
    interestRate: "4.85%",
    term: "7 years",
    location: {
      city: "Seattle",
      state: "WA"
    },
    completionDate: "2023-06-18",
    winningLender: "Pacific Northwest Bank",
    employeeCount: "37",
    annualRevenue: "$5.2M",
    foundedYear: 2012
  },
  {
    id: uuidv4(),
    companyName: "Cloud Solutions Inc.",
    facilityType: "Revolving Credit",
    industry: "Technology",
    subSector: "Cloud Services",
    businessType: "Software Provider",
    principal: 2000000,
    interestRate: "6.75%",
    term: "3 years",
    location: {
      city: "Austin",
      state: "TX"
    },
    completionDate: "2023-06-05",
    winningLender: "Tech Capital",
    employeeCount: "48",
    annualRevenue: "$7.8M",
    foundedYear: 2015
  },
  {
    id: uuidv4(),
    companyName: "Artisan Bakery",
    facilityType: "SBA Loan",
    industry: "Food & Beverage",
    subSector: "Bakery",
    businessType: "Food Production",
    principal: 350000,
    interestRate: "3.85%",
    term: "10 years",
    location: {
      city: "Denver",
      state: "CO"
    },
    completionDate: "2023-05-22",
    winningLender: "Mountain Community Bank",
    employeeCount: "12",
    annualRevenue: "$950K",
    foundedYear: 2018
  },
  {
    id: uuidv4(),
    companyName: "Elite Fitness",
    facilityType: "Equipment Finance",
    industry: "Health & Fitness",
    subSector: "Gym Equipment",
    businessType: "Fitness Center",
    principal: 425000,
    interestRate: "5.25%",
    term: "48 months",
    location: {
      city: "Los Angeles",
      state: "CA"
    },
    completionDate: "2023-05-10",
    winningLender: "West Coast Leasing",
    employeeCount: "23",
    annualRevenue: "$1.7M",
    foundedYear: 2016
  },
  {
    id: uuidv4(),
    companyName: "Harbor Shipping",
    facilityType: "Asset-Based Lending",
    industry: "Transportation",
    subSector: "Maritime Shipping",
    businessType: "Logistics Provider",
    principal: 4750000,
    interestRate: "5.75%",
    term: "6 years",
    location: {
      city: "Baltimore",
      state: "MD"
    },
    completionDate: "2023-04-28",
    winningLender: "Atlantic Finance",
    employeeCount: "92",
    annualRevenue: "$14.5M",
    foundedYear: 2008
  },
  {
    id: uuidv4(),
    companyName: "Modern Healthcare Solutions",
    facilityType: "Term Loans",
    industry: "Healthcare",
    subSector: "Healthcare Technology",
    businessType: "Software Provider",
    principal: 1850000,
    interestRate: "4.95%",
    term: "5 years",
    location: {
      city: "Minneapolis",
      state: "MN"
    },
    completionDate: "2023-04-15",
    winningLender: "Midwest Banking Group",
    employeeCount: "47",
    annualRevenue: "$6.3M",
    foundedYear: 2014
  },
  {
    id: uuidv4(),
    companyName: "Horizon Properties",
    facilityType: "Commercial Mortgage",
    industry: "Real Estate",
    subSector: "Commercial Property",
    businessType: "Property Management",
    principal: 5250000,
    interestRate: "4.15%",
    term: "20 years",
    location: {
      city: "Charlotte",
      state: "NC"
    },
    completionDate: "2023-03-30",
    winningLender: "Southern Trust Bank",
    employeeCount: "19",
    annualRevenue: "$3.2M",
    foundedYear: 2006
  },
  {
    id: uuidv4(),
    companyName: "Quantum Computing Research",
    facilityType: "Venture Debt",
    industry: "Technology",
    subSector: "Quantum Computing",
    businessType: "Research & Development",
    principal: 7500000,
    interestRate: "7.85%",
    term: "4 years",
    location: {
      city: "Cambridge",
      state: "MA"
    },
    completionDate: "2023-03-15",
    winningLender: "Innovation Ventures",
    employeeCount: "34",
    annualRevenue: "$2.1M",
    foundedYear: 2019
  }
];
