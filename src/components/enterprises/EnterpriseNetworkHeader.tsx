
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate, useLocation } from "react-router-dom";

const EnterpriseNetworkHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    // Check if we have a valid 'from' path in location state
    if (location.state && location.state.from) {
      // Navigate to the previous route stored in location state
      navigate(location.state.from);
    } else {
      // If no state is available, go to a safe default route
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={goBack} 
          className="mr-2 hover:bg-secondary/50"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
      </div>
    
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-4">Enterprise Network</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with enterprise customers, follow their activities, 
          and discover potential financing opportunities for your business.
        </p>
      </div>
      
      <Alert className="mb-6 bg-secondary/40 border-primary/10">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Enterprise Profiles are Anonymous</AlertTitle>
        <AlertDescription>
          Enterprise identities are protected at all times to maintain confidentiality.
        </AlertDescription>
      </Alert>
    </>
  );
};

export default EnterpriseNetworkHeader;
