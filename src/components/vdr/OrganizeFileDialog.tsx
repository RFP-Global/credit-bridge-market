
import { useState, useEffect } from "react";
import { Folder } from "@/contexts/vdr/types";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrganizeFileDialogProps {
  file: {
    id: string;
    name: string;
    folder: string;
  } | null;
  folders: Folder[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOrganizeComplete: (fileId: string, destinationFolder: string) => void;
}

const OrganizeFileDialog = ({ 
  file, 
  folders, 
  isOpen, 
  onOpenChange, 
  onOrganizeComplete 
}: OrganizeFileDialogProps) => {
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  useEffect(() => {
    if (file && isOpen) {
      setSelectedFolder(file.folder);
    }
  }, [file, isOpen]);

  const handleOrganize = () => {
    if (file && selectedFolder) {
      onOrganizeComplete(file.id, selectedFolder);
      onOpenChange(false);
    }
  };

  const getFolderName = (folderId: string) => {
    if (folderId === "root") return "Home";
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.name : "Unknown Folder";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Move File to Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="filename">File</Label>
            <div className="p-2 border rounded bg-muted/20">
              {file?.name}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="folder">Select Destination Folder</Label>
            <Select
              value={selectedFolder}
              onValueChange={setSelectedFolder}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="root">Home</SelectItem>
                {folders.map((folder) => (
                  <SelectItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleOrganize}>
            Move File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizeFileDialog;
