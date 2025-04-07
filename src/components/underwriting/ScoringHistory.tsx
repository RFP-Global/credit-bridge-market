
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ScoringHistoryProps {
  getScoreBackground: (score: number) => string;
}

export const ScoringHistory = ({ getScoreBackground }: ScoringHistoryProps) => {
  const historyItems = [
    { date: "2023-12-15", score: 4.45, description: "Increased weight of Financial Strength, reduced Industry Risk" },
    { date: "2023-11-01", score: 4.32, description: "Adjusted Management Strength criteria weights" },
    { date: "2023-09-22", score: 4.21, description: "Initial algorithm configuration" }
  ];

  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader>
        <CardTitle className="text-sm font-mono">SCORING HISTORY</CardTitle>
        <CardDescription>
          Review previous scoring algorithm versions and changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            {historyItems.map((item, i) => (
              <div key={i} className="flex items-start border-b border-gray-800/40 pb-4 last:border-0 last:pb-0">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mr-4 ${getScoreBackground(item.score)}`}>
                  {item.score}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-1">
                    <div className="font-medium">Algorithm v{3-i}.0</div>
                    <div className="text-sm text-muted-foreground">{item.date}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-2">
                  Restore
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
