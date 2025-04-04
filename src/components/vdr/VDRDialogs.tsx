
import { useState } from "react";
import { useVDR } from "@/contexts/vdr/VDRContext";
import FilePreview from "@/components/vdr/FilePreview";
import DeleteFileDialog from "@/components/vdr/DeleteFileDialog";
import FileUploadDialog from "@/components/vdr/FileUploadDialog";
import OrganizeFileDialog from "@/components/vdr/OrganizeFileDialog";

interface VDRDialogsProps {
  isUploadDialogOpen: boolean;
  setIsUploadDialogOpen: (open: boolean) => void;
}

const VDRDialogs = ({
  isUploadDialogOpen,
  setIsUploadDialogOpen
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

  const confirmDelete = () => {
    if (fileToDelete) {
      handleDeleteFile(fileToDelete);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleOrganizeClick = (file: any) => {
    setFileToOrganize(file);
    setIsOrganizeDialogOpen(true);
  };

  const handleUploadComplete = (files: FileList, contents: {[filename: string]: string}, destinationFolder: string) => {
    handleFileUpload(files, contents, destinationFolder);
    setIsUploadDialogOpen(false);
  };

  const handleOrganizeComplete = (fileId: string, destinationFolder: string) => {
    handleMoveFile(fileId, destinationFolder);
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
