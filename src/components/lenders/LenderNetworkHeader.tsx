
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const LenderNetworkHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      // If no specific previous page is stored, navigate to a safe fallback
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
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" /> Back
        </Button>
      </div>
    
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Banker Network</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with banking professionals, follow their activities, 
          and discover potential financing partners for your business.
        </p>
      </div>
    </>
  );
};

export default LenderNetworkHeader;
