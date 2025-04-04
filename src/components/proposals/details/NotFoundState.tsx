
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const NotFoundState: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className="flex flex-col items-center justify-center h-[80vh]">
          <h1 className="text-2xl mb-4">Proposal Not Found</h1>
          <Button asChild>
            <Link to="/marketplace">Return to Marketplace</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
