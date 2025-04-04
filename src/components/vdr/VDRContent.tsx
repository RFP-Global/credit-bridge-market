
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useVDR } from "@/contexts/vdr/VDRContext";
import FolderNavigation from "@/components/vdr/FolderNavigation";
import FolderItem from "@/components/vdr/FolderItem";
import FileItem from "@/components/vdr/FileItem";
import EmptyState from "@/components/vdr/EmptyState";
import { useState } from "react";
import OrganizeFileDialog from "./OrganizeFileDialog";

const VDRContent = () => {
  const {
    searchQuery,
    setSearchQuery,
    currentFolder,
    filteredFolders,
    filteredFiles,
    handleFolderClick,
    handleBackClick,
    handleFileClick,
    setFileToDelete,
    setIsDeleteDialogOpen,
    getCurrentFolderPath,
    setCurrentFolder,
    folders,
    handleMoveFile
  } = useVDR();

  const [isOrganizeDialogOpen, setIsOrganizeDialogOpen] = useState(false);
  const [fileToOrganize, setFileToOrganize] = useState<{ id: string; name: string; folder: string } | null>(null);

  const handleDeleteClick = (file: { id: string; name: string }) => {
    setFileToDelete(file);
    setIsDeleteDialogOpen(true);
  };

  const handleOrganizeClick = (file: any) => {
    setFileToOrganize(file);
    setIsOrganizeDialogOpen(true);
  };

  const handleOrganizeComplete = (fileId: string, destinationFolder: string) => {
    handleMoveFile(fileId, destinationFolder);
    setIsOrganizeDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-6 py-8 relative z-10">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-mono mb-1">Virtual Data Room</h1>
            <FolderNavigation 
              currentFolder={currentFolder}
              getCurrentFolderPath={getCurrentFolderPath}
              handleBackClick={handleBackClick}
              setCurrentFolder={setCurrentFolder}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documents and folders..."
              className="pl-10 rounded-none border-primary/20 focus-visible:ring-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredFolders.map((folder) => (
            <FolderItem
              key={folder.id}
              folder={folder}
              onFolderClick={handleFolderClick}
            />
          ))}
          
          {filteredFiles.map((file) => (
            <FileItem
              key={file.id}
              file={file}
              onFileClick={handleFileClick}
              onDeleteClick={handleDeleteClick}
              onOrganizeClick={handleOrganizeClick}
            />
          ))}
          
          {filteredFolders.length === 0 && filteredFiles.length === 0 && (
            <EmptyState searchQuery={searchQuery} />
          )}
        </div>
      </div>
      
      <OrganizeFileDialog
        file={fileToOrganize}
        folders={folders}
        isOpen={isOrganizeDialogOpen}
        onOpenChange={setIsOrganizeDialogOpen}
        onOrganizeComplete={handleOrganizeComplete}
      />
    </div>
  );
};

export default VDRContent;
