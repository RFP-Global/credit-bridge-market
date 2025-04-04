
import React from "react";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";

interface DocumentStatusBadgeProps {
  status: string;
}

const DocumentStatusBadge = ({ status }: DocumentStatusBadgeProps) => {
  switch (status) {
    case "approved":
      return (
        <Badge 
          variant="secondary" 
          className="bg-emerald-500/20 text-emerald-500 flex items-center gap-1"
        >
          <CheckCircle className="h-3 w-3" /> Approved
        </Badge>
      );
    case "rejected":
      return (
        <Badge 
          variant="destructive" 
          className="bg-red-500/20 text-red-500 flex items-center gap-1"
        >
          <AlertCircle className="h-3 w-3" /> Rejected
        </Badge>
      );
    case "uploaded":
      return (
        <Badge 
          variant="outline" 
          className="bg-blue-500/20 text-blue-500 flex items-center gap-1"
        >
          <FileText className="h-3 w-3" /> Uploaded
        </Badge>
      );
    default:
      return (
        <Badge 
          variant="outline" 
          className="bg-amber-500/20 text-amber-500 flex items-center gap-1"
        >
          <Clock className="h-3 w-3" /> Awaiting Upload
        </Badge>
      );
  }
};

export default DocumentStatusBadge;
