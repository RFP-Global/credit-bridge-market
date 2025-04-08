
// Mock data for the Intelligence page charts

export const businessSizeData = [
  { name: 'Small', workingCapital: 40, expansion: 70, equipment: 30, rate: 5.2 },
  { name: 'Medium', workingCapital: 100, expansion: 40, equipment: 55, rate: 4.8 },
  { name: 'Large', workingCapital: 60, expansion: 180, equipment: 150, rate: 3.5 }
];

export const businessSizeDefaultData = [
  { name: 'Small Business', value: 45.5 },
  { name: 'Medium Business', value: 32.5 },
  { name: 'Large Business', value: 22.0 }
];

export const loanApprovalData = [
  { category: 'Small', approved: 60, rejected: 40 },
  { category: 'Medium', approved: 70, rejected: 30 },
  { category: 'Large', approved: 80, rejected: 20 }
];

export const businessSizeTermsData = [
  { month: 'Jan', small: 20, medium: 15, large: 12 },
  { month: 'Feb', small: 18, medium: 22, large: 16 },
  { month: 'Mar', small: 25, medium: 18, large: 20 },
  { month: 'Apr', small: 30, medium: 15, large: 25 },
  { month: 'May', small: 22, medium: 25, large: 18 },
  { month: 'Jun', small: 15, medium: 30, large: 22 }
];

export const industryStackedData = [
  { 
    name: 'Manufacturing', 
    workingCapital: 150, 
    expansion: 200, 
    equipment: 350, 
    other: 100 
  },
  { 
    name: 'Construction', 
    workingCapital: 200, 
    expansion: 250, 
    equipment: 300, 
    other: 120 
  },
  { 
    name: 'Technology', 
    workingCapital: 300, 
    expansion: 350, 
    equipment: 200, 
    other: 150 
  },
  { 
    name: 'Retail', 
    workingCapital: 250, 
    expansion: 150, 
    equipment: 180, 
    other: 200 
  },
  { 
    name: 'Healthcare', 
    workingCapital: 180, 
    expansion: 220, 
    equipment: 150, 
    other: 120 
  }
];

export const industryDefaultRateData = [
  { name: 'Retail', value: 2.5 },
  { name: 'Tech', value: 10.5 },
  { name: 'Construction', value: 7.5 },
  { name: 'Healthcare', value: 3.0 },
  { name: 'Manufacturing', value: 1.5 }
];

export const industryPieData = [
  { name: 'Manufacturing', value: 22 },
  { name: 'Construction', value: 26 },
  { name: 'Tech', value: 20 },
  { name: 'Retail', value: 20 },
  { name: 'Healthcare', value: 12 }
];

export const industryTermsData = [
  { month: 'Jan', retail: 15, tech: 25, construction: 20, healthcare: 18, manufacturing: 22 },
  { month: 'Feb', retail: 18, tech: 22, construction: 25, healthcare: 20, manufacturing: 24 },
  { month: 'Mar', retail: 20, tech: 18, construction: 22, healthcare: 25, manufacturing: 28 },
  { month: 'Apr', retail: 25, tech: 15, construction: 18, healthcare: 22, manufacturing: 30 },
  { month: 'May', retail: 22, tech: 20, construction: 15, healthcare: 18, manufacturing: 35 },
  { month: 'Jun', retail: 18, tech: 25, construction: 20, healthcare: 22, manufacturing: 42 }
];

export const industryLoanRequestData = [
  { name: 'Manufacturing', size: 350 },
  { name: 'Construction', size: 300 },
  { name: 'Technology', size: 280 },
  { name: 'Retail', size: 220 },
  { name: 'Healthcare', size: 180 },
  { name: 'Financial Services', size: 150 },
  { name: 'Hospitality', size: 120 }
];

export const structureData = [
  { type: 'LLC', workingCapital: 60, expansion: 90, equipment: 30, rate: 7.5 },
  { type: 'Corporate', workingCapital: 80, expansion: 70, equipment: 85, rate: 5.5 },
  { type: 'Partnership', workingCapital: 40, expansion: 60, equipment: 75, rate: 9.5 }
];

export const structureTermsData = [
  { month: 'Jan', llc: 30, corporate: 45, partnership: 25 },
  { month: 'Feb', llc: 35, corporate: 50, partnership: 30 },
  { month: 'Mar', llc: 45, corporate: 40, partnership: 35 },
  { month: 'Apr', llc: 40, corporate: 35, partnership: 30 },
  { month: 'May', llc: 30, corporate: 30, partnership: 35 },
  { month: 'Jun', llc: 35, corporate: 25, partnership: 30 }
];

export const structureApprovalData = [
  { type: 'LLC', approved: 65, rejected: 35 },
  { type: 'Corporate', approved: 45, rejected: 55 },
  { type: 'Partnership', approved: 75, rejected: 25 }
];
