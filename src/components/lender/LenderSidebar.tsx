
import { Button } from "@/components/ui/button";
import { BarChart3, DollarSign, Brain, Archive, Users, FileSpreadsheet, Building } from "lucide-react";
import { Link } from "react-router-dom";
import LenderAccountCard from "./LenderAccountCard";
import SidebarNavButton from "@/components/layout/SidebarNavButton";

const LenderSidebar = () => {
  return (
    <aside className="w-full md:w-64 space-y-6">
      <LenderAccountCard />
      
      <nav className="space-y-1">
        <SidebarNavButton
          to="/lender-dashboard"
          icon={BarChart3}
          label="Deal Activity"
        />
        <SidebarNavButton
          to="/marketplace"
          icon={DollarSign}
          label="Marketplace"
          state={{ from: 'lender-dashboard' }}
        />
        <SidebarNavButton
          to="/enterprise-network"
          icon={Building}
          label="Enterprise Network"
          state={{ from: 'lender-dashboard' }}
        />
        <SidebarNavButton
          to="/intelligence"
          icon={Brain}
          label="Intelligence"
          state={{ from: 'lender-dashboard' }}
        />
        <SidebarNavButton
          to="/transaction-archive"
          icon={Archive}
          label="Transaction Archive"
          state={{ from: 'lender-dashboard' }}
        />
        <SidebarNavButton
          to="/enterprise-network"
          icon={Users}
          label="Enterprise Community"
          state={{ from: 'lender-dashboard' }}
        />
        <SidebarNavButton
          to="/underwriting"
          icon={FileSpreadsheet}
          label="Underwriting"
          state={{ from: 'lender-dashboard' }}
        />
      </nav>
    </aside>
  );
};

export default LenderSidebar;
