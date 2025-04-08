
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, EyeOff, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate, useLocation } from "react-router-dom";

const EnterpriseNetworkHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={goBack} 
          className="mr-2"
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
      
      <Alert className="mb-6 bg-primary/5 border-primary/20">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Enterprise Profiles are Anonymous</AlertTitle>
        <AlertDescription className="flex items-center">
          Enterprise identities are protected by default. Click the <EyeOff className="h-3 w-3 mx-1" /> icon to toggle profile visibility.
        </AlertDescription>
      </Alert>
    </>
  );
};

export default EnterpriseNetworkHeader;
