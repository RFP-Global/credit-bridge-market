
import { ReactNode } from "react";

interface VDRLayoutProps {
  children: ReactNode;
}

const VDRLayout = ({ children }: VDRLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="scanline z-10"></div>
      {children}
    </div>
  );
};

export default VDRLayout;
