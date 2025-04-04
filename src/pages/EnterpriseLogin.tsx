
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Radar, Signal, Terminal, ArrowLeft, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Label } from "@/components/ui/label";

const EnterpriseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      if (email && password) {
        // Set user type to localStorage
        localStorage.setItem('userType', 'enterprise');
        
        toast({
          title: "Access Granted",
          description: "Welcome to the Enterprise Portal",
        });
        navigate("/enterprise-dashboard");
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid credentials provided",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <div className="container mx-auto px-6 py-24 max-w-md">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="border border-primary/20 bg-background/50 backdrop-blur-sm p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
          
          <div className="flex items-center mb-6">
            <div className="relative mr-3">
              <Radar className="h-6 w-6 text-primary" />
              <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h1 className="text-xl font-mono tracking-tight text-foreground/90">Enterprise Account Access</h1>
          </div>
          
          <div className="text-xs font-mono text-muted-foreground mb-6 border-b border-primary/10 pb-4">
            <span className="flex items-center">
              <Lock className="h-3 w-3 mr-2 text-primary" />
              SECURE CONNECTION ESTABLISHED // CLEARANCE LEVEL 4
            </span>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-mono">AGENT IDENTIFIER</Label>
              <Input
                id="email"
                type="email"
                placeholder="agent@organization.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary/40"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-mono">ACCESS CODE</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary/40"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full rounded-none px-8 py-6 font-mono"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <Terminal className="h-4 w-4 mr-2" />
                  Authenticate
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseLogin;
