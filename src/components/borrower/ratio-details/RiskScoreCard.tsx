
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RiskScoreCardProps {
  riskScore: number;
  riskLevel: {
    color: string;
    label: string;
  };
}

const RiskScoreCard = ({ riskScore, riskLevel }: RiskScoreCardProps) => {
  return (
    <Card className="bg-black/40 border-gray-800 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Overall Risk Score</span>
          <Badge className={riskLevel.color}>
            {riskScore.toFixed(1)} - {riskLevel.label}
          </Badge>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default RiskScoreCard;
