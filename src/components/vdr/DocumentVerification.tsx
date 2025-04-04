
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useVDR } from "@/contexts/vdr/VDRContext";
import DocumentRequirementHeader from "./document-verification/DocumentRequirementHeader";
import DocumentRequirementAlert from "./document-verification/DocumentRequirementAlert";
import DocumentRequirementTable from "./document-verification/DocumentRequirementTable";
import { DocumentRequirement } from "./document-verification/types";

const DocumentVerification = () => {
  // Sample required documents for demonstration
  const requiredDocuments: DocumentRequirement[] = [
    {
      id: "doc1",
      name: "Financial Statements",
      description: "Last 3 years of audited financial statements",
      status: "pending"
    },
    {
      id: "doc2",
      name: "Business Plan",
      description: "Detailed business plan with projections",
      status: "pending"
    },
    {
      id: "doc3",
      name: "Tax Returns",
      description: "Last 2 years of business tax returns",
      status: "pending"
    },
    {
      id: "doc4",
      name: "Bank Statements",
      description: "Last 6 months of bank statements",
      status: "pending"
    },
    {
      id: "doc5",
      name: "Collateral Documentation",
      description: "Documentation for all proposed collateral",
      status: "pending"
    }
  ];

  const { setIsUploadDialogOpen } = useVDR();

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
      <DocumentRequirementHeader 
        onUploadClick={() => setIsUploadDialogOpen(true)} 
      />
      
      <DocumentRequirementAlert 
        completedCount={0} 
        totalCount={requiredDocuments.length} 
      />
      
      <DocumentRequirementTable 
        documents={requiredDocuments} 
        onUploadClick={() => setIsUploadDialogOpen(true)}
      />
      
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          className="font-mono"
        >
          Back
        </Button>
        
        <Button 
          variant="default" 
          className="font-mono"
          disabled
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DocumentVerification;
