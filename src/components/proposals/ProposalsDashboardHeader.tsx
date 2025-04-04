
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface ProposalsDashboardHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProposalsDashboardHeader = ({
  searchQuery,
  setSearchQuery,
}: ProposalsDashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleCreateProposal = () => {
    navigate("/create-proposal");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="relative w-full max-w-md">
        <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search proposals..."
          className="pl-10 rounded-none border-primary/20 focus-visible:ring-primary/30"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button 
        className="rounded-none font-mono text-xs"
        onClick={handleCreateProposal}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        NEW PROPOSAL
      </Button>
    </div>
  );
};

export default ProposalsDashboardHeader;
