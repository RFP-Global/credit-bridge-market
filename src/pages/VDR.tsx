
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { VDRProvider } from "@/contexts/VDRContext";
import VDRLayout from "@/components/vdr/VDRLayout";
import VDRHeader from "@/components/vdr/VDRHeader";
import VDRContent from "@/components/vdr/VDRContent";
import VDRDialogs from "@/components/vdr/VDRDialogs";

const VDR = () => {
  const navigate = useNavigate();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <VDRProvider>
      <VDRLayout>
        <VDRHeader 
          onBackClick={() => navigate("/enterprise-dashboard")}
          onUploadClick={() => setIsUploadDialogOpen(true)}
        />
        
        <VDRContent />
        
        <VDRDialogs 
          isUploadDialogOpen={isUploadDialogOpen}
          setIsUploadDialogOpen={setIsUploadDialogOpen}
        />
      </VDRLayout>
    </VDRProvider>
  );
};

export default VDR;
