
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FolderPlus, 
  Upload, 
  Folder, 
  FileText, 
  Download, 
  Trash2, 
  Search, 
  ArrowLeft, 
  Radar, 
  Signal,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const VDR = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolder, setCurrentFolder] = useState("root");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [fileToDelete, setFileToDelete] = useState<{ id: string; name: string } | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const folders = [
    { id: "f1", name: "Financial Documents", parent: "root" },
    { id: "f2", name: "Legal Documents", parent: "root" },
    { id: "f3", name: "Project Materials", parent: "root" },
    { id: "f4", name: "Financial Statements", parent: "root" },
    { id: "f5", name: "KYC Documentation", parent: "root" },
    { id: "f6", name: "Q1 Reports", parent: "f1" },
    { id: "f7", name: "Q2 Reports", parent: "f1" },
  ];

  const [files, setFiles] = useState([
    { id: "d1", name: "Annual Report 2024.pdf", folder: "root", size: "4.2 MB", date: "2024-04-01", type: "pdf" },
    { id: "d2", name: "Corporate Structure.docx", folder: "root", size: "1.8 MB", date: "2024-03-15", type: "docx" },
    { id: "d3", name: "Financial Statement.xlsx", folder: "f1", size: "3.1 MB", date: "2024-03-20", type: "xlsx" },
    { id: "d4", name: "NDA Template.pdf", folder: "f2", size: "0.8 MB", date: "2024-03-01", type: "pdf" },
    { id: "d5", name: "Project Timeline.pptx", folder: "f3", size: "6.5 MB", date: "2024-03-25", type: "pptx" },
    { id: "d6", name: "Balance Sheet 2024.xlsx", folder: "f4", size: "2.3 MB", date: "2024-04-02", type: "xlsx" },
    { id: "d7", name: "Income Statement.xlsx", folder: "f4", size: "1.9 MB", date: "2024-04-02", type: "xlsx" },
    { id: "d8", name: "Passport Copy.pdf", folder: "f5", size: "1.2 MB", date: "2024-03-10", type: "pdf" },
    { id: "d9", name: "Company Registration.pdf", folder: "f5", size: "2.8 MB", date: "2024-03-12", type: "pdf" },
  ]);

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

  const simulateFileUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            finishUpload();
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const finishUpload = () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const newFiles = Array.from(selectedFiles).map((file, index) => {
      const fileId = `d${Date.now()}-${index}`;
      const fileSize = (file.size / (1024 * 1024)).toFixed(1);
      const today = new Date().toISOString().split('T')[0];
      const fileType = file.name.split('.').pop() || '';
      
      return {
        id: fileId,
        name: file.name,
        folder: currentFolder,
        size: `${fileSize} MB`,
        date: today,
        type: fileType
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
    setIsUploading(false);
    setSelectedFiles(null);
    setIsUploadDialogOpen(false);
    
    toast({
      title: "Files uploaded successfully",
      description: `Uploaded ${newFiles.length} file(s) to current folder`,
    });
  };

  const handleUpload = () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload",
        variant: "destructive"
      });
      return;
    }

    simulateFileUpload();
  };

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Folder name required",
        description: "Please enter a name for the new folder",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Folder created",
      description: `Created folder: ${newFolderName}`,
    });
    
    setIsNewFolderDialogOpen(false);
    setNewFolderName("");
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

  const getCurrentFolderPath = () => {
    if (currentFolder === "root") return "Home";
    
    const getFolderName = (folderId: string) => {
      const folder = folders.find(f => f.id === folderId);
      return folder ? folder.name : "";
    };
    
    return getFolderName(currentFolder);
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="text-red-500" />;
      case "docx":
        return <FileText className="text-blue-500" />;
      case "xlsx":
        return <FileText className="text-green-500" />;
      case "pptx":
        return <FileText className="text-orange-500" />;
      default:
        return <FileText />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative grid-bg">
      <div className="absolute inset-0 z-0">
        <div className="radar-pulse bg-blue-500/10"></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "1s" }}></div>
        <div className="radar-pulse bg-blue-500/10" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="scanline z-10"></div>
      
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
                onClick={() => navigate("/enterprise-dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                BACK TO DASHBOARD
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-6 py-8 relative z-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-mono mb-1">Virtual Data Room</h1>
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
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-none font-mono text-xs">
                    <Upload className="h-4 w-4 mr-2" />
                    UPLOAD FILES
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Upload Files</DialogTitle>
                    <DialogDescription>
                      Select files to upload to the current folder
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {isUploading ? (
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-300 ease-in-out" 
                            style={{ width: `${uploadProgress}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          Uploading... {uploadProgress}%
                        </p>
                      </div>
                    ) : (
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        onChange={(e) => setSelectedFiles(e.target.files)}
                      />
                    )}
                  </div>
                  <DialogFooter>
                    {!isUploading && (
                      <>
                        <Button 
                          variant="ghost" 
                          onClick={() => setIsUploadDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleUpload}>Upload</Button>
                      </>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-none font-mono text-xs">
                    <FolderPlus className="h-4 w-4 mr-2" />
                    NEW FOLDER
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Create New Folder</DialogTitle>
                    <DialogDescription>
                      Enter a name for the new folder
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Input
                      placeholder="Folder name"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button 
                      variant="ghost" 
                      onClick={() => setIsNewFolderDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateFolder}>Create</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFolders.map((folder) => (
              <Card 
                key={folder.id} 
                className="border-primary/20 bg-background/50 backdrop-blur-sm cursor-pointer hover:border-primary/40 transition-colors"
                onClick={() => handleFolderClick(folder.id)}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <Folder className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono text-sm truncate">{folder.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Folder</p>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredFiles.map((file) => (
              <Card key={file.id} className="border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/40 transition-colors">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-mono text-sm truncate">{file.name}</h3>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                      <p className="text-xs text-muted-foreground">{file.date}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-2 border-t border-primary/10 flex justify-end gap-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(file);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {filteredFolders.length === 0 && filteredFiles.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <Database className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-mono mb-2">No items found</h3>
                <p className="text-muted-foreground max-w-md">
                  {searchQuery 
                    ? "No matching files or folders found. Try a different search term." 
                    : "This folder is empty. Upload files or create new folders to get started."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{fileToDelete?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VDR;
