
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Clock, FileText, MessageSquare } from "lucide-react";

interface DealHistoryTabProps {
  dealData: any;
  dealType: "active" | "closed" | "watchlist";
}

const DealHistoryTab: React.FC<DealHistoryTabProps> = ({ dealData, dealType }) => {
  // Mock interaction history
  const interactionHistory = [
    { date: "April 5, 2025", type: "Email", description: "Sent introduction email", user: "Michael Johnson" },
    { date: "April 7, 2025", type: "Meeting", description: "Initial discussion about financing needs", user: "Michael Johnson" },
    { date: "April 12, 2025", type: "Document", description: "Received financial statements", user: "Sarah Williams" },
    { date: "April 15, 2025", type: "Call", description: "Follow-up on documentation questions", user: "Michael Johnson" },
    { date: "April 20, 2025", type: "Meeting", description: "Presentation of initial terms", user: "Michael Johnson" }
  ];

  // Mock notes
  const notes = [
    { date: "April 7, 2025", content: "Company shows strong growth potential in emerging markets.", author: "Michael Johnson" },
    { date: "April 15, 2025", content: "Financial statements reveal better-than-expected cash flow position.", author: "Sarah Williams" },
    { date: "April 22, 2025", content: "Management team has impressive track record in the industry.", author: "Michael Johnson" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              INTERACTION HISTORY
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-800">
                  <TableHead className="text-xs">DATE</TableHead>
                  <TableHead className="text-xs">TYPE</TableHead>
                  <TableHead className="text-xs">DESCRIPTION</TableHead>
                  <TableHead className="text-xs">USER</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interactionHistory.map((interaction, index) => (
                  <TableRow key={index} className="border-b border-gray-800">
                    <TableCell className="text-xs">{interaction.date}</TableCell>
                    <TableCell className="text-xs">{interaction.type}</TableCell>
                    <TableCell className="text-xs">{interaction.description}</TableCell>
                    <TableCell className="text-xs">{interaction.user}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              NOTES & OBSERVATIONS
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {notes.map((note, index) => (
                <div key={index} className="p-3 border border-gray-800 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-400">{note.date}</span>
                    <span className="text-xs text-gray-400">{note.author}</span>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {dealType === "closed" && (
          <Card className="bg-black border-gray-800">
            <CardHeader className="border-b border-gray-800">
              <CardTitle className="text-sm font-mono flex items-center">
                <FileText className="mr-2 h-4 w-4" />
                CLOSURE SUMMARY
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">OUTCOME</p>
                  <p className="font-semibold">{dealData.result}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-1">CLOSURE DATE</p>
                  <p className="font-semibold">{dealData.closeDate}</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-1">REASON</p>
                  <p className="text-sm">
                    {dealData.result === "Funded" 
                      ? "The deal met all our lending criteria and presented a strong business case with appropriate risk profile."
                      : "The deal did not meet our current risk parameters and financial requirements."}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400 mb-1">NEXT STEPS</p>
                  <p className="text-sm">
                    {dealData.result === "Funded" 
                      ? "Schedule quarterly review to monitor performance against projections."
                      : "Maintain relationship for potential future opportunities if their financial position improves."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DealHistoryTab;
