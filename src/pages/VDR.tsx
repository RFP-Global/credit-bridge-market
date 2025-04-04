
import { useState } from "react";
import { VDRProvider } from "@/contexts/vdr/VDRContext";
import VDRContent from "@/components/vdr/VDRContent";
import VDRDialogs from "@/components/vdr/VDRDialogs";
import VDRHeader from "@/components/vdr/VDRHeader";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import { useNavigate } from "react-router-dom";

const VDR = () => {
  const navigate = useNavigate();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);
  const [isFilePreviewOpen, setIsFilePreviewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleBackClick = () => {
    navigate('/enterprise-dashboard');
  };
  
  return (
    <EnterpriseLayout 
      title="Virtual Data Room" 
      description="Securely manage and share your project documents."
    >
      <VDRProvider>
        <VDRHeader 
          onBackClick={handleBackClick}
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
