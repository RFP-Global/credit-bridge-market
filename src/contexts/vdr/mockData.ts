
import { Folder, File } from './types';

export const defaultFolders: Folder[] = [
  { id: "f1", name: "Financial Documents", parent: "root" },
  { id: "f2", name: "Legal Documents", parent: "root" },
  { id: "f3", name: "Project Materials", parent: "root" },
  { id: "f5", name: "KYC Documentation", parent: "root" },
  { id: "f6", name: "Q1 Reports", parent: "f1" },
  { id: "f7", name: "Q2 Reports", parent: "f1" },
];

export const defaultFiles: File[] = [
  { id: "d1", name: "Annual Report 2024.pdf", folder: "root", size: "4.2 MB", date: "2024-04-01", type: "pdf", content: "This is a sample annual report for 2024..." },
  { id: "d2", name: "Corporate Structure.docx", folder: "root", size: "1.8 MB", date: "2024-03-15", type: "docx", content: "Corporate structure details and organization chart..." },
  { id: "d3", name: "Financial Statement.xlsx", folder: "f1", size: "3.1 MB", date: "2024-03-20", type: "xlsx", content: "Financial statement data with quarterly breakdowns..." },
  { id: "d4", name: "NDA Template.pdf", folder: "f2", size: "0.8 MB", date: "2024-03-01", type: "pdf", content: "Non-disclosure agreement template for partners and vendors..." },
  { id: "d5", name: "Project Timeline.pptx", folder: "f3", size: "6.5 MB", date: "2024-03-25", type: "pptx", content: "Project timeline with milestones and deliverables..." },
  { id: "d8", name: "Passport Copy.pdf", folder: "f5", size: "1.2 MB", date: "2024-03-10", type: "pdf", content: "Digitized copy of identification documents..." },
  { id: "d9", name: "Company Registration.pdf", folder: "f5", size: "2.8 MB", date: "2024-03-12", type: "pdf", content: "Official company registration certificate and documents..." },
];
