
import { Calendar, Home, Inbox, Terminal, Building, Book, BarChart3, DollarSign } from 'lucide-react';
import { ReactNode } from 'react';

export interface NavMenuItem {
  title: string;
  path: string;
  icon?: ReactNode;
}

export const mainMenuItems: NavMenuItem[] = [
  {
    title: "HOME PAGE",
    path: "/",
  },
  {
    title: "MARKETPLACE",
    path: "/marketplace",
  },
  {
    title: "ENTERPRISE DASHBOARD",
    path: "/enterprise-dashboard",
  },
  {
    title: "LENDER DASHBOARD",
    path: "/lender-dashboard",
  },
  {
    title: "INTELLIGENCE",
    path: "/intelligence",
  },
  {
    title: "EDUCATION",
    path: "/education",
  },
  {
    title: "FACILITY BUILDER",
    path: "/facility-builder",
    icon: <Building className="h-4 w-4 mr-2" />,
  },
  {
    title: "LENDERS",
    path: "/lenders",
    icon: <Building className="h-4 w-4 mr-2" />,
  },
];

export const getAccessButton = () => ({
  title: "ACCESS",
  path: "/access",
  icon: <Terminal className="h-4 w-4 mr-2" />,
});
