
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, Upload, Info, Clock, CheckCircle, FileText } from "lucide-react";
import { useVDR } from "@/contexts/vdr/VDRContext";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  status: "pending" | "uploaded" | "approved" | "rejected";
}

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

  const { uploadDialogOpen } = useVDR();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-500 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive" className="bg-red-500/20 text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Rejected</Badge>;
      case "uploaded":
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-500 flex items-center gap-1"><FileText className="h-3 w-3" /> Uploaded</Badge>;
      default:
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-500 flex items-center gap-1"><Clock className="h-3 w-3" /> Awaiting Upload</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 space-y-6">
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
          onClick={() => uploadDialogOpen(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          UPLOAD DOCUMENT
        </Button>
      </div>
      
      <Alert variant="default">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertTitle className="text-amber-500">Document Verification</AlertTitle>
        <AlertDescription className="text-amber-500">
          0 out of {requiredDocuments.length} required documents uploaded
        </AlertDescription>
      </Alert>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-primary font-mono w-[200px]">DOCUMENT TYPE</TableHead>
              <TableHead className="text-primary font-mono">DESCRIPTION</TableHead>
              <TableHead className="text-primary font-mono w-[150px]">STATUS</TableHead>
              <TableHead className="text-primary font-mono w-[100px] text-right">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requiredDocuments.map((doc) => (
              <TableRow key={doc.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell className="text-muted-foreground flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary/60" />
                  {doc.description}
                </TableCell>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => uploadDialogOpen(true)}
                  >
                    <Upload className="h-3 w-3 mr-1" />
                    Upload
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
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
