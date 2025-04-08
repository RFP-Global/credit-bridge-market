
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Enterprise } from "@/types/enterprises";
import { Lender } from "@/types/lenders";
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
  currentUser?: Lender | null;
}

const EnterpriseNetworkTabs: React.FC<EnterpriseNetworkTabsProps> = ({
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
  handleContact,
  currentUser
}) => {
  return (
    <Tabs 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="mt-6"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="explore">Explore</TabsTrigger>
        <TabsTrigger value="following">Following ({followingEnterprises.length})</TabsTrigger>
        <TabsTrigger value="saved">Saved ({savedEnterprises.length})</TabsTrigger>
      </TabsList>
      
      <TabsContent value="explore" className="pt-6">
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
          currentUser={currentUser}
        />
      </TabsContent>
      
      <TabsContent value="following" className="pt-6">
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
          currentUser={currentUser}
        />
      </TabsContent>
      
      <TabsContent value="saved" className="pt-6">
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
          currentUser={currentUser}
        />
      </TabsContent>
    </Tabs>
  );
};

export default EnterpriseNetworkTabs;
