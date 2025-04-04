
import { Button } from "@/components/ui/button";
import { Database, ArrowLeft } from "lucide-react";

interface FolderNavigationProps {
  currentFolder: string;
  getCurrentFolderPath: () => string;
  handleBackClick: () => void;
  setCurrentFolder: (folderId: string) => void;
}

const FolderNavigation = ({
  currentFolder,
  getCurrentFolderPath,
  handleBackClick,
  setCurrentFolder
}: FolderNavigationProps) => {
  return (
    <div className="flex items-center text-sm text-muted-foreground">
      <Database className="h-4 w-4 mr-1" />
      <span>Current location: </span>
      <button 
        className="ml-1 font-mono text-primary hover:underline"
        onClick={() => setCurrentFolder("root")}
        disabled={currentFolder === "root"}
      >
        Root
      </button>
      {currentFolder !== "root" && (
        <>
          <span className="mx-1">/</span>
          <span className="font-mono">{getCurrentFolderPath()}</span>
        </>
      )}
      
      {currentFolder !== "root" && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="ml-2 font-mono text-xs"
          onClick={handleBackClick}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          BACK
        </Button>
      )}
    </div>
  );
};

export default FolderNavigation;
