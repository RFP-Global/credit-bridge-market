
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const SimplifiedIndex = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center pt-16 pb-12 text-center">
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
          Welcome to RFP GLOBAL
        </h1>
        <p className="text-xl mb-8 max-w-2xl text-center text-muted-foreground">
          Connecting investors with premium private credit opportunities
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/marketplace">Explore Marketplace</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link to="/services">Our Services</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Marketplace</CardTitle>
              <CardDescription>Browse available opportunities</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="mb-4">Discover curated investment opportunities vetted by our experts.</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/marketplace">Explore</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>What we offer</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="mb-4">Learn about our comprehensive range of financial services.</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/services">View Services</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
              <CardDescription>Our process</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <p className="mb-4">Understand our streamlined approach to connecting investors and opportunities.</p>
              <Button asChild variant="outline" className="mt-auto">
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-12">
          <Button asChild variant="outline" className="text-muted-foreground">
            <Link to="/non-existent-page">Test 404 Page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SimplifiedIndex;
