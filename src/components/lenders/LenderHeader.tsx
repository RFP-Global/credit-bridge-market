
import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LenderHeaderProps {
  title: string;
  subtitle: string;
}

const LenderHeader: React.FC<LenderHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="border-b border-primary/10 pb-4 mb-6">
      <h1 className="text-2xl font-mono">{title}</h1>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default LenderHeader;
