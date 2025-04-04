
import { useVDR } from "@/contexts/vdr/VDRContext";
import FilePreview from "@/components/vdr/FilePreview";
import DeleteFileDialog from "@/components/vdr/DeleteFileDialog";
import FileUploadDialog from "@/components/vdr/FileUploadDialog";

interface VDRDialogsProps {
  isUploadDialogOpen: boolean;
  setIsUploadDialogOpen: (open: boolean) => void;
}

const VDRDialogs = ({
  isUploadDialogOpen,
  setIsUploadDialogOpen
}: VDRDialogsProps) => {
  const {
    previewFile,
    isPreviewOpen,
    setIsPreviewOpen,
    fileToDelete,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleDeleteFile,
    handleFileUpload
  } = useVDR();

  const confirmDelete = () => {
    if (fileToDelete) {
      handleDeleteFile(fileToDelete);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleUploadComplete = (files: FileList, contents: {[filename: string]: string}) => {
    handleFileUpload(files, contents);
    setIsUploadDialogOpen(false);
  };

  return (
    <>
      <FileUploadDialog
        isOpen={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
        onUploadComplete={handleUploadComplete}
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
    </>
  );
};

export default VDRDialogs;
