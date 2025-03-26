
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CustomTooltip } from "./CustomTooltip";

interface IndustryStackedBarChartProps {
  data: Array<{
    name: string;
    workingCapital: number;
    expansion: number;
    equipment: number;
    other: number;
  }>;
}

const IndustryStackedBarChart = ({ data }: IndustryStackedBarChartProps) => {
  return (
    <BarChart
      width={450}
      height={220}
      data={data}
      layout="vertical"
      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
      <XAxis type="number" stroke="#888" />
      <YAxis dataKey="name" type="category" stroke="#888" />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Bar dataKey="workingCapital" name="Working Capital" stackId="a" fill="#33bbef" />
      <Bar dataKey="expansion" name="Expansion" stackId="a" fill="#8B5CF6" />
      <Bar dataKey="equipment" name="Equipment" stackId="a" fill="#10b981" />
      <Bar dataKey="other" name="Other" stackId="a" fill="#F97316" />
    </BarChart>
  );
};

export default IndustryStackedBarChart;
