
import React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export interface LoadingProps {
  /**
   * The size of the loading indicator
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
  
  /**
   * The type of loading indicator to display
   * @default "spinner"
   */
  variant?: "spinner" | "skeleton" | "dots";
  
  /**
   * Optional text to display with the loading indicator
   */
  text?: string;
  
  /**
   * Center the loading indicator in its container
   * @default false
   */
  centered?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * If using skeleton variant, the height of the skeleton
   */
  skeletonHeight?: string | number;
  
  /**
   * If using skeleton variant, the width of the skeleton
   */
  skeletonWidth?: string | number;
}

const Loading = ({
  size = "default",
  variant = "spinner",
  text,
  centered = false,
  className,
  skeletonHeight,
  skeletonWidth,
}: LoadingProps) => {
  // Size mappings for the spinner
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
  };
  
  // Base container classes
  const containerClasses = cn(
    "flex flex-col items-center gap-2",
    centered && "justify-center",
    className
  );
  
  const renderLoadingIndicator = () => {
    switch (variant) {
      case "spinner":
        return (
          <div className={containerClasses}>
            <Loader className={cn(sizeClasses[size], "animate-spin text-primary")} />
            {text && <p className="text-sm text-muted-foreground font-mono">{text}</p>}
          </div>
        );
      
      case "skeleton":
        return (
          <div className={containerClasses}>
            <Skeleton 
              style={{ 
                height: skeletonHeight || (size === "sm" ? "1rem" : size === "lg" ? "3rem" : "2rem"),
                width: skeletonWidth || (size === "sm" ? "4rem" : size === "lg" ? "12rem" : "8rem")
              }} 
            />
            {text && <p className="text-sm text-muted-foreground font-mono">{text}</p>}
          </div>
        );
      
      case "dots":
        return (
          <div className={containerClasses}>
            <div className="flex space-x-1">
              <div className={cn(
                "rounded-full bg-primary animate-pulse",
                size === "sm" ? "h-1.5 w-1.5" : 
                size === "lg" ? "h-3 w-3" : 
                "h-2 w-2"
              )} style={{ animationDelay: "0ms" }}></div>
              <div className={cn(
                "rounded-full bg-primary animate-pulse",
                size === "sm" ? "h-1.5 w-1.5" : 
                size === "lg" ? "h-3 w-3" : 
                "h-2 w-2"
              )} style={{ animationDelay: "300ms" }}></div>
              <div className={cn(
                "rounded-full bg-primary animate-pulse",
                size === "sm" ? "h-1.5 w-1.5" : 
                size === "lg" ? "h-3 w-3" : 
                "h-2 w-2"
              )} style={{ animationDelay: "600ms" }}></div>
            </div>
            {text && <p className="text-sm text-muted-foreground font-mono">{text}</p>}
          </div>
        );
    }
  };
  
  return renderLoadingIndicator();
};

export { Loading };
