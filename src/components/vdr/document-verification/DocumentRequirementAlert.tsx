
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface DocumentRequirementAlertProps {
  completedCount: number;
  totalCount: number;
}

const DocumentRequirementAlert = ({ completedCount, totalCount }: DocumentRequirementAlertProps) => {
  return (
    <Alert variant="default">
      <AlertCircle className="h-4 w-4 text-amber-500" />
      <AlertTitle className="text-amber-500">Document Verification</AlertTitle>
      <AlertDescription className="text-amber-500">
        {completedCount} out of {totalCount} required documents uploaded
      </AlertDescription>
    </Alert>
  );
};

export default DocumentRequirementAlert;
