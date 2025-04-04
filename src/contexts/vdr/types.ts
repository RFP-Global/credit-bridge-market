
export interface Folder {
  id: string;
  name: string;
  parent: string;
}

export interface File {
  id: string;
  name: string;
  folder: string;
  size: string;
  date: string;
  type: string;
  content?: string;
}

export interface VDRContextType {
  currentFolder: string;
  setCurrentFolder: (folderId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  folders: Folder[];
  files: File[];
  filteredFolders: Folder[];
  filteredFiles: File[];
  handleFolderClick: (folderId: string) => void;
  handleBackClick: () => void;
  handleFileUpload: (selectedFiles: FileList, fileContents?: {[filename: string]: string}, destinationFolder?: string) => void;
  handleCreateFolder: (folderName: string) => void;
  handleDeleteFile: (file: { id: string; name: string }) => void;
  handleFileClick: (file: File) => void;
  previewFile: File | null;
  setPreviewFile: (file: File | null) => void;
  isPreviewOpen: boolean;
  setIsPreviewOpen: (open: boolean) => void;
  fileToDelete: { id: string; name: string } | null;
  setFileToDelete: (file: { id: string; name: string } | null) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  getCurrentFolderPath: () => string;
}
