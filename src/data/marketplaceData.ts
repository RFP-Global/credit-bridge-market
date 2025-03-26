
// Mock data for the charts
export const businessSizeData = [
  { name: 'Small Business', pending: 45, approved: 78, rejected: 23, rate: 0.32 },
  { name: 'Medium Business', approved: 65, pending: 32, rejected: 12, rate: 0.36 },
  { name: 'Large Business', approved: 88, pending: 45, rejected: 34, rate: 0.32 }
];

export const pieBusinessSizeData = [
  { name: 'Small Business', value: 40 },
  { name: 'Medium Business', value: 25 },
  { name: 'Large Business', value: 35 }
];

export const industryData = [
  { name: 'Manufacturing', value: 30, color: '#33bbef' },
  { name: 'Construction', value: 25, color: '#8B5CF6' },
  { name: 'Tech', value: 20, color: '#10b981' },
  { name: 'Retail', value: 15, color: '#F97316' },
  { name: 'Healthcare', value: 10, color: '#fbd024' }
];

export const industryPieData = [
  { name: 'Manufacturing', value: 22 },
  { name: 'Construction', value: 28 },
  { name: 'Tech', value: 22 },
  { name: 'Retail', value: 18 },
  { name: 'Healthcare', value: 10 }
];

export const industryStackedData = [
  { 
    name: 'Manufacturing', 
    workingCapital: 200, 
    expansion: 300, 
    equipment: 150, 
    other: 100 
  },
  { 
    name: 'Construction', 
    workingCapital: 150, 
    expansion: 250, 
    equipment: 200, 
    other: 180 
  },
  { 
    name: 'Tech', 
    workingCapital: 100, 
    expansion: 200, 
    equipment: 150, 
    other: 120 
  },
  { 
    name: 'Retail', 
    workingCapital: 120, 
    expansion: 180, 
    equipment: 90, 
    other: 60 
  },
  { 
    name: 'Healthcare', 
    workingCapital: 80, 
    expansion: 120, 
    equipment: 70, 
    other: 50 
  }
];

export const timeSeriesData = [
  { month: 'Jan', small: 20, medium: 30, large: 45 },
  { month: 'Feb', small: 25, medium: 35, large: 50 },
  { month: 'Mar', small: 30, medium: 40, large: 55 },
  { month: 'Apr', small: 35, medium: 45, large: 60 },
  { month: 'May', small: 40, medium: 50, large: 65 },
  { month: 'Jun', small: 45, medium: 55, large: 40 }
];

export const loanRequestData = [
  { name: 'Small', pending: 40, approved: 75, rejected: 20 },
  { name: 'Medium', pending: 35, approved: 60, rejected: 25 },
  { name: 'Large', pending: 55, approved: 80, rejected: 30 }
];

export const loanApprovalData = [
  { category: 'Small Business', approved: 65, rejected: 35 },
  { category: 'Medium Business', approved: 78, rejected: 22 },
  { category: 'Large Business', approved: 85, rejected: 15 }
];

export const structureData = [
  { type: 'LLC', workingCapital: 42, expansion: 35, equipment: 23, rate: 7.5 },
  { type: 'Corporate', workingCapital: 28, expansion: 45, equipment: 32, rate: 6.2 },
  { type: 'Partnership', workingCapital: 30, expansion: 25, equipment: 28, rate: 8.1 }
];

export const loanTermData = [
  { entity: 'Small', shortTerm: 25, mediumTerm: 40, longTerm: 35 },
  { entity: 'Medium', shortTerm: 30, mediumTerm: 45, longTerm: 25 },
  { entity: 'Large', shortTerm: 20, mediumTerm: 30, longTerm: 50 }
];

export const structureLoanTermData = [
  { month: 'Jan', llc: 30, corporate: 45, partnership: 25 },
  { month: 'Feb', llc: 35, corporate: 50, partnership: 30 },
  { month: 'Mar', llc: 45, corporate: 40, partnership: 35 },
  { month: 'Apr', llc: 40, corporate: 35, partnership: 30 },
  { month: 'May', llc: 30, corporate: 30, partnership: 35 },
  { month: 'Jun', llc: 35, corporate: 25, partnership: 30 }
];

export const industryLoanTermData = [
  { month: 'Jan', retail: 30, tech: 45, construction: 25, healthcare: 20, manufacturing: 35 },
  { month: 'Feb', retail: 35, tech: 50, construction: 30, healthcare: 25, manufacturing: 40 },
  { month: 'Mar', retail: 45, tech: 40, construction: 35, healthcare: 30, manufacturing: 35 },
  { month: 'Apr', retail: 40, tech: 35, construction: 45, healthcare: 20, manufacturing: 30 },
  { month: 'May', retail: 30, tech: 30, construction: 40, healthcare: 25, manufacturing: 35 },
  { month: 'Jun', retail: 35, tech: 25, construction: 30, healthcare: 40, manufacturing: 45 }
];
