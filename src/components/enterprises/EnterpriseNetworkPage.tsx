
import React, { useState, useEffect } from "react";
import { enterprises } from "@/data/enterprisesData";
import { getLenderById } from "@/data/lendersData";
import { useLocation } from "react-router-dom";
import EnterpriseNetworkHeader from "./EnterpriseNetworkHeader";
import EnterpriseSearchControls from "./EnterpriseSearchControls";
import EnterpriseNetworkTabs from "./EnterpriseNetworkTabs";

const EnterpriseNetworkPage = () => {
  const [activeTab, setActiveTab] = useState("explore");
  const [following, setFollowing] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const location = useLocation();
  
  // Determine if user is a lender based on the URL path or state
  const isLenderRole = location.pathname.includes('lender-dashboard') || 
                    (location.state?.from && location.state.from.includes('lender-dashboard'));
  
  // For demo purposes, if the user is a lender, use lender ID 1
  // In a real app, this would come from authentication
  const currentUser = isLenderRole ? getLenderById(1) : null;
  
  const toggleFollow = (enterpriseId: number) => {
    setFollowing(prev => 
      prev.includes(enterpriseId) 
        ? prev.filter(id => id !== enterpriseId)
        : [...prev, enterpriseId]
    );
  };
  
  const toggleSave = (enterpriseId: number) => {
    setSaved(prev => 
      prev.includes(enterpriseId) 
        ? prev.filter(id => id !== enterpriseId)
        : [...prev, enterpriseId]
    );
  };
  
  const toggleLike = (projectId: string) => {
    setLikes(prev => ({
      ...prev,
      [projectId]: (prev[projectId] || 0) + 1
    }));
  };
  
  const handleContact = (enterpriseId: number) => {
    console.log(`Contacting enterprise with ID: ${enterpriseId}`);
  };
  
  const filteredEnterprises = enterprises.filter(enterprise => 
    enterprise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enterprise.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enterprise.specialties.some(specialty => specialty.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const followingEnterprises = filteredEnterprises.filter(enterprise => following.includes(enterprise.id));
  const savedEnterprises = filteredEnterprises.filter(enterprise => saved.includes(enterprise.id));
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 mt-12">
        <EnterpriseNetworkHeader />
        
        <EnterpriseSearchControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        
        <EnterpriseNetworkTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filteredEnterprises={filteredEnterprises}
          followingEnterprises={followingEnterprises}
          savedEnterprises={savedEnterprises}
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
      </div>
    </div>
  );
};

export default EnterpriseNetworkPage;
