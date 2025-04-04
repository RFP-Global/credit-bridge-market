
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpDown, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Proposal {
  id: number;
  name: string;
  type: string;
  status: string;
  amount: string;
  date: string;
  responses: number;
}

interface ActiveProposalsTabProps {
  proposals: Proposal[];
}

const ActiveProposalsTab = ({ proposals }: ActiveProposalsTabProps) => {
  const navigate = useNavigate();

  const handleViewProposal = (proposalId: number) => {
    navigate(`/proposal-bids/${proposalId}`);
  };

  return (
    <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-mono">ACTIVE PROPOSALS</CardTitle>
        <CardDescription>Proposals currently in the marketplace</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-primary/10">
                <th className="text-left py-3 px-4 text-xs font-mono">
                  <div className="flex items-center">
                    NAME
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-xs font-mono">
                  <div className="flex items-center">
                    TYPE
                    <Filter className="ml-2 h-3 w-3" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-xs font-mono">
                  <div className="flex items-center">
                    STATUS
                    <Filter className="ml-2 h-3 w-3" />
                  </div>
                </th>
                <th className="text-left py-3 px-4 text-xs font-mono">AMOUNT</th>
                <th className="text-left py-3 px-4 text-xs font-mono">RESPONSES</th>
                <th className="text-left py-3 px-4 text-xs font-mono">DATE</th>
                <th className="text-right py-3 px-4 text-xs font-mono">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map(proposal => (
                <tr 
                  key={proposal.id} 
                  className="border-b border-primary/10 hover:bg-primary/5 cursor-pointer"
                  onClick={() => handleViewProposal(proposal.id)}
                >
                  <td className="py-3 px-4 font-mono text-sm">{proposal.name}</td>
                  <td className="py-3 px-4 text-xs">{proposal.type}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 font-mono">
                      {proposal.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm">{proposal.amount}</td>
                  <td className="py-3 px-4 font-mono text-sm">{proposal.responses}</td>
                  <td className="py-3 px-4 text-xs">{proposal.date}</td>
                  <td className="py-3 px-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="font-mono text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewProposal(proposal.id);
                      }}
                    >
                      VIEW
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {proposals.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No active proposals found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveProposalsTab;
