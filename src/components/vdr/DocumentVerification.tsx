
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertCircle, Upload, Info, Clock, CheckCircle, FileText } from "lucide-react";
import { useVDR } from "@/contexts/vdr/VDRContext";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

  const { setIsUploadDialogOpen } = useVDR();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-500/20 text-emerald-500 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-500 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Rejected</Badge>;
      case "uploaded":
        return <Badge className="bg-blue-500/20 text-blue-500 flex items-center gap-1"><FileText className="h-3 w-3" /> Uploaded</Badge>;
      default:
        return <Badge className="bg-amber-500/20 text-amber-500 flex items-center gap-1"><Clock className="h-3 w-3" /> Awaiting Upload</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-mono mb-1">Required Documents</h2>
          <p className="text-muted-foreground">Please upload all required documentation to proceed with your application.</p>
        </div>
        
        <Button 
          variant="default" 
          className="font-mono"
          onClick={() => setIsUploadDialogOpen(true)}
        >
          <Upload className="h-4 w-4 mr-2" />
          UPLOAD DOCUMENT
        </Button>
      </div>
      
      <Alert variant="warning" className="bg-amber-500/10 border-amber-500/20">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-amber-500">
          0 out of {requiredDocuments.length} required documents uploaded
        </AlertDescription>
      </Alert>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary/5 border-b border-primary/20">
              <TableHead className="text-primary font-mono">DOCUMENT TYPE</TableHead>
              <TableHead className="text-primary font-mono">DESCRIPTION</TableHead>
              <TableHead className="text-primary font-mono">STATUS</TableHead>
              <TableHead className="text-primary font-mono w-[100px]">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requiredDocuments.map((doc) => (
              <TableRow key={doc.id} className="border-b border-primary/10">
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell className="flex items-center">
                  <Info className="h-4 w-4 text-primary/60 mr-2" />
                  {doc.description}
                </TableCell>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="rounded-none border-primary/20 text-xs"
                    onClick={() => setIsUploadDialogOpen(true)}
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
      
      <div className="flex justify-between items-center mt-10">
        <Button 
          variant="outline" 
          className="rounded-none font-mono border-primary/20"
        >
          Back
        </Button>
        
        <Button 
          variant="default" 
          className="rounded-none font-mono"
          disabled={true}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default DocumentVerification;
