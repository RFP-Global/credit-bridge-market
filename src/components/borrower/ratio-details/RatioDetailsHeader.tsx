
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RatioDetailsHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-6">
      <div>
        <h1 className="text-2xl font-mono">Financial Ratio Analysis</h1>
        <p className="text-sm text-muted-foreground">
          Detailed breakdown of financial ratios and risk assessment
        </p>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => navigate('/enterprise-dashboard')}
        className="font-mono text-xs"
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Dashboard
      </Button>
    </div>
  );
};

export default RatioDetailsHeader;
