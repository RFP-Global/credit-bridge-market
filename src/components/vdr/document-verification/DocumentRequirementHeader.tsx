
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface DocumentRequirementHeaderProps {
  onUploadClick: () => void;
}

const DocumentRequirementHeader = ({ onUploadClick }: DocumentRequirementHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h2 className="text-2xl font-mono mb-2 text-primary">Required Documents</h2>
        <p className="text-muted-foreground text-sm">
          Please upload all required documentation to proceed with your application.
        </p>
      </div>
      
      <Button 
        variant="default" 
        className="font-mono"
        onClick={onUploadClick}
      >
        <Upload className="h-4 w-4 mr-2" />
        UPLOAD DOCUMENT
      </Button>
    </div>
  );
};

export default DocumentRequirementHeader;
