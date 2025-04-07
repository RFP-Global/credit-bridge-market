
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LenderAccountCard = () => {
  return (
    <Card className="bg-background/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-mono">LENDER ACCOUNT</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono">GC</div>
          <div>
            <p className="font-mono text-sm">GLOBAL CAPITAL</p>
            <p className="text-xs text-muted-foreground">finance@globalcapital.com</p>
          </div>
        </div>
        <div className="text-xs text-muted-foreground pt-2 border-t border-primary/10">
          <p className="flex justify-between py-1"><span>Account Type:</span> <span className="font-mono">INSTITUTIONAL</span></p>
          <p className="flex justify-between py-1"><span>Active Deals:</span> <span className="font-mono">12</span></p>
          <p className="flex justify-between py-1"><span>Total Portfolio:</span> <span className="font-mono">$145.8M</span></p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LenderAccountCard;
