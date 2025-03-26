
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Radar, Signal, Terminal, ArrowLeft, Building, Briefcase } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const Access = () => {
  const [selectedMemberType, setSelectedMemberType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedMemberType) {
      toast({
        title: "Selection Required",
        description: "Please select a membership type to continue",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate based on selected membership type
    if (selectedMemberType === "Enterprise") {
      navigate("/enterprise-signup");
    } else if (selectedMemberType === "Lender") {
      navigate("/lender-signup");
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      
      <div className="container mx-auto px-6 py-24 max-w-4xl">
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
            <h1 className="text-3xl font-bold tracking-tight">Select Access Type</h1>
          </div>
          
          <p className="text-muted-foreground mb-10">
            Choose the membership type that best represents your organization to access specialized features and resources.
          </p>
          
          <RadioGroup 
            className="gap-4"
            value={selectedMemberType || ""} 
            onValueChange={setSelectedMemberType}
          >
            <div 
              className={`relative flex items-start p-6 border rounded-md transition-all ${
                selectedMemberType === "Enterprise" 
                  ? "border-primary bg-primary/5" 
                  : "border-muted-foreground/20 hover:border-muted-foreground/30"
              }`}
              onClick={() => setSelectedMemberType("Enterprise")}
            >
              <div className="absolute top-6 left-6">
                <RadioGroupItem value="Enterprise" id="enterprise" className="mt-1" />
              </div>
              <div className="pl-10">
                <div className="flex items-center mb-2">
                  <Building className="h-5 w-5 mr-2 text-primary" />
                  <label 
                    htmlFor="enterprise" 
                    className="text-xl font-semibold cursor-pointer"
                  >
                    Enterprise Member
                  </label>
                </div>
                <p className="text-muted-foreground text-sm ml-7">
                  For businesses seeking capital, refinancing, or exploring credit opportunities. Access custom RFP tools, lender marketplace, and industry analytics.
                </p>
              </div>
            </div>
            
            <div 
              className={`relative flex items-start p-6 border rounded-md transition-all ${
                selectedMemberType === "Lender" 
                  ? "border-primary bg-primary/5" 
                  : "border-muted-foreground/20 hover:border-muted-foreground/30"
              }`}
              onClick={() => setSelectedMemberType("Lender")}
            >
              <div className="absolute top-6 left-6">
                <RadioGroupItem value="Lender" id="lender" className="mt-1" />
              </div>
              <div className="pl-10">
                <div className="flex items-center mb-2">
                  <Briefcase className="h-5 w-5 mr-2 text-primary" />
                  <label 
                    htmlFor="lender" 
                    className="text-xl font-semibold cursor-pointer"
                  >
                    Lender Member
                  </label>
                </div>
                <p className="text-muted-foreground text-sm ml-7">
                  For financial institutions, private credit funds, and capital providers. Access curated deal flow, automated matching, and due diligence tools.
                </p>
              </div>
            </div>
          </RadioGroup>
          
          <div className="mt-10 flex justify-end">
            <Button 
              size="lg" 
              className="rounded-none px-8 font-mono"
              onClick={handleContinue}
            >
              <Terminal className="h-4 w-4 mr-2" />
              Continue
            </Button>
          </div>
          
          <div className="text-xs text-muted-foreground/60 mt-10">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Access;
