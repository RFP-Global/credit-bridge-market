
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Filter, Download, Sliders, LayoutDashboard } from "lucide-react";
import IntelligenceAnalyticsCard from "@/components/IntelligenceAnalyticsCard";
import IntelligenceTimeFilter from "@/components/IntelligenceTimeFilter";

// Mock data for the charts
const businessSizeData = [
  { name: 'Small Business', pending: 45, approved: 78, rejected: 23, rate: 0.32 },
  { name: 'Medium Business', approved: 65, pending: 32, rejected: 12, rate: 0.36 },
  { name: 'Large Business', approved: 88, pending: 45, rejected: 34, rate: 0.32 }
];

const industryData = [
  { name: 'Manufacturing', value: 30, color: '#33bbef' },
  { name: 'Construction', value: 25, color: '#8B5CF6' },
  { name: 'Tech', value: 20, color: '#10b981' },
  { name: 'Retail', value: 15, color: '#F97316' },
  { name: 'Healthcare', value: 10, color: '#fbd024' }
];

const timeSeriesData = [
  { month: 'Jan', manufacturing: 40, construction: 65, tech: 25, retail: 35, healthcare: 20 },
  { month: 'Feb', manufacturing: 45, construction: 70, tech: 32, retail: 30, healthcare: 28 },
  { month: 'Mar', manufacturing: 55, construction: 68, tech: 45, retail: 25, healthcare: 34 },
  { month: 'Apr', manufacturing: 65, construction: 60, tech: 52, retail: 40, healthcare: 42 },
  { month: 'May', manufacturing: 60, construction: 55, tech: 58, retail: 45, healthcare: 48 },
  { month: 'Jun', manufacturing: 70, construction: 63, tech: 62, retail: 50, healthcare: 45 }
];

const loanRequestData = [
  { month: 'Jan', small: 65, medium: 80, large: 45 },
  { month: 'Feb', small: 70, medium: 75, large: 60 },
  { month: 'Mar', small: 55, medium: 95, large: 70 },
  { month: 'Apr', small: 60, medium: 85, large: 80 },
  { month: 'May', small: 75, medium: 80, large: 65 },
  { month: 'Jun', small: 85, medium: 75, large: 90 }
];

const loanApprovalData = [
  { category: 'Small Business', approved: 65, rejected: 35 },
  { category: 'Medium Business', approved: 78, rejected: 22 },
  { category: 'Large Business', approved: 85, rejected: 15 }
];

const structureData = [
  { type: 'LLC', volume: 42, rate: 7.5 },
  { type: 'Corporate', volume: 28, rate: 6.2 },
  { type: 'Partnership', volume: 30, rate: 8.1 }
];

const COLORS = ['#33bbef', '#8B5CF6', '#10b981', '#F97316', '#fbd024'];

const Intelligence = () => {
  const [timeFilter, setTimeFilter] = useState("last-year");
  const [chartType, setChartType] = useState("bar");
  const [businessSize, setBusinessSize] = useState("all");
  const [industry, setIndustry] = useState("all");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Intelligence Analytics</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center">
              <Sliders className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </div>
        </div>

        <Tabs defaultValue="business" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="business">Business Size Analytics</TabsTrigger>
            <TabsTrigger value="industry">Industry Type Analytics</TabsTrigger>
            <TabsTrigger value="structure">Business Structure Analytics</TabsTrigger>
            <TabsTrigger value="geography">Geographic Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="business" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IntelligenceAnalyticsCard 
                title="Loan Request Patterns by Size"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <BarChart width={500} height={300} data={loanRequestData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="small" name="Small Business" fill="#33bbef" />
                  <Bar dataKey="medium" name="Medium Business" fill="#8B5CF6" />
                  <Bar dataKey="large" name="Large Business" fill="#10b981" />
                </BarChart>
              </IntelligenceAnalyticsCard>

              <IntelligenceAnalyticsCard 
                title="Loan Default Distribution By Business Size"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <PieChart width={500} height={300}>
                  <Pie
                    data={businessSizeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="rate"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {businessSizeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </IntelligenceAnalyticsCard>

              <IntelligenceAnalyticsCard 
                title="Loan Terms By Business Size"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <LineChart width={500} height={300} data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="manufacturing" stroke="#33bbef" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="construction" stroke="#8B5CF6" />
                  <Line type="monotone" dataKey="tech" stroke="#10b981" />
                </LineChart>
              </IntelligenceAnalyticsCard>

              <IntelligenceAnalyticsCard 
                title="Loan Approval and Rejection Rates"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <BarChart width={500} height={300} data={loanApprovalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="category" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="approved" name="Approved" fill="#33bbef" />
                  <Bar dataKey="rejected" name="Rejected" fill="#F97316" />
                </BarChart>
              </IntelligenceAnalyticsCard>
            </div>
          </TabsContent>

          <TabsContent value="industry" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IntelligenceAnalyticsCard 
                title="Loan Usage Trends by Industry"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <BarChart
                  width={500}
                  height={300}
                  data={timeSeriesData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis type="number" stroke="#888" />
                  <YAxis dataKey="month" type="category" stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="manufacturing" name="Manufacturing" stackId="a" fill="#33bbef" />
                  <Bar dataKey="construction" name="Construction" stackId="a" fill="#8B5CF6" />
                  <Bar dataKey="tech" name="Tech" stackId="a" fill="#10b981" />
                  <Bar dataKey="retail" name="Retail" stackId="a" fill="#F97316" />
                  <Bar dataKey="healthcare" name="Healthcare" stackId="a" fill="#fbd024" />
                </BarChart>
              </IntelligenceAnalyticsCard>

              <IntelligenceAnalyticsCard 
                title="Loan Default Rates By Industry"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <BarChart width={500} height={300} data={industryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="value" fill="#33bbef">
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </IntelligenceAnalyticsCard>

              <IntelligenceAnalyticsCard 
                title="Loan Term Preferences By Industry"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <LineChart width={500} height={300} data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="retail" stroke="#F97316" />
                  <Line type="monotone" dataKey="tech" stroke="#10b981" />
                  <Line type="monotone" dataKey="healthcare" stroke="#fbd024" />
                  <Line type="monotone" dataKey="manufacturing" stroke="#33bbef" />
                </LineChart>
              </IntelligenceAnalyticsCard>

              <IntelligenceAnalyticsCard 
                title="Industry-Specific Loan Volume Distribution"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <PieChart width={500} height={300}>
                  <Pie
                    data={industryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {industryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </IntelligenceAnalyticsCard>
            </div>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <IntelligenceAnalyticsCard 
                title="Loan Usage Trends by Structure"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <BarChart width={500} height={300} data={structureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="type" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="volume" fill="#33bbef" />
                </BarChart>
              </IntelligenceAnalyticsCard>

              <IntelligenceAnalyticsCard 
                title="Loan Default Rates By Structure"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <BarChart width={500} height={300} data={structureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="type" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="rate" fill="#33bbef" />
                </BarChart>
              </IntelligenceAnalyticsCard>

              <IntelligenceAnalyticsCard 
                title="Loan Term Preferences By Structure"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <LineChart width={500} height={300} data={structureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="type" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="volume" stroke="#33bbef" activeDot={{ r: 8 }} />
                </LineChart>
              </IntelligenceAnalyticsCard>

              <IntelligenceAnalyticsCard 
                title="Loan Application And Approval Trends"
                timeFilter={timeFilter}
                onTimeFilterChange={setTimeFilter}
              >
                <BarChart width={500} height={300} data={structureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="type" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="volume" name="Approved" fill="#33bbef" />
                  <Bar dataKey="rate" name="Rejected" fill="#F97316" />
                </BarChart>
              </IntelligenceAnalyticsCard>
            </div>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Loan Demand by Region</CardTitle>
                  <IntelligenceTimeFilter value={timeFilter} onChange={setTimeFilter} />
                </div>
                <CardDescription>Geographical distribution of loan requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[500px] bg-muted rounded-md overflow-hidden flex items-center justify-center">
                  <div className="p-8">
                    <img 
                      src="/lovable-uploads/cc05f534-5373-4bed-a558-6a318713ce60.png" 
                      alt="Geographic loan distribution" 
                      className="max-w-full h-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/90 border border-primary/20 p-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default Intelligence;
