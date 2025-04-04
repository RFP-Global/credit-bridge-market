
import { useState } from "react";
import { VDRProvider } from "@/contexts/vdr/VDRContext";
import VDRContent from "@/components/vdr/VDRContent";
import VDRDialogs from "@/components/vdr/VDRDialogs";
import VDRHeader from "@/components/vdr/VDRHeader";
import VDRLayout from "@/components/vdr/VDRLayout";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";

const VDR = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  return (
    <EnterpriseLayout 
      title="Virtual Data Room" 
      description="Securely manage and share your project documents."
    >
      <VDRProvider>
        <VDRHeader 
          setIsUploadDialogOpen={setIsUploadDialogOpen}
          setIsNewFolderDialogOpen={setIsNewFolderDialogOpen}
        />
        <VDRContent />
        <VDRDialogs 
          isUploadDialogOpen={isUploadDialogOpen}
          setIsUploadDialogOpen={setIsUploadDialogOpen}
          isNewFolderDialogOpen={isNewFolderDialogOpen}
          setIsNewFolderDialogOpen={setIsNewFolderDialogOpen}
          isFilePreviewOpen={isFilePreviewOpen}
          setIsFilePreviewOpen={setIsFilePreviewOpen}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </VDRProvider>
    </EnterpriseLayout>
  );
};

export default VDR;
