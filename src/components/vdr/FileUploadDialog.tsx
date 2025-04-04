
import { useState, useRef, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FileUploadDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadComplete: (files: FileList, contents: {[filename: string]: string}) => void;
}

const FileUploadDialog = ({ isOpen, onOpenChange, onUploadComplete }: FileUploadDialogProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileContents, setFileContents] = useState<{[filename: string]: string}>({});

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setSelectedFiles(files);
    readFileContents(files);
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
    
    onUploadComplete(selectedFiles, fileContents);
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
              onChange={handleFileChange}
            />
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
