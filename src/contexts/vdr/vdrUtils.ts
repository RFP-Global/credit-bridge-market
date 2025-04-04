
import { Folder, File } from './types';
import { toast } from "@/hooks/use-toast";

export const getParentFolder = (currentFolder: string, folders: Folder[]) => {
  if (currentFolder === "root") return null;
  const currentFolderObj = folders.find(f => f.id === currentFolder);
  return currentFolderObj ? currentFolderObj.parent : "root";
};

export const createNewFile = (file: globalThis.File, currentFolder: string, fileContent?: string) => {
  const fileId = `d${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const fileSize = (file.size / (1024 * 1024)).toFixed(1);
  const today = new Date().toISOString().split('T')[0];
  const fileType = file.name.split('.').pop() || '';
  
  return {
    id: fileId,
    name: file.name,
    folder: currentFolder,
    size: `${fileSize} MB`,
    date: today,
    type: fileType,
    content: fileContent || `Content of ${file.name} - This is a placeholder for the actual file content that would be displayed in a real application.`
  };
};

export const handleFileUploadUtil = (
  selectedFiles: FileList, 
  currentFolder: string, 
  setFiles: React.Dispatch<React.SetStateAction<File[]>>,
  fileContents?: {[filename: string]: string}
) => {
  const newFiles = Array.from(selectedFiles).map((file) => {
    const fileContent = fileContents && fileContents[file.name] 
      ? fileContents[file.name]
      : undefined;
    
    return createNewFile(file, currentFolder, fileContent);
  });
  
  setFiles(prev => [...prev, ...newFiles]);
  
  toast({
    title: "Files uploaded successfully",
    description: `Uploaded ${newFiles.length} file(s) to current folder`,
  });
};

export const handleCreateFolderUtil = (
  folderName: string, 
  currentFolder: string,
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>
) => {
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

export const handleDeleteFileUtil = (
  file: { id: string; name: string }, 
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
) => {
  setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
  
  toast({
    title: "File deleted",
    description: `Successfully deleted: ${file.name}`,
  });
};

export const getCurrentFolderPathUtil = (currentFolder: string, folders: Folder[]) => {
  if (currentFolder === "root") return "Home";
  
  const getFolderName = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    return folder ? folder.name : "";
  };
  
  return getFolderName(currentFolder);
};
