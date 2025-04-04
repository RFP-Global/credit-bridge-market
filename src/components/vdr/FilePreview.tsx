
import { useState } from "react";
import { FileText, FileImage, FileJson, FileCode, FileAudio, Download, X } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FilePreviewProps {
  file: {
    id: string;
    name: string;
    type: string;
    size: string;
    content?: string;
  } | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilePreview = ({ file, isOpen, onOpenChange }: FilePreviewProps) => {
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
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="text-purple-500" />;
      case "json":
        return <FileJson className="text-yellow-500" />;
      case "mp3":
      case "wav":
        return <FileAudio className="text-indigo-500" />;
      case "js":
      case "ts":
      case "html":
      case "css":
        return <FileCode className="text-cyan-500" />;
      default:
        return <FileText />;
    }
  };

  const getFilePreviewContent = (file: any) => {
    if (!file) return null;
    
    const fileExtension = file.type.toLowerCase();
    
    switch (fileExtension) {
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return (
          <div className="flex items-center justify-center p-4">
            <div className="text-center">
              <div className="border border-primary/20 rounded-md p-8 bg-muted/20 mb-4">
                <FileImage className="h-20 w-20 mx-auto text-muted-foreground" />
                <p className="mt-4 text-sm">Image preview would be displayed here</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {file.name} • {file.size}
              </p>
            </div>
          </div>
        );
      case "pdf":
        return (
          <div className="p-4">
            <div className="border border-primary/20 rounded-md p-4 bg-muted/10 mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getFileIcon(file.type)}
                  <span className="font-medium">{file.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">{file.size}</span>
              </div>
              <div className="space-y-2">
                <div className="h-6 bg-muted/30 rounded w-full"></div>
                <div className="h-6 bg-muted/30 rounded w-11/12"></div>
                <div className="h-6 bg-muted/30 rounded w-10/12"></div>
                <div className="h-6 bg-muted/30 rounded w-full"></div>
                <div className="h-6 bg-muted/30 rounded w-9/12"></div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">PDF preview would render here in a real application</p>
            </div>
            <ScrollArea className="h-60 rounded-md border border-primary/20 p-4">
              <pre className="text-xs whitespace-pre-wrap">
                {file.content}
              </pre>
            </ScrollArea>
          </div>
        );
      case "txt":
      case "html":
      case "css":
      case "js":
      case "ts":
      case "json":
      case "xml":
        return (
          <div className="p-4">
            <div className="border border-primary/20 rounded-md p-4 bg-muted/10 mb-4">
              <div className="flex items-center gap-2 mb-2">
                {getFileIcon(file.type)}
                <span className="font-medium">{file.name}</span>
                <span className="text-xs text-muted-foreground ml-auto">{file.size}</span>
              </div>
            </div>
            <ScrollArea className="h-80 rounded-md border border-primary/20 p-4">
              <pre className="text-xs whitespace-pre-wrap">
                {file.content}
              </pre>
            </ScrollArea>
          </div>
        );
      default:
        return (
          <div className="p-4">
            <div className="border border-primary/20 rounded-md p-4 bg-muted/10 mb-4">
              <div className="flex items-center gap-2 mb-2">
                {getFileIcon(file.type)}
                <span className="font-medium">{file.name}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">File preview is not available for this file type</p>
              <ScrollArea className="h-60 rounded-md border border-primary/20 p-4">
                <pre className="text-xs whitespace-pre-wrap">
                  {file.content}
                </pre>
              </ScrollArea>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {file && getFileIcon(file.type)}
            <span>{file?.name}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          {file && getFilePreviewContent(file)}
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <DialogClose asChild>
            <Button variant="ghost" size="sm">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilePreview;
