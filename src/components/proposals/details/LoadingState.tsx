
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/Navbar";

const LoadingState: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <div className="container mx-auto px-4 py-6 pt-24">
        <div className="mb-6">
          <Button variant="outline" size="sm" asChild className="mb-4">
            <Link to="/marketplace" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Link>
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-grow">
              <div className="flex items-center space-x-2 mb-2">
                <Skeleton className="w-20 h-6 bg-gray-800" />
                <Skeleton className="w-24 h-6 bg-gray-800" />
                <Skeleton className="w-28 h-6 bg-gray-800" />
              </div>
              
              <Skeleton className="h-10 w-3/4 bg-gray-800 mb-2" />
              <Skeleton className="h-4 w-1/2 bg-gray-800" />
            </div>
            
            <div className="flex flex-col items-start md:items-end">
              <Skeleton className="h-8 w-32 bg-gray-800 mb-2" />
              <Skeleton className="h-4 w-24 bg-gray-800" />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="font-mono text-xs">OVERVIEW</TabsTrigger>
            <TabsTrigger value="financials" className="font-mono text-xs">FINANCIALS</TabsTrigger>
            <TabsTrigger value="credit" className="font-mono text-xs">CREDIT PROFILE</TabsTrigger>
            <TabsTrigger value="company" className="font-mono text-xs">COMPANY INFO</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-1 md:col-span-2 bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono">PROPOSAL SUMMARY</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {Array(9).fill(0).map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-3 w-20 bg-gray-800 mb-1" />
                        <Skeleton className="h-5 w-24 bg-gray-800" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="my-6 h-[1px] bg-gray-800" />
                  
                  <div>
                    <Skeleton className="h-3 w-32 bg-gray-800 mb-3" />
                    <div className="flex items-center mb-2">
                      <Skeleton className="h-2 w-full bg-gray-800 mr-4" />
                      <Skeleton className="h-5 w-12 bg-gray-800" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-sm font-mono">KEY FINANCIALS</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i}>
                        <Skeleton className="h-3 w-24 bg-gray-800 mb-1" />
                        <Skeleton className="h-5 w-28 bg-gray-800" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoadingState;
