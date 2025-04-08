
export interface Enterprise {
  id: number;
  code: string;
  name: string;
  description: string;
  contactName: string;
  phone: string;
  email: string;
  industry: string;
  specialties: string[];
  annualRevenue: string;
  foundedYear: number;
  headquarters: string;
  employeeCount: string;
  projectTypes?: string[];
  preferredFinancing?: string;
  avgDealSize?: string;
  recentProjects?: RecentProject[];
}

export interface RecentProject {
  id: number;
  projectType: string;
  amount: string;
  location: string;
  date: string;
  status: string;
}
