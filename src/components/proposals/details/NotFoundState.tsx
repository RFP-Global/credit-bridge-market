
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";

const NotFoundState: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Proposal Not Found</h1>
          <p className="text-gray-400 mb-6">The proposal you are looking for could not be found.</p>
          <Button asChild>
            <Link to="/marketplace">Return to Marketplace</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
