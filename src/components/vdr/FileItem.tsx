
import { FileText, FileImage, FileJson, FileCode, FileAudio, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FileItemProps {
  file: {
    id: string;
    name: string;
    size: string;
    date: string;
    type: string;
    folder: string;
    content?: string;
  };
  onFileClick: (file: any) => void;
  onDeleteClick: (file: { id: string; name: string }) => void;
}

const FileItem = ({ file, onFileClick, onDeleteClick }: FileItemProps) => {
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

  return (
    <Card 
      key={file.id} 
      className="border-primary/20 bg-background/50 backdrop-blur-sm hover:border-primary/40 transition-colors"
      onClick={() => onFileClick(file)}
    >
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
            onDeleteClick(file);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FileItem;
