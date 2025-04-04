
import { useVDR } from "@/contexts/VDRContext";
import FilePreview from "@/components/vdr/FilePreview";
import FileUploadDialog from "@/components/vdr/FileUploadDialog";
import DeleteFileDialog from "@/components/vdr/DeleteFileDialog";
import NewFolderDialog from "@/components/vdr/NewFolderDialog";

interface VDRDialogsProps {
  isUploadDialogOpen: boolean;
  setIsUploadDialogOpen: (open: boolean) => void;
  isNewFolderDialogOpen: boolean;
  setIsNewFolderDialogOpen: (open: boolean) => void;
}

const VDRDialogs = ({
  isUploadDialogOpen,
  setIsUploadDialogOpen,
  isNewFolderDialogOpen,
  setIsNewFolderDialogOpen
}: VDRDialogsProps) => {
  const {
    handleFileUpload,
    previewFile,
    isPreviewOpen,
    setIsPreviewOpen,
    fileToDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleCreateFolder,
    handleDeleteFile
  } = useVDR();

  const confirmDelete = () => {
    if (fileToDelete) {
      handleDeleteFile(fileToDelete);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <FileUploadDialog
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUploadComplete={handleFileUpload}
      />

      <FilePreview
        file={previewFile}
        isOpen={isPreviewOpen}
        onOpenChange={setIsPreviewOpen}
      />

      <DeleteFileDialog
        fileToDelete={fileToDelete}
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirmDelete={confirmDelete}
      />

      <NewFolderDialog
        isOpen={isNewFolderDialogOpen}
        onOpenChange={setIsNewFolderDialogOpen}
        onCreateFolder={handleCreateFolder}
      />
    </>
  );
};

export default VDRDialogs;
