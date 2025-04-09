import { ReactNode } from "react";
import EnterpriseSidebar from "./EnterpriseSidebar";
import { Radar, Signal, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface EnterpriseLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const EnterpriseLayout = ({ 
  children, 
  title = "Dashboard", 
  description = "Welcome back to your Enterprise portal." 
}: EnterpriseLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "Successfully logged out of your enterprise account",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="scanline z-10"></div>
      
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="relative mr-2">
                  <Radar className="h-6 w-6 text-primary" />
                  <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                <span className="font-mono text-xl">RFP GLOBAL</span>
              </Link>
              <span className="ml-4 text-xs font-mono text-foreground/60 border-l border-primary/20 pl-4">ENTERPRISE PORTAL</span>
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
                className="rounded-none font-mono border-primary/30 text-xs"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          <EnterpriseSidebar />
          
          <main className="flex-1">
            <div className="border-b border-primary/10 pb-4 mb-6">
              <h1 className="text-2xl font-mono">{title}</h1>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseLayout;
