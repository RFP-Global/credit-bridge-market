
import { useVDR } from "@/contexts/VDRContext";
import FilePreview from "@/components/vdr/FilePreview";
import DeleteFileDialog from "@/components/vdr/DeleteFileDialog";

const VDRDialogs = () => {
  const {
    previewFile,
    isPreviewOpen,
    setIsPreviewOpen,
    fileToDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
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
    </>
  );
};

export default VDRDialogs;
