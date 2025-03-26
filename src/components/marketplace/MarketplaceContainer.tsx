import { ReactNode, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import FullscreenButton from "@/components/FullscreenButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarketplacePagination from "@/components/marketplace/MarketplacePagination";

interface MarketplaceContainerProps {
  children: ReactNode;
  headerSection: ReactNode;
  paginationProps: {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
  };
}

const MarketplaceContainer = ({
  children,
  headerSection,
  paginationProps,
}: MarketplaceContainerProps) => {
  const { currentPage, totalPages, handlePageChange } = paginationProps;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sonarPulses, setSonarPulses] = useState<Array<{ id: number; x: number; y: number; timestamp: number }>>([]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  
  const handleClick = (e: React.MouseEvent) => {
    const newPulse = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now(),
    };
    
    setSonarPulses((prevPulses) => [...prevPulses, newPulse]);
  };
  
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setSonarPulses((prevPulses) => 
        prevPulses.filter((pulse) => now - pulse.timestamp < 4000)
      );
    }, 1000);
    
    return () => clearInterval(cleanupInterval);
  }, []);

  return (
    <div 
      className="min-h-screen bg-background text-foreground relative grid-bg"
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <Navbar />
      <FullscreenButton />
      
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#0e253c] opacity-40"></div>
        
        <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-[#33C3F0]">
          <div className="radar-pulse"></div>
          <div className="radar-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="radar-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="radar-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        
        {sonarPulses.map((pulse) => (
          <div 
            key={pulse.id}
            className="absolute w-4 h-4 rounded-full bg-transparent"
            style={{
              top: pulse.y,
              left: pulse.x,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-[#33C3F0] opacity-70 animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] rounded-full border-2 border-[#33C3F0] opacity-30 animate-ping" style={{ animationDuration: '3s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500%] h-[500%] rounded-full border border-[#33C3F0] opacity-20 animate-ping" style={{ animationDuration: '4s' }}></div>
          </div>
        ))}
        
        <div 
          className="absolute w-[400px] h-[400px] rounded-full border border-[#33C3F0] opacity-20 pointer-events-none"
          style={{
            top: mousePosition.y,
            left: mousePosition.x,
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
        
        <div className="scanline"></div>
      </div>
      
      <div className="container mx-auto px-4 py-6 pt-24 h-screen flex flex-col relative z-10">
        <div className="bg-transparent backdrop-blur-sm pb-4 z-30 rounded-md border border-cyan-900/30">
          {headerSection}
        </div>

        <div className="flex-1 overflow-hidden backdrop-blur-sm bg-transparent rounded-md mt-2 border border-cyan-900/30">
          <ScrollArea className="h-[calc(100vh-340px)]">
            <div className="min-w-max">
              {children}
            </div>
          </ScrollArea>
        </div>

        <div className="mt-4 bg-transparent backdrop-blur-sm pt-2 rounded-md border border-cyan-900/30">
          <MarketplacePagination 
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceContainer;
