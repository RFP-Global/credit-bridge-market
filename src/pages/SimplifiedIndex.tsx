
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const SimplifiedIndex = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to RFP GLOBAL</h1>
      <p className="text-xl mb-8 max-w-2xl text-center">
        A simplified placeholder page to test routing and basic rendering.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Button asChild variant="outline">
          <Link to="/marketplace">Marketplace</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/services">Services</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/how-it-works">How It Works</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/about">About</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/non-existent-page">Test 404 Page</Link>
        </Button>
      </div>
    </div>
  );
};

export default SimplifiedIndex;
