import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UnderwritingCategory } from "./types";

interface UnderwritingCategoryCardProps {
  category: UnderwritingCategory;
}

export const UnderwritingCategoryCard = ({ category }: UnderwritingCategoryCardProps) => {
  const hasValueColumn = category.metrics.some(metric => metric.value !== undefined);
  const hasFormulaColumn = category.metrics.some(metric => metric.formula !== undefined);

  return (
    <Card className="bg-black/40 border-gray-800">
      <CardHeader className="py-3 border-b border-gray-800">
        <CardTitle className="text-base font-semibold">{category.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-800">
              <tr className="text-xs text-muted-foreground">
                <th className="text-left font-medium px-4 py-2">Metric</th>
                {hasValueColumn && (
                  <th className="text-center font-medium px-4 py-2">Value</th>
                )}
                {hasFormulaColumn && (
                  <th className="text-center font-medium px-4 py-2">Formula</th>
                )}
                <th className="text-center font-medium px-4 py-2">Score</th>
                <th className="text-center font-medium px-4 py-2">Weighting</th>
              </tr>
            </thead>
            <tbody>
              {category.metrics.map((metric, index) => (
                <tr key={index} className="border-b border-gray-800/50 last:border-0">
                  <td className="text-left px-4 py-2">{metric.name}</td>
                  {hasValueColumn && (
                    <td className="text-center px-4 py-2">{metric.value}</td>
                  )}
                  {hasFormulaColumn && (
                    <td className="text-center px-4 py-2">{metric.formula}</td>
                  )}
                  <td className="text-center px-4 py-2">
                    {metric.minScore !== undefined && metric.maxScore !== undefined ? (
                      <span className={`font-medium ${getScoreColorClass(roundToTenth((metric.minScore + metric.maxScore) / 2))}`}>
                        {roundToTenth(metric.minScore).toFixed(1)}-{roundToTenth(metric.maxScore).toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </td>
                  <td className="text-center px-4 py-2 text-blue-400">
                    {typeof metric.weighting === 'number' ? `${metric.weighting}%` : metric.weighting}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-900/30">
                <td className="font-semibold px-4 py-2">Total Score</td>
                {hasValueColumn && <td></td>}
                {hasFormulaColumn && <td></td>}
                <td className="text-center font-semibold px-4 py-2">
                  {category.minTotalScore !== undefined && category.maxTotalScore !== undefined ? (
                    <span className={`${getScoreColorClass(roundToTenth((category.minTotalScore + category.maxTotalScore) / 2))}`}>
                      {roundToTenth(category.minTotalScore).toFixed(1)}-{roundToTenth(category.maxTotalScore).toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-gray-500">N/A</span>
                  )}
                </td>
                <td className="text-center font-semibold px-4 py-2 text-blue-400">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const getScoreColorClass = (score: number) => {
  if (score >= 8) return 'text-green-500';
  if (score >= 6) return 'text-blue-500';
  if (score >= 4) return 'text-yellow-500';
  return 'text-red-500';
};

const roundToTenth = (num: number) => {
  return Math.round(num * 10) / 10;
};
