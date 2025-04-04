
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

interface Folder {
  id: string;
  name: string;
  parent: string;
}

interface File {
  id: string;
  name: string;
  folder: string;
  size: string;
  date: string;
  type: string;
  content?: string;
}

interface VDRContextType {
  currentFolder: string;
  setCurrentFolder: (folderId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  folders: Folder[];
  files: File[];
  filteredFolders: Folder[];
  filteredFiles: File[];
  handleFolderClick: (folderId: string) => void;
  handleBackClick: () => void;
  handleFileUpload: (selectedFiles: FileList) => void;
  handleCreateFolder: (folderName: string) => void;
  handleDeleteFile: (file: { id: string; name: string }) => void;
  handleFileClick: (file: File) => void;
  previewFile: File | null;
  setPreviewFile: (file: File | null) => void;
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
  fileToDelete: { id: string; name: string } | null;
  setFileToDelete: (file: { id: string; name: string } | null) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  getCurrentFolderPath: () => string;
}

const VDRContext = createContext<VDRContextType | undefined>(undefined);

export function VDRProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolder, setCurrentFolder] = useState("root");
  const [fileToDelete, setFileToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const defaultFolders: Folder[] = [
    { id: "f1", name: "Financial Documents", parent: "root" },
    { id: "f2", name: "Legal Documents", parent: "root" },
    { id: "f3", name: "Project Materials", parent: "root" },
    { id: "f5", name: "KYC Documentation", parent: "root" },
    { id: "f6", name: "Q1 Reports", parent: "f1" },
    { id: "f7", name: "Q2 Reports", parent: "f1" },
  ];

  const defaultFiles: File[] = [
    { id: "d1", name: "Annual Report 2024.pdf", folder: "root", size: "4.2 MB", date: "2024-04-01", type: "pdf", content: "This is a sample annual report for 2024..." },
    { id: "d2", name: "Corporate Structure.docx", folder: "root", size: "1.8 MB", date: "2024-03-15", type: "docx", content: "Corporate structure details and organization chart..." },
    { id: "d3", name: "Financial Statement.xlsx", folder: "f1", size: "3.1 MB", date: "2024-03-20", type: "xlsx", content: "Financial statement data with quarterly breakdowns..." },
    { id: "d4", name: "NDA Template.pdf", folder: "f2", size: "0.8 MB", date: "2024-03-01", type: "pdf", content: "Non-disclosure agreement template for partners and vendors..." },
    { id: "d5", name: "Project Timeline.pptx", folder: "f3", size: "6.5 MB", date: "2024-03-25", type: "pptx", content: "Project timeline with milestones and deliverables..." },
    { id: "d8", name: "Passport Copy.pdf", folder: "f5", size: "1.2 MB", date: "2024-03-10", type: "pdf", content: "Digitized copy of identification documents..." },
    { id: "d9", name: "Company Registration.pdf", folder: "f5", size: "2.8 MB", date: "2024-03-12", type: "pdf", content: "Official company registration certificate and documents..." },
  ];

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

  const getParentFolder = () => {
    if (currentFolder === "root") return null;
    const currentFolderObj = folders.find(f => f.id === currentFolder);
    return currentFolderObj ? currentFolderObj.parent : "root";
  };

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
  };

  const handleBackClick = () => {
    const parentFolder = getParentFolder();
    if (parentFolder) {
      setCurrentFolder(parentFolder);
    }
  };

  const handleFileUpload = (selectedFiles: FileList) => {
    const newFiles = Array.from(selectedFiles).map((file, index) => {
      const fileId = `d${Date.now()}-${index}`;
      const fileSize = (file.size / (1024 * 1024)).toFixed(1);
      const today = new Date().toISOString().split('T')[0];
      const fileType = file.name.split('.').pop() || '';
      
      const placeholderContent = `Content of ${file.name} - This is a placeholder for the actual file content that would be displayed in a real application.`;
      
      return {
        id: fileId,
        name: file.name,
        folder: currentFolder,
        size: `${fileSize} MB`,
        date: today,
        type: fileType,
        content: placeholderContent
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    
    toast({
      title: "Files uploaded successfully",
      description: `Uploaded ${newFiles.length} file(s) to current folder`,
    });
  };

  const handleCreateFolder = (folderName: string) => {
    const newFolder: Folder = {
      id: `f${Date.now()}`,
      name: folderName,
      parent: currentFolder
    };
    
    setFolders(prev => [...prev, newFolder]);
    
    toast({
      title: "Folder created",
      description: `Created folder: ${folderName}`,
    });
  };

  const handleDeleteFile = (file: { id: string; name: string }) => {
    setFiles(files.filter(f => f.id !== file.id));
    
    toast({
      title: "File deleted",
      description: `Successfully deleted: ${file.name}`,
    });
  };

  const handleFileClick = (file: File) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  const getCurrentFolderPath = () => {
    if (currentFolder === "root") return "Home";
    
    const getFolderName = (folderId: string) => {
      const folder = folders.find(f => f.id === folderId);
      return folder ? folder.name : "";
    };
    
    return getFolderName(currentFolder);
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
