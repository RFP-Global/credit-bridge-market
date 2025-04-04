
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Folder, File, VDRContextType } from "./types";
import { defaultFolders, defaultFiles } from "./mockData";
import { 
  getParentFolder, 
  handleFileUploadUtil, 
  handleCreateFolderUtil, 
  handleDeleteFileUtil, 
  getCurrentFolderPathUtil,
  handleMoveFileUtil
} from "./vdrUtils";

const VDRContext = createContext<VDRContextType | undefined>(undefined);

export function VDRProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolder, setCurrentFolder] = useState("root");
  const [fileToDelete, setFileToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [folders, setFolders] = useState<Folder[]>(() => {
    const savedFolders = localStorage.getItem("vdr-folders");
    return savedFolders ? JSON.parse(savedFolders) : defaultFolders;
  });

  const [files, setFiles] = useState<File[]>(() => {
    const savedFiles = localStorage.getItem("vdr-files");
    return savedFiles ? JSON.parse(savedFiles) : defaultFiles;
  });

  useEffect(() => {
    localStorage.setItem("vdr-folders", JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem("vdr-files", JSON.stringify(files));
  }, [files]);

  const filteredFolders = folders
    .filter(folder => folder.parent === currentFolder)
    .filter(folder => folder.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const filteredFiles = files
    .filter(file => file.folder === currentFolder)
    .filter(file => file.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const handleBackClick = () => {
    const parentFolder = getParentFolder(currentFolder, folders);
    if (parentFolder) {
      setCurrentFolder(parentFolder);
    }
  };

  const handleFileUpload = (selectedFiles: FileList, fileContents?: {[filename: string]: string}, destinationFolder?: string) => {
    handleFileUploadUtil(selectedFiles, currentFolder, setFiles, fileContents, destinationFolder);
  };

  const handleCreateFolder = (folderName: string) => {
    handleCreateFolderUtil(folderName, currentFolder, setFolders);
  };

  const handleDeleteFile = (file: { id: string; name: string }) => {
    handleDeleteFileUtil(file, setFiles);
  };

  const handleFileClick = (file: File) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const handleMoveFile = (fileId: string, destinationFolder: string) => {
    handleMoveFileUtil(fileId, destinationFolder, setFiles);
  };

  const getCurrentFolderPath = () => {
    return getCurrentFolderPathUtil(currentFolder, folders);
  };

  return (
    <VDRContext.Provider value={{
      currentFolder,
      setCurrentFolder,
      searchQuery,
      setSearchQuery,
      folders,
      files,
      filteredFolders,
      filteredFiles,
      handleFolderClick,
      handleBackClick,
      handleFileUpload,
      handleCreateFolder,
      handleDeleteFile,
      handleFileClick,
      handleMoveFile,
      previewFile,
      setPreviewFile,
      isPreviewOpen,
      setIsPreviewOpen,
      fileToDelete,
      setFileToDelete,
      isDeleteDialogOpen,
      setIsDeleteDialogOpen,
      getCurrentFolderPath
    }}>
      {children}
    </VDRContext.Provider>
  );
}

export function useVDR() {
  const context = useContext(VDRContext);
  if (context === undefined) {
    throw new Error("useVDR must be used within a VDRProvider");
  }
  return context;
}
