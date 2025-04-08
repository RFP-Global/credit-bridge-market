
import React from "react";
import { getCompatibilityLabel } from "@/utils/compatibilityUtils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Shield } from "lucide-react";

interface EnterpriseCompatibilityBadgeProps {
  score: number;
  showDetail?: boolean;
  className?: string;
}

const EnterpriseCompatibilityBadge: React.FC<EnterpriseCompatibilityBadgeProps> = ({
  score,
  showDetail = false,
  className = ""
}) => {
  const { label, color } = getCompatibilityLabel(score);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant="outline" 
            className={`${color} flex items-center gap-1 cursor-help ${className}`}
          >
            <Shield className="h-3 w-3" />
            {showDetail ? `${score}% - ${label}` : label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Compatibility score: {score}%</p>
          <p className="text-xs text-muted-foreground">
            Based on industry alignment, deal size, geographic preference, and business type
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EnterpriseCompatibilityBadge;
