
import { useState, useRef, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FolderOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useVDR } from "@/contexts/vdr/VDRContext";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Folder } from "@/contexts/vdr/types";
import FileDropZone from "./FileDropZone";

interface FileUploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete: (files: FileList, contents: {[filename: string]: string}, destinationFolder: string) => void;
}

const FileUploadDialog = ({ isOpen, onOpenChange, onUploadComplete }: FileUploadDialogProps) => {
  const { folders, currentFolder } = useVDR();
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileContents, setFileContents] = useState<{[filename: string]: string}>({});
  const [destinationFolder, setDestinationFolder] = useState<string>(currentFolder);

  const handleFileChange = (files: FileList) => {
    if (!files || files.length === 0) return;
    
    setSelectedFiles(files);
    readFileContents(files);
  };

  const getFolderName = (folderId: string): string => {
    if (folderId === "root") return "Root";
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.name : "Unknown";
  };

  const getPathToFolder = (folderId: string, allFolders: Folder[]): string => {
    if (folderId === "root") return "Root";
    
    const path: string[] = [];
    let current = folderId;
    
    while (current !== "root") {
      const folder = allFolders.find(f => f.id === current);
      if (!folder) break;
      
      path.unshift(folder.name);
      current = folder.parent;
    }
    
    path.unshift("Root");
    return path.join(" / ");
  };

  const readFileContents = async (files: FileList) => {
    const contents: {[filename: string]: string} = {};
    
    // Create an array of promises to read each file
    const readPromises = Array.from(files).map(file => {
      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            // Store the result as a string
            let content: string;
            if (typeof event.target.result === 'string') {
              content = event.target.result;
            } else {
              // Convert ArrayBuffer to string if necessary
              const decoder = new TextDecoder();
              content = decoder.decode(event.target.result);
            }
            contents[file.name] = content;
          }
          resolve();
        };
        
        reader.onerror = () => {
          contents[file.name] = `Error reading file: ${file.name}`;
          resolve();
        };
        
        // For binary files, we'd want readAsArrayBuffer
        // but for text content preview, we'll use readAsText
        if (file.type.includes('image/') || 
            file.type.includes('video/') || 
            file.type.includes('audio/') ||
            file.type.includes('application/pdf')) {
          // For these types, just store a placeholder message
          contents[file.name] = `[Binary content of ${file.name}]`;
          resolve();
        } else {
          reader.readAsText(file);
        }
      });
    });
    
    // Wait for all files to be read
    await Promise.all(readPromises);
    setFileContents(contents);
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
    
    onUploadComplete(selectedFiles, fileContents, destinationFolder);
    setIsUploading(false);
    setSelectedFiles(null);
    setFileContents({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Select files to upload and choose a destination folder
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
            <>
              <FileDropZone onFileSelect={handleFileChange} />
              
              <div className="flex flex-col space-y-2">
                <label htmlFor="folder-select" className="text-sm font-medium">
                  Destination Folder
                </label>
                <Select
                  value={destinationFolder}
                  onValueChange={setDestinationFolder}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="h-4 w-4" />
                      <SelectValue placeholder="Select folder" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="root">Root</SelectItem>
                      {folders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.id}>
                          {getPathToFolder(folder.id, folders)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          {!isUploading && (
            <>
              <Button 
                variant="ghost" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpload}>Upload</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
