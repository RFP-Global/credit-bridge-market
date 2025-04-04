
import { VDRProvider } from "@/contexts/VDRContext";
import VDRLayout from "@/components/vdr/VDRLayout";
import VDRHeader from "@/components/vdr/VDRHeader";
import VDRContent from "@/components/vdr/VDRContent";
import VDRDialogs from "@/components/vdr/VDRDialogs";
import { useNavigate } from "react-router-dom";

const VDR = () => {
  const navigate = useNavigate();

  return (
    <VDRProvider>
      <VDRLayout>
        <VDRHeader 
          onBackClick={() => navigate("/enterprise-dashboard")} 
        />
        
        <VDRContent />
        
        <VDRDialogs />
      </VDRLayout>
    </VDRProvider>
  );
};

export default VDR;
