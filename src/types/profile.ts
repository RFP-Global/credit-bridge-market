
export interface ProfileData {
  id?: string;
  fullName: string;
  name?: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  address: string;
  industry: string;
  founded: string;
  foundedYear?: string;
  employees: string;
  companySize?: string;
  companyName: string;
  description: string;
  location?: string;
  website?: string;
  profileImage?: any;
  role?: string;
  socialProfiles?: {
    linkedin?: string;
    twitter?: string;
  };
}
