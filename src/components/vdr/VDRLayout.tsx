
import { ReactNode } from "react";

interface VDRLayoutProps {
  children: ReactNode;
}

const VDRLayout = ({ children }: VDRLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      {children}
    </div>
  );
};

export default VDRLayout;
