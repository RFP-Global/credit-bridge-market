
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DraftProposal {
  id: number;
  name: string;
  type: string;
  amount: string;
  completion: number;
  date: string;
}

interface DraftProposalsTabProps {
  proposals: DraftProposal[];
}

const DraftProposalsTab = ({ proposals }: DraftProposalsTabProps) => {
  return (
    <Card className="border-primary/20 bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-sm font-mono">DRAFT PROPOSALS</CardTitle>
        <CardDescription>Proposals in progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-primary/10">
                <th className="text-left py-3 px-4 text-xs font-mono">NAME</th>
                <th className="text-left py-3 px-4 text-xs font-mono">TYPE</th>
                <th className="text-left py-3 px-4 text-xs font-mono">AMOUNT</th>
                <th className="text-left py-3 px-4 text-xs font-mono">COMPLETION</th>
                <th className="text-left py-3 px-4 text-xs font-mono">LAST UPDATED</th>
                <th className="text-right py-3 px-4 text-xs font-mono">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map(proposal => (
                <tr key={proposal.id} className="border-b border-primary/10 hover:bg-primary/5">
                  <td className="py-3 px-4 font-mono text-sm">{proposal.name}</td>
                  <td className="py-3 px-4 text-xs">{proposal.type}</td>
                  <td className="py-3 px-4 font-mono text-sm">{proposal.amount}</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-primary/10 h-2">
                      <div 
                        className="bg-primary h-2" 
                        style={{ width: `${proposal.completion}%` }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1">{proposal.completion}%</span>
                  </td>
                  <td className="py-3 px-4 text-xs">{proposal.date}</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm" className="font-mono text-xs">EDIT</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {proposals.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No draft proposals found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DraftProposalsTab;
