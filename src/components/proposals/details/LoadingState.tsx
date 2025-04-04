
import React from "react";
import Navbar from "@/components/Navbar";

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className="flex items-center justify-center h-[80vh]">
          <div className="animate-pulse">Loading proposal details...</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
