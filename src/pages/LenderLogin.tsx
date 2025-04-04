import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Radio, ArrowLeft, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Label } from "@/components/ui/label";

const LenderLogin = () => {
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
        localStorage.setItem('userType', 'lender');
        
        toast({
          title: "Access Granted",
          description: "Welcome to the Lender Portal",
        });
        navigate("/lender-dashboard");
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
            <Radio className="h-6 w-6 text-primary mr-3" />
            <h1 className="text-xl font-mono tracking-tight text-foreground/90">Lender Account Access</h1>
          </div>
          
          <div className="text-xs font-mono text-muted-foreground mb-6 border-b border-primary/10 pb-4">
            <span className="flex items-center">
              <Lock className="h-3 w-3 mr-2 text-primary" />
              SECURE CONNECTION ESTABLISHED // CLEARANCE LEVEL 3
            </span>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-mono">LENDER IDENTIFIER</Label>
              <Input
                id="email"
                type="email"
                placeholder="lender@institution.com"
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
                  <Radio className="h-4 w-4 mr-2" />
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

export default LenderLogin;
