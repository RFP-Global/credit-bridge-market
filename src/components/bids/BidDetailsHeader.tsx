
import React from "react";
import { Clock } from "lucide-react";

export const BidDetailsHeader: React.FC = () => {
  return (
    <div className="flex-shrink-0 w-40 mr-4">
      <div className="h-12 flex items-center">
        <span className="font-mono text-sm text-muted-foreground">BID DETAILS</span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center">
        <span>Bid ID</span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center">
        <span>Amount</span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center">
        <span>Interest Rate</span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center">
        <span>Interest Rate Type</span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center">
        <span>Term</span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center">
        <span>Facility Type</span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center">
        <span>Total Cost</span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center border-t border-primary/10 pt-2">
        <span>Annualized Cost</span>
        <span className="ml-1 text-xs text-amber-400/80 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          (time-adjusted)
        </span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center">
        <span>Submission Date</span>
      </div>
      <div className="font-mono text-sm mb-6">
        <span>Additional Terms</span>
      </div>
      <div className="font-mono text-sm mb-6">
        <span>Features</span>
      </div>
      <div className="font-mono text-sm mb-6 h-12 flex items-center">
        <span>Action</span>
      </div>
    </div>
  );
};
