
import { Link } from "react-router-dom";
import { Radar, Signal, ArrowLeft, Upload, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface VDRHeaderProps {
  onBackClick?: () => void;
  onUploadClick?: () => void;
  setIsUploadDialogOpen?: (value: boolean) => void;
  setIsNewFolderDialogOpen?: (value: boolean) => void;
}

const VDRHeader = ({ 
  onBackClick, 
  onUploadClick,
  setIsUploadDialogOpen,
  setIsNewFolderDialogOpen
}: VDRHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/enterprise-dashboard');
    }
  };
  
  const handleUploadClick = () => {
    if (onUploadClick) {
      onUploadClick();
    } else if (setIsUploadDialogOpen) {
      setIsUploadDialogOpen(true);
    }
  };
  
  const handleNewFolderClick = () => {
    if (setIsNewFolderDialogOpen) {
      setIsNewFolderDialogOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="relative mr-2">
                <Radar className="h-6 w-6 text-primary" />
                <Signal className="h-4 w-4 text-primary/70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <span className="font-mono text-xl">RFP GLOBAL</span>
            </Link>
            <span className="ml-4 text-xs font-mono text-foreground/60 border-l border-primary/20 pl-4">VIRTUAL DATA ROOM</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-none font-mono border-primary/30 text-xs"
              onClick={handleBackClick}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              BACK TO DASHBOARD
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-none font-mono border-primary/30 text-xs"
              onClick={handleUploadClick}
            >
              <Upload className="h-4 w-4 mr-1" />
              UPLOAD DOCUMENT
            </Button>
            {setIsNewFolderDialogOpen && (
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-none font-mono border-primary/30 text-xs"
                onClick={handleNewFolderClick}
              >
                <FolderPlus className="h-4 w-4 mr-1" />
                NEW FOLDER
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default VDRHeader;
