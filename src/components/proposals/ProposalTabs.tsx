
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ActiveProposalsTab from "./tabs/ActiveProposalsTab";
import DraftProposalsTab from "./tabs/DraftProposalsTab";
import CompletedProposalsTab from "./tabs/CompletedProposalsTab";

interface Proposal {
  id: number;
  name: string;
  type: string;
  status: string;
  amount: string;
  date: string;
  responses: number;
}

interface DraftProposal {
  id: number;
  name: string;
  type: string;
  amount: string;
  completion: number;
  date: string;
}

interface CompletedProposal {
  id: number;
  name: string;
  type: string;
  amount: string;
  lender: string;
  date: string;
}

interface ProposalTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredActiveProposals: Proposal[];
  filteredDraftProposals: DraftProposal[];
  filteredCompletedProposals: CompletedProposal[];
}

const ProposalTabs = ({
  activeTab,
  setActiveTab,
  filteredActiveProposals,
  filteredDraftProposals,
  filteredCompletedProposals,
}: ProposalTabsProps) => {
  return (
    <Tabs defaultValue="active" className="space-y-6" onValueChange={setActiveTab}>
      <TabsList className="bg-background/50 border border-primary/20">
        <TabsTrigger value="active" className="font-mono text-xs">
          ACTIVE ({filteredActiveProposals.length})
        </TabsTrigger>
        <TabsTrigger value="drafts" className="font-mono text-xs">
          DRAFTS ({filteredDraftProposals.length})
        </TabsTrigger>
        <TabsTrigger value="completed" className="font-mono text-xs">
          COMPLETED ({filteredCompletedProposals.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="space-y-4">
        <ActiveProposalsTab proposals={filteredActiveProposals} />
      </TabsContent>
      
      <TabsContent value="drafts" className="space-y-4">
        <DraftProposalsTab proposals={filteredDraftProposals} />
      </TabsContent>
      
      <TabsContent value="completed" className="space-y-4">
        <CompletedProposalsTab proposals={filteredCompletedProposals} />
      </TabsContent>
    </Tabs>
  );
};

export default ProposalTabs;
