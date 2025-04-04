
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileQuestion } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";

const NotFoundState: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <div className="w-full max-w-md space-y-6">
            <div className="bg-white/5 rounded-lg p-8 border border-primary/10 text-center">
              <FileQuestion className="h-20 w-20 text-amber-500 mx-auto mb-6" />
              
              <h1 className="text-2xl font-semibold mb-2">Proposal Not Found</h1>
              <p className="text-gray-400 mb-6">
                The proposal you are looking for could not be found or may have been removed.
              </p>
              
              <Alert variant="destructive" className="bg-amber-500/10 border-amber-500/20 mb-6">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertDescription className="text-amber-500">
                  Please check the URL or try accessing this proposal from the marketplace.
                </AlertDescription>
              </Alert>
              
              <Button asChild className="w-full">
                <Link to="/marketplace">Return to Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
