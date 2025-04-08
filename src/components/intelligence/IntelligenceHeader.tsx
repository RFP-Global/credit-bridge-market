
import React from 'react';
import { Store, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";

interface IntelligenceHeaderProps {
  previousPage: string | undefined;
}

const IntelligenceHeader = ({ previousPage }: IntelligenceHeaderProps) => {
  const navigate = useNavigate();
  
  // Default fallback destination
  const defaultDestination = "/";
  
  // Determine the appropriate back button text based on the previous page
  let backButtonText = "Back to Home";
  
  if (previousPage) {
    if (previousPage.includes('lender-dashboard')) {
      backButtonText = "Back to Lender Dashboard";
    } else if (previousPage.includes('enterprise-dashboard')) {
      backButtonText = "Back to Enterprise Dashboard";
    } else if (previousPage.includes('marketplace')) {
      backButtonText = "Back to Marketplace";
    } else if (previousPage.includes('underwriting')) {
      backButtonText = "Back to Underwriting";
    } else if (previousPage.includes('transaction-archive')) {
      backButtonText = "Back to Transaction Archive";
    }
  }

  const handleBackNavigation = () => {
    // Check if we have a valid 'from' path in location state
    if (previousPage) {
      navigate(previousPage);
    } else {
      // Default fallback
      navigate(defaultDestination);
    }
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Store className="h-6 w-6 text-gray-400" />
        <h1 className="text-2xl font-mono text-gray-200">Analytics</h1>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="rounded-none font-mono border-primary/30 text-xs"
        onClick={handleBackNavigation}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        {backButtonText}
      </Button>
    </div>
  );
};

export default IntelligenceHeader;
