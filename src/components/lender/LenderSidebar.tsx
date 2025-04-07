
import { Button } from "@/components/ui/button";
import { FileText, BarChart3, DollarSign, BriefcaseBusiness, Users } from "lucide-react";
import { Link } from "react-router-dom";
import LenderAccountCard from "./LenderAccountCard";

const LenderSidebar = () => {
  return (
    <aside className="w-full md:w-64 space-y-6">
      <LenderAccountCard />
      
      <nav className="space-y-1">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3 bg-primary/5 text-primary border-l-2 border-primary"
          asChild
        >
          <Link to="/lender-dashboard">
            <BarChart3 className="h-4 w-4 mr-3" />
            Dashboard
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
          <FileText className="h-4 w-4 mr-3" />
          Active RFPs
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
          asChild
        >
          <Link to="/marketplace">
            <DollarSign className="h-4 w-4 mr-3" />
            Marketplace
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
          <BriefcaseBusiness className="h-4 w-4 mr-3" />
          Portfolio
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3">
          <Users className="h-4 w-4 mr-3" />
          Borrowers
        </Button>
      </nav>
    </aside>
  );
};

export default LenderSidebar;
