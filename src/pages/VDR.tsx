
import { useState } from "react";
import { VDRProvider } from "@/contexts/vdr/VDRContext";
import VDRContent from "@/components/vdr/VDRContent";
import VDRDialogs from "@/components/vdr/VDRDialogs";
import VDRHeader from "@/components/vdr/VDRHeader";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Folder, Files, FileCheck } from "lucide-react";
import DocumentVerification from "@/components/vdr/DocumentVerification";

const VDR = () => {
  const navigate = useNavigate();
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
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
        />
        
        <div className="container mx-auto px-6 py-8">
          <Tabs defaultValue="browser" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6 w-full max-w-[600px] mx-auto gap-4">
              <TabsTrigger value="browser" className="font-mono text-xs flex gap-2">
                <Folder className="h-4 w-4" />
                FILE BROWSER
              </TabsTrigger>
              <TabsTrigger value="verification" className="font-mono text-xs flex gap-2">
                <FileCheck className="h-4 w-4" />
                DOCUMENT VERIFICATION
              </TabsTrigger>
              <TabsTrigger value="shared" className="font-mono text-xs flex gap-2">
                <Files className="h-4 w-4" />
                SHARED FILES
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="browser">
              <VDRContent />
            </TabsContent>
            
            <TabsContent value="verification">
              <DocumentVerification />
            </TabsContent>
            
            <TabsContent value="shared">
              <div className="flex flex-col items-center justify-center h-[60vh] border border-dashed border-primary/20 rounded-lg">
                <Files className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No Shared Files</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  When you share files with other users, they will appear here for quick access.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <VDRDialogs 
          isUploadDialogOpen={isUploadDialogOpen}
          setIsUploadDialogOpen={setIsUploadDialogOpen}
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
