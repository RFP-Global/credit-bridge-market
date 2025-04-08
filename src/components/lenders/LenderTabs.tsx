
import React from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lender } from "@/types/lenders";
import LenderTabContent from "./LenderTabContent";

interface LenderTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  lenders: Lender[];
  filteredLenders: Lender[];
  following: number[];
  saved: number[];
  likes: Record<string, number>;
  toggleFollow: (lenderId: number) => void;
  handleContact: (lenderId: number) => void;
  toggleSave: (lenderId: number) => void;
  toggleLike: (dealId: string) => void;
}

const LenderTabs: React.FC<LenderTabsProps> = ({
  activeTab,
  setActiveTab,
  lenders,
  filteredLenders,
  following,
  saved,
  likes,
  toggleFollow,
  handleContact,
  toggleSave,
  toggleLike
}) => {
  return (
    <Tabs defaultValue="all" className="space-y-6" onValueChange={setActiveTab}>
      <div className="flex justify-between items-center">
        <TabsList className="bg-background/50 border border-primary/20">
          <TabsTrigger value="all" className="font-mono text-xs">ALL LENDERS</TabsTrigger>
          <TabsTrigger value="following" className="font-mono text-xs">FOLLOWING</TabsTrigger>
          <TabsTrigger value="saved" className="font-mono text-xs">SAVED</TabsTrigger>
        </TabsList>
        
        <Button variant="outline" size="sm" className="font-mono text-xs">
          <Users className="h-4 w-4 mr-2" />
          Discover New Lenders
        </Button>
      </div>
      
      <LenderTabContent
        tabValue="all"
        lenders={filteredLenders}
        following={following}
        saved={saved}
        likes={likes}
        toggleFollow={toggleFollow}
        handleContact={handleContact}
        toggleSave={toggleSave}
        toggleLike={toggleLike}
        setActiveTab={setActiveTab}
      />
      
      <LenderTabContent
        tabValue="following"
        lenders={filteredLenders}
        following={following}
        saved={saved}
        likes={likes}
        toggleFollow={toggleFollow}
        handleContact={handleContact}
        toggleSave={toggleSave}
        toggleLike={toggleLike}
        setActiveTab={setActiveTab}
      />
      
      <LenderTabContent
        tabValue="saved"
        lenders={filteredLenders}
        following={following}
        saved={saved}
        likes={likes}
        toggleFollow={toggleFollow}
        handleContact={handleContact}
        toggleSave={toggleSave}
        toggleLike={toggleLike}
        setActiveTab={setActiveTab}
      />
    </Tabs>
  );
};

export default LenderTabs;
