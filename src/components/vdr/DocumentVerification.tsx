
import { useState } from "react";
import { useVDR } from "@/contexts/vdr/VDRContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Upload, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DocumentRequirementTable from "./document-verification/DocumentRequirementTable";
import DocumentRequirementHeader from "./document-verification/DocumentRequirementHeader";
import DocumentRequirementAlert from "./document-verification/DocumentRequirementAlert";
import { DocumentRequirement } from "./document-verification/types";

const DocumentVerification = () => {
  const { files, folders } = useVDR();
  const [selectedRequirement, setSelectedRequirement] = useState<DocumentRequirement | null>(null);
  
  // Sample document requirements list
  const documentRequirements: DocumentRequirement[] = [
    {
      id: "req-1",
      name: "Articles of Incorporation",
      description: "Legal document establishing the corporation",
      status: "uploaded"
    },
    {
      id: "req-2",
      name: "Financial Statements (3 years)",
      description: "Annual financial statements including balance sheet, income statement, and cash flow statement",
      status: "pending"
    },
    {
      id: "req-3",
      name: "Business Plan",
      description: "Comprehensive business plan including market analysis, financial projections, and growth strategy",
      status: "approved"
    },
    {
      id: "req-4",
      name: "Tax Returns (3 years)",
      description: "Federal and state tax returns for the past three fiscal years",
      status: "pending"
    },
    {
      id: "req-5",
      name: "Property Appraisal",
      description: "Professional appraisal of property value and condition",
      status: "rejected"
    },
    {
      id: "req-6",
      name: "Environmental Assessment",
      description: "Phase I/II environmental site assessment reports",
      status: "pending"
    }
  ];
  
  // Calculate completion percentage
  const completedRequirements = documentRequirements.filter(
    req => req.status === "uploaded" || req.status === "approved"
  ).length;
  
  const completionPercentage = Math.round(
    (completedRequirements / documentRequirements.length) * 100
  );
  
  // Event handler for the upload button
  const handleUploadClick = () => {
    // If this component had access to the upload dialog state setter, it would use it here
    // For now, we'll trigger a custom event that the parent can listen for
    const event = new CustomEvent('vdr:open-upload-dialog', {
      bubbles: true,
      detail: { source: 'document-verification' }
    });
    document.dispatchEvent(event);
  };
  
  return (
    <div className="space-y-6">
      <DocumentRequirementHeader 
        completionPercentage={completionPercentage} 
        totalRequirements={documentRequirements.length}
        completedRequirements={completedRequirements}
        onUploadClick={handleUploadClick}
      />
      
      <DocumentRequirementAlert 
        completedCount={completedRequirements}
        totalCount={documentRequirements.length}
      />
      
      <Card className="border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-mono">Required Documents</CardTitle>
              <CardDescription>Upload and manage required documentation for your project</CardDescription>
            </div>
            <Button onClick={handleUploadClick} className="rounded-none font-mono text-xs">
              <Upload className="h-4 w-4 mr-2" />
              UPLOAD DOCUMENT
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DocumentRequirementTable 
            documents={documentRequirements}
            selectedRequirement={selectedRequirement}
            setSelectedRequirement={setSelectedRequirement}
            onUploadClick={handleUploadClick}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentVerification;
