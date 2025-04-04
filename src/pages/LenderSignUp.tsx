
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Radio, ArrowLeft, Lock, Building, User, Mail, Landmark } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const LenderSignUp = () => {
  const [formData, setFormData] = useState({
    institutionName: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    institutionType: "",
    agreeTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreeTerms: checked }));
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please ensure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.agreeTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate sign up process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account Created",
        description: "Your lender account has been registered",
      });
      navigate("/lender-login");
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
            <h1 className="text-xl font-mono tracking-tight text-foreground/90">Lender Registration</h1>
          </div>
          
          <div className="text-xs font-mono text-muted-foreground mb-6 border-b border-primary/10 pb-4">
            <span className="flex items-center">
              <Lock className="h-3 w-3 mr-2 text-primary" />
              SECURE REGISTRATION PROTOCOL // CLEARANCE LEVEL 3
            </span>
          </div>
          
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="institutionName" className="text-sm font-mono">INSTITUTION NAME</Label>
              <div className="relative">
                <Landmark className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="institutionName"
                  name="institutionName"
                  type="text"
                  placeholder="Your Institution Name"
                  value={formData.institutionName}
                  onChange={handleChange}
                  className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary/40 pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-mono">REPRESENTATIVE NAME</Label>
              <div className="relative">
                <User className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary/40 pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-mono">LENDER IDENTIFIER</Label>
              <div className="relative">
                <Mail className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="lender@institution.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary/40 pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institutionType" className="text-sm font-mono">INSTITUTION TYPE</Label>
              <div className="relative">
                <Building className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="institutionType"
                  name="institutionType"
                  type="text"
                  placeholder="e.g. Bank, Credit Union, VC Firm"
                  value={formData.institutionType}
                  onChange={handleChange}
                  className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary/40 pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-mono">ACCESS CODE</Label>
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary/40 pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-mono">CONFIRM ACCESS CODE</Label>
              <div className="relative">
                <Lock className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary/40 pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox 
                id="agreeTerms" 
                checked={formData.agreeTerms} 
                onCheckedChange={handleCheckboxChange} 
                className="mt-1"
              />
              <Label htmlFor="agreeTerms" className="text-xs font-mono leading-tight">
                I agree to the terms of service and privacy policy. All data transmitted to RFP GLOBAL 
                will be encrypted and handled according to security protocols.
              </Label>
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
                  Register Account
                </>
              )}
            </Button>

            <div className="text-center text-xs font-mono text-muted-foreground">
              Already registered? 
              <Link to="/lender-login" className="text-primary ml-1 hover:underline">
                Access your account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LenderSignUp;
