
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
  }
];
