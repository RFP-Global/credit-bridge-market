
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Eye, Filter, ArrowUpDown } from "lucide-react";

const marketplaceData = [
  {
    id: "75",
    projectName: "Project A",
    facilityType: "Term Loan",
    financing: "New Financing",
    principal: "$500,000",
    rateType: "Fixed",
    targetRate: "12.00%",
    term: "36 Months",
    status: "OPEN",
    deadline: "21:08:30",
    lender: "Regional Bank",
    industry: "Construction",
    bidVolume: 75
  },
  {
    id: "82",
    projectName: "Project B",
    facilityType: "364-Day Revolver",
    financing: "Refinancing",
    principal: "$1,500,000",
    rateType: "Fixed",
    targetRate: "10.175%",
    term: "12 Months",
    status: "OPEN",
    deadline: "00:05:35",
    lender: "Community Bank",
    industry: "Real Estate",
    bidVolume: 85
  },
  {
    id: "54",
    projectName: "Project C",
    facilityType: "Asset-Based Loan",
    financing: "Refinancing",
    principal: "$250,000",
    rateType: "Floating",
    targetRate: "SOFR + 350",
    term: "14 Months",
    status: "OPEN",
    deadline: "02:11:10",
    lender: "National Bank",
    industry: "Healthcare",
    bidVolume: 60
  },
  {
    id: "94",
    projectName: "Project D",
    facilityType: "SBA Loan",
    financing: "New Financing",
    principal: "$5,000,000",
    rateType: "Floating",
    targetRate: "SOFR + 200",
    term: "24 Months",
    status: "COMPLETED",
    deadline: "Closed",
    lender: "FinTech",
    industry: "Manufacturing",
    bidVolume: 90
  },
  {
    id: "47",
    projectName: "Project E",
    facilityType: "Equipment Financing",
    financing: "Refinancing",
    principal: "$7,500,000",
    rateType: "Floating",
    targetRate: "8.750%",
    term: "60 Months",
    status: "EXPIRED",
    deadline: "Closed",
    lender: "Private Credit",
    industry: "Manufacturing",
    bidVolume: 45
  }
];

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-mono tracking-tight text-[#4ECDC4]">
              Proposals
            </h1>
            <Button variant="outline" className="font-mono text-xs border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/10">
              New Proposal
            </Button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 flex gap-4">
              <div className="relative flex-1">
                <Input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#222] border-[#333] text-white placeholder:text-gray-500"
                />
              </div>
              <Button variant="outline" className="gap-2 font-mono text-xs border-[#333] text-gray-400">
                <Filter className="h-4 w-4" />
                Loan Request Type
              </Button>
              <Button variant="outline" className="gap-2 font-mono text-xs border-[#333] text-gray-400">
                <Filter className="h-4 w-4" />
                Target Terms
              </Button>
              <Button variant="outline" className="gap-2 font-mono text-xs border-[#333] text-gray-400">
                <Filter className="h-4 w-4" />
                Deal Activity Metrics
              </Button>
            </div>
          </div>

          <div className="border border-[#333] rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-[#1A1A1A]">
                <TableRow className="hover:bg-transparent border-[#333]">
                  <TableHead className="text-xs text-gray-400 font-mono w-[50px]"></TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">RFP CREDIT RATING</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">PROJECT NAME</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">FACILITY TYPE</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">NEW FINANCING OR REFINANCING</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">TARGET PRINCIPAL</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">INTEREST RATE TYPE</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">TARGET INTEREST RATE</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">TARGET TERM</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">STATUS</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">BID DEADLINE</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">LENDER PREFERENCES</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">INDUSTRY</TableHead>
                  <TableHead className="text-xs text-gray-400 font-mono">BID VOLUME</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {marketplaceData.map((item) => (
                  <TableRow 
                    key={item.id}
                    className="hover:bg-[#1A1A1A] border-[#333]"
                  >
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-gray-400" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-mono">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#4ECDC4]" />
                        {item.id}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-gray-300">{item.projectName}</TableCell>
                    <TableCell className="font-mono text-gray-300">{item.facilityType}</TableCell>
                    <TableCell className="font-mono text-gray-300">{item.financing}</TableCell>
                    <TableCell className="font-mono text-gray-300">{item.principal}</TableCell>
                    <TableCell className="font-mono text-gray-300">{item.rateType}</TableCell>
                    <TableCell className="font-mono text-gray-300">{item.targetRate}</TableCell>
                    <TableCell className="font-mono text-gray-300">{item.term}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-mono
                        ${item.status === 'OPEN' ? 'bg-emerald-400/10 text-emerald-400' :
                          item.status === 'COMPLETED' ? 'bg-blue-400/10 text-blue-400' :
                          'bg-gray-400/10 text-gray-400'}`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-mono text-gray-300">{item.deadline}</TableCell>
                    <TableCell className="font-mono text-gray-300">{item.lender}</TableCell>
                    <TableCell className="font-mono text-gray-300">{item.industry}</TableCell>
                    <TableCell>
                      <div className="w-24 bg-[#222] rounded-full h-2">
                        <div 
                          className="bg-[#4ECDC4] h-full rounded-full" 
                          style={{ width: `${item.bidVolume}%` }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 10, 20, 21].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="icon"
                className={`w-8 h-8 text-xs font-mono
                  ${page === 1 ? 'bg-[#4ECDC4] hover:bg-[#4ECDC4]/90' : 'border-[#333] text-gray-400'}`}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
