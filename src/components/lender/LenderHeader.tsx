
import { Radar, Signal, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const LenderHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Successfully logged out of your lender account",
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative mr-2">
                <Radar className="h-6 w-6 text-primary" />
                <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="font-typewriter text-xl">RFP GLOBAL</span>
            </Link>
            <span className="ml-4 text-xs font-mono text-foreground/60 border-l border-primary/20 pl-4">LENDER PORTAL</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-primary/10 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-primary/10">
              <Settings className="h-5 w-5" />
            </button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-none font-mono text-xs"
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LenderHeader;
