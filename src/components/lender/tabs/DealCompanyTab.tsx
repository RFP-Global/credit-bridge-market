
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Building, Users, MapPin, Briefcase } from "lucide-react";

interface DealCompanyTabProps {
  dealData: any;
}

const DealCompanyTab: React.FC<DealCompanyTabProps> = ({ dealData }) => {
  // Mock company data
  const companyData = {
    founded: "2011",
    employees: 85,
    ownership: "Private",
    industrySubsector: "Technology Services",
    location: "Chicago, IL",
    annualRevenue: "$8.5M",
    totalAssets: "$12.4M",
    totalLiabilities: "$5.2M",
    netWorth: "$7.2M",
    publiclyTraded: false,
    keyExecutives: ["Jane Smith, CEO", "Michael Chen, CFO", "Robert Williams, COO"]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <Building className="mr-2 h-4 w-4" />
              COMPANY PROFILE
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-400 mb-1">LEGAL NAME</p>
                <p className="font-semibold">{dealData.company}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">FOUNDED</p>
                <p className="font-semibold">{companyData.founded}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">EMPLOYEES</p>
                <p className="font-semibold">{companyData.employees}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">OWNERSHIP</p>
                <p className="font-semibold">{companyData.ownership}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">INDUSTRY</p>
                <p className="font-semibold">Technology</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">SUBSECTOR</p>
                <p className="font-semibold">{companyData.industrySubsector}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">LOCATION</p>
                <p className="font-semibold">{companyData.location}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1">PUBLICLY TRADED</p>
                <p className="font-semibold">{companyData.publiclyTraded ? "Yes" : "No"}</p>
              </div>
            </div>
            
            <Separator className="my-6 bg-gray-800" />
            
            <div>
              <p className="text-xs text-gray-400 mb-3">KEY EXECUTIVES</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {companyData.keyExecutives.map((executive, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 bg-gray-900/30 rounded-md">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs">
                      {executive.charAt(0)}
                    </div>
                    <div className="text-sm">{executive}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black border-gray-800">
          <CardHeader className="border-b border-gray-800">
            <CardTitle className="text-sm font-mono flex items-center">
              <Briefcase className="mr-2 h-4 w-4" />
              BUSINESS OVERVIEW
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                {dealData.company} is a {companyData.ownership.toLowerCase()} company founded in {companyData.founded} specializing in {companyData.industrySubsector.toLowerCase()}. With {companyData.employees} employees and headquarters in {companyData.location}, the company has established itself as a competitive player in the technology market.
              </p>
              <p className="text-sm leading-relaxed">
                The company has shown consistent growth over the past several years with an annual revenue of {companyData.annualRevenue} and maintains a solid balance sheet with {companyData.totalAssets} in total assets and {companyData.netWorth} in net worth.
              </p>
              <p className="text-sm leading-relaxed">
                Led by an experienced management team with deep industry expertise, the company is well-positioned for continuous expansion in its target markets while maintaining strong financial discipline.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DealCompanyTab;
