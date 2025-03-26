
import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type CustomBadgeVariant = "success" | "warning";

interface CustomBadgeProps {
  variant: CustomBadgeVariant | "default" | "secondary" | "destructive" | "outline";
  children: React.ReactNode;
  className?: string;
}

export function CustomBadge({ variant, children, className }: CustomBadgeProps) {
  // Define custom colors based on variant
  if (variant === "success") {
    return (
      <Badge className={cn("bg-green-500/20 text-green-400 hover:bg-green-500/30", className)}>
        {children}
      </Badge>
    );
  }
  
  if (variant === "warning") {
    return (
      <Badge className={cn("bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30", className)}>
        {children}
      </Badge>
    );
  }

  // Use the default badge for standard variants
  return (
    <Badge variant={variant as "default" | "secondary" | "destructive" | "outline"} className={className}>
      {children}
    </Badge>
  );
}
