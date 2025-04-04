
import React from "react";
import { DollarSign, ChevronRight, Clock, TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bid } from "@/types/bids";
import { calculateTotalCost, calculateAnnualizedCost } from "@/utils/bidCalculations";

interface BidCardProps {
  bid: Bid;
  onAccept: (bidId: string) => void;
}

export const BidCard: React.FC<BidCardProps> = ({ bid, onAccept }) => {
  return (
    <div className="flex-shrink-0 w-80 bg-background/50 border border-primary/20 rounded-lg p-4 mr-4">
      <div className="h-12 flex items-center justify-between border-b border-primary/10">
        <Badge className={`
          ${bid.status === "Approved" ? "bg-green-500/20 text-green-300" : 
            bid.status === "Rejected" ? "bg-red-500/20 text-red-300" : 
            "bg-amber-500/20 text-amber-300"}
          rounded-full px-2 text-xs mb-2
        `}>
          {bid.status}
        </Badge>
        <TableIcon className="h-4 w-4 text-primary" />
      </div>
      
      <div className="font-mono text-lg mb-6 h-12 flex items-center">{bid.id}</div>
      <div className="font-mono text-lg mb-6 h-12 flex items-center">{bid.amount}</div>
      <div className="font-mono text-lg mb-6 h-12 flex items-center text-green-400">{bid.interestRate}</div>
      <div className="font-mono text-lg mb-6 h-12 flex items-center">
        <Badge className={`
          ${bid.interestRateType === "Fixed" ? "bg-blue-500/20 text-blue-300" : "bg-purple-500/20 text-purple-300"}
          rounded-full px-2 py-1
        `}>
          {bid.interestRateType}
        </Badge>
      </div>
      <div className="font-mono text-lg mb-6 h-12 flex items-center">{bid.term}</div>
      <div className="font-mono text-lg mb-6 h-12 flex items-center">
        <Badge className="bg-gray-500/20 text-gray-300 rounded-full px-2 py-1">
          {bid.facilityType}
        </Badge>
      </div>
      <div className="font-mono text-lg mb-6 h-12 flex items-center text-amber-400 font-bold">
        {calculateTotalCost(bid.amount, bid.interestRate, bid.term)}
        <DollarSign className="h-4 w-4 ml-1 text-amber-400" />
      </div>
      <div className="font-mono text-lg mb-6 h-12 flex items-center text-cyan-400 font-bold border-t border-primary/10 pt-2">
        {calculateAnnualizedCost(bid.amount, bid.interestRate, bid.term)}
        <Clock className="h-4 w-4 ml-1 text-cyan-400" />
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center text-muted-foreground">{bid.submittedDate}</div>
      
      <div className="mb-6 min-h-24">
        <p className="text-sm font-extralight">{bid.additionalTerms}</p>
      </div>
      
      <div className="mb-6 min-h-32">
        <ul className="list-disc list-inside space-y-1">
          {bid.features?.map((feature, index) => (
            <li key={index} className="text-sm font-extralight flex items-start">
              <ChevronRight className="h-3 w-3 mt-0.5 mr-1 flex-shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="h-12 flex items-center">
        <Button
          onClick={() => onAccept(bid.id)}
          className="w-full rounded-none font-mono text-xs"
          variant="outline"
          disabled={bid.status !== "Under Review"}
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          Accept This Bid
        </Button>
      </div>
    </div>
  );
};
