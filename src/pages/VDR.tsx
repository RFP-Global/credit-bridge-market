
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import VDRHeader from "@/components/vdr/VDRHeader";
import VDRContent from "@/components/vdr/VDRContent";
import VDRLayout from "@/components/vdr/VDRLayout";
import VDRDialogs from "@/components/vdr/VDRDialogs";
import { VDRProvider } from "@/contexts/VDRContext";

const VDR = () => {
  const navigate = useNavigate();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false);

  return (
    <VDRProvider>
      <VDRLayout>
        <VDRHeader 
          onBackClick={() => navigate("/enterprise-dashboard")} 
          onNewFolderClick={() => setIsNewFolderDialogOpen(true)}
        />
        
        <VDRContent
          onUploadClick={() => setIsUploadDialogOpen(true)}
        />
        
        <VDRDialogs 
          isUploadDialogOpen={isUploadDialogOpen}
          setIsUploadDialogOpen={setIsUploadDialogOpen}
          isNewFolderDialogOpen={isNewFolderDialogOpen}
          setIsNewFolderDialogOpen={setIsNewFolderDialogOpen}
        />
      </VDRLayout>
    </VDRProvider>
  );
};

export default VDR;
