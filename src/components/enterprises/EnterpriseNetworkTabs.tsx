
import React from "react";
import { Enterprise } from "@/types/enterprises";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building, Users } from "lucide-react";
import EnterpriseGrid from "./EnterpriseGrid";

interface EnterpriseNetworkTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredEnterprises: Enterprise[];
  followingEnterprises: Enterprise[];
  savedEnterprises: Enterprise[];
  following: number[];
  saved: number[];
  likes: Record<string, number>;
  viewMode: "grid" | "list";
  toggleFollow: (enterpriseId: number) => void;
  toggleSave: (enterpriseId: number) => void;
  toggleLike: (projectId: string) => void;
  handleContact: (enterpriseId: number) => void;
}

const EnterpriseNetworkTabs = ({
  activeTab,
  setActiveTab,
  filteredEnterprises,
  followingEnterprises,
  savedEnterprises,
  following,
  saved,
  likes,
  viewMode,
  toggleFollow,
  toggleSave,
  toggleLike,
  handleContact
}: EnterpriseNetworkTabsProps) => {
  return (
    <Tabs defaultValue="explore" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="w-full flex justify-start mb-8 bg-background border-b">
        <TabsTrigger value="explore" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          <Building className="h-4 w-4" /> Explore
        </TabsTrigger>
        <TabsTrigger value="following" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          <Users className="h-4 w-4" /> Following ({followingEnterprises.length})
        </TabsTrigger>
        <TabsTrigger value="saved" className="flex items-center gap-1 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
          Saved ({savedEnterprises.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="explore">
        <EnterpriseGrid 
          enterprises={filteredEnterprises}
          following={following}
          saved={saved}
          likes={likes}
          viewMode={viewMode}
          toggleFollow={toggleFollow}
          toggleSave={toggleSave}
          toggleLike={toggleLike}
          handleContact={handleContact}
        />
      </TabsContent>
      
      <TabsContent value="following">
        <EnterpriseGrid 
          enterprises={followingEnterprises}
          following={following}
          saved={saved}
          likes={likes}
          viewMode={viewMode}
          toggleFollow={toggleFollow}
          toggleSave={toggleSave}
          toggleLike={toggleLike}
          handleContact={handleContact}
          emptyType="following"
          setActiveTab={setActiveTab}
        />
      </TabsContent>
      
      <TabsContent value="saved">
        <EnterpriseGrid 
          enterprises={savedEnterprises}
          following={following}
          saved={saved}
          likes={likes}
          viewMode={viewMode}
          toggleFollow={toggleFollow}
          toggleSave={toggleSave}
          toggleLike={toggleLike}
          handleContact={handleContact}
          emptyType="saved"
          setActiveTab={setActiveTab}
        />
      </TabsContent>
    </Tabs>
  );
};

export default EnterpriseNetworkTabs;
