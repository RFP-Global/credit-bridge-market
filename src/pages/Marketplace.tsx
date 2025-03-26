
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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight text-primary">
              Marketplace Proposals
            </h1>
            <Button variant="default" className="font-mono text-xs">
              New Proposal
            </Button>
          </div>

          <div className="grid-bg relative rounded-lg p-8 border border-primary/20 section-animate">
            <div className="radar-pulse"></div>
            <div className="scanline"></div>
            <p className="text-muted-foreground mb-6">
              Browse, filter, and engage with active loan requests from businesses seeking financing.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 flex gap-4">
                <div className="relative flex-1">
                  <Input
                    type="search"
                    placeholder="Search by keyword, industry, or rate type"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-primary/30 text-foreground"
                  />
                </div>
                <Button variant="outline" className="gap-2 font-mono text-xs border-primary/30">
                  <Filter className="h-4 w-4" />
                  Loan Type
                </Button>
                <Button variant="outline" className="gap-2 font-mono text-xs border-primary/30">
                  <Filter className="h-4 w-4" />
                  Target Terms
                </Button>
                <Button variant="outline" className="gap-2 font-mono text-xs border-primary/30">
                  <Filter className="h-4 w-4" />
                  Deal Activity
                </Button>
              </div>
            </div>
          </div>

          <div className="terminal-card section-animate">
            <div className="terminal-header">
              <div className="flex space-x-1">
                <div className="terminal-dot bg-red-500"></div>
                <div className="terminal-dot bg-yellow-500"></div>
                <div className="terminal-dot bg-green-500"></div>
              </div>
              <div className="ml-2 text-xs text-muted-foreground">rfp-marketplace-data</div>
            </div>
            <div className="terminal-content">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-primary/20">
                      <TableHead className="text-xs text-muted-foreground font-mono w-[50px]"></TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">RFP ID</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">PROJECT NAME</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">FACILITY TYPE</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">FINANCING TYPE</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">TARGET PRINCIPAL</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">INTEREST RATE TYPE</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">TARGET INTEREST RATE</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">TARGET TERM</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">STATUS</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">BID DEADLINE</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">LENDER PREFERENCES</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">INDUSTRY</TableHead>
                      <TableHead className="text-xs text-muted-foreground font-mono">BID VOLUME</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {marketplaceData.map((item) => (
                      <TableRow 
                        key={item.id}
                        className="hover:bg-primary/5 border-primary/20"
                      >
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4 text-primary/80" />
                          </Button>
                        </TableCell>
                        <TableCell className="font-mono">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {item.id}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-foreground">{item.projectName}</TableCell>
                        <TableCell className="font-mono text-foreground">{item.facilityType}</TableCell>
                        <TableCell className="font-mono text-foreground">{item.financing}</TableCell>
                        <TableCell className="font-mono text-foreground">{item.principal}</TableCell>
                        <TableCell className="font-mono text-foreground">{item.rateType}</TableCell>
                        <TableCell className="font-mono text-foreground">{item.targetRate}</TableCell>
                        <TableCell className="font-mono text-foreground">{item.term}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-mono
                            ${item.status === 'OPEN' ? 'bg-emerald-400/10 text-emerald-400' :
                              item.status === 'COMPLETED' ? 'bg-blue-400/10 text-blue-400' :
                              'bg-gray-400/10 text-gray-400'}`}>
                            {item.status}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-foreground">{item.deadline}</TableCell>
                        <TableCell className="font-mono text-foreground">{item.lender}</TableCell>
                        <TableCell className="font-mono text-foreground">{item.industry}</TableCell>
                        <TableCell>
                          <div className="w-24 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-full rounded-full" 
                              style={{ width: `${item.bidVolume}%` }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div className="section-animate">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Marketplace;
