
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DocumentationTableProps {
  transactionDetails: any;
  className?: string;
}

const DocumentationTable = ({ transactionDetails, className = "" }: DocumentationTableProps) => {
  // Generate more specific document names based on business details
  const getDocumentName = (index: number) => {
    const borrowerInfo = transactionDetails?.borrowerInfo || {};
    const businessName = borrowerInfo.company || "Company";
    const businessType = borrowerInfo.businessType || "Corporation";
    
    const baseDocuments = [
      `${businessName} Term Sheet`,
      `${businessName} Credit Agreement`,
      `${businessName} Promissory Note`,
      `${businessType} Security Agreement`,
      `Corporate Guaranty for ${businessName}`,
      `${borrowerInfo.subSector || 'Industry'} Due Diligence Report`,
      `${businessName} Financial Statements FY${new Date().getFullYear() - 1}`,
      `${businessName} Collateral Evaluation`
    ];
    
    const additionalDocuments = [
      `${businessName} Tax Returns`,
      `${businessName} Business License - ${borrowerInfo.state || 'State'}`,
      `${businessName} Articles of Incorporation`,
      `${businessName} Balance Sheet`,
      `${businessName} Cash Flow Projections`,
      `${businessType} UCC Filing Documentation`,
      `${businessName} Ownership Structure`,
      `Real Estate Appraisal - ${borrowerInfo.city || 'City'}, ${borrowerInfo.state || 'State'}`
    ];
    
    const allDocuments = [...baseDocuments, ...additionalDocuments];
    return allDocuments[index % allDocuments.length] + (index >= allDocuments.length ? ` ${Math.floor(index / allDocuments.length) + 1}` : "");
  };

  return (
    <div className={`bg-black/50 border border-gray-800/50 rounded-lg p-5 ${className}`}>
      <h2 className="text-lg font-medium text-cyan-300 mb-4 border-b border-gray-800/50 pb-2">
        Transaction Documentation
      </h2>
      
      <Table>
        <TableHeader>
          <TableRow className="border-gray-800">
            <TableHead className="text-cyan-200">Document Name</TableHead>
            <TableHead className="text-cyan-200">Type</TableHead>
            <TableHead className="text-cyan-200">Date</TableHead>
            <TableHead className="text-cyan-200">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: transactionDetails?.documentation || 0 }).map((_, i) => (
            <TableRow key={i} className="border-gray-800/30">
              <TableCell className="font-mono">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-cyan-400" />
                  {getDocumentName(i)}
                </div>
              </TableCell>
              <TableCell className="font-mono">
                {["Legal", "Financial", "Compliance", "Analysis", "Agreement", "Regulatory", "Corporate", "Tax"][i % 8]}
              </TableCell>
              <TableCell className="font-mono">
                {new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-700/50">
                  Completed
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DocumentationTable;
