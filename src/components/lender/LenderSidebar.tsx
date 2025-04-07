
import { Button } from "@/components/ui/button";
import { FileText, BarChart3, DollarSign, BriefcaseBusiness, Users, Database, Archive, Brain } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LenderAccountCard from "./LenderAccountCard";
import SidebarNavButton from "@/components/layout/SidebarNavButton";

const LenderSidebar = () => {
  const navigate = useNavigate();

  const handleMarketplaceClick = () => {
    navigate('/marketplace', { state: { from: 'lender-dashboard' } });
  };

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
            Deal Activity
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
          onClick={handleMarketplaceClick}
        >
          <DollarSign className="h-4 w-4 mr-3" />
          Marketplace
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
          asChild
        >
          <Link to="/intelligence">
            <Brain className="h-4 w-4 mr-3" />
            Intelligence
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
          asChild
        >
          <Link to="/transaction-archive">
            <Archive className="h-4 w-4 mr-3" />
            Transaction Archive
          </Link>
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-left font-mono text-sm rounded-none h-auto py-3"
          asChild
        >
          <Link to="/lenders">
            <Users className="h-4 w-4 mr-3" />
            Enterprise Community
          </Link>
        </Button>
      </nav>
    </aside>
  );
};

export default LenderSidebar;
