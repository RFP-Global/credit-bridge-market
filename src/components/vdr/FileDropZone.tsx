
import React, { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVDR } from "@/contexts/vdr/VDRContext";

interface FileDropZoneProps {
  onFileSelect: (files: FileList) => void;
}

const FileDropZone = ({ onFileSelect }: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files);
    }
  };
  
  return (
    <div
      className={`border-2 border-dashed rounded-md p-10 transition-all
        ${isDragging ? 'border-primary bg-primary/5' : 'border-primary/20'}
        flex flex-col items-center justify-center text-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Upload className={`h-12 w-12 mb-4 ${isDragging ? 'text-primary' : 'text-muted-foreground'}`} />
      
      <h3 className="text-xl font-mono mb-2">Drop files here</h3>
      <p className="text-muted-foreground mb-4">
        Supported formats: DOC, PDF, PNG, XLS, JPEG
      </p>
      <p className="text-xl font-mono mb-4">or</p>
      
      <Button asChild variant="outline" className="font-mono">
        <label>
          Browse Files
          <input 
            type="file" 
            className="hidden" 
            multiple 
            onChange={handleFileInputChange}
          />
        </label>
      </Button>
    </div>
  );
};

export default FileDropZone;
