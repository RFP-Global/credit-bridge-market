
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Info, Settings, Code, Users, Building } from "lucide-react";
import FacilityStatistics from './FacilityStatistics';
import { Button } from "@/components/ui/button";

interface FacilityDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  facility?: {
    id: string;
    title: string;
    description: string;
    content: string;
    riskLevel: string;
    typicalTerms?: string;
    interestRates?: string;
    bestFor?: string;
    commonProviders?: string;
    mechanics?: string;
  } | null;
  lender?: {
    id: string;
    title: string;
    description: string;
    content: string;
    strengthsWeaknesses?: string;
    typicalProducts?: string;
    bestForBusinesses?: string;
  } | null;
}

const FacilityDetailsDialog: React.FC<FacilityDetailsProps> = ({ 
  isOpen, 
  onClose, 
  facility,
  lender
}) => {
  const navigate = useNavigate();
  
  const item = facility || lender;
  if (!item) return null;
  
  const isLender = !!lender;
  
  const handleMechanicsClick = () => {
    // Close the dialog and navigate to the mechanics page
    onClose();
    if (facility) {
      navigate(`/facility-mechanics/${facility.id}`);
    } else if (lender) {
      navigate(`/facility-mechanics/lender-${lender.id}`);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-black/90 border-cyan-800/50 text-gray-200 max-w-4xl max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl text-cyan-300 font-mono flex items-center gap-2">
              {isLender ? (
                <Building className="h-5 w-5" />
              ) : (
                <Book className="h-5 w-5" />
              )}
              {item.title}
            </DialogTitle>
            {facility && (
              <Badge className="bg-cyan-900/30 text-cyan-300 border border-cyan-700/50">
                {facility.riskLevel}
              </Badge>
            )}
          </div>
          <DialogDescription className="text-gray-400">
            {item.description}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[60vh]">
          <div className="space-y-6 pr-4">
            <div className="space-y-3">
              <h3 className="text-lg text-cyan-300 font-mono flex items-center gap-2">
                <Info className="h-4 w-4" />
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">{item.content}</p>
              
              {facility && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <h4 className="text-cyan-400/80 text-sm font-semibold">Typical Terms</h4>
                    <p className="text-gray-300">{facility.typicalTerms}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-cyan-400/80 text-sm font-semibold">Interest Rates</h4>
                    <p className="text-gray-300">{facility.interestRates}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-cyan-400/80 text-sm font-semibold">Best For</h4>
                    <p className="text-gray-300">{facility.bestFor}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-cyan-400/80 text-sm font-semibold">Common Providers</h4>
                    <p className="text-gray-300">{facility.commonProviders}</p>
                  </div>
                </div>
              )}
              
              {lender && (
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div className="space-y-2">
                    <h4 className="text-cyan-400/80 text-sm font-semibold">Strengths & Weaknesses</h4>
                    <p className="text-gray-300">{lender.strengthsWeaknesses}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-cyan-400/80 text-sm font-semibold">Typical Products</h4>
                    <p className="text-gray-300">{lender.typicalProducts}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-cyan-400/80 text-sm font-semibold">Best For Businesses</h4>
                    <p className="text-gray-300">{lender.bestForBusinesses}</p>
                  </div>
                </div>
              )}
            </div>
            
            {facility && (
              <FacilityStatistics 
                facilityId={facility.id} 
                facilityTitle={facility.title}
              />
            )}
            
            <div className="border-t border-cyan-800/30 pt-6">
              <Button
                onClick={handleMechanicsClick}
                variant="cyan"
                className="w-full bg-gradient-to-r from-cyan-950/60 to-black/60 hover:from-cyan-900/60 hover:to-cyan-950/60 border border-cyan-800/50 text-cyan-300 font-mono flex items-center justify-center py-6"
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-cyan-400" />
                  <span className="text-xl">
                    Explore Detailed {isLender ? 'Provider' : 'Facility'} Mechanics
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityDetailsDialog;
