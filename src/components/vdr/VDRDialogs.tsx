
import { useState, useEffect } from "react";
import { useVDR } from "@/contexts/vdr/VDRContext";
import FilePreview from "@/components/vdr/FilePreview";
import DeleteFileDialog from "@/components/vdr/DeleteFileDialog";
import FileUploadDialog from "@/components/vdr/FileUploadDialog";
import OrganizeFileDialog from "@/components/vdr/OrganizeFileDialog";

interface VDRDialogsProps {
  isUploadDialogOpen: boolean;
  setIsUploadDialogOpen: (open: boolean) => void;
  isFilePreviewOpen?: boolean;
  setIsFilePreviewOpen?: (open: boolean) => void;
  selectedFile?: any;
  setSelectedFile?: (file: any) => void;
}

const VDRDialogs = ({
  isUploadDialogOpen,
  setIsUploadDialogOpen,
  isFilePreviewOpen = false,
  setIsFilePreviewOpen = () => {},
  selectedFile = null,
  setSelectedFile = () => {}
}: VDRDialogsProps) => {
  const [isOrganizeDialogOpen, setIsOrganizeDialogOpen] = useState(false);
  const [fileToOrganize, setFileToOrganize] = useState<{ id: string; name: string; folder: string } | null>(null);

  const {
    previewFile,
    isPreviewOpen,
    setIsPreviewOpen,
    fileToDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteFile,
    handleFileUpload,
    handleMoveFile,
    folders
  } = useVDR();

  // Use context values or props, preferring props if provided
  const previewFileToUse = selectedFile || previewFile;
  const isPreviewOpenToUse = isFilePreviewOpen !== undefined ? isFilePreviewOpen : isPreviewOpen;
  const setIsPreviewOpenToUse = setIsFilePreviewOpen || setIsPreviewOpen;

  useEffect(() => {
    const handleOrganizeFileEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.file) {
        setFileToOrganize(customEvent.detail.file);
        setIsOrganizeDialogOpen(true);
      }
    };

    document.addEventListener('vdr:organize-file', handleOrganizeFileEvent);
    
    return () => {
      document.removeEventListener('vdr:organize-file', handleOrganizeFileEvent);
    };
  }, []);

  const confirmDelete = () => {
    if (fileToDelete) {
      handleDeleteFile(fileToDelete);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleUploadComplete = (files: FileList, contents: {[filename: string]: string}, destinationFolder: string) => {
    handleFileUpload(files, contents, destinationFolder);
    setIsUploadDialogOpen(false);
  };

  const handleOrganizeComplete = (fileId: string, destinationFolder: string) => {
    handleMoveFile(fileId, destinationFolder);
    setIsOrganizeDialogOpen(false);
  };

  return (
    <>
      <FileUploadDialog
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUploadComplete={handleUploadComplete}
      />

      <FilePreview
        file={previewFileToUse}
        isOpen={isPreviewOpenToUse}
        onOpenChange={setIsPreviewOpenToUse}
      />

      <DeleteFileDialog
        fileToDelete={fileToDelete}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
      />

      <OrganizeFileDialog
        file={fileToOrganize}
        folders={folders}
        isOpen={isOrganizeDialogOpen}
        onOpenChange={setIsOrganizeDialogOpen}
        onOrganizeComplete={handleOrganizeComplete}
      />
    </>
  );
};

export default VDRDialogs;
