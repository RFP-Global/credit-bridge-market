
import { Folder } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FolderItemProps {
  folder: {
    id: string;
    name: string;
  };
  onFolderClick: (folderId: string) => void;
}

const FolderItem = ({ folder, onFolderClick }: FolderItemProps) => {
  return (
    <Card 
      key={folder.id} 
      className="border-primary/20 bg-background/50 backdrop-blur-sm cursor-pointer hover:border-primary/40 transition-colors"
      onClick={() => onFolderClick(folder.id)}
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
  );
};

export default FolderItem;
