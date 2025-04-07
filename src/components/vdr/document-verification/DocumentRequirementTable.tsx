
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info, Upload } from "lucide-react";
import { DocumentRequirement } from "./types";
import DocumentStatusBadge from "./DocumentStatusBadge";

interface DocumentRequirementTableProps {
  documents: DocumentRequirement[];
  selectedRequirement: DocumentRequirement | null;
  setSelectedRequirement: React.Dispatch<React.SetStateAction<DocumentRequirement | null>>;
  onUploadClick?: () => void;
}

const DocumentRequirementTable = ({ 
  documents, 
  selectedRequirement, 
  setSelectedRequirement,
  onUploadClick 
}: DocumentRequirementTableProps) => {
  return (
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
          {documents.map((doc) => (
            <TableRow 
              key={doc.id} 
              className={`hover:bg-muted/50 ${selectedRequirement?.id === doc.id ? 'bg-primary/10' : ''}`}
              onClick={() => setSelectedRequirement(doc)}
            >
              <TableCell className="font-medium">{doc.name}</TableCell>
              <TableCell className="text-muted-foreground flex items-center gap-2">
                <Info className="h-4 w-4 text-primary/60" />
                {doc.description}
              </TableCell>
              <TableCell>
                <DocumentStatusBadge status={doc.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onUploadClick) onUploadClick();
                  }}
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
  );
};

export default DocumentRequirementTable;
