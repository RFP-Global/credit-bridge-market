
import React, { useState } from "react";
import { lenders } from "@/data/lendersData";
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import { toast } from "@/hooks/use-toast";
import LenderHeader from "@/components/lenders/LenderHeader";
import LenderTabs from "@/components/lenders/LenderTabs";

const Lenders = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [following, setFollowing] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  
  const toggleFollow = (lenderId: number) => {
    setFollowing(prev => 
      prev.includes(lenderId) 
        ? prev.filter(id => id !== lenderId)
        : [...prev, lenderId]
    );
    
    const isFollowing = following.includes(lenderId);
    const lender = lenders.find(l => l.id === lenderId);
    
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing 
        ? `You've unfollowed ${lender?.name}`
        : `You're now following ${lender?.name}`,
    });
  };
  
  const toggleSave = (lenderId: number) => {
    setSaved(prev => 
      prev.includes(lenderId) 
        ? prev.filter(id => id !== lenderId)
        : [...prev, lenderId]
    );
    
    const isSaved = saved.includes(lenderId);
    const lender = lenders.find(l => l.id === lenderId);
    
    toast({
      title: isSaved ? "Removed from saved" : "Saved",
      description: isSaved 
        ? `${lender?.name} removed from your saved lenders`
        : `${lender?.name} added to your saved lenders`,
    });
  };
  
  const toggleLike = (dealId: string) => {
    setLikes(prev => ({
      ...prev,
      [dealId]: (prev[dealId] || 0) + 1
    }));
    
    toast({
      title: "Liked",
      description: "You've liked this deal",
    });
  };
  
  const handleContact = (lenderId: number) => {
    const lender = lenders.find(l => l.id === lenderId);
    
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${lender?.name}`,
    });
  };
  
  const filteredLenders = activeTab === "following"
    ? lenders.filter(lender => following.includes(lender.id))
    : activeTab === "saved"
    ? lenders.filter(lender => saved.includes(lender.id))
    : lenders;
  
  return (
    <EnterpriseLayout>
      <LenderHeader 
        title="Lender Community" 
        subtitle="Connect with financial institutions in your network." 
      />
      
      <LenderTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lenders={lenders}
        filteredLenders={filteredLenders}
        following={following}
        saved={saved}
        likes={likes}
        toggleFollow={toggleFollow}
        handleContact={handleContact}
        toggleSave={toggleSave}
        toggleLike={toggleLike}
      />
    </EnterpriseLayout>
  );
};

export default Lenders;
