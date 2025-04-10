
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface IndustryTabsProps {
  industries: string[];
  selectedIndustry: string;
  onSelectIndustry: (industry: string) => void;
}

export const IndustryTabs = ({
  industries,
  selectedIndustry,
  onSelectIndustry
}: IndustryTabsProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-3">Industry-Specific Underwriting Criteria</h2>
      <Tabs defaultValue={selectedIndustry} onValueChange={onSelectIndustry} className="w-full">
        <TabsList className="grid grid-cols-4 lg:grid-cols-6 mb-4">
          {industries.map((industry) => (
            <TabsTrigger key={industry} value={industry} className="text-xs">
              {industry}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
