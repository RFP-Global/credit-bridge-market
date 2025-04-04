import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

// Import our new components
import VDRHeader from "@/components/vdr/VDRHeader";
import FolderNavigation from "@/components/vdr/FolderNavigation";
import FolderItem from "@/components/vdr/FolderItem";
import FileItem from "@/components/vdr/FileItem";
import EmptyState from "@/components/vdr/EmptyState";
import FilePreview from "@/components/vdr/FilePreview";
import FileUploadDialog from "@/components/vdr/FileUploadDialog";
import NewFolderDialog from "@/components/vdr/NewFolderDialog";
import DeleteFileDialog from "@/components/vdr/DeleteFileDialog";

// Define types for our data
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

const VDR = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolder, setCurrentFolder] = useState("root");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Define default folders
  const defaultFolders: Folder[] = [
    { id: "f1", name: "Financial Documents", parent: "root" },
    { id: "f2", name: "Legal Documents", parent: "root" },
    { id: "f3", name: "Project Materials", parent: "root" },
    { id: "f5", name: "KYC Documentation", parent: "root" },
    { id: "f6", name: "Q1 Reports", parent: "f1" },
    { id: "f7", name: "Q2 Reports", parent: "f1" },
  ];

  // Define default files
  const defaultFiles: File[] = [
    { id: "d1", name: "Annual Report 2024.pdf", folder: "root", size: "4.2 MB", date: "2024-04-01", type: "pdf", content: "This is a sample annual report for 2024..." },
    { id: "d2", name: "Corporate Structure.docx", folder: "root", size: "1.8 MB", date: "2024-03-15", type: "docx", content: "Corporate structure details and organization chart..." },
    { id: "d3", name: "Financial Statement.xlsx", folder: "f1", size: "3.1 MB", date: "2024-03-20", type: "xlsx", content: "Financial statement data with quarterly breakdowns..." },
    { id: "d4", name: "NDA Template.pdf", folder: "f2", size: "0.8 MB", date: "2024-03-01", type: "pdf", content: "Non-disclosure agreement template for partners and vendors..." },
    { id: "d5", name: "Project Timeline.pptx", folder: "f3", size: "6.5 MB", date: "2024-03-25", type: "pptx", content: "Project timeline with milestones and deliverables..." },
    { id: "d8", name: "Passport Copy.pdf", folder: "f5", size: "1.2 MB", date: "2024-03-10", type: "pdf", content: "Digitized copy of identification documents..." },
    { id: "d9", name: "Company Registration.pdf", folder: "f5", size: "2.8 MB", date: "2024-03-12", type: "pdf", content: "Official company registration certificate and documents..." },
  ];

  // Initialize folders state from localStorage or defaults
  const [folders, setFolders] = useState<Folder[]>(() => {
    const savedFolders = localStorage.getItem("vdr-folders");
    return savedFolders ? JSON.parse(savedFolders) : defaultFolders;
  });

  // Initialize files state from localStorage or defaults
  const [files, setFiles] = useState<File[]>(() => {
    const savedFiles = localStorage.getItem("vdr-files");
    return savedFiles ? JSON.parse(savedFiles) : defaultFiles;
  });

  // Save folders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("vdr-folders", JSON.stringify(folders));
  }, [folders]);

  // Save files to localStorage whenever they change
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
      
      // Generate placeholder content for demonstration
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
    setIsUploadDialogOpen(false);
    
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
    setIsNewFolderDialogOpen(false);
    
    toast({
      title: "Folder created",
      description: `Created folder: ${folderName}`,
    });
  };

  const handleDeleteClick = (file: { id: string; name: string }) => {
    setFileToDelete(file);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (fileToDelete) {
      setFiles(files.filter(file => file.id !== fileToDelete.id));
      setIsDeleteDialogOpen(false);
      
      toast({
        title: "File deleted",
        description: `Successfully deleted: ${fileToDelete.name}`,
      });
      
      setFileToDelete(null);
    }
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
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
      <VDRHeader onBackClick={() => navigate("/enterprise-dashboard")} />
      
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
              />
            ))}
            
            {filteredFolders.length === 0 && filteredFiles.length === 0 && (
              <EmptyState searchQuery={searchQuery} />
            )}
          </div>
        </div>
      </div>

      {/* File Preview Dialog */}
      <FilePreview
        file={previewFile}
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteFileDialog
        fileToDelete={fileToDelete}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
};

export default VDR;
